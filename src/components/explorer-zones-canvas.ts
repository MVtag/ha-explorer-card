import { css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ExplorerThemedCanvas } from "./explorer-themed-canvas";
import type { ExplorerZone, ExplorerZoneKind, NormalizedPoint } from "../models/config";
import { evaluateZones, type ExplorerZoneStatus } from "../utils/zones";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const ZONE_COLORS: Record<ExplorerZoneKind, string> = {
  info: "var(--explorer-zone-info, #2d8f74)",
  warning: "var(--explorer-zone-warning, #f59e0b)",
  danger: "var(--explorer-zone-danger, #d64545)",
  cleaning: "var(--explorer-zone-cleaning, #3b82c4)",
  restricted: "var(--explorer-zone-restricted, #8b5a9e)",
};

const ZONE_SYMBOLS: Record<ExplorerZoneKind, string> = {
  info: "i",
  warning: "!",
  danger: "!",
  cleaning: "✦",
  restricted: "×",
};

@customElement("explorer-zones-canvas")
export class ExplorerZonesCanvas extends ExplorerThemedCanvas {
  @property({ attribute: false }) public zones: ExplorerZone[] = [];

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has("zones") || changed.has("hass") || changed.has("theme") || changed.has("rooms")) {
      this.syncZonesOverlay();
    }
  }

  private zonePolygonPoints(points: NormalizedPoint[]): string {
    return points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
  }

  private zoneCenter(zone: ExplorerZone): { x: number; y: number } {
    if (zone.label) return { x: zone.label.x * VIEWBOX_SIZE, y: zone.label.y * VIEWBOX_SIZE };
    if (!zone.points.length) return { x: VIEWBOX_SIZE / 2, y: VIEWBOX_SIZE / 2 };
    return {
      x: (zone.points.reduce((sum, point) => sum + point[0], 0) / zone.points.length) * VIEWBOX_SIZE,
      y: (zone.points.reduce((sum, point) => sum + point[1], 0) / zone.points.length) * VIEWBOX_SIZE,
    };
  }

  private zoneColor(zone: ExplorerZone): string {
    return zone.color?.trim() || ZONE_COLORS[zone.kind ?? "info"];
  }

  private appendZoneTitle(parent: SVGElement, status: ExplorerZoneStatus): void {
    const title = document.createElementNS(SVG_NAMESPACE, "title");
    const zone = status.zone;
    const binding = status.entity
      ? ` · ${status.entity}: ${status.currentState ?? "ukendt"} · aktiv: ${status.activeStates.join(", ")}`
      : " · altid aktiv";
    title.textContent = `${zone.name ?? zone.id}${binding}`;
    parent.appendChild(title);
  }

  private renderZone(layer: SVGGElement, status: ExplorerZoneStatus, reduceMotion: boolean): void {
    const zone = status.zone;
    if (!status.active || zone.points.length < 3) return;

    const kind = zone.kind ?? "info";
    const color = this.zoneColor(zone);
    const group = document.createElementNS(SVG_NAMESPACE, "g");
    group.setAttribute("class", `dynamic-zone zone-${kind} zone-${zone.id}`);
    group.setAttribute("pointer-events", "none");

    const polygon = document.createElementNS(SVG_NAMESPACE, "polygon");
    polygon.setAttribute("points", this.zonePolygonPoints(zone.points));
    polygon.setAttribute("fill", color);
    polygon.setAttribute("fill-opacity", kind === "danger" || kind === "restricted" ? ".18" : ".13");
    polygon.setAttribute("stroke", color);
    polygon.setAttribute("stroke-width", kind === "danger" ? "5" : "4");
    polygon.setAttribute("stroke-opacity", ".88");
    polygon.setAttribute("stroke-linejoin", "round");
    polygon.setAttribute("vector-effect", "non-scaling-stroke");
    if (kind === "warning") polygon.setAttribute("stroke-dasharray", "16 9");
    if (kind === "restricted") polygon.setAttribute("stroke-dasharray", "7 7");
    if (kind === "cleaning") polygon.setAttribute("stroke-dasharray", "4 8");
    group.appendChild(polygon);

    if (kind === "danger" && !reduceMotion) {
      const pulse = document.createElementNS(SVG_NAMESPACE, "animate");
      pulse.setAttribute("attributeName", "fill-opacity");
      pulse.setAttribute("values", ".12;.25;.12");
      pulse.setAttribute("dur", "2.2s");
      pulse.setAttribute("repeatCount", "indefinite");
      polygon.appendChild(pulse);
    }

    const center = this.zoneCenter(zone);
    const marker = document.createElementNS(SVG_NAMESPACE, "g");
    marker.setAttribute("transform", `translate(${center.x} ${center.y})`);
    marker.setAttribute("class", "zone-marker");

    const markerBg = document.createElementNS(SVG_NAMESPACE, "circle");
    markerBg.setAttribute("r", "17");
    markerBg.setAttribute("fill", "var(--card-background-color, #ffffff)");
    markerBg.setAttribute("fill-opacity", ".90");
    markerBg.setAttribute("stroke", color);
    markerBg.setAttribute("stroke-width", "3");
    markerBg.setAttribute("vector-effect", "non-scaling-stroke");
    marker.appendChild(markerBg);

    const symbol = document.createElementNS(SVG_NAMESPACE, "text");
    symbol.setAttribute("text-anchor", "middle");
    symbol.setAttribute("dominant-baseline", "central");
    symbol.setAttribute("fill", color);
    symbol.setAttribute("font-size", "18");
    symbol.setAttribute("font-weight", "900");
    symbol.setAttribute("font-family", "system-ui, sans-serif");
    symbol.textContent = ZONE_SYMBOLS[kind];
    marker.appendChild(symbol);
    group.appendChild(marker);

    if (zone.name) {
      const label = document.createElementNS(SVG_NAMESPACE, "text");
      label.setAttribute("x", String(center.x));
      label.setAttribute("y", String(center.y + 36));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "zone-label");
      label.setAttribute("fill", color);
      label.setAttribute("font-size", "22");
      label.setAttribute("font-weight", "800");
      label.setAttribute("font-family", "system-ui, sans-serif");
      label.setAttribute("paint-order", "stroke");
      label.setAttribute("stroke", "var(--card-background-color, #ffffff)");
      label.setAttribute("stroke-width", "5");
      label.setAttribute("stroke-linejoin", "round");
      label.textContent = zone.name;
      group.appendChild(label);
    }

    this.appendZoneTitle(group, status);
    layer.appendChild(group);
  }

  private syncZonesOverlay(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;

    scene.querySelector<SVGGElement>(":scope > g.zones-scene")?.remove();
    if (!this.zones.length) return;

    const statuses = evaluateZones(this.zones, (entityId) => this.hass?.states[entityId]?.state);
    const active = statuses.filter((status) => status.active && status.zone.points.length >= 3);
    if (!active.length) return;

    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "zones-scene");
    layer.setAttribute("aria-label", "Dynamiske zoner");
    layer.setAttribute("pointer-events", "none");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    active.forEach((status) => this.renderZone(layer, status, reduceMotion));

    const roomReactionLayer = scene.querySelector<SVGGElement>(":scope > g.room-reactions-scene");
    const routeLayer = scene.querySelector<SVGGElement>(":scope > g.route-status-scene");
    const footstepsLayer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, roomReactionLayer ?? routeLayer ?? footstepsLayer ?? presencesLayer ?? null);
  }

  static override styles = css`
    ${ExplorerThemedCanvas.styles}

    :host {
      --explorer-zone-info: #2d8f74;
      --explorer-zone-warning: #f59e0b;
      --explorer-zone-danger: #d64545;
      --explorer-zone-cleaning: #3b82c4;
      --explorer-zone-restricted: #8b5a9e;
    }

    :host([map-theme="enchanted_antique"]) {
      --explorer-zone-info: #65704b;
      --explorer-zone-warning: #9b6a31;
      --explorer-zone-danger: #8a4438;
      --explorer-zone-cleaning: #5e6f73;
      --explorer-zone-restricted: #6f4f58;
    }

    :host([map-theme="enchanted_antique"]) .zones-scene polygon {
      mix-blend-mode: multiply;
      filter: drop-shadow(0 .7px .7px rgba(67, 40, 22, .24));
    }

    :host([map-theme="enchanted_antique"]) .zone-label,
    :host([map-theme="enchanted_antique"]) .zone-marker text {
      font-family: Georgia, Cambria, "Times New Roman", serif !important;
      letter-spacing: .035em;
    }
  `;
}
