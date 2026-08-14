import { css, html, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig } from "../models/config";
import type { ExplorerEditorSection } from "../utils/setup-health";
import { HaExplorerCardEditor } from "./explorer-config-editor";
import { HaExplorerRoomDrawingEditor } from "./explorer-room-drawing-editor";
import "./explorer-setup-overview";
import "./explorer-theme-editor";
import "./explorer-presence-polish-editor";
import "./explorer-zones-editor";
import "./explorer-room-reactions-editor";
import "./explorer-room-actions-editor";
import "./explorer-route-editor";
import "./explorer-route-graph-editor";
import "./explorer-route-diagnostics";

type ConfigChangedEvent = Event & {
  detail: { config: ExplorerCardConfig };
};

type EditorNavigateEvent = CustomEvent<{ target?: ExplorerEditorSection }>;

const BASE_SECTION_INDEX: Partial<Record<ExplorerEditorSection, number>> = {
  basic: 0,
  rooms: 1,
  presences: 2,
};

/** Drawing-only adapter around the existing room drawing editor. */
@customElement("ha-explorer-room-tools")
class HaExplorerRoomTools extends HaExplorerRoomDrawingEditor {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has("config") && this.config) this.setConfig(this.config);
  }

  protected override render(): TemplateResult<1> {
    return (
      this as unknown as {
        renderRoomDrawingEditor: () => TemplateResult<1>;
      }
    ).renderRoomDrawingEditor();
  }
}

@customElement("ha-explorer-ha-editor")
export class HaExplorerHaEditor extends HaExplorerCardEditor {
  private get currentConfig(): ExplorerCardConfig | undefined {
    return (this as unknown as { config?: ExplorerCardConfig }).config;
  }

  private emitHomeAssistantConfig(config: ExplorerCardConfig): boolean {
    const homeAssistantEvent = new Event("config-changed", {
      bubbles: true,
      composed: true,
    }) as ConfigChangedEvent;
    homeAssistantEvent.detail = { config };
    return super.dispatchEvent(homeAssistantEvent);
  }

  private readonly handleNativeControlChange = (event: Event): void => {
    event.stopPropagation();
    queueMicrotask(() => {
      const config = this.currentConfig;
      if (config) this.emitHomeAssistantConfig(config);
    });
  };

