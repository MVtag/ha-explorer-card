# ADR 0020: Keep async Home Assistant Area selects synchronized

## Status

Accepted

## Context

Home Assistant Areas are loaded asynchronously from the Area Registry after the Explorer editor is rendered.

A room can already contain a persisted `area_id` while the `<select>` initially only contains the fallback `Ikke bundet` option. When the Area options arrive later, Lit's normal property binding can consider the bound value unchanged and skip writing it back to the DOM. The configuration is therefore correct while the dropdown can still visually show `Ikke bundet`.

This was observed after the v0.10.4 save-state fix: `area_id: kokken` could persist correctly, but the visual editor did not reliably show `Køkken` after reopening.

## Decision

Use Lit's `live()` directive for the Home Assistant Area select value.

`live()` compares the requested value with the live DOM property instead of only comparing it with the previous template value. When the asynchronously loaded Area options cause the browser's select value to differ from the persisted `room.area_id`, Lit writes the persisted value back to the control.

## Consequences

- Persisted `area_id` values are displayed correctly after the Area Registry finishes loading.
- The fix changes presentation synchronization only; it does not change the stored room configuration or Area IDs.
- Existing unknown Area IDs continue to use the existing `(eksisterende)` fallback option.
- Other editor controls remain unchanged.
