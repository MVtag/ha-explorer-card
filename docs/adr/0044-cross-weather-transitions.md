# 0044 — Cross-weather transitions

## Status

Accepted

## Context

Changing weather removed the active masked SVG scene before rendering its replacement. This made otherwise polished effects switch abruptly and could produce a visible flash between states.

## Decision

- Keep the outgoing weather scene alive while the incoming scene is created.
- Cross-fade the two scenes over 900 milliseconds.
- Give every scene its own mask and cloud filter so rapid consecutive changes cannot invalidate an active transition.
- Remove outgoing scenes and their SVG definitions after the fade completes.
- Fade cleanly to no weather and respect reduced-motion preferences.

## Consequences

Weather changes are continuous, room masking remains stable during the transition, and rapid state updates do not leave stale visual effects behind.
