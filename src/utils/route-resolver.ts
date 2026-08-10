import type {
  ExplorerCardConfig,
  ExplorerRoute,
  ExplorerRouteGraphEdge,
  ExplorerRouteGraphEndpoint,
  ExplorerRouteStep,
  NormalizedPoint,
} from "../models/config";

export type RouteResolutionSource = "manual" | "graph" | "fallback";
export type RouteResolutionHopKind = "room" | "node" | "point";

export interface RouteResolutionHop {
  kind: RouteResolutionHopKind;
  id?: string;
  key: string;
  label: string;
  point: NormalizedPoint;
}

export interface RouteResolution {
  source: RouteResolutionSource;
  hops: RouteResolutionHop[];
  distance: number;
  manualRoute?: ExplorerRoute;
  reversedManualRoute?: boolean;
}

export interface RouteGraphDiagnostics {
  invalidEdges: number;
  duplicateEdges: number;
  selfEdges: number;
  components: number;
  disconnectedRoomIds: string[];
  disconnectedNodeIds: string[];
  brokenRouteNodeReferences: Array<{
    from: string;
    to: string;
    nodeId: string;
  }>;
}

interface GraphNeighbor {
  key: string;
  weight: number;
}

interface GraphBuildResult {
  adjacency: Map<string, GraphNeighbor[]>;
  positions: Map<string, NormalizedPoint>;
  endpoints: Map<string, ExplorerRouteGraphEndpoint>;
}

export function roomAnchor(config: ExplorerCardConfig, roomId: string): NormalizedPoint | undefined {
  const room = (config.rooms ?? []).find((entry) => entry.id === roomId);
  if (!room) return undefined;
  if (room.presence_anchor) return [room.presence_anchor.x, room.presence_anchor.y];
  if (!room.points.length) return undefined;
  return [
    room.points.reduce((sum, point) => sum + point[0], 0) / room.points.length,
    room.points.reduce((sum, point) => sum + point[1], 0) / room.points.length,
  ];
}

function roomLabel(config: ExplorerCardConfig, roomId: string): string {
  return (config.rooms ?? []).find((room) => room.id === roomId)?.name ?? roomId;
}

function nodeLabel(config: ExplorerCardConfig, nodeId: string): string {
  return (config.route_nodes ?? []).find((node) => node.id === nodeId)?.name ?? nodeId;
}

function endpointKey(endpoint: ExplorerRouteGraphEndpoint): string {
  return `${endpoint.kind}:${endpoint.id}`;
}

function endpointPoint(
  config: ExplorerCardConfig,
  endpoint: ExplorerRouteGraphEndpoint,
): NormalizedPoint | undefined {
  if (endpoint.kind === "room") return roomAnchor(config, endpoint.id);
  return (config.route_nodes ?? []).find((node) => node.id === endpoint.id)?.point;
}

function endpointHop(
  config: ExplorerCardConfig,
  endpoint: ExplorerRouteGraphEndpoint,
): RouteResolutionHop | undefined {
  const point = endpointPoint(config, endpoint);
  if (!point) return undefined;
  if (endpoint.kind === "room") {
    return {
      kind: "room",
      id: endpoint.id,
      key: endpointKey(endpoint),
      label: roomLabel(config, endpoint.id),
      point,
    };
  }
  return {
    kind: "node",
    id: endpoint.id,
    key: endpointKey(endpoint),
    label: nodeLabel(config, endpoint.id),
    point,
  };
}

function routeSteps(route: ExplorerRoute): ExplorerRouteStep[] {
  if (route.path) return route.path;
  return (route.via ?? []).map((point) => ({ point }));
}

function resolveManualStep(
  config: ExplorerCardConfig,
  step: ExplorerRouteStep,
  index: number,
): RouteResolutionHop | undefined {
  if (step.node_id) {
    const node = (config.route_nodes ?? []).find((entry) => entry.id === step.node_id);
    if (!node) return undefined;
    return {
      kind: "node",
      id: node.id,
      key: `node:${node.id}`,
      label: node.name ?? node.id,
      point: node.point,
    };
  }
  if (!step.point) return undefined;
  return {
    kind: "point",
    key: `point:${index}`,
    label: `Waypoint ${index + 1}`,
    point: step.point,
  };
}

function routeDistance(hops: RouteResolutionHop[]): number {
  let total = 0;
  for (let index = 1; index < hops.length; index += 1) {
    total += Math.hypot(
      hops[index].point[0] - hops[index - 1].point[0],
      hops[index].point[1] - hops[index - 1].point[1],
    );
  }
  return total;
}

