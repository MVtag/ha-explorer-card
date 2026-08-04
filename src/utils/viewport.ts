import type { ViewportState } from "../models/config";

export const VIEWBOX_SIZE = 1000;

export function clampZoom(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function viewportTransform(state: ViewportState): string {
  return `translate(${state.x} ${state.y}) scale(${state.zoom})`;
}

export function zoomAroundPoint(
  state: ViewportState,
  nextZoom: number,
  pointX: number,
  pointY: number,
): ViewportState {
  const ratio = nextZoom / state.zoom;
  return {
    zoom: nextZoom,
    x: pointX - (pointX - state.x) * ratio,
    y: pointY - (pointY - state.y) * ratio,
  };
}
