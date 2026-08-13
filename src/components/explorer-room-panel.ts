import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ExplorerPresence, ExplorerRoom, RoomReactionKind } from "../models/config";
import type { HomeAssistant } from "../types";
import { evaluateRoomReactions, type RoomReactionStatus } from "../utils/room-reactions";

const REACTION_ICONS: Record<RoomReactionKind, string> = {
  light: "💡",
  motion: "◉",
  media: "▶",
  opening: "↗",
  temperature: "°",
};

const REACTION_LABELS: Record<RoomReactionKind, string> = {
  light: "Lys",
  motion: "Bevægelse",
  media: "TV / medie",
  opening: "Dør / vindue",
  temperature: "Temperatur",
};

@customElement("explorer-room-panel")
export class ExplorerRoomPanel extends LitElement {
  @property({ attribute: false }) public room?: ExplorerRoom;
  @property({ attribute: false }) public presences: ExplorerPresence[] = [];
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private pendingLights = new Set<string>();
  @state() private actionError = "";

  private get statuses(): RoomReactionStatus[] {
    if (!this.room) return [];
    return evaluateRoomReactions(this.room, (entityId) => {
      const entity = this.hass?.states[entityId];
      return entity ? { state: entity.state, attributes: entity.attributes } : undefined;
    });
  }

  private get occupants(): ExplorerPresence[] {
    if (!this.room) return [];
    return this.presences.filter(
      (presence) => presence.visible !== false && presence.room_id === this.room?.id,
    );
  }

  private entityName(entityId: string): string {
    const friendlyName = this.hass?.states[entityId]?.attributes.friendly_name;
    return typeof friendlyName === "string" && friendlyName.trim()
      ? friendlyName
      : entityId;
  }

  private statusText(status: RoomReactionStatus): string {
    if (status.reason === "missing_entity" || status.reason === "entity_unavailable") {
      return "Ikke tilgængelig";
    }

    if (status.reaction.kind === "temperature") {
      if (status.numericValue === undefined) return status.currentState ?? "Ukendt";
      const value = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(
        status.numericValue,
      );
      return `${value}${status.unit ? ` ${status.unit}` : "°"}`;
    }

    if (status.reaction.kind === "light") return status.active ? "Tændt" : "Slukket";
    if (status.reaction.kind === "motion") {
      return status.active ? "Bevægelse registreret" : "Ingen bevægelse";
    }
    if (status.reaction.kind === "media") return status.active ? "Afspiller" : "Inaktiv";
    if (status.reaction.kind === "opening") return status.active ? "Åben" : "Lukket";
    return status.currentState ?? "Ukendt";
  }

  private close(): void {
    this.dispatchEvent(new CustomEvent("explorer-room-close", { bubbles: true, composed: true }));
  }

  private openMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  private async toggleLight(event: Event, entityId: string): Promise<void> {
    event.stopPropagation();
    if (!this.hass?.callService || this.pendingLights.has(entityId)) return;

    this.actionError = "";
    this.pendingLights = new Set([...this.pendingLights, entityId]);
    try {
      await this.hass.callService("light", "toggle", {}, { entity_id: entityId });
    } catch (_error) {
      this.actionError = `Kunne ikke styre ${this.entityName(entityId)}.`;
    } finally {
      const pending = new Set(this.pendingLights);
      pending.delete(entityId);
      this.pendingLights = pending;
    }
  }

  protected render() {
    if (!this.room) return nothing;
    const statuses = this.statuses;
    const occupants = this.occupants;

    return html`
      <section class="panel" role="dialog" aria-label=${`Rumdetaljer for ${this.room.name ?? this.room.id}`}>
        <header>
          <div>
            <span class="eyebrow">Interaktivt rum</span>
            <h2>${this.room.name ?? this.room.id}</h2>
          </div>
          <button class="close" @click=${this.close} aria-label="Luk rumpanel">×</button>
        </header>

        <div class="summary">
          <span>${statuses.length} ${statuses.length === 1 ? "enhed" : "enheder"}</span>
          <span>${occupants.length} ${occupants.length === 1 ? "til stede" : "til stede"}</span>
        </div>

        ${occupants.length
          ? html`<div class="occupants" aria-label="Personer og objekter i rummet">
              ${occupants.map(
                (presence) => html`<span class="occupant">
                  ${presence.avatar
                    ? html`<img src=${presence.avatar} alt="" />`
                    : html`<span class="occupant-dot"></span>`}
                  ${presence.name ?? presence.id}
                </span>`,
              )}
            </div>`
          : nothing}

        ${statuses.length
          ? html`<div class="entities">
              ${statuses.map((status) => this.renderStatus(status))}
            </div>`
          : html`<p class="empty">
              Der er endnu ikke knyttet lys, temperatur, bevægelse eller andre enheder til rummet.
            </p>`}

        ${this.actionError ? html`<p class="error" role="alert">${this.actionError}</p>` : nothing}
      </section>
    `;
  }

