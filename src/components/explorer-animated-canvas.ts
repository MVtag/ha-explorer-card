import { customElement } from "lit/decorators.js";
import { ExplorerCanvas } from "./explorer-canvas";
import { VIEWBOX_SIZE } from "../utils/viewport";

interface PresencePosition {
  x: number;
  y: number;
}

const MOVEMENT_DURATION_MS = 900;
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
}
