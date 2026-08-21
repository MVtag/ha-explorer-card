# 0043 — Fog and wind polish

## Status

Accepted

## Context

The original fog and wind effects used full-card CSS overlays in addition to the masked SVG weather scene. Fog therefore looked like uniform stripes, while wind read as a repeating pattern and could cross room interiors.

## Decision

- Render fog as paired haze and wisp paths in three depth layers with independent drift timing.
- Render wind as irregular curved gusts with per-gust duration and delay.
- Speed up cloud parallax for `windy-variant` without changing ordinary cloudy weather.
- Disable the legacy full-card fog and wind layers. All visible effects now stay inside the outside-room SVG mask.
- Keep reduced-motion support for every new animation.

## Consequences

Fog has more volume and depth, wind arrives in varied gusts, and both effects remain visually behind the floor plan instead of covering rooms.
