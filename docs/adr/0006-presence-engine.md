# ADR 0006: Presence objects use normalized coordinates

## Status

Accepted

## Context

Home Assistant Explorer needs to display people, pets, robots, vehicles and other moving objects above the floorplan and room layers. These objects must stay aligned during responsive resizing, zoom and pan.

## Decision

Presence objects are rendered in a dedicated SVG layer and use normalized `x` and `y` coordinates from `0` to `1`. The presence layer receives the same viewport transform as the floorplan and room layers.

All moving object categories share one `ExplorerPresence` model with a `type` discriminator. Position changes use CSS transitions so future live entity updates can move objects smoothly without changing the rendering architecture.

## Consequences

- One rendering path supports people, pets, robots, vehicles and custom objects.
- Presence markers stay aligned with rooms and the floorplan.
- Coordinates are independent of image resolution and screen size.
- Home Assistant entity binding can be added later without replacing the SVG layer.
- Visual placement and editing remain deferred to Explorer Studio.
