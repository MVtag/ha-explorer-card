import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig, ExplorerTheme } from "../models/config";

const THEMES: Array<{
  value: ExplorerTheme;
  label: string;
  description: string;
}> = [
  {
    value: "classic",
    label: "Classic",
    description: "Den neutrale Home Assistant Explorer-stil.",
  },
  {
    value: "enchanted_antique",
    label: "Enchanted Antique Map",
    description: "Original magisk kortstil med pergament, sepia-blæk og levende kortdetaljer.",
  },
];

@customElement("ha-explorer-theme-editor")
export class HaExplorerThemeEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  private get theme(): ExplorerTheme {
    return this.config?.appearance?.theme ?? "classic";
  }

  private updateTheme(theme: ExplorerTheme): void {
    if (!this.config) return;
    const config: ExplorerCardConfig = {
      ...this.config,
      appearance: {
        ...(this.config.appearance ?? {}),
        theme,
      },
    };
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  protected render() {
    if (!this.config) return nothing;
    const selected = THEMES.find((theme) => theme.value === this.theme) ?? THEMES[0];

    return html`
      <section class="theme-editor">
        <div class="heading">
          <div>
            <span>Appearance</span>
            <h3>Kortets visuelle stil</h3>
          </div>
          <b>v0.22</b>
        </div>

        <div class="instruction">
          Temaet ændrer kun udseendet. Rum, personer, routing, døre og Home Assistant-bindinger bevares uændret.
        </div>

        <label>
          Tema
          <select
            .value=${this.theme}
            @change=${(event: Event) =>
              this.updateTheme((event.target as HTMLSelectElement).value as ExplorerTheme)}
          >
            ${THEMES.map((theme) => html`
              <option value=${theme.value}>${theme.label}</option>
            `)}
          </select>
          <small>${selected.description}</small>
        </label>

        <div class=${`preview ${this.theme}`} aria-label="Tema preview">
          <div class="preview-paper">
            <span class="ornament">N</span>
            <div class="preview-room room-a">Køkken</div>
            <div class="preview-room room-b">Stue</div>
            <div class="preview-route"></div>
            <div class="preview-step step-a"></div>
            <div class="preview-step step-b"></div>
            <div class="preview-step step-c"></div>
            <div class="preview-glow"></div>
          </div>
        </div>

        ${this.theme === "enchanted_antique" ? html`
          <div class="feature-grid">
            <span>✦ Pergament & papirkorn</span>
            <span>✦ Sepia / blæk-linjer</span>
            <span>✦ Kort-stilede labels</span>
            <span>✦ Blækagtige fodspor</span>
            <span>✦ Varm room glow</span>
            <span>✦ Original kompasrose</span>
          </div>
          <div class="note">
            Animationer respekterer automatisk enhedens <strong>Reduced Motion</strong>-indstilling.
          </div>
        ` : nothing}
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.theme-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.note{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.88rem;line-height:1.45}label{display:grid;gap:6px;font-size:.86rem}select{width:100%;padding:10px;border:1px solid var(--divider-color);border-radius:9px;background:var(--card-background-color);color:var(--primary-text-color)}label small{color:var(--secondary-text-color)}.preview{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px}.preview-paper{position:relative;height:180px;overflow:hidden;background:var(--secondary-background-color)}.preview.classic .preview-paper{background:linear-gradient(145deg,#d8c9a7,#cdbb94)}.preview.enchanted_antique .preview-paper{background:radial-gradient(circle at 30% 22%,rgba(255,244,199,.55),transparent 34%),radial-gradient(circle at 75% 70%,rgba(105,65,32,.18),transparent 43%),linear-gradient(135deg,#d9c194,#b99058)}.preview.enchanted_antique .preview-paper::after{content:"";position:absolute;inset:0;background:repeating-radial-gradient(circle at 35% 45%,rgba(63,39,22,.05) 0 1px,transparent 1px 4px);mix-blend-mode:multiply;opacity:.5}.preview-room{position:absolute;border:2px solid;padding:12px 16px;font-weight:700}.room-a{left:12%;top:52%;width:25%;height:26%}.room-b{right:14%;top:20%;width:33%;height:34%}.classic .preview-room{border-color:#03a9f4;background:rgba(3,169,244,.12);color:#1f2937;font-family:system-ui,sans-serif}.enchanted_antique .preview-room{border-color:#63452f;background:rgba(111,72,39,.08);color:#563923;font-family:Georgia,Cambria,"Times New Roman",serif;font-style:italic;letter-spacing:.04em;box-shadow:inset 0 0 18px rgba(91,56,28,.08)}.preview-route{position:absolute;left:36%;top:54%;width:34%;height:2px;transform:rotate(-24deg);transform-origin:left center}.classic .preview-route{background:#667085}.enchanted_antique .preview-route{background:#65462f;box-shadow:0 1px 2px rgba(70,42,22,.25)}.preview-step{position:absolute;width:7px;height:13px;border-radius:50%;transform:rotate(36deg)}.step-a{left:43%;top:53%}.step-b{left:50%;top:47%}.step-c{left:57%;top:41%}.classic .preview-step{background:rgba(67,48,31,.7)}.enchanted_antique .preview-step{background:#533720;box-shadow:0 0 4px rgba(71,40,20,.25)}.preview-glow{position:absolute;left:13%;top:53%;width:28%;height:30%;border-radius:40%;filter:blur(16px);pointer-events:none}.classic .preview-glow{background:rgba(246,189,96,.2)}.enchanted_antique .preview-glow{background:rgba(239,174,68,.32)}.ornament{position:absolute;right:7%;bottom:8%;display:grid;place-items:center;width:39px;height:39px;border:1px solid;border-radius:50%;font-family:Georgia,serif;font-size:.73rem;z-index:2}.classic .ornament{color:#667085;border-color:#667085}.enchanted_antique .ornament{color:#62442d;border-color:#62442d;transform:rotate(-4deg)}.feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px 12px;padding:11px 12px;border:1px solid rgba(126,87,45,.24);border-radius:10px;background:rgba(185,144,88,.08);font-size:.82rem;color:var(--secondary-text-color)}@media(max-width:600px){.feature-grid{grid-template-columns:1fr}}
  `;
}