function manualResolution(
  config: ExplorerCardConfig,
  route: ExplorerRoute,
  fromRoomId: string,
  toRoomId: string,
  reverse: boolean,
): RouteResolution | undefined {
  const start = roomAnchor(config, fromRoomId);
  const end = roomAnchor(config, toRoomId);
  if (!start || !end) return undefined;

  const storedSteps = routeSteps(route);
  const steps = reverse ? [...storedSteps].reverse() : storedSteps;
  const middle = steps
    .map((step, index) => resolveManualStep(config, step, index))
    .filter((hop): hop is RouteResolutionHop => Boolean(hop));

  const hops: RouteResolutionHop[] = [
    {
      kind: "room",
      id: fromRoomId,
      key: `room:${fromRoomId}`,
      label: roomLabel(config, fromRoomId),
      point: start,
    },
    ...middle,
    {
      kind: "room",
      id: toRoomId,
      key: `room:${toRoomId}`,
      label: roomLabel(config, toRoomId),
      point: end,
    },
  ];

  return {
    source: "manual",
    hops,
    distance: routeDistance(hops),
    manualRoute: route,
    reversedManualRoute: reverse,
  };
}

function buildGraph(config: ExplorerCardConfig): GraphBuildResult {
  const adjacency = new Map<string, GraphNeighbor[]>();
  const positions = new Map<string, NormalizedPoint>();
  const endpoints = new Map<string, ExplorerRouteGraphEndpoint>();

  const rememberEndpoint = (endpoint: ExplorerRouteGraphEndpoint): NormalizedPoint | undefined => {
    const key = endpointKey(endpoint);
    endpoints.set(key, endpoint);
    const existing = positions.get(key);
    if (existing) return existing;
    const point = endpointPoint(config, endpoint);
    if (point) positions.set(key, point);
    return point;
  };

  const addNeighbor = (fromKey: string, toKey: string, weight: number): void => {
    const list = adjacency.get(fromKey) ?? [];
    list.push({ key: toKey, weight });
    adjacency.set(fromKey, list);
  };

  (config.route_graph_edges ?? []).forEach((edge) => {
    const fromPoint = rememberEndpoint(edge.from);
    const toPoint = rememberEndpoint(edge.to);
    if (!fromPoint || !toPoint) return;
    const fromKey = endpointKey(edge.from);
    const toKey = endpointKey(edge.to);
    const weight = Math.hypot(toPoint[0] - fromPoint[0], toPoint[1] - fromPoint[1]);
    addNeighbor(fromKey, toKey, weight);
    addNeighbor(toKey, fromKey, weight);
  });

  return { adjacency, positions, endpoints };
}

function graphResolution(
  config: ExplorerCardConfig,
  fromRoomId: string,
  toRoomId: string,
): RouteResolution | undefined {
  if (!(config.route_graph_edges ?? []).length) return undefined;

  const startKey = `room:${fromRoomId}`;
  const targetKey = `room:${toRoomId}`;
  const { adjacency, endpoints } = buildGraph(config);
  if (!adjacency.has(startKey) || !adjacency.has(targetKey)) return undefined;

  const distances = new Map<string, number>();
  const previous = new Map<string, string>();
  const unvisited = new Set<string>(adjacency.keys());
  adjacency.forEach((neighbors) => neighbors.forEach((neighbor) => unvisited.add(neighbor.key)));
  unvisited.forEach((key) => distances.set(key, Number.POSITIVE_INFINITY));
  distances.set(startKey, 0);

  while (unvisited.size) {
    let current: string | undefined;
    let currentDistance = Number.POSITIVE_INFINITY;
    for (const key of unvisited) {
      const distance = distances.get(key) ?? Number.POSITIVE_INFINITY;
      if (distance < currentDistance) {
        current = key;
        currentDistance = distance;
      }
    }

    if (!current || !Number.isFinite(currentDistance)) break;
    unvisited.delete(current);
    if (current === targetKey) break;

    for (const neighbor of adjacency.get(current) ?? []) {
      if (!unvisited.has(neighbor.key)) continue;
      const candidate = currentDistance + neighbor.weight;
      if (candidate < (distances.get(neighbor.key) ?? Number.POSITIVE_INFINITY)) {
        distances.set(neighbor.key, candidate);
        previous.set(neighbor.key, current);
      }
    }
  }

  if (!Number.isFinite(distances.get(targetKey) ?? Number.POSITIVE_INFINITY)) return undefined;

  const pathKeys = [targetKey];
  let cursor = targetKey;
  while (cursor !== startKey) {
    const parent = previous.get(cursor);
    if (!parent) return undefined;
    pathKeys.push(parent);
    cursor = parent;
  }
  pathKeys.reverse();

  const hops = pathKeys
    .map((key) => endpoints.get(key))
    .map((endpoint) => endpoint ? endpointHop(config, endpoint) : undefined)
    .filter((hop): hop is RouteResolutionHop => Boolean(hop));

  if (hops.length < 2) return undefined;
  return {
    source: "graph",
    hops,
    distance: routeDistance(hops),
  };
}

