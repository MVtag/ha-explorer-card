# ADR 0011: Reliable room and presence overlay layers

## Status

Accepted

## Context

Home Assistant Explorer v0.7.0 introduced room-aware presence placement, but the room and presence overlays could remain invisible even when their resolved coordinates were correct. The floorplan is rendered as inline SVG, while room and presence layers are separate custom elements positioned above the canvas.

Two compatibility risks were identified:

- the overlay hosts had no explicit stacking order relative to the inline floorplan
- presence coordinates were applied through CSS `transform: translate(...px)` on an SVG group, which can use a different coordinate interpretation than the Explorer 1000×1000 SVG viewBox

The room and presence overlays must use the same viewBox coordinate system and must always be painted above the floorplan while remaining below controls and status UI.

## Decision

Room and presence layer hosts use explicit absolute positioning and z-index values:

1. floorplan canvas
2. room overlay (`z-index: 2`)
3. presence overlay (`z-index: 3`)
4. status, selection and controls (`z-index: 5+`)

Both overlay SVGs use `viewBox="0 0 1000 1000"` with `preserveAspectRatio="xMidYMid meet"` so they share the Explorer viewport coordinate system.

Presence positions are rendered with the native SVG `transform` attribute (`translate(x y)`) instead of a CSS pixel transform. This makes normalized Explorer coordinates deterministic across browsers, Home Assistant WebView and different screen sizes.

Pointer events stay disabled on the overlay hosts and SVG roots, while interactive room and presence groups explicitly enable pointer events. This allows map pan/zoom gestures to pass through empty overlay regions.

## Consequences

- room polygons are reliably painted above inline SVG floorplans
- presence markers use the same coordinate system as room geometry
- Home Assistant browser and mobile WebView rendering becomes more predictable
- pointer interactions remain available for rooms and presence objects without blocking pan/zoom on empty space
- movement animation based on attribute transforms is intentionally deferred to a later animation-focused change
