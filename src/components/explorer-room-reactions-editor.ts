import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRoom,
  ExplorerRoomReaction,
  NormalizedPosition,
  RoomReactionKind,
} from "../models/config";
import type { HomeAssistant } from "../types";
import {
  defaultRoomReactionStates,
  evaluateRoomReaction,
  roomReactionPosition,
} from "../utils/room-reactions";
import { VIEWBOX_SIZE } from "../utils/viewport";

const KIND_LABELS: Record<RoomReactionKind, string> = {
  light: "Lampe / lys",
  motion: "Bevægelsessensor",
  media: "TV / media",
  opening: "Dør / vindue",
  temperature: "Temperatur",
};

const KIND_GLYPHS: Record<RoomReactionKind, string> = {
  light: "✦",
  motion: "◉",
  media: "▶",
  opening: "↗",
  temperature: "°",
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

@customElement("ha-explorer-room-reactions-editor")
export class HaExplorerRoomReactionsEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private selectedRoomId = "";
  @state() private draftKind: RoomReactionKind = "light";
  @state() private draftEntity = "";
  @state() private draftStates = "on";
  @state() private draftPosition?: NormalizedPosition;
  @state() private editingIndex?: number;

  private get rooms(): ExplorerRoom[] {
    return this.config?.rooms ?? [];
  }

  private get selectedRoom(): ExplorerRoom | undefined {
    return this.rooms.find((room) => room.id === this.selectedRoomId);
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (!changed.has("config")) return;
    if (this.selectedRoomId && this.selectedRoom) return;
    this.selectedRoomId = this.rooms[0]?.id ?? "";
    this.cancelEdit();
  }

  private emitConfig(config: ExplorerCardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  private parseStates(value: string): string[] {
    const states = value.split(",").map((entry) => entry.trim()).filter(Boolean);
    return [...new Set(states)];
  }

  private entityState(entityId: string) {
    const entity = this.hass?.states[entityId];
    if (!entity) return undefined;
    return { state: entity.state, attributes: entity.attributes };
  }

  private updateSelectedRoom(reactions: ExplorerRoomReaction[]): void {
    if (!this.config || !this.selectedRoom) return;
    const rooms = this.rooms.map((room) =>
      room.id === this.selectedRoomId
        ? { ...room, ...(reactions.length ? { reactions } : { reactions: undefined }) }
        : room,
    );
    this.emitConfig({ ...this.config, rooms });
  }

  private isDuplicate(): boolean {
    if (!this.selectedRoom || !this.draftEntity.trim()) return true;
    return (this.selectedRoom.reactions ?? []).some((reaction, index) =>
      index !== this.editingIndex &&
      reaction.kind === this.draftKind &&
      reaction.entity.trim() === this.draftEntity.trim(),
    );
  }

  private saveReaction(): void {
    if (!this.selectedRoom || !this.draftEntity.trim() || this.isDuplicate()) return;
    const states = this.parseStates(this.draftStates);
    const reaction: ExplorerRoomReaction = {
      kind: this.draftKind,
      entity: this.draftEntity.trim(),
      ...(this.draftKind === "temperature" || !states.length ? {} : { active_states: states }),
      ...(this.draftPosition ? { position: { ...this.draftPosition } } : {}),
    };
    const existing = [...(this.selectedRoom.reactions ?? [])];
    if (this.editingIndex === undefined) existing.push(reaction);
    else existing[this.editingIndex] = reaction;
    this.updateSelectedRoom(existing);
    this.cancelEdit();
  }

  private beginEdit(index: number): void {
    const room = this.selectedRoom;
    const reaction = room?.reactions?.[index];
    if (!room || !reaction) return;
    this.editingIndex = index;
    this.draftKind = reaction.kind;
    this.draftEntity = reaction.entity;
    this.draftStates = reaction.kind === "temperature"
      ? ""
      : (
          reaction.active_states?.length
            ? reaction.active_states
            : defaultRoomReactionStates(reaction.kind)
        ).join(", ");
    this.draftPosition = roomReactionPosition(room, reaction);
  }

  private cancelEdit(): void {
    this.editingIndex = undefined;
    this.draftKind = "light";
    this.draftEntity = "";
    this.draftStates = defaultRoomReactionStates("light").join(", ");
    this.draftPosition = undefined;
  }

  private deleteReaction(index: number): void {
    if (!this.selectedRoom) return;
    const reactions = (this.selectedRoom.reactions ?? []).filter((_, entryIndex) => entryIndex !== index);
    this.updateSelectedRoom(reactions);
    if (this.editingIndex === index) this.cancelEdit();
  }

  private handleKindChange(kind: RoomReactionKind): void {
    this.draftKind = kind;
    this.draftEntity = "";
    this.draftStates = kind === "temperature"
      ? ""
      : defaultRoomReactionStates(kind).join(", ");
  }

  private reactionStatus(reaction: ExplorerRoomReaction, index: number) {
    return evaluateRoomReaction(
      reaction,
      index,
      (entityId) => this.entityState(entityId),
    );
  }

  private formatTemperature(value: number, unit?: string): string {
    const formatted = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(value);
    return unit ? `${formatted} ${unit}` : `${formatted}°`;
  }

  private statusLabel(reaction: ExplorerRoomReaction, index: number): string {
    const status = this.reactionStatus(reaction, index);
    if (status.active) {
      if (reaction.kind === "light") {
        return `Aktiv · ${status.currentState} · ${Math.round(status.intensity * 100)} %`;
      }
      if (reaction.kind === "temperature" && status.numericValue !== undefined) {
        return `Aktuel · ${this.formatTemperature(status.numericValue, status.unit)}`;
      }
      return `Aktiv · ${status.currentState}`;
    }
    if (status.reason === "entity_unavailable") return "Entity utilgængelig";
    if (status.reason === "missing_entity") return "Ingen entity";
    if (reaction.kind === "temperature") return `Ingen numerisk temperatur · ${status.currentState ?? "ukendt"}`;
    return `Inaktiv · ${status.currentState ?? "ukendt"}`;
  }

  private entityOptions(): Array<{ id: string; label: string }> {
    if (!this.hass) return [];
    const entries = Object.entries(this.hass.states);
    const preferred = entries.filter(([entityId, entity]) => {
      if (this.draftKind === "light") return entityId.startsWith("light.");
      if (this.draftKind === "media") return entityId.startsWith("media_player.");
      if (this.draftKind === "motion" || this.draftKind === "opening") return entityId.startsWith("binary_sensor.");
      const deviceClass = entity.attributes.device_class;
      const unit = entity.attributes.unit_of_measurement;
      return entityId.startsWith("sensor.") && (
        deviceClass === "temperature" ||
        (typeof unit === "string" && (unit.includes("°C") || unit.includes("°F")))
      );
    });

    return preferred
      .map(([id, entity]) => {
        const friendly = entity.attributes.friendly_name;
        return {
          id,
          label: typeof friendly === "string" && friendly.trim() ? friendly.trim() : id,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label, "da") || a.id.localeCompare(b.id));
  }

  private previewPoints(room: ExplorerRoom): string {
    return room.points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
  }

  private handlePreviewClick(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    const bounds = element.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    this.draftPosition = {
      x: clamp01((event.clientX - bounds.left) / bounds.width),
      y: clamp01((event.clientY - bounds.top) / bounds.height),
    };
  }

  private useRoomAnchor(): void {
    const room = this.selectedRoom;
    if (!room) return;
    this.draftPosition = roomReactionPosition(room);
  }

  private draftPoint(room: ExplorerRoom): NormalizedPosition {
    return this.draftPosition ?? roomReactionPosition(room);
  }

  private renderPlacementPreview(room: ExplorerRoom) {
    const image = this.config?.image ?? this.config?.background ?? "";
    const draft = this.draftPoint(room);
    const reactions = room.reactions ?? [];

    return html`
      <div class="placement-block">
        <div class="placement-heading">
          <div>
            <strong>Fysisk placering på kortet</strong>
            <small>Klik dér hvor entity'en fysisk sidder. Punktet følger plantegningen ved zoom og pan.</small>
          </div>
          <button class="secondary mini" type="button" @click=${this.useRoomAnchor}>Brug rum-anchor</button>
        </div>
        <div class="placement-preview" @click=${this.handlePreviewClick}>
          ${image
            ? html`<img class="preview-floorplan" src=${image} alt="Plantegning til placering af entity-punkt">`
            : nothing}
          <svg
            class="placement-overlay"
            viewBox=${`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            ${room.points.length >= 3
              ? html`<polygon class="selected-room" points=${this.previewPoints(room)}></polygon>`
              : nothing}
            ${reactions.map((reaction, index) => {
              const point = roomReactionPosition(room, reaction);
              const status = this.reactionStatus(reaction, index);
              return html`
                <g
                  class=${`existing-point ${reaction.kind} ${status.active ? "active" : "inactive"}`}
                  transform=${`translate(${point.x * VIEWBOX_SIZE} ${point.y * VIEWBOX_SIZE})`}
                >
                  <circle r="13"></circle>
                  <text text-anchor="middle" dominant-baseline="central">${KIND_GLYPHS[reaction.kind]}</text>
                </g>
              `;
            })}
            <g class=${`draft-point ${this.draftKind}`} transform=${`translate(${draft.x * VIEWBOX_SIZE} ${draft.y * VIEWBOX_SIZE})`}>
              <circle class="draft-halo" r="24"></circle>
              <circle class="draft-core" r="13"></circle>
              <text text-anchor="middle" dominant-baseline="central">${KIND_GLYPHS[this.draftKind]}</text>
            </g>
          </svg>
        </div>
        <small class="coordinates">
          Placering: ${(draft.x * 100).toFixed(1)} % / ${(draft.y * 100).toFixed(1)} %
          ${this.draftPosition ? "· valgt på plantegningen" : "· bruger rum-anchor indtil du klikker"}
        </small>
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const room = this.selectedRoom;
    const reactions = room?.reactions ?? [];
    const entityOptions = this.entityOptions();
    const draftEntityKnown = entityOptions.some((option) => option.id === this.draftEntity);

    return html`
      <section class="reaction-editor">
        <div class="heading">
          <div>
            <span>Living Entity Points · v0.25.3</span>
            <h3>Placér Home Assistant-entities dér hvor de fysisk er</h3>
          </div>
          <b>${this.rooms.reduce((sum, entry) => sum + (entry.reactions?.length ?? 0), 0)} punkter</b>
        </div>

        <div class="instruction">
          Hele rummet bliver ikke længere farvet af en enkelt entity. Hver lampe, bevægelsessensor,
          TV/media player, dør/vindue og temperatursensor får sit eget punkt på plantegningen.
          Lamper bruger stadig <code>brightness</code>, og temperatur vises med den aktuelle værdi.
        </div>

        ${this.rooms.length ? html`
          <label class="room-select">Rum
            <select
              .value=${this.selectedRoomId}
              @change=${(event: Event) => {
                this.selectedRoomId = (event.target as HTMLSelectElement).value;
                this.cancelEdit();
              }}
            >
              ${this.rooms.map((entry) => html`<option value=${entry.id}>${entry.name ?? entry.id}</option>`)}
            </select>
          </label>

          <div class="draft">
            <div class="draft-title">
              <strong>${this.editingIndex === undefined ? "Nyt entity-punkt" : "Redigér entity-punkt"}</strong>
              <span>${room?.name ?? room?.id}</span>
            </div>
            <div class="fields">
              <label>Type
                <select
                  .value=${this.draftKind}
                  @change=${(event: Event) => this.handleKindChange((event.target as HTMLSelectElement).value as RoomReactionKind)}
                >
                  ${(Object.keys(KIND_LABELS) as RoomReactionKind[]).map((kind) =>
                    html`<option value=${kind}>${KIND_LABELS[kind]}</option>`)}
                </select>
              </label>
              <label>Home Assistant entity
                <select
                  .value=${this.draftEntity}
                  @change=${(event: Event) => this.draftEntity = (event.target as HTMLSelectElement).value}
                >
                  <option value="">Vælg entity…</option>
                  ${this.draftEntity && !draftEntityKnown
                    ? html`<option value=${this.draftEntity}>${this.draftEntity} · eksisterende</option>`
                    : nothing}
                  ${entityOptions.map((option) => html`
                    <option value=${option.id}>
                      ${option.label === option.id ? option.id : `${option.label} · ${option.id}`}
                    </option>
                  `)}
                </select>
                <small>${entityOptions.length} relevante entities fundet i Home Assistant.</small>
              </label>
              ${this.draftKind === "temperature"
                ? html`<div class="temperature-note">
                    <strong>Temperatur</strong>
                    <small>Vises automatisk, når sensoren har en numerisk state. Enheden hentes fra Home Assistant.</small>
                  </div>`
                : html`<label>Aktiv state(s)
                    <input
                      .value=${this.draftStates}
                      @input=${(event: InputEvent) => this.draftStates = (event.target as HTMLInputElement).value}
                    >
                    <small>Flere states adskilles med komma.</small>
                  </label>`}
            </div>

            ${room ? this.renderPlacementPreview(room) : nothing}

            ${this.isDuplicate() && this.draftEntity.trim() ? html`
              <div class="duplicate">Denne entity er allerede tilføjet med samme type i rummet.</div>
            ` : nothing}
            <div class="actions">
              <button class="primary" ?disabled=${!this.draftEntity.trim() || this.isDuplicate()} @click=${this.saveReaction}>
                ${this.editingIndex === undefined ? "+ Tilføj punkt" : "Gem ændring"}
              </button>
              ${this.editingIndex !== undefined ? html`<button class="secondary" @click=${this.cancelEdit}>Annuller</button>` : nothing}
            </div>
          </div>

          ${reactions.length ? html`
            <div class="reaction-list">
              ${reactions.map((reaction, index) => {
                const status = this.reactionStatus(reaction, index);
                const point = room ? roomReactionPosition(room, reaction) : { x: 0.5, y: 0.5 };
                return html`
                  <div class=${status.active ? "reaction-item active" : "reaction-item"}>
                    <span class=${`kind ${reaction.kind}`}>${KIND_GLYPHS[reaction.kind]}</span>
                    <span class="copy">
                      <strong>${KIND_LABELS[reaction.kind]}</strong>
                      <small>${reaction.entity}</small>
                      <em class=${status.active ? "status active" : "status"}>${this.statusLabel(reaction, index)}</em>
                      <small>Placering: ${(point.x * 100).toFixed(1)} % / ${(point.y * 100).toFixed(1)} %</small>
                      ${reaction.kind !== "temperature"
                        ? html`<small>Aktiv: ${status.activeStates.join(", ")}</small>`
                        : nothing}
                    </span>
                    <div class="item-actions">
                      <button class="secondary mini" @click=${() => this.beginEdit(index)}>Redigér</button>
                      <button class="danger mini" @click=${() => this.deleteReaction(index)}>Slet</button>
                    </div>
                  </div>
                `;
              })}
            </div>
          ` : html`<div class="empty">Der er endnu ingen entity-punkter i dette rum.</div>`}
        ` : html`<div class="empty">Tegn mindst ét rum først.</div>`}
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.reaction-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty,.duplicate{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.88rem;line-height:1.45}.duplicate{border-left:4px solid var(--warning-color,#ff9800)}.room-select,.fields label{display:grid;gap:6px;font-size:.85rem}.room-select select,.fields select,.fields input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.draft{display:grid;gap:10px;padding:12px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color)}.draft-title{display:flex;justify-content:space-between;gap:10px}.draft-title span,.fields small,.temperature-note small{color:var(--secondary-text-color);font-size:.8rem}.fields{display:grid;grid-template-columns:.8fr 1.4fr 1fr;gap:10px}.temperature-note{display:grid;align-content:start;gap:6px;padding:8px 10px;border:1px dashed var(--divider-color);border-radius:8px;background:var(--card-background-color);font-size:.85rem}.actions,.item-actions{display:flex;gap:7px;flex-wrap:wrap}.reaction-list{display:grid;gap:7px}.reaction-item{display:flex;align-items:center;gap:10px;padding:9px;border:1px solid transparent;border-radius:10px;background:var(--secondary-background-color)}.reaction-item.active{border-color:color-mix(in srgb,var(--primary-color,#03a9f4) 45%,transparent)}.kind{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;font-size:1rem;font-weight:900;background:var(--card-background-color);color:var(--secondary-text-color);flex:none}.kind.light{color:var(--warning-color,#ffb74d)}.kind.motion{color:var(--primary-color,#03a9f4)}.kind.media{color:var(--accent-color,#7e57c2)}.kind.opening{color:var(--warning-color,#ff9800)}.kind.temperature{color:#4f9b78}.copy{display:grid;gap:2px;min-width:0;flex:1}.copy small{color:var(--secondary-text-color);overflow-wrap:anywhere}.status{font-style:normal;font-size:.75rem;font-weight:800;color:var(--secondary-text-color)}.status.active{color:var(--success-color,#43a047)}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--card-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}.placement-block{display:grid;gap:8px}.placement-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.placement-heading>div{display:grid;gap:3px}.placement-heading small,.coordinates{color:var(--secondary-text-color);font-size:.78rem}.placement-preview{position:relative;display:block;width:100%;aspect-ratio:1.55/1;max-height:440px;border:1px solid var(--divider-color);border-radius:10px;overflow:hidden;cursor:crosshair;background:var(--card-background-color);touch-action:manipulation}.preview-floorplan,.placement-overlay{position:absolute;inset:0;width:100%;height:100%}.preview-floorplan{display:block;object-fit:fill;opacity:.92;pointer-events:none;user-select:none;-webkit-user-drag:none}.placement-overlay{display:block;pointer-events:none}.selected-room{fill:var(--primary-color,#03a9f4);fill-opacity:.07;stroke:var(--primary-color,#03a9f4);stroke-opacity:.55;stroke-width:4;vector-effect:non-scaling-stroke}.existing-point circle{fill:var(--card-background-color,#fff);stroke:var(--secondary-text-color,#777);stroke-width:3;vector-effect:non-scaling-stroke}.existing-point.active circle{stroke:var(--success-color,#43a047)}.existing-point text{font-size:16px;font-weight:900;fill:var(--secondary-text-color,#777);pointer-events:none}.existing-point.active text{fill:var(--primary-text-color,#222)}.draft-halo{fill:var(--primary-color,#03a9f4);fill-opacity:.12;stroke:var(--primary-color,#03a9f4);stroke-width:2;stroke-opacity:.45;vector-effect:non-scaling-stroke}.draft-core{fill:var(--card-background-color,#fff);stroke:var(--primary-color,#03a9f4);stroke-width:4;vector-effect:non-scaling-stroke}.draft-point text{font-size:17px;font-weight:900;fill:var(--primary-color,#03a9f4);pointer-events:none}@media(max-width:720px){.fields{grid-template-columns:1fr}.reaction-item{align-items:flex-start}.item-actions{flex-direction:column}.draft-title,.placement-heading{flex-direction:column}.placement-preview{aspect-ratio:1.25/1}}
  `;
}
