# ADR 0003: Use a normalized coordinate system

- Status: Accepted
- Date: 2026-08-04

## Context

Explorer maps must behave consistently across different source-image resolutions and dashboard sizes.

## Decision

The renderer uses a stable internal SVG viewBox of 0–1000 on both axes. Persisted object positions will be normalized between 0 and 1 and converted to viewBox units during rendering.

## Consequences

- A configuration is independent of the floor-plan image resolution.
- Mobile and desktop layouts share the same object positions.
- Zoom and pan operate on one predictable coordinate space.
