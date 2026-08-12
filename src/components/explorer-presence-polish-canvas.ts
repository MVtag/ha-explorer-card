import { css } from "lit";
import { customElement } from "lit/decorators.js";
import { ExplorerZonesCanvas } from "./explorer-zones-canvas";
import type { ExplorerPresence, PresenceObjectType } from "../models/config";
import { resolveRoute } from "../utils/route-resolver";
import { VIEWBOX_SIZE } from "../utils/viewport";

interface PolishPosition {
  x: number;
  y: number;
}

interface PolishOffset {
  x: number;
  y: number;
  groupSize: number;
}

const POLISH_SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const POLISH_TRAIL_LIFETIME_MS = 4200;
const POLISH_MOVEMENT_DURATION_MS = 900;

const POLISH_TYPE_LABELS: Record<PresenceObjectType, string> = {
  person: "Person",
  pet: "Kæledyr",
  robot: "Robot",
  vehicle: "Køretøj",
  object: "Objekt",
};

const POLISH_TYPE_HUES: Record<PresenceObjectType, number[]> = {
  person: [202, 344, 42, 158, 274, 18],
  pet: [28, 112, 326, 52, 178, 286],
  robot: [188, 218, 264, 164, 204, 238],
  vehicle: [12, 210, 38, 330, 186, 262],
  object: [272, 44, 154, 320, 196, 22],
};

function polishHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function polishClamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

