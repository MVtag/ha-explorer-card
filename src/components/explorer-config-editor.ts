import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  ExplorerCardConfig,
  ExplorerPresence,
  ExplorerRoom,
  PresenceEntityBinding,
  PresenceObjectType,
} from "../models/config";
import type { AreaRegistryEntry, HassEntity, HomeAssistant } from "../types";

const PRESENCE_TYPES: Array<{ value: PresenceObjectType; label: string }> = [
  { value: "person", label: "Person" },
  { value: "pet", label: "Kæledyr" },
  { value: "robot", label: "Robot" },
  { value: "vehicle", label: "Køretøj" },
  { value: "object", label: "Objekt" },
];

const ROOM_ENTITY_DOMAINS = new Set(["sensor", "input_select", "select"]);

function entityDomain(entityId: string): string {
  return entityId.split(".", 1)[0] ?? "";
}

function friendlyName(entity: HassEntity): string {
  const value = entity.attributes.friendly_name;
  return typeof value === "string" && value.trim() ? value : entity.entity_id;
}

function clampNormalized(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function cleanBinding(binding: PresenceEntityBinding): PresenceEntityBinding | undefined {
  const entries = Object.entries(binding).filter(([, value]) => value !== undefined && value !== "");
  return entries.length ? (Object.fromEntries(entries) as PresenceEntityBinding) : undefined;
}

@customElement("ha-explorer-card-editor")
export class HaExplorerCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: ExplorerCardConfig;
  @state() private areas: AreaRegistryEntry[] = [];
  @state() private areaError = "";
  @state() private loadingAreas = false;

  public setConfig(config: ExplorerCardConfig): void {
    this.config = config;
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("hass")) void this.loadAreas();
  }

  private async loadAreas(): Promise<void> {
    if (!this.hass?.callWS) {
      this.areas = [];
      return;
    }

    this.loadingAreas = true;
    this.areaError = "";
    try {
      const areas = await this.hass.callWS<AreaRegistryEntry[]>({ type: "config/area_registry/list" });
      this.areas = [...areas].sort((a, b) => a.name.localeCompare(b.name, "da"));
    } catch {
      this.areaError = "Home Assistant Areas kunne ikke hentes. Eksisterende Area ID'er bevares.";
    } finally {
      this.loadingAreas = false;
    }
  }

  private updateConfig(change: Partial<ExplorerCardConfig>): void {
    if (!this.config) return;
    const config = { ...this.config, ...change };
    this.config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private updateText(key: keyof ExplorerCardConfig, value: string): void {
    this.updateConfig({ [key]: value } as Partial<ExplorerCardConfig>);
  }

  private updateNumber(key: keyof ExplorerCardConfig, value: string): void {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) this.updateConfig({ [key]: parsed } as Partial<ExplorerCardConfig>);
  }

  private updateRoom(index: number, patch: Partial<ExplorerRoom>): void {
    if (!this.config) return;
    const rooms = [...(this.config.rooms ?? [])];
    rooms[index] = { ...rooms[index], ...patch };
    this.updateConfig({ rooms });
  }

  private updateRoomAnchor(index: number, axis: "x" | "y", rawValue: string): void {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) return;
    const room = this.config?.rooms?.[index];
    if (!room) return;
    const current = room.presence_anchor ?? { x: 0.5, y: 0.5 };
    this.updateRoom(index, {
      presence_anchor: { ...current, [axis]: clampNormalized(value) },
    });
  }

  private updateRoomAliases(index: number, rawValue: string): void {
    const aliases = rawValue
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    this.updateRoom(index, { aliases });
  }

  private updatePresence(index: number, patch: Partial<ExplorerPresence>): void {
    if (!this.config) return;
    const presences = [...(this.config.presences ?? [])];
    presences[index] = { ...presences[index], ...patch };
    this.updateConfig({ presences });
  }

  private updatePresenceBinding(
    index: number,
    key: keyof PresenceEntityBinding,
    value: string,
  ): void {
    const presence = this.config?.presences?.[index];
    if (!presence) return;
    const binding = cleanBinding({
      ...(presence.entity_binding ?? {}),
      [key]: value.trim() || undefined,
    });
    this.updatePresence(index, { entity_binding: binding });
  }

  private addPresence(): void {
    const presences = [...(this.config?.presences ?? [])];
    let number = presences.length + 1;
    let id = `presence_${number}`;
    const usedIds = new Set(presences.map((presence) => presence.id));
    while (usedIds.has(id)) {
      number += 1;
      id = `presence_${number}`;
    }
    presences.push({
      id,
      name: `Person ${number}`,
      type: "person",
      entity_binding: {},
    });
    this.updateConfig({ presences });
  }

  private removePresence(index: number): void {
    const presences = [...(this.config?.presences ?? [])];
    presences.splice(index, 1);
    this.updateConfig({ presences });
  }

  private get entities(): HassEntity[] {
    return Object.values(this.hass?.states ?? {}).sort((a, b) =>
      friendlyName(a).localeCompare(friendlyName(b), "da"),
    );
  }

  private renderEntityDatalist(id: string, roomCandidatesOnly = false) {
    const entities = roomCandidatesOnly
      ? this.entities.filter((entity) => ROOM_ENTITY_DOMAINS.has(entityDomain(entity.entity_id)))
      : this.entities;

    return html`
      <datalist id=${id}>
        ${entities.map(
          (entity) => html`<option value=${entity.entity_id}>${friendlyName(entity)}</option>`,
        )}
      </datalist>
    `;
  }

  private renderRoom(room: ExplorerRoom, index: number) {
    const currentAreaKnown = this.areas.some((area) => area.area_id === room.area_id);
    return html`
      <article class="item-card">
        <div class="item-heading">
          <div>
            <strong>${room.name ?? room.id}</strong>
            <small>${room.id}</small>
          </div>
          <span class="badge">${room.points.length} punkter</span>
        </div>

        <div class="grid two">
          <label>
            Rumnavn
            <input
              .value=${room.name ?? ""}
              @input=${(event: InputEvent) =>
                this.updateRoom(index, { name: (event.target as HTMLInputElement).value })}
            />
          </label>
          <label>
            Home Assistant Area
            <select
              .value=${room.area_id ?? ""}
              @change=${(event: Event) =>
                this.updateRoom(index, {
                  area_id: (event.target as HTMLSelectElement).value || undefined,
                })}
            >
              <option value="">Ikke bundet</option>
              ${room.area_id && !currentAreaKnown
                ? html`<option value=${room.area_id}>${room.area_id} (eksisterende)</option>`
                : nothing}
              ${this.areas.map(
                (area) => html`<option value=${area.area_id}>${area.name}</option>`,
              )}
            </select>
          </label>
        </div>

        <label>
          Aliases
          <input
            .value=${(room.aliases ?? []).join(", ")}
            placeholder="Køkken, Kitchen"
            @change=${(event: Event) =>
              this.updateRoomAliases(index, (event.target as HTMLInputElement).value)}
          />
          <small>Bruges når en room-sensor kalder det samme rum noget andet.</small>
        </label>

        <div class="anchor-block">
          <div>
            <strong>Presence-anchor</strong>
            <small>Placeringen hvor personer vises i rummet.</small>
          </div>
          <div class="grid two compact">
            <label>
              X
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                .value=${String(room.presence_anchor?.x ?? 0.5)}
                @change=${(event: Event) =>
                  this.updateRoomAnchor(index, "x", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              Y
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                .value=${String(room.presence_anchor?.y ?? 0.5)}
                @change=${(event: Event) =>
                  this.updateRoomAnchor(index, "y", (event.target as HTMLInputElement).value)}
              />
            </label>
          </div>
        </div>
      </article>
    `;
  }

  private renderPresence(presence: ExplorerPresence, index: number) {
    const entityListId = `explorer-primary-entity-${index}`;
    const roomListId = `explorer-room-entity-${index}`;
    const binding = presence.entity_binding ?? {};

    return html`
      <article class="item-card presence-card">
        <div class="item-heading">
          <div>
            <strong>${presence.name ?? presence.id}</strong>
            <small>${presence.id}</small>
          </div>
          <button class="danger ghost" @click=${() => this.removePresence(index)}>Fjern</button>
        </div>

        <div class="grid two">
          <label>
            Navn
            <input
              .value=${presence.name ?? ""}
              @input=${(event: InputEvent) =>
                this.updatePresence(index, { name: (event.target as HTMLInputElement).value })}
            />
          </label>
          <label>
            Type
            <select
              .value=${presence.type ?? "person"}
              @change=${(event: Event) =>
                this.updatePresence(index, {
                  type: (event.target as HTMLSelectElement).value as PresenceObjectType,
                })}
            >
              ${PRESENCE_TYPES.map(
                (type) => html`<option value=${type.value}>${type.label}</option>`,
              )}
            </select>
          </label>
        </div>

        <label>
          Hoved-entitet (valgfri)
          <input
            list=${entityListId}
            .value=${binding.entity ?? ""}
            placeholder="person.marc_poulsen"
            @change=${(event: Event) =>
              this.updatePresenceBinding(index, "entity", (event.target as HTMLInputElement).value)}
          />
          ${this.renderEntityDatalist(entityListId)}
          <small>Bruges til profilbillede og øvrige entity-attributter. Kan være tom.</small>
        </label>

        <label>
          Rum-tracking entitet
          <input
            list=${roomListId}
            .value=${binding.room_entity ?? ""}
            placeholder="sensor.marc_room eller input_select.explorer_room_test"
            @change=${(event: Event) =>
              this.updatePresenceBinding(
                index,
                "room_entity",
                (event.target as HTMLInputElement).value,
              )}
          />
          ${this.renderEntityDatalist(roomListId, true)}
          <small>Kan komme fra Bermuda, ESPresense, en helper eller en anden integration.</small>
        </label>

        <label>
          Fast rum (fallback)
          <select
            .value=${presence.room_id ?? ""}
            @change=${(event: Event) =>
              this.updatePresence(index, {
                room_id: (event.target as HTMLSelectElement).value || undefined,
              })}
          >
            <option value="">Ingen</option>
            ${(this.config?.rooms ?? []).map(
              (room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`,
            )}
          </select>
          <small>Bruges hvis der ikke er en gyldig room-sensor.</small>
        </label>
      </article>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const rooms = this.config.rooms ?? [];
    const presences = this.config.presences ?? [];

    return html`
      <div class="editor">
        <details open>
          <summary>
            <span>Kort</span>
            <span class="summary-hint">Grundindstillinger</span>
          </summary>
          <div class="section-content">
            <label>
              Titel
              <input
                .value=${this.config.title ?? ""}
                @input=${(event: InputEvent) =>
                  this.updateText("title", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              Plantegning
              <input
                .value=${this.config.image ?? this.config.background ?? ""}
                placeholder="/local/explorer/floorplan.svg"
                @input=${(event: InputEvent) =>
                  this.updateText("image", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              Tilpasning
              <select
                .value=${this.config.fit_mode ?? "contain"}
                @change=${(event: Event) =>
                  this.updateText("fit_mode", (event.target as HTMLSelectElement).value)}
              >
                <option value="contain">Vis hele plantegningen</option>
                <option value="cover">Fyld hele kortet</option>
              </select>
            </label>
            <div class="grid two">
              <label>
                Minimum zoom
                <input
                  type="number"
                  min="0.5"
                  step="0.1"
                  .value=${String(this.config.min_zoom ?? 1)}
                  @input=${(event: InputEvent) =>
                    this.updateNumber("min_zoom", (event.target as HTMLInputElement).value)}
                />
              </label>
              <label>
                Maksimum zoom
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  .value=${String(this.config.max_zoom ?? 6)}
                  @input=${(event: InputEvent) =>
                    this.updateNumber("max_zoom", (event.target as HTMLInputElement).value)}
                />
              </label>
            </div>
          </div>
        </details>

        <details open>
          <summary>
            <span>Rum</span>
            <span class="summary-hint">${rooms.length} rum</span>
          </summary>
          <div class="section-content">
            <div class="notice">
              Bind de eksisterende Explorer-rum til Home Assistant Areas og justér deres
              presence-anchor her. Tegning af nye rumgrænser kommer i den visuelle plantegningseditor.
            </div>
            ${this.loadingAreas ? html`<div class="subtle">Henter Home Assistant Areas…</div>` : nothing}
            ${this.areaError ? html`<div class="warning">${this.areaError}</div>` : nothing}
            ${rooms.length
              ? rooms.map((room, index) => this.renderRoom(room, index))
              : html`<div class="empty">Der er endnu ingen rum i kortets konfiguration.</div>`}
          </div>
        </details>

        <details open>
          <summary>
            <span>Personer & objekter</span>
            <span class="summary-hint">${presences.length} tilføjet</span>
          </summary>
          <div class="section-content">
            <div class="notice">
              Tracking er backend-uafhængig. Vælg bare den Home Assistant-entitet, der fortæller
              hvilket rum personen eller objektet befinder sig i.
            </div>
            ${presences.map((presence, index) => this.renderPresence(presence, index))}
            <button class="primary" @click=${this.addPresence}>+ Tilføj person eller objekt</button>
          </div>
        </details>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .editor { display: grid; gap: 12px; padding: 4px 0 8px; }
    details { border: 1px solid var(--divider-color); border-radius: 12px; overflow: hidden; background: var(--card-background-color); }
    summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; cursor: pointer; font-weight: 700; }
    summary::-webkit-details-marker { display: none; }
    .summary-hint { color: var(--secondary-text-color); font-size: .82rem; font-weight: 500; }
    .section-content { display: grid; gap: 14px; padding: 0 14px 14px; }
    .grid { display: grid; gap: 12px; }
    .grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid.compact { gap: 8px; }
    label { display: grid; gap: 6px; font-weight: 600; }
    label small, .item-heading small, .anchor-block small { color: var(--secondary-text-color); font-size: .78rem; font-weight: 400; line-height: 1.35; }
    input, select { box-sizing: border-box; width: 100%; min-width: 0; padding: 10px 12px; border: 1px solid var(--divider-color); border-radius: 9px; color: var(--primary-text-color); background: var(--card-background-color); font: inherit; }
    input:focus, select:focus { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }
    .item-card { display: grid; gap: 13px; padding: 14px; border: 1px solid var(--divider-color); border-radius: 11px; background: var(--secondary-background-color); }
    .item-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .item-heading > div { display: grid; gap: 2px; }
    .badge { padding: 4px 8px; border-radius: 999px; background: var(--card-background-color); color: var(--secondary-text-color); font-size: .75rem; white-space: nowrap; }
    .anchor-block { display: grid; gap: 9px; }
    .anchor-block > div:first-child { display: grid; gap: 2px; }
    .notice, .warning, .empty, .subtle { padding: 10px 12px; border-radius: 9px; line-height: 1.4; font-size: .88rem; }
    .notice { background: var(--secondary-background-color); color: var(--secondary-text-color); }
    .warning { background: color-mix(in srgb, var(--warning-color, #ff9800) 14%, transparent); color: var(--primary-text-color); }
    .empty, .subtle { color: var(--secondary-text-color); text-align: center; }
    button { border: 0; border-radius: 9px; padding: 10px 13px; font: inherit; font-weight: 650; cursor: pointer; }
    button.primary { background: var(--primary-color, #03a9f4); color: var(--text-primary-color, white); }
    button.ghost { background: transparent; padding: 6px 8px; }
    button.danger { color: var(--error-color, #db4437); }

    @media (max-width: 600px) {
      .grid.two { grid-template-columns: 1fr; }
      .section-content { padding-inline: 10px; }
      summary { padding-inline: 12px; }
      .item-card { padding: 12px; }
    }
  `;
}
