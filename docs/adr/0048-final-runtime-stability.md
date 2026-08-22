# ADR 0048: Final runtime stability pass

## Status

Accepted

## Context

The card can remain mounted on a Home Assistant dashboard for long periods and can also be detached and reattached while views or editors change. Several short-lived movement, trail, and editor timers were not centrally tracked, an SVG request could finish after its canvas was detached, and the map always disabled native touch scrolling.

## Decision

Track transient movement and trail timers per canvas instance and cancel them when the element disconnects. Remove active SVG animations and ephemeral trail elements, clear stale movement state, and reset the existing age and atmosphere timers to an inactive state.

Abort an in-flight SVG floorplan request when a newer request starts or the canvas disconnects. Invalidate raster requests and clear active pointer state on disconnect so an old asynchronous result or gesture cannot update a reattached card.

Allow vertical dashboard scrolling while the map is at its minimum zoom. Once the user zooms in, give the map full touch control for panning. Let gestures start over rooms and presence markers, and suppress selection clicks after a drag or pinch.

Guard queued editor work and the temporary navigation highlight so they do not update or emit configuration after the editor disconnects.

## Consequences

Repeated dashboard navigation and long-running movement updates no longer retain orphaned callbacks or transient SVG nodes. Floorplan changes cannot race a detached or newer canvas. Mobile users can scroll past an unzoomed card normally, while zoomed map interaction remains available and does not accidentally open room details.