@customElement("explorer-presence-polish-canvas")
export class ExplorerPresencePolishCanvas extends ExplorerZonesCanvas {
  private readonly polishPreviousPositions = new Map<string, PolishPosition>();
  private readonly polishPreviousRooms = new Map<string, string | undefined>();

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);

    if (changed.has("presences") || changed.has("theme")) {
      this.polishSyncPresenceVisuals();
    }

    if (changed.has("presences")) {
      this.polishSyncTrails();
    }
  }

  private polishPresenceColor(presence: ExplorerPresence): string {
    const configured = presence.color?.trim();
    if (configured) return configured;

    const type = presence.type ?? "person";
    const hues = POLISH_TYPE_HUES[type];
    const hue = hues[polishHash(presence.id) % hues.length];
    return this.theme === "enchanted_antique"
      ? `hsl(${hue} 34% 38%)`
      : `hsl(${hue} 62% 47%)`;
  }

  private polishBasePosition(presence: ExplorerPresence): PolishPosition {
    return {
      x: (presence.x ?? 0.5) * VIEWBOX_SIZE,
      y: (presence.y ?? 0.5) * VIEWBOX_SIZE,
    };
  }

  private polishGroupKey(presence: ExplorerPresence): string {
    if (presence.room_id) return `room:${presence.room_id}`;
    const position = this.polishBasePosition(presence);
    return `point:${Math.round(position.x / 3)}:${Math.round(position.y / 3)}`;
  }

  private polishOffsets(presences: ExplorerPresence[]): Map<string, PolishOffset> {
    const groups = new Map<string, ExplorerPresence[]>();
    presences.forEach((presence) => {
      const key = this.polishGroupKey(presence);
      const group = groups.get(key) ?? [];
      group.push(presence);
      groups.set(key, group);
    });

    const offsets = new Map<string, PolishOffset>();
    groups.forEach((group) => {
      const ordered = [...group].sort((a, b) => a.id.localeCompare(b.id));
      if (ordered.length === 1) {
        offsets.set(ordered[0].id, { x: 0, y: 0, groupSize: 1 });
        return;
      }

      const radius = Math.min(68, 34 + ordered.length * 6);
      ordered.forEach((presence, index) => {
        const base = this.polishBasePosition(presence);
        const angle = ordered.length === 2
          ? (index === 0 ? Math.PI : 0)
          : -Math.PI / 2 + (Math.PI * 2 * index) / ordered.length;
        const targetX = polishClamp(base.x + Math.cos(angle) * radius, 38, VIEWBOX_SIZE - 38);
        const targetY = polishClamp(base.y + Math.sin(angle) * radius, 38, VIEWBOX_SIZE - 64);
        offsets.set(presence.id, {
          x: targetX - base.x,
          y: targetY - base.y,
          groupSize: ordered.length,
        });
      });
    });

    return offsets;
  }

  private polishCreateSvg<K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] {
    return document.createElementNS(POLISH_SVG_NAMESPACE, tag);
  }

  private polishSetAttributes(element: Element, attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  }

  private polishAppendTypeBadge(
    wrapper: SVGGElement,
    presence: ExplorerPresence,
    color: string,
  ): void {
    if (wrapper.querySelector(":scope > g.presence-type-badge")) return;

    const type = presence.type ?? "person";
    const badge = this.polishCreateSvg("g");
    badge.setAttribute("class", `presence-type-badge badge-${type}`);
    badge.setAttribute("transform", "translate(21 -21)");
    badge.setAttribute("pointer-events", "none");

    const background = this.polishCreateSvg("circle");
    this.polishSetAttributes(background, {
      r: "9.5",
      fill: "var(--card-background-color, #ffffff)",
      "fill-opacity": ".94",
      stroke: color,
      "stroke-width": "2.5",
      "vector-effect": "non-scaling-stroke",
    });
    badge.appendChild(background);

    if (type === "person") {
      const head = this.polishCreateSvg("circle");
      this.polishSetAttributes(head, { cx: "0", cy: "-2.8", r: "2.5", fill: color });
      const body = this.polishCreateSvg("path");
      this.polishSetAttributes(body, { d: "M -4 5 Q -3 0 0 0 Q 3 0 4 5 Z", fill: color });
      badge.append(head, body);
    } else if (type === "pet") {
      const pad = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(pad, { cx: "0", cy: "2", rx: "3.4", ry: "3", fill: color });
      badge.appendChild(pad);
      [[-4, -2], [-1.5, -4.6], [1.5, -4.6], [4, -2]].forEach(([cx, cy]) => {
        const toe = this.polishCreateSvg("circle");
        this.polishSetAttributes(toe, { cx: String(cx), cy: String(cy), r: "1.5", fill: color });
        badge.appendChild(toe);
      });
    } else if (type === "robot") {
      const body = this.polishCreateSvg("rect");
      this.polishSetAttributes(body, { x: "-5", y: "-4", width: "10", height: "8", rx: "2", fill: color });
      badge.appendChild(body);
      [-2.2, 2.2].forEach((cx) => {
        const eye = this.polishCreateSvg("circle");
        this.polishSetAttributes(eye, { cx: String(cx), cy: "-1", r: "1", fill: "var(--card-background-color, #ffffff)" });
        badge.appendChild(eye);
      });
      const antenna = this.polishCreateSvg("line");
      this.polishSetAttributes(antenna, { x1: "0", y1: "-4", x2: "0", y2: "-7", stroke: color, "stroke-width": "1.6" });
      badge.appendChild(antenna);
    } else if (type === "vehicle") {
      const body = this.polishCreateSvg("rect");
      this.polishSetAttributes(body, { x: "-5.5", y: "-2.5", width: "11", height: "5", rx: "1.5", fill: color });
      badge.appendChild(body);
      [-3.5, 3.5].forEach((cx) => {
        const wheel = this.polishCreateSvg("circle");
        this.polishSetAttributes(wheel, { cx: String(cx), cy: "3.5", r: "1.5", fill: color });
        badge.appendChild(wheel);
      });
    } else {
      const diamond = this.polishCreateSvg("path");
      this.polishSetAttributes(diamond, { d: "M 0 -6 L 5 0 L 0 6 L -5 0 Z", fill: color });
      badge.appendChild(diamond);
    }

    wrapper.appendChild(badge);
  }

  private polishSyncPresenceVisuals(): void {
    const visible = this.presences.filter((presence) => presence.visible !== false);
    const elements = Array.from(this.renderRoot.querySelectorAll<SVGGElement>("g.presence"));
    const offsets = this.polishOffsets(visible);

    visible.forEach((presence, index) => {
      const element = elements[index];
      if (!element) return;

      const type = presence.type ?? "person";
      const color = this.polishPresenceColor(presence);
      const offset = offsets.get(presence.id) ?? { x: 0, y: 0, groupSize: 1 };
      element.setAttribute("data-presence-id", presence.id);
      element.setAttribute("data-presence-type", type);
      element.classList.add("presence-polished", `presence-${type}`);

      let wrapper = element.querySelector<SVGGElement>(":scope > g.presence-visual-offset");
      if (!wrapper) {
        wrapper = this.polishCreateSvg("g");
        wrapper.setAttribute("class", "presence-visual-offset");
        const movableChildren = Array.from(element.children).filter(
          (child) => child.localName.toLowerCase() !== "animatetransform",
        );
        movableChildren.forEach((child) => wrapper?.appendChild(child));
        element.insertBefore(wrapper, element.firstChild);
      }

      wrapper.setAttribute("transform", `translate(${offset.x} ${offset.y})`);
      wrapper.querySelector<SVGElement>(".presence-marker")?.setAttribute("fill", color);
      wrapper.querySelector<SVGElement>(".presence-avatar-background")?.setAttribute("fill", color);
      wrapper.querySelector<SVGElement>(".presence-border")?.setAttribute("stroke", color);
      this.polishAppendTypeBadge(wrapper, presence, color);

      const title = this.polishCreateSvg("title");
      const groupText = offset.groupSize > 1 ? ` · ${offset.groupSize} på samme position` : "";
      title.textContent = `${presence.name ?? presence.id} · ${POLISH_TYPE_LABELS[type]}${groupText}`;
      element.appendChild(title);
    });
  }

  private polishRouteConfig() {
    return {
      type: "custom:ha-explorer-card",
      rooms: this.rooms,
      route_nodes: this.routeNodes,
      route_graph_edges: this.routeGraphEdges,
      routes: this.routes,
    };
  }

  private polishMovementPath(
    from: PolishPosition,
    to: PolishPosition,
    fromRoom?: string,
    toRoom?: string,
  ): PolishPosition[] {
    if (!fromRoom || !toRoom || fromRoom === toRoom) return [from, to];

    const resolution = resolveRoute(
      this.polishRouteConfig(),
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

  private polishEnsureTrailLayer(): SVGGElement | undefined {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return undefined;

    let layer = scene.querySelector<SVGGElement>(":scope > g.presence-trails-scene");
    if (layer) return layer;

    layer = this.polishCreateSvg("g");
    layer.setAttribute("class", "presence-trails-scene");
    layer.setAttribute("aria-label", "Person- og objektspor");
    layer.setAttribute("pointer-events", "none");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, presencesLayer ?? null);
    return layer;
  }

  private polishTrailSpacing(type: PresenceObjectType): number {
    if (type === "pet") return 46;
    if (type === "robot") return 42;
    if (type === "vehicle") return 54;
    if (type === "object") return 62;
    return 58;
  }

  private polishAppendTrailShape(
    mark: SVGGElement,
    type: PresenceObjectType,
    color: string,
  ): void {
    if (type === "person") {
      const sole = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(sole, { cx: "0", cy: "-5", rx: "5.5", ry: "11", fill: color });
      const heel = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(heel, { cx: "0", cy: "8", rx: "4", ry: "5", fill: color });
      mark.append(sole, heel);
      return;
    }

    if (type === "pet") {
      const pad = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(pad, { cx: "0", cy: "2", rx: "5", ry: "6", fill: color });
      mark.appendChild(pad);
      [[-5, -5], [-1.7, -8], [2, -8], [5.2, -4.5]].forEach(([cx, cy]) => {
        const toe = this.polishCreateSvg("circle");
        this.polishSetAttributes(toe, { cx: String(cx), cy: String(cy), r: "2.2", fill: color });
        mark.appendChild(toe);
      });
      return;
    }

    if (type === "robot") {
      [-7, 3].forEach((x) => {
        const tread = this.polishCreateSvg("rect");
        this.polishSetAttributes(tread, { x: String(x), y: "-8", width: "4", height: "16", rx: "1.4", fill: color });
        mark.appendChild(tread);
      });
      const center = this.polishCreateSvg("circle");
      this.polishSetAttributes(center, { cx: "0", cy: "0", r: "2", fill: color });
      mark.appendChild(center);
      return;
    }

    if (type === "vehicle") {
      [-7, 4].forEach((x) => {
        const track = this.polishCreateSvg("rect");
        this.polishSetAttributes(track, { x: String(x), y: "-11", width: "3", height: "22", rx: "1", fill: color });
        mark.appendChild(track);
      });
      return;
    }

    const diamond = this.polishCreateSvg("path");
    this.polishSetAttributes(diamond, { d: "M 0 -7 L 6 0 L 0 7 L -6 0 Z", fill: color });
    const center = this.polishCreateSvg("circle");
    this.polishSetAttributes(center, { cx: "0", cy: "0", r: "1.6", fill: "var(--card-background-color, #ffffff)" });
    mark.append(diamond, center);
  }

  private polishCreateTrail(path: PolishPosition[], presence: ExplorerPresence): void {
    const layer = this.polishEnsureTrailLayer();
    if (!layer || path.length < 2) return;

    const type = presence.type ?? "person";
    const color = this.polishPresenceColor(presence);
    const segments = path.slice(1).map((point, index) => {
      const start = path[index];
      return {
        start,
        end: point,
        length: Math.hypot(point.x - start.x, point.y - start.y),
      };
    });
    const totalDistance = segments.reduce((sum, segment) => sum + segment.length, 0);
    const spacing = this.polishTrailSpacing(type);
    if (totalDistance < spacing) return;

    const markCount = Math.min(24, Math.max(3, Math.floor(totalDistance / spacing)));
    for (let index = 0; index < markCount; index += 1) {
      const progress = (index + 1) / (markCount + 1);
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

      const local = segment.length > 0 ? (targetDistance - traversed) / segment.length : 0;
      const dx = segment.end.x - segment.start.x;
      const dy = segment.end.y - segment.start.y;
      const side = index % 2 === 0 ? -1 : 1;
      const alternating = type === "person" ? 8 : type === "pet" ? 6 : 0;
      const perpendicularX = segment.length > 0 ? -dy / segment.length : 0;
      const perpendicularY = segment.length > 0 ? dx / segment.length : 0;
      const x = segment.start.x + dx * local + perpendicularX * alternating * side;
      const y = segment.start.y + dy * local + perpendicularY * alternating * side;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const delay = Math.round(progress * POLISH_MOVEMENT_DURATION_MS);

      const mark = this.polishCreateSvg("g");
      mark.setAttribute("class", `trail-mark trail-${type}`);
      mark.setAttribute("data-presence-id", presence.id);
      mark.setAttribute("transform", `translate(${x} ${y}) rotate(${angle + (alternating ? side * 7 : 0)})`);
      mark.setAttribute("opacity", "0");
      this.polishAppendTrailShape(mark, type, color);

      const fade = this.polishCreateSvg("animate");
      this.polishSetAttributes(fade, {
        attributeName: "opacity",
        values: "0;0.78;0.54;0",
        keyTimes: "0;0.08;0.58;1",
        begin: "indefinite",
        dur: `${POLISH_TRAIL_LIFETIME_MS}ms`,
        fill: "freeze",
      });
      mark.appendChild(fade);
      layer.appendChild(mark);

      window.setTimeout(() => {
        if (!mark.isConnected) return;
        (fade as SVGAnimationElement).beginElement();
      }, delay);
      window.setTimeout(() => mark.remove(), delay + POLISH_TRAIL_LIFETIME_MS + 120);
    }
  }

  private polishSyncTrails(): void {
    const visible = this.presences.filter((presence) => presence.visible !== false);
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const currentIds = new Set<string>();

    visible.forEach((presence) => {
      const current = this.polishBasePosition(presence);
      const previous = this.polishPreviousPositions.get(presence.id);
      const previousRoom = this.polishPreviousRooms.get(presence.id);
      const currentRoom = presence.room_id;
      currentIds.add(presence.id);

      if (
        !reduceMotion &&
        previous &&
        (Math.abs(previous.x - current.x) > 0.01 || Math.abs(previous.y - current.y) > 0.01)
      ) {
        this.polishCreateTrail(
          this.polishMovementPath(previous, current, previousRoom, currentRoom),
          presence,
        );
      }

      this.polishPreviousPositions.set(presence.id, current);
      this.polishPreviousRooms.set(presence.id, currentRoom);
    });

    for (const id of this.polishPreviousPositions.keys()) {
      if (!currentIds.has(id)) {
        this.polishPreviousPositions.delete(id);
        this.polishPreviousRooms.delete(id);
      }
    }
  }

  static override styles = css`
    ${ExplorerZonesCanvas.styles}

    /* v0.24 owns the visible trail layer; the legacy shoe-print layer still exists internally
       for backward-compatible movement animation, but is hidden here. */
    .footsteps-scene { display: none; }

    .presence-visual-offset {
      transition: transform 220ms ease;
    }

    .presence-type-badge {
      filter: drop-shadow(0 1px 2px rgba(0,0,0,.22));
    }

    .presence-trails-scene .trail-mark {
      filter: drop-shadow(0 0 1.2px rgba(0,0,0,.20));
    }

    :host([map-theme="enchanted_antique"]) .presence-type-badge {
      filter: sepia(.35) drop-shadow(0 1px 1px rgba(67,40,22,.28));
    }

    :host([map-theme="enchanted_antique"]) .presence-trails-scene .trail-mark {
      mix-blend-mode: multiply;
      filter: sepia(.28) saturate(.78) drop-shadow(0 0 1px rgba(67,40,22,.28));
    }

    :host([map-theme="enchanted_antique"]) .presence-border {
      stroke-width: 4.5px !important;
    }

    @media (prefers-reduced-motion: reduce) {
      .presence-visual-offset { transition: none; }
    }
  `;
}
