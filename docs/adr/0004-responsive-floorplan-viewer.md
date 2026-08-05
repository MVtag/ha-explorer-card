# ADR 0004: Responsive floorplan viewer

## Status

Accepted

## Context

Floorplans can have very different aspect ratios and may be viewed on phones, tablets and desktop dashboards. A fixed-height or square-only canvas would either distort the image or waste significant space.

## Decision

The viewer reads the intrinsic dimensions of the configured image before rendering it. The component then:

- preserves the floorplan aspect ratio;
- uses a responsive container with sensible mobile and desktop limits;
- supports `contain` and `cover` fit modes;
- resets the viewport when a new image loads;
- exposes loading and error states instead of silently showing an empty map.

The internal SVG coordinate system remains normalized to a 1000 × 1000 viewBox so future room and object layers are independent of the source image resolution.

## Consequences

Floorplans remain undistorted across devices, and later overlay engines can continue to use normalized coordinates. Image metadata must be loaded asynchronously, so the card includes explicit loading and failure states.
