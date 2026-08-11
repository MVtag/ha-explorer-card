import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerZone,
  ExplorerZoneKind,
  NormalizedPoint,
} from "../models/config";
import type { HassEntity, HomeAssistant } from "../types";
import { evaluateZone } from "../utils/zones";

const VIEWBOX_SIZE = 1000;
const ZONE_KINDS: Array<{ value: ExplorerZoneKind; label: string }> = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Advarsel" },
  { value: "danger", label: "Fare / alarm" },
  { value: "cleaning", label: "Rengøring" },
  { value: "restricted", label: "Begrænset område" },
];

function clampNormalized(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function slugify(value: string): string {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || "zone";
}

function friendlyName(entity: HassEntity): string {
  const name = entity.attributes.friendly_name;
  return typeof name === "string" && name.trim() ? name : entity.entity_id;
}

function parseStates(raw: string): string[] | undefined {
  const states = [...new Set(raw.split(",").map((state) => state.trim()).filter(Boolean))];
  return states.length ? states : undefined;
}

@customElement("ha-explorer-zones-editor")
export class HaExplorerZonesEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  @state() private selectedZoneId = "";
  @state() private drawing = false;
  @state() private pendingPoints: NormalizedPoint[] = [];
  @state() private draftName = "Ny zone";
  @state() private draftKind: ExplorerZoneKind = "info";
  @state() private draftEntity = "";
  @state() private draftStates = "on";
  @state() private draftVisible = true;

  private get zones(): ExplorerZone[] {
    return this.config?.zones ?? [];
  }

  private get selectedZone(): ExplorerZone | undefined {
    return this.zones.find((zone) => zone.id === this.selectedZoneId);
  }

  private get entities(): HassEntity[] {
    return Object.values(this.hass?.states ?? {}).sort((a, b) =>
      friendlyName(a).localeCompare(friendlyName(b), "da"),
    );
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("config") && this.selectedZoneId && !this.selectedZone) {
      this.selectedZoneId = "";
      this.drawing = false;
      this.pendingPoints = [];
    }
  }

  private emitConfig(config: ExplorerCardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  private mapPoint(event: MouseEvent): NormalizedPoint {
    const svgElement = event.currentTarget as SVGSVGElement;
    const rect = svgElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return [0.5, 0.5];
    return [
      clampNormalized((event.clientX - rect.left) / rect.width),
      clampNormalized((event.clientY - rect.top) / rect.height),
    ];
  }

  private handleMapClick(event: MouseEvent): void {
    if (!this.drawing) return;
    this.pendingPoints = [...this.pendingPoints, this.mapPoint(event)];
  }

  private uniqueZoneId(name: string): string {
    const base = slugify(name);
    const used = new Set(this.zones.map((zone) => zone.id));
    if (!used.has(base)) return base;
    let number = 2;
    while (used.has(`${base}_${number}`)) number += 1;
    return `${base}_${number}`;
  }

  private beginNew(): void {
    this.selectedZoneId = "";
    this.drawing = true;
    this.pendingPoints = [];
    this.draftName = `Zone ${this.zones.length + 1}`;
    this.draftKind = "info";
    this.draftEntity = "";
    this.draftStates = "on";
    this.draftVisible = true;
  }

  private selectZone(zone: ExplorerZone): void {
    this.selectedZoneId = zone.id;
    this.drawing = false;
    this.pendingPoints = [];
    this.draftName = zone.name ?? zone.id;
    this.draftKind = zone.kind ?? "info";
    this.draftEntity = zone.state_binding?.entity ?? "";
    this.draftStates = (zone.state_binding?.active_states ?? ["on"]).join(", ");
    this.draftVisible = zone.visible !== false;
  }

  private beginRedraw(): void {
    if (!this.selectedZone) return;
    this.drawing = true;
    this.pendingPoints = [];
  }

  private cancelDrawing(): void {
    this.drawing = false;
    this.pendingPoints = [];
  }

  private undoPoint(): void {
    this.pendingPoints = this.pendingPoints.slice(0, -1);
  }

  private zoneFromDraft(id: string, points: NormalizedPoint[]): ExplorerZone {
    const entity = this.draftEntity.trim();
    return {
      id,
      name: this.draftName.trim() || id,
      points,
      kind: this.draftKind,
      visible: this.draftVisible,
      ...(entity
        ? {
            state_binding: {
              entity,
              active_states: parseStates(this.draftStates),
            },
          }
        : {}),
    };
  }

  private saveNew(): void {
    if (!this.config || this.selectedZone || this.pendingPoints.length < 3) return;
    const id = this.uniqueZoneId(this.draftName.trim() || "zone");
    const zone = this.zoneFromDraft(id, this.pendingPoints);
    this.selectedZoneId = id;
    this.drawing = false;
    this.pendingPoints = [];
    this.emitConfig({ ...this.config, zones: [...this.zones, zone] });
  }

  private saveExisting(): void {
    if (!this.config || !this.selectedZone) return;
    const points = this.drawing && this.pendingPoints.length >= 3
      ? this.pendingPoints
      : this.selectedZone.points;
    const replacement = this.zoneFromDraft(this.selectedZone.id, points);
    const zones = this.zones.map((zone) => zone.id === replacement.id ? replacement : zone);
    this.drawing = false;
    this.pendingPoints = [];
    this.emitConfig({ ...this.config, zones });
  }

  private deleteSelected(): void {
    if (!this.config || !this.selectedZone) return;
    const id = this.selectedZone.id;
    const zones = this.zones.filter((zone) => zone.id !== id);
    this.selectedZoneId = "";
    this.drawing = false;
    this.pendingPoints = [];
    this.emitConfig({ ...this.config, zones });
  }

  private statusText(zone: ExplorerZone): string {
    const status = evaluateZone(zone, (entityId) => this.hass?.states[entityId]?.state);
    if (zone.visible === false) return "Skjult manuelt";
    if (!status.conditional) return "Altid aktiv";
    if (status.active) return `Aktiv · ${status.currentState ?? "ukendt"}`;
    if (status.reason === "missing_entity") return "Entity mangler";
    if (status.reason === "entity_unavailable") return `Utilgængelig · ${status.currentState}`;
    return `Inaktiv · ${status.currentState ?? "ukendt"}`;
  }

  private renderZonePolygon(zone: ExplorerZone) {
    const points = zone.points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
    const selected = zone.id === this.selectedZoneId;
    return svg`
      <g class=${selected ? "zone selected" : "zone"} @click=${(event: MouseEvent) => {
        if (this.drawing) return;
        event.stopPropagation();
        this.selectZone(zone);
      }}>
        <polygon points=${points}></polygon>
        ${zone.name ? svg`<text x=${zone.points.reduce((sum, p) => sum + p[0], 0) / zone.points.length * VIEWBOX_SIZE} y=${zone.points.reduce((sum, p) => sum + p[1], 0) / zone.points.length * VIEWBOX_SIZE} text-anchor="middle">${zone.name}</text>` : nothing}
      </g>
    `;
  }

  private renderPending() {
    if (!this.pendingPoints.length) return nothing;
    const points = this.pendingPoints.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
    return svg`
      ${this.pendingPoints.length >= 3 ? svg`<polygon class="pending-fill" points=${points}></polygon>` : nothing}
      <polyline class="pending-line" points=${points}></polyline>
      ${this.pendingPoints.map(([x, y], index) => svg`
        <g transform=${`translate(${x * VIEWBOX_SIZE} ${y * VIEWBOX_SIZE})`}>
          <circle class="pending-point" r="12"></circle>
          <text class="point-number" y="-20" text-anchor="middle">${index + 1}</text>
        </g>
      `)}
    `;
  }

  private renderForm() {
    if (!this.drawing && !this.selectedZone) return nothing;
    const entityListId = "explorer-zone-entities";
    return html`
      <div class="form-grid">
        <label>
          Navn
          <input .value=${this.draftName} @input=${(event: InputEvent) => this.draftName = (event.target as HTMLInputElement).value} />
        </label>
        <label>
          Zonetype
          <select .value=${this.draftKind} @change=${(event: Event) => this.draftKind = (event.target as HTMLSelectElement).value as ExplorerZoneKind}>
            ${ZONE_KINDS.map((kind) => html`<option value=${kind.value}>${kind.label}</option>`)}
          </select>
        </label>
        <label class="wide">
          Home Assistant entity · valgfri
          <input list=${entityListId} .value=${this.draftEntity} placeholder="input_boolean.alarm_zone" @change=${(event: Event) => this.draftEntity = (event.target as HTMLInputElement).value} />
          <datalist id=${entityListId}>
            ${this.entities.map((entity) => html`<option value=${entity.entity_id}>${friendlyName(entity)}</option>`)}
          </datalist>
          <small>Tom = zonen er altid aktiv. Med entity vises zonen kun i de valgte states.</small>
        </label>
        <label>
          Aktiv state(s)
          <input .value=${this.draftStates} placeholder="on" @change=${(event: Event) => this.draftStates = (event.target as HTMLInputElement).value} />
          <small>Kommasepareret, fx on, triggered.</small>
        </label>
        <label class="toggle">
          <input type="checkbox" .checked=${this.draftVisible} @change=${(event: Event) => this.draftVisible = (event.target as HTMLInputElement).checked} />
          Zone aktiveret
        </label>
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const creating = this.drawing && !this.selectedZone;
    const redrawing = this.drawing && Boolean(this.selectedZone);

    return html`
      <section class="panel">
        <div class="heading">
          <div>
            <span class="eyebrow">Zones / Dynamic Areas · v0.23</span>
            <h3>Dynamiske zoner</h3>
            <p>Tegn områder på kortet og lad dem være faste eller følge en Home Assistant-entity.</p>
          </div>
          <span class="count">${this.zones.length} zoner</span>
        </div>

        <div class="workspace">
          <div class="map-wrap">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}>
              <rect width="1000" height="1000" class="backdrop"></rect>
              ${image ? svg`<image href=${image} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : nothing}
              ${this.zones.map((zone) => this.renderZonePolygon(zone))}
              ${this.renderPending()}
            </svg>
            ${this.drawing ? html`<div class="map-help">Klik rundt langs zonens kant · ${this.pendingPoints.length} punkter</div>` : nothing}
          </div>

          <div class="sidebar">
            <button class="primary" @click=${this.beginNew} ?disabled=${creating}>+ Ny zone</button>
            ${this.zones.length ? html`
              <div class="zone-list">
                ${this.zones.map((zone) => html`
                  <button class=${zone.id === this.selectedZoneId ? "zone-row selected" : "zone-row"} @click=${() => this.selectZone(zone)}>
                    <span><strong>${zone.name ?? zone.id}</strong><small>${ZONE_KINDS.find((kind) => kind.value === (zone.kind ?? "info"))?.label}</small></span>
                    <em>${this.statusText(zone)}</em>
                  </button>
                `)}
              </div>
            ` : html`<div class="empty">Ingen zoner endnu.</div>`}
          </div>
        </div>

        ${this.renderForm()}

        ${creating ? html`
          <div class="actions">
            <button @click=${this.undoPoint} ?disabled=${!this.pendingPoints.length}>Fortryd punkt</button>
            <button @click=${this.cancelDrawing}>Annuller</button>
            <button class="primary" @click=${this.saveNew} ?disabled=${this.pendingPoints.length < 3}>Gem zone</button>
          </div>
        ` : this.selectedZone ? html`
          <div class="actions">
            ${redrawing
              ? html`<button @click=${this.undoPoint} ?disabled=${!this.pendingPoints.length}>Fortryd punkt</button><button @click=${this.cancelDrawing}>Annuller ny geometri</button>`
              : html`<button @click=${this.beginRedraw}>Tegn zone om</button>`}
            <button class="danger" @click=${this.deleteSelected}>Slet zone</button>
            <button class="primary" @click=${this.saveExisting} ?disabled=${redrawing && this.pendingPoints.length < 3}>Gem zone</button>
          </div>
        ` : nothing}

        <div class="note">I v0.23 er zoner visuelle. De ændrer ikke automatisk routing; den kobling kan tilføjes senere uden at ændre zonedata.</div>
      </section>
    `;
  }

  static styles = css`
    :host { display:block; margin-top:16px; color:var(--primary-text-color); }
    .panel { border:1px solid var(--divider-color,#d7dbe0); border-radius:14px; padding:16px; background:var(--card-background-color,#fff); }
    .heading { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; }
    .eyebrow { font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:var(--secondary-text-color); }
    h3 { margin:4px 0 4px; font-size:1.05rem; }
    p { margin:0; color:var(--secondary-text-color); font-size:.86rem; }
    .count { padding:5px 9px; border-radius:999px; background:var(--secondary-background-color,#f2f4f7); font-size:.75rem; white-space:nowrap; }
    .workspace { display:grid; grid-template-columns:minmax(0,1.7fr) minmax(190px,.8fr); gap:14px; margin-top:14px; }
    .map-wrap { position:relative; min-height:300px; border-radius:12px; overflow:hidden; border:1px solid var(--divider-color,#d7dbe0); background:#d8c9a7; }
    svg { width:100%; height:100%; min-height:300px; display:block; cursor:crosshair; }
    .backdrop { fill:#d8c9a7; }
    .zone { cursor:pointer; pointer-events:all; }
    .zone polygon { fill:var(--primary-color,#03a9f4); fill-opacity:.10; stroke:var(--primary-color,#03a9f4); stroke-width:3; vector-effect:non-scaling-stroke; }
    .zone.selected polygon { fill-opacity:.20; stroke-width:5; }
    .zone text { fill:var(--primary-text-color,#1f2937); stroke:rgba(255,255,255,.9); stroke-width:5; paint-order:stroke; font-size:22px; font-weight:700; pointer-events:none; }
    .pending-fill { fill:var(--accent-color,#7e57c2); fill-opacity:.16; stroke:none; }
    .pending-line { fill:none; stroke:var(--accent-color,#7e57c2); stroke-width:5; stroke-dasharray:12 8; vector-effect:non-scaling-stroke; }
    .pending-point { fill:var(--accent-color,#7e57c2); stroke:white; stroke-width:3; vector-effect:non-scaling-stroke; }
    .point-number { fill:var(--primary-text-color); stroke:white; stroke-width:4; paint-order:stroke; font-size:18px; font-weight:800; }
    .map-help { position:absolute; left:10px; bottom:10px; padding:6px 9px; border-radius:8px; background:rgba(255,255,255,.88); color:#344054; font-size:.75rem; pointer-events:none; }
    .sidebar { display:flex; flex-direction:column; gap:10px; min-width:0; }
    button { border:1px solid var(--divider-color,#cfd4da); border-radius:9px; padding:9px 11px; background:var(--card-background-color,#fff); color:var(--primary-text-color); cursor:pointer; text-align:left; }
    button:disabled { opacity:.45; cursor:not-allowed; }
    button.primary { background:var(--primary-color,#03a9f4); color:white; border-color:transparent; text-align:center; font-weight:700; }
    button.danger { color:var(--error-color,#db4437); }
    .zone-list { display:flex; flex-direction:column; gap:7px; max-height:330px; overflow:auto; }
    .zone-row { display:flex; justify-content:space-between; gap:8px; align-items:center; width:100%; }
    .zone-row.selected { border-color:var(--primary-color); box-shadow:0 0 0 1px var(--primary-color); }
    .zone-row span { display:flex; flex-direction:column; min-width:0; }
    .zone-row strong { overflow:hidden; text-overflow:ellipsis; }
    .zone-row small, .zone-row em { color:var(--secondary-text-color); font-size:.68rem; font-style:normal; }
    .zone-row em { text-align:right; }
    .empty { padding:12px; border:1px dashed var(--divider-color); border-radius:10px; color:var(--secondary-text-color); font-size:.8rem; }
    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 12px; margin-top:14px; padding-top:14px; border-top:1px solid var(--divider-color,#d7dbe0); }
    label { display:flex; flex-direction:column; gap:5px; font-size:.78rem; font-weight:650; }
    label.wide { grid-column:1 / -1; }
    label.toggle { flex-direction:row; align-items:center; align-self:end; padding-bottom:8px; }
    input, select { box-sizing:border-box; width:100%; border:1px solid var(--divider-color,#cfd4da); border-radius:8px; padding:8px 9px; background:var(--card-background-color,#fff); color:var(--primary-text-color); }
    label small { color:var(--secondary-text-color); font-weight:400; }
    .actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; margin-top:12px; }
    .actions button { text-align:center; }
    .note { margin-top:12px; padding:9px 11px; border-radius:9px; background:var(--secondary-background-color,#f3f5f7); color:var(--secondary-text-color); font-size:.75rem; }
    @media (max-width:700px) { .workspace { grid-template-columns:1fr; } .form-grid { grid-template-columns:1fr; } label.wide { grid-column:auto; } }
  `;
}
