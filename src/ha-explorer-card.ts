import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./components/explorer-source-clean-canvas";
import "./components/explorer-ha-editor";
import type {
  ExplorerCardConfig,
  ExplorerPresence,
  ExplorerRoom,
  ExplorerWeatherEffect,
} from "./models/config";
import type { HomeAssistant } from "./types";
import { resolvePresences } from "./utils/entity-binding";
import {
  matchPresenceIdentities,
  resetIdentityTracks,
} from "./utils/identity-matcher";
const CARD_VERSION = "0.40.11";
type AlarmAtmosphereState = "normal" | "armed" | "triggered";
@customElement("ha-explorer-card")
export class HaExplorerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: Boolean, attribute: false }) public preview = false;
  @state() private config?: ExplorerCardConfig;
  public static getConfigElement(): HTMLElement {
    return document.createElement("ha-explorer-ha-editor");
  }
  public static getStubConfig(): ExplorerCardConfig {
    return {
      type: "custom:ha-explorer-card",
      title: "Home Assistant Explorer",
      floorplan_meters: { width: 4.3, height: 5.4 },
      min_zoom: 1,
      max_zoom: 6,
      initial_zoom: 1,
      fit_mode: "contain",
      appearance: {
        theme: "classic",
        hide_source_text: false,
        day_night: {
          enabled: false,
          mode: "auto",
          sun_entity: "sun.sun",
          night_states: ["below_horizon"],
          intensity: 0.72,
        },
        compass: { visible: true, rotation: -7, size: 1 },
        alarm: {
          enabled: false,
          entity: "",
          armed_states: [
            "armed_away",
            "armed_home",
            "armed_night",
            "armed_vacation",
            "armed_custom_bypass",
          ],
          triggered_states: ["triggered"],
          intensity: 0.75,
        },
        occupancy: { enabled: false, home_states: ["home"], intensity: 0.65 },
        weather: {
          enabled: false,
          entity: "weather.home",
          intensity: 0.6,
          rain_states: ["rainy", "pouring"],
          storm_states: ["lightning", "lightning-rainy"],
          snow_states: ["snowy", "snowy-rainy", "hail"],
          fog_states: ["fog"],
          cloudy_states: ["cloudy", "partlycloudy"],
          wind_states: ["windy", "windy-variant"],
          exceptional_states: ["exceptional"],
        },
      },
      rooms: [
        {
          id: "stue",
          name: "Stue",
          points: [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
          ],
          label: { x: 0.5, y: 0.5 },
          physical_meters: { width: 4.3, height: 5.4 },
        },
      ],
      zones: [],
      route_nodes: [],
      route_graph_edges: [],
      routes: [],
      openings: [],
      presences: [],
    };
  }
  public setConfig(config: ExplorerCardConfig): void {
    if (!config) throw new Error("Configuration is required");
    resetIdentityTracks();
    this.config = {
      title: "Home Assistant Explorer",
      min_zoom: 1,
      max_zoom: 6,
      initial_zoom: 1,
      fit_mode: "contain",
      rooms: [],
      zones: [],
      route_nodes: [],
      route_graph_edges: [],
      routes: [],
      openings: [],
      presences: [],
      ...config,
      appearance: { theme: "classic", ...(config.appearance ?? {}) },
    };
  }
  public getCardSize(): number {
    return 6;
  }
  public getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  private defaultRoom(): ExplorerRoom[] {
    if ((this.config?.rooms?.length ?? 0) > 0) return this.config?.rooms ?? [];
    if (!this.config?.floorplan_meters) return [];
    return [
      {
        id: "room",
        name: this.config.title ?? "Rum",
        points: [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        label: { x: 0.5, y: 0.5 },
        physical_meters: this.config.floorplan_meters,
      },
    ];
  }
  private isNight(): boolean {
    const dn = this.config?.appearance?.day_night;
    if (!dn?.enabled) return false;
    if (dn.mode === "night") return true;
    if (dn.mode === "day") return false;
    const entity = dn.sun_entity?.trim() || "sun.sun",
      state = this.hass?.states[entity]?.state?.toLowerCase();
    if (!state) return false;
    return (dn.night_states ?? ["below_horizon"])
      .map((v) => v.toLowerCase())
      .includes(state);
  }
  private weatherState(): string {
    const weather = this.config?.appearance?.weather;
    if (!weather?.enabled) return "clear";
    const previewState = weather.preview_state?.trim().toLowerCase();
    if (this.preview && previewState && previewState !== "live")
      return previewState;
    const entity = weather.entity?.trim();
    if (!entity) return "clear";
    return this.hass?.states[entity]?.state?.trim().toLowerCase() || "clear";
  }
  private weatherEffect(state = this.weatherState()): ExplorerWeatherEffect {
    const weather = this.config?.appearance?.weather;
    if (!weather?.enabled) return "clear";
    const matches = (states: string[] | undefined, fallback: string[]) =>
      new Set((states ?? fallback).map((v) => v.trim().toLowerCase())).has(
        state,
      );
    if (matches(weather.exceptional_states, ["exceptional"]))
      return "exceptional";
    if (matches(weather.storm_states, ["lightning", "lightning-rainy"]))
      return "storm";
    if (matches(weather.snow_states, ["snowy", "snowy-rainy", "hail"]))
      return "snow";
    if (matches(weather.rain_states, ["rainy", "pouring"])) return "rain";
    if (matches(weather.fog_states, ["fog"])) return "fog";
    if (matches(weather.wind_states, ["windy", "windy-variant"])) return "wind";
    if (
      state === "cloudy" ||
      state === "partlycloudy" ||
      matches(weather.cloudy_states, ["cloudy", "partlycloudy"])
    )
      return "cloudy";
    return "clear";
  }
  private alarmState(): AlarmAtmosphereState {
    const alarm = this.config?.appearance?.alarm;
    if (!alarm?.enabled) return "normal";
    const entity = alarm.entity?.trim();
    if (!entity) return "normal";
    const state = this.hass?.states[entity]?.state?.toLowerCase();
    if (!state) return "normal";
    const triggered = (alarm.triggered_states ?? ["triggered"]).map((v) =>
      v.toLowerCase(),
    );
    if (triggered.includes(state)) return "triggered";
    const armed = (
      alarm.armed_states ?? [
        "armed_away",
        "armed_home",
        "armed_night",
        "armed_vacation",
        "armed_custom_bypass",
      ]
    ).map((v) => v.toLowerCase());
    return armed.includes(state) ? "armed" : "normal";
  }
  private someoneHome(presences: ExplorerPresence[]): boolean {
    const occupancy = this.config?.appearance?.occupancy;
    if (!occupancy?.enabled) return false;
    const homeStates = (occupancy.home_states ?? ["home"])
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean);
    return (this.config?.presences ?? [])
      .filter((p) => (p.type ?? "person") === "person" && p.visible !== false)
      .some((source) => {
        const binding = source.entity_binding;
        const entity = binding?.entity?.trim();
        if (entity) {
          const state = this.hass?.states[entity]?.state?.toLowerCase();
          if (state && homeStates.includes(state)) return true;
          if (state && ["not_home", "unknown", "unavailable"].includes(state))
            return false;
        }
        const resolved = presences.find((p) => p.id === source.id);
        return Boolean(resolved?.room_id);
      });
  }
  private renderClouds() {
    const cloud = (cls: string, variant: number) =>
      html`<svg
        class=${`cloud ${cls} cloud-v${variant}`}
        viewBox="0 0 300 160"
        aria-hidden="true"
      >
        <defs>
          <filter
            id=${`cloud-soft-${cls}`}
            x="-30%"
            y="-40%"
            width="160%"
            height="190%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency=${variant === 1
                ? "0.025"
                : variant === 2
                  ? "0.032"
                  : "0.021"}
              numOctaves="2"
              seed=${String(variant * 17)}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale=${variant === 2 ? "9" : "12"}
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
            <feGaussianBlur
              in="distorted"
              stdDeviation=${variant === 3 ? "2.8" : "2.1"}
            />
          </filter>
        </defs>
        <g class="cloud-haze" filter=${`url(#cloud-soft-${cls})`}>
          <ellipse cx="150" cy="101" rx="124" ry="43" />
          <circle cx="62" cy="92" r="36" />
          <circle cx="94" cy="69" r="47" />
          <circle cx="132" cy="60" r="55" />
          <circle cx="174" cy="67" r="48" />
          <circle cx="214" cy="83" r="41" />
          <circle cx="248" cy="100" r="30" />
        </g>
        <g class="cloud-core" filter=${`url(#cloud-soft-${cls})`}>
          <ellipse cx="148" cy="105" rx="110" ry="33" />
          <circle cx="82" cy="88" r="33" />
          <circle cx="112" cy="70" r="41" />
          <circle cx="147" cy="66" r="48" />
          <circle cx="182" cy="75" r="40" />
          <circle cx="218" cy="92" r="32" />
        </g>
      </svg>`;
    return html`<div class="cloud-field" aria-hidden="true">
      ${cloud("cloud-a", 1)}${cloud("cloud-b", 2)}${cloud("cloud-c", 3)}${cloud(
        "cloud-d",
        1,
      )}${cloud("cloud-e", 2)}${cloud("cloud-f", 3)}${cloud(
        "cloud-g",
        2,
      )}${cloud("cloud-h", 1)}${cloud("cloud-i", 3)}${cloud(
        "cloud-j",
        2,
      )}${cloud("cloud-k", 1)}${cloud("cloud-l", 3)}${cloud(
        "cloud-m",
        2,
      )}${cloud("cloud-n", 1)}${cloud("cloud-o", 3)}${cloud(
        "cloud-p",
        2,
      )}${cloud("cloud-q", 1)}${cloud("cloud-r", 3)}
    </div>`;
  }
  private renderCelestialCloud() {
    return html`<div class="celestial-cloud" aria-hidden="true"></div>`;
  }
  private renderCastleSurround() {
    const castle = (side: "left" | "right") => html`<svg
      class=${`enchanted-castle-side enchanted-castle-${side}`}
      viewBox="0 0 560 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id=${`castle-moon-${side}`} cx="42%" cy="38%" r="62%">
          <stop offset="0" stop-color="#e8ce91" stop-opacity="0.2"></stop>
          <stop offset="0.62" stop-color="#b98c51" stop-opacity="0.07"></stop>
          <stop offset="1" stop-color="#5a402b" stop-opacity="0"></stop>
        </radialGradient>
        <linearGradient id=${`castle-stone-${side}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#18130f"></stop>
          <stop offset="0.52" stop-color="#090807"></stop>
          <stop offset="1" stop-color="#020303"></stop>
        </linearGradient>
        <linearGradient id=${`castle-distance-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#32271e" stop-opacity="0.78"></stop>
          <stop offset="1" stop-color="#100e0c" stop-opacity="0.92"></stop>
        </linearGradient>
        <filter id=${`castle-soft-mist-${side}`} x="-30%" y="-250%" width="160%" height="600%">
          <feGaussianBlur stdDeviation="14"></feGaussianBlur>
        </filter>
      </defs>
      ${side === "left"
        ? html`
            <circle class="castle-moon-glow" cx="116" cy="218" r="116"></circle>
            <circle class="castle-moon" cx="116" cy="218" r="68" fill=${`url(#castle-moon-${side})`}></circle>
            <path class="castle-far-hills" d="M-20 900V662C55 602 116 614 176 647c65 36 113-12 181-7 72 5 117 46 223-28v288Z"></path>
            <path class="castle-distant" d="M0 900V708l54-48 40 12 34-54 49 22 43-77 51 22 41-89 67 42 42-60 52 38 34-43 73 52v355Z"></path>
            <path class="castle-cliff" d="M64 900V758c41-38 86-46 127-27 33 15 61 7 93-15 51-36 86-27 122-2 48 32 96 1 174-49v235Z"></path>
            <g class="castle-complex" fill=${`url(#castle-stone-${side})`}>
              <path d="M67 760V592h18V548h43v44h16v168Z"></path>
              <path d="M92 548l15-73 15 73Z"></path>
              <path d="M150 754V522h18v-47h54v47h17v232Z"></path>
              <path d="M174 475l21-101 22 101Z"></path>
              <path d="M235 744V566h15v-38h54v38h18v178Z"></path>
              <path d="M254 528l22-65 23 65Z"></path>
              <path d="M310 730V439h23v-57h76v57h22v291Z"></path>
              <path d="M336 382l35-154 34 154Z"></path>
              <path d="M426 742V548h16v-44h54v44h20v194Z"></path>
              <path d="M445 504l24-92 23 92Z"></path>
              <path d="M118 645h48v21h-48zM214 615h50v20h-50zM395 603h54v23h-54z"></path>
            </g>
            <g class="castle-roof-detail">
              <path d="M88 548h38M153 522h84M236 566h85M312 439h116M427 548h86"></path>
              <path d="M107 477v-29M195 376v-36M371 230v-48M469 414v-35"></path>
              <path d="M350 438v-56M390 438v-56M183 522v-47M207 522v-47"></path>
            </g>
            <g class="castle-buttresses">
              <path d="M74 610l-18 150M142 578l-15 176M239 590l-18 154M321 475l-25 255M430 579l-19 163M501 570l20 172"></path>
            </g>
            <g class="castle-windows">
              <path class="castle-window castle-window-0" d="M100 615v30h13v-30q-6-13-13 0Z"></path>
              <path class="castle-window castle-window-2" d="M185 552v36h15v-36q-7-16-15 0Z"></path>
              <path class="castle-window castle-window-1" d="M267 592v28h13v-28q-6-13-13 0Z"></path>
              <path class="castle-window castle-window-0" d="M360 468v43h18v-43q-9-20-18 0Z"></path>
              <path class="castle-window castle-window-2" d="M359 558v29h16v-29q-8-14-16 0Z"></path>
              <path class="castle-window castle-window-1" d="M463 576v33h15v-33q-7-15-15 0Z"></path>
            </g>
          `
        : html`
            <circle class="castle-moon-glow castle-moon-dim" cx="458" cy="258" r="104"></circle>
            <path class="castle-far-hills" d="M-20 900V629c88 47 145 4 213 19 61 13 92 63 163 29 66-32 111-68 224-10v233Z"></path>
            <path class="castle-distant" d="M-20 900V560l67-47 41 47 48-72 42 32 50-105 62 67 45-83 63 65 43-47 43 53 76-55 40 44v441Z"></path>
            <path class="castle-cliff" d="M-20 900V711c76-51 135-40 190-7 47 28 84 24 129-9 52-39 94-30 136 1 43 31 91 28 145-4v208Z"></path>
            <g class="castle-complex" fill=${`url(#castle-stone-${side})`}>
              <path d="M34 746V552h18v-44h58v44h18v194Z"></path>
              <path d="M56 508l25-89 24 89Z"></path>
              <path d="M122 738V607h22v-34h68v34h19v131Z"></path>
              <path d="M145 573l33-57 31 57Z"></path>
              <path d="M221 724V472h21v-51h70v51h23v252Z"></path>
              <path d="M244 421l33-133 32 133Z"></path>
              <path d="M330 742V541h18v-42h55v42h20v201Z"></path>
              <path d="M349 499l26-88 24 88Z"></path>
              <path d="M418 754V585h16v-39h51v39h18v169Z"></path>
              <path d="M435 546l24-69 23 69Z"></path>
              <path d="M492 765V625h14v-32h36v32h18v140Z"></path>
              <path d="M504 593l19-58 17 58Z"></path>
              <path d="M95 661h58v21H95zM207 626h51v20h-51zM309 590h57v23h-57zM398 650h47v19h-47z"></path>
            </g>
            <path class="castle-bridge" d="M111 688C151 656 188 655 226 685s77 28 114-2 73-31 111 4"></path>
            <g class="castle-roof-detail">
              <path d="M35 552h92M123 607h106M222 472h112M331 541h91M419 585h83"></path>
              <path d="M81 420v-38M178 516v-35M277 289v-51M375 411v-36M459 477v-31"></path>
              <path d="M256 472v-51M296 472v-51M364 541v-42"></path>
            </g>
            <g class="castle-buttresses">
              <path d="M39 586l-20 160M124 584l18 154M224 510l-20 214M334 571l-20 171M421 615l-18 139M501 647l-14 118"></path>
            </g>
            <g class="castle-windows">
              <path class="castle-window castle-window-1" d="M73 576v34h16v-34q-8-16-16 0Z"></path>
              <path class="castle-window castle-window-0" d="M169 627v28h14v-28q-7-13-14 0Z"></path>
              <path class="castle-window castle-window-2" d="M268 505v42h18v-42q-9-20-18 0Z"></path>
              <path class="castle-window castle-window-1" d="M268 586v29h15v-29q-7-14-15 0Z"></path>
              <path class="castle-window castle-window-0" d="M367 573v34h16v-34q-8-16-16 0Z"></path>
              <path class="castle-window castle-window-2" d="M451 614v29h14v-29q-7-13-14 0Z"></path>
              <path class="castle-window castle-window-1" d="M516 647v25h12v-25q-6-12-12 0Z"></path>
            </g>
          `}
      <path class="castle-ridge" d="M-20 798C70 752 135 816 218 782s143 23 218-6 108-18 144 9"></path>
      <path class="castle-mist castle-mist-back" d="M-45 690C77 655 163 711 267 682s196-6 338-15" filter=${`url(#castle-soft-mist-${side})`}></path>
      <path class="castle-mist" d="M-45 754C73 715 170 776 279 742s205-9 329-24" filter=${`url(#castle-soft-mist-${side})`}></path>
    </svg>`;
    return html`<div class="enchanted-castle-surround" aria-hidden="true">
      ${castle("left")}${castle("right")}
    </div>`;
  }
  protected render() {
    if (!this.config) return nothing;
    const image = this.config.image ?? this.config.background ?? "",
      rooms = this.defaultRoom(),
      resolved = resolvePresences(
        this.config.presences ?? [],
        this.hass,
        rooms,
        this.config.floorplan_meters,
      ),
      presences = matchPresenceIdentities(resolved),
      theme = this.config.appearance?.theme ?? "classic",
      enchanted = theme === "enchanted_antique",
      baseNight = this.isNight(),
      intensity = Math.min(
        1,
        Math.max(0.25, this.config.appearance?.day_night?.intensity ?? 0.72),
      ),
      compass = this.config.appearance?.compass ?? {},
      hideSourceText = this.config.appearance?.hide_source_text ?? false,
      alarmState = this.alarmState(),
      alarmIntensity = Math.min(
        1,
        Math.max(0.25, this.config.appearance?.alarm?.intensity ?? 0.75),
      ),
      occupancyEnabled = this.config.appearance?.occupancy?.enabled ?? false,
      someoneHome = this.someoneHome(presences),
      occupancyIntensity = Math.min(
        1,
        Math.max(0.25, this.config.appearance?.occupancy?.intensity ?? 0.65),
      ),
      weatherEnabled = this.config.appearance?.weather?.enabled ?? false,
      weatherState = this.weatherState(),
      night = baseNight || weatherState === "clear-night",
      weatherEffect = this.weatherEffect(weatherState),
      weatherIntensity = Math.min(
        1,
        Math.max(0.25, this.config.appearance?.weather?.intensity ?? 0.6),
      ),
      hasClouds =
        weatherEnabled &&
        [
          "partlycloudy",
          "cloudy",
          "rainy",
          "pouring",
          "lightning",
          "lightning-rainy",
          "snowy",
          "snowy-rainy",
          "hail",
          "windy-variant",
          "exceptional",
        ].includes(weatherState),
      sunlit =
        weatherEnabled &&
        !night &&
        ["sunny", "clear", "partlycloudy"].includes(weatherState),
      partly = weatherState === "partlycloudy";
    return html`${this.renderCastleSurround()}<ha-card
      class=${`${enchanted ? "enchanted" : "classic"}${night ? " moonlight" : ""}${sunlit ? " sunlight" : ""}${partly ? " partly-cloudy" : ""}${hasClouds ? " has-clouds" : ""}${occupancyEnabled ? (someoneHome ? " occupied" : " empty-house") : ""}${weatherEnabled && weatherEffect !== "clear" ? ` weather-${weatherEffect}` : ""}${weatherEnabled ? ` state-${weatherState}` : ""}${alarmState === "armed" ? " alarm-armed" : ""}${alarmState === "triggered" ? " alarm-triggered" : ""}${this.preview ? " preview" : ""}`}
      style=${`--moon-intensity:${intensity};--alarm-intensity:${alarmIntensity};--occupancy-intensity:${occupancyIntensity};--weather-intensity:${weatherIntensity}`}
      ><header>
        <div>
          <span
            >${alarmState === "triggered"
              ? "⚠ Alarm Triggered"
              : alarmState === "armed"
                ? "✦ Map Secured"
                : weatherState === "partlycloudy"
                  ? night
                    ? "☾ Partly Clouded Map"
                    : "☀ Partly Clouded Map"
                  : weatherState === "clear-night"
                    ? "☾ Clear Night Map"
                    : weatherEffect === "exceptional"
                      ? "⚠ Exceptional Weather"
                      : weatherEffect === "wind"
                        ? "➳ Wind over the Map"
                        : weatherEffect === "storm"
                          ? "⛈ Storm over the Map"
                          : weatherEffect === "rain"
                            ? "☂ Rain over the Map"
                            : weatherEffect === "snow"
                              ? "❄ Snow over the Map"
                              : weatherEffect === "fog"
                                ? "◇ Mist over the Map"
                                : weatherEffect === "cloudy"
                                  ? "☁ Clouded Map"
                                  : sunlit
                                    ? "☀ Sunlit Map"
                                    : occupancyEnabled && someoneHome
                                      ? "✦ Someone is Home"
                                      : occupancyEnabled
                                        ? "◇ Empty House"
                                        : night
                                          ? "Moonlight Explorer"
                                          : enchanted
                                            ? "Enchanted Explorer"
                                            : "Explorer map"}</span
          >
          <h1>${this.config.title}</h1>
        </div>
        <small>Enchanted Atmosphere · v${CARD_VERSION}</small>
      </header>
      <div class="map-stage">
        <div class="weather-flash"></div>
        <div class="sun-overlay"></div>
        <div class="sun-disc"></div>
        <explorer-source-clean-canvas
          .theme=${theme}
          .hideSourceText=${hideSourceText}
          .weatherEffect=${weatherEnabled ? weatherEffect : "clear"}
          .weatherState=${weatherState}
          .weatherIntensity=${weatherIntensity}
          .weatherNight=${night}
          .compassVisible=${compass.visible ?? true}
          .compassRotation=${compass.rotation ?? -7}
          .compassSize=${compass.size ?? 1}
          .hass=${this.hass}
          .image=${image}
          .rooms=${rooms}
          .zones=${this.config.zones ?? []}
          .routeNodes=${this.config.route_nodes ?? []}
          .routeGraphEdges=${this.config.route_graph_edges ?? []}
          .routes=${this.config.routes ?? []}
          .openings=${this.config.openings ?? []}
          .presences=${presences}
          .minZoom=${this.config.min_zoom ?? 1}
          .maxZoom=${this.config.max_zoom ?? 6}
          .initialZoom=${this.config.initial_zoom ?? 1}
          .fitMode=${this.config.fit_mode ?? "contain"}
        ></explorer-source-clean-canvas>
        <div class="occupancy-overlay"></div>
        <div class="moon-overlay"></div>
        <div class="moon-disc"><span></span></div>
        ${partly ? this.renderCelestialCloud() : nothing}
        <div class="night-vignette"></div>
        <div class="alarm-overlay"></div>
        <div class="alarm-vignette"></div></div
    ></ha-card>`;
  }
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }
    ha-card {
      width: 100%;
      overflow: hidden;
      transition:
        background 0.6s,
        color 0.6s;
    }
    .enchanted-castle-surround {
      display: none;
    }
    @media (min-width: 900px) and (min-height: 600px) {
      :host {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        border-radius: 18px;
        background:
          radial-gradient(
            ellipse at 50% 46%,
            rgba(194, 144, 74, 0.34) 0%,
            rgba(82, 60, 40, 0.22) 34%,
            transparent 60%
          ),
          repeating-linear-gradient(
            112deg,
            transparent 0 55px,
            rgba(222, 187, 119, 0.055) 56px 57px,
            transparent 58px 112px
          ),
          linear-gradient(90deg, #211b18 0%, #3f3328 28%, #493927 50%, #3f3328 72%, #211b18 100%);
        box-shadow:
          inset 0 0 78px rgba(7, 5, 4, 0.72),
          inset 0 0 2px rgba(238, 205, 142, 0.28);
      }
      :host::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(circle at 8% 17%, rgba(249, 218, 145, 0.88) 0 1px, transparent 2.2px),
          radial-gradient(circle at 17% 42%, rgba(230, 192, 118, 0.68) 0 1.2px, transparent 2.5px),
          radial-gradient(circle at 11% 73%, rgba(248, 219, 151, 0.72) 0 0.9px, transparent 2.2px),
          radial-gradient(circle at 25% 88%, rgba(217, 174, 99, 0.58) 0 1px, transparent 2.4px),
          radial-gradient(circle at 92% 20%, rgba(249, 218, 145, 0.88) 0 1px, transparent 2.2px),
          radial-gradient(circle at 83% 47%, rgba(230, 192, 118, 0.68) 0 1.2px, transparent 2.5px),
          radial-gradient(circle at 90% 76%, rgba(248, 219, 151, 0.72) 0 0.9px, transparent 2.2px),
          radial-gradient(circle at 76% 91%, rgba(217, 174, 99, 0.58) 0 1px, transparent 2.4px);
        filter: drop-shadow(0 0 6px rgba(231, 190, 107, 0.62));
        animation: explorerSurroundTwinkle 7.5s ease-in-out infinite alternate;
      }
      :host::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse at center, transparent 36%, rgba(11, 8, 6, 0.28) 76%, rgba(8, 6, 5, 0.58) 100%),
          linear-gradient(90deg, rgba(231, 196, 127, 0.05), transparent 18% 82%, rgba(231, 196, 127, 0.05));
      }
      .enchanted-castle-surround {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }
      .enchanted-castle-side {
        position: absolute;
        bottom: 0;
        width: 33.5%;
        max-width: 560px;
        height: 100%;
        overflow: visible;
        opacity: 0.94;
        filter:
          drop-shadow(0 -8px 22px rgba(194, 143, 74, 0.11))
          drop-shadow(0 10px 22px rgba(0, 0, 0, 0.32));
      }
      .enchanted-castle-left {
        left: 0;
      }
      .enchanted-castle-right {
        right: 0;
      }
      .castle-moon-glow {
        fill: rgba(226, 190, 116, 0.1);
        filter: blur(30px);
      }
      .castle-moon {
        stroke: rgba(225, 192, 124, 0.16);
        stroke-width: 2;
      }
      .castle-moon-dim {
        opacity: 0.48;
      }
      .castle-far-hills {
        fill: rgba(24, 19, 16, 0.55);
      }
      .enchanted-castle-left .castle-distant {
        fill: url(#castle-distance-left);
      }
      .enchanted-castle-right .castle-distant {
        fill: url(#castle-distance-right);
      }
      .castle-distant {
        opacity: 0.42;
        filter: blur(0.45px);
      }
      .castle-cliff {
        fill: rgba(5, 5, 5, 0.88);
      }
      .castle-complex {
        stroke: rgba(203, 162, 97, 0.24);
        stroke-width: 1.25;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }
      .castle-roof-detail,
      .castle-buttresses {
        fill: none;
        stroke: rgba(207, 168, 105, 0.22);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }
      .castle-buttresses {
        stroke: rgba(180, 139, 82, 0.14);
        stroke-width: 3;
      }
      .castle-bridge {
        fill: none;
        stroke: rgba(4, 4, 4, 0.94);
        stroke-width: 19;
        stroke-linecap: round;
        filter:
          drop-shadow(0 -2px 0 rgba(208, 165, 94, 0.16))
          drop-shadow(0 7px 5px rgba(0, 0, 0, 0.42));
      }
      .castle-ridge {
        fill: none;
        stroke: rgba(2, 3, 3, 0.96);
        stroke-width: 128;
        stroke-linecap: round;
        filter: drop-shadow(0 -2px 0 rgba(181, 141, 83, 0.11));
      }
      .castle-window {
        fill: rgba(238, 177, 76, 0.76);
        stroke: rgba(255, 218, 137, 0.24);
        stroke-width: 0.8;
        filter:
          drop-shadow(0 0 3px rgba(239, 164, 55, 0.82))
          drop-shadow(0 0 9px rgba(219, 133, 35, 0.38));
        animation: explorerCastleWindow 5.8s ease-in-out infinite alternate;
      }
      .castle-window-1 {
        animation-delay: -2.2s;
        animation-duration: 7.1s;
      }
      .castle-window-2 {
        animation-delay: -4.1s;
        animation-duration: 4.9s;
      }
      .castle-mist {
        fill: none;
        stroke: rgba(224, 199, 151, 0.15);
        stroke-width: 34;
        stroke-linecap: round;
        animation: explorerCastleMist 14s ease-in-out infinite alternate;
      }
      .castle-mist-back {
        stroke: rgba(198, 174, 133, 0.1);
        stroke-width: 45;
        animation-direction: alternate-reverse;
        animation-duration: 19s;
      }
      ha-card:not(.preview) {
        position: relative;
        z-index: 1;
        max-width: min(1100px, calc(100dvh - 148px));
        margin-inline: auto;
        border: 1px solid rgba(211, 173, 105, 0.42);
        box-shadow:
          0 0 0 1px rgba(61, 41, 25, 0.72),
          0 0 34px rgba(229, 183, 99, 0.20),
          0 18px 48px rgba(5, 4, 3, 0.58);
      }
    }
    ha-card.preview explorer-source-clean-canvas {
      --explorer-viewport-max-height: min(52vh, 520px);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 20px;
      color: var(--primary-text-color);
      background: var(--ha-card-background, var(--card-background-color));
      transition:
        background 0.6s,
        color 0.6s;
    }
    header span {
      display: block;
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }
    h1 {
      margin: 3px 0 0;
      font-size: 1.25rem;
    }
    small {
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .map-stage {
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }
    .map-stage explorer-source-clean-canvas {
      position: relative;
      z-index: 4;
      display: block;
    }
    .occupancy-overlay,
    .weather-overlay,
    .weather-particles,
    .weather-flash,
    .sun-overlay,
    .sun-disc,
    .moon-overlay,
    .night-vignette,
    .moon-disc,
    .alarm-overlay,
    .alarm-vignette {
      position: absolute;
      pointer-events: none;
      opacity: 0;
      transition:
        opacity 0.7s,
        filter 0.7s;
    }
    .occupancy-overlay {
      inset: 0;
      z-index: 7;
    }
    .occupied .occupancy-overlay {
      opacity: calc(0.32 * var(--occupancy-intensity));
      background:
        radial-gradient(
          circle at 34% 28%,
          rgba(255, 220, 142, 0.36),
          transparent 31%
        ),
        radial-gradient(
          circle at 68% 63%,
          rgba(205, 148, 70, 0.18),
          transparent 38%
        );
      mix-blend-mode: soft-light;
    }
    .empty-house .occupancy-overlay {
      opacity: calc(0.2 * var(--occupancy-intensity));
      background: linear-gradient(
        145deg,
        rgba(71, 64, 55, 0.16),
        rgba(42, 49, 57, 0.18)
      );
      mix-blend-mode: multiply;
    }
    .weather-overlay,
    .weather-particles,
    .weather-flash {
      inset: 0;
      z-index: 3;
      overflow: hidden;
    }
    .weather-flash {
      z-index: 6;
    }
    .cloud-field {
      position: absolute;
      inset: 0;
      z-index: 5;
      pointer-events: none;
      overflow: hidden;
      opacity: calc(0.96 * var(--weather-intensity));
      filter: sepia(0.42) saturate(0.82) contrast(1.03);
    }
    .partly-cloudy .cloud-field {
      opacity: calc(0.78 * var(--weather-intensity));
    }
    .state-rainy .cloud-field,
    .state-pouring .cloud-field,
    .state-lightning .cloud-field,
    .state-lightning-rainy .cloud-field {
      opacity: calc(1 * var(--weather-intensity));
      filter: sepia(0.6) saturate(0.62) brightness(0.84);
    }
    .state-cloudy .cloud-field {
      opacity: calc(1 * var(--weather-intensity));
      filter: sepia(0.5) saturate(0.7) brightness(0.9) contrast(1.04);
    }
    .cloud {
      position: absolute;
      height: auto;
      overflow: visible;
      will-change: transform;
      transform-origin: center;
      filter: drop-shadow(0 8px 18px rgba(64, 47, 29, 0.22));
    }
    .cloud-haze {
      fill: rgba(211, 186, 139, 0.28);
    }
    .cloud-core {
      fill: rgba(232, 209, 163, 0.58);
    }
    .cloud-v2 .cloud-haze {
      fill: rgba(196, 172, 133, 0.25);
    }
    .cloud-v2 .cloud-core {
      fill: rgba(221, 199, 158, 0.52);
    }
    .cloud-v3 .cloud-haze {
      fill: rgba(177, 158, 129, 0.24);
    }
    .cloud-v3 .cloud-core {
      fill: rgba(210, 190, 154, 0.48);
    }
    .cloud-a {
      left: 24%;
      top: -3%;
      width: 34%;
      opacity: 0.8;
      animation: cloudDriftA 58s ease-in-out infinite alternate;
    }
    .cloud-b {
      right: -9%;
      top: 10%;
      width: 38%;
      opacity: 0.88;
      animation: cloudDriftB 46s ease-in-out infinite alternate;
    }
    .cloud-c {
      left: -12%;
      top: 26%;
      width: 40%;
      opacity: 0.82;
      animation: cloudDriftC 54s ease-in-out infinite alternate;
    }
    .cloud-d {
      right: -11%;
      top: 34%;
      width: 35%;
      opacity: 0.74;
      animation: cloudDriftA 62s ease-in-out infinite alternate-reverse;
    }
    .cloud-e {
      left: -8%;
      top: 48%;
      width: 34%;
      opacity: 0.7;
      animation: cloudDriftB 51s ease-in-out infinite alternate;
    }
    .cloud-f {
      right: 3%;
      top: 55%;
      width: 33%;
      opacity: 0.76;
      animation: cloudDriftC 64s ease-in-out infinite alternate-reverse;
    }
    .cloud-g {
      left: 7%;
      top: 68%;
      width: 31%;
      opacity: 0.72;
      animation: cloudDriftA 69s ease-in-out infinite alternate-reverse;
    }
    .cloud-h {
      right: -8%;
      top: 73%;
      width: 39%;
      opacity: 0.82;
      animation: cloudDriftB 57s ease-in-out infinite alternate;
    }
    .cloud-i {
      left: -10%;
      top: 82%;
      width: 37%;
      opacity: 0.7;
      animation: cloudDriftC 66s ease-in-out infinite alternate;
    }
    .cloud-j {
      left: 33%;
      top: 88%;
      width: 35%;
      opacity: 0.66;
      animation: cloudDriftA 72s ease-in-out infinite alternate;
    }
    .cloud-k {
      right: 19%;
      top: 24%;
      width: 28%;
      opacity: 0.56;
      animation: cloudDriftC 61s ease-in-out infinite alternate;
    }
    .cloud-l {
      left: 18%;
      top: 40%;
      width: 27%;
      opacity: 0.52;
      animation: cloudDriftB 67s ease-in-out infinite alternate-reverse;
    }
    .cloud-m {
      left: 43%;
      top: 11%;
      width: 29%;
      opacity: 0.58;
      animation: cloudDriftA 55s ease-in-out infinite alternate;
    }
    .cloud-n {
      left: 37%;
      top: 29%;
      width: 32%;
      opacity: 0.62;
      animation: cloudDriftC 63s ease-in-out infinite alternate-reverse;
    }
    .cloud-o {
      right: 19%;
      top: 43%;
      width: 30%;
      opacity: 0.57;
      animation: cloudDriftB 59s ease-in-out infinite alternate;
    }
    .cloud-p {
      left: 31%;
      top: 57%;
      width: 34%;
      opacity: 0.64;
      animation: cloudDriftA 70s ease-in-out infinite alternate-reverse;
    }
    .cloud-q {
      right: 22%;
      top: 69%;
      width: 31%;
      opacity: 0.56;
      animation: cloudDriftC 65s ease-in-out infinite alternate;
    }
    .cloud-r {
      left: 42%;
      top: 79%;
      width: 29%;
      opacity: 0.54;
      animation: cloudDriftB 74s ease-in-out infinite alternate-reverse;
    }
    .has-clouds:not(.state-cloudy) .cloud-m,
    .has-clouds:not(.state-cloudy) .cloud-n,
    .has-clouds:not(.state-cloudy) .cloud-o,
    .has-clouds:not(.state-cloudy) .cloud-p,
    .has-clouds:not(.state-cloudy) .cloud-q,
    .has-clouds:not(.state-cloudy) .cloud-r {
      display: none;
    }
    .partly-cloudy .cloud-c,
    .partly-cloudy .cloud-d,
    .partly-cloudy .cloud-e,
    .partly-cloudy .cloud-f,
    .partly-cloudy .cloud-g,
    .partly-cloudy .cloud-h,
    .partly-cloudy .cloud-i {
      display: none;
    }
    .partly-cloudy .cloud-a {
      opacity: 0.66;
    }
    .partly-cloudy .cloud-b {
      opacity: 0.72;
    }
    .partly-cloudy .cloud-j {
      opacity: 0.42;
    }
    .partly-cloudy .cloud-k {
      opacity: 0.52;
    }
    .partly-cloudy .cloud-l {
      opacity: 0.46;
    }
    .sun-overlay {
      inset: 0;
      z-index: 5;
      background:
        radial-gradient(
          circle at 12% 14%,
          rgba(255, 236, 177, 0.62) 0,
          rgba(244, 193, 92, 0.24) 18%,
          transparent 39%
        ),
        linear-gradient(
          132deg,
          rgba(255, 222, 146, 0.19) 0,
          rgba(245, 196, 91, 0.08) 34%,
          transparent 58%
        );
      mix-blend-mode: screen;
    }
    .sun-overlay:after {
      display: none;
    }
    .sun-disc {
      z-index: 6;
      left: 7.5%;
      top: 7%;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        #fff0bc 0,
        #f2c56d 38%,
        #d69635 63%,
        rgba(186, 112, 32, 0.08) 72%,
        transparent 74%
      );
      filter: drop-shadow(0 0 10px rgba(224, 158, 48, 0.48))
        drop-shadow(0 0 30px rgba(244, 199, 102, 0.36));
    }
    .sun-disc:before {
      content: "";
      position: absolute;
      inset: -44%;
      border-radius: 50%;
      background: repeating-conic-gradient(
        rgba(244, 197, 94, 0.2) 0deg 5deg,
        transparent 5deg 15deg
      );
      mask-image: radial-gradient(
        circle,
        transparent 0 27%,
        #000 31% 58%,
        transparent 74%
      );
      animation: sunBreathe 8s ease-in-out infinite;
    }
    .sunlight .sun-overlay {
      opacity: calc(0.82 * var(--weather-intensity));
    }
    .sunlight .sun-disc {
      opacity: calc(0.9 * var(--weather-intensity));
    }
    .partly-cloudy .sun-overlay {
      opacity: calc(0.62 * var(--weather-intensity));
    }
    .partly-cloudy .sun-disc {
      opacity: calc(0.74 * var(--weather-intensity));
    }
    .celestial-cloud {
      position: absolute;
      pointer-events: none;
      width: 134px;
      height: 64px;
      opacity: 0;
      z-index: 7;
      will-change: transform, opacity;
      transform-origin: center;
      filter: drop-shadow(0 5px 10px rgba(64, 48, 31, 0.16));
    }
    .celestial-cloud:before {
      content: "";
      position: absolute;
      inset: 4px 0 8px;
      border-radius: 48% 52% 46% 54%;
      background:
        radial-gradient(
          ellipse at 14% 67%,
          rgba(207, 191, 163, 0.58) 0 20%,
          transparent 23%
        ),
        radial-gradient(
          ellipse at 30% 44%,
          rgba(235, 222, 194, 0.64) 0 28%,
          transparent 32%
        ),
        radial-gradient(
          ellipse at 48% 30%,
          rgba(246, 232, 203, 0.68) 0 31%,
          transparent 35%
        ),
        radial-gradient(
          ellipse at 67% 40%,
          rgba(230, 215, 185, 0.64) 0 28%,
          transparent 32%
        ),
        radial-gradient(
          ellipse at 84% 65%,
          rgba(199, 180, 148, 0.54) 0 21%,
          transparent 24%
        ),
        linear-gradient(
          to bottom,
          transparent 26%,
          rgba(222, 205, 176, 0.48) 46%,
          rgba(177, 151, 116, 0.35) 74%,
          transparent 92%
        );
      filter: blur(1.35px);
      transform: skewX(-7deg);
      opacity: 0.92;
    }
    .celestial-cloud:after {
      content: "";
      position: absolute;
      left: 10%;
      top: 41%;
      width: 80%;
      height: 25%;
      border-radius: 50%;
      background:
        radial-gradient(
          ellipse at 24% 50%,
          rgba(246, 233, 207, 0.32) 0 24%,
          transparent 50%
        ),
        radial-gradient(
          ellipse at 56% 45%,
          rgba(236, 221, 193, 0.28) 0 32%,
          transparent 58%
        ),
        radial-gradient(
          ellipse at 82% 52%,
          rgba(201, 181, 150, 0.22) 0 22%,
          transparent 48%
        );
      filter: blur(3.2px);
      transform: translateY(10px) scaleX(0.94);
      opacity: 0.86;
    }
    .partly-cloudy:not(.moonlight) .celestial-cloud {
      left: 2.2%;
      top: 6.3%;
      opacity: 0.74;
      mix-blend-mode: normal;
      animation: celestialCloudSunDrift 20s ease-in-out infinite;
    }
    .partly-cloudy:not(.moonlight) .sun-disc {
      animation: celestialSunVeil 20s ease-in-out infinite;
    }
    .partly-cloudy:not(.moonlight) .sun-overlay {
      animation: celestialSunGlow 20s ease-in-out infinite;
    }
    .partly-cloudy.moonlight .celestial-cloud {
      right: 2.4%;
      top: 4.9%;
      left: auto;
      z-index: 10;
      opacity: 0.6;
      filter: drop-shadow(0 5px 11px rgba(12, 19, 28, 0.22));
      animation: celestialCloudMoonDrift 24s ease-in-out infinite;
    }
    .partly-cloudy.moonlight .celestial-cloud:before {
      background:
        radial-gradient(
          ellipse at 14% 67%,
          rgba(132, 143, 153, 0.46) 0 20%,
          transparent 23%
        ),
        radial-gradient(
          ellipse at 30% 44%,
          rgba(194, 201, 205, 0.52) 0 28%,
          transparent 32%
        ),
        radial-gradient(
          ellipse at 48% 30%,
          rgba(214, 218, 216, 0.56) 0 31%,
          transparent 35%
        ),
        radial-gradient(
          ellipse at 67% 40%,
          rgba(179, 188, 194, 0.5) 0 28%,
          transparent 32%
        ),
        radial-gradient(
          ellipse at 84% 65%,
          rgba(112, 124, 135, 0.42) 0 21%,
          transparent 24%
        ),
        linear-gradient(
          to bottom,
          transparent 26%,
          rgba(178, 187, 191, 0.36) 46%,
          rgba(85, 99, 112, 0.28) 74%,
          transparent 92%
        );
    }
    .partly-cloudy.moonlight .celestial-cloud:after {
      background:
        radial-gradient(
          ellipse at 24% 50%,
          rgba(213, 219, 220, 0.24) 0 24%,
          transparent 50%
        ),
        radial-gradient(
          ellipse at 56% 45%,
          rgba(188, 197, 202, 0.22) 0 32%,
          transparent 58%
        ),
        radial-gradient(
          ellipse at 82% 52%,
          rgba(114, 128, 139, 0.18) 0 22%,
          transparent 48%
        );
    }
    .partly-cloudy.moonlight .moon-disc {
      animation: celestialMoonVeil 24s ease-in-out infinite;
    }
    .partly-cloudy.moonlight .sun-overlay,
    .partly-cloudy.moonlight .sun-disc {
      opacity: 0 !important;
      animation: none;
    }
    .weather-fog .weather-overlay {
      opacity: calc(0.66 * var(--weather-intensity));
      inset: -12%;
      background:
        radial-gradient(ellipse at 18% 21%, rgba(241, 234, 216, 0.42) 0 12%, transparent 31%),
        radial-gradient(ellipse at 76% 48%, rgba(225, 218, 202, 0.38) 0 15%, transparent 37%),
        radial-gradient(ellipse at 32% 76%, rgba(238, 231, 213, 0.34) 0 17%, transparent 42%),
        repeating-linear-gradient(0deg, rgba(232, 225, 208, 0.17) 0 34px, rgba(115, 112, 105, 0.08) 34px 58px, transparent 58px 104px);
      filter: blur(11px);
      animation: weatherDrift 18s ease-in-out infinite alternate;
    }
    .weather-rain .weather-overlay,
    .weather-storm .weather-overlay {
      opacity: calc(0.36 * var(--weather-intensity));
      background: linear-gradient(
        145deg,
        rgba(38, 49, 58, 0.28),
        rgba(29, 36, 42, 0.13)
      );
      mix-blend-mode: multiply;
    }
    .weather-rain .weather-particles,
    .weather-storm .weather-particles {
      opacity: calc(0.54 * var(--weather-intensity));
      inset: -15% -10%;
      background: repeating-linear-gradient(
        105deg,
        transparent 0 18px,
        rgba(55, 65, 68, 0.34) 18px 19px,
        transparent 19px 37px
      );
      background-size: 48px 96px;
      animation: weatherRain 1.1s linear infinite;
    }
    .state-pouring .weather-overlay {
      opacity: calc(0.58 * var(--weather-intensity));
      background: linear-gradient(145deg, rgba(25, 35, 42, 0.42), rgba(18, 25, 30, 0.24));
    }
    .state-pouring .weather-particles {
      opacity: calc(0.92 * var(--weather-intensity));
      background: repeating-linear-gradient(105deg, transparent 0 10px, rgba(44, 55, 60, 0.55) 10px 12px, transparent 12px 23px);
      background-size: 34px 62px;
      animation-duration: 0.52s;
    }
    .state-lightning .weather-particles {
      opacity: calc(0.14 * var(--weather-intensity));
      animation-duration: 1.4s;
    }
    .state-lightning-rainy .weather-particles {
      opacity: calc(0.78 * var(--weather-intensity));
      background-size: 38px 72px;
      animation-duration: 0.72s;
    }
    .weather-snow .weather-overlay {
      opacity: calc(0.3 * var(--weather-intensity));
      background: rgba(225, 224, 214, 0.22);
    }
    .weather-snow .weather-particles {
      opacity: calc(0.64 * var(--weather-intensity));
      inset: -10%;
      background-image:
        radial-gradient(
          circle,
          rgba(248, 244, 226, 0.9) 0 2px,
          transparent 2.5px
        ),
        radial-gradient(
          circle,
          rgba(236, 232, 216, 0.75) 0 1.5px,
          transparent 2px
        );
      background-size:
        46px 52px,
        71px 78px;
      background-position:
        0 0,
        22px 19px;
      animation: weatherSnow 8s linear infinite;
    }
    .state-snowy-rainy .weather-particles::after {
      content: "";
      position: absolute;
      inset: -12%;
      background: repeating-linear-gradient(105deg, transparent 0 19px, rgba(57, 67, 70, 0.34) 19px 20px, transparent 20px 39px);
      background-size: 52px 96px;
      animation: weatherRain 1.15s linear infinite;
    }
    .state-hail .weather-particles {
      opacity: calc(0.86 * var(--weather-intensity));
      background-image:
        radial-gradient(circle, rgba(250, 247, 232, 0.96) 0 3.4px, rgba(100, 111, 118, 0.52) 3.7px 4.5px, transparent 4.9px),
        radial-gradient(circle, rgba(239, 239, 228, 0.9) 0 2.6px, rgba(92, 103, 110, 0.44) 2.9px 3.7px, transparent 4px);
      background-size: 48px 58px, 71px 76px;
      animation: weatherHail 0.88s linear infinite;
    }
    .weather-storm .weather-flash {
      opacity: 0;
      background:
        radial-gradient(
          circle at 72% 18%,
          rgba(255, 246, 214, 0.55),
          transparent 28%
        ),
        rgba(255, 242, 203, 0.18);
      mix-blend-mode: screen;
      animation: weatherLightning 6.5s steps(1, end) infinite;
    }
    .weather-storm .weather-flash::before,
    .weather-storm .weather-flash::after {
      content: "";
      position: absolute;
      width: 9%;
      height: 48%;
      top: 5%;
      background: rgba(255, 241, 190, 0.92);
      filter: drop-shadow(0 0 8px rgba(255, 232, 158, 0.88));
      clip-path: polygon(48% 0, 100% 0, 66% 34%, 96% 34%, 25% 100%, 43% 53%, 6% 53%);
    }
    .weather-storm .weather-flash::before { left: 69%; transform: rotate(7deg); }
    .weather-storm .weather-flash::after { left: 25%; top: 21%; height: 34%; transform: rotate(-8deg) scale(0.72); opacity: 0.72; }
    .weather-wind .weather-overlay {
      opacity: calc(0.22 * var(--weather-intensity));
      background: linear-gradient(96deg, transparent 0 20%, rgba(79, 72, 61, 0.15) 46%, transparent 72%);
      animation: weatherWindShade 5.5s ease-in-out infinite;
    }
    .weather-wind .weather-particles {
      opacity: calc(0.68 * var(--weather-intensity));
      inset: -10% -24%;
      background: repeating-linear-gradient(176deg, transparent 0 23px, rgba(77, 70, 60, 0.42) 23px 25px, transparent 25px 57px);
      background-size: 180px 76px;
      mask-image: repeating-linear-gradient(90deg, #000 0 82px, transparent 82px 132px);
      animation: weatherWind 2.8s linear infinite;
    }
    .weather-exceptional .weather-overlay {
      opacity: calc(0.48 * var(--weather-intensity));
      background: radial-gradient(ellipse at center, transparent 30%, rgba(91, 39, 27, 0.48) 100%), linear-gradient(145deg, rgba(37, 29, 28, 0.24), rgba(105, 48, 30, 0.18));
      mix-blend-mode: multiply;
      animation: weatherExceptional 2.4s ease-in-out infinite;
    }
    .weather-exceptional .weather-particles {
      opacity: calc(0.62 * var(--weather-intensity));
      inset: -18%;
      background: repeating-radial-gradient(ellipse at center, transparent 0 34px, rgba(100, 54, 38, 0.22) 35px 37px, transparent 38px 74px);
      animation: weatherExceptionalSpin 15s linear infinite;
    }
    .moon-overlay {
      inset: 0;
      z-index: 8;
      background:
        radial-gradient(
          circle at 88% 11%,
          rgba(230, 224, 197, calc(0.3 * var(--moon-intensity))) 0,
          rgba(185, 181, 161, calc(0.1 * var(--moon-intensity))) 16%,
          transparent 34%
        ),
        linear-gradient(
          145deg,
          rgba(49, 52, 56, calc(0.08 * var(--moon-intensity))),
          rgba(28, 34, 42, calc(0.25 * var(--moon-intensity)))
        );
      mix-blend-mode: multiply;
    }
    .night-vignette {
      inset: 0;
      background: radial-gradient(
        ellipse at center,
        transparent 46%,
        rgba(18, 22, 28, calc(0.2 * var(--moon-intensity))) 100%
      );
      z-index: 9;
    }
    .moon-disc {
      right: 7.5%;
      top: 4.5%;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      z-index: 9;
      filter: drop-shadow(0 0 9px rgba(87, 69, 47, 0.22))
        drop-shadow(0 0 22px rgba(225, 211, 174, 0.18));
      transform: rotate(-8deg);
    }
    .moon-disc:before,
    .moon-disc:after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1px solid rgba(70, 51, 32, 0.28);
    }
    .moon-disc:after {
      inset: -7px;
      border-color: rgba(83, 61, 38, 0.14);
      transform: rotate(17deg);
    }
    .moon-disc span {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background:
        radial-gradient(
          circle at 33% 31%,
          rgba(247, 233, 190, 0.82) 0 8%,
          transparent 9%
        ),
        radial-gradient(
          circle at 64% 61%,
          rgba(85, 67, 47, 0.2) 0 8%,
          transparent 9%
        ),
        radial-gradient(
          circle at 45% 72%,
          rgba(95, 75, 52, 0.16) 0 5%,
          transparent 6%
        ),
        radial-gradient(
          circle at 42% 38%,
          #e7d7a8 0,
          #c9b681 58%,
          #8f754f 76%,
          rgba(87, 65, 43, 0.1) 77%,
          transparent 80%
        );
      box-shadow:
        inset -9px -7px 10px rgba(69, 51, 36, 0.22),
        inset 4px 3px 8px rgba(255, 244, 205, 0.24),
        0 0 18px rgba(215, 197, 151, 0.16);
    }
    .moon-disc span:after {
      content: "";
      position: absolute;
      left: 48%;
      top: 14%;
      width: 34%;
      height: 58%;
      border-left: 1px solid rgba(72, 51, 33, 0.18);
      border-radius: 50%;
      transform: rotate(22deg);
    }
    .moonlight .moon-overlay,
    .moonlight .night-vignette {
      opacity: 1;
    }
    .moonlight .moon-disc {
      opacity: calc(0.72 * var(--moon-intensity));
    }
    .moonlight header {
      background: linear-gradient(100deg, #403d3a, #34383f);
      color: #eee8dc;
    }
    .moonlight {
      background: #4a4843;
    }
    .moonlight .map-stage {
      background: #4a4843;
    }
    .alarm-overlay,
    .alarm-vignette {
      inset: 0;
      z-index: 10;
    }
    .alarm-armed .alarm-overlay {
      opacity: calc(0.13 * var(--alarm-intensity));
      background: linear-gradient(
        145deg,
        rgba(72, 54, 31, 0.75),
        rgba(116, 86, 42, 0.28)
      );
      mix-blend-mode: multiply;
    }
    .alarm-armed .alarm-vignette {
      opacity: calc(0.38 * var(--alarm-intensity));
      background: radial-gradient(
        ellipse at center,
        transparent 48%,
        rgba(57, 35, 18, 0.55) 100%
      );
    }
    .alarm-triggered .alarm-overlay {
      opacity: calc(0.52 * var(--alarm-intensity));
      background: repeating-linear-gradient(
        135deg,
        rgba(106, 15, 15, 0.42) 0 34px,
        rgba(64, 8, 8, 0.18) 34px 68px
      );
      mix-blend-mode: multiply;
      animation: alarmPulse 1.45s ease-in-out infinite;
    }
    .alarm-triggered .alarm-vignette {
      opacity: calc(0.88 * var(--alarm-intensity));
      background: radial-gradient(
        ellipse at center,
        transparent 32%,
        rgba(86, 7, 7, 0.72) 100%
      );
      animation: alarmVignette 1.45s ease-in-out infinite;
    }
    .alarm-triggered header {
      color: #f8e6dc;
      background: linear-gradient(100deg, #5d211c, #321615) !important;
    }
    .alarm-triggered header span,
    .alarm-triggered header small {
      color: #efc6b3;
    }
    @keyframes cloudDriftA {
      0% {
        transform: translate3d(-5%, 0, 0) scale(0.98);
      }
      45% {
        transform: translate3d(2%, 1.5%, 0) scale(1.015);
      }
      100% {
        transform: translate3d(9%, -1%, 0) scale(1.035);
      }
    }
    @keyframes cloudDriftB {
      0% {
        transform: translate3d(6%, -1%, 0) scale(1.02);
      }
      50% {
        transform: translate3d(0, 1%, 0) scale(0.985);
      }
      100% {
        transform: translate3d(-10%, 2%, 0) scale(1.01);
      }
    }
    @keyframes cloudDriftC {
      0% {
        transform: translate3d(-7%, 1%, 0) scale(0.97);
      }
      42% {
        transform: translate3d(1%, -1%, 0) scale(1.025);
      }
      100% {
        transform: translate3d(8%, 1.5%, 0) scale(0.99);
      }
    }
    @keyframes sunBreathe {
      0%,
      100% {
        transform: scale(0.96);
        opacity: 0.72;
      }
      50% {
        transform: scale(1.06);
        opacity: 1;
      }
    }
    @keyframes celestialCloudSunDrift {
      0% {
        transform: translate3d(-72px, -3px, 0) scale(0.88);
        opacity: 0.08;
      }
      16% {
        opacity: 0.3;
      }
      36% {
        transform: translate3d(-16px, -1px, 0) scale(0.98);
        opacity: 0.62;
      }
      49% {
        transform: translate3d(2px, 1px, 0) scale(1.02);
        opacity: 0.76;
      }
      62% {
        transform: translate3d(20px, 0, 0) scale(1);
        opacity: 0.7;
      }
      78% {
        opacity: 0.34;
      }
      100% {
        transform: translate3d(82px, 4px, 0) scale(0.9);
        opacity: 0.08;
      }
    }
    @keyframes celestialSunVeil {
      0%,
      16%,
      80%,
      100% {
        opacity: calc(0.74 * var(--weather-intensity));
        filter: drop-shadow(0 0 10px rgba(224, 158, 48, 0.48))
          drop-shadow(0 0 30px rgba(244, 199, 102, 0.36));
      }
      36%,
      64% {
        opacity: calc(0.63 * var(--weather-intensity));
        filter: drop-shadow(0 0 9px rgba(224, 158, 48, 0.42))
          drop-shadow(0 0 23px rgba(244, 199, 102, 0.3));
      }
    }
    @keyframes celestialSunGlow {
      0%,
      16%,
      80%,
      100% {
        opacity: calc(0.62 * var(--weather-intensity));
      }
      36%,
      64% {
        opacity: calc(0.5 * var(--weather-intensity));
      }
    }
    @keyframes celestialCloudMoonDrift {
      0% {
        transform: translate3d(72px, -2px, 0) scale(0.9);
        opacity: 0.08;
      }
      16% {
        opacity: 0.26;
      }
      37% {
        transform: translate3d(18px, -1px, 0) scale(0.98);
        opacity: 0.52;
      }
      51% {
        transform: translate3d(0, 1px, 0) scale(1.02);
        opacity: 0.64;
      }
      65% {
        transform: translate3d(-20px, 0, 0) scale(1);
        opacity: 0.56;
      }
      81% {
        opacity: 0.28;
      }
      100% {
        transform: translate3d(-78px, 4px, 0) scale(0.91);
        opacity: 0.07;
      }
    }
    @keyframes celestialMoonVeil {
      0%,
      16%,
      82%,
      100% {
        opacity: calc(0.72 * var(--moon-intensity));
        filter: drop-shadow(0 0 9px rgba(87, 69, 47, 0.22))
          drop-shadow(0 0 22px rgba(225, 211, 174, 0.18));
      }
      37%,
      66% {
        opacity: calc(0.59 * var(--moon-intensity));
        filter: drop-shadow(0 0 7px rgba(87, 69, 47, 0.18))
          drop-shadow(0 0 17px rgba(205, 205, 190, 0.14));
      }
    }
    @keyframes weatherRain {
      from {
        transform: translate3d(-3%, -12%, 0);
      }
      to {
        transform: translate3d(3%, 12%, 0);
      }
    }
    @keyframes weatherSnow {
      from {
        transform: translate3d(0, -8%, 0);
      }
      to {
        transform: translate3d(3%, 9%, 0);
      }
    }
    @keyframes weatherHail {
      from { transform: translate3d(2%, -13%, 0); }
      to { transform: translate3d(-2%, 14%, 0); }
    }
    @keyframes weatherDrift {
      from {
        transform: translateX(-4%);
      }
      to {
        transform: translateX(4%);
      }
    }
    @keyframes weatherWind {
      from { transform: translate3d(-11%, 0, 0); }
      to { transform: translate3d(11%, -2%, 0); }
    }
    @keyframes weatherWindShade {
      0%, 100% { transform: translateX(-9%); opacity: calc(0.14 * var(--weather-intensity)); }
      50% { transform: translateX(9%); opacity: calc(0.3 * var(--weather-intensity)); }
    }
    @keyframes weatherExceptional {
      0%, 100% { filter: saturate(0.78) brightness(0.92); }
      50% { filter: saturate(1.08) brightness(0.78); }
    }
    @keyframes weatherExceptionalSpin {
      from { transform: rotate(0deg) scale(1.06); }
      to { transform: rotate(360deg) scale(1.06); }
    }
    @keyframes weatherLightning {
      0%,
      6%,
      8%,
      45%,
      47%,
      100% {
        opacity: 0;
      }
      7%,
      46% {
        opacity: calc(0.7 * var(--weather-intensity));
      }
    }
    @keyframes alarmPulse {
      0%,
      100% {
        opacity: calc(0.34 * var(--alarm-intensity));
      }
      50% {
        opacity: calc(0.58 * var(--alarm-intensity));
      }
    }
    @keyframes alarmVignette {
      0%,
      100% {
        opacity: calc(0.65 * var(--alarm-intensity));
      }
      50% {
        opacity: calc(0.95 * var(--alarm-intensity));
      }
    }
    ha-card.enchanted {
      background: #d3b985;
      border-color: rgba(80, 50, 28, 0.25);
      box-shadow: 0 4px 16px rgba(61, 39, 24, 0.16);
    }
    ha-card.enchanted header {
      color: #4b311f;
      background:
        radial-gradient(
          circle at 18% 20%,
          rgba(255, 240, 193, 0.46),
          transparent 32%
        ),
        linear-gradient(90deg, #d8c294, #c8a970);
      border-bottom: 1px solid rgba(78, 50, 30, 0.18);
    }
    ha-card.enchanted header span,
    ha-card.enchanted header small {
      color: #6b4a33;
    }
    ha-card.enchanted h1 {
      font-family: Georgia, Cambria, "Times New Roman", serif;
      font-style: italic;
      letter-spacing: 0.025em;
    }
    ha-card.enchanted.moonlight {
      background: #514b42;
    }
    ha-card.enchanted.moonlight header {
      color: #eee6d5;
      background:
        radial-gradient(
          circle at 82% 18%,
          rgba(218, 205, 169, 0.13),
          transparent 30%
        ),
        linear-gradient(90deg, #5a5145, #403d3a);
    }
    @keyframes explorerSurroundTwinkle {
      0% { opacity: 0.42; transform: scale(0.995); }
      48% { opacity: 0.88; }
      100% { opacity: 0.56; transform: scale(1.005); }
    }
    @keyframes explorerCastleWindow {
      0% { opacity: 0.28; }
      46% { opacity: 0.92; }
      100% { opacity: 0.52; }
    }
    @keyframes explorerCastleMist {
      from { transform: translateX(-28px); opacity: 0.45; }
      to { transform: translateX(34px); opacity: 0.9; }
    }
    @media (prefers-reduced-motion: reduce) {
      :host::before,
      .castle-window,
      .castle-mist,
      .cloud,
      .celestial-cloud,
      .partly-cloudy .sun-disc,
      .partly-cloudy .sun-overlay,
      .partly-cloudy .moon-disc,
      .sun-disc:before,
      .weather-fog .weather-overlay,
      .weather-rain .weather-particles,
      .weather-storm .weather-particles,
      .weather-snow .weather-particles,
      .weather-storm .weather-flash,
      .weather-wind .weather-overlay,
      .weather-wind .weather-particles,
      .weather-exceptional .weather-overlay,
      .weather-exceptional .weather-particles,
      .alarm-triggered .alarm-overlay,
      .alarm-triggered .alarm-vignette {
        animation: none;
      }
    }
    @media (max-width: 600px) {
      header {
        align-items: flex-start;
        padding: 14px 16px;
      }
      small {
        font-size: 0.68rem;
      }
      .moon-disc {
        width: 54px;
        height: 54px;
        right: 5%;
        top: 3.5%;
      }
      .sun-disc {
        width: 46px;
        height: 46px;
        left: 7%;
        top: 6.5%;
      }
      .celestial-cloud {
        width: 108px;
        height: 52px;
      }
      .partly-cloudy:not(.moonlight) .celestial-cloud {
        left: 2.5%;
        top: 5.9%;
      }
      .partly-cloudy.moonlight .celestial-cloud {
        right: 1.8%;
        top: 3.9%;
      }
    }
  `;
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-explorer-card",
  name: "Home Assistant Explorer",
  description: "An interactive SVG floor map for Home Assistant.",
  preview: true,
});
console.info(
  `%c HOME ASSISTANT EXPLORER %c v${CARD_VERSION} `,
  "color:white;background:#594431;font-weight:700;",
  "color:#594431;background:#d8c39b;font-weight:700;",
);
