import { css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ExplorerPresencePolishCanvas } from "./explorer-presence-polish-canvas";
import type { ExplorerOpening } from "../models/config";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NS="http://www.w3.org/2000/svg";
const DEFAULT_OPEN_STATES=["on","open","opened","true"];
const rad=(degrees:number)=>degrees*Math.PI/180;

@customElement("explorer-openings-canvas")
export class ExplorerOpeningsCanvas extends ExplorerPresencePolishCanvas{
  @property({attribute:false}) public openings:ExplorerOpening[]=[];

  protected override updated(changed:Map<PropertyKey,unknown>):void{
    super.updated(changed);
    if(changed.has("openings")||changed.has("hass")||changed.has("theme"))this.syncOpenings();
  }

  private isOpen(opening:ExplorerOpening):boolean{
    const binding=opening.state_binding;if(!binding)return false;
    const state=this.hass?.states[binding.entity]?.state?.toLowerCase();
    if(!state)return false;
    return (binding.open_states??DEFAULT_OPEN_STATES).map(value=>value.toLowerCase()).includes(state);
  }

  private syncOpenings():void{
    const scene=this.renderRoot.querySelector<SVGGElement>("g.scene");if(!scene)return;
    scene.querySelector<SVGGElement>(":scope > g.dynamic-openings-scene")?.remove();
    const visible=this.openings.filter(o=>o.visible!==false);if(!visible.length)return;
    const layer=document.createElementNS(SVG_NS,"g");layer.setAttribute("class","dynamic-openings-scene");layer.setAttribute("aria-label","Dynamiske døre og vinduer");layer.setAttribute("pointer-events","none");
    for(const opening of visible){opening.kind==="window"?this.drawWindow(layer,opening):this.drawDoor(layer,opening);}
    const presences=scene.querySelector<SVGGElement>(":scope > g.presences-scene");scene.insertBefore(layer,presences??null);
  }

  private line(parent:SVGElement,x1:number,y1:number,x2:number,y2:number,className:string):SVGLineElement{
    const line=document.createElementNS(SVG_NS,"line");line.setAttribute("x1",String(x1));line.setAttribute("y1",String(y1));line.setAttribute("x2",String(x2));line.setAttribute("y2",String(y2));line.setAttribute("class",className);parent.appendChild(line);return line;
  }

  private drawDoor(layer:SVGGElement,opening:ExplorerOpening):void{
    const open=this.isOpen(opening),length=Math.max(28,(opening.length??.055)*VIEWBOX_SIZE),angle=opening.angle??0,openAngle=opening.open_angle??82,hinge=opening.hinge??"start",swing=opening.swing??"left";
    const cx=opening.point[0]*VIEWBOX_SIZE,cy=opening.point[1]*VIEWBOX_SIZE,half=length/2,a=rad(angle),ux=Math.cos(a),uy=Math.sin(a),px=-uy,py=ux;
    const start={x:cx-ux*half,y:cy-uy*half},end={x:cx+ux*half,y:cy+uy*half};
    const hingePoint=hinge==="start"?start:end,farPoint=hinge==="start"?end:start;
    const closedLeafAngle=angle+(hinge==="start"?0:180),signed=(swing==="left"?-1:1)*(hinge==="start"?1:-1),leafAngle=closedLeafAngle+(open?signed*openAngle:0),leafA=rad(leafAngle);
    const leafEnd={x:hingePoint.x+Math.cos(leafA)*length,y:hingePoint.y+Math.sin(leafA)*length};
    const g=document.createElementNS(SVG_NS,"g");g.setAttribute("class",`dynamic-opening door ${open?"is-open":"is-closed"}`);g.setAttribute("data-opening-id",opening.id);

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

    const status=document.createElementNS(SVG_NS,"circle");status.setAttribute("cx",String(cx+px*14));status.setAttribute("cy",String(cy+py*14));status.setAttribute("r","5.2");status.setAttribute("class","opening-status-dot");g.appendChild(status);
    const title=document.createElementNS(SVG_NS,"title");title.textContent=`${opening.name??opening.id} · ${open?"åben":"lukket"}${opening.state_binding?` · ${opening.state_binding.entity}`:" · ingen entity"}`;g.appendChild(title);layer.appendChild(g);
  }

