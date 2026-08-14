import type { ExplorerCardConfig, ExplorerPresence } from "../models/config";
import type { HomeAssistant } from "../types";

export type ExplorerSetupState = "ready" | "attention" | "optional";
export type ExplorerEditorSection =
  | "basic"
  | "rooms"
  | "presences"
  | "appearance"
  | "room-tools"
  | "zones"
  | "room-reactions"
  | "room-actions"
  | "routes"
  | "route-graph"
  | "diagnostics";

export interface ExplorerSetupItem {
  id: string;
  label: string;
  detail: string;
  state: ExplorerSetupState;
  target: ExplorerEditorSection;
}

export interface ExplorerEntityIssue {
  entity: string;
  source: string;
  target: ExplorerEditorSection;
  unavailable: boolean;
}

export interface ExplorerSetupSummary {
  items: ExplorerSetupItem[];
  entityIssues: ExplorerEntityIssue[];
  attentionCount: number;
  configuredFeatureCount: number;
  roomCount: number;
  presenceCount: number;
  zoneCount: number;
  reactionCount: number;
  actionCount: number;
  routeCount: number;
  nodeCount: number;
}

interface EntityReference {
  entity: string;
  source: string;
  target: ExplorerEditorSection;
}

function cleanEntity(value?: string): string | undefined {
  const entity = value?.trim();
  return entity || undefined;
}

function presenceHasPositionSource(presence: ExplorerPresence): boolean {
  const binding = presence.entity_binding;
  return Boolean(
    cleanEntity(binding?.room_entity) ||
      presence.room_id ||
      (Number.isFinite(presence.x) && Number.isFinite(presence.y)),
  );
}

function collectEntityReferences(config: ExplorerCardConfig): EntityReference[] {
  const references: EntityReference[] = [];

  for (const presence of config.presences ?? []) {
    const primary = cleanEntity(presence.entity_binding?.entity);
    const room = cleanEntity(presence.entity_binding?.room_entity);
    if (primary) references.push({ entity: primary, source: presence.name ?? presence.id, target: "presences" });
    if (room) references.push({ entity: room, source: `${presence.name ?? presence.id} · rum-tracking`, target: "presences" });
  }

  for (const room of config.rooms ?? []) {
    for (const reaction of room.reactions ?? []) {
      const entity = cleanEntity(reaction.entity);
      if (entity) references.push({ entity, source: `${room.name ?? room.id} · ${reaction.kind}`, target: "room-reactions" });
    }
    for (const action of room.quick_actions ?? []) {
      const entity = cleanEntity(action.entity);
      if (entity) references.push({ entity, source: `${room.name ?? room.id} · ${action.name}`, target: "room-actions" });
    }
  }

  for (const zone of config.zones ?? []) {
    const entity = cleanEntity(zone.state_binding?.entity);
    if (entity) references.push({ entity, source: zone.name ?? zone.id, target: "zones" });
  }

  for (const node of config.route_nodes ?? []) {
    const entity = cleanEntity(node.state_binding?.entity);
    if (entity) references.push({ entity, source: node.name ?? node.id, target: "route-graph" });
  }

  for (const edge of config.route_graph_edges ?? []) {
    const entity = cleanEntity(edge.condition?.entity);
    if (entity) references.push({ entity, source: "Betinget route edge", target: "route-graph" });
  }

  return references;
}