export function resolveRoute(
  config: ExplorerCardConfig,
  fromRoomId: string,
  toRoomId: string,
): RouteResolution | undefined {
  if (!fromRoomId || !toRoomId || fromRoomId === toRoomId) return undefined;

  const direct = (config.routes ?? []).find(
    (route) => route.from === fromRoomId && route.to === toRoomId,
  );
  if (direct) return manualResolution(config, direct, fromRoomId, toRoomId, false);

  const reverse = (config.routes ?? []).find(
    (route) => route.from === toRoomId && route.to === fromRoomId,
  );
  if (reverse) return manualResolution(config, reverse, fromRoomId, toRoomId, true);

  const graph = graphResolution(config, fromRoomId, toRoomId);
  if (graph) return graph;

  const start = roomAnchor(config, fromRoomId);
  const end = roomAnchor(config, toRoomId);
  if (!start || !end) return undefined;
  const hops: RouteResolutionHop[] = [
    {
      kind: "room",
      id: fromRoomId,
      key: `room:${fromRoomId}`,
      label: roomLabel(config, fromRoomId),
      point: start,
    },
    {
      kind: "room",
      id: toRoomId,
      key: `room:${toRoomId}`,
      label: roomLabel(config, toRoomId),
      point: end,
    },
  ];
  return { source: "fallback", hops, distance: routeDistance(hops) };
}

function canonicalEdgeKey(edge: ExplorerRouteGraphEdge): string {
  return [endpointKey(edge.from), endpointKey(edge.to)].sort().join("|");
}

export function analyzeRouteGraph(config: ExplorerCardConfig): RouteGraphDiagnostics {
  const graphEdges = config.route_graph_edges ?? [];
  let invalidEdges = 0;
  let duplicateEdges = 0;
  let selfEdges = 0;
  const seen = new Set<string>();
  const degree = new Map<string, number>();
  const adjacency = new Map<string, Set<string>>();

  const bumpDegree = (key: string): void => degree.set(key, (degree.get(key) ?? 0) + 1);
  const connect = (from: string, to: string): void => {
    const fromSet = adjacency.get(from) ?? new Set<string>();
    fromSet.add(to);
    adjacency.set(from, fromSet);
    const toSet = adjacency.get(to) ?? new Set<string>();
    toSet.add(from);
    adjacency.set(to, toSet);
  };

  graphEdges.forEach((edge) => {
    const fromKey = endpointKey(edge.from);
    const toKey = endpointKey(edge.to);
    const canonical = canonicalEdgeKey(edge);
    if (fromKey === toKey) selfEdges += 1;
    if (seen.has(canonical)) duplicateEdges += 1;
    seen.add(canonical);

    const fromPoint = endpointPoint(config, edge.from);
    const toPoint = endpointPoint(config, edge.to);
    if (!fromPoint || !toPoint || fromKey === toKey) {
      invalidEdges += 1;
      return;
    }

    bumpDegree(fromKey);
    bumpDegree(toKey);
    connect(fromKey, toKey);
  });

  const disconnectedRoomIds = graphEdges.length
    ? (config.rooms ?? [])
        .filter((room) => roomAnchor(config, room.id) && !degree.has(`room:${room.id}`))
        .map((room) => room.id)
    : [];
  const disconnectedNodeIds = graphEdges.length
    ? (config.route_nodes ?? [])
        .filter((node) => !degree.has(`node:${node.id}`))
        .map((node) => node.id)
    : [];

  let components = 0;
  const unvisited = new Set(adjacency.keys());
  while (unvisited.size) {
    components += 1;
    const first = unvisited.values().next().value as string | undefined;
    if (!first) break;
    const stack = [first];
    unvisited.delete(first);
    while (stack.length) {
      const current = stack.pop() as string;
      for (const neighbor of adjacency.get(current) ?? []) {
        if (!unvisited.has(neighbor)) continue;
        unvisited.delete(neighbor);
        stack.push(neighbor);
      }
    }
  }

  const brokenRouteNodeReferences: RouteGraphDiagnostics["brokenRouteNodeReferences"] = [];
  const nodeIds = new Set((config.route_nodes ?? []).map((node) => node.id));
  (config.routes ?? []).forEach((route) => {
    routeSteps(route).forEach((step) => {
      if (step.node_id && !nodeIds.has(step.node_id)) {
        brokenRouteNodeReferences.push({ from: route.from, to: route.to, nodeId: step.node_id });
      }
    });
  });

  return {
    invalidEdges,
    duplicateEdges,
    selfEdges,
    components,
    disconnectedRoomIds,
    disconnectedNodeIds,
    brokenRouteNodeReferences,
  };
}
