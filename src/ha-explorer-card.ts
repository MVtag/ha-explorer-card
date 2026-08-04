import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ExplorerCardConfig, HomeAssistant } from "./types";

const CARD_VERSION = "0.1.0";

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
    };
  }

  public setConfig(config: ExplorerCardConfig): void {
    if (!config) {
      throw new Error("Configuration is required");
    }

    this.config = {
      title: "Home Assistant Explorer",
      ...config,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  protected render() {
    if (!this.config) {
      return nothing;
    }

    const backgroundStyle = this.config.background
      ? `background-image: linear-gradient(rgba(30, 23, 14, 0.18), rgba(30, 23, 14, 0.18)), url('${this.config.background}')`
      : "";

    return html`
      <ha-card>
        <div class="map" style=${backgroundStyle}>
          <header>
            <span class="eyebrow">Living floor map</span>
            <h1>${this.config.title}</h1>
          </header>

          <div class="placeholder">
            <div class="compass">✦</div>
            <strong>Explorer-kortet er installeret</strong>
            <span>Næste trin bliver plantegning, rum og levende placeringer.</span>
          </div>

          <footer>Home Assistant Explorer · v${CARD_VERSION}</footer>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
    }

    .map {
      min-height: 360px;
      box-sizing: border-box;
      padding: 28px;
      display: flex;
      flex-direction: column;
      color: #3c2b1e;
      background-color: #d8c39b;
      background-size: cover;
      background-position: center;
      font-family: Georgia, "Times New Roman", serif;
      position: relative;
      isolation: isolate;
    }

    .map::before {
      content: "";
      position: absolute;
      inset: 14px;
      border: 1px solid rgba(60, 43, 30, 0.45);
      pointer-events: none;
      z-index: -1;
    }

    header {
      text-align: center;
    }

    .eyebrow {
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      opacity: 0.72;
    }

    h1 {
      margin: 6px 0 0;
      font-size: clamp(1.65rem, 4vw, 2.4rem);
      font-weight: 500;
    }

    .placeholder {
      flex: 1;
      display: grid;
      place-content: center;
      justify-items: center;
      gap: 10px;
      text-align: center;
      padding: 32px 12px;
    }

    .placeholder strong {
      font-size: 1.15rem;
    }

    .placeholder span {
      max-width: 420px;
      line-height: 1.5;
      opacity: 0.8;
    }

    .compass {
      width: 58px;
      height: 58px;
      border: 1px solid currentColor;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 1.8rem;
    }

    footer {
      text-align: center;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      opacity: 0.65;
    }
  `;
}

@customElement("ha-explorer-card-editor")
export class HaExplorerCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: ExplorerCardConfig;

  public setConfig(config: ExplorerCardConfig): void {
    this.config = config;
  }

  private updateValue(key: keyof ExplorerCardConfig, value: string): void {
    if (!this.config) return;

    const config = { ...this.config, [key]: value };
    this.config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    if (!this.config) return nothing;

    return html`
      <div class="editor">
        <label>
          Titel
          <input
            .value=${this.config.title ?? ""}
            @input=${(event: InputEvent) =>
              this.updateValue("title", (event.target as HTMLInputElement).value)}
          />
        </label>

        <label>
          Baggrundsbillede (valgfrit)
          <input
            .value=${this.config.background ?? ""}
            placeholder="/local/explorer/floorplan.png"
            @input=${(event: InputEvent) =>
              this.updateValue("background", (event.target as HTMLInputElement).value)}
          />
        </label>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: grid;
      gap: 16px;
      padding: 8px 0;
    }

    label {
      display: grid;
      gap: 6px;
      font-weight: 500;
    }

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
  description: "A living, interactive floor map for Home Assistant.",
  preview: true,
});

console.info(
  `%c HOME ASSISTANT EXPLORER %c v${CARD_VERSION} `,
  "color: white; background: #594431; font-weight: 700;",
  "color: #594431; background: #d8c39b; font-weight: 700;",
);
