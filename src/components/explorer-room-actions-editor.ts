import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRoom,
  ExplorerRoomQuickAction,
  ExplorerRoomQuickActionKind,
} from "../models/config";
import type { HomeAssistant } from "../types";

@customElement("ha-explorer-room-actions-editor")
export class HaExplorerRoomActionsEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private selectedRoomId = "";
  @state() private kind: ExplorerRoomQuickActionKind = "scene";
  @state() private entity = "";
  @state() private name = "";
  @state() private icon = "";
  @state() private editingId = "";

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("config")) {
      const rooms = this.config?.rooms ?? [];
      if (!rooms.some((room) => room.id === this.selectedRoomId)) {
        this.selectedRoomId = rooms[0]?.id ?? "";
      }
    }
  }

  private get selectedRoom(): ExplorerRoom | undefined {
    return (this.config?.rooms ?? []).find((room) => room.id === this.selectedRoomId);
  }

  private get entityOptions(): Array<{ id: string; name: string }> {
    const prefix = `${this.kind}.`;
    return Object.entries(this.hass?.states ?? {})
      .filter(([id]) => id.startsWith(prefix))
      .map(([id, state]) => ({
        id,
        name:
          typeof state.attributes.friendly_name === "string" && state.attributes.friendly_name.trim()
            ? state.attributes.friendly_name
            : id,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "da"));
  }

  private emitConfig(config: ExplorerCardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private updateRoom(actions: ExplorerRoomQuickAction[]): void {
    if (!this.config) return;
    this.emitConfig({
      ...this.config,
      rooms: (this.config.rooms ?? []).map((room) =>
        room.id === this.selectedRoomId ? { ...room, quick_actions: actions } : room,
      ),
    });
  }

  private changeKind(kind: ExplorerRoomQuickActionKind): void {
    this.kind = kind;
    this.entity = "";
    if (!this.editingId) {
      this.name = "";
      this.icon = kind === "scene" ? "✦" : "▶";
    }
  }

  private selectEntity(entity: string): void {
    this.entity = entity;
    if (!this.name.trim()) {
      this.name = this.entityOptions.find((option) => option.id === entity)?.name ?? "";
    }
  }

  private stableId(entity: string): string {
    const base = entity.replace(/[^a-z0-9_-]+/gi, "-").replace(/^-|-$/g, "") || "handling";
    const used = new Set(
      (this.selectedRoom?.quick_actions ?? [])
        .filter((action) => action.id !== this.editingId)
        .map((action) => action.id),
    );
    let candidate = base;
    let suffix = 2;
    while (used.has(candidate)) candidate = `${base}-${suffix++}`;
    return candidate;
  }

  private save(): void {
    const room = this.selectedRoom;
    const entity = this.entity.trim();
    const name = this.name.trim();
    if (!room || !entity || !name || !entity.startsWith(`${this.kind}.`)) return;

    const existing = room.quick_actions ?? [];
    const action: ExplorerRoomQuickAction = {
      id: this.editingId || this.stableId(entity),
      kind: this.kind,
      entity,
      name,
      ...(this.icon.trim() ? { icon: this.icon.trim() } : {}),
    };
    const next = this.editingId
      ? existing.map((item) => (item.id === this.editingId ? action : item))
      : [...existing, action];
    this.updateRoom(next);
    this.resetDraft();
  }

  private edit(action: ExplorerRoomQuickAction): void {
    this.editingId = action.id;
    this.kind = action.kind;
    this.entity = action.entity;
    this.name = action.name;
    this.icon = action.icon ?? "";
  }

  private removeAction(id: string): void {
    this.updateRoom((this.selectedRoom?.quick_actions ?? []).filter((action) => action.id !== id));
    if (this.editingId === id) this.resetDraft();
  }

  private resetDraft(): void {
    this.editingId = "";
    this.kind = "scene";
    this.entity = "";
    this.name = "";
    this.icon = "✦";
  }

  protected render() {
    const rooms = this.config?.rooms ?? [];
    const room = this.selectedRoom;
    if (!rooms.length) {
      return html`<p class="empty">Opret først et rum, før du tilføjer hurtighandlinger.</p>`;
    }

    return html`
      <section>
        <div class="notice">
          <strong>Automatisk lysstyring</strong>
          <span>“Tænd alt” og “Sluk alt” vises automatisk, når rummet har mindst ét lys under Living Entity Points.</span>
        </div>

        <label>
          Rum
          <select .value=${this.selectedRoomId} @change=${(event: Event) => {
            this.selectedRoomId = (event.target as HTMLSelectElement).value;
            this.resetDraft();
          }}>
            ${rooms.map((item) => html`<option value=${item.id}>${item.name ?? item.id}</option>`)}
          </select>
        </label>

        <div class="form">
          <label>
            Type
            <select .value=${this.kind} @change=${(event: Event) =>
              this.changeKind((event.target as HTMLSelectElement).value as ExplorerRoomQuickActionKind)}>
              <option value="scene">Scene</option>
              <option value="script">Script</option>
            </select>
          </label>
          <label>
            Entity
            <select .value=${this.entity} @change=${(event: Event) =>
              this.selectEntity((event.target as HTMLSelectElement).value)}>
              <option value="">Vælg ${this.kind === "scene" ? "scene" : "script"}…</option>
              ${this.entityOptions.map((option) =>
                html`<option value=${option.id}>${option.name} · ${option.id}</option>`)}
            </select>
          </label>
          <label>
            Navn
            <input .value=${this.name} @input=${(event: Event) =>
              this.name = (event.target as HTMLInputElement).value} placeholder="Fx Filmaften" />
          </label>
          <label>
            Ikon
            <input .value=${this.icon} @input=${(event: Event) =>
              this.icon = (event.target as HTMLInputElement).value} placeholder="Fx ✦" maxlength="8" />
          </label>
        </div>

        <div class="buttons">
          <button class="primary" @click=${this.save} ?disabled=${!this.entity || !this.name.trim()}>
            ${this.editingId ? "Gem ændring" : "Tilføj handling"}
          </button>
          ${this.editingId ? html`<button @click=${this.resetDraft}>Annuller</button>` : nothing}
        </div>

        <div class="actions">
          ${(room?.quick_actions ?? []).map((action) => html`
            <article>
              <span class="glyph">${action.icon ?? (action.kind === "scene" ? "✦" : "▶")}</span>
              <span><strong>${action.name}</strong><small>${action.entity}</small></span>
              <button @click=${() => this.edit(action)}>Redigér</button>
              <button class="danger" @click=${() => this.removeAction(action.id)}>Slet</button>
            </article>
          `)}
          ${!(room?.quick_actions?.length)
            ? html`<p class="empty">Ingen scene- eller scripthandlinger i dette rum endnu.</p>`
            : nothing}
        </div>
      </section>
    `;
  }

  static styles = css`
    :host { display:block; color:var(--primary-text-color); }
    section { display:grid; gap:12px; }
    .notice { display:grid; gap:3px; padding:10px 12px; border-radius:10px; background:color-mix(in srgb,var(--primary-color,#03a9f4) 8%,transparent); font-size:.78rem; line-height:1.4; }
    .notice span, small, .empty { color:var(--secondary-text-color); }
    label { display:grid; gap:5px; font-size:.78rem; font-weight:600; }
    select, input, button { box-sizing:border-box; min-height:38px; border:1px solid var(--divider-color); border-radius:9px; color:var(--primary-text-color); background:var(--card-background-color); font:inherit; }
    select, input { width:100%; padding:8px 10px; }
    .form { display:grid; grid-template-columns:.7fr 1.3fr 1fr .55fr; gap:9px; }
    .buttons { display:flex; gap:8px; }
    button { padding:7px 11px; cursor:pointer; }
    button.primary { border-color:var(--primary-color,#03a9f4); color:white; background:var(--primary-color,#03a9f4); font-weight:700; }
    button:disabled { opacity:.5; cursor:not-allowed; }
    .actions { display:grid; gap:7px; }
    article { display:grid; grid-template-columns:auto minmax(0,1fr) auto auto; align-items:center; gap:8px; padding:8px; border-radius:10px; background:var(--secondary-background-color); }
    article > span:nth-child(2) { display:grid; min-width:0; }
    article strong, article small { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    article strong { font-size:.82rem; }
    article small { font-size:.7rem; }
    .glyph { display:grid; place-items:center; width:30px; height:30px; border-radius:9px; background:var(--card-background-color); }
    .danger { color:var(--error-color,#db4437); }
    .empty { margin:2px 0; font-size:.78rem; line-height:1.45; }
    @media (max-width:760px) {
      .form { grid-template-columns:1fr; }
      article { grid-template-columns:auto minmax(0,1fr) auto; }
      article .danger { grid-column:3; }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-explorer-room-actions-editor": HaExplorerRoomActionsEditor;
  }
}
