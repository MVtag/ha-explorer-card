# ADR 0032: Door node state binding

## Status
Accepted for v0.20.1.

## Context

v0.19.0 introduced Home Assistant conditions on individual graph edges, and v0.20.0 made those live states visible on the runtime map. A physical door, however, is modeled as a shared route node and may connect several graph edges. Repeating the same door sensor condition on every incident edge duplicates configuration and can make the door visualization disagree with the physical door itself.

## Decision

Shared route nodes may optionally bind directly to a Home Assistant entity:

```yaml
route_nodes:
  - id: kitchen_door
    name: Køkkendør
    kind: door
    point: [0.38, 0.59]
    state_binding:
      entity: binary_sensor.kitchen_door
      open_states:
        - "on"
```

`state_binding` contains:

- `entity`: the Home Assistant entity describing the physical node state.
- `open_states`: states that mean the node is open/passable. If omitted or empty, `on` is used.

A missing or unavailable bound entity fails closed and makes the node non-passable.

The shared route resolver evaluates node bindings centrally. Every automatic graph edge incident to a bound node inherits that node state. An edge is usable only when its own optional route condition and every bound endpoint node are active.

Route-level conditions remain supported and are evaluated in addition to node bindings. They are intended for special connection-specific rules rather than ordinary door open/closed state.

Manual room-to-room routes remain explicit overrides and retain their existing first-priority behavior for backward compatibility.

## Editor behavior

The shared route-node editor can configure a Home Assistant entity and open states when creating a door point. Existing nodes can be edited to add, change, or remove the binding.

The editor shows the current door state using the same resolver helper as runtime routing. The graph editor and diagnostics display inherited door blocking separately from explicit route-level conditions.

## Runtime behavior

The live door symbol uses the door node's own binding as the source of truth when one exists. This prevents an unrelated route-level condition from making an open physical door appear closed.

Automatic graph routing, live route overlay, graph editor, and diagnostics all use the same centralized evaluation.

## Consequences

- A physical door sensor is configured once on the door point instead of once per graph edge.
- All automatic graph connections through that door inherit its live availability.
- Existing edge-condition YAML remains valid.
- Existing door nodes without a binding remain always passable unless an incident edge has its own condition.
- The node model now provides a clean foundation for future visual door opening/closing effects.
