# Home Assistant Explorer

A living, interactive floor map card for Home Assistant.

![Home Assistant Explorer preview](assets/preview.svg)

> Home Assistant Explorer is in active development. The card combines an SVG floor plan, interactive rooms and live presence objects with Home Assistant entities.

## Features

- Custom Lovelace card: `custom:ha-explorer-card`
- SVG, PNG and JPG floor plans
- Native inline SVG rendering
- Zoom and pan controls
- Interactive room polygons
- Presence objects for people, pets, robots, vehicles and custom objects
- Home Assistant entity binding
- Room-aware automatic presence placement
- HACS-compatible release assets

## HACS installation

Add this repository to HACS as a custom **Dashboard** repository, then download the latest release.

```text
https://github.com/MVtag/ha-explorer-card
```

After installation, add a card with:

```yaml
type: custom:ha-explorer-card
title: Home Assistant Explorer
image: /local/explorer/floorplan.svg
fit_mode: contain
```

## Room-aware presence placement

Rooms use normalized coordinates from `0` to `1`. A room can optionally be linked to a Home Assistant Area ID and can define a preferred point for presence objects.

```yaml
rooms:
  - id: kitchen
    name: Køkken
    area_id: kitchen
    aliases:
      - Køkken
    presence_anchor:
      x: 0.25
      y: 0.73
    points:
      - [0.08, 0.58]
      - [0.31, 0.58]
      - [0.31, 0.96]
      - [0.08, 0.96]
```

A presence object can use one entity for its identity and another entity for its current room. When `room_entity` is configured, Explorer reads that entity's state and matches it against the room's `id`, `area_id`, `name` or `aliases`.

```yaml
presences:
  - id: marc
    name: Marc
    type: person
    entity_binding:
      entity: person.marc
      room_entity: sensor.marc_room
```

If the room sensor exposes the room as an attribute instead of its state, set `room_attribute`:

```yaml
entity_binding:
  entity: person.marc
  room_entity: sensor.marc_presence
  room_attribute: area_id
```

The primary bound entity can also expose an `explorer_room` attribute directly:

```yaml
entity_binding:
  entity: sensor.marc_explorer
```

Static room placement is supported without an entity:

```yaml
presences:
  - id: robot
    name: Robot
    type: robot
    room_id: kitchen
```

Manual `x` and `y` coordinates remain supported as fallback values. If a room has no explicit `presence_anchor`, Explorer uses the room label position or calculates a suitable anchor from the room polygon.

## Entity binding

The default entity attributes are:

```yaml
explorer_x: 0.28
explorer_y: 0.34
friendly_name: Marc
entity_picture: /local/explorer/marc.png
explorer_color: "#03a9f4"
explorer_room: kitchen
```

Custom attribute names can be configured with `x_attribute`, `y_attribute`, `name_attribute`, `icon_attribute`, `color_attribute`, `visible_attribute` and `room_attribute`.

## Development

```bash
npm install
npm run typecheck
npm run build
```

The production file is generated as:

```text
dist/ha-explorer-card.js
```

## Roadmap

1. SVG floor-plan rendering and zoom
2. Interactive room engine
3. Presence engine
4. Home Assistant entity binding
5. Room-aware automatic placement
6. Visual room editor
7. Animated movement and footsteps
8. Themes and custom overlays

## License

MIT
