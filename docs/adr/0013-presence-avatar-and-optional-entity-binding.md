# ADR 0013: Presence avatars and optional primary entity bindings

## Status

Accepted

## Context

Room Awareness can place a presence object from a dedicated `room_entity`. In v0.8.0, `entity_binding.entity` was still mandatory, so room-only tracking required an unrelated primary entity. The binding also treated the Home Assistant `entity_picture` attribute as a text icon, which caused `/api/image/serve/...` URLs to be rendered directly on the map.

A configured presence `name` was also overwritten by the primary entity's `friendly_name`, making concise map labels difficult.

## Decision

`PresenceEntityBinding.entity` is optional.

When `room_entity` is configured without a primary entity, Explorer resolves the room directly from the room entity and keeps configured presence metadata such as `name`, `icon`, `avatar`, `color` and visibility.

When a primary entity is configured:

- an explicit presence `name` takes priority over `friendly_name`
- an explicit presence `avatar` takes priority over the entity avatar
- `entity_picture` is read as the default avatar source
- text/icon attributes are only read when `icon_attribute` is explicitly configured
- an explicit presence `color` takes priority over the bound color attribute

Avatar sources are rendered as clipped circular SVG images with the existing presence marker border. Unsafe URL schemes are rejected and the normal type icon is used as fallback.

## Consequences

- Room-only helpers such as `input_select.explorer_room_test` can drive presence placement without a dummy primary entity.
- Home Assistant person profile pictures render as actual avatars instead of URL text.
- Short configured labels such as `Marc` remain stable even if the entity friendly name is longer.
- Existing primary-entity bindings remain compatible.
- Presence markers without avatars continue to use the existing symbolic type icons.
