import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig } from "../models/config";
import type { HomeAssistant } from "../types";
import {
  analyzeExplorerSetup,
  type ExplorerEditorSection,
  type ExplorerSetupItem,
} from "../utils/setup-health";

const STATE_LABELS = {
  ready: "Klar",
  attention: "Tjek",
  optional: "Valgfrit",
} as const;

@customElement("ha-explorer-setup-overview")
export class HaExplorerSetupOverview extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;
  @property({ attribute: false }) public hass?: HomeAssistant;

  private navigate(target: ExplorerEditorSection): void {
    this.dispatchEvent(new CustomEvent("explorer-editor-navigate", {
      detail: { target },
      bubbles: true,
      composed: true,
    }));
  }

  private renderItem(item: ExplorerSetupItem) {
    return html`
      <button
        class="check ${item.state}"
        type="button"
        @click=${() => this.navigate(item.target)}
        title="Åbn den relevante editorsektion"
      >
        <span class="state-icon" aria-hidden="true">
          ${item.state === "ready" ? "✓" : item.state === "attention" ? "!" : "·"}
        </span>
        <span class="check-copy">
          <strong>${item.label}</strong>
          <small>${item.detail}</small>
        </span>
        <span class="state-label">${STATE_LABELS[item.state]}</span>
        <span class="chevron" aria-hidden="true">›</span>
      </button>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const summary = analyzeExplorerSetup(this.config, this.hass);
    const healthy = summary.attentionCount === 0;
    const issues = summary.entityIssues.slice(0, 4);

    return html`
      <section class="overview">
        <div class="hero">
          <div>
            <span class="eyebrow">Room Actions · v0.27.0</span>
            <h3>Opsætningsoversigt</h3>
            <p>
              ${healthy
                ? "Grundopsætningen ser klar ud. Brug punkterne herunder som genveje til de enkelte dele af kortet."
                : `${summary.attentionCount} punkt${summary.attentionCount === 1 ? "" : "er"} kræver opmærksomhed før opsætningen er helt ren.`}
            </p>
          </div>
          <div class="health ${healthy ? "healthy" : "attention"}">
            <strong>${healthy ? "Klar" : `${summary.attentionCount} tjek`}</strong>
            <small>${summary.configuredFeatureCount}/8 områder aktive</small>
          </div>
        </div>

        <div class="stats" aria-label="Explorer konfigurationsoversigt">
          <span><strong>${summary.roomCount}</strong> rum</span>
          <span><strong>${summary.presenceCount}</strong> personer/objekter</span>
          <span><strong>${summary.routeCount}</strong> routes</span>
          <span><strong>${summary.nodeCount}</strong> nodes</span>
          <span><strong>${summary.reactionCount}</strong> reaktioner</span>
          <span><strong>${summary.actionCount}</strong> handlinger</span>
          <span><strong>${summary.zoneCount}</strong> zoner</span>
        </div>

        <div class="checks">
          ${summary.items.map((item) => this.renderItem(item))}
        </div>

        ${issues.length
          ? html`
              <div class="entity-issues">
                <div class="issue-heading">
                  <strong>Live entity-status</strong>
                  <small>${summary.entityIssues.length} med opmærksomhed</small>
                </div>
                ${issues.map((issue) => html`
                  <button type="button" @click=${() => this.navigate(issue.target)}>
                    <span class=${issue.unavailable ? "temporary" : "missing"}>
                      ${issue.unavailable ? "Midlertidig" : "Mangler"}
                    </span>
                    <code>${issue.entity}</code>
                    <small>${issue.source}</small>
                    <span aria-hidden="true">›</span>
                  </button>
                `)}
                ${summary.entityIssues.length > issues.length
                  ? html`<small class="more">+ ${summary.entityIssues.length - issues.length} flere</small>`
                  : nothing}
              </div>
            `
          : nothing}

        <div class="tip">
          <strong>Tip:</strong>
          De avancerede værktøjer er nu samlet i fold-ud-sektioner. Klik på et punkt ovenfor for at hoppe direkte til den rigtige editor.
        </div>
      </section>
    `;
  }

  static styles = css`
    :host { display:block; }
    .overview {
      display:grid;
      gap:14px;
      margin-bottom:12px;
      padding:16px;
      border:1px solid var(--divider-color);
      border-radius:14px;
      background:var(--card-background-color);
    }
    .hero { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; }
    .hero > div:first-child { display:grid; gap:4px; }
    .eyebrow { color:var(--secondary-text-color); font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; }
    h3 { margin:0; font-size:1.08rem; }
    p { margin:2px 0 0; max-width:62ch; color:var(--secondary-text-color); font-size:.86rem; line-height:1.45; }
    .health { flex:0 0 auto; display:grid; justify-items:end; gap:2px; padding:9px 11px; border-radius:10px; }
    .health strong { font-size:.9rem; }
    .health small { font-size:.72rem; opacity:.78; }
    .health.healthy { color:var(--success-color,#2e7d32); background:color-mix(in srgb,var(--success-color,#43a047) 12%,transparent); }
    .health.attention { color:var(--warning-color,#b26a00); background:color-mix(in srgb,var(--warning-color,#ff9800) 14%,transparent); }
    .stats { display:flex; flex-wrap:wrap; gap:7px; }
    .stats span { padding:5px 8px; border-radius:999px; background:var(--secondary-background-color); color:var(--secondary-text-color); font-size:.76rem; }
    .stats strong { color:var(--primary-text-color); }
    .checks { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
    .check {
      display:grid;
      grid-template-columns:auto minmax(0,1fr) auto auto;
      align-items:center;
      gap:9px;
      width:100%;
      padding:10px;
      border:1px solid var(--divider-color);
      border-radius:10px;
      color:var(--primary-text-color);
      background:var(--secondary-background-color);
      text-align:left;
      font:inherit;
      cursor:pointer;
    }
    .check:hover { border-color:var(--primary-color,#03a9f4); }
    .state-icon { display:grid; place-items:center; width:24px; height:24px; border-radius:50%; font-weight:800; }
    .ready .state-icon { color:var(--success-color,#43a047); background:color-mix(in srgb,var(--success-color,#43a047) 14%,transparent); }
    .attention .state-icon { color:var(--warning-color,#f57c00); background:color-mix(in srgb,var(--warning-color,#ff9800) 16%,transparent); }
    .optional .state-icon { color:var(--secondary-text-color); background:var(--card-background-color); }
    .check-copy { display:grid; gap:2px; min-width:0; }
    .check-copy strong { font-size:.84rem; }
    .check-copy small { overflow:hidden; color:var(--secondary-text-color); font-size:.74rem; line-height:1.3; text-overflow:ellipsis; }
    .state-label { padding:3px 6px; border-radius:999px; color:var(--secondary-text-color); background:var(--card-background-color); font-size:.68rem; white-space:nowrap; }
    .chevron { color:var(--secondary-text-color); font-size:1.15rem; }
    .entity-issues { display:grid; gap:6px; padding:10px; border-radius:10px; background:var(--secondary-background-color); }
    .issue-heading { display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .issue-heading strong { font-size:.82rem; }
    .issue-heading small, .more { color:var(--secondary-text-color); font-size:.72rem; }
    .entity-issues button { display:grid; grid-template-columns:auto minmax(0,1fr) minmax(0,.8fr) auto; align-items:center; gap:8px; padding:7px 8px; border:0; border-radius:8px; color:var(--primary-text-color); background:var(--card-background-color); text-align:left; cursor:pointer; }
    .entity-issues button:hover { outline:1px solid var(--primary-color,#03a9f4); }
    .entity-issues code { overflow:hidden; text-overflow:ellipsis; font-size:.75rem; }
    .entity-issues button small { overflow:hidden; color:var(--secondary-text-color); font-size:.72rem; text-overflow:ellipsis; white-space:nowrap; }
    .missing, .temporary { padding:3px 5px; border-radius:999px; font-size:.65rem; font-weight:700; }
    .missing { color:var(--error-color,#c62828); background:color-mix(in srgb,var(--error-color,#db4437) 12%,transparent); }
    .temporary { color:var(--warning-color,#b26a00); background:color-mix(in srgb,var(--warning-color,#ff9800) 12%,transparent); }
    .tip { padding:9px 10px; border-radius:9px; color:var(--secondary-text-color); background:color-mix(in srgb,var(--primary-color,#03a9f4) 7%,transparent); font-size:.78rem; line-height:1.4; }
    .tip strong { color:var(--primary-text-color); }

    @media (max-width:700px) {
      .hero { align-items:stretch; flex-direction:column; }
      .health { justify-items:start; }
      .checks { grid-template-columns:1fr; }
      .entity-issues button { grid-template-columns:auto minmax(0,1fr) auto; }
      .entity-issues button small { grid-column:2; }
    }
  `;
}
