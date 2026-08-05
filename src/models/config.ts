export type FloorplanFitMode = "contain" | "cover";
export type NormalizedPoint = [number, number];
export type PresenceObjectType = "person" | "pet" | "robot" | "vehicle" | "object";

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

export interface PresenceEntityBinding {
  entity: string;
  x_attribute?: string;
  y_attribute?: string;
  name_attribute?: string;
  icon_attribute?: string;
  color_attribute?: string;
  visible_attribute?: string;
  hidden_states?: string[];
}

export interface ExplorerPresence {
  id: string;
  name?: string;
  type?: PresenceObjectType;
  x: number;
  y: number;
  color?: string;
  icon?: string;
  visible?: boolean;
  entity_binding?: PresenceEntityBinding;
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
  presences?: ExplorerPresence[];
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
