# ADR 0021: Animated presence movement

## Status

Accepted for v0.11.0.

## Context

Explorer already resolves a presence object to a room anchor whenever its room-tracking entity changes. Until now, the rendered marker jumped directly from the previous anchor to the next one.

The next roadmap milestone is animated movement, and the following footsteps milestone needs a clear movement lifecycle that can later be extended without changing the room-tracking backend contract.

## Decision

Keep room resolution unchanged and add animation only in the visualization layer.

`explorer-animated-canvas` extends the existing canvas and remembers the last rendered position for each visible presence ID. When a resolved presence position changes, it applies an SVG `animateTransform` from the previous map coordinate to the new map coordinate.

The first observed position is rendered immediately and is not animated. Movement uses a short eased transition and honors the browser's `prefers-reduced-motion` setting.

## Consequences

- Existing Bermuda, ESPresense, helper and other room-entity bindings continue to work unchanged.
- Animation is based on normalized Explorer coordinates and therefore remains independent of floorplan image size.
- The existing canvas remains the source of truth for rendering and interaction.
- The movement lifecycle provides a foundation for a later footsteps/trail layer.
- Rapid consecutive room changes may start a new transition from the last resolved target rather than the exact in-flight visual position; this is acceptable for the initial room-to-room animation milestone.
