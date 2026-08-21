# ADR 0042: Snow, sleet and hail polish

- Status: Accepted
- Date: 2026-08-21
- Version: 0.45.1

## Context

Snow, sleet and hail already had SVG particles inside the outside-room weather mask, but a legacy full-card CSS particle texture was still rendered above them. This reduced visual variation and could place precipitation over protected room polygons.

## Decision

The masked SVG weather layer is now the only particle source for snow, sleet and hail.

- Snowflakes use three depth levels, varied scale, opacity, drift, rotation, timing and size.
- A small share of flakes use a detailed crystal shape while the rest remain soft flakes.
- Sleet combines faster, cooler and less opaque snow particles with the polished rain layer.
- Hailstones use varied size, depth, timing and a short rebound near impact.
- Hail adds small surface-impact rings in lower outdoor areas.
- Reduced Motion disables all new particle and impact animations.

## Consequences

- Winter precipitation remains outside configured rooms.
- Snow no longer looks like a uniform repeating dot texture.
- Sleet is visibly different from both pure snow and ordinary rain.
- Hail has weight and impact without requiring a physics engine.
- Existing weather configuration and state mapping remain compatible.
