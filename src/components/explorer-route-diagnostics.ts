import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRouteGraphEndpoint,
  NormalizedPoint,
} from "../models/config";
import {
  analyzeRouteGraph,
  resolveRoute,
  roomAnchor,
  type RouteResolution,
} from "../utils/route-resolver";

const VIEWBOX_SIZE = 1000;

@customElement("ha-explorer-route-diagnostics")
export class HaExplorerRouteDiagnostics extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  @state() private fromRoom = "";
  @state() private toRoom = "";

  private get rooms() {
    return this.config?.rooms ?? [];
  }

  private get routeNodes() {
    return this.config?.route_nodes ?? [];
  }

  private get graphEdges() {
    return this.config?.route_graph_edges ?? [];
  }

  private roomName(roomId: string): string {
    return this.rooms.find((room) => room.id === roomId)?.name ?? roomId;
  }

  private routeNodeName(nodeId: string): string {
    return this.routeNodes.find((node) => node.id === nodeId)?.name ?? nodeId;
  }

  private endpointPoint(endpoint: ExplorerRouteGraphEndpoint): NormalizedPoint | undefined {
    if (!this.config) return undefined;
    if (endpoint.kind === "room") return roomAnchor(this.config, endpoint.id);
    return this.routeNodes.find((node) => node.id === endpoint.id)?.point;
  }

  private selectedResolution(): RouteResolution | undefined {
    if (!this.config || !this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom) {
      return undefined;
    }
    return resolveRoute(this.config, this.fromRoom, this.toRoom);
  }

  private sourceLabel(resolution: RouteResolution): string {
    if (resolution.source === "manual") return "Manuel rute · override";
    if (resolution.source === "graph") return "Automatic Graph";
    return "Straight-line fallback";
  }

  private sourceDescription(resolution: RouteResolution): string {
    if (resolution.source === "manual") {
      return "Explorer bruger den gemte manuelle rute før graph-netværket.";
    }
    if (resolution.source === "graph") {
      return "Der er ingen manuel override, så Explorer bruger den korteste forbundne graph-vej.";
    }
    return "Der blev ikke fundet en manuel rute eller en sammenhængende graph-vej mellem rummene.";
  }

  private formatDistance(distance: number): string {
    return new Intl.NumberFormat("da-DK", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(distance);
  }

  private renderGraphOverlay() {
    return this.graphEdges.map((edge) => {
      const from = this.endpointPoint(edge.from);
      const to = this.endpointPoint(edge.to);
      if (!from || !to) return nothing;
      return svg`
        <line
          x1=${from[0] * VIEWBOX_SIZE}
          y1=${from[1] * VIEWBOX_SIZE}
          x2=${to[0] * VIEWBOX_SIZE}
          y2=${to[1] * VIEWBOX_SIZE}
          class="graph-context"
          vector-effect="non-scaling-stroke"
        ></line>
      `;
    });
  }

  private renderPreviewOverlay(resolution?: RouteResolution) {
    if (!resolution || resolution.hops.length < 2) return nothing;
    const points = resolution.hops
      .map((hop) => `${hop.point[0] * VIEWBOX_SIZE},${hop.point[1] * VIEWBOX_SIZE}`)
      .join(" ");

    return svg`
      <polyline
        points=${points}
        class=${`preview-line ${resolution.source}`}
        fill="none"
        vector-effect="non-scaling-stroke"
      ></polyline>
      ${resolution.hops.map((hop, index) => svg`
        <g transform=${`translate(${hop.point[0] * VIEWBOX_SIZE} ${hop.point[1] * VIEWBOX_SIZE})`}>
          <circle
            class=${hop.kind === "room" ? "preview-room" : hop.kind === "node" ? "preview-node" : "preview-point"}
            r=${hop.kind === "room" ? "14" : "11"}
          ></circle>
          <text class="preview-number" y="-20" text-anchor="middle">${index + 1}</text>
        </g>
      `)}
    `;
  }

  private renderDisconnectedMarkers() {
    if (!this.config) return nothing;
    const diagnostics = analyzeRouteGraph(this.config);
    const roomMarkers = diagnostics.disconnectedRoomIds.map((roomId) => {
      const point = roomAnchor(this.config as ExplorerCardConfig, roomId);
      if (!point) return nothing;
      return svg`
        <g transform=${`translate(${point[0] * VIEWBOX_SIZE} ${point[1] * VIEWBOX_SIZE})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      `;
    });
    const nodeMarkers = diagnostics.disconnectedNodeIds.map((nodeId) => {
      const node = this.routeNodes.find((entry) => entry.id === nodeId);
      if (!node) return nothing;
      return svg`
        <g transform=${`translate(${node.point[0] * VIEWBOX_SIZE} ${node.point[1] * VIEWBOX_SIZE})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      `;
    });
    return svg`${roomMarkers}${nodeMarkers}`;
  }

  private renderDiagnostics() {
    if (!this.config) return nothing;
    const diagnostics = analyzeRouteGraph(this.config);
    const hasGraph = this.graphEdges.length > 0;
    const issueCount =
      diagnostics.invalidEdges +
      diagnostics.duplicateEdges +
      diagnostics.disconnectedRoomIds.length +
      diagnostics.disconnectedNodeIds.length +
      diagnostics.brokenRouteNodeReferences.length +
      Math.max(0, diagnostics.components - 1);

    if (!hasGraph) {
      return html`
        <div class="diagnostic-summary neutral">
          <strong>Graph endnu ikke opbygget</strong>
          <span>Der er ingen graph-forbindelser at diagnosticere endnu.</span>
        </div>
      `;
    }

    return html`
      <div class=${issueCount ? "diagnostic-summary warning" : "diagnostic-summary ok"}>
        <strong>${issueCount ? `${issueCount} ting bør kontrolleres` : "Graph ser sammenhængende ud"}</strong>
        <span>${issueCount ? "Advarslerne påvirker ikke eksisterende manuelle ruter, men kan give fallback på automatiske ruter." : "Ingen åbenlyse forbindelsesproblemer fundet."}</span>
      </div>

      <div class="metric-grid">
        <div><strong>${this.graphEdges.length}</strong><span>forbindelser</span></div>
        <div><strong>${diagnostics.components}</strong><span>graph-dele</span></div>
        <div><strong>${diagnostics.disconnectedRoomIds.length}</strong><span>frakoblede rum</span></div>
        <div><strong>${diagnostics.disconnectedNodeIds.length}</strong><span>frakoblede punkter</span></div>
      </div>

      ${diagnostics.components > 1 ? html`
        <div class="issue"><strong>Graph er opdelt</strong><span>${diagnostics.components} separate netværk kan ikke finde vej til hinanden.</span></div>
      ` : nothing}
      ${diagnostics.disconnectedRoomIds.length ? html`
        <div class="issue"><strong>Frakoblede rum</strong><span>${diagnostics.disconnectedRoomIds.map((id) => this.roomName(id)).join(", ")}</span></div>
      ` : nothing}
      ${diagnostics.disconnectedNodeIds.length ? html`
        <div class="issue"><strong>Frakoblede punkter</strong><span>${diagnostics.disconnectedNodeIds.map((id) => this.routeNodeName(id)).join(", ")}</span></div>
      ` : nothing}
      ${diagnostics.invalidEdges ? html`
        <div class="issue"><strong>Ugyldige forbindelser</strong><span>${diagnostics.invalidEdges} forbindelse${diagnostics.invalidEdges === 1 ? "" : "r"} peger på et manglende punkt, manglende rum eller sig selv.</span></div>
      ` : nothing}
      ${diagnostics.duplicateEdges ? html`
        <div class="issue"><strong>Duplikerede forbindelser</strong><span>${diagnostics.duplicateEdges} ekstra forbindelse${diagnostics.duplicateEdges === 1 ? "" : "r"} forbinder de samme endpoints.</span></div>
      ` : nothing}
      ${diagnostics.brokenRouteNodeReferences.length ? html`
        <div class="issue"><strong>Manuelle ruter med manglende shared node</strong><span>${diagnostics.brokenRouteNodeReferences.map((entry) => `${this.roomName(entry.from)} ↔ ${this.roomName(entry.to)}: ${entry.nodeId}`).join(" · ")}</span></div>
      ` : nothing}
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const resolution = this.selectedResolution();

    return html`
      <section class="diagnostics">
        <div class="heading">
          <div><span>Route Preview & Diagnostics</span><h3>Se præcis hvilken vej Explorer vælger</h3></div>
          <b>v0.18</b>
        </div>

        <div class="instruction">
          Vælg to rum for at simulere routing uden at flytte en person. Preview bruger samme prioritet som runtime: manuel rute → Automatic Graph → straight-line fallback.
        </div>

        <div class="selectors">
          <label>Fra rum
            <select .value=${this.fromRoom} @change=${(event: Event) => this.fromRoom = (event.target as HTMLSelectElement).value}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
            </select>
          </label>
          <label>Til rum
            <select .value=${this.toRoom} @change=${(event: Event) => this.toRoom = (event.target as HTMLSelectElement).value}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
            </select>
          </label>
        </div>

        ${this.fromRoom && this.toRoom && this.fromRoom === this.toRoom ? html`
          <div class="diagnostic-summary neutral"><strong>Vælg to forskellige rum</strong><span>Start og destination kan ikke være det samme rum.</span></div>
        ` : resolution ? html`
          <div class=${`route-result ${resolution.source}`}>
            <div class="route-result-top">
              <strong>${this.sourceLabel(resolution)}</strong>
              <span>Relativ afstand ${this.formatDistance(resolution.distance)}</span>
            </div>
            <p>${this.sourceDescription(resolution)}</p>
            <div class="hop-list">
              ${resolution.hops.map((hop, index) => html`
                <span>${index ? html`<i>→</i>` : nothing}<b>${hop.label}</b></span>
              `)}
            </div>
          </div>
        ` : nothing}

        ${image ? html`
          <div class="map-frame">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <image href=${image} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderGraphOverlay()}
              ${this.renderDisconnectedMarkers()}
              ${this.renderPreviewOverlay(resolution)}
            </svg>
          </div>
        ` : nothing}

        <div class="diagnostic-heading"><strong>Netværksdiagnostik</strong><span>Gennemgår graph, rum, shared nodes og manuelle node-referencer.</span></div>
        ${this.renderDiagnostics()}
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.diagnostics{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.route-result{display:grid;gap:8px;padding:12px;border:1px solid var(--divider-color);border-radius:11px}.route-result.manual{border-left:5px solid var(--warning-color,#ff9800)}.route-result.graph{border-left:5px solid var(--primary-color,#03a9f4)}.route-result.fallback{border-left:5px solid var(--secondary-text-color)}.route-result-top{display:flex;justify-content:space-between;gap:12px;align-items:center}.route-result-top span{color:var(--secondary-text-color);font-size:.82rem}.route-result p{margin:0;color:var(--secondary-text-color);font-size:.88rem;line-height:1.4}.hop-list{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:.82rem}.hop-list span{display:flex;gap:6px;align-items:center}.hop-list b{padding:4px 7px;border-radius:999px;background:var(--secondary-background-color)}.hop-list i{font-style:normal;color:var(--secondary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-context{stroke:var(--secondary-text-color);stroke-width:3;stroke-opacity:.28;stroke-dasharray:8 8}.preview-line{stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.preview-line.manual{stroke:var(--warning-color,#ff9800)}.preview-line.graph{stroke:var(--primary-color,#03a9f4)}.preview-line.fallback{stroke:var(--secondary-text-color);stroke-dasharray:16 10}.preview-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.preview-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.preview-point{fill:white;stroke:var(--warning-color,#ff9800);stroke-width:5}.preview-number{font-size:22px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6}.disconnected{fill:var(--error-color,#db4437);fill-opacity:.18;stroke:var(--error-color,#db4437);stroke-width:4;stroke-dasharray:5 4}.warning-mark{font-size:24px;font-weight:900;fill:var(--error-color,#db4437)}.diagnostic-heading{display:grid;gap:3px;padding-top:4px}.diagnostic-heading span{color:var(--secondary-text-color);font-size:.82rem}.diagnostic-summary{display:grid;gap:3px;padding:10px 12px;border-radius:10px}.diagnostic-summary.ok{background:color-mix(in srgb,var(--success-color,#43a047) 12%,transparent)}.diagnostic-summary.warning{background:color-mix(in srgb,var(--warning-color,#ff9800) 14%,transparent)}.diagnostic-summary.neutral{background:var(--secondary-background-color)}.diagnostic-summary span{color:var(--secondary-text-color);font-size:.84rem;line-height:1.4}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.metric-grid div{display:grid;gap:2px;padding:9px;border-radius:9px;background:var(--secondary-background-color);text-align:center}.metric-grid strong{font-size:1.1rem}.metric-grid span{color:var(--secondary-text-color);font-size:.72rem}.issue{display:grid;gap:3px;padding:9px 11px;border-left:3px solid var(--warning-color,#ff9800);background:var(--secondary-background-color);border-radius:7px}.issue span{color:var(--secondary-text-color);font-size:.84rem;line-height:1.4}@media(max-width:600px){.selectors{grid-template-columns:1fr}.route-result-top{align-items:flex-start;flex-direction:column}.metric-grid{grid-template-columns:1fr 1fr}}
  `;
}
