import { css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ExplorerOpeningsCanvas } from "./explorer-openings-canvas";
import type { ExplorerWeatherEffect } from "../models/config";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NS = "http://www.w3.org/2000/svg";

@customElement("explorer-source-clean-canvas")
export class ExplorerSourceCleanCanvas extends ExplorerOpeningsCanvas {
  @property({ type: Boolean, attribute: "hide-source-text" }) public hideSourceText = false;
  @property({ attribute: "weather-effect" }) public weatherEffect: ExplorerWeatherEffect = "clear";
  @property({ type: Number, attribute: "weather-intensity" }) public weatherIntensity = 0.6;
  @property({ type: Boolean, attribute: "weather-night" }) public weatherNight = false;

  private readonly weatherMaskId = `explorer-weather-mask-${Math.random().toString(36).slice(2, 10)}`;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    this.syncSourceTextVisibility();
    if (
      changed.has("weatherEffect") ||
      changed.has("weatherIntensity") ||
      changed.has("weatherNight") ||
      changed.has("rooms") ||
      changed.has("theme") ||
      changed.has("image")
    ) {
      this.syncWeatherOutsideRooms();
    }
  }

  private syncSourceTextVisibility(): void {
    const source = this.renderRoot.querySelector<SVGGElement>("g.floorplan-source.inline-source");
    if (!source) return;

    source.querySelectorAll<SVGElement>("text, tspan").forEach((element) => {
      if (this.hideSourceText) {
        element.setAttribute("data-explorer-source-text-hidden", "true");
        element.style.display = "none";
      } else if (element.getAttribute("data-explorer-source-text-hidden") === "true") {
        element.style.removeProperty("display");
        element.removeAttribute("data-explorer-source-text-hidden");
      }
    });
  }

  private svg<K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] {
    return document.createElementNS(SVG_NS, tag);
  }

  private attrs(element: Element, attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  }

  private createWeatherMask(): SVGMaskElement {
    const mask = this.svg("mask");
    this.attrs(mask, {
      id: this.weatherMaskId,
      maskUnits: "userSpaceOnUse",
      x: "0",
      y: "0",
      width: String(VIEWBOX_SIZE),
      height: String(VIEWBOX_SIZE),
    });

    const outside = this.svg("rect");
    this.attrs(outside, { x: "0", y: "0", width: String(VIEWBOX_SIZE), height: String(VIEWBOX_SIZE), fill: "white" });
    mask.appendChild(outside);

    for (const room of this.rooms) {
      if (room.points.length < 3) continue;
      const polygon = this.svg("polygon");
      this.attrs(polygon, {
        points: room.points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" "),
        fill: "black",
        stroke: "black",
        "stroke-width": "16",
        "stroke-linejoin": "round",
      });
      mask.appendChild(polygon);
    }

    return mask;
  }

  private appendClouds(layer: SVGGElement): void {
    const clouds: Array<[number, number, number, number, number]> = [
      [55, 80, 190, 90, .58], [250, 42, 165, 76, .42], [760, 72, 205, 92, .52],
      [905, 295, 175, 86, .50], [70, 520, 180, 92, .48], [890, 690, 210, 100, .45],
      [215, 900, 215, 96, .44], [690, 930, 190, 82, .40],
    ];
    for (const [cx, cy, rx, ry, opacity] of clouds) {
      const ellipse = this.svg("ellipse");
      this.attrs(ellipse, { cx: String(cx), cy: String(cy), rx: String(rx), ry: String(ry), opacity: String(opacity), class: "weather-cloud" });
      layer.appendChild(ellipse);
    }
  }

  private appendFog(layer: SVGGElement): void {
    [105, 245, 405, 610, 805, 930].forEach((y, index) => {
      const path = this.svg("path");
      const wobble = index % 2 === 0 ? 18 : -22;
      this.attrs(path, {
        d: `M -120 ${y} C 180 ${y + wobble}, 390 ${y - wobble}, 620 ${y} S 980 ${y + wobble}, 1120 ${y}`,
        class: "weather-fog-band",
      });
      layer.appendChild(path);
    });
  }

  private appendRain(layer: SVGGElement): void {
    for (let row = -1; row < 11; row += 1) {
      for (let col = -1; col < 14; col += 1) {
        const x = col * 82 + (row % 2) * 28;
        const y = row * 105;
        const line = this.svg("line");
        this.attrs(line, { x1: String(x), y1: String(y), x2: String(x - 18), y2: String(y + 42), class: "weather-rain-streak" });
        layer.appendChild(line);
      }
    }
  }

  private appendSnow(layer: SVGGElement): void {
    for (let row = 0; row < 12; row += 1) {
      for (let col = 0; col < 13; col += 1) {
        const circle = this.svg("circle");
        const x = 28 + col * 81 + (row % 2) * 33;
        const y = 24 + row * 89;
        const radius = 2.4 + ((row + col) % 3) * 1.25;
        this.attrs(circle, { cx: String(x), cy: String(y), r: String(radius), class: "weather-snow-flake" });
        layer.appendChild(circle);
      }
    }
  }

  private syncWeatherOutsideRooms(): void {
    const svgRoot = this.renderRoot.querySelector<SVGSVGElement>("svg.floorplan");
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!svgRoot || !scene) return;

    svgRoot.querySelector<SVGDefsElement>(`defs[data-weather-mask="${this.weatherMaskId}"]`)?.remove();
    scene.querySelector<SVGGElement>(":scope > g.weather-outside-rooms-scene")?.remove();
    if (this.weatherEffect === "clear") return;

    const defs = this.svg("defs");
    defs.setAttribute("data-weather-mask", this.weatherMaskId);
    defs.appendChild(this.createWeatherMask());
    svgRoot.insertBefore(defs, svgRoot.firstChild);

    const layer = this.svg("g");
    layer.setAttribute("class", `weather-outside-rooms-scene weather-${this.weatherEffect}${this.weatherNight ? " is-night" : ""}`);
    layer.setAttribute("mask", `url(#${this.weatherMaskId})`);
    layer.setAttribute("pointer-events", "none");
    layer.style.setProperty("--weather-svg-intensity", String(Math.min(1, Math.max(.25, this.weatherIntensity || .6))));

    if (this.weatherEffect === "cloudy") this.appendClouds(layer);
    if (this.weatherEffect === "fog") this.appendFog(layer);
    if (this.weatherEffect === "rain" || this.weatherEffect === "storm") this.appendRain(layer);
    if (this.weatherEffect === "snow") this.appendSnow(layer);

    if (this.weatherEffect === "storm") {
      const flash = this.svg("rect");
      this.attrs(flash, { x: "0", y: "0", width: String(VIEWBOX_SIZE), height: String(VIEWBOX_SIZE), class: "weather-storm-flash" });
      layer.appendChild(flash);
    }

    const roomsLayer = scene.querySelector<SVGGElement>(":scope > g.rooms-scene");
    scene.insertBefore(layer, roomsLayer ?? null);
  }

  static override styles = css`
    ${ExplorerOpeningsCanvas.styles}
    .weather-outside-rooms-scene { opacity: calc(.92 * var(--weather-svg-intensity)); }
    .weather-outside-rooms-scene .weather-cloud { fill: #554737; filter: blur(12px); mix-blend-mode: multiply; animation: explorerCloudDrift 20s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
    .weather-outside-rooms-scene .weather-cloud:nth-child(2n) { animation-duration: 27s; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-fog-band { fill: none; stroke: #e4dac1; stroke-width: 34; stroke-linecap: round; opacity: .52; filter: blur(12px); animation: explorerFogDrift 14s ease-in-out infinite alternate; }
    .weather-outside-rooms-scene .weather-fog-band:nth-child(2n) { stroke: #8f887a; opacity: .28; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-rain-streak { stroke: #46535a; stroke-width: 3.2; stroke-linecap: round; opacity: .72; animation: explorerRainFall 1.05s linear infinite; }
    .weather-outside-rooms-scene .weather-snow-flake { fill: #fff7df; stroke: #b6aa91; stroke-width: .8; opacity: .9; animation: explorerSnowFall 7s linear infinite; }
    .weather-outside-rooms-scene .weather-storm-flash { fill: #fff0bd; opacity: 0; mix-blend-mode: screen; animation: explorerStormFlash 6.5s steps(1,end) infinite; }
    .weather-outside-rooms-scene.is-night .weather-cloud { fill: #403d3a; opacity: .78; }
    .weather-outside-rooms-scene.is-night .weather-rain-streak { stroke: #7b8589; opacity: .66; }
    .weather-outside-rooms-scene.is-night .weather-fog-band { opacity: .38; }
    .weather-outside-rooms-scene.is-night .weather-storm-flash { animation-name: explorerStormFlashNight; }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene { mix-blend-mode: multiply; filter: sepia(.34) saturate(.72); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-snow-flake { fill: #f1e5c5; }
    @keyframes explorerCloudDrift { from { transform: translate(-18px,-5px) scale(1); } to { transform: translate(28px,9px) scale(1.08); } }
    @keyframes explorerFogDrift { from { transform: translateX(-42px); } to { transform: translateX(54px); } }
    @keyframes explorerRainFall { from { transform: translate(18px,-55px); } to { transform: translate(-18px,70px); } }
    @keyframes explorerSnowFall { from { transform: translate(0,-30px); } to { transform: translate(22px,55px); } }
    @keyframes explorerStormFlash { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: calc(.52 * var(--weather-svg-intensity)); } }
    @keyframes explorerStormFlashNight { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: calc(.28 * var(--weather-svg-intensity)); } }
    @media(prefers-reduced-motion:reduce) {
      .weather-outside-rooms-scene .weather-cloud,
      .weather-outside-rooms-scene .weather-fog-band,
      .weather-outside-rooms-scene .weather-rain-streak,
      .weather-outside-rooms-scene .weather-snow-flake,
      .weather-outside-rooms-scene .weather-storm-flash { animation: none; }
    }
  `;
}
