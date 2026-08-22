import { css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ExplorerRoomMagicCanvas } from "./explorer-room-magic-canvas";
import type { ExplorerOpening } from "../models/config";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NS="http://www.w3.org/2000/svg";
const DEFAULT_OPEN_STATES=["on","open","opened","true"];
const OPENING_WATCH_MS=10*60*1000;
const OPENING_WARNING_MS=30*60*1000;
const OPENING_ALERT_MS=60*60*1000;
const OPENING_REFRESH_MS=60*1000;
const rad=(degrees:number)=>degrees*Math.PI/180;

type OpeningAgeLevel="fresh"|"watch"|"warning"|"alert";
interface OpeningAgeInfo{minutes:number;level:OpeningAgeLevel;label:string;description:string;}

@customElement("explorer-openings-canvas")
export class ExplorerOpeningsCanvas extends ExplorerRoomMagicCanvas{
  @property({attribute:false}) public openings:ExplorerOpening[]=[];
  private readonly openingFirstSeenOpenAt=new Map<string,number>();
  private openingAgeTimer?:number;

  protected override updated(changed:Map<PropertyKey,unknown>):void{
    super.updated(changed);
    if(changed.has("openings")||changed.has("hass")||changed.has("theme"))this.syncOpenings();
  }

  disconnectedCallback():void{
    super.disconnectedCallback();
    if(this.openingAgeTimer!==undefined)window.clearTimeout(this.openingAgeTimer);
    this.openingAgeTimer=undefined;
  }

  private isOpen(opening:ExplorerOpening):boolean{
    const binding=opening.state_binding;if(!binding)return false;
    const state=this.hass?.states[binding.entity]?.state?.toLowerCase();
    if(!state)return false;
    return (binding.open_states??DEFAULT_OPEN_STATES).map(value=>value.toLowerCase()).includes(state);
  }

  private openingOpenSince(opening:ExplorerOpening,open:boolean):number|undefined{
    if(!open||!opening.state_binding){this.openingFirstSeenOpenAt.delete(opening.id);return undefined;}
    const entity=this.hass?.states[opening.state_binding.entity] as ({last_changed?:string}|undefined);
    const parsed=entity?.last_changed?Date.parse(entity.last_changed):NaN;
    if(Number.isFinite(parsed)){
      this.openingFirstSeenOpenAt.set(opening.id,parsed);
      return parsed;
    }
    const existing=this.openingFirstSeenOpenAt.get(opening.id);
    if(existing!==undefined)return existing;
    const now=Date.now();this.openingFirstSeenOpenAt.set(opening.id,now);return now;
  }

  private openingAgeInfo(opening:ExplorerOpening,open:boolean,now=Date.now()):OpeningAgeInfo|undefined{
    const since=this.openingOpenSince(opening,open);if(since===undefined)return undefined;
    const ageMs=Math.max(0,now-since),minutes=Math.floor(ageMs/60000);
    const level:OpeningAgeLevel=ageMs>=OPENING_ALERT_MS?"alert":ageMs>=OPENING_WARNING_MS?"warning":ageMs>=OPENING_WATCH_MS?"watch":"fresh";
    const hours=Math.floor(minutes/60),rest=minutes%60;
    const description=hours>0?`åben i ${hours} t${rest?` ${rest} min`:""}`:`åben i ${minutes} min`;
    const label=level==="fresh"?"":hours>0?(rest?`${hours}t ${rest}m`:`${hours}t`):`${minutes}m`;
    return{minutes,level,label,description};
  }

  private scheduleOpeningAgeRefresh(now:number):void{
    if(this.openingAgeTimer!==undefined)window.clearTimeout(this.openingAgeTimer);
    let delay=Infinity;
    for(const opening of this.openings.filter(o=>o.visible!==false)){
      const open=this.isOpen(opening),since=this.openingOpenSince(opening,open);if(since===undefined)continue;
      const age=Math.max(0,now-since);
      const nextBoundary=age<OPENING_WATCH_MS?OPENING_WATCH_MS:age<OPENING_WARNING_MS?OPENING_WARNING_MS:age<OPENING_ALERT_MS?OPENING_ALERT_MS:undefined;
      const boundaryDelay=nextBoundary===undefined?OPENING_REFRESH_MS:Math.max(1000,nextBoundary-age+50);
      delay=Math.min(delay,OPENING_REFRESH_MS,boundaryDelay);
    }
    if(!Number.isFinite(delay))return;
    this.openingAgeTimer=window.setTimeout(()=>{this.openingAgeTimer=undefined;this.syncOpenings();},Math.max(1000,delay));
  }

