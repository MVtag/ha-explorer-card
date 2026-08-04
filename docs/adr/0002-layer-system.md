# ADR 0002: Use ordered rendering layers

- Status: Accepted
- Date: 2026-08-04

## Context

Floor plans, rooms, doors, people, devices and effects need predictable visual ordering without coupling object types to the renderer.

## Decision

Render Explorer content in ordered SVG groups. Initial reserved layers are background, floor plan, rooms, doors, furniture, lights, people, devices, vehicles, effects and UI.

## Consequences

- New object types can be added without redesigning the renderer.
- Visibility and interaction can later be controlled per layer.
- Z-order remains deterministic.
