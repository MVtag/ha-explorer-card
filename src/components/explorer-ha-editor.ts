import { customElement } from "lit/decorators.js";
import type { ExplorerCardConfig } from "../models/config";
import { HaExplorerRoomDrawingEditor } from "./explorer-room-drawing-editor";

type ConfigChangedEvent = Event & {
  detail: { config: ExplorerCardConfig };
};

/**
 * Home Assistant-facing editor wrapper.
 *
 * Home Assistant's documented custom-card editor contract uses a normal Event
 * named `config-changed` with `detail.config` attached to it. The Explorer room
 * editor internally uses CustomEvent, so this compatibility layer converts the
 * event before it reaches Home Assistant.
 */
@customElement("ha-explorer-ha-editor")
export class HaExplorerHaEditor extends HaExplorerRoomDrawingEditor {
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
