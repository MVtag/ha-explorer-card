# ADR 0041: Rain and storm weather polish

- Status: Accepted
- Date: 2026-08-21
- Version: 0.45.0

## Context

Explorer already renders weather outside configured room polygons through the shared SVG weather mask. Rain was nevertheless duplicated by an older full-card CSS layer, which made it appear as uniform diagonal lines and allowed the visual effect to cover the protected floor-plan area. Thunder also combined the masked atmospheric flash with a full-card stylised lightning bolt.

## Decision

Rain and storm rendering now use the masked SVG weather layer as their only particle source.

- Rain uses shaped droplets with three depth levels, varied timing and soft highlights.
- Rain adds small animated surface splashes in the lower part of the map.
- Pouring rain increases density, speed and splash weight without changing the rendering model.
- Thunder uses a short, diffuse cloud glow and a restrained multi-pulse flash.
- Cartoon lightning-bolt shapes and the legacy diagonal CSS rain layer are removed.
- Weather intensity is allowed to reach zero and scales the complete masked weather scene.
- Reduced Motion disables droplet, splash and storm animations.

## Consequences

- Rain remains outside configured rooms and no longer looks like a repeating line texture.
- Day and night use the same geometry but retain separate colour tuning.
- The existing weather configuration and Home Assistant weather-state mapping remain compatible.
- Snow, fog, wind and cross-state transitions remain part of the wider Weather Polish roadmap.
