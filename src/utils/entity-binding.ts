import type { ExplorerPresence, ExplorerRoom, PresenceEntityBinding } from "../models/config";
import type { HassEntity, HomeAssistant } from "../types";
import { findRoomByReference, getRoomPresenceAnchor } from "./room-awareness";

const DEFAULT_HIDDEN_STATES = ["unknown", "unavailable"];
const UNKNOWN_ROOM_STATES = new Set(["", "unknown", "unavailable", "none", "null"]);

function readAttribute(entity: HassEntity, attribute?: string): unknown {
  return attribute ? entity.attributes[attribute] : undefined;
}

function normalizedNumber(value: unknown, fallback?: number): number | undefined {
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

function roomReferenceValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return UNKNOWN_ROOM_STATES.has(normalized.toLowerCase()) ? undefined : normalized;
}

function readRoomReference(
  binding: PresenceEntityBinding,
  entity: HassEntity,
  hass: HomeAssistant,
): string | undefined {
  if (binding.room_entity) {
    const roomEntity = hass.states[binding.room_entity];
    if (!roomEntity) return undefined;
    return roomReferenceValue(
      binding.room_attribute
        ? readAttribute(roomEntity, binding.room_attribute)
        : roomEntity.state,
    );
  }

  return roomReferenceValue(
    readAttribute(entity, binding.room_attribute ?? "explorer_room"),
  );
}

function applyRoomPosition(
  presence: ExplorerPresence,
  rooms: ExplorerRoom[],
  roomReference?: string,
): ExplorerPresence {
  const room = findRoomByReference(rooms, roomReference ?? presence.room_id);
  if (room) {
    const anchor = getRoomPresenceAnchor(room);
    return {
      ...presence,
      x: anchor.x,
      y: anchor.y,
      room_id: room.id,
    };
  }

  const x = normalizedNumber(presence.x);
  const y = normalizedNumber(presence.y);
  if (x === undefined || y === undefined) {
    return { ...presence, x, y, visible: false };
  }

  return { ...presence, x, y };
}

export function resolvePresence(
  presence: ExplorerPresence,
  hass?: HomeAssistant,
  rooms: ExplorerRoom[] = [],
): ExplorerPresence {
  const binding = presence.entity_binding;
  if (!binding || !hass) return applyRoomPosition(presence, rooms);

  const entity = hass.states[binding.entity];
  if (!entity) return { ...applyRoomPosition(presence, rooms), visible: false };

  const hiddenStates = binding.hidden_states ?? DEFAULT_HIDDEN_STATES;
  const hiddenByState = hiddenStates.includes(entity.state);
  const visibleAttribute = readAttribute(entity, binding.visible_attribute);
  const visible = hiddenByState
    ? false
    : booleanValue(visibleAttribute, presence.visible ?? true);

  const resolved: ExplorerPresence = {
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

  const roomReference = readRoomReference(binding, entity, hass) ?? presence.room_id;
  return applyRoomPosition(resolved, rooms, roomReference);
}

export function resolvePresences(
  presences: ExplorerPresence[],
  hass?: HomeAssistant,
  rooms: ExplorerRoom[] = [],
): ExplorerPresence[] {
  return presences.map((presence) => resolvePresence(presence, hass, rooms));
}
