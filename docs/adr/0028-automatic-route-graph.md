# ADR 0028: Automatic route graph

## Status

Accepted

## Context

Home Assistant Explorer already supports explicit room-to-room routes, visual waypoints, and reusable shared route nodes. As the number of rooms grows, defining a complete explicit route for every room pair becomes repetitive and difficult to maintain.

## Decision

Add an optional undirected route graph made from connections between room endpoints and shared route-node endpoints.

Configuration uses top-level `route_graph_edges`. Each edge connects two typed endpoints:

```yaml
route_graph_edges:
  - from:
      kind: room
      id: kitchen
    to:
      kind: node
      id: kitchen_door
  - from:
      kind: node
      id: kitchen_door
    to:
      kind: node
      id: hallway_junction
```

At runtime:

1. A direct explicit route remains the highest-priority route.
2. If no explicit route exists for the requested room pair, Explorer builds the configured graph.
3. Edge weights are calculated from the normalized geometric distance between endpoints.
4. Dijkstra shortest-path search chooses the shortest connected path.
5. Shared-node and intermediate-room positions become movement waypoints.
6. If no graph path exists, Explorer keeps the existing straight-line fallback.

The visual editor gets a separate Automatic Route Graph section for creating and deleting graph connections and previewing the network on the floorplan.

## Consequences

- Users only need to describe physical connectivity once instead of drawing every possible room pair.
- Existing explicit `routes`, legacy `via`, and v0.16 shared-node `path` data remain compatible.
- Explicit routes can still be used to override the automatically calculated route for special cases.
- Graph edges are undirected because normal indoor walking connections are assumed traversable in both directions.
