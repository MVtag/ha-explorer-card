import { css } from "lit";
import { customElement } from "lit/decorators.js";
import { ExplorerLivingCanvas } from "./explorer-living-canvas";
import type { ExplorerPresence, ExplorerRoom, ExplorerWeatherEffect, NormalizedPoint } from "../models/config";
import { evaluateRoomReactions, roomReactionPosition, type RoomReactionStatus } from "../utils/room-reactions";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const AFTERGLOW_MS = 30_000;

interface RoomActivity {
  room: ExplorerRoom;
  active: boolean;
  afterglow: boolean;
  intensity: number;
}

interface RoomTemperatureAtmosphere {
  room: ExplorerRoom;
  celsius: number;
}

@customElement("explorer-presence-activity-canvas")
export class ExplorerPresenceActivityCanvas extends ExplorerLivingCanvas {
  private readonly lastOccupiedAt = new Map<string, number>();
  private afterglowTimer?: number;
  private readonly overcastMaskId = `explorer-overcast-mask-${Math.random().toString(36).slice(2, 10)}`;
  private readonly overcastFilterId = `explorer-overcast-soft-${Math.random().toString(36).slice(2, 10)}`;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has("presences") || changed.has("rooms")) {
      this.syncPresenceRoomActivity();
    }
    if (changed.has("hass") || changed.has("rooms") || changed.has("theme")) {
      this.syncTemperatureAtmosphere();
      this.syncFireplaceAtmosphere();
    }
    if (
      changed.has("weatherEffect") ||
      changed.has("weatherIntensity") ||
      changed.has("weatherNight") ||
      changed.has("rooms") ||
      changed.has("theme") ||
      changed.has("image") ||
      changed.has("metadata") ||
      changed.has("svgMarkup") ||
      changed.has("imageSource")
    ) {
      this.syncOvercastCloudDensity();
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

  private atmosphereEntityState(entityId: string) {
    const entity = this.hass?.states[entityId];
    if (!entity) return undefined;
    return { state: entity.state, attributes: entity.attributes };
  }

  private temperatureCelsius(status: RoomReactionStatus): number | undefined {
    if (status.numericValue === undefined || !Number.isFinite(status.numericValue)) return undefined;
    const unit = status.unit?.trim().toLowerCase() ?? "";
    return unit.includes("f") ? (status.numericValue - 32) * (5 / 9) : status.numericValue;
  }

  private temperatureBand(celsius: number): "cold" | "neutral" | "warm" | "hot" {
    if (celsius < 18) return "cold";
    if (celsius <= 22) return "neutral";
    if (celsius <= 25) return "warm";
    return "hot";
  }

  private atmosphereTemperatureColor(celsius: number): string {
    const band = this.temperatureBand(celsius);
    if (band === "cold") return "var(--explorer-room-temperature-cold, #4f87c5)";
    if (band === "neutral") return "var(--explorer-room-temperature-neutral, #4f9b78)";
    if (band === "warm") return "var(--explorer-room-temperature-warm, #d69b39)";
    return "var(--explorer-room-temperature-hot, #c65b45)";
  }

  private temperatureOpacity(celsius: number): number {
    if (celsius < 18) return Math.min(0.115, 0.045 + (18 - celsius) * 0.0115);
    if (celsius <= 22) return 0.023 + Math.abs(celsius - 20) * 0.005;
    if (celsius <= 25) return 0.038 + ((celsius - 22) / 3) * 0.058;
    return Math.min(0.15, 0.096 + (celsius - 25) * 0.0115);
  }

  private roomTemperatures(): RoomTemperatureAtmosphere[] {
    return this.rooms.flatMap((room) => {
      if (room.points.length < 3) return [];
      const values = evaluateRoomReactions(room, (entityId) => this.atmosphereEntityState(entityId))
        .filter((status) => status.reaction.kind === "temperature" && status.active)
        .map((status) => this.temperatureCelsius(status))
        .filter((value): value is number => value !== undefined);
      if (!values.length) return [];
      const celsius = values.reduce((sum, value) => sum + value, 0) / values.length;
      return [{ room, celsius }];
    });
  }

  private syncTemperatureAtmosphere(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;

    scene.querySelector<SVGGElement>(":scope > g.room-temperature-atmosphere-scene")?.remove();
    const temperatures = this.roomTemperatures();
    if (!temperatures.length) return;

    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "room-temperature-atmosphere-scene");
    layer.setAttribute("aria-label", "Temperaturatmosfære i rum");
    layer.setAttribute("pointer-events", "none");

    temperatures.forEach(({ room, celsius }) => {
      const opacity = this.temperatureOpacity(celsius);
      const color = this.atmosphereTemperatureColor(celsius);
      const band = this.temperatureBand(celsius);
      const polygon = document.createElementNS(SVG_NAMESPACE, "polygon");
      polygon.setAttribute("points", this.polygonPoints(room));
      polygon.setAttribute("class", `room-temperature-atmosphere temperature-${band}`);
      polygon.setAttribute("data-temperature-band", band);
      polygon.setAttribute("fill", color);
      polygon.setAttribute("fill-opacity", String(opacity));
      polygon.setAttribute("stroke", color);
      polygon.setAttribute("stroke-opacity", String(Math.min(0.18, 0.045 + opacity * 0.9)));
      polygon.setAttribute("stroke-width", "2");
      polygon.setAttribute("stroke-linejoin", "round");
      polygon.setAttribute("vector-effect", "non-scaling-stroke");
      const title = document.createElementNS(SVG_NAMESPACE, "title");
      const value = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(celsius);
      title.textContent = `${room.name ?? room.id} · temperaturatmosfære · ${value} °C`;
      polygon.appendChild(title);
      layer.appendChild(polygon);
    });

    const activityLayer = scene.querySelector<SVGGElement>(":scope > g.presence-room-activity-scene");
    const reactionLayer = scene.querySelector<SVGGElement>(":scope > g.room-reactions-scene");
    const routeLayer = scene.querySelector<SVGGElement>(":scope > g.route-status-scene");
    const footstepsLayer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, activityLayer ?? reactionLayer ?? routeLayer ?? footstepsLayer ?? presencesLayer ?? null);
  }

  private appendFireplaceAtmosphere(
    layer: SVGGElement,
    room: ExplorerRoom,
    status: RoomReactionStatus,
    reduceMotion: boolean,
    fireplaceIndex: number,
  ): void {
    const position = roomReactionPosition(room, status.reaction);
    const intensity = Math.max(0.2, Math.min(1, status.intensity || 1));
    const configuredRadius = status.reaction.radius;
    const radius = Number.isFinite(configuredRadius)
      ? Math.max(42, Math.min(180, (configuredRadius as number) * VIEWBOX_SIZE))
      : 82;
    const group = document.createElementNS(SVG_NAMESPACE, "g");
    group.setAttribute("class", "fireplace-atmosphere");
    group.setAttribute("transform", `translate(${position.x * VIEWBOX_SIZE} ${position.y * VIEWBOX_SIZE})`);
    group.setAttribute("data-room-id", room.id);

    const outer = document.createElementNS(SVG_NAMESPACE, "circle");
    outer.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-outer");
    outer.setAttribute("r", String(radius * 1.18));
    outer.setAttribute("fill", "var(--explorer-fireplace-atmosphere, #c97935)");
    outer.setAttribute("fill-opacity", String(0.045 + intensity * 0.055));
    group.appendChild(outer);

    const middle = document.createElementNS(SVG_NAMESPACE, "circle");
    middle.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-middle");
    middle.setAttribute("r", String(radius * 0.72));
    middle.setAttribute("fill", "var(--explorer-fireplace-atmosphere-hot, #e6a34b)");
    middle.setAttribute("fill-opacity", String(0.065 + intensity * 0.085));
    group.appendChild(middle);

    const core = document.createElementNS(SVG_NAMESPACE, "ellipse");
    core.setAttribute("class", "fireplace-atmosphere-core");
    core.setAttribute("cx", "0");
    core.setAttribute("cy", String(-radius * 0.05));
    core.setAttribute("rx", String(radius * 0.39));
    core.setAttribute("ry", String(radius * 0.31));
    core.setAttribute("fill", "var(--explorer-fireplace-atmosphere-core, #f0b65c)");
    core.setAttribute("fill-opacity", String(0.07 + intensity * 0.09));
    group.appendChild(core);

    if (!reduceMotion) {
      const outerFlicker = document.createElementNS(SVG_NAMESPACE, "animate");
      outerFlicker.setAttribute("attributeName", "fill-opacity");
      outerFlicker.setAttribute("values", `${0.04 + intensity * 0.045};${0.065 + intensity * 0.07};${0.048 + intensity * 0.052};${0.04 + intensity * 0.045}`);
      outerFlicker.setAttribute("dur", `${3.2 + (fireplaceIndex % 3) * 0.35}s`);
      outerFlicker.setAttribute("repeatCount", "indefinite");
      outer.appendChild(outerFlicker);

      const middleFlicker = document.createElementNS(SVG_NAMESPACE, "animate");
      middleFlicker.setAttribute("attributeName", "fill-opacity");
      middleFlicker.setAttribute("values", `${0.075 + intensity * 0.07};${0.13 + intensity * 0.11};${0.09 + intensity * 0.08};${0.145 + intensity * 0.105};${0.075 + intensity * 0.07}`);
      middleFlicker.setAttribute("dur", `${1.65 + (fireplaceIndex % 2) * 0.22}s`);
      middleFlicker.setAttribute("repeatCount", "indefinite");
      middle.appendChild(middleFlicker);
    }

    const emberOffsets: Array<[number, number, number]> = [
      [-18, -10, 2.4],
      [12, -18, 2.0],
      [-5, -28, 1.7],
      [22, -6, 1.5],
      [-26, -22, 1.4],
      [5, -38, 1.25],
    ];
    emberOffsets.forEach(([cx, cy, emberRadius], index) => {
      const ember = document.createElementNS(SVG_NAMESPACE, "circle");
      ember.setAttribute("class", "fireplace-ember");
      ember.setAttribute("cx", String(cx));
      ember.setAttribute("cy", String(cy));
      ember.setAttribute("r", String(emberRadius));
      ember.setAttribute("fill", index % 2 === 0
        ? "var(--explorer-fireplace-ember, #d96532)"
        : "var(--explorer-fireplace-atmosphere-core, #f0b65c)");
      ember.setAttribute("opacity", reduceMotion ? String(0.28 + intensity * 0.22) : "0");
      group.appendChild(ember);
      if (!reduceMotion) {
        const rise = document.createElementNS(SVG_NAMESPACE, "animate");
        rise.setAttribute("attributeName", "cy");
        rise.setAttribute("values", `${cy};${cy - 22 - index * 2};${cy - 38 - index * 3}`);
        rise.setAttribute("dur", `${2.4 + (index % 3) * 0.42}s`);
        rise.setAttribute("begin", `${(index * 0.37 + fireplaceIndex * 0.11).toFixed(2)}s`);
        rise.setAttribute("repeatCount", "indefinite");
        ember.appendChild(rise);
        const fade = document.createElementNS(SVG_NAMESPACE, "animate");
        fade.setAttribute("attributeName", "opacity");
        fade.setAttribute("values", `0;${0.32 + intensity * 0.45};${0.16 + intensity * 0.22};0`);
        fade.setAttribute("keyTimes", "0;0.18;0.68;1");
        fade.setAttribute("dur", `${2.4 + (index % 3) * 0.42}s`);
        fade.setAttribute("begin", `${(index * 0.37 + fireplaceIndex * 0.11).toFixed(2)}s`);
        fade.setAttribute("repeatCount", "indefinite");
        ember.appendChild(fade);
      }
    });

    const title = document.createElementNS(SVG_NAMESPACE, "title");
    title.textContent = `${room.name ?? room.id} · levende pejsatmosfære`;
    group.appendChild(title);
    layer.appendChild(group);
  }

  private syncFireplaceAtmosphere(): void {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return;
    scene.querySelector<SVGGElement>(":scope > g.fireplace-atmosphere-scene")?.remove();

    const entries = this.rooms.flatMap((room) =>
      evaluateRoomReactions(room, (entityId) => this.atmosphereEntityState(entityId))
        .filter((status) => status.reaction.kind === "fireplace" && status.active)
        .map((status) => ({ room, status })),
    );
    if (!entries.length) return;

    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "fireplace-atmosphere-scene");
    layer.setAttribute("aria-label", "Levende pejsatmosfære");
    layer.setAttribute("pointer-events", "none");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    entries.forEach(({ room, status }, index) => this.appendFireplaceAtmosphere(layer, room, status, reduceMotion, index));

    const reactionLayer = scene.querySelector<SVGGElement>(":scope > g.room-reactions-scene");
    const routeLayer = scene.querySelector<SVGGElement>(":scope > g.route-status-scene");
    const footstepsLayer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    const presencesLayer = scene.querySelector<SVGGElement>(":scope > g.presences-scene");
    scene.insertBefore(layer, reactionLayer ?? routeLayer ?? footstepsLayer ?? presencesLayer ?? null);
  }

  private descendantWeather(): { effect: ExplorerWeatherEffect; intensity: number; night: boolean } {
    const weather = this as unknown as {
      weatherEffect?: ExplorerWeatherEffect;
      weatherIntensity?: number;
      weatherNight?: boolean;
    };
    return {
      effect: weather.weatherEffect ?? "clear",
      intensity: Math.min(1, Math.max(0.25, weather.weatherIntensity || 0.6)),
      night: weather.weatherNight ?? false,
    };
  }

  private createOvercastMask(): SVGMaskElement {
    const mask = document.createElementNS(SVG_NAMESPACE, "mask");
    mask.setAttribute("id", this.overcastMaskId);
    mask.setAttribute("maskUnits", "userSpaceOnUse");
    mask.setAttribute("x", "0");
    mask.setAttribute("y", "0");
    mask.setAttribute("width", String(VIEWBOX_SIZE));
    mask.setAttribute("height", String(VIEWBOX_SIZE));
    const outside = document.createElementNS(SVG_NAMESPACE, "rect");
    outside.setAttribute("x", "0");
    outside.setAttribute("y", "0");
    outside.setAttribute("width", String(VIEWBOX_SIZE));
    outside.setAttribute("height", String(VIEWBOX_SIZE));
    outside.setAttribute("fill", "white");
    mask.appendChild(outside);
    this.rooms.forEach((room) => {
      if (room.points.length < 3) return;
      const polygon = document.createElementNS(SVG_NAMESPACE, "polygon");
      polygon.setAttribute("points", this.polygonPoints(room));
      polygon.setAttribute("fill", "black");
      polygon.setAttribute("stroke", "black");
      polygon.setAttribute("stroke-width", "16");
      polygon.setAttribute("stroke-linejoin", "round");
      mask.appendChild(polygon);
    });
    return mask;
  }

  private createOvercastFilter(): SVGFilterElement {
    const filter = document.createElementNS(SVG_NAMESPACE, "filter");
    filter.setAttribute("id", this.overcastFilterId);
    filter.setAttribute("x", "-55%");
    filter.setAttribute("y", "-65%");
    filter.setAttribute("width", "210%");
    filter.setAttribute("height", "240%");
    const blur = document.createElementNS(SVG_NAMESPACE, "feGaussianBlur");
    blur.setAttribute("in", "SourceGraphic");
    blur.setAttribute("stdDeviation", "3.1");
    blur.setAttribute("result", "soft");
    filter.appendChild(blur);
    const turbulence = document.createElementNS(SVG_NAMESPACE, "feTurbulence");
    turbulence.setAttribute("type", "fractalNoise");
    turbulence.setAttribute("baseFrequency", "0.016 0.029");
    turbulence.setAttribute("numOctaves", "3");
    turbulence.setAttribute("seed", "43");
    turbulence.setAttribute("result", "noise");
    filter.appendChild(turbulence);
    const displacement = document.createElementNS(SVG_NAMESPACE, "feDisplacementMap");
    displacement.setAttribute("in", "soft");
    displacement.setAttribute("in2", "noise");
    displacement.setAttribute("scale", "16");
    displacement.setAttribute("xChannelSelector", "R");
    displacement.setAttribute("yChannelSelector", "G");
    filter.appendChild(displacement);
    return filter;
  }

  private appendOvercastCloud(layer: SVGGElement, x: number, y: number, scale: number, index: number, opacity: number): void {
    const position = document.createElementNS(SVG_NAMESPACE, "g");
    position.setAttribute("class", "overcast-cloud-position");
    position.setAttribute("transform", `translate(${x} ${y}) scale(${scale})`);
    position.setAttribute("opacity", String(opacity));
    const cloud = document.createElementNS(SVG_NAMESPACE, "g");
    cloud.setAttribute("class", `overcast-cloud overcast-cloud-${index % 3} overcast-depth-${index % 3}`);

    const mist = document.createElementNS(SVG_NAMESPACE, "ellipse");
    mist.setAttribute("class", "overcast-cloud-mist");
    mist.setAttribute("cx", index % 2 === 0 ? "-12" : "14");
    mist.setAttribute("cy", "18");
    mist.setAttribute("rx", "145");
    mist.setAttribute("ry", "43");
    cloud.appendChild(mist);

    const body = document.createElementNS(SVG_NAMESPACE, "g");
    body.setAttribute("class", "overcast-cloud-body");
    body.setAttribute("filter", `url(#${this.overcastFilterId})`);
    body.setAttribute("transform", index % 2 === 0 ? "scale(1.12 .74) skewX(-4)" : "scale(.98 .88) skewX(5)");
    const base = document.createElementNS(SVG_NAMESPACE, "path");
    base.setAttribute("class", "overcast-cloud-base");
    base.setAttribute("d", "M-150 31 C-133 1 -108 -17 -80 -18 C-66 -47 -41 -62 -13 -57 C5 -78 34 -82 58 -62 C84 -62 107 -48 120 -27 C146 -18 158 5 145 29 C128 53 99 63 66 61 C34 75 -4 74 -37 68 C-76 75 -116 64 -140 48 C-151 41 -155 35 -150 31 Z");
    body.appendChild(base);
    const puffs: Array<[number, number, number, number]> = [
      [-86, -6, 50, 30], [-47, -37, 57, 34], [-3, -51, 65, 38], [43, -43, 58, 35], [82, -17, 50, 30], [14, 23, 92, 27],
    ];
    puffs.forEach(([cx, cy, rx, ry], puffIndex) => {
      const puff = document.createElementNS(SVG_NAMESPACE, "ellipse");
      puff.setAttribute("class", "overcast-cloud-puff");
      puff.setAttribute("cx", String(cx));
      puff.setAttribute("cy", String(cy));
      puff.setAttribute("rx", String(rx));
      puff.setAttribute("ry", String(ry));
      puff.setAttribute("opacity", String(0.34 + (puffIndex % 3) * 0.08));
      body.appendChild(puff);
    });
    cloud.appendChild(body);

    const strand = document.createElementNS(SVG_NAMESPACE, "path");
    strand.setAttribute("class", "overcast-cloud-strand");
    strand.setAttribute("d", "M-184 70 C-130 58 -80 63 -32 68 C18 73 70 65 135 48 C89 79 27 88 -33 82 C-88 78 -139 89 -184 70 Z");
    cloud.appendChild(strand);
    position.appendChild(cloud);
    layer.appendChild(position);
  }

  private syncOvercastCloudDensity(): void {
    const svgRoot = this.renderRoot.querySelector<SVGSVGElement>("svg.floorplan");
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!svgRoot || !scene) return;
    svgRoot.querySelector<SVGDefsElement>(`defs[data-overcast-mask="${this.overcastMaskId}"]`)?.remove();
    scene.querySelector<SVGGElement>(":scope > g.overcast-cloud-density-scene")?.remove();
    const weather = this.descendantWeather();
    if (weather.effect !== "cloudy") return;

    const defs = document.createElementNS(SVG_NAMESPACE, "defs");
    defs.setAttribute("data-overcast-mask", this.overcastMaskId);
    defs.appendChild(this.createOvercastMask());
    defs.appendChild(this.createOvercastFilter());
    svgRoot.insertBefore(defs, svgRoot.firstChild);

    const layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", `overcast-cloud-density-scene${weather.night ? " is-night" : ""}`);
    layer.setAttribute("mask", `url(#${this.overcastMaskId})`);
    layer.setAttribute("pointer-events", "none");
    layer.style.setProperty("--overcast-intensity", String(weather.intensity));
    const extraClouds: Array<[number, number, number, number, number]> = [
      [195, 58, .68, 0, .40],
      [515, 90, .58, 1, .31],
      [845, 58, .66, 2, .38],
      [1040, 205, .62, 3, .36],
      [-28, 215, .63, 4, .37],
      [1035, 535, .72, 5, .42],
      [-34, 520, .69, 6, .40],
      [1028, 830, .66, 7, .37],
      [-20, 865, .64, 8, .36],
      [265, 1035, .63, 9, .36],
      [585, 1038, .56, 10, .31],
      [890, 1028, .64, 11, .36],
    ];
    extraClouds.forEach(([x, y, scale, index, opacity]) => this.appendOvercastCloud(layer, x, y, scale, index, opacity));
    const roomsLayer = scene.querySelector<SVGGElement>(":scope > g.rooms-scene");
    scene.insertBefore(layer, roomsLayer ?? null);
  }

  static override styles = css`
    ${ExplorerLivingCanvas.styles}

    :host {
      --explorer-presence-room-color: var(--primary-color, #03a9f4);
      --explorer-fireplace-atmosphere: #c97935;
      --explorer-fireplace-atmosphere-hot: #e6a34b;
      --explorer-fireplace-atmosphere-core: #f0b65c;
      --explorer-fireplace-ember: #d96532;
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

    .presence-room-activity-scene polygon,
    .room-temperature-atmosphere-scene polygon {
      transition: fill-opacity .7s ease, stroke-opacity .7s ease;
    }

    .fireplace-atmosphere-scene .fireplace-atmosphere-glow,
    .fireplace-atmosphere-scene .fireplace-atmosphere-core {
      mix-blend-mode: soft-light;
    }

    .fireplace-atmosphere-scene .fireplace-ember {
      filter: drop-shadow(0 0 3px color-mix(in srgb, var(--explorer-fireplace-atmosphere-core) 68%, transparent));
    }

    .overcast-cloud-density-scene {
      opacity: min(.78, calc(var(--overcast-intensity, .6) * .88));
    }

    :host-context(ha-card.partly-cloudy) .overcast-cloud-density-scene {
      display: none;
    }

    .overcast-cloud-density-scene .overcast-cloud {
      animation: explorerOvercastDriftA 72s ease-in-out infinite alternate;
      transform-box: fill-box;
      transform-origin: center;
    }

    .overcast-cloud-density-scene .overcast-cloud-1 {
      animation-name: explorerOvercastDriftB;
      animation-direction: alternate-reverse;
    }

    .overcast-cloud-density-scene .overcast-cloud-2 {
      animation-name: explorerOvercastDriftC;
    }

    .overcast-cloud-density-scene .overcast-depth-0 { animation-duration: 58s; }
    .overcast-cloud-density-scene .overcast-depth-1 { animation-duration: 82s; opacity: .72; }
    .overcast-cloud-density-scene .overcast-depth-2 { animation-duration: 108s; opacity: .54; }
    .overcast-cloud-density-scene .overcast-cloud-mist { fill: rgba(230, 228, 222, .16); filter: blur(24px); }
    .overcast-cloud-density-scene .overcast-cloud-base { fill: rgba(205, 205, 201, .28); }
    .overcast-cloud-density-scene .overcast-cloud-puff { fill: rgba(238, 237, 232, .38); }
    .overcast-cloud-density-scene .overcast-cloud-strand { fill: rgba(215, 214, 208, .12); filter: blur(14px); }
    .overcast-cloud-density-scene.is-night .overcast-cloud-mist { fill: rgba(125, 140, 151, .12); }
    .overcast-cloud-density-scene.is-night .overcast-cloud-base { fill: rgba(112, 128, 138, .25); }
    .overcast-cloud-density-scene.is-night .overcast-cloud-puff { fill: rgba(162, 174, 181, .30); }

    :host([map-theme="enchanted_antique"]) {
      --explorer-presence-room-color: #6f4b2e;
      --explorer-room-temperature-cold: #667b88;
      --explorer-room-temperature-neutral: #77805a;
      --explorer-room-temperature-warm: #b27b43;
      --explorer-room-temperature-hot: #a6563e;
      --explorer-fireplace-atmosphere: #a96130;
      --explorer-fireplace-atmosphere-hot: #cb873b;
      --explorer-fireplace-atmosphere-core: #dda34e;
      --explorer-fireplace-ember: #934529;
    }

    :host([map-theme="enchanted_antique"]) .presence-room-activity-scene polygon {
      mix-blend-mode: multiply;
      filter: sepia(.35) drop-shadow(0 0 2px rgba(76, 45, 25, .20));
    }

    :host([map-theme="enchanted_antique"]) .room-temperature-atmosphere-scene polygon {
      mix-blend-mode: multiply;
      opacity: .82;
      filter: saturate(.72) sepia(.12);
    }

    :host([map-theme="enchanted_antique"]) .fireplace-atmosphere-scene {
      filter: sepia(.16) saturate(.88);
    }

    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene {
      filter: sepia(.10) saturate(.62) contrast(.98);
    }

    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-mist { fill: rgba(229, 219, 201, .15); }
    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-base { fill: rgba(207, 197, 181, .27); }
    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-puff { fill: rgba(235, 225, 207, .36); }
    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-strand { fill: rgba(216, 204, 184, .11); }

    :host([map-theme="enchanted_antique"]) .room.presence-active .room-label {
      letter-spacing: .065em;
      text-shadow: 0 0 7px rgba(91, 57, 34, .24);
    }

    @keyframes explorerOvercastDriftA {
      from { transform: translate(-42px, -6px) scale(.99); opacity: .84; }
      to { transform: translate(74px, 9px) scale(1.025); opacity: 1; }
    }

    @keyframes explorerOvercastDriftB {
      from { transform: translate(54px, -4px) scale(1.02); opacity: .82; }
      to { transform: translate(-68px, 11px) scale(.995); opacity: 1; }
    }

    @keyframes explorerOvercastDriftC {
      from { transform: translate(-34px, 8px) scale(.985); opacity: .84; }
      to { transform: translate(62px, -5px) scale(1.018); opacity: .98; }
    }

    @media (prefers-reduced-motion: reduce) {
      .presence-room-activity-scene polygon,
      .room-temperature-atmosphere-scene polygon {
        transition: none;
      }
      .overcast-cloud-density-scene .overcast-cloud {
        animation: none;
      }
    }
  `;
}