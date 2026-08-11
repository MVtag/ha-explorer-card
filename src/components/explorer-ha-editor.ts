import { html, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig } from "../models/config";
import { HaExplorerCardEditor } from "./explorer-config-editor";
import { HaExplorerRoomDrawingEditor } from "./explorer-room-drawing-editor";
import "./explorer-theme-editor";
import "./explorer-zones-editor";
import "./explorer-room-reactions-editor";
import "./explorer-route-editor";
import "./explorer-route-graph-editor";
import "./explorer-route-diagnostics";

type ConfigChangedEvent = Event & {
  detail: { config: ExplorerCardConfig };
};

/** Drawing-only adapter around the existing room drawing editor. */
@customElement("ha-explorer-room-tools")
class HaExplorerRoomTools extends HaExplorerRoomDrawingEditor {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has("config") && this.config) this.setConfig(this.config);
  }

  protected override render(): TemplateResult<1> {
    return (
      this as unknown as {
        renderRoomDrawingEditor: () => TemplateResult<1>;
      }
    ).renderRoomDrawingEditor();
  }
}

@customElement("ha-explorer-ha-editor")
export class HaExplorerHaEditor extends HaExplorerCardEditor {
  private get currentConfig(): ExplorerCardConfig | undefined {
    return (this as unknown as { config?: ExplorerCardConfig }).config;
  }

  private emitHomeAssistantConfig(config: ExplorerCardConfig): boolean {
    const homeAssistantEvent = new Event("config-changed", {
      bubbles: true,
      composed: true,
    }) as ConfigChangedEvent;
    homeAssistantEvent.detail = { config };
    return super.dispatchEvent(homeAssistantEvent);
  }

  private readonly handleNativeControlChange = (event: Event): void => {
    event.stopPropagation();
    queueMicrotask(() => {
      const config = this.currentConfig;
      if (config) this.emitHomeAssistantConfig(config);
    });
  };

  protected override firstUpdated(): void {
    this.renderRoot.addEventListener("change", this.handleNativeControlChange);
  }

  public override disconnectedCallback(): void {
    this.renderRoot.removeEventListener("change", this.handleNativeControlChange);
    super.disconnectedCallback();
  }

  private handleToolConfigChanged(event: Event): void {
    const config = (event as CustomEvent<{ config?: ExplorerCardConfig }>).detail?.config;
    if (!config) return;
    event.stopPropagation();
    this.setConfig(config);
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  protected override render() {
    return html`
      ${super.render()}
      <ha-explorer-theme-editor
        .config=${this.currentConfig}
        @config-changed=${this.handleToolConfigChanged}
      ></ha-explorer-theme-editor>
      <ha-explorer-room-tools
        .hass=${this.hass}
        .config=${this.currentConfig}
        @config-changed=${this.handleToolConfigChanged}
      ></ha-explorer-room-tools>
      <ha-explorer-zones-editor
        .hass=${this.hass}
        .config=${this.currentConfig}
        @config-changed=${this.handleToolConfigChanged}
      ></ha-explorer-zones-editor>
      <ha-explorer-room-reactions-editor
        .hass=${this.hass}
        .config=${this.currentConfig}
        @config-changed=${this.handleToolConfigChanged}
      ></ha-explorer-room-reactions-editor>
      <ha-explorer-route-editor
        .hass=${this.hass}
        .config=${this.currentConfig}
        @config-changed=${this.handleToolConfigChanged}
      ></ha-explorer-route-editor>
      <ha-explorer-route-graph-editor
        .hass=${this.hass}
        .config=${this.currentConfig}
        @config-changed=${this.handleToolConfigChanged}
      ></ha-explorer-route-graph-editor>
      <ha-explorer-route-diagnostics
        .hass=${this.hass}
        .config=${this.currentConfig}
      ></ha-explorer-route-diagnostics>
    `;
  }

  public override dispatchEvent(event: Event): boolean {
    if (event.type !== "config-changed") return super.dispatchEvent(event);
    const config = (event as CustomEvent<{ config?: ExplorerCardConfig }>).detail?.config;
    if (!config) return super.dispatchEvent(event);
    return this.emitHomeAssistantConfig(config);
  }
}
