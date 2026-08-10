import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRoute,
  ExplorerRouteNode,
  ExplorerRouteStep,
  NormalizedPoint,
  RouteNodeKind,
} from "../models/config";

const VIEWBOX_SIZE = 1000;

@customElement("ha-explorer-route-editor")
export class HaExplorerRouteEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  @state() private fromRoom = "";
  @state() private toRoom = "";
  @state() private drawing = false;
  @state() private pending: ExplorerRouteStep[] = [];
  @state() private placingNode = false;
  @state() private draftNodeName = "";
  @state() private draftNodeKind: RouteNodeKind = "door";

  private get rooms() {
    return this.config?.rooms ?? [];
  }

  private get routes() {
    return this.config?.routes ?? [];
  }

  private get routeNodes() {
    return this.config?.route_nodes ?? [];
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

  private nodeName(node: ExplorerRouteNode): string {
    return node.name?.trim() || node.id;
  }

  private routeMatchesSelection(route: ExplorerRoute): boolean {
    if (!this.fromRoom || !this.toRoom) return false;
    return (
      (route.from === this.fromRoom && route.to === this.toRoom) ||
      (route.from === this.toRoom && route.to === this.fromRoom)
    );
  }

  private routeSteps(route: ExplorerRoute): ExplorerRouteStep[] {
    if (route.path) return route.path;
    return (route.via ?? []).map((point) => ({ point }));
  }

  private resolveStep(step: ExplorerRouteStep): NormalizedPoint | undefined {
    if (step.node_id) return this.routeNodes.find((node) => node.id === step.node_id)?.point;
    return step.point;
  }

  private selectRoute(route: ExplorerRoute): void {
    this.fromRoom = route.from;
    this.toRoom = route.to;
    this.drawing = false;
    this.placingNode = false;
    this.pending = [];
  }

  private startDrawing(): void {
    if (!this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom) return;
    const existing = this.routes.find((route) => this.routeMatchesSelection(route));
    if (existing) {
      const steps = this.routeSteps(existing);
      this.pending = existing.from === this.fromRoom ? [...steps] : [...steps].reverse();
    } else {
      this.pending = [];
    }
    this.placingNode = false;
    this.drawing = true;
  }

  private beginPlaceNode(): void {
    if (this.drawing) return;
    this.draftNodeName = `Dørpunkt ${this.routeNodes.length + 1}`;
    this.draftNodeKind = "door";
    this.placingNode = true;
  }

  private cancelPlaceNode(): void {
    this.placingNode = false;
    this.draftNodeName = "";
  }

  private uniqueNodeId(): string {
    const used = new Set(this.routeNodes.map((node) => node.id));
    let index = this.routeNodes.length + 1;
    while (used.has(`route_node_${index}`)) index += 1;
    return `route_node_${index}`;
  }

  private addSharedNode(point: NormalizedPoint): void {
    if (!this.config) return;
    const node: ExplorerRouteNode = {
      id: this.uniqueNodeId(),
      name: this.draftNodeName.trim() || `Dørpunkt ${this.routeNodes.length + 1}`,
      kind: this.draftNodeKind,
      point,
    };
    this.placingNode = false;
    this.draftNodeName = "";
    this.emitConfig({ ...this.config, route_nodes: [...this.routeNodes, node] });
  }

  private handleMapClick(event: MouseEvent): void {
    if (this.placingNode) {
      this.addSharedNode(this.mapPoint(event));
      return;
    }
    if (!this.drawing) return;
    this.pending = [...this.pending, { point: this.mapPoint(event) }];
  }

  private useSharedNode(event: MouseEvent, node: ExplorerRouteNode): void {
    event.stopPropagation();
    if (!this.drawing || this.placingNode) return;
    const last = this.pending[this.pending.length - 1];
    if (last?.node_id === node.id) return;
    this.pending = [...this.pending, { node_id: node.id }];
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
    const route: ExplorerRoute = {
      from: this.fromRoom,
      to: this.toRoom,
      path: this.pending.map((step) => ({
        ...(step.node_id ? { node_id: step.node_id } : {}),
        ...(step.point ? { point: [...step.point] as NormalizedPoint } : {}),
      })),
    };
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

  private nodeUsageCount(nodeId: string): number {
    return this.routes.reduce(
      (sum, route) => sum + this.routeSteps(route).filter((step) => step.node_id === nodeId).length,
      0,
    );
  }

  private deleteNode(node: ExplorerRouteNode): void {
    if (!this.config || this.nodeUsageCount(node.id) > 0) return;
    this.emitConfig({
      ...this.config,
      route_nodes: this.routeNodes.filter((entry) => entry.id !== node.id),
    });
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
    const middle = this.routeSteps(route)
      .map((step) => this.resolveStep(step))
      .filter((point): point is NormalizedPoint => Boolean(point));
    return [start, ...middle, end];
  }

  private renderSharedNodes() {
    return this.routeNodes.map((node) => {
      const usage = this.nodeUsageCount(node.id);
      const [x, y] = node.point;
      return svg`
        <g
          class=${this.drawing ? "shared-node selectable" : "shared-node"}
          transform=${`translate(${x * VIEWBOX_SIZE} ${y * VIEWBOX_SIZE})`}
          @click=${(event: MouseEvent) => this.useSharedNode(event, node)}
        >
          <circle r="15"></circle>
          <text y="-24" text-anchor="middle">${this.nodeName(node)}</text>
          ${usage > 0 ? svg`<text class="usage" y="7" text-anchor="middle">${usage}</text>` : nothing}
        </g>
      `;
    });
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
            if (!this.drawing && !this.placingNode) this.selectRoute(route);
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

    let steps = this.pending;
    if (!this.drawing) {
      const route = this.routes.find((entry) => this.routeMatchesSelection(entry));
      if (route) {
        const stored = this.routeSteps(route);
        steps = route.from === this.fromRoom ? stored : [...stored].reverse();
      }
    }

    const resolved = steps
      .map((step) => ({ step, point: this.resolveStep(step) }))
      .filter((entry): entry is { step: ExplorerRouteStep; point: NormalizedPoint } => Boolean(entry.point));
    const points = [start, ...resolved.map((entry) => entry.point), end];
    const line = points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");

    return svg`
      <polyline points=${line} class="route-line" fill="none" vector-effect="non-scaling-stroke"></polyline>
      <g transform=${`translate(${start[0] * VIEWBOX_SIZE} ${start[1] * VIEWBOX_SIZE})`}><circle class="endpoint" r="14"></circle></g>
      ${resolved.map(({ step, point }, index) => svg`
        <g transform=${`translate(${point[0] * VIEWBOX_SIZE} ${point[1] * VIEWBOX_SIZE})`}>
          <circle class=${step.node_id ? "waypoint shared-waypoint" : "waypoint"} r="11"></circle>
          <text y="-20" text-anchor="middle">${index + 1}</text>
        </g>
      `)}
      <g transform=${`translate(${end[0] * VIEWBOX_SIZE} ${end[1] * VIEWBOX_SIZE})`}><circle class="endpoint" r="14"></circle></g>
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
          const steps = this.routeSteps(route);
          const sharedCount = steps.filter((step) => Boolean(step.node_id)).length;
          const localCount = steps.filter((step) => Boolean(step.point)).length;
          return html`
            <button
              type="button"
              class=${selected ? "route-item selected" : "route-item"}
              @click=${() => this.selectRoute(route)}
            >
              <span class="route-index">${index + 1}</span>
              <span class="route-copy">
                <strong>${this.roomName(route.from)} ↔ ${this.roomName(route.to)}</strong>
                <small>${sharedCount} fælles · ${localCount} lokale punkter</small>
              </span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private renderNodeManager() {
    return html`
      <div class="node-manager">
        <div class="node-heading">
          <div><strong>Fælles dør- og gangpunkter</strong><small>Genbrug samme punkt i flere ruter.</small></div>
          <span>${this.routeNodes.length} punkter</span>
        </div>

        ${this.routeNodes.length ? html`
          <div class="node-list">
            ${this.routeNodes.map((node) => {
              const usage = this.nodeUsageCount(node.id);
              return html`
                <div class="node-item">
                  <span class=${`node-dot ${node.kind ?? "waypoint"}`}></span>
                  <span class="node-copy"><strong>${this.nodeName(node)}</strong><small>${node.kind ?? "waypoint"} · bruges ${usage} ${usage === 1 ? "gang" : "gange"}</small></span>
                  <button class="mini danger" ?disabled=${usage > 0} title=${usage > 0 ? "Punktet bruges af en rute" : "Slet punkt"} @click=${() => this.deleteNode(node)}>Slet</button>
                </div>
              `;
            })}
          </div>
        ` : html`<div class="route-empty">Ingen fælles punkter endnu.</div>`}

        ${this.placingNode ? html`
          <div class="node-draft">
            <label>Navn<input .value=${this.draftNodeName} @input=${(event: InputEvent) => this.draftNodeName = (event.target as HTMLInputElement).value}></label>
            <label>Type<select .value=${this.draftNodeKind} @change=${(event: Event) => this.draftNodeKind = (event.target as HTMLSelectElement).value as RouteNodeKind}><option value="door">Dør</option><option value="junction">Kryds/gang</option><option value="waypoint">Waypoint</option></select></label>
            <button class="secondary" @click=${this.cancelPlaceNode}>Annuller</button>
          </div>
          <div class="instruction">Tryk nu på plantegningen dér, hvor det fælles punkt skal ligge.</div>
        ` : html`
          <button class="secondary node-add" ?disabled=${this.drawing} @click=${this.beginPlaceNode}>+ Placér fælles punkt</button>
        `}
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
          <div><span>Shared Route Nodes</span><h3>Administrér ruter og fælles dørpunkter</h3></div>
          <b>${this.routes.length} ruter</b>
        </div>

        ${this.renderNodeManager()}
        ${this.renderRouteList()}

        <div class="selectors">
          <label>Fra rum
            <select .value=${this.fromRoom} ?disabled=${this.placingNode} @change=${(e: Event) => {
              this.fromRoom = (e.target as HTMLSelectElement).value;
              this.drawing = false;
              this.pending = [];
            }}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
            </select>
          </label>
          <label>Til rum
            <select .value=${this.toRoom} ?disabled=${this.placingNode} @change=${(e: Event) => {
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
            ? html`Tryk på et <strong>fælles punkt</strong> for at genbruge det i ruten, eller tryk et andet sted på plantegningen for at lave et lokalt waypoint.`
            : this.placingNode
              ? html`Placér det nye fælles punkt direkte på plantegningen.`
              : html`Fælles punkter kan bruges af flere ruter. Vælg en rute eller to rum for at tegne videre.`}
        </div>

        ${image ? html`
          <div class=${this.drawing || this.placingNode ? "map-frame drawing" : "map-frame"}>
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}>
              <image href=${image} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderNetworkRoutes()}
              ${this.renderRoutePreview()}
              ${this.renderSharedNodes()}
            </svg>
          </div>
        ` : html`<div class="empty">Vælg først en plantegning under Kort.</div>`}

        <div class="buttons">
          ${this.drawing ? html`
            <button class="secondary" ?disabled=${!this.pending.length} @click=${this.undo}>Fortryd waypoint</button>
            <button class="primary" @click=${this.save}>Gem rute</button>
            <button class="secondary" @click=${this.cancel}>Annuller</button>
          ` : html`
            <button class="primary" ?disabled=${this.placingNode || !this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom} @click=${this.startDrawing}>${existing ? "Redigér valgt rute" : "Tegn ny rute"}</button>
            <button class="danger" ?disabled=${this.placingNode || !existing} @click=${this.deleteRoute}>Slet valgt rute</button>
          `}
        </div>
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading,.node-heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b,.node-heading>span{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.node-manager{display:grid;gap:9px;padding:12px;border:1px solid var(--divider-color);border-radius:12px}.node-heading>div,.node-copy{display:grid;gap:2px}.node-heading small,.node-copy small{color:var(--secondary-text-color);font-weight:500}.node-list{display:grid;gap:6px}.node-item{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:9px;background:var(--secondary-background-color)}.node-copy{flex:1}.node-dot{width:13px;height:13px;border-radius:50%;background:var(--primary-color,#03a9f4)}.node-dot.junction{border-radius:3px}.node-dot.waypoint{background:var(--secondary-text-color)}.node-draft{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;align-items:end}.node-draft label{display:grid;gap:5px;font-size:.82rem}.node-draft input,.node-draft select{padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.node-add{justify-self:start}.route-list{display:grid;gap:7px}.route-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid transparent}.route-item.selected{border-color:var(--primary-color,#03a9f4);box-shadow:0 0 0 1px var(--primary-color,#03a9f4) inset}.route-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.route-copy{display:grid;gap:2px}.route-copy small{color:var(--secondary-text-color);font-weight:500}.route-empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:default}.map-frame.drawing svg{cursor:crosshair}.network-route{stroke:var(--secondary-text-color);stroke-opacity:.36;stroke-width:4;stroke-dasharray:10 10;pointer-events:stroke;cursor:pointer}.network-route:hover{stroke:var(--primary-color,#03a9f4);stroke-opacity:.8;stroke-width:7}.network-number{font-size:22px;font-weight:800;fill:var(--secondary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:7;stroke-linejoin:round;pointer-events:none}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:6;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-waypoint{fill:var(--primary-color,#03a9f4);stroke:white}.shared-node circle{fill:var(--card-background-color);stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-node.selectable{cursor:pointer}.shared-node.selectable:hover circle{fill:var(--primary-color,#03a9f4)}.shared-node text{font-size:20px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6;stroke-linejoin:round;pointer-events:none}.shared-node .usage{font-size:16px;stroke:none;fill:var(--primary-text-color)}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.mini{padding:6px 8px;font-size:.76rem}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors,.node-draft{grid-template-columns:1fr}.node-draft button{justify-self:start}}
  `;
}
