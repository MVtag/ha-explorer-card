import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./components/explorer-canvas";
import type { ExplorerCardConfig } from "./models/config";
import type { HomeAssistant } from "./types";
import { resolvePresences } from "./utils/entity-binding";

const CARD_VERSION = "0.8.0";

@customElement("ha-explorer-card")
export class HaExplorerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: ExplorerCardConfig;

  public static getConfigElement(): HTMLElement {
    return document.createElement("ha-explorer-card-editor");
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
          <small>Unified Scene · v${CARD_VERSION}</small>
        </header>

        <explorer-canvas
          .image=${image}
          .rooms=${rooms}
          .presences=${presences}
          .minZoom=${this.config.min_zoom ?? 1}
          .maxZoom=${this.config.max_zoom ?? 6}
          .initialZoom=${this.config.initial_zoom ?? 1}
          .fitMode=${this.config.fit_mode ?? "contain"}
        ></explorer-canvas>
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

@customElement("ha-explorer-card-editor")
export class HaExplorerCardEditor extends LitElement {
  @property({ attribute:false }) public hass?: HomeAssistant;
  @state() private config?: ExplorerCardConfig;

  public setConfig(config: ExplorerCardConfig): void { this.config = config; }

  private updateText(key: keyof ExplorerCardConfig, value: string): void { this.updateConfig({ [key]: value }); }
  private updateNumber(key: keyof ExplorerCardConfig, value: string): void {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) this.updateConfig({ [key]: parsed });
  }
  private updateConfig(change: Partial<ExplorerCardConfig>): void {
    if (!this.config) return;
    const config = { ...this.config, ...change };
    this.config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail:{ config }, bubbles:true, composed:true }));
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <div class="editor">
        <label>Titel<input .value=${this.config.title ?? ""} @input=${(e:InputEvent)=>this.updateText("title",(e.target as HTMLInputElement).value)} /></label>
        <label>Plantegning<input .value=${this.config.image ?? this.config.background ?? ""} placeholder="/local/explorer/floorplan.svg" @input=${(e:InputEvent)=>this.updateText("image",(e.target as HTMLInputElement).value)} /></label>
        <label>Tilpasning<select .value=${this.config.fit_mode ?? "contain"} @change=${(e:Event)=>this.updateText("fit_mode",(e.target as HTMLSelectElement).value)}><option value="contain">Vis hele plantegningen</option><option value="cover">Fyld hele kortet</option></select></label>
        <div class="notice">Rum og presence-objekter konfigureres foreløbigt i YAML. Floorplan, rum og presence-objekter tegnes nu i én fælles SVG-scene og kan bindes til Home Assistant-entiteter.</div>
        <div class="numbers">
          <label>Minimum zoom<input type="number" min="0.5" step="0.1" .value=${String(this.config.min_zoom ?? 1)} @input=${(e:InputEvent)=>this.updateNumber("min_zoom",(e.target as HTMLInputElement).value)} /></label>
          <label>Maksimum zoom<input type="number" min="1" step="0.5" .value=${String(this.config.max_zoom ?? 6)} @input=${(e:InputEvent)=>this.updateNumber("max_zoom",(e.target as HTMLInputElement).value)} /></label>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor { display:grid; gap:16px; padding:8px 0; }
    .numbers { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    label { display:grid; gap:6px; font-weight:500; }
    input,select { box-sizing:border-box; width:100%; padding:10px 12px; border:1px solid var(--divider-color); border-radius:8px; color:var(--primary-text-color); background:var(--card-background-color); font:inherit; }
    .notice { padding:10px 12px; border-radius:8px; background:var(--secondary-background-color); color:var(--secondary-text-color); font-size:.9rem; line-height:1.4; }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({ type:"ha-explorer-card", name:"Home Assistant Explorer", description:"An interactive SVG floor map for Home Assistant.", preview:true });
console.info(`%c HOME ASSISTANT EXPLORER %c v${CARD_VERSION} `,"color:white;background:#594431;font-weight:700;","color:#594431;background:#d8c39b;font-weight:700;");
