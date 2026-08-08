import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ExplorerRoom } from "../models/config";

@customElement("room-layer")
export class RoomLayer extends LitElement {
  @property({ attribute: false }) rooms: ExplorerRoom[] = [];
  @property() transform = "translate(0 0) scale(1)";
  @state() private selectedRoomId?: string;

  private selectRoom(event: Event, room: ExplorerRoom): void {
    event.stopPropagation();
    this.selectedRoomId = this.selectedRoomId === room.id ? undefined : room.id;
    this.dispatchEvent(new CustomEvent("room-selected", {
      detail: { room: this.selectedRoomId ? room : undefined },
      bubbles: true,
      composed: true,
    }));
  }

  protected render() {
    if (!this.rooms.length) return nothing;

    return html`
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        aria-label="Rumlag"
      >
        <g transform=${this.transform}>
          ${this.rooms.map((room) => {
            const points = room.points.map(([x, y]) => `${x * 1000},${y * 1000}`).join(" ");
            const selected = room.id === this.selectedRoomId;
            const labelX = (room.label?.x ?? room.points.reduce((sum, point) => sum + point[0], 0) / room.points.length) * 1000;
            const labelY = (room.label?.y ?? room.points.reduce((sum, point) => sum + point[1], 0) / room.points.length) * 1000;

            return html`
              <g class=${selected ? "room selected" : "room"}
                @pointerdown=${(event: PointerEvent) => event.stopPropagation()}
                @click=${(event: MouseEvent) => this.selectRoom(event, room)}>
                <polygon points=${points} style=${`--room-color:${room.color ?? "#03a9f4"}`}></polygon>
                ${room.name
                  ? html`<text x=${labelX} y=${labelY} text-anchor="middle" dominant-baseline="middle">${room.name}</text>`
                  : nothing}
              </g>
            `;
          })}
        </g>
      </svg>
    `;
  }

  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    svg {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }

    .room {
      pointer-events: all;
      cursor: pointer;
    }

    polygon {
      fill: color-mix(in srgb, var(--room-color) 18%, transparent);
      stroke: color-mix(in srgb, var(--room-color) 80%, white 10%);
      stroke-width: 3;
      vector-effect: non-scaling-stroke;
      transition: fill 160ms ease, stroke-width 160ms ease;
    }

    .room:hover polygon,
    .room.selected polygon {
      fill: color-mix(in srgb, var(--room-color) 34%, transparent);
      stroke-width: 5;
    }

    text {
      fill: var(--primary-text-color, #1f2937);
      paint-order: stroke;
      stroke: rgba(255,255,255,.9);
      stroke-width: 5px;
      font: 600 30px system-ui, sans-serif;
      pointer-events: none;
    }
  `;
}
