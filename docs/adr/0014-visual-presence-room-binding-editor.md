# ADR 0014: Visual presence and room binding editor

## Status

Accepted

## Context

Home Assistant Explorer can already resolve room-aware presence positions from any Home Assistant entity whose state identifies a room. Earlier versions required users to maintain room bindings and presence bindings in YAML.

That is acceptable during early development, but it creates unnecessary setup friction for HACS users and incorrectly makes Explorer feel coupled to a specific tracking backend such as Bermuda or ESPresense.

Explorer should consume room-location entities rather than own the radio/location stack.

## Decision

The Lovelace visual editor will expose three setup sections:

1. card/floorplan settings,
2. room bindings,
3. presence objects and tracking bindings.

For rooms, the editor reads the Home Assistant Area Registry through `config/area_registry/list` and lets an existing Explorer room be linked to an Area ID. Room aliases and presence anchors are editable without touching YAML.

For presence objects, the editor can add and remove objects and lets users select or enter:

- presence name and type,
- optional primary entity,
- room-tracking entity,
- static fallback room.

The room-tracking entity is intentionally backend-independent. It may be provided by Bermuda, ESPresense, a helper, or another Home Assistant integration.

Existing room polygon points remain unchanged by this editor. Direct polygon drawing belongs to a dedicated visual floorplan editor milestone.

## Consequences

- HACS users can configure the most common presence workflow without editing YAML.
- Explorer remains independent of Bluetooth, IRK, ESP32, or any single tracking integration.
- Home Assistant Areas become the stable semantic bridge between Explorer rooms and other integrations.
- Existing YAML configurations continue to work because the editor only modifies the same config model.
- New room geometry still requires an existing polygon until the visual floorplan drawing editor is implemented.
