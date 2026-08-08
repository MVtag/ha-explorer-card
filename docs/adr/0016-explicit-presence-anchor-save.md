# ADR 0016: Explicit presence-anchor save flow

## Status

Accepted

## Context

The first Visual Room Editor release applied a new `presence_anchor` immediately when the user tapped the floorplan. This made anchor placement inconsistent with room polygon editing, where pending geometry is reviewed and explicitly saved before the card configuration changes.

In Home Assistant this could also leave users without a clear save action after choosing a new person point.

## Decision

Presence-anchor placement uses a pending value:

1. Select a room.
2. Choose `Placér personpunkt`.
3. Tap the desired location on the floorplan.
4. Preview the pending marker and coordinates.
5. Press `Gem personpunkt` to commit the new `presence_anchor`.

`config-changed` is emitted only when the anchor is explicitly committed. Cancel leaves the stored configuration untouched.

The wrapper also re-emits child editor changes itself so Home Assistant always receives configuration events from the element returned by `getConfigElement()`.

## Consequences

- Anchor placement follows the same preview-and-save model as polygon drawing.
- Users can cancel without changing the stored anchor.
- Home Assistant receives a clear configuration change at the explicit save action.
- The editor UX is easier to understand on both desktop and mobile.
