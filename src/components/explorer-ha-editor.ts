import { html } from "lit";
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

  protected override render() {
    return (this as unknown as { renderRoomDrawingEditor: () => unknown }).renderRoomDrawingEditor();
  }
}

/**
 * Home Assistant-facing Explorer editor.
 *
 * v0.10.3 makes this element the single owner of card configuration. The
 * standard Card / Rooms / People & Objects editor is rendered directly by this
 * host, while the visual room tool is a child that only proposes config
 * changes. Every change is then re-dispatched from this one top-level element,
 * so Home Assistant receives the same save-state event regardless of whether a
 * title, room name, polygon or presence anchor was changed.
 */
@customElement("ha-explorer-ha-editor")
export class HaExplorerHaEditor extends HaExplorerCardEditor {
  private get currentConfig(): ExplorerCardConfig | undefined {
    return (this as unknown as { config?: ExplorerCardConfig }).config;
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

    const homeAssistantEvent = new Event("config-changed", {
      bubbles: true,
      composed: true,
    }) as ConfigChangedEvent;

    homeAssistantEvent.detail = { config };
    return super.dispatchEvent(homeAssistantEvent);
  }
}
