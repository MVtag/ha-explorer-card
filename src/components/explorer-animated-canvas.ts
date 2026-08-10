import { customElement, property } from "lit/decorators.js";
import { ExplorerCanvas } from "./explorer-canvas";
import type {
  ExplorerRoute,
  ExplorerRouteGraphEdge,
  ExplorerRouteGraphEndpoint,
  ExplorerRouteNode,
  ExplorerRouteStep,
  NormalizedPoint,
} from "../models/config";
import { VIEWBOX_SIZE } from "../utils/viewport";

interface PresencePosition {
  x: number;
  y: number;
}

interface GraphNeighbor {
  key: string;
  weight: number;
}

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

  private resolveMovementPath(
    from: PresencePosition,
    to: PresencePosition,
    fromRoom?: string,
    toRoom?: string,
  ): PresencePosition[] {
    if (!fromRoom || !toRoom || fromRoom === toRoom) return [from, to];

    const direct = this.routes.find((route) => route.from === fromRoom && route.to === toRoom);
    if (direct) return [from, ...this.resolveRouteWaypoints(direct, false), to];

    const reverse = this.routes.find((route) => route.from === toRoom && route.to === fromRoom);
    if (reverse) return [from, ...this.resolveRouteWaypoints(reverse, true), to];

    const graphWaypoints = this.resolveGraphWaypoints(fromRoom, toRoom);
    if (graphWaypoints) return [from, ...graphWaypoints, to];

    return [from, to];
  }

  private resolveRouteWaypoints(route: ExplorerRoute, reverse: boolean): PresencePosition[] {
    const steps = this.routeSteps(route);
    const ordered = reverse ? [...steps].reverse() : steps;
    const points: NormalizedPoint[] = [];

    ordered.forEach((step) => {
      const point = this.resolveRouteStep(step);
      if (point) points.push(point);
    });

    return this.toViewboxPoints(points);
  }

  private routeSteps(route: ExplorerRoute): ExplorerRouteStep[] {
    if (route.path) return route.path;
    return (route.via ?? []).map((point) => ({ point }));
  }

  private resolveRouteStep(step: ExplorerRouteStep): NormalizedPoint | undefined {
    if (step.node_id) {
      return this.routeNodes.find((node) => node.id === step.node_id)?.point;
    }
    return step.point;
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

  private graphEndpointKey(endpoint: ExplorerRouteGraphEndpoint): string {
    return `${endpoint.kind}:${endpoint.id}`;
  }

  private graphEndpointPoint(endpoint: ExplorerRouteGraphEndpoint): NormalizedPoint | undefined {
    if (endpoint.kind === "room") return this.roomAnchor(endpoint.id);
    return this.routeNodes.find((node) => node.id === endpoint.id)?.point;
  }

  private resolveGraphWaypoints(fromRoom: string, toRoom: string): PresencePosition[] | undefined {
    if (!this.routeGraphEdges.length) return undefined;

    const startKey = `room:${fromRoom}`;
    const targetKey = `room:${toRoom}`;
    const positions = new Map<string, NormalizedPoint>();
    const adjacency = new Map<string, GraphNeighbor[]>();

    const rememberEndpoint = (endpoint: ExplorerRouteGraphEndpoint): NormalizedPoint | undefined => {
      const key = this.graphEndpointKey(endpoint);
      const existing = positions.get(key);
      if (existing) return existing;
      const point = this.graphEndpointPoint(endpoint);
      if (point) positions.set(key, point);
      return point;
    };

    const addNeighbor = (fromKey: string, toKey: string, weight: number): void => {
      const list = adjacency.get(fromKey) ?? [];
      list.push({ key: toKey, weight });
      adjacency.set(fromKey, list);
    };

    this.routeGraphEdges.forEach((edge) => {
      const fromPoint = rememberEndpoint(edge.from);
      const toPoint = rememberEndpoint(edge.to);
      if (!fromPoint || !toPoint) return;
      const fromKey = this.graphEndpointKey(edge.from);
      const toKey = this.graphEndpointKey(edge.to);
      const weight = Math.hypot(toPoint[0] - fromPoint[0], toPoint[1] - fromPoint[1]);
      addNeighbor(fromKey, toKey, weight);
      addNeighbor(toKey, fromKey, weight);
    });

    if (!adjacency.has(startKey) || !adjacency.has(targetKey)) return undefined;

    const distances = new Map<string, number>();
    const previous = new Map<string, string>();
    const unvisited = new Set<string>(adjacency.keys());
    adjacency.forEach((neighbors) => neighbors.forEach((neighbor) => unvisited.add(neighbor.key)));
    unvisited.forEach((key) => distances.set(key, Number.POSITIVE_INFINITY));
    distances.set(startKey, 0);

    while (unvisited.size) {
      let current: string | undefined;
      let currentDistance = Number.POSITIVE_INFINITY;
      for (const key of unvisited) {
        const distance = distances.get(key) ?? Number.POSITIVE_INFINITY;
        if (distance < currentDistance) {
          current = key;
          currentDistance = distance;
        }
      }

      if (!current || !Number.isFinite(currentDistance)) break;
      unvisited.delete(current);
      if (current === targetKey) break;

      for (const neighbor of adjacency.get(current) ?? []) {
        if (!unvisited.has(neighbor.key)) continue;
        const candidate = currentDistance + neighbor.weight;
        if (candidate < (distances.get(neighbor.key) ?? Number.POSITIVE_INFINITY)) {
          distances.set(neighbor.key, candidate);
          previous.set(neighbor.key, current);
        }
      }
    }

    if (!Number.isFinite(distances.get(targetKey) ?? Number.POSITIVE_INFINITY)) return undefined;

    const pathKeys = [targetKey];
    let cursor = targetKey;
    while (cursor !== startKey) {
      const parent = previous.get(cursor);
      if (!parent) return undefined;
      pathKeys.push(parent);
      cursor = parent;
    }
    pathKeys.reverse();

    const middle = pathKeys.slice(1, -1)
      .map((key) => positions.get(key))
      .filter((point): point is NormalizedPoint => Boolean(point));
    return this.toViewboxPoints(middle);
  }

  private toViewboxPoints(points: NormalizedPoint[]): PresencePosition[] {
    return points.map(([x, y]) => ({ x: x * VIEWBOX_SIZE, y: y * VIEWBOX_SIZE }));
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
