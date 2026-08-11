# ADR 0031: Live route status and door overlay

## Status
Accepted for v0.20.0.

## Context

Explorer can already resolve manual routes, automatic graph routes, and Home Assistant-aware conditional graph edges. Until v0.20.0, that routing state is primarily visible in the editor and Route Preview & Diagnostics. The runtime map does not directly show which physical graph connections are always available, currently active, or blocked.

A live overlay should make the routing model understandable at a glance without turning the floorplan into a graph-debugging screen. It must also stay synchronized with the same Home Assistant entity states used by route calculation.

## Decision

The animated runtime canvas renders a dedicated `route-status-scene` SVG layer inside the existing transformed scene.

The layer uses `evaluateRouteGraphEdges()` from the shared route resolver. No separate condition evaluator is introduced.

Graph edges are rendered as follows:

- Unconditional edges are shown as faint neutral dashed context lines.
- Conditional active edges are shown as stronger active lines with a positive status marker.
- Conditional blocked edges are shown as stronger error-colored dashed lines with a blocked marker.
- Blocked status markers may pulse unless the user has requested reduced motion.

Shared route nodes with `kind: door` receive a dedicated door marker. A door marker derives its visual state from conditional graph edges connected to that node:

- `always`: no conditional incident edges.
- `active`: conditional incident edges are active.
- `blocked`: conditional incident edges are blocked.
- `mixed`: the door node has both active and blocked conditional incident edges.

Door names are displayed when configured. Door markers and route lines are visual-only and do not intercept floorplan pan, zoom, room selection, or presence selection.

The overlay is rebuilt when Home Assistant state, rooms, route nodes, or graph edges change. It sits above room polygons and below presence markers and footsteps.

## Consequences

- Runtime routing state becomes visible directly on the floorplan.
- The same v0.19 condition evaluation drives routing, diagnostics, the graph editor, and the live overlay.
- Existing configurations require no migration.
- Door nodes become more visually meaningful without adding a new door-specific data model.
- The dedicated runtime overlay layer provides a natural foundation for future living-room effects, entity reactions, and Marauder's Map visual treatments.
