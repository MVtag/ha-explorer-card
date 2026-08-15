import type { ExplorerPresence } from "../models/config";

interface Point { x:number; y:number; }
interface IdentityTrack { point:Point; target?:string; seenAt:number; }

const tracks=new Map<string,IdentityTrack>();
const MAX_CONTINUITY_DISTANCE=0.18;
const TRACK_TTL_MS=15_000;

function pointOf(p:ExplorerPresence):Point|undefined {
  return Number.isFinite(p.x)&&Number.isFinite(p.y)?{x:p.x!,y:p.y!}:undefined;
}
function distance(a:Point,b:Point):number{return Math.hypot(a.x-b.x,a.y-b.y);}
function identityKey(p:ExplorerPresence):string{return p.entity_binding?.entity??p.id;}
function targetKey(p:ExplorerPresence):string|undefined{return p.entity_binding?.position_entity;}

/**
 * Keeps named people attached to the most plausible mmWave trajectory when
 * target numbers swap. Matching is deliberately conservative: it only
 * reassigns identities when all candidates are in the same room and the
 * continuation is close enough to the identity's last known position.
 */
export function matchPresenceIdentities(presences:ExplorerPresence[],now=Date.now()):ExplorerPresence[]{
  const people=presences.filter(p=>(p.type??"person")==="person"&&p.visible!==false&&pointOf(p)&&targetKey(p));
  const others=presences.filter(p=>!people.includes(p));
  const byRoom=new Map<string,ExplorerPresence[]>();
  for(const p of people){const room=p.room_id??"__no_room__";const list=byRoom.get(room)??[];list.push(p);byRoom.set(room,list);}
  const matched:ExplorerPresence[]=[];
  for(const group of byRoom.values()){
    if(group.length<2){matched.push(...group);continue;}
    const candidates=[...group];
    const identities=[...group].sort((a,b)=>identityKey(a).localeCompare(identityKey(b)));
    const assignments=new Map<string,ExplorerPresence>();
    const used=new Set<ExplorerPresence>();
    for(const identity of identities){
      const track=tracks.get(identityKey(identity));
      if(!track||now-track.seenAt>TRACK_TTL_MS)continue;
      let best:ExplorerPresence|undefined,bestDistance=Infinity;
      for(const candidate of candidates){if(used.has(candidate))continue;const point=pointOf(candidate)!;const d=distance(track.point,point);if(d<bestDistance){bestDistance=d;best=candidate;}}
      if(best&&bestDistance<=MAX_CONTINUITY_DISTANCE){assignments.set(identityKey(identity),best);used.add(best);}
    }
    for(const identity of identities){
      const key=identityKey(identity);let source=assignments.get(key);
      if(!source){source=candidates.find(c=>!used.has(c)&&targetKey(c)===targetKey(identity))??candidates.find(c=>!used.has(c));if(source)used.add(source);}
      if(!source){matched.push(identity);continue;}
      const result:ExplorerPresence={...identity,x:source.x,y:source.y,room_id:source.room_id,visible:source.visible};
      matched.push(result);const point=pointOf(result);if(point)tracks.set(key,{point,target:targetKey(source),seenAt:now});
    }
  }
  for(const p of matched){const point=pointOf(p);if(point)tracks.set(identityKey(p),{point,target:targetKey(p),seenAt:now});}
  return [...matched,...others];
}

export function resetIdentityTracks():void{tracks.clear();}
