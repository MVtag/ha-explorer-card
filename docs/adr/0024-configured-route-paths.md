# ADR 0024: Configured route paths

## Status

Accepted

## Context

Animated Movement and Footsteps currently interpolate directly between the previous and current presence anchors. That is a useful fallback, but a straight line can cross walls or furniture on a real floorplan.

The card needs a backend-independent way to describe preferred movement geometry without changing room tracking integrations.

## Decision

Add optional top-level `routes` configuration. A route identifies a `from` room id, a `to` room id, and zero or more normalized `via` points.

The animated canvas resolves movement in this order:

1. Exact `from` → `to` route.
2. Reverse of a configured `to` → `from` route, with waypoint order reversed.
3. Existing straight-line movement when no route exists.

Presence movement uses the route polyline with distance-weighted timing. Footsteps are sampled along the same polyline so the avatar and trail remain synchronized.

Route points use the same normalized 0–1 coordinate system as rooms and presence anchors and are converted into the shared SVG viewBox at render time. This keeps movement and footsteps aligned during zoom and pan.

## Consequences

- Existing configurations remain valid because `routes` is optional.
- Room tracking backends remain unchanged.
- One route definition can be reused in both directions.
- More advanced pathfinding can later generate or edit the same route model.
- v0.13.0 introduces the route engine; a visual route editor can build on this model in a later milestone.
