# ADR 0017: Home Assistant config-changed event bridge

## Status

Accepted

## Context

Home Assistant Explorer v0.10.0 and v0.10.1 could update the Visual Room Editor's local configuration while Home Assistant's card editor remained unaware of the change. The visible symptom was that newly drawn rooms or moved presence anchors appeared in the editor, while the card preview kept the old configuration and Home Assistant's **Gem** button stayed disabled.

Home Assistant's documented custom card editor contract communicates changes with an `Event` named `config-changed` and places the new card configuration in `event.detail.config`.

Explorer's internal editors use `CustomEvent`. Although this is normally compatible with DOM event handling, the nested room-editor wrapper did not reliably update Home Assistant's editor state in the affected frontend flow.

## Decision

Add a dedicated Home Assistant-facing editor element, `ha-explorer-ha-editor`.

The element extends the existing visual room editor and converts outgoing `config-changed` CustomEvents into the exact event shape documented by Home Assistant:

- normal `Event`
- event name `config-changed`
- `bubbles: true`
- `composed: true`
- `detail.config` containing the complete Explorer card configuration

`HaExplorerCard.getConfigElement()` returns this compatibility editor instead of returning the visual room editor directly.

## Consequences

- Internal editor architecture remains unchanged.
- Room drawing, room redraw, presence-anchor placement and the base configuration editor use the same Home Assistant-facing event bridge.
- The card preview should update immediately after an editor save action.
- Home Assistant should mark the card configuration dirty and enable its **Gem** button.
- Future editor components should continue to route final configuration changes through this bridge.
