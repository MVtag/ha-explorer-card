# ADR 0018: Unified Home Assistant editor state

## Status

Accepted

## Context

The v0.10.x visual room editor wrapped the existing configuration editor inside a second editor component. This created two separate configuration owners: the standard Card / Rooms / People & Objects editor and the visual room drawing editor.

In Home Assistant this could leave the visual drawing surface updated locally while the card preview and dashboard Save button still used the previous configuration. The nested base editor could also be missing from the visible editor flow, making room metadata such as room names difficult to edit.

## Decision

The Home Assistant-facing `ha-explorer-ha-editor` is the single owner of Explorer card configuration.

It directly extends the standard `HaExplorerCardEditor`, so Card, Rooms and People & Objects are rendered by the same top-level element Home Assistant receives from `getConfigElement()`.

The visual room drawing editor is exposed through a drawing-only adapter. It receives the current card config from the top-level editor and only proposes updated configs through `config-changed`.

The top-level editor accepts those proposed configs, updates its own configuration, and dispatches the Home Assistant-facing `config-changed` event from the same host used by ordinary text/select edits.

## Consequences

- title, room metadata, presence bindings, room polygons and presence anchors share one save-state path
- Home Assistant preview state and Explorer editor state can no longer diverge because of nested config ownership
- the standard Rooms editor remains visible alongside the visual drawing tools
- the existing room drawing implementation can be reused without duplicating its geometry logic
- future visual tools should remain stateless with respect to the authoritative card config and submit changes to the top-level editor
