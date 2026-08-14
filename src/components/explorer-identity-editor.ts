import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ExplorerCardConfig, ExplorerPresence, PresenceCoordinateSpace, PresenceEntityBinding } from "../models/config";
import type { HassEntity, HomeAssistant } from "../types";

function friendlyName(entity: HassEntity): string {
  const value = entity.attributes.friendly_name;
  return typeof value === "string" && value.trim() ? value : entity.entity_id;
}

function cleanBinding(binding: PresenceEntityBinding): PresenceEntityBinding | undefined {
  const entries = Object.entries(binding).filter(([, value]) => value !== undefined && value !== "");
  return entries.length ? Object.fromEntries(entries) as PresenceEntityBinding : undefined;
}

@customElement("ha-explorer-identity-editor")
export class HaExplorerIdentityEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  private emit(config: ExplorerCardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  private get entities(): HassEntity[] {
    return Object.values(this.hass?.states ?? {}).sort((a, b) => friendlyName(a).localeCompare(friendlyName(b), "da"));
  }

  private updatePresence(index: number, patch: Partial<ExplorerPresence>): void {
    if (!this.config) return;
    const presences = [...(this.config.presences ?? [])];
    if (!presences[index]) return;
    presences[index] = { ...presences[index], ...patch };
    this.emit({ ...this.config, presences });
  }

  private updateBinding(index: number, patch: Partial<PresenceEntityBinding>): void {
    const presence = this.config?.presences?.[index];
    if (!presence) return;
    this.updatePresence(index, {
      entity_binding: cleanBinding({ ...(presence.entity_binding ?? {}), ...patch }),
    });
  }

  private addPerson(): void {
    if (!this.config) return;
    const presences = [...(this.config.presences ?? [])];
    let n = 1;
    const ids = new Set(presences.map((p) => p.id));
    while (ids.has(`person_${n}`)) n += 1;
    presences.push({ id: `person_${n}`, name: `Person ${n}`, type: "person", visible: true, entity_binding: {} });
    this.emit({ ...this.config, presences });
  }

  private remove(index: number): void {
    if (!this.config) return;
    const presences = [...(this.config.presences ?? [])];
    presences.splice(index, 1);
    this.emit({ ...this.config, presences });
  }

  private datalist(id: string) {
    return html`<datalist id=${id}>${this.entities.map((entity) => html`<option value=${entity.entity_id}>${friendlyName(entity)}</option>`)}</datalist>`;
  }

  protected render() {
    const presences = (this.config?.presences ?? []).filter((presence) => (presence.type ?? "person") === "person");
    if (!this.config) return nothing;

    return html`
      <section class="panel">
        <div class="heading">
          <div>
            <span class="eyebrow">Multi-Person & Identity · v0.36.0</span>
            <h3>Hvem er hvor?</h3>
          </div>
          <button class="primary" @click=${this.addPerson}>+ Tilføj person</button>
        </div>

        <p class="intro">
          Identity Fusion adskiller personens identitet fra positionssensoren. Bind fx
          <code>person.marc</code> som profil og et Shelly/mmWave-target som live position.
          Flere personer kan være synlige og bevæge sig samtidig.
        </p>

        ${presences.length ? presences.map((presence) => {
          const index = (this.config?.presences ?? []).indexOf(presence);
          const binding = presence.entity_binding ?? {};
          const identityList = `identity-${index}`;
          const positionList = `position-${index}`;
          return html`
            <article class="person-card">
              <div class="person-heading">
                <div><strong>${presence.name ?? presence.id}</strong><small>${presence.id}</small></div>
                <button class="danger" @click=${() => this.remove(index)}>Fjern</button>
              </div>

              <label>
                Navn på kortet
                <input .value=${presence.name ?? ""} placeholder="Marc"
                  @change=${(e: Event) => this.updatePresence(index, { name: (e.target as HTMLInputElement).value.trim() || undefined })} />
              </label>

              <div class="grid two">
                <label>
                  Identitets-entitet
                  <input list=${identityList} .value=${binding.entity ?? ""} placeholder="person.marc"
                    @change=${(e: Event) => this.updateBinding(index, { entity: (e.target as HTMLInputElement).value.trim() || undefined })} />
                  ${this.datalist(identityList)}
                  <small>Leverer navn/avatar/status. Typisk en <code>person.*</code>-entity.</small>
                </label>

                <label>
                  Live positions-entitet
                  <input list=${positionList} .value=${binding.position_entity ?? ""} placeholder="sensor.stue_presence_stuen_target_1"
                    @change=${(e: Event) => this.updateBinding(index, { position_entity: (e.target as HTMLInputElement).value.trim() || undefined })} />
                  ${this.datalist(positionList)}
                  <small>Leverer X/Y. Hvis tom bruges identitets-entiteten som før.</small>
                </label>
              </div>

              <div class="grid three">
                <label>
                  Koordinatsystem
                  <select .value=${binding.coordinate_space ?? "normalized"}
                    @change=${(e: Event) => this.updateBinding(index, { coordinate_space: (e.target as HTMLSelectElement).value as PresenceCoordinateSpace })}>
                    <option value="normalized">Normalized 0–1</option>
                    <option value="meters">Hele kortet i meter</option>
                    <option value="room_meters">Rum i meter</option>
                  </select>
                </label>
                <label>
                  X-attribut
                  <input .value=${binding.x_attribute ?? (binding.coordinate_space === "room_meters" ? "map_x" : "")}
                    placeholder="map_x"
                    @change=${(e: Event) => this.updateBinding(index, { x_attribute: (e.target as HTMLInputElement).value.trim() || undefined })} />
                </label>
                <label>
                  Y-attribut
                  <input .value=${binding.y_attribute ?? (binding.coordinate_space === "room_meters" ? "map_y" : "")}
                    placeholder="map_y"
                    @change=${(e: Event) => this.updateBinding(index, { y_attribute: (e.target as HTMLInputElement).value.trim() || undefined })} />
                </label>
              </div>

              <label>
                Rum til room_meters
                <select .value=${presence.room_id ?? ""}
                  @change=${(e: Event) => this.updatePresence(index, { room_id: (e.target as HTMLSelectElement).value || undefined })}>
                  <option value="">Ingen</option>
                  ${(this.config?.rooms ?? []).map((room) => html`<option value=${room.id}>${room.name ?? room.id}</option>`)}
                </select>
                <small>Alle targets i samme rum genbruger rummets 3-punktskalibrering.</small>
              </label>
            </article>
          `;
        }) : html`<div class="empty">Ingen personer er tilføjet endnu.</div>`}

        <div class="note">
          Første version binder identitet til et valgt target. En senere Identity Matching-del kan bevare navnet automatisk, hvis en mmWave-sensor bytter target-numre.
        </div>
      </section>
    `;
  }

  static styles = css`
    :host{display:block}.panel{display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}
    .heading,.person-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.heading>div,.person-heading>div{display:grid;gap:3px}
    .eyebrow{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:0;font-size:1rem}.intro,.note,small{color:var(--secondary-text-color);line-height:1.4}.intro,.note{margin:0;font-size:.86rem}
    .person-card{display:grid;gap:12px;padding:14px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color)}
    label{display:grid;gap:6px;font-weight:600}.grid{display:grid;gap:10px}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:1.1fr 1fr 1fr}
    input,select,button{box-sizing:border-box;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}button{cursor:pointer}.primary{border-color:var(--primary-color);color:var(--primary-color);font-weight:700}.danger{color:var(--error-color,#db4437)}
    .empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}code{font-size:.9em}
    @media(max-width:700px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}}
  `;
}
