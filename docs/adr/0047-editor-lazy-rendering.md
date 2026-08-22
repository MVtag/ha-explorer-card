# ADR 0047: Lazy and paused editor sections

## Status

Accepted

## Context

The Home Assistant editor created every advanced tool immediately. Each tool then received every live `hass` object and configuration update even while its details section was closed. Large installations also rebuilt and sorted thousands of entity options for every editor render.

## Decision

Activate setup and advanced tools only when their details section is opened for the first time. Keep activated tool elements mounted when their section closes so local draft state survives, but pause their `hass` and configuration bindings until the section opens again.

Cache the base editor's sorted entity catalogue and room-entity subset. Rebuild the catalogue only when entity IDs or friendly names change, and guard datalist templates by their cached array identity.

The authoritative top-level configuration and `config-changed` event flow remain unchanged.

## Consequences

Opening the editor no longer instantiates every advanced drawing, routing, zone, identity, and diagnostics tool. Closed tools stop processing live Home Assistant updates, while reopening a tool refreshes it with the latest configuration and `hass` state without losing local draft fields. Entity lists avoid repeated sorting and DOM reconciliation during ordinary state changes.
