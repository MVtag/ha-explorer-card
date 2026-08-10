# ADR 0029: Route Preview and Diagnostics

## Status

Accepted for v0.18.0.

## Context

Home Assistant Explorer can now choose between three routing strategies:

1. an explicit manual room-to-room route,
2. the Automatic Route Graph,
3. straight-line fallback.

As the route network grows, it becomes difficult to understand which strategy and path will actually be used without repeatedly moving a tracked presence between rooms. Configuration mistakes such as disconnected rooms, orphaned shared nodes, invalid graph endpoints, duplicate graph edges, or manual routes referencing deleted shared nodes can also be hard to spot.

## Decision

Add a read-only Route Preview & Diagnostics tool to the visual editor.

The tool:

- lets the user select a source room and destination room,
- resolves routing using the same priority and shared resolver used by runtime movement,
- draws the resolved path over the floorplan,
- identifies whether the selected path comes from a manual route, Automatic Graph, or straight-line fallback,
- lists the resolved room/node/waypoint sequence,
- shows relative path distance in normalized floorplan coordinates,
- reports disconnected rooms and shared nodes,
- reports graph components, invalid edges, duplicate edges, and broken manual shared-node references.

The diagnostics UI is read-only and does not mutate route configuration.

## Consequences

- Preview results stay aligned with runtime movement and footsteps because routing logic is centralized in `src/utils/route-resolver.ts`.
- Existing route, shared-node, and graph configuration formats remain unchanged.
- No physical distance unit is inferred. Distance is intentionally shown as a relative normalized map distance until a future floorplan scale model exists.
- The editor can surface graph configuration problems before users test live presence movement.
