import { customElement, property } from "lit/decorators.js";
import { ExplorerCanvas } from "./explorer-canvas";
import type {
  ExplorerRoute,
  ExplorerRouteGraphEdge,
  ExplorerRouteGraphEndpoint,
  ExplorerRouteNode,
} from "../models/config";
import {
  evaluateRouteGraphEdges,
  evaluateRouteNodeState,
  resolveRoute,
  type RouteGraphEdgeStatus,
} from "../utils/route-resolver";
import { VIEWBOX_SIZE } from "../utils/viewport";

interface PresencePosition {
  x: number;
  y: number;
}

type DoorVisualStatus = "always" | "active" | "blocked" | "mixed";

const MOVEMENT_DURATION_MS = 900;
const FOOTSTEP_LIFETIME_MS = 3600;
const FOOTSTEP_SPACING = 58;
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

@customElement("explorer-animated-canvas")
export class ExplorerAnimatedCanvas extends ExplorerCanvas {
  @property({ attribute: false }) public routes: ExplorerRoute[] = [];
  @property({ attribute: false }) public routeNodes: ExplorerRouteNode[] = [];
  @property({ attribute: false }) public routeGraphEdges: ExplorerRouteGraphEdge[] = [];

  private readonly previousPresencePositions = new Map<string, PresencePosition>();
  private readonly previousPresenceRooms = new Map<string, string | undefined>();
  private readonly activeAnimations = new Map<string, SVGElement>();

