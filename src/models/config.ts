export type FloorplanFitMode = "contain" | "cover";
export type NormalizedPoint = [number, number];
export type PresenceObjectType = "person" | "pet" | "robot" | "vehicle" | "object";
export type PresenceCoordinateSpace = "normalized" | "meters" | "room_meters";
export type RouteNodeKind = "door" | "junction" | "waypoint";
export type RouteGraphEndpointKind = "room" | "node";
export type RoomReactionKind = "light" | "motion" | "media" | "opening" | "temperature" | "fireplace";
export type ExplorerRoomQuickActionKind = "scene" | "script";
export type ExplorerTheme = "classic" | "enchanted_antique";
export type ExplorerDayNightMode = "auto" | "day" | "night";
export type ExplorerWeatherEffect = "clear" | "cloudy" | "fog" | "rain" | "storm" | "snow";
export type ExplorerZoneKind = "info" | "warning" | "danger" | "cleaning" | "restricted";
export type ExplorerOpeningKind = "door" | "window";
export type ExplorerOpeningHinge = "start" | "end";
export type ExplorerOpeningSwing = "left" | "right";
export interface NormalizedPosition { x:number; y:number; }
export interface ExplorerDayNightConfig { enabled?:boolean; mode?:ExplorerDayNightMode; sun_entity?:string; night_states?:string[]; intensity?:number; }
export interface ExplorerCompassConfig { visible?:boolean; rotation?:number; size?:number; }
export interface ExplorerAlarmConfig { enabled?:boolean; entity?:string; armed_states?:string[]; triggered_states?:string[]; intensity?:number; }
export interface ExplorerOccupancyConfig { enabled?:boolean; home_states?:string[]; intensity?:number; }
export interface ExplorerWeatherConfig { enabled?:boolean; entity?:string; intensity?:number; rain_states?:string[]; storm_states?:string[]; snow_states?:string[]; fog_states?:string[]; cloudy_states?:string[]; }
export interface ExplorerAppearanceConfig { theme?:ExplorerTheme; day_night?:ExplorerDayNightConfig; compass?:ExplorerCompassConfig; alarm?:ExplorerAlarmConfig; occupancy?:ExplorerOccupancyConfig; weather?:ExplorerWeatherConfig; hide_source_text?:boolean; }
export interface ExplorerFloorplanMeters { width:number; height:number; }
export interface ExplorerCalibrationPoint { sensor_x:number; sensor_y:number; room_x:number; room_y:number; }
export interface ExplorerRoomPositionCalibration { a:ExplorerCalibrationPoint; b:ExplorerCalibrationPoint; c?:ExplorerCalibrationPoint; }
export interface ExplorerRoomMeters { width:number; height:number; flip_x?:boolean; flip_y?:boolean; position_calibration?:ExplorerRoomPositionCalibration; }
export interface ExplorerZoneStateBinding { entity:string; active_states?:string[]; }
export interface ExplorerZone { id:string; name?:string; points:NormalizedPoint[]; kind?:ExplorerZoneKind; color?:string; label?:NormalizedPosition; visible?:boolean; state_binding?:ExplorerZoneStateBinding; }
export interface ExplorerRoomReaction { kind:RoomReactionKind; entity:string; active_states?:string[]; position?:NormalizedPosition; intensity?:number; radius?:number; }
export interface ExplorerRoomQuickAction { id:string; name:string; kind:ExplorerRoomQuickActionKind; entity:string; icon?:string; }
export interface ExplorerRoom { id:string; name?:string; points:NormalizedPoint[]; color?:string; area_id?:string; aliases?:string[]; label?:NormalizedPosition; presence_anchor?:NormalizedPosition; physical_meters?:ExplorerRoomMeters; reactions?:ExplorerRoomReaction[]; quick_actions?:ExplorerRoomQuickAction[]; }
export interface ExplorerRouteNodeStateBinding { entity:string; open_states?:string[]; }
export interface ExplorerRouteNode { id:string; name?:string; point:NormalizedPoint; kind?:RouteNodeKind; state_binding?:ExplorerRouteNodeStateBinding; }
export interface ExplorerRouteStep { node_id?:string; point?:NormalizedPoint; }
export interface ExplorerRoute { from:string; to:string; via?:NormalizedPoint[]; path?:ExplorerRouteStep[]; }
export interface ExplorerRouteGraphEndpoint { kind:RouteGraphEndpointKind; id:string; }
export interface ExplorerRouteCondition { entity:string; allowed_states?:string[]; }
export interface ExplorerRouteGraphEdge { from:ExplorerRouteGraphEndpoint; to:ExplorerRouteGraphEndpoint; condition?:ExplorerRouteCondition; }
export interface ExplorerOpeningStateBinding { entity:string; open_states?:string[]; }
export interface ExplorerOpening { id:string; name?:string; kind:ExplorerOpeningKind; point:NormalizedPoint; angle?:number; length?:number; hinge?:ExplorerOpeningHinge; swing?:ExplorerOpeningSwing; open_angle?:number; visible?:boolean; state_binding?:ExplorerOpeningStateBinding; }
export interface PresenceEntityBinding { entity?:string; position_entity?:string; x_attribute?:string; y_attribute?:string; coordinate_space?:PresenceCoordinateSpace; name_attribute?:string; icon_attribute?:string; avatar_attribute?:string; color_attribute?:string; visible_attribute?:string; hidden_states?:string[]; room_entity?:string; room_attribute?:string; }
export interface ExplorerPresence { id:string; name?:string; type?:PresenceObjectType; x?:number; y?:number; room_id?:string; color?:string; icon?:string; avatar?:string; visible?:boolean; trail_visible?:boolean; trail_color?:string; trail_duration?:number; entity_binding?:PresenceEntityBinding; }
export interface ExplorerCardConfig { type:string; title?:string; image?:string; background?:string; floorplan_meters?:ExplorerFloorplanMeters; min_zoom?:number; max_zoom?:number; initial_zoom?:number; fit_mode?:FloorplanFitMode; appearance?:ExplorerAppearanceConfig; rooms?:ExplorerRoom[]; zones?:ExplorerZone[]; route_nodes?:ExplorerRouteNode[]; route_graph_edges?:ExplorerRouteGraphEdge[]; routes?:ExplorerRoute[]; openings?:ExplorerOpening[]; presences?:ExplorerPresence[]; }
export interface ViewportState { zoom:number; x:number; y:number; }
export interface FloorplanMetadata { width:number; height:number; status:"idle"|"loading"|"loaded"|"error"; }
