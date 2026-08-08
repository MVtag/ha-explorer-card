import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRoom,
  NormalizedPoint,
} from "../models/config";
import type { AreaRegistryEntry, HomeAssistant } from "../types";
import { HaExplorerCardEditor } from "./explorer-config-editor";

const VIEWBOX_SIZE = 1000;
type DrawingMode = "idle" | "draw-new" | "redraw" | "anchor";

function clampNormalized(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function roomCenter(points: NormalizedPoint[]): { x: number; y: number } {
  if (!points.length) return { x: 0.5, y: 0.5 };
  return {
    x: points.reduce((sum, point) => sum + point[0], 0) / points.length,
    y: points.reduce((sum, point) => sum + point[1], 0) / points.length,
  };
}

function slugify(value: string): string {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || "room";
}

@customElement("ha-explorer-room-drawing-editor")
export class HaExplorerRoomDrawingEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private roomConfig?: ExplorerCardConfig;
  @state() private drawingMode: DrawingMode = "idle";
  @state() private selectedRoomId = "";
  @state() private pendingPoints: NormalizedPoint[] = [];
  @state() private draftRoomName = "";
  @state() private draftAreaId = "";
  @state() private drawingAreas: AreaRegistryEntry[] = [];
  @state() private drawingAreaError = "";
  @query("ha-explorer-card-editor") private baseEditor?: HaExplorerCardEditor;

  public setConfig(config: ExplorerCardConfig): void {
    this.roomConfig = config;

    if (
      this.selectedRoomId &&
      !(config.rooms ?? []).some((room) => room.id === this.selectedRoomId)
    ) {
      this.selectedRoomId = "";
      this.drawingMode = "idle";
      this.pendingPoints = [];
    }
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("hass")) void this.loadDrawingAreas();
    if ((changed.has("roomConfig") || changed.has("hass")) && this.roomConfig) {
      this.baseEditor?.setConfig(this.roomConfig);
    }
  }

  private async loadDrawingAreas(): Promise<void> {
    if (!this.hass?.callWS) {
      this.drawingAreas = [];
      return;
    }

    this.drawingAreaError = "";
    try {
      const areas = await this.hass.callWS<AreaRegistryEntry[]>({
        type: "config/area_registry/list",
      });
      this.drawingAreas = [...areas].sort((a, b) => a.name.localeCompare(b.name, "da"));
    } catch {
      this.drawingAreaError = "Home Assistant Areas kunne ikke hentes i tegneværktøjet.";
    }
  }

  private handleBaseConfigChanged(event: CustomEvent<{ config: ExplorerCardConfig }>): void {
    if (event.detail?.config) this.roomConfig = event.detail.config;
  }

  private emitConfig(config: ExplorerCardConfig): void {
    this.roomConfig = config;
    this.baseEditor?.setConfig(config);
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private get rooms(): ExplorerRoom[] {
    return this.roomConfig?.rooms ?? [];
  }

  private get selectedRoom(): ExplorerRoom | undefined {
    return this.rooms.find((room) => room.id === this.selectedRoomId);
  }

  private mapPoint(event: MouseEvent): NormalizedPoint {
    const element = event.currentTarget as SVGSVGElement;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return [0.5, 0.5];

    return [
      clampNormalized((event.clientX - rect.left) / rect.width),
      clampNormalized((event.clientY - rect.top) / rect.height),
    ];
  }

  private handleMapClick(event: MouseEvent): void {
    const point = this.mapPoint(event);

    if (this.drawingMode === "draw-new" || this.drawingMode === "redraw") {
      this.pendingPoints = [...this.pendingPoints, point];
      return;
    }

    if (this.drawingMode === "anchor" && this.selectedRoom) {
      this.updateSelectedRoom({ presence_anchor: { x: point[0], y: point[1] } });
      this.drawingMode = "idle";
    }
  }

  private selectRoom(event: MouseEvent, roomId: string): void {
    if (this.drawingMode !== "idle") return;
    event.stopPropagation();
    this.selectedRoomId = roomId;
  }

  private uniqueRoomId(name: string): string {
    const base = slugify(name);
    const used = new Set(this.rooms.map((room) => room.id));
    if (!used.has(base)) return base;

    let suffix = 2;
    while (used.has(`${base}_${suffix}`)) suffix += 1;
    return `${base}_${suffix}`;
  }

  private beginNewRoom(): void {
    this.selectedRoomId = "";
    this.pendingPoints = [];
    this.draftRoomName = `Rum ${this.rooms.length + 1}`;
    this.draftAreaId = "";
    this.drawingMode = "draw-new";
  }

  private beginRedraw(): void {
    if (!this.selectedRoom) return;
    this.pendingPoints = [];
    this.drawingMode = "redraw";
  }

  private beginAnchor(): void {
    if (!this.selectedRoom) return;
    this.pendingPoints = [];
    this.drawingMode = "anchor";
  }

  private cancelDrawing(): void {
    this.pendingPoints = [];
    this.drawingMode = "idle";
  }

  private undoPoint(): void {
    if (!this.pendingPoints.length) return;
    this.pendingPoints = this.pendingPoints.slice(0, -1);
  }

  private finishPolygon(): void {
    if (this.pendingPoints.length < 3 || !this.roomConfig) return;

    if (this.drawingMode === "draw-new") {
      const name = this.draftRoomName.trim() || `Rum ${this.rooms.length + 1}`;
      const id = this.uniqueRoomId(name);
      const center = roomCenter(this.pendingPoints);
      const room: ExplorerRoom = {
        id,
        name,
        points: this.pendingPoints,
        presence_anchor: center,
        ...(this.draftAreaId ? { area_id: this.draftAreaId } : {}),
      };
      const config = { ...this.roomConfig, rooms: [...this.rooms, room] };
      this.selectedRoomId = id;
      this.pendingPoints = [];
      this.drawingMode = "idle";
      this.emitConfig(config);
      return;
    }

    if (this.drawingMode === "redraw" && this.selectedRoom) {
      const rooms = this.rooms.map((room) =>
        room.id === this.selectedRoomId
          ? {
              ...room,
              points: this.pendingPoints,
              presence_anchor: room.presence_anchor ?? roomCenter(this.pendingPoints),
            }
          : room,
      );
      this.pendingPoints = [];
      this.drawingMode = "idle";
      this.emitConfig({ ...this.roomConfig, rooms });
    }
  }

  private updateSelectedRoom(patch: Partial<ExplorerRoom>): void {
    if (!this.roomConfig || !this.selectedRoom) return;
    const rooms = this.rooms.map((room) =>
      room.id === this.selectedRoomId ? { ...room, ...patch } : room,
    );
    this.emitConfig({ ...this.roomConfig, rooms });
  }

  private renderRoomPolygon(room: ExplorerRoom) {
    if (!room.points.length) return nothing;
    const points = room.points
      .map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`)
      .join(" ");
    const selected = room.id === this.selectedRoomId;
    const center = roomCenter(room.points);
    const anchor = room.presence_anchor ?? center;

    return svg`
      <g
        class=${selected ? "map-room selected" : "map-room"}
        style=${this.drawingMode === "idle" ? "pointer-events:auto" : "pointer-events:none"}
        @click=${(event: MouseEvent) => this.selectRoom(event, room.id)}
      >
        <polygon
          points=${points}
          fill="var(--primary-color, #03a9f4)"
          fill-opacity=${selected ? "0.30" : "0.14"}
          stroke="var(--primary-color, #03a9f4)"
          stroke-width=${selected ? "7" : "4"}
          vector-effect="non-scaling-stroke"
        ></polygon>
        <text
          x=${center.x * VIEWBOX_SIZE}
          y=${center.y * VIEWBOX_SIZE}
          text-anchor="middle"
          dominant-baseline="middle"
          class="drawing-room-label"
        >${room.name ?? room.id}</text>
        ${selected
          ? svg`
              <g class="anchor-marker" transform=${`translate(${anchor.x * VIEWBOX_SIZE} ${anchor.y * VIEWBOX_SIZE})`}>
                <circle r="15"></circle>
                <line x1="-24" y1="0" x2="24" y2="0"></line>
                <line x1="0" y1="-24" x2="0" y2="24"></line>
              </g>
            `
          : nothing}
      </g>
    `;
  }

  private renderPendingPolygon() {
    if (!this.pendingPoints.length) return nothing;
    const points = this.pendingPoints
      .map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`)
      .join(" ");

    return svg`
      ${this.pendingPoints.length >= 3
        ? svg`<polygon
            points=${points}
            class="pending-fill"
            vector-effect="non-scaling-stroke"
          ></polygon>`
        : nothing}
      <polyline
        points=${points}
        class="pending-line"
        fill="none"
        vector-effect="non-scaling-stroke"
      ></polyline>
      ${this.pendingPoints.map(
        ([x, y], index) => svg`
          <g transform=${`translate(${x * VIEWBOX_SIZE} ${y * VIEWBOX_SIZE})`}>
            <circle class="pending-point" r="13"></circle>
            <text class="point-number" y="-24" text-anchor="middle">${index + 1}</text>
          </g>
        `,
      )}
    `;
  }

  private renderDrawingInstructions() {
    if (this.drawingMode === "draw-new") {
      return html`Tryk rundt langs kanten af det nye rum. Brug mindst 3 punkter og afslut med <strong>Gem rum</strong>.`;
    }
    if (this.drawingMode === "redraw") {
      return html`Tegn den nye kant for <strong>${this.selectedRoom?.name ?? this.selectedRoomId}</strong>. Den gamle geometri ændres først, når du gemmer.`;
    }
    if (this.drawingMode === "anchor") {
      return html`Tryk på det sted i <strong>${this.selectedRoom?.name ?? this.selectedRoomId}</strong>, hvor personer normalt skal vises.`;
    }
    return html`Vælg et eksisterende rum på kortet for at redigere det, eller tryk <strong>Nyt rum</strong> for at tegne et nyt.`;
  }

  private renderDrawingTools() {
    if (this.drawingMode === "draw-new") {
      return html`
        <div class="draft-grid">
          <label>
            Rumnavn
            <input
              .value=${this.draftRoomName}
              @input=${(event: InputEvent) =>
                (this.draftRoomName = (event.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            Home Assistant Area
            <select
              .value=${this.draftAreaId}
              @change=${(event: Event) =>
                (this.draftAreaId = (event.target as HTMLSelectElement).value)}
            >
              <option value="">Ikke bundet endnu</option>
              ${this.drawingAreas.map(
                (area) => html`<option value=${area.area_id}>${area.name}</option>`,
              )}
            </select>
          </label>
        </div>
      `;
    }

    if (this.drawingMode === "redraw") {
      return html`
        <div class="selected-summary">
          <strong>${this.selectedRoom?.name ?? this.selectedRoomId}</strong>
          <span>${this.pendingPoints.length} nye punkter</span>
        </div>
      `;
    }

    if (this.selectedRoom) {
      const anchor = this.selectedRoom.presence_anchor ?? roomCenter(this.selectedRoom.points);
      return html`
        <div class="selected-summary">
          <div>
            <strong>${this.selectedRoom.name ?? this.selectedRoom.id}</strong>
            <span>${this.selectedRoom.points.length} punkter · anchor ${anchor.x.toFixed(2)}, ${anchor.y.toFixed(2)}</span>
          </div>
          <span class="room-id">${this.selectedRoom.id}</span>
        </div>
      `;
    }

    return nothing;
  }

  private renderButtonBar() {
    const drawingPolygon = this.drawingMode === "draw-new" || this.drawingMode === "redraw";

    if (this.drawingMode !== "idle") {
      return html`
        <div class="button-bar">
          ${drawingPolygon
            ? html`
                <button class="secondary" ?disabled=${!this.pendingPoints.length} @click=${this.undoPoint}>
                  Fortryd punkt
                </button>
                <button class="primary" ?disabled=${this.pendingPoints.length < 3} @click=${this.finishPolygon}>
                  ${this.drawingMode === "draw-new" ? "Gem rum" : "Gem ny rumkant"}
                </button>
              `
            : nothing}
          <button class="secondary" @click=${this.cancelDrawing}>Annuller</button>
        </div>
      `;
    }

    return html`
      <div class="button-bar">
        <button class="primary" @click=${this.beginNewRoom}>+ Nyt rum</button>
        <button class="secondary" ?disabled=${!this.selectedRoom} @click=${this.beginRedraw}>
          Tegn rumkant igen
        </button>
        <button class="secondary" ?disabled=${!this.selectedRoom} @click=${this.beginAnchor}>
          Placér personpunkt
        </button>
      </div>
    `;
  }

  private renderRoomDrawingEditor() {
    if (!this.roomConfig) return nothing;
    const image = this.roomConfig.image ?? this.roomConfig.background ?? "";
    const preserveAspectRatio =
      this.roomConfig.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet";

    return html`
      <section class="drawing-editor">
        <div class="drawing-heading">
          <div>
            <span class="eyebrow">Visual Room Editor</span>
            <h3>Tegn rum direkte på plantegningen</h3>
          </div>
          <span class="count-badge">${this.rooms.length} rum</span>
        </div>

        <div class="instruction">${this.renderDrawingInstructions()}</div>
        ${this.renderDrawingTools()}
        ${this.drawingAreaError ? html`<div class="drawing-warning">${this.drawingAreaError}</div>` : nothing}

        ${image
          ? html`
              <div class=${`map-frame mode-${this.drawingMode}`}>
                <svg
                  class="drawing-map"
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="none"
                  @click=${this.handleMapClick}
                >
                  <image
                    href=${image}
                    x="0"
                    y="0"
                    width="1000"
                    height="1000"
                    preserveAspectRatio=${preserveAspectRatio}
                  ></image>
                  ${this.rooms.map((room) => this.renderRoomPolygon(room))}
                  ${this.renderPendingPolygon()}
                </svg>
              </div>
            `
          : html`
              <div class="empty-map">
                Vælg først en plantegning under <strong>Kort</strong>, før du tegner rum.
              </div>
            `}

        ${this.renderButtonBar()}
        <div class="drawing-note">
          Koordinater gemmes automatisk som normaliserede værdier fra 0 til 1. Eksisterende YAML-konfiguration er fortsat kompatibel.
        </div>
      </section>
    `;
  }

  protected render() {
    return html`
      <ha-explorer-card-editor
        .hass=${this.hass}
        @config-changed=${this.handleBaseConfigChanged}
      ></ha-explorer-card-editor>
      ${this.renderRoomDrawingEditor()}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .drawing-editor {
      margin-top: 18px;
      display: grid;
      gap: 14px;
      padding: 16px;
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--ha-card-background, var(--card-background-color));
    }

    .drawing-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .drawing-heading h3 {
      margin: 3px 0 0;
      font-size: 1.08rem;
    }

    .eyebrow {
      display: block;
      color: var(--secondary-text-color);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .count-badge,
    .room-id {
      padding: 5px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      font-size: 0.75rem;
      white-space: nowrap;
    }

    .instruction,
    .drawing-note,
    .drawing-warning {
      padding: 10px 12px;
      border-radius: 10px;
      line-height: 1.45;
      font-size: 0.9rem;
    }

    .instruction,
    .drawing-note {
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
    }

    .drawing-warning {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border-left: 3px solid var(--warning-color, #ff9800);
    }

    .draft-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .draft-grid label {
      display: grid;
      gap: 6px;
      font-weight: 500;
    }

    .draft-grid input,
    .draft-grid select {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: var(--card-background-color);
      font: inherit;
    }

    .selected-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }

    .selected-summary span:not(.room-id) {
      display: block;
      margin-top: 3px;
      color: var(--secondary-text-color);
      font-size: 0.8rem;
    }

    .map-frame {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      touch-action: manipulation;
    }

    .drawing-map {
      display: block;
      width: 100%;
      aspect-ratio: 1 / 1;
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
    }

    .mode-draw-new .drawing-map,
    .mode-redraw .drawing-map {
      cursor: crosshair;
    }

    .mode-anchor .drawing-map {
      cursor: cell;
    }

    .map-room {
      cursor: pointer;
    }

    .drawing-room-label {
      fill: var(--primary-text-color);
      paint-order: stroke;
      stroke: var(--card-background-color);
      stroke-width: 8px;
      stroke-linejoin: round;
      font-size: 30px;
      font-weight: 700;
      pointer-events: none;
    }

    .anchor-marker circle {
      fill: var(--card-background-color);
      stroke: var(--accent-color, var(--primary-color));
      stroke-width: 5px;
      vector-effect: non-scaling-stroke;
    }

    .anchor-marker line {
      stroke: var(--accent-color, var(--primary-color));
      stroke-width: 4px;
      vector-effect: non-scaling-stroke;
    }

    .pending-fill {
      fill: var(--accent-color, var(--primary-color));
      fill-opacity: 0.22;
      stroke: none;
      pointer-events: none;
    }

    .pending-line {
      stroke: var(--accent-color, var(--primary-color));
      stroke-width: 5px;
      stroke-dasharray: 14 10;
      pointer-events: none;
    }

    .pending-point {
      fill: var(--card-background-color);
      stroke: var(--accent-color, var(--primary-color));
      stroke-width: 5px;
      vector-effect: non-scaling-stroke;
      pointer-events: none;
    }

    .point-number {
      fill: var(--primary-text-color);
      paint-order: stroke;
      stroke: var(--card-background-color);
      stroke-width: 7px;
      font-size: 25px;
      font-weight: 700;
      pointer-events: none;
    }

    .button-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .button-bar button {
      appearance: none;
      min-height: 40px;
      padding: 9px 13px;
      border-radius: 9px;
      border: 1px solid var(--divider-color);
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .button-bar button.primary {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }

    .button-bar button.secondary {
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .button-bar button:disabled {
      opacity: 0.45;
      cursor: default;
    }

    .empty-map {
      display: grid;
      min-height: 180px;
      place-items: center;
      padding: 24px;
      border: 1px dashed var(--divider-color);
      border-radius: 12px;
      color: var(--secondary-text-color);
      text-align: center;
    }

    @media (max-width: 600px) {
      .drawing-editor {
        padding: 12px;
      }

      .draft-grid {
        grid-template-columns: 1fr;
      }

      .drawing-room-label {
        font-size: 34px;
      }

      .button-bar button {
        flex: 1 1 auto;
      }
    }
  `;
}
