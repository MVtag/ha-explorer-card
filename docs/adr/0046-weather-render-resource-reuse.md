# ADR 0046: Reuse weather render resources

## Status

Accepted

## Context

Each weather transition previously created a new SVG mask and cloud filter. Those definitions were removed after the outgoing scene faded, but repeated or rapid weather changes still caused avoidable DOM allocation and left several short-lived scenes, timers, and animation frames active at once.

## Decision

Keep one card-instance-specific weather resource definition containing the outside-room mask and cloud filter. Rebuild that definition only when room geometry or the automatic compact/full profile changes.

Track transition cleanup by scene instead of by timer alone, cancel pending animation frames and timers when the card disconnects, and keep at most two outgoing weather scenes during rapid changes.

## Consequences

Normal weather changes reuse the expensive SVG resources instead of recreating them. Crossfades, room masking, day/night styling, intensity changes, and the compact mobile profile remain unchanged. Rapid updates have a bounded amount of temporary DOM, and detached cards retain no weather transition callbacks.
