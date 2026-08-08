# ADR 0009: Native inline SVG rendering

## Status

Accepted

## Context

Home Assistant Explorer v0.6.1 could fetch, validate and sanitize SVG floorplans successfully, but some Home Assistant browser contexts still rendered a blank floorplan when the sanitized SVG was converted to a Blob URL and embedded through an SVG `<image>` element.

The SVG file itself was valid and could be opened directly in the browser. The remaining compatibility problem was therefore the final SVG-as-image embedding step.

## Decision

Sanitized SVG floorplans are rendered directly inside the Explorer SVG viewport using Lit's SVG rendering support.

The loader continues to:

- fetch SVG files with same-origin credentials
- parse and validate the SVG document
- remove active or unsafe elements and attributes
- preserve safe internal fragment references
- derive the floorplan aspect ratio from `viewBox`, with width and height as fallback

Before rendering, the sanitized root SVG is normalized to the Explorer coordinate space and receives the configured `contain` or `cover` preserve-aspect-ratio behavior.

Raster PNG and JPG floorplans continue to use the existing `<image>` rendering path.

## Consequences

- SVG floorplans no longer depend on Blob URL embedding support.
- SVG geometry remains native SVG inside the Explorer scene.
- Zoom and pan continue to use the same viewport transform as rooms and presence objects.
- Future room and floorplan interaction can build on native SVG content.
- Sanitization remains mandatory because inline SVG markup becomes part of the card's rendered DOM.
