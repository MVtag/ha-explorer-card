import { LitElement, css, html, nothing, svg } from "lit";
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
import { resetShellyPetTracks } from "./utils/shelly-pet-detection";
const CARD_VERSION = "0.44.5";
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
      movement_history: { enabled: false, duration_minutes: 3, show_rooms: true },
      pet_robot_trails: { enabled: false, duration_minutes: 3, show_pet_paws: true, show_robot_route: true, robot_direction_arrows: true },
    };
  }
  public setConfig(config: ExplorerCardConfig): void {
    if (!config) throw new Error("Configuration is required");
    resetIdentityTracks();
    resetShellyPetTracks();
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
      movement_history: { enabled: false, duration_minutes: 3, show_rooms: true },
      pet_robot_trails: { enabled: false, duration_minutes: 3, show_pet_paws: true, show_robot_route: true, robot_direction_arrows: true },
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
        <filter id=${`castle-soft-mist-${side}`} x="-30%" y="-250%" width="160%" height="600%">
          <feGaussianBlur stdDeviation="14"></feGaussianBlur>
        </filter>
      </defs>
      <g class="castle-cloud-bank">
        <path d="M-80 232C21 163 102 209 158 174s143-45 215 5 135 11 240-24"></path>
        <path d="M-92 310C12 262 83 290 151 254s151-24 222 18 136 17 235-13"></path>
      </g>
      ${side === "left"
        ? svg`
            <circle class="castle-moon-glow" cx="432" cy="302" r="86"></circle>
            <circle class="castle-moon-solid" cx="432" cy="302" r="39"></circle>
            <path class="castle-far-hills" d="M-20 900V696C62 631 121 651 184 673c73 25 119-36 193-29 66 6 112 55 203-16v272Z"></path>
            <path class="castle-distant" d="M-20 900V670l61-50 44 19 40-61 46 29 53-92 54 57 49-104 61 61 55-86 48 63 69-72v466Z"></path>
            <path class="castle-cliff" d="M-20 900V738l52-17 35-42 58 10 40-31 62 13 48-42 57 7 50-37 72 20 43-39 83 27v293Z"></path>
            <g class="castle-main-cluster">
              <path class="castle-complex" d="M22 705V617l23-20 96-8 35 28v88H22Zm38-110v-43l15-15h49l18 15v39Zm103 110V539h19v-32h58v32h18v166h-95Zm18-199 14-46 11-42 12 42 16 46h-53Zm77 199V574l22-18h96l23 18v131H258Zm28-149v-32l18-17h51l17 17v32Zm89 149V445h22v-42h91v42h23v260H375Zm24-303 12-54 9-73 12 73 14 54h-47Zm15-1v-67h15v67Zm43 0v-67h14v67Zm39 304V552h14v-30h42v30h18v153h-74Zm13-184 13-42 10-48 10 48 13 42h-46Z"></path>
              <path class="castle-complex castle-annex" d="M111 706v-70l25-18h56l22 18v70H111Zm111-1v-77h29v-26h77v26h29v77H222Zm217 0v-70h20v-26h69v26h20v70H439Z"></path>
              <path class="castle-bridge" d="M124 649C181 626 223 630 272 650s89 17 137-8 81-22 126 6"></path>
            </g>
            <g class="castle-roof-detail">
              <path d="M22 617l23-20 96-8 35 28M163 539h95M258 574l22-18h96l23 18M375 445h136M496 552h74"></path>
              <path d="M67 588v-31m35 31v-43m97-42v-28m19 28v-28m201-74v-70m52 70v-70m-46 13h40m51 177v-35"></path>
              <path d="M391 478h104M276 605h108M36 648h118M450 660h105"></path>
            </g>
            <g class="castle-buttresses">
              <path d="M39 623 20 715m142-164-18 160m111-126-16 125m136-252-23 253m160-153 20 149M96 604 82 706m211-140-17 143"></path>
            </g>
            <g class="castle-windows castle-window-grid">
              <rect class="castle-window castle-window-0" x="61" y="622" width="5" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="91" y="615" width="4" height="8" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="119" y="627" width="5" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="190" y="553" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="220" y="557" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="194" y="593" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="224" y="600" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="301" y="593" width="5" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="335" y="582" width="4" height="8" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="405" y="471" width="5" height="11" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="438" y="459" width="5" height="11" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="470" y="477" width="5" height="11" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="405" y="524" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="438" y="515" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="475" y="537" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="522" y="574" width="5" height="10" rx="2"></rect>
            </g>
          `
        : svg`
            <circle class="castle-moon-glow castle-moon-dim" cx="95" cy="305" r="76"></circle>
            <path class="castle-far-hills" d="M-20 900V675c87-53 151-9 212-10 68-1 97-56 170-49 68 7 117 58 218 5v279Z"></path>
            <path class="castle-distant" d="M-20 900V511l63 52 51-86 44 53 55-113 56 85 48-66 58 75 56-101 51 76 48-49 70 79v384Z"></path>
            <path class="castle-cliff" d="M-20 900V622l58-26 43 37 63-18 49 31 57-24 56 47 70-21 43 39 67-8 94 51v170Z"></path>
            <g class="castle-main-cluster">
              <path class="castle-complex" d="M-18 704V503h21v-38h82v38h23v201H-18Zm20-240 13-50 10-72 12 72 16 50H2Zm89 240V568h18v-35h61v35h18v136H91Zm20-172 14-49 13-61 13 61 16 49h-54Zm76 172V456h22v-44h92v44h23v248H187Zm22-293 14-54 11-79 12 79 16 54h-53Zm20 0v-75h15v75Zm44 0v-75h14v75Zm49 293V546h19v-35h65v35h19v158H322Zm20-194 15-45 12-61 13 61 17 45h-57Zm81 194V605l20-19h73l24 19v99H423Zm31-119v-34l14-14h37l14 14v34Z"></path>
              <path class="castle-complex castle-annex" d="M48 704v-76h24v-25h75v25h26v76H48Zm234 0v-81h26v-28h78v28h28v81H282Zm193 0v-65h16v-26h57v26h22v65h-95Z"></path>
              <path class="castle-bridge" d="M-14 655c50-27 96-24 143 3s90 27 137-4 91-29 137 0 86 30 145-4"></path>
            </g>
            <g class="castle-roof-detail">
              <path d="M-18 503H108M91 568h97M187 456h137M322 546h101M423 605l20-19h73l24 19"></path>
              <path d="M17 462v-54m25 54v-54m190 2v-76m54 76v-76m-43-9h31m80 184v-38m35 38v-38m76 113v-32"></path>
              <path d="M4 542h89m109-42h107m35 91h64m33 42h88"></path>
            </g>
            <g class="castle-buttresses">
              <path d="M-2 525-22 712m128-128 17 125m65-238-22 238m157-148-19 148m117-93-17 94m126-94 21 90M73 614 55 705m227-81-17 84"></path>
            </g>
            <g class="castle-windows castle-window-grid">
              <rect class="castle-window castle-window-1" x="14" y="519" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="45" y="507" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="74" y="528" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="16" y="575" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="49" y="567" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="123" y="587" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="151" y="599" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="213" y="481" width="5" height="11" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="245" y="469" width="5" height="11" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="278" y="488" width="5" height="11" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="214" y="540" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="248" y="530" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="279" y="551" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="350" y="570" width="5" height="10" rx="2"></rect>
              <rect class="castle-window castle-window-2" x="386" y="581" width="4" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-1" x="465" y="618" width="5" height="9" rx="2"></rect>
              <rect class="castle-window castle-window-0" x="498" y="628" width="4" height="8" rx="2"></rect>
            </g>
          `}
      <rect class="castle-water" x="-10" y="792" width="590" height="128" fill="#120c08"></rect>
      <path class="castle-ridge" d="M-20 798C70 752 135 816 218 782s143 23 218-6 108-18 144 9"></path>
      <g class="castle-reflections">
        <path d="M112 805v72M192 798v89M276 800v78M371 790v103M468 802v72"></path>
        <path class="moon-reflection" d=${side === "left" ? "M112 798c-17 23-25 50-12 96m31-96c11 31 5 61-4 96" : "M455 802c-12 27-17 57-6 91m24-91c8 32 2 60-8 91"}></path>
      </g>
      <g class="castle-water-ripples">
        <path d="M8 824h126m-74 22h154m-99 25h176m35-46h153m-112 25h185m-80 26h112"></path>
      </g>
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
          .movementHistory=${this.config.movement_history ?? { enabled:false, duration_minutes:3, show_rooms:true }}
          .petRobotTrails=${this.config.pet_robot_trails ?? { enabled:false, duration_minutes:3, show_pet_paws:true, show_robot_route:true, robot_direction_arrows:true }}
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
            ellipse at 50% 33%,
            rgba(192, 139, 72, 0.42) 0%,
            rgba(87, 57, 34, 0.32) 38%,
            transparent 60%
          ),
          repeating-linear-gradient(
            112deg,
            transparent 0 55px,
            rgba(225, 190, 124, 0.045) 56px 57px,
            transparent 58px 112px
          ),
          repeating-linear-gradient(4deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 5px),
          linear-gradient(180deg, #201711 0%, #3d2b1d 38%, #1a120d 72%, #080503 100%);
        box-shadow:
          inset 0 0 104px rgba(5, 3, 2, 0.84),
          inset 0 0 2px rgba(237, 202, 139, 0.3);
      }
      :host::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(circle at 8% 17%, rgba(255, 231, 177, 0.9) 0 1px, transparent 2.2px),
          radial-gradient(circle at 17% 42%, rgba(226, 188, 119, 0.7) 0 1.2px, transparent 2.5px),
          radial-gradient(circle at 11% 73%, rgba(231, 202, 140, 0.7) 0 0.9px, transparent 2.2px),
          radial-gradient(circle at 25% 88%, rgba(190, 143, 79, 0.55) 0 1px, transparent 2.4px),
          radial-gradient(circle at 92% 20%, rgba(255, 231, 177, 0.9) 0 1px, transparent 2.2px),
          radial-gradient(circle at 83% 47%, rgba(226, 188, 119, 0.7) 0 1.2px, transparent 2.5px),
          radial-gradient(circle at 90% 76%, rgba(231, 202, 140, 0.7) 0 0.9px, transparent 2.2px),
          radial-gradient(circle at 76% 91%, rgba(190, 143, 79, 0.55) 0 1px, transparent 2.4px);
        filter: drop-shadow(0 0 7px rgba(231, 190, 112, 0.5));
        animation: explorerSurroundTwinkle 7.5s ease-in-out infinite alternate;
      }
      :host::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse at center, transparent 35%, rgba(20, 12, 7, 0.3) 73%, rgba(6, 3, 2, 0.78) 100%),
          linear-gradient(90deg, rgba(231, 193, 121, 0.07), transparent 20% 80%, rgba(231, 193, 121, 0.07));
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
        width: 42%;
        max-width: 720px;
        height: 100%;
        overflow: visible;
        opacity: 0.98;
        filter:
          drop-shadow(0 -12px 30px rgba(187, 134, 69, 0.2))
          drop-shadow(0 12px 25px rgba(0, 0, 0, 0.48));
      }
      .enchanted-castle-left {
        left: -4%;
      }
      .enchanted-castle-right {
        right: -4%;
      }
      .castle-moon-glow {
        fill: rgba(218, 211, 181, 0.2);
        filter: blur(27px);
      }
      .castle-moon-solid {
        fill: #d9d1b7;
        stroke: rgba(241, 226, 187, 0.65);
        stroke-width: 1.2;
        opacity: 0.9;
        filter: drop-shadow(0 0 12px rgba(219, 208, 171, 0.36));
      }
      .castle-moon-dim {
        opacity: 0.48;
      }
      .castle-far-hills {
        fill: rgba(21, 23, 23, 0.78);
      }
      .enchanted-castle-left .castle-distant {
        fill: rgba(31, 34, 34, 0.84);
      }
      .enchanted-castle-right .castle-distant {
        fill: rgba(27, 31, 32, 0.86);
      }
      .castle-distant {
        opacity: 0.42;
        filter: blur(0.45px);
      }
      .castle-cliff {
        fill: rgba(5, 7, 8, 0.97);
        filter: drop-shadow(0 -5px 11px rgba(0, 0, 0, 0.42));
      }
      .castle-main-cluster {
        filter:
          drop-shadow(0 -3px 0 rgba(116, 101, 78, 0.12))
          drop-shadow(0 12px 17px rgba(0, 0, 0, 0.76));
      }
      .castle-complex {
        fill: #080a0a;
        stroke: rgba(172, 143, 98, 0.2);
        stroke-width: 0.85;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }
      .castle-annex {
        fill: #060808;
        opacity: 0.98;
      }
      .castle-silhouette {
        fill: #0a0604;
        stroke: #6f4b2d;
        stroke-width: 1.25;
        stroke-linejoin: round;
        opacity: 1;
        visibility: visible;
        vector-effect: non-scaling-stroke;
      }
      .castle-roof-detail,
      .castle-buttresses {
        fill: none;
        stroke: rgba(198, 171, 126, 0.14);
        stroke-width: 1.25;
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }
      .castle-buttresses {
        stroke: rgba(160, 137, 101, 0.1);
        stroke-width: 2.2;
      }
      .castle-bridge {
        fill: none;
        stroke: rgba(5, 7, 7, 0.97);
        stroke-width: 12;
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
        fill: rgba(240, 179, 78, 0.84);
        stroke: rgba(255, 225, 157, 0.18);
        stroke-width: 0.45;
        filter:
          drop-shadow(0 0 2px rgba(239, 164, 55, 0.78))
          drop-shadow(0 0 5px rgba(219, 133, 35, 0.3));
        animation: explorerCastleWindow 5.8s ease-in-out infinite alternate;
      }
      .castle-window-grid {
        opacity: 0.92;
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
      .castle-cloud-bank {
        fill: none;
        stroke: rgba(206, 166, 105, 0.13);
        stroke-width: 72;
        stroke-linecap: round;
        filter: blur(24px);
      }
      .castle-water {
        fill: #120c08;
        opacity: 0.96;
      }
      .castle-reflections {
        fill: none;
        stroke: rgba(235, 178, 76, 0.24);
        stroke-width: 12;
        stroke-linecap: round;
        filter: blur(7px);
        animation: explorerWaterShimmer 6.5s ease-in-out infinite alternate;
      }
      .castle-reflections .moon-reflection {
        stroke: rgba(236, 201, 137, 0.32);
        stroke-width: 18;
      }
      .castle-water-ripples {
        fill: none;
        stroke: rgba(208, 167, 105, 0.16);
        stroke-width: 2;
        stroke-linecap: round;
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
    @keyframes explorerWaterShimmer {
      from { transform: scaleX(0.94); opacity: 0.42; }
      to { transform: scaleX(1.06); opacity: 0.88; }
    }
    @media (prefers-reduced-motion: reduce) {
      :host::before,
      .castle-window,
      .castle-mist,
      .castle-reflections,
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
