import type { ExplorerFloorplanMeters, ExplorerPresence, ExplorerRoom, PresenceEntityBinding, ExplorerCalibrationPoint } from "../models/config";
import type { HassEntity, HomeAssistant } from "../types";
import { findRoomByReference, getRoomPresenceAnchor } from "./room-awareness";
import { applyShellyPetDetection } from "./shelly-pet-detection";

const DEFAULT_HIDDEN_STATES=["unknown","unavailable","not_detected"];
const UNKNOWN_ROOM_STATES=new Set(["","unknown","unavailable","none","null"]);
function readAttribute(entity:HassEntity|undefined,attribute?:string):unknown{return entity&&attribute?entity.attributes[attribute]:undefined;}
function finiteNumber(value:unknown):number|undefined{const parsed=typeof value==="number"?value:Number(value);return Number.isFinite(parsed)?parsed:undefined;}
function normalizedNumber(value:unknown,fallback?:number):number|undefined{const parsed=finiteNumber(value);if(parsed===undefined)return fallback;return Math.min(1,Math.max(0,parsed));}
function booleanValue(value:unknown,fallback:boolean):boolean{if(typeof value==="boolean")return value;if(typeof value==="number")return value!==0;if(typeof value==="string"){const n=value.trim().toLowerCase();if(["true","on","yes","1","home"].includes(n))return true;if(["false","off","no","0","not_home"].includes(n))return false;}return fallback;}
function stringValue(value:unknown,fallback?:string):string|undefined{return typeof value==="string"&&value.trim()?value:fallback;}
function roomReferenceValue(value:unknown):string|undefined{if(typeof value!=="string")return undefined;const n=value.trim();return UNKNOWN_ROOM_STATES.has(n.toLowerCase())?undefined:n;}
function readRoomReference(binding:PresenceEntityBinding,entity:HassEntity|undefined,hass:HomeAssistant):string|undefined{if(binding.room_entity){const roomEntity=hass.states[binding.room_entity];if(!roomEntity)return undefined;return roomReferenceValue(binding.room_attribute?readAttribute(roomEntity,binding.room_attribute):roomEntity.state);}if(!entity)return undefined;return roomReferenceValue(readAttribute(entity,binding.room_attribute??"explorer_room"));}
function roomBounds(room:ExplorerRoom){if(!room.points.length)return undefined;const xs=room.points.map(p=>p[0]),ys=room.points.map(p=>p[1]);return{minX:Math.min(...xs),minY:Math.min(...ys),maxX:Math.max(...xs),maxY:Math.max(...ys)};}
function linearMap(value:number,a0:number,b0:number,a1:number,b1:number,fallback:number):number{const delta=b0-a0;if(Math.abs(delta)<0.000001)return fallback;return a1+((value-a0)/delta)*(b1-a1);}
function affineValue(x:number,y:number,a:ExplorerCalibrationPoint,b:ExplorerCalibrationPoint,c:ExplorerCalibrationPoint,key:"room_x"|"room_y",fallback:number):number{
  const det=a.sensor_x*(b.sensor_y-c.sensor_y)+b.sensor_x*(c.sensor_y-a.sensor_y)+c.sensor_x*(a.sensor_y-b.sensor_y);
  if(Math.abs(det)<0.000001)return fallback;
  const ta=a[key],tb=b[key],tc=c[key];
  const p=(ta*(b.sensor_y-c.sensor_y)+tb*(c.sensor_y-a.sensor_y)+tc*(a.sensor_y-b.sensor_y))/det;
  const q=(ta*(c.sensor_x-b.sensor_x)+tb*(a.sensor_x-c.sensor_x)+tc*(b.sensor_x-a.sensor_x))/det;
  const r=(ta*(b.sensor_x*c.sensor_y-c.sensor_x*b.sensor_y)+tb*(c.sensor_x*a.sensor_y-a.sensor_x*c.sensor_y)+tc*(a.sensor_x*b.sensor_y-b.sensor_x*a.sensor_y))/det;
  return p*x+q*y+r;
}
function roomMeterCoordinates(room:ExplorerRoom,mx:number,my:number):{x?:number;y?:number}{const meters=room.physical_meters,width=finiteNumber(meters?.width),height=finiteNumber(meters?.height),bounds=roomBounds(room);if(!width||!height||width<=0||height<=0||!bounds)return{};const orientedX=meters?.flip_x?width-mx:mx,orientedY=meters?.flip_y?height-my:my;let localX=Math.min(1,Math.max(0,orientedX/width)),localY=Math.min(1,Math.max(0,orientedY/height));const cal=meters?.position_calibration;if(cal?.c){localX=affineValue(orientedX,orientedY,cal.a,cal.b,cal.c,"room_x",localX);localY=affineValue(orientedX,orientedY,cal.a,cal.b,cal.c,"room_y",localY);}else if(cal){localX=linearMap(orientedX,cal.a.sensor_x,cal.b.sensor_x,cal.a.room_x,cal.b.room_x,localX);localY=linearMap(orientedY,cal.a.sensor_y,cal.b.sensor_y,cal.a.room_y,cal.b.room_y,localY);}localX=Math.min(1,Math.max(0,localX));localY=Math.min(1,Math.max(0,localY));return{x:bounds.minX+localX*(bounds.maxX-bounds.minX),y:bounds.minY+localY*(bounds.maxY-bounds.minY)};}
function applyRoomPosition(presence:ExplorerPresence,rooms:ExplorerRoom[],roomReference?:string):ExplorerPresence{const room=findRoomByReference(rooms,roomReference??presence.room_id);if(room){const anchor=getRoomPresenceAnchor(room);return{...presence,x:anchor.x,y:anchor.y,room_id:room.id};}const x=normalizedNumber(presence.x),y=normalizedNumber(presence.y);if(x===undefined||y===undefined)return{...presence,x,y,visible:false};return{...presence,x,y};}
function entityCoordinates(presence:ExplorerPresence,binding:PresenceEntityBinding,entity:HassEntity|undefined,rooms:ExplorerRoom[],roomReference:string|undefined,floorplan?:ExplorerFloorplanMeters):{x?:number;y?:number;roomId?:string}{if(!entity)return{x:normalizedNumber(presence.x),y:normalizedNumber(presence.y)};const meterSpace=binding.coordinate_space==="meters"||binding.coordinate_space==="room_meters",xAttr=binding.x_attribute??(meterSpace?"map_x":"explorer_x"),yAttr=binding.y_attribute??(meterSpace?"map_y":"explorer_y");if(binding.coordinate_space==="room_meters"){const mx=finiteNumber(readAttribute(entity,xAttr)),my=finiteNumber(readAttribute(entity,yAttr)),room=findRoomByReference(rooms,roomReference??presence.room_id);if(mx===undefined||my===undefined||!room)return{};return{...roomMeterCoordinates(room,mx,my),roomId:room.id};}if(binding.coordinate_space==="meters"){const mx=finiteNumber(readAttribute(entity,xAttr)),my=finiteNumber(readAttribute(entity,yAttr)),width=finiteNumber(floorplan?.width),height=finiteNumber(floorplan?.height);if(mx===undefined||my===undefined||!width||!height||width<=0||height<=0)return{};return{x:normalizedNumber(mx/width),y:normalizedNumber(my/height)};}return{x:normalizedNumber(readAttribute(entity,xAttr),presence.x),y:normalizedNumber(readAttribute(entity,yAttr),presence.y)};}
export function resolvePresence(presence:ExplorerPresence,hass?:HomeAssistant,rooms:ExplorerRoom[]=[],floorplan?:ExplorerFloorplanMeters):ExplorerPresence{
  const binding=presence.entity_binding;if(!binding||!hass)return applyRoomPosition(presence,rooms);
  const identityEntity=binding.entity?hass.states[binding.entity]:undefined;
  const positionEntityId=binding.position_entity??binding.entity;
  const positionEntity=positionEntityId?hass.states[positionEntityId]:undefined;
  if(binding.entity&&!identityEntity)return{...applyRoomPosition(presence,rooms),visible:false};
  if(binding.position_entity&&!positionEntity)return{...applyRoomPosition(presence,rooms),visible:false};
  const hiddenStates=binding.hidden_states??DEFAULT_HIDDEN_STATES;
  const hiddenByIdentity=identityEntity?hiddenStates.includes(identityEntity.state):false;
  const hiddenByPosition=positionEntity&&positionEntity!==identityEntity?hiddenStates.includes(positionEntity.state):false;
  const visibleAttribute=readAttribute(identityEntity,binding.visible_attribute);
  const visible=hiddenByIdentity||hiddenByPosition?false:booleanValue(visibleAttribute,presence.visible??true);
  const roomReference=readRoomReference(binding,identityEntity,hass)??presence.room_id;
  const coords=entityCoordinates(presence,binding,positionEntity,rooms,roomReference,floorplan);
  const resolved:ExplorerPresence={...presence,x:coords.x,y:coords.y,room_id:coords.roomId??presence.room_id,name:presence.name??stringValue(readAttribute(identityEntity,binding.name_attribute??"friendly_name")),avatar:presence.avatar??stringValue(readAttribute(identityEntity,binding.avatar_attribute??"entity_picture")),icon:presence.icon??(binding.icon_attribute?stringValue(readAttribute(identityEntity,binding.icon_attribute)):undefined),color:presence.color??stringValue(readAttribute(identityEntity,binding.color_attribute??"explorer_color")),visible};
  const positioned=binding.coordinate_space==="room_meters"?(resolved.x===undefined||resolved.y===undefined?{...resolved,visible:false}:resolved):applyRoomPosition(resolved,rooms,roomReference);
  return applyShellyPetDetection(positioned,positionEntity);
}
export function resolvePresences(presences:ExplorerPresence[],hass?:HomeAssistant,rooms:ExplorerRoom[]=[],floorplan?:ExplorerFloorplanMeters):ExplorerPresence[]{return presences.map(p=>resolvePresence(p,hass,rooms,floorplan));}
