import type { ViewportState } from "../models/config";

export const VIEWBOX_SIZE = 1000;

export function clampZoom(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function viewportTransform(state: ViewportState): string {
  return `translate(${state.x} ${state.y}) scale(${state.zoom})`;
}

export function clampViewport(
  state: ViewportState,
  minimumZoom = 1,
): ViewportState {
  const zoom = Math.max(minimumZoom, state.zoom);
  if (zoom <= minimumZoom + 0.0001) return { zoom, x: 0, y: 0 };

  const minimumOffset = VIEWBOX_SIZE * (1 - zoom);
  return {
    zoom,
    x: Math.min(0, Math.max(minimumOffset, state.x)),
    y: Math.min(0, Math.max(minimumOffset, state.y)),
  };
}

export function zoomAroundPoint(
  state: ViewportState,
  nextZoom: number,
  pointX: number,
  pointY: number,
): ViewportState {
  const ratio = nextZoom / state.zoom;
  return clampViewport({
    zoom: nextZoom,
    x: pointX - (pointX - state.x) * ratio,
    y: pointY - (pointY - state.y) * ratio,
  });
}