  protected updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);

    if (
      changed.has("hass") ||
      changed.has("rooms") ||
      changed.has("routeNodes") ||
      changed.has("routeGraphEdges")
    ) {
      this.syncRouteStatusOverlay();
    }

    if (!changed.has("presences")) return;

    const visiblePresences = this.presences.filter((presence) => presence.visible !== false);
    const presenceElements = Array.from(
      this.renderRoot.querySelectorAll<SVGGElement>("g.presence"),
    );
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const currentIds = new Set<string>();

    visiblePresences.forEach((presence, index) => {
      const element = presenceElements[index];
      if (!element) return;

      const current = {
        x: (presence.x ?? 0.5) * VIEWBOX_SIZE,
        y: (presence.y ?? 0.5) * VIEWBOX_SIZE,
      };
      const previous = this.previousPresencePositions.get(presence.id);
      const previousRoom = this.previousPresenceRooms.get(presence.id);
      const currentRoom = presence.room_id;
      currentIds.add(presence.id);

      this.activeAnimations.get(presence.id)?.remove();
      this.activeAnimations.delete(presence.id);

      if (
        !reduceMotion &&
        previous &&
        (Math.abs(previous.x - current.x) > 0.01 || Math.abs(previous.y - current.y) > 0.01)
      ) {
        const path = this.resolveMovementPath(previous, current, previousRoom, currentRoom);
        this.createFootsteps(path);

        const animation = document.createElementNS(SVG_NAMESPACE, "animateTransform");
        animation.setAttribute("attributeName", "transform");
        animation.setAttribute("attributeType", "XML");
        animation.setAttribute("type", "translate");
        animation.setAttribute("values", path.map((point) => `${point.x} ${point.y}`).join(";"));
        animation.setAttribute("keyTimes", this.buildKeyTimes(path).join(";"));
        animation.setAttribute("dur", `${MOVEMENT_DURATION_MS}ms`);
        animation.setAttribute("begin", "indefinite");
        animation.setAttribute("fill", "freeze");
        animation.setAttribute("calcMode", "linear");

        element.appendChild(animation);
        this.activeAnimations.set(presence.id, animation);
        (animation as SVGAnimationElement).beginElement();

        window.setTimeout(() => {
          if (this.activeAnimations.get(presence.id) !== animation) return;
          animation.remove();
          this.activeAnimations.delete(presence.id);
        }, MOVEMENT_DURATION_MS + 80);
      }

      this.previousPresencePositions.set(presence.id, current);
      this.previousPresenceRooms.set(presence.id, currentRoom);
    });

    for (const id of this.previousPresencePositions.keys()) {
      if (!currentIds.has(id)) {
        this.previousPresencePositions.delete(id);
        this.previousPresenceRooms.delete(id);
      }
    }
  }

  private routeConfig() {
    return {
      type: "custom:ha-explorer-card",
      rooms: this.rooms,
      route_nodes: this.routeNodes,
      route_graph_edges: this.routeGraphEdges,
      routes: this.routes,
    };
  }

  private endpointPoint(endpoint: ExplorerRouteGraphEndpoint): PresencePosition | undefined {
    if (endpoint.kind === "node") {
      const node = this.routeNodes.find((entry) => entry.id === endpoint.id);
      if (!node) return undefined;
      return { x: node.point[0] * VIEWBOX_SIZE, y: node.point[1] * VIEWBOX_SIZE };
    }

    const room = this.rooms.find((entry) => entry.id === endpoint.id);
    if (!room) return undefined;
    if (room.presence_anchor) {
      return {
        x: room.presence_anchor.x * VIEWBOX_SIZE,
        y: room.presence_anchor.y * VIEWBOX_SIZE,
      };
    }
    if (!room.points.length) return undefined;
    return {
      x: (room.points.reduce((sum, point) => sum + point[0], 0) / room.points.length) * VIEWBOX_SIZE,
      y: (room.points.reduce((sum, point) => sum + point[1], 0) / room.points.length) * VIEWBOX_SIZE,
    };
  }

  private endpointLabel(endpoint: ExplorerRouteGraphEndpoint): string {
    if (endpoint.kind === "node") {
      return this.routeNodes.find((node) => node.id === endpoint.id)?.name ?? endpoint.id;
    }
    return this.rooms.find((room) => room.id === endpoint.id)?.name ?? endpoint.id;
  }

  private edgeStatusColor(status: RouteGraphEdgeStatus): string {
    if (!status.conditional) return "var(--secondary-text-color, #667085)";
    return status.active
      ? "var(--success-color, #43a047)"
      : "var(--error-color, #db4437)";
  }

  private statusDescription(status: RouteGraphEdgeStatus): string {
    const endpoints = `${this.endpointLabel(status.edge.from)} ↔ ${this.endpointLabel(status.edge.to)}`;
    if (!status.conditional) return `${endpoints} · altid aktiv`;
    const state = status.currentState ?? "ukendt";
    const source = status.conditionSource === "node"
      ? `dørpunkt ${this.routeNodes.find((node) => node.id === status.nodeId)?.name ?? status.nodeId ?? "ukendt"}`
      : "route-condition";
    return `${endpoints} · ${status.active ? "aktiv" : "blokeret"} · ${source} · ${status.entity ?? "manglende entity"}: ${state}`;
  }

  private doorVisualStatus(node: ExplorerRouteNode, statuses: RouteGraphEdgeStatus[]): DoorVisualStatus {
    if (node.state_binding) {
      const state = evaluateRouteNodeState(
        node,
        (entityId) => this.hass?.states[entityId]?.state,
      );
      return state.active ? "active" : "blocked";
    }

    const incident = statuses.filter((status) => {
      const { from, to } = status.edge;
      return (
        (from.kind === "node" && from.id === node.id) ||
        (to.kind === "node" && to.id === node.id)
      );
    });
    const conditional = incident.filter((status) => status.conditional);
    if (!conditional.length) return "always";
    const active = conditional.some((status) => status.active);
    const blocked = conditional.some((status) => !status.active);
    if (active && blocked) return "mixed";
    return active ? "active" : "blocked";
  }

  private doorStatusColor(status: DoorVisualStatus): string {
    if (status === "active") return "var(--success-color, #43a047)";
    if (status === "blocked") return "var(--error-color, #db4437)";
    if (status === "mixed") return "var(--warning-color, #ff9800)";
    return "var(--secondary-text-color, #667085)";
  }

  private appendSvgTitle(parent: SVGElement, text: string): void {
    const title = document.createElementNS(SVG_NAMESPACE, "title");
    title.textContent = text;
    parent.appendChild(title);
  }

  private syncRouteStatusOverlay(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;

    scene.querySelector<SVGGElement>(":scope > g.route-status-scene")?.remove();

    const doorNodes = this.routeNodes.filter((node) => node.kind === "door");
    if (!this.routeGraphEdges.length && !doorNodes.length) return;

    const statuses = evaluateRouteGraphEdges(
      this.routeConfig(),
      (entityId) => this.hass?.states[entityId]?.state,
    );
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "route-status-scene");
    layer.setAttribute("aria-label", "Live rutestatus og døre");
    layer.setAttribute("pointer-events", "none");

    statuses.forEach((status) => {
      const from = this.endpointPoint(status.edge.from);
      const to = this.endpointPoint(status.edge.to);
      if (!from || !to) return;

      const color = this.edgeStatusColor(status);
      const line = document.createElementNS(SVG_NAMESPACE, "line");
      line.setAttribute("x1", String(from.x));
      line.setAttribute("y1", String(from.y));
      line.setAttribute("x2", String(to.x));
      line.setAttribute("y2", String(to.y));
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("vector-effect", "non-scaling-stroke");
      line.setAttribute("stroke-width", status.conditional ? (status.active ? "4.5" : "5.5") : "2.5");
      line.setAttribute("stroke-opacity", status.conditional ? (status.active ? ".72" : ".82") : ".2");
      if (!status.conditional) line.setAttribute("stroke-dasharray", "4 10");
      if (status.conditional && !status.active) line.setAttribute("stroke-dasharray", "13 9");
      this.appendSvgTitle(line, this.statusDescription(status));
      layer.appendChild(line);

      if (!status.conditional) return;
      const middleX = (from.x + to.x) / 2;
      const middleY = (from.y + to.y) / 2;
      const marker = document.createElementNS(SVG_NAMESPACE, "g");
      marker.setAttribute("transform", `translate(${middleX} ${middleY})`);

      const halo = document.createElementNS(SVG_NAMESPACE, "circle");
      halo.setAttribute("r", "12");
      halo.setAttribute("fill", "var(--card-background-color, #ffffff)");
      halo.setAttribute("fill-opacity", ".9");
      halo.setAttribute("stroke", color);
      halo.setAttribute("stroke-width", "3");
      halo.setAttribute("vector-effect", "non-scaling-stroke");
      marker.appendChild(halo);

      const symbol = document.createElementNS(SVG_NAMESPACE, "text");
      symbol.setAttribute("text-anchor", "middle");
      symbol.setAttribute("dominant-baseline", "central");
      symbol.setAttribute("fill", color);
      symbol.setAttribute("font-size", "16");
      symbol.setAttribute("font-weight", "900");
      symbol.setAttribute("font-family", "system-ui, sans-serif");
      symbol.textContent = status.active ? "✓" : "×";
      marker.appendChild(symbol);

      if (!status.active && !reduceMotion) {
        const pulse = document.createElementNS(SVG_NAMESPACE, "animate");
        pulse.setAttribute("attributeName", "opacity");
        pulse.setAttribute("values", "1;.45;1");
        pulse.setAttribute("dur", "1.8s");
        pulse.setAttribute("repeatCount", "indefinite");
        marker.appendChild(pulse);
      }

      this.appendSvgTitle(marker, this.statusDescription(status));
      layer.appendChild(marker);
    });

    doorNodes.forEach((node) => {
      const status = this.doorVisualStatus(node, statuses);
      const color = this.doorStatusColor(status);
      const x = node.point[0] * VIEWBOX_SIZE;
      const y = node.point[1] * VIEWBOX_SIZE;
      const group = document.createElementNS(SVG_NAMESPACE, "g");
      group.setAttribute("transform", `translate(${x} ${y})`);

      const background = document.createElementNS(SVG_NAMESPACE, "circle");
      background.setAttribute("r", "22");
      background.setAttribute("fill", "var(--card-background-color, #ffffff)");
      background.setAttribute("fill-opacity", ".9");
      background.setAttribute("stroke", color);
      background.setAttribute("stroke-width", "4");
      background.setAttribute("vector-effect", "non-scaling-stroke");
      group.appendChild(background);

      const door = document.createElementNS(SVG_NAMESPACE, "rect");
      door.setAttribute("x", "-9");
      door.setAttribute("y", "-13");
      door.setAttribute("width", "15");
      door.setAttribute("height", "26");
      door.setAttribute("rx", "1.5");
      door.setAttribute("fill", "none");
      door.setAttribute("stroke", color);
      door.setAttribute("stroke-width", "3");
      door.setAttribute("vector-effect", "non-scaling-stroke");
      group.appendChild(door);

      const handle = document.createElementNS(SVG_NAMESPACE, "circle");
      handle.setAttribute("cx", "2");
      handle.setAttribute("cy", "0");
      handle.setAttribute("r", "2");
      handle.setAttribute("fill", color);
      group.appendChild(handle);

      if (status === "blocked") {
        const slash = document.createElementNS(SVG_NAMESPACE, "line");
        slash.setAttribute("x1", "-12");
        slash.setAttribute("y1", "-15");
        slash.setAttribute("x2", "12");
        slash.setAttribute("y2", "15");
        slash.setAttribute("stroke", color);
        slash.setAttribute("stroke-width", "4");
        slash.setAttribute("stroke-linecap", "round");
        slash.setAttribute("vector-effect", "non-scaling-stroke");
        group.appendChild(slash);
      }

      const statusDot = document.createElementNS(SVG_NAMESPACE, "circle");
      statusDot.setAttribute("cx", "16");
      statusDot.setAttribute("cy", "-16");
      statusDot.setAttribute("r", "6");
      statusDot.setAttribute("fill", color);
      statusDot.setAttribute("stroke", "var(--card-background-color, #ffffff)");
      statusDot.setAttribute("stroke-width", "2");
      statusDot.setAttribute("vector-effect", "non-scaling-stroke");
      group.appendChild(statusDot);

      if (node.name) {
        const label = document.createElementNS(SVG_NAMESPACE, "text");
        label.setAttribute("y", "39");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("fill", "var(--primary-text-color, #1f2937)");
        label.setAttribute("font-size", "20");
        label.setAttribute("font-weight", "700");
        label.setAttribute("font-family", "system-ui, sans-serif");
        label.setAttribute("paint-order", "stroke");
        label.setAttribute("stroke", "var(--card-background-color, #ffffff)");
        label.setAttribute("stroke-width", "5");
        label.setAttribute("stroke-linejoin", "round");
        label.textContent = node.name;
        group.appendChild(label);
      }

      const statusLabel = status === "always"
        ? "altid aktiv"
        : status === "active"
          ? "åben"
          : status === "blocked"
            ? "lukket / blokeret"
            : "blandet status";
      const nodeState = node.state_binding
        ? evaluateRouteNodeState(node, (entityId) => this.hass?.states[entityId]?.state)
        : undefined;
      const liveState = nodeState?.entity
        ? ` · ${nodeState.entity}: ${nodeState.currentState ?? "ukendt"} · åben: ${nodeState.allowedStates.join(", ")}`
        : "";
      this.appendSvgTitle(group, `${node.name ?? node.id} · ${statusLabel}${liveState}`);
      layer.appendChild(group);
    });

    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, presencesLayer ?? null);
  }

  private resolveMovementPath(
    from: PresencePosition,
    to: PresencePosition,
    fromRoom?: string,
    toRoom?: string,
  ): PresencePosition[] {
    if (!fromRoom || !toRoom || fromRoom === toRoom) return [from, to];

    const resolution = resolveRoute(
      this.routeConfig(),
      fromRoom,
      toRoom,
      (entityId) => this.hass?.states[entityId]?.state,
    );

    if (!resolution) return [from, to];
    const middle = resolution.hops.slice(1, -1).map((hop) => ({
      x: hop.point[0] * VIEWBOX_SIZE,
      y: hop.point[1] * VIEWBOX_SIZE,
    }));
    return [from, ...middle, to];
  }

  private buildKeyTimes(path: PresencePosition[]): number[] {
    if (path.length <= 2) return [0, 1];

    const lengths: number[] = [];
    let total = 0;
    for (let index = 1; index < path.length; index += 1) {
      const length = Math.hypot(path[index].x - path[index - 1].x, path[index].y - path[index - 1].y);
      lengths.push(length);
      total += length;
    }
    if (total <= 0) return path.map((_, index) => index / (path.length - 1));

    const times = [0];
    let elapsed = 0;
    lengths.forEach((length) => {
      elapsed += length;
      times.push(elapsed / total);
    });
    return times;
  }

  private ensureFootstepLayer(): SVGGElement | undefined {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return undefined;

    let layer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    if (layer) return layer;

    layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "footsteps-scene");
    layer.setAttribute("aria-label", "Bevægelsesspor");
    layer.setAttribute("pointer-events", "none");

    const presencesLayer = scene.querySelector(":scope > g.presences-scene");
    scene.insertBefore(layer, presencesLayer ?? null);
    return layer;
  }

  private createFootsteps(path: PresencePosition[]): void {
    const layer = this.ensureFootstepLayer();
    if (!layer || path.length < 2) return;

    const segments = path.slice(1).map((point, index) => {
      const start = path[index];
      return {
        start,
        end: point,
        length: Math.hypot(point.x - start.x, point.y - start.y),
      };
    });
    const totalDistance = segments.reduce((sum, segment) => sum + segment.length, 0);
    if (totalDistance < FOOTSTEP_SPACING) return;

    const stepCount = Math.min(20, Math.max(3, Math.floor(totalDistance / FOOTSTEP_SPACING)));

    for (let index = 0; index < stepCount; index += 1) {
      const progress = (index + 1) / (stepCount + 1);
      const targetDistance = totalDistance * progress;
      let traversed = 0;
      let segment = segments[segments.length - 1];

      for (const candidate of segments) {
        if (traversed + candidate.length >= targetDistance) {
          segment = candidate;
          break;
        }
        traversed += candidate.length;
      }

      const localProgress = segment.length > 0 ? (targetDistance - traversed) / segment.length : 0;
      const dx = segment.end.x - segment.start.x;
      const dy = segment.end.y - segment.start.y;
      const side = index % 2 === 0 ? -1 : 1;
      const perpendicularX = segment.length > 0 ? -dy / segment.length : 0;
      const perpendicularY = segment.length > 0 ? dx / segment.length : 0;
      const offset = 9 * side;
      const x = segment.start.x + dx * localProgress + perpendicularX * offset;
      const y = segment.start.y + dy * localProgress + perpendicularY * offset;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const delay = Math.round(progress * MOVEMENT_DURATION_MS);

      const footprint = document.createElementNS(SVG_NAMESPACE, "g");
      footprint.setAttribute("transform", `translate(${x} ${y}) rotate(${angle + side * 8})`);
      footprint.setAttribute("opacity", "0");

      const sole = document.createElementNS(SVG_NAMESPACE, "ellipse");
      sole.setAttribute("cx", "0");
      sole.setAttribute("cy", "-5");
      sole.setAttribute("rx", "6");
      sole.setAttribute("ry", "12");
      sole.setAttribute("fill", "rgba(67, 48, 31, 0.72)");

      const heel = document.createElementNS(SVG_NAMESPACE, "ellipse");
      heel.setAttribute("cx", "0");
      heel.setAttribute("cy", "9");
      heel.setAttribute("rx", "4.5");
      heel.setAttribute("ry", "5.5");
      heel.setAttribute("fill", "rgba(67, 48, 31, 0.68)");

      const fade = document.createElementNS(SVG_NAMESPACE, "animate");
      fade.setAttribute("attributeName", "opacity");
      fade.setAttribute("values", "0;0.72;0.56;0");
      fade.setAttribute("keyTimes", "0;0.08;0.58;1");
      fade.setAttribute("begin", "indefinite");
      fade.setAttribute("dur", `${FOOTSTEP_LIFETIME_MS}ms`);
      fade.setAttribute("fill", "freeze");

      footprint.append(sole, heel, fade);
      layer.appendChild(footprint);

      window.setTimeout(() => {
        if (!footprint.isConnected) return;
        (fade as SVGAnimationElement).beginElement();
      }, delay);

      window.setTimeout(() => footprint.remove(), delay + FOOTSTEP_LIFETIME_MS + 120);
    }
  }
}
