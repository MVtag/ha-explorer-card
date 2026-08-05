export type FloorplanFitMode = "contain" | "cover";
export type NormalizedPoint = [number, number];

export interface ExplorerRoom {
  id: string;
  name?: string;
  points: NormalizedPoint[];
  color?: string;
  label?: {
    x: number;
    y: number;
  };
}

export interface ExplorerCardConfig {
  type: string;
  title?: string;
  image?: string;
  background?: string;
  min_zoom?: number;
  max_zoom?: number;
  initial_zoom?: number;
  fit_mode?: FloorplanFitMode;
  rooms?: ExplorerRoom[];
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
