import { html, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig } from "../models/config";
import { HaExplorerCardEditor } from "./explorer-config-editor";
import { HaExplorerRoomDrawingEditor } from "./explorer-room-drawing-editor";

type ConfigChangedEvent = Event & {
  detail: { config: ExplorerCardConfig };
};

/**
 * Drawing-only adapter around the existing room drawing editor.
 *
 * The original room drawing editor also rendered a nested base editor. Keeping
 * that nested editor meant Explorer could end up with two independent config
 * owners. This adapter deliberately renders only the drawing surface while the
 * Home Assistant-facing editor below remains the single source of truth.
 */
@customElement("ha-explorer-room-tools")
class HaExplorerRoomTools extends HaExplorerRoomDrawingEditor {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has("config") && this.config) {
      this.setConfig(this.config);
    }
  }

  protected override render(): TemplateResult<1> {
    return (
      this as unknown as {
        renderRoomDrawingEditor: () => TemplateResult<1>;
      }
    ).renderRoomDrawingEditor();
  }
}

/**
 * Home Assistant-facing Explorer editor.
 *
 * v0.10.3 made this element the single owner of card configuration. v0.10.4
 * also normalizes native form-control change events so Home Assistant receives
 * the final configuration after the browser control event has completed.
 */
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
    // Let the control's own @change handler update Explorer first, but prevent
    // the raw browser change event from escaping the editor. Home Assistant only
    // needs the resulting config-changed event.
    event.stopPropagation();

    // Re-emit after the native change event has fully completed. This avoids a
    // stale editor/save state for select/change-driven fields such as area_id,
    // aliases, anchors, presence type and static room fallback.
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

  private handleDrawingConfigChanged(event: Event): void {
    const config = (event as CustomEvent<{ config?: ExplorerCardConfig }>).detail?.config;
    if (!config) return;

    event.stopPropagation();
    this.setConfig(config);
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render() {
    return html`
      ${super.render()}
      <ha-explorer-room-tools
        .hass=${this.hass}
        .config=${this.currentConfig}
        @config-changed=${this.handleDrawingConfigChanged}
      ></ha-explorer-room-tools>
    `;
  }

  public override dispatchEvent(event: Event): boolean {
    if (event.type !== "config-changed") {
      return super.dispatchEvent(event);
    }

    const config = (event as CustomEvent<{ config?: ExplorerCardConfig }>).detail?.config;
    if (!config) {
      return super.dispatchEvent(event);
    }

    return this.emitHomeAssistantConfig(config);
  }
}
