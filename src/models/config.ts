export interface ExplorerCardConfig {
  type: string;
  title?: string;
  image?: string;
  background?: string;
  min_zoom?: number;
  max_zoom?: number;
  initial_zoom?: number;
}

export interface ViewportState {
  zoom: number;
  x: number;
  y: number;
}
