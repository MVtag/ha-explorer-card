import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRouteGraphEdge,
  ExplorerRouteGraphEndpoint,
  NormalizedPoint,
  RouteGraphEndpointKind,
} from "../models/config";
import type { HomeAssistant } from "../types";
import { evaluateRouteGraphEdges, type RouteGraphEdgeStatus } from "../utils/route-resolver";

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
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private fromKey = "";
  @state() private toKey = "";
  @state() private conditionEntity = "";
  @state() private conditionStates = "on";
  @state() private editingConditionIndex?: number;
  @state() private editingEntity = "";
  @state() private editingStates = "on";

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

  private parseAllowedStates(value: string): string[] {
    const states = value.split(",").map((entry) => entry.trim()).filter(Boolean);
    return states.length ? [...new Set(states)] : ["on"];
  }

  private entityState(entityId: string): string | undefined {
    return this.hass?.states[entityId]?.state;
  }

  private edgeStatuses(): RouteGraphEdgeStatus[] {
    if (!this.config) return [];
    return evaluateRouteGraphEdges(
      this.config,
      (entityId) => this.entityState(entityId),
    );
  }

  private edgeStatus(index: number): RouteGraphEdgeStatus {
    return this.edgeStatuses()[index] ?? {
      index,
      edge: this.graphEdges[index],
      conditional: false,
      active: true,
      allowedStates: [],
    };
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

    const entity = this.conditionEntity.trim();
    const edge: ExplorerRouteGraphEdge = {
      from,
      to,
      ...(entity ? {
        condition: {
          entity,
          allowed_states: this.parseAllowedStates(this.conditionStates),
        },
      } : {}),
    };

    this.emitConfig({
      ...this.config,
      route_graph_edges: [...this.graphEdges, edge],
    });
    this.fromKey = "";
    this.toKey = "";
    this.conditionEntity = "";
    this.conditionStates = "on";
  }

  private deleteEdge(index: number): void {
    if (!this.config) return;
    if (this.editingConditionIndex === index) this.editingConditionIndex = undefined;
    this.emitConfig({
      ...this.config,
      route_graph_edges: this.graphEdges.filter((_, edgeIndex) => edgeIndex !== index),
    });
  }

  private beginEditCondition(index: number): void {
    const condition = this.graphEdges[index]?.condition;
    this.editingConditionIndex = index;
    this.editingEntity = condition?.entity ?? "";
    this.editingStates = (condition?.allowed_states?.length ? condition.allowed_states : ["on"]).join(", ");
  }

  private cancelEditCondition(): void {
    this.editingConditionIndex = undefined;
    this.editingEntity = "";
    this.editingStates = "on";
  }

  private saveCondition(index: number): void {
    if (!this.config) return;
    const entity = this.editingEntity.trim();
    const edges = this.graphEdges.map((edge, edgeIndex) => {
      if (edgeIndex !== index) return edge;
      if (!entity) {
        const { condition: _condition, ...withoutCondition } = edge;
        return withoutCondition;
      }
      return {
        ...edge,
        condition: {
          entity,
          allowed_states: this.parseAllowedStates(this.editingStates),
        },
      };
    });
    this.cancelEditCondition();
    this.emitConfig({ ...this.config, route_graph_edges: edges });
  }

  private removeCondition(index: number): void {
    if (!this.config) return;
    const edges = this.graphEdges.map((edge, edgeIndex) => {
      if (edgeIndex !== index) return edge;
      const { condition: _condition, ...withoutCondition } = edge;
      return withoutCondition;
    });
    this.cancelEditCondition();
    this.emitConfig({ ...this.config, route_graph_edges: edges });
  }

  private statusLabel(index: number): string {
    const status = this.edgeStatus(index);
    if (!status.conditional) return "Altid åben";
    const source = status.conditionSource === "node"
      ? `dør ${this.routeNodes.find((node) => node.id === status.nodeId)?.name ?? status.nodeId ?? "punkt"}`
      : "rute";
    if (status.active) return `Åben · ${source} · ${status.currentState ?? "ok"}`;
    if (status.reason === "entity_unavailable") return `Blokeret · ${source} · entity mangler`;
    if (status.reason === "missing_entity") return `Blokeret · ${source} · ingen entity`;
    return `Blokeret · ${source} · ${status.currentState ?? "ukendt"}`;
  }

  private renderGraphOverlay() {
    const statuses = this.edgeStatuses();
    const edges = this.graphEdges.map((edge, index) => {
      const from = this.endpointPoint(edge.from);
      const to = this.endpointPoint(edge.to);
      if (!from || !to) return nothing;
      const status = statuses[index] ?? this.edgeStatus(index);
      const classes = ["graph-edge", status.conditional ? "conditional" : "", status.active ? "" : "blocked"]
        .filter(Boolean)
        .join(" ");
      return svg`<line
        x1=${from[0] * VIEWBOX_SIZE}
        y1=${from[1] * VIEWBOX_SIZE}
        x2=${to[0] * VIEWBOX_SIZE}
        y2=${to[1] * VIEWBOX_SIZE}
        class=${classes}
        vector-effect="non-scaling-stroke"
      ></line>`;
    });

    const points = this.endpointOptions()
      .filter((endpoint) => endpoint.point)
      .map((endpoint) => {
        const [x, y] = endpoint.point as NormalizedPoint;
        const node = endpoint.kind === "node" ? this.routeNodes.find((entry) => entry.id === endpoint.id) : undefined;
        const blocked = Boolean(node?.state_binding) && !evaluateRouteGraphEdges(
          {
            type: "custom:ha-explorer-card",
            route_nodes: this.routeNodes,
            route_graph_edges: this.graphEdges.filter((edge) =>
              (edge.from.kind === "node" && edge.from.id === endpoint.id) ||
              (edge.to.kind === "node" && edge.to.id === endpoint.id),
            ),
          },
          (entityId) => this.entityState(entityId),
        ).some((status) => status.active);
        return svg`
          <g transform=${`translate(${x * VIEWBOX_SIZE} ${y * VIEWBOX_SIZE})`}>
            <circle class=${endpoint.kind === "room" ? "graph-room" : blocked ? "graph-node blocked" : "graph-node"} r=${endpoint.kind === "room" ? "11" : "13"}></circle>
          </g>
        `;
      });

    return svg`${edges}${points}`;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const options = this.endpointOptions();
    const statuses = this.edgeStatuses();
    const conditionalCount = statuses.filter((status) => status.conditional).length;
    const boundDoors = this.routeNodes.filter((node) => node.kind === "door" && node.state_binding).length;

    return html`
      <section class="graph-editor">
        <div class="heading">
          <div><span>Smart / Conditional Routes</span><h3>Forbind rum, døre og gangpunkter</h3></div>
          <b>${this.graphEdges.length} forbindelser · ${conditionalCount} live · ${boundDoors} dørsensorer</b>
        </div>

        <div class="instruction">
          Dørpunkter med en Home Assistant-sensor styrer automatisk alle graph-forbindelser, der møder døren. Du kan stadig lægge en ekstra route-condition på selve forbindelsen til særlige regler. Manuelle ruter er fortsat eksplicitte overrides.
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

        <div class="condition-draft">
          <div class="condition-title"><strong>Ekstra route-condition · valgfri</strong><span>Brug normalt dørpunktets egen sensor til åben/lukket. Dette felt er til særlige regler på forbindelsen.</span></div>
          <div class="condition-fields">
            <label>Home Assistant entity
              <input
                placeholder="input_boolean.special_route"
                .value=${this.conditionEntity}
                @input=${(event: InputEvent) => this.conditionEntity = (event.target as HTMLInputElement).value}
              >
            </label>
            <label>Tilladte states
              <input
                placeholder="on"
                .value=${this.conditionStates}
                @input=${(event: InputEvent) => this.conditionStates = (event.target as HTMLInputElement).value}
              >
              <small>Flere states adskilles med komma, fx <code>on, open</code>.</small>
            </label>
          </div>
        </div>

        <button class="primary add" ?disabled=${!this.canAdd()} @click=${this.addEdge}>+ Tilføj forbindelse</button>

        ${this.graphEdges.length ? html`
          <div class="edge-list">
            ${this.graphEdges.map((edge, index) => {
              const status = statuses[index] ?? this.edgeStatus(index);
              const editing = this.editingConditionIndex === index;
              return html`
                <div class=${status.active ? "edge-item" : "edge-item blocked"}>
                  <span class="edge-index">${index + 1}</span>
                  <span class="edge-copy">
                    <strong>${this.endpointLabel(edge.from)}</strong>
                    <small>↔ ${this.endpointLabel(edge.to)}</small>
                    <em class=${status.active ? "status open" : "status blocked"}>${this.statusLabel(index)}</em>
                    ${status.conditionSource === "node" && status.entity ? html`<small>Arvet fra dørpunkt: ${status.entity} · åben: ${status.allowedStates.join(", ")}</small>` : nothing}
                    ${edge.condition ? html`<small>Ekstra route-condition: ${edge.condition.entity} · tilladt: ${(edge.condition.allowed_states?.length ? edge.condition.allowed_states : ["on"]).join(", ")}</small>` : nothing}
                  </span>
                  <div class="edge-actions">
                    <button class="secondary mini" @click=${() => this.beginEditCondition(index)}>Route-condition</button>
                    <button class="danger mini" @click=${() => this.deleteEdge(index)}>Slet</button>
                  </div>
                </div>
                ${editing ? html`
                  <div class="condition-edit">
                    <label>Entity<input .value=${this.editingEntity} @input=${(event: InputEvent) => this.editingEntity = (event.target as HTMLInputElement).value}></label>
                    <label>Tilladte states<input .value=${this.editingStates} @input=${(event: InputEvent) => this.editingStates = (event.target as HTMLInputElement).value}></label>
                    <div class="condition-actions">
                      <button class="primary mini" @click=${() => this.saveCondition(index)}>Gem route-condition</button>
                      ${edge.condition ? html`<button class="secondary mini" @click=${() => this.removeCondition(index)}>Fjern route-condition</button>` : nothing}
                      <button class="secondary mini" @click=${this.cancelEditCondition}>Annuller</button>
                    </div>
                  </div>
                ` : nothing}
              `;
            })}
          </div>
        ` : html`<div class="empty">Ingen graph-forbindelser endnu. Start typisk med at forbinde et rum til dets dørpunkt.</div>`}

        ${image ? html`
          <div class="map-frame">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <image href=${image} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderGraphOverlay()}
            </svg>
          </div>
          <div class="legend"><span><i class="line open"></i>Aktiv</span><span><i class="line conditional"></i>Live styret</span><span><i class="line blocked"></i>Blokeret</span></div>
        ` : nothing}
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.graph-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors,.condition-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label,.condition-fields label,.condition-edit label{display:grid;gap:6px;font-size:.85rem}.selectors select,input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.condition-draft,.condition-edit{display:grid;gap:10px;padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.condition-title{display:grid;gap:2px}.condition-title span,.condition-fields small{color:var(--secondary-text-color);font-size:.8rem}.condition-edit{grid-template-columns:1fr 1fr auto;align-items:end}.condition-actions,.edge-actions{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.add{justify-self:start}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}.edge-list{display:grid;gap:7px}.edge-item{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;background:var(--secondary-background-color);border:1px solid transparent}.edge-item.blocked{border-color:var(--error-color,#db4437)}.edge-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem;flex:none}.edge-copy{display:grid;gap:2px;min-width:0;flex:1}.edge-copy small{color:var(--secondary-text-color)}.status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-edge{stroke:var(--primary-color,#03a9f4);stroke-width:4;stroke-opacity:.72}.graph-edge.conditional{stroke-dasharray:9 7}.graph-edge.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.graph-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.graph-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.graph-node.blocked{stroke:var(--error-color,#db4437)}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;gap:6px;align-items:center}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--primary-color,#03a9f4)}.legend .line.conditional{border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:600px){.selectors,.condition-fields,.condition-edit{grid-template-columns:1fr}.edge-item{align-items:flex-start}.edge-actions{flex-direction:column}}
  `;
}
