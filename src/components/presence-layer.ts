import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ExplorerPresence, PresenceObjectType } from "../models/config";

const DEFAULT_ICONS: Record<PresenceObjectType, string> = {
  person: "●",
  pet: "◆",
  robot: "■",
  vehicle: "▰",
  object: "✦",
};

@customElement("presence-layer")
export class PresenceLayer extends LitElement {
  @property({ attribute: false }) presences: ExplorerPresence[] = [];
  @property() transform = "";
  @state() private selectedPresenceId?: string;

  private selectPresence(presence: ExplorerPresence): void {
    this.selectedPresenceId = this.selectedPresenceId === presence.id ? undefined : presence.id;
    this.dispatchEvent(new CustomEvent("presence-selected", {
      detail: { presence: this.selectedPresenceId ? presence : undefined },
      bubbles: true,
      composed: true,
    }));
  }

  protected render() {
    const visible = this.presences.filter((presence) => presence.visible !== false);
    if (!visible.length) return nothing;

    return html`
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label="Tilstedeværelseslag">
        <g transform=${this.transform}>
          ${visible.map((presence) => {
            const type = presence.type ?? "person";
            const selected = presence.id === this.selectedPresenceId;
            const x = presence.x * 1000;
            const y = presence.y * 1000;
            const icon = presence.icon ?? DEFAULT_ICONS[type];

            return html`
              <g
                class=${selected ? "presence selected" : "presence"}
                style=${`--presence-color:${presence.color ?? "#03a9f4"};transform:translate(${x}px,${y}px)`}
                @click=${() => this.selectPresence(presence)}
              >
                <circle r="25"></circle>
                <text class="icon" text-anchor="middle" dominant-baseline="central">${icon}</text>
                ${presence.name
                  ? html`<text class="label" y="48" text-anchor="middle">${presence.name}</text>`
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
      display: block;
      pointer-events: none;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .presence {
      pointer-events: all;
      cursor: pointer;
      transition: transform 650ms cubic-bezier(.2,.8,.2,1);
    }

    circle {
      fill: var(--presence-color);
      stroke: white;
      stroke-width: 4;
      vector-effect: non-scaling-stroke;
      filter: drop-shadow(0 3px 5px rgba(0,0,0,.28));
      transition: r 160ms ease, stroke-width 160ms ease;
    }

    .presence:hover circle,
    .presence.selected circle {
      r: 31px;
      stroke-width: 6;
    }

    text {
      pointer-events: none;
      font-family: system-ui, sans-serif;
    }

    .icon {
      fill: white;
      font-size: 25px;
      font-weight: 800;
    }

    .label {
      fill: var(--primary-text-color, #1f2937);
      paint-order: stroke;
      stroke: rgba(255,255,255,.94);
      stroke-width: 5px;
      font-size: 28px;
      font-weight: 700;
    }
  `;
}
