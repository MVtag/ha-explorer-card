import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig, ExplorerMovementHistoryConfig } from "../models/config";

@customElement("ha-explorer-movement-history-editor")
export class HaExplorerMovementHistoryEditor extends LitElement {
  @property({ attribute:false }) public config?:ExplorerCardConfig;
  private updateHistory(patch:Partial<ExplorerMovementHistoryConfig>):void {
    if (!this.config) return;
    const movement_history={enabled:false,duration_minutes:3,show_rooms:true,...(this.config.movement_history??{}),...patch};
    this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this.config,movement_history}},bubbles:true,composed:true}));
  }
  protected render(){
    const history={enabled:false,duration_minutes:3,show_rooms:true,...(this.config?.movement_history??{})};
    return html`<section class="panel">
      <div><span class="eyebrow">Movement History 2.0</span><h3>Magisk bevægelseshistorik</h3></div>
      <p>Gemmer kun historikken lokalt i kortet i 1–5 minutter. Home Assistant-databasen ændres ikke, og den normale plantegning fungerer uafhængigt.</p>
      <label class="toggle"><input type="checkbox" .checked=${history.enabled} @change=${(event:Event)=>this.updateHistory({enabled:(event.target as HTMLInputElement).checked})}/><span><strong>Vis bevægelseshistorik</strong><small>Gælder personer. Kæledyr og robotter kommer i næste roadmap-del.</small></span></label>
      <label>Historiklængde: <strong>${history.duration_minutes} min.</strong><input type="range" min="1" max="5" step="1" .value=${String(history.duration_minutes)} @input=${(event:Event)=>this.updateHistory({duration_minutes:Number((event.target as HTMLInputElement).value)})}/><small>Ældre fodspor toner gradvist ud og fjernes automatisk.</small></label>
      <label class="toggle"><input type="checkbox" .checked=${history.show_rooms} @change=${(event:Event)=>this.updateHistory({show_rooms:(event.target as HTMLInputElement).checked})}/><span><strong>Fremhæv senest besøgte rum</strong><small>Rummene får et meget diskret skær i personens sporfarve.</small></span></label>
    </section>`;
  }
  static styles=css`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}label{display:grid;gap:7px;font-weight:600}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:10px;padding:11px;border-radius:10px;background:var(--secondary-background-color)}.toggle input{margin-top:3px}.toggle span{display:grid;gap:3px}input[type="range"]{width:100%}`;
}
