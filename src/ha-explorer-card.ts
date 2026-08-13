import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./components/explorer-presence-polish-canvas";
import "./components/explorer-ha-editor";
import type { ExplorerCardConfig } from "./models/config";
import type { HomeAssistant } from "./types";
import { resolvePresences } from "./utils/entity-binding";

const CARD_VERSION = "0.25.5";

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
      appearance: { theme: "classic" },
      rooms: [],
      zones: [],
      route_nodes: [],
      route_graph_edges: [],
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
      zones: [],
      route_nodes: [],
      route_graph_edges: [],
      routes: [],
      presences: [],
      ...config,
      appearance: {
        theme: "classic",
        ...(config.appearance ?? {}),
      },
    };
  }

  public getCardSize(): number {
    return 6;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
    };
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";
    const rooms = this.config.rooms ?? [];
    const presences = resolvePresences(this.config.presences ?? [], this.hass, rooms);
    const theme = this.config.appearance?.theme ?? "classic";
    const enchanted = theme === "enchanted_antique";

    return html`
      <ha-card class=${enchanted ? "enchanted" : "classic"}>
        <header>
          <div>
            <span>${enchanted ? "Enchanted Explorer" : "Explorer map"}</span>
            <h1>${this.config.title}</h1>
          </div>
          <small>Living Entity Points · v${CARD_VERSION}</small>
        </header>

        <explorer-presence-polish-canvas
          .theme=${theme}
          .hass=${this.hass}
          .image=${image}
          .rooms=${rooms}
          .zones=${this.config.zones ?? []}
          .routeNodes=${this.config.route_nodes ?? []}
          .routeGraphEdges=${this.config.route_graph_edges ?? []}
          .routes=${this.config.routes ?? []}
          .presences=${presences}
          .minZoom=${this.config.min_zoom ?? 1}
          .maxZoom=${this.config.max_zoom ?? 6}
          .initialZoom=${this.config.initial_zoom ?? 1}
          .fitMode=${this.config.fit_mode ?? "contain"}
        ></explorer-presence-polish-canvas>
      </ha-card>
    `;
  }

  static styles = css`
    :host { display:block; width:100%; min-width:0; position:relative; isolation:isolate; }
    ha-card { width:100%; overflow:hidden; position:relative; z-index:0; }
    header { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 20px; color:var(--primary-text-color); background:var(--ha-card-background,var(--card-background-color)); }
    header span { display:block; font-size:.68rem; letter-spacing:.18em; text-transform:uppercase; color:var(--secondary-text-color); }
    h1 { margin:3px 0 0; font-size:1.25rem; }
    small { color:var(--secondary-text-color); white-space:nowrap; }

    ha-card.enchanted {
      background:#d3b985;
      border-color:rgba(80,50,28,.25);
      box-shadow:0 4px 16px rgba(61,39,24,.16);
    }
    ha-card.enchanted header {
      color:#4b311f;
      background:
        radial-gradient(circle at 18% 20%,rgba(255,240,193,.46),transparent 32%),
        linear-gradient(90deg,#d8c294,#c8a970);
      border-bottom:1px solid rgba(78,50,30,.18);
    }
    ha-card.enchanted header span,
    ha-card.enchanted header small { color:#6b4a33; }
    ha-card.enchanted h1 {
      font-family:Georgia,Cambria,"Times New Roman",serif;
      font-style:italic;
      letter-spacing:.025em;
    }

    @media (max-width:600px) { header { align-items:flex-start; padding:14px 16px; } small { font-size:.68rem; } }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({ type:"ha-explorer-card", name:"Home Assistant Explorer", description:"An interactive SVG floor map for Home Assistant.", preview:true });
console.info(`%c HOME ASSISTANT EXPLORER %c v${CARD_VERSION} `,"color:white;background:#594431;font-weight:700;","color:#594431;background:#d8c39b;font-weight:700;");
