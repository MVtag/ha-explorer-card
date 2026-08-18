import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig, ExplorerPetRobotTrailsConfig } from "../models/config";

@customElement("ha-explorer-pet-robot-trails-editor")
export class HaExplorerPetRobotTrailsEditor extends LitElement {
  @property({attribute:false}) public config?:ExplorerCardConfig;
  private updateTrails(patch:Partial<ExplorerPetRobotTrailsConfig>):void {
    if(!this.config)return;
    const pet_robot_trails={enabled:false,duration_minutes:3,show_pet_paws:true,show_robot_route:true,robot_direction_arrows:true,...(this.config.pet_robot_trails??{}),...patch};
    this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this.config,pet_robot_trails}},bubbles:true,composed:true}));
  }
  protected render(){
    const trails={enabled:false,duration_minutes:3,show_pet_paws:true,show_robot_route:true,robot_direction_arrows:true,...(this.config?.pet_robot_trails??{})};
    return html`<section class="panel"><div><span class="eyebrow">Pet & Robot Trails 2.0</span><h3>Poter og robotruter</h3></div>
      <p>Viser separate, udtonende spor for kæledyr og robotstøvsugere. Historikken gemmes kun midlertidigt i kortet.</p>
      <label class="toggle"><input type="checkbox" .checked=${trails.enabled} @change=${(e:Event)=>this.updateTrails({enabled:(e.target as HTMLInputElement).checked})}/><span><strong>Aktivér Pet & Robot Trails</strong><small>Påvirker kun profiler med typen Kæledyr eller Robot.</small></span></label>
      <label>Historiklængde: <strong>${trails.duration_minutes} min.</strong><input type="range" min="1" max="5" step="1" .value=${String(trails.duration_minutes)} @input=${(e:Event)=>this.updateTrails({duration_minutes:Number((e.target as HTMLInputElement).value)})}/><small>Gamle spor toner gradvist ud.</small></label>
      <div class="grid"><label class="toggle"><input type="checkbox" .checked=${trails.show_pet_paws} @change=${(e:Event)=>this.updateTrails({show_pet_paws:(e.target as HTMLInputElement).checked})}/><span><strong>Detaljerede poteaftryk</strong><small>Hvert kæledyr bruger sin egen sporfarve.</small></span></label>
      <label class="toggle"><input type="checkbox" .checked=${trails.show_robot_route} @change=${(e:Event)=>this.updateTrails({show_robot_route:(e.target as HTMLInputElement).checked})}/><span><strong>Sammenhængende robotrute</strong><small>Viser robotstøvsugerens seneste bevægelse som en linje.</small></span></label>
      <label class="toggle"><input type="checkbox" .checked=${trails.robot_direction_arrows} ?disabled=${!trails.show_robot_route} @change=${(e:Event)=>this.updateTrails({robot_direction_arrows:(e.target as HTMLInputElement).checked})}/><span><strong>Retningspile</strong><small>Markerer robotruters kørselsretning.</small></span></label></div>
    </section>`;
  }
  static styles=css`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}label{display:grid;gap:7px;font-weight:600}.grid{display:grid;gap:9px}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:10px;padding:11px;border-radius:10px;background:var(--secondary-background-color)}.toggle input{margin-top:3px}.toggle span{display:grid;gap:3px}input[type="range"]{width:100%}`;
}