  private readonly handleItemCardClick = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (!target || target.closest("button, input, select, textarea, a")) return;
    const heading = target.closest<HTMLElement>(".item-heading");
    const card = heading?.closest<HTMLElement>(".item-card");
    if (!heading || !card) return;
    card.classList.toggle("item-open");
  };

  protected override firstUpdated(): void {
    this.renderRoot.addEventListener("change", this.handleNativeControlChange);
    this.renderRoot.addEventListener("click", this.handleItemCardClick);

    // v0.25.3: every editor section starts collapsed. Setup-overview shortcuts
    // can still open the requested section automatically.
    queueMicrotask(() => {
      this.baseSections.forEach((section) => (section.open = false));
    });
  }

  public override disconnectedCallback(): void {
    this.renderRoot.removeEventListener("change", this.handleNativeControlChange);
    this.renderRoot.removeEventListener("click", this.handleItemCardClick);
    super.disconnectedCallback();
  }

  private get baseSections(): HTMLDetailsElement[] {
    const editor = this.renderRoot.querySelector<HTMLElement>(".editor");
    return editor ? Array.from(editor.querySelectorAll<HTMLDetailsElement>(":scope > details")) : [];
  }

  private handleToolConfigChanged(event: Event): void {
    const config = (event as CustomEvent<{ config?: ExplorerCardConfig }>).detail?.config;
    if (!config) return;
    event.stopPropagation();
    this.setConfig(config);
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  private handleEditorNavigate(event: EditorNavigateEvent): void {
    const target = event.detail?.target;
    if (!target) return;
    event.stopPropagation();

    const baseIndex = BASE_SECTION_INDEX[target];
    let element: HTMLElement | undefined;

    if (baseIndex !== undefined) {
      const section = this.baseSections[baseIndex];
      if (section) {
        section.open = true;
        element = section;
      }
    } else {
      const section = this.renderRoot.querySelector<HTMLDetailsElement>(
        `details[data-editor-section="${target}"]`,
      );
      if (section) {
        section.open = true;
        element = section;
      }
    }

    if (!element) return;
    element.classList.add("ux-focus");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => element?.classList.remove("ux-focus"), 1300);
  }

  private renderAdvancedSection(
    target: ExplorerEditorSection,
    title: string,
    hint: string,
    content: unknown,
  ) {
    return html`
      <details class="advanced-section" data-editor-section=${target}>
        <summary>
          <span>${title}</span>
          <span class="advanced-hint">${hint}</span>
        </summary>
        <div class="advanced-content">${content}</div>
      </details>
    `;
  }

  protected override render() {
    const config = this.currentConfig;

    return html`
      <details class="setup-section">
        <summary>
          <span>Opsætningsoversigt</span>
          <span class="advanced-hint">Status & genveje</span>
        </summary>
        <div class="setup-content">
          <ha-explorer-setup-overview
            .hass=${this.hass}
            .config=${config}
            @explorer-editor-navigate=${this.handleEditorNavigate}
          ></ha-explorer-setup-overview>
        </div>
      </details>

      ${super.render()}

      <div class="advanced-heading">
        <div>
          <span>Avancerede værktøjer</span>
          <strong>Åbn kun det du arbejder med</strong>
        </div>
        <small>Routing, udseende, zoner og live-effekter</small>
      </div>

      <div class="advanced-tools">
        ${this.renderAdvancedSection(
          "appearance",
          "Appearance",
          "Classic / Enchanted Antique",
          html`<ha-explorer-theme-editor
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-theme-editor>`,
        )}

        ${this.renderAdvancedSection(
          "room-tools",
          "Visuel rum-editor",
          "Tegn rum og presence-anchors",
          html`<ha-explorer-room-tools
            .hass=${this.hass}
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-room-tools>`,
        )}

        ${this.renderAdvancedSection(
          "presences",
          "Visuel profil",
          "Farver, ikoner og synlighed",
          html`<ha-explorer-presence-polish-editor
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-presence-polish-editor>`,
        )}

        ${this.renderAdvancedSection(
          "zones",
          "Zones / Dynamic Areas",
          "Alarm, rengøring og dynamiske områder",
          html`<ha-explorer-zones-editor
            .hass=${this.hass}
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-zones-editor>`,
        )}

        ${this.renderAdvancedSection(
          "room-reactions",
          "Living Entity Points",
          "Lamper, TV, sensorer, åbninger og temperatur",
          html`<ha-explorer-room-reactions-editor
            .hass=${this.hass}
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-room-reactions-editor>`,
        )}

        ${this.renderAdvancedSection(
          "room-actions",
          "Rumscener og hurtighandlinger",
          "Tænd/sluk alt, scenes og scripts",
          html`<ha-explorer-room-actions-editor
            .hass=${this.hass}
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-room-actions-editor>`,
        )}

        ${this.renderAdvancedSection(
          "routes",
          "Route Network",
          "Manuelle routes og shared nodes",
          html`<ha-explorer-route-editor
            .hass=${this.hass}
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-route-editor>`,
        )}

        ${this.renderAdvancedSection(
          "route-graph",
          "Automatic Route Graph",
          "Graph edges, døre og live conditions",
          html`<ha-explorer-route-graph-editor
            .hass=${this.hass}
            .config=${config}
            @config-changed=${this.handleToolConfigChanged}
          ></ha-explorer-route-graph-editor>`,
        )}

        ${this.renderAdvancedSection(
          "diagnostics",
          "Route Preview & Diagnostics",
          "Kontrollér graph og resolved routes",
          html`<ha-explorer-route-diagnostics
            .hass=${this.hass}
            .config=${config}
          ></ha-explorer-route-diagnostics>`,
        )}
      </div>
    `;
  }

  public override dispatchEvent(event: Event): boolean {
    if (event.type !== "config-changed") return super.dispatchEvent(event);
    const config = (event as CustomEvent<{ config?: ExplorerCardConfig }>).detail?.config;
    if (!config) return super.dispatchEvent(event);
    return this.emitHomeAssistantConfig(config);
  }

  static override styles = css`
    ${HaExplorerCardEditor.styles}

    .setup-section,
    .advanced-section {
      scroll-margin-top:16px;
      border:1px solid var(--divider-color);
      border-radius:12px;
      overflow:hidden;
      background:var(--card-background-color);
      transition:border-color 180ms ease, box-shadow 180ms ease;
    }
    .setup-section { margin-bottom:12px; }
    .setup-section > summary,
    .advanced-section > summary {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      padding:12px 14px;
      cursor:pointer;
      font-weight:700;
    }
    .setup-section > summary::-webkit-details-marker,
    .advanced-section > summary::-webkit-details-marker { display:none; }
    .setup-section > summary::after,
    .advanced-section > summary::after {
      content:"⌄";
      margin-left:4px;
      color:var(--secondary-text-color);
      transition:transform 160ms ease;
    }
    .setup-section[open] > summary::after,
    .advanced-section[open] > summary::after { transform:rotate(180deg); }
    .setup-content { padding:0 10px 10px; }
    .setup-content > * { margin-top:0; }

    .item-card:not(.item-open) > :not(.item-heading) { display:none !important; }
    .item-heading { cursor:pointer; user-select:none; }
    .item-heading::after {
      content:"⌄";
      flex:none;
      color:var(--secondary-text-color);
      transition:transform 160ms ease;
    }
    .item-card.item-open .item-heading::after { transform:rotate(180deg); }

    .advanced-heading {
      display:flex;
      align-items:flex-end;
      justify-content:space-between;
      gap:12px;
      margin:16px 2px 8px;
      color:var(--secondary-text-color);
    }
    .advanced-heading > div { display:grid; gap:2px; }
    .advanced-heading span { font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; }
    .advanced-heading strong { color:var(--primary-text-color); font-size:.92rem; }
    .advanced-heading small { font-size:.75rem; }
    .advanced-tools { display:grid; gap:9px; padding-bottom:8px; }
    .advanced-hint { margin-left:auto; color:var(--secondary-text-color); font-size:.75rem; font-weight:500; text-align:right; }
    .advanced-content { padding:0 10px 10px; }
    .advanced-content > * { margin-top:0; }
    .ux-focus {
      border-color:var(--primary-color,#03a9f4) !important;
      box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color,#03a9f4) 18%,transparent);
    }

    @media (max-width:600px) {
      .advanced-heading { align-items:flex-start; flex-direction:column; }
      .setup-section > summary,
      .advanced-section > summary { align-items:flex-start; }
      .advanced-hint { max-width:48%; }
    }
  `;
}
