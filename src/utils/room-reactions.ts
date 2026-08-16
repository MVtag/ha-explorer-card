import type {
  ExplorerRoom,
  ExplorerRoomReaction,
  NormalizedPosition,
  RoomReactionKind,
} from "../models/config";

export interface RoomReactionEntityState {
  state: string;
  attributes?: Record<string, unknown>;
}

export type RoomReactionStateResolver = (
  entityId: string,
) => RoomReactionEntityState | undefined;

export type RoomReactionInactiveReason =
  | "missing_entity"
  | "entity_unavailable"
  | "state_inactive";

export interface RoomReactionStatus {
  index: number;
  reaction: ExplorerRoomReaction;
  active: boolean;
  currentState?: string;
  activeStates: string[];
  intensity: number;
  numericValue?: number;
  unit?: string;
  reason?: RoomReactionInactiveReason;
}

export interface RoomReactionSummary {
  statuses: RoomReactionStatus[];
  activeCount: number;
  lightCount: number;
  lightIntensity: number;
  motionActive: boolean;
  mediaActive: boolean;
  openingActive: boolean;
  fireplaceActive: boolean;
  temperatureCount: number;
}

const DEFAULT_ACTIVE_STATES: Record<RoomReactionKind, string[]> = {
  light: ["on"],
  motion: ["on"],
  media: ["playing", "on"],
  opening: ["on", "open"],
  temperature: [],
  fireplace: ["on", "heating", "burning", "active"],
};

const UNAVAILABLE_STATES = new Set(["unknown", "unavailable"]);

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function clampPosition(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function defaultRoomReactionStates(kind: RoomReactionKind): string[] {
  return [...DEFAULT_ACTIVE_STATES[kind]];
}

export function normalizedRoomReactionStates(
  reaction: ExplorerRoomReaction,
): string[] {
  if (reaction.kind === "temperature") return [];
  const configured = (reaction.active_states ?? [])
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.length
    ? [...new Set(configured)]
    : defaultRoomReactionStates(reaction.kind);
}

export function roomReactionPosition(
  room: ExplorerRoom,
  reaction?: ExplorerRoomReaction,
): NormalizedPosition {
  const configured = reaction?.position;
  if (configured && Number.isFinite(configured.x) && Number.isFinite(configured.y)) {
    return { x: clampPosition(configured.x), y: clampPosition(configured.y) };
  }

  if (room.presence_anchor) {
    return {
      x: clampPosition(room.presence_anchor.x),
      y: clampPosition(room.presence_anchor.y),
    };
  }

  if (!room.points.length) return { x: 0.5, y: 0.5 };
  return {
    x: clampPosition(room.points.reduce((sum, point) => sum + point[0], 0) / room.points.length),
    y: clampPosition(room.points.reduce((sum, point) => sum + point[1], 0) / room.points.length),
  };
}

function lightIntensity(attributes?: Record<string, unknown>): number {
  const brightness = attributes?.brightness;
  if (typeof brightness !== "number" || !Number.isFinite(brightness)) return 1;
  return clamp01(brightness / 255);
}

function configuredIntensity(reaction: ExplorerRoomReaction): number {
  const value = reaction.intensity;
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return clamp01(value);
}

function temperatureUnit(attributes?: Record<string, unknown>): string | undefined {
  const unit = attributes?.unit_of_measurement;
  return typeof unit === "string" && unit.trim() ? unit.trim() : undefined;
}

export function evaluateRoomReaction(
  reaction: ExplorerRoomReaction,
  index: number,
  stateResolver?: RoomReactionStateResolver,
): RoomReactionStatus {
  const entity = reaction.entity?.trim();
  const activeStates = normalizedRoomReactionStates(reaction);

  if (!entity) {
    return { index, reaction, active:false, activeStates, intensity:0, reason:"missing_entity" };
  }

  const resolved = stateResolver?.(entity);
  if (!resolved || UNAVAILABLE_STATES.has(resolved.state.trim().toLowerCase())) {
    return { index, reaction, active:false, currentState:resolved?.state, activeStates, intensity:0, reason:"entity_unavailable" };
  }

  if (reaction.kind === "temperature") {
    const numericValue = Number(resolved.state);
    if (!Number.isFinite(numericValue)) {
      return { index, reaction, active:false, currentState:resolved.state, activeStates, intensity:0, unit:temperatureUnit(resolved.attributes), reason:"state_inactive" };
    }
    return { index, reaction, active:true, currentState:resolved.state, activeStates, intensity:1, numericValue, unit:temperatureUnit(resolved.attributes) };
  }

  const normalizedState = resolved.state.trim().toLowerCase();
  const active = activeStates.map(value=>value.toLowerCase()).includes(normalizedState);
  let intensity = 0;
  if (active) {
    if (reaction.kind === "light") intensity = lightIntensity(resolved.attributes) * configuredIntensity(reaction);
    else intensity = configuredIntensity(reaction);
  }

  return {
    index,
    reaction,
    active,
    currentState: resolved.state,
    activeStates,
    intensity,
    ...(active ? {} : { reason: "state_inactive" as const }),
  };
}

export function evaluateRoomReactions(
  room: ExplorerRoom,
  stateResolver?: RoomReactionStateResolver,
): RoomReactionStatus[] {
  return (room.reactions ?? []).map((reaction, index) => evaluateRoomReaction(reaction, index, stateResolver));
}

export function summarizeRoomReactions(
  room: ExplorerRoom,
  stateResolver?: RoomReactionStateResolver,
): RoomReactionSummary {
  const statuses = evaluateRoomReactions(room, stateResolver);
  const active = statuses.filter((status) => status.active);
  const lights = active.filter((status) => status.reaction.kind === "light");
  const lightIntensityValue = clamp01(lights.reduce((sum, status) => sum + 0.32 + 0.48 * status.intensity, 0));
  return {
    statuses,
    activeCount: active.length,
    lightCount: lights.length,
    lightIntensity: lightIntensityValue,
    motionActive: active.some((status) => status.reaction.kind === "motion"),
    mediaActive: active.some((status) => status.reaction.kind === "media"),
    openingActive: active.some((status) => status.reaction.kind === "opening"),
    fireplaceActive: active.some((status) => status.reaction.kind === "fireplace"),
    temperatureCount: active.filter((status) => status.reaction.kind === "temperature").length,
  };
}
