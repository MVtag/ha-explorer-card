import { css } from "lit";
import { customElement } from "lit/decorators.js";
import { ExplorerPresencePolishCanvas } from "./explorer-presence-polish-canvas";
import type { ExplorerPresence, ExplorerRoom, NormalizedPoint } from "../models/config";
import { VIEWBOX_SIZE } from "../utils/viewport";

const MAGIC_SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const MAGIC_AFTERGLOW_MS = 30_000;
const MAGIC_REFRESH_MS = 900;

interface MagicRoomActivity {
  room: ExplorerRoom;
  active: boolean;
  afterglow: boolean;
  intensity: number;
}

@customElement("explorer-room-magic-canvas")
export class ExplorerRoomMagicCanvas extends ExplorerPresencePolishCanvas {
  private readonly magicPreviousOccupiedRooms = new Set<string>();
  private readonly magicAfterglowStartedAt = new Map<string, number>();
  private magicRefreshTimer?: number;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has("presences") || changed.has("rooms") || changed.has("theme")) {
      this.magicSyncRoomAtmosphere();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.magicRefreshTimer !== undefined) window.clearTimeout(this.magicRefreshTimer);
    this.magicRefreshTimer = undefined;
  }

  private magicPointInPolygon(point: NormalizedPoint, polygon: NormalizedPoint[]): boolean {
    if (polygon.length < 3) return false;
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      const intersects = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / ((yj - yi) || Number.EPSILON) + xi);
      if (intersects) inside = !inside;
    }
    return inside;
  }

  private magicRoomForPresence(presence: ExplorerPresence): ExplorerRoom | undefined {
    if (presence.room_id) {
      const explicit = this.rooms.find((room) =>
        room.id === presence.room_id || room.area_id === presence.room_id,
      );
      if (explicit) return explicit;
    }

    if (presence.x === undefined || presence.y === undefined) return undefined;
    const point: NormalizedPoint = [presence.x, presence.y];
    return this.rooms.find((room) => this.magicPointInPolygon(point, room.points));
  }

  private magicActivities(now: number): MagicRoomActivity[] {
    const occupied = new Map<string, number>();
    this.presences
      .filter((presence) => presence.visible !== false && (presence.type ?? "person") === "person")
      .forEach((presence) => {
        const room = this.magicRoomForPresence(presence);
        if (!room) return;
        occupied.set(room.id, (occupied.get(room.id) ?? 0) + 1);
      });

    const currentOccupiedRooms = new Set(occupied.keys());
    for (const roomId of this.magicPreviousOccupiedRooms) {
      if (!currentOccupiedRooms.has(roomId)) this.magicAfterglowStartedAt.set(roomId, now);
    }
    for (const roomId of currentOccupiedRooms) this.magicAfterglowStartedAt.delete(roomId);

    this.magicPreviousOccupiedRooms.clear();
    currentOccupiedRooms.forEach((roomId) => this.magicPreviousOccupiedRooms.add(roomId));

    return this.rooms.map((room) => {
      const count = occupied.get(room.id) ?? 0;
      const active = count > 0;
      const afterglowStartedAt = this.magicAfterglowStartedAt.get(room.id);
      const age = afterglowStartedAt === undefined ? Infinity : now - afterglowStartedAt;
      const afterglow = !active && age >= 0 && age < MAGIC_AFTERGLOW_MS;
      const intensity = active
        ? Math.min(1, 0.72 + Math.max(0, count - 1) * 0.12)
        : afterglow ? Math.max(0, 1 - age / MAGIC_AFTERGLOW_MS) : 0;
      if (!afterglow && afterglowStartedAt !== undefined) this.magicAfterglowStartedAt.delete(room.id);
      return { room, active, afterglow, intensity };
    }).filter((entry) => entry.active || entry.afterglow);
  }

  private magicPolygonPoints(room: ExplorerRoom): string {
    return room.points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
  }

  private magicScheduleRefresh(activities: MagicRoomActivity[]): void {
    if (this.magicRefreshTimer !== undefined) window.clearTimeout(this.magicRefreshTimer);
    if (!activities.some((entry) => entry.afterglow)) return;
    this.magicRefreshTimer = window.setTimeout(() => {
      this.magicRefreshTimer = undefined;
      this.magicSyncRoomAtmosphere();
    }, MAGIC_REFRESH_MS);
  }

  private magicAppendRoom(layer: SVGGElement, activity: MagicRoomActivity): void {
    const { room, active, intensity } = activity;
    if (room.points.length < 3) return;
    const points = this.magicPolygonPoints(room);
    const group = document.createElementNS(MAGIC_SVG_NAMESPACE, "g");
    group.setAttribute("class", `room-magic ${active ? "active" : "afterglow"}`);
    group.setAttribute("data-room-id", room.id);

    const aura = document.createElementNS(MAGIC_SVG_NAMESPACE, "polygon");
    aura.setAttribute("class", "room-magic-aura");
    aura.setAttribute("points", points);
    aura.setAttribute("fill", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))");
    aura.setAttribute("fill-opacity", String(active ? 0.028 + intensity * 0.026 : 0.008 + intensity * 0.028));
    aura.setAttribute("stroke", "none");
    group.appendChild(aura);

    const edge = document.createElementNS(MAGIC_SVG_NAMESPACE, "polygon");
    edge.setAttribute("class", "room-magic-edge");
    edge.setAttribute("points", points);
    edge.setAttribute("fill", "none");
    edge.setAttribute("stroke", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))");
    edge.setAttribute("stroke-opacity", String(active ? 0.08 + intensity * 0.055 : 0.02 + intensity * 0.07));
    edge.setAttribute("stroke-width", active ? "4" : "3");
    edge.setAttribute("stroke-linejoin", "round");
    edge.setAttribute("vector-effect", "non-scaling-stroke");
    group.appendChild(edge);

    layer.appendChild(group);
  }

  private magicSyncRoomAtmosphere(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;

    scene.querySelector<SVGGElement>(":scope > g.room-magic-scene")?.remove();
    const activities = this.magicActivities(Date.now());
    this.magicScheduleRefresh(activities);
    if (!activities.length) return;

    const layer = document.createElementNS(MAGIC_SVG_NAMESPACE, "g");
    layer.setAttribute("class", "room-magic-scene");
    layer.setAttribute("aria-label", "Magisk rumaktivitet");
    layer.setAttribute("pointer-events", "none");
    activities.forEach((activity) => this.magicAppendRoom(layer, activity));

    const temperatureLayer = scene.querySelector<SVGGElement>(":scope > g.room-temperature-atmosphere-scene");
    const activityLayer = scene.querySelector<SVGGElement>(":scope > g.presence-room-activity-scene");
    const reactionLayer = scene.querySelector<SVGGElement>(":scope > g.room-reactions-scene");
    const trailsLayer = scene.querySelector<SVGGElement>(":scope > g.presence-trails-scene");
    const footstepsLayer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(
      layer,
      temperatureLayer ?? activityLayer ?? reactionLayer ?? trailsLayer ?? footstepsLayer ?? presencesLayer ?? null,
    );
  }

  static override styles = css`
    ${ExplorerPresencePolishCanvas.styles}

    :host {
      --explorer-room-magic-color: var(--primary-color, #03a9f4);
    }

    .room-magic-scene .room-magic-aura,
    .room-magic-scene .room-magic-edge {
      transform-box: fill-box;
      transform-origin: center;
      will-change: opacity, filter;
    }

    .room-magic-scene .room-magic-aura {
      filter: blur(4px);
    }

    .room-magic-scene .room-magic-edge {
      filter: blur(2.6px);
    }

    .room-magic-scene .room-magic.active .room-magic-aura {
      animation: explorerRoomMagicAura 6.4s ease-in-out infinite;
    }

    .room-magic-scene .room-magic.active .room-magic-edge {
      animation: explorerRoomMagicEdge 6.4s ease-in-out infinite reverse;
    }

    .room-magic-scene .room-magic.afterglow {
      transition: opacity .9s linear;
    }

    :host([map-theme="enchanted_antique"]) {
      --explorer-room-magic-color: #c49355;
    }

    :host([map-theme="enchanted_antique"]) .room-magic-scene .room-magic-aura {
      mix-blend-mode: soft-light;
      filter: sepia(.18) saturate(.72) blur(5px);
    }

    :host([map-theme="enchanted_antique"]) .room-magic-scene .room-magic-edge {
      mix-blend-mode: soft-light;
      filter: sepia(.22) saturate(.68) blur(3.2px);
    }

    @keyframes explorerRoomMagicAura {
      0%, 100% { opacity: .58; filter: blur(4px) brightness(.98); }
      48% { opacity: 1; filter: blur(6px) brightness(1.08); }
    }

    @keyframes explorerRoomMagicEdge {
      0%, 100% { opacity: .52; }
      52% { opacity: .96; }
    }

    @media (prefers-reduced-motion: reduce) {
      .room-magic-scene .room-magic.active .room-magic-aura,
      .room-magic-scene .room-magic.active .room-magic-edge {
        animation: none;
      }
      .room-magic-scene .room-magic.afterglow {
        transition: none;
      }
    }
  `;
}
