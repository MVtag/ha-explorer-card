# ADR 0012: Unified SVG scene

## Status

Accepted

## Context

Home Assistant Explorer previously rendered the floorplan, room polygons and presence markers in separate SVG elements. The room and presence SVGs also lived inside separate Lit shadow roots. Even when they shared the same 1000 × 1000 viewBox and viewport transform, browser layout and shadow-DOM stacking could cause overlays to remain invisible or become misaligned with an inline SVG floorplan.

The Explorer map is fundamentally one visual scene. Floorplan geometry, rooms and presence markers should therefore share one SVG coordinate system and one zoom/pan transform.

## Decision

Explorer Canvas renders a single root SVG with one transformed scene group. Inside that group, layers are painted in deterministic order:

1. floorplan
2. room polygons and labels
3. presence markers and labels

Rooms and presences are rendered directly by Explorer Canvas instead of through separate `room-layer` and `presence-layer` custom elements.

Room and presence coordinates remain normalized from 0 to 1 and are converted into the shared 1000 × 1000 Explorer coordinate space at render time.

Selection events are handled directly by Explorer Canvas. Pointer-down events on interactive room/presence elements stop propagation so map dragging does not begin when selecting an overlay.

## Consequences

- Floorplan, rooms and presences always share the same transform and SVG viewport.
- Shadow-DOM overlay stacking is removed from the rendering path.
- Room and presence rendering becomes deterministic for both inline SVG and raster floorplans.
- Zoom and pan cannot drift between floorplan and overlays.
- The unified scene provides a better foundation for later path animation, trails, footprints and Marauder's Map-style movement.
- The existing room and presence component files may remain temporarily for compatibility/history, but they are no longer used by Explorer Canvas.
