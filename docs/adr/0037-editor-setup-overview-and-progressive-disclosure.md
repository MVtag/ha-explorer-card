# ADR 0037: Editor setup overview and progressive disclosure

## Status

Accepted for v0.25.0.

## Context

Explorer has accumulated mature editors for rooms, presences, appearance, zones, Living Rooms, route networks, route graphs and diagnostics. Keeping every editor expanded at the same time makes the Home Assistant card editor increasingly long and technical, even when a user only needs to change one part of the configuration.

At the same time, configuration health is spread across several tools. A missing floorplan, invalid room polygon or stale Home Assistant entity reference should be visible before the user has to inspect each editor individually.

## Decision

v0.25.0 introduces a visual setup overview as the first editor surface and uses progressive disclosure for advanced tools.

### Setup health

`src/utils/setup-health.ts` is the single source of truth for editor-level configuration health.

It checks only configuration facts that Explorer can determine safely:

- floorplan configured
- room polygon availability
- presence position / room tracking source
- configured Home Assistant entity references
- optional routing, Living Rooms and zone feature counts

The health analyzer does not change configuration and does not attempt to repair missing entities automatically.

`unknown` and `unavailable` entity states are shown as temporary attention information, while entity IDs that do not exist in `hass.states` are treated as configuration attention items.

### Progressive disclosure

The existing base editor remains authoritative for card, room and presence binding configuration. Its save-state behavior is not replaced.

Advanced tool editors are wrapped in collapsed native `<details>` sections:

- Appearance
- Visual room editor
- Presence visual profile
- Zones / Dynamic Areas
- Living Rooms
- Route Network
- Automatic Route Graph
- Route Preview & Diagnostics

The setup overview can navigate to a relevant section, open it and scroll it into view.

### Save-state compatibility

The existing `HaExplorerHaEditor` remains the Home Assistant config owner. Nested editor `config-changed` events continue through `handleToolConfigChanged`, while native controls continue through the established microtask-based `handleNativeControlChange` path.

The v0.25.0 UX layer must not introduce a second configuration store.

## Consequences

- Existing configurations require no migration.
- Runtime routing, presence, zone and reaction semantics remain unchanged.
- The editor becomes shorter on first open and easier to scan.
- Users get immediate visibility into missing configuration and stale entity references.
- Future v1.x editor improvements can extend setup health without coupling health checks to runtime behavior.
