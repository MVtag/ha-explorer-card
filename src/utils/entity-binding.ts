import type { ExplorerFloorplanMeters, ExplorerPresence, ExplorerRoom, PresenceEntityBinding } from "../models/config";
import type { HassEntity, HomeAssistant } from "../types";
import { findRoomByReference, getRoomPresenceAnchor } from "./room-awareness";

const DEFAULT_HIDDEN_STATES = ["unknown", "unavailable", "not_detected"];
const UNKNOWN_ROOM_STATES = new Set(["", "unknown", "unavailable", "none", "null"]);

function readAttribute(entity:HassEntity|undefined, attribute?:string):unknown { return entity && attribute ? entity.attributes[attribute] : undefined; }
function finiteNumber(value:unknown):number|undefined { const parsed=typeof value==="number"?value:Number(value); return Number.isFinite(parsed)?parsed:undefined; }
function normalizedNumber(value:unknown, fallback?:number):number|undefined { const parsed=finiteNumber(value); if(parsed===undefined)return fallback; return Math.min(1,Math.max(0,parsed)); }
function booleanValue(value:unknown,fallback:boolean):boolean { if(typeof value==="boolean")return value; if(typeof value==="number")return value!==0; if(typeof value==="string"){const n=value.trim().toLowerCase();if(["true","on","yes","1","home"].includes(n))return true;if(["false","off","no","0","not_home"].includes(n))return false;} return fallback; }
function stringValue(value:unknown,fallback?:string):string|undefined { return typeof value==="string"&&value.trim()?value:fallback; }
function roomReferenceValue(value:unknown):string|undefined { if(typeof value!=="string")return undefined;const n=value.trim();return UNKNOWN_ROOM_STATES.has(n.toLowerCase())?undefined:n; }

function readRoomReference(binding:PresenceEntityBinding,entity:HassEntity|undefined,hass:HomeAssistant):string|undefined {
  if(binding.room_entity){const roomEntity=hass.states[binding.room_entity];if(!roomEntity)return undefined;return roomReferenceValue(binding.room_attribute?readAttribute(roomEntity,binding.room_attribute):roomEntity.state);}
  if(!entity)return undefined;return roomReferenceValue(readAttribute(entity,binding.room_attribute??"explorer_room"));
}

function roomBounds(room:ExplorerRoom):{minX:number;minY:number;maxX:number;maxY:number}|undefined {
  if(!room.points.length)return undefined;
  const xs=room.points.map((point)=>point[0]);const ys=room.points.map((point)=>point[1]);
  return {minX:Math.min(...xs),minY:Math.min(...ys),maxX:Math.max(...xs),maxY:Math.max(...ys)};
}

function roomMeterCoordinates(room:ExplorerRoom,mx:number,my:number):{x?:number;y?:number} {
  const width=finiteNumber(room.physical_meters?.width);const height=finiteNumber(room.physical_meters?.height);const bounds=roomBounds(room);
  if(!width||!height||width<=0||height<=0||!bounds)return {};
  const localX=Math.min(1,Math.max(0,mx/width));const localY=Math.min(1,Math.max(0,my/height));
  return {x:bounds.minX+localX*(bounds.maxX-bounds.minX),y:bounds.minY+localY*(bounds.maxY-bounds.minY)};
}

function applyRoomPosition(presence:ExplorerPresence,rooms:ExplorerRoom[],roomReference?:string):ExplorerPresence {
  const room=findRoomByReference(rooms,roomReference??presence.room_id);
  if(room){const anchor=getRoomPresenceAnchor(room);return {...presence,x:anchor.x,y:anchor.y,room_id:room.id};}
  const x=normalizedNumber(presence.x);const y=normalizedNumber(presence.y);
  if(x===undefined||y===undefined)return {...presence,x,y,visible:false};
  return {...presence,x,y};
}

function entityCoordinates(presence:ExplorerPresence,binding:PresenceEntityBinding,entity:HassEntity|undefined,rooms:ExplorerRoom[],roomReference:string|undefined,floorplan?:ExplorerFloorplanMeters):{x?:number;y?:number;roomId?:string} {
  if(!entity)return {x:normalizedNumber(presence.x),y:normalizedNumber(presence.y)};
  const meterSpace=binding.coordinate_space==="meters"||binding.coordinate_space==="room_meters";
  const xAttr=binding.x_attribute??(meterSpace?"map_x":"explorer_x");
  const yAttr=binding.y_attribute??(meterSpace?"map_y":"explorer_y");
  if(binding.coordinate_space==="room_meters"){
    const mx=finiteNumber(readAttribute(entity,xAttr));const my=finiteNumber(readAttribute(entity,yAttr));
    const room=findRoomByReference(rooms,roomReference??presence.room_id);
    if(mx===undefined||my===undefined||!room)return {};
    const coords=roomMeterCoordinates(room,mx,my);return {...coords,roomId:room.id};
  }
  if(binding.coordinate_space==="meters"){
    const mx=finiteNumber(readAttribute(entity,xAttr));const my=finiteNumber(readAttribute(entity,yAttr));
    const width=finiteNumber(floorplan?.width);const height=finiteNumber(floorplan?.height);
    if(mx===undefined||my===undefined||!width||!height||width<=0||height<=0)return {};
    return {x:normalizedNumber(mx/width),y:normalizedNumber(my/height)};
  }
  return {x:normalizedNumber(readAttribute(entity,xAttr),presence.x),y:normalizedNumber(readAttribute(entity,yAttr),presence.y)};
}

export function resolvePresence(presence:ExplorerPresence,hass?:HomeAssistant,rooms:ExplorerRoom[]=[],floorplan?:ExplorerFloorplanMeters):ExplorerPresence {
  const binding=presence.entity_binding;if(!binding||!hass)return applyRoomPosition(presence,rooms);
  const entity=binding.entity?hass.states[binding.entity]:undefined;if(binding.entity&&!entity)return {...applyRoomPosition(presence,rooms),visible:false};
  const hiddenStates=binding.hidden_states??DEFAULT_HIDDEN_STATES;const hiddenByState=entity?hiddenStates.includes(entity.state):false;
  const visibleAttribute=readAttribute(entity,binding.visible_attribute);const visible=hiddenByState?false:booleanValue(visibleAttribute,presence.visible??true);
  const roomReference=readRoomReference(binding,entity,hass)??presence.room_id;
  const coords=entityCoordinates(presence,binding,entity,rooms,roomReference,floorplan);
  const resolved:ExplorerPresence={...presence,x:coords.x,y:coords.y,room_id:coords.roomId??presence.room_id,name:presence.name??stringValue(readAttribute(entity,binding.name_attribute??"friendly_name")),avatar:presence.avatar??stringValue(readAttribute(entity,binding.avatar_attribute??"entity_picture")),icon:presence.icon??(binding.icon_attribute?stringValue(readAttribute(entity,binding.icon_attribute)):undefined),color:presence.color??stringValue(readAttribute(entity,binding.color_attribute??"explorer_color")),visible};
  if(binding.coordinate_space==="room_meters")return resolved.x===undefined||resolved.y===undefined?{...resolved,visible:false}:resolved;
  return applyRoomPosition(resolved,rooms,roomReference);
}

export function resolvePresences(presences:ExplorerPresence[],hass?:HomeAssistant,rooms:ExplorerRoom[]=[],floorplan?:ExplorerFloorplanMeters):ExplorerPresence[] { return presences.map((presence)=>resolvePresence(presence,hass,rooms,floorplan)); }
