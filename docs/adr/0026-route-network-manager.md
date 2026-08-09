# ADR 0026: Visual route network management

## Status

Accepted

## Context

v0.14.0 introduced a visual editor for one selected route at a time. As the number of configured routes grows, choosing room pairs manually makes it difficult to understand the complete movement network and to quickly reopen an existing route.

The route data model itself is already sufficient: each route connects two room ids and optionally contains normalized waypoint coordinates. The improvement can therefore remain an editor-only concern without changing runtime route resolution or existing YAML.

## Decision

Extend the visual route editor with a route network manager that:

- renders all saved routes as a subdued overlay on the floorplan,
- lists all saved routes with their room pair and waypoint count,
- allows an existing route to be selected directly from the list,
- allows a visible route to be selected directly on the floorplan,
- highlights the currently selected route,
- keeps the existing From/To selectors for creating new routes,
- keeps the existing edit, delete, undo, save and cancel workflow.

## Consequences

- Larger route setups are easier to understand and maintain.
- Existing route configuration remains fully backwards compatible.
- The runtime movement engine is unchanged.
- The editor continues to save through the single Home Assistant configuration owner.
- Future features such as route names, shared doorway nodes and automatic route graph generation can build on the same network view.
