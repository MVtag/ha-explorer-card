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
  @property({ attribute: "weather-state" }) public weatherState = "clear";
  @property({ type: Number, attribute: "weather-intensity" }) public weatherIntensity = 0.6;
  @property({ type: Boolean, attribute: "weather-night" }) public weatherNight = false;

  private readonly weatherMaskId = `explorer-weather-mask-${Math.random().toString(36).slice(2, 10)}`;
  private readonly cloudFilterId = `explorer-cloud-organic-${Math.random().toString(36).slice(2, 10)}`;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    this.syncSourceTextVisibility();
    if (
      changed.has("weatherEffect") ||
      changed.has("weatherState") ||
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
    this.attrs(blur, { in: "SourceGraphic", stdDeviation: "2.6", result: "soft" });
    filter.appendChild(blur);

    const turbulence = this.svg("feTurbulence");
    this.attrs(turbulence, {
      type: "fractalNoise",
      baseFrequency: "0.018 0.032",
      numOctaves: "4",
      seed: "71",
      result: "noise",
    });
    filter.appendChild(turbulence);

    const displacement = this.svg("feDisplacementMap");
    this.attrs(displacement, {
      in: "soft",
      in2: "noise",
      scale: "20",
      xChannelSelector: "R",
      yChannelSelector: "G",
      result: "warped",
    });
    filter.appendChild(displacement);

    const finish = this.svg("feGaussianBlur");
    this.attrs(finish, { in: "warped", stdDeviation: "1.35" });
    filter.appendChild(finish);

    return filter;
  }

  private appendClouds(layer: SVGGElement): void {
    const clouds: Array<[number, number, number, number, number]> = [
      [42, 95, .92, 0, .78],
      [350, 42, .76, 1, .58],
      [910, 112, .94, 2, .76],
      [1012, 395, .82, 3, .68],
      [18, 610, .90, 4, .76],
      [1008, 742, .91, 5, .72],
      [138, 975, .98, 6, .76],
      [790, 992, .95, 7, .72],
      [625, 24, .64, 8, .48],
      [1048, 575, .68, 9, .52],
      [535, 1034, .70, 10, .48],
      [-24, 420, .52, 11, .42],
      [1045, 286, .50, 12, .40],
      [1044, 884, .54, 13, .42],
      [344, 1042, .50, 14, .38],
      [1042, 505, .48, 15, .36],
      [760, 18, .50, 16, .34],
      [-18, 305, .44, 17, .30],
      [655, 1042, .52, 18, .36],
      [-20, 792, .50, 19, .34],
      [1042, 955, .44, 20, .30],
    ];

    if (this.weatherState === "cloudy") {
      clouds.push(
        [235, 185, .78, 21, .58],
        [800, 285, .76, 22, .57],
        [550, 455, .82, 23, .62],
        [315, 650, .80, 24, .60],
        [880, 810, .74, 25, .55],
        [470, 920, .78, 26, .58],
        [725, 90, .58, 27, .43],
      );
    }

    const puffs: Array<[number, number, number, number, number]> = [
      [-103, 18, 44, 27, .34],
      [-76, -15, 52, 31, .46],
      [-42, -47, 58, 35, .58],
      [-4, -64, 64, 39, .68],
      [36, -56, 60, 37, .64],
      [70, -34, 52, 32, .54],
      [98, -4, 45, 28, .42],
      [88, 27, 61, 25, .34],
      [29, 38, 80, 28, .38],
      [-45, 36, 73, 27, .36],
    ];

    const shapeTransforms = [
      "scale(1 .88) skewX(-4)",
      "scale(1.18 .72) skewX(5)",
      "scale(.90 1.03) skewX(-5)",
      "scale(1.10 .80) skewX(3)",
      "scale(.96 .94) skewX(-7)",
      "scale(1.24 .68) skewX(2)",
    ];
    const mistTransforms = [
      "translate(-18 17) scale(1.08 .72)",
      "translate(20 12) scale(1.30 .56)",
      "translate(-8 21) scale(.94 .86)",
      "translate(14 7) scale(1.18 .62)",
    ];

    for (const [x, y, scale, index, opacity] of clouds) {
      const form = index % 4;
      const depth = index % 3;
      const positionGroup = this.svg("g");
      this.attrs(positionGroup, {
        class: "weather-cloud-position",
        transform: `translate(${x} ${y}) scale(${scale * .64})`,
        opacity: String(opacity),
      });

      const driftGroup = this.svg("g");
      this.attrs(driftGroup, {
        class: `weather-cloud weather-cloud-${index % 3} weather-cloud-depth-${depth} weather-cloud-form-${form}`,
      });

      const mistBack = this.svg("g");
      this.attrs(mistBack, {
        class: "weather-cloud-mist weather-cloud-mist-back",
        transform: mistTransforms[form],
      });
      [
        [-72, 30, 102, 24, .52],
        [24, 24, 132, 27, .42],
        [112, 8, 78, 20, .32],
      ].forEach(([cx, cy, rx, ry, puffOpacity]) => {
        const ellipse = this.svg("ellipse");
        this.attrs(ellipse, {
          cx: String(cx), cy: String(cy), rx: String(rx), ry: String(ry), opacity: String(puffOpacity),
        });
        mistBack.appendChild(ellipse);
      });
      driftGroup.appendChild(mistBack);

      const shadow = this.svg("path");
      this.attrs(shadow, {
        d: "M-145 40 C-112 12 -84 2 -55 10 C-30 20 -9 20 15 10 C43 -3 77 1 104 18 C128 32 135 51 121 64 C92 84 48 84 10 79 C-33 78 -82 88 -119 72 C-138 64 -151 51 -145 40 Z",
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
        d: "M-145 28 C-132 -4 -106 -22 -76 -20 C-65 -48 -40 -67 -12 -64 C4 -87 38 -91 61 -67 C88 -66 111 -50 122 -29 C148 -18 158 4 147 25 C134 49 103 62 71 62 C42 76 5 76 -27 69 C-67 76 -111 64 -136 47 C-147 40 -151 34 -145 28 Z",
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

      const wispTop = this.svg("path");
      this.attrs(wispTop, {
        d: "M-104 -12 C-76 -34 -47 -40 -20 -30 C8 -19 33 -21 62 -39 C46 -13 22 1 -3 2 C-32 4 -57 -3 -79 3 C-92 4 -101 -2 -104 -12 Z",
        class: "weather-cloud-detail",
      });
      body.appendChild(wispTop);

      const wispLower = this.svg("path");
      this.attrs(wispLower, {
        d: "M-151 43 C-111 60 -75 56 -45 48 C-15 41 9 51 35 56 C66 61 100 53 132 39 C106 65 69 77 28 74 C-8 69 -48 70 -81 75 C-111 73 -140 61 -151 43 Z",
        class: "weather-cloud-wisp",
      });
      body.appendChild(wispLower);

      driftGroup.appendChild(body);

      const mistFront = this.svg("g");
      this.attrs(mistFront, {
        class: "weather-cloud-mist weather-cloud-mist-front",
        transform: form === 1
          ? "translate(8 51) scale(1.28 .40)"
          : form === 2
            ? "translate(-20 43) scale(.88 .62)"
            : form === 3
              ? "translate(18 47) scale(1.16 .46)"
              : "translate(8 49) scale(.95 .55)",
      });
      [
        [-78, 0, 88, 18, .38],
        [18, 2, 116, 20, .42],
        [108, -2, 64, 15, .30],
      ].forEach(([cx, cy, rx, ry, puffOpacity]) => {
        const ellipse = this.svg("ellipse");
        this.attrs(ellipse, {
          cx: String(cx), cy: String(cy), rx: String(rx), ry: String(ry), opacity: String(puffOpacity),
        });
        mistFront.appendChild(ellipse);
      });
      driftGroup.appendChild(mistFront);

      const strand = this.svg("path");
      this.attrs(strand, {
        d: "M-182 73 C-126 59 -76 66 -31 69 C13 72 59 66 123 51 C80 82 24 89 -29 84 C-78 80 -126 91 -182 73 Z",
        class: "weather-cloud-strand",
      });
      driftGroup.appendChild(strand);

      if (form === 1 || form === 3) {
        const fineStrand = this.svg("path");
        this.attrs(fineStrand, {
          d: form === 1
            ? "M-205 89 C-151 74 -94 78 -40 82 C21 87 76 79 152 61 C97 91 31 99 -35 94 C-94 90 -151 101 -205 89 Z"
            : "M-176 2 C-124 -7 -82 -3 -41 8 C2 19 49 17 112 0 C67 24 16 30 -35 24 C-84 18 -127 24 -176 2 Z",
          class: "weather-cloud-fine-strand",
        });
        driftGroup.appendChild(fineStrand);
      }

      const highlight = this.svg("path");
      this.attrs(highlight, {
        d: "M-57 -40 C-39 -61 -12 -71 11 -65 C31 -60 45 -50 52 -36 C30 -43 9 -40 -10 -33 C-29 -25 -46 -29 -57 -40 Z",
        class: "weather-cloud-highlight",
      });
      driftGroup.appendChild(highlight);

      positionGroup.appendChild(driftGroup);
      layer.appendChild(positionGroup);
    }
  }

  private appendFog(layer: SVGGElement, mode: "fog" | "cloudy" | "partlycloudy" = "fog"): void {
    const fogBanks: Array<[number, number, number]> = [
      [55, 14, 0],
      [145, -19, 1],
      [245, 23, 2],
      [345, -16, 3],
      [455, 20, 4],
      [565, -24, 5],
      [675, 17, 6],
      [785, -21, 7],
      [895, 19, 8],
      [985, -15, 9],
    ];

    const visibleBanks = mode === "cloudy"
      ? fogBanks.filter((_, index) => index % 2 === 0)
      : mode === "partlycloudy"
        ? fogBanks.filter((_, index) => [2, 5, 8].includes(index))
        : fogBanks;

    visibleBanks.forEach(([y, wobble, variant]) => {
      const path = this.svg("path");
      this.attrs(path, {
        d: `M -120 ${y} C 180 ${y + wobble}, 390 ${y - wobble}, 620 ${y} S 980 ${y + wobble}, 1120 ${y}`,
        class: `weather-fog-band weather-fog-band-${variant}${mode === "fog" ? "" : ` is-cloud-mist is-${mode}-mist`}`,
      });
      layer.appendChild(path);
    });
  }

  private appendRain(layer: SVGGElement, heavy = false): void {
    const rowStep = heavy ? 62 : 92;
    const colStep = heavy ? 48 : 72;
    for (let row = -1; row < (heavy ? 18 : 13); row += 1) {
      for (let col = -1; col < (heavy ? 24 : 17); col += 1) {
        const seed = Math.abs(row * 37 + col * 19);
        const x = col * colStep + (row % 2) * (heavy ? 17 : 25) + (seed % 13);
        const y = row * rowStep;
        const length = (heavy ? 15 : 10) + (seed % (heavy ? 12 : 8));
        const width = (heavy ? 2.4 : 1.6) + (seed % 3) * .35;
        const slant = (heavy ? 5 : 3) + (seed % 4);
        const drop = this.svg("path");
        this.attrs(drop, {
          d: `M ${x} ${y} C ${x - width * .7} ${y + length * .32}, ${x - slant - width} ${y + length * .72}, ${x - slant} ${y + length} C ${x - slant + width} ${y + length * .72}, ${x + width * .45} ${y + length * .31}, ${x} ${y} Z`,
          class: `weather-rain-drop${heavy ? " is-heavy" : ""}`,
        });
        drop.style.setProperty("--rain-duration", `${(heavy ? .48 : .9) + (seed % 7) * .06}s`);
        drop.style.setProperty("--rain-delay", `${-(seed % 17) * .11}s`);
        layer.appendChild(drop);
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

  private appendHail(layer: SVGGElement): void {
    for (let row = -1; row < 15; row += 1) {
      for (let col = 0; col < 15; col += 1) {
        const hail = this.svg("circle");
        const x = 18 + col * 73 + (row % 2) * 27;
        const y = row * 76;
        const radius = 4.2 + ((row + col) % 3) * 1.4;
        this.attrs(hail, { cx: String(x), cy: String(y), r: String(radius), class: "weather-hail-stone" });
        layer.appendChild(hail);
      }
    }
  }

  private appendWind(layer: SVGGElement): void {
    [120, 250, 390, 555, 735, 900].forEach((y, index) => {
      const line = this.svg("path");
      const lift = index % 2 === 0 ? -22 : 26;
      this.attrs(line, {
        d: `M -160 ${y} C 90 ${y + lift}, 285 ${y - lift}, 520 ${y} S 870 ${y + lift}, 1180 ${y - 8}`,
        class: `weather-wind-line weather-wind-line-${index % 3}`,
      });
      layer.appendChild(line);
    });
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
    const safeState = this.weatherState.replace(/[^a-z0-9_-]/g, "");
    layer.setAttribute("class", `weather-outside-rooms-scene weather-${this.weatherEffect} state-${safeState}${this.weatherNight ? " is-night" : ""}`);
    layer.setAttribute("mask", `url(#${this.weatherMaskId})`);
    layer.setAttribute("pointer-events", "none");
    layer.style.setProperty("--weather-svg-intensity", String(Math.min(1, Math.max(.25, this.weatherIntensity || .6))));

    if (["cloudy", "rain", "storm", "snow"].includes(this.weatherEffect) || this.weatherState === "windy-variant") this.appendClouds(layer);
    if (this.weatherEffect === "fog") this.appendFog(layer);
    if (this.weatherEffect === "cloudy" && this.weatherState === "cloudy") this.appendFog(layer, "cloudy");
    if (this.weatherEffect === "cloudy" && this.weatherState === "partlycloudy") this.appendFog(layer, "partlycloudy");
    if (this.weatherEffect === "rain") this.appendRain(layer, this.weatherState === "pouring");
    if (this.weatherEffect === "storm" && this.weatherState !== "lightning") this.appendRain(layer, this.weatherState === "lightning-rainy");
    if (this.weatherEffect === "snow" && this.weatherState !== "hail") this.appendSnow(layer);
    if (this.weatherState === "snowy-rainy") this.appendRain(layer);
    if (this.weatherState === "hail") this.appendHail(layer);
    if (this.weatherEffect === "wind") this.appendWind(layer);
    if (this.weatherEffect === "exceptional") {
      this.appendClouds(layer);
      this.appendWind(layer);
    }

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
    .weather-outside-rooms-scene.weather-cloudy { opacity: min(1, calc(var(--weather-svg-intensity, .6) * 1.03)); }
    .weather-outside-rooms-scene.state-cloudy { opacity: min(1, calc(var(--weather-svg-intensity, .6) * 1.18)); }
    .weather-outside-rooms-scene.weather-rain,
    .weather-outside-rooms-scene.weather-storm,
    .weather-outside-rooms-scene.weather-snow { filter: saturate(.72) brightness(.91); }
    .weather-outside-rooms-scene .weather-cloud {
      animation: explorerCloudDriftA 38s ease-in-out infinite alternate;
      transform-box: fill-box;
      transform-origin: center;
      will-change: transform, opacity;
    }
    .weather-outside-rooms-scene .weather-cloud-1 { animation-name: explorerCloudDriftB; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-cloud-2 { animation-name: explorerCloudDriftC; }
    .weather-outside-rooms-scene .weather-cloud-depth-0 { animation-duration: 34s; }
    .weather-outside-rooms-scene .weather-cloud-depth-1 { animation-duration: 54s; opacity: .72; }
    .weather-outside-rooms-scene .weather-cloud-depth-2 { animation-duration: 82s; opacity: .56; }
    .weather-outside-rooms-scene .weather-cloud-mist { fill: rgba(239, 236, 228, .19); filter: blur(22px); }
    .weather-outside-rooms-scene .weather-cloud-mist-front { fill: rgba(246, 242, 233, .18); filter: blur(17px); }
    .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(70, 65, 58, .10); filter: blur(20px); }
    .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(216, 213, 205, .34); }
    .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(241, 238, 230, .50); }
    .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(207, 204, 196, .16); }
    .weather-outside-rooms-scene .weather-cloud-detail { fill: rgba(255, 252, 244, .19); }
    .weather-outside-rooms-scene .weather-cloud-strand { fill: rgba(226, 222, 213, .14); filter: blur(13px); }
    .weather-outside-rooms-scene .weather-cloud-fine-strand {
      fill: rgba(238, 235, 228, .11);
      filter: blur(9px);
      transform-box: fill-box;
      transform-origin: center;
      animation: explorerCloudWispParallax 22s ease-in-out infinite alternate;
    }
    .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 253, 246, .20); filter: blur(8px); }
    .weather-outside-rooms-scene .weather-cloud-form-1 .weather-cloud-base { opacity: .78; }
    .weather-outside-rooms-scene .weather-cloud-form-1 .weather-cloud-puff { opacity: .70; }
    .weather-outside-rooms-scene .weather-cloud-form-2 .weather-cloud-body { opacity: .84; }
    .weather-outside-rooms-scene .weather-cloud-form-2 .weather-cloud-mist { opacity: .88; }
    .weather-outside-rooms-scene .weather-cloud-form-3 .weather-cloud-shadow { opacity: .62; }
    .weather-outside-rooms-scene .weather-cloud-form-3 .weather-cloud-highlight { opacity: .64; }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-mist { fill: rgba(218, 219, 216, .17); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-base { fill: rgba(196, 198, 195, .30); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-puff { fill: rgba(222, 223, 219, .42); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-shadow { fill: rgba(58, 58, 55, .09); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-mist { fill: rgba(210, 212, 210, .14); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-base { fill: rgba(190, 193, 191, .24); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-puff { fill: rgba(218, 220, 217, .34); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-shadow { fill: rgba(55, 56, 54, .06); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-fine-strand { animation-duration: 32s; opacity: .70; }
    .weather-outside-rooms-scene .weather-cloud-depth-0 .weather-cloud-fine-strand { animation-duration: 16s; }
    .weather-outside-rooms-scene.is-night .weather-cloud-mist { fill: rgba(148, 161, 172, .15); }
    .weather-outside-rooms-scene.is-night .weather-cloud-mist-front { fill: rgba(169, 180, 188, .13); }
    .weather-outside-rooms-scene.is-night .weather-cloud-shadow { fill: rgba(18, 24, 31, .18); }
    .weather-outside-rooms-scene.is-night .weather-cloud-base { fill: rgba(126, 138, 147, .32); }
    .weather-outside-rooms-scene.is-night .weather-cloud-puff { fill: rgba(176, 186, 192, .38); }
    .weather-outside-rooms-scene.is-night .weather-cloud-wisp { fill: rgba(100, 114, 125, .15); }
    .weather-outside-rooms-scene.is-night .weather-cloud-detail { fill: rgba(219, 225, 225, .12); }
    .weather-outside-rooms-scene.is-night .weather-cloud-strand { fill: rgba(125, 138, 148, .12); }
    .weather-outside-rooms-scene.is-night .weather-cloud-fine-strand { fill: rgba(164, 174, 181, .09); }
    .weather-outside-rooms-scene.is-night .weather-cloud-highlight { fill: rgba(218, 225, 225, .13); }
    .weather-outside-rooms-scene .weather-fog-band { fill: none; stroke: #e4dac1; stroke-width: 34; stroke-linecap: round; opacity: .56; filter: blur(11px); animation: explorerFogDrift 16s ease-in-out infinite alternate; }
    .weather-outside-rooms-scene .weather-fog-band:nth-child(2n) { stroke: #a9a193; opacity: .30; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-fog-band-1,
    .weather-outside-rooms-scene .weather-fog-band-6 { stroke-width: 48; opacity: .42; animation-duration: 21s; }
    .weather-outside-rooms-scene .weather-fog-band-2,
    .weather-outside-rooms-scene .weather-fog-band-8 { stroke-width: 26; opacity: .48; animation-duration: 12s; }
    .weather-outside-rooms-scene .weather-fog-band-3,
    .weather-outside-rooms-scene .weather-fog-band-7 { stroke-width: 40; opacity: .34; animation-duration: 19s; }
    .weather-outside-rooms-scene .weather-fog-band-4,
    .weather-outside-rooms-scene .weather-fog-band-9 { stroke-width: 30; opacity: .52; animation-duration: 14s; }
    .weather-outside-rooms-scene .weather-fog-band.is-cloudy-mist {
      stroke: #d9d3c6;
      stroke-width: 25;
      opacity: .28;
      filter: blur(15px);
      animation-duration: 24s;
    }
    .weather-outside-rooms-scene .weather-fog-band.is-partlycloudy-mist {
      stroke: #e2dac9;
      stroke-width: 20;
      opacity: .18;
      filter: blur(17px);
      animation-duration: 28s;
    }
    .weather-outside-rooms-scene .weather-rain-drop { fill: rgba(54,70,76,.58); stroke: rgba(219,219,204,.22); stroke-width: .45; opacity: .72; animation: explorerRainDrop var(--rain-duration,1.1s) linear infinite; animation-delay: var(--rain-delay,0s); }
    .weather-outside-rooms-scene .weather-rain-drop.is-heavy { fill: rgba(43,59,65,.72); stroke-width: .55; opacity: .86; }
    .weather-outside-rooms-scene .weather-snow-flake { fill: #fff7df; stroke: #a89b82; stroke-width: 1; opacity: .96; animation: explorerSnowFall 7s linear infinite; }
    .weather-outside-rooms-scene .weather-hail-stone { fill: #f7f2df; stroke: #7f8990; stroke-width: 1.7; opacity: .96; animation: explorerHailFall .92s linear infinite; }
    .weather-outside-rooms-scene .weather-wind-line { fill: none; stroke: rgba(83,76,66,.66); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 86 52 35 68; opacity: .68; animation: explorerWindSweep 2.9s linear infinite; }
    .weather-outside-rooms-scene .weather-wind-line-1 { stroke-width: 3.2; stroke-dasharray: 44 70 115 58; animation-duration: 3.8s; opacity: .48; }
    .weather-outside-rooms-scene .weather-wind-line-2 { stroke-width: 6.2; stroke-dasharray: 130 82 38 55; animation-duration: 2.3s; opacity: .58; }
    .weather-outside-rooms-scene.weather-exceptional .weather-wind-line { stroke: rgba(94,45,35,.68); }
    .weather-outside-rooms-scene .weather-storm-flash { fill: #fff0bd; opacity: 0; mix-blend-mode: screen; animation: explorerStormFlash 6.5s steps(1,end) infinite; }
    .weather-outside-rooms-scene.is-night .weather-rain-drop { fill: rgba(132,150,158,.64); stroke: rgba(224,227,218,.18); opacity: .72; }
    .weather-outside-rooms-scene.is-night .weather-wind-line { stroke: rgba(156,169,176,.55); }
    .weather-outside-rooms-scene.is-night .weather-fog-band { opacity: .46; }
    .weather-outside-rooms-scene.is-night .weather-storm-flash { animation-name: explorerStormFlashNight; }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene { mix-blend-mode: normal; filter: sepia(.08) saturate(.68) contrast(.97); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-mist { fill: rgba(235, 226, 210, .18); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-mist-front { fill: rgba(246, 238, 223, .17); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(77, 67, 54, .10); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(219, 210, 193, .34); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(241, 233, 218, .48); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(199, 186, 163, .15); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-detail { fill: rgba(255, 246, 228, .17); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-strand { fill: rgba(223, 212, 193, .13); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-fine-strand { fill: rgba(239, 229, 212, .10); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 247, 232, .18); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-snow-flake { fill: #f1e5c5; }
    @keyframes explorerCloudDriftA {
      0% { transform: translate(-54px,-8px) scale(.99); opacity: .86; }
      48% { transform: translate(10px,4px) scale(1.01); opacity: 1; }
      100% { transform: translate(110px,10px) scale(1.03); opacity: .88; }
    }
    @keyframes explorerCloudDriftB {
      0% { transform: translate(72px,-5px) scale(1.02); opacity: .86; }
      50% { transform: translate(2px,7px) scale(.995); opacity: 1; }
      100% { transform: translate(-100px,13px) scale(1.025); opacity: .89; }
    }
    @keyframes explorerCloudDriftC {
      0% { transform: translate(-44px,10px) scale(.99); opacity: .86; }
      47% { transform: translate(14px,-5px) scale(1.018); opacity: 1; }
      100% { transform: translate(96px,13px) scale(1.008); opacity: .88; }
    }
    @keyframes explorerCloudWispParallax {
      0% { transform: translateX(-10px) scaleX(.98); opacity: .72; }
      52% { transform: translateX(5px) scaleX(1.02); opacity: 1; }
      100% { transform: translateX(18px) scaleX(1.04); opacity: .78; }
    }
    @keyframes explorerFogDrift { from { transform: translateX(-42px); } to { transform: translateX(54px); } }
    @keyframes explorerRainDrop { from { transform: translate(7px,-42px); opacity: 0; } 12% { opacity: .82; } 82% { opacity: .68; } to { transform: translate(-13px,78px); opacity: 0; } }
    @keyframes explorerSnowFall { from { transform: translate(0,-30px); } to { transform: translate(22px,55px); } }
    @keyframes explorerHailFall { from { transform: translate(9px,-48px); } to { transform: translate(-15px,82px); } }
    @keyframes explorerWindSweep { from { stroke-dashoffset: 420; transform: translateX(-60px); } to { stroke-dashoffset: 0; transform: translateX(80px); } }
    @keyframes explorerStormFlash { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .52; } }
    @keyframes explorerStormFlashNight { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .28; } }
    @media(prefers-reduced-motion:reduce) {
      .weather-outside-rooms-scene .weather-cloud,
      .weather-outside-rooms-scene .weather-cloud-fine-strand,
      .weather-outside-rooms-scene .weather-fog-band,
      .weather-outside-rooms-scene .weather-rain-drop,
      .weather-outside-rooms-scene .weather-snow-flake,
      .weather-outside-rooms-scene .weather-hail-stone,
      .weather-outside-rooms-scene .weather-wind-line,
      .weather-outside-rooms-scene .weather-storm-flash { animation: none; }
    }
  `;
}
