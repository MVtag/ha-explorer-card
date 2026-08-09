import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./components/explorer-animated-canvas";
import "./components/explorer-ha-editor";
import type { ExplorerCardConfig } from "./models/config";
import type { HomeAssistant } from "./types";
import { resolvePresences } from "./utils/entity-binding";

const CARD_VERSION = "0.13.0";

@customElement("ha-explorer-card")
export class HaExplorerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: ExplorerCardConfig;

  public static getConfigElement(): HTMLElement {
    return document.createElement("ha-explorer-ha-editor");
  }

  public static getStubConfig(): ExplorerCardConfig {
    return {
      type: "custom:ha-explorer-card",
      title: "Home Assistant Explorer",
      min_zoom: 1,
      max_zoom: 6,
      initial_zoom: 1,
      fit_mode: "contain",
      rooms: [],
      routes: [],
      presences: [],
    };
  }

  public setConfig(config: ExplorerCardConfig): void {
    if (!config) throw new Error("Configuration is required");
    this.config = {
      title: "Home Assistant Explorer",
      min_zoom: 1,
      max_zoom: 6,
      initial_zoom: 1,
      fit_mode: "contain",
      rooms: [],
      routes: [],
      presences: [],
      ...config,
    };
  }

  public getCardSize(): number {
    return 6;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const rooms = this.config.rooms ?? [];
    const presences = resolvePresences(this.config.presences ?? [], this.hass, rooms);

    return html`
      <ha-card>
        <header>
          <div>
            <span>Explorer map</span>
            <h1>${this.config.title}</h1>
          </div>
          <small>Route Paths · v${CARD_VERSION}</small>
        </header>

        <explorer-animated-canvas
          .image=${image}
          .rooms=${rooms}
          .routes=${this.config.routes ?? []}
          .presences=${presences}
          .minZoom=${this.config.min_zoom ?? 1}
          .maxZoom=${this.config.max_zoom ?? 6}
          .initialZoom=${this.config.initial_zoom ?? 1}
          .fitMode=${this.config.fit_mode ?? "contain"}
        ></explorer-animated-canvas>
      </ha-card>
    `;
  }

  static styles = css`
    :host { display:block; }
    ha-card { overflow:hidden; }
    header { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 20px; color:var(--primary-text-color); background:var(--ha-card-background,var(--card-background-color)); }
    header span { display:block; font-size:.68rem; letter-spacing:.18em; text-transform:uppercase; color:var(--secondary-text-color); }
    h1 { margin:3px 0 0; font-size:1.25rem; }
    small { color:var(--secondary-text-color); white-space:nowrap; }
    @media (max-width:600px) { header { align-items:flex-start; padding:14px 16px; } small { font-size:.68rem; } }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({ type:"ha-explorer-card", name:"Home Assistant Explorer", description:"An interactive SVG floor map for Home Assistant.", preview:true });
console.info(`%c HOME ASSISTANT EXPLORER %c v${CARD_VERSION} `,"color:white;background:#594431;font-weight:700;","color:#594431;background:#d8c39b;font-weight:700;");
