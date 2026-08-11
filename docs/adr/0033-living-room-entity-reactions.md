# ADR 0033: Living Room Entity Reactions

## Status

Accepted for v0.21.0.

## Context

Explorer already models rooms as normalized polygons and binds presence/routing to Home Assistant state. The next visual layer should let a room react to ordinary Home Assistant entities without coupling those effects to routing or requiring a specific integration.

Examples include a room glowing when lights are on, pulsing while motion is detected, showing that media is playing, or highlighting an active opening such as a window.

## Decision

Each `ExplorerRoom` may contain an optional `reactions` array. A reaction contains:

- `kind`: `light`, `motion`, `media`, or `opening`
- `entity`: the Home Assistant entity driving the reaction
- optional `active_states`

Default active states are owned by the central room-reaction evaluator:

- light: `on`
- motion: `on`
- media: `playing`, `on`
- opening: `on`, `open`

The central evaluator lives in `src/utils/room-reactions.ts`. Both the visual editor and runtime consume the same evaluator so their live status cannot drift apart.

Light reactions automatically use the standard Home Assistant `brightness` attribute when available. Multiple active light bindings accumulate into a stronger room glow with a capped intensity.

Runtime effects live in a dedicated `room-reactions-scene` SVG layer implemented by `explorer-living-canvas`. The layer is inserted below route status, footsteps, and presences so room ambience does not obscure navigation or tracked objects.

The layer is visual-only and does not intercept pointer events.

Motion animations and light breathing respect the user's `prefers-reduced-motion` setting.

## Consequences

- Room ambience stays independent from routing and door-state semantics.
- Multiple Home Assistant entities can affect the same room simultaneously.
- Existing room YAML remains valid because `reactions` is optional.
- Future visual themes can restyle the same reaction layer without changing entity bindings.
- Future reaction kinds can extend the model without redesigning the room geometry or routing model.