  private syncOpenings():void{
    const scene=this.renderRoot.querySelector<SVGGElement>("g.scene");if(!scene)return;
    scene.querySelector<SVGGElement>(":scope > g.dynamic-openings-scene")?.remove();
    const visible=this.openings.filter(o=>o.visible!==false);if(!visible.length){this.scheduleOpeningAgeRefresh(Date.now());return;}
    const layer=document.createElementNS(SVG_NS,"g");layer.setAttribute("class","dynamic-openings-scene");layer.setAttribute("aria-label","Dynamiske døre og vinduer");layer.setAttribute("pointer-events","none");
    const now=Date.now();
    for(const opening of visible){opening.kind==="window"?this.drawWindow(layer,opening,now):this.drawDoor(layer,opening,now);}
    const presences=scene.querySelector<SVGGElement>(":scope > g.presences-scene");scene.insertBefore(layer,presences??null);
    this.scheduleOpeningAgeRefresh(now);
  }

  private line(parent:SVGElement,x1:number,y1:number,x2:number,y2:number,className:string):SVGLineElement{
    const line=document.createElementNS(SVG_NS,"line");line.setAttribute("x1",String(x1));line.setAttribute("y1",String(y1));line.setAttribute("x2",String(x2));line.setAttribute("y2",String(y2));line.setAttribute("class",className);parent.appendChild(line);return line;
  }

  private appendAgeIndicator(group:SVGGElement,x:number,y:number,age?:OpeningAgeInfo):void{
    if(!age||age.level==="fresh")return;
    const indicator=document.createElementNS(SVG_NS,"g");indicator.setAttribute("class",`opening-age-indicator level-${age.level}`);indicator.setAttribute("transform",`translate(${x} ${y})`);
    const ring=document.createElementNS(SVG_NS,"circle");ring.setAttribute("r",age.level==="alert"?"12":"10");ring.setAttribute("class","opening-age-ring");indicator.appendChild(ring);
    const width=Math.max(28,age.label.length*7+10),badge=document.createElementNS(SVG_NS,"rect");badge.setAttribute("x","11");badge.setAttribute("y","-18");badge.setAttribute("width",String(width));badge.setAttribute("height","17");badge.setAttribute("rx","8.5");badge.setAttribute("class","opening-age-badge");indicator.appendChild(badge);
    const text=document.createElementNS(SVG_NS,"text");text.setAttribute("x",String(11+width/2));text.setAttribute("y","-9.3");text.setAttribute("text-anchor","middle");text.setAttribute("dominant-baseline","central");text.setAttribute("class","opening-age-label");text.textContent=age.label;indicator.appendChild(text);group.appendChild(indicator);
  }

  private drawDoor(layer:SVGGElement,opening:ExplorerOpening,now:number):void{
    const open=this.isOpen(opening),age=this.openingAgeInfo(opening,open,now),length=Math.max(28,(opening.length??.055)*VIEWBOX_SIZE),angle=opening.angle??0,openAngle=opening.open_angle??82,hinge=opening.hinge??"start",swing=opening.swing??"left";
    const cx=opening.point[0]*VIEWBOX_SIZE,cy=opening.point[1]*VIEWBOX_SIZE,half=length/2,a=rad(angle),ux=Math.cos(a),uy=Math.sin(a),px=-uy,py=ux;
    const start={x:cx-ux*half,y:cy-uy*half},end={x:cx+ux*half,y:cy+uy*half};
    const hingePoint=hinge==="start"?start:end,farPoint=hinge==="start"?end:start;
    const closedLeafAngle=angle+(hinge==="start"?0:180),signed=(swing==="left"?-1:1)*(hinge==="start"?1:-1),leafAngle=closedLeafAngle+(open?signed*openAngle:0),leafA=rad(leafAngle);
    const leafEnd={x:hingePoint.x+Math.cos(leafA)*length,y:hingePoint.y+Math.sin(leafA)*length};
    const ageClass=age?` open-age-${age.level}`:"";
    const g=document.createElementNS(SVG_NS,"g");g.setAttribute("class",`dynamic-opening door ${open?"is-open":"is-closed"}${ageClass}`);g.setAttribute("data-opening-id",opening.id);if(age)g.setAttribute("data-open-minutes",String(age.minutes));

    this.line(g,start.x,start.y,end.x,end.y,"opening-gap");
    const jambDepth=Math.max(7,Math.min(12,length*.12));
    for(const point of [start,end])this.line(g,point.x-px*jambDepth/2,point.y-py*jambDepth/2,point.x+px*jambDepth/2,point.y+py*jambDepth/2,"door-jamb");
    if(open)this.line(g,hingePoint.x,hingePoint.y,farPoint.x,farPoint.y,"door-closed-guide");
    this.line(g,hingePoint.x,hingePoint.y,leafEnd.x,leafEnd.y,"door-leaf");

    const hingeDot=document.createElementNS(SVG_NS,"circle");hingeDot.setAttribute("cx",String(hingePoint.x));hingeDot.setAttribute("cy",String(hingePoint.y));hingeDot.setAttribute("r","4.2");hingeDot.setAttribute("class","opening-hinge");g.appendChild(hingeDot);

    if(open){
      const arc=document.createElementNS(SVG_NS,"path"),startA=rad(closedLeafAngle),endA=leafA,sx=hingePoint.x+Math.cos(startA)*length,sy=hingePoint.y+Math.sin(startA)*length,ex=hingePoint.x+Math.cos(endA)*length,ey=hingePoint.y+Math.sin(endA)*length,sweep=signed>0?1:0,largeArc=Math.abs(openAngle)>180?1:0;
      arc.setAttribute("d",`M ${sx} ${sy} A ${length} ${length} 0 ${largeArc} ${sweep} ${ex} ${ey}`);arc.setAttribute("class","door-swing");g.appendChild(arc);
    }

    const statusX=cx+px*14,statusY=cy+py*14,status=document.createElementNS(SVG_NS,"circle");status.setAttribute("cx",String(statusX));status.setAttribute("cy",String(statusY));status.setAttribute("r","5.2");status.setAttribute("class","opening-status-dot");g.appendChild(status);this.appendAgeIndicator(g,statusX,statusY,age);
    const title=document.createElementNS(SVG_NS,"title");title.textContent=`${opening.name??opening.id} · ${open?"åben":"lukket"}${age?` · ${age.description}`:""}${opening.state_binding?` · ${opening.state_binding.entity}`:" · ingen entity"}`;g.appendChild(title);layer.appendChild(g);
  }

