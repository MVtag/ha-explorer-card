import { customElement } from "lit/decorators.js";
import { ExplorerCanvas } from "./explorer-canvas";
import { VIEWBOX_SIZE } from "../utils/viewport";

interface PresencePosition {
  x: number;
  y: number;
}

const MOVEMENT_DURATION_MS = 900;
const FOOTSTEP_LIFETIME_MS = 3600;
const FOOTSTEP_SPACING = 58;
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

@customElement("explorer-animated-canvas")
export class ExplorerAnimatedCanvas extends ExplorerCanvas {
  private readonly previousPresencePositions = new Map<string, PresencePosition>();
  private readonly activeAnimations = new Map<string, SVGElement>();

  protected updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);

    if (!changed.has("presences")) return;

    const visiblePresences = this.presences.filter((presence) => presence.visible !== false);
    const presenceElements = Array.from(
      this.renderRoot.querySelectorAll<SVGGElement>("g.presence"),
    );
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const currentIds = new Set<string>();

    visiblePresences.forEach((presence, index) => {
      const element = presenceElements[index];
      if (!element) return;

      const current = {
        x: (presence.x ?? 0.5) * VIEWBOX_SIZE,
        y: (presence.y ?? 0.5) * VIEWBOX_SIZE,
      };
      const previous = this.previousPresencePositions.get(presence.id);
      currentIds.add(presence.id);

      this.activeAnimations.get(presence.id)?.remove();
      this.activeAnimations.delete(presence.id);

      if (
        !reduceMotion &&
        previous &&
        (Math.abs(previous.x - current.x) > 0.01 || Math.abs(previous.y - current.y) > 0.01)
      ) {
        this.createFootsteps(previous, current);

        const animation = document.createElementNS(SVG_NAMESPACE, "animateTransform");
        animation.setAttribute("attributeName", "transform");
        animation.setAttribute("attributeType", "XML");
        animation.setAttribute("type", "translate");
        animation.setAttribute("from", `${previous.x} ${previous.y}`);
        animation.setAttribute("to", `${current.x} ${current.y}`);
        animation.setAttribute("dur", `${MOVEMENT_DURATION_MS}ms`);
        animation.setAttribute("begin", "indefinite");
        animation.setAttribute("fill", "freeze");
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("keySplines", "0.22 1 0.36 1");
        animation.setAttribute("keyTimes", "0;1");

        element.appendChild(animation);
        this.activeAnimations.set(presence.id, animation);
        (animation as SVGAnimationElement).beginElement();

        window.setTimeout(() => {
          if (this.activeAnimations.get(presence.id) !== animation) return;
          animation.remove();
          this.activeAnimations.delete(presence.id);
        }, MOVEMENT_DURATION_MS + 80);
      }

      this.previousPresencePositions.set(presence.id, current);
    });

    for (const id of this.previousPresencePositions.keys()) {
      if (!currentIds.has(id)) this.previousPresencePositions.delete(id);
    }
  }

  private ensureFootstepLayer(): SVGGElement | undefined {
    const scene = this.renderRoot.querySelector<SVGGElement>("g.scene");
    if (!scene) return undefined;

    let layer = scene.querySelector<SVGGElement>(":scope > g.footsteps-scene");
    if (layer) return layer;

    layer = document.createElementNS(SVG_NAMESPACE, "g");
    layer.setAttribute("class", "footsteps-scene");
    layer.setAttribute("aria-label", "Bevægelsesspor");
    layer.setAttribute("pointer-events", "none");

    const presencesLayer = scene.querySelector(":scope > g.presences-scene");
    scene.insertBefore(layer, presencesLayer ?? null);
    return layer;
  }

  private createFootsteps(from: PresencePosition, to: PresencePosition): void {
    const layer = this.ensureFootstepLayer();
    if (!layer) return;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    if (distance < FOOTSTEP_SPACING) return;

    const stepCount = Math.min(14, Math.max(3, Math.floor(distance / FOOTSTEP_SPACING)));
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    const perpendicularX = distance > 0 ? -dy / distance : 0;
    const perpendicularY = distance > 0 ? dx / distance : 0;

    for (let index = 0; index < stepCount; index += 1) {
      const progress = (index + 1) / (stepCount + 1);
      const side = index % 2 === 0 ? -1 : 1;
      const offset = 9 * side;
      const x = from.x + dx * progress + perpendicularX * offset;
      const y = from.y + dy * progress + perpendicularY * offset;
      const delay = Math.round(progress * MOVEMENT_DURATION_MS);

      const footprint = document.createElementNS(SVG_NAMESPACE, "g");
      footprint.setAttribute("transform", `translate(${x} ${y}) rotate(${angle + side * 8})`);
      footprint.setAttribute("opacity", "0");

      const sole = document.createElementNS(SVG_NAMESPACE, "ellipse");
      sole.setAttribute("cx", "0");
      sole.setAttribute("cy", "-5");
      sole.setAttribute("rx", "6");
      sole.setAttribute("ry", "12");
      sole.setAttribute("fill", "rgba(67, 48, 31, 0.72)");

      const heel = document.createElementNS(SVG_NAMESPACE, "ellipse");
      heel.setAttribute("cx", "0");
      heel.setAttribute("cy", "9");
      heel.setAttribute("rx", "4.5");
      heel.setAttribute("ry", "5.5");
      heel.setAttribute("fill", "rgba(67, 48, 31, 0.68)");

      const fade = document.createElementNS(SVG_NAMESPACE, "animate");
      fade.setAttribute("attributeName", "opacity");
      fade.setAttribute("values", "0;0.72;0.56;0");
      fade.setAttribute("keyTimes", "0;0.08;0.58;1");
      fade.setAttribute("begin", "indefinite");
      fade.setAttribute("dur", `${FOOTSTEP_LIFETIME_MS}ms`);
      fade.setAttribute("fill", "freeze");

      footprint.append(sole, heel, fade);
      layer.appendChild(footprint);

      window.setTimeout(() => {
        if (!footprint.isConnected) return;
        (fade as SVGAnimationElement).beginElement();
      }, delay);

      window.setTimeout(() => footprint.remove(), delay + FOOTSTEP_LIFETIME_MS + 120);
    }
  }
}
