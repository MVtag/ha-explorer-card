# ADR 0010: Room-aware presence placement

## Status

Accepted

## Context

Home Assistant Explorer can already bind presence objects to Home Assistant entities and read live normalized `x` and `y` coordinates. For a Marauder's Map-style experience, users should not need exact coordinates when their presence system only knows which room or Home Assistant Area contains an object.

The room engine already has normalized polygons. These polygons can provide a stable visual anchor for presence objects, while Home Assistant sensors can provide a room name or Area ID.

## Decision

Each `ExplorerRoom` may define:

- `area_id` to associate the room with a Home Assistant Area identifier
- `aliases` for alternate room values
- `presence_anchor` for the preferred normalized placement point

A presence object may define a static `room_id`, or its `entity_binding` may define:

- `room_entity` for a Home Assistant entity whose state identifies the current room
- `room_attribute` when the room value is stored in an attribute instead of the entity state

When no `room_entity` or `room_attribute` is configured, Explorer also checks the primary bound entity's `explorer_room` attribute.

Room references are matched against a room's `id`, `area_id`, `name` and `aliases` using trimmed, case-insensitive comparison.

When a room matches, its room anchor takes precedence over entity or static `x`/`y` coordinates. The anchor priority is:

1. explicit `presence_anchor`
2. room label position
3. polygon centroid when it lies inside the polygon
4. average or bounding-box center when valid
5. first polygon point as a final fallback

Manual `x` and `y` coordinates remain supported as fallback values when no room can be resolved. Presence objects with neither a resolvable room nor complete fallback coordinates are hidden instead of being displayed at a misleading location.

## Consequences

- Room-level presence systems can drive the map without exact coordinates.
- Existing coordinate-based configurations remain compatible.
- Home Assistant Area IDs can be used as stable room identifiers without requiring area-registry access in this first implementation.
- Multiple presence objects in one room currently share the same anchor and may overlap; deterministic spreading can be added later.
- A later visual room editor can expose Area linking and presence-anchor placement directly in the UI.
