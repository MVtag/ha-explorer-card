import type { ExplorerPresence } from "../models/config";

interface Point { x:number; y:number; }
interface IdentityTrack { point:Point; previous?:Point; target?:string; seenAt:number; }
interface CandidateScore { candidate:ExplorerPresence; score:number; distance:number; }

const tracks=new Map<string,IdentityTrack>();
const MAX_CONTINUITY_DISTANCE=0.22;
const MAX_PREDICTED_DISTANCE=0.16;
const TRACK_TTL_MS=30_000;
const TARGET_STICKINESS_BONUS=0.025;
const AMBIGUITY_MARGIN=0.018;

function pointOf(p:ExplorerPresence):Point|undefined{return Number.isFinite(p.x)&&Number.isFinite(p.y)?{x:p.x!,y:p.y!}:undefined;}
function distance(a:Point,b:Point):number{return Math.hypot(a.x-b.x,a.y-b.y);}
function identityKey(p:ExplorerPresence):string{return p.entity_binding?.entity??p.id;}
function targetKey(p:ExplorerPresence):string|undefined{return p.entity_binding?.position_entity;}
function predictedPoint(track:IdentityTrack):Point{
  if(!track.previous)return track.point;
  return{x:track.point.x+(track.point.x-track.previous.x),y:track.point.y+(track.point.y-track.previous.y)};
}
function scoreCandidate(track:IdentityTrack,candidate:ExplorerPresence):CandidateScore{
  const point=pointOf(candidate)!;
  const direct=distance(track.point,point);
  const predicted=distance(predictedPoint(track),point);
  const stickiness=track.target&&track.target===targetKey(candidate)?TARGET_STICKINESS_BONUS:0;
  return{candidate,distance:direct,score:Math.min(direct,predicted*.82)-stickiness};
}
function remember(identity:ExplorerPresence,source:ExplorerPresence,now:number):void{
  const key=identityKey(identity),point=pointOf(source);if(!point)return;
  const old=tracks.get(key);tracks.set(key,{point,previous:old?.point,target:targetKey(source),seenAt:now});
}

/**
 * Conservative continuity matcher for anonymous mmWave targets.
 * It combines last position, short-term movement direction and a small target
 * stickiness bonus. Ambiguous crossings are intentionally left on the current
 * target rather than forcing a risky identity swap. Tracks survive brief
 * target dropouts so a returning target can reconnect to the same person.
 */
export function matchPresenceIdentities(presences:ExplorerPresence[],now=Date.now()):ExplorerPresence[]{
  for(const [key,track] of tracks)if(now-track.seenAt>TRACK_TTL_MS)tracks.delete(key);
  const people=presences.filter(p=>(p.type??"person")==="person"&&p.visible!==false&&pointOf(p)&&targetKey(p));
  const peopleSet=new Set(people),others=presences.filter(p=>!peopleSet.has(p));
  const byRoom=new Map<string,ExplorerPresence[]>();
  for(const p of people){const room=p.room_id??"__no_room__",list=byRoom.get(room)??[];list.push(p);byRoom.set(room,list);}
  const matched:ExplorerPresence[]=[];
  for(const group of byRoom.values()){
    if(group.length<2){for(const p of group){matched.push(p);remember(p,p,now);}continue;}
    const candidates=[...group],identities=[...group].sort((a,b)=>identityKey(a).localeCompare(identityKey(b)));
    const assignments=new Map<string,ExplorerPresence>(),used=new Set<ExplorerPresence>();
    const ranked=identities.map(identity=>{
      const track=tracks.get(identityKey(identity));
      if(!track)return{identity,track:undefined,scores:[] as CandidateScore[]};
      const scores=candidates.map(candidate=>scoreCandidate(track,candidate)).sort((a,b)=>a.score-b.score);
      return{identity,track,scores};
    }).sort((a,b)=>(a.scores[0]?.score??Infinity)-(b.scores[0]?.score??Infinity));
    for(const entry of ranked){
      const {identity,track}=entry;if(!track)continue;
      const available=entry.scores.filter(item=>!used.has(item.candidate));if(!available.length)continue;
      const best=available[0],second=available[1];
      const closeEnough=best.distance<=MAX_CONTINUITY_DISTANCE||distance(predictedPoint(track),pointOf(best.candidate)!)<=MAX_PREDICTED_DISTANCE;
      const ambiguous=!!second&&second.score-best.score<AMBIGUITY_MARGIN;
      if(closeEnough&&!ambiguous){assignments.set(identityKey(identity),best.candidate);used.add(best.candidate);}
    }
    for(const identity of identities){
      const key=identityKey(identity);let source=assignments.get(key);
      if(!source){source=candidates.find(c=>!used.has(c)&&targetKey(c)===targetKey(identity));if(source)used.add(source);}
      if(!source){source=candidates.find(c=>!used.has(c));if(source)used.add(source);}
      if(!source){matched.push(identity);continue;}
      const result:ExplorerPresence={...identity,x:source.x,y:source.y,room_id:source.room_id,visible:source.visible};
      matched.push(result);remember(identity,source,now);
    }
  }
  return [...matched,...others];
}

export function resetIdentityTracks():void{tracks.clear();}
