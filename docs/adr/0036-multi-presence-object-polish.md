# ADR 0036: Multi-person & Object Polish

## Status

Accepted for v0.24.0.

## Context

Explorer already supports multiple presence entries and five object types: `person`, `pet`, `robot`, `vehicle`, and `object`. Room-based tracking often resolves several entries to exactly the same room anchor, which makes markers overlap. The existing movement layer also renders the same shoe-print trail for every object type.

The v0.24.0 goal is to improve readability and character without changing tracking providers, room resolution, routing semantics, or the existing presence configuration model.

## Decision

### 1. Keep presence tracking backend-independent

No provider-specific tracking logic is added. Existing `entity_binding`, fixed rooms, coordinates, Bermuda/ESPresense-style room entities, and future providers continue to resolve through the existing presence pipeline.

### 2. Add a final presence-polish runtime canvas

`explorer-presence-polish-canvas` extends the existing Zones canvas. It is a visual-only final layer and therefore retains:

- zones
- enchanted/classic themes
- room reactions
- route and door overlays
- animated movement
- existing selection behavior

### 3. Spread collocated markers visually

When multiple visible presences resolve to the same logical location, their marker contents are offset around the shared anchor in a stable ID-sorted ring. The underlying tracking coordinate remains unchanged.

The offset is applied to an inner SVG group so the existing outer movement transform and route animation remain authoritative.

### 4. Stable automatic presence colors

If `presence.color` is not configured, v0.24.0 derives a deterministic color from presence ID and object type. The result is stable across renders and does not require a migration. A configured color always wins.

The Enchanted Antique theme uses a more subdued saturation/lightness while preserving identity differences.

### 5. Object-specific movement trails

The old generic shoe-print layer is hidden by the final polish canvas and replaced with a dedicated `presence-trails-scene`.

Trail semantics are derived from `PresenceObjectType`:

- `person`: alternating shoe prints
- `pet`: paw prints
- `robot`: paired tread marks
- `vehicle`: double wheel tracks
- `object`: diamond/spark marks

The trail path uses the same route resolver and live Home Assistant route state as movement animation, so trails follow the same resolved path through the house.

Reduced Motion suppresses the animated trail layer.

### 6. Reuse existing configuration fields

No new schema fields are required. The visual profile editor exposes already-supported fields:

- `color`
- `icon`
- `visible`

Type remains configured in the existing Persons & Objects editor.

## Consequences

### Positive

- Multiple people in one room remain readable.
- Different tracked object types look meaningfully different.
- Presence identity is stable even without manual colors.
- No config migration is required.
- Routing and tracking remain separate from visual polish.

### Trade-offs

- The legacy footsteps DOM is still created by the inherited animation layer but hidden by v0.24.0. This avoids changing the mature movement implementation in the same release.
- Visual spreading represents display layout, not a more precise physical coordinate.

## Future work

Possible later additions include recent movement afterglow, historical trails, person-specific trail duration, pet-specific icons, robot vacuum cleaning-state visualization, and multi-floor presence handling.
