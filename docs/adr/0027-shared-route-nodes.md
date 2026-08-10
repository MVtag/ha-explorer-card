# ADR 0027: Shared route nodes

## Status

Accepted

## Context

Route Paths introduced per-route waypoints and the visual route editor made those points easy to draw. As the number of rooms grows, many routes pass through the same physical doors, corridor bends, and junctions. Storing each of those coordinates independently makes the route network repetitive and harder to maintain.

## Decision

Add optional top-level `route_nodes` to the Explorer card configuration. A shared route node has a stable id, a normalized point, an optional name, and a kind such as `door`, `junction`, or `waypoint`.

Routes may now use an ordered `path` of steps. Each step either references a shared node by `node_id` or stores a local normalized `point`. Existing `via` arrays remain supported for backwards compatibility.

The visual route editor can place shared nodes on the floorplan. While drawing a route, clicking a shared node adds a reference to that node; clicking elsewhere adds a route-local point. The runtime resolves both forms into the same ordered movement polyline before animating the presence marker and footsteps.

## Consequences

- Multiple routes can reuse one physical doorway or corridor point.
- Moving a shared node updates every route that references it.
- Existing v0.13-v0.15 YAML remains valid without migration.
- Routes can mix shared nodes and local waypoints in one ordered path.
- Shared nodes cannot be deleted from the visual editor while a saved route still references them.
- Tracking integrations remain independent from Explorer; this change only affects route configuration and visualization.
