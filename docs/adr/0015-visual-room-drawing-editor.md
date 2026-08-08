# ADR 0015: Visual room drawing editor

## Status

Accepted

## Context

Home Assistant Explorer already supports room polygons, Home Assistant Area bindings, room-aware presence placement and a visual configuration editor. Before this change, polygon geometry still had to be authored as normalized `0..1` coordinates in YAML.

That is too technical for the intended HACS setup experience. A normal user should be able to place room boundaries directly on their floorplan without calculating coordinates.

The existing v0.9.0 configuration editor is already working in Home Assistant and should remain isolated from geometry editing concerns.

## Decision

Add a separate visual room drawing editor that wraps the existing configuration editor rather than replacing or subclassing its internal implementation.

The drawing editor:

- renders the configured floorplan in a normalized `1000 x 1000` SVG editing surface;
- converts click/tap positions into normalized room coordinates from `0` to `1`;
- creates new room polygons from three or more points;
- allows existing room polygons to be redrawn;
- preserves existing room metadata while geometry is redrawn;
- can bind a newly created room to a Home Assistant Area;
- can place the room `presence_anchor` directly on the floorplan;
- supports undoing the most recently added point and cancelling an edit;
- preserves the existing YAML room model as the source of truth.

The old polygon remains unchanged until a redraw is explicitly saved.

The existing v0.9.0 editor remains a standalone component. The new editor hosts it and synchronizes `config-changed` events, keeping room drawing state separate from presence/entity binding state.

## Consequences

### Positive

- Users no longer need to manually calculate room coordinates.
- HACS installation can be followed by a mostly visual setup flow.
- Existing YAML configurations remain compatible.
- Existing room metadata and tracking behavior are preserved.
- The geometry editor can evolve independently of the presence/binding editor.

### Trade-offs

- The first drawing version uses click/tap polygon creation rather than draggable vertices.
- Fine-grained vertex movement can be added later without changing the stored configuration format.
- The editing surface uses the same normalized coordinate model as the Explorer scene, so floorplan fit mode must remain consistent between editor and card rendering.

## Version

Introduced in Home Assistant Explorer `v0.10.0`.