export function analyzeExplorerSetup(
  config: ExplorerCardConfig,
  hass?: HomeAssistant,
): ExplorerSetupSummary {
  const rooms = config.rooms ?? [];
  const presences = config.presences ?? [];
  const zones = config.zones ?? [];
  const routeNodes = config.route_nodes ?? [];
  const routeEdges = config.route_graph_edges ?? [];
  const manualRoutes = config.routes ?? [];
  const reactions = rooms.flatMap((room) => room.reactions ?? []);
  const actions = rooms.flatMap((room) => room.quick_actions ?? []);
  const references = collectEntityReferences(config);

  const entityIssues: ExplorerEntityIssue[] = [];
  if (hass) {
    for (const reference of references) {
      const entity = hass.states[reference.entity];
      if (!entity) {
        entityIssues.push({ ...reference, unavailable: false });
        continue;
      }
      if (entity.state === "unavailable" || entity.state === "unknown") {
        entityIssues.push({ ...reference, unavailable: true });
      }
    }
  }

  const missingEntities = entityIssues.filter((issue) => !issue.unavailable);
  const unreadyPresences = presences.filter((presence) => !presenceHasPositionSource(presence));
  const invalidRooms = rooms.filter((room) => room.points.length < 3);
  const floorplan = (config.image ?? config.background ?? "").trim();

  const items: ExplorerSetupItem[] = [
    {
      id: "floorplan",
      label: "Plantegning",
      detail: floorplan ? "Plantegning er valgt." : "Vælg en SVG-, PNG- eller JPG-plantegning.",
      state: floorplan ? "ready" : "attention",
      target: "basic",
    },
    {
      id: "rooms",
      label: "Rum",
      detail: rooms.length
        ? invalidRooms.length
          ? `${rooms.length} rum · ${invalidRooms.length} mangler en gyldig polygon.`
          : `${rooms.length} rum klar.`
        : "Tegn mindst ét rum for room-aware tracking og Living Rooms.",
      state: rooms.length && !invalidRooms.length ? "ready" : "attention",
      target: rooms.length ? "rooms" : "room-tools",
    },
    {
      id: "presences",
      label: "Personer & objekter",
      detail: presences.length
        ? unreadyPresences.length
          ? `${presences.length} tilføjet · ${unreadyPresences.length} mangler rum/position.`
          : `${presences.length} tracking-profil${presences.length === 1 ? "" : "er"} klar.`
        : "Valgfrit · tilføj personer, kæledyr, robotter eller objekter.",
      state: presences.length ? (unreadyPresences.length ? "attention" : "ready") : "optional",
      target: "presences",
    },
    {
      id: "entities",
      label: "Home Assistant-entities",
      detail: !references.length
        ? "Ingen live entity-bindings endnu."
        : !hass
          ? `${references.length} binding${references.length === 1 ? "" : "er"} · afventer Home Assistant.`
          : missingEntities.length
            ? `${missingEntities.length} binding${missingEntities.length === 1 ? "" : "er"} findes ikke i Home Assistant.`
            : entityIssues.length
              ? `${references.length} bindings fundet · ${entityIssues.length} er midlertidigt unavailable/unknown.`
              : `${references.length} live binding${references.length === 1 ? "" : "er"} fundet.`,
      state: missingEntities.length ? "attention" : references.length ? "ready" : "optional",
      target: missingEntities[0]?.target ?? entityIssues[0]?.target ?? "diagnostics",
    },
    {
      id: "routing",
      label: "Routing",
      detail: routeEdges.length || manualRoutes.length
        ? `${routeEdges.length} graph edges · ${manualRoutes.length} manuelle routes · ${routeNodes.length} nodes.`
        : "Valgfrit · kortet kan bruges uden route graph.",
      state: routeEdges.length || manualRoutes.length ? "ready" : "optional",
      target: routeEdges.length ? "route-graph" : "routes",
    },
    {
      id: "living",
      label: "Living Rooms",
      detail: reactions.length
        ? `${reactions.length} rumreaktion${reactions.length === 1 ? "" : "er"} konfigureret.`
        : "Valgfrit · lys, motion, media og åbninger kan gøre rummene levende.",
      state: reactions.length ? "ready" : "optional",
      target: "room-reactions",
    },
    {
      id: "quick-actions",
      label: "Rumhandlinger",
      detail: actions.length
        ? `${actions.length} scene- eller scripthandling${actions.length === 1 ? "" : "er"} konfigureret.`
        : "Valgfrit · tilføj scenes og scripts direkte til rummets panel.",
      state: actions.length ? "ready" : "optional",
      target: "room-actions",
    },
    {
      id: "zones",
      label: "Dynamic Areas",
      detail: zones.length
        ? `${zones.length} zone${zones.length === 1 ? "" : "r"} konfigureret.`
        : "Valgfrit · tilføj alarm-, rengørings- eller informationszoner.",
      state: zones.length ? "ready" : "optional",
      target: "zones",
    },
  ];

  return {
    items,
    entityIssues,
    attentionCount: items.filter((item) => item.state === "attention").length,
    configuredFeatureCount: items.filter((item) => item.state === "ready").length,
    roomCount: rooms.length,
    presenceCount: presences.length,
    zoneCount: zones.length,
    reactionCount: reactions.length,
    actionCount: actions.length,
    routeCount: routeEdges.length + manualRoutes.length,
    nodeCount: routeNodes.length,
  };
}
