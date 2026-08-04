# Home Assistant Explorer

A living, interactive floor map card for Home Assistant.

> Home Assistant Explorer is currently in early development. The first version provides the foundation for floor plans, rooms, people, devices and animated presence tracking.

## Features in the first development version

- Custom Lovelace card: `custom:ha-explorer-card`
- Parchment-inspired placeholder view
- Visual editor for title and background image
- TypeScript, Lit and Vite foundation
- Automated build, type-check and HACS validation

## Development installation

Until the first GitHub release is published, test the card manually:

1. Download the `ha-explorer-card.js` build artifact from a successful GitHub Actions run.
2. Copy it to `/config/www/ha-explorer-card.js` in Home Assistant.
3. Open **Settings → Dashboards → Resources**.
4. Add `/local/ha-explorer-card.js` as a **JavaScript module**.
5. Refresh the browser without cache.
6. Add a manual card with:

```yaml
type: custom:ha-explorer-card
title: Home Assistant Explorer
```

## Planned HACS installation

After the first release, the repository can be added to HACS as a custom **Dashboard** repository. HACS will download `ha-explorer-card.js` from the latest GitHub release.

## Roadmap

1. Floor-plan rendering and zoom
2. Visual room editor
3. People and device placement
4. Live room-presence updates
5. Animated movement and footsteps
6. Themes and custom overlays

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

## License

MIT
