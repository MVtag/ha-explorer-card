# ADR 0023: Explicit start for dynamically inserted footstep animations

## Status

Accepted

## Context

v0.12.0 creates footstep SVG elements dynamically when a presence changes position. Each footprint used an SVG `<animate>` element with a relative `begin="Nms"` value.

For dynamically inserted SMIL animation elements, a relative begin time can be interpreted against the already-running SVG document timeline. If that time has already elapsed when the element is inserted, the animation may never become active and the footprint remains at its initial opacity of `0`.

The presence movement animation already avoids this ambiguity by using `begin="indefinite"` and calling `beginElement()` explicitly.

## Decision

Footstep opacity animations use the same explicit-start lifecycle:

- Set `begin="indefinite"` on each dynamically created opacity animation.
- Schedule the desired per-step delay with `setTimeout`.
- Call `beginElement()` when the timeout fires.
- Keep the existing cleanup timeout so old footprints are removed after their fade lifetime.

## Consequences

Footsteps start reliably regardless of how long the Explorer SVG has already been mounted. The staggered trail timing remains unchanged, and the implementation continues to use the native SVG scene so zoom and pan alignment are preserved.
