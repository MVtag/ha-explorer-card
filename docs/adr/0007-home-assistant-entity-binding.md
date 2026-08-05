# ADR 0007: Home Assistant entity binding

## Status

Accepted

## Context

Presence objects need to react to live Home Assistant state changes without replacing the existing normalized coordinate model or requiring a backend integration.

## Decision

A presence object may define an `entity_binding` that references one Home Assistant entity and optional attribute names. The card resolves the entity on every Home Assistant render update and creates a derived presence object.

The default attributes are:

- `explorer_x` for normalized x position
- `explorer_y` for normalized y position
- `friendly_name` for the label
- `entity_picture` for the icon or picture
- `explorer_color` for the display color

Static YAML values remain fallbacks when an attribute is missing or invalid. Coordinates are clamped to the normalized `0` to `1` range. Objects are hidden when the entity is missing, `unknown` or `unavailable`, unless custom hidden states are configured.

## Consequences

- Home Assistant state updates immediately feed the existing Presence Engine.
- Existing static configurations remain compatible.
- Any integration, template sensor or automation can publish Explorer-compatible attributes.
- Automatic room inference and dedicated positioning providers remain separate future concerns.
