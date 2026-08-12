# ADR 0038: Living Entity Points

## Status

Accepted for v0.25.1.

## Context

Living Rooms originally visualized entity activity at room level. A light could tint the entire room polygon, motion outlined the room, and media/opening markers were positioned relative to the shared room anchor.

That representation becomes ambiguous as more physical devices are added to one room. A lamp, television, motion sensor, door and temperature sensor are real objects at different positions and should be readable independently on the floorplan.

## Decision

Room reactions remain stored on `ExplorerRoom.reactions`, but every reaction may now define an optional normalized `position` (`x` / `y`, 0..1).

The runtime renders each configured reaction as a local entity point instead of applying a room-wide visual effect.

- `light` renders a local light point. When active, its halo strength follows Home Assistant `brightness` when available.
- `motion` renders a local sensor point and pulses when active.
- `media` renders a local screen/play point and glows when active.
- `opening` renders a local door/window point and changes when open.
- `temperature` renders a compact local value badge using the entity state and `unit_of_measurement`.

Inactive switch-like entities remain visible in a subdued state so the map still communicates where the physical device is located.

Temperature is not state-gated. It is considered available when the entity exists, is not `unknown` / `unavailable`, and has a numeric state. `active_states` is ignored for temperature reactions.

The temperature marker uses a cool / neutral / warm / hot visual scale. Fahrenheit values are normalized to Celsius only for palette selection; the displayed value and unit remain exactly in the Home Assistant unit.

## Backward compatibility

`position` is optional. Existing Living Rooms configurations therefore require no migration. When no explicit reaction position exists, the central reaction resolver falls back to the room `presence_anchor`, then the room polygon center.

The editor exposes direct click placement on the floorplan. Editing a legacy reaction lets the user move it from the fallback anchor to its real physical location.

## Architecture

`src/utils/room-reactions.ts` remains the single source of truth for:

- active-state defaults
- entity availability semantics
- brightness intensity
- temperature parsing
- reaction position fallback

The canvas consumes evaluated reaction status and never duplicates state semantics.

Entity points are visual only. They do not change routing, room awareness, zones, presence tracking or graph passability.

## Consequences

The map becomes more precise as the number of Home Assistant entities grows, while preserving all existing room bindings and configuration compatibility. Room-wide ambience can be introduced later as a separate explicit feature rather than being an implicit side effect of a single device state.
