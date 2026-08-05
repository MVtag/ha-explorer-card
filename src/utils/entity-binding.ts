import type { ExplorerPresence } from "../models/config";
import type { HassEntity, HomeAssistant } from "../types";

const DEFAULT_HIDDEN_STATES = ["unknown", "unavailable"];

function readAttribute(entity: HassEntity, attribute?: string): unknown {
  return attribute ? entity.attributes[attribute] : undefined;
}

function normalizedNumber(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(1, Math.max(0, parsed));
}

function booleanValue(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "on", "yes", "1", "home"].includes(normalized)) return true;
    if (["false", "off", "no", "0", "not_home"].includes(normalized)) return false;
  }
  return fallback;
}

function stringValue(value: unknown, fallback?: string): string | undefined {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function resolvePresence(
  presence: ExplorerPresence,
  hass?: HomeAssistant,
): ExplorerPresence {
  const binding = presence.entity_binding;
  if (!binding || !hass) return presence;

  const entity = hass.states[binding.entity];
  if (!entity) return { ...presence, visible: false };

  const hiddenStates = binding.hidden_states ?? DEFAULT_HIDDEN_STATES;
  const hiddenByState = hiddenStates.includes(entity.state);
  const visibleAttribute = readAttribute(entity, binding.visible_attribute);
  const visible = hiddenByState
    ? false
    : booleanValue(visibleAttribute, presence.visible ?? true);

  return {
    ...presence,
    x: normalizedNumber(
      readAttribute(entity, binding.x_attribute ?? "explorer_x"),
      presence.x,
    ),
    y: normalizedNumber(
      readAttribute(entity, binding.y_attribute ?? "explorer_y"),
      presence.y,
    ),
    name: stringValue(
      readAttribute(entity, binding.name_attribute ?? "friendly_name"),
      presence.name,
    ),
    icon: stringValue(
      readAttribute(entity, binding.icon_attribute ?? "entity_picture"),
      presence.icon,
    ),
    color: stringValue(
      readAttribute(entity, binding.color_attribute ?? "explorer_color"),
      presence.color,
    ),
    visible,
  };
}

export function resolvePresences(
  presences: ExplorerPresence[],
  hass?: HomeAssistant,
): ExplorerPresence[] {
  return presences.map((presence) => resolvePresence(presence, hass));
}
