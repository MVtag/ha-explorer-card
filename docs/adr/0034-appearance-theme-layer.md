# ADR 0034: Appearance theme layer

## Status

Accepted for v0.22.0.

## Context

Explorer now has stable functional layers for room geometry, presence, automatic routing, door state, footsteps and room entity reactions. The next visual milestone is an optional antique enchanted-map presentation without coupling visual styling to those semantics.

A theme must not change routing decisions, Home Assistant entity bindings, room geometry or presence resolution. Existing cards must also continue to render as before unless a theme is explicitly selected.

## Decision

Add an optional top-level `appearance` configuration with a `theme` field.

```yaml
appearance:
  theme: enchanted_antique
```

Supported themes in v0.22.0:

- `classic` — existing Explorer presentation and the default for existing configurations.
- `enchanted_antique` — an original antique magical-map presentation using parchment, sepia ink, old-map typography, ink-like footsteps, warmer room reactions and a small original compass ornament.

The final runtime canvas is `explorer-themed-canvas`, which extends the existing Living Rooms canvas. The theme layer therefore sits above the rendering architecture but below application semantics.

The enchanted theme may:

- set CSS custom properties used by existing live layers;
- restyle room polygons, labels, presence borders, footsteps and route presentation;
- tint the loaded floorplan visually;
- add non-interactive SVG paper grain, vignette and ornament layers;
- use a short visual reveal when the theme is first activated.

It must not:

- rewrite or mutate room geometry;
- alter route graph evaluation;
- change door passability;
- modify Home Assistant entity state;
- change room-reaction activation rules;
- intercept map interaction.

Animations must respect `prefers-reduced-motion`.

The antique theme is intentionally original and uses general antique-map visual language. It does not include third-party franchise artwork, logos, proprietary typefaces or copied map assets.

## Consequences

Existing configurations remain backward compatible because omitted `appearance.theme` resolves to `classic`.

Future themes can be added without changing routing, room reactions or entity-binding schemas. The appearance editor remains a separate tool that emits configuration through the existing authoritative Home Assistant editor owner flow.
