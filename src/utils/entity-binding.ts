import type { ExplorerPresence, ExplorerRoom, PresenceEntityBinding } from "../models/config";
import type { HassEntity, HomeAssistant } from "../types";
import { findRoomByReference, getRoomPresenceAnchor } from "./room-awareness";

const DEFAULT_HIDDEN_STATES = ["unknown", "unavailable"];
const UNKNOWN_ROOM_STATES = new Set(["", "unknown", "unavailable", "none", "null"]);

function readAttribute(entity: HassEntity | undefined, attribute?: string): unknown {
  return entity && attribute ? entity.attributes[attribute] : undefined;
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
  entity: HassEntity | undefined,
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

  if (!entity) return undefined;

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

  const entity = binding.entity ? hass.states[binding.entity] : undefined;
  if (binding.entity && !entity) {
    return { ...applyRoomPosition(presence, rooms), visible: false };
  }

  const hiddenStates = binding.hidden_states ?? DEFAULT_HIDDEN_STATES;
  const hiddenByState = entity ? hiddenStates.includes(entity.state) : false;
  const visibleAttribute = readAttribute(entity, binding.visible_attribute);
  const visible = hiddenByState
    ? false
    : booleanValue(visibleAttribute, presence.visible ?? true);

  const entityName = stringValue(
    readAttribute(entity, binding.name_attribute ?? "friendly_name"),
  );
  const entityAvatar = stringValue(
    readAttribute(entity, binding.avatar_attribute ?? "entity_picture"),
  );
  const entityIcon = binding.icon_attribute
    ? stringValue(readAttribute(entity, binding.icon_attribute))
    : undefined;
  const entityColor = stringValue(
    readAttribute(entity, binding.color_attribute ?? "explorer_color"),
  );

  const resolved: ExplorerPresence = {
    ...presence,
    x: entity
      ? normalizedNumber(
          readAttribute(entity, binding.x_attribute ?? "explorer_x"),
          presence.x,
        )
      : normalizedNumber(presence.x),
    y: entity
      ? normalizedNumber(
          readAttribute(entity, binding.y_attribute ?? "explorer_y"),
          presence.y,
        )
      : normalizedNumber(presence.y),
    name: presence.name ?? entityName,
    avatar: presence.avatar ?? entityAvatar,
    icon: presence.icon ?? entityIcon,
    color: presence.color ?? entityColor,
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
