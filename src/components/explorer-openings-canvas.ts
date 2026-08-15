import { css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ExplorerPresencePolishCanvas } from "./explorer-presence-polish-canvas";
import type { ExplorerOpening } from "../models/config";
import { VIEWBOX_SIZE } from "../utils/viewport";

const SVG_NS="http://www.w3.org/2000/svg";
const DEFAULT_OPEN_STATES=["on","open","opened","true"];

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

  private drawDoor(layer:SVGGElement,opening:ExplorerOpening):void{
    const open=this.isOpen(opening),length=Math.max(28,(opening.length??.055)*VIEWBOX_SIZE),angle=opening.angle??0,openAngle=opening.open_angle??82,hinge=opening.hinge??"start",swing=opening.swing??"left";
    const cx=opening.point[0]*VIEWBOX_SIZE,cy=opening.point[1]*VIEWBOX_SIZE,half=length/2;
    const hingeLocal=hinge==="start"?-half:half;
    const hx=cx+Math.cos(angle*Math.PI/180)*hingeLocal,hy=cy+Math.sin(angle*Math.PI/180)*hingeLocal;
    const closedLeafAngle=angle+(hinge==="start"?0:180),signed=(swing==="left"?-1:1)*(hinge==="start"?1:-1),leafAngle=closedLeafAngle+(open?signed*openAngle:0);
    const g=document.createElementNS(SVG_NS,"g");g.setAttribute("class",`dynamic-opening door ${open?"is-open":"is-closed"}`);g.setAttribute("data-opening-id",opening.id);
    const jamb=document.createElementNS(SVG_NS,"line");jamb.setAttribute("x1",String(cx-Math.cos(angle*Math.PI/180)*half));jamb.setAttribute("y1",String(cy-Math.sin(angle*Math.PI/180)*half));jamb.setAttribute("x2",String(cx+Math.cos(angle*Math.PI/180)*half));jamb.setAttribute("y2",String(cy+Math.sin(angle*Math.PI/180)*half));jamb.setAttribute("class","opening-gap");g.appendChild(jamb);
    const leaf=document.createElementNS(SVG_NS,"line");leaf.setAttribute("x1",String(hx));leaf.setAttribute("y1",String(hy));leaf.setAttribute("x2",String(hx+Math.cos(leafAngle*Math.PI/180)*length));leaf.setAttribute("y2",String(hy+Math.sin(leafAngle*Math.PI/180)*length));leaf.setAttribute("class","door-leaf");g.appendChild(leaf);
    const hingeDot=document.createElementNS(SVG_NS,"circle");hingeDot.setAttribute("cx",String(hx));hingeDot.setAttribute("cy",String(hy));hingeDot.setAttribute("r","4.5");hingeDot.setAttribute("class","opening-hinge");g.appendChild(hingeDot);
    if(open){const arc=document.createElementNS(SVG_NS,"path"),startA=closedLeafAngle*Math.PI/180,endA=leafAngle*Math.PI/180,sx=hx+Math.cos(startA)*length,sy=hy+Math.sin(startA)*length,ex=hx+Math.cos(endA)*length,ey=hy+Math.sin(endA)*length,sweep=signed>0?1:0;arc.setAttribute("d",`M ${sx} ${sy} A ${length} ${length} 0 0 ${sweep} ${ex} ${ey}`);arc.setAttribute("class","door-swing");g.appendChild(arc);}
    const title=document.createElementNS(SVG_NS,"title");title.textContent=`${opening.name??opening.id} · ${open?"åben":"lukket"}${opening.state_binding?` · ${opening.state_binding.entity}`:""}`;g.appendChild(title);layer.appendChild(g);
  }

  private drawWindow(layer:SVGGElement,opening:ExplorerOpening):void{
    const open=this.isOpen(opening),length=Math.max(26,(opening.length??.05)*VIEWBOX_SIZE),angle=opening.angle??0,cx=opening.point[0]*VIEWBOX_SIZE,cy=opening.point[1]*VIEWBOX_SIZE,dx=Math.cos(angle*Math.PI/180)*length/2,dy=Math.sin(angle*Math.PI/180)*length/2,px=-Math.sin(angle*Math.PI/180)*5,py=Math.cos(angle*Math.PI/180)*5;
    const g=document.createElementNS(SVG_NS,"g");g.setAttribute("class",`dynamic-opening window ${open?"is-open":"is-closed"}`);g.setAttribute("data-opening-id",opening.id);
    for(const side of [-1,1]){const line=document.createElementNS(SVG_NS,"line");line.setAttribute("x1",String(cx-dx+px*side));line.setAttribute("y1",String(cy-dy+py*side));line.setAttribute("x2",String(cx+dx+px*side));line.setAttribute("y2",String(cy+dy+py*side));line.setAttribute("class","window-pane");g.appendChild(line);}
    if(open){const marker=document.createElementNS(SVG_NS,"line");marker.setAttribute("x1",String(cx-dx*.7));marker.setAttribute("y1",String(cy-dy*.7));marker.setAttribute("x2",String(cx+dx*.7+px*4));marker.setAttribute("y2",String(cy+dy*.7+py*4));marker.setAttribute("class","window-open-marker");g.appendChild(marker);}
    const title=document.createElementNS(SVG_NS,"title");title.textContent=`${opening.name??opening.id} · vindue ${open?"åbent":"lukket"}${opening.state_binding?` · ${opening.state_binding.entity}`:""}`;g.appendChild(title);layer.appendChild(g);
  }

  static override styles=css`${ExplorerPresencePolishCanvas.styles}
    .dynamic-openings-scene .opening-gap{stroke:var(--secondary-text-color,#667085);stroke-width:7;stroke-opacity:.2;vector-effect:non-scaling-stroke;stroke-linecap:round}
    .dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane{stroke:var(--primary-text-color,#1f2937);stroke-width:4;vector-effect:non-scaling-stroke;stroke-linecap:round;transition:all 420ms cubic-bezier(.2,.8,.2,1)}
    .dynamic-openings-scene .opening-hinge{fill:var(--primary-text-color,#1f2937)}
    .dynamic-openings-scene .door-swing{fill:none;stroke:var(--primary-text-color,#1f2937);stroke-width:2;stroke-dasharray:6 8;stroke-opacity:.35;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .window-open-marker{stroke:var(--warning-color,#ff9800);stroke-width:3;stroke-opacity:.85;vector-effect:non-scaling-stroke;stroke-linecap:round}
    .dynamic-openings-scene .is-open .door-leaf,.dynamic-openings-scene .window.is-open .window-pane{stroke:var(--warning-color,#ff9800)}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene{mix-blend-mode:multiply;filter:sepia(.28) saturate(.72)}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .opening-hinge{stroke:#6b4a33;fill:#6b4a33}
    @media(prefers-reduced-motion:reduce){.dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane{transition:none}}
  `;
}
