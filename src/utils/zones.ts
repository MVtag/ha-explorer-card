import type { ExplorerZone } from "../models/config";

const DEFAULT_ACTIVE_STATES = ["on"];
const UNAVAILABLE_STATES = new Set(["unknown", "unavailable"]);

export type ZoneBlockReason = "hidden" | "missing_entity" | "entity_unavailable" | "state_blocked";

export interface ExplorerZoneStatus {
  zone: ExplorerZone;
  visible: boolean;
  conditional: boolean;
  active: boolean;
  entity?: string;
  currentState?: string;
  activeStates: string[];
  reason?: ZoneBlockReason;
}

function normalizeStates(states?: string[]): string[] {
  const normalized = (states ?? [])
    .map((state) => state.trim())
    .filter(Boolean);
  return normalized.length ? [...new Set(normalized)] : [...DEFAULT_ACTIVE_STATES];
}

export function evaluateZone(
  zone: ExplorerZone,
  stateResolver?: (entityId: string) => string | undefined,
): ExplorerZoneStatus {
  const visible = zone.visible !== false;
  const binding = zone.state_binding;
  const activeStates = normalizeStates(binding?.active_states);

  if (!visible) {
    return {
      zone,
      visible: false,
      conditional: Boolean(binding?.entity?.trim()),
      active: false,
      entity: binding?.entity?.trim() || undefined,
      activeStates,
      reason: "hidden",
    };
  }

  if (!binding?.entity?.trim()) {
    return {
      zone,
      visible: true,
      conditional: false,
      active: true,
      activeStates,
    };
  }

  const entity = binding.entity.trim();
  const currentState = stateResolver?.(entity);

  if (!currentState) {
    return {
      zone,
      visible: true,
      conditional: true,
      active: false,
      entity,
      activeStates,
      reason: "missing_entity",
    };
  }

  if (UNAVAILABLE_STATES.has(currentState)) {
    return {
      zone,
      visible: true,
      conditional: true,
      active: false,
      entity,
      currentState,
      activeStates,
      reason: "entity_unavailable",
    };
  }

  const active = activeStates.includes(currentState);
  return {
    zone,
    visible: true,
    conditional: true,
    active,
    entity,
    currentState,
    activeStates,
    ...(active ? {} : { reason: "state_blocked" as const }),
  };
}

export function evaluateZones(
  zones: ExplorerZone[],
  stateResolver?: (entityId: string) => string | undefined,
): ExplorerZoneStatus[] {
  return zones.map((zone) => evaluateZone(zone, stateResolver));
}