  private drawWindow(layer:SVGGElement,opening:ExplorerOpening,now:number):void{
    const open=this.isOpen(opening),age=this.openingAgeInfo(opening,open,now),length=Math.max(26,(opening.length??.05)*VIEWBOX_SIZE),angle=opening.angle??0,cx=opening.point[0]*VIEWBOX_SIZE,cy=opening.point[1]*VIEWBOX_SIZE,a=rad(angle),ux=Math.cos(a),uy=Math.sin(a),px=-uy,py=ux,half=length/2,offset=5.5;
    const start={x:cx-ux*half,y:cy-uy*half},end={x:cx+ux*half,y:cy+uy*half};
    const ageClass=age?` open-age-${age.level}`:"";
    const g=document.createElementNS(SVG_NS,"g");g.setAttribute("class",`dynamic-opening window ${open?"is-open":"is-closed"}${ageClass}`);g.setAttribute("data-opening-id",opening.id);if(age)g.setAttribute("data-open-minutes",String(age.minutes));

    this.line(g,start.x,start.y,end.x,end.y,"window-gap");
    this.line(g,start.x+px*offset,start.y+py*offset,end.x+px*offset,end.y+py*offset,"window-pane");
    this.line(g,start.x-px*offset,start.y-py*offset,end.x-px*offset,end.y-py*offset,"window-pane");
    this.line(g,start.x+px*offset,start.y+py*offset,start.x-px*offset,start.y-py*offset,"window-frame-end");
    this.line(g,end.x+px*offset,end.y+py*offset,end.x-px*offset,end.y-py*offset,"window-frame-end");

    if(open){
      const sashOffset=18;
      this.line(g,start.x+px*offset,start.y+py*offset,cx+ux*half*.12+px*sashOffset,cy+uy*half*.12+py*sashOffset,"window-open-sash");
      this.line(g,cx+ux*half*.12+px*sashOffset,cy+uy*half*.12+py*sashOffset,end.x+px*offset,end.y+py*offset,"window-open-sash");
    }

    const statusX=cx+px*17,statusY=cy+py*17,status=document.createElementNS(SVG_NS,"circle");status.setAttribute("cx",String(statusX));status.setAttribute("cy",String(statusY));status.setAttribute("r","5.2");status.setAttribute("class","opening-status-dot");g.appendChild(status);this.appendAgeIndicator(g,statusX,statusY,age);
    const title=document.createElementNS(SVG_NS,"title");title.textContent=`${opening.name??opening.id} · vindue ${open?"åbent":"lukket"}${age?` · ${age.description}`:""}${opening.state_binding?` · ${opening.state_binding.entity}`:" · ingen entity"}`;g.appendChild(title);layer.appendChild(g);
  }

