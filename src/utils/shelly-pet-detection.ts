import type { ExplorerPresence, ShellyPetDetectionConfig } from "../models/config";
import type { HassEntity } from "../types";

interface PetTrackState { targetId?:string; lastSample?:string; low:number; high:number; confirmed:boolean; }
const tracks=new Map<string,PetTrackState>();

function finite(value:unknown):number|undefined { const parsed=typeof value==="number"?value:Number(value); return Number.isFinite(parsed)?parsed:undefined; }
function positiveInteger(value:number|undefined,fallback:number):number { return Math.max(1,Math.round(finite(value)??fallback)); }
function settings(config:ShellyPetDetectionConfig) {
  const maxHeight=Math.max(.05,finite(config.max_height_m)??.75);
  return {
    heightAttribute:config.height_attribute?.trim()||"maxz",
    targetIdAttribute:config.target_id_attribute?.trim()||"target_id",
    timestampAttribute:config.timestamp_attribute?.trim()||"timestamp",
    maxHeight,
    releaseHeight:Math.max(maxHeight+.05,finite(config.release_height_m)??maxHeight+.2),
    confirmationUpdates:positiveInteger(config.confirmation_updates,3),
    releaseUpdates:positiveInteger(config.release_updates,2),
  };
}

export function resetShellyPetTracks():void { tracks.clear(); }

export function applyShellyPetDetection(presence:ExplorerPresence,entity?:HassEntity):ExplorerPresence {
  const config=presence.shelly_pet_detection;
  if(!config?.enabled||!entity)return presence;
  const cfg=settings(config),height=finite(entity.attributes[cfg.heightAttribute]);
  if(height===undefined)return {...presence,visible:false};
  const rawTarget=entity.attributes[cfg.targetIdAttribute],targetId=rawTarget===undefined?entity.entity_id:String(rawTarget);
  const timestamp=entity.attributes[cfg.timestampAttribute],sample=timestamp===undefined?`${targetId}:${height}:${entity.attributes.x??""}:${entity.attributes.y??""}`:`${targetId}:${String(timestamp)}`;
  let track=tracks.get(presence.id);
  if(!track||track.targetId!==targetId){track={targetId,low:0,high:0,confirmed:false};tracks.set(presence.id,track);}
  if(track.lastSample===sample)return {...presence,type:"pet",visible:presence.visible!==false&&track.confirmed};
  track.lastSample=sample;
  if(height<=cfg.maxHeight){track.low+=1;track.high=0;if(track.low>=cfg.confirmationUpdates)track.confirmed=true;}
  else if(height>=cfg.releaseHeight){track.high+=1;track.low=0;if(track.high>=cfg.releaseUpdates)track.confirmed=false;}
  else { track.low=0;track.high=0; }
  return {...presence,type:"pet",visible:presence.visible!==false&&track.confirmed};
}
