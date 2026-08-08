# ADR 0019: Native control save synchronization

## Status

Accepted for v0.10.4.

## Context

After v0.10.3 unified the Explorer editor state, text fields driven by `input` correctly enabled Home Assistant's Save button, while native controls driven by `change` could update Explorer's local configuration without leaving Home Assistant in a dirty/saveable state. The most visible example was selecting a Home Assistant Area: `area_id` appeared in the code editor, but Save remained disabled and the value disappeared when the card editor was closed.

## Decision

The Home Assistant-facing editor will normalize native `change` events:

1. The control's own handler is allowed to update Explorer's configuration first.
2. The raw browser `change` event is stopped before it leaves the Explorer editor.
3. A microtask then emits one Home Assistant-compatible `config-changed` event using the latest authoritative Explorer configuration.

This applies to all change-driven controls, including Area selection, aliases, numeric anchors, presence type, entity bindings, fit mode, and static room fallback.

## Consequences

- Home Assistant receives configuration changes after native control processing is complete.
- The Save button should become enabled consistently for both input- and change-driven controls.
- Existing editor field implementations do not need to be rewritten individually.
- The standard Home Assistant `config-changed` contract remains the external interface.
