# ADR 0008: Robust SVG floorplan loading

## Status

Accepted

## Context

Home Assistant Explorer originally rendered every floorplan source through an SVG `<image>` element. PNG and JPG files worked, but SVG files served from `/local/` could load successfully for metadata while remaining visually blank inside the card.

The same SVG files rendered correctly when opened directly in the browser, which showed that the files and Home Assistant paths were valid. The failure was caused by relying on the browser to embed an externally served SVG document inside the Explorer SVG viewport.

## Decision

SVG floorplans are handled separately from raster images:

1. Detect SVG sources by the URL pathname.
2. Fetch the SVG document with same-origin credentials and without browser cache.
3. Parse the document as `image/svg+xml`.
4. Reject invalid documents that do not contain an SVG root element.
5. Remove active or embedded content such as scripts, foreign objects, iframes and event-handler attributes.
6. Remove unsafe external references while preserving internal fragment references used by gradients, masks and filters.
7. Read the floorplan dimensions from `viewBox`, or fall back to width and height.
8. Serialize the sanitized document into a local `image/svg+xml` Blob URL.
9. Render that Blob URL through the existing viewport image layer.
10. Revoke Blob URLs when the source changes or the component disconnects.

PNG, JPG and other raster images continue to use the browser image loader.

## Consequences

- SVG floorplans render reliably inside Home Assistant Explorer.
- SVG aspect ratios are taken directly from their viewBox.
- The card no longer depends on the MIME type supplied by Home Assistant for external SVG files.
- Active SVG content is removed before rendering.
- External image and resource references inside SVG files are intentionally not supported in this first implementation.
- Internal SVG references such as `url(#gradient)` remain supported.
