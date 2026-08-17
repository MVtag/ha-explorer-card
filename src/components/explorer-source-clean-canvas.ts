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
  private readonly cloudFilterId = `explorer-cloud-organic-${Math.random().toString(36).slice(2, 10)}`;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    this.syncSourceTextVisibility();
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

  private createCloudFilter(): SVGFilterElement {
    const filter = this.svg("filter");
    this.attrs(filter, {
      id: this.cloudFilterId,
      x: "-35%",
      y: "-45%",
      width: "170%",
      height: "190%",
      colorInterpolationFilters: "sRGB",
    });

    const blur = this.svg("feGaussianBlur");
    this.attrs(blur, { in: "SourceGraphic", stdDeviation: "5.5", result: "soft" });
    filter.appendChild(blur);

    const turbulence = this.svg("feTurbulence");
    this.attrs(turbulence, {
      type: "fractalNoise",
      baseFrequency: "0.012 0.019",
      numOctaves: "3",
      seed: "23",
      result: "noise",
    });
    filter.appendChild(turbulence);

    const displacement = this.svg("feDisplacementMap");
    this.attrs(displacement, {
      in: "soft",
      in2: "noise",
      scale: "24",
      xChannelSelector: "R",
      yChannelSelector: "G",
      result: "warped",
    });
    filter.appendChild(displacement);

    const finish = this.svg("feGaussianBlur");
    this.attrs(finish, { in: "warped", stdDeviation: "2.4" });
    filter.appendChild(finish);

    return filter;
  }

  private appendClouds(layer: SVGGElement): void {
    const clouds: Array<[number, number, number, number, number]> = [
      [58, 110, 1.18, 0, .86],
      [365, 48, .94, 1, .68],
      [884, 120, 1.22, 2, .84],
      [1018, 390, 1.08, 3, .78],
      [28, 590, 1.16, 4, .84],
      [1010, 730, 1.20, 5, .82],
      [165, 965, 1.32, 6, .88],
      [770, 990, 1.24, 7, .84],
    ];

    const puffs: Array<[number, number, number, number, number]> = [
      [-126, 22, 100, 58, .34],
      [-82, -24, 104, 68, .48],
      [-30, -58, 116, 76, .64],
      [28, -66, 118, 80, .72],
      [82, -42, 106, 72, .58],
      [128, 2, 94, 58, .38],
      [76, 34, 132, 68, .48],
      [8, 42, 158, 78, .46],
      [-68, 42, 138, 70, .42],
      [-8, -8, 184, 96, .28],
    ];

    for (const [x, y, scale, index, opacity] of clouds) {
      const positionGroup = this.svg("g");
      this.attrs(positionGroup, {
        class: "weather-cloud-position",
        transform: `translate(${x} ${y}) scale(${scale})`,
        opacity: String(opacity),
      });

      const driftGroup = this.svg("g");
      this.attrs(driftGroup, {
        class: `weather-cloud weather-cloud-${index % 3} weather-cloud-depth-${index % 2}`,
      });

      const shadow = this.svg("path");
      this.attrs(shadow, {
        d: "M-188 34 C-154 -30 -94 -72 -22 -72 C61 -80 139 -48 177 16 C196 50 170 82 113 99 C39 122 -75 114 -144 88 C-177 75 -197 58 -188 34 Z",
        class: "weather-cloud-shadow",
      });
      driftGroup.appendChild(shadow);

      const body = this.svg("g");
      this.attrs(body, {
        class: "weather-cloud-body",
        filter: `url(#${this.cloudFilterId})`,
      });

      const base = this.svg("path");
      this.attrs(base, {
        d: "M-183 28 C-153 -32 -102 -69 -38 -72 C-2 -108 65 -102 96 -66 C146 -61 181 -23 184 20 C188 67 134 91 76 99 C9 112 -77 106 -136 84 C-171 72 -192 54 -183 28 Z",
        class: "weather-cloud-base",
      });
      body.appendChild(base);

      for (const [cx, cy, rx, ry, puffOpacity] of puffs) {
        const ellipse = this.svg("ellipse");
        this.attrs(ellipse, {
          cx: String(cx),
          cy: String(cy),
          rx: String(rx),
          ry: String(ry),
          opacity: String(puffOpacity),
          class: "weather-cloud-puff",
        });
        body.appendChild(ellipse);
      }

      const lowerWisp = this.svg("path");
      this.attrs(lowerWisp, {
        d: "M-175 49 C-120 81 -61 76 -15 66 C42 54 94 65 161 49 C118 96 54 112 -27 110 C-91 109 -142 89 -175 49 Z",
        class: "weather-cloud-wisp",
      });
      body.appendChild(lowerWisp);
      driftGroup.appendChild(body);

      const highlight = this.svg("path");
      this.attrs(highlight, {
        d: "M-95 -26 C-55 -70 18 -87 76 -57 C101 -44 116 -27 122 -8 C73 -32 15 -26 -33 -8 C-60 2 -83 -4 -95 -26 Z",
        class: "weather-cloud-highlight",
      });
      driftGroup.appendChild(highlight);

      const haze = this.svg("ellipse");
      this.attrs(haze, { cx: "4", cy: "18", rx: "208", ry: "112", class: "weather-cloud-haze" });
      driftGroup.appendChild(haze);

      positionGroup.appendChild(driftGroup);
      layer.appendChild(positionGroup);
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
    defs.appendChild(this.createCloudFilter());
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
    .weather-outside-rooms-scene { opacity: var(--weather-svg-intensity, .6); }
    .weather-outside-rooms-scene.weather-cloudy { opacity: min(1, calc(var(--weather-svg-intensity, .6) * 1.18)); }
    .weather-outside-rooms-scene .weather-cloud {
      animation: explorerCloudDriftA 44s ease-in-out infinite alternate;
      transform-box: fill-box;
      transform-origin: center;
      will-change: transform, opacity;
    }
    .weather-outside-rooms-scene .weather-cloud-1 { animation-name: explorerCloudDriftB; animation-duration: 58s; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-cloud-2 { animation-name: explorerCloudDriftC; animation-duration: 72s; }
    .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(74, 55, 35, .24); filter: blur(20px); }
    .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(213, 196, 158, .70); }
    .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(236, 222, 190, .76); }
    .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(188, 166, 126, .36); }
    .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 244, 213, .28); filter: blur(11px); }
    .weather-outside-rooms-scene .weather-cloud-haze { fill: rgba(128, 105, 73, .14); filter: blur(32px); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-base { fill: rgba(186, 169, 139, .68); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-puff { fill: rgba(216, 201, 171, .72); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-shadow { fill: rgba(64, 48, 34, .30); }
    .weather-outside-rooms-scene.is-night .weather-cloud-shadow { fill: rgba(31, 35, 40, .32); }
    .weather-outside-rooms-scene.is-night .weather-cloud-base { fill: rgba(153, 151, 145, .54); }
    .weather-outside-rooms-scene.is-night .weather-cloud-puff { fill: rgba(188, 184, 174, .50); }
    .weather-outside-rooms-scene.is-night .weather-cloud-wisp { fill: rgba(104, 105, 105, .28); }
    .weather-outside-rooms-scene.is-night .weather-cloud-highlight { fill: rgba(221, 217, 201, .15); }
    .weather-outside-rooms-scene.is-night .weather-cloud-haze { fill: rgba(68, 72, 76, .18); }
    .weather-outside-rooms-scene .weather-fog-band { fill: none; stroke: #e4dac1; stroke-width: 38; stroke-linecap: round; opacity: .62; filter: blur(10px); animation: explorerFogDrift 14s ease-in-out infinite alternate; }
    .weather-outside-rooms-scene .weather-fog-band:nth-child(2n) { stroke: #8f887a; opacity: .34; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-rain-streak { stroke: #3d4d55; stroke-width: 3.8; stroke-linecap: round; opacity: .82; animation: explorerRainFall 1.05s linear infinite; }
    .weather-outside-rooms-scene .weather-snow-flake { fill: #fff7df; stroke: #a89b82; stroke-width: 1; opacity: .96; animation: explorerSnowFall 7s linear infinite; }
    .weather-outside-rooms-scene .weather-storm-flash { fill: #fff0bd; opacity: 0; mix-blend-mode: screen; animation: explorerStormFlash 6.5s steps(1,end) infinite; }
    .weather-outside-rooms-scene.is-night .weather-rain-streak { stroke: #879398; opacity: .78; }
    .weather-outside-rooms-scene.is-night .weather-fog-band { opacity: .46; }
    .weather-outside-rooms-scene.is-night .weather-storm-flash { animation-name: explorerStormFlashNight; }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene { mix-blend-mode: normal; filter: sepia(.12) saturate(.76) contrast(1.03); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(73, 49, 28, .30); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(202, 180, 139, .72); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(230, 209, 168, .78); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(151, 118, 75, .34); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 235, 194, .24); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-haze { fill: rgba(103, 77, 46, .16); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-snow-flake { fill: #f1e5c5; }
    @keyframes explorerCloudDriftA {
      0% { transform: translate(-24px,-8px) scale(.985); opacity: .90; }
      45% { transform: translate(12px,4px) scale(1.015); opacity: 1; }
      100% { transform: translate(54px,12px) scale(1.045); opacity: .94; }
    }
    @keyframes explorerCloudDriftB {
      0% { transform: translate(34px,-5px) scale(1.02); opacity: .92; }
      50% { transform: translate(2px,7px) scale(.995); opacity: 1; }
      100% { transform: translate(-48px,13px) scale(1.035); opacity: .95; }
    }
    @keyframes explorerCloudDriftC {
      0% { transform: translate(-18px,10px) scale(.99); opacity: .91; }
      48% { transform: translate(17px,-4px) scale(1.025); opacity: 1; }
      100% { transform: translate(46px,15px) scale(1.01); opacity: .93; }
    }
    @keyframes explorerFogDrift { from { transform: translateX(-42px); } to { transform: translateX(54px); } }
    @keyframes explorerRainFall { from { transform: translate(18px,-55px); } to { transform: translate(-18px,70px); } }
    @keyframes explorerSnowFall { from { transform: translate(0,-30px); } to { transform: translate(22px,55px); } }
    @keyframes explorerStormFlash { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .52; } }
    @keyframes explorerStormFlashNight { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .28; } }
    @media(prefers-reduced-motion:reduce) {
      .weather-outside-rooms-scene .weather-cloud,
      .weather-outside-rooms-scene .weather-fog-band,
      .weather-outside-rooms-scene .weather-rain-streak,
      .weather-outside-rooms-scene .weather-snow-flake,
      .weather-outside-rooms-scene .weather-storm-flash { animation: none; }
    }
  `;
}
