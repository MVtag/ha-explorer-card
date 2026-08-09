# ADR 0025: Visual Route Editor

## Status
Accepted

## Context
v0.13.0 introduced route paths as YAML configuration. Routes are useful for keeping animated movement and footsteps out of walls, but manually estimating normalized waypoint coordinates is not practical for normal Home Assistant use.

## Decision
Add a dedicated visual route editor to the Home Assistant card editor.

The editor:
- uses the existing room ids as route endpoints,
- derives start/end positions from each room's presence anchor,
- lets the user add ordered normalized `via` waypoints by clicking directly on the floorplan,
- previews existing routes in either direction,
- saves through the same top-level Home Assistant editor state as room drawing,
- supports editing, undo, cancellation, and route deletion,
- keeps the v0.13.0 route data model unchanged.

The route editor is a separate component from the room drawing editor. This keeps drawing modes independent while preserving one authoritative top-level config owner in `ha-explorer-ha-editor`.

## Consequences
Users no longer need to calculate waypoint coordinates manually. Existing YAML routes remain fully compatible, and route animation behavior does not change.