  private drawWindow(layer:SVGGElement,opening:ExplorerOpening):void{
    const open=this.isOpen(opening),length=Math.max(26,(opening.length??.05)*VIEWBOX_SIZE),angle=opening.angle??0,cx=opening.point[0]*VIEWBOX_SIZE,cy=opening.point[1]*VIEWBOX_SIZE,a=rad(angle),ux=Math.cos(a),uy=Math.sin(a),px=-uy,py=ux,half=length/2,offset=5.5;
    const start={x:cx-ux*half,y:cy-uy*half},end={x:cx+ux*half,y:cy+uy*half};
    const g=document.createElementNS(SVG_NS,"g");g.setAttribute("class",`dynamic-opening window ${open?"is-open":"is-closed"}`);g.setAttribute("data-opening-id",opening.id);

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

    const status=document.createElementNS(SVG_NS,"circle");status.setAttribute("cx",String(cx+px*17));status.setAttribute("cy",String(cy+py*17));status.setAttribute("r","5.2");status.setAttribute("class","opening-status-dot");g.appendChild(status);
    const title=document.createElementNS(SVG_NS,"title");title.textContent=`${opening.name??opening.id} · vindue ${open?"åbent":"lukket"}${opening.state_binding?` · ${opening.state_binding.entity}`:" · ingen entity"}`;g.appendChild(title);layer.appendChild(g);
  }

  static override styles=css`${ExplorerPresencePolishCanvas.styles}
    .dynamic-openings-scene .opening-gap,.dynamic-openings-scene .window-gap{stroke:var(--secondary-text-color,#667085);stroke-width:8;stroke-opacity:.16;vector-effect:non-scaling-stroke;stroke-linecap:butt}
    .dynamic-openings-scene .door-jamb,.dynamic-openings-scene .window-frame-end{stroke:var(--primary-text-color,#1f2937);stroke-width:3.4;vector-effect:non-scaling-stroke;stroke-linecap:round}
    .dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane,.dynamic-openings-scene .window-open-sash{stroke:var(--primary-text-color,#1f2937);stroke-width:4;vector-effect:non-scaling-stroke;stroke-linecap:round;transition:stroke 220ms ease,opacity 220ms ease}
    .dynamic-openings-scene .door-closed-guide{stroke:var(--secondary-text-color,#667085);stroke-width:2;stroke-opacity:.25;stroke-dasharray:5 6;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .opening-hinge{fill:var(--primary-text-color,#1f2937);stroke:var(--card-background-color,#fff);stroke-width:1.5;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .door-swing{fill:none;stroke:var(--primary-text-color,#1f2937);stroke-width:1.8;stroke-dasharray:5 7;stroke-opacity:.32;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .opening-status-dot{fill:var(--success-color,#43a047);stroke:var(--card-background-color,#fff);stroke-width:2;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .is-open .opening-status-dot{fill:var(--warning-color,#ff9800)}
    .dynamic-openings-scene .is-open .door-leaf,.dynamic-openings-scene .window.is-open .window-pane,.dynamic-openings-scene .window.is-open .window-open-sash{stroke:var(--warning-color,#ff9800)}
    .dynamic-openings-scene .window.is-open .window-pane{opacity:.55}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene{mix-blend-mode:multiply;filter:sepia(.32) saturate(.68)}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .door-jamb,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window-frame-end,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .opening-hinge{stroke:#6b4a33;fill:#6b4a33}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene .is-open .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window.is-open .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window.is-open .window-open-sash{stroke:#8a5a28}
    @media(prefers-reduced-motion:reduce){.dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane,.dynamic-openings-scene .window-open-sash{transition:none}}
  `;
}
