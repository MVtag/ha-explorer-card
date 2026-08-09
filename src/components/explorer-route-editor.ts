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
    const map = event.currentTarget as SVGSVGElement;
    const rect = map.getBoundingClientRect();
    if (!rect.width || !rect.height) return [0.5, 0.5];
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    return [x, y];
  }

  private roomName(roomId: string): string {
    const room = this.rooms.find((entry) => entry.id === roomId);
    return room?.name ?? roomId;
  }

  private routeMatchesSelection(route: ExplorerRoute): boolean {
    if (!this.fromRoom || !this.toRoom) return false;
    return (
      (route.from === this.fromRoom && route.to === this.toRoom) ||
      (route.from === this.toRoom && route.to === this.fromRoom)
    );
  }

  private selectRoute(route: ExplorerRoute): void {
    this.fromRoom = route.from;
    this.toRoom = route.to;
    this.drawing = false;
    this.pending = [];
  }

  private startDrawing(): void {
    if (!this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom) return;
    const existing = this.routes.find((route) => this.routeMatchesSelection(route));
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
    const routes = this.routes.filter((route) => !this.routeMatchesSelection(route));
    const route: ExplorerRoute = { from: this.fromRoom, to: this.toRoom, via: [...this.pending] };
    this.drawing = false;
    this.pending = [];
    this.emitConfig({ ...this.config, routes: [...routes, route] });
  }

  private deleteRoute(): void {
    if (!this.config || !this.fromRoom || !this.toRoom) return;
    const routes = this.routes.filter((route) => !this.routeMatchesSelection(route));
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

  private routePoints(route: ExplorerRoute): NormalizedPoint[] | undefined {
    const start = this.roomAnchor(route.from);
    const end = this.roomAnchor(route.to);
    if (!start || !end) return undefined;
    return [start, ...(route.via ?? []), end];
  }

  private renderNetworkRoutes() {
    return this.routes.map((route, index) => {
      if (this.routeMatchesSelection(route)) return nothing;
      const points = this.routePoints(route);
      if (!points) return nothing;
      const line = points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
      return svg`
        <polyline
          points=${line}
          class="network-route"
          fill="none"
          vector-effect="non-scaling-stroke"
          tabindex="0"
          aria-label=${`${this.roomName(route.from)} til ${this.roomName(route.to)}`}
          @click=${(event: MouseEvent) => {
            event.stopPropagation();
            this.selectRoute(route);
          }}
        ></polyline>
        <text
          class="network-number"
          x=${points[Math.floor(points.length / 2)][0] * VIEWBOX_SIZE}
          y=${points[Math.floor(points.length / 2)][1] * VIEWBOX_SIZE - 18}
          text-anchor="middle"
        >${index + 1}</text>
      `;
    });
  }

  private renderRoutePreview() {
    if (!this.fromRoom || !this.toRoom) return nothing;
    const start = this.roomAnchor(this.fromRoom);
    const end = this.roomAnchor(this.toRoom);
    if (!start || !end) return nothing;

    let via = this.pending;
    if (!this.drawing) {
      const route = this.routes.find((entry) => this.routeMatchesSelection(entry));
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

  private renderRouteList() {
    if (!this.routes.length) {
      return html`<div class="route-empty">Der er endnu ingen gemte ruter.</div>`;
    }

    return html`
      <div class="route-list">
        ${this.routes.map((route, index) => {
          const selected = this.routeMatchesSelection(route);
          const waypointCount = route.via?.length ?? 0;
          return html`
            <button
              type="button"
              class=${selected ? "route-item selected" : "route-item"}
              @click=${() => this.selectRoute(route)}
            >
              <span class="route-index">${index + 1}</span>
              <span class="route-copy">
                <strong>${this.roomName(route.from)} ↔ ${this.roomName(route.to)}</strong>
                <small>${waypointCount} waypoint${waypointCount === 1 ? "" : "s"}</small>
              </span>
            </button>
          `;
        })}
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const existing = this.routes.some((route) => this.routeMatchesSelection(route));

    return html`
      <section class="route-editor">
        <div class="heading">
          <div><span>Route Network Manager</span><h3>Administrér bevægelsesruter</h3></div>
          <b>${this.routes.length} ruter</b>
        </div>

        ${this.renderRouteList()}

        <div class="selectors">
          <label>Fra rum
            <select .value=${this.fromRoom} @change=${(e: Event) => {
              this.fromRoom = (e.target as HTMLSelectElement).value;
              this.drawing = false;
              this.pending = [];
            }}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
            </select>
          </label>
          <label>Til rum
            <select .value=${this.toRoom} @change=${(e: Event) => {
              this.toRoom = (e.target as HTMLSelectElement).value;
              this.drawing = false;
              this.pending = [];
            }}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
            </select>
          </label>
        </div>

        <div class="instruction">
          ${this.drawing
            ? html`Tryk på plantegningen i den rækkefølge personen skal gå gennem døre og gange. Start- og slutpunkt kommer automatisk fra rummenes personpunkter.`
            : html`Alle gemte ruter vises svagt på kortet. Tryk på en rute i listen eller direkte på kortet for at vælge den, eller vælg to rum for at oprette en ny.`}
        </div>

        ${image ? html`
          <div class=${this.drawing ? "map-frame drawing" : "map-frame"}>
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}>
              <image href=${image} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderNetworkRoutes()}
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
            <button class="primary" ?disabled=${!this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom} @click=${this.startDrawing}>${existing ? "Redigér valgt rute" : "Tegn ny rute"}</button>
            <button class="danger" ?disabled=${!existing} @click=${this.deleteRoute}>Slet valgt rute</button>
          `}
        </div>
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.route-list{display:grid;gap:7px}.route-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid transparent}.route-item.selected{border-color:var(--primary-color,#03a9f4);box-shadow:0 0 0 1px var(--primary-color,#03a9f4) inset}.route-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.route-copy{display:grid;gap:2px}.route-copy small{color:var(--secondary-text-color);font-weight:500}.route-empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:default}.map-frame.drawing svg{cursor:crosshair}.network-route{stroke:var(--secondary-text-color);stroke-opacity:.36;stroke-width:4;stroke-dasharray:10 10;pointer-events:stroke;cursor:pointer}.network-route:hover{stroke:var(--primary-color,#03a9f4);stroke-opacity:.8;stroke-width:7}.network-number{font-size:22px;font-weight:800;fill:var(--secondary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:7;stroke-linejoin:round;pointer-events:none}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:6;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors{grid-template-columns:1fr}}
  `;
}
