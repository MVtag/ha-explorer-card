class HaExplorerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.config = { title: "Home Assistant Explorer" };
  }

  static getConfigElement() {
    return document.createElement("ha-explorer-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:ha-explorer-card",
      title: "Home Assistant Explorer"
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Configuration is required");
    this.config = { title: "Home Assistant Explorer", ...config };
    this.render();
  }

  set hass(value) {
    this._hass = value;
  }

  getCardSize() {
    return 5;
  }

  render() {
    const background = this.config.background
      ? `background-image:linear-gradient(rgba(30,23,14,.18),rgba(30,23,14,.18)),url('${this.config.background}');`
      : "";

    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block}
        ha-card{display:block;overflow:hidden;border-radius:var(--ha-card-border-radius,12px)}
        .map{min-height:360px;box-sizing:border-box;padding:28px;display:flex;flex-direction:column;color:#3c2b1e;background-color:#d8c39b;background-size:cover;background-position:center;font-family:Georgia,"Times New Roman",serif;position:relative;isolation:isolate;${background}}
        .map:before{content:"";position:absolute;inset:14px;border:1px solid rgba(60,43,30,.45);pointer-events:none;z-index:-1}
        header{text-align:center}.eyebrow{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;opacity:.72}
        h1{margin:6px 0 0;font-size:clamp(1.65rem,4vw,2.4rem);font-weight:500}
        .placeholder{flex:1;display:grid;place-content:center;justify-items:center;gap:10px;text-align:center;padding:32px 12px}
        .placeholder strong{font-size:1.15rem}.placeholder span{max-width:420px;line-height:1.5;opacity:.8}
        .compass{width:58px;height:58px;border:1px solid currentColor;border-radius:50%;display:grid;place-items:center;font-size:1.8rem}
        footer{text-align:center;font-size:.72rem;letter-spacing:.08em;opacity:.65}
      </style>
      <ha-card>
        <div class="map">
          <header><span class="eyebrow">Living floor map</span><h1>${this.config.title || "Home Assistant Explorer"}</h1></header>
          <div class="placeholder"><div class="compass">✦</div><strong>Explorer-kortet er installeret</strong><span>Næste trin bliver plantegning, rum og levende placeringer.</span></div>
          <footer>Home Assistant Explorer · v0.1.0</footer>
        </div>
      </ha-card>`;
  }
}

class HaExplorerCardEditor extends HTMLElement {
  setConfig(config) {
    this.config = config;
    this.render();
  }

  render() {
    if (!this.config) return;
    this.innerHTML = `
      <style>.editor{display:grid;gap:16px;padding:8px 0}label{display:grid;gap:6px;font-weight:500}input{box-sizing:border-box;width:100%;padding:10px 12px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}</style>
      <div class="editor">
        <label>Titel<input data-key="title" value="${this.config.title || ""}"></label>
        <label>Baggrundsbillede (valgfrit)<input data-key="background" placeholder="/local/explorer/floorplan.png" value="${this.config.background || ""}"></label>
      </div>`;
    this.querySelectorAll("input").forEach((input) => input.addEventListener("input", () => {
      const config = { ...this.config, [input.dataset.key]: input.value };
      this.config = config;
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
    }));
  }
}

if (!customElements.get("ha-explorer-card")) customElements.define("ha-explorer-card", HaExplorerCard);
if (!customElements.get("ha-explorer-card-editor")) customElements.define("ha-explorer-card-editor", HaExplorerCardEditor);
window.customCards = window.customCards || [];
window.customCards.push({ type: "ha-explorer-card", name: "Home Assistant Explorer", description: "A living, interactive floor map for Home Assistant.", preview: true });
console.info("%c HOME ASSISTANT EXPLORER %c v0.1.0 ", "color:white;background:#594431;font-weight:700;", "color:#594431;background:#d8c39b;font-weight:700;");
