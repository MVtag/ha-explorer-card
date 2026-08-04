# ADR 0001: Use SVG as the rendering engine

- Status: Accepted
- Date: 2026-08-04

## Context

Home Assistant Explorer must render floor plans, rooms, people, devices and effects in one coordinate space while remaining sharp on phones, tablets and desktop displays.

## Decision

Use one SVG viewport as the rendering surface. Raster floor plans are embedded as SVG image layers, while future rooms and objects are native SVG elements.

## Consequences

- All layers share one transform and coordinate system.
- Shapes remain interactive and scalable.
- PNG, JPG and SVG floor-plan files can be supported.
- Rendering remains DOM-based and accessible.
