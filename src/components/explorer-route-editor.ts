import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ExplorerCardConfig, ExplorerRoute, NormalizedPoint } from "../models/config";

const VIEWBOX_SIZE = 1000;

@customElement("ha-explorer-route-editor")
export class HaExplorerRouteEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  @state() private fromRoom = "";
  @state() private toRoom = "";
  @state() private drawing = false;
  @state() private pending: NormalizedPoint[] = [];

  private get rooms() {
    return this.config?.rooms ?? [];
  }

  private get routes() {
    return this.config?.routes ?? [];
  }

  private emitConfig(config: ExplorerCardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  private mapPoint(event: MouseEvent): NormalizedPoint {
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return [0.5, 0.5];
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    return [x, y];
  }

  private startDrawing(): void {
    if (!this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom) return;
    const existing = this.routes.find((route) =>
      (route.from === this.fromRoom && route.to === this.toRoom) ||
      (route.from === this.toRoom && route.to === this.fromRoom));
    if (existing) {
      this.pending = existing.from === this.fromRoom
        ? [...(existing.via ?? [])]
        : [...(existing.via ?? [])].reverse();
    } else {
      this.pending = [];
    }
    this.drawing = true;
  }

  private handleMapClick(event: MouseEvent): void {
    if (!this.drawing) return;
    this.pending = [...this.pending, this.mapPoint(event)];
  }

  private undo(): void {
    this.pending = this.pending.slice(0, -1);
  }

  private cancel(): void {
    this.drawing = false;
    this.pending = [];
  }

  private save(): void {
    if (!this.config || !this.fromRoom || !this.toRoom) return;
    const routes = this.routes.filter((route) => !(
      (route.from === this.fromRoom && route.to === this.toRoom) ||
      (route.from === this.toRoom && route.to === this.fromRoom)
    ));
    const route: ExplorerRoute = { from: this.fromRoom, to: this.toRoom, via: [...this.pending] };
    this.drawing = false;
    this.pending = [];
    this.emitConfig({ ...this.config, routes: [...routes, route] });
  }

  private deleteRoute(): void {
    if (!this.config || !this.fromRoom || !this.toRoom) return;
    const routes = this.routes.filter((route) => !(
      (route.from === this.fromRoom && route.to === this.toRoom) ||
      (route.from === this.toRoom && route.to === this.fromRoom)
    ));
    this.pending = [];
    this.drawing = false;
    this.emitConfig({ ...this.config, routes });
  }

  private roomAnchor(roomId: string): NormalizedPoint | undefined {
    const room = this.rooms.find((entry) => entry.id === roomId);
    if (!room) return undefined;
    if (room.presence_anchor) return [room.presence_anchor.x, room.presence_anchor.y];
    if (!room.points.length) return undefined;
    return [
      room.points.reduce((sum, point) => sum + point[0], 0) / room.points.length,
      room.points.reduce((sum, point) => sum + point[1], 0) / room.points.length,
    ];
  }

  private renderRoutePreview() {
    if (!this.fromRoom || !this.toRoom) return nothing;
    const start = this.roomAnchor(this.fromRoom);
    const end = this.roomAnchor(this.toRoom);
    if (!start || !end) return nothing;

    let via = this.pending;
    if (!this.drawing) {
      const route = this.routes.find((entry) =>
        (entry.from === this.fromRoom && entry.to === this.toRoom) ||
        (entry.from === this.toRoom && entry.to === this.fromRoom));
      if (route) via = route.from === this.fromRoom ? (route.via ?? []) : [...(route.via ?? [])].reverse();
    }

    const points = [start, ...via, end];
    const line = points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");

    return svg`
      <polyline points=${line} class="route-line" fill="none" vector-effect="non-scaling-stroke"></polyline>
      ${points.map(([x, y], index) => svg`
        <g transform=${`translate(${x * VIEWBOX_SIZE} ${y * VIEWBOX_SIZE})`}>
          <circle class=${index === 0 || index === points.length - 1 ? "endpoint" : "waypoint"} r=${index === 0 || index === points.length - 1 ? "14" : "11"}></circle>
          ${index > 0 && index < points.length - 1
            ? svg`<text y="-20" text-anchor="middle">${index}</text>`
            : nothing}
        </g>
      `)}
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const existing = this.routes.some((route) =>
      (route.from === this.fromRoom && route.to === this.toRoom) ||
      (route.from === this.toRoom && route.to === this.fromRoom));

    return html`
      <section class="route-editor">
        <div class="heading">
          <div><span>Visual Route Editor</span><h3>Tegn bevægelsesruter</h3></div>
          <b>${this.routes.length} ruter</b>
        </div>

        <div class="selectors">
          <label>Fra rum
            <select .value=${this.fromRoom} @change=${(e: Event) => this.fromRoom = (e.target as HTMLSelectElement).value}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
            </select>
          </label>
          <label>Til rum
            <select .value=${this.toRoom} @change=${(e: Event) => this.toRoom = (e.target as HTMLSelectElement).value}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
            </select>
          </label>
        </div>

        <div class="instruction">
          ${this.drawing
            ? html`Tryk på plantegningen i den rækkefølge Marc skal gå gennem døre og gange. Start- og slutpunkt kommer automatisk fra rummenes personpunkter.`
            : html`Vælg to rum og tryk <strong>Tegn/redigér rute</strong>. Waypoints kan placeres direkte på plantegningen.`}
        </div>

        ${image ? html`
          <div class="map-frame">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}>
              <image href=${image} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderRoutePreview()}
            </svg>
          </div>
        ` : html`<div class="empty">Vælg først en plantegning under Kort.</div>`}

        <div class="buttons">
          ${this.drawing ? html`
            <button class="secondary" ?disabled=${!this.pending.length} @click=${this.undo}>Fortryd waypoint</button>
            <button class="primary" @click=${this.save}>Gem rute</button>
            <button class="secondary" @click=${this.cancel}>Annuller</button>
          ` : html`
            <button class="primary" ?disabled=${!this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom} @click=${this.startDrawing}>Tegn/redigér rute</button>
            <button class="danger" ?disabled=${!existing} @click=${this.deleteRoute}>Slet rute</button>
          `}
        </div>
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:crosshair}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:5;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors{grid-template-columns:1fr}}
  `;
}
