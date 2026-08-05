# ADR 0005: Room Engine

## Status

Accepted

## Context

Home Assistant Explorer needs interactive room areas above the floorplan while preserving the shared SVG viewport and normalized coordinate system.

## Decision

Rooms are configured as polygons using points normalized from `0` to `1`. The Room Engine renders them in a dedicated SVG overlay using the same viewport transform as the floorplan.

Each room has a stable `id`, optional `name`, optional color and optional explicit label position. Clicking a room toggles its selected state and emits a `room-selected` event.

## Consequences

- Room geometry is independent of image resolution.
- Rooms remain aligned during zoom and pan.
- Later integrations can attach entities and actions to stable room IDs.
- The first version uses YAML configuration; visual drawing and editing are deferred to Explorer Studio.
