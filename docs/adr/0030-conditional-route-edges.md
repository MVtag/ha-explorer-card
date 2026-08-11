# ADR 0030: Conditional route edges

## Status
Accepted for v0.19.0.

## Context

The automatic route graph introduced in v0.17.0 models physical connectivity, but every graph edge is currently always available. In a real Home Assistant installation, doors, gates, locks, movable partitions, or other conditions can temporarily make a physical connection unusable.

The route preview and live movement engine were unified around the same resolver in v0.18.0. Conditional routing must preserve that single source of truth so preview, diagnostics, movement, and footsteps cannot disagree about which route is active.

## Decision

Graph edges may optionally include a Home Assistant state condition:

```yaml
route_graph_edges:
  - from:
      kind: room
      id: kitchen
    to:
      kind: node
      id: route_node_1
    condition:
      entity: binary_sensor.kitchen_door
      allowed_states:
        - "on"
```

A condition contains:

- `entity`: the Home Assistant entity whose current state controls the edge.
- `allowed_states`: one or more states that make the edge available. If omitted or empty, `on` is used as the default.

Edges without `condition` remain permanently available and preserve all existing configurations.

The shared route resolver evaluates every conditional edge against current Home Assistant state before graph construction. Blocked edges are omitted from the Dijkstra graph for that resolution. The resolver then keeps the existing priority order:

1. Explicit manual room-to-room route.
2. Shortest path through currently active graph edges.
3. Straight-line fallback.

Manual routes are not blocked by graph-edge conditions. They remain explicit user overrides.

If a condition references a missing entity, or if no Home Assistant state is available for a conditional edge, the edge is treated as blocked. This fail-closed behavior avoids routing through a connection whose availability cannot be confirmed.

## Editor behavior

The graph editor can add, edit, remove, and inspect conditions on individual edges. It shows the current Home Assistant state and whether each edge is active or blocked.

The diagnostics panel receives the same Home Assistant state as the runtime and uses the same route resolver. It shows blocked edges, their entity state, allowed states, and whether an alternate graph path or fallback is selected.

## Consequences

- Existing route graph YAML remains valid without migration.
- Home Assistant state becomes an input to graph routing, but the card remains independent of any particular door or lock integration.
- A closed or otherwise blocked connection can trigger automatic rerouting.
- Missing conditional entities cannot accidentally leave a route open.
- Future releases can extend the condition model with attributes or more complex predicates without changing the graph topology model.
