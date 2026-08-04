import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ViewportState } from "../models/config";
import {
  VIEWBOX_SIZE,
  clampZoom,
  viewportTransform,
  zoomAroundPoint,
} from "../utils/viewport";

@customElement("explorer-canvas")
export class ExplorerCanvas extends LitElement {
  @property() image = "";
  @property({ type: Number, attribute: "min-zoom" }) minZoom = 1;
  @property({ type: Number, attribute: "max-zoom" }) maxZoom = 6;
  @property({ type: Number, attribute: "initial-zoom" }) initialZoom = 1;

  @state() private viewport: ViewportState = { zoom: 1, x: 0, y: 0 };
  private pointerId?: number;
  private lastPointer?: { x: number; y: number };

  connectedCallback(): void {
    super.connectedCallback();
    this.resetViewport();
  }

  private resetViewport(): void {
    this.viewport = {
      zoom: clampZoom(this.initialZoom, this.minZoom, this.maxZoom),
      x: 0,
      y: 0,
    };
  }

  private toViewBoxPoint(event: WheelEvent | PointerEvent): { x: number; y: number } {
    const svg = this.renderRoot.querySelector("svg");
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

    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const dx = ((event.clientX - this.lastPointer.x) / rect.width) * VIEWBOX_SIZE;
    const dy = ((event.clientY - this.lastPointer.y) / rect.height) * VIEWBOX_SIZE;

    this.viewport = {
      ...this.viewport,
      x: this.viewport.x + dx,
      y: this.viewport.y + dy,
    };
    this.lastPointer = { x: event.clientX, y: event.clientY };
  }

  private handlePointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) return;
    this.pointerId = undefined;
    this.lastPointer = undefined;
  }

  protected render() {
    return html`
      <div class="viewport">
        <svg
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
          <rect width="1000" height="1000" class="backdrop"></rect>
          <g transform=${viewportTransform(this.viewport)}>
            ${this.image
              ? html`<image
                  href=${this.image}
                  x="0"
                  y="0"
                  width="1000"
                  height="1000"
                  preserveAspectRatio="xMidYMid meet"
                ></image>`
              : nothing}
          </g>
        </svg>

        ${this.image
          ? nothing
          : html`<div class="empty">
              <strong>Vælg en plantegning</strong>
              <span>Tilføj en PNG-, JPG- eller SVG-fil i kortets editor.</span>
            </div>`}

        <div class="controls">
          <button @click=${this.resetViewport} title="Nulstil visning">⌂</button>
          <span>${Math.round(this.viewport.zoom * 100)}%</span>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .viewport {
      position: relative;
      min-height: 420px;
      overflow: hidden;
      background: #cdbb94;
      touch-action: none;
      user-select: none;
    }
    svg {
      width: 100%;
      height: 100%;
      min-height: 420px;
      display: block;
      cursor: grab;
    }
    svg:active { cursor: grabbing; }
    .backdrop { fill: #d8c9a7; }
    image { pointer-events: none; }
    .empty {
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
    }
    .empty span { opacity: 0.75; }
    .controls {
      position: absolute;
      right: 12px;
      bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 999px;
      background: rgba(45, 34, 24, 0.78);
      color: white;
      font: 500 12px system-ui, sans-serif;
    }
    button {
      border: 0;
      background: transparent;
      color: inherit;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
    }
  `;
}
