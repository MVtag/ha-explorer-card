import { customElement } from "lit/decorators.js";
import { ExplorerAnimatedCanvas } from "./explorer-animated-canvas";
import type { ExplorerRoom, RoomReactionKind } from "../models/config";
import {
  evaluateRoomReactions,
  roomReactionPosition,
  type RoomReactionStatus,
} from "../utils/room-reactions";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

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

  private appendTitle(parent: SVGElement, text: string): void {
    const title = document.createElementNS(SVG_NAMESPACE, "title");
    title.textContent = text;
    parent.appendChild(title);
  }

  private pointColor(kind: RoomReactionKind): string {
    if (kind === "light") return "var(--explorer-room-light-color, #f6bd60)";
    if (kind === "motion") return "var(--explorer-room-motion-color, var(--primary-color, #03a9f4))";
    if (kind === "media") return "var(--explorer-room-media-color, var(--accent-color, #7e57c2))";
    if (kind === "opening") return "var(--explorer-room-opening-color, var(--warning-color, #ff9800))";
    return "var(--explorer-room-temperature-neutral, #4f9b78)";
  }

  private appendPointBackdrop(
    group: SVGGElement,
    color: string,
    active: boolean,
    radius = 11,
  ): SVGCircleElement {
    const circle = document.createElementNS(SVG_NAMESPACE, "circle");
    circle.setAttribute("r", String(radius));
    circle.setAttribute("fill", "var(--card-background-color, #ffffff)");
    circle.setAttribute("fill-opacity", active ? ".94" : ".78");
    circle.setAttribute("stroke", color);
    circle.setAttribute("stroke-width", active ? "3" : "2");
    circle.setAttribute("stroke-opacity", active ? ".95" : ".42");
    circle.setAttribute("vector-effect", "non-scaling-stroke");
    group.appendChild(circle);
    return circle;
  }

  private appendLightPoint(
    group: SVGGElement,
    status: RoomReactionStatus,
    reduceMotion: boolean,
  ): void {
    const color = this.pointColor("light");

    if (status.active) {
      const halo = document.createElementNS(SVG_NAMESPACE, "circle");
      const radius = 24 + status.intensity * 24;
      halo.setAttribute("r", String(radius));
      halo.setAttribute("fill", color);
      halo.setAttribute("fill-opacity", String(0.08 + status.intensity * 0.18));
      halo.setAttribute("stroke", color);
      halo.setAttribute("stroke-width", "2");
      halo.setAttribute("stroke-opacity", String(0.10 + status.intensity * 0.18));
      halo.setAttribute("vector-effect", "non-scaling-stroke");
      group.appendChild(halo);

      if (!reduceMotion) {
        const breathe = document.createElementNS(SVG_NAMESPACE, "animate");
        breathe.setAttribute("attributeName", "r");
        breathe.setAttribute("values", `${radius * 0.92};${radius * 1.08};${radius * 0.92}`);
        breathe.setAttribute("dur", "3.4s");
        breathe.setAttribute("repeatCount", "indefinite");
        halo.appendChild(breathe);
      }
    }

    this.appendPointBackdrop(group, color, status.active, 11);
    const glyph = document.createElementNS(SVG_NAMESPACE, "text");
    glyph.setAttribute("text-anchor", "middle");
    glyph.setAttribute("dominant-baseline", "central");
    glyph.setAttribute("font-size", "15");
    glyph.setAttribute("font-weight", "900");
    glyph.setAttribute("fill", color);
    glyph.setAttribute("opacity", status.active ? "1" : ".48");
    glyph.textContent = "✦";
    group.appendChild(glyph);
  }

  private appendMotionPoint(
    group: SVGGElement,
    status: RoomReactionStatus,
    reduceMotion: boolean,
  ): void {
    const color = this.pointColor("motion");
    this.appendPointBackdrop(group, color, status.active, 10);

    const dot = document.createElementNS(SVG_NAMESPACE, "circle");
    dot.setAttribute("r", status.active ? "4.5" : "3.5");
    dot.setAttribute("fill", color);
    dot.setAttribute("opacity", status.active ? "1" : ".42");
    group.appendChild(dot);

    if (!status.active) return;
    const pulse = document.createElementNS(SVG_NAMESPACE, "circle");
    pulse.setAttribute("r", "15");
    pulse.setAttribute("fill", "none");
    pulse.setAttribute("stroke", color);
    pulse.setAttribute("stroke-width", "3");
    pulse.setAttribute("stroke-opacity", ".78");
    pulse.setAttribute("vector-effect", "non-scaling-stroke");
    group.insertBefore(pulse, group.firstChild);

    if (!reduceMotion) {
      const radius = document.createElementNS(SVG_NAMESPACE, "animate");
      radius.setAttribute("attributeName", "r");
      radius.setAttribute("values", "13;31;13");
      radius.setAttribute("dur", "1.8s");
      radius.setAttribute("repeatCount", "indefinite");
      pulse.appendChild(radius);

      const opacity = document.createElementNS(SVG_NAMESPACE, "animate");
      opacity.setAttribute("attributeName", "stroke-opacity");
      opacity.setAttribute("values", ".82;.16;.82");
      opacity.setAttribute("dur", "1.8s");
      opacity.setAttribute("repeatCount", "indefinite");
      pulse.appendChild(opacity);
    }
  }

  private appendMediaPoint(group: SVGGElement, status: RoomReactionStatus): void {
    const color = this.pointColor("media");

    if (status.active) {
      const halo = document.createElementNS(SVG_NAMESPACE, "circle");
      halo.setAttribute("r", "25");
      halo.setAttribute("fill", color);
      halo.setAttribute("fill-opacity", ".12");
      group.appendChild(halo);
    }

    const screen = document.createElementNS(SVG_NAMESPACE, "rect");
    screen.setAttribute("x", "-16");
    screen.setAttribute("y", "-11");
    screen.setAttribute("width", "32");
    screen.setAttribute("height", "22");
    screen.setAttribute("rx", "4");
    screen.setAttribute("fill", "var(--card-background-color, #ffffff)");
    screen.setAttribute("fill-opacity", status.active ? ".94" : ".78");
    screen.setAttribute("stroke", color);
    screen.setAttribute("stroke-width", status.active ? "3" : "2");
    screen.setAttribute("stroke-opacity", status.active ? ".95" : ".42");
    screen.setAttribute("vector-effect", "non-scaling-stroke");
    group.appendChild(screen);

    const play = document.createElementNS(SVG_NAMESPACE, "path");
    play.setAttribute("d", "M -4 -6 L 7 0 L -4 6 Z");
    play.setAttribute("fill", color);
    play.setAttribute("opacity", status.active ? "1" : ".40");
    group.appendChild(play);
  }

  private appendOpeningPoint(group: SVGGElement, status: RoomReactionStatus): void {
    const color = this.pointColor("opening");
    this.appendPointBackdrop(group, color, status.active, 11);

    const glyph = document.createElementNS(SVG_NAMESPACE, "text");
    glyph.setAttribute("text-anchor", "middle");
    glyph.setAttribute("dominant-baseline", "central");
    glyph.setAttribute("font-size", status.active ? "18" : "15");
    glyph.setAttribute("font-weight", "900");
    glyph.setAttribute("fill", color);
    glyph.setAttribute("opacity", status.active ? "1" : ".42");
    glyph.textContent = status.active ? "↗" : "━";
    group.appendChild(glyph);
  }

  private temperatureColor(status: RoomReactionStatus): string {
    if (status.numericValue === undefined) {
      return "var(--secondary-text-color, #777777)";
    }

    const unit = status.unit?.toLowerCase() ?? "";
    const celsius = unit.includes("f")
      ? (status.numericValue - 32) * (5 / 9)
      : status.numericValue;

    if (celsius < 18) return "var(--explorer-room-temperature-cold, #4f87c5)";
    if (celsius <= 22) return "var(--explorer-room-temperature-neutral, #4f9b78)";
    if (celsius <= 25) return "var(--explorer-room-temperature-warm, #d69b39)";
    return "var(--explorer-room-temperature-hot, #c65b45)";
  }

  private formatTemperature(status: RoomReactionStatus): string {
    if (status.numericValue === undefined) return "--";
    const value = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(status.numericValue);
    return status.unit ? `${value} ${status.unit}` : `${value}°`;
  }

  private appendTemperaturePoint(group: SVGGElement, status: RoomReactionStatus): void {
    const color = this.temperatureColor(status);
    const textValue = this.formatTemperature(status);
    const width = Math.max(58, 24 + textValue.length * 8.2);

    const pill = document.createElementNS(SVG_NAMESPACE, "rect");
    pill.setAttribute("x", String(-width / 2));
    pill.setAttribute("y", "-15");
    pill.setAttribute("width", String(width));
    pill.setAttribute("height", "30");
    pill.setAttribute("rx", "15");
    pill.setAttribute("fill", "var(--card-background-color, #ffffff)");
    pill.setAttribute("fill-opacity", status.active ? ".94" : ".78");
    pill.setAttribute("stroke", color);
    pill.setAttribute("stroke-width", "2.5");
    pill.setAttribute("stroke-opacity", status.active ? ".92" : ".42");
    pill.setAttribute("vector-effect", "non-scaling-stroke");
    group.appendChild(pill);

    const value = document.createElementNS(SVG_NAMESPACE, "text");
    value.setAttribute("text-anchor", "middle");
    value.setAttribute("dominant-baseline", "central");
    value.setAttribute("font-size", "14");
    value.setAttribute("font-weight", "800");
    value.setAttribute("fill", color);
    value.setAttribute("opacity", status.active ? "1" : ".48");
    value.textContent = textValue;
    group.appendChild(value);
  }

  private appendReactionPoint(
    layer: SVGGElement,
    room: ExplorerRoom,
    status: RoomReactionStatus,
    reduceMotion: boolean,
  ): void {
    const position = roomReactionPosition(room, status.reaction);
    const group = document.createElementNS(SVG_NAMESPACE, "g");
    group.setAttribute(
      "class",
      `room-reaction-point ${status.reaction.kind} ${status.active ? "active" : "inactive"}`,
    );
    group.setAttribute(
      "transform",
      `translate(${position.x * VIEWBOX_SIZE} ${position.y * VIEWBOX_SIZE})`,
    );

    if (status.reaction.kind === "light") this.appendLightPoint(group, status, reduceMotion);
    else if (status.reaction.kind === "motion") this.appendMotionPoint(group, status, reduceMotion);
    else if (status.reaction.kind === "media") this.appendMediaPoint(group, status);
    else if (status.reaction.kind === "opening") this.appendOpeningPoint(group, status);
    else this.appendTemperaturePoint(group, status);

    const stateText = status.reaction.kind === "temperature"
      ? this.formatTemperature(status)
      : status.currentState ?? "ukendt";
    this.appendTitle(
      group,
      `${room.name ?? room.id} · ${status.reaction.entity} · ${stateText}`,
    );
    layer.appendChild(group);
  }

  private syncRoomReactionOverlay(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;

    scene.querySelector<SVGGElement>(":scope > g.room-reactions-scene")?.remove();

    const entries = this.rooms.flatMap((room) =>
      evaluateRoomReactions(room, (entityId) => this.entityState(entityId))
        .map((status) => ({ room, status })),
    );
    if (!entries.length) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "room-reactions-scene");
    layer.setAttribute("aria-label", "Home Assistant entity-punkter");
    layer.setAttribute("pointer-events", "none");

    entries.forEach(({ room, status }) =>
      this.appendReactionPoint(layer, room, status, reduceMotion));

    const routeLayer = scene.querySelector<SVGGElement>(":scope > g.route-status-scene");
    const footstepsLayer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, routeLayer ?? footstepsLayer ?? presencesLayer ?? null);
  }
}
