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
      x: "-55%",
      y: "-65%",
      width: "210%",
      height: "240%",
      colorInterpolationFilters: "sRGB",
    });

    const blur = this.svg("feGaussianBlur");
    this.attrs(blur, { in: "SourceGraphic", stdDeviation: "3.4", result: "soft" });
    filter.appendChild(blur);

    const turbulence = this.svg("feTurbulence");
    this.attrs(turbulence, {
      type: "fractalNoise",
      baseFrequency: "0.012 0.021",
      numOctaves: "4",
      seed: "53",
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
    this.attrs(finish, { in: "warped", stdDeviation: "2.1" });
    filter.appendChild(finish);

    return filter;
  }

  private appendClouds(layer: SVGGElement): void {
    const clouds: Array<[number, number, number, number, number]> = [
      [52, 92, 1.08, 0, .84],
      [360, 36, .86, 1, .64],
      [895, 112, 1.10, 2, .82],
      [1012, 382, .96, 3, .74],
      [22, 600, 1.04, 4, .82],
      [1005, 735, 1.06, 5, .78],
      [148, 968, 1.18, 6, .84],
      [778, 995, 1.12, 7, .80],
    ];

    const puffs: Array<[number, number, number, number, number]> = [
      [-120, 22, 54, 31, .42],
      [-92, -12, 64, 39, .54],
      [-60, -46, 70, 45, .66],
      [-16, -70, 78, 50, .78],
      [34, -64, 74, 49, .74],
      [78, -40, 66, 43, .62],
      [112, -8, 56, 35, .50],
      [128, 22, 48, 29, .36],
      [82, 26, 76, 31, .48],
      [24, 36, 100, 37, .52],
      [-42, 34, 92, 35, .48],
      [-92, 30, 68, 31, .40],
    ];

    const shapeTransforms = [
      "scale(1 .92) skewX(-3)",
      "scale(.96 1.04) skewX(4)",
      "scale(1.06 .88) skewX(-5)",
      "scale(.98 .95) skewX(3)",
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

      const mist = this.svg("g");
      this.attrs(mist, {
        class: "weather-cloud-mist",
        transform: index % 2 === 0 ? "translate(-12 12) scale(1.08 .82)" : "translate(14 7) scale(.96 .9)",
      });
      const mistOne = this.svg("ellipse");
      this.attrs(mistOne, { cx: "-28", cy: "32", rx: "158", ry: "42" });
      mist.appendChild(mistOne);
      const mistTwo = this.svg("ellipse");
      this.attrs(mistTwo, { cx: "72", cy: "8", rx: "112", ry: "34", opacity: ".62" });
      mist.appendChild(mistTwo);
      const mistThree = this.svg("ellipse");
      this.attrs(mistThree, { cx: "-98", cy: "-2", rx: "88", ry: "28", opacity: ".50" });
      mist.appendChild(mistThree);
      driftGroup.appendChild(mist);

      const shadow = this.svg("path");
      this.attrs(shadow, {
        d: "M-160 38 C-128 2 -94 -8 -62 4 C-36 18 -8 19 18 7 C52 -9 91 -2 118 18 C144 37 142 62 117 76 C80 96 28 95 -14 91 C-61 88 -111 91 -145 72 C-164 61 -171 49 -160 38 Z",
        class: "weather-cloud-shadow",
      });
      driftGroup.appendChild(shadow);

      const body = this.svg("g");
      this.attrs(body, {
        class: "weather-cloud-body",
        filter: `url(#${this.cloudFilterId})`,
        transform: shapeTransforms[index % shapeTransforms.length],
      });

      const base = this.svg("path");
      this.attrs(base, {
        d: "M-158 31 C-143 -8 -111 -29 -78 -25 C-68 -57 -39 -78 -5 -73 C11 -102 58 -100 78 -69 C110 -67 137 -46 145 -18 C170 -6 181 18 169 39 C152 70 111 79 73 80 C35 94 -18 91 -55 82 C-97 87 -142 73 -159 51 C-165 43 -164 37 -158 31 Z",
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

      const wispOne = this.svg("path");
      this.attrs(wispOne, {
        d: "M-164 45 C-126 67 -83 64 -49 53 C-14 42 15 55 43 61 C78 68 115 59 151 39 C118 79 72 95 19 88 C-29 82 -68 80 -106 86 C-135 82 -159 67 -164 45 Z",
        class: "weather-cloud-wisp",
      });
      body.appendChild(wispOne);

      const wispTwo = this.svg("path");
      this.attrs(wispTwo, {
        d: "M-111 -8 C-78 -40 -41 -45 -13 -31 C17 -16 47 -19 78 -41 C61 -7 33 13 4 12 C-33 12 -62 4 -88 13 C-101 11 -110 3 -111 -8 Z",
        class: "weather-cloud-detail",
      });
      body.appendChild(wispTwo);

      const lowerMist = this.svg("path");
      this.attrs(lowerMist, {
        d: "M-179 68 C-128 91 -72 83 -26 79 C25 75 65 89 112 76 C91 104 42 116 -12 109 C-70 102 -121 113 -164 92 C-179 84 -187 76 -179 68 Z",
        class: "weather-cloud-lower-mist",
      });
      body.appendChild(lowerMist);
      driftGroup.appendChild(body);

      const highlight = this.svg("path");
      this.attrs(highlight, {
        d: "M-68 -42 C-46 -69 -13 -80 16 -72 C39 -66 56 -52 63 -35 C35 -47 10 -44 -13 -34 C-35 -25 -55 -28 -68 -42 Z",
        class: "weather-cloud-highlight",
      });
      driftGroup.appendChild(highlight);

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
    .weather-outside-rooms-scene.weather-cloudy { opacity: min(1, calc(var(--weather-svg-intensity, .6) * 1.05)); }
    .weather-outside-rooms-scene .weather-cloud {
      animation: explorerCloudDriftA 36s ease-in-out infinite alternate;
      transform-box: fill-box;
      transform-origin: center;
      will-change: transform, opacity;
    }
    .weather-outside-rooms-scene .weather-cloud-1 { animation-name: explorerCloudDriftB; animation-duration: 45s; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-cloud-2 { animation-name: explorerCloudDriftC; animation-duration: 54s; }
    .weather-outside-rooms-scene .weather-cloud-mist { fill: rgba(236, 233, 224, .28); filter: blur(20px); }
    .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(67, 60, 51, .15); filter: blur(18px); }
    .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(220, 216, 205, .48); }
    .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(241, 237, 226, .62); }
    .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(203, 198, 187, .24); }
    .weather-outside-rooms-scene .weather-cloud-detail { fill: rgba(255, 252, 243, .24); }
    .weather-outside-rooms-scene .weather-cloud-lower-mist { fill: rgba(223, 220, 211, .22); filter: blur(12px); }
    .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 252, 240, .28); filter: blur(9px); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 { opacity: .72; }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-mist { fill: rgba(220, 220, 216, .22); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-base { fill: rgba(199, 198, 192, .42); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-puff { fill: rgba(225, 223, 216, .52); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-shadow { fill: rgba(62, 59, 54, .14); }
    .weather-outside-rooms-scene.is-night .weather-cloud-mist { fill: rgba(154, 166, 176, .18); }
    .weather-outside-rooms-scene.is-night .weather-cloud-shadow { fill: rgba(21, 27, 34, .22); }
    .weather-outside-rooms-scene.is-night .weather-cloud-base { fill: rgba(131, 141, 149, .40); }
    .weather-outside-rooms-scene.is-night .weather-cloud-puff { fill: rgba(184, 191, 195, .46); }
    .weather-outside-rooms-scene.is-night .weather-cloud-wisp { fill: rgba(105, 117, 127, .20); }
    .weather-outside-rooms-scene.is-night .weather-cloud-detail { fill: rgba(224, 228, 226, .14); }
    .weather-outside-rooms-scene.is-night .weather-cloud-lower-mist { fill: rgba(119, 131, 141, .16); }
    .weather-outside-rooms-scene.is-night .weather-cloud-highlight { fill: rgba(220, 226, 225, .16); }
    .weather-outside-rooms-scene .weather-fog-band { fill: none; stroke: #e4dac1; stroke-width: 38; stroke-linecap: round; opacity: .62; filter: blur(10px); animation: explorerFogDrift 14s ease-in-out infinite alternate; }
    .weather-outside-rooms-scene .weather-fog-band:nth-child(2n) { stroke: #8f887a; opacity: .34; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-rain-streak { stroke: #3d4d55; stroke-width: 3.8; stroke-linecap: round; opacity: .82; animation: explorerRainFall 1.05s linear infinite; }
    .weather-outside-rooms-scene .weather-snow-flake { fill: #fff7df; stroke: #a89b82; stroke-width: 1; opacity: .96; animation: explorerSnowFall 7s linear infinite; }
    .weather-outside-rooms-scene .weather-storm-flash { fill: #fff0bd; opacity: 0; mix-blend-mode: screen; animation: explorerStormFlash 6.5s steps(1,end) infinite; }
    .weather-outside-rooms-scene.is-night .weather-rain-streak { stroke: #879398; opacity: .78; }
    .weather-outside-rooms-scene.is-night .weather-fog-band { opacity: .46; }
    .weather-outside-rooms-scene.is-night .weather-storm-flash { animation-name: explorerStormFlashNight; }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene { mix-blend-mode: normal; filter: sepia(.07) saturate(.72) contrast(.98); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-mist { fill: rgba(239, 228, 207, .26); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(79, 66, 50, .16); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(224, 212, 191, .50); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(242, 232, 214, .64); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(200, 184, 158, .22); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-detail { fill: rgba(255, 245, 225, .22); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-lower-mist { fill: rgba(225, 214, 195, .20); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 246, 227, .28); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-snow-flake { fill: #f1e5c5; }
    @keyframes explorerCloudDriftA {
      0% { transform: translate(-50px,-9px) scale(.985); opacity: .88; }
      48% { transform: translate(12px,4px) scale(1.012); opacity: 1; }
      100% { transform: translate(104px,11px) scale(1.035); opacity: .90; }
    }
    @keyframes explorerCloudDriftB {
      0% { transform: translate(68px,-6px) scale(1.02); opacity: .88; }
      50% { transform: translate(3px,7px) scale(.995); opacity: 1; }
      100% { transform: translate(-94px,14px) scale(1.028); opacity: .91; }
    }
    @keyframes explorerCloudDriftC {
      0% { transform: translate(-40px,11px) scale(.99); opacity: .88; }
      47% { transform: translate(16px,-5px) scale(1.02); opacity: 1; }
      100% { transform: translate(90px,14px) scale(1.01); opacity: .90; }
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
