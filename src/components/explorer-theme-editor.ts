import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type {
  ExplorerAlarmConfig,
  ExplorerCardConfig,
  ExplorerCompassConfig,
  ExplorerDayNightConfig,
  ExplorerDayNightMode,
  ExplorerOccupancyConfig,
  ExplorerTheme,
  ExplorerWeatherConfig,
  ExplorerWeatherPreviewState,
} from "../models/config";

const THEMES: [ExplorerTheme, string, string][] = [
  ["classic", "Classic", "Den neutrale Home Assistant Explorer-stil."],
  [
    "enchanted_antique",
    "Enchanted Antique Map",
    "Original magisk kortstil med pergament, sepia-blæk og levende kortdetaljer.",
  ],
];

const WEATHER_PREVIEW_STATES: Array<[ExplorerWeatherPreviewState, string]> = [
  ["live", "Følg rigtigt vejr"],
  ["sunny", "☀️ Solrigt"],
  ["partlycloudy", "🌤️ Delvist overskyet"],
  ["cloudy", "☁️ Overskyet"],
  ["rainy", "🌧️ Regn"],
  ["pouring", "🌧️ Kraftig regn"],
  ["lightning", "⚡ Torden / lyn"],
  ["lightning-rainy", "⛈️ Torden med regn"],
  ["fog", "🌫️ Tåge"],
  ["snowy", "❄️ Sne"],
  ["snowy-rainy", "🌨️ Slud / sne og regn"],
  ["hail", "🧊 Hagl"],
  ["windy", "💨 Blæst"],
  ["windy-variant", "🌬️ Blæst med skyer"],
  ["clear-night", "🌙 Klar nat"],
  ["exceptional", "⚠️ Ekstremt / usædvanligt vejr"],
];

@customElement("ha-explorer-theme-editor")
export class HaExplorerThemeEditor extends LitElement {
  @property({ attribute: false }) public config?: ExplorerCardConfig;

  private get theme(): ExplorerTheme {
    return this.config?.appearance?.theme ?? "classic";
  }

  private get dayNight(): Required<ExplorerDayNightConfig> {
    return {
      enabled: this.config?.appearance?.day_night?.enabled ?? false,
      mode: this.config?.appearance?.day_night?.mode ?? "auto",
      sun_entity: this.config?.appearance?.day_night?.sun_entity ?? "sun.sun",
      night_states: this.config?.appearance?.day_night?.night_states ?? ["below_horizon"],
      intensity: this.config?.appearance?.day_night?.intensity ?? 0.72,
    };
  }

  private get compass(): Required<ExplorerCompassConfig> {
    return {
      visible: this.config?.appearance?.compass?.visible ?? true,
      rotation: this.config?.appearance?.compass?.rotation ?? -7,
      size: this.config?.appearance?.compass?.size ?? 1,
    };
  }

  private get alarm(): Required<ExplorerAlarmConfig> {
    return {
      enabled: this.config?.appearance?.alarm?.enabled ?? false,
      entity: this.config?.appearance?.alarm?.entity ?? "",
      armed_states: this.config?.appearance?.alarm?.armed_states ?? [
        "armed_away",
        "armed_home",
        "armed_night",
        "armed_vacation",
        "armed_custom_bypass",
      ],
      triggered_states: this.config?.appearance?.alarm?.triggered_states ?? ["triggered"],
      intensity: this.config?.appearance?.alarm?.intensity ?? 0.75,
    };
  }

  private get occupancy(): Required<ExplorerOccupancyConfig> {
    return {
      enabled: this.config?.appearance?.occupancy?.enabled ?? false,
      home_states: this.config?.appearance?.occupancy?.home_states ?? ["home"],
      intensity: this.config?.appearance?.occupancy?.intensity ?? 0.65,
    };
  }

  private get weather(): Required<ExplorerWeatherConfig> {
    return {
      enabled: this.config?.appearance?.weather?.enabled ?? false,
      entity: this.config?.appearance?.weather?.entity ?? "weather.home",
      intensity: this.config?.appearance?.weather?.intensity ?? 0.6,
      preview_state: this.config?.appearance?.weather?.preview_state ?? "live",
      rain_states: this.config?.appearance?.weather?.rain_states ?? ["rainy", "pouring"],
      storm_states: this.config?.appearance?.weather?.storm_states ?? [
        "lightning",
        "lightning-rainy",
      ],
      snow_states: this.config?.appearance?.weather?.snow_states ?? [
        "snowy",
        "snowy-rainy",
        "hail",
      ],
      fog_states: this.config?.appearance?.weather?.fog_states ?? ["fog"],
      cloudy_states: this.config?.appearance?.weather?.cloudy_states ?? [
        "cloudy",
        "partlycloudy",
      ],
      wind_states: this.config?.appearance?.weather?.wind_states ?? ["windy", "windy-variant"],
      exceptional_states: this.config?.appearance?.weather?.exceptional_states ?? ["exceptional"],
    };
  }

