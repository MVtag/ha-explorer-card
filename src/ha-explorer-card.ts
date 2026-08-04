import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./components/explorer-canvas";
import type { ExplorerCardConfig } from "./models/config";
import type { HomeAssistant } from "./types";

const CARD_VERSION = "0.2.0-dev";

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
    };
  }

  public setConfig(config: ExplorerCardConfig): void {
    if (!config) throw new Error("Configuration is required");
    this.config = {
      title: "Home Assistant Explorer",
      min_zoom: 1,
      max_zoom: 6,
      initial_zoom: 1,
      ...config,
    };
  }

  public getCardSize(): number {
    return 6;
  }

  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "";

    return html`
      <ha-card>
        <header>
          <div>
            <span>Explorer map</span>
            <h1>${this.config.title}</h1>
          </div>
          <small>SVG Engine · v${CARD_VERSION}</small>
        </header>

        <explorer-canvas
          .image=${image}
          .minZoom=${this.config.min_zoom ?? 1}
          .maxZoom=${this.config.max_zoom ?? 6}
          .initialZoom=${this.config.initial_zoom ?? 1}
        ></explorer-canvas>
      </ha-card>
    `;
  }

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 20px;
      color: var(--primary-text-color);
      background: var(--ha-card-background, var(--card-background-color));
    }
    header span {
      display: block;
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }
    h1 { margin: 3px 0 0; font-size: 1.25rem; }
    small { color: var(--secondary-text-color); white-space: nowrap; }
  `;
}

@customElement("ha-explorer-card-editor")
export class HaExplorerCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: ExplorerCardConfig;

  public setConfig(config: ExplorerCardConfig): void {
    this.config = config;
  }

  private updateText(key: keyof ExplorerCardConfig, value: string): void {
    this.updateConfig({ [key]: value });
  }

  private updateNumber(key: keyof ExplorerCardConfig, value: string): void {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    this.updateConfig({ [key]: parsed });
  }

  private updateConfig(change: Partial<ExplorerCardConfig>): void {
    if (!this.config) return;
    const config = { ...this.config, ...change };
    this.config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  protected render() {
    if (!this.config) return nothing;

    return html`
      <div class="editor">
        <label>Titel
          <input .value=${this.config.title ?? ""}
            @input=${(e: InputEvent) => this.updateText("title", (e.target as HTMLInputElement).value)} />
        </label>
        <label>Plantegning
          <input .value=${this.config.image ?? this.config.background ?? ""}
            placeholder="/local/explorer/floorplan.svg"
            @input=${(e: InputEvent) => this.updateText("image", (e.target as HTMLInputElement).value)} />
        </label>
        <div class="numbers">
          <label>Minimum zoom
            <input type="number" min="0.5" step="0.1" .value=${String(this.config.min_zoom ?? 1)}
              @input=${(e: InputEvent) => this.updateNumber("min_zoom", (e.target as HTMLInputElement).value)} />
          </label>
          <label>Maksimum zoom
            <input type="number" min="1" step="0.5" .value=${String(this.config.max_zoom ?? 6)}
              @input=${(e: InputEvent) => this.updateNumber("max_zoom", (e.target as HTMLInputElement).value)} />
          </label>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor { display: grid; gap: 16px; padding: 8px 0; }
    .numbers { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    label { display: grid; gap: 6px; font-weight: 500; }
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: var(--card-background-color);
      font: inherit;
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-explorer-card",
  name: "Home Assistant Explorer",
  description: "An interactive SVG floor map for Home Assistant.",
  preview: true,
});

console.info(`%c HOME ASSISTANT EXPLORER %c v${CARD_VERSION} `,
  "color:white;background:#594431;font-weight:700;",
  "color:#594431;background:#d8c39b;font-weight:700;");
