import { customElement } from "lit/decorators.js";
import { ExplorerAnimatedCanvas } from "./explorer-animated-canvas";
import type { ExplorerRoom, NormalizedPoint } from "../models/config";
import {
  summarizeRoomReactions,
  type RoomReactionSummary,
} from "../utils/room-reactions";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

interface RoomAnchor {
  x: number;
  y: number;
}

@customElement("explorer-living-canvas")
export class ExplorerLivingCanvas extends ExplorerAnimatedCanvas {
  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    this.syncRoomReactionOverlay();
  }

  private entityState(entityId: string) {
    const entity = this.hass?.states[entityId];
    if (!entity) return undefined;
    return { state: entity.state, attributes: entity.attributes };
  }

  private roomAnchor(room: ExplorerRoom): RoomAnchor {
    if (room.presence_anchor) return { ...room.presence_anchor };
    if (!room.points.length) return { x: 0.5, y: 0.5 };
    return {
      x: room.points.reduce((sum, point) => sum + point[0], 0) / room.points.length,
      y: room.points.reduce((sum, point) => sum + point[1], 0) / room.points.length,
    };
  }

  private polygonPoints(points: NormalizedPoint[]): string {
    return points
      .map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`)
      .join(" ");
  }

  private appendTitle(parent: SVGElement, text: string): void {
    const title = document.createElementNS(SVG_NAMESPACE, "title");
    title.textContent = text;
    parent.appendChild(title);
  }

  private createPolygon(room: ExplorerRoom): SVGPolygonElement {
    const polygon = document.createElementNS(SVG_NAMESPACE, "polygon");
    polygon.setAttribute("points", this.polygonPoints(room.points));
    polygon.setAttribute("vector-effect", "non-scaling-stroke");
    return polygon;
  }

  private appendLightGlow(
    group: SVGGElement,
    room: ExplorerRoom,
    summary: RoomReactionSummary,
    reduceMotion: boolean,
  ): void {
    if (!summary.lightCount || summary.lightIntensity <= 0) return;

    const glow = this.createPolygon(room);
    glow.setAttribute("fill", "var(--explorer-room-light-color, #f6bd60)");
    glow.setAttribute("stroke", "var(--explorer-room-light-color, #f6bd60)");
    glow.setAttribute("stroke-width", "3");
    glow.setAttribute("stroke-opacity", String(0.18 + summary.lightIntensity * 0.22));
    glow.setAttribute("fill-opacity", String(0.10 + summary.lightIntensity * 0.27));
    group.appendChild(glow);

    if (!reduceMotion) {
      const breathe = document.createElementNS(SVG_NAMESPACE, "animate");
      breathe.setAttribute("attributeName", "fill-opacity");
      breathe.setAttribute(
        "values",
        `${0.10 + summary.lightIntensity * 0.24};${0.13 + summary.lightIntensity * 0.30};${0.10 + summary.lightIntensity * 0.24}`,
      );
      breathe.setAttribute("dur", "4.6s");
      breathe.setAttribute("repeatCount", "indefinite");
      glow.appendChild(breathe);
    }
  }

  private appendMotionPulse(
    group: SVGGElement,
    room: ExplorerRoom,
    reduceMotion: boolean,
  ): void {
    const outline = this.createPolygon(room);
    outline.setAttribute("fill", "none");
    outline.setAttribute("stroke", "var(--explorer-room-motion-color, var(--primary-color, #03a9f4))");
    outline.setAttribute("stroke-width", "5");
    outline.setAttribute("stroke-opacity", ".78");
    group.appendChild(outline);

    const anchor = this.roomAnchor(room);
    const pulse = document.createElementNS(SVG_NAMESPACE, "circle");
    pulse.setAttribute("cx", String(anchor.x * VIEWBOX_SIZE));
    pulse.setAttribute("cy", String(anchor.y * VIEWBOX_SIZE));
    pulse.setAttribute("r", "18");
    pulse.setAttribute("fill", "none");
    pulse.setAttribute("stroke", "var(--explorer-room-motion-color, var(--primary-color, #03a9f4))");
    pulse.setAttribute("stroke-width", "4");
    pulse.setAttribute("vector-effect", "non-scaling-stroke");
    group.appendChild(pulse);

    if (!reduceMotion) {
      const radius = document.createElementNS(SVG_NAMESPACE, "animate");
      radius.setAttribute("attributeName", "r");
      radius.setAttribute("values", "16;34;16");
      radius.setAttribute("dur", "1.8s");
      radius.setAttribute("repeatCount", "indefinite");
      pulse.appendChild(radius);

      const opacity = document.createElementNS(SVG_NAMESPACE, "animate");
      opacity.setAttribute("attributeName", "opacity");
      opacity.setAttribute("values", ".9;.28;.9");
      opacity.setAttribute("dur", "1.8s");
      opacity.setAttribute("repeatCount", "indefinite");
      pulse.appendChild(opacity);
    }
  }

  private appendMediaMarker(group: SVGGElement, room: ExplorerRoom): void {
    const anchor = this.roomAnchor(room);
    const marker = document.createElementNS(SVG_NAMESPACE, "g");
    marker.setAttribute(
      "transform",
      `translate(${anchor.x * VIEWBOX_SIZE + 34} ${anchor.y * VIEWBOX_SIZE - 30})`,
    );

    const circle = document.createElementNS(SVG_NAMESPACE, "circle");
    circle.setAttribute("r", "15");
    circle.setAttribute("fill", "var(--card-background-color, #ffffff)");
    circle.setAttribute("fill-opacity", ".9");
    circle.setAttribute("stroke", "var(--explorer-room-media-color, var(--accent-color, #7e57c2))");
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("vector-effect", "non-scaling-stroke");
    marker.appendChild(circle);

    const play = document.createElementNS(SVG_NAMESPACE, "path");
    play.setAttribute("d", "M -4 -7 L 8 0 L -4 7 Z");
    play.setAttribute("fill", "var(--explorer-room-media-color, var(--accent-color, #7e57c2))");
    marker.appendChild(play);
    group.appendChild(marker);
  }

  private appendOpeningOutline(group: SVGGElement, room: ExplorerRoom): void {
    const outline = this.createPolygon(room);
    outline.setAttribute("fill", "none");
    outline.setAttribute("stroke", "var(--explorer-room-opening-color, var(--warning-color, #ff9800))");
    outline.setAttribute("stroke-width", "4");
    outline.setAttribute("stroke-dasharray", "12 9");
    outline.setAttribute("stroke-opacity", ".9");
    group.appendChild(outline);

    const anchor = this.roomAnchor(room);
    const marker = document.createElementNS(SVG_NAMESPACE, "text");
    marker.setAttribute("x", String(anchor.x * VIEWBOX_SIZE - 35));
    marker.setAttribute("y", String(anchor.y * VIEWBOX_SIZE - 28));
    marker.setAttribute("text-anchor", "middle");
    marker.setAttribute("dominant-baseline", "central");
    marker.setAttribute("font-size", "24");
    marker.setAttribute("font-weight", "900");
    marker.setAttribute("fill", "var(--explorer-room-opening-color, var(--warning-color, #ff9800))");
    marker.setAttribute("paint-order", "stroke");
    marker.setAttribute("stroke", "var(--card-background-color, #ffffff)");
    marker.setAttribute("stroke-width", "5");
    marker.textContent = "↗";
    group.appendChild(marker);
  }

  private summaryTitle(room: ExplorerRoom, summary: RoomReactionSummary): string {
    const parts: string[] = [];
    if (summary.lightCount) parts.push(`${summary.lightCount} lys aktiv${summary.lightCount === 1 ? "t" : "e"}`);
    if (summary.motionActive) parts.push("bevægelse");
    if (summary.mediaActive) parts.push("media aktiv");
    if (summary.openingActive) parts.push("åbning aktiv");
    return `${room.name ?? room.id} · ${parts.join(" · ")}`;
  }

  private syncRoomReactionOverlay(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;

    scene.querySelector<SVGGElement>(":scope > g.room-reactions-scene")?.remove();

    const activeRooms = this.rooms
      .map((room) => ({
        room,
        summary: summarizeRoomReactions(
          room,
          (entityId) => this.entityState(entityId),
        ),
      }))
      .filter(({ room, summary }) => room.points.length >= 3 && summary.activeCount > 0);

    if (!activeRooms.length) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "room-reactions-scene");
    layer.setAttribute("aria-label", "Levende rum og Home Assistant reaktioner");
    layer.setAttribute("pointer-events", "none");

    activeRooms.forEach(({ room, summary }) => {
      const group = document.createElementNS(SVG_NAMESPACE, "g");
      group.setAttribute("class", `room-reaction room-${room.id}`);

      this.appendLightGlow(group, room, summary, reduceMotion);
      if (summary.motionActive) this.appendMotionPulse(group, room, reduceMotion);
      if (summary.mediaActive) this.appendMediaMarker(group, room);
      if (summary.openingActive) this.appendOpeningOutline(group, room);

      this.appendTitle(group, this.summaryTitle(room, summary));
      layer.appendChild(group);
    });

    const routeLayer = scene.querySelector<SVGGElement>(":scope > g.route-status-scene");
    const footstepsLayer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, routeLayer ?? footstepsLayer ?? presencesLayer ?? null);
  }
}