  private emit(appearance: ExplorerCardConfig["appearance"]): void {
    if (!this.config) return;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...this.config, appearance } },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private updateTheme(theme: ExplorerTheme): void {
    this.emit({ ...this.config?.appearance, theme });
  }

  private updateDayNight(patch: Partial<ExplorerDayNightConfig>): void {
    this.emit({ ...this.config?.appearance, day_night: { ...this.dayNight, ...patch } });
  }

  private updateCompass(patch: Partial<ExplorerCompassConfig>): void {
    this.emit({ ...this.config?.appearance, compass: { ...this.compass, ...patch } });
  }

  private updateAlarm(patch: Partial<ExplorerAlarmConfig>): void {
    this.emit({ ...this.config?.appearance, alarm: { ...this.alarm, ...patch } });
  }

  private updateOccupancy(patch: Partial<ExplorerOccupancyConfig>): void {
    this.emit({ ...this.config?.appearance, occupancy: { ...this.occupancy, ...patch } });
  }

  private updateWeather(patch: Partial<ExplorerWeatherConfig>): void {
    this.emit({ ...this.config?.appearance, weather: { ...this.weather, ...patch } });
  }

  private updateSourceText(hidden: boolean): void {
    this.emit({ ...this.config?.appearance, hide_source_text: hidden });
  }

  protected render() {
    if (!this.config) return nothing;

    const selected = THEMES.find((theme) => theme[0] === this.theme) ?? THEMES[0];
    const dn = this.dayNight;
    const cp = this.compass;
    const alarm = this.alarm;
    const occupancy = this.occupancy;
    const weather = this.weather;
    const hideSourceText = this.config.appearance?.hide_source_text ?? false;

    return html`
      <section class="theme-editor">
        <div class="heading">
          <div>
            <span>Appearance · v0.40</span>
            <h3>Kortets visuelle stil</h3>
          </div>
          <b>Enchanted Atmosphere</b>
        </div>

        <div class="instruction">
          Bevar pergament, blæk og den magiske kortstil, mens atmosfære og ornamenter kan
          finjusteres.
        </div>

        <label>
          Tema
          <select
            .value=${this.theme}
            @change=${(event: Event) =>
              this.updateTheme((event.target as HTMLSelectElement).value as ExplorerTheme)}
          >
            ${THEMES.map(
              (theme) => html`<option value=${theme[0]}>${theme[1]}</option>`,
            )}
          </select>
          <small>${selected[2]}</small>
        </label>

        <div class="source-panel">
          <div class="panel-head">
            <div>
              <strong>🗺️ Tekst i plantegningen</strong>
              <small>
                Skjul tekst, der allerede findes inde i SVG-plantegningen. Explorer-rumlabels
                bliver stadig vist.
              </small>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                .checked=${hideSourceText}
                @change=${(event: Event) =>
                  this.updateSourceText((event.target as HTMLInputElement).checked)}
              />
              Skjul
            </label>
          </div>
        </div>

        ${this.theme === "enchanted_antique"
          ? html`
              <div class="compass-panel">
                <div class="panel-head">
                  <div>
                    <strong>🧭 Kompasrose</strong>
                    <small>
                      Drej kompasset så N peger mod den rigtige nordretning på din plantegning.
                    </small>
                  </div>
                  <label class="switch">
                    <input
                      type="checkbox"
                      .checked=${cp.visible}
                      @change=${(event: Event) =>
                        this.updateCompass({
                          visible: (event.target as HTMLInputElement).checked,
                        })}
                    />
                    Vis
                  </label>
                </div>
                ${cp.visible
                  ? html`
                      <div class="grid">
                        <label class="wide">
                          Rotation · ${Math.round(cp.rotation)}°
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            .value=${String(cp.rotation)}
                            @input=${(event: InputEvent) =>
                              this.updateCompass({
                                rotation: Number((event.target as HTMLInputElement).value),
                              })}
                          />
                          <small>-180° til +180° · ændres direkte i preview.</small>
                        </label>
                        <label>
                          Rotation i grader
                          <input
                            type="number"
                            min="-180"
                            max="180"
                            step="1"
                            .value=${String(cp.rotation)}
                            @change=${(event: Event) =>
                              this.updateCompass({
                                rotation: Math.min(
                                  180,
                                  Math.max(
                                    -180,
                                    Number((event.target as HTMLInputElement).value) || 0,
                                  ),
                                ),
                              })}
                          />
                        </label>
                        <label>
                          Størrelse · ${Math.round(cp.size * 100)}%
                          <input
                            type="range"
                            min="0.55"
                            max="1.8"
                            step="0.05"
                            .value=${String(cp.size)}
                            @input=${(event: InputEvent) =>
                              this.updateCompass({
                                size: Number((event.target as HTMLInputElement).value),
                              })}
                          />
                        </label>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}

        <div class="moon-panel">
          <div class="panel-head">
            <div>
              <strong>🌙 Moonlight / Day-Night</strong>
              <small>Skift automatisk til en mørkere kortstemning efter solnedgang.</small>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                .checked=${dn.enabled}
                @change=${(event: Event) =>
                  this.updateDayNight({ enabled: (event.target as HTMLInputElement).checked })}
              />
              Aktiv
            </label>
          </div>
          ${dn.enabled
            ? html`
                <div class="grid">
                  <label>
                    Tilstand
                    <select
                      .value=${dn.mode}
                      @change=${(event: Event) =>
                        this.updateDayNight({
                          mode: (event.target as HTMLSelectElement).value as ExplorerDayNightMode,
                        })}
                    >
                      <option value="auto">Automatisk via solen</option>
                      <option value="day">Tving dag</option>
                      <option value="night">Tving nat</option>
                    </select>
                  </label>
                  ${dn.mode === "auto"
                    ? html`
                        <label>
                          Sol-entity
                          <input
                            .value=${dn.sun_entity}
                            @change=${(event: Event) =>
                              this.updateDayNight({
                                sun_entity:
                                  (event.target as HTMLInputElement).value.trim() || "sun.sun",
                              })}
                          />
                        </label>
                      `
                    : nothing}
                  <label class="wide">
                    Nat-intensitet · ${Math.round(dn.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(dn.intensity)}
                      @input=${(event: InputEvent) =>
                        this.updateDayNight({
                          intensity: Number((event.target as HTMLInputElement).value),
                        })}
                    />
                  </label>
                </div>
              `
            : nothing}
        </div>

        <div class="weather-panel">
          <div class="panel-head">
            <div>
              <strong>🌧️ Weather Atmosphere</strong>
              <small>Lad vejret udenfor påvirke pergamentkortets stemning.</small>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                .checked=${weather.enabled}
                @change=${(event: Event) =>
                  this.updateWeather({ enabled: (event.target as HTMLInputElement).checked })}
              />
              Aktiv
            </label>
          </div>
          ${weather.enabled
            ? html`
                <div class="grid">
                  <label class="wide">
                    Weather-entity
                    <input
                      .value=${weather.entity}
                      placeholder="weather.home"
                      @change=${(event: Event) =>
                        this.updateWeather({
                          entity:
                            (event.target as HTMLInputElement).value.trim() || "weather.home",
                        })}
                    />
                    <small>Home Assistant weather.* entity, fx weather.forecast_home.</small>
                  </label>

                  <label class="wide simulator-box">
                    <span class="simulator-title">🌦️ Vejrsimulator · kun preview</span>
                    <select
                      .value=${weather.preview_state}
                      @change=${(event: Event) =>
                        this.updateWeather({
                          preview_state: (event.target as HTMLSelectElement)
                            .value as ExplorerWeatherPreviewState,
                        })}
                    >
                      ${WEATHER_PREVIEW_STATES.map(
                        ([value, label]) => html`<option value=${value}>${label}</option>`,
                      )}
                    </select>
                    <small>
                      Tving en vejrtype i Home Assistants kort-preview. Det gemte dashboard følger
                      stadig den rigtige weather-entity. Vælg “Følg rigtigt vejr” for normal preview.
                    </small>
                  </label>

                  <label class="wide">
                    Vejr-intensitet · ${Math.round(weather.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(weather.intensity)}
                      @input=${(event: InputEvent) =>
                        this.updateWeather({
                          intensity: Number((event.target as HTMLInputElement).value),
                        })}
                    />
                    <small>
                      Styrer hvor tydeligt regn, storm, sne, tåge og skyer vises.
                    </small>
                  </label>

                  <div class="state-box wide">
                    <strong>Automatiske vejrstates</strong>
                    <small>
                      🌧️ ${weather.rain_states.join(", ")} · ⛈️
                      ${weather.storm_states.join(", ")}
                    </small>
                    <small>
                      ❄️ ${weather.snow_states.join(", ")} · 🌫️
                      ${weather.fog_states.join(", ")} · ☁️
                      ${weather.cloudy_states.join(", ")}
                    </small>
                    <small>
                      💨 ${weather.wind_states.join(", ")} · ⚠️
                      ${weather.exceptional_states.join(", ")} · 🌙 clear-night
                    </small>
                  </div>
                </div>
              `
            : nothing}
        </div>

        <div class="occupancy-panel">
          <div class="panel-head">
            <div>
              <strong>🏠 Someone is Home</strong>
              <small>
                Gør kortet varmere og mere levende, når en konfigureret person er hjemme.
              </small>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                .checked=${occupancy.enabled}
                @change=${(event: Event) =>
                  this.updateOccupancy({ enabled: (event.target as HTMLInputElement).checked })}
              />
              Aktiv
            </label>
          </div>
          ${occupancy.enabled
            ? html`
                <div class="grid">
                  <label class="wide">
                    Hjemme-intensitet · ${Math.round(occupancy.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(occupancy.intensity)}
                      @input=${(event: InputEvent) =>
                        this.updateOccupancy({
                          intensity: Number((event.target as HTMLInputElement).value),
                        })}
                    />
                    <small>Styrer forskellen mellem Someone Home og Empty House.</small>
                  </label>
                  <div class="state-box wide">
                    <strong>Hjemme-state</strong>
                    <small>
                      ${occupancy.home_states.join(", ")} · Explorer bruger dine konfigurerede
                      person-presences automatisk.
                    </small>
                  </div>
                </div>
              `
            : nothing}
        </div>

        <div class="alarm-panel">
          <div class="panel-head">
            <div>
              <strong>🛡️ Alarm State</strong>
              <small>Lad kortets atmosfære følge et Home Assistant alarm_control_panel.</small>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                .checked=${alarm.enabled}
                @change=${(event: Event) =>
                  this.updateAlarm({ enabled: (event.target as HTMLInputElement).checked })}
              />
              Aktiv
            </label>
          </div>
          ${alarm.enabled
            ? html`
                <div class="grid">
                  <label class="wide">
                    Alarm-entity
                    <input
                      .value=${alarm.entity}
                      placeholder="alarm_control_panel.home"
                      @change=${(event: Event) =>
                        this.updateAlarm({
                          entity: (event.target as HTMLInputElement).value.trim(),
                        })}
                    />
                    <small>Vælg entity-id'et for dit alarmsystem.</small>
                  </label>
                  <label class="wide">
                    Alarm-intensitet · ${Math.round(alarm.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(alarm.intensity)}
                      @input=${(event: InputEvent) =>
                        this.updateAlarm({
                          intensity: Number((event.target as HTMLInputElement).value),
                        })}
                    />
                    <small>Styrer hvor kraftig armed/triggered-atmosfæren bliver.</small>
                  </label>
                  <div class="state-box wide">
                    <strong>Automatiske states</strong>
                    <small>Armed: ${alarm.armed_states.join(", ")}</small>
                    <small>Triggered: ${alarm.triggered_states.join(", ")}</small>
                  </div>
                </div>
              `
            : nothing}
        </div>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .theme-editor {
      margin-top: 18px;
      display: grid;
      gap: 14px;
      padding: 16px;
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--ha-card-background, var(--card-background-color));
    }

    .heading,
    .panel-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    .heading span {
      display: block;
      color: var(--secondary-text-color);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .heading h3 {
      margin: 3px 0 0;
      font-size: 1.08rem;
    }

    .heading b {
      padding: 5px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      font-size: 0.75rem;
      height: max-content;
    }

    .instruction {
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      font-size: 0.88rem;
      line-height: 1.45;
    }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.86rem;
    }

    select,
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 9px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    label small,
    .panel-head small,
    .state-box small {
      color: var(--secondary-text-color);
    }

    .moon-panel,
    .compass-panel,
    .source-panel,
    .alarm-panel,
    .occupancy-panel,
    .weather-panel {
      padding: 13px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: color-mix(in srgb, var(--secondary-background-color) 65%, transparent);
    }

    .panel-head > div,
    .state-box {
      display: grid;
      gap: 3px;
    }

    .switch {
      display: flex;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
    }

    .switch input {
      width: auto;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 12px;
    }

    .wide {
      grid-column: 1 / -1;
    }

    .state-box,
    .simulator-box {
      padding: 10px 12px;
      border-radius: 9px;
      background: var(--card-background-color);
      font-size: 0.8rem;
    }

    .simulator-box {
      border: 1px dashed color-mix(in srgb, var(--primary-color, #03a9f4) 48%, var(--divider-color));
    }

    .simulator-title {
      font-weight: 800;
      color: var(--primary-text-color);
    }

    @media (max-width: 600px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .wide {
        grid-column: auto;
      }

      .panel-head {
        align-items: flex-start;
      }
    }
  `;
}
