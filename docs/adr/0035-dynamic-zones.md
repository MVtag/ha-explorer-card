# ADR 0035: Dynamic zones are visual map overlays

## Status

Accepted for v0.23.0.

## Context

Explorer already models rooms, route nodes, route graph connections, room reactions and visual appearance. Users also need temporary or semantic areas that are not rooms: alarm regions, cleaning areas, restricted spaces, warnings and other live map annotations.

These areas may be permanent or controlled by a Home Assistant entity. They must remain aligned with the normalized floorplan coordinate system and work in both Classic and Enchanted Antique themes.

## Decision

Add a top-level `zones` collection. Each zone owns:

- a stable `id`
- optional name
- normalized polygon points
- a semantic kind (`info`, `warning`, `danger`, `cleaning`, `restricted`)
- optional custom color
- optional label position
- optional manual visibility
- optional Home Assistant `state_binding`

A zone without a state binding is active whenever it is visible. A bound zone is active only when the bound entity is available and its state matches `active_states`. Empty active-state configuration defaults to `on`.

Missing or unavailable bound entities fail inactive. They do not create routing restrictions.

`src/utils/zones.ts` is the single source of truth for live zone-state evaluation. The visual editor and runtime consume that evaluator rather than duplicating state semantics.

Runtime rendering lives in a dedicated `zones-scene` SVG layer. It is inserted below room reactions, route status, footsteps and presences, preserving interaction and movement readability.

## Routing

In v0.23.0 zones are visual only. They do not block or alter automatic/manual routes. This is deliberate: a visible semantic area is not necessarily impassable. A later version may add an explicit routing policy that references zones without changing the base zone model.

## Editing

The Home Assistant visual editor includes a dedicated zone tool. Users can:

- draw polygon zones directly on the floorplan
- select a semantic kind
- bind an optional Home Assistant entity
- configure active states
- redraw existing geometry
- edit or delete zones
- see live active/inactive state

Changes continue through the existing authoritative Home Assistant editor `config-changed` flow.

## Compatibility

Existing cards without `zones` behave exactly as before. `zones` defaults to an empty collection at runtime.
