import type {
  ExplorerRoom,
  ExplorerRoomReaction,
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
}

const DEFAULT_ACTIVE_STATES: Record<RoomReactionKind, string[]> = {
  light: ["on"],
  motion: ["on"],
  media: ["playing", "on"],
  opening: ["on", "open"],
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function defaultRoomReactionStates(kind: RoomReactionKind): string[] {
  return [...DEFAULT_ACTIVE_STATES[kind]];
}

export function normalizedRoomReactionStates(
  reaction: ExplorerRoomReaction,
): string[] {
  const configured = (reaction.active_states ?? [])
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.length
    ? [...new Set(configured)]
    : defaultRoomReactionStates(reaction.kind);
}

function lightIntensity(attributes?: Record<string, unknown>): number {
  const brightness = attributes?.brightness;
  if (typeof brightness !== "number" || !Number.isFinite(brightness)) return 1;
  return clamp01(brightness / 255);
}

export function evaluateRoomReaction(
  reaction: ExplorerRoomReaction,
  index: number,
  stateResolver?: RoomReactionStateResolver,
): RoomReactionStatus {
  const entity = reaction.entity?.trim();
  const activeStates = normalizedRoomReactionStates(reaction);

  if (!entity) {
    return {
      index,
      reaction,
      active: false,
      activeStates,
      intensity: 0,
      reason: "missing_entity",
    };
  }

  const resolved = stateResolver?.(entity);
  if (!resolved) {
    return {
      index,
      reaction,
      active: false,
      activeStates,
      intensity: 0,
      reason: "entity_unavailable",
    };
  }

  const active = activeStates.includes(resolved.state);
  return {
    index,
    reaction,
    active,
    currentState: resolved.state,
    activeStates,
    intensity: active
      ? reaction.kind === "light"
        ? lightIntensity(resolved.attributes)
        : 1
      : 0,
    ...(active ? {} : { reason: "state_inactive" as const }),
  };
}

export function evaluateRoomReactions(
  room: ExplorerRoom,
  stateResolver?: RoomReactionStateResolver,
): RoomReactionStatus[] {
  return (room.reactions ?? []).map((reaction, index) =>
    evaluateRoomReaction(reaction, index, stateResolver),
  );
}

export function summarizeRoomReactions(
  room: ExplorerRoom,
  stateResolver?: RoomReactionStateResolver,
): RoomReactionSummary {
  const statuses = evaluateRoomReactions(room, stateResolver);
  const active = statuses.filter((status) => status.active);
  const lights = active.filter((status) => status.reaction.kind === "light");

  // Each active light contributes to the room glow. Brightness-aware entities
  // contribute proportionally, while multiple lights build intensity with a cap.
  const lightIntensityValue = clamp01(
    lights.reduce(
      (sum, status) => sum + 0.32 + 0.48 * status.intensity,
      0,
    ),
  );

  return {
    statuses,
    activeCount: active.length,
    lightCount: lights.length,
    lightIntensity: lightIntensityValue,
    motionActive: active.some((status) => status.reaction.kind === "motion"),
    mediaActive: active.some((status) => status.reaction.kind === "media"),
    openingActive: active.some((status) => status.reaction.kind === "opening"),
  };
}
