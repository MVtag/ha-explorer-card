import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./room-layer";
import "./presence-layer";
import type {
  ExplorerPresence,
  ExplorerRoom,
  FloorplanFitMode,
  FloorplanMetadata,
  ViewportState,
} from "../models/config";
import {
  VIEWBOX_SIZE,
  clampZoom,
  viewportTransform,
  zoomAroundPoint,
} from "../utils/viewport";

const DEFAULT_METADATA: FloorplanMetadata = {
  width: 16,
  height: 9,
  status: "idle",
};

const BLOCKED_SVG_ELEMENTS =
  "script,foreignObject,iframe,object,embed,link,meta,audio,video,canvas";

function isSvgSource(source: string): boolean {
  try {
    return new URL(source, window.location.href).pathname.toLowerCase().endsWith(".svg");
  } catch {
    return source.split(/[?#]/, 1)[0].toLowerCase().endsWith(".svg");
  }
}

function parseSvgLength(value: string | null): number | undefined {
  if (!value) return undefined;
  const match = value.trim().match(/^(-?\d+(?:\.\d+)?)/);
  if (!match) return undefined;
  const number = Number(match[1]);
  return Number.isFinite(number) && number > 0 ? number : undefined;
}

function readSvgDimensions(svg: SVGSVGElement): { width: number; height: number } {
  const viewBox = svg
    .getAttribute("viewBox")
    ?.trim()
    .split(/[\s,]+/)
    .map(Number);

  if (
    viewBox?.length === 4 &&
    viewBox.every(Number.isFinite) &&
    viewBox[2] > 0 &&
    viewBox[3] > 0
  ) {
    return { width: viewBox[2], height: viewBox[3] };
  }

  return {
    width: parseSvgLength(svg.getAttribute("width")) ?? 16,
    height: parseSvgLength(svg.getAttribute("height")) ?? 9,
  };
}

function sanitizeCss(cssText: string): string {
  return cssText
    .replace(/@import[^;]+;?/gi, "")
    .replace(/url\(([^)]*)\)/gi, (_match, rawReference: string) => {
      const reference = rawReference.trim().replace(/^['"]|['"]$/g, "");
      return reference.startsWith("#") ? `url(${reference})` : "none";
    })
    .replace(/javascript\s*:/gi, "")
    .replace(/expression\s*\(/gi, "");
}

function isSafeSvgReference(value: string): boolean {
  const reference = value.trim();
  return (
    reference === "" ||
    reference.startsWith("#") ||
    /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,/i.test(reference)
  );
}

function sanitizeSvgDocument(document: Document): SVGSVGElement {
  const parserError = document.querySelector("parsererror");
  const root = document.documentElement;

  if (parserError || root.localName.toLowerCase() !== "svg") {
    throw new Error("Filen indeholder ikke gyldig SVG-kode.");
  }

  root.querySelectorAll(BLOCKED_SVG_ELEMENTS).forEach((element) => element.remove());

  const elements = [root, ...Array.from(root.querySelectorAll("*"))];
  for (const element of elements) {
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value;

      if (name.startsWith("on")) {
        element.removeAttribute(attribute.name);
        continue;
      }

      if ((name === "href" || name === "xlink:href") && !isSafeSvgReference(value)) {
        element.removeAttribute(attribute.name);
        continue;
      }

      if (name === "style") {
        const cleanedStyle = sanitizeCss(value).trim();
        if (cleanedStyle) element.setAttribute(attribute.name, cleanedStyle);
        else element.removeAttribute(attribute.name);
      }
    }
  }

  root.querySelectorAll("style").forEach((styleElement) => {
    const cleanedCss = sanitizeCss(styleElement.textContent ?? "").trim();
    if (cleanedCss) styleElement.textContent = cleanedCss;
    else styleElement.remove();
  });

  if (!root.hasAttribute("xmlns")) {
    root.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }

  return root as unknown as SVGSVGElement;
}

@customElement("explorer-canvas")
export class ExplorerCanvas extends LitElement {
  @property() image = "";
  @property({ attribute: false }) rooms: ExplorerRoom[] = [];
  @property({ attribute: false }) presences: ExplorerPresence[] = [];
  @property({ type: Number, attribute: "min-zoom" }) minZoom = 1;
  @property({ type: Number, attribute: "max-zoom" }) maxZoom = 6;
  @property({ type: Number, attribute: "initial-zoom" }) initialZoom = 1;
  @property({ attribute: "fit-mode" }) fitMode: FloorplanFitMode = "contain";

  @state() private viewport: ViewportState = { zoom: 1, x: 0, y: 0 };
  @state() private selectedRoom?: ExplorerRoom;
  @state() private selectedPresence?: ExplorerPresence;
  @state() private metadata: FloorplanMetadata = { ...DEFAULT_METADATA };
  @state() private imageSource = "";
  @state() private loadError = "";

  private pointerId?: number;
  private lastPointer?: { x: number; y: number };
  private imageRequest = 0;
  private svgObjectUrl?: string;

  connectedCallback(): void {
    super.connectedCallback();
    this.resetViewport();
  }

  disconnectedCallback(): void {
    this.releaseSvgObjectUrl();
    super.disconnectedCallback();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("image")) void this.loadFloorplan();
  }

  private releaseSvgObjectUrl(): void {
    if (!this.svgObjectUrl) return;
    URL.revokeObjectURL(this.svgObjectUrl);
    this.svgObjectUrl = undefined;
  }

  private async loadFloorplan(): Promise<void> {
    const request = ++this.imageRequest;
    this.releaseSvgObjectUrl();
    this.imageSource = "";
    this.loadError = "";

    if (!this.image) {
      this.metadata = { ...DEFAULT_METADATA };
      this.resetViewport();
      return;
    }

    this.metadata = { ...this.metadata, status: "loading" };

    try {
      if (isSvgSource(this.image)) await this.loadSvgFloorplan(request);
      else await this.loadRasterFloorplan(request);
    } catch (error) {
      if (request !== this.imageRequest) return;
      this.imageSource = "";
      this.metadata = { ...this.metadata, status: "error" };
      this.loadError = error instanceof Error ? error.message : "Plantegningen kunne ikke indlæses.";
    }
  }

  private async loadSvgFloorplan(request: number): Promise<void> {
    const response = await fetch(this.image, {
      credentials: "same-origin",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`SVG-filen kunne ikke hentes (${response.status}).`);
    }

    const svgText = await response.text();
    if (request !== this.imageRequest) return;

    const document = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const svg = sanitizeSvgDocument(document);
    const dimensions = readSvgDimensions(svg);
    const serializedSvg = new XMLSerializer().serializeToString(svg);
    const objectUrl = URL.createObjectURL(
      new Blob([serializedSvg], { type: "image/svg+xml;charset=utf-8" }),
    );

    if (request !== this.imageRequest) {
      URL.revokeObjectURL(objectUrl);
      return;
    }

    this.svgObjectUrl = objectUrl;
    this.imageSource = objectUrl;
    this.metadata = {
      width: dimensions.width,
      height: dimensions.height,
      status: "loaded",
    };
    this.resetViewport();
  }

  private async loadRasterFloorplan(request: number): Promise<void> {
    const image = new Image();
    image.decoding = "async";

    await new Promise<void>((resolve, reject) => {
      image.onload = () => {
        if (request !== this.imageRequest) return resolve();
        this.imageSource = this.image;
        this.metadata = {
          width: Math.max(1, image.naturalWidth || 16),
          height: Math.max(1, image.naturalHeight || 9),
          status: "loaded",
        };
        this.resetViewport();
        resolve();
      };
      image.onerror = () => reject(new Error("Billedfilen kunne ikke indlæses. Kontrollér filstien."));
      image.src = this.image;
    });
  }

  private resetViewport(): void {
    this.viewport = {
      zoom: clampZoom(this.initialZoom, this.minZoom, this.maxZoom),
      x: 0,
      y: 0,
    };
  }

  private toViewBoxPoint(event: WheelEvent | PointerEvent): { x: number; y: number } {
    const svg = this.renderRoot.querySelector("svg.floorplan");
    if (!svg) return { x: VIEWBOX_SIZE / 2, y: VIEWBOX_SIZE / 2 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * VIEWBOX_SIZE,
      y: ((event.clientY - rect.top) / rect.height) * VIEWBOX_SIZE,
    };
  }

  private handleWheel(event: WheelEvent): void {
    event.preventDefault();
    const point = this.toViewBoxPoint(event);
    const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
    const nextZoom = clampZoom(this.viewport.zoom * factor, this.minZoom, this.maxZoom);
    this.viewport = zoomAroundPoint(this.viewport, nextZoom, point.x, point.y);
  }

  private handlePointerDown(event: PointerEvent): void {
    this.pointerId = event.pointerId;
    this.lastPointer = { x: event.clientX, y: event.clientY };
    (event.currentTarget as SVGElement).setPointerCapture(event.pointerId);
  }

  private handlePointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId || !this.lastPointer) return;
    const rect = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
    const dx = ((event.clientX - this.lastPointer.x) / rect.width) * VIEWBOX_SIZE;
    const dy = ((event.clientY - this.lastPointer.y) / rect.height) * VIEWBOX_SIZE;
    this.viewport = { ...this.viewport, x: this.viewport.x + dx, y: this.viewport.y + dy };
    this.lastPointer = { x: event.clientX, y: event.clientY };
  }

  private handlePointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) return;
    this.pointerId = undefined;
    this.lastPointer = undefined;
  }

  private handleRoomSelected(event: CustomEvent<{ room?: ExplorerRoom }>): void {
    this.selectedRoom = event.detail.room;
    if (event.detail.room) this.selectedPresence = undefined;
  }

  private handlePresenceSelected(event: CustomEvent<{ presence?: ExplorerPresence }>): void {
    this.selectedPresence = event.detail.presence;
    if (event.detail.presence) this.selectedRoom = undefined;
  }

  private get aspectRatio(): string {
    return `${this.metadata.width} / ${this.metadata.height}`;
  }

  protected render() {
    const preserveAspectRatio = this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet";
    const transform = viewportTransform(this.viewport);

    return html`
      <div class="viewport" style=${`--floorplan-ratio:${this.aspectRatio}`}>
        <svg class="floorplan"
          viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Interactive floor plan"
          @wheel=${this.handleWheel}
          @pointerdown=${this.handlePointerDown}
          @pointermove=${this.handlePointerMove}
          @pointerup=${this.handlePointerUp}
          @pointercancel=${this.handlePointerUp}>
          <rect width="1000" height="1000" class="backdrop"></rect>
          <g transform=${transform}>
            ${this.imageSource && this.metadata.status === "loaded"
              ? html`<image href=${this.imageSource} x="0" y="0" width="1000" height="1000"
                  preserveAspectRatio=${preserveAspectRatio}></image>`
              : nothing}
          </g>
        </svg>

        <room-layer
          .rooms=${this.rooms}
          .transform=${transform}
          @room-selected=${this.handleRoomSelected}
        ></room-layer>

        <presence-layer
          .presences=${this.presences}
          .transform=${transform}
          @presence-selected=${this.handlePresenceSelected}
        ></presence-layer>

        ${this.renderStatus()}
        ${this.renderSelection()}

        <div class="controls" aria-label="Kortkontroller">
          <button @click=${this.resetViewport} title="Tilpas plantegningen til skærmen">⌂</button>
          <span>${Math.round(this.viewport.zoom * 100)}%</span>
        </div>
      </div>
    `;
  }

  private renderSelection() {
    if (this.selectedPresence) {
      return html`<div class="selection-info">
        <strong>${this.selectedPresence.name ?? this.selectedPresence.id}</strong>
        <span>${this.selectedPresence.type ?? "person"}</span>
      </div>`;
    }

    if (this.selectedRoom) {
      return html`<div class="selection-info">
        <strong>${this.selectedRoom.name ?? this.selectedRoom.id}</strong>
        <span>Valgt rum</span>
      </div>`;
    }

    return nothing;
  }

  private renderStatus() {
    if (!this.image) return html`<div class="message"><strong>Vælg en plantegning</strong><span>Tilføj en PNG-, JPG- eller SVG-fil i kortets editor.</span></div>`;
    if (this.metadata.status === "loading") return html`<div class="message"><span class="spinner"></span><strong>Indlæser plantegning…</strong></div>`;
    if (this.metadata.status === "error") return html`<div class="message error"><strong>Plantegningen kunne ikke indlæses</strong><span>${this.loadError || "Kontrollér filstien."}</span></div>`;
    return nothing;
  }

  static styles = css`
    :host { display: block; }
    .viewport { position:relative; width:100%; aspect-ratio:var(--floorplan-ratio,16 / 9); min-height:280px; max-height:min(72vh,760px); overflow:hidden; background:#cdbb94; touch-action:none; user-select:none; }
    svg.floorplan { width:100%; height:100%; display:block; cursor:grab; }
    svg.floorplan:active { cursor:grabbing; }
    .backdrop { fill:#d8c9a7; }
    image { pointer-events:none; }
    .message { position:absolute; inset:0; display:grid; place-content:center; justify-items:center; gap:8px; padding:24px; text-align:center; color:#4c3928; pointer-events:none; background:rgba(216,201,167,.82); z-index:5; }
    .message.error { color:#7a251f; }
    .message span { max-width:38ch; }
    .spinner { width:28px; height:28px; border:3px solid currentColor; border-right-color:transparent; border-radius:50%; animation:spin .8s linear infinite; }
    .controls,.selection-info { position:absolute; z-index:6; display:flex; align-items:center; gap:8px; border-radius:999px; background:rgba(45,34,24,.82); color:white; font:500 12px system-ui,sans-serif; }
    .controls { right:12px; bottom:12px; padding:6px 8px; }
    .selection-info { left:12px; bottom:12px; padding:8px 12px; }
    .selection-info span { opacity:.72; text-transform:capitalize; }
    button { border:0; background:transparent; color:inherit; cursor:pointer; font-size:18px; line-height:1; }
    @keyframes spin { to { transform:rotate(360deg); } }
    @media (max-width:600px) { .viewport { min-height:240px; max-height:68vh; } }
  `;
}
