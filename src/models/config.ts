export type FloorplanFitMode = "contain" | "cover";

export interface ExplorerCardConfig {
  type: string;
  title?: string;
  image?: string;
  background?: string;
  min_zoom?: number;
  max_zoom?: number;
  initial_zoom?: number;
  fit_mode?: FloorplanFitMode;
}

export interface ViewportState {
  zoom: number;
  x: number;
  y: number;
}

export interface FloorplanMetadata {
  width: number;
  height: number;
  status: "idle" | "loading" | "loaded" | "error";
}