  static override styles=css`${ExplorerRoomMagicCanvas.styles}
    .dynamic-openings-scene .opening-gap,.dynamic-openings-scene .window-gap{stroke:var(--secondary-text-color,#667085);stroke-width:8;stroke-opacity:.16;vector-effect:non-scaling-stroke;stroke-linecap:butt}
    .dynamic-openings-scene .door-jamb,.dynamic-openings-scene .window-frame-end{stroke:var(--primary-text-color,#1f2937);stroke-width:3.4;vector-effect:non-scaling-stroke;stroke-linecap:round}
    .dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane,.dynamic-openings-scene .window-open-sash{stroke:var(--primary-text-color,#1f2937);stroke-width:4;vector-effect:non-scaling-stroke;stroke-linecap:round;transition:stroke 220ms ease,opacity 220ms ease,filter 320ms ease}
    .dynamic-openings-scene .door-closed-guide{stroke:var(--secondary-text-color,#667085);stroke-width:2;stroke-opacity:.25;stroke-dasharray:5 6;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .opening-hinge{fill:var(--primary-text-color,#1f2937);stroke:var(--card-background-color,#fff);stroke-width:1.5;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .door-swing{fill:none;stroke:var(--primary-text-color,#1f2937);stroke-width:1.8;stroke-dasharray:5 7;stroke-opacity:.32;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .opening-status-dot{fill:var(--success-color,#43a047);stroke:var(--card-background-color,#fff);stroke-width:2;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .is-open .opening-status-dot{fill:var(--warning-color,#ff9800)}
    .dynamic-openings-scene .is-open .door-leaf,.dynamic-openings-scene .window.is-open .window-pane,.dynamic-openings-scene .window.is-open .window-open-sash{stroke:var(--warning-color,#ff9800)}
    .dynamic-openings-scene .window.is-open .window-pane{opacity:.55}
    .opening-age-indicator{pointer-events:none}.opening-age-ring{fill:none;stroke:var(--warning-color,#ff9800);stroke-width:2.2;stroke-opacity:.55;vector-effect:non-scaling-stroke}.opening-age-badge{fill:var(--card-background-color,#fff);fill-opacity:.92;stroke:var(--warning-color,#ff9800);stroke-width:1.5;stroke-opacity:.7;vector-effect:non-scaling-stroke}.opening-age-label{fill:var(--primary-text-color,#1f2937);font-size:10px;font-weight:800;letter-spacing:.02em}
    .dynamic-opening.open-age-watch .door-leaf,.dynamic-opening.open-age-watch .window-pane,.dynamic-opening.open-age-watch .window-open-sash{filter:drop-shadow(0 0 2px color-mix(in srgb,var(--warning-color,#ff9800) 42%,transparent))}
    .dynamic-opening.open-age-warning .door-leaf,.dynamic-opening.open-age-warning .window-pane,.dynamic-opening.open-age-warning .window-open-sash{stroke:var(--warning-color,#ff9800);filter:drop-shadow(0 0 4px color-mix(in srgb,var(--warning-color,#ff9800) 58%,transparent))}.dynamic-opening.open-age-warning .opening-status-dot{r:6.2}.dynamic-opening.open-age-warning .opening-age-ring{stroke-width:3;stroke-opacity:.78}
    .dynamic-opening.open-age-alert .door-leaf,.dynamic-opening.open-age-alert .window-pane,.dynamic-opening.open-age-alert .window-open-sash{stroke:var(--error-color,#d64545);filter:drop-shadow(0 0 5px color-mix(in srgb,var(--error-color,#d64545) 65%,transparent))}.dynamic-opening.open-age-alert .opening-status-dot{fill:var(--error-color,#d64545);r:6.8}.dynamic-opening.open-age-alert .opening-age-ring,.dynamic-opening.open-age-alert .opening-age-badge{stroke:var(--error-color,#d64545)}.dynamic-opening.open-age-alert .opening-age-ring{stroke-width:3.2;stroke-opacity:.9;animation:explorerOpeningAgePulse 2.8s ease-in-out infinite}.dynamic-opening.open-age-alert .opening-age-label{fill:var(--error-color,#d64545)}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene{mix-blend-mode:multiply;filter:sepia(.32) saturate(.68)}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .door-jamb,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window-frame-end,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .opening-hinge{stroke:#6b4a33;fill:#6b4a33}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene .is-open .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window.is-open .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window.is-open .window-open-sash{stroke:#8a5a28}
    :host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-warning .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-warning .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-warning .window-open-sash{stroke:#9b642d}
    :host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-alert .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-alert .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-alert .window-open-sash{stroke:#8b4639}
    @keyframes explorerOpeningAgePulse{0%,100%{opacity:.5;transform:scale(.92)}50%{opacity:1;transform:scale(1.16)}}
    @media(prefers-reduced-motion:reduce){.dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane,.dynamic-openings-scene .window-open-sash{transition:none}.dynamic-opening.open-age-alert .opening-age-ring{animation:none}}
  `;
}