  private renderStatus(status: RoomReactionStatus) {
    const entityId = status.reaction.entity;
    const kind = status.reaction.kind;
    const pending = this.pendingLights.has(entityId);

    return html`
      <article class=${`entity ${status.active ? "active" : "inactive"}`}>
        <button class="entity-main" @click=${() => this.openMoreInfo(entityId)}>
          <span class=${`entity-icon ${kind}`}>${REACTION_ICONS[kind]}</span>
          <span class="entity-copy">
            <strong>${this.entityName(entityId)}</strong>
            <small>${REACTION_LABELS[kind]} · ${this.statusText(status)}</small>
          </span>
        </button>
        ${kind === "light"
          ? html`<button
              class="action"
              @click=${(event: Event) => this.toggleLight(event, entityId)}
              ?disabled=${pending || !this.hass?.callService}
            >${pending ? "Vent…" : status.active ? "Sluk" : "Tænd"}</button>`
          : nothing}
      </article>
    `;
  }

  static styles = css`
    :host {
      position: absolute;
      z-index: 8;
      left: 12px;
      bottom: 12px;
      width: min(390px, calc(100% - 96px));
      max-height: calc(100% - 24px);
      box-sizing: border-box;
      color: var(--explorer-room-panel-text, var(--primary-text-color, #1f2937));
      font-family: system-ui, sans-serif;
      touch-action: pan-y;
    }

    .panel {
      max-height: inherit;
      overflow: auto;
      box-sizing: border-box;
      padding: 16px;
      border: 1px solid var(--explorer-room-panel-border, rgba(255,255,255,.34));
      border-radius: 18px;
      background: var(--explorer-room-panel-background, rgba(31,41,55,.94));
      color: var(--explorer-room-panel-text, white);
      box-shadow: 0 12px 34px rgba(0,0,0,.28);
      backdrop-filter: blur(12px);
      animation: panel-in 180ms ease-out;
    }

    header,
    .summary,
    .entity,
    .entity-main,
    .occupants,
    .occupant {
      display: flex;
      align-items: center;
    }

    header { justify-content: space-between; gap: 12px; }
    h2 { margin: 2px 0 0; font-size: 1.18rem; line-height: 1.2; }
    .eyebrow {
      display: block;
      opacity: .68;
      font-size: .65rem;
      letter-spacing: .16em;
      text-transform: uppercase;
    }

    button { font: inherit; }
    .close {
      width: 34px;
      height: 34px;
      flex: 0 0 auto;
      border: 0;
      border-radius: 50%;
      background: var(--explorer-room-panel-control, rgba(255,255,255,.12));
      color: inherit;
      cursor: pointer;
      font-size: 23px;
      line-height: 1;
    }

    .summary { gap: 8px; margin: 12px 0; }
    .summary span,
    .occupant {
      padding: 5px 9px;
      border-radius: 999px;
      background: var(--explorer-room-panel-control, rgba(255,255,255,.10));
      font-size: .72rem;
    }

    .occupants { flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .occupant { gap: 6px; }
    .occupant img,
    .occupant-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      object-fit: cover;
      background: var(--primary-color, #03a9f4);
    }

    .entities { display: grid; gap: 7px; }
    .entity {
      justify-content: space-between;
      gap: 8px;
      min-width: 0;
      padding: 7px;
      border-radius: 13px;
      background: var(--explorer-room-panel-row, rgba(255,255,255,.08));
    }

    .entity-main {
      min-width: 0;
      flex: 1;
      gap: 10px;
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      text-align: left;
      cursor: pointer;
    }

    .entity-icon {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      flex: 0 0 auto;
      border-radius: 11px;
      background: var(--explorer-room-panel-control, rgba(255,255,255,.12));
      font-weight: 800;
    }
    .entity.active .entity-icon { color: var(--warning-color, #ffb300); }
    .entity-icon.motion { color: var(--success-color, #43a047); }
    .entity-icon.opening { color: var(--error-color, #db4437); }
    .entity-icon.temperature { color: var(--primary-color, #03a9f4); }

    .entity-copy { min-width: 0; display: grid; gap: 2px; }
    .entity-copy strong,
    .entity-copy small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .entity-copy strong { font-size: .82rem; }
    .entity-copy small { opacity: .68; font-size: .69rem; }

    .action {
      flex: 0 0 auto;
      padding: 7px 11px;
      border: 0;
      border-radius: 999px;
      background: var(--primary-color, #03a9f4);
      color: white;
      cursor: pointer;
      font-size: .72rem;
      font-weight: 700;
    }
    .action:disabled { opacity: .5; cursor: wait; }
    .empty,
    .error { margin: 10px 0 0; font-size: .76rem; line-height: 1.45; }
    .empty { opacity: .72; }
    .error { color: var(--error-color, #ff8a80); }

    @keyframes panel-in {
      from { opacity: 0; transform: translateY(8px) scale(.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @media (max-width: 600px) {
      :host {
        right: 12px;
        bottom: 56px;
        width: auto;
        max-height: calc(100% - 68px);
      }
      .panel { padding: 13px; border-radius: 15px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .panel { animation: none; }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "explorer-room-panel": ExplorerRoomPanel;
  }
}
