import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "./explorer-room-panel";
import type {
  ExplorerPresence,
  ExplorerRoom,
  FloorplanFitMode,
  FloorplanMetadata,
  PresenceObjectType,
  ViewportState,
} from "../models/config";
import type { HomeAssistant } from "../types";
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

const DEFAULT_ICONS: Record<PresenceObjectType, string> = {
  person: "●",
  pet: "◆",
  robot: "■",
  vehicle: "▰",
  object: "✦",
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

function readSvgDimensions(svgElement: SVGSVGElement): { width: number; height: number } {
  const viewBox = svgElement
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
    width: parseSvgLength(svgElement.getAttribute("width")) ?? 16,
    height: parseSvgLength(svgElement.getAttribute("height")) ?? 9,
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

function safePresenceAvatar(source?: string): string | undefined {
  const value = source?.trim();
  if (!value) return undefined;

  if (/^data:image\/(?:png|jpe?g|gif|webp);base64,/i.test(value)) return value;
  if (value.startsWith("/")) return value;

  try {
    const url = new URL(value, window.location.href);
    if (["http:", "https:", "blob:"].includes(url.protocol)) return value;
  } catch {
    return undefined;
  }

  return undefined;
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
  @property({ attribute: false }) public hass?: HomeAssistant;
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
  @state() private svgMarkup = "";
  @state() private loadError = "";

  private pointerId?: number;
  private lastPointer?: { x: number; y: number };
  private imageRequest = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.resetViewport();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("rooms") && this.selectedRoom) {
      this.selectedRoom = this.rooms.find((room) => room.id === this.selectedRoom?.id);
    }

    if (
      changed.has("image") ||
      (changed.has("fitMode") && this.image && isSvgSource(this.image))
    ) {
      void this.loadFloorplan();
    }
  }

  private async loadFloorplan(): Promise<void> {
    const request = ++this.imageRequest;
    this.imageSource = "";
    this.svgMarkup = "";
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
      this.svgMarkup = "";
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
    const svgElement = sanitizeSvgDocument(document);
    const dimensions = readSvgDimensions(svgElement);

    if (!svgElement.hasAttribute("viewBox")) {
      svgElement.setAttribute("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);
    }

    svgElement.setAttribute("x", "0");
    svgElement.setAttribute("y", "0");
    svgElement.setAttribute("width", String(VIEWBOX_SIZE));
    svgElement.setAttribute("height", String(VIEWBOX_SIZE));
    svgElement.setAttribute(
      "preserveAspectRatio",
      this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet",
    );
    svgElement.setAttribute("class", "inline-floorplan");

    const serializedSvg = new XMLSerializer().serializeToString(svgElement);
    if (request !== this.imageRequest) return;

    this.svgMarkup = serializedSvg;
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
    const svgElement = this.renderRoot.querySelector("svg.floorplan");
    if (!svgElement) return { x: VIEWBOX_SIZE / 2, y: VIEWBOX_SIZE / 2 };
    const rect = svgElement.getBoundingClientRect();
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

  private selectRoom(event: Event, room: ExplorerRoom): void {
    event.stopPropagation();
    this.selectedRoom = this.selectedRoom?.id === room.id ? undefined : room;
    if (this.selectedRoom) this.selectedPresence = undefined;
  }

  private selectPresence(event: Event, presence: ExplorerPresence): void {
    event.stopPropagation();
    this.selectedPresence = this.selectedPresence?.id === presence.id ? undefined : presence;
    if (this.selectedPresence) this.selectedRoom = undefined;
  }

  private renderRooms() {
    return this.rooms.map((room) => {
      if (!room.points.length) return nothing;

      const points = room.points.map(([x, y]) => `${x * VIEWBOX_SIZE},${y * VIEWBOX_SIZE}`).join(" ");
      const selected = room.id === this.selectedRoom?.id;
      const averageX = room.points.reduce((sum, point) => sum + point[0], 0) / room.points.length;
      const averageY = room.points.reduce((sum, point) => sum + point[1], 0) / room.points.length;
      const labelX = (room.label?.x ?? averageX) * VIEWBOX_SIZE;
      const labelY = (room.label?.y ?? averageY) * VIEWBOX_SIZE;
      const color = room.color ?? "#03a9f4";

      return svg`
        <g
          class=${selected ? "room selected" : "room"}
          @pointerdown=${(event: PointerEvent) => event.stopPropagation()}
          @click=${(event: MouseEvent) => this.selectRoom(event, room)}
        >
          <polygon
            points=${points}
            fill=${color}
            fill-opacity=${selected ? "0.34" : "0.18"}
            stroke=${color}
            stroke-opacity="0.9"
            stroke-width=${selected ? "5" : "3"}
            vector-effect="non-scaling-stroke"
          ></polygon>
          ${room.name
            ? svg`<text
                class="room-label"
                x=${labelX}
                y=${labelY}
                text-anchor="middle"
                dominant-baseline="middle"
              >${room.name}</text>`
            : nothing}
        </g>
      `;
    });
  }

  private renderPresences() {
    return this.presences
      .filter((presence) => presence.visible !== false)
      .map((presence, index) => {
        const type = presence.type ?? "person";
        const selected = presence.id === this.selectedPresence?.id;
        const x = (presence.x ?? 0.5) * VIEWBOX_SIZE;
        const y = (presence.y ?? 0.5) * VIEWBOX_SIZE;
        const icon = presence.icon ?? DEFAULT_ICONS[type];
        const avatar = safePresenceAvatar(presence.avatar);
        const color = presence.color ?? "#03a9f4";
        const radius = selected ? 31 : 25;
        const diameter = radius * 2;
        const clipId = `presence-avatar-${index}`;
        const labelY = selected ? 58 : 52;

        return svg`
          <g
            class=${selected ? "presence selected" : "presence"}
            transform=${`translate(${x} ${y})`}
            @pointerdown=${(event: PointerEvent) => event.stopPropagation()}
            @click=${(event: MouseEvent) => this.selectPresence(event, presence)}
          >
            ${avatar
              ? svg`
                  <defs>
                    <clipPath id=${clipId}>
                      <circle r=${radius}></circle>
                    </clipPath>
                  </defs>
                  <circle
                    class="presence-avatar-background"
                    r=${radius}
                    fill=${color}
                  ></circle>
                  <image
                    class="presence-avatar"
                    href=${avatar}
                    x=${-radius}
                    y=${-radius}
                    width=${diameter}
                    height=${diameter}
                    preserveAspectRatio="xMidYMid slice"
                    clip-path=${`url(#${clipId})`}
                  ></image>
                  <circle
                    class="presence-border"
                    r=${radius}
                    fill="none"
                    stroke="white"
                    stroke-width=${selected ? "6" : "4"}
                    vector-effect="non-scaling-stroke"
                  ></circle>
                `
              : svg`
                  <circle
                    class="presence-marker"
                    r=${radius}
                    fill=${color}
                    stroke="white"
                    stroke-width=${selected ? "6" : "4"}
                    vector-effect="non-scaling-stroke"
                  ></circle>
                  <text class="presence-icon" text-anchor="middle" dominant-baseline="central">${icon}</text>
                `}
            ${presence.name
              ? svg`<text class="presence-label" y=${labelY} text-anchor="middle">${presence.name}</text>`
              : nothing}
          </g>
        `;
      });
  }

  private get aspectRatio(): string {
    return `${this.metadata.width} / ${this.metadata.height}`;
  }

  protected render() {
    const preserveAspectRatio = this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet";
    const transform = viewportTransform(this.viewport);

    return html`
      <div class="viewport" style=${`--floorplan-ratio:${this.aspectRatio}`}>
        <svg
          class="floorplan"
          viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Interactive floor plan"
          @wheel=${this.handleWheel}
          @pointerdown=${this.handlePointerDown}
          @pointermove=${this.handlePointerMove}
          @pointerup=${this.handlePointerUp}
          @pointercancel=${this.handlePointerUp}
        >
          <rect width=${VIEWBOX_SIZE} height=${VIEWBOX_SIZE} class="backdrop"></rect>

          <g class="scene" transform=${transform}>
            <g class="floorplan-source">
              ${this.svgMarkup && this.metadata.status === "loaded"
                ? unsafeSVG(this.svgMarkup)
                : this.imageSource && this.metadata.status === "loaded"
                  ? svg`<image
                      href=${this.imageSource}
                      x="0"
                      y="0"
                      width=${VIEWBOX_SIZE}
                      height=${VIEWBOX_SIZE}
                      preserveAspectRatio=${preserveAspectRatio}
                    ></image>`
                  : nothing}
            </g>

            <g class="rooms-scene" aria-label="Rumlag">
              ${this.renderRooms()}
            </g>

            <g class="presences-scene" aria-label="Tilstedeværelseslag">
              ${this.renderPresences()}
            </g>
          </g>
        </svg>

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
      return html`<explorer-room-panel
        .room=${this.selectedRoom}
        .presences=${this.presences}
        .hass=${this.hass}
        @explorer-room-close=${this.clearRoomSelection}
      ></explorer-room-panel>`;
    }

    return nothing;
  }

  private clearRoomSelection(): void {
    this.selectedRoom = undefined;
  }

  private renderStatus() {
    if (!this.image) {
      return html`<div class="message">
        <strong>Vælg en plantegning</strong>
        <span>Tilføj en PNG-, JPG- eller SVG-fil i kortets editor.</span>
      </div>`;
    }
    if (this.metadata.status === "loading") {
      return html`<div class="message"><span class="spinner"></span><strong>Indlæser plantegning…</strong></div>`;
    }
    if (this.metadata.status === "error") {
      return html`<div class="message error">
        <strong>Plantegningen kunne ikke indlæses</strong>
        <span>${this.loadError || "Kontrollér filstien."}</span>
      </div>`;
    }
    return nothing;
  }

  static styles = css`
    :host { display: block; }

    .viewport {
      position: relative;
      width: 100%;
      aspect-ratio: var(--floorplan-ratio, 16 / 9);
      min-height: 280px;
      max-height: var(--explorer-viewport-max-height, min(72vh, 760px));
      overflow: hidden;
      background: #cdbb94;
      user-select: none;
    }

    svg.floorplan {
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
      touch-action: none;
    }

    svg.floorplan:active { cursor: grabbing; }
    .backdrop { fill: #d8c9a7; }
    .floorplan-source { pointer-events: none; }

    .room,
    .presence {
      cursor: pointer;
      pointer-events: all;
    }

    .room polygon {
      transition: fill-opacity 160ms ease, stroke-width 160ms ease;
    }

    .room:hover polygon { fill-opacity: .3; }

    .room-label,
    .presence-label {
      fill: var(--primary-text-color, #1f2937);
      paint-order: stroke;
      stroke: rgba(255,255,255,.94);
      pointer-events: none;
      font-family: system-ui, sans-serif;
    }

    .room-label {
      stroke-width: 5px;
      font-size: 30px;
      font-weight: 600;
    }

    .presence-marker,
    .presence-avatar-background,
    .presence-avatar,
    .presence-border {
      filter: drop-shadow(0 3px 5px rgba(0,0,0,.28));
    }

    .presence-avatar,
    .presence-border,
    .presence-icon {
      pointer-events: none;
    }

    .presence-icon {
      fill: white;
      font-family: system-ui, sans-serif;
      font-size: 25px;
      font-weight: 800;
    }

    .presence-label {
      stroke-width: 5px;
      font-size: 28px;
      font-weight: 700;
    }

    .message {
      position: absolute;
      inset: 0;
      display: grid;
      place-content: center;
      justify-items: center;
      gap: 8px;
      padding: 24px;
      text-align: center;
      color: #4c3928;
      pointer-events: none;
      background: rgba(216,201,167,.82);
      z-index: 5;
    }

    .message.error { color: #7a251f; }
    .message span { max-width: 38ch; }

    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }

    .controls,
    .selection-info {
      position: absolute;
      z-index: 6;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      background: rgba(45,34,24,.82);
      color: white;
      font: 500 12px system-ui, sans-serif;
    }

    .controls { right: 12px; bottom: 12px; padding: 6px 8px; }
    .selection-info { left: 12px; bottom: 12px; padding: 8px 12px; }
    .selection-info span { opacity: .72; text-transform: capitalize; }
    button { border: 0; background: transparent; color: inherit; cursor: pointer; font-size: 18px; line-height: 1; }

    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 600px) {
      .viewport { min-height: 240px; max-height: var(--explorer-viewport-max-height, 68vh); }
    }
  `;
}
