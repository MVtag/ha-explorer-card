# ADR 0022: Footstep trails reuse animated presence movement

## Status

Accepted

## Context

Home Assistant Explorer v0.11.0 introduced animated movement between resolved presence positions. The next Marauder's Map milestone is to leave a short-lived visual trail while a presence moves between room anchors.

The trail must remain aligned with the existing floorplan scene during zoom and pan, must not change room tracking semantics, and should respect the same reduced-motion preference as the movement animation.

## Decision

Footsteps are created by `explorer-animated-canvas` when a visible presence changes from one resolved map position to another.

The implementation:

- reuses the same previous/current SVG map coordinates as animated movement
- inserts a dedicated `footsteps-scene` SVG group inside the transformed Explorer scene
- places alternating left/right footprint marks along the straight movement vector
- staggers their appearance over the movement duration
- fades and removes each footprint after a short lifetime
- skips both movement animation and footsteps when `prefers-reduced-motion: reduce` is active
- leaves room/entity binding and tracking backends unchanged

## Consequences

Footsteps automatically stay aligned with zoom and pan because they share the scene transform with rooms and presences. Future route-planning work can replace the straight vector with a richer path while retaining the same trail lifecycle.
