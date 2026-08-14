import { css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ExplorerPresenceActivityCanvas } from "./explorer-presence-activity-canvas";
import type { ExplorerTheme } from "../models/config";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

@customElement("explorer-themed-canvas")
export class ExplorerThemedCanvas extends ExplorerPresenceActivityCanvas {
  @property({ attribute: "map-theme", reflect: true })
  public theme: ExplorerTheme = "classic";

  private readonly artifactId = `explorer-antique-${Math.random().toString(36).slice(2, 10)}`;
  private hasRevealedEnchanted = false;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    this.syncThemeArtifacts();
  }

  private createSvg<K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] {
    return document.createElementNS(SVG_NAMESPACE, tag);
  }

  private setAttributes(element: Element, attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  }

  private removeThemeArtifacts(svgRoot: SVGSVGElement, scene: SVGGElement): void {
    svgRoot.querySelector<SVGDefsElement>(`:scope > defs.${this.artifactId}`)?.remove();
    svgRoot.querySelector<SVGGElement>(`:scope > g.${this.artifactId}-compass`)?.remove();
    scene.querySelector<SVGGElement>(`:scope > g.${this.artifactId}-paper`)?.remove();
  }

  private createThemeDefs(): SVGDefsElement {
    const defs = this.createSvg("defs");
    defs.setAttribute("class", this.artifactId);
    const paperNoise = this.createSvg("filter");
    this.setAttributes(paperNoise, { id: `${this.artifactId}-grain`, x: "-10%", y: "-10%", width: "120%", height: "120%", "color-interpolation-filters": "sRGB" });
    const turbulence = this.createSvg("feTurbulence");
    this.setAttributes(turbulence, { type: "fractalNoise", baseFrequency: ".035", numOctaves: "3", seed: "17", result: "noise" });
    paperNoise.appendChild(turbulence);
    const colorMatrix = this.createSvg("feColorMatrix");
    this.setAttributes(colorMatrix, { in: "noise", type: "matrix", values: "0 0 0 0 0.30  0 0 0 0 0.20  0 0 0 0 0.11  0 0 0 .24 0" });
    paperNoise.appendChild(colorMatrix);
    defs.appendChild(paperNoise);
    const vignette = this.createSvg("radialGradient");
    vignette.setAttribute("id", `${this.artifactId}-vignette`);
    const center = this.createSvg("stop");
    this.setAttributes(center, { offset: "0%", "stop-color": "#f6e3b7", "stop-opacity": "0" });
    vignette.appendChild(center);
    const middle = this.createSvg("stop");
    this.setAttributes(middle, { offset: "70%", "stop-color": "#9b6c3d", "stop-opacity": ".04" });
    vignette.appendChild(middle);
    const edge = this.createSvg("stop");
    this.setAttributes(edge, { offset: "100%", "stop-color": "#3f291c", "stop-opacity": ".30" });
    vignette.appendChild(edge);
    defs.appendChild(vignette);
    return defs;
  }

  private createPaperLayer(): SVGGElement {
    const group = this.createSvg("g");
    group.setAttribute("class", `${this.artifactId}-paper antique-paper-scene`);
    group.setAttribute("pointer-events", "none");
    group.setAttribute("aria-hidden", "true");
    const wash = this.createSvg("rect");
    this.setAttributes(wash, { x: "0", y: "0", width: "1000", height: "1000", fill: "#b9864d", opacity: ".105" });
    wash.style.mixBlendMode = "multiply";
    group.appendChild(wash);
    const grain = this.createSvg("rect");
    this.setAttributes(grain, { x: "0", y: "0", width: "1000", height: "1000", fill: "#6b482d", opacity: ".32", filter: `url(#${this.artifactId}-grain)` });
    grain.style.mixBlendMode = "multiply";
    group.appendChild(grain);
    const vignette = this.createSvg("rect");
    this.setAttributes(vignette, { x: "0", y: "0", width: "1000", height: "1000", fill: `url(#${this.artifactId}-vignette)`, opacity: ".58" });
    group.appendChild(vignette);
    return group;
  }

  private createCompass(): SVGGElement {
    const group = this.createSvg("g");
    group.setAttribute("class", `${this.artifactId}-compass antique-compass`);
    group.setAttribute("transform", "translate(906 102) rotate(-7)");
    group.setAttribute("pointer-events", "none");
    group.setAttribute("aria-hidden", "true");
    const outer = this.createSvg("circle");
    this.setAttributes(outer, { r: "48", fill: "none", stroke: "#5b3c28", "stroke-width": "2.2", "stroke-opacity": ".62" });
    group.appendChild(outer);
    const inner = this.createSvg("circle");
    this.setAttributes(inner, { r: "34", fill: "none", stroke: "#5b3c28", "stroke-width": "1", "stroke-opacity": ".38" });
    group.appendChild(inner);
    const crossA = this.createSvg("line");
    this.setAttributes(crossA, { x1: "0", y1: "-42", x2: "0", y2: "42", stroke: "#5b3c28", "stroke-width": "1.5", "stroke-opacity": ".54" });
    group.appendChild(crossA);
    const crossB = this.createSvg("line");
    this.setAttributes(crossB, { x1: "-42", y1: "0", x2: "42", y2: "0", stroke: "#5b3c28", "stroke-width": "1.5", "stroke-opacity": ".54" });
    group.appendChild(crossB);
    const north = this.createSvg("path");
    this.setAttributes(north, { d: "M 0 -42 L 8 -8 L 0 -15 L -8 -8 Z", fill: "#5a3924", "fill-opacity": ".76" });
    group.appendChild(north);
    const south = this.createSvg("path");
    this.setAttributes(south, { d: "M 0 42 L 6 9 L 0 15 L -6 9 Z", fill: "#7b5636", "fill-opacity": ".42" });
    group.appendChild(south);
    const label = this.createSvg("text");
    this.setAttributes(label, { x: "0", y: "-57", "text-anchor": "middle", fill: "#523522", "font-size": "17", "font-family": "Georgia, Cambria, serif", "font-weight": "700" });
    label.textContent = "N";
    group.appendChild(label);
    const center = this.createSvg("circle");
    this.setAttributes(center, { r: "3.2", fill: "#5b3c28", "fill-opacity": ".68" });
    group.appendChild(center);
    group.setAttribute("opacity", ".62");
    return group;
  }

  private syncThemeArtifacts(): void {
    const svgRoot = this.renderRoot.querySelector<SVGSVGElement>("svg.floorplan");
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!svgRoot || !scene) return;
    this.removeThemeArtifacts(svgRoot, scene);
    if (this.theme !== "enchanted_antique") return;
    svgRoot.insertBefore(this.createThemeDefs(), svgRoot.firstChild);
    const paper = this.createPaperLayer();
    const roomsLayer = scene.querySelector<SVGGElement>(":scope > g.rooms-scene");
    scene.insertBefore(paper, roomsLayer ?? null);
    const compass = this.createCompass();
    svgRoot.appendChild(compass);
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (!reduceMotion && !this.hasRevealedEnchanted) {
      this.hasRevealedEnchanted = true;
      scene.animate([{ opacity: 0.28 }, { opacity: 1 }], { duration: 850, easing: "cubic-bezier(.2,.8,.2,1)" });
      compass.animate([{ opacity: 0 }, { opacity: 0.62 }], { duration: 1100, delay: 180, fill: "both", easing: "ease-out" });
    }
  }

  static override styles = css`
    ${ExplorerPresenceActivityCanvas.styles}
    :host([map-theme="enchanted_antique"]) { --primary-color:#68472f; --primary-text-color:#4c321f; --secondary-text-color:#6f5239; --success-color:#6f6d3c; --error-color:#8b4639; --warning-color:#9a6731; --accent-color:#74513b; --card-background-color:#d9c294; --explorer-room-light-color:#e3a33d; --explorer-room-motion-color:#75573a; --explorer-room-media-color:#71503e; --explorer-room-opening-color:#936031; --explorer-room-panel-background:rgba(218,192,143,.96); --explorer-room-panel-text:#4b311f; --explorer-room-panel-border:rgba(82,50,30,.34); --explorer-room-panel-control:rgba(91,57,34,.12); --explorer-room-panel-row:rgba(255,239,199,.22); }
    :host([map-theme="enchanted_antique"]) .viewport { background:radial-gradient(circle at 22% 18%,rgba(255,240,195,.42),transparent 28%),radial-gradient(circle at 78% 76%,rgba(91,55,29,.16),transparent 42%),#c4a26e; box-shadow:inset 0 0 34px rgba(64,40,25,.22),inset 0 0 110px rgba(82,50,26,.12); }
    :host([map-theme="enchanted_antique"]) .viewport::after { content:""; position:absolute; inset:0; pointer-events:none; z-index:3; box-shadow:inset 0 0 44px rgba(60,38,24,.21); }
    :host([map-theme="enchanted_antique"]) .backdrop { fill:#caa970; }
    :host([map-theme="enchanted_antique"]) .floorplan-source { filter:sepia(.92) saturate(.58) contrast(1.10) brightness(.93); opacity:.88; mix-blend-mode:multiply; }
    :host([map-theme="enchanted_antique"]) .room polygon { fill:#795132 !important; fill-opacity:.075 !important; stroke:#543722 !important; stroke-opacity:.83 !important; stroke-width:2.6px !important; stroke-linecap:round; stroke-linejoin:round; filter:drop-shadow(0 1px .45px rgba(69,42,24,.28)); }
    :host([map-theme="enchanted_antique"]) .room:hover polygon { fill-opacity:.14 !important; }
    :host([map-theme="enchanted_antique"]) .room.selected polygon { fill-opacity:.19 !important; stroke-width:4px !important; }
    :host([map-theme="enchanted_antique"]) .room-label,:host([map-theme="enchanted_antique"]) .presence-label,:host([map-theme="enchanted_antique"]) .route-status-scene text { fill:#4e321e !important; stroke:rgba(222,199,151,.82) !important; stroke-width:3.5px !important; font-family:Georgia,Cambria,"Times New Roman",serif !important; letter-spacing:.045em; }
    :host([map-theme="enchanted_antique"]) .room-label { font-style:italic; font-weight:700; }
    :host([map-theme="enchanted_antique"]) .presence-label { font-weight:700; font-variant:small-caps; }
    :host([map-theme="enchanted_antique"]) .presence-border { stroke:#ead8aa !important; filter:drop-shadow(0 2px 3px rgba(54,34,21,.35)); }
    :host([map-theme="enchanted_antique"]) .presence-avatar-background,:host([map-theme="enchanted_antique"]) .presence-marker { fill:#76543a !important; }
    :host([map-theme="enchanted_antique"]) .footsteps-scene ellipse { fill:#4b301d !important; filter:drop-shadow(0 0 1.3px rgba(66,38,20,.38)); }
    :host([map-theme="enchanted_antique"]) .route-status-scene line { filter:drop-shadow(0 .6px .6px rgba(65,39,23,.28)); }
    :host([map-theme="enchanted_antique"]) .room-reactions-scene polygon { mix-blend-mode:multiply; }
    :host([map-theme="enchanted_antique"]) .antique-paper-scene,:host([map-theme="enchanted_antique"]) .antique-compass { pointer-events:none; }
    @media (prefers-reduced-motion:reduce) { :host([map-theme="enchanted_antique"]) .room polygon,:host([map-theme="enchanted_antique"]) .floorplan-source { transition:none !important; } }
  `;
}
