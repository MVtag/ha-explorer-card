import { css } from "lit";
import { customElement } from "lit/decorators.js";
import { ExplorerLivingCanvas } from "./explorer-living-canvas";
import type { ExplorerPresence, ExplorerRoom, NormalizedPoint } from "../models/config";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const AFTERGLOW_MS = 30_000;

interface RoomActivity {
  room: ExplorerRoom;
  active: boolean;
  afterglow: boolean;
  intensity: number;
}

@customElement("explorer-presence-activity-canvas")
export class ExplorerPresenceActivityCanvas extends ExplorerLivingCanvas {
  private readonly lastOccupiedAt = new Map<string, number>();
  private afterglowTimer?: number;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has("presences") || changed.has("rooms")) {
      this.syncPresenceRoomActivity();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.afterglowTimer !== undefined) window.clearTimeout(this.afterglowTimer);
  }

  private pointInPolygon(point: NormalizedPoint, polygon: NormalizedPoint[]): boolean {
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

  private roomForPresence(presence: ExplorerPresence): ExplorerRoom | undefined {
    if (presence.room_id) {
      const explicit = this.rooms.find((room) =>
        room.id === presence.room_id || room.area_id === presence.room_id,
      );
      if (explicit) return explicit;
    }

    if (presence.x === undefined || presence.y === undefined) return undefined;
    const point: NormalizedPoint = [presence.x, presence.y];
    return this.rooms.find((room) => this.pointInPolygon(point, room.points));
  }

  private activities(now: number): RoomActivity[] {
    const occupied = new Map<string, number>();
    this.presences
      .filter((presence) => presence.visible !== false && (presence.type ?? "person") === "person")
      .forEach((presence) => {
        const room = this.roomForPresence(presence);
        if (!room) return;
        occupied.set(room.id, (occupied.get(room.id) ?? 0) + 1);
        this.lastOccupiedAt.set(room.id, now);
      });

    return this.rooms.map((room) => {
      const count = occupied.get(room.id) ?? 0;
      const active = count > 0;
      const age = now - (this.lastOccupiedAt.get(room.id) ?? -Infinity);
      const afterglow = !active && age >= 0 && age < AFTERGLOW_MS;
      const intensity = active ? Math.min(1, 0.72 + Math.max(0, count - 1) * 0.12) :
        afterglow ? Math.max(0, 1 - age / AFTERGLOW_MS) : 0;
      return { room, active, afterglow, intensity };
    }).filter((entry) => entry.active || entry.afterglow);
  }

  private polygonPoints(room: ExplorerRoom): string {
    return room.points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
  }

  private scheduleAfterglowRefresh(activities: RoomActivity[], now: number): void {
    if (this.afterglowTimer !== undefined) window.clearTimeout(this.afterglowTimer);
    const expiries = activities
      .filter((entry) => entry.afterglow)
      .map((entry) => AFTERGLOW_MS - (now - (this.lastOccupiedAt.get(entry.room.id) ?? now)));
    if (!expiries.length) return;
    this.afterglowTimer = window.setTimeout(() => {
      this.afterglowTimer = undefined;
      this.syncPresenceRoomActivity();
    }, Math.max(50, Math.min(...expiries) + 30));
  }

  private syncRoomClasses(activities: RoomActivity[]): void {
    const roomGroups = Array.from(this.renderRoot.querySelectorAll<SVGGElement>("g.rooms-scene > g.room"));
    roomGroups.forEach((group) => group.classList.remove("presence-active", "presence-afterglow"));

    this.rooms.filter((room) => room.points.length).forEach((room, index) => {
      const activity = activities.find((entry) => entry.room.id === room.id);
      const group = roomGroups[index];
      if (!activity || !group) return;
      group.classList.add(activity.active ? "presence-active" : "presence-afterglow");
    });
  }

  private syncPresenceRoomActivity(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;

    scene.querySelector<SVGGElement>(":scope > g.presence-room-activity-scene")?.remove();
    const now = Date.now();
    const activities = this.activities(now);
    this.syncRoomClasses(activities);
    this.scheduleAfterglowRefresh(activities, now);
    if (!activities.length) return;

    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "presence-room-activity-scene");
    layer.setAttribute("aria-label", "Tilstedeværelsesbaseret rumaktivitet");
    layer.setAttribute("pointer-events", "none");

    activities.forEach(({ room, active, intensity }) => {
      if (room.points.length < 3) return;
      const polygon = document.createElementNS(SVG_NAMESPACE, "polygon");
      polygon.setAttribute("points", this.polygonPoints(room));
      polygon.setAttribute("class", active ? "presence-room-active" : "presence-room-afterglow");
      polygon.setAttribute("fill", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))");
      polygon.setAttribute("fill-opacity", String(active ? 0.10 + intensity * 0.07 : 0.025 + intensity * 0.07));
      polygon.setAttribute("stroke", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))");
      polygon.setAttribute("stroke-opacity", String(active ? 0.28 : 0.08 + intensity * 0.16));
      polygon.setAttribute("stroke-width", active ? "3" : "2");
      polygon.setAttribute("vector-effect", "non-scaling-stroke");
      layer.appendChild(polygon);
    });

    const reactionLayer = scene.querySelector<SVGGElement>(":scope > g.room-reactions-scene");
    const routeLayer = scene.querySelector<SVGGElement>(":scope > g.route-status-scene");
    const footstepsLayer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, reactionLayer ?? routeLayer ?? footstepsLayer ?? presencesLayer ?? null);
  }

  static override styles = css`
    ${ExplorerLivingCanvas.styles}

    :host {
      --explorer-presence-room-color: var(--primary-color, #03a9f4);
    }

    .room.presence-active .room-label {
      font-weight: 850;
      opacity: 1;
      filter: drop-shadow(0 0 5px color-mix(in srgb, var(--explorer-presence-room-color) 45%, transparent));
    }

    .room.presence-afterglow .room-label {
      font-weight: 700;
      opacity: .88;
    }

    .presence-room-activity-scene polygon {
      transition: fill-opacity .7s ease, stroke-opacity .7s ease;
    }

    :host([map-theme="enchanted_antique"]) {
      --explorer-presence-room-color: #6f4b2e;
    }

    :host([map-theme="enchanted_antique"]) .presence-room-activity-scene polygon {
      mix-blend-mode: multiply;
      filter: sepia(.35) drop-shadow(0 0 2px rgba(76, 45, 25, .20));
    }

    :host([map-theme="enchanted_antique"]) .room.presence-active .room-label {
      letter-spacing: .065em;
      text-shadow: 0 0 7px rgba(91, 57, 34, .24);
    }

    @media (prefers-reduced-motion: reduce) {
      .presence-room-activity-scene polygon {
        transition: none;
      }
    }
  `;
}
