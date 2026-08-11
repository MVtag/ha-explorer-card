import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerRoom,
  ExplorerRoomReaction,
  RoomReactionKind,
} from "../models/config";
import type { HomeAssistant } from "../types";
import {
  defaultRoomReactionStates,
  evaluateRoomReaction,
} from "../utils/room-reactions";

const KIND_LABELS: Record<RoomReactionKind, string> = {
  light: "Lys / glød",
  motion: "Bevægelse / puls",
  media: "Media / TV",
  opening: "Åbning / vindue",
};

@customElement("ha-explorer-room-reactions-editor")
export class HaExplorerRoomReactionsEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private selectedRoomId = "";
  @state() private draftKind: RoomReactionKind = "light";
  @state() private draftEntity = "";
  @state() private draftStates = "on";
  @state() private editingIndex?: number;

  private get rooms(): ExplorerRoom[] {
    return this.config?.rooms ?? [];
  }

  private get selectedRoom(): ExplorerRoom | undefined {
    return this.rooms.find((room) => room.id === this.selectedRoomId);
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (!changed.has("config")) return;
    if (this.selectedRoomId && this.selectedRoom) return;
    this.selectedRoomId = this.rooms[0]?.id ?? "";
    this.cancelEdit();
  }

  private emitConfig(config: ExplorerCardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  private parseStates(value: string): string[] {
    const states = value.split(",").map((entry) => entry.trim()).filter(Boolean);
    return [...new Set(states)];
  }

  private entityState(entityId: string) {
    const entity = this.hass?.states[entityId];
    if (!entity) return undefined;
    return { state: entity.state, attributes: entity.attributes };
  }

  private updateSelectedRoom(reactions: ExplorerRoomReaction[]): void {
    if (!this.config || !this.selectedRoom) return;
    const rooms = this.rooms.map((room) =>
      room.id === this.selectedRoomId
        ? { ...room, ...(reactions.length ? { reactions } : { reactions: undefined }) }
        : room,
    );
    this.emitConfig({ ...this.config, rooms });
  }

  private isDuplicate(): boolean {
    if (!this.selectedRoom || !this.draftEntity.trim()) return true;
    return (this.selectedRoom.reactions ?? []).some((reaction, index) =>
      index !== this.editingIndex &&
      reaction.kind === this.draftKind &&
      reaction.entity.trim() === this.draftEntity.trim(),
    );
  }

  private saveReaction(): void {
    if (!this.selectedRoom || !this.draftEntity.trim() || this.isDuplicate()) return;
    const reaction: ExplorerRoomReaction = {
      kind: this.draftKind,
      entity: this.draftEntity.trim(),
      active_states: this.parseStates(this.draftStates),
    };
    const existing = [...(this.selectedRoom.reactions ?? [])];
    if (this.editingIndex === undefined) existing.push(reaction);
    else existing[this.editingIndex] = reaction;
    this.updateSelectedRoom(existing);
    this.cancelEdit();
  }

  private beginEdit(index: number): void {
    const reaction = this.selectedRoom?.reactions?.[index];
    if (!reaction) return;
    this.editingIndex = index;
    this.draftKind = reaction.kind;
    this.draftEntity = reaction.entity;
    this.draftStates = (
      reaction.active_states?.length
        ? reaction.active_states
        : defaultRoomReactionStates(reaction.kind)
    ).join(", ");
  }

  private cancelEdit(): void {
    this.editingIndex = undefined;
    this.draftKind = "light";
    this.draftEntity = "";
    this.draftStates = defaultRoomReactionStates("light").join(", ");
  }

  private deleteReaction(index: number): void {
    if (!this.selectedRoom) return;
    const reactions = (this.selectedRoom.reactions ?? []).filter((_, entryIndex) => entryIndex !== index);
    this.updateSelectedRoom(reactions);
    if (this.editingIndex === index) this.cancelEdit();
  }

  private handleKindChange(kind: RoomReactionKind): void {
    this.draftKind = kind;
    this.draftStates = defaultRoomReactionStates(kind).join(", ");
  }

  private reactionStatus(reaction: ExplorerRoomReaction, index: number) {
    return evaluateRoomReaction(
      reaction,
      index,
      (entityId) => this.entityState(entityId),
    );
  }

  private statusLabel(reaction: ExplorerRoomReaction, index: number): string {
    const status = this.reactionStatus(reaction, index);
    if (status.active) {
      if (reaction.kind === "light") {
        return `Aktiv · ${status.currentState} · ${Math.round(status.intensity * 100)} %`;
      }
      return `Aktiv · ${status.currentState}`;
    }
    if (status.reason === "entity_unavailable") return "Entity mangler";
    if (status.reason === "missing_entity") return "Ingen entity";
    return `Inaktiv · ${status.currentState ?? "ukendt"}`;
  }

  private entityOptions(): string[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states).sort((a, b) => a.localeCompare(b));
  }

  protected render() {
    if (!this.config) return nothing;
    const room = this.selectedRoom;
    const reactions = room?.reactions ?? [];

    return html`
      <section class="reaction-editor">
        <div class="heading">
          <div>
            <span>Living Rooms / Entity Reactions</span>
            <h3>Få rummene til at reagere på Home Assistant</h3>
          </div>
          <b>${this.rooms.reduce((sum, entry) => sum + (entry.reactions?.length ?? 0), 0)} bindinger</b>
        </div>

        <div class="instruction">
          Tilføj flere entities til samme rum. Lys giver varm glød og bruger automatisk <code>brightness</code>, hvis entity'en har attributten. Flere tændte lys gør gløden stærkere. Bevægelse pulserer, media/TV får en live markør, og åbninger fremhæver rummets kant.
        </div>

        ${this.rooms.length ? html`
          <label class="room-select">Rum
            <select
              .value=${this.selectedRoomId}
              @change=${(event: Event) => {
                this.selectedRoomId = (event.target as HTMLSelectElement).value;
                this.cancelEdit();
              }}
            >
              ${this.rooms.map((entry) => html`<option value=${entry.id}>${entry.name ?? entry.id}</option>`)}
            </select>
          </label>

          <div class="draft">
            <div class="draft-title">
              <strong>${this.editingIndex === undefined ? "Ny reaktion" : "Redigér reaktion"}</strong>
              <span>${room?.name ?? room?.id}</span>
            </div>
            <div class="fields">
              <label>Type
                <select
                  .value=${this.draftKind}
                  @change=${(event: Event) => this.handleKindChange((event.target as HTMLSelectElement).value as RoomReactionKind)}
                >
                  ${(Object.keys(KIND_LABELS) as RoomReactionKind[]).map((kind) =>
                    html`<option value=${kind}>${KIND_LABELS[kind]}</option>`)}
                </select>
              </label>
              <label>Home Assistant entity
                <input
                  list="explorer-room-reaction-entities"
                  placeholder=${this.draftKind === "light" ? "light.kokken" : this.draftKind === "motion" ? "binary_sensor.kokken_motion" : this.draftKind === "media" ? "media_player.tv" : "binary_sensor.vindue"}
                  .value=${this.draftEntity}
                  @input=${(event: InputEvent) => this.draftEntity = (event.target as HTMLInputElement).value}
                >
                <datalist id="explorer-room-reaction-entities">
                  ${this.entityOptions().map((entityId) => html`<option value=${entityId}></option>`)}
                </datalist>
              </label>
              <label>Aktiv state(s)
                <input
                  .value=${this.draftStates}
                  @input=${(event: InputEvent) => this.draftStates = (event.target as HTMLInputElement).value}
                >
                <small>Flere states adskilles med komma.</small>
              </label>
            </div>
            ${this.isDuplicate() && this.draftEntity.trim() ? html`
              <div class="duplicate">Denne entity er allerede tilføjet med samme reaktionstype i rummet.</div>
            ` : nothing}
            <div class="actions">
              <button class="primary" ?disabled=${!this.draftEntity.trim() || this.isDuplicate()} @click=${this.saveReaction}>
                ${this.editingIndex === undefined ? "+ Tilføj reaktion" : "Gem ændring"}
              </button>
              ${this.editingIndex !== undefined ? html`<button class="secondary" @click=${this.cancelEdit}>Annuller</button>` : nothing}
            </div>
          </div>

          ${reactions.length ? html`
            <div class="reaction-list">
              ${reactions.map((reaction, index) => {
                const status = this.reactionStatus(reaction, index);
                return html`
                  <div class=${status.active ? "reaction-item active" : "reaction-item"}>
                    <span class=${`kind ${reaction.kind}`}>${reaction.kind === "light" ? "☀" : reaction.kind === "motion" ? "◉" : reaction.kind === "media" ? "▶" : "↗"}</span>
                    <span class="copy">
                      <strong>${KIND_LABELS[reaction.kind]}</strong>
                      <small>${reaction.entity}</small>
                      <em class=${status.active ? "status active" : "status"}>${this.statusLabel(reaction, index)}</em>
                      <small>Aktiv: ${status.activeStates.join(", ")}</small>
                    </span>
                    <div class="item-actions">
                      <button class="secondary mini" @click=${() => this.beginEdit(index)}>Redigér</button>
                      <button class="danger mini" @click=${() => this.deleteReaction(index)}>Slet</button>
                    </div>
                  </div>
                `;
              })}
            </div>
          ` : html`<div class="empty">Der er endnu ingen levende reaktioner i dette rum.</div>`}
        ` : html`<div class="empty">Tegn mindst ét rum først.</div>`}
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.reaction-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty,.duplicate{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.88rem;line-height:1.45}.duplicate{border-left:4px solid var(--warning-color,#ff9800)}.room-select,.fields label{display:grid;gap:6px;font-size:.85rem}.room-select select,.fields select,.fields input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.draft{display:grid;gap:10px;padding:12px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color)}.draft-title{display:flex;justify-content:space-between;gap:10px}.draft-title span,.fields small{color:var(--secondary-text-color);font-size:.8rem}.fields{display:grid;grid-template-columns:.8fr 1.4fr 1fr;gap:10px}.actions,.item-actions{display:flex;gap:7px;flex-wrap:wrap}.reaction-list{display:grid;gap:7px}.reaction-item{display:flex;align-items:center;gap:10px;padding:9px;border:1px solid transparent;border-radius:10px;background:var(--secondary-background-color)}.reaction-item.active{border-color:color-mix(in srgb,var(--primary-color,#03a9f4) 45%,transparent)}.kind{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;font-size:1rem;font-weight:900;background:var(--card-background-color);color:var(--secondary-text-color);flex:none}.kind.light{color:var(--warning-color,#ffb74d)}.kind.motion{color:var(--primary-color,#03a9f4)}.kind.media{color:var(--accent-color,#7e57c2)}.kind.opening{color:var(--warning-color,#ff9800)}.copy{display:grid;gap:2px;min-width:0;flex:1}.copy small{color:var(--secondary-text-color);overflow-wrap:anywhere}.status{font-style:normal;font-size:.75rem;font-weight:800;color:var(--secondary-text-color)}.status.active{color:var(--success-color,#43a047)}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--card-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}@media(max-width:720px){.fields{grid-template-columns:1fr}.reaction-item{align-items:flex-start}.item-actions{flex-direction:column}.draft-title{flex-direction:column}}
  `;
}
