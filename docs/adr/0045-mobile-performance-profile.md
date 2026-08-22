# ADR 0045: Automatic mobile weather performance profile

## Status

Accepted

## Context

The enchanted weather scenes combine animated SVG particles, organic cloud filters, fog banks, blur, and glow. That full scene is appropriate on desktop, but small and touch-first devices have less rendering headroom and display fewer visual details at once.

## Decision

Use an automatic compact weather profile when the viewport is at most 820 pixels wide or the primary input is coarse and does not support hover.

The compact profile:

- renders fewer clouds, precipitation particles, fog banks, wind paths, impacts, motes, and exceptional-weather orbits;
- replaces the expensive turbulence and displacement cloud filter with a light blur;
- reduces large blur and glow radii while keeping the same colors, motion language, and weather identity;
- hides selected decorative HTML cloud layers below 600 pixels;
- rebuilds the weather scene when the media query changes, while retaining the existing cross-weather transition.

Desktop keeps the full-quality scene.

## Consequences

Mobile devices perform substantially less SVG and filter work without adding a user-facing setting. Exact particle density differs between compact and full rendering, but weather meaning, masking outside rooms, intensity, and the enchanted visual style remain unchanged.
