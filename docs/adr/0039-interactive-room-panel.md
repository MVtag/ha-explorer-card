# ADR 0039: Interactive room detail panel

## Status

Accepted

## Context

Explorer rooms already own Living Entity Point bindings for lights, motion sensors, media players, openings and temperature sensors. Runtime rendering showed those entities on the floorplan, but selecting a room only displayed its name. Users could not inspect the room as a whole or control its lights without leaving the map.

## Decision

Add a dedicated `explorer-room-panel` component that opens when a room polygon is selected.

The panel:

- consumes the existing room `reactions` configuration without introducing a second schema
- evaluates live state through the shared `evaluateRoomReactions()` utility
- lists people and tracked objects whose resolved `room_id` matches the selected room
- opens Home Assistant's native more-info dialog for bound entities
- exposes direct `light.toggle` actions only for bindings with `kind: light`
- keeps all other entity types read-only
- reports unavailable entities and failed service calls without changing configuration
- inherits visual variables from the active Explorer theme

The Home Assistant context is moved to the base canvas class so both the selection UI and all specialized runtime layers share the same object.

## Consequences

- Existing room and reaction configuration remains fully compatible.
- No new editor fields or YAML migration are required.
- Light control uses Home Assistant's normal service authorization and state update flow.
- The panel remains synchronized with live `hass` updates.
- Interactive controls stay outside the SVG pan/zoom surface and do not interfere with map gestures.
