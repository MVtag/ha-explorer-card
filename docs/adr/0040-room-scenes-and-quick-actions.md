# ADR 0040: Room scenes and quick actions

- Status: Accepted
- Date: 2026-08-14
- Version: 0.27.0

## Context

The interactive room panel introduced in v0.26 exposes live room entities and individual light toggles. Common room-level flows still require users to leave the floorplan or maintain manual YAML actions.

The card already knows which light entities belong to a room through Living Entity Point reactions. Home Assistant scenes and scripts provide a stable, user-managed abstraction for broader automations.

## Decision

Each room may store an optional `quick_actions` list. A quick action has a stable id, display name, explicit `scene` or `script` kind, matching entity id and optional short visual glyph.

The room panel derives aggregate light controls from existing light reactions. It calls `light.turn_on` or `light.turn_off` with all unique light entity ids for the selected room.

Configured quick actions are limited to:

- `scene.turn_on` for `scene.*` entities
- `script.turn_on` for `script.*` entities

The visual editor discovers matching entities from the current Home Assistant state registry. It stores actions inside the selected room and requires no manual YAML.

Runtime actions expose a pending state and a local error message. Existing configurations remain valid because `quick_actions` is optional.

## Consequences

- Room controls reuse the existing room/entity model and do not duplicate light bindings.
- Users can create room shortcuts through the visual editor.
- Arbitrary service calls are intentionally unsupported, keeping the action surface narrow and predictable.
- Deleted or unavailable entities are reported by setup health and remain editable.
- Complex action sequences belong in Home Assistant scripts rather than in the card configuration.
