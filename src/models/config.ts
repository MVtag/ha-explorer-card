export type FloorplanFitMode = "contain" | "cover";
export type NormalizedPoint = [number, number];
export type PresenceObjectType = "person" | "pet" | "robot" | "vehicle" | "object";
export type RouteNodeKind = "door" | "junction" | "waypoint";
export type RouteGraphEndpointKind = "room" | "node";
export type RoomReactionKind = "light" | "motion" | "media" | "opening";
export type ExplorerTheme = "classic" | "enchanted_antique";
export type ExplorerZoneKind = "info" | "warning" | "danger" | "cleaning" | "restricted";

export interface NormalizedPosition {
  x: number;
  y: number;
}

export interface ExplorerAppearanceConfig {
  /** Visual presentation only. Routing, presence and entity semantics are unchanged. */
  theme?: ExplorerTheme;
}

export interface ExplorerZoneStateBinding {
  /** Home Assistant entity that controls whether this zone is active/visible. */
  entity: string;
  /** States that activate the zone. Defaults to ["on"] when omitted or empty. */
  active_states?: string[];
}

export interface ExplorerZone {
  id: string;
  name?: string;
  points: NormalizedPoint[];
  kind?: ExplorerZoneKind;
  color?: string;
  label?: NormalizedPosition;
  /** Set false to hide the zone while keeping its configuration. Defaults to true. */
  visible?: boolean;
  /** Optional Home Assistant state binding. Without one, a visible zone is always active. */
  state_binding?: ExplorerZoneStateBinding;
}

export interface ExplorerRoomReaction {
  /** Visual reaction rendered when the bound entity is in one of its active states. */
  kind: RoomReactionKind;
  /** Home Assistant entity driving this reaction. */
  entity: string;
  /** States that activate the reaction. Defaults depend on the reaction kind. */
  active_states?: string[];
  /** Physical entity position on the floorplan. Falls back to the room anchor when omitted. */
  position?: NormalizedPosition;
}

export interface ExplorerRoom {
  id: string;
  name?: string;
  points: NormalizedPoint[];
  color?: string;
  area_id?: string;
  aliases?: string[];
  label?: NormalizedPosition;
  presence_anchor?: NormalizedPosition;
  /** Optional Home Assistant entities that make this room visually react at runtime. */
  reactions?: ExplorerRoomReaction[];
}

export interface ExplorerRouteNodeStateBinding {
  /** Home Assistant entity that describes whether the physical node is passable. */
  entity: string;
  /** States that mean the door/node is open and passable. Defaults to ["on"]. */
  open_states?: string[];
}

export interface ExplorerRouteNode {
  id: string;
  name?: string;
  point: NormalizedPoint;
  kind?: RouteNodeKind;
  /** Optional live state binding. Primarily used by door nodes. */
  state_binding?: ExplorerRouteNodeStateBinding;
}

export interface ExplorerRouteStep {
  node_id?: string;
  point?: NormalizedPoint;
}

export interface ExplorerRoute {
  from: string;
  to: string;
  /** Legacy inline waypoints from v0.13-v0.15. */
  via?: NormalizedPoint[];
  /** Ordered route steps. A step may reference a shared node or contain a local point. */
  path?: ExplorerRouteStep[];
}

export interface ExplorerRouteGraphEndpoint {
  kind: RouteGraphEndpointKind;
  id: string;
}

export interface ExplorerRouteCondition {
  /** Home Assistant entity whose current state controls whether the edge is usable. */
  entity: string;
  /** States that make the edge available. Defaults to ["on"] when omitted or empty. */
  allowed_states?: string[];
}

export interface ExplorerRouteGraphEdge {
  from: ExplorerRouteGraphEndpoint;
  to: ExplorerRouteGraphEndpoint;
  /** Optional live Home Assistant condition. Unconditional edges remain always available. */
  condition?: ExplorerRouteCondition;
}

export interface PresenceEntityBinding {
  entity?: string;
  x_attribute?: string;
  y_attribute?: string;
  name_attribute?: string;
  icon_attribute?: string;
  avatar_attribute?: string;
  color_attribute?: string;
  visible_attribute?: string;
  hidden_states?: string[];
  room_entity?: string;
  room_attribute?: string;
}

export interface ExplorerPresence {
  id: string;
  name?: string;
  type?: PresenceObjectType;
  x?: number;
  y?: number;
  room_id?: string;
  color?: string;
  icon?: string;
  avatar?: string;
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
  appearance?: ExplorerAppearanceConfig;
  rooms?: ExplorerRoom[];
  zones?: ExplorerZone[];
  route_nodes?: ExplorerRouteNode[];
  route_graph_edges?: ExplorerRouteGraphEdge[];
  routes?: ExplorerRoute[];
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
