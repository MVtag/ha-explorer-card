import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRouteGraphEdge,
  ExplorerRouteGraphEndpoint,
  NormalizedPoint,
  RouteGraphEndpointKind,
} from "../models/config";

const VIEWBOX_SIZE = 1000;

interface GraphEndpointOption {
  key: string;
  label: string;
  kind: RouteGraphEndpointKind;
  id: string;
  point?: NormalizedPoint;
}

@customElement("ha-explorer-route-graph-editor")
export class HaExplorerRouteGraphEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  @state() private fromKey = "";
  @state() private toKey = "";

  private get rooms() {
    return this.config?.rooms ?? [];
  }

  private get routeNodes() {
    return this.config?.route_nodes ?? [];
  }

  private get graphEdges() {
    return this.config?.route_graph_edges ?? [];
  }

  private emitConfig(config: ExplorerCardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
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

  private endpointKey(endpoint: ExplorerRouteGraphEndpoint): string {
    return `${endpoint.kind}:${endpoint.id}`;
  }

  private parseEndpoint(key: string): ExplorerRouteGraphEndpoint | undefined {
    const separator = key.indexOf(":");
    if (separator <= 0) return undefined;
    const kind = key.slice(0, separator);
    const id = key.slice(separator + 1);
    if ((kind !== "room" && kind !== "node") || !id) return undefined;
    return { kind, id };
  }

  private endpointOptions(): GraphEndpointOption[] {
    const roomOptions = this.rooms.map((room) => ({
      key: `room:${room.id}`,
      label: `Rum · ${room.name ?? room.id}`,
      kind: "room" as const,
      id: room.id,
      point: this.roomAnchor(room.id),
    }));
    const nodeOptions = this.routeNodes.map((node) => ({
      key: `node:${node.id}`,
      label: `${node.kind === "door" ? "Dør" : node.kind === "junction" ? "Gang" : "Punkt"} · ${node.name ?? node.id}`,
      kind: "node" as const,
      id: node.id,
      point: node.point,
    }));
    return [...roomOptions, ...nodeOptions];
  }

  private endpointLabel(endpoint: ExplorerRouteGraphEndpoint): string {
    const key = this.endpointKey(endpoint);
    return this.endpointOptions().find((option) => option.key === key)?.label ?? key;
  }

  private endpointPoint(endpoint: ExplorerRouteGraphEndpoint): NormalizedPoint | undefined {
    if (endpoint.kind === "room") return this.roomAnchor(endpoint.id);
    return this.routeNodes.find((node) => node.id === endpoint.id)?.point;
  }

  private canonicalEdgeKey(edge: ExplorerRouteGraphEdge): string {
    return [this.endpointKey(edge.from), this.endpointKey(edge.to)].sort().join("|");
  }

  private canAdd(): boolean {
    if (!this.fromKey || !this.toKey || this.fromKey === this.toKey) return false;
    const from = this.parseEndpoint(this.fromKey);
    const to = this.parseEndpoint(this.toKey);
    if (!from || !to) return false;
    const candidate: ExplorerRouteGraphEdge = { from, to };
    const key = this.canonicalEdgeKey(candidate);
    return !this.graphEdges.some((edge) => this.canonicalEdgeKey(edge) === key);
  }

  private addEdge(): void {
    if (!this.config || !this.canAdd()) return;
    const from = this.parseEndpoint(this.fromKey);
    const to = this.parseEndpoint(this.toKey);
    if (!from || !to) return;
    this.emitConfig({
      ...this.config,
      route_graph_edges: [...this.graphEdges, { from, to }],
    });
    this.fromKey = "";
    this.toKey = "";
  }

  private deleteEdge(index: number): void {
    if (!this.config) return;
    this.emitConfig({
      ...this.config,
      route_graph_edges: this.graphEdges.filter((_, edgeIndex) => edgeIndex !== index),
    });
  }

  private renderGraphOverlay() {
    const edges = this.graphEdges.map((edge) => {
      const from = this.endpointPoint(edge.from);
      const to = this.endpointPoint(edge.to);
      if (!from || !to) return nothing;
      return svg`<line
        x1=${from[0] * VIEWBOX_SIZE}
        y1=${from[1] * VIEWBOX_SIZE}
        x2=${to[0] * VIEWBOX_SIZE}
        y2=${to[1] * VIEWBOX_SIZE}
        class="graph-edge"
        vector-effect="non-scaling-stroke"
      ></line>`;
    });

    const points = this.endpointOptions()
      .filter((endpoint) => endpoint.point)
      .map((endpoint) => {
        const [x, y] = endpoint.point as NormalizedPoint;
        return svg`
          <g transform=${`translate(${x * VIEWBOX_SIZE} ${y * VIEWBOX_SIZE})`}>
            <circle class=${endpoint.kind === "room" ? "graph-room" : "graph-node"} r=${endpoint.kind === "room" ? "11" : "13"}></circle>
          </g>
        `;
      });

    return svg`${edges}${points}`;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const options = this.endpointOptions();

    return html`
      <section class="graph-editor">
        <div class="heading">
          <div><span>Automatic Route Graph</span><h3>Forbind rum, døre og gangpunkter</h3></div>
          <b>${this.graphEdges.length} forbindelser</b>
        </div>

        <div class="instruction">
          Opret kun de fysiske forbindelser der faktisk kan gås. Explorer finder derefter automatisk den korteste vej gennem grafen. En manuelt tegnet rute mellem to rum har stadig førsteprioritet.
        </div>

        <div class="selectors">
          <label>Fra
            <select .value=${this.fromKey} @change=${(event: Event) => this.fromKey = (event.target as HTMLSelectElement).value}>
              <option value="">Vælg rum eller punkt</option>
              ${options.map((option) => html`<option value=${option.key}>${option.label}</option>`)}
            </select>
          </label>
          <label>Til
            <select .value=${this.toKey} @change=${(event: Event) => this.toKey = (event.target as HTMLSelectElement).value}>
              <option value="">Vælg rum eller punkt</option>
              ${options.map((option) => html`<option value=${option.key}>${option.label}</option>`)}
            </select>
          </label>
        </div>

        <button class="primary add" ?disabled=${!this.canAdd()} @click=${this.addEdge}>+ Tilføj forbindelse</button>

        ${this.graphEdges.length ? html`
          <div class="edge-list">
            ${this.graphEdges.map((edge, index) => html`
              <div class="edge-item">
                <span class="edge-index">${index + 1}</span>
                <span class="edge-copy"><strong>${this.endpointLabel(edge.from)}</strong><small>↔ ${this.endpointLabel(edge.to)}</small></span>
                <button class="danger mini" @click=${() => this.deleteEdge(index)}>Slet</button>
              </div>
            `)}
          </div>
        ` : html`<div class="empty">Ingen graph-forbindelser endnu. Start typisk med at forbinde et rum til dets dørpunkt.</div>`}

        ${image ? html`
          <div class="map-frame">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <image href=${image} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderGraphOverlay()}
            </svg>
          </div>
        ` : nothing}
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.graph-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.add{justify-self:start}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}.edge-list{display:grid;gap:7px}.edge-item{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;background:var(--secondary-background-color)}.edge-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.edge-copy{display:grid;gap:2px;min-width:0;flex:1}.edge-copy small{color:var(--secondary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-edge{stroke:var(--primary-color,#03a9f4);stroke-width:4;stroke-opacity:.7;stroke-dasharray:9 7}.graph-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.graph-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}@media(max-width:600px){.selectors{grid-template-columns:1fr}}
  `;
}
