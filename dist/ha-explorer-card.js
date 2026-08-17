const ut = globalThis, Wt = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yt = /* @__PURE__ */ Symbol(), hi = /* @__PURE__ */ new WeakMap();
let Xi = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== Yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Wt && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = hi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && hi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _r = (e) => new Xi(typeof e == "string" ? e : e + "", void 0, Yt), I = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Xi(i, e, Yt);
}, Ar = (e, t) => {
  if (Wt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), n = ut.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, e.appendChild(r);
  }
}, ui = Wt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return _r(i);
})(e) : e;
const { is: Sr, defineProperty: Cr, getOwnPropertyDescriptor: Er, getOwnPropertyNames: Pr, getOwnPropertySymbols: Nr, getPrototypeOf: Rr } = Object, kt = globalThis, gi = kt.trustedTypes, Mr = gi ? gi.emptyScript : "", zr = kt.reactiveElementPolyfillSupport, Ge = (e, t) => e, ft = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Mr : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Xt = (e, t) => !Sr(e, t), mi = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: Xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), kt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ze = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = mi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, r, i);
      n !== void 0 && Cr(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: n, set: o } = Er(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: n, set(s) {
      const a = n?.call(this);
      o?.call(this, s), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? mi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ge("elementProperties"))) return;
    const t = Rr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ge("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ge("properties"))) {
      const i = this.properties, r = [...Pr(i), ...Nr(i)];
      for (const n of r) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [r, n] of i) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const n = this._$Eu(i, r);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const n of r) i.unshift(ui(n));
    } else t !== void 0 && i.push(ui(t));
    return i;
  }
  static _$Eu(t, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ar(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, r) {
    this._$AK(t, r);
  }
  _$ET(t, i) {
    const r = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, r);
    if (n !== void 0 && r.reflect === !0) {
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : ft).toAttribute(i, r.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, n = r._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = r.getPropertyOptions(n), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ft;
      this._$Em = n;
      const a = s.fromAttribute(i, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, n = !1, o) {
    if (t !== void 0) {
      const s = this.constructor;
      if (n === !1 && (o = this[t]), r ??= s.getPropertyOptions(t), !((r.hasChanged ?? Xt)(o, i) || r.useDefault && r.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, r)))) return;
      this.C(t, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: r, reflect: n, wrapped: o }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), o !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, o] of r) {
        const { wrapped: s } = o, a = this[n];
        s !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ze.elementStyles = [], ze.shadowRootOptions = { mode: "open" }, ze[Ge("elementProperties")] = /* @__PURE__ */ new Map(), ze[Ge("finalized")] = /* @__PURE__ */ new Map(), zr?.({ ReactiveElement: ze }), (kt.reactiveElementVersions ??= []).push("2.1.2");
const Qt = globalThis, fi = (e) => e, bt = Qt.trustedTypes, bi = bt ? bt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Qi = "$lit$", xe = `lit$${Math.random().toFixed(9).slice(2)}$`, Ji = "?" + xe, Ir = `<${Ji}>`, Ae = document, Ue = () => Ae.createComment(""), We = (e) => e === null || typeof e != "object" && typeof e != "function", Jt = Array.isArray, Tr = (e) => Jt(e) || typeof e?.[Symbol.iterator] == "function", Ct = `[ 	
\f\r]`, He = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yi = /-->/g, vi = />/g, $e = RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xi = /'/g, wi = /"/g, er = /^(?:script|style|textarea|title)$/i, tr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = tr(1), C = tr(2), ie = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), $i = /* @__PURE__ */ new WeakMap(), _e = Ae.createTreeWalker(Ae, 129);
function ir(e, t) {
  if (!Jt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bi !== void 0 ? bi.createHTML(t) : t;
}
const Or = (e, t) => {
  const i = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = He;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, p, c = -1, g = 0;
    for (; g < l.length && (s.lastIndex = g, p = s.exec(l), p !== null); ) g = s.lastIndex, s === He ? p[1] === "!--" ? s = yi : p[1] !== void 0 ? s = vi : p[2] !== void 0 ? (er.test(p[2]) && (n = RegExp("</" + p[2], "g")), s = $e) : p[3] !== void 0 && (s = $e) : s === $e ? p[0] === ">" ? (s = n ?? He, c = -1) : p[1] === void 0 ? c = -2 : (c = s.lastIndex - p[2].length, d = p[1], s = p[3] === void 0 ? $e : p[3] === '"' ? wi : xi) : s === wi || s === xi ? s = $e : s === yi || s === vi ? s = He : (s = $e, n = void 0);
    const u = s === $e && e[a + 1].startsWith("/>") ? " " : "";
    o += s === He ? l + Ir : c >= 0 ? (r.push(d), l.slice(0, c) + Qi + l.slice(c) + xe + u) : l + xe + (c === -2 ? a : u);
  }
  return [ir(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Ye {
  constructor({ strings: t, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const a = t.length - 1, l = this.parts, [d, p] = Or(t, i);
    if (this.el = Ye.createElement(d, r), _e.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = _e.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Qi)) {
          const g = p[s++], u = n.getAttribute(c).split(xe), y = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: o, name: y[2], strings: u, ctor: y[1] === "." ? Dr : y[1] === "?" ? Lr : y[1] === "@" ? Br : _t }), n.removeAttribute(c);
        } else c.startsWith(xe) && (l.push({ type: 6, index: o }), n.removeAttribute(c));
        if (er.test(n.tagName)) {
          const c = n.textContent.split(xe), g = c.length - 1;
          if (g > 0) {
            n.textContent = bt ? bt.emptyScript : "";
            for (let u = 0; u < g; u++) n.append(c[u], Ue()), _e.nextNode(), l.push({ type: 2, index: ++o });
            n.append(c[g], Ue());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ji) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(xe, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += xe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const r = Ae.createElement("template");
    return r.innerHTML = t, r;
  }
}
function Oe(e, t, i = e, r) {
  if (t === ie) return t;
  let n = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const o = We(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = n : i._$Cl = n), n !== void 0 && (t = Oe(e, n._$AS(e, t.values), n, r)), t;
}
class jr {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: r } = this._$AD, n = (t?.creationScope ?? Ae).importNode(i, !0);
    _e.currentNode = n;
    let o = _e.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new rt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new qr(o, this, t)), this._$AV.push(d), l = r[++a];
      }
      s !== l?.index && (o = _e.nextNode(), s++);
    }
    return _e.currentNode = Ae, n;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class rt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, r, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = Oe(this, t, i), We(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== ie && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Tr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && We(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ae.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Ye.createElement(ir(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new jr(n, this), s = o.u(this.options);
      o.p(i), this.T(s), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = $i.get(t.strings);
    return i === void 0 && $i.set(t.strings, i = new Ye(t)), i;
  }
  k(t) {
    Jt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of t) n === i.length ? i.push(r = new rt(this.O(Ue()), this.O(Ue()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = fi(t).nextSibling;
      fi(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class _t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, n, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = f;
  }
  _$AI(t, i = this, r, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = Oe(this, t, i, 0), s = !We(t) || t !== this._$AH && t !== ie, s && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = Oe(this, a[r + l], i, l), d === ie && (d = this._$AH[l]), s ||= !We(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    s && !n && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Dr extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Lr extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Br extends _t {
  constructor(t, i, r, n, o) {
    super(t, i, r, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Oe(this, t, i, 0) ?? f) === ie) return;
    const r = this._$AH, n = t === f && r !== f || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== f && (r === f || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qr {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Oe(this, t);
  }
}
const Fr = Qt.litHtmlPolyfillSupport;
Fr?.(Ye, rt), (Qt.litHtmlVersions ??= []).push("3.3.3");
const Vr = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    r._$litPart$ = n = new rt(t.insertBefore(Ue(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
const ei = globalThis;
let D = class extends ze {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vr(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ie;
  }
};
D._$litElement$ = !0, D.finalized = !0, ei.litElementHydrateSupport?.({ LitElement: D });
const Hr = ei.litElementPolyfillSupport;
Hr?.({ LitElement: D });
(ei.litElementVersions ??= []).push("4.2.2");
const R = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Kr = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: Xt }, Gr = (e = Kr, t, i) => {
  const { kind: r, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), r === "accessor") {
    const { name: s } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, e, a), a;
    } };
  }
  if (r === "setter") {
    const { name: s } = i;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function A(e) {
  return (t, i) => typeof i == "object" ? Gr(e, t, i) : ((r, n, o) => {
    const s = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), s ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
function b(e) {
  return A({ ...e, state: !0, attribute: !1 });
}
const Zr = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function Ur(e, t) {
  return (i, r, n) => {
    const o = (s) => s.renderRoot?.querySelector(e) ?? null;
    return Zr(i, r, { get() {
      return o(this);
    } });
  };
}
const ke = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, rr = (e) => (...t) => ({ _$litDirective$: e, values: t });
class nr {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, r) {
    this._$Ct = t, this._$AM = i, this._$Ci = r;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
}
class Ht extends nr {
  constructor(t) {
    if (super(t), this.it = f, t.type !== ke.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === f || t == null) return this._t = void 0, this.it = t;
    if (t === ie) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const i = [t];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
Ht.directiveName = "unsafeHTML", Ht.resultType = 1;
class Kt extends Ht {
}
Kt.directiveName = "unsafeSVG", Kt.resultType = 2;
const Wr = rr(Kt), Yr = {
  light: ["on"],
  motion: ["on"],
  media: ["playing", "on"],
  opening: ["on", "open"],
  temperature: [],
  fireplace: ["on", "heating", "burning", "active"]
}, Xr = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function or(e) {
  return Math.min(1, Math.max(0, e));
}
function Pe(e) {
  return Math.min(1, Math.max(0, e));
}
function gt(e) {
  return [...Yr[e]];
}
function Qr(e) {
  if (e.kind === "temperature") return [];
  const t = (e.active_states ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : gt(e.kind);
}
function mt(e, t) {
  const i = t?.position;
  return i && Number.isFinite(i.x) && Number.isFinite(i.y) ? { x: Pe(i.x), y: Pe(i.y) } : e.presence_anchor ? {
    x: Pe(e.presence_anchor.x),
    y: Pe(e.presence_anchor.y)
  } : e.points.length ? {
    x: Pe(e.points.reduce((r, n) => r + n[0], 0) / e.points.length),
    y: Pe(e.points.reduce((r, n) => r + n[1], 0) / e.points.length)
  } : { x: 0.5, y: 0.5 };
}
function Jr(e) {
  const t = e?.brightness;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : or(t / 255);
}
function ki(e) {
  const t = e.intensity;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : or(t);
}
function _i(e) {
  const t = e?.unit_of_measurement;
  return typeof t == "string" && t.trim() ? t.trim() : void 0;
}
function sr(e, t, i) {
  const r = e.entity?.trim(), n = Qr(e);
  if (!r)
    return { index: t, reaction: e, active: !1, activeStates: n, intensity: 0, reason: "missing_entity" };
  const o = i?.(r);
  if (!o || Xr.has(o.state.trim().toLowerCase()))
    return { index: t, reaction: e, active: !1, currentState: o?.state, activeStates: n, intensity: 0, reason: "entity_unavailable" };
  if (e.kind === "temperature") {
    const d = Number(o.state);
    return Number.isFinite(d) ? { index: t, reaction: e, active: !0, currentState: o.state, activeStates: n, intensity: 1, numericValue: d, unit: _i(o.attributes) } : { index: t, reaction: e, active: !1, currentState: o.state, activeStates: n, intensity: 0, unit: _i(o.attributes), reason: "state_inactive" };
  }
  const s = o.state.trim().toLowerCase(), a = n.map((d) => d.toLowerCase()).includes(s);
  let l = 0;
  return a && (e.kind === "light" ? l = Jr(o.attributes) * ki(e) : l = ki(e)), {
    index: t,
    reaction: e,
    active: a,
    currentState: o.state,
    activeStates: n,
    intensity: l,
    ...a ? {} : { reason: "state_inactive" }
  };
}
function ti(e, t) {
  return (e.reactions ?? []).map((i, r) => sr(i, r, t));
}
var en = Object.defineProperty, tn = Object.getOwnPropertyDescriptor, Ee = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? tn(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && en(t, i, n), n;
};
function rn(e) {
  const t = e?.trim();
  if (t) {
    if (/^data:image\/(?:png|jpe?g|gif|webp);base64,/i.test(t) || t.startsWith("/"))
      return t;
    try {
      const i = new URL(t, window.location.href);
      return ["http:", "https:", "blob:"].includes(i.protocol) ? t : void 0;
    } catch {
      return;
    }
  }
}
const nn = {
  light: "💡",
  motion: "◉",
  media: "▶",
  opening: "↗",
  temperature: "°"
}, on = {
  light: "Lys",
  motion: "Bevægelse",
  media: "TV / medie",
  opening: "Dør / vindue",
  temperature: "Temperatur"
};
let ue = class extends D {
  constructor() {
    super(...arguments), this.presences = [], this.pendingLights = /* @__PURE__ */ new Set(), this.pendingRoomAction = "", this.actionError = "";
  }
  get statuses() {
    return this.room ? ti(this.room, (e) => {
      const t = this.hass?.states[e];
      return t ? { state: t.state, attributes: t.attributes } : void 0;
    }) : [];
  }
  get occupants() {
    return this.room ? this.presences.filter(
      (e) => e.visible !== !1 && e.room_id === this.room?.id
    ) : [];
  }
  entityName(e) {
    const t = this.hass?.states[e]?.attributes.friendly_name;
    return typeof t == "string" && t.trim() ? t : e;
  }
  statusText(e) {
    return e.reason === "missing_entity" || e.reason === "entity_unavailable" ? "Ikke tilgængelig" : e.reaction.kind === "temperature" ? e.numericValue === void 0 ? e.currentState ?? "Ukendt" : `${new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(
      e.numericValue
    )}${e.unit ? ` ${e.unit}` : "°"}` : e.reaction.kind === "light" ? e.active ? "Tændt" : "Slukket" : e.reaction.kind === "motion" ? e.active ? "Bevægelse registreret" : "Ingen bevægelse" : e.reaction.kind === "media" ? e.active ? "Afspiller" : "Inaktiv" : e.reaction.kind === "opening" ? e.active ? "Åben" : "Lukket" : e.currentState ?? "Ukendt";
  }
  close() {
    this.dispatchEvent(new CustomEvent("explorer-room-close", { bubbles: !0, composed: !0 }));
  }
  openMoreInfo(e) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: !0,
        composed: !0,
        detail: { entityId: e }
      })
    );
  }
  get roomLightIds() {
    return [...new Set(
      (this.room?.reactions ?? []).filter((e) => e.kind === "light").map((e) => e.entity)
    )];
  }
  async runRoomService(e, t, i, r, n) {
    const o = this.hass;
    if (!(!o?.callService || this.pendingRoomAction)) {
      this.actionError = "", this.pendingRoomAction = e;
      try {
        await o.callService(t, i, {}, { entity_id: r });
      } catch {
        this.actionError = `Kunne ikke starte ${n}.`;
      } finally {
        this.pendingRoomAction = "";
      }
    }
  }
  runQuickAction(e) {
    if (!e.entity.startsWith(`${e.kind}.`)) {
      this.actionError = `Ugyldig entity for ${e.name}.`;
      return;
    }
    this.runRoomService(
      `quick:${e.id}`,
      e.kind,
      "turn_on",
      e.entity,
      e.name
    );
  }
  async toggleLight(e, t) {
    e.stopPropagation();
    const i = this.hass;
    if (!(!i?.callService || this.pendingLights.has(t))) {
      this.actionError = "", this.pendingLights = /* @__PURE__ */ new Set([...this.pendingLights, t]);
      try {
        await i.callService("light", "toggle", {}, { entity_id: t });
      } catch {
        this.actionError = `Kunne ikke styre ${this.entityName(t)}.`;
      } finally {
        const r = new Set(this.pendingLights);
        r.delete(t), this.pendingLights = r;
      }
    }
  }
  render() {
    if (!this.room) return f;
    const e = this.statuses, t = this.occupants, i = this.roomLightIds, r = this.room.quick_actions ?? [];
    return h`
      <section class="panel" role="dialog" aria-label=${`Rumdetaljer for ${this.room.name ?? this.room.id}`}>
        <header>
          <div>
            <span class="eyebrow">Interaktivt rum</span>
            <h2>${this.room.name ?? this.room.id}</h2>
          </div>
          <button class="close" @click=${this.close} aria-label="Luk rumpanel">×</button>
        </header>

        <div class="summary">
          <span>${e.length} ${e.length === 1 ? "enhed" : "enheder"}</span>
          <span>${t.length} ${t.length === 1, "til stede"}</span>
        </div>

        ${t.length ? h`<div class="occupants" aria-label="Personer og objekter i rummet">
              ${t.map((n) => {
      const o = rn(n.avatar);
      return h`<span class="occupant">
                  ${o ? h`<img src=${o} alt="" />` : h`<span class="occupant-dot"></span>`}
                  ${n.name ?? n.id}
                </span>`;
    })}
            </div>` : f}

        ${i.length || r.length ? h`<div class="quick-actions" aria-label="Hurtighandlinger">
              <h3>Hurtighandlinger</h3>
              <div class="quick-grid">
                ${i.length ? h`
                      <button
                        @click=${() => {
      this.runRoomService("lights:on", "light", "turn_on", i, "alle lys");
    }}
                        ?disabled=${!!this.pendingRoomAction || !this.hass?.callService}
                      ><span>💡</span>${this.pendingRoomAction === "lights:on" ? "Vent…" : "Tænd alt"}</button>
                      <button
                        @click=${() => {
      this.runRoomService("lights:off", "light", "turn_off", i, "alle lys");
    }}
                        ?disabled=${!!this.pendingRoomAction || !this.hass?.callService}
                      ><span>◌</span>${this.pendingRoomAction === "lights:off" ? "Vent…" : "Sluk alt"}</button>
                    ` : f}
                ${r.map((n) => h`
                  <button
                    @click=${() => this.runQuickAction(n)}
                    ?disabled=${!!this.pendingRoomAction || !this.hass?.callService}
                  >
                    <span>${n.icon ?? (n.kind === "scene" ? "✦" : "▶")}</span>
                    ${this.pendingRoomAction === `quick:${n.id}` ? "Vent…" : n.name}
                  </button>
                `)}
              </div>
            </div>` : f}

        ${e.length ? h`<div class="entities">
              ${e.map((n) => this.renderStatus(n))}
            </div>` : h`<p class="empty">
              Der er endnu ikke knyttet lys, temperatur, bevægelse eller andre enheder til rummet.
            </p>`}

        ${this.actionError ? h`<p class="error" role="alert">${this.actionError}</p>` : f}
      </section>
    `;
  }
  renderStatus(e) {
    const t = e.reaction.entity, i = e.reaction.kind, r = this.pendingLights.has(t);
    return h`
      <article class=${`entity ${e.active ? "active" : "inactive"}`}>
        <button class="entity-main" @click=${() => this.openMoreInfo(t)}>
          <span class=${`entity-icon ${i}`}>${nn[i]}</span>
          <span class="entity-copy">
            <strong>${this.entityName(t)}</strong>
            <small>${on[i]} · ${this.statusText(e)}</small>
          </span>
        </button>
        ${i === "light" ? h`<button
              class="action"
              @click=${(n) => this.toggleLight(n, t)}
              ?disabled=${r || !this.hass?.callService}
            >${r ? "Vent…" : e.active ? "Sluk" : "Tænd"}</button>` : f}
      </article>
    `;
  }
};
ue.styles = I`
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

    .quick-actions { display:grid; gap:7px; margin:2px 0 12px; }
    .quick-actions h3 { margin:0; font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; opacity:.68; }
    .quick-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; }
    .quick-grid button {
      display:flex;
      align-items:center;
      gap:8px;
      min-width:0;
      padding:9px 10px;
      border:1px solid var(--explorer-room-panel-border,rgba(255,255,255,.18));
      border-radius:11px;
      color:inherit;
      background:var(--explorer-room-panel-control,rgba(255,255,255,.10));
      cursor:pointer;
      font-size:.74rem;
      font-weight:700;
      text-align:left;
    }
    .quick-grid button span {
      display:grid;
      place-items:center;
      width:24px;
      height:24px;
      flex:0 0 auto;
      border-radius:8px;
      background:var(--explorer-room-panel-row,rgba(255,255,255,.08));
    }
    .quick-grid button:disabled { opacity:.5; cursor:wait; }
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
Ee([
  A({ attribute: !1 })
], ue.prototype, "room", 2);
Ee([
  A({ attribute: !1 })
], ue.prototype, "presences", 2);
Ee([
  A({ attribute: !1 })
], ue.prototype, "hass", 2);
Ee([
  b()
], ue.prototype, "pendingLights", 2);
Ee([
  b()
], ue.prototype, "pendingRoomAction", 2);
Ee([
  b()
], ue.prototype, "actionError", 2);
ue = Ee([
  R("explorer-room-panel")
], ue);
const v = 1e3;
function Ai(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function sn(e) {
  return `translate(${e.x} ${e.y}) scale(${e.zoom})`;
}
function an(e, t, i, r) {
  const n = t / e.zoom;
  return {
    zoom: t,
    x: i - (i - e.x) * n,
    y: r - (r - e.y) * n
  };
}
var ln = Object.defineProperty, dn = Object.getOwnPropertyDescriptor, H = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? dn(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && ln(t, i, n), n;
};
const Si = { width: 16, height: 9, status: "idle" }, cn = { person: "●", pet: "◆", robot: "■", vehicle: "▰", object: "✦" }, pn = "script,foreignObject,iframe,object,embed,link,meta,audio,video,canvas";
function Ci(e) {
  try {
    return new URL(e, window.location.href).pathname.toLowerCase().endsWith(".svg");
  } catch {
    return e.split(/[?#]/, 1)[0].toLowerCase().endsWith(".svg");
  }
}
function Ei(e) {
  if (!e) return;
  const t = e.trim().match(/^(-?\d+(?:\.\d+)?)/);
  if (!t) return;
  const i = Number(t[1]);
  return Number.isFinite(i) && i > 0 ? i : void 0;
}
function hn(e) {
  const t = e.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  return t?.length === 4 && t.every(Number.isFinite) && t[2] > 0 && t[3] > 0 ? { width: t[2], height: t[3] } : { width: Ei(e.getAttribute("width")) ?? 16, height: Ei(e.getAttribute("height")) ?? 9 };
}
function Pi(e) {
  return e.replace(/@import[^;]+;?/gi, "").replace(/url\(([^)]*)\)/gi, (t, i) => {
    const r = i.trim().replace(/^['"]|['"]$/g, "");
    return r.startsWith("#") ? `url(${r})` : "none";
  }).replace(/javascript\s*:/gi, "").replace(/expression\s*\(/gi, "");
}
function un(e) {
  const t = e.trim();
  return t === "" || t.startsWith("#") || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,/i.test(t);
}
function gn(e) {
  const t = e?.trim();
  if (t) {
    if (/^data:image\/(?:png|jpe?g|gif|webp);base64,/i.test(t) || t.startsWith("/")) return t;
    try {
      const i = new URL(t, window.location.href);
      if (["http:", "https:", "blob:"].includes(i.protocol)) return t;
    } catch {
      return;
    }
  }
}
function mn(e) {
  const t = e.querySelector("parsererror"), i = e.documentElement;
  if (t || i.localName.toLowerCase() !== "svg") throw new Error("Filen indeholder ikke gyldig SVG-kode.");
  i.querySelectorAll(pn).forEach((n) => n.remove());
  const r = [i, ...Array.from(i.querySelectorAll("*"))];
  for (const n of r)
    for (const o of Array.from(n.attributes)) {
      const s = o.name.toLowerCase(), a = o.value;
      if (s.startsWith("on")) {
        n.removeAttribute(o.name);
        continue;
      }
      if ((s === "href" || s === "xlink:href") && !un(a)) {
        n.removeAttribute(o.name);
        continue;
      }
      if (s === "style") {
        const l = Pi(a).trim();
        l ? n.setAttribute(o.name, l) : n.removeAttribute(o.name);
      }
    }
  return i.querySelectorAll("style").forEach((n) => {
    const o = Pi(n.textContent ?? "").trim();
    o ? n.textContent = o : n.remove();
  }), i.hasAttribute("xmlns") || i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i;
}
let B = class extends D {
  constructor() {
    super(...arguments), this.image = "", this.rooms = [], this.presences = [], this.minZoom = 1, this.maxZoom = 6, this.initialZoom = 1, this.fitMode = "contain", this.viewport = { zoom: 1, x: 0, y: 0 }, this.metadata = { ...Si }, this.imageSource = "", this.svgMarkup = "", this.loadError = "", this.imageRequest = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.resetViewport();
  }
  updated(e) {
    e.has("rooms") && this.selectedRoom && (this.selectedRoom = this.rooms.find((t) => t.id === this.selectedRoom?.id)), (e.has("image") || e.has("fitMode") && this.image && Ci(this.image)) && this.loadFloorplan();
  }
  async loadFloorplan() {
    const e = ++this.imageRequest;
    if (this.imageSource = "", this.svgMarkup = "", this.loadError = "", !this.image) {
      this.metadata = { ...Si }, this.resetViewport();
      return;
    }
    this.metadata = { ...this.metadata, status: "loading" };
    try {
      Ci(this.image) ? await this.loadSvgFloorplan(e) : await this.loadRasterFloorplan(e);
    } catch (t) {
      if (e !== this.imageRequest) return;
      this.imageSource = "", this.svgMarkup = "", this.metadata = { ...this.metadata, status: "error" }, this.loadError = t instanceof Error ? t.message : "Plantegningen kunne ikke indlæses.";
    }
  }
  async loadSvgFloorplan(e) {
    const t = await fetch(this.image, { credentials: "same-origin", cache: "no-store" });
    if (!t.ok) throw new Error(`SVG-filen kunne ikke hentes (${t.status}).`);
    const i = await t.text();
    if (e !== this.imageRequest) return;
    const r = new DOMParser().parseFromString(i, "image/svg+xml"), n = mn(r), o = hn(n);
    n.hasAttribute("viewBox") || n.setAttribute("viewBox", `0 0 ${o.width} ${o.height}`), n.setAttribute("x", "0"), n.setAttribute("y", "0"), n.setAttribute("width", String(v)), n.setAttribute("height", String(v)), n.setAttribute("preserveAspectRatio", this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"), n.setAttribute("class", "inline-floorplan");
    const s = new XMLSerializer().serializeToString(n);
    e === this.imageRequest && (this.svgMarkup = s, this.metadata = { width: o.width, height: o.height, status: "loaded" }, this.resetViewport());
  }
  async loadRasterFloorplan(e) {
    const t = new Image();
    t.decoding = "async", await new Promise((i, r) => {
      t.onload = () => {
        if (e !== this.imageRequest) return i();
        this.imageSource = this.image, this.metadata = { width: Math.max(1, t.naturalWidth || 16), height: Math.max(1, t.naturalHeight || 9), status: "loaded" }, this.resetViewport(), i();
      }, t.onerror = () => r(new Error("Billedfilen kunne ikke indlæses. Kontrollér filstien.")), t.src = this.image;
    });
  }
  resetViewport() {
    this.viewport = { zoom: Ai(this.initialZoom, this.minZoom, this.maxZoom), x: 0, y: 0 };
  }
  toViewBoxPoint(e) {
    const t = this.renderRoot.querySelector("svg.floorplan");
    if (!t) return { x: v / 2, y: v / 2 };
    const i = t.getBoundingClientRect();
    return { x: (e.clientX - i.left) / i.width * v, y: (e.clientY - i.top) / i.height * v };
  }
  handleWheel(e) {
    e.preventDefault();
    const t = this.toViewBoxPoint(e), i = e.deltaY < 0 ? 1.12 : 1 / 1.12, r = Ai(this.viewport.zoom * i, this.minZoom, this.maxZoom);
    this.viewport = an(this.viewport, r, t.x, t.y);
  }
  handlePointerDown(e) {
    this.pointerId = e.pointerId, this.lastPointer = { x: e.clientX, y: e.clientY }, e.currentTarget.setPointerCapture(e.pointerId);
  }
  handlePointerMove(e) {
    if (e.pointerId !== this.pointerId || !this.lastPointer) return;
    const t = e.currentTarget.getBoundingClientRect(), i = (e.clientX - this.lastPointer.x) / t.width * v, r = (e.clientY - this.lastPointer.y) / t.height * v;
    this.viewport = { ...this.viewport, x: this.viewport.x + i, y: this.viewport.y + r }, this.lastPointer = { x: e.clientX, y: e.clientY };
  }
  handlePointerUp(e) {
    e.pointerId === this.pointerId && (this.pointerId = void 0, this.lastPointer = void 0);
  }
  selectRoom(e, t) {
    e.stopPropagation(), this.selectedRoom = this.selectedRoom?.id === t.id ? void 0 : t, this.selectedRoom && (this.selectedPresence = void 0);
  }
  selectPresence(e, t) {
    e.stopPropagation(), this.selectedPresence = this.selectedPresence?.id === t.id ? void 0 : t, this.selectedPresence && (this.selectedRoom = void 0);
  }
  renderRooms() {
    return this.rooms.map((e) => {
      if (!e.points.length) return f;
      const t = e.points.map(([d, p]) => `${d * v},${p * v}`).join(" "), i = e.id === this.selectedRoom?.id, r = e.points.reduce((d, p) => d + p[0], 0) / e.points.length, n = e.points.reduce((d, p) => d + p[1], 0) / e.points.length, o = (e.label?.x ?? r) * v, s = (e.label?.y ?? n) * v, a = e.color ?? "#03a9f4", l = Math.max(76, Math.min(190, (e.name?.length ?? 0) * 15 + 28));
      return C`<g class=${i ? "room selected" : "room"} @pointerdown=${(d) => d.stopPropagation()} @click=${(d) => this.selectRoom(d, e)}><polygon points=${t} fill=${a} fill-opacity=${i ? "0.34" : "0.18"} stroke=${a} stroke-opacity="0.9" stroke-width=${i ? "5" : "3"} vector-effect="non-scaling-stroke"></polygon>${e.name ? C`<rect class="room-label-mask" x=${o - l / 2} y=${s - 18} width=${l} height="36" rx="10"></rect><text class="room-label" x=${o} y=${s} text-anchor="middle" dominant-baseline="middle">${e.name}</text>` : f}</g>`;
    });
  }
  renderPresences() {
    return this.presences.filter((e) => e.visible !== !1).map((e, t) => {
      const i = e.type ?? "person", r = e.id === this.selectedPresence?.id, n = (e.x ?? 0.5) * v, o = (e.y ?? 0.5) * v, s = e.icon ?? cn[i], a = gn(e.avatar), l = e.color ?? "#03a9f4", d = r ? 31 : 25, p = d * 2, c = `presence-avatar-${t}`, g = r ? 58 : 52;
      return C`<g class=${r ? "presence selected" : "presence"} transform=${`translate(${n} ${o})`} @pointerdown=${(u) => u.stopPropagation()} @click=${(u) => this.selectPresence(u, e)}>${a ? C`<defs><clipPath id=${c}><circle r=${d - 3}></circle></clipPath></defs><circle class="presence-avatar-background" r=${d} fill=${l}></circle><image href=${a} x=${-d + 3} y=${-d + 3} width=${p - 6} height=${p - 6} preserveAspectRatio="xMidYMid slice" clip-path=${`url(#${c})`}></image><circle class="presence-border" r=${d} fill="none" stroke=${l} stroke-width=${r ? "5" : "3"} vector-effect="non-scaling-stroke"></circle>` : C`<circle class="presence-marker" r=${d} fill=${l} fill-opacity=${r ? "1" : ".88"}></circle><text class="presence-icon" text-anchor="middle" dominant-baseline="middle">${s}</text>`}<text class="presence-label" y=${g} text-anchor="middle">${e.name ?? e.id}</text></g>`;
    });
  }
  render() {
    const e = sn(this.viewport);
    return h`<div class="viewport"><svg class="floorplan" viewBox="0 0 ${v} ${v}" @wheel=${this.handleWheel} @pointerdown=${this.handlePointerDown} @pointermove=${this.handlePointerMove} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerUp} @click=${() => {
      this.selectedRoom = void 0, this.selectedPresence = void 0;
    }}><rect class="backdrop" width=${v} height=${v}></rect><g class="scene" transform=${e}>${this.svgMarkup ? C`<g class="floorplan-source inline-source">${Wr(this.svgMarkup)}</g>` : this.imageSource ? C`<image class="floorplan-source" href=${this.imageSource} x="0" y="0" width=${v} height=${v} preserveAspectRatio=${this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>` : f}<g class="rooms-scene">${this.renderRooms()}</g><g class="presences-scene">${this.renderPresences()}</g></g></svg>${this.loadError ? h`<div class="load-error">${this.loadError}</div>` : f}<div class="zoom-badge">⌂ &nbsp; ${Math.round(this.viewport.zoom * 100)}%</div></div>${this.selectedRoom ? h`<explorer-room-panel .hass=${this.hass} .room=${this.selectedRoom} @close=${() => this.selectedRoom = void 0}></explorer-room-panel>` : f}`;
  }
};
B.styles = I`:host{display:block;position:relative}.viewport{position:relative;overflow:hidden;background:var(--secondary-background-color);touch-action:none;max-height:var(--explorer-viewport-max-height,none)}svg.floorplan{display:block;width:100%;height:auto;aspect-ratio:1/1;user-select:none}.backdrop{fill:var(--card-background-color,#fff)}.floorplan-source{pointer-events:none}.inline-source{pointer-events:none}.room{cursor:pointer}.room polygon{transition:fill-opacity .18s ease,stroke-width .18s ease}.room-label-mask{fill:transparent;pointer-events:none}.room-label{font-size:18px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.presence{cursor:pointer}.presence-icon{font-size:24px;fill:#fff;pointer-events:none}.presence-label{font-size:16px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.zoom-badge{position:absolute;right:14px;bottom:14px;padding:8px 12px;border-radius:999px;background:rgba(0,0,0,.66);color:#fff;font-size:.8rem;font-weight:700;pointer-events:none}.load-error{position:absolute;left:14px;right:14px;top:14px;padding:10px 12px;border-radius:10px;background:var(--error-color,#db4437);color:#fff;font-size:.85rem;font-weight:700}@media(max-width:600px){.room-label{font-size:16px}.presence-label{font-size:14px}.zoom-badge{right:10px;bottom:10px}}`;
H([
  A({ attribute: !1 })
], B.prototype, "hass", 2);
H([
  A()
], B.prototype, "image", 2);
H([
  A({ attribute: !1 })
], B.prototype, "rooms", 2);
H([
  A({ attribute: !1 })
], B.prototype, "presences", 2);
H([
  A({ type: Number, attribute: "min-zoom" })
], B.prototype, "minZoom", 2);
H([
  A({ type: Number, attribute: "max-zoom" })
], B.prototype, "maxZoom", 2);
H([
  A({ type: Number, attribute: "initial-zoom" })
], B.prototype, "initialZoom", 2);
H([
  A({ attribute: "fit-mode" })
], B.prototype, "fitMode", 2);
H([
  b()
], B.prototype, "viewport", 2);
H([
  b()
], B.prototype, "selectedRoom", 2);
H([
  b()
], B.prototype, "selectedPresence", 2);
H([
  b()
], B.prototype, "metadata", 2);
H([
  b()
], B.prototype, "imageSource", 2);
H([
  b()
], B.prototype, "svgMarkup", 2);
H([
  b()
], B.prototype, "loadError", 2);
B = H([
  R("explorer-canvas")
], B);
function we(e, t) {
  const i = (e.rooms ?? []).find((r) => r.id === t);
  if (i) {
    if (i.presence_anchor) return [i.presence_anchor.x, i.presence_anchor.y];
    if (i.points.length)
      return [
        i.points.reduce((r, n) => r + n[0], 0) / i.points.length,
        i.points.reduce((r, n) => r + n[1], 0) / i.points.length
      ];
  }
}
function Xe(e, t) {
  return (e.rooms ?? []).find((i) => i.id === t)?.name ?? t;
}
function fn(e, t) {
  return (e.route_nodes ?? []).find((i) => i.id === t)?.name ?? t;
}
function he(e) {
  return `${e.kind}:${e.id}`;
}
function yt(e, t) {
  return t.kind === "room" ? we(e, t.id) : (e.route_nodes ?? []).find((i) => i.id === t.id)?.point;
}
function bn(e, t) {
  const i = yt(e, t);
  if (i)
    return t.kind === "room" ? {
      kind: "room",
      id: t.id,
      key: he(t),
      label: Xe(e, t.id),
      point: i
    } : {
      kind: "node",
      id: t.id,
      key: he(t),
      label: fn(e, t.id),
      point: i
    };
}
function ar(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : ["on"];
}
function yn(e) {
  return ar(e.condition?.allowed_states);
}
function je(e, t) {
  if (!e.state_binding)
    return {
      nodeId: e.id,
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  const i = e.state_binding.entity?.trim(), r = ar(e.state_binding.open_states);
  if (!i)
    return {
      nodeId: e.id,
      conditional: !0,
      active: !1,
      allowedStates: r,
      reason: "missing_entity"
    };
  const n = t?.(i);
  if (n === void 0)
    return {
      nodeId: e.id,
      conditional: !0,
      active: !1,
      entity: i,
      allowedStates: r,
      reason: "entity_unavailable"
    };
  const o = r.includes(n);
  return {
    nodeId: e.id,
    conditional: !0,
    active: o,
    entity: i,
    currentState: n,
    allowedStates: r,
    ...o ? {} : { reason: "state_blocked" }
  };
}
function vn(e, t, i) {
  if (!e.condition)
    return {
      index: t,
      edge: e,
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  const r = e.condition.entity?.trim(), n = yn(e);
  if (!r)
    return {
      index: t,
      edge: e,
      conditional: !0,
      active: !1,
      allowedStates: n,
      reason: "missing_entity",
      conditionSource: "edge"
    };
  const o = i?.(r);
  if (o === void 0)
    return {
      index: t,
      edge: e,
      conditional: !0,
      active: !1,
      entity: r,
      allowedStates: n,
      reason: "entity_unavailable",
      conditionSource: "edge"
    };
  const s = n.includes(o);
  return {
    index: t,
    edge: e,
    conditional: !0,
    active: s,
    entity: r,
    currentState: o,
    allowedStates: n,
    conditionSource: "edge",
    ...s ? {} : { reason: "state_blocked" }
  };
}
function nt(e, t) {
  const i = new Map((e.route_nodes ?? []).map((r) => [r.id, r]));
  return (e.route_graph_edges ?? []).map((r, n) => {
    const o = vn(r, n, t), a = [r.from, r.to].filter((g) => g.kind === "node").map((g) => i.get(g.id)).filter((g) => !!g).map((g) => je(g, t)).filter((g) => g.conditional), d = a.find((g) => !g.active) ?? (o.conditional ? void 0 : a[0]), p = o.active && a.every((g) => g.active), c = o.conditional || a.length > 0;
    return d ? {
      ...o,
      conditional: c,
      active: p,
      entity: d.entity,
      currentState: d.currentState,
      allowedStates: d.allowedStates,
      reason: p ? void 0 : d.reason,
      conditionSource: "node",
      nodeId: d.nodeId,
      nodeStatuses: a
    } : {
      ...o,
      conditional: c,
      active: p,
      nodeStatuses: a
    };
  });
}
function lr(e) {
  return e.path ? e.path : (e.via ?? []).map((t) => ({ point: t }));
}
function xn(e, t, i) {
  if (t.node_id) {
    const r = (e.route_nodes ?? []).find((n) => n.id === t.node_id);
    return r ? {
      kind: "node",
      id: r.id,
      key: `node:${r.id}`,
      label: r.name ?? r.id,
      point: r.point
    } : void 0;
  }
  if (t.point)
    return {
      kind: "point",
      key: `point:${i}`,
      label: `Waypoint ${i + 1}`,
      point: t.point
    };
}
function ii(e) {
  let t = 0;
  for (let i = 1; i < e.length; i += 1)
    t += Math.hypot(
      e[i].point[0] - e[i - 1].point[0],
      e[i].point[1] - e[i - 1].point[1]
    );
  return t;
}
function Ni(e, t, i, r, n, o) {
  const s = we(e, i), a = we(e, r);
  if (!s || !a) return;
  const l = lr(t), p = (n ? [...l].reverse() : l).map((g, u) => xn(e, g, u)).filter((g) => !!g), c = [
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: Xe(e, i),
      point: s
    },
    ...p,
    {
      kind: "room",
      id: r,
      key: `room:${r}`,
      label: Xe(e, r),
      point: a
    }
  ];
  return {
    source: "manual",
    hops: c,
    distance: ii(c),
    manualRoute: t,
    reversedManualRoute: n,
    blockedEdges: o
  };
}
function wn(e, t) {
  const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = (a) => {
    const l = he(a);
    n.set(l, a);
    const d = r.get(l);
    if (d) return d;
    const p = yt(e, a);
    return p && r.set(l, p), p;
  }, s = (a, l, d) => {
    const p = i.get(a) ?? [];
    p.push({ key: l, weight: d }), i.set(a, p);
  };
  return t.forEach((a) => {
    if (!a.active) return;
    const l = a.edge, d = o(l.from), p = o(l.to);
    if (!d || !p) return;
    const c = he(l.from), g = he(l.to);
    if (c === g) return;
    const u = Math.hypot(p[0] - d[0], p[1] - d[1]);
    s(c, g, u), s(g, c, u);
  }), { adjacency: i, positions: r, endpoints: n };
}
function $n(e, t, i, r, n) {
  if (!(e.route_graph_edges ?? []).length) return;
  const o = `room:${t}`, s = `room:${i}`, { adjacency: a, endpoints: l } = wn(e, r);
  if (!a.has(o) || !a.has(s)) return;
  const d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), c = new Set(a.keys());
  for (a.forEach((m) => m.forEach(($) => c.add($.key))), c.forEach((m) => d.set(m, Number.POSITIVE_INFINITY)), d.set(o, 0); c.size; ) {
    let m, $ = Number.POSITIVE_INFINITY;
    for (const w of c) {
      const _ = d.get(w) ?? Number.POSITIVE_INFINITY;
      _ < $ && (m = w, $ = _);
    }
    if (!m || !Number.isFinite($) || (c.delete(m), m === s)) break;
    for (const w of a.get(m) ?? []) {
      if (!c.has(w.key)) continue;
      const _ = $ + w.weight;
      _ < (d.get(w.key) ?? Number.POSITIVE_INFINITY) && (d.set(w.key, _), p.set(w.key, m));
    }
  }
  if (!Number.isFinite(d.get(s) ?? Number.POSITIVE_INFINITY)) return;
  const g = [s];
  let u = s;
  for (; u !== o; ) {
    const m = p.get(u);
    if (!m) return;
    g.push(m), u = m;
  }
  g.reverse();
  const y = g.map((m) => l.get(m)).map((m) => m ? bn(e, m) : void 0).filter((m) => !!m);
  if (!(y.length < 2))
    return {
      source: "graph",
      hops: y,
      distance: ii(y),
      blockedEdges: n
    };
}
function ri(e, t, i, r) {
  if (!t || !i || t === i) return;
  const n = nt(e, r), o = n.filter((g) => !g.active), s = (e.routes ?? []).find(
    (g) => g.from === t && g.to === i
  );
  if (s) return Ni(e, s, t, i, !1, o);
  const a = (e.routes ?? []).find(
    (g) => g.from === i && g.to === t
  );
  if (a) return Ni(e, a, t, i, !0, o);
  const l = $n(e, t, i, n, o);
  if (l) return l;
  const d = we(e, t), p = we(e, i);
  if (!d || !p) return;
  const c = [
    {
      kind: "room",
      id: t,
      key: `room:${t}`,
      label: Xe(e, t),
      point: d
    },
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: Xe(e, i),
      point: p
    }
  ];
  return {
    source: "fallback",
    hops: c,
    distance: ii(c),
    blockedEdges: o
  };
}
function kn(e) {
  return [he(e.from), he(e.to)].sort().join("|");
}
function Ri(e, t) {
  const i = e.route_graph_edges ?? [];
  let r = 0, n = 0, o = 0;
  const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), d = (x) => {
    a.set(x, (a.get(x) ?? 0) + 1);
  }, p = (x, S) => {
    const N = l.get(x) ?? /* @__PURE__ */ new Set();
    N.add(S), l.set(x, N);
    const z = l.get(S) ?? /* @__PURE__ */ new Set();
    z.add(x), l.set(S, z);
  };
  i.forEach((x) => {
    const S = he(x.from), N = he(x.to), z = kn(x);
    S === N && (o += 1), s.has(z) && (n += 1), s.add(z);
    const X = yt(e, x.from), Q = yt(e, x.to);
    if (!X || !Q || S === N) {
      r += 1;
      return;
    }
    d(S), d(N), p(S, N);
  });
  const c = i.length ? (e.rooms ?? []).filter((x) => we(e, x.id) && !a.has(`room:${x.id}`)).map((x) => x.id) : [], g = i.length ? (e.route_nodes ?? []).filter((x) => !a.has(`node:${x.id}`)).map((x) => x.id) : [];
  let u = 0;
  const y = new Set(l.keys());
  for (; y.size; ) {
    u += 1;
    const x = y.values().next().value;
    if (!x) break;
    const S = [x];
    for (y.delete(x); S.length; ) {
      const N = S.pop();
      for (const z of l.get(N) ?? [])
        y.has(z) && (y.delete(z), S.push(z));
    }
  }
  const m = [], $ = new Set((e.route_nodes ?? []).map((x) => x.id));
  (e.routes ?? []).forEach((x) => {
    lr(x).forEach((S) => {
      S.node_id && !$.has(S.node_id) && m.push({ from: x.from, to: x.to, nodeId: S.node_id });
    });
  });
  const w = nt(e, t), _ = w.filter((x) => !x.active), k = (e.route_nodes ?? []).map((x) => je(x, t)).filter((x) => x.conditional), E = k.filter((x) => !x.active), M = /* @__PURE__ */ new Set();
  return w.forEach((x) => {
    x.conditionSource === "edge" && (x.reason === "missing_entity" || x.reason === "entity_unavailable") && M.add(x.entity ?? "(mangler entity)");
  }), k.forEach((x) => {
    (x.reason === "missing_entity" || x.reason === "entity_unavailable") && M.add(x.entity ?? "(mangler entity)");
  }), {
    invalidEdges: r,
    duplicateEdges: n,
    selfEdges: o,
    components: u,
    disconnectedRoomIds: c,
    disconnectedNodeIds: g,
    brokenRouteNodeReferences: m,
    conditionalEdges: w.filter((x) => x.conditional).length,
    blockedEdges: _,
    conditionalNodes: k.length,
    blockedNodes: E,
    unresolvedConditionEntities: [...M]
  };
}
var _n = Object.defineProperty, An = Object.getOwnPropertyDescriptor, At = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? An(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && _n(t, i, n), n;
};
const Et = 900, Mi = 3600, zi = 58, j = "http://www.w3.org/2000/svg";
let De = class extends B {
  constructor() {
    super(...arguments), this.routes = [], this.routeNodes = [], this.routeGraphEdges = [], this.previousPresencePositions = /* @__PURE__ */ new Map(), this.previousPresenceRooms = /* @__PURE__ */ new Map(), this.activeAnimations = /* @__PURE__ */ new Map();
  }
  updated(e) {
    if (super.updated(e), (e.has("hass") || e.has("rooms") || e.has("routeNodes") || e.has("routeGraphEdges")) && this.syncRouteStatusOverlay(), !e.has("presences")) return;
    const t = this.presences.filter((o) => o.visible !== !1), i = Array.from(
      this.renderRoot.querySelectorAll("g.presence")
    ), r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, n = /* @__PURE__ */ new Set();
    t.forEach((o, s) => {
      const a = i[s];
      if (!a) return;
      const l = {
        x: (o.x ?? 0.5) * v,
        y: (o.y ?? 0.5) * v
      }, d = this.previousPresencePositions.get(o.id), p = this.previousPresenceRooms.get(o.id), c = o.room_id;
      if (n.add(o.id), this.activeAnimations.get(o.id)?.remove(), this.activeAnimations.delete(o.id), !r && d && (Math.abs(d.x - l.x) > 0.01 || Math.abs(d.y - l.y) > 0.01)) {
        const g = this.resolveMovementPath(d, l, p, c);
        this.createFootsteps(g);
        const u = document.createElementNS(j, "animateTransform");
        u.setAttribute("attributeName", "transform"), u.setAttribute("attributeType", "XML"), u.setAttribute("type", "translate"), u.setAttribute("values", g.map((y) => `${y.x} ${y.y}`).join(";")), u.setAttribute("keyTimes", this.buildKeyTimes(g).join(";")), u.setAttribute("dur", `${Et}ms`), u.setAttribute("begin", "indefinite"), u.setAttribute("fill", "freeze"), u.setAttribute("calcMode", "linear"), a.appendChild(u), this.activeAnimations.set(o.id, u), u.beginElement(), window.setTimeout(() => {
          this.activeAnimations.get(o.id) === u && (u.remove(), this.activeAnimations.delete(o.id));
        }, Et + 80);
      }
      this.previousPresencePositions.set(o.id, l), this.previousPresenceRooms.set(o.id, c);
    });
    for (const o of this.previousPresencePositions.keys())
      n.has(o) || (this.previousPresencePositions.delete(o), this.previousPresenceRooms.delete(o));
  }
  routeConfig() {
    return {
      type: "custom:ha-explorer-card",
      rooms: this.rooms,
      route_nodes: this.routeNodes,
      route_graph_edges: this.routeGraphEdges,
      routes: this.routes
    };
  }
  endpointPoint(e) {
    if (e.kind === "node") {
      const i = this.routeNodes.find((r) => r.id === e.id);
      return i ? { x: i.point[0] * v, y: i.point[1] * v } : void 0;
    }
    const t = this.rooms.find((i) => i.id === e.id);
    if (t) {
      if (t.presence_anchor)
        return {
          x: t.presence_anchor.x * v,
          y: t.presence_anchor.y * v
        };
      if (t.points.length)
        return {
          x: t.points.reduce((i, r) => i + r[0], 0) / t.points.length * v,
          y: t.points.reduce((i, r) => i + r[1], 0) / t.points.length * v
        };
    }
  }
  endpointLabel(e) {
    return e.kind === "node" ? this.routeNodes.find((t) => t.id === e.id)?.name ?? e.id : this.rooms.find((t) => t.id === e.id)?.name ?? e.id;
  }
  edgeStatusColor(e) {
    return e.conditional ? e.active ? "var(--success-color, #43a047)" : "var(--error-color, #db4437)" : "var(--secondary-text-color, #667085)";
  }
  statusDescription(e) {
    const t = `${this.endpointLabel(e.edge.from)} ↔ ${this.endpointLabel(e.edge.to)}`;
    if (!e.conditional) return `${t} · altid aktiv`;
    const i = e.currentState ?? "ukendt", r = e.conditionSource === "node" ? `dørpunkt ${this.routeNodes.find((n) => n.id === e.nodeId)?.name ?? e.nodeId ?? "ukendt"}` : "route-condition";
    return `${t} · ${e.active ? "aktiv" : "blokeret"} · ${r} · ${e.entity ?? "manglende entity"}: ${i}`;
  }
  doorVisualStatus(e, t) {
    if (e.state_binding)
      return je(
        e,
        (a) => this.hass?.states[a]?.state
      ).active ? "active" : "blocked";
    const r = t.filter((s) => {
      const { from: a, to: l } = s.edge;
      return a.kind === "node" && a.id === e.id || l.kind === "node" && l.id === e.id;
    }).filter((s) => s.conditional);
    if (!r.length) return "always";
    const n = r.some((s) => s.active), o = r.some((s) => !s.active);
    return n && o ? "mixed" : n ? "active" : "blocked";
  }
  doorStatusColor(e) {
    return e === "active" ? "var(--success-color, #43a047)" : e === "blocked" ? "var(--error-color, #db4437)" : e === "mixed" ? "var(--warning-color, #ff9800)" : "var(--secondary-text-color, #667085)";
  }
  appendSvgTitle(e, t) {
    const i = document.createElementNS(j, "title");
    i.textContent = t, e.appendChild(i);
  }
  syncRouteStatusOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.route-status-scene")?.remove();
    const t = this.routeNodes.filter((s) => s.kind === "door");
    if (!this.routeGraphEdges.length && !t.length) return;
    const i = nt(
      this.routeConfig(),
      (s) => this.hass?.states[s]?.state
    ), r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, n = document.createElementNS(j, "g");
    n.setAttribute("class", "route-status-scene"), n.setAttribute("aria-label", "Live rutestatus og døre"), n.setAttribute("pointer-events", "none"), i.forEach((s) => {
      const a = this.endpointPoint(s.edge.from), l = this.endpointPoint(s.edge.to);
      if (!a || !l) return;
      const d = this.edgeStatusColor(s), p = document.createElementNS(j, "line");
      if (p.setAttribute("x1", String(a.x)), p.setAttribute("y1", String(a.y)), p.setAttribute("x2", String(l.x)), p.setAttribute("y2", String(l.y)), p.setAttribute("stroke", d), p.setAttribute("stroke-linecap", "round"), p.setAttribute("vector-effect", "non-scaling-stroke"), p.setAttribute("stroke-width", s.conditional ? s.active ? "4.5" : "5.5" : "2.5"), p.setAttribute("stroke-opacity", s.conditional ? s.active ? ".72" : ".82" : ".2"), s.conditional || p.setAttribute("stroke-dasharray", "4 10"), s.conditional && !s.active && p.setAttribute("stroke-dasharray", "13 9"), this.appendSvgTitle(p, this.statusDescription(s)), n.appendChild(p), !s.conditional) return;
      const c = (a.x + l.x) / 2, g = (a.y + l.y) / 2, u = document.createElementNS(j, "g");
      u.setAttribute("transform", `translate(${c} ${g})`);
      const y = document.createElementNS(j, "circle");
      y.setAttribute("r", "12"), y.setAttribute("fill", "var(--card-background-color, #ffffff)"), y.setAttribute("fill-opacity", ".9"), y.setAttribute("stroke", d), y.setAttribute("stroke-width", "3"), y.setAttribute("vector-effect", "non-scaling-stroke"), u.appendChild(y);
      const m = document.createElementNS(j, "text");
      if (m.setAttribute("text-anchor", "middle"), m.setAttribute("dominant-baseline", "central"), m.setAttribute("fill", d), m.setAttribute("font-size", "16"), m.setAttribute("font-weight", "900"), m.setAttribute("font-family", "system-ui, sans-serif"), m.textContent = s.active ? "✓" : "×", u.appendChild(m), !s.active && !r) {
        const $ = document.createElementNS(j, "animate");
        $.setAttribute("attributeName", "opacity"), $.setAttribute("values", "1;.45;1"), $.setAttribute("dur", "1.8s"), $.setAttribute("repeatCount", "indefinite"), u.appendChild($);
      }
      this.appendSvgTitle(u, this.statusDescription(s)), n.appendChild(u);
    }), t.forEach((s) => {
      const a = this.doorVisualStatus(s, i), l = this.doorStatusColor(a), d = s.point[0] * v, p = s.point[1] * v, c = document.createElementNS(j, "g");
      c.setAttribute("transform", `translate(${d} ${p})`);
      const g = document.createElementNS(j, "circle");
      g.setAttribute("r", "22"), g.setAttribute("fill", "var(--card-background-color, #ffffff)"), g.setAttribute("fill-opacity", ".9"), g.setAttribute("stroke", l), g.setAttribute("stroke-width", "4"), g.setAttribute("vector-effect", "non-scaling-stroke"), c.appendChild(g);
      const u = document.createElementNS(j, "rect");
      u.setAttribute("x", "-9"), u.setAttribute("y", "-13"), u.setAttribute("width", "15"), u.setAttribute("height", "26"), u.setAttribute("rx", "1.5"), u.setAttribute("fill", "none"), u.setAttribute("stroke", l), u.setAttribute("stroke-width", "3"), u.setAttribute("vector-effect", "non-scaling-stroke"), c.appendChild(u);
      const y = document.createElementNS(j, "circle");
      if (y.setAttribute("cx", "2"), y.setAttribute("cy", "0"), y.setAttribute("r", "2"), y.setAttribute("fill", l), c.appendChild(y), a === "blocked") {
        const k = document.createElementNS(j, "line");
        k.setAttribute("x1", "-12"), k.setAttribute("y1", "-15"), k.setAttribute("x2", "12"), k.setAttribute("y2", "15"), k.setAttribute("stroke", l), k.setAttribute("stroke-width", "4"), k.setAttribute("stroke-linecap", "round"), k.setAttribute("vector-effect", "non-scaling-stroke"), c.appendChild(k);
      }
      const m = document.createElementNS(j, "circle");
      if (m.setAttribute("cx", "16"), m.setAttribute("cy", "-16"), m.setAttribute("r", "6"), m.setAttribute("fill", l), m.setAttribute("stroke", "var(--card-background-color, #ffffff)"), m.setAttribute("stroke-width", "2"), m.setAttribute("vector-effect", "non-scaling-stroke"), c.appendChild(m), s.name) {
        const k = document.createElementNS(j, "text");
        k.setAttribute("y", "39"), k.setAttribute("text-anchor", "middle"), k.setAttribute("fill", "var(--primary-text-color, #1f2937)"), k.setAttribute("font-size", "20"), k.setAttribute("font-weight", "700"), k.setAttribute("font-family", "system-ui, sans-serif"), k.setAttribute("paint-order", "stroke"), k.setAttribute("stroke", "var(--card-background-color, #ffffff)"), k.setAttribute("stroke-width", "5"), k.setAttribute("stroke-linejoin", "round"), k.textContent = s.name, c.appendChild(k);
      }
      const $ = a === "always" ? "altid aktiv" : a === "active" ? "åben" : a === "blocked" ? "lukket / blokeret" : "blandet status", w = s.state_binding ? je(s, (k) => this.hass?.states[k]?.state) : void 0, _ = w?.entity ? ` · ${w.entity}: ${w.currentState ?? "ukendt"} · åben: ${w.allowedStates.join(", ")}` : "";
      this.appendSvgTitle(c, `${s.name ?? s.id} · ${$}${_}`), n.appendChild(c);
    });
    const o = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(n, o ?? null);
  }
  resolveMovementPath(e, t, i, r) {
    if (!i || !r || i === r) return [e, t];
    const n = ri(
      this.routeConfig(),
      i,
      r,
      (s) => this.hass?.states[s]?.state
    );
    if (!n) return [e, t];
    const o = n.hops.slice(1, -1).map((s) => ({
      x: s.point[0] * v,
      y: s.point[1] * v
    }));
    return [e, ...o, t];
  }
  buildKeyTimes(e) {
    if (e.length <= 2) return [0, 1];
    const t = [];
    let i = 0;
    for (let o = 1; o < e.length; o += 1) {
      const s = Math.hypot(e[o].x - e[o - 1].x, e[o].y - e[o - 1].y);
      t.push(s), i += s;
    }
    if (i <= 0) return e.map((o, s) => s / (e.length - 1));
    const r = [0];
    let n = 0;
    return t.forEach((o) => {
      n += o, r.push(n / i);
    }), r;
  }
  ensureFootstepLayer() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    let t = e.querySelector(":scope > g.footsteps-scene");
    if (t) return t;
    t = document.createElementNS(j, "g"), t.setAttribute("class", "footsteps-scene"), t.setAttribute("aria-label", "Bevægelsesspor"), t.setAttribute("pointer-events", "none");
    const i = e.querySelector(":scope > g.presences-scene");
    return e.insertBefore(t, i ?? null), t;
  }
  createFootsteps(e) {
    const t = this.ensureFootstepLayer();
    if (!t || e.length < 2) return;
    const i = e.slice(1).map((o, s) => {
      const a = e[s];
      return {
        start: a,
        end: o,
        length: Math.hypot(o.x - a.x, o.y - a.y)
      };
    }), r = i.reduce((o, s) => o + s.length, 0);
    if (r < zi) return;
    const n = Math.min(20, Math.max(3, Math.floor(r / zi)));
    for (let o = 0; o < n; o += 1) {
      const s = (o + 1) / (n + 1), a = r * s;
      let l = 0, d = i[i.length - 1];
      for (const z of i) {
        if (l + z.length >= a) {
          d = z;
          break;
        }
        l += z.length;
      }
      const p = d.length > 0 ? (a - l) / d.length : 0, c = d.end.x - d.start.x, g = d.end.y - d.start.y, u = o % 2 === 0 ? -1 : 1, y = d.length > 0 ? -g / d.length : 0, m = d.length > 0 ? c / d.length : 0, $ = 9 * u, w = d.start.x + c * p + y * $, _ = d.start.y + g * p + m * $, k = Math.atan2(g, c) * 180 / Math.PI + 90, E = Math.round(s * Et), M = document.createElementNS(j, "g");
      M.setAttribute("transform", `translate(${w} ${_}) rotate(${k + u * 8})`), M.setAttribute("opacity", "0");
      const x = document.createElementNS(j, "ellipse");
      x.setAttribute("cx", "0"), x.setAttribute("cy", "-5"), x.setAttribute("rx", "6"), x.setAttribute("ry", "12"), x.setAttribute("fill", "rgba(67, 48, 31, 0.72)");
      const S = document.createElementNS(j, "ellipse");
      S.setAttribute("cx", "0"), S.setAttribute("cy", "9"), S.setAttribute("rx", "4.5"), S.setAttribute("ry", "5.5"), S.setAttribute("fill", "rgba(67, 48, 31, 0.68)");
      const N = document.createElementNS(j, "animate");
      N.setAttribute("attributeName", "opacity"), N.setAttribute("values", "0;0.72;0.56;0"), N.setAttribute("keyTimes", "0;0.08;0.58;1"), N.setAttribute("begin", "indefinite"), N.setAttribute("dur", `${Mi}ms`), N.setAttribute("fill", "freeze"), M.append(x, S, N), t.appendChild(M), window.setTimeout(() => {
        M.isConnected && N.beginElement();
      }, E), window.setTimeout(() => M.remove(), E + Mi + 120);
    }
  }
};
At([
  A({ attribute: !1 })
], De.prototype, "routes", 2);
At([
  A({ attribute: !1 })
], De.prototype, "routeNodes", 2);
At([
  A({ attribute: !1 })
], De.prototype, "routeGraphEdges", 2);
De = At([
  R("explorer-animated-canvas")
], De);
var Sn = Object.getOwnPropertyDescriptor, Cn = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Sn(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(n) || n);
  return n;
};
const T = "http://www.w3.org/2000/svg";
let vt = class extends De {
  updated(e) {
    super.updated(e), this.syncRoomReactionOverlay();
  }
  entityState(e) {
    const t = this.hass?.states[e];
    if (t)
      return { state: t.state, attributes: t.attributes };
  }
  appendTitle(e, t) {
    const i = document.createElementNS(T, "title");
    i.textContent = t, e.appendChild(i);
  }
  pointColor(e) {
    return e === "light" ? "var(--explorer-room-light-color, #f6bd60)" : e === "motion" ? "var(--explorer-room-motion-color, var(--primary-color, #03a9f4))" : e === "media" ? "var(--explorer-room-media-color, var(--accent-color, #7e57c2))" : e === "opening" ? "var(--explorer-room-opening-color, var(--warning-color, #ff9800))" : e === "fireplace" ? "var(--explorer-room-fireplace-color, #c46b2d)" : "var(--explorer-room-temperature-neutral, #4f9b78)";
  }
  appendPointBackdrop(e, t, i, r = 11) {
    const n = document.createElementNS(T, "circle");
    return n.setAttribute("r", String(r)), n.setAttribute("fill", "var(--card-background-color, #ffffff)"), n.setAttribute("fill-opacity", i ? ".94" : ".78"), n.setAttribute("stroke", t), n.setAttribute("stroke-width", i ? "3" : "2"), n.setAttribute("stroke-opacity", i ? ".95" : ".42"), n.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(n), n;
  }
  appendLightPoint(e, t, i) {
    const r = this.pointColor("light");
    if (t.active) {
      e.setAttribute("data-magical-light", "active");
      const o = Math.max(0.18, Math.min(1, t.intensity));
      [[74, 0.025], [52, 0.055], [34, 0.12]].forEach(([d, p], c) => {
        const g = document.createElementNS(T, "circle");
        if (g.setAttribute("class", `magical-light-glow glow-${c + 1}`), g.setAttribute("r", String(d * (0.82 + o * 0.34))), g.setAttribute("fill", r), g.setAttribute("fill-opacity", String(p + o * p * 1.8)), g.setAttribute("stroke", "none"), e.appendChild(g), !i && c === 1) {
          const u = document.createElementNS(T, "animate");
          u.setAttribute("attributeName", "fill-opacity"), u.setAttribute("values", `${p + o * 0.07};${p + o * 0.13};${p + o * 0.07}`), u.setAttribute("dur", "4.8s"), u.setAttribute("repeatCount", "indefinite"), g.appendChild(u);
        }
      });
      const a = document.createElementNS(T, "circle"), l = 24 + o * 24;
      if (a.setAttribute("class", "light-halo"), a.setAttribute("r", String(l)), a.setAttribute("fill", r), a.setAttribute("fill-opacity", String(0.08 + o * 0.18)), a.setAttribute("stroke", r), a.setAttribute("stroke-width", "2"), a.setAttribute("stroke-opacity", String(0.1 + o * 0.18)), a.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(a), !i) {
        const d = document.createElementNS(T, "animate");
        d.setAttribute("attributeName", "r"), d.setAttribute("values", `${l * 0.94};${l * 1.06};${l * 0.94}`), d.setAttribute("dur", "4.2s"), d.setAttribute("repeatCount", "indefinite"), a.appendChild(d);
      }
    }
    this.appendPointBackdrop(e, r, t.active, 11);
    const n = document.createElementNS(T, "text");
    n.setAttribute("class", "light-glyph"), n.setAttribute("text-anchor", "middle"), n.setAttribute("dominant-baseline", "central"), n.setAttribute("font-size", "15"), n.setAttribute("font-weight", "900"), n.setAttribute("fill", r), n.setAttribute("opacity", t.active ? "1" : ".48"), n.textContent = "✦", e.appendChild(n);
  }
  appendMotionPoint(e, t, i) {
    const r = this.pointColor("motion");
    this.appendPointBackdrop(e, r, t.active, 10);
    const n = document.createElementNS(T, "circle");
    if (n.setAttribute("r", t.active ? "4.5" : "3.5"), n.setAttribute("fill", r), n.setAttribute("opacity", t.active ? "1" : ".42"), e.appendChild(n), !t.active) return;
    const o = document.createElementNS(T, "circle");
    if (o.setAttribute("r", "15"), o.setAttribute("fill", "none"), o.setAttribute("stroke", r), o.setAttribute("stroke-width", "3"), o.setAttribute("stroke-opacity", ".78"), o.setAttribute("vector-effect", "non-scaling-stroke"), e.insertBefore(o, e.firstChild), !i) {
      const s = document.createElementNS(T, "animate");
      s.setAttribute("attributeName", "r"), s.setAttribute("values", "13;31;13"), s.setAttribute("dur", "1.8s"), s.setAttribute("repeatCount", "indefinite"), o.appendChild(s);
    }
  }
  appendMediaPoint(e, t) {
    const i = this.pointColor("media");
    if (t.active) {
      const o = document.createElementNS(T, "circle");
      o.setAttribute("r", "25"), o.setAttribute("fill", i), o.setAttribute("fill-opacity", ".12"), e.appendChild(o);
    }
    const r = document.createElementNS(T, "rect");
    r.setAttribute("x", "-16"), r.setAttribute("y", "-11"), r.setAttribute("width", "32"), r.setAttribute("height", "22"), r.setAttribute("rx", "4"), r.setAttribute("fill", "var(--card-background-color, #ffffff)"), r.setAttribute("fill-opacity", t.active ? ".94" : ".78"), r.setAttribute("stroke", i), r.setAttribute("stroke-width", t.active ? "3" : "2"), r.setAttribute("stroke-opacity", t.active ? ".95" : ".42"), e.appendChild(r);
    const n = document.createElementNS(T, "path");
    n.setAttribute("d", "M -4 -6 L 7 0 L -4 6 Z"), n.setAttribute("fill", i), n.setAttribute("opacity", t.active ? "1" : ".40"), e.appendChild(n);
  }
  appendOpeningPoint(e, t) {
    const i = this.pointColor("opening");
    this.appendPointBackdrop(e, i, t.active, 11);
    const r = document.createElementNS(T, "text");
    r.setAttribute("text-anchor", "middle"), r.setAttribute("dominant-baseline", "central"), r.setAttribute("font-size", t.active ? "18" : "15"), r.setAttribute("font-weight", "900"), r.setAttribute("fill", i), r.setAttribute("opacity", t.active ? "1" : ".42"), r.textContent = t.active ? "↗" : "━", e.appendChild(r);
  }
  appendFireplacePoint(e, t, i) {
    const r = this.pointColor("fireplace"), n = Math.max(0.2, Math.min(1, t.intensity || 1)), o = t.reaction.radius, s = Number.isFinite(o) ? Math.max(26, Math.min(160, o * v)) : 72;
    if (t.active) {
      e.setAttribute("data-fireplace", "active");
      const l = document.createElementNS(T, "circle");
      l.setAttribute("class", "fireplace-glow fireplace-glow-outer"), l.setAttribute("r", String(s)), l.setAttribute("fill", r), l.setAttribute("fill-opacity", String(0.07 + 0.11 * n)), e.appendChild(l);
      const d = document.createElementNS(T, "circle");
      if (d.setAttribute("class", "fireplace-glow fireplace-glow-inner"), d.setAttribute("r", String(s * 0.56)), d.setAttribute("fill", "var(--explorer-room-fireplace-hot, #e7a253)"), d.setAttribute("fill-opacity", String(0.12 + 0.17 * n)), e.appendChild(d), !i) {
        const p = document.createElementNS(T, "animate");
        p.setAttribute("attributeName", "fill-opacity"), p.setAttribute("values", `${0.1 + 0.12 * n};${0.2 + 0.18 * n};${0.12 + 0.1 * n};${0.24 + 0.16 * n};${0.1 + 0.12 * n}`), p.setAttribute("dur", "2.1s"), p.setAttribute("repeatCount", "indefinite"), d.appendChild(p);
        const c = document.createElementNS(T, "animate");
        c.setAttribute("attributeName", "r"), c.setAttribute("values", `${s * 0.93};${s * 1.05};${s * 0.97};${s * 0.93}`), c.setAttribute("dur", "3.6s"), c.setAttribute("repeatCount", "indefinite"), l.appendChild(c);
      }
    }
    this.appendPointBackdrop(e, r, t.active, 12);
    const a = document.createElementNS(T, "path");
    a.setAttribute("d", "M 0 9 C -8 4 -7 -4 -1 -10 C -1 -5 3 -4 4 -10 C 11 -2 10 5 4 9 C 3 5 1 2 0 -1 C -3 3 -3 6 0 9 Z"), a.setAttribute("fill", r), a.setAttribute("opacity", t.active ? "1" : ".42"), e.appendChild(a);
  }
  temperatureColor(e) {
    if (e.numericValue === void 0) return "var(--secondary-text-color, #777777)";
    const t = e.unit?.toLowerCase() ?? "", i = t.includes("f") ? (e.numericValue - 32) * (5 / 9) : e.numericValue;
    return i < 18 ? "var(--explorer-room-temperature-cold, #4f87c5)" : i <= 22 ? "var(--explorer-room-temperature-neutral, #4f9b78)" : i <= 25 ? "var(--explorer-room-temperature-warm, #d69b39)" : "var(--explorer-room-temperature-hot, #c65b45)";
  }
  formatTemperature(e) {
    if (e.numericValue === void 0) return "--";
    const t = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(e.numericValue);
    return e.unit ? `${t} ${e.unit}` : `${t}°`;
  }
  appendTemperaturePoint(e, t) {
    const i = this.temperatureColor(t), r = this.formatTemperature(t), n = Math.max(58, 24 + r.length * 8.2), o = document.createElementNS(T, "rect");
    o.setAttribute("x", String(-n / 2)), o.setAttribute("y", "-15"), o.setAttribute("width", String(n)), o.setAttribute("height", "30"), o.setAttribute("rx", "15"), o.setAttribute("fill", "var(--card-background-color, #ffffff)"), o.setAttribute("fill-opacity", t.active ? ".94" : ".78"), o.setAttribute("stroke", i), o.setAttribute("stroke-width", "2.5"), e.appendChild(o);
    const s = document.createElementNS(T, "text");
    s.setAttribute("text-anchor", "middle"), s.setAttribute("dominant-baseline", "central"), s.setAttribute("font-size", "14"), s.setAttribute("font-weight", "800"), s.setAttribute("fill", i), s.textContent = r, e.appendChild(s);
  }
  appendReactionPoint(e, t, i, r) {
    const n = mt(t, i.reaction), o = document.createElementNS(T, "g");
    o.setAttribute("class", `room-reaction-point ${i.reaction.kind} ${i.active ? "active" : "inactive"}`), o.setAttribute("data-reaction-kind", i.reaction.kind), o.setAttribute("transform", `translate(${n.x * v} ${n.y * v})`), i.reaction.kind === "light" ? this.appendLightPoint(o, i, r) : i.reaction.kind === "motion" ? this.appendMotionPoint(o, i, r) : i.reaction.kind === "media" ? this.appendMediaPoint(o, i) : i.reaction.kind === "opening" ? this.appendOpeningPoint(o, i) : i.reaction.kind === "fireplace" ? this.appendFireplacePoint(o, i, r) : this.appendTemperaturePoint(o, i);
    const s = i.reaction.kind === "temperature" ? this.formatTemperature(i) : i.currentState ?? "ukendt";
    this.appendTitle(o, `${t.name ?? t.id} · ${i.reaction.entity} · ${s}`), e.appendChild(o);
  }
  syncRoomReactionOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-reactions-scene")?.remove();
    const t = this.rooms.flatMap((a) => ti(a, (l) => this.entityState(l)).map((l) => ({ room: a, status: l })));
    if (!t.length) return;
    const i = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, r = document.createElementNS(T, "g");
    r.setAttribute("class", "room-reactions-scene"), r.setAttribute("aria-label", "Home Assistant entity-punkter"), r.setAttribute("pointer-events", "none"), t.forEach(({ room: a, status: l }) => this.appendReactionPoint(r, a, l, i));
    const n = e.querySelector(":scope > g.route-status-scene"), o = e.querySelector(":scope > g.footsteps-scene"), s = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, n ?? o ?? s ?? null);
  }
};
vt = Cn([
  R("explorer-living-canvas")
], vt);
var En = Object.getOwnPropertyDescriptor, Pn = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? En(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(n) || n);
  return n;
};
const Ke = "http://www.w3.org/2000/svg", Pt = 3e4;
let Qe = class extends vt {
  constructor() {
    super(...arguments), this.lastOccupiedAt = /* @__PURE__ */ new Map();
  }
  updated(e) {
    super.updated(e), (e.has("presences") || e.has("rooms")) && this.syncPresenceRoomActivity(), (e.has("hass") || e.has("rooms") || e.has("theme")) && this.syncTemperatureAtmosphere();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.afterglowTimer !== void 0 && window.clearTimeout(this.afterglowTimer);
  }
  pointInPolygon(e, t) {
    if (t.length < 3) return !1;
    const [i, r] = e;
    let n = !1;
    for (let o = 0, s = t.length - 1; o < t.length; s = o++) {
      const [a, l] = t[o], [d, p] = t[s];
      l > r != p > r && i < (d - a) * (r - l) / (p - l || Number.EPSILON) + a && (n = !n);
    }
    return n;
  }
  roomForPresence(e) {
    if (e.room_id) {
      const i = this.rooms.find(
        (r) => r.id === e.room_id || r.area_id === e.room_id
      );
      if (i) return i;
    }
    if (e.x === void 0 || e.y === void 0) return;
    const t = [e.x, e.y];
    return this.rooms.find((i) => this.pointInPolygon(t, i.points));
  }
  activities(e) {
    const t = /* @__PURE__ */ new Map();
    return this.presences.filter((i) => i.visible !== !1 && (i.type ?? "person") === "person").forEach((i) => {
      const r = this.roomForPresence(i);
      r && (t.set(r.id, (t.get(r.id) ?? 0) + 1), this.lastOccupiedAt.set(r.id, e));
    }), this.rooms.map((i) => {
      const r = t.get(i.id) ?? 0, n = r > 0, o = e - (this.lastOccupiedAt.get(i.id) ?? -1 / 0), s = !n && o >= 0 && o < Pt, a = n ? Math.min(1, 0.72 + Math.max(0, r - 1) * 0.12) : s ? Math.max(0, 1 - o / Pt) : 0;
      return { room: i, active: n, afterglow: s, intensity: a };
    }).filter((i) => i.active || i.afterglow);
  }
  polygonPoints(e) {
    return e.points.map(([t, i]) => `${t * v},${i * v}`).join(" ");
  }
  scheduleAfterglowRefresh(e, t) {
    this.afterglowTimer !== void 0 && window.clearTimeout(this.afterglowTimer);
    const i = e.filter((r) => r.afterglow).map((r) => Pt - (t - (this.lastOccupiedAt.get(r.room.id) ?? t)));
    i.length && (this.afterglowTimer = window.setTimeout(() => {
      this.afterglowTimer = void 0, this.syncPresenceRoomActivity();
    }, Math.max(50, Math.min(...i) + 30)));
  }
  syncRoomClasses(e) {
    const t = Array.from(this.renderRoot.querySelectorAll("g.rooms-scene > g.room"));
    t.forEach((i) => i.classList.remove("presence-active", "presence-afterglow")), this.rooms.filter((i) => i.points.length).forEach((i, r) => {
      const n = e.find((s) => s.room.id === i.id), o = t[r];
      !n || !o || o.classList.add(n.active ? "presence-active" : "presence-afterglow");
    });
  }
  syncPresenceRoomActivity() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.presence-room-activity-scene")?.remove();
    const t = Date.now(), i = this.activities(t);
    if (this.syncRoomClasses(i), this.scheduleAfterglowRefresh(i, t), !i.length) return;
    const r = document.createElementNS(Ke, "g");
    r.setAttribute("class", "presence-room-activity-scene"), r.setAttribute("aria-label", "Tilstedeværelsesbaseret rumaktivitet"), r.setAttribute("pointer-events", "none"), i.forEach(({ room: l, active: d, intensity: p }) => {
      if (l.points.length < 3) return;
      const c = document.createElementNS(Ke, "polygon");
      c.setAttribute("points", this.polygonPoints(l)), c.setAttribute("class", d ? "presence-room-active" : "presence-room-afterglow"), c.setAttribute("fill", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))"), c.setAttribute("fill-opacity", String(d ? 0.1 + p * 0.07 : 0.025 + p * 0.07)), c.setAttribute("stroke", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))"), c.setAttribute("stroke-opacity", String(d ? 0.28 : 0.08 + p * 0.16)), c.setAttribute("stroke-width", d ? "3" : "2"), c.setAttribute("vector-effect", "non-scaling-stroke"), r.appendChild(c);
    });
    const n = e.querySelector(":scope > g.room-reactions-scene"), o = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, n ?? o ?? s ?? a ?? null);
  }
  atmosphereEntityState(e) {
    const t = this.hass?.states[e];
    if (t)
      return { state: t.state, attributes: t.attributes };
  }
  temperatureCelsius(e) {
    return e.numericValue === void 0 || !Number.isFinite(e.numericValue) ? void 0 : (e.unit?.trim().toLowerCase() ?? "").includes("f") ? (e.numericValue - 32) * (5 / 9) : e.numericValue;
  }
  temperatureBand(e) {
    return e < 18 ? "cold" : e <= 22 ? "neutral" : e <= 25 ? "warm" : "hot";
  }
  atmosphereTemperatureColor(e) {
    const t = this.temperatureBand(e);
    return t === "cold" ? "var(--explorer-room-temperature-cold, #4f87c5)" : t === "neutral" ? "var(--explorer-room-temperature-neutral, #4f9b78)" : t === "warm" ? "var(--explorer-room-temperature-warm, #d69b39)" : "var(--explorer-room-temperature-hot, #c65b45)";
  }
  temperatureOpacity(e) {
    return e < 18 ? Math.min(0.115, 0.045 + (18 - e) * 0.0115) : e <= 22 ? 0.023 + Math.abs(e - 20) * 5e-3 : e <= 25 ? 0.038 + (e - 22) / 3 * 0.058 : Math.min(0.15, 0.096 + (e - 25) * 0.0115);
  }
  roomTemperatures() {
    return this.rooms.flatMap((e) => {
      if (e.points.length < 3) return [];
      const t = ti(e, (r) => this.atmosphereEntityState(r)).filter((r) => r.reaction.kind === "temperature" && r.active).map((r) => this.temperatureCelsius(r)).filter((r) => r !== void 0);
      if (!t.length) return [];
      const i = t.reduce((r, n) => r + n, 0) / t.length;
      return [{ room: e, celsius: i }];
    });
  }
  syncTemperatureAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-temperature-atmosphere-scene")?.remove();
    const t = this.roomTemperatures();
    if (!t.length) return;
    const i = document.createElementNS(Ke, "g");
    i.setAttribute("class", "room-temperature-atmosphere-scene"), i.setAttribute("aria-label", "Temperaturatmosfære i rum"), i.setAttribute("pointer-events", "none"), t.forEach(({ room: l, celsius: d }) => {
      const p = this.temperatureOpacity(d), c = this.atmosphereTemperatureColor(d), g = this.temperatureBand(d), u = document.createElementNS(Ke, "polygon");
      u.setAttribute("points", this.polygonPoints(l)), u.setAttribute("class", `room-temperature-atmosphere temperature-${g}`), u.setAttribute("data-temperature-band", g), u.setAttribute("fill", c), u.setAttribute("fill-opacity", String(p)), u.setAttribute("stroke", c), u.setAttribute("stroke-opacity", String(Math.min(0.18, 0.045 + p * 0.9))), u.setAttribute("stroke-width", "2"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("vector-effect", "non-scaling-stroke");
      const y = document.createElementNS(Ke, "title"), m = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(d);
      y.textContent = `${l.name ?? l.id} · temperaturatmosfære · ${m} °C`, u.appendChild(y), i.appendChild(u);
    });
    const r = e.querySelector(":scope > g.presence-room-activity-scene"), n = e.querySelector(":scope > g.room-reactions-scene"), o = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, r ?? n ?? o ?? s ?? a ?? null);
  }
};
Qe.styles = I`
    ${vt.styles}

    :host {
      --explorer-presence-room-color: var(--primary-color, #03a9f4);
    }

    .room.presence-active .room-label {
      font-weight: 850;
      opacity: 1;
      filter: drop-shadow(0 0 5px color-mix(in srgb, var(--explorer-presence-room-color) 45%, transparent));
    }

    .room.presence-afterglow .room-label {
      font-weight: 700;
      opacity: .88;
    }

    .presence-room-activity-scene polygon,
    .room-temperature-atmosphere-scene polygon {
      transition: fill-opacity .7s ease, stroke-opacity .7s ease;
    }

    :host([map-theme="enchanted_antique"]) {
      --explorer-presence-room-color: #6f4b2e;
      --explorer-room-temperature-cold: #667b88;
      --explorer-room-temperature-neutral: #77805a;
      --explorer-room-temperature-warm: #b27b43;
      --explorer-room-temperature-hot: #a6563e;
    }

    :host([map-theme="enchanted_antique"]) .presence-room-activity-scene polygon {
      mix-blend-mode: multiply;
      filter: sepia(.35) drop-shadow(0 0 2px rgba(76, 45, 25, .20));
    }

    :host([map-theme="enchanted_antique"]) .room-temperature-atmosphere-scene polygon {
      mix-blend-mode: multiply;
      opacity: .82;
      filter: saturate(.72) sepia(.12);
    }

    :host([map-theme="enchanted_antique"]) .room.presence-active .room-label {
      letter-spacing: .065em;
      text-shadow: 0 0 7px rgba(91, 57, 34, .24);
    }

    @media (prefers-reduced-motion: reduce) {
      .presence-room-activity-scene polygon,
      .room-temperature-atmosphere-scene polygon {
        transition: none;
      }
    }
  `;
Qe = Pn([
  R("explorer-presence-activity-canvas")
], Qe);
var Nn = Object.defineProperty, Rn = Object.getOwnPropertyDescriptor, ot = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Rn(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Nn(t, i, n), n;
};
const Mn = "http://www.w3.org/2000/svg";
let ge = class extends Qe {
  constructor() {
    super(...arguments), this.theme = "classic", this.compassRotation = -7, this.compassSize = 1, this.compassVisible = !0, this.artifactId = `explorer-antique-${Math.random().toString(36).slice(2, 10)}`, this.hasRevealedEnchanted = !1;
  }
  updated(e) {
    super.updated(e), this.syncThemeArtifacts();
  }
  createSvg(e) {
    return document.createElementNS(Mn, e);
  }
  setAttributes(e, t) {
    Object.entries(t).forEach(([i, r]) => e.setAttribute(i, r));
  }
  removeThemeArtifacts(e, t) {
    e.querySelector(`:scope > defs.${this.artifactId}`)?.remove(), e.querySelector(`:scope > g.${this.artifactId}-compass`)?.remove(), t.querySelector(`:scope > g.${this.artifactId}-paper`)?.remove();
  }
  createThemeDefs() {
    const e = this.createSvg("defs");
    e.setAttribute("class", this.artifactId);
    const t = this.createSvg("filter");
    this.setAttributes(t, { id: `${this.artifactId}-grain`, x: "-10%", y: "-10%", width: "120%", height: "120%", "color-interpolation-filters": "sRGB" });
    const i = this.createSvg("feTurbulence");
    this.setAttributes(i, { type: "fractalNoise", baseFrequency: ".035", numOctaves: "3", seed: "17", result: "noise" }), t.appendChild(i);
    const r = this.createSvg("feColorMatrix");
    this.setAttributes(r, { in: "noise", type: "matrix", values: "0 0 0 0 0.30  0 0 0 0 0.20  0 0 0 0 0.11  0 0 0 .24 0" }), t.appendChild(r), e.appendChild(t);
    const n = this.createSvg("radialGradient");
    n.setAttribute("id", `${this.artifactId}-vignette`), [["0%", "#f6e3b7", "0"], ["70%", "#9b6c3d", ".04"], ["100%", "#3f291c", ".30"]].forEach(([a, l, d]) => {
      const p = this.createSvg("stop");
      this.setAttributes(p, { offset: a, "stop-color": l, "stop-opacity": d }), n.appendChild(p);
    }), e.appendChild(n);
    const o = this.createSvg("pattern");
    this.setAttributes(o, { id: `${this.artifactId}-floor`, width: "28", height: "28", patternUnits: "userSpaceOnUse", patternTransform: "rotate(-8)" });
    const s = this.createSvg("rect");
    return this.setAttributes(s, { width: "28", height: "28", fill: "transparent" }), o.appendChild(s), [5, 14, 23].forEach((a) => {
      const l = this.createSvg("path");
      this.setAttributes(l, { d: `M 0 ${a} C 7 ${a - 1.3}, 19 ${a + 1.2}, 28 ${a}`, fill: "none", stroke: "#6a472d", "stroke-width": ".55", "stroke-opacity": ".12" }), o.appendChild(l);
    }), e.appendChild(o), e;
  }
  createPaperLayer() {
    const e = this.createSvg("g");
    e.setAttribute("class", `${this.artifactId}-paper antique-paper-scene`), e.setAttribute("pointer-events", "none"), e.setAttribute("aria-hidden", "true");
    const t = this.createSvg("rect");
    this.setAttributes(t, { x: "0", y: "0", width: "1000", height: "1000", fill: "#b9864d", opacity: ".105" }), t.style.mixBlendMode = "multiply", e.appendChild(t);
    const i = this.createSvg("rect");
    this.setAttributes(i, { x: "0", y: "0", width: "1000", height: "1000", fill: `url(#${this.artifactId}-floor)`, opacity: ".42" }), i.style.mixBlendMode = "multiply", e.appendChild(i);
    const r = this.createSvg("rect");
    this.setAttributes(r, { x: "0", y: "0", width: "1000", height: "1000", fill: "#6b482d", opacity: ".32", filter: `url(#${this.artifactId}-grain)` }), r.style.mixBlendMode = "multiply", e.appendChild(r);
    const n = this.createSvg("rect");
    return this.setAttributes(n, { x: "0", y: "0", width: "1000", height: "1000", fill: `url(#${this.artifactId}-vignette)`, opacity: ".58" }), e.appendChild(n), e;
  }
  createCompass() {
    const e = this.createSvg("g"), t = Number.isFinite(this.compassRotation) ? this.compassRotation : -7, i = Math.min(1.8, Math.max(0.55, Number.isFinite(this.compassSize) ? this.compassSize : 1));
    e.setAttribute("class", `${this.artifactId}-compass antique-compass`), e.setAttribute("transform", `translate(906 102) rotate(${t}) scale(${i})`), e.setAttribute("pointer-events", "none"), e.setAttribute("aria-hidden", "true");
    const r = this.createSvg("circle");
    this.setAttributes(r, { r: "48", fill: "none", stroke: "#5b3c28", "stroke-width": "2.2", "stroke-opacity": ".62" }), e.appendChild(r);
    const n = this.createSvg("circle");
    this.setAttributes(n, { r: "34", fill: "none", stroke: "#5b3c28", "stroke-width": "1", "stroke-opacity": ".38" }), e.appendChild(n), [[0, -42, 0, 42], [-42, 0, 42, 0]].forEach(([d, p, c, g]) => {
      const u = this.createSvg("line");
      this.setAttributes(u, { x1: String(d), y1: String(p), x2: String(c), y2: String(g), stroke: "#5b3c28", "stroke-width": "1.5", "stroke-opacity": ".54" }), e.appendChild(u);
    });
    const o = this.createSvg("path");
    this.setAttributes(o, { d: "M 0 -42 L 8 -8 L 0 -15 L -8 -8 Z", fill: "#5a3924", "fill-opacity": ".76" }), e.appendChild(o);
    const s = this.createSvg("path");
    this.setAttributes(s, { d: "M 0 42 L 6 9 L 0 15 L -6 9 Z", fill: "#7b5636", "fill-opacity": ".42" }), e.appendChild(s);
    const a = this.createSvg("text");
    this.setAttributes(a, { x: "0", y: "-57", "text-anchor": "middle", fill: "#523522", "font-size": "17", "font-family": "Georgia, Cambria, serif", "font-weight": "700" }), a.textContent = "N", e.appendChild(a);
    const l = this.createSvg("circle");
    return this.setAttributes(l, { r: "3.2", fill: "#5b3c28", "fill-opacity": ".68" }), e.appendChild(l), e.setAttribute("opacity", ".62"), e;
  }
  syncThemeArtifacts() {
    const e = this.renderRoot.querySelector("svg.floorplan"), t = this.renderRoot.querySelector("g.scene");
    if (!e || !t || (this.removeThemeArtifacts(e, t), this.theme !== "enchanted_antique")) return;
    e.insertBefore(this.createThemeDefs(), e.firstChild);
    const i = this.createPaperLayer(), r = t.querySelector(":scope > g.rooms-scene");
    if (t.insertBefore(i, r ?? null), !this.compassVisible) return;
    const n = this.createCompass();
    e.appendChild(n), !(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1) && !this.hasRevealedEnchanted && (this.hasRevealedEnchanted = !0, t.animate([{ opacity: 0.28 }, { opacity: 1 }], { duration: 850, easing: "cubic-bezier(.2,.8,.2,1)" }), n.animate([{ opacity: 0 }, { opacity: 0.62 }], { duration: 1100, delay: 180, fill: "both", easing: "ease-out" }));
  }
};
ge.styles = I`${Qe.styles}:host([map-theme="enchanted_antique"]){--primary-color:#68472f;--primary-text-color:#4c321f;--secondary-text-color:#6f5239;--success-color:#6f6d3c;--error-color:#8b4639;--warning-color:#9a6731;--accent-color:#74513b;--card-background-color:#d9c294;--explorer-room-light-color:#e3a33d;--explorer-room-motion-color:#75573a;--explorer-room-media-color:#71503e;--explorer-room-opening-color:#936031;--explorer-room-panel-background:rgba(218,192,143,.96);--explorer-room-panel-text:#4b311f;--explorer-room-panel-border:rgba(82,50,30,.34);--explorer-room-panel-control:rgba(91,57,34,.12);--explorer-room-panel-row:rgba(255,239,199,.22)}:host([map-theme="enchanted_antique"]) .viewport{background:radial-gradient(circle at 22% 18%,rgba(255,240,195,.42),transparent 28%),radial-gradient(circle at 78% 76%,rgba(91,55,29,.16),transparent 42%),#c4a26e;box-shadow:inset 0 0 34px rgba(64,40,25,.22),inset 0 0 110px rgba(82,50,26,.12)}:host([map-theme="enchanted_antique"]) .viewport::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:2;background:radial-gradient(circle at 18% 24%,rgba(255,226,151,.13),transparent 22%),radial-gradient(circle at 76% 68%,rgba(255,210,112,.08),transparent 28%);mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .viewport::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:3;box-shadow:inset 0 0 44px rgba(60,38,24,.21)}:host([map-theme="enchanted_antique"]) .backdrop{fill:#caa970}:host([map-theme="enchanted_antique"]) .floorplan-source{filter:sepia(.92) saturate(.58) contrast(1.13) brightness(.92) drop-shadow(0 2px 1px rgba(58,35,20,.18)) drop-shadow(2px 3px 3px rgba(56,34,20,.10));opacity:.89;mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .rooms-scene{filter:drop-shadow(2px 3px 2px rgba(58,36,22,.16))}:host([map-theme="enchanted_antique"]) .room polygon{fill:#795132!important;fill-opacity:.085!important;stroke:#4f321f!important;stroke-opacity:.88!important;stroke-width:2.8px!important;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(2px 3px 1.5px rgba(67,41,24,.13));transition:fill-opacity .24s ease,stroke-width .24s ease,filter .24s ease}:host([map-theme="enchanted_antique"]) .room:hover polygon{fill-opacity:.14!important;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(3px 4px 2px rgba(67,41,24,.17))}:host([map-theme="enchanted_antique"]) .room.selected polygon{fill-opacity:.19!important;stroke-width:4px!important;filter:drop-shadow(0 1px .6px rgba(69,42,24,.38)) drop-shadow(4px 5px 3px rgba(67,41,24,.18))}:host([map-theme="enchanted_antique"]) .room-label,:host([map-theme="enchanted_antique"]) .presence-label,:host([map-theme="enchanted_antique"]) .route-status-scene text{fill:#4e321e!important;stroke:rgba(222,199,151,.82)!important;stroke-width:3.5px!important;font-family:Georgia,Cambria,"Times New Roman",serif!important;letter-spacing:.045em}:host([map-theme="enchanted_antique"]) .room-label{font-style:italic;font-weight:700;filter:drop-shadow(1px 1px .35px rgba(73,44,25,.18))}:host([map-theme="enchanted_antique"]) .presence-label{font-weight:700;font-variant:small-caps}:host([map-theme="enchanted_antique"]) .presence-border{stroke:#ead8aa!important;filter:drop-shadow(0 2px 3px rgba(54,34,21,.35))}:host([map-theme="enchanted_antique"]) .presence-avatar-background,:host([map-theme="enchanted_antique"]) .presence-marker{fill:#76543a!important}:host([map-theme="enchanted_antique"]) .footsteps-scene ellipse{fill:#4b301d!important;filter:drop-shadow(0 0 1.3px rgba(66,38,20,.38))}:host([map-theme="enchanted_antique"]) .route-status-scene line{filter:drop-shadow(0 .6px .6px rgba(65,39,23,.28))}:host([map-theme="enchanted_antique"]) .room-reactions-scene polygon{mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .room-reactions-scene [data-reaction-kind="light"],:host([map-theme="enchanted_antique"]) .room-reactions-scene .light{filter:drop-shadow(0 0 5px rgba(238,177,63,.72)) drop-shadow(0 0 14px rgba(238,158,42,.34));mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .antique-paper-scene,:host([map-theme="enchanted_antique"]) .antique-compass{pointer-events:none}@media(prefers-reduced-motion:reduce){:host([map-theme="enchanted_antique"]) .room polygon,:host([map-theme="enchanted_antique"]) .floorplan-source{transition:none!important}}`;
ot([
  A({ attribute: "map-theme", reflect: !0 })
], ge.prototype, "theme", 2);
ot([
  A({ type: Number, attribute: "compass-rotation" })
], ge.prototype, "compassRotation", 2);
ot([
  A({ type: Number, attribute: "compass-size" })
], ge.prototype, "compassSize", 2);
ot([
  A({ type: Boolean, attribute: "compass-visible" })
], ge.prototype, "compassVisible", 2);
ge = ot([
  R("explorer-themed-canvas")
], ge);
const zn = ["on"], In = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function Tn(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : [...zn];
}
function dr(e, t) {
  const i = e.visible !== !1, r = e.state_binding, n = Tn(r?.active_states);
  if (!i)
    return {
      zone: e,
      visible: !1,
      conditional: !!r?.entity?.trim(),
      active: !1,
      entity: r?.entity?.trim() || void 0,
      activeStates: n,
      reason: "hidden"
    };
  if (!r?.entity?.trim())
    return {
      zone: e,
      visible: !0,
      conditional: !1,
      active: !0,
      activeStates: n
    };
  const o = r.entity.trim(), s = t?.(o);
  if (!s)
    return {
      zone: e,
      visible: !0,
      conditional: !0,
      active: !1,
      entity: o,
      activeStates: n,
      reason: "missing_entity"
    };
  if (In.has(s))
    return {
      zone: e,
      visible: !0,
      conditional: !0,
      active: !1,
      entity: o,
      currentState: s,
      activeStates: n,
      reason: "entity_unavailable"
    };
  const a = n.includes(s);
  return {
    zone: e,
    visible: !0,
    conditional: !0,
    active: a,
    entity: o,
    currentState: s,
    activeStates: n,
    ...a ? {} : { reason: "state_blocked" }
  };
}
function On(e, t) {
  return e.map((i) => dr(i, t));
}
var jn = Object.defineProperty, Dn = Object.getOwnPropertyDescriptor, cr = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Dn(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && jn(t, i, n), n;
};
const de = "http://www.w3.org/2000/svg", Ln = {
  info: "var(--explorer-zone-info, #2d8f74)",
  warning: "var(--explorer-zone-warning, #f59e0b)",
  danger: "var(--explorer-zone-danger, #d64545)",
  cleaning: "var(--explorer-zone-cleaning, #3b82c4)",
  restricted: "var(--explorer-zone-restricted, #8b5a9e)"
}, Bn = {
  info: "i",
  warning: "!",
  danger: "!",
  cleaning: "✦",
  restricted: "×"
};
let Le = class extends ge {
  constructor() {
    super(...arguments), this.zones = [];
  }
  updated(e) {
    super.updated(e), (e.has("zones") || e.has("hass") || e.has("theme") || e.has("rooms")) && this.syncZonesOverlay();
  }
  zonePolygonPoints(e) {
    return e.map(([t, i]) => `${t * v},${i * v}`).join(" ");
  }
  zoneCenter(e) {
    return e.label ? { x: e.label.x * v, y: e.label.y * v } : e.points.length ? {
      x: e.points.reduce((t, i) => t + i[0], 0) / e.points.length * v,
      y: e.points.reduce((t, i) => t + i[1], 0) / e.points.length * v
    } : { x: v / 2, y: v / 2 };
  }
  zoneColor(e) {
    return e.color?.trim() || Ln[e.kind ?? "info"];
  }
  appendZoneTitle(e, t) {
    const i = document.createElementNS(de, "title"), r = t.zone, n = t.entity ? ` · ${t.entity}: ${t.currentState ?? "ukendt"} · aktiv: ${t.activeStates.join(", ")}` : " · altid aktiv";
    i.textContent = `${r.name ?? r.id}${n}`, e.appendChild(i);
  }
  appendZoneAccent(e, t, i, r) {
    if (i !== "cleaning" && i !== "restricted") return;
    const n = document.createElementNS(de, "polygon");
    n.setAttribute("points", this.zonePolygonPoints(t.points)), n.setAttribute("class", `zone-accent zone-accent-${i}`), n.setAttribute("fill", "none"), n.setAttribute("stroke", r), n.setAttribute("vector-effect", "non-scaling-stroke"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("pointer-events", "none"), i === "cleaning" ? (n.setAttribute("stroke-width", "8"), n.setAttribute("stroke-opacity", ".30"), n.setAttribute("stroke-dasharray", "3 15")) : (n.setAttribute("stroke-width", "9"), n.setAttribute("stroke-opacity", ".20"), n.setAttribute("stroke-dasharray", "2 11")), e.appendChild(n);
  }
  renderZone(e, t, i) {
    const r = t.zone;
    if (!t.active || r.points.length < 3) return;
    const n = r.kind ?? "info", o = this.zoneColor(r), s = document.createElementNS(de, "g");
    s.setAttribute("class", `dynamic-zone zone-${n} zone-${r.id}${i ? " reduced-motion" : ""}`), s.setAttribute("pointer-events", "none");
    const a = document.createElementNS(de, "polygon");
    a.setAttribute("class", "zone-shape"), a.setAttribute("points", this.zonePolygonPoints(r.points)), a.setAttribute("fill", o), a.setAttribute("fill-opacity", n === "danger" || n === "restricted" ? ".18" : ".13"), a.setAttribute("stroke", o), a.setAttribute("stroke-width", n === "danger" ? "5" : "4"), a.setAttribute("stroke-opacity", ".88"), a.setAttribute("stroke-linejoin", "round"), a.setAttribute("vector-effect", "non-scaling-stroke"), n === "warning" && a.setAttribute("stroke-dasharray", "16 9"), n === "restricted" && a.setAttribute("stroke-dasharray", "7 7"), n === "cleaning" && a.setAttribute("stroke-dasharray", "4 8"), s.appendChild(a), this.appendZoneAccent(s, r, n, o);
    const l = this.zoneCenter(r), d = document.createElementNS(de, "g");
    d.setAttribute("transform", `translate(${l.x} ${l.y})`), d.setAttribute("class", "zone-marker");
    const p = document.createElementNS(de, "circle");
    p.setAttribute("class", "zone-marker-bg"), p.setAttribute("r", "17"), p.setAttribute("fill", "var(--card-background-color, #ffffff)"), p.setAttribute("fill-opacity", ".90"), p.setAttribute("stroke", o), p.setAttribute("stroke-width", "3"), p.setAttribute("vector-effect", "non-scaling-stroke"), d.appendChild(p);
    const c = document.createElementNS(de, "text");
    if (c.setAttribute("text-anchor", "middle"), c.setAttribute("dominant-baseline", "central"), c.setAttribute("fill", o), c.setAttribute("font-size", "18"), c.setAttribute("font-weight", "900"), c.setAttribute("font-family", "system-ui, sans-serif"), c.textContent = Bn[n], d.appendChild(c), s.appendChild(d), r.name) {
      const g = document.createElementNS(de, "text");
      g.setAttribute("x", String(l.x)), g.setAttribute("y", String(l.y + 36)), g.setAttribute("text-anchor", "middle"), g.setAttribute("class", "zone-label"), g.setAttribute("fill", o), g.setAttribute("font-size", "22"), g.setAttribute("font-weight", "800"), g.setAttribute("font-family", "system-ui, sans-serif"), g.setAttribute("paint-order", "stroke"), g.setAttribute("stroke", "var(--card-background-color, #ffffff)"), g.setAttribute("stroke-width", "5"), g.setAttribute("stroke-linejoin", "round"), g.textContent = r.name, s.appendChild(g);
    }
    this.appendZoneTitle(s, t), e.appendChild(s);
  }
  syncZonesOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e || (e.querySelector(":scope > g.zones-scene")?.remove(), !this.zones.length)) return;
    const i = On(this.zones, (d) => this.hass?.states[d]?.state).filter((d) => d.active && d.zone.points.length >= 3);
    if (!i.length) return;
    const r = document.createElementNS(de, "g");
    r.setAttribute("class", "zones-scene"), r.setAttribute("aria-label", "Dynamiske zoner"), r.setAttribute("pointer-events", "none");
    const n = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    i.forEach((d) => this.renderZone(r, d, n));
    const o = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.route-status-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, o ?? s ?? a ?? l ?? null);
  }
};
Le.styles = I`
    ${ge.styles}

    :host {
      --explorer-zone-info: #2d8f74;
      --explorer-zone-warning: #f59e0b;
      --explorer-zone-danger: #d64545;
      --explorer-zone-cleaning: #3b82c4;
      --explorer-zone-restricted: #8b5a9e;
    }

    .zone-warning:not(.reduced-motion) .zone-shape {
      transform-box: fill-box;
      transform-origin: center;
      animation: zoneWarningPulse 2.8s ease-in-out infinite;
    }

    .zone-danger:not(.reduced-motion) .zone-shape,
    .zone-danger:not(.reduced-motion) .zone-marker-bg {
      animation: zoneDangerPulse 1.85s ease-in-out infinite;
    }

    .zone-cleaning:not(.reduced-motion) .zone-shape,
    .zone-cleaning:not(.reduced-motion) .zone-accent-cleaning {
      animation: zoneCleaningSweep 2.2s linear infinite;
    }

    .zone-restricted .zone-shape {
      filter: drop-shadow(0 0 2px color-mix(in srgb, currentColor 30%, transparent));
    }

    .zone-restricted:not(.reduced-motion) .zone-accent-restricted {
      animation: zoneRestrictedRunes 4.6s linear infinite;
    }

    @keyframes zoneWarningPulse {
      0%, 100% { fill-opacity: .10; stroke-opacity: .62; }
      50% { fill-opacity: .18; stroke-opacity: .98; }
    }

    @keyframes zoneDangerPulse {
      0%, 100% { fill-opacity: .13; stroke-opacity: .66; }
      45% { fill-opacity: .28; stroke-opacity: 1; }
      58% { fill-opacity: .18; stroke-opacity: .86; }
    }

    @keyframes zoneCleaningSweep {
      from { stroke-dashoffset: 0; }
      to { stroke-dashoffset: -48; }
    }

    @keyframes zoneRestrictedRunes {
      from { stroke-dashoffset: 0; }
      to { stroke-dashoffset: 52; }
    }

    :host([map-theme="enchanted_antique"]) {
      --explorer-zone-info: #65704b;
      --explorer-zone-warning: #9b6a31;
      --explorer-zone-danger: #8a4438;
      --explorer-zone-cleaning: #5e6f73;
      --explorer-zone-restricted: #6f4f58;
    }

    :host([map-theme="enchanted_antique"]) .zones-scene polygon {
      mix-blend-mode: multiply;
      filter: sepia(.18) drop-shadow(0 .7px .7px rgba(67, 40, 22, .24));
    }

    :host([map-theme="enchanted_antique"]) .zone-danger .zone-shape {
      filter: sepia(.22) drop-shadow(0 0 3px rgba(100, 40, 27, .30));
    }

    :host([map-theme="enchanted_antique"]) .zone-cleaning .zone-accent,
    :host([map-theme="enchanted_antique"]) .zone-restricted .zone-accent {
      opacity: .78;
    }

    :host([map-theme="enchanted_antique"]) .zone-label,
    :host([map-theme="enchanted_antique"]) .zone-marker text {
      font-family: Georgia, Cambria, "Times New Roman", serif !important;
      letter-spacing: .035em;
    }

    @media (prefers-reduced-motion: reduce) {
      .zones-scene .zone-shape,
      .zones-scene .zone-accent,
      .zones-scene .zone-marker-bg {
        animation: none !important;
      }
    }
  `;
cr([
  A({ attribute: !1 })
], Le.prototype, "zones", 2);
Le = cr([
  R("explorer-zones-canvas")
], Le);
var qn = Object.getOwnPropertyDescriptor, Fn = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? qn(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(n) || n);
  return n;
};
const Vn = "http://www.w3.org/2000/svg", Hn = 4200, Kn = 900, Gn = 54, Zn = { person: "Person", pet: "Kæledyr", robot: "Robot", vehicle: "Køretøj", object: "Objekt" }, Ii = { person: [202, 344, 42, 158, 274, 18], pet: [28, 112, 326, 52, 178, 286], robot: [188, 218, 264, 164, 204, 238], vehicle: [12, 210, 38, 330, 186, 262], object: [272, 44, 154, 320, 196, 22] }, Nt = [58, 64, 54, 61, 56, 66], Un = [8, 6, 10, 7, 9, 5], Wn = [7, 4, 10, 6, 8, 3];
function Ti(e) {
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function Rt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let Je = class extends Le {
  constructor() {
    super(...arguments), this.polishPreviousPositions = /* @__PURE__ */ new Map(), this.polishPreviousRooms = /* @__PURE__ */ new Map();
  }
  updated(e) {
    super.updated(e), (e.has("presences") || e.has("theme")) && this.polishSyncPresenceVisuals(), e.has("presences") && this.polishSyncTrails();
  }
  polishPresenceColor(e) {
    const t = e.color?.trim();
    if (t) return t;
    const i = e.type ?? "person", r = Ii[i][Ti(e.id) % Ii[i].length];
    return this.theme === "enchanted_antique" ? `hsl(${r} 34% 38%)` : `hsl(${r} 62% 47%)`;
  }
  polishTrailColor(e) {
    return e.trail_color?.trim() || this.polishPresenceColor(e);
  }
  polishTrailDuration(e) {
    const t = e.trail_duration;
    return Number.isFinite(t) ? Math.round(Rt(t, 1, 60) * 1e3) : Hn;
  }
  polishBasePosition(e) {
    return { x: (e.x ?? 0.5) * v, y: (e.y ?? 0.5) * v };
  }
  polishPersonTrailVariant(e) {
    return Ti(e.id) % Nt.length;
  }
  polishOffsets(e) {
    const t = /* @__PURE__ */ new Map();
    e.forEach((n) => t.set(n.id, { x: 0, y: 0, groupSize: 1 }));
    const i = new Set(e.map((n) => n.id)), r = new Map(e.map((n) => [n.id, n]));
    for (; i.size; ) {
      const n = i.values().next().value, o = r.get(n);
      if (i.delete(n), !o) continue;
      const s = [o], a = [o];
      for (; a.length; ) {
        const p = a.shift(), c = this.polishBasePosition(p);
        for (const g of [...i]) {
          const u = r.get(g);
          if (!u) continue;
          const y = this.polishBasePosition(u);
          Math.hypot(c.x - y.x, c.y - y.y) <= Gn && (i.delete(g), s.push(u), a.push(u));
        }
      }
      if (s.length < 2) continue;
      const l = [...s].sort((p, c) => p.id.localeCompare(c.id)), d = Math.min(52, 24 + l.length * 4);
      l.forEach((p, c) => {
        const g = this.polishBasePosition(p), u = l.length === 2 ? c === 0 ? Math.PI : 0 : -Math.PI / 2 + Math.PI * 2 * c / l.length, y = Rt(g.x + Math.cos(u) * d, 38, v - 38), m = Rt(g.y + Math.sin(u) * d, 38, v - 64);
        t.set(p.id, { x: y - g.x, y: m - g.y, groupSize: l.length });
      });
    }
    return t;
  }
  polishCreateSvg(e) {
    return document.createElementNS(Vn, e);
  }
  polishSetAttributes(e, t) {
    Object.entries(t).forEach(([i, r]) => e.setAttribute(i, r));
  }
  polishAppendTypeBadge(e, t, i) {
    if (e.querySelector(":scope > g.presence-type-badge")) return;
    const r = t.type ?? "person", n = this.polishCreateSvg("g");
    n.setAttribute("class", `presence-type-badge badge-${r}`), n.setAttribute("transform", "translate(21 -21)"), n.setAttribute("pointer-events", "none");
    const o = this.polishCreateSvg("circle");
    if (this.polishSetAttributes(o, { r: "9.5", fill: "var(--card-background-color, #ffffff)", "fill-opacity": ".94", stroke: i, "stroke-width": "2.5", "vector-effect": "non-scaling-stroke" }), n.appendChild(o), r === "person") {
      const s = this.polishCreateSvg("circle");
      this.polishSetAttributes(s, { cx: "0", cy: "-2.8", r: "2.5", fill: i });
      const a = this.polishCreateSvg("path");
      this.polishSetAttributes(a, { d: "M -4 5 Q -3 0 0 0 Q 3 0 4 5 Z", fill: i }), n.append(s, a);
    } else if (r === "pet") {
      const s = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(s, { cx: "0", cy: "2", rx: "3.4", ry: "3", fill: i }), n.appendChild(s), [[-4, -2], [-1.5, -4.6], [1.5, -4.6], [4, -2]].forEach(([a, l]) => {
        const d = this.polishCreateSvg("circle");
        this.polishSetAttributes(d, { cx: String(a), cy: String(l), r: "1.5", fill: i }), n.appendChild(d);
      });
    } else if (r === "robot") {
      const s = this.polishCreateSvg("rect");
      this.polishSetAttributes(s, { x: "-5", y: "-4", width: "10", height: "8", rx: "2", fill: i }), n.appendChild(s), [-2.2, 2.2].forEach((a) => {
        const l = this.polishCreateSvg("circle");
        this.polishSetAttributes(l, { cx: String(a), cy: "-1", r: "1", fill: "var(--card-background-color, #ffffff)" }), n.appendChild(l);
      });
    } else if (r === "vehicle") {
      const s = this.polishCreateSvg("rect");
      this.polishSetAttributes(s, { x: "-5.5", y: "-2.5", width: "11", height: "5", rx: "1.5", fill: i }), n.appendChild(s);
    } else {
      const s = this.polishCreateSvg("path");
      this.polishSetAttributes(s, { d: "M 0 -6 L 5 0 L 0 6 L -5 0 Z", fill: i }), n.appendChild(s);
    }
    e.appendChild(n);
  }
  polishSyncPresenceVisuals() {
    const e = this.presences.filter((r) => r.visible !== !1), t = Array.from(this.renderRoot.querySelectorAll("g.presence")), i = this.polishOffsets(e);
    e.forEach((r, n) => {
      const o = t[n];
      if (!o) return;
      const s = r.type ?? "person", a = this.polishPresenceColor(r), l = i.get(r.id) ?? { x: 0, y: 0, groupSize: 1 };
      o.setAttribute("data-presence-id", r.id), o.setAttribute("data-presence-type", s), s === "person" && o.setAttribute("data-trail-style", String(this.polishPersonTrailVariant(r) + 1)), o.classList.add("presence-polished", `presence-${s}`);
      let d = o.querySelector(":scope > g.presence-visual-offset");
      d || (d = this.polishCreateSvg("g"), d.setAttribute("class", "presence-visual-offset"), Array.from(o.children).filter((u) => u.localName.toLowerCase() !== "animatetransform").forEach((u) => d?.appendChild(u)), o.insertBefore(d, o.firstChild)), d.setAttribute("transform", `translate(${l.x} ${l.y})`), d.querySelector(".presence-marker")?.setAttribute("fill", a), d.querySelector(".presence-avatar-background")?.setAttribute("fill", a), d.querySelector(".presence-border")?.setAttribute("stroke", a), this.polishAppendTypeBadge(d, r, a), o.querySelector(":scope > title")?.remove();
      const p = this.polishCreateSvg("title"), c = l.groupSize > 1 ? ` · ${l.groupSize} markører overlapper` : "", g = s === "person" ? ` · fodspor ${this.polishPersonTrailVariant(r) + 1}` : "";
      p.textContent = `${r.name ?? r.id} · ${Zn[s]}${g}${c}`, o.appendChild(p);
    });
  }
  polishRouteConfig() {
    return { type: "custom:ha-explorer-card", rooms: this.rooms, route_nodes: this.routeNodes, route_graph_edges: this.routeGraphEdges, routes: this.routes };
  }
  polishMovementPath(e, t, i, r) {
    if (!i || !r || i === r) return [e, t];
    const n = ri(this.polishRouteConfig(), i, r, (o) => this.hass?.states[o]?.state);
    return n ? [e, ...n.hops.slice(1, -1).map((o) => ({ x: o.point[0] * v, y: o.point[1] * v })), t] : [e, t];
  }
  polishEnsureTrailLayer() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    let t = e.querySelector(":scope > g.presence-trails-scene");
    return t || (t = this.polishCreateSvg("g"), t.setAttribute("class", "presence-trails-scene"), t.setAttribute("aria-label", "Person- og objektspor"), t.setAttribute("pointer-events", "none"), e.insertBefore(t, e.querySelector(":scope > g.presences-scene") ?? null), t);
  }
  polishTrailSpacing(e, t = 0) {
    return e === "person" ? Nt[t] ?? Nt[0] : e === "pet" ? 46 : e === "robot" ? 42 : e === "vehicle" ? 54 : e === "object" ? 62 : 58;
  }
  polishAppendPersonTrailShape(e, t, i) {
    const r = (o, s, a, l) => {
      const d = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(d, { cx: String(o), cy: String(s), rx: String(a), ry: String(l), fill: t }), e.appendChild(d);
    };
    if (i === 0) {
      r(0, -5, 5.5, 11), r(0, 8, 4, 5);
      return;
    }
    if (i === 1) {
      r(0, -4, 4.2, 12), r(0, 9, 3.2, 4.5);
      return;
    }
    if (i === 2) {
      r(0, -5, 6.5, 9.5);
      const o = this.polishCreateSvg("rect");
      this.polishSetAttributes(o, { x: "-5", y: "3", width: "10", height: "10", rx: "2", fill: t }), e.appendChild(o);
      return;
    }
    if (i === 3) {
      const o = this.polishCreateSvg("path");
      this.polishSetAttributes(o, { d: "M 0 -16 C 6 -10 7 -2 5 5 C 4 10 2 12 0 12 C -3 12 -5 9 -5 4 C -6 -3 -5 -10 0 -16 Z", fill: t }), e.appendChild(o), r(-0.5, 9, 3.3, 4.2);
      return;
    }
    if (i === 4) {
      r(0, -9, 5.5, 6.5);
      const o = this.polishCreateSvg("rect");
      this.polishSetAttributes(o, { x: "-4", y: "-2", width: "8", height: "7", rx: "3", fill: t }), e.appendChild(o), r(0, 9, 3.8, 4.5);
      return;
    }
    const n = this.polishCreateSvg("path");
    this.polishSetAttributes(n, { d: "M -6 -10 C -2 -15 5 -14 7 -8 C 9 -2 6 5 3 9 C 0 13 -4 12 -5 7 C -6 2 -8 -5 -6 -10 Z", fill: t }), e.appendChild(n), r(-1, 9, 3.2, 4.1);
  }
  polishAppendTrailShape(e, t, i, r = 0) {
    if (t === "person") {
      this.polishAppendPersonTrailShape(e, i, r);
      return;
    }
    if (t === "pet") {
      const o = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(o, { cx: "0", cy: "2", rx: "5", ry: "6", fill: i }), e.appendChild(o);
      return;
    }
    if (t === "robot") {
      [-7, 3].forEach((o) => {
        const s = this.polishCreateSvg("rect");
        this.polishSetAttributes(s, { x: String(o), y: "-8", width: "4", height: "16", rx: "1.4", fill: i }), e.appendChild(s);
      });
      return;
    }
    if (t === "vehicle") {
      [-7, 4].forEach((o) => {
        const s = this.polishCreateSvg("rect");
        this.polishSetAttributes(s, { x: String(o), y: "-11", width: "3", height: "22", rx: "1", fill: i }), e.appendChild(s);
      });
      return;
    }
    const n = this.polishCreateSvg("path");
    this.polishSetAttributes(n, { d: "M 0 -7 L 6 0 L 0 7 L -6 0 Z", fill: i }), e.appendChild(n);
  }
  polishCreateTrail(e, t) {
    if (t.trail_visible === !1) return;
    const i = this.polishEnsureTrailLayer();
    if (!i || e.length < 2) return;
    const r = t.type ?? "person", n = r === "person" ? this.polishPersonTrailVariant(t) : 0, o = this.polishTrailColor(t), s = this.polishTrailDuration(t), a = e.slice(1).map((c, g) => {
      const u = e[g];
      return { start: u, end: c, length: Math.hypot(c.x - u.x, c.y - u.y) };
    }), l = a.reduce((c, g) => c + g.length, 0), d = this.polishTrailSpacing(r, n);
    if (l < d) return;
    const p = Math.min(24, Math.max(3, Math.floor(l / d)));
    for (let c = 0; c < p; c += 1) {
      const g = (c + 1) / (p + 1), u = l * g;
      let y = 0, m = a[a.length - 1];
      for (const le of a) {
        if (y + le.length >= u) {
          m = le;
          break;
        }
        y += le.length;
      }
      const $ = m.length > 0 ? (u - y) / m.length : 0, w = m.end.x - m.start.x, _ = m.end.y - m.start.y, k = c % 2 === 0 ? -1 : 1, E = r === "person" ? Un[n] ?? 8 : r === "pet" ? 6 : 0, M = r === "person" ? Wn[n] ?? 7 : E ? 7 : 0, x = m.length > 0 ? -_ / m.length : 0, S = m.length > 0 ? w / m.length : 0, N = m.start.x + w * $ + x * E * k, z = m.start.y + _ * $ + S * E * k, X = Math.atan2(_, w) * 180 / Math.PI + 90, Q = Math.round(g * Kn), P = this.polishCreateSvg("g");
      P.setAttribute("class", `trail-mark trail-${r}${r === "person" ? ` trail-person-v${n + 1}` : ""}`), P.setAttribute("data-presence-id", t.id), r === "person" && P.setAttribute("data-trail-style", String(n + 1)), P.setAttribute("transform", `translate(${N} ${z}) rotate(${X + (E ? k * M : 0)})`), P.setAttribute("opacity", "0"), this.polishAppendTrailShape(P, r, o, n);
      const fe = this.polishCreateSvg("animate");
      this.polishSetAttributes(fe, { attributeName: "opacity", values: "0;0.78;0.54;0", keyTimes: "0;0.08;0.58;1", begin: "indefinite", dur: `${s}ms`, fill: "freeze" }), P.appendChild(fe), i.appendChild(P), window.setTimeout(() => {
        P.isConnected && fe.beginElement();
      }, Q), window.setTimeout(() => P.remove(), Q + s + 120);
    }
  }
  polishSyncTrails() {
    const e = this.presences.filter((r) => r.visible !== !1), t = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, i = /* @__PURE__ */ new Set();
    e.forEach((r) => {
      const n = this.polishBasePosition(r), o = this.polishPreviousPositions.get(r.id), s = this.polishPreviousRooms.get(r.id), a = r.room_id;
      i.add(r.id), !t && o && (Math.abs(o.x - n.x) > 0.01 || Math.abs(o.y - n.y) > 0.01) && this.polishCreateTrail(this.polishMovementPath(o, n, s, a), r), this.polishPreviousPositions.set(r.id, n), this.polishPreviousRooms.set(r.id, a);
    });
    for (const r of this.polishPreviousPositions.keys()) i.has(r) || (this.polishPreviousPositions.delete(r), this.polishPreviousRooms.delete(r));
  }
};
Je.styles = I`${Le.styles}.footsteps-scene{display:none}.presence-visual-offset{transition:transform 220ms ease}.presence-type-badge{filter:drop-shadow(0 1px 2px rgba(0,0,0,.22))}.presence-trails-scene .trail-mark{filter:drop-shadow(0 0 1.2px rgba(0,0,0,.20))}.presence-trails-scene .trail-person-v2{opacity:.96}.presence-trails-scene .trail-person-v3{filter:drop-shadow(0 0 1.6px rgba(0,0,0,.24))}.presence-trails-scene .trail-person-v5{filter:drop-shadow(0 0 .8px rgba(0,0,0,.18))}:host([map-theme="enchanted_antique"]) .presence-type-badge{filter:sepia(.35) drop-shadow(0 1px 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-trails-scene .trail-mark{mix-blend-mode:multiply;filter:sepia(.28) saturate(.78) drop-shadow(0 0 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-border{stroke-width:4.5px!important}@media(prefers-reduced-motion:reduce){.presence-visual-offset{transition:none}}`;
Je = Fn([
  R("explorer-presence-polish-canvas")
], Je);
var Yn = Object.getOwnPropertyDescriptor, Xn = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Yn(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(n) || n);
  return n;
};
const lt = "http://www.w3.org/2000/svg", Oi = 3e4, Qn = 900;
let et = class extends Je {
  constructor() {
    super(...arguments), this.magicPreviousOccupiedRooms = /* @__PURE__ */ new Set(), this.magicAfterglowStartedAt = /* @__PURE__ */ new Map();
  }
  updated(e) {
    super.updated(e), (e.has("presences") || e.has("rooms") || e.has("theme")) && this.magicSyncRoomAtmosphere();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.magicRefreshTimer !== void 0 && window.clearTimeout(this.magicRefreshTimer);
  }
  magicPointInPolygon(e, t) {
    if (t.length < 3) return !1;
    const [i, r] = e;
    let n = !1;
    for (let o = 0, s = t.length - 1; o < t.length; s = o++) {
      const [a, l] = t[o], [d, p] = t[s];
      l > r != p > r && i < (d - a) * (r - l) / (p - l || Number.EPSILON) + a && (n = !n);
    }
    return n;
  }
  magicRoomForPresence(e) {
    if (e.room_id) {
      const i = this.rooms.find(
        (r) => r.id === e.room_id || r.area_id === e.room_id
      );
      if (i) return i;
    }
    if (e.x === void 0 || e.y === void 0) return;
    const t = [e.x, e.y];
    return this.rooms.find((i) => this.magicPointInPolygon(t, i.points));
  }
  magicActivities(e) {
    const t = /* @__PURE__ */ new Map();
    this.presences.filter((r) => r.visible !== !1 && (r.type ?? "person") === "person").forEach((r) => {
      const n = this.magicRoomForPresence(r);
      n && t.set(n.id, (t.get(n.id) ?? 0) + 1);
    });
    const i = new Set(t.keys());
    for (const r of this.magicPreviousOccupiedRooms)
      i.has(r) || this.magicAfterglowStartedAt.set(r, e);
    for (const r of i) this.magicAfterglowStartedAt.delete(r);
    return this.magicPreviousOccupiedRooms.clear(), i.forEach((r) => this.magicPreviousOccupiedRooms.add(r)), this.rooms.map((r) => {
      const n = t.get(r.id) ?? 0, o = n > 0, s = this.magicAfterglowStartedAt.get(r.id), a = s === void 0 ? 1 / 0 : e - s, l = !o && a >= 0 && a < Oi, d = o ? Math.min(1, 0.72 + Math.max(0, n - 1) * 0.12) : l ? Math.max(0, 1 - a / Oi) : 0;
      return !l && s !== void 0 && this.magicAfterglowStartedAt.delete(r.id), { room: r, active: o, afterglow: l, intensity: d };
    }).filter((r) => r.active || r.afterglow);
  }
  magicPolygonPoints(e) {
    return e.points.map(([t, i]) => `${t * v},${i * v}`).join(" ");
  }
  magicScheduleRefresh(e) {
    this.magicRefreshTimer !== void 0 && window.clearTimeout(this.magicRefreshTimer), e.some((t) => t.afterglow) && (this.magicRefreshTimer = window.setTimeout(() => {
      this.magicRefreshTimer = void 0, this.magicSyncRoomAtmosphere();
    }, Qn));
  }
  magicAppendRoom(e, t) {
    const { room: i, active: r, intensity: n } = t;
    if (i.points.length < 3) return;
    const o = this.magicPolygonPoints(i), s = document.createElementNS(lt, "g");
    s.setAttribute("class", `room-magic ${r ? "active" : "afterglow"}`), s.setAttribute("data-room-id", i.id);
    const a = document.createElementNS(lt, "polygon");
    a.setAttribute("class", "room-magic-aura"), a.setAttribute("points", o), a.setAttribute("fill", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))"), a.setAttribute("fill-opacity", String(r ? 0.028 + n * 0.026 : 8e-3 + n * 0.028)), a.setAttribute("stroke", "none"), s.appendChild(a);
    const l = document.createElementNS(lt, "polygon");
    l.setAttribute("class", "room-magic-edge"), l.setAttribute("points", o), l.setAttribute("fill", "none"), l.setAttribute("stroke", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))"), l.setAttribute("stroke-opacity", String(r ? 0.08 + n * 0.055 : 0.02 + n * 0.07)), l.setAttribute("stroke-width", r ? "4" : "3"), l.setAttribute("stroke-linejoin", "round"), l.setAttribute("vector-effect", "non-scaling-stroke"), s.appendChild(l), e.appendChild(s);
  }
  magicSyncRoomAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-magic-scene")?.remove();
    const t = this.magicActivities(Date.now());
    if (this.magicScheduleRefresh(t), !t.length) return;
    const i = document.createElementNS(lt, "g");
    i.setAttribute("class", "room-magic-scene"), i.setAttribute("aria-label", "Magisk rumaktivitet"), i.setAttribute("pointer-events", "none"), t.forEach((d) => this.magicAppendRoom(i, d));
    const r = e.querySelector(":scope > g.room-temperature-atmosphere-scene"), n = e.querySelector(":scope > g.presence-room-activity-scene"), o = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.presence-trails-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(
      i,
      r ?? n ?? o ?? s ?? a ?? l ?? null
    );
  }
};
et.styles = I`
    ${Je.styles}

    :host {
      --explorer-room-magic-color: var(--primary-color, #03a9f4);
    }

    .room-magic-scene .room-magic-aura,
    .room-magic-scene .room-magic-edge {
      transform-box: fill-box;
      transform-origin: center;
      will-change: opacity, filter;
    }

    .room-magic-scene .room-magic-aura {
      filter: blur(4px);
    }

    .room-magic-scene .room-magic-edge {
      filter: blur(2.6px);
    }

    .room-magic-scene .room-magic.active .room-magic-aura {
      animation: explorerRoomMagicAura 6.4s ease-in-out infinite;
    }

    .room-magic-scene .room-magic.active .room-magic-edge {
      animation: explorerRoomMagicEdge 6.4s ease-in-out infinite reverse;
    }

    .room-magic-scene .room-magic.afterglow {
      transition: opacity .9s linear;
    }

    :host([map-theme="enchanted_antique"]) {
      --explorer-room-magic-color: #c49355;
    }

    :host([map-theme="enchanted_antique"]) .room-magic-scene .room-magic-aura {
      mix-blend-mode: soft-light;
      filter: sepia(.18) saturate(.72) blur(5px);
    }

    :host([map-theme="enchanted_antique"]) .room-magic-scene .room-magic-edge {
      mix-blend-mode: soft-light;
      filter: sepia(.22) saturate(.68) blur(3.2px);
    }

    @keyframes explorerRoomMagicAura {
      0%, 100% { opacity: .58; filter: blur(4px) brightness(.98); }
      48% { opacity: 1; filter: blur(6px) brightness(1.08); }
    }

    @keyframes explorerRoomMagicEdge {
      0%, 100% { opacity: .52; }
      52% { opacity: .96; }
    }

    @media (prefers-reduced-motion: reduce) {
      .room-magic-scene .room-magic.active .room-magic-aura,
      .room-magic-scene .room-magic.active .room-magic-edge {
        animation: none;
      }
      .room-magic-scene .room-magic.afterglow {
        transition: none;
      }
    }
  `;
et = Xn([
  R("explorer-room-magic-canvas")
], et);
var Jn = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, pr = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? eo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Jn(t, i, n), n;
};
const G = "http://www.w3.org/2000/svg", to = ["on", "open", "opened", "true"], Mt = 600 * 1e3, zt = 1800 * 1e3, It = 3600 * 1e3, ji = 60 * 1e3, dt = (e) => e * Math.PI / 180;
let Be = class extends et {
  constructor() {
    super(...arguments), this.openings = [], this.openingFirstSeenOpenAt = /* @__PURE__ */ new Map();
  }
  updated(e) {
    super.updated(e), (e.has("openings") || e.has("hass") || e.has("theme")) && this.syncOpenings();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.openingAgeTimer !== void 0 && window.clearTimeout(this.openingAgeTimer);
  }
  isOpen(e) {
    const t = e.state_binding;
    if (!t) return !1;
    const i = this.hass?.states[t.entity]?.state?.toLowerCase();
    return i ? (t.open_states ?? to).map((r) => r.toLowerCase()).includes(i) : !1;
  }
  openingOpenSince(e, t) {
    if (!t || !e.state_binding) {
      this.openingFirstSeenOpenAt.delete(e.id);
      return;
    }
    const i = this.hass?.states[e.state_binding.entity], r = i?.last_changed ? Date.parse(i.last_changed) : NaN;
    if (Number.isFinite(r))
      return this.openingFirstSeenOpenAt.set(e.id, r), r;
    const n = this.openingFirstSeenOpenAt.get(e.id);
    if (n !== void 0) return n;
    const o = Date.now();
    return this.openingFirstSeenOpenAt.set(e.id, o), o;
  }
  openingAgeInfo(e, t, i = Date.now()) {
    const r = this.openingOpenSince(e, t);
    if (r === void 0) return;
    const n = Math.max(0, i - r), o = Math.floor(n / 6e4), s = n >= It ? "alert" : n >= zt ? "warning" : n >= Mt ? "watch" : "fresh", a = Math.floor(o / 60), l = o % 60, d = a > 0 ? `åben i ${a} t${l ? ` ${l} min` : ""}` : `åben i ${o} min`, p = s === "fresh" ? "" : a > 0 ? l ? `${a}t ${l}m` : `${a}t` : `${o}m`;
    return { minutes: o, level: s, label: p, description: d };
  }
  scheduleOpeningAgeRefresh(e) {
    this.openingAgeTimer !== void 0 && window.clearTimeout(this.openingAgeTimer);
    let t = 1 / 0;
    for (const i of this.openings.filter((r) => r.visible !== !1)) {
      const r = this.isOpen(i), n = this.openingOpenSince(i, r);
      if (n === void 0) continue;
      const o = Math.max(0, e - n), s = o < Mt ? Mt : o < zt ? zt : o < It ? It : void 0, a = s === void 0 ? ji : Math.max(1e3, s - o + 50);
      t = Math.min(t, ji, a);
    }
    Number.isFinite(t) && (this.openingAgeTimer = window.setTimeout(() => {
      this.openingAgeTimer = void 0, this.syncOpenings();
    }, Math.max(1e3, t)));
  }
  syncOpenings() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.dynamic-openings-scene")?.remove();
    const t = this.openings.filter((o) => o.visible !== !1);
    if (!t.length) {
      this.scheduleOpeningAgeRefresh(Date.now());
      return;
    }
    const i = document.createElementNS(G, "g");
    i.setAttribute("class", "dynamic-openings-scene"), i.setAttribute("aria-label", "Dynamiske døre og vinduer"), i.setAttribute("pointer-events", "none");
    const r = Date.now();
    for (const o of t)
      o.kind === "window" ? this.drawWindow(i, o, r) : this.drawDoor(i, o, r);
    const n = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, n ?? null), this.scheduleOpeningAgeRefresh(r);
  }
  line(e, t, i, r, n, o) {
    const s = document.createElementNS(G, "line");
    return s.setAttribute("x1", String(t)), s.setAttribute("y1", String(i)), s.setAttribute("x2", String(r)), s.setAttribute("y2", String(n)), s.setAttribute("class", o), e.appendChild(s), s;
  }
  appendAgeIndicator(e, t, i, r) {
    if (!r || r.level === "fresh") return;
    const n = document.createElementNS(G, "g");
    n.setAttribute("class", `opening-age-indicator level-${r.level}`), n.setAttribute("transform", `translate(${t} ${i})`);
    const o = document.createElementNS(G, "circle");
    o.setAttribute("r", r.level === "alert" ? "12" : "10"), o.setAttribute("class", "opening-age-ring"), n.appendChild(o);
    const s = Math.max(28, r.label.length * 7 + 10), a = document.createElementNS(G, "rect");
    a.setAttribute("x", "11"), a.setAttribute("y", "-18"), a.setAttribute("width", String(s)), a.setAttribute("height", "17"), a.setAttribute("rx", "8.5"), a.setAttribute("class", "opening-age-badge"), n.appendChild(a);
    const l = document.createElementNS(G, "text");
    l.setAttribute("x", String(11 + s / 2)), l.setAttribute("y", "-9.3"), l.setAttribute("text-anchor", "middle"), l.setAttribute("dominant-baseline", "central"), l.setAttribute("class", "opening-age-label"), l.textContent = r.label, n.appendChild(l), e.appendChild(n);
  }
  drawDoor(e, t, i) {
    const r = this.isOpen(t), n = this.openingAgeInfo(t, r, i), o = Math.max(28, (t.length ?? 0.055) * v), s = t.angle ?? 0, a = t.open_angle ?? 82, l = t.hinge ?? "start", d = t.swing ?? "left", p = t.point[0] * v, c = t.point[1] * v, g = o / 2, u = dt(s), y = Math.cos(u), m = Math.sin(u), $ = -m, w = y, _ = { x: p - y * g, y: c - m * g }, k = { x: p + y * g, y: c + m * g }, E = l === "start" ? _ : k, M = l === "start" ? k : _, x = s + (l === "start" ? 0 : 180), S = (d === "left" ? -1 : 1) * (l === "start" ? 1 : -1), N = x + (r ? S * a : 0), z = dt(N), X = { x: E.x + Math.cos(z) * o, y: E.y + Math.sin(z) * o }, Q = n ? ` open-age-${n.level}` : "", P = document.createElementNS(G, "g");
    P.setAttribute("class", `dynamic-opening door ${r ? "is-open" : "is-closed"}${Q}`), P.setAttribute("data-opening-id", t.id), n && P.setAttribute("data-open-minutes", String(n.minutes)), this.line(P, _.x, _.y, k.x, k.y, "opening-gap");
    const fe = Math.max(7, Math.min(12, o * 0.12));
    for (const be of [_, k]) this.line(P, be.x - $ * fe / 2, be.y - w * fe / 2, be.x + $ * fe / 2, be.y + w * fe / 2, "door-jamb");
    r && this.line(P, E.x, E.y, M.x, M.y, "door-closed-guide"), this.line(P, E.x, E.y, X.x, X.y, "door-leaf");
    const le = document.createElementNS(G, "circle");
    if (le.setAttribute("cx", String(E.x)), le.setAttribute("cy", String(E.y)), le.setAttribute("r", "4.2"), le.setAttribute("class", "opening-hinge"), P.appendChild(le), r) {
      const be = document.createElementNS(G, "path"), ci = dt(x), pi = z, yr = E.x + Math.cos(ci) * o, vr = E.y + Math.sin(ci) * o, xr = E.x + Math.cos(pi) * o, wr = E.y + Math.sin(pi) * o, $r = S > 0 ? 1 : 0, kr = Math.abs(a) > 180 ? 1 : 0;
      be.setAttribute("d", `M ${yr} ${vr} A ${o} ${o} 0 ${kr} ${$r} ${xr} ${wr}`), be.setAttribute("class", "door-swing"), P.appendChild(be);
    }
    const ai = p + $ * 14, li = c + w * 14, Ve = document.createElementNS(G, "circle");
    Ve.setAttribute("cx", String(ai)), Ve.setAttribute("cy", String(li)), Ve.setAttribute("r", "5.2"), Ve.setAttribute("class", "opening-status-dot"), P.appendChild(Ve), this.appendAgeIndicator(P, ai, li, n);
    const di = document.createElementNS(G, "title");
    di.textContent = `${t.name ?? t.id} · ${r ? "åben" : "lukket"}${n ? ` · ${n.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, P.appendChild(di), e.appendChild(P);
  }
  drawWindow(e, t, i) {
    const r = this.isOpen(t), n = this.openingAgeInfo(t, r, i), o = Math.max(26, (t.length ?? 0.05) * v), s = t.angle ?? 0, a = t.point[0] * v, l = t.point[1] * v, d = dt(s), p = Math.cos(d), c = Math.sin(d), g = -c, u = p, y = o / 2, m = 5.5, $ = { x: a - p * y, y: l - c * y }, w = { x: a + p * y, y: l + c * y }, _ = n ? ` open-age-${n.level}` : "", k = document.createElementNS(G, "g");
    k.setAttribute("class", `dynamic-opening window ${r ? "is-open" : "is-closed"}${_}`), k.setAttribute("data-opening-id", t.id), n && k.setAttribute("data-open-minutes", String(n.minutes)), this.line(k, $.x, $.y, w.x, w.y, "window-gap"), this.line(k, $.x + g * m, $.y + u * m, w.x + g * m, w.y + u * m, "window-pane"), this.line(k, $.x - g * m, $.y - u * m, w.x - g * m, w.y - u * m, "window-pane"), this.line(k, $.x + g * m, $.y + u * m, $.x - g * m, $.y - u * m, "window-frame-end"), this.line(k, w.x + g * m, w.y + u * m, w.x - g * m, w.y - u * m, "window-frame-end"), r && (this.line(k, $.x + g * m, $.y + u * m, a + p * y * 0.12 + g * 18, l + c * y * 0.12 + u * 18, "window-open-sash"), this.line(k, a + p * y * 0.12 + g * 18, l + c * y * 0.12 + u * 18, w.x + g * m, w.y + u * m, "window-open-sash"));
    const E = a + g * 17, M = l + u * 17, x = document.createElementNS(G, "circle");
    x.setAttribute("cx", String(E)), x.setAttribute("cy", String(M)), x.setAttribute("r", "5.2"), x.setAttribute("class", "opening-status-dot"), k.appendChild(x), this.appendAgeIndicator(k, E, M, n);
    const S = document.createElementNS(G, "title");
    S.textContent = `${t.name ?? t.id} · vindue ${r ? "åbent" : "lukket"}${n ? ` · ${n.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, k.appendChild(S), e.appendChild(k);
  }
};
Be.styles = I`${et.styles}
    .dynamic-openings-scene .opening-gap,.dynamic-openings-scene .window-gap{stroke:var(--secondary-text-color,#667085);stroke-width:8;stroke-opacity:.16;vector-effect:non-scaling-stroke;stroke-linecap:butt}
    .dynamic-openings-scene .door-jamb,.dynamic-openings-scene .window-frame-end{stroke:var(--primary-text-color,#1f2937);stroke-width:3.4;vector-effect:non-scaling-stroke;stroke-linecap:round}
    .dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane,.dynamic-openings-scene .window-open-sash{stroke:var(--primary-text-color,#1f2937);stroke-width:4;vector-effect:non-scaling-stroke;stroke-linecap:round;transition:stroke 220ms ease,opacity 220ms ease,filter 320ms ease}
    .dynamic-openings-scene .door-closed-guide{stroke:var(--secondary-text-color,#667085);stroke-width:2;stroke-opacity:.25;stroke-dasharray:5 6;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .opening-hinge{fill:var(--primary-text-color,#1f2937);stroke:var(--card-background-color,#fff);stroke-width:1.5;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .door-swing{fill:none;stroke:var(--primary-text-color,#1f2937);stroke-width:1.8;stroke-dasharray:5 7;stroke-opacity:.32;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .opening-status-dot{fill:var(--success-color,#43a047);stroke:var(--card-background-color,#fff);stroke-width:2;vector-effect:non-scaling-stroke}
    .dynamic-openings-scene .is-open .opening-status-dot{fill:var(--warning-color,#ff9800)}
    .dynamic-openings-scene .is-open .door-leaf,.dynamic-openings-scene .window.is-open .window-pane,.dynamic-openings-scene .window.is-open .window-open-sash{stroke:var(--warning-color,#ff9800)}
    .dynamic-openings-scene .window.is-open .window-pane{opacity:.55}
    .opening-age-indicator{pointer-events:none}.opening-age-ring{fill:none;stroke:var(--warning-color,#ff9800);stroke-width:2.2;stroke-opacity:.55;vector-effect:non-scaling-stroke}.opening-age-badge{fill:var(--card-background-color,#fff);fill-opacity:.92;stroke:var(--warning-color,#ff9800);stroke-width:1.5;stroke-opacity:.7;vector-effect:non-scaling-stroke}.opening-age-label{fill:var(--primary-text-color,#1f2937);font-size:10px;font-weight:800;letter-spacing:.02em}
    .dynamic-opening.open-age-watch .door-leaf,.dynamic-opening.open-age-watch .window-pane,.dynamic-opening.open-age-watch .window-open-sash{filter:drop-shadow(0 0 2px color-mix(in srgb,var(--warning-color,#ff9800) 42%,transparent))}
    .dynamic-opening.open-age-warning .door-leaf,.dynamic-opening.open-age-warning .window-pane,.dynamic-opening.open-age-warning .window-open-sash{stroke:var(--warning-color,#ff9800);filter:drop-shadow(0 0 4px color-mix(in srgb,var(--warning-color,#ff9800) 58%,transparent))}.dynamic-opening.open-age-warning .opening-status-dot{r:6.2}.dynamic-opening.open-age-warning .opening-age-ring{stroke-width:3;stroke-opacity:.78}
    .dynamic-opening.open-age-alert .door-leaf,.dynamic-opening.open-age-alert .window-pane,.dynamic-opening.open-age-alert .window-open-sash{stroke:var(--error-color,#d64545);filter:drop-shadow(0 0 5px color-mix(in srgb,var(--error-color,#d64545) 65%,transparent))}.dynamic-opening.open-age-alert .opening-status-dot{fill:var(--error-color,#d64545);r:6.8}.dynamic-opening.open-age-alert .opening-age-ring,.dynamic-opening.open-age-alert .opening-age-badge{stroke:var(--error-color,#d64545)}.dynamic-opening.open-age-alert .opening-age-ring{stroke-width:3.2;stroke-opacity:.9;animation:explorerOpeningAgePulse 2.8s ease-in-out infinite}.dynamic-opening.open-age-alert .opening-age-label{fill:var(--error-color,#d64545)}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene{mix-blend-mode:multiply;filter:sepia(.32) saturate(.68)}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .door-jamb,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window-frame-end,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .opening-hinge{stroke:#6b4a33;fill:#6b4a33}
    :host([map-theme="enchanted_antique"]) .dynamic-openings-scene .is-open .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window.is-open .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-openings-scene .window.is-open .window-open-sash{stroke:#8a5a28}
    :host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-warning .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-warning .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-warning .window-open-sash{stroke:#9b642d}
    :host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-alert .door-leaf,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-alert .window-pane,:host([map-theme="enchanted_antique"]) .dynamic-opening.open-age-alert .window-open-sash{stroke:#8b4639}
    @keyframes explorerOpeningAgePulse{0%,100%{opacity:.5;transform:scale(.92)}50%{opacity:1;transform:scale(1.16)}}
    @media(prefers-reduced-motion:reduce){.dynamic-openings-scene .door-leaf,.dynamic-openings-scene .window-pane,.dynamic-openings-scene .window-open-sash{transition:none}.dynamic-opening.open-age-alert .opening-age-ring{animation:none}}
  `;
pr([
  A({ attribute: !1 })
], Be.prototype, "openings", 2);
Be = pr([
  R("explorer-openings-canvas")
], Be);
var io = Object.defineProperty, ro = Object.getOwnPropertyDescriptor, st = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ro(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && io(t, i, n), n;
};
const no = "http://www.w3.org/2000/svg";
let Se = class extends Be {
  constructor() {
    super(...arguments), this.hideSourceText = !1, this.weatherEffect = "clear", this.weatherIntensity = 0.6, this.weatherNight = !1, this.weatherMaskId = `explorer-weather-mask-${Math.random().toString(36).slice(2, 10)}`, this.cloudFilterId = `explorer-cloud-organic-${Math.random().toString(36).slice(2, 10)}`;
  }
  updated(e) {
    super.updated(e), this.syncSourceTextVisibility(), (e.has("weatherEffect") || e.has("weatherIntensity") || e.has("weatherNight") || e.has("rooms") || e.has("theme") || e.has("image") || e.has("metadata") || e.has("svgMarkup") || e.has("imageSource")) && this.syncWeatherOutsideRooms();
  }
  syncSourceTextVisibility() {
    const e = this.renderRoot.querySelector("g.floorplan-source.inline-source");
    e && e.querySelectorAll("text, tspan").forEach((t) => {
      this.hideSourceText ? (t.setAttribute("data-explorer-source-text-hidden", "true"), t.style.display = "none") : t.getAttribute("data-explorer-source-text-hidden") === "true" && (t.style.removeProperty("display"), t.removeAttribute("data-explorer-source-text-hidden"));
    });
  }
  svg(e) {
    return document.createElementNS(no, e);
  }
  attrs(e, t) {
    Object.entries(t).forEach(([i, r]) => e.setAttribute(i, r));
  }
  createWeatherMask() {
    const e = this.svg("mask");
    this.attrs(e, {
      id: this.weatherMaskId,
      maskUnits: "userSpaceOnUse",
      x: "0",
      y: "0",
      width: String(v),
      height: String(v)
    });
    const t = this.svg("rect");
    this.attrs(t, { x: "0", y: "0", width: String(v), height: String(v), fill: "white" }), e.appendChild(t);
    for (const i of this.rooms) {
      if (i.points.length < 3) continue;
      const r = this.svg("polygon");
      this.attrs(r, {
        points: i.points.map(([n, o]) => `${n * v},${o * v}`).join(" "),
        fill: "black",
        stroke: "black",
        "stroke-width": "16",
        "stroke-linejoin": "round"
      }), e.appendChild(r);
    }
    return e;
  }
  createCloudFilter() {
    const e = this.svg("filter");
    this.attrs(e, {
      id: this.cloudFilterId,
      x: "-55%",
      y: "-65%",
      width: "210%",
      height: "240%",
      colorInterpolationFilters: "sRGB"
    });
    const t = this.svg("feGaussianBlur");
    this.attrs(t, { in: "SourceGraphic", stdDeviation: "2.6", result: "soft" }), e.appendChild(t);
    const i = this.svg("feTurbulence");
    this.attrs(i, {
      type: "fractalNoise",
      baseFrequency: "0.018 0.032",
      numOctaves: "4",
      seed: "71",
      result: "noise"
    }), e.appendChild(i);
    const r = this.svg("feDisplacementMap");
    this.attrs(r, {
      in: "soft",
      in2: "noise",
      scale: "20",
      xChannelSelector: "R",
      yChannelSelector: "G",
      result: "warped"
    }), e.appendChild(r);
    const n = this.svg("feGaussianBlur");
    return this.attrs(n, { in: "warped", stdDeviation: "1.35" }), e.appendChild(n), e;
  }
  appendClouds(e) {
    const t = [
      [42, 95, 0.92, 0, 0.78],
      [350, 42, 0.76, 1, 0.58],
      [910, 112, 0.94, 2, 0.76],
      [1012, 395, 0.82, 3, 0.68],
      [18, 610, 0.9, 4, 0.76],
      [1008, 742, 0.91, 5, 0.72],
      [138, 975, 0.98, 6, 0.76],
      [790, 992, 0.95, 7, 0.72],
      [625, 24, 0.64, 8, 0.48],
      [1048, 575, 0.68, 9, 0.52],
      [535, 1034, 0.7, 10, 0.48],
      [-24, 420, 0.52, 11, 0.42],
      [1045, 286, 0.5, 12, 0.4],
      [1044, 884, 0.54, 13, 0.42],
      [344, 1042, 0.5, 14, 0.38],
      [1042, 505, 0.48, 15, 0.36],
      [760, 18, 0.5, 16, 0.34],
      [-18, 305, 0.44, 17, 0.3],
      [655, 1042, 0.52, 18, 0.36],
      [-20, 792, 0.5, 19, 0.34],
      [1042, 955, 0.44, 20, 0.3]
    ], i = [
      [-103, 18, 44, 27, 0.34],
      [-76, -15, 52, 31, 0.46],
      [-42, -47, 58, 35, 0.58],
      [-4, -64, 64, 39, 0.68],
      [36, -56, 60, 37, 0.64],
      [70, -34, 52, 32, 0.54],
      [98, -4, 45, 28, 0.42],
      [88, 27, 61, 25, 0.34],
      [29, 38, 80, 28, 0.38],
      [-45, 36, 73, 27, 0.36]
    ], r = [
      "scale(1 .88) skewX(-4)",
      "scale(1.18 .72) skewX(5)",
      "scale(.90 1.03) skewX(-5)",
      "scale(1.10 .80) skewX(3)",
      "scale(.96 .94) skewX(-7)",
      "scale(1.24 .68) skewX(2)"
    ], n = [
      "translate(-18 17) scale(1.08 .72)",
      "translate(20 12) scale(1.30 .56)",
      "translate(-8 21) scale(.94 .86)",
      "translate(14 7) scale(1.18 .62)"
    ];
    for (const [o, s, a, l, d] of t) {
      const p = l % 4, c = l % 3, g = this.svg("g");
      this.attrs(g, {
        class: "weather-cloud-position",
        transform: `translate(${o} ${s}) scale(${a})`,
        opacity: String(d)
      });
      const u = this.svg("g");
      this.attrs(u, {
        class: `weather-cloud weather-cloud-${l % 3} weather-cloud-depth-${c} weather-cloud-form-${p}`
      });
      const y = this.svg("g");
      this.attrs(y, {
        class: "weather-cloud-mist weather-cloud-mist-back",
        transform: n[p]
      }), [
        [-72, 30, 102, 24, 0.52],
        [24, 24, 132, 27, 0.42],
        [112, 8, 78, 20, 0.32]
      ].forEach(([S, N, z, X, Q]) => {
        const P = this.svg("ellipse");
        this.attrs(P, {
          cx: String(S),
          cy: String(N),
          rx: String(z),
          ry: String(X),
          opacity: String(Q)
        }), y.appendChild(P);
      }), u.appendChild(y);
      const m = this.svg("path");
      this.attrs(m, {
        d: "M-145 40 C-112 12 -84 2 -55 10 C-30 20 -9 20 15 10 C43 -3 77 1 104 18 C128 32 135 51 121 64 C92 84 48 84 10 79 C-33 78 -82 88 -119 72 C-138 64 -151 51 -145 40 Z",
        class: "weather-cloud-shadow"
      }), u.appendChild(m);
      const $ = this.svg("g");
      this.attrs($, {
        class: "weather-cloud-body",
        filter: `url(#${this.cloudFilterId})`,
        transform: r[l % r.length]
      });
      const w = this.svg("path");
      this.attrs(w, {
        d: "M-145 28 C-132 -4 -106 -22 -76 -20 C-65 -48 -40 -67 -12 -64 C4 -87 38 -91 61 -67 C88 -66 111 -50 122 -29 C148 -18 158 4 147 25 C134 49 103 62 71 62 C42 76 5 76 -27 69 C-67 76 -111 64 -136 47 C-147 40 -151 34 -145 28 Z",
        class: "weather-cloud-base"
      }), $.appendChild(w);
      for (const [S, N, z, X, Q] of i) {
        const P = this.svg("ellipse");
        this.attrs(P, {
          cx: String(S),
          cy: String(N),
          rx: String(z),
          ry: String(X),
          opacity: String(Q),
          class: "weather-cloud-puff"
        }), $.appendChild(P);
      }
      const _ = this.svg("path");
      this.attrs(_, {
        d: "M-104 -12 C-76 -34 -47 -40 -20 -30 C8 -19 33 -21 62 -39 C46 -13 22 1 -3 2 C-32 4 -57 -3 -79 3 C-92 4 -101 -2 -104 -12 Z",
        class: "weather-cloud-detail"
      }), $.appendChild(_);
      const k = this.svg("path");
      this.attrs(k, {
        d: "M-151 43 C-111 60 -75 56 -45 48 C-15 41 9 51 35 56 C66 61 100 53 132 39 C106 65 69 77 28 74 C-8 69 -48 70 -81 75 C-111 73 -140 61 -151 43 Z",
        class: "weather-cloud-wisp"
      }), $.appendChild(k), u.appendChild($);
      const E = this.svg("g");
      this.attrs(E, {
        class: "weather-cloud-mist weather-cloud-mist-front",
        transform: p === 1 ? "translate(8 51) scale(1.28 .40)" : p === 2 ? "translate(-20 43) scale(.88 .62)" : p === 3 ? "translate(18 47) scale(1.16 .46)" : "translate(8 49) scale(.95 .55)"
      }), [
        [-78, 0, 88, 18, 0.38],
        [18, 2, 116, 20, 0.42],
        [108, -2, 64, 15, 0.3]
      ].forEach(([S, N, z, X, Q]) => {
        const P = this.svg("ellipse");
        this.attrs(P, {
          cx: String(S),
          cy: String(N),
          rx: String(z),
          ry: String(X),
          opacity: String(Q)
        }), E.appendChild(P);
      }), u.appendChild(E);
      const M = this.svg("path");
      if (this.attrs(M, {
        d: "M-182 73 C-126 59 -76 66 -31 69 C13 72 59 66 123 51 C80 82 24 89 -29 84 C-78 80 -126 91 -182 73 Z",
        class: "weather-cloud-strand"
      }), u.appendChild(M), p === 1 || p === 3) {
        const S = this.svg("path");
        this.attrs(S, {
          d: p === 1 ? "M-205 89 C-151 74 -94 78 -40 82 C21 87 76 79 152 61 C97 91 31 99 -35 94 C-94 90 -151 101 -205 89 Z" : "M-176 2 C-124 -7 -82 -3 -41 8 C2 19 49 17 112 0 C67 24 16 30 -35 24 C-84 18 -127 24 -176 2 Z",
          class: "weather-cloud-fine-strand"
        }), u.appendChild(S);
      }
      const x = this.svg("path");
      this.attrs(x, {
        d: "M-57 -40 C-39 -61 -12 -71 11 -65 C31 -60 45 -50 52 -36 C30 -43 9 -40 -10 -33 C-29 -25 -46 -29 -57 -40 Z",
        class: "weather-cloud-highlight"
      }), u.appendChild(x), g.appendChild(u), e.appendChild(g);
    }
  }
  appendFog(e) {
    [105, 245, 405, 610, 805, 930].forEach((t, i) => {
      const r = this.svg("path"), n = i % 2 === 0 ? 18 : -22;
      this.attrs(r, {
        d: `M -120 ${t} C 180 ${t + n}, 390 ${t - n}, 620 ${t} S 980 ${t + n}, 1120 ${t}`,
        class: "weather-fog-band"
      }), e.appendChild(r);
    });
  }
  appendRain(e) {
    for (let t = -1; t < 11; t += 1)
      for (let i = -1; i < 14; i += 1) {
        const r = i * 82 + t % 2 * 28, n = t * 105, o = this.svg("line");
        this.attrs(o, { x1: String(r), y1: String(n), x2: String(r - 18), y2: String(n + 42), class: "weather-rain-streak" }), e.appendChild(o);
      }
  }
  appendSnow(e) {
    for (let t = 0; t < 12; t += 1)
      for (let i = 0; i < 13; i += 1) {
        const r = this.svg("circle"), n = 28 + i * 81 + t % 2 * 33, o = 24 + t * 89, s = 2.4 + (t + i) % 3 * 1.25;
        this.attrs(r, { cx: String(n), cy: String(o), r: String(s), class: "weather-snow-flake" }), e.appendChild(r);
      }
  }
  syncWeatherOutsideRooms() {
    const e = this.renderRoot.querySelector("svg.floorplan"), t = this.renderRoot.querySelector("g.scene");
    if (!e || !t || (e.querySelector(`defs[data-weather-mask="${this.weatherMaskId}"]`)?.remove(), t.querySelector(":scope > g.weather-outside-rooms-scene")?.remove(), this.weatherEffect === "clear")) return;
    const i = this.svg("defs");
    i.setAttribute("data-weather-mask", this.weatherMaskId), i.appendChild(this.createWeatherMask()), i.appendChild(this.createCloudFilter()), e.insertBefore(i, e.firstChild);
    const r = this.svg("g");
    if (r.setAttribute("class", `weather-outside-rooms-scene weather-${this.weatherEffect}${this.weatherNight ? " is-night" : ""}`), r.setAttribute("mask", `url(#${this.weatherMaskId})`), r.setAttribute("pointer-events", "none"), r.style.setProperty("--weather-svg-intensity", String(Math.min(1, Math.max(0.25, this.weatherIntensity || 0.6)))), this.weatherEffect === "cloudy" && this.appendClouds(r), this.weatherEffect === "fog" && this.appendFog(r), (this.weatherEffect === "rain" || this.weatherEffect === "storm") && this.appendRain(r), this.weatherEffect === "snow" && this.appendSnow(r), this.weatherEffect === "storm") {
      const o = this.svg("rect");
      this.attrs(o, { x: "0", y: "0", width: String(v), height: String(v), class: "weather-storm-flash" }), r.appendChild(o);
    }
    const n = t.querySelector(":scope > g.rooms-scene");
    t.insertBefore(r, n ?? null);
  }
};
Se.styles = I`
    ${Be.styles}
    .weather-outside-rooms-scene { opacity: var(--weather-svg-intensity, .6); }
    .weather-outside-rooms-scene.weather-cloudy { opacity: min(1, calc(var(--weather-svg-intensity, .6) * 1.03)); }
    .weather-outside-rooms-scene .weather-cloud {
      animation: explorerCloudDriftA 38s ease-in-out infinite alternate;
      transform-box: fill-box;
      transform-origin: center;
      will-change: transform, opacity;
    }
    .weather-outside-rooms-scene .weather-cloud-1 { animation-name: explorerCloudDriftB; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-cloud-2 { animation-name: explorerCloudDriftC; }
    .weather-outside-rooms-scene .weather-cloud-depth-0 { animation-duration: 34s; }
    .weather-outside-rooms-scene .weather-cloud-depth-1 { animation-duration: 54s; opacity: .72; }
    .weather-outside-rooms-scene .weather-cloud-depth-2 { animation-duration: 82s; opacity: .56; }
    .weather-outside-rooms-scene .weather-cloud-mist { fill: rgba(239, 236, 228, .19); filter: blur(22px); }
    .weather-outside-rooms-scene .weather-cloud-mist-front { fill: rgba(246, 242, 233, .18); filter: blur(17px); }
    .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(70, 65, 58, .10); filter: blur(20px); }
    .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(216, 213, 205, .34); }
    .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(241, 238, 230, .50); }
    .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(207, 204, 196, .16); }
    .weather-outside-rooms-scene .weather-cloud-detail { fill: rgba(255, 252, 244, .19); }
    .weather-outside-rooms-scene .weather-cloud-strand { fill: rgba(226, 222, 213, .14); filter: blur(13px); }
    .weather-outside-rooms-scene .weather-cloud-fine-strand {
      fill: rgba(238, 235, 228, .11);
      filter: blur(9px);
      transform-box: fill-box;
      transform-origin: center;
      animation: explorerCloudWispParallax 22s ease-in-out infinite alternate;
    }
    .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 253, 246, .20); filter: blur(8px); }
    .weather-outside-rooms-scene .weather-cloud-form-1 .weather-cloud-base { opacity: .78; }
    .weather-outside-rooms-scene .weather-cloud-form-1 .weather-cloud-puff { opacity: .70; }
    .weather-outside-rooms-scene .weather-cloud-form-2 .weather-cloud-body { opacity: .84; }
    .weather-outside-rooms-scene .weather-cloud-form-2 .weather-cloud-mist { opacity: .88; }
    .weather-outside-rooms-scene .weather-cloud-form-3 .weather-cloud-shadow { opacity: .62; }
    .weather-outside-rooms-scene .weather-cloud-form-3 .weather-cloud-highlight { opacity: .64; }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-mist { fill: rgba(218, 219, 216, .17); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-base { fill: rgba(196, 198, 195, .30); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-puff { fill: rgba(222, 223, 219, .42); }
    .weather-outside-rooms-scene .weather-cloud-depth-1 .weather-cloud-shadow { fill: rgba(58, 58, 55, .09); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-mist { fill: rgba(210, 212, 210, .14); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-base { fill: rgba(190, 193, 191, .24); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-puff { fill: rgba(218, 220, 217, .34); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-shadow { fill: rgba(55, 56, 54, .06); }
    .weather-outside-rooms-scene .weather-cloud-depth-2 .weather-cloud-fine-strand { animation-duration: 32s; opacity: .70; }
    .weather-outside-rooms-scene .weather-cloud-depth-0 .weather-cloud-fine-strand { animation-duration: 16s; }
    .weather-outside-rooms-scene.is-night .weather-cloud-mist { fill: rgba(148, 161, 172, .15); }
    .weather-outside-rooms-scene.is-night .weather-cloud-mist-front { fill: rgba(169, 180, 188, .13); }
    .weather-outside-rooms-scene.is-night .weather-cloud-shadow { fill: rgba(18, 24, 31, .18); }
    .weather-outside-rooms-scene.is-night .weather-cloud-base { fill: rgba(126, 138, 147, .32); }
    .weather-outside-rooms-scene.is-night .weather-cloud-puff { fill: rgba(176, 186, 192, .38); }
    .weather-outside-rooms-scene.is-night .weather-cloud-wisp { fill: rgba(100, 114, 125, .15); }
    .weather-outside-rooms-scene.is-night .weather-cloud-detail { fill: rgba(219, 225, 225, .12); }
    .weather-outside-rooms-scene.is-night .weather-cloud-strand { fill: rgba(125, 138, 148, .12); }
    .weather-outside-rooms-scene.is-night .weather-cloud-fine-strand { fill: rgba(164, 174, 181, .09); }
    .weather-outside-rooms-scene.is-night .weather-cloud-highlight { fill: rgba(218, 225, 225, .13); }
    .weather-outside-rooms-scene .weather-fog-band { fill: none; stroke: #e4dac1; stroke-width: 38; stroke-linecap: round; opacity: .62; filter: blur(10px); animation: explorerFogDrift 14s ease-in-out infinite alternate; }
    .weather-outside-rooms-scene .weather-fog-band:nth-child(2n) { stroke: #8f887a; opacity: .34; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-rain-streak { stroke: #3d4d55; stroke-width: 3.8; stroke-linecap: round; opacity: .82; animation: explorerRainFall 1.05s linear infinite; }
    .weather-outside-rooms-scene .weather-snow-flake { fill: #fff7df; stroke: #a89b82; stroke-width: 1; opacity: .96; animation: explorerSnowFall 7s linear infinite; }
    .weather-outside-rooms-scene .weather-storm-flash { fill: #fff0bd; opacity: 0; mix-blend-mode: screen; animation: explorerStormFlash 6.5s steps(1,end) infinite; }
    .weather-outside-rooms-scene.is-night .weather-rain-streak { stroke: #879398; opacity: .78; }
    .weather-outside-rooms-scene.is-night .weather-fog-band { opacity: .46; }
    .weather-outside-rooms-scene.is-night .weather-storm-flash { animation-name: explorerStormFlashNight; }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene { mix-blend-mode: normal; filter: sepia(.08) saturate(.68) contrast(.97); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-mist { fill: rgba(235, 226, 210, .18); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-mist-front { fill: rgba(246, 238, 223, .17); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-shadow { fill: rgba(77, 67, 54, .10); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-base { fill: rgba(219, 210, 193, .34); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-puff { fill: rgba(241, 233, 218, .48); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-wisp { fill: rgba(199, 186, 163, .15); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-detail { fill: rgba(255, 246, 228, .17); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-strand { fill: rgba(223, 212, 193, .13); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-fine-strand { fill: rgba(239, 229, 212, .10); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-highlight { fill: rgba(255, 247, 232, .18); }
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-snow-flake { fill: #f1e5c5; }
    @keyframes explorerCloudDriftA {
      0% { transform: translate(-54px,-8px) scale(.99); opacity: .86; }
      48% { transform: translate(10px,4px) scale(1.01); opacity: 1; }
      100% { transform: translate(110px,10px) scale(1.03); opacity: .88; }
    }
    @keyframes explorerCloudDriftB {
      0% { transform: translate(72px,-5px) scale(1.02); opacity: .86; }
      50% { transform: translate(2px,7px) scale(.995); opacity: 1; }
      100% { transform: translate(-100px,13px) scale(1.025); opacity: .89; }
    }
    @keyframes explorerCloudDriftC {
      0% { transform: translate(-44px,10px) scale(.99); opacity: .86; }
      47% { transform: translate(14px,-5px) scale(1.018); opacity: 1; }
      100% { transform: translate(96px,13px) scale(1.008); opacity: .88; }
    }
    @keyframes explorerCloudWispParallax {
      0% { transform: translateX(-10px) scaleX(.98); opacity: .72; }
      52% { transform: translateX(5px) scaleX(1.02); opacity: 1; }
      100% { transform: translateX(18px) scaleX(1.04); opacity: .78; }
    }
    @keyframes explorerFogDrift { from { transform: translateX(-42px); } to { transform: translateX(54px); } }
    @keyframes explorerRainFall { from { transform: translate(18px,-55px); } to { transform: translate(-18px,70px); } }
    @keyframes explorerSnowFall { from { transform: translate(0,-30px); } to { transform: translate(22px,55px); } }
    @keyframes explorerStormFlash { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .52; } }
    @keyframes explorerStormFlashNight { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .28; } }
    @media(prefers-reduced-motion:reduce) {
      .weather-outside-rooms-scene .weather-cloud,
      .weather-outside-rooms-scene .weather-cloud-fine-strand,
      .weather-outside-rooms-scene .weather-fog-band,
      .weather-outside-rooms-scene .weather-rain-streak,
      .weather-outside-rooms-scene .weather-snow-flake,
      .weather-outside-rooms-scene .weather-storm-flash { animation: none; }
    }
  `;
st([
  A({ type: Boolean, attribute: "hide-source-text" })
], Se.prototype, "hideSourceText", 2);
st([
  A({ attribute: "weather-effect" })
], Se.prototype, "weatherEffect", 2);
st([
  A({ type: Number, attribute: "weather-intensity" })
], Se.prototype, "weatherIntensity", 2);
st([
  A({ type: Boolean, attribute: "weather-night" })
], Se.prototype, "weatherNight", 2);
Se = st([
  R("explorer-source-clean-canvas")
], Se);
const oo = (e) => e.strings === void 0, so = {}, ao = (e, t = so) => e._$AH = t;
const lo = rr(class extends nr {
  constructor(e) {
    if (super(e), e.type !== ke.PROPERTY && e.type !== ke.ATTRIBUTE && e.type !== ke.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!oo(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === ie || t === f) return t;
    const i = e.element, r = e.name;
    if (e.type === ke.PROPERTY) {
      if (t === i[r]) return ie;
    } else if (e.type === ke.BOOLEAN_ATTRIBUTE) {
      if (!!t === i.hasAttribute(r)) return ie;
    } else if (e.type === ke.ATTRIBUTE && i.getAttribute(r) === t + "") return ie;
    return ao(e), t;
  }
});
var co = Object.defineProperty, po = Object.getOwnPropertyDescriptor, Fe = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? po(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && co(t, i, n), n;
};
const ho = [
  { value: "person", label: "Person" },
  { value: "pet", label: "Kæledyr" },
  { value: "robot", label: "Robot" },
  { value: "vehicle", label: "Køretøj" },
  { value: "object", label: "Objekt" }
], uo = /* @__PURE__ */ new Set(["sensor", "input_select", "select"]);
function go(e) {
  return e.split(".", 1)[0] ?? "";
}
function Tt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function mo(e) {
  return Math.min(1, Math.max(0, e));
}
function fo(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let se = class extends D {
  constructor() {
    super(...arguments), this.areas = [], this.areaError = "", this.loadingAreas = !1;
  }
  setConfig(e) {
    this.config = e;
  }
  updated(e) {
    e.has("hass") && this.loadAreas();
  }
  async loadAreas() {
    if (!this.hass?.callWS) {
      this.areas = [];
      return;
    }
    this.loadingAreas = !0, this.areaError = "";
    try {
      const e = await this.hass.callWS({ type: "config/area_registry/list" });
      this.areas = [...e].sort((t, i) => t.name.localeCompare(i.name, "da"));
    } catch {
      this.areaError = "Home Assistant Areas kunne ikke hentes. Eksisterende Area ID'er bevares.";
    } finally {
      this.loadingAreas = !1;
    }
  }
  updateConfig(e) {
    if (!this.config) return;
    const t = { ...this.config, ...e };
    this.config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  updateText(e, t) {
    this.updateConfig({ [e]: t });
  }
  updateNumber(e, t) {
    const i = Number(t);
    Number.isFinite(i) && this.updateConfig({ [e]: i });
  }
  updateRoom(e, t) {
    if (!this.config) return;
    const i = [...this.config.rooms ?? []];
    i[e] = { ...i[e], ...t }, this.updateConfig({ rooms: i });
  }
  updateRoomAnchor(e, t, i) {
    const r = Number(i);
    if (!Number.isFinite(r)) return;
    const n = this.config?.rooms?.[e];
    if (!n) return;
    const o = n.presence_anchor ?? { x: 0.5, y: 0.5 };
    this.updateRoom(e, {
      presence_anchor: { ...o, [t]: mo(r) }
    });
  }
  updateRoomAliases(e, t) {
    const i = t.split(",").map((r) => r.trim()).filter(Boolean);
    this.updateRoom(e, { aliases: i });
  }
  updatePresence(e, t) {
    if (!this.config) return;
    const i = [...this.config.presences ?? []];
    i[e] = { ...i[e], ...t }, this.updateConfig({ presences: i });
  }
  updatePresenceBinding(e, t, i) {
    const r = this.config?.presences?.[e];
    if (!r) return;
    const n = fo({
      ...r.entity_binding ?? {},
      [t]: i.trim() || void 0
    });
    this.updatePresence(e, { entity_binding: n });
  }
  addPresence() {
    const e = [...this.config?.presences ?? []];
    let t = e.length + 1, i = `presence_${t}`;
    const r = new Set(e.map((n) => n.id));
    for (; r.has(i); )
      t += 1, i = `presence_${t}`;
    e.push({
      id: i,
      name: `Person ${t}`,
      type: "person",
      entity_binding: {}
    }), this.updateConfig({ presences: e });
  }
  removePresence(e) {
    const t = [...this.config?.presences ?? []];
    t.splice(e, 1), this.updateConfig({ presences: t });
  }
  get entities() {
    return Object.values(this.hass?.states ?? {}).sort(
      (e, t) => Tt(e).localeCompare(Tt(t), "da")
    );
  }
  renderEntityDatalist(e, t = !1) {
    const i = t ? this.entities.filter((r) => uo.has(go(r.entity_id))) : this.entities;
    return h`
      <datalist id=${e}>
        ${i.map(
      (r) => h`<option value=${r.entity_id}>${Tt(r)}</option>`
    )}
      </datalist>
    `;
  }
  renderRoom(e, t) {
    const i = this.areas.some((r) => r.area_id === e.area_id);
    return h`
      <article class="item-card">
        <div class="item-heading">
          <div>
            <strong>${e.name ?? e.id}</strong>
            <small>${e.id}</small>
          </div>
          <span class="badge">${e.points.length} punkter</span>
        </div>

        <div class="grid two">
          <label>
            Rumnavn
            <input
              .value=${e.name ?? ""}
              @input=${(r) => this.updateRoom(t, { name: r.target.value })}
            />
          </label>
          <label>
            Home Assistant Area
            <select
              .value=${lo(e.area_id ?? "")}
              @change=${(r) => this.updateRoom(t, {
      area_id: r.target.value || void 0
    })}
            >
              <option value="">Ikke bundet</option>
              ${e.area_id && !i ? h`<option value=${e.area_id}>${e.area_id} (eksisterende)</option>` : f}
              ${this.areas.map(
      (r) => h`<option value=${r.area_id}>${r.name}</option>`
    )}
            </select>
          </label>
        </div>

        <label>
          Aliases
          <input
            .value=${(e.aliases ?? []).join(", ")}
            placeholder="Køkken, Kitchen"
            @change=${(r) => this.updateRoomAliases(t, r.target.value)}
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
                .value=${String(e.presence_anchor?.x ?? 0.5)}
                @change=${(r) => this.updateRoomAnchor(t, "x", r.target.value)}
              />
            </label>
            <label>
              Y
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                .value=${String(e.presence_anchor?.y ?? 0.5)}
                @change=${(r) => this.updateRoomAnchor(t, "y", r.target.value)}
              />
            </label>
          </div>
        </div>
      </article>
    `;
  }
  renderPresence(e, t) {
    const i = `explorer-primary-entity-${t}`, r = `explorer-room-entity-${t}`, n = e.entity_binding ?? {};
    return h`
      <article class="item-card presence-card">
        <div class="item-heading">
          <div>
            <strong>${e.name ?? e.id}</strong>
            <small>${e.id}</small>
          </div>
          <button class="danger ghost" @click=${() => this.removePresence(t)}>Fjern</button>
        </div>

        <div class="grid two">
          <label>
            Navn
            <input
              .value=${e.name ?? ""}
              @input=${(o) => this.updatePresence(t, { name: o.target.value })}
            />
          </label>
          <label>
            Type
            <select
              .value=${e.type ?? "person"}
              @change=${(o) => this.updatePresence(t, {
      type: o.target.value
    })}
            >
              ${ho.map(
      (o) => h`<option value=${o.value}>${o.label}</option>`
    )}
            </select>
          </label>
        </div>

        <label>
          Hoved-entitet (valgfri)
          <input
            list=${i}
            .value=${n.entity ?? ""}
            placeholder="person.marc_poulsen"
            @change=${(o) => this.updatePresenceBinding(t, "entity", o.target.value)}
          />
          ${this.renderEntityDatalist(i)}
          <small>Bruges til profilbillede og øvrige entity-attributter. Kan være tom.</small>
        </label>

        <label>
          Rum-tracking entitet
          <input
            list=${r}
            .value=${n.room_entity ?? ""}
            placeholder="sensor.marc_room eller input_select.explorer_room_test"
            @change=${(o) => this.updatePresenceBinding(
      t,
      "room_entity",
      o.target.value
    )}
          />
          ${this.renderEntityDatalist(r, !0)}
          <small>Kan komme fra Bermuda, ESPresense, en helper eller en anden integration.</small>
        </label>

        <label>
          Fast rum (fallback)
          <select
            .value=${e.room_id ?? ""}
            @change=${(o) => this.updatePresence(t, {
      room_id: o.target.value || void 0
    })}
          >
            <option value="">Ingen</option>
            ${(this.config?.rooms ?? []).map(
      (o) => h`<option value=${o.id}>${o.name ?? o.id}</option>`
    )}
          </select>
          <small>Bruges hvis der ikke er en gyldig room-sensor.</small>
        </label>
      </article>
    `;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.rooms ?? [], t = this.config.presences ?? [];
    return h`
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
                @input=${(i) => this.updateText("title", i.target.value)}
              />
            </label>
            <label>
              Plantegning
              <input
                .value=${this.config.image ?? this.config.background ?? ""}
                placeholder="/local/explorer/floorplan.svg"
                @input=${(i) => this.updateText("image", i.target.value)}
              />
            </label>
            <label>
              Tilpasning
              <select
                .value=${this.config.fit_mode ?? "contain"}
                @change=${(i) => this.updateText("fit_mode", i.target.value)}
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
                  @input=${(i) => this.updateNumber("min_zoom", i.target.value)}
                />
              </label>
              <label>
                Maksimum zoom
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  .value=${String(this.config.max_zoom ?? 6)}
                  @input=${(i) => this.updateNumber("max_zoom", i.target.value)}
                />
              </label>
            </div>
          </div>
        </details>

        <details open>
          <summary>
            <span>Rum</span>
            <span class="summary-hint">${e.length} rum</span>
          </summary>
          <div class="section-content">
            <div class="notice">
              Bind de eksisterende Explorer-rum til Home Assistant Areas og justér deres
              presence-anchor her. Tegning af nye rumgrænser kommer i den visuelle plantegningseditor.
            </div>
            ${this.loadingAreas ? h`<div class="subtle">Henter Home Assistant Areas…</div>` : f}
            ${this.areaError ? h`<div class="warning">${this.areaError}</div>` : f}
            ${e.length ? e.map((i, r) => this.renderRoom(i, r)) : h`<div class="empty">Der er endnu ingen rum i kortets konfiguration.</div>`}
          </div>
        </details>

        <details open>
          <summary>
            <span>Personer & objekter</span>
            <span class="summary-hint">${t.length} tilføjet</span>
          </summary>
          <div class="section-content">
            <div class="notice">
              Tracking er backend-uafhængig. Vælg bare den Home Assistant-entitet, der fortæller
              hvilket rum personen eller objektet befinder sig i.
            </div>
            ${t.map((i, r) => this.renderPresence(i, r))}
            <button class="primary" @click=${this.addPresence}>+ Tilføj person eller objekt</button>
          </div>
        </details>
      </div>
    `;
  }
};
se.styles = I`
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
Fe([
  A({ attribute: !1 })
], se.prototype, "hass", 2);
Fe([
  b()
], se.prototype, "config", 2);
Fe([
  b()
], se.prototype, "areas", 2);
Fe([
  b()
], se.prototype, "areaError", 2);
Fe([
  b()
], se.prototype, "loadingAreas", 2);
se = Fe([
  R("ha-explorer-card-editor")
], se);
var bo = Object.defineProperty, yo = Object.getOwnPropertyDescriptor, L = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? yo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && bo(t, i, n), n;
};
const J = 1e3, ct = (e) => Math.min(1, Math.max(0, e));
function Di(e) {
  return e.length ? { x: e.reduce((t, i) => t + i[0], 0) / e.length, y: e.reduce((t, i) => t + i[1], 0) / e.length } : { x: 0.5, y: 0.5 };
}
function vo(e) {
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function xo(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "room";
}
function Li(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
let O = class extends D {
  constructor() {
    super(...arguments), this.drawingMode = "idle", this.selectedRoomId = "", this.pendingPoints = [], this.draftRoomName = "", this.draftAreaId = "", this.draftWidth = "", this.draftHeight = "", this.draftFlipX = !1, this.draftFlipY = !1, this.calibrationMessage = "", this.drawingAreas = [], this.drawingAreaError = "";
  }
  setConfig(e) {
    this.roomConfig = e, this.selectedRoomId && !(e.rooms ?? []).some((t) => t.id === this.selectedRoomId) && (this.selectedRoomId = "", this.drawingMode = "idle");
  }
  updated(e) {
    e.has("hass") && this.loadDrawingAreas(), (e.has("roomConfig") || e.has("hass")) && this.roomConfig && this.baseEditor?.setConfig(this.roomConfig);
  }
  async loadDrawingAreas() {
    if (!this.hass?.callWS) {
      this.drawingAreas = [];
      return;
    }
    try {
      this.drawingAreas = [...await this.hass.callWS({ type: "config/area_registry/list" })].sort((e, t) => e.name.localeCompare(t.name, "da"));
    } catch {
      this.drawingAreaError = "Home Assistant Areas kunne ikke hentes.";
    }
  }
  handleBaseConfigChanged(e) {
    e.detail?.config && (e.stopPropagation(), this.emitConfig(e.detail.config));
  }
  emitConfig(e) {
    this.roomConfig = e, this.baseEditor?.setConfig(e), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  get rooms() {
    return this.roomConfig?.rooms ?? [];
  }
  get selectedRoom() {
    return this.rooms.find((e) => e.id === this.selectedRoomId);
  }
  mapPoint(e) {
    const t = e.currentTarget.getBoundingClientRect();
    return t.width && t.height ? [ct((e.clientX - t.left) / t.width), ct((e.clientY - t.top) / t.height)] : [0.5, 0.5];
  }
  selectedPresence() {
    const e = this.selectedRoom;
    if (!e) return;
    const t = (this.roomConfig?.presences ?? []).filter((n) => n.entity_binding?.coordinate_space === "room_meters" && n.entity_binding.entity), i = t.find((n) => n.room_id === e.id);
    if (i) return i;
    if (t.length === 1) return t[0];
    const r = new Set([e.id, e.area_id ?? "", e.name ?? "", ...e.aliases ?? []].map((n) => n.trim().toLowerCase()).filter(Boolean));
    return t.find((n) => n.room_id && r.has(n.room_id.trim().toLowerCase()));
  }
  captureCalibration(e) {
    const t = this.selectedRoom, i = this.selectedPresence(), r = this.hass;
    if (!t || !i || !r) return;
    const n = i.entity_binding, o = r.states[n.entity];
    if (!o) return;
    const s = Li(o.attributes[n.x_attribute ?? "map_x"]), a = Li(o.attributes[n.y_attribute ?? "map_y"]), l = t.physical_meters;
    if (s === void 0 || a === void 0 || !l) return;
    const d = vo(t), p = ct((e[0] - d.minX) / (d.maxX - d.minX || 1)), c = ct((e[1] - d.minY) / (d.maxY - d.minY || 1));
    return { sensor_x: l.flip_x ? l.width - s : s, sensor_y: l.flip_y ? l.height - a : a, room_x: p, room_y: c };
  }
  handleMapClick(e) {
    const t = this.mapPoint(e);
    if (this.drawingMode === "draw-new" || this.drawingMode === "redraw") this.pendingPoints = [...this.pendingPoints, t];
    else if (this.drawingMode === "anchor" && this.selectedRoom) this.pendingAnchor = { x: t[0], y: t[1] };
    else if (this.drawingMode === "cal-a" || this.drawingMode === "cal-b" || this.drawingMode === "cal-c") {
      const i = this.captureCalibration(t);
      if (!i) {
        this.calibrationMessage = "Kunne ikke læse live map_x/map_y. Kontroller Target-bindingen.";
        return;
      }
      const r = this.drawingMode === "cal-a" ? "A" : this.drawingMode === "cal-b" ? "B" : "C";
      r === "A" ? this.calA = i : r === "B" ? this.calB = i : this.calC = i, this.calibrationMessage = `Punkt ${r} gemt fra den aktuelle sensorposition.`, this.drawingMode = "idle";
    }
  }
  selectRoom(e, t) {
    if (this.drawingMode !== "idle") return;
    e.stopPropagation(), this.selectedRoomId = t;
    const i = this.rooms.find((r) => r.id === t);
    this.draftWidth = i?.physical_meters?.width?.toString() ?? "", this.draftHeight = i?.physical_meters?.height?.toString() ?? "", this.draftFlipX = i?.physical_meters?.flip_x ?? !1, this.draftFlipY = i?.physical_meters?.flip_y ?? !1, this.calA = i?.physical_meters?.position_calibration?.a, this.calB = i?.physical_meters?.position_calibration?.b, this.calC = i?.physical_meters?.position_calibration?.c, this.calibrationMessage = "";
  }
  uniqueRoomId(e) {
    const t = xo(e), i = new Set(this.rooms.map((n) => n.id));
    if (!i.has(t)) return t;
    let r = 2;
    for (; i.has(`${t}_${r}`); ) r++;
    return `${t}_${r}`;
  }
  beginNewRoom() {
    this.selectedRoomId = "", this.pendingPoints = [], this.pendingAnchor = void 0, this.draftRoomName = `Rum ${this.rooms.length + 1}`, this.draftAreaId = "", this.draftWidth = "", this.draftHeight = "", this.draftFlipX = !1, this.draftFlipY = !1, this.calA = void 0, this.calB = void 0, this.calC = void 0, this.drawingMode = "draw-new";
  }
  beginRedraw() {
    this.selectedRoom && (this.pendingPoints = [], this.drawingMode = "redraw");
  }
  beginAnchor() {
    this.selectedRoom && (this.pendingAnchor = void 0, this.drawingMode = "anchor");
  }
  cancelDrawing() {
    this.pendingPoints = [], this.pendingAnchor = void 0, this.drawingMode = "idle";
  }
  undoPoint() {
    this.pendingPoints = this.pendingPoints.slice(0, -1);
  }
  meters() {
    const e = Number(this.draftWidth.replace(",", ".")), t = Number(this.draftHeight.replace(",", ".")), i = this.calA && this.calB ? { a: this.calA, b: this.calB, ...this.calC ? { c: this.calC } : {} } : void 0;
    return e > 0 && t > 0 ? { width: e, height: t, flip_x: this.draftFlipX, flip_y: this.draftFlipY, ...i ? { position_calibration: i } : {} } : void 0;
  }
  finishPolygon() {
    if (!(this.pendingPoints.length < 3 || !this.roomConfig)) {
      if (this.drawingMode === "draw-new") {
        const e = this.draftRoomName.trim() || `Rum ${this.rooms.length + 1}`, t = this.uniqueRoomId(e), i = Di(this.pendingPoints), r = this.meters(), n = { id: t, name: e, points: this.pendingPoints, presence_anchor: i, ...this.draftAreaId ? { area_id: this.draftAreaId } : {}, ...r ? { physical_meters: r } : {} };
        this.selectedRoomId = t, this.emitConfig({ ...this.roomConfig, rooms: [...this.rooms, n] });
      } else this.selectedRoom && this.emitConfig({ ...this.roomConfig, rooms: this.rooms.map((e) => e.id === this.selectedRoomId ? { ...e, points: this.pendingPoints } : e) });
      this.pendingPoints = [], this.drawingMode = "idle";
    }
  }
  saveMeters() {
    if (!this.roomConfig || !this.selectedRoom) return;
    const e = this.meters();
    e && this.emitConfig({ ...this.roomConfig, rooms: this.rooms.map((t) => t.id === this.selectedRoomId ? { ...t, physical_meters: e } : t) });
  }
  savePositionCalibration() {
    if (!this.roomConfig || !this.selectedRoom || !this.calA || !this.calB || !this.calC) return;
    const e = this.selectedRoom.physical_meters;
    if (!e) return;
    const t = { ...e, position_calibration: { a: this.calA, b: this.calB, c: this.calC } };
    this.emitConfig({ ...this.roomConfig, rooms: this.rooms.map((i) => i.id === this.selectedRoomId ? { ...i, physical_meters: t } : i) }), this.calibrationMessage = "3-punkts spatial kalibrering gemt.";
  }
  resetPositionCalibration() {
    if (!this.roomConfig || !this.selectedRoom?.physical_meters) return;
    const { position_calibration: e, ...t } = this.selectedRoom.physical_meters;
    this.calA = void 0, this.calB = void 0, this.calC = void 0, this.emitConfig({ ...this.roomConfig, rooms: this.rooms.map((i) => i.id === this.selectedRoomId ? { ...i, physical_meters: t } : i) }), this.calibrationMessage = "Positionskalibrering nulstillet.";
  }
  removeSelectedRoom() {
    if (!this.roomConfig || !this.selectedRoom) return;
    const e = this.selectedRoom.id, t = this.rooms.filter((r) => r.id !== e), i = (this.roomConfig.presences ?? []).map((r) => r.room_id === e ? { ...r, room_id: void 0 } : r);
    this.selectedRoomId = "", this.emitConfig({ ...this.roomConfig, rooms: t, presences: i });
  }
  finishAnchor() {
    if (!this.roomConfig || !this.selectedRoom || !this.pendingAnchor) return;
    const e = { ...this.pendingAnchor };
    this.emitConfig({ ...this.roomConfig, rooms: this.rooms.map((t) => t.id === this.selectedRoomId ? { ...t, presence_anchor: e } : t) }), this.pendingAnchor = void 0, this.drawingMode = "idle";
  }
  renderRoomPolygon(e) {
    if (!e.points.length) return f;
    const t = e.points.map(([o, s]) => `${o * J},${s * J}`).join(" "), i = e.id === this.selectedRoomId, r = Di(e.points), n = i && this.drawingMode === "anchor" && this.pendingAnchor ? this.pendingAnchor : e.presence_anchor ?? r;
    return C`<g style=${this.drawingMode === "idle" ? "pointer-events:auto" : "pointer-events:none"} @click=${(o) => this.selectRoom(o, e.id)}><polygon points=${t} fill="var(--primary-color,#03a9f4)" fill-opacity=${i ? ".30" : ".14"} stroke="var(--primary-color,#03a9f4)" stroke-width=${i ? 7 : 4}/><text x=${r.x * J} y=${r.y * J} text-anchor="middle" dominant-baseline="middle">${e.name ?? e.id}</text>${i ? C`<circle cx=${n.x * J} cy=${n.y * J} r="15" class="anchor"/>` : f}</g>`;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * J},${i * J}`).join(" ");
    return C`${this.pendingPoints.length >= 3 ? C`<polygon points=${e} class="pending-fill"/>` : f}<polyline points=${e} class="pending-line" fill="none"/>${this.pendingPoints.map(([t, i], r) => C`<circle cx=${t * J} cy=${i * J} r="13" class="pending-point"/><text x=${t * J} y=${i * J - 22} text-anchor="middle">${r + 1}</text>`)}`;
  }
  dimensionFields() {
    return h`<div class="dimensions"><label>Bredde (m)<input inputmode="decimal" placeholder="4,3" .value=${this.draftWidth} @input=${(e) => this.draftWidth = e.target.value}></label><label>Længde (m)<input inputmode="decimal" placeholder="5,4" .value=${this.draftHeight} @input=${(e) => this.draftHeight = e.target.value}></label><label class="toggle"><input type="checkbox" .checked=${this.draftFlipX} @change=${(e) => this.draftFlipX = e.target.checked}> Vend vandret (X)</label><label class="toggle"><input type="checkbox" .checked=${this.draftFlipY} @change=${(e) => this.draftFlipY = e.target.checked}> Vend lodret (Y)</label>${this.drawingMode === "idle" && this.selectedRoom ? h`<button class="primary" ?disabled=${!this.meters()} @click=${this.saveMeters}>Gem rumkalibrering</button>` : f}</div>`;
  }
  positionCalibration() {
    if (!this.selectedRoom || this.drawingMode !== "idle") return f;
    const e = this.selectedPresence();
    return h`<div class="position-cal"><strong>3-punkts spatial kalibrering</strong><span>${e ? `Live target: ${e.name ?? e.id}` : "Bind først et room_meters-target til rummet."}</span><div class="cal-status"><span>Punkt A: ${this.calA ? "✓ gemt" : "ikke gemt"}</span><span>Punkt B: ${this.calB ? "✓ gemt" : "ikke gemt"}</span><span>Punkt C: ${this.calC ? "✓ gemt" : "ikke gemt"}</span></div><div class="buttons"><button ?disabled=${!e} @click=${() => this.drawingMode = "cal-a"}>Gem punkt A</button><button ?disabled=${!e} @click=${() => this.drawingMode = "cal-b"}>Gem punkt B</button><button ?disabled=${!e} @click=${() => this.drawingMode = "cal-c"}>Gem punkt C</button><button class="primary" ?disabled=${!this.calA || !this.calB || !this.calC} @click=${this.savePositionCalibration}>Gem 3-punktskalibrering</button><button ?disabled=${!this.selectedRoom.physical_meters?.position_calibration && !this.calA && !this.calB && !this.calC} @click=${this.resetPositionCalibration}>Nulstil positionskalibrering</button></div>${this.calibrationMessage ? h`<small>${this.calibrationMessage}</small>` : f}<small>Brug tre punkter der danner en stor trekant. Tryk A/B/C, stå på referencepunktet, og klik derefter samme sted på plantegningen.</small></div>`;
  }
  renderRoomDrawingEditor() {
    if (!this.roomConfig) return h``;
    const e = this.roomConfig.image ?? this.roomConfig.background ?? "", t = this.roomConfig.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet", i = this.drawingMode === "cal-a" || this.drawingMode === "cal-b" || this.drawingMode === "cal-c", r = this.drawingMode === "cal-a" ? "A" : this.drawingMode === "cal-b" ? "B" : "C", n = i ? `Stå på referencepunkt ${r} og klik det samme sted på plantegningen.` : this.drawingMode === "idle" ? "Vælg et rum. Kalibrér mål/orientering og derefter tre fysiske referencepunkter." : this.drawingMode === "anchor" ? "Klik hvor personpunktet skal være." : "Klik rundt langs rummets kant. Mindst 3 punkter.";
    return h`<section class="drawing-editor"><div class="heading"><div><small>VISUAL POSITION CALIBRATION · v0.34.0</small><h3>Tegn, mål, orientér og finjustér live-positioner</h3></div><b>${this.rooms.length} rum</b></div><div class="instruction">${n}</div>${this.drawingMode === "draw-new" ? h`<div class="grid"><label>Rumnavn<input .value=${this.draftRoomName} @input=${(o) => this.draftRoomName = o.target.value}></label><label>Home Assistant Area<select .value=${this.draftAreaId} @change=${(o) => this.draftAreaId = o.target.value}><option value="">Ikke bundet</option>${this.drawingAreas.map((o) => h`<option value=${o.area_id}>${o.name}</option>`)}</select></label></div>${this.dimensionFields()}` : this.selectedRoom && this.drawingMode === "idle" ? h`<div class="selected"><strong>${this.selectedRoom.name ?? this.selectedRoom.id}</strong><span>${this.selectedRoom.points.length} punkter · ${this.selectedRoom.physical_meters?.width ?? "?"} × ${this.selectedRoom.physical_meters?.height ?? "?"} m</span></div>${this.dimensionFields()}${this.positionCalibration()}` : f}${this.drawingAreaError ? h`<div class="warning">${this.drawingAreaError}</div>` : f}${e ? h`<div class="map-frame"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}><image href=${e} width="1000" height="1000" preserveAspectRatio=${t}/>${this.rooms.map((o) => this.renderRoomPolygon(o))}${this.renderPending()}</svg></div>` : h`<div class="instruction">Vælg først en plantegning under Kort.</div>`}<div class="buttons">${this.drawingMode === "draw-new" || this.drawingMode === "redraw" ? h`<button @click=${this.undoPoint}>Fortryd punkt</button><button class="primary" ?disabled=${this.pendingPoints.length < 3 || this.drawingMode === "draw-new" && !this.meters()} @click=${this.finishPolygon}>Gem rum</button><button @click=${this.cancelDrawing}>Annuller</button>` : this.drawingMode === "anchor" || i ? h`<button @click=${this.cancelDrawing}>Annuller</button>` : h`<button class="primary" @click=${this.beginNewRoom}>+ Nyt rum</button><button ?disabled=${!this.selectedRoom} @click=${this.beginRedraw}>Tegn rumkant igen</button><button ?disabled=${!this.selectedRoom} @click=${this.beginAnchor}>Placér personpunkt</button><button class="danger" ?disabled=${!this.selectedRoom} @click=${this.removeSelectedRoom}>Slet valgt rum</button>`}</div></section>`;
  }
  render() {
    return h`<ha-explorer-card-editor .hass=${this.hass} @config-changed=${this.handleBaseConfigChanged}></ha-explorer-card-editor>${this.renderRoomDrawingEditor()}`;
  }
};
O.styles = I`:host{display:block}.drawing-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading h3{margin:3px 0}.heading small{color:var(--secondary-text-color);font-weight:700;letter-spacing:.08em}.instruction,.selected,.warning,.position-cal{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color)}.position-cal{display:grid;gap:9px}.position-cal strong{color:var(--primary-text-color)}.grid,.dimensions{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;align-items:end}.cal-status{display:flex;gap:18px;flex-wrap:wrap}label{display:grid;gap:5px;font-size:.8rem;color:var(--secondary-text-color)}label.toggle{display:flex;align-items:center;gap:8px;min-height:38px;font-size:.9rem;color:var(--primary-text-color)}label.toggle input{width:auto}input,select{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;height:min(58vh,620px);cursor:crosshair}text{fill:var(--primary-text-color);font-size:24px;font-weight:700}.pending-fill{fill:var(--primary-color);fill-opacity:.18;stroke:var(--primary-color);stroke-width:5}.pending-line{stroke:var(--primary-color);stroke-width:6}.pending-point,.anchor{fill:var(--primary-color);stroke:white;stroke-width:4}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{padding:9px 13px;border:1px solid var(--divider-color);border-radius:9px;background:var(--secondary-background-color);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:var(--primary-color)}button.danger{background:var(--error-color,#db4437);color:#fff;border-color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}.selected{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}`;
L([
  A({ attribute: !1 })
], O.prototype, "hass", 2);
L([
  b()
], O.prototype, "roomConfig", 2);
L([
  b()
], O.prototype, "drawingMode", 2);
L([
  b()
], O.prototype, "selectedRoomId", 2);
L([
  b()
], O.prototype, "pendingPoints", 2);
L([
  b()
], O.prototype, "pendingAnchor", 2);
L([
  b()
], O.prototype, "draftRoomName", 2);
L([
  b()
], O.prototype, "draftAreaId", 2);
L([
  b()
], O.prototype, "draftWidth", 2);
L([
  b()
], O.prototype, "draftHeight", 2);
L([
  b()
], O.prototype, "draftFlipX", 2);
L([
  b()
], O.prototype, "draftFlipY", 2);
L([
  b()
], O.prototype, "calA", 2);
L([
  b()
], O.prototype, "calB", 2);
L([
  b()
], O.prototype, "calC", 2);
L([
  b()
], O.prototype, "calibrationMessage", 2);
L([
  b()
], O.prototype, "drawingAreas", 2);
L([
  b()
], O.prototype, "drawingAreaError", 2);
L([
  Ur("ha-explorer-card-editor")
], O.prototype, "baseEditor", 2);
O = L([
  R("ha-explorer-room-drawing-editor")
], O);
function ce(e) {
  return e?.trim() || void 0;
}
function wo(e) {
  const t = e.entity_binding;
  return !!(ce(t?.room_entity) || e.room_id || Number.isFinite(e.x) && Number.isFinite(e.y));
}
function $o(e) {
  const t = [];
  for (const i of e.presences ?? []) {
    const r = ce(i.entity_binding?.entity), n = ce(i.entity_binding?.room_entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "presences" }), n && t.push({ entity: n, source: `${i.name ?? i.id} · rum-tracking`, target: "presences" });
  }
  for (const i of e.rooms ?? []) {
    for (const r of i.reactions ?? []) {
      const n = ce(r.entity);
      n && t.push({ entity: n, source: `${i.name ?? i.id} · ${r.kind}`, target: "room-reactions" });
    }
    for (const r of i.quick_actions ?? []) {
      const n = ce(r.entity);
      n && t.push({ entity: n, source: `${i.name ?? i.id} · ${r.name}`, target: "room-actions" });
    }
  }
  for (const i of e.zones ?? []) {
    const r = ce(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "zones" });
  }
  for (const i of e.openings ?? []) {
    const r = ce(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "openings" });
  }
  for (const i of e.route_nodes ?? []) {
    const r = ce(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "route-graph" });
  }
  for (const i of e.route_graph_edges ?? []) {
    const r = ce(i.condition?.entity);
    r && t.push({ entity: r, source: "Betinget route edge", target: "route-graph" });
  }
  return t;
}
function ko(e, t) {
  const i = e.rooms ?? [], r = e.presences ?? [], n = e.zones ?? [], o = e.openings ?? [], s = e.route_nodes ?? [], a = e.route_graph_edges ?? [], l = e.routes ?? [], d = i.flatMap((_) => _.reactions ?? []), p = i.flatMap((_) => _.quick_actions ?? []), c = $o(e), g = [];
  if (t)
    for (const _ of c) {
      const k = t.states[_.entity];
      if (!k) {
        g.push({ ..._, unavailable: !1 });
        continue;
      }
      (k.state === "unavailable" || k.state === "unknown") && g.push({ ..._, unavailable: !0 });
    }
  const u = g.filter((_) => !_.unavailable), y = r.filter((_) => !wo(_)), m = i.filter((_) => _.points.length < 3), $ = (e.image ?? e.background ?? "").trim(), w = [{ id: "floorplan", label: "Plantegning", detail: $ ? "Plantegning er valgt." : "Vælg en SVG-, PNG- eller JPG-plantegning.", state: $ ? "ready" : "attention", target: "basic" }, { id: "rooms", label: "Rum", detail: i.length ? m.length ? `${i.length} rum · ${m.length} mangler en gyldig polygon.` : `${i.length} rum klar.` : "Tegn mindst ét rum for room-aware tracking og Living Rooms.", state: i.length && !m.length ? "ready" : "attention", target: i.length ? "rooms" : "room-tools" }, { id: "presences", label: "Personer & objekter", detail: r.length ? y.length ? `${r.length} tilføjet · ${y.length} mangler rum/position.` : `${r.length} tracking-profil${r.length === 1 ? "" : "er"} klar.` : "Valgfrit · tilføj personer, kæledyr, robotter eller objekter.", state: r.length ? y.length ? "attention" : "ready" : "optional", target: "presences" }, { id: "entities", label: "Home Assistant-entities", detail: c.length ? t ? u.length ? `${u.length} binding${u.length === 1 ? "" : "er"} findes ikke i Home Assistant.` : g.length ? `${c.length} bindings fundet · ${g.length} er midlertidigt unavailable/unknown.` : `${c.length} live binding${c.length === 1 ? "" : "er"} fundet.` : `${c.length} binding${c.length === 1 ? "" : "er"} · afventer Home Assistant.` : "Ingen live entity-bindings endnu.", state: u.length ? "attention" : c.length ? "ready" : "optional", target: u[0]?.target ?? g[0]?.target ?? "diagnostics" }, { id: "openings", label: "Døre & vinduer", detail: o.length ? `${o.length} dynamisk${o.length === 1 ? " åbning" : "e åbninger"} konfigureret.` : "Valgfrit · placér døre og vinduer og bind dem til kontaktsensorer.", state: o.length ? "ready" : "optional", target: "openings" }, { id: "routing", label: "Routing", detail: a.length || l.length ? `${a.length} graph edges · ${l.length} manuelle routes · ${s.length} nodes.` : "Valgfrit · kortet kan bruges uden route graph.", state: a.length || l.length ? "ready" : "optional", target: a.length ? "route-graph" : "routes" }, { id: "living", label: "Living Rooms", detail: d.length ? `${d.length} rumreaktion${d.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · lys, motion, media og åbninger kan gøre rummene levende.", state: d.length ? "ready" : "optional", target: "room-reactions" }, { id: "quick-actions", label: "Rumhandlinger", detail: p.length ? `${p.length} scene- eller scripthandling${p.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · tilføj scenes og scripts direkte til rummets panel.", state: p.length ? "ready" : "optional", target: "room-actions" }, { id: "zones", label: "Dynamic Areas", detail: n.length ? `${n.length} zone${n.length === 1 ? "" : "r"} konfigureret.` : "Valgfrit · tilføj alarm-, rengørings- eller informationszoner.", state: n.length ? "ready" : "optional", target: "zones" }];
  return { items: w, entityIssues: g, attentionCount: w.filter((_) => _.state === "attention").length, configuredFeatureCount: w.filter((_) => _.state === "ready").length, roomCount: i.length, presenceCount: r.length, zoneCount: n.length, reactionCount: d.length, actionCount: p.length, routeCount: a.length + l.length, nodeCount: s.length };
}
var _o = Object.defineProperty, Ao = Object.getOwnPropertyDescriptor, ni = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ao(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && _o(t, i, n), n;
};
const So = {
  ready: "Klar",
  attention: "Tjek",
  optional: "Valgfrit"
};
let tt = class extends D {
  navigate(e) {
    this.dispatchEvent(new CustomEvent("explorer-editor-navigate", {
      detail: { target: e },
      bubbles: !0,
      composed: !0
    }));
  }
  renderItem(e) {
    return h`
      <button
        class="check ${e.state}"
        type="button"
        @click=${() => this.navigate(e.target)}
        title="Åbn den relevante editorsektion"
      >
        <span class="state-icon" aria-hidden="true">
          ${e.state === "ready" ? "✓" : e.state === "attention" ? "!" : "·"}
        </span>
        <span class="check-copy">
          <strong>${e.label}</strong>
          <small>${e.detail}</small>
        </span>
        <span class="state-label">${So[e.state]}</span>
        <span class="chevron" aria-hidden="true">›</span>
      </button>
    `;
  }
  render() {
    if (!this.config) return f;
    const e = ko(this.config, this.hass), t = e.attentionCount === 0, i = e.entityIssues.slice(0, 4);
    return h`
      <section class="overview">
        <div class="hero">
          <div>
            <span class="eyebrow">Room Actions · v0.27.0</span>
            <h3>Opsætningsoversigt</h3>
            <p>
              ${t ? "Grundopsætningen ser klar ud. Brug punkterne herunder som genveje til de enkelte dele af kortet." : `${e.attentionCount} punkt${e.attentionCount === 1 ? "" : "er"} kræver opmærksomhed før opsætningen er helt ren.`}
            </p>
          </div>
          <div class="health ${t ? "healthy" : "attention"}">
            <strong>${t ? "Klar" : `${e.attentionCount} tjek`}</strong>
            <small>${e.configuredFeatureCount}/8 områder aktive</small>
          </div>
        </div>

        <div class="stats" aria-label="Explorer konfigurationsoversigt">
          <span><strong>${e.roomCount}</strong> rum</span>
          <span><strong>${e.presenceCount}</strong> personer/objekter</span>
          <span><strong>${e.routeCount}</strong> routes</span>
          <span><strong>${e.nodeCount}</strong> nodes</span>
          <span><strong>${e.reactionCount}</strong> reaktioner</span>
          <span><strong>${e.actionCount}</strong> handlinger</span>
          <span><strong>${e.zoneCount}</strong> zoner</span>
        </div>

        <div class="checks">
          ${e.items.map((r) => this.renderItem(r))}
        </div>

        ${i.length ? h`
              <div class="entity-issues">
                <div class="issue-heading">
                  <strong>Live entity-status</strong>
                  <small>${e.entityIssues.length} med opmærksomhed</small>
                </div>
                ${i.map((r) => h`
                  <button type="button" @click=${() => this.navigate(r.target)}>
                    <span class=${r.unavailable ? "temporary" : "missing"}>
                      ${r.unavailable ? "Midlertidig" : "Mangler"}
                    </span>
                    <code>${r.entity}</code>
                    <small>${r.source}</small>
                    <span aria-hidden="true">›</span>
                  </button>
                `)}
                ${e.entityIssues.length > i.length ? h`<small class="more">+ ${e.entityIssues.length - i.length} flere</small>` : f}
              </div>
            ` : f}

        <div class="tip">
          <strong>Tip:</strong>
          De avancerede værktøjer er nu samlet i fold-ud-sektioner. Klik på et punkt ovenfor for at hoppe direkte til den rigtige editor.
        </div>
      </section>
    `;
  }
};
tt.styles = I`
    :host { display:block; }
    .overview {
      display:grid;
      gap:14px;
      margin-bottom:12px;
      padding:16px;
      border:1px solid var(--divider-color);
      border-radius:14px;
      background:var(--card-background-color);
    }
    .hero { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; }
    .hero > div:first-child { display:grid; gap:4px; }
    .eyebrow { color:var(--secondary-text-color); font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; }
    h3 { margin:0; font-size:1.08rem; }
    p { margin:2px 0 0; max-width:62ch; color:var(--secondary-text-color); font-size:.86rem; line-height:1.45; }
    .health { flex:0 0 auto; display:grid; justify-items:end; gap:2px; padding:9px 11px; border-radius:10px; }
    .health strong { font-size:.9rem; }
    .health small { font-size:.72rem; opacity:.78; }
    .health.healthy { color:var(--success-color,#2e7d32); background:color-mix(in srgb,var(--success-color,#43a047) 12%,transparent); }
    .health.attention { color:var(--warning-color,#b26a00); background:color-mix(in srgb,var(--warning-color,#ff9800) 14%,transparent); }
    .stats { display:flex; flex-wrap:wrap; gap:7px; }
    .stats span { padding:5px 8px; border-radius:999px; background:var(--secondary-background-color); color:var(--secondary-text-color); font-size:.76rem; }
    .stats strong { color:var(--primary-text-color); }
    .checks { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
    .check {
      display:grid;
      grid-template-columns:auto minmax(0,1fr) auto auto;
      align-items:center;
      gap:9px;
      width:100%;
      padding:10px;
      border:1px solid var(--divider-color);
      border-radius:10px;
      color:var(--primary-text-color);
      background:var(--secondary-background-color);
      text-align:left;
      font:inherit;
      cursor:pointer;
    }
    .check:hover { border-color:var(--primary-color,#03a9f4); }
    .state-icon { display:grid; place-items:center; width:24px; height:24px; border-radius:50%; font-weight:800; }
    .ready .state-icon { color:var(--success-color,#43a047); background:color-mix(in srgb,var(--success-color,#43a047) 14%,transparent); }
    .attention .state-icon { color:var(--warning-color,#f57c00); background:color-mix(in srgb,var(--warning-color,#ff9800) 16%,transparent); }
    .optional .state-icon { color:var(--secondary-text-color); background:var(--card-background-color); }
    .check-copy { display:grid; gap:2px; min-width:0; }
    .check-copy strong { font-size:.84rem; }
    .check-copy small { overflow:hidden; color:var(--secondary-text-color); font-size:.74rem; line-height:1.3; text-overflow:ellipsis; }
    .state-label { padding:3px 6px; border-radius:999px; color:var(--secondary-text-color); background:var(--card-background-color); font-size:.68rem; white-space:nowrap; }
    .chevron { color:var(--secondary-text-color); font-size:1.15rem; }
    .entity-issues { display:grid; gap:6px; padding:10px; border-radius:10px; background:var(--secondary-background-color); }
    .issue-heading { display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .issue-heading strong { font-size:.82rem; }
    .issue-heading small, .more { color:var(--secondary-text-color); font-size:.72rem; }
    .entity-issues button { display:grid; grid-template-columns:auto minmax(0,1fr) minmax(0,.8fr) auto; align-items:center; gap:8px; padding:7px 8px; border:0; border-radius:8px; color:var(--primary-text-color); background:var(--card-background-color); text-align:left; cursor:pointer; }
    .entity-issues button:hover { outline:1px solid var(--primary-color,#03a9f4); }
    .entity-issues code { overflow:hidden; text-overflow:ellipsis; font-size:.75rem; }
    .entity-issues button small { overflow:hidden; color:var(--secondary-text-color); font-size:.72rem; text-overflow:ellipsis; white-space:nowrap; }
    .missing, .temporary { padding:3px 5px; border-radius:999px; font-size:.65rem; font-weight:700; }
    .missing { color:var(--error-color,#c62828); background:color-mix(in srgb,var(--error-color,#db4437) 12%,transparent); }
    .temporary { color:var(--warning-color,#b26a00); background:color-mix(in srgb,var(--warning-color,#ff9800) 12%,transparent); }
    .tip { padding:9px 10px; border-radius:9px; color:var(--secondary-text-color); background:color-mix(in srgb,var(--primary-color,#03a9f4) 7%,transparent); font-size:.78rem; line-height:1.4; }
    .tip strong { color:var(--primary-text-color); }

    @media (max-width:700px) {
      .hero { align-items:stretch; flex-direction:column; }
      .health { justify-items:start; }
      .checks { grid-template-columns:1fr; }
      .entity-issues button { grid-template-columns:auto minmax(0,1fr) auto; }
      .entity-issues button small { grid-column:2; }
    }
  `;
ni([
  A({ attribute: !1 })
], tt.prototype, "config", 2);
ni([
  A({ attribute: !1 })
], tt.prototype, "hass", 2);
tt = ni([
  R("ha-explorer-setup-overview")
], tt);
var Co = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, hr = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Eo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Co(t, i, n), n;
};
const Ot = [["classic", "Classic", "Den neutrale Home Assistant Explorer-stil."], ["enchanted_antique", "Enchanted Antique Map", "Original magisk kortstil med pergament, sepia-blæk og levende kortdetaljer."]];
let xt = class extends D {
  get theme() {
    return this.config?.appearance?.theme ?? "classic";
  }
  get dayNight() {
    return { enabled: this.config?.appearance?.day_night?.enabled ?? !1, mode: this.config?.appearance?.day_night?.mode ?? "auto", sun_entity: this.config?.appearance?.day_night?.sun_entity ?? "sun.sun", night_states: this.config?.appearance?.day_night?.night_states ?? ["below_horizon"], intensity: this.config?.appearance?.day_night?.intensity ?? 0.72 };
  }
  get compass() {
    return { visible: this.config?.appearance?.compass?.visible ?? !0, rotation: this.config?.appearance?.compass?.rotation ?? -7, size: this.config?.appearance?.compass?.size ?? 1 };
  }
  get alarm() {
    return { enabled: this.config?.appearance?.alarm?.enabled ?? !1, entity: this.config?.appearance?.alarm?.entity ?? "", armed_states: this.config?.appearance?.alarm?.armed_states ?? ["armed_away", "armed_home", "armed_night", "armed_vacation", "armed_custom_bypass"], triggered_states: this.config?.appearance?.alarm?.triggered_states ?? ["triggered"], intensity: this.config?.appearance?.alarm?.intensity ?? 0.75 };
  }
  get occupancy() {
    return { enabled: this.config?.appearance?.occupancy?.enabled ?? !1, home_states: this.config?.appearance?.occupancy?.home_states ?? ["home"], intensity: this.config?.appearance?.occupancy?.intensity ?? 0.65 };
  }
  get weather() {
    return { enabled: this.config?.appearance?.weather?.enabled ?? !1, entity: this.config?.appearance?.weather?.entity ?? "weather.home", intensity: this.config?.appearance?.weather?.intensity ?? 0.6, rain_states: this.config?.appearance?.weather?.rain_states ?? ["rainy", "pouring"], storm_states: this.config?.appearance?.weather?.storm_states ?? ["lightning", "lightning-rainy"], snow_states: this.config?.appearance?.weather?.snow_states ?? ["snowy", "snowy-rainy", "hail"], fog_states: this.config?.appearance?.weather?.fog_states ?? ["fog"], cloudy_states: this.config?.appearance?.weather?.cloudy_states ?? ["cloudy", "partlycloudy"] };
  }
  emit(e) {
    this.config && this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config, appearance: e } }, bubbles: !0, composed: !0 }));
  }
  updateTheme(e) {
    this.emit({ ...this.config?.appearance, theme: e });
  }
  updateDayNight(e) {
    this.emit({ ...this.config?.appearance, day_night: { ...this.dayNight, ...e } });
  }
  updateCompass(e) {
    this.emit({ ...this.config?.appearance, compass: { ...this.compass, ...e } });
  }
  updateAlarm(e) {
    this.emit({ ...this.config?.appearance, alarm: { ...this.alarm, ...e } });
  }
  updateOccupancy(e) {
    this.emit({ ...this.config?.appearance, occupancy: { ...this.occupancy, ...e } });
  }
  updateWeather(e) {
    this.emit({ ...this.config?.appearance, weather: { ...this.weather, ...e } });
  }
  updateSourceText(e) {
    this.emit({ ...this.config?.appearance, hide_source_text: e });
  }
  render() {
    if (!this.config) return f;
    const e = Ot.find((a) => a[0] === this.theme) ?? Ot[0], t = this.dayNight, i = this.compass, r = this.alarm, n = this.occupancy, o = this.weather, s = this.config.appearance?.hide_source_text ?? !1;
    return h`<section class="theme-editor"><div class="heading"><div><span>Appearance · v0.40</span><h3>Kortets visuelle stil</h3></div><b>Enchanted Atmosphere</b></div><div class="instruction">Bevar pergament, blæk og den magiske kortstil, mens atmosfære og ornamenter kan finjusteres.</div><label>Tema<select .value=${this.theme} @change=${(a) => this.updateTheme(a.target.value)}>${Ot.map((a) => h`<option value=${a[0]}>${a[1]}</option>`)}</select><small>${e[2]}</small></label><div class="source-panel"><div class="panel-head"><div><strong>🗺️ Tekst i plantegningen</strong><small>Skjul tekst, der allerede findes inde i SVG-plantegningen. Explorer-rumlabels bliver stadig vist.</small></div><label class="switch"><input type="checkbox" .checked=${s} @change=${(a) => this.updateSourceText(a.target.checked)}> Skjul</label></div></div>${this.theme === "enchanted_antique" ? h`<div class="compass-panel"><div class="panel-head"><div><strong>🧭 Kompasrose</strong><small>Drej kompasset så N peger mod den rigtige nordretning på din plantegning.</small></div><label class="switch"><input type="checkbox" .checked=${i.visible} @change=${(a) => this.updateCompass({ visible: a.target.checked })}> Vis</label></div>${i.visible ? h`<div class="grid"><label class="wide">Rotation · ${Math.round(i.rotation)}°<input type="range" min="-180" max="180" step="1" .value=${String(i.rotation)} @input=${(a) => this.updateCompass({ rotation: Number(a.target.value) })}><small>-180° til +180° · ændres direkte i preview.</small></label><label>Rotation i grader<input type="number" min="-180" max="180" step="1" .value=${String(i.rotation)} @change=${(a) => this.updateCompass({ rotation: Math.min(180, Math.max(-180, Number(a.target.value) || 0)) })}></label><label>Størrelse · ${Math.round(i.size * 100)}%<input type="range" min="0.55" max="1.8" step="0.05" .value=${String(i.size)} @input=${(a) => this.updateCompass({ size: Number(a.target.value) })}></label></div>` : f}</div>` : f}<div class="moon-panel"><div class="panel-head"><div><strong>🌙 Moonlight / Day-Night</strong><small>Skift automatisk til en mørkere kortstemning efter solnedgang.</small></div><label class="switch"><input type="checkbox" .checked=${t.enabled} @change=${(a) => this.updateDayNight({ enabled: a.target.checked })}> Aktiv</label></div>${t.enabled ? h`<div class="grid"><label>Tilstand<select .value=${t.mode} @change=${(a) => this.updateDayNight({ mode: a.target.value })}><option value="auto">Automatisk via solen</option><option value="day">Tving dag</option><option value="night">Tving nat</option></select></label>${t.mode === "auto" ? h`<label>Sol-entity<input .value=${t.sun_entity} @change=${(a) => this.updateDayNight({ sun_entity: a.target.value.trim() || "sun.sun" })}></label>` : f}<label class="wide">Nat-intensitet · ${Math.round(t.intensity * 100)}%<input type="range" min="0.25" max="1" step="0.05" .value=${String(t.intensity)} @input=${(a) => this.updateDayNight({ intensity: Number(a.target.value) })}></label></div>` : f}</div><div class="weather-panel"><div class="panel-head"><div><strong>🌧️ Weather Atmosphere</strong><small>Lad vejret udenfor påvirke pergamentkortets stemning.</small></div><label class="switch"><input type="checkbox" .checked=${o.enabled} @change=${(a) => this.updateWeather({ enabled: a.target.checked })}> Aktiv</label></div>${o.enabled ? h`<div class="grid"><label class="wide">Weather-entity<input .value=${o.entity} placeholder="weather.home" @change=${(a) => this.updateWeather({ entity: a.target.value.trim() || "weather.home" })}><small>Home Assistant weather.* entity, fx weather.forecast_home.</small></label><label class="wide">Vejr-intensitet · ${Math.round(o.intensity * 100)}%<input type="range" min="0.25" max="1" step="0.05" .value=${String(o.intensity)} @input=${(a) => this.updateWeather({ intensity: Number(a.target.value) })}><small>Styrer hvor tydeligt regn, storm, sne, tåge og skyer vises.</small></label><div class="state-box wide"><strong>Automatiske vejrstates</strong><small>🌧️ ${o.rain_states.join(", ")} · ⛈️ ${o.storm_states.join(", ")}</small><small>❄️ ${o.snow_states.join(", ")} · 🌫️ ${o.fog_states.join(", ")} · ☁️ ${o.cloudy_states.join(", ")}</small></div></div>` : f}</div><div class="occupancy-panel"><div class="panel-head"><div><strong>🏠 Someone is Home</strong><small>Gør kortet varmere og mere levende, når en konfigureret person er hjemme.</small></div><label class="switch"><input type="checkbox" .checked=${n.enabled} @change=${(a) => this.updateOccupancy({ enabled: a.target.checked })}> Aktiv</label></div>${n.enabled ? h`<div class="grid"><label class="wide">Hjemme-intensitet · ${Math.round(n.intensity * 100)}%<input type="range" min="0.25" max="1" step="0.05" .value=${String(n.intensity)} @input=${(a) => this.updateOccupancy({ intensity: Number(a.target.value) })}><small>Styrer forskellen mellem Someone Home og Empty House.</small></label><div class="state-box wide"><strong>Hjemme-state</strong><small>${n.home_states.join(", ")} · Explorer bruger dine konfigurerede person-presences automatisk.</small></div></div>` : f}</div><div class="alarm-panel"><div class="panel-head"><div><strong>🛡️ Alarm State</strong><small>Lad kortets atmosfære følge et Home Assistant alarm_control_panel.</small></div><label class="switch"><input type="checkbox" .checked=${r.enabled} @change=${(a) => this.updateAlarm({ enabled: a.target.checked })}> Aktiv</label></div>${r.enabled ? h`<div class="grid"><label class="wide">Alarm-entity<input .value=${r.entity} placeholder="alarm_control_panel.home" @change=${(a) => this.updateAlarm({ entity: a.target.value.trim() })}><small>Vælg entity-id'et for dit alarmsystem.</small></label><label class="wide">Alarm-intensitet · ${Math.round(r.intensity * 100)}%<input type="range" min="0.25" max="1" step="0.05" .value=${String(r.intensity)} @input=${(a) => this.updateAlarm({ intensity: Number(a.target.value) })}><small>Styrer hvor kraftig armed/triggered-atmosfæren bliver.</small></label><div class="state-box wide"><strong>Automatiske states</strong><small>Armed: ${r.armed_states.join(", ")}</small><small>Triggered: ${r.triggered_states.join(", ")}</small></div></div>` : f}</div></section>`;
  }
};
xt.styles = I`:host{display:block}.theme-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading,.panel-head{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.88rem;line-height:1.45}label{display:grid;gap:6px;font-size:.86rem}select,input{box-sizing:border-box;width:100%;padding:10px;border:1px solid var(--divider-color);border-radius:9px;background:var(--card-background-color);color:var(--primary-text-color)}label small,.panel-head small,.state-box small{color:var(--secondary-text-color)}.moon-panel,.compass-panel,.source-panel,.alarm-panel,.occupancy-panel,.weather-panel{padding:13px;border:1px solid var(--divider-color);border-radius:12px;background:color-mix(in srgb,var(--secondary-background-color) 65%,transparent)}.panel-head>div,.state-box{display:grid;gap:3px}.switch{display:flex;align-items:center;gap:7px;white-space:nowrap}.switch input{width:auto}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.wide{grid-column:1/-1}.state-box{padding:10px 12px;border-radius:9px;background:var(--card-background-color);font-size:.8rem}@media(max-width:600px){.grid{grid-template-columns:1fr}.wide{grid-column:auto}.panel-head{align-items:flex-start}}`;
hr([
  A({ attribute: !1 })
], xt.prototype, "config", 2);
xt = hr([
  R("ha-explorer-theme-editor")
], xt);
var Po = Object.defineProperty, No = Object.getOwnPropertyDescriptor, ur = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? No(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Po(t, i, n), n;
};
const Bi = { person: "Person · skoaftryk", pet: "Kæledyr · poteaftryk", robot: "Robot · hjulspor", vehicle: "Køretøj · dobbelte hjulspor", object: "Objekt · magisk spor" };
let wt = class extends D {
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  updatePresence(e, t) {
    if (!this.config) return;
    const i = [...this.config.presences ?? []], r = i[e];
    r && (i[e] = { ...r, ...t }, this.emitConfig({ ...this.config, presences: i }));
  }
  updateOptionalText(e, t, i) {
    const r = i.trim();
    this.updatePresence(e, { [t]: r || void 0 });
  }
  updateTrailDuration(e, t) {
    const i = Number(t);
    this.updatePresence(e, { trail_duration: Number.isFinite(i) ? Math.min(60, Math.max(1, i)) : void 0 });
  }
  render() {
    const e = this.config?.presences ?? [];
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Multi-person & Object Polish · Trail Controls</span><h3>Visuel profil for personer & objekter</h3></div><span class="count">${e.length}</span></div><p class="intro">Personer og objekter på samme position spredes automatisk omkring deres room-anchor. Markør og bevægelsesspor kan nu tilpasses uafhængigt af hinanden.</p>${e.length ? h`<div class="profiles">${e.map((t, i) => {
      const r = t.type ?? "person";
      return h`<article class="profile"><div class="profile-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><span class="type-badge">${Bi[r]}</span></div><div class="grid two"><label>Farve (valgfri)<input .value=${t.color ?? ""} placeholder="Automatisk stabil farve" @change=${(n) => this.updateOptionalText(i, "color", n.target.value)}/><small>Farven på selve markøren. Tom = automatisk.</small></label><label>Ikon (valgfri)<input .value=${t.icon ?? ""} placeholder="Automatisk type-ikon" maxlength="8" @change=${(n) => this.updateOptionalText(i, "icon", n.target.value)}/><small>Bruges i den store markør; type-badget vises stadig.</small></label></div><label class="toggle"><input type="checkbox" .checked=${t.visible !== !1} @change=${(n) => this.updatePresence(i, { visible: n.target.checked })}/><span><strong>Vis på kortet</strong><small>Skjuler markøren manuelt; tracking-konfigurationen bevares.</small></span></label><div class="trail-box"><div class="trail-heading"><strong>👣 Bevægelsesspor</strong><small>${Bi[r]}</small></div><label class="toggle"><input type="checkbox" .checked=${t.trail_visible !== !1} @change=${(n) => this.updatePresence(i, { trail_visible: n.target.checked })}/><span><strong>Vis spor</strong><small>Kan slås fra uden at skjule personen eller objektet.</small></span></label><div class="grid two"><label>Sporfarve (valgfri)<input .value=${t.trail_color ?? ""} placeholder="Samme som markør" @change=${(n) => this.updateOptionalText(i, "trail_color", n.target.value)}/><small>Fx #4b301d. Tom = markørens farve.</small></label><label>Varighed (sekunder)<input type="number" min="1" max="60" step="1" .value=${String(t.trail_duration ?? 4.2)} @change=${(n) => this.updateTrailDuration(i, n.target.value)}/><small>Hvor længe sporene falmer på kortet. 1–60 sek.</small></label></div></div></article>`;
    })}</div>` : h`<div class="empty">Tilføj først en person eller et objekt i sektionen ovenfor.</div>`}${e.length ? h`<div class="note">Sportypen vælges automatisk efter type. Reduced Motion deaktiverer bevægelsesspor, men markørerne forbliver synlige.</div>` : f}</section>`;
  }
};
wt.styles = I`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.heading,.profile-heading,.trail-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.heading>div,.profile-heading>div{display:grid;gap:3px}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:0;font-size:1rem}.count,.type-badge{border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);white-space:nowrap}.count{padding:5px 9px;font-size:.78rem}.type-badge{padding:4px 8px;font-size:.72rem}.intro,.note{margin:0;color:var(--secondary-text-color);font-size:.86rem;line-height:1.45}.profiles{display:grid;gap:10px}.profile{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.profile-heading small,label small,.toggle small,.trail-heading small{color:var(--secondary-text-color);font-size:.76rem;font-weight:400;line-height:1.35}.grid{display:grid;gap:10px}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}label{display:grid;gap:6px;font-weight:600}input[type="text"],input:not([type]),input[type="number"]{box-sizing:border-box;width:100%;min-width:0;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:9px;padding-top:2px}.toggle input{margin-top:3px}.toggle span{display:grid;gap:2px}.trail-box{display:grid;gap:11px;padding:12px;border:1px dashed var(--divider-color);border-radius:9px;background:var(--card-background-color)}.trail-heading{align-items:center}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}.empty{color:var(--secondary-text-color);text-align:center;font-size:.84rem}@media(max-width:600px){.grid.two{grid-template-columns:1fr}.heading,.profile-heading{align-items:flex-start}.type-badge{white-space:normal;text-align:right}}`;
ur([
  A({ attribute: !1 })
], wt.prototype, "config", 2);
wt = ur([
  R("ha-explorer-presence-polish-editor")
], wt);
var Ro = Object.defineProperty, Mo = Object.getOwnPropertyDescriptor, oi = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Mo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ro(t, i, n), n;
};
function jt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function zo(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let it = class extends D {
  emit(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  get entities() {
    return Object.values(this.hass?.states ?? {}).sort((e, t) => jt(e).localeCompare(jt(t), "da"));
  }
  updatePresence(e, t) {
    if (!this.config) return;
    const i = [...this.config.presences ?? []];
    i[e] && (i[e] = { ...i[e], ...t }, this.emit({ ...this.config, presences: i }));
  }
  updateBinding(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { entity_binding: zo({ ...i.entity_binding, ...t }) });
  }
  addPerson() {
    if (!this.config) return;
    const e = [...this.config.presences ?? []];
    let t = 1;
    const i = new Set(e.map((r) => r.id));
    for (; i.has(`person_${t}`); ) t += 1;
    e.push({ id: `person_${t}`, name: `Person ${t}`, type: "person", visible: !0, entity_binding: {} }), this.emit({ ...this.config, presences: e });
  }
  removePerson(e) {
    if (!this.config) return;
    const t = [...this.config.presences ?? []];
    t.splice(e, 1), this.emit({ ...this.config, presences: t });
  }
  datalist(e) {
    return h`<datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${jt(t)}</option>`)}</datalist>`;
  }
  render() {
    const e = (this.config?.presences ?? []).filter((t) => (t.type ?? "person") === "person");
    return this.config ? h`<section class="panel"><div class="heading"><div><span class="eyebrow">Multi-Person & Identity · v0.36.1</span><h3>Hvem er hvor?</h3></div><button class="primary" @click=${this.addPerson}>+ Tilføj person</button></div><p class="intro">Identity Fusion adskiller personens identitet fra positionssensoren. Bind fx <code>person.marc</code> som profil og et Shelly/mmWave-target som live position. Flere personer kan være synlige og bevæge sig samtidig.</p>${e.length ? e.map((t) => {
      const i = (this.config?.presences ?? []).indexOf(t), r = t.entity_binding ?? {}, n = `identity-${i}`, o = `position-${i}`;
      return h`<article class="person-card"><div class="person-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><button class="danger" @click=${() => this.removePerson(i)}>Fjern</button></div><label>Navn på kortet<input .value=${t.name ?? ""} placeholder="Marc" @change=${(s) => this.updatePresence(i, { name: s.target.value.trim() || void 0 })}/></label><div class="grid two"><label>Identitets-entitet<input list=${n} .value=${r.entity ?? ""} placeholder="person.marc" @change=${(s) => this.updateBinding(i, { entity: s.target.value.trim() || void 0 })}/>${this.datalist(n)}<small>Leverer navn/avatar/status. Typisk en <code>person.*</code>-entity.</small></label><label>Live positions-entitet<input list=${o} .value=${r.position_entity ?? ""} placeholder="sensor.stue_presence_stuen_target_1" @change=${(s) => this.updateBinding(i, { position_entity: s.target.value.trim() || void 0 })}/>${this.datalist(o)}<small>Leverer X/Y. Hvis tom bruges identitets-entiteten som før.</small></label></div><div class="grid three"><label>Koordinatsystem<select .value=${r.coordinate_space ?? "normalized"} @change=${(s) => this.updateBinding(i, { coordinate_space: s.target.value })}><option value="normalized">Normalized 0–1</option><option value="meters">Hele kortet i meter</option><option value="room_meters">Rum i meter</option></select></label><label>X-attribut<input .value=${r.x_attribute ?? (r.coordinate_space === "room_meters" ? "map_x" : "")} placeholder="map_x" @change=${(s) => this.updateBinding(i, { x_attribute: s.target.value.trim() || void 0 })}/></label><label>Y-attribut<input .value=${r.y_attribute ?? (r.coordinate_space === "room_meters" ? "map_y" : "")} placeholder="map_y" @change=${(s) => this.updateBinding(i, { y_attribute: s.target.value.trim() || void 0 })}/></label></div><label>Rum til room_meters<select .value=${t.room_id ?? ""} @change=${(s) => this.updatePresence(i, { room_id: s.target.value || void 0 })}><option value="">Ingen</option>${(this.config?.rooms ?? []).map((s) => h`<option value=${s.id}>${s.name ?? s.id}</option>`)}</select><small>Alle targets i samme rum genbruger rummets 3-punktskalibrering.</small></label></article>`;
    }) : h`<div class="empty">Ingen personer er tilføjet endnu.</div>`}<div class="note">Første version binder identitet til et valgt target. En senere Identity Matching-del kan bevare navnet automatisk, hvis en mmWave-sensor bytter target-numre.</div></section>` : f;
  }
};
it.styles = I`:host{display:block;min-width:0;max-width:100%;container-type:inline-size}.panel,.person-card,.grid,label,.heading>div,.person-heading>div{min-width:0}.panel{display:grid;gap:14px;width:100%;max-width:100%;box-sizing:border-box;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color);overflow:hidden}.heading,.person-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;min-width:0}.heading>div,.person-heading>div{display:grid;gap:3px}.eyebrow{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:0;font-size:1rem}.intro,.note,small{color:var(--secondary-text-color);line-height:1.4;overflow-wrap:anywhere}.intro,.note{margin:0;font-size:.86rem}.person-card{display:grid;gap:12px;width:100%;max-width:100%;box-sizing:border-box;padding:14px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color);overflow:hidden}label{display:grid;gap:6px;font-weight:600;max-width:100%}.grid{display:grid;gap:10px;width:100%;max-width:100%}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr) minmax(0,.85fr)}input,select,button{box-sizing:border-box;max-width:100%;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}input,select{width:100%;min-width:0}input{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button{cursor:pointer}.primary{border-color:var(--primary-color);color:var(--primary-color);font-weight:700}.danger{color:var(--error-color,#db4437);flex:0 0 auto}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}code{font-size:.9em;overflow-wrap:anywhere}@container (max-width:560px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}.person-heading{align-items:center}}@container (max-width:390px){.panel{padding:12px}.person-card{padding:11px}.person-heading{flex-wrap:wrap}.person-heading .danger{margin-left:auto}}@media(max-width:700px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}}`;
oi([
  A({ attribute: !1 })
], it.prototype, "hass", 2);
oi([
  A({ attribute: !1 })
], it.prototype, "config", 2);
it = oi([
  R("ha-explorer-identity-editor")
], it);
var Io = Object.defineProperty, To = Object.getOwnPropertyDescriptor, ne = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? To(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Io(t, i, n), n;
};
const ye = 1e3, qi = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Advarsel" },
  { value: "danger", label: "Fare / alarm" },
  { value: "cleaning", label: "Rengøring" },
  { value: "restricted", label: "Begrænset område" }
];
function Fi(e) {
  return Math.min(1, Math.max(0, e));
}
function Oo(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "zone";
}
function Dt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function jo(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let Y = class extends D {
  constructor() {
    super(...arguments), this.selectedZoneId = "", this.drawing = !1, this.pendingPoints = [], this.draftName = "Ny zone", this.draftKind = "info", this.draftEntity = "", this.draftStates = "on", this.draftVisible = !0;
  }
  get zones() {
    return this.config?.zones ?? [];
  }
  get selectedZone() {
    return this.zones.find((e) => e.id === this.selectedZoneId);
  }
  get entities() {
    return Object.values(this.hass?.states ?? {}).sort(
      (e, t) => Dt(e).localeCompare(Dt(t), "da")
    );
  }
  updated(e) {
    e.has("config") && this.selectedZoneId && !this.selectedZone && (this.selectedZoneId = "", this.drawing = !1, this.pendingPoints = []);
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    }));
  }
  mapPoint(e) {
    const i = e.currentTarget.getBoundingClientRect();
    return !i.width || !i.height ? [0.5, 0.5] : [
      Fi((e.clientX - i.left) / i.width),
      Fi((e.clientY - i.top) / i.height)
    ];
  }
  handleMapClick(e) {
    this.drawing && (this.pendingPoints = [...this.pendingPoints, this.mapPoint(e)]);
  }
  uniqueZoneId(e) {
    const t = Oo(e), i = new Set(this.zones.map((n) => n.id));
    if (!i.has(t)) return t;
    let r = 2;
    for (; i.has(`${t}_${r}`); ) r += 1;
    return `${t}_${r}`;
  }
  beginNew() {
    this.selectedZoneId = "", this.drawing = !0, this.pendingPoints = [], this.draftName = `Zone ${this.zones.length + 1}`, this.draftKind = "info", this.draftEntity = "", this.draftStates = "on", this.draftVisible = !0;
  }
  selectZone(e) {
    this.selectedZoneId = e.id, this.drawing = !1, this.pendingPoints = [], this.draftName = e.name ?? e.id, this.draftKind = e.kind ?? "info", this.draftEntity = e.state_binding?.entity ?? "", this.draftStates = (e.state_binding?.active_states ?? ["on"]).join(", "), this.draftVisible = e.visible !== !1;
  }
  beginRedraw() {
    this.selectedZone && (this.drawing = !0, this.pendingPoints = []);
  }
  cancelDrawing() {
    this.drawing = !1, this.pendingPoints = [];
  }
  undoPoint() {
    this.pendingPoints = this.pendingPoints.slice(0, -1);
  }
  zoneFromDraft(e, t) {
    const i = this.draftEntity.trim();
    return {
      id: e,
      name: this.draftName.trim() || e,
      points: t,
      kind: this.draftKind,
      visible: this.draftVisible,
      ...i ? {
        state_binding: {
          entity: i,
          active_states: jo(this.draftStates)
        }
      } : {}
    };
  }
  saveNew() {
    if (!this.config || this.selectedZone || this.pendingPoints.length < 3) return;
    const e = this.uniqueZoneId(this.draftName.trim() || "zone"), t = this.zoneFromDraft(e, this.pendingPoints);
    this.selectedZoneId = e, this.drawing = !1, this.pendingPoints = [], this.emitConfig({ ...this.config, zones: [...this.zones, t] });
  }
  saveExisting() {
    if (!this.config || !this.selectedZone) return;
    const e = this.drawing && this.pendingPoints.length >= 3 ? this.pendingPoints : this.selectedZone.points, t = this.zoneFromDraft(this.selectedZone.id, e), i = this.zones.map((r) => r.id === t.id ? t : r);
    this.drawing = !1, this.pendingPoints = [], this.emitConfig({ ...this.config, zones: i });
  }
  deleteSelected() {
    if (!this.config || !this.selectedZone) return;
    const e = this.selectedZone.id, t = this.zones.filter((i) => i.id !== e);
    this.selectedZoneId = "", this.drawing = !1, this.pendingPoints = [], this.emitConfig({ ...this.config, zones: t });
  }
  statusText(e) {
    const t = dr(e, (i) => this.hass?.states[i]?.state);
    return e.visible === !1 ? "Skjult manuelt" : t.conditional ? t.active ? `Aktiv · ${t.currentState ?? "ukendt"}` : t.reason === "missing_entity" ? "Entity mangler" : t.reason === "entity_unavailable" ? `Utilgængelig · ${t.currentState}` : `Inaktiv · ${t.currentState ?? "ukendt"}` : "Altid aktiv";
  }
  renderZonePolygon(e) {
    const t = e.points.map(([r, n]) => `${r * ye},${n * ye}`).join(" "), i = e.id === this.selectedZoneId;
    return C`
      <g class=${i ? "zone selected" : "zone"} @click=${(r) => {
      this.drawing || (r.stopPropagation(), this.selectZone(e));
    }}>
        <polygon points=${t}></polygon>
        ${e.name ? C`<text x=${e.points.reduce((r, n) => r + n[0], 0) / e.points.length * ye} y=${e.points.reduce((r, n) => r + n[1], 0) / e.points.length * ye} text-anchor="middle">${e.name}</text>` : f}
      </g>
    `;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * ye},${i * ye}`).join(" ");
    return C`
      ${this.pendingPoints.length >= 3 ? C`<polygon class="pending-fill" points=${e}></polygon>` : f}
      <polyline class="pending-line" points=${e}></polyline>
      ${this.pendingPoints.map(([t, i], r) => C`
        <g transform=${`translate(${t * ye} ${i * ye})`}>
          <circle class="pending-point" r="12"></circle>
          <text class="point-number" y="-20" text-anchor="middle">${r + 1}</text>
        </g>
      `)}
    `;
  }
  renderForm() {
    if (!this.drawing && !this.selectedZone) return f;
    const e = "explorer-zone-entities";
    return h`
      <div class="form-grid">
        <label>
          Navn
          <input .value=${this.draftName} @input=${(t) => this.draftName = t.target.value} />
        </label>
        <label>
          Zonetype
          <select .value=${this.draftKind} @change=${(t) => this.draftKind = t.target.value}>
            ${qi.map((t) => h`<option value=${t.value}>${t.label}</option>`)}
          </select>
        </label>
        <label class="wide">
          Home Assistant entity · valgfri
          <input list=${e} .value=${this.draftEntity} placeholder="input_boolean.alarm_zone" @change=${(t) => this.draftEntity = t.target.value} />
          <datalist id=${e}>
            ${this.entities.map((t) => h`<option value=${t.entity_id}>${Dt(t)}</option>`)}
          </datalist>
          <small>Tom = zonen er altid aktiv. Med entity vises zonen kun i de valgte states.</small>
        </label>
        <label>
          Aktiv state(s)
          <input .value=${this.draftStates} placeholder="on" @change=${(t) => this.draftStates = t.target.value} />
          <small>Kommasepareret, fx on, triggered.</small>
        </label>
        <label class="toggle">
          <input type="checkbox" .checked=${this.draftVisible} @change=${(t) => this.draftVisible = t.target.checked} />
          Zone aktiveret
        </label>
      </div>
    `;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.drawing && !this.selectedZone, i = this.drawing && !!this.selectedZone;
    return h`
      <section class="panel">
        <div class="heading">
          <div>
            <span class="eyebrow">Zones / Dynamic Areas · v0.23</span>
            <h3>Dynamiske zoner</h3>
            <p>Tegn områder på kortet og lad dem være faste eller følge en Home Assistant-entity.</p>
          </div>
          <span class="count">${this.zones.length} zoner</span>
        </div>

        <div class="workspace">
          <div class="map-wrap">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}>
              <rect width="1000" height="1000" class="backdrop"></rect>
              ${e ? C`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}
              ${this.zones.map((r) => this.renderZonePolygon(r))}
              ${this.renderPending()}
            </svg>
            ${this.drawing ? h`<div class="map-help">Klik rundt langs zonens kant · ${this.pendingPoints.length} punkter</div>` : f}
          </div>

          <div class="sidebar">
            <button class="primary" @click=${this.beginNew} ?disabled=${t}>+ Ny zone</button>
            ${this.zones.length ? h`
              <div class="zone-list">
                ${this.zones.map((r) => h`
                  <button class=${r.id === this.selectedZoneId ? "zone-row selected" : "zone-row"} @click=${() => this.selectZone(r)}>
                    <span><strong>${r.name ?? r.id}</strong><small>${qi.find((n) => n.value === (r.kind ?? "info"))?.label}</small></span>
                    <em>${this.statusText(r)}</em>
                  </button>
                `)}
              </div>
            ` : h`<div class="empty">Ingen zoner endnu.</div>`}
          </div>
        </div>

        ${this.renderForm()}

        ${t ? h`
          <div class="actions">
            <button @click=${this.undoPoint} ?disabled=${!this.pendingPoints.length}>Fortryd punkt</button>
            <button @click=${this.cancelDrawing}>Annuller</button>
            <button class="primary" @click=${this.saveNew} ?disabled=${this.pendingPoints.length < 3}>Gem zone</button>
          </div>
        ` : this.selectedZone ? h`
          <div class="actions">
            ${i ? h`<button @click=${this.undoPoint} ?disabled=${!this.pendingPoints.length}>Fortryd punkt</button><button @click=${this.cancelDrawing}>Annuller ny geometri</button>` : h`<button @click=${this.beginRedraw}>Tegn zone om</button>`}
            <button class="danger" @click=${this.deleteSelected}>Slet zone</button>
            <button class="primary" @click=${this.saveExisting} ?disabled=${i && this.pendingPoints.length < 3}>Gem zone</button>
          </div>
        ` : f}

        <div class="note">I v0.23 er zoner visuelle. De ændrer ikke automatisk routing; den kobling kan tilføjes senere uden at ændre zonedata.</div>
      </section>
    `;
  }
};
Y.styles = I`
    :host { display:block; margin-top:16px; color:var(--primary-text-color); }
    .panel { border:1px solid var(--divider-color,#d7dbe0); border-radius:14px; padding:16px; background:var(--card-background-color,#fff); }
    .heading { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; }
    .eyebrow { font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:var(--secondary-text-color); }
    h3 { margin:4px 0 4px; font-size:1.05rem; }
    p { margin:0; color:var(--secondary-text-color); font-size:.86rem; }
    .count { padding:5px 9px; border-radius:999px; background:var(--secondary-background-color,#f2f4f7); font-size:.75rem; white-space:nowrap; }
    .workspace { display:grid; grid-template-columns:minmax(0,1.7fr) minmax(190px,.8fr); gap:14px; margin-top:14px; }
    .map-wrap { position:relative; min-height:300px; border-radius:12px; overflow:hidden; border:1px solid var(--divider-color,#d7dbe0); background:#d8c9a7; }
    svg { width:100%; height:100%; min-height:300px; display:block; cursor:crosshair; }
    .backdrop { fill:#d8c9a7; }
    .zone { cursor:pointer; pointer-events:all; }
    .zone polygon { fill:var(--primary-color,#03a9f4); fill-opacity:.10; stroke:var(--primary-color,#03a9f4); stroke-width:3; vector-effect:non-scaling-stroke; }
    .zone.selected polygon { fill-opacity:.20; stroke-width:5; }
    .zone text { fill:var(--primary-text-color,#1f2937); stroke:rgba(255,255,255,.9); stroke-width:5; paint-order:stroke; font-size:22px; font-weight:700; pointer-events:none; }
    .pending-fill { fill:var(--accent-color,#7e57c2); fill-opacity:.16; stroke:none; }
    .pending-line { fill:none; stroke:var(--accent-color,#7e57c2); stroke-width:5; stroke-dasharray:12 8; vector-effect:non-scaling-stroke; }
    .pending-point { fill:var(--accent-color,#7e57c2); stroke:white; stroke-width:3; vector-effect:non-scaling-stroke; }
    .point-number { fill:var(--primary-text-color); stroke:white; stroke-width:4; paint-order:stroke; font-size:18px; font-weight:800; }
    .map-help { position:absolute; left:10px; bottom:10px; padding:6px 9px; border-radius:8px; background:rgba(255,255,255,.88); color:#344054; font-size:.75rem; pointer-events:none; }
    .sidebar { display:flex; flex-direction:column; gap:10px; min-width:0; }
    button { border:1px solid var(--divider-color,#cfd4da); border-radius:9px; padding:9px 11px; background:var(--card-background-color,#fff); color:var(--primary-text-color); cursor:pointer; text-align:left; }
    button:disabled { opacity:.45; cursor:not-allowed; }
    button.primary { background:var(--primary-color,#03a9f4); color:white; border-color:transparent; text-align:center; font-weight:700; }
    button.danger { color:var(--error-color,#db4437); }
    .zone-list { display:flex; flex-direction:column; gap:7px; max-height:330px; overflow:auto; }
    .zone-row { display:flex; justify-content:space-between; gap:8px; align-items:center; width:100%; }
    .zone-row.selected { border-color:var(--primary-color); box-shadow:0 0 0 1px var(--primary-color); }
    .zone-row span { display:flex; flex-direction:column; min-width:0; }
    .zone-row strong { overflow:hidden; text-overflow:ellipsis; }
    .zone-row small, .zone-row em { color:var(--secondary-text-color); font-size:.68rem; font-style:normal; }
    .zone-row em { text-align:right; }
    .empty { padding:12px; border:1px dashed var(--divider-color); border-radius:10px; color:var(--secondary-text-color); font-size:.8rem; }
    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 12px; margin-top:14px; padding-top:14px; border-top:1px solid var(--divider-color,#d7dbe0); }
    label { display:flex; flex-direction:column; gap:5px; font-size:.78rem; font-weight:650; }
    label.wide { grid-column:1 / -1; }
    label.toggle { flex-direction:row; align-items:center; align-self:end; padding-bottom:8px; }
    input, select { box-sizing:border-box; width:100%; border:1px solid var(--divider-color,#cfd4da); border-radius:8px; padding:8px 9px; background:var(--card-background-color,#fff); color:var(--primary-text-color); }
    label small { color:var(--secondary-text-color); font-weight:400; }
    .actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; margin-top:12px; }
    .actions button { text-align:center; }
    .note { margin-top:12px; padding:9px 11px; border-radius:9px; background:var(--secondary-background-color,#f3f5f7); color:var(--secondary-text-color); font-size:.75rem; }
    @media (max-width:700px) { .workspace { grid-template-columns:1fr; } .form-grid { grid-template-columns:1fr; } label.wide { grid-column:auto; } }
  `;
ne([
  A({ attribute: !1 })
], Y.prototype, "hass", 2);
ne([
  A({ attribute: !1 })
], Y.prototype, "config", 2);
ne([
  b()
], Y.prototype, "selectedZoneId", 2);
ne([
  b()
], Y.prototype, "drawing", 2);
ne([
  b()
], Y.prototype, "pendingPoints", 2);
ne([
  b()
], Y.prototype, "draftName", 2);
ne([
  b()
], Y.prototype, "draftKind", 2);
ne([
  b()
], Y.prototype, "draftEntity", 2);
ne([
  b()
], Y.prototype, "draftStates", 2);
ne([
  b()
], Y.prototype, "draftVisible", 2);
Y = ne([
  R("ha-explorer-zones-editor")
], Y);
var Do = Object.defineProperty, Lo = Object.getOwnPropertyDescriptor, K = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Lo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Do(t, i, n), n;
};
const Ne = 1e3, Vi = ["on", "open", "opened", "true"];
function Hi(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function Bo(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "opening";
}
function Lt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function qo(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let F = class extends D {
  constructor() {
    super(...arguments), this.selectedId = "", this.placing = !1, this.draftName = "Ny dør", this.draftKind = "door", this.draftPoint = [0.5, 0.5], this.draftAngle = 0, this.draftLength = 0.055, this.draftHinge = "start", this.draftSwing = "left", this.draftOpenAngle = 82, this.draftEntity = "", this.draftStates = "on, open", this.draftVisible = !0;
  }
  get openings() {
    return this.config?.openings ?? [];
  }
  get selected() {
    return this.openings.find((e) => e.id === this.selectedId);
  }
  get entities() {
    return Object.values(this.hass?.states ?? {}).filter((e) => e.entity_id.startsWith("binary_sensor.") || e.entity_id.startsWith("cover.") || e.entity_id.startsWith("input_boolean.") || e.entity_id.startsWith("sensor.")).sort((e, t) => Lt(e).localeCompare(Lt(t), "da"));
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  uniqueId(e) {
    const t = Bo(e), i = new Set(this.openings.map((n) => n.id));
    if (!i.has(t)) return t;
    let r = 2;
    for (; i.has(`${t}_${r}`); ) r++;
    return `${t}_${r}`;
  }
  mapPoint(e) {
    const t = e.currentTarget.getBoundingClientRect();
    return !t.width || !t.height ? [0.5, 0.5] : [Hi((e.clientX - t.left) / t.width, 0, 1), Hi((e.clientY - t.top) / t.height, 0, 1)];
  }
  handleMapClick(e) {
    this.placing && (this.draftPoint = this.mapPoint(e), this.placing = !1);
  }
  beginNew(e) {
    this.selectedId = "", this.draftKind = e, this.draftName = e === "door" ? `Dør ${this.openings.filter((t) => t.kind === "door").length + 1}` : `Vindue ${this.openings.filter((t) => t.kind === "window").length + 1}`, this.draftPoint = [0.5, 0.5], this.draftAngle = 0, this.draftLength = e === "door" ? 0.055 : 0.05, this.draftHinge = "start", this.draftSwing = "left", this.draftOpenAngle = 82, this.draftEntity = "", this.draftStates = "on, open", this.draftVisible = !0, this.placing = !0;
  }
  select(e) {
    this.selectedId = e.id, this.placing = !1, this.draftName = e.name ?? e.id, this.draftKind = e.kind, this.draftPoint = [...e.point], this.draftAngle = e.angle ?? 0, this.draftLength = e.length ?? (e.kind === "door" ? 0.055 : 0.05), this.draftHinge = e.hinge ?? "start", this.draftSwing = e.swing ?? "left", this.draftOpenAngle = e.open_angle ?? 82, this.draftEntity = e.state_binding?.entity ?? "", this.draftStates = (e.state_binding?.open_states ?? Vi).join(", "), this.draftVisible = e.visible !== !1;
  }
  openingFromDraft(e) {
    const t = this.draftEntity.trim();
    return { id: e, name: this.draftName.trim() || e, kind: this.draftKind, point: this.draftPoint, angle: this.draftAngle, length: this.draftLength, hinge: this.draftHinge, swing: this.draftSwing, open_angle: this.draftOpenAngle, visible: this.draftVisible, ...t ? { state_binding: { entity: t, open_states: qo(this.draftStates) } } : {} };
  }
  save() {
    if (!this.config) return;
    if (this.selected) {
      const t = this.openingFromDraft(this.selected.id);
      this.emitConfig({ ...this.config, openings: this.openings.map((i) => i.id === t.id ? t : i) });
      return;
    }
    const e = this.uniqueId(this.draftName);
    this.selectedId = e, this.emitConfig({ ...this.config, openings: [...this.openings, this.openingFromDraft(e)] });
  }
  deleteSelected() {
    if (!this.config || !this.selected) return;
    const e = this.selected.id;
    this.selectedId = "", this.emitConfig({ ...this.config, openings: this.openings.filter((t) => t.id !== e) });
  }
  stateText(e) {
    if (e.visible === !1) return "Skjult";
    if (!e.state_binding) return "Ingen entity";
    const t = this.hass?.states[e.state_binding.entity]?.state;
    return t ? `${(e.state_binding.open_states ?? Vi).map((r) => r.toLowerCase()).includes(t.toLowerCase()) ? "Åben" : "Lukket"} · ${t}` : "Entity mangler";
  }
  renderOpening(e) {
    const t = e.id === this.selectedId, i = e.point[0] * Ne, r = e.point[1] * Ne, n = (e.length ?? 0.055) * Ne, o = (e.angle ?? 0) * Math.PI / 180, s = Math.cos(o) * n / 2, a = Math.sin(o) * n / 2;
    return C`<g class=${t ? "opening selected" : "opening"} @click=${(l) => {
      this.placing || (l.stopPropagation(), this.select(e));
    }}><line x1=${i - s} y1=${r - a} x2=${i + s} y2=${r + a}></line><circle cx=${i} cy=${r} r=${t ? 11 : 8}></circle>${e.name ? C`<text x=${i} y=${r - 18} text-anchor="middle">${e.name}</text>` : f}</g>`;
  }
  renderDraft() {
    if (this.selected || !this.placing && this.draftName === "Ny dør") return f;
    const e = this.draftPoint[0] * Ne, t = this.draftPoint[1] * Ne, i = this.draftLength * Ne, r = this.draftAngle * Math.PI / 180, n = Math.cos(r) * i / 2, o = Math.sin(r) * i / 2;
    return C`<g class="opening draft"><line x1=${e - n} y1=${t - o} x2=${e + n} y2=${t + o}></line><circle cx=${e} cy=${t} r="11"></circle></g>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = !!this.selected || this.placing || this.draftName !== "Ny dør";
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Dynamic Doors & Windows · v0.38</span><h3>Døre og vinduer</h3><p>Placér åbninger direkte på plantegningen og bind dem til Home Assistant.</p></div><span class="count">${this.openings.length} åbninger</span></div><div class="toolbar"><button class="primary" @click=${() => this.beginNew("door")}>+ Ny dør</button><button @click=${() => this.beginNew("window")}>+ Nyt vindue</button></div><div class="workspace"><div class="map-wrap"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}><rect width="1000" height="1000" class="backdrop"></rect>${e ? C`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}${this.openings.map((i) => this.renderOpening(i))}${this.renderDraft()}</svg>${this.placing ? h`<div class="map-help">Klik på kortet hvor ${this.draftKind === "door" ? "døren" : "vinduet"} skal sidde</div>` : f}</div><div class="sidebar">${this.openings.length ? this.openings.map((i) => h`<button class=${i.id === this.selectedId ? "row selected" : "row"} @click=${() => this.select(i)}><span><strong>${i.name ?? i.id}</strong><small>${i.kind === "door" ? "Dør" : "Vindue"}</small></span><em>${this.stateText(i)}</em></button>`) : h`<div class="empty">Ingen døre eller vinduer endnu.</div>`}</div></div>${t ? this.renderForm() : f}</section>`;
  }
  renderForm() {
    const e = "explorer-opening-entities";
    return h`<div class="form-grid"><label>Navn<input .value=${this.draftName} @input=${(t) => this.draftName = t.target.value}></label><label>Type<select .value=${this.draftKind} @change=${(t) => this.draftKind = t.target.value}><option value="door">Dør</option><option value="window">Vindue</option></select></label><label>Vinkel · ${Math.round(this.draftAngle)}°<input type="range" min="0" max="359" step="1" .value=${String(this.draftAngle)} @input=${(t) => this.draftAngle = Number(t.target.value)}></label><label>Længde · ${Math.round(this.draftLength * 1e3) / 10}%<input type="range" min="0.025" max="0.14" step="0.0025" .value=${String(this.draftLength)} @input=${(t) => this.draftLength = Number(t.target.value)}></label>${this.draftKind === "door" ? h`<label>Hængsel<select .value=${this.draftHinge} @change=${(t) => this.draftHinge = t.target.value}><option value="start">Start</option><option value="end">Slut</option></select></label><label>Svingretning<select .value=${this.draftSwing} @change=${(t) => this.draftSwing = t.target.value}><option value="left">Venstre</option><option value="right">Højre</option></select></label><label>Åbningsvinkel · ${Math.round(this.draftOpenAngle)}°<input type="range" min="30" max="150" step="1" .value=${String(this.draftOpenAngle)} @input=${(t) => this.draftOpenAngle = Number(t.target.value)}></label>` : f}<label class="wide">Home Assistant entity · valgfri<input list=${e} .value=${this.draftEntity} placeholder="binary_sensor.stuedor" @change=${(t) => this.draftEntity = t.target.value}><datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${Lt(t)}</option>`)}</datalist><small>Vælg fx en dør-/vindueskontakt eller cover-entity.</small></label><label>Åben state(s)<input .value=${this.draftStates} placeholder="on, open" @change=${(t) => this.draftStates = t.target.value}><small>Kommasepareret.</small></label><label class="toggle"><input type="checkbox" .checked=${this.draftVisible} @change=${(t) => this.draftVisible = t.target.checked}>Vis på kortet</label><div class="actions wide"><button @click=${() => this.placing = !0}>Placér igen</button>${this.selected ? h`<button class="danger" @click=${this.deleteSelected}>Slet</button>` : f}<button class="primary" @click=${this.save} ?disabled=${this.placing}>Gem</button></div></div>`;
  }
};
F.styles = I`:host{display:block;margin-top:16px;color:var(--primary-text-color)}.panel{border:1px solid var(--divider-color,#d7dbe0);border-radius:14px;padding:16px;background:var(--card-background-color,#fff)}.heading{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:4px 0;font-size:1.05rem}p{margin:0;color:var(--secondary-text-color);font-size:.86rem}.count{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color,#f2f4f7);font-size:.75rem;white-space:nowrap}.toolbar{display:flex;gap:8px;margin-top:14px}.workspace{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(190px,.8fr);gap:14px;margin-top:12px}.map-wrap{position:relative;min-height:300px;border-radius:12px;overflow:hidden;border:1px solid var(--divider-color,#d7dbe0);background:#d8c9a7}svg{width:100%;height:100%;min-height:300px;display:block;cursor:crosshair}.backdrop{fill:#d8c9a7}.opening{cursor:pointer;pointer-events:all}.opening line{stroke:var(--primary-text-color,#1f2937);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}.opening circle{fill:var(--card-background-color,#fff);stroke:var(--primary-color,#03a9f4);stroke-width:4;vector-effect:non-scaling-stroke}.opening.selected line{stroke:var(--primary-color,#03a9f4);stroke-width:10}.opening.draft line{stroke-dasharray:12 8}.opening text{fill:var(--primary-text-color,#1f2937);stroke:white;stroke-width:5;paint-order:stroke;font-size:20px;font-weight:700;pointer-events:none}.map-help{position:absolute;left:10px;bottom:10px;padding:6px 9px;border-radius:8px;background:rgba(255,255,255,.9);color:#344054;font-size:.75rem;pointer-events:none}.sidebar{display:flex;flex-direction:column;gap:7px;max-height:330px;overflow:auto}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;width:100%}.row.selected{border-color:var(--primary-color);box-shadow:0 0 0 1px var(--primary-color)}.row span{display:flex;flex-direction:column}.row small,.row em{font-size:.68rem;color:var(--secondary-text-color);font-style:normal}.row em{text-align:right}.empty{padding:12px;border:1px dashed var(--divider-color);border-radius:10px;color:var(--secondary-text-color);font-size:.8rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;margin-top:14px;padding-top:14px;border-top:1px solid var(--divider-color)}label{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:650}.wide{grid-column:1/-1}.toggle{flex-direction:row;align-items:center;align-self:end;padding-bottom:8px}input,select{box-sizing:border-box;width:100%;border:1px solid var(--divider-color,#cfd4da);border-radius:8px;padding:8px 9px;background:var(--card-background-color,#fff);color:var(--primary-text-color)}input[type=range]{padding:4px 0}label small{color:var(--secondary-text-color);font-weight:400}.actions{display:flex;justify-content:flex-end;gap:8px}button{border:1px solid var(--divider-color,#cfd4da);border-radius:9px;padding:9px 11px;background:var(--card-background-color,#fff);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color,#03a9f4);color:white;border-color:transparent;font-weight:700}button.danger{color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:700px){.workspace,.form-grid{grid-template-columns:1fr}.wide{grid-column:auto}}`;
K([
  A({ attribute: !1 })
], F.prototype, "hass", 2);
K([
  A({ attribute: !1 })
], F.prototype, "config", 2);
K([
  b()
], F.prototype, "selectedId", 2);
K([
  b()
], F.prototype, "placing", 2);
K([
  b()
], F.prototype, "draftName", 2);
K([
  b()
], F.prototype, "draftKind", 2);
K([
  b()
], F.prototype, "draftPoint", 2);
K([
  b()
], F.prototype, "draftAngle", 2);
K([
  b()
], F.prototype, "draftLength", 2);
K([
  b()
], F.prototype, "draftHinge", 2);
K([
  b()
], F.prototype, "draftSwing", 2);
K([
  b()
], F.prototype, "draftOpenAngle", 2);
K([
  b()
], F.prototype, "draftEntity", 2);
K([
  b()
], F.prototype, "draftStates", 2);
K([
  b()
], F.prototype, "draftVisible", 2);
F = K([
  R("ha-explorer-openings-editor")
], F);
var Fo = Object.defineProperty, Vo = Object.getOwnPropertyDescriptor, oe = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Vo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Fo(t, i, n), n;
};
const Bt = { light: "Lampe / lys", motion: "Bevægelsessensor", media: "TV / media", opening: "Dør / vindue", temperature: "Temperatur", fireplace: "Pejs / ildsted" }, qt = { light: "✦", motion: "◉", media: "▶", opening: "↗", temperature: "°", fireplace: "🔥" }, Ft = (e) => Math.min(1, Math.max(0, e));
let U = class extends D {
  constructor() {
    super(...arguments), this.selectedRoomId = "", this.draftKind = "light", this.draftEntity = "", this.draftStates = "on", this.draftIntensity = 0.75, this.draftRadius = 90;
  }
  get rooms() {
    return this.config?.rooms ?? [];
  }
  get selectedRoom() {
    return this.rooms.find((e) => e.id === this.selectedRoomId);
  }
  updated(e) {
    e.has("config") && (this.selectedRoomId && this.selectedRoom || (this.selectedRoomId = this.rooms[0]?.id ?? "", this.cancelEdit()));
  }
  emit(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  updateSelectedRoom(e) {
    if (!this.config || !this.selectedRoom) return;
    const t = this.rooms.map((i) => i.id === this.selectedRoomId ? { ...i, reactions: e.length ? e : void 0 } : i);
    this.emit({ ...this.config, rooms: t });
  }
  parseStates(e) {
    return [...new Set(e.split(",").map((t) => t.trim()).filter(Boolean))];
  }
  state(e) {
    const t = this.hass?.states[e];
    return t ? { state: t.state, attributes: t.attributes } : void 0;
  }
  isDuplicate() {
    return !this.selectedRoom || !this.draftEntity.trim() ? !0 : (this.selectedRoom.reactions ?? []).some((e, t) => t !== this.editingIndex && e.kind === this.draftKind && e.entity.trim() === this.draftEntity.trim());
  }
  save() {
    if (!this.selectedRoom || !this.draftEntity.trim() || this.isDuplicate()) return;
    const e = this.parseStates(this.draftStates), t = { kind: this.draftKind, entity: this.draftEntity.trim(), ...this.draftKind === "temperature" || !e.length ? {} : { active_states: e }, ...this.draftPosition ? { position: { ...this.draftPosition } } : {}, ...this.draftKind === "fireplace" ? { intensity: Ft(this.draftIntensity), radius: Math.min(220, Math.max(30, this.draftRadius)) } : {} }, i = [...this.selectedRoom.reactions ?? []];
    this.editingIndex === void 0 ? i.push(t) : i[this.editingIndex] = t, this.updateSelectedRoom(i), this.cancelEdit();
  }
  beginEdit(e) {
    const t = this.selectedRoom, i = t?.reactions?.[e];
    !t || !i || (this.editingIndex = e, this.draftKind = i.kind, this.draftEntity = i.entity, this.draftStates = i.kind === "temperature" ? "" : (i.active_states?.length ? i.active_states : gt(i.kind)).join(", "), this.draftPosition = mt(t, i), this.draftIntensity = i.intensity ?? 0.75, this.draftRadius = i.radius ?? 90);
  }
  cancelEdit() {
    this.editingIndex = void 0, this.draftKind = "light", this.draftEntity = "", this.draftStates = gt("light").join(", "), this.draftPosition = void 0, this.draftIntensity = 0.75, this.draftRadius = 90;
  }
  removeReaction(e) {
    this.selectedRoom && (this.updateSelectedRoom((this.selectedRoom.reactions ?? []).filter((t, i) => i !== e)), this.editingIndex === e && this.cancelEdit());
  }
  changeKind(e) {
    this.draftKind = e, this.draftEntity = "", this.draftStates = e === "temperature" ? "" : gt(e).join(", "), e === "fireplace" && (this.draftIntensity = 0.75, this.draftRadius = 90);
  }
  options() {
    return this.hass ? Object.entries(this.hass.states).filter(([e, t]) => {
      if (this.draftKind === "light") return e.startsWith("light.");
      if (this.draftKind === "media") return e.startsWith("media_player.");
      if (this.draftKind === "motion" || this.draftKind === "opening") return e.startsWith("binary_sensor.");
      if (this.draftKind === "fireplace") return /^(light|switch|climate|input_boolean)\./.test(e);
      const i = t.attributes.unit_of_measurement, r = t.attributes.device_class;
      return e.startsWith("sensor.") && (r === "temperature" || typeof i == "string" && (i.includes("°C") || i.includes("°F")));
    }).map(([e, t]) => ({ id: e, label: typeof t.attributes.friendly_name == "string" ? t.attributes.friendly_name : e })).sort((e, t) => e.label.localeCompare(t.label, "da")) : [];
  }
  handlePreviewClick(e) {
    const t = e.currentTarget, i = t.getBoundingClientRect();
    !i.width || !i.height || (this.draftPosition = { x: Ft((e.clientX - i.left) / i.width), y: Ft((e.clientY - i.top) / i.height) });
  }
  preview(e) {
    const t = this.config?.image ?? this.config?.background ?? "", i = this.draftPosition ?? mt(e);
    return h`<div class="placement"><div><strong>Fysisk placering</strong><small>Klik på plantegningen dér hvor entity'en sidder.</small></div><div class="preview" @click=${this.handlePreviewClick}>${t ? h`<img src=${t} alt="">` : f}<svg viewBox="0 0 ${v} ${v}" preserveAspectRatio="none"><polygon points=${e.points.map(([r, n]) => `${r * v},${n * v}`).join(" ")}></polygon>${(e.reactions ?? []).map((r) => {
      const n = mt(e, r);
      return h`<g class="existing" transform=${`translate(${n.x * v} ${n.y * v})`}><circle r="13"></circle><text>${qt[r.kind]}</text></g>`;
    })}<g class="draft-point" transform=${`translate(${i.x * v} ${i.y * v})`}><circle r=${this.draftKind === "fireplace" ? "18" : "14"}></circle><text>${qt[this.draftKind]}</text></g></svg></div><small>${(i.x * 100).toFixed(1)} % / ${(i.y * 100).toFixed(1)} %</small></div>`;
  }
  statusLabel(e, t) {
    const i = sr(e, t, (r) => this.state(r));
    return e.kind === "temperature" && i.numericValue !== void 0 ? `${i.numericValue}${i.unit ? ` ${i.unit}` : "°"}` : i.active ? `Aktiv · ${i.currentState}` : `Inaktiv · ${i.currentState ?? "ukendt"}`;
  }
  render() {
    if (!this.config) return f;
    const e = this.selectedRoom, t = e?.reactions ?? [], i = this.options(), r = i.some((n) => n.id === this.draftEntity);
    return h`<section class="editor"><div class="heading"><div><span>Living Entity Points · Fireplace</span><h3>Rumreaktioner</h3></div><b>${this.rooms.reduce((n, o) => n + (o.reactions?.length ?? 0), 0)} punkter</b></div><p class="intro">Placér lys, sensorer, medier og nu også pejs/ildsted direkte på kortet.</p>${this.rooms.length ? h`<label>Rum<select .value=${this.selectedRoomId} @change=${(n) => {
      this.selectedRoomId = n.target.value, this.cancelEdit();
    }}>${this.rooms.map((n) => h`<option value=${n.id}>${n.name ?? n.id}</option>`)}</select></label><div class="draft"><strong>${this.editingIndex === void 0 ? "Nyt entity-punkt" : "Redigér entity-punkt"}</strong><div class="grid"><label>Type<select .value=${this.draftKind} @change=${(n) => this.changeKind(n.target.value)}>${Object.keys(Bt).map((n) => h`<option value=${n}>${Bt[n]}</option>`)}</select></label><label>Home Assistant entity<select .value=${this.draftEntity} @change=${(n) => this.draftEntity = n.target.value}><option value="">Vælg entity…</option>${this.draftEntity && !r ? h`<option value=${this.draftEntity}>${this.draftEntity} · eksisterende</option>` : f}${i.map((n) => h`<option value=${n.id}>${n.label === n.id ? n.id : `${n.label} · ${n.id}`}</option>`)}</select></label>${this.draftKind === "temperature" ? h`<div class="note">Temperaturen læses automatisk fra sensoren.</div>` : h`<label>Aktiv state(s)<input .value=${this.draftStates} @input=${(n) => this.draftStates = n.target.value}><small>Flere states adskilles med komma.</small></label>`}${this.draftKind === "fireplace" ? h`<label>🔥 Intensitet · ${Math.round(this.draftIntensity * 100)}%<input type="range" min="0.2" max="1" step="0.05" .value=${String(this.draftIntensity)} @input=${(n) => this.draftIntensity = Number(n.target.value)}></label><label>Glød-radius · ${Math.round(this.draftRadius)}<input type="range" min="30" max="220" step="5" .value=${String(this.draftRadius)} @input=${(n) => this.draftRadius = Number(n.target.value)}><small>Hvor langt den varme ildglød breder sig omkring pejsen.</small></label>` : f}</div>${e ? this.preview(e) : f}<div class="actions"><button @click=${this.save} ?disabled=${!this.draftEntity.trim() || this.isDuplicate()}>${this.editingIndex === void 0 ? "Tilføj punkt" : "Gem ændring"}</button>${this.editingIndex !== void 0 ? h`<button class="secondary" @click=${this.cancelEdit}>Annuller</button>` : f}</div></div><div class="list">${t.map((n, o) => h`<article><span class="glyph">${qt[n.kind]}</span><div><strong>${Bt[n.kind]}</strong><small>${n.entity}</small><small>${this.statusLabel(n, o)}${n.kind === "fireplace" ? ` · ${Math.round((n.intensity ?? 0.75) * 100)}% · radius ${n.radius ?? 90}` : ""}</small></div><div class="row-actions"><button class="secondary" @click=${() => this.beginEdit(o)}>Redigér</button><button class="danger" @click=${() => this.removeReaction(o)}>Fjern</button></div></article>`)}</div>` : h`<div class="empty">Tilføj først et rum.</div>`}</section>`;
  }
};
U.styles = I`:host{display:block}.editor{display:grid;gap:14px;margin-top:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{font-size:.7rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.1em}.heading h3{margin:3px 0 0}.heading b{height:max-content;padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);font-size:.75rem}.intro{margin:0;color:var(--secondary-text-color)}label{display:grid;gap:6px;font-size:.86rem}.draft{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}select,input{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}small{color:var(--secondary-text-color)}.placement{display:grid;gap:7px}.placement>div:first-child{display:grid}.preview{position:relative;aspect-ratio:1;max-height:360px;overflow:hidden;border:1px solid var(--divider-color);border-radius:10px;background:var(--card-background-color);cursor:crosshair}.preview img,.preview svg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.preview polygon{fill:rgba(120,90,50,.08);stroke:rgba(120,90,50,.5);stroke-width:3}.preview circle{fill:var(--card-background-color);stroke:var(--primary-color);stroke-width:4}.preview text{font-size:18px;text-anchor:middle;dominant-baseline:central}.draft-point text{font-size:22px}.actions,.row-actions{display:flex;gap:8px;flex-wrap:wrap}button{padding:8px 11px;border:0;border-radius:8px;background:var(--primary-color);color:var(--text-primary-color,#fff);font:inherit;cursor:pointer}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437)}button:disabled{opacity:.5;cursor:not-allowed}.list{display:grid;gap:8px}.list article{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:10px;border:1px solid var(--divider-color);border-radius:10px}.list article>div:nth-child(2){display:grid;gap:2px}.glyph{font-size:1.3rem}.note,.empty{padding:10px;border-radius:8px;background:var(--card-background-color);color:var(--secondary-text-color)}@media(max-width:620px){.grid{grid-template-columns:1fr}.list article{grid-template-columns:auto 1fr}.row-actions{grid-column:1/-1}}`;
oe([
  A({ attribute: !1 })
], U.prototype, "config", 2);
oe([
  A({ attribute: !1 })
], U.prototype, "hass", 2);
oe([
  b()
], U.prototype, "selectedRoomId", 2);
oe([
  b()
], U.prototype, "draftKind", 2);
oe([
  b()
], U.prototype, "draftEntity", 2);
oe([
  b()
], U.prototype, "draftStates", 2);
oe([
  b()
], U.prototype, "draftPosition", 2);
oe([
  b()
], U.prototype, "editingIndex", 2);
oe([
  b()
], U.prototype, "draftIntensity", 2);
oe([
  b()
], U.prototype, "draftRadius", 2);
U = oe([
  R("ha-explorer-room-reactions-editor")
], U);
var Ho = Object.getOwnPropertyDescriptor, Ko = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ho(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(n) || n);
  return n;
};
let Ki = class extends U {
  updated(e) {
    super.updated(e), queueMicrotask(() => this.cleanOpeningControls());
  }
  firstUpdated() {
    queueMicrotask(() => this.cleanOpeningControls());
  }
  cleanOpeningControls() {
    const e = Array.from(this.renderRoot.querySelectorAll("select"));
    for (const i of e) {
      const r = i.querySelector('option[value="opening"]');
      r && (r.remove(), i.value === "opening" && (i.value = "light", i.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }))));
    }
    const t = this.renderRoot.querySelector(".instruction");
    t && t.textContent?.includes("dør/vindue") && (t.innerHTML = "Hele rummet bliver ikke længere farvet af en enkelt entity. Hver lampe, bevægelsessensor, TV/media player og temperatursensor får sit eget punkt på plantegningen. Lamper bruger stadig <code>brightness</code>, og temperatur vises med den aktuelle værdi. Døre og vinduer konfigureres nu under <strong>Dynamic Doors & Windows</strong>.");
  }
};
Ki = Ko([
  R("ha-explorer-room-reactions-editor-clean")
], Ki);
var Go = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, me = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Zo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Go(t, i, n), n;
};
let re = class extends D {
  constructor() {
    super(...arguments), this.selectedRoomId = "", this.kind = "scene", this.entity = "", this.name = "", this.icon = "", this.editingId = "";
  }
  updated(e) {
    if (e.has("config")) {
      const t = this.config?.rooms ?? [];
      t.some((i) => i.id === this.selectedRoomId) || (this.selectedRoomId = t[0]?.id ?? "");
    }
  }
  get selectedRoom() {
    return (this.config?.rooms ?? []).find((e) => e.id === this.selectedRoomId);
  }
  get entityOptions() {
    const e = `${this.kind}.`;
    return Object.entries(this.hass?.states ?? {}).filter(([t]) => t.startsWith(e)).map(([t, i]) => ({
      id: t,
      name: typeof i.attributes.friendly_name == "string" && i.attributes.friendly_name.trim() ? i.attributes.friendly_name : t
    })).sort((t, i) => t.name.localeCompare(i.name, "da"));
  }
  emitConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  updateRoom(e) {
    this.config && this.emitConfig({
      ...this.config,
      rooms: (this.config.rooms ?? []).map(
        (t) => t.id === this.selectedRoomId ? { ...t, quick_actions: e } : t
      )
    });
  }
  changeKind(e) {
    this.kind = e, this.entity = "", this.editingId || (this.name = "", this.icon = e === "scene" ? "✦" : "▶");
  }
  selectEntity(e) {
    this.entity = e, this.name.trim() || (this.name = this.entityOptions.find((t) => t.id === e)?.name ?? "");
  }
  stableId(e) {
    const t = e.replace(/[^a-z0-9_-]+/gi, "-").replace(/^-|-$/g, "") || "handling", i = new Set(
      (this.selectedRoom?.quick_actions ?? []).filter((o) => o.id !== this.editingId).map((o) => o.id)
    );
    let r = t, n = 2;
    for (; i.has(r); ) r = `${t}-${n++}`;
    return r;
  }
  save() {
    const e = this.selectedRoom, t = this.entity.trim(), i = this.name.trim();
    if (!e || !t || !i || !t.startsWith(`${this.kind}.`)) return;
    const r = e.quick_actions ?? [], n = {
      id: this.editingId || this.stableId(t),
      kind: this.kind,
      entity: t,
      name: i,
      ...this.icon.trim() ? { icon: this.icon.trim() } : {}
    }, o = this.editingId ? r.map((s) => s.id === this.editingId ? n : s) : [...r, n];
    this.updateRoom(o), this.resetDraft();
  }
  edit(e) {
    this.editingId = e.id, this.kind = e.kind, this.entity = e.entity, this.name = e.name, this.icon = e.icon ?? "";
  }
  removeAction(e) {
    this.updateRoom((this.selectedRoom?.quick_actions ?? []).filter((t) => t.id !== e)), this.editingId === e && this.resetDraft();
  }
  resetDraft() {
    this.editingId = "", this.kind = "scene", this.entity = "", this.name = "", this.icon = "✦";
  }
  render() {
    const e = this.config?.rooms ?? [], t = this.selectedRoom;
    return e.length ? h`
      <section>
        <div class="notice">
          <strong>Automatisk lysstyring</strong>
          <span>“Tænd alt” og “Sluk alt” vises automatisk, når rummet har mindst ét lys under Living Entity Points.</span>
        </div>

        <label>
          Rum
          <select .value=${this.selectedRoomId} @change=${(i) => {
      this.selectedRoomId = i.target.value, this.resetDraft();
    }}>
            ${e.map((i) => h`<option value=${i.id}>${i.name ?? i.id}</option>`)}
          </select>
        </label>

        <div class="form">
          <label>
            Type
            <select .value=${this.kind} @change=${(i) => this.changeKind(i.target.value)}>
              <option value="scene">Scene</option>
              <option value="script">Script</option>
            </select>
          </label>
          <label>
            Entity
            <select .value=${this.entity} @change=${(i) => this.selectEntity(i.target.value)}>
              <option value="">Vælg ${this.kind === "scene" ? "scene" : "script"}…</option>
              ${this.entityOptions.map((i) => h`<option value=${i.id}>${i.name} · ${i.id}</option>`)}
            </select>
          </label>
          <label>
            Navn
            <input .value=${this.name} @input=${(i) => this.name = i.target.value} placeholder="Fx Filmaften" />
          </label>
          <label>
            Ikon
            <input .value=${this.icon} @input=${(i) => this.icon = i.target.value} placeholder="Fx ✦" maxlength="8" />
          </label>
        </div>

        <div class="buttons">
          <button class="primary" @click=${this.save} ?disabled=${!this.entity || !this.name.trim()}>
            ${this.editingId ? "Gem ændring" : "Tilføj handling"}
          </button>
          ${this.editingId ? h`<button @click=${this.resetDraft}>Annuller</button>` : f}
        </div>

        <div class="actions">
          ${(t?.quick_actions ?? []).map((i) => h`
            <article>
              <span class="glyph">${i.icon ?? (i.kind === "scene" ? "✦" : "▶")}</span>
              <span><strong>${i.name}</strong><small>${i.entity}</small></span>
              <button @click=${() => this.edit(i)}>Redigér</button>
              <button class="danger" @click=${() => this.removeAction(i.id)}>Slet</button>
            </article>
          `)}
          ${t?.quick_actions?.length ? f : h`<p class="empty">Ingen scene- eller scripthandlinger i dette rum endnu.</p>`}
        </div>
      </section>
    ` : h`<p class="empty">Opret først et rum, før du tilføjer hurtighandlinger.</p>`;
  }
};
re.styles = I`
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
me([
  A({ attribute: !1 })
], re.prototype, "config", 2);
me([
  A({ attribute: !1 })
], re.prototype, "hass", 2);
me([
  b()
], re.prototype, "selectedRoomId", 2);
me([
  b()
], re.prototype, "kind", 2);
me([
  b()
], re.prototype, "entity", 2);
me([
  b()
], re.prototype, "name", 2);
me([
  b()
], re.prototype, "icon", 2);
me([
  b()
], re.prototype, "editingId", 2);
re = me([
  R("ha-explorer-room-actions-editor")
], re);
var Uo = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, V = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Wo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Uo(t, i, n), n;
};
const Z = 1e3;
let q = class extends D {
  constructor() {
    super(...arguments), this.fromRoom = "", this.toRoom = "", this.drawing = !1, this.pending = [], this.placingNode = !1, this.draftNodeName = "", this.draftNodeKind = "door", this.draftNodeEntity = "", this.draftNodeOpenStates = "on", this.editingNodeName = "", this.editingNodeKind = "door", this.editingNodeEntity = "", this.editingNodeOpenStates = "on";
  }
  get rooms() {
    return this.config?.rooms ?? [];
  }
  get routes() {
    return this.config?.routes ?? [];
  }
  get routeNodes() {
    return this.config?.route_nodes ?? [];
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    }));
  }
  entityState(e) {
    return this.hass?.states[e]?.state;
  }
  parseStates(e) {
    const t = e.split(",").map((i) => i.trim()).filter(Boolean);
    return t.length ? [...new Set(t)] : ["on"];
  }
  nodeState(e) {
    return je(e, (t) => this.entityState(t));
  }
  nodeStateLabel(e) {
    if (e.kind !== "door") return "";
    const t = this.nodeState(e);
    return t.conditional ? t.active ? `Åben · ${t.currentState ?? "ukendt"}` : t.reason === "entity_unavailable" ? "Blokeret · entity mangler" : t.reason === "missing_entity" ? "Blokeret · ingen entity" : `Lukket / blokeret · ${t.currentState ?? "ukendt"}` : "Ingen dørsensor";
  }
  mapPoint(e) {
    const i = e.currentTarget.getBoundingClientRect();
    if (!i.width || !i.height) return [0.5, 0.5];
    const r = Math.min(1, Math.max(0, (e.clientX - i.left) / i.width)), n = Math.min(1, Math.max(0, (e.clientY - i.top) / i.height));
    return [r, n];
  }
  roomName(e) {
    return this.rooms.find((i) => i.id === e)?.name ?? e;
  }
  routeNodeLabel(e) {
    return e.name?.trim() || e.id;
  }
  routeMatchesSelection(e) {
    return !this.fromRoom || !this.toRoom ? !1 : e.from === this.fromRoom && e.to === this.toRoom || e.from === this.toRoom && e.to === this.fromRoom;
  }
  routeSteps(e) {
    return e.path ? e.path : (e.via ?? []).map((t) => ({ point: t }));
  }
  resolveStep(e) {
    return e.node_id ? this.routeNodes.find((t) => t.id === e.node_id)?.point : e.point;
  }
  selectRoute(e) {
    this.fromRoom = e.from, this.toRoom = e.to, this.drawing = !1, this.placingNode = !1, this.pending = [];
  }
  startDrawing() {
    if (!this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom) return;
    const e = this.routes.find((t) => this.routeMatchesSelection(t));
    if (e) {
      const t = this.routeSteps(e);
      this.pending = e.from === this.fromRoom ? [...t] : [...t].reverse();
    } else
      this.pending = [];
    this.placingNode = !1, this.drawing = !0;
  }
  beginPlaceNode() {
    this.drawing || (this.cancelEditNode(), this.draftNodeName = `Dørpunkt ${this.routeNodes.length + 1}`, this.draftNodeKind = "door", this.draftNodeEntity = "", this.draftNodeOpenStates = "on", this.placingNode = !0);
  }
  cancelPlaceNode() {
    this.placingNode = !1, this.draftNodeName = "", this.draftNodeEntity = "", this.draftNodeOpenStates = "on";
  }
  beginEditNode(e) {
    this.cancelPlaceNode(), this.editingNodeId = e.id, this.editingNodeName = e.name ?? "", this.editingNodeKind = e.kind ?? "waypoint", this.editingNodeEntity = e.state_binding?.entity ?? "", this.editingNodeOpenStates = (e.state_binding?.open_states?.length ? e.state_binding.open_states : ["on"]).join(", ");
  }
  cancelEditNode() {
    this.editingNodeId = void 0, this.editingNodeName = "", this.editingNodeKind = "door", this.editingNodeEntity = "", this.editingNodeOpenStates = "on";
  }
  saveEditedNode(e) {
    if (!this.config) return;
    const t = this.editingNodeEntity.trim(), i = this.routeNodes.map((r) => {
      if (r.id !== e) return r;
      const { state_binding: n, ...o } = r;
      return {
        ...o,
        name: this.editingNodeName.trim() || r.id,
        kind: this.editingNodeKind,
        ...this.editingNodeKind === "door" && t ? {
          state_binding: {
            entity: t,
            open_states: this.parseStates(this.editingNodeOpenStates)
          }
        } : {}
      };
    });
    this.cancelEditNode(), this.emitConfig({ ...this.config, route_nodes: i });
  }
  uniqueNodeId() {
    const e = new Set(this.routeNodes.map((i) => i.id));
    let t = this.routeNodes.length + 1;
    for (; e.has(`route_node_${t}`); ) t += 1;
    return `route_node_${t}`;
  }
  addSharedNode(e) {
    if (!this.config) return;
    const t = this.draftNodeEntity.trim(), i = {
      id: this.uniqueNodeId(),
      name: this.draftNodeName.trim() || `Dørpunkt ${this.routeNodes.length + 1}`,
      kind: this.draftNodeKind,
      point: e,
      ...this.draftNodeKind === "door" && t ? {
        state_binding: {
          entity: t,
          open_states: this.parseStates(this.draftNodeOpenStates)
        }
      } : {}
    };
    this.cancelPlaceNode(), this.emitConfig({ ...this.config, route_nodes: [...this.routeNodes, i] });
  }
  handleMapClick(e) {
    if (this.placingNode) {
      this.addSharedNode(this.mapPoint(e));
      return;
    }
    this.drawing && (this.pending = [...this.pending, { point: this.mapPoint(e) }]);
  }
  useSharedNode(e, t) {
    e.stopPropagation(), !(!this.drawing || this.placingNode || this.pending[this.pending.length - 1]?.node_id === t.id) && (this.pending = [...this.pending, { node_id: t.id }]);
  }
  undo() {
    this.pending = this.pending.slice(0, -1);
  }
  cancel() {
    this.drawing = !1, this.pending = [];
  }
  save() {
    if (!this.config || !this.fromRoom || !this.toRoom) return;
    const e = this.routes.filter((i) => !this.routeMatchesSelection(i)), t = {
      from: this.fromRoom,
      to: this.toRoom,
      path: this.pending.map((i) => ({
        ...i.node_id ? { node_id: i.node_id } : {},
        ...i.point ? { point: [...i.point] } : {}
      }))
    };
    this.drawing = !1, this.pending = [], this.emitConfig({ ...this.config, routes: [...e, t] });
  }
  deleteRoute() {
    if (!this.config || !this.fromRoom || !this.toRoom) return;
    const e = this.routes.filter((t) => !this.routeMatchesSelection(t));
    this.pending = [], this.drawing = !1, this.emitConfig({ ...this.config, routes: e });
  }
  nodeUsageCount(e) {
    return this.routes.reduce(
      (t, i) => t + this.routeSteps(i).filter((r) => r.node_id === e).length,
      0
    );
  }
  deleteNode(e) {
    !this.config || this.nodeUsageCount(e.id) > 0 || (this.editingNodeId === e.id && this.cancelEditNode(), this.emitConfig({
      ...this.config,
      route_nodes: this.routeNodes.filter((t) => t.id !== e.id)
    }));
  }
  roomAnchor(e) {
    const t = this.rooms.find((i) => i.id === e);
    if (t) {
      if (t.presence_anchor) return [t.presence_anchor.x, t.presence_anchor.y];
      if (t.points.length)
        return [
          t.points.reduce((i, r) => i + r[0], 0) / t.points.length,
          t.points.reduce((i, r) => i + r[1], 0) / t.points.length
        ];
    }
  }
  routePoints(e) {
    const t = this.roomAnchor(e.from), i = this.roomAnchor(e.to);
    if (!t || !i) return;
    const r = this.routeSteps(e).map((n) => this.resolveStep(n)).filter((n) => !!n);
    return [t, ...r, i];
  }
  renderSharedNodes() {
    return this.routeNodes.map((e) => {
      const t = this.nodeUsageCount(e.id), [i, r] = e.point, n = this.nodeState(e), o = [
        "shared-node",
        this.drawing ? "selectable" : "",
        n.conditional && !n.active ? "blocked" : ""
      ].filter(Boolean).join(" ");
      return C`
        <g
          class=${o}
          transform=${`translate(${i * Z} ${r * Z})`}
          @click=${(s) => this.useSharedNode(s, e)}
        >
          <circle r="15"></circle>
          <text y="-24" text-anchor="middle">${this.routeNodeLabel(e)}</text>
          ${t > 0 ? C`<text class="usage" y="7" text-anchor="middle">${t}</text>` : f}
        </g>
      `;
    });
  }
  renderNetworkRoutes() {
    return this.routes.map((e, t) => {
      if (this.routeMatchesSelection(e)) return f;
      const i = this.routePoints(e);
      if (!i) return f;
      const r = i.map(([n, o]) => `${n * Z},${o * Z}`).join(" ");
      return C`
        <polyline
          points=${r}
          class="network-route"
          fill="none"
          vector-effect="non-scaling-stroke"
          tabindex="0"
          aria-label=${`${this.roomName(e.from)} til ${this.roomName(e.to)}`}
          @click=${(n) => {
        n.stopPropagation(), !this.drawing && !this.placingNode && this.selectRoute(e);
      }}
        ></polyline>
        <text
          class="network-number"
          x=${i[Math.floor(i.length / 2)][0] * Z}
          y=${i[Math.floor(i.length / 2)][1] * Z - 18}
          text-anchor="middle"
        >${t + 1}</text>
      `;
    });
  }
  renderRoutePreview() {
    if (!this.fromRoom || !this.toRoom) return f;
    const e = this.roomAnchor(this.fromRoom), t = this.roomAnchor(this.toRoom);
    if (!e || !t) return f;
    let i = this.pending;
    if (!this.drawing) {
      const s = this.routes.find((a) => this.routeMatchesSelection(a));
      if (s) {
        const a = this.routeSteps(s);
        i = s.from === this.fromRoom ? a : [...a].reverse();
      }
    }
    const r = i.map((s) => ({ step: s, point: this.resolveStep(s) })).filter((s) => !!s.point), o = [e, ...r.map((s) => s.point), t].map(([s, a]) => `${s * Z},${a * Z}`).join(" ");
    return C`
      <polyline points=${o} class="route-line" fill="none" vector-effect="non-scaling-stroke"></polyline>
      <g transform=${`translate(${e[0] * Z} ${e[1] * Z})`}><circle class="endpoint" r="14"></circle></g>
      ${r.map(({ step: s, point: a }, l) => C`
        <g transform=${`translate(${a[0] * Z} ${a[1] * Z})`}>
          <circle class=${s.node_id ? "waypoint shared-waypoint" : "waypoint"} r="11"></circle>
          <text y="-20" text-anchor="middle">${l + 1}</text>
        </g>
      `)}
      <g transform=${`translate(${t[0] * Z} ${t[1] * Z})`}><circle class="endpoint" r="14"></circle></g>
    `;
  }
  renderRouteList() {
    return this.routes.length ? h`
      <div class="route-list">
        ${this.routes.map((e, t) => {
      const i = this.routeMatchesSelection(e), r = this.routeSteps(e), n = r.filter((s) => !!s.node_id).length, o = r.filter((s) => !!s.point).length;
      return h`
            <button
              type="button"
              class=${i ? "route-item selected" : "route-item"}
              @click=${() => this.selectRoute(e)}
            >
              <span class="route-index">${t + 1}</span>
              <span class="route-copy">
                <strong>${this.roomName(e.from)} ↔ ${this.roomName(e.to)}</strong>
                <small>${n} fælles · ${o} lokale punkter</small>
              </span>
            </button>
          `;
    })}
      </div>
    ` : h`<div class="route-empty">Der er endnu ingen gemte ruter.</div>`;
  }
  renderNodeManager() {
    return h`
      <div class="node-manager">
        <div class="node-heading">
          <div><strong>Fælles dør- og gangpunkter</strong><small>Dørsensoren bindes nu direkte på dørpunktet og arves af graph-forbindelserne.</small></div>
          <span>${this.routeNodes.length} punkter</span>
        </div>

        ${this.routeNodes.length ? h`
          <div class="node-list">
            ${this.routeNodes.map((e) => {
      const t = this.nodeUsageCount(e.id), i = this.nodeState(e), r = this.editingNodeId === e.id;
      return h`
                <div class=${i.conditional && !i.active ? "node-item blocked" : "node-item"}>
                  <span class=${`node-dot ${e.kind ?? "waypoint"}`}></span>
                  <span class="node-copy">
                    <strong>${this.routeNodeLabel(e)}</strong>
                    <small>${e.kind ?? "waypoint"} · bruges ${t} ${t === 1 ? "gang" : "gange"}</small>
                    ${e.kind === "door" ? h`
                      <em class=${i.active ? "node-status open" : "node-status blocked"}>${this.nodeStateLabel(e)}</em>
                      ${e.state_binding ? h`<small>${e.state_binding.entity} · åben: ${(e.state_binding.open_states?.length ? e.state_binding.open_states : ["on"]).join(", ")}</small>` : f}
                    ` : f}
                  </span>
                  <div class="node-actions">
                    <button class="mini secondary" @click=${() => this.beginEditNode(e)}>Redigér</button>
                    <button class="mini danger" ?disabled=${t > 0} title=${t > 0 ? "Punktet bruges af en rute" : "Slet punkt"} @click=${() => this.deleteNode(e)}>Slet</button>
                  </div>
                </div>
                ${r ? h`
                  <div class="node-edit">
                    <label>Navn<input .value=${this.editingNodeName} @input=${(n) => this.editingNodeName = n.target.value}></label>
                    <label>Type<select .value=${this.editingNodeKind} @change=${(n) => this.editingNodeKind = n.target.value}><option value="door">Dør</option><option value="junction">Kryds/gang</option><option value="waypoint">Waypoint</option></select></label>
                    ${this.editingNodeKind === "door" ? h`
                      <label>Home Assistant entity<input placeholder="binary_sensor.kokkendor" .value=${this.editingNodeEntity} @input=${(n) => this.editingNodeEntity = n.target.value}></label>
                      <label>Åben state(s)<input placeholder="on" .value=${this.editingNodeOpenStates} @input=${(n) => this.editingNodeOpenStates = n.target.value}><small>Fx <code>on</code> for en normal binary_sensor med device_class door.</small></label>
                    ` : f}
                    <div class="node-edit-actions">
                      <button class="primary mini" @click=${() => this.saveEditedNode(e.id)}>Gem punkt</button>
                      <button class="secondary mini" @click=${this.cancelEditNode}>Annuller</button>
                    </div>
                  </div>
                ` : f}
              `;
    })}
          </div>
        ` : h`<div class="route-empty">Ingen fælles punkter endnu.</div>`}

        ${this.placingNode ? h`
          <div class="node-draft">
            <label>Navn<input .value=${this.draftNodeName} @input=${(e) => this.draftNodeName = e.target.value}></label>
            <label>Type<select .value=${this.draftNodeKind} @change=${(e) => this.draftNodeKind = e.target.value}><option value="door">Dør</option><option value="junction">Kryds/gang</option><option value="waypoint">Waypoint</option></select></label>
            ${this.draftNodeKind === "door" ? h`
              <label>Home Assistant entity<input placeholder="binary_sensor.kokkendor" .value=${this.draftNodeEntity} @input=${(e) => this.draftNodeEntity = e.target.value}></label>
              <label>Åben state(s)<input placeholder="on" .value=${this.draftNodeOpenStates} @input=${(e) => this.draftNodeOpenStates = e.target.value}><small>Tom entity betyder at døren altid er passabel.</small></label>
            ` : f}
            <button class="secondary" @click=${this.cancelPlaceNode}>Annuller</button>
          </div>
          <div class="instruction">Tryk nu på plantegningen dér, hvor det fælles punkt skal ligge. Dørsensoren gemmes sammen med punktet.</div>
        ` : h`
          <button class="secondary node-add" ?disabled=${this.drawing} @click=${this.beginPlaceNode}>+ Placér fælles punkt</button>
        `}
      </div>
    `;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.routes.some((i) => this.routeMatchesSelection(i));
    return h`
      <section class="route-editor">
        <div class="heading">
          <div><span>Door Entity Binding</span><h3>Administrér ruter og fælles dørpunkter</h3></div>
          <b>${this.routes.length} ruter</b>
        </div>

        ${this.renderNodeManager()}
        ${this.renderRouteList()}

        <div class="selectors">
          <label>Fra rum
            <select .value=${this.fromRoom} ?disabled=${this.placingNode} @change=${(i) => {
      this.fromRoom = i.target.value, this.drawing = !1, this.pending = [];
    }}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((i) => h`<option value=${i.id}>${i.name ?? i.id}</option>`)}
            </select>
          </label>
          <label>Til rum
            <select .value=${this.toRoom} ?disabled=${this.placingNode} @change=${(i) => {
      this.toRoom = i.target.value, this.drawing = !1, this.pending = [];
    }}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((i) => h`<option value=${i.id}>${i.name ?? i.id}</option>`)}
            </select>
          </label>
        </div>

        <div class="instruction">
          ${this.drawing ? h`Tryk på et <strong>fælles punkt</strong> for at genbruge det i ruten, eller tryk et andet sted på plantegningen for at lave et lokalt waypoint.` : this.placingNode ? h`Placér det nye fælles punkt direkte på plantegningen.` : h`Et dørpunkt kan nu selv kende sin Home Assistant-sensor. Automatiske graph-forbindelser gennem døren arver dens åbne/lukkede status.`}
        </div>

        ${e ? h`
          <div class=${this.drawing || this.placingNode ? "map-frame drawing" : "map-frame"}>
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}>
              <image href=${e} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderNetworkRoutes()}
              ${this.renderRoutePreview()}
              ${this.renderSharedNodes()}
            </svg>
          </div>
        ` : h`<div class="empty">Vælg først en plantegning under Kort.</div>`}

        <div class="buttons">
          ${this.drawing ? h`
            <button class="secondary" ?disabled=${!this.pending.length} @click=${this.undo}>Fortryd waypoint</button>
            <button class="primary" @click=${this.save}>Gem rute</button>
            <button class="secondary" @click=${this.cancel}>Annuller</button>
          ` : h`
            <button class="primary" ?disabled=${this.placingNode || !this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom} @click=${this.startDrawing}>${t ? "Redigér valgt rute" : "Tegn ny rute"}</button>
            <button class="danger" ?disabled=${this.placingNode || !t} @click=${this.deleteRoute}>Slet valgt rute</button>
          `}
        </div>
      </section>
    `;
  }
};
q.styles = I`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading,.node-heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b,.node-heading>span{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.node-manager{display:grid;gap:9px;padding:12px;border:1px solid var(--divider-color);border-radius:12px}.node-heading>div,.node-copy{display:grid;gap:2px}.node-heading small,.node-copy small{color:var(--secondary-text-color);font-weight:500}.node-list{display:grid;gap:6px}.node-item{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:9px;background:var(--secondary-background-color);border:1px solid transparent}.node-item.blocked{border-color:var(--error-color,#db4437)}.node-copy{flex:1}.node-actions,.node-edit-actions{display:flex;gap:6px;flex-wrap:wrap}.node-dot{width:13px;height:13px;border-radius:50%;background:var(--primary-color,#03a9f4)}.node-dot.junction{border-radius:3px}.node-dot.waypoint{background:var(--secondary-text-color)}.node-status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.node-status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.node-status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.node-draft,.node-edit{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;align-items:end;padding:10px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.node-draft label,.node-edit label{display:grid;gap:5px;font-size:.82rem}.node-draft label small,.node-edit label small{color:var(--secondary-text-color);font-size:.74rem}.node-draft input,.node-draft select,.node-edit input,.node-edit select{width:100%;box-sizing:border-box;padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.node-edit-actions{grid-column:1/-1}.node-add{justify-self:start}.route-list{display:grid;gap:7px}.route-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid transparent}.route-item.selected{border-color:var(--primary-color,#03a9f4);box-shadow:0 0 0 1px var(--primary-color,#03a9f4) inset}.route-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.route-copy{display:grid;gap:2px}.route-copy small{color:var(--secondary-text-color);font-weight:500}.route-empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:default}.map-frame.drawing svg{cursor:crosshair}.network-route{stroke:var(--secondary-text-color);stroke-opacity:.36;stroke-width:4;stroke-dasharray:10 10;pointer-events:stroke;cursor:pointer}.network-route:hover{stroke:var(--primary-color,#03a9f4);stroke-opacity:.8;stroke-width:7}.network-number{font-size:22px;font-weight:800;fill:var(--secondary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:7;stroke-linejoin:round;pointer-events:none}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:6;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-waypoint{fill:var(--primary-color,#03a9f4);stroke:white}.shared-node circle{fill:var(--card-background-color);stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-node.blocked circle{stroke:var(--error-color,#db4437)}.shared-node.selectable{cursor:pointer}.shared-node.selectable:hover circle{fill:var(--primary-color,#03a9f4)}.shared-node text{font-size:20px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6;stroke-linejoin:round;pointer-events:none}.shared-node .usage{font-size:16px;stroke:none;fill:var(--primary-text-color)}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.mini{padding:6px 8px;font-size:.76rem}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors,.node-draft,.node-edit{grid-template-columns:1fr}.node-edit-actions{grid-column:auto}.node-draft button{justify-self:start}.node-actions{flex-direction:column}}
  `;
V([
  A({ attribute: !1 })
], q.prototype, "config", 2);
V([
  A({ attribute: !1 })
], q.prototype, "hass", 2);
V([
  b()
], q.prototype, "fromRoom", 2);
V([
  b()
], q.prototype, "toRoom", 2);
V([
  b()
], q.prototype, "drawing", 2);
V([
  b()
], q.prototype, "pending", 2);
V([
  b()
], q.prototype, "placingNode", 2);
V([
  b()
], q.prototype, "draftNodeName", 2);
V([
  b()
], q.prototype, "draftNodeKind", 2);
V([
  b()
], q.prototype, "draftNodeEntity", 2);
V([
  b()
], q.prototype, "draftNodeOpenStates", 2);
V([
  b()
], q.prototype, "editingNodeId", 2);
V([
  b()
], q.prototype, "editingNodeName", 2);
V([
  b()
], q.prototype, "editingNodeKind", 2);
V([
  b()
], q.prototype, "editingNodeEntity", 2);
V([
  b()
], q.prototype, "editingNodeOpenStates", 2);
q = V([
  R("ha-explorer-route-editor")
], q);
var Yo = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, ae = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Xo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Yo(t, i, n), n;
};
const Re = 1e3;
let te = class extends D {
  constructor() {
    super(...arguments), this.fromKey = "", this.toKey = "", this.conditionEntity = "", this.conditionStates = "on", this.editingEntity = "", this.editingStates = "on";
  }
  get rooms() {
    return this.config?.rooms ?? [];
  }
  get routeNodes() {
    return this.config?.route_nodes ?? [];
  }
  get graphEdges() {
    return this.config?.route_graph_edges ?? [];
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    }));
  }
  roomAnchor(e) {
    const t = this.rooms.find((i) => i.id === e);
    if (t) {
      if (t.presence_anchor) return [t.presence_anchor.x, t.presence_anchor.y];
      if (t.points.length)
        return [
          t.points.reduce((i, r) => i + r[0], 0) / t.points.length,
          t.points.reduce((i, r) => i + r[1], 0) / t.points.length
        ];
    }
  }
  endpointKey(e) {
    return `${e.kind}:${e.id}`;
  }
  parseEndpoint(e) {
    const t = e.indexOf(":");
    if (t <= 0) return;
    const i = e.slice(0, t), r = e.slice(t + 1);
    if (!(i !== "room" && i !== "node" || !r))
      return { kind: i, id: r };
  }
  endpointOptions() {
    const e = this.rooms.map((i) => ({
      key: `room:${i.id}`,
      label: `Rum · ${i.name ?? i.id}`,
      kind: "room",
      id: i.id,
      point: this.roomAnchor(i.id)
    })), t = this.routeNodes.map((i) => ({
      key: `node:${i.id}`,
      label: `${i.kind === "door" ? "Dør" : i.kind === "junction" ? "Gang" : "Punkt"} · ${i.name ?? i.id}`,
      kind: "node",
      id: i.id,
      point: i.point
    }));
    return [...e, ...t];
  }
  endpointLabel(e) {
    const t = this.endpointKey(e);
    return this.endpointOptions().find((i) => i.key === t)?.label ?? t;
  }
  endpointPoint(e) {
    return e.kind === "room" ? this.roomAnchor(e.id) : this.routeNodes.find((t) => t.id === e.id)?.point;
  }
  canonicalEdgeKey(e) {
    return [this.endpointKey(e.from), this.endpointKey(e.to)].sort().join("|");
  }
  parseAllowedStates(e) {
    const t = e.split(",").map((i) => i.trim()).filter(Boolean);
    return t.length ? [...new Set(t)] : ["on"];
  }
  entityState(e) {
    return this.hass?.states[e]?.state;
  }
  edgeStatuses() {
    return this.config ? nt(
      this.config,
      (e) => this.entityState(e)
    ) : [];
  }
  edgeStatus(e) {
    return this.edgeStatuses()[e] ?? {
      index: e,
      edge: this.graphEdges[e],
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  }
  canAdd() {
    if (!this.fromKey || !this.toKey || this.fromKey === this.toKey) return !1;
    const e = this.parseEndpoint(this.fromKey), t = this.parseEndpoint(this.toKey);
    if (!e || !t) return !1;
    const i = { from: e, to: t }, r = this.canonicalEdgeKey(i);
    return !this.graphEdges.some((n) => this.canonicalEdgeKey(n) === r);
  }
  addEdge() {
    if (!this.config || !this.canAdd()) return;
    const e = this.parseEndpoint(this.fromKey), t = this.parseEndpoint(this.toKey);
    if (!e || !t) return;
    const i = this.conditionEntity.trim(), r = {
      from: e,
      to: t,
      ...i ? {
        condition: {
          entity: i,
          allowed_states: this.parseAllowedStates(this.conditionStates)
        }
      } : {}
    };
    this.emitConfig({
      ...this.config,
      route_graph_edges: [...this.graphEdges, r]
    }), this.fromKey = "", this.toKey = "", this.conditionEntity = "", this.conditionStates = "on";
  }
  deleteEdge(e) {
    this.config && (this.editingConditionIndex === e && (this.editingConditionIndex = void 0), this.emitConfig({
      ...this.config,
      route_graph_edges: this.graphEdges.filter((t, i) => i !== e)
    }));
  }
  beginEditCondition(e) {
    const t = this.graphEdges[e]?.condition;
    this.editingConditionIndex = e, this.editingEntity = t?.entity ?? "", this.editingStates = (t?.allowed_states?.length ? t.allowed_states : ["on"]).join(", ");
  }
  cancelEditCondition() {
    this.editingConditionIndex = void 0, this.editingEntity = "", this.editingStates = "on";
  }
  saveCondition(e) {
    if (!this.config) return;
    const t = this.editingEntity.trim(), i = this.graphEdges.map((r, n) => {
      if (n !== e) return r;
      if (!t) {
        const { condition: o, ...s } = r;
        return s;
      }
      return {
        ...r,
        condition: {
          entity: t,
          allowed_states: this.parseAllowedStates(this.editingStates)
        }
      };
    });
    this.cancelEditCondition(), this.emitConfig({ ...this.config, route_graph_edges: i });
  }
  removeCondition(e) {
    if (!this.config) return;
    const t = this.graphEdges.map((i, r) => {
      if (r !== e) return i;
      const { condition: n, ...o } = i;
      return o;
    });
    this.cancelEditCondition(), this.emitConfig({ ...this.config, route_graph_edges: t });
  }
  statusLabel(e) {
    const t = this.edgeStatus(e);
    if (!t.conditional) return "Altid åben";
    const i = t.conditionSource === "node" ? `dør ${this.routeNodes.find((r) => r.id === t.nodeId)?.name ?? t.nodeId ?? "punkt"}` : "rute";
    return t.active ? `Åben · ${i} · ${t.currentState ?? "ok"}` : t.reason === "entity_unavailable" ? `Blokeret · ${i} · entity mangler` : t.reason === "missing_entity" ? `Blokeret · ${i} · ingen entity` : `Blokeret · ${i} · ${t.currentState ?? "ukendt"}`;
  }
  renderGraphOverlay() {
    const e = this.edgeStatuses(), t = this.graphEdges.map((r, n) => {
      const o = this.endpointPoint(r.from), s = this.endpointPoint(r.to);
      if (!o || !s) return f;
      const a = e[n] ?? this.edgeStatus(n), l = ["graph-edge", a.conditional ? "conditional" : "", a.active ? "" : "blocked"].filter(Boolean).join(" ");
      return C`<line
        x1=${o[0] * Re}
        y1=${o[1] * Re}
        x2=${s[0] * Re}
        y2=${s[1] * Re}
        class=${l}
        vector-effect="non-scaling-stroke"
      ></line>`;
    }), i = this.endpointOptions().filter((r) => r.point).map((r) => {
      const [n, o] = r.point, s = r.kind === "node" ? this.routeNodes.find((d) => d.id === r.id) : void 0, a = s ? je(s, (d) => this.entityState(d)) : void 0, l = !!(a?.conditional && !a.active);
      return C`
          <g transform=${`translate(${n * Re} ${o * Re})`}>
            <circle class=${r.kind === "room" ? "graph-room" : l ? "graph-node blocked" : "graph-node"} r=${r.kind === "room" ? "11" : "13"}></circle>
          </g>
        `;
    });
    return C`${t}${i}`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.endpointOptions(), i = this.edgeStatuses(), r = i.filter((o) => o.conditional).length, n = this.routeNodes.filter((o) => o.kind === "door" && o.state_binding).length;
    return h`
      <section class="graph-editor">
        <div class="heading">
          <div><span>Smart / Conditional Routes</span><h3>Forbind rum, døre og gangpunkter</h3></div>
          <b>${this.graphEdges.length} forbindelser · ${r} live · ${n} dørsensorer</b>
        </div>

        <div class="instruction">
          Dørpunkter med en Home Assistant-sensor styrer automatisk alle graph-forbindelser, der møder døren. Du kan stadig lægge en ekstra route-condition på selve forbindelsen til særlige regler. Manuelle ruter er fortsat eksplicitte overrides.
        </div>

        <div class="selectors">
          <label>Fra
            <select .value=${this.fromKey} @change=${(o) => this.fromKey = o.target.value}>
              <option value="">Vælg rum eller punkt</option>
              ${t.map((o) => h`<option value=${o.key}>${o.label}</option>`)}
            </select>
          </label>
          <label>Til
            <select .value=${this.toKey} @change=${(o) => this.toKey = o.target.value}>
              <option value="">Vælg rum eller punkt</option>
              ${t.map((o) => h`<option value=${o.key}>${o.label}</option>`)}
            </select>
          </label>
        </div>

        <div class="condition-draft">
          <div class="condition-title"><strong>Ekstra route-condition · valgfri</strong><span>Brug normalt dørpunktets egen sensor til åben/lukket. Dette felt er til særlige regler på forbindelsen.</span></div>
          <div class="condition-fields">
            <label>Home Assistant entity
              <input
                placeholder="input_boolean.special_route"
                .value=${this.conditionEntity}
                @input=${(o) => this.conditionEntity = o.target.value}
              >
            </label>
            <label>Tilladte states
              <input
                placeholder="on"
                .value=${this.conditionStates}
                @input=${(o) => this.conditionStates = o.target.value}
              >
              <small>Flere states adskilles med komma, fx <code>on, open</code>.</small>
            </label>
          </div>
        </div>

        <button class="primary add" ?disabled=${!this.canAdd()} @click=${this.addEdge}>+ Tilføj forbindelse</button>

        ${this.graphEdges.length ? h`
          <div class="edge-list">
            ${this.graphEdges.map((o, s) => {
      const a = i[s] ?? this.edgeStatus(s), l = this.editingConditionIndex === s;
      return h`
                <div class=${a.active ? "edge-item" : "edge-item blocked"}>
                  <span class="edge-index">${s + 1}</span>
                  <span class="edge-copy">
                    <strong>${this.endpointLabel(o.from)}</strong>
                    <small>↔ ${this.endpointLabel(o.to)}</small>
                    <em class=${a.active ? "status open" : "status blocked"}>${this.statusLabel(s)}</em>
                    ${a.conditionSource === "node" && a.entity ? h`<small>Arvet fra dørpunkt: ${a.entity} · åben: ${a.allowedStates.join(", ")}</small>` : f}
                    ${o.condition ? h`<small>Ekstra route-condition: ${o.condition.entity} · tilladt: ${(o.condition.allowed_states?.length ? o.condition.allowed_states : ["on"]).join(", ")}</small>` : f}
                  </span>
                  <div class="edge-actions">
                    <button class="secondary mini" @click=${() => this.beginEditCondition(s)}>Route-condition</button>
                    <button class="danger mini" @click=${() => this.deleteEdge(s)}>Slet</button>
                  </div>
                </div>
                ${l ? h`
                  <div class="condition-edit">
                    <label>Entity<input .value=${this.editingEntity} @input=${(d) => this.editingEntity = d.target.value}></label>
                    <label>Tilladte states<input .value=${this.editingStates} @input=${(d) => this.editingStates = d.target.value}></label>
                    <div class="condition-actions">
                      <button class="primary mini" @click=${() => this.saveCondition(s)}>Gem route-condition</button>
                      ${o.condition ? h`<button class="secondary mini" @click=${() => this.removeCondition(s)}>Fjern route-condition</button>` : f}
                      <button class="secondary mini" @click=${this.cancelEditCondition}>Annuller</button>
                    </div>
                  </div>
                ` : f}
              `;
    })}
          </div>
        ` : h`<div class="empty">Ingen graph-forbindelser endnu. Start typisk med at forbinde et rum til dets dørpunkt.</div>`}

        ${e ? h`
          <div class="map-frame">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <image href=${e} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderGraphOverlay()}
            </svg>
          </div>
          <div class="legend"><span><i class="line open"></i>Aktiv</span><span><i class="line conditional"></i>Live styret</span><span><i class="line blocked"></i>Blokeret</span></div>
        ` : f}
      </section>
    `;
  }
};
te.styles = I`
    :host{display:block}.graph-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors,.condition-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label,.condition-fields label,.condition-edit label{display:grid;gap:6px;font-size:.85rem}.selectors select,input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.condition-draft,.condition-edit{display:grid;gap:10px;padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.condition-title{display:grid;gap:2px}.condition-title span,.condition-fields small{color:var(--secondary-text-color);font-size:.8rem}.condition-edit{grid-template-columns:1fr 1fr auto;align-items:end}.condition-actions,.edge-actions{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.add{justify-self:start}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}.edge-list{display:grid;gap:7px}.edge-item{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;background:var(--secondary-background-color);border:1px solid transparent}.edge-item.blocked{border-color:var(--error-color,#db4437)}.edge-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem;flex:none}.edge-copy{display:grid;gap:2px;min-width:0;flex:1}.edge-copy small{color:var(--secondary-text-color)}.status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-edge{stroke:var(--primary-color,#03a9f4);stroke-width:4;stroke-opacity:.72}.graph-edge.conditional{stroke-dasharray:9 7}.graph-edge.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.graph-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.graph-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.graph-node.blocked{stroke:var(--error-color,#db4437)}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;gap:6px;align-items:center}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--primary-color,#03a9f4)}.legend .line.conditional{border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:600px){.selectors,.condition-fields,.condition-edit{grid-template-columns:1fr}.edge-item{align-items:flex-start}.edge-actions{flex-direction:column}}
  `;
ae([
  A({ attribute: !1 })
], te.prototype, "config", 2);
ae([
  A({ attribute: !1 })
], te.prototype, "hass", 2);
ae([
  b()
], te.prototype, "fromKey", 2);
ae([
  b()
], te.prototype, "toKey", 2);
ae([
  b()
], te.prototype, "conditionEntity", 2);
ae([
  b()
], te.prototype, "conditionStates", 2);
ae([
  b()
], te.prototype, "editingConditionIndex", 2);
ae([
  b()
], te.prototype, "editingEntity", 2);
ae([
  b()
], te.prototype, "editingStates", 2);
te = ae([
  R("ha-explorer-route-graph-editor")
], te);
var Qo = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, at = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Jo(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Qo(t, i, n), n;
};
const ee = 1e3;
let Ce = class extends D {
  constructor() {
    super(...arguments), this.fromRoom = "", this.toRoom = "";
  }
  get rooms() {
    return this.config?.rooms ?? [];
  }
  get routeNodes() {
    return this.config?.route_nodes ?? [];
  }
  get graphEdges() {
    return this.config?.route_graph_edges ?? [];
  }
  roomName(e) {
    return this.rooms.find((t) => t.id === e)?.name ?? e;
  }
  routeNodeName(e) {
    return this.routeNodes.find((t) => t.id === e)?.name ?? e;
  }
  endpointLabel(e) {
    return e.kind === "room" ? this.roomName(e.id) : this.routeNodeName(e.id);
  }
  endpointPoint(e) {
    if (this.config)
      return e.kind === "room" ? we(this.config, e.id) : this.routeNodes.find((t) => t.id === e.id)?.point;
  }
  entityState(e) {
    return this.hass?.states[e]?.state;
  }
  edgeStatuses() {
    return this.config ? nt(
      this.config,
      (e) => this.entityState(e)
    ) : [];
  }
  edgeStatus(e) {
    return this.edgeStatuses()[e] ?? {
      index: e,
      edge: this.graphEdges[e],
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  }
  selectedResolution() {
    if (!(!this.config || !this.fromRoom || !this.toRoom || this.fromRoom === this.toRoom))
      return ri(
        this.config,
        this.fromRoom,
        this.toRoom,
        (e) => this.entityState(e)
      );
  }
  sourceLabel(e) {
    return e.source === "manual" ? "Manuel rute · override" : e.source === "graph" ? "Automatic Graph" : "Straight-line fallback";
  }
  sourceDescription(e) {
    const t = e.blockedEdges.length;
    return e.source === "manual" ? t ? `Explorer bruger den gemte manuelle rute. ${t} graph-forbindelse${t === 1 ? " er" : "r er"} blokeret lige nu, men manuelle overrides påvirkes ikke.` : "Explorer bruger den gemte manuelle rute før graph-netværket." : e.source === "graph" ? t ? `${t} live-styret forbindelse${t === 1 ? " er" : "r er"} blokeret. Explorer har automatisk fundet den korteste aktive alternative graph-vej.` : "Der er ingen manuel override, så Explorer bruger den korteste forbundne graph-vej." : t ? `${t} live-styret forbindelse${t === 1 ? " er" : "r er"} blokeret, og der findes ingen aktiv graph-vej mellem rummene. Explorer bruger derfor straight-line fallback.` : "Der blev ikke fundet en manuel rute eller en sammenhængende graph-vej mellem rummene.";
  }
  formatDistance(e) {
    return new Intl.NumberFormat("da-DK", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(e);
  }
  blockedReason(e) {
    const t = e.conditionSource === "node" ? `Dørpunkt ${this.routeNodeName(e.nodeId ?? "")}` : "Route-condition";
    return e.reason === "missing_entity" ? `${t} mangler en entity` : e.reason === "entity_unavailable" ? `${t}: entity findes ikke i Home Assistant` : `${t}: aktuel state ${e.currentState ?? "ukendt"} er ikke tilladt`;
  }
  renderGraphOverlay() {
    const e = this.edgeStatuses();
    return this.graphEdges.map((t, i) => {
      const r = this.endpointPoint(t.from), n = this.endpointPoint(t.to);
      if (!r || !n) return f;
      const o = e[i] ?? this.edgeStatus(i), s = [
        "graph-context",
        o.conditional ? "conditional" : "",
        o.active ? "" : "blocked"
      ].filter(Boolean).join(" ");
      return C`
        <line
          x1=${r[0] * ee}
          y1=${r[1] * ee}
          x2=${n[0] * ee}
          y2=${n[1] * ee}
          class=${s}
          vector-effect="non-scaling-stroke"
        ></line>
      `;
    });
  }
  renderPreviewOverlay(e) {
    if (!e || e.hops.length < 2) return f;
    const t = e.hops.map((i) => `${i.point[0] * ee},${i.point[1] * ee}`).join(" ");
    return C`
      <polyline
        points=${t}
        class=${`preview-line ${e.source}`}
        fill="none"
        vector-effect="non-scaling-stroke"
      ></polyline>
      ${e.hops.map((i, r) => C`
        <g transform=${`translate(${i.point[0] * ee} ${i.point[1] * ee})`}>
          <circle
            class=${i.kind === "room" ? "preview-room" : i.kind === "node" ? "preview-node" : "preview-point"}
            r=${i.kind === "room" ? "14" : "11"}
          ></circle>
          <text class="preview-number" y="-20" text-anchor="middle">${r + 1}</text>
        </g>
      `)}
    `;
  }
  renderDisconnectedMarkers() {
    if (!this.config) return f;
    const e = Ri(
      this.config,
      (r) => this.entityState(r)
    ), t = e.disconnectedRoomIds.map((r) => {
      const n = we(this.config, r);
      return n ? C`
        <g transform=${`translate(${n[0] * ee} ${n[1] * ee})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    }), i = e.disconnectedNodeIds.map((r) => {
      const n = this.routeNodes.find((o) => o.id === r);
      return n ? C`
        <g transform=${`translate(${n.point[0] * ee} ${n.point[1] * ee})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    });
    return C`${t}${i}`;
  }
  renderBlockedEdges(e) {
    return e.length ? h`
      <div class="live-summary blocked">
        <strong>${e.length} forbindelse${e.length === 1 ? "" : "r"} blokeret lige nu</strong>
        <span>De bliver automatisk udeladt fra shortest-path beregningen.</span>
      </div>
      <div class="blocked-list">
        ${e.map((t) => h`
          <div class="blocked-item">
            <strong>${this.endpointLabel(t.edge.from)} ↔ ${this.endpointLabel(t.edge.to)}</strong>
            <span>${t.conditionSource === "node" ? `Arvet fra dørpunkt · ${t.entity ?? "Ingen entity"}` : t.entity ?? "Ingen entity"}</span>
            <small>${this.blockedReason(t)} · åben/tilladt: ${t.allowedStates.join(", ")}</small>
          </div>
        `)}
      </div>
    ` : h`<div class="live-summary ok"><strong>Alle live-styrede forbindelser er aktive</strong><span>Ingen dørpunkter eller route-conditions blokerer graph'et lige nu.</span></div>`;
  }
  renderDiagnostics() {
    if (!this.config) return f;
    const e = Ri(
      this.config,
      (r) => this.entityState(r)
    ), t = this.graphEdges.length > 0, i = e.invalidEdges + e.duplicateEdges + e.disconnectedRoomIds.length + e.disconnectedNodeIds.length + e.brokenRouteNodeReferences.length + e.unresolvedConditionEntities.length + Math.max(0, e.components - 1);
    return t ? h`
      ${this.renderBlockedEdges(e.blockedEdges)}

      <div class=${i ? "diagnostic-summary warning" : "diagnostic-summary ok"}>
        <strong>${i ? `${i} ting bør kontrolleres` : "Graph-konfigurationen ser korrekt ud"}</strong>
        <span>${i ? "Dette er konfigurationsadvarsler. En normal lukket dør tæller ikke som en fejl." : "Ingen åbenlyse strukturelle problemer fundet."}</span>
      </div>

      <div class="metric-grid">
        <div><strong>${this.graphEdges.length}</strong><span>forbindelser</span></div>
        <div><strong>${e.conditionalEdges}</strong><span>live styrede</span></div>
        <div><strong>${e.conditionalNodes}</strong><span>dør/punkt-bindinger</span></div>
        <div><strong>${e.blockedNodes.length}</strong><span>blokerede punkter</span></div>
        <div><strong>${e.blockedEdges.length}</strong><span>blokerede forbindelser</span></div>
        <div><strong>${e.components}</strong><span>graph-dele</span></div>
        <div><strong>${e.disconnectedRoomIds.length}</strong><span>frakoblede rum</span></div>
        <div><strong>${e.disconnectedNodeIds.length}</strong><span>frakoblede punkter</span></div>
      </div>

      ${e.components > 1 ? h`
        <div class="issue"><strong>Graph er opdelt</strong><span>${e.components} separate netværk kan ikke finde vej til hinanden strukturelt.</span></div>
      ` : f}
      ${e.disconnectedRoomIds.length ? h`
        <div class="issue"><strong>Frakoblede rum</strong><span>${e.disconnectedRoomIds.map((r) => this.roomName(r)).join(", ")}</span></div>
      ` : f}
      ${e.disconnectedNodeIds.length ? h`
        <div class="issue"><strong>Frakoblede punkter</strong><span>${e.disconnectedNodeIds.map((r) => this.routeNodeName(r)).join(", ")}</span></div>
      ` : f}
      ${e.invalidEdges ? h`
        <div class="issue"><strong>Ugyldige forbindelser</strong><span>${e.invalidEdges} forbindelse${e.invalidEdges === 1 ? "" : "r"} peger på et manglende punkt, manglende rum eller sig selv.</span></div>
      ` : f}
      ${e.duplicateEdges ? h`
        <div class="issue"><strong>Duplikerede forbindelser</strong><span>${e.duplicateEdges} ekstra forbindelse${e.duplicateEdges === 1 ? "" : "r"} forbinder de samme endpoints.</span></div>
      ` : f}
      ${e.unresolvedConditionEntities.length ? h`
        <div class="issue"><strong>Live bindinger med manglende entity</strong><span>${e.unresolvedConditionEntities.join(", ")}</span></div>
      ` : f}
      ${e.brokenRouteNodeReferences.length ? h`
        <div class="issue"><strong>Manuelle ruter med manglende shared node</strong><span>${e.brokenRouteNodeReferences.map((r) => `${this.roomName(r.from)} ↔ ${this.roomName(r.to)}: ${r.nodeId}`).join(" · ")}</span></div>
      ` : f}
    ` : h`
        <div class="diagnostic-summary neutral">
          <strong>Graph endnu ikke opbygget</strong>
          <span>Der er ingen graph-forbindelser at diagnosticere endnu.</span>
        </div>
      `;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.selectedResolution();
    return h`
      <section class="diagnostics">
        <div class="heading">
          <div><span>Route Preview & Diagnostics</span><h3>Se præcis hvilken vej Explorer vælger</h3></div>
          <b>Door bindings · v0.20.1</b>
        </div>

        <div class="instruction">
          Vælg to rum for at simulere routing uden at flytte en person. Preview bruger samme Home Assistant states som runtime. Dørpunkt-bindinger og ekstra route-conditions evalueres af den samme resolver før graph-routing.
        </div>

        <div class="selectors">
          <label>Fra rum
            <select .value=${this.fromRoom} @change=${(i) => this.fromRoom = i.target.value}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((i) => h`<option value=${i.id}>${i.name ?? i.id}</option>`)}
            </select>
          </label>
          <label>Til rum
            <select .value=${this.toRoom} @change=${(i) => this.toRoom = i.target.value}>
              <option value="">Vælg rum</option>
              ${this.rooms.map((i) => h`<option value=${i.id}>${i.name ?? i.id}</option>`)}
            </select>
          </label>
        </div>

        ${this.fromRoom && this.toRoom && this.fromRoom === this.toRoom ? h`
          <div class="diagnostic-summary neutral"><strong>Vælg to forskellige rum</strong><span>Start og destination kan ikke være det samme rum.</span></div>
        ` : t ? h`
          <div class=${`route-result ${t.source}`}>
            <div class="route-result-top">
              <strong>${this.sourceLabel(t)}</strong>
              <span>Relativ afstand ${this.formatDistance(t.distance)}</span>
            </div>
            <p>${this.sourceDescription(t)}</p>
            <div class="hop-list">
              ${t.hops.map((i, r) => h`
                <span>${r ? h`<i>→</i>` : f}<b>${i.label}</b></span>
              `)}
            </div>
          </div>
        ` : f}

        ${e ? h`
          <div class="map-frame">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <image href=${e} x="0" y="0" width="1000" height="1000" preserveAspectRatio=${this.config.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>
              ${this.renderGraphOverlay()}
              ${this.renderDisconnectedMarkers()}
              ${this.renderPreviewOverlay(t)}
            </svg>
          </div>
          <div class="legend"><span><i class="line active"></i>Aktiv graph</span><span><i class="line conditional"></i>Live styret</span><span><i class="line blocked"></i>Blokeret</span></div>
        ` : f}

        <div class="diagnostic-heading"><strong>Netværksdiagnostik</strong><span>Gennemgår dørbindinger, route-conditions, graph, rum, shared nodes og manuelle node-referencer.</span></div>
        ${this.renderDiagnostics()}
      </section>
    `;
  }
};
Ce.styles = I`
    :host{display:block}.diagnostics{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.route-result{display:grid;gap:8px;padding:12px;border:1px solid var(--divider-color);border-radius:11px}.route-result.manual{border-left:5px solid var(--warning-color,#ff9800)}.route-result.graph{border-left:5px solid var(--primary-color,#03a9f4)}.route-result.fallback{border-left:5px solid var(--secondary-text-color)}.route-result-top{display:flex;justify-content:space-between;gap:12px;align-items:center}.route-result-top span{color:var(--secondary-text-color);font-size:.82rem}.route-result p{margin:0;color:var(--secondary-text-color);font-size:.88rem;line-height:1.4}.hop-list{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:.82rem}.hop-list span{display:flex;gap:6px;align-items:center}.hop-list b{padding:4px 7px;border-radius:999px;background:var(--secondary-background-color)}.hop-list i{font-style:normal;color:var(--secondary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-context{stroke:var(--secondary-text-color);stroke-width:3;stroke-opacity:.28}.graph-context.conditional{stroke-dasharray:8 8;stroke:var(--primary-color,#03a9f4);stroke-opacity:.5}.graph-context.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.preview-line{stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.preview-line.manual{stroke:var(--warning-color,#ff9800)}.preview-line.graph{stroke:var(--primary-color,#03a9f4)}.preview-line.fallback{stroke:var(--secondary-text-color);stroke-dasharray:16 10}.preview-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.preview-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.preview-point{fill:white;stroke:var(--warning-color,#ff9800);stroke-width:5}.preview-number{font-size:22px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6}.disconnected{fill:var(--error-color,#db4437);fill-opacity:.18;stroke:var(--error-color,#db4437);stroke-width:4;stroke-dasharray:5 4}.warning-mark{font-size:24px;font-weight:900;fill:var(--error-color,#db4437)}.diagnostic-heading{display:grid;gap:2px}.diagnostic-heading span{color:var(--secondary-text-color);font-size:.8rem}.diagnostic-summary,.live-summary{display:grid;gap:3px;padding:11px 12px;border-radius:10px;border:1px solid var(--divider-color)}.diagnostic-summary span,.live-summary span{color:var(--secondary-text-color);font-size:.84rem}.diagnostic-summary.ok,.live-summary.ok{border-left:5px solid var(--success-color,#4caf50)}.diagnostic-summary.warning{border-left:5px solid var(--warning-color,#ff9800)}.diagnostic-summary.neutral{border-left:5px solid var(--secondary-text-color)}.live-summary.blocked{border-left:5px solid var(--error-color,#db4437)}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.metric-grid div{display:grid;gap:2px;padding:10px;border-radius:9px;background:var(--secondary-background-color)}.metric-grid strong{font-size:1.15rem}.metric-grid span{color:var(--secondary-text-color);font-size:.75rem}.issue{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(255,152,0,.1);border:1px solid rgba(255,152,0,.3)}.issue span{color:var(--secondary-text-color);font-size:.82rem;line-height:1.4}.blocked-list{display:grid;gap:7px}.blocked-item{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(219,68,55,.08);border:1px solid rgba(219,68,55,.25)}.blocked-item span,.blocked-item small{color:var(--secondary-text-color);font-size:.8rem}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;align-items:center;gap:6px}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--secondary-text-color)}.legend .line.conditional{border-top-color:var(--primary-color,#03a9f4);border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:760px){.metric-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.selectors{grid-template-columns:1fr}.route-result-top{align-items:flex-start;flex-direction:column}}
  `;
at([
  A({ attribute: !1 })
], Ce.prototype, "config", 2);
at([
  A({ attribute: !1 })
], Ce.prototype, "hass", 2);
at([
  b()
], Ce.prototype, "fromRoom", 2);
at([
  b()
], Ce.prototype, "toRoom", 2);
Ce = at([
  R("ha-explorer-route-diagnostics")
], Ce);
var es = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, si = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ts(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && es(t, i, n), n;
};
const is = { basic: 0, rooms: 1, presences: 2 };
let Gt = class extends O {
  updated(e) {
    super.updated(e), e.has("config") && this.config && this.setConfig(this.config);
  }
  render() {
    return this.renderRoomDrawingEditor();
  }
};
si([
  A({ attribute: !1 })
], Gt.prototype, "config", 2);
Gt = si([
  R("ha-explorer-room-tools")
], Gt);
let Zt = class extends se {
  constructor() {
    super(...arguments), this.handleNativeControlChange = (e) => {
      e.stopPropagation(), queueMicrotask(() => {
        const t = this.currentConfig;
        t && this.emitHomeAssistantConfig(t);
      });
    }, this.handleItemCardClick = (e) => {
      const t = e.target;
      if (!t || t.closest("button, input, select, textarea, a")) return;
      const i = t.closest(".item-heading"), r = i?.closest(".item-card");
      !i || !r || r.classList.toggle("item-open");
    };
  }
  get currentConfig() {
    return this.config;
  }
  emitHomeAssistantConfig(e) {
    const t = new Event("config-changed", { bubbles: !0, composed: !0 });
    return t.detail = { config: e }, super.dispatchEvent(t);
  }
  firstUpdated() {
    this.renderRoot.addEventListener("change", this.handleNativeControlChange), this.renderRoot.addEventListener("click", this.handleItemCardClick), queueMicrotask(() => this.baseSections.forEach((e) => e.open = !1));
  }
  disconnectedCallback() {
    this.renderRoot.removeEventListener("change", this.handleNativeControlChange), this.renderRoot.removeEventListener("click", this.handleItemCardClick), super.disconnectedCallback();
  }
  get baseSections() {
    const e = this.renderRoot.querySelector(".editor");
    return e ? Array.from(e.querySelectorAll(":scope > details")) : [];
  }
  handleToolConfigChanged(e) {
    const t = e.detail?.config;
    t && (e.stopPropagation(), this.setConfig(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: t }, bubbles: !0, composed: !0 })));
  }
  handleEditorNavigate(e) {
    const t = e.detail?.target;
    if (!t) return;
    e.stopPropagation();
    const i = is[t];
    let r;
    if (i !== void 0) {
      const n = this.baseSections[i];
      n && (n.open = !0, r = n);
    } else {
      const n = this.renderRoot.querySelector(`details[data-editor-section="${t}"]`);
      n && (n.open = !0, r = n);
    }
    r && (r.classList.add("ux-focus"), r.scrollIntoView({ behavior: "smooth", block: "start" }), window.setTimeout(() => r?.classList.remove("ux-focus"), 1300));
  }
  renderAdvancedSection(e, t, i, r) {
    return h`<details class="advanced-section" data-editor-section=${e}><summary><span>${t}</span><span class="advanced-hint">${i}</span></summary><div class="advanced-content">${r}</div></details>`;
  }
  render() {
    const e = this.currentConfig;
    return h`
    <details class="setup-section"><summary><span>Opsætningsoversigt</span><span class="advanced-hint">Status & genveje</span></summary><div class="setup-content"><ha-explorer-setup-overview .hass=${this.hass} .config=${e} @explorer-editor-navigate=${this.handleEditorNavigate}></ha-explorer-setup-overview></div></details>
    ${super.render()}
    <div class="advanced-heading"><div><span>Avancerede værktøjer</span><strong>Åbn kun det du arbejder med</strong></div><small>Routing, udseende, åbninger, zoner og live-effekter</small></div>
    <div class="advanced-tools">
      ${this.renderAdvancedSection("appearance", "Appearance", "Classic / Enchanted Antique", h`<ha-explorer-theme-editor .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-theme-editor>`)}
      ${this.renderAdvancedSection("room-tools", "Visuel rum-editor", "Tegn rum og presence-anchors", h`<ha-explorer-room-tools .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-room-tools>`)}
      ${this.renderAdvancedSection("presences", "Multi-Person & Identity", "Navne, profiler og separate mmWave-targets", h`<ha-explorer-identity-editor .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-identity-editor>`)}
      ${this.renderAdvancedSection("presences", "Visuel profil", "Farver, ikoner og synlighed", h`<ha-explorer-presence-polish-editor .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-presence-polish-editor>`)}
      ${this.renderAdvancedSection("openings", "Dynamic Doors & Windows", "Placér døre/vinduer, hængsel, sving og entity", h`<ha-explorer-openings-editor .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-openings-editor>`)}
      ${this.renderAdvancedSection("zones", "Zones / Dynamic Areas", "Alarm, rengøring og dynamiske områder", h`<ha-explorer-zones-editor .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-zones-editor>`)}
      ${this.renderAdvancedSection("room-reactions", "Living Entity Points", "Lamper, TV, sensorer og temperatur", h`<ha-explorer-room-reactions-editor-clean .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-room-reactions-editor-clean>`)}
      ${this.renderAdvancedSection("room-actions", "Rumscener og hurtighandlinger", "Tænd/sluk alt, scenes og scripts", h`<ha-explorer-room-actions-editor .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-room-actions-editor>`)}
      ${this.renderAdvancedSection("routes", "Route Network", "Manuelle routes og shared nodes", h`<ha-explorer-route-editor .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-route-editor>`)}
      ${this.renderAdvancedSection("route-graph", "Automatic Route Graph", "Graph edges, døre og live conditions", h`<ha-explorer-route-graph-editor .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-route-graph-editor>`)}
      ${this.renderAdvancedSection("diagnostics", "Route Preview & Diagnostics", "Kontrollér graph og resolved routes", h`<ha-explorer-route-diagnostics .hass=${this.hass} .config=${e}></ha-explorer-route-diagnostics>`)}
    </div>`;
  }
  dispatchEvent(e) {
    if (e.type !== "config-changed") return super.dispatchEvent(e);
    const t = e.detail?.config;
    return t ? this.emitHomeAssistantConfig(t) : super.dispatchEvent(e);
  }
};
Zt.styles = I`${se.styles}.setup-section,.advanced-section{scroll-margin-top:16px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden;background:var(--card-background-color);transition:border-color 180ms ease,box-shadow 180ms ease}.setup-section{margin-bottom:12px}.setup-section>summary,.advanced-section>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;cursor:pointer;font-weight:700}.setup-section>summary::-webkit-details-marker,.advanced-section>summary::-webkit-details-marker{display:none}.setup-section>summary::after,.advanced-section>summary::after{content:"⌄";margin-left:4px;color:var(--secondary-text-color);transition:transform 160ms ease}.setup-section[open]>summary::after,.advanced-section[open]>summary::after{transform:rotate(180deg)}.setup-content{padding:0 10px 10px}.setup-content>*{margin-top:0}.item-card:not(.item-open)>:not(.item-heading){display:none!important}.item-heading{cursor:pointer;user-select:none}.item-heading::after{content:"⌄";flex:none;color:var(--secondary-text-color);transition:transform 160ms ease}.item-card.item-open .item-heading::after{transform:rotate(180deg)}.advanced-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:16px 2px 8px;color:var(--secondary-text-color)}.advanced-heading>div{display:grid;gap:2px}.advanced-heading span{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}.advanced-heading strong{color:var(--primary-text-color);font-size:.92rem}.advanced-heading small{font-size:.75rem}.advanced-tools{display:grid;gap:9px;padding-bottom:8px}.advanced-hint{margin-left:auto;color:var(--secondary-text-color);font-size:.75rem;font-weight:500;text-align:right}.advanced-content{padding:0 10px 10px}.advanced-content>*{margin-top:0}.ux-focus{border-color:var(--primary-color,#03a9f4)!important;box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color,#03a9f4) 18%,transparent)}@media(max-width:600px){.advanced-heading{align-items:flex-start;flex-direction:column}.setup-section>summary,.advanced-section>summary{align-items:flex-start}.advanced-hint{max-width:48%}}`;
Zt = si([
  R("ha-explorer-ha-editor")
], Zt);
function Gi(e) {
  return Math.min(1, Math.max(0, e));
}
function gr(e) {
  return e.trim().toLocaleLowerCase().replace(/[\s_-]+/g, " ");
}
function Vt(e, t) {
  if (t.length < 3) return !1;
  let i = !1;
  const [r, n] = e;
  for (let o = 0, s = t.length - 1; o < t.length; s = o++) {
    const [a, l] = t[o], [d, p] = t[s];
    l > n != p > n && r < (d - a) * (n - l) / (p - l || Number.EPSILON) + a && (i = !i);
  }
  return i;
}
function rs(e) {
  if (!e.length) return [0.5, 0.5];
  const [t, i] = e.reduce(
    ([r, n], [o, s]) => [r + o, n + s],
    [0, 0]
  );
  return [t / e.length, i / e.length];
}
function ns(e) {
  if (e.length < 3) return;
  let t = 0, i = 0, r = 0;
  for (let n = 0; n < e.length; n += 1) {
    const [o, s] = e[n], [a, l] = e[(n + 1) % e.length], d = o * l - a * s;
    t += d, i += (o + a) * d, r += (s + l) * d;
  }
  if (!(Math.abs(t) < Number.EPSILON))
    return [i / (3 * t), r / (3 * t)];
}
function Me(e) {
  return { x: Gi(e.x), y: Gi(e.y) };
}
function os(e) {
  return [e.id, e.area_id, e.name, ...e.aliases ?? []].filter((t) => typeof t == "string" && t.trim().length > 0).map(gr);
}
function mr(e, t) {
  if (!t?.trim()) return;
  const i = gr(t);
  return e.find((r) => os(r).includes(i));
}
function ss(e) {
  if (e.presence_anchor) return Me(e.presence_anchor);
  if (e.label) return Me(e.label);
  const t = ns(e.points);
  if (t && Vt(t, e.points))
    return Me({ x: t[0], y: t[1] });
  const i = rs(e.points);
  if (Vt(i, e.points))
    return Me({ x: i[0], y: i[1] });
  if (e.points.length) {
    const r = e.points.map(([s]) => s), n = e.points.map(([, s]) => s), o = [
      (Math.min(...r) + Math.max(...r)) / 2,
      (Math.min(...n) + Math.max(...n)) / 2
    ];
    return Vt(o, e.points) ? Me({ x: o[0], y: o[1] }) : Me({ x: e.points[0][0], y: e.points[0][1] });
  }
  return { x: 0.5, y: 0.5 };
}
const as = ["unknown", "unavailable", "not_detected"], ls = /* @__PURE__ */ new Set(["", "unknown", "unavailable", "none", "null"]);
function W(e, t) {
  return e && t ? e.attributes[t] : void 0;
}
function pe(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function ve(e, t) {
  const i = pe(e);
  return i === void 0 ? t : Math.min(1, Math.max(0, i));
}
function ds(e, t) {
  if (typeof e == "boolean") return e;
  if (typeof e == "number") return e !== 0;
  if (typeof e == "string") {
    const i = e.trim().toLowerCase();
    if (["true", "on", "yes", "1", "home"].includes(i)) return !0;
    if (["false", "off", "no", "0", "not_home"].includes(i)) return !1;
  }
  return t;
}
function pt(e, t) {
  return typeof e == "string" && e.trim() ? e : t;
}
function Zi(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return ls.has(t.toLowerCase()) ? void 0 : t;
}
function cs(e, t, i) {
  if (e.room_entity) {
    const r = i.states[e.room_entity];
    return r ? Zi(e.room_attribute ? W(r, e.room_attribute) : r.state) : void 0;
  }
  if (t)
    return Zi(W(t, e.room_attribute ?? "explorer_room"));
}
function ps(e) {
  if (!e.points.length) return;
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function Ui(e, t, i, r, n, o) {
  const s = i - t;
  return Math.abs(s) < 1e-6 ? o : r + (e - t) / s * (n - r);
}
function Wi(e, t, i, r, n, o, s) {
  const a = i.sensor_x * (r.sensor_y - n.sensor_y) + r.sensor_x * (n.sensor_y - i.sensor_y) + n.sensor_x * (i.sensor_y - r.sensor_y);
  if (Math.abs(a) < 1e-6) return s;
  const l = i[o], d = r[o], p = n[o], c = (l * (r.sensor_y - n.sensor_y) + d * (n.sensor_y - i.sensor_y) + p * (i.sensor_y - r.sensor_y)) / a, g = (l * (n.sensor_x - r.sensor_x) + d * (i.sensor_x - n.sensor_x) + p * (r.sensor_x - i.sensor_x)) / a, u = (l * (r.sensor_x * n.sensor_y - n.sensor_x * r.sensor_y) + d * (n.sensor_x * i.sensor_y - i.sensor_x * n.sensor_y) + p * (i.sensor_x * r.sensor_y - r.sensor_x * i.sensor_y)) / a;
  return c * e + g * t + u;
}
function hs(e, t, i) {
  const r = e.physical_meters, n = pe(r?.width), o = pe(r?.height), s = ps(e);
  if (!n || !o || n <= 0 || o <= 0 || !s) return {};
  const a = r?.flip_x ? n - t : t, l = r?.flip_y ? o - i : i;
  let d = Math.min(1, Math.max(0, a / n)), p = Math.min(1, Math.max(0, l / o));
  const c = r?.position_calibration;
  return c?.c ? (d = Wi(a, l, c.a, c.b, c.c, "room_x", d), p = Wi(a, l, c.a, c.b, c.c, "room_y", p)) : c && (d = Ui(a, c.a.sensor_x, c.b.sensor_x, c.a.room_x, c.b.room_x, d), p = Ui(l, c.a.sensor_y, c.b.sensor_y, c.a.room_y, c.b.room_y, p)), d = Math.min(1, Math.max(0, d)), p = Math.min(1, Math.max(0, p)), { x: s.minX + d * (s.maxX - s.minX), y: s.minY + p * (s.maxY - s.minY) };
}
function ht(e, t, i) {
  const r = mr(t, i ?? e.room_id);
  if (r) {
    const s = ss(r);
    return { ...e, x: s.x, y: s.y, room_id: r.id };
  }
  const n = ve(e.x), o = ve(e.y);
  return n === void 0 || o === void 0 ? { ...e, x: n, y: o, visible: !1 } : { ...e, x: n, y: o };
}
function us(e, t, i, r, n, o) {
  if (!i) return { x: ve(e.x), y: ve(e.y) };
  const s = t.coordinate_space === "meters" || t.coordinate_space === "room_meters", a = t.x_attribute ?? (s ? "map_x" : "explorer_x"), l = t.y_attribute ?? (s ? "map_y" : "explorer_y");
  if (t.coordinate_space === "room_meters") {
    const d = pe(W(i, a)), p = pe(W(i, l)), c = mr(r, n ?? e.room_id);
    return d === void 0 || p === void 0 || !c ? {} : { ...hs(c, d, p), roomId: c.id };
  }
  if (t.coordinate_space === "meters") {
    const d = pe(W(i, a)), p = pe(W(i, l)), c = pe(o?.width), g = pe(o?.height);
    return d === void 0 || p === void 0 || !c || !g || c <= 0 || g <= 0 ? {} : { x: ve(d / c), y: ve(p / g) };
  }
  return { x: ve(W(i, a), e.x), y: ve(W(i, l), e.y) };
}
function gs(e, t, i = [], r) {
  const n = e.entity_binding;
  if (!n || !t) return ht(e, i);
  const o = n.entity ? t.states[n.entity] : void 0, s = n.position_entity ?? n.entity, a = s ? t.states[s] : void 0;
  if (n.entity && !o) return { ...ht(e, i), visible: !1 };
  if (n.position_entity && !a) return { ...ht(e, i), visible: !1 };
  const l = n.hidden_states ?? as, d = o ? l.includes(o.state) : !1, p = a && a !== o ? l.includes(a.state) : !1, c = W(o, n.visible_attribute), g = d || p ? !1 : ds(c, e.visible ?? !0), u = cs(n, o, t) ?? e.room_id, y = us(e, n, a, i, u, r), m = { ...e, x: y.x, y: y.y, room_id: y.roomId ?? e.room_id, name: e.name ?? pt(W(o, n.name_attribute ?? "friendly_name")), avatar: e.avatar ?? pt(W(o, n.avatar_attribute ?? "entity_picture")), icon: e.icon ?? (n.icon_attribute ? pt(W(o, n.icon_attribute)) : void 0), color: e.color ?? pt(W(o, n.color_attribute ?? "explorer_color")), visible: g };
  return n.coordinate_space === "room_meters" ? m.x === void 0 || m.y === void 0 ? { ...m, visible: !1 } : m : ht(m, i, u);
}
function ms(e, t, i = [], r) {
  return e.map((n) => gs(n, t, i, r));
}
const Te = /* @__PURE__ */ new Map(), fs = 0.22, bs = 0.16, ys = 3e4, vs = 0.025, xs = 0.018;
function $t(e) {
  return Number.isFinite(e.x) && Number.isFinite(e.y) ? { x: e.x, y: e.y } : void 0;
}
function Ut(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function Ie(e) {
  return e.entity_binding?.entity ?? e.id;
}
function Ze(e) {
  return e.entity_binding?.position_entity;
}
function fr(e) {
  return e.previous ? { x: e.point.x + (e.point.x - e.previous.x), y: e.point.y + (e.point.y - e.previous.y) } : e.point;
}
function ws(e, t) {
  const i = $t(t), r = Ut(e.point, i), n = Ut(fr(e), i), o = e.target && e.target === Ze(t) ? vs : 0;
  return { candidate: t, distance: r, score: Math.min(r, n * 0.82) - o };
}
function Yi(e, t, i) {
  const r = Ie(e), n = $t(t);
  if (!n) return;
  const o = Te.get(r);
  Te.set(r, { point: n, previous: o?.point, target: Ze(t), seenAt: i });
}
function $s(e, t = Date.now()) {
  for (const [a, l] of Te) t - l.seenAt > ys && Te.delete(a);
  const i = e.filter((a) => (a.type ?? "person") === "person" && a.visible !== !1 && $t(a) && Ze(a)), r = new Set(i), n = e.filter((a) => !r.has(a)), o = /* @__PURE__ */ new Map();
  for (const a of i) {
    const l = a.room_id ?? "__no_room__", d = o.get(l) ?? [];
    d.push(a), o.set(l, d);
  }
  const s = [];
  for (const a of o.values()) {
    if (a.length < 2) {
      for (const u of a)
        s.push(u), Yi(u, u, t);
      continue;
    }
    const l = [...a], d = [...a].sort((u, y) => Ie(u).localeCompare(Ie(y))), p = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set(), g = d.map((u) => {
      const y = Te.get(Ie(u));
      if (!y) return { identity: u, track: void 0, scores: [] };
      const m = l.map(($) => ws(y, $)).sort(($, w) => $.score - w.score);
      return { identity: u, track: y, scores: m };
    }).sort((u, y) => (u.scores[0]?.score ?? 1 / 0) - (y.scores[0]?.score ?? 1 / 0));
    for (const u of g) {
      const { identity: y, track: m } = u;
      if (!m) continue;
      const $ = u.scores.filter((M) => !c.has(M.candidate));
      if (!$.length) continue;
      const w = $[0], _ = $[1], k = w.distance <= fs || Ut(fr(m), $t(w.candidate)) <= bs, E = !!_ && _.score - w.score < xs;
      k && !E && (p.set(Ie(y), w.candidate), c.add(w.candidate));
    }
    for (const u of d) {
      const y = Ie(u);
      let m = p.get(y);
      if (m || (m = l.find((w) => !c.has(w) && Ze(w) === Ze(u)), m && c.add(m)), m || (m = l.find((w) => !c.has(w)), m && c.add(m)), !m) {
        s.push(u);
        continue;
      }
      const $ = { ...u, x: m.x, y: m.y, room_id: m.room_id, visible: m.visible };
      s.push($), Yi(u, m, t);
    }
  }
  return [...s, ...n];
}
function ks() {
  Te.clear();
}
var _s = Object.defineProperty, As = Object.getOwnPropertyDescriptor, St = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? As(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && _s(t, i, n), n;
};
const br = "0.40.0-beta.32";
let qe = class extends D {
  constructor() {
    super(...arguments), this.preview = !1;
  }
  static getConfigElement() {
    return document.createElement("ha-explorer-ha-editor");
  }
  static getStubConfig() {
    return { type: "custom:ha-explorer-card", title: "Home Assistant Explorer", floorplan_meters: { width: 4.3, height: 5.4 }, min_zoom: 1, max_zoom: 6, initial_zoom: 1, fit_mode: "contain", appearance: { theme: "classic", hide_source_text: !1, day_night: { enabled: !1, mode: "auto", sun_entity: "sun.sun", night_states: ["below_horizon"], intensity: 0.72 }, compass: { visible: !0, rotation: -7, size: 1 }, alarm: { enabled: !1, entity: "", armed_states: ["armed_away", "armed_home", "armed_night", "armed_vacation", "armed_custom_bypass"], triggered_states: ["triggered"], intensity: 0.75 }, occupancy: { enabled: !1, home_states: ["home"], intensity: 0.65 }, weather: { enabled: !1, entity: "weather.home", intensity: 0.6, rain_states: ["rainy", "pouring"], storm_states: ["lightning", "lightning-rainy"], snow_states: ["snowy", "snowy-rainy", "hail"], fog_states: ["fog"], cloudy_states: ["cloudy", "partlycloudy"] } }, rooms: [{ id: "stue", name: "Stue", points: [[0, 0], [1, 0], [1, 1], [0, 1]], label: { x: 0.5, y: 0.5 }, physical_meters: { width: 4.3, height: 5.4 } }], zones: [], route_nodes: [], route_graph_edges: [], routes: [], openings: [], presences: [] };
  }
  setConfig(e) {
    if (!e) throw new Error("Configuration is required");
    ks(), this.config = { title: "Home Assistant Explorer", min_zoom: 1, max_zoom: 6, initial_zoom: 1, fit_mode: "contain", rooms: [], zones: [], route_nodes: [], route_graph_edges: [], routes: [], openings: [], presences: [], ...e, appearance: { theme: "classic", ...e.appearance ?? {} } };
  }
  getCardSize() {
    return 6;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  defaultRoom() {
    return (this.config?.rooms?.length ?? 0) > 0 ? this.config?.rooms ?? [] : this.config?.floorplan_meters ? [{ id: "room", name: this.config.title ?? "Rum", points: [[0, 0], [1, 0], [1, 1], [0, 1]], label: { x: 0.5, y: 0.5 }, physical_meters: this.config.floorplan_meters }] : [];
  }
  isNight() {
    const e = this.config?.appearance?.day_night;
    if (!e?.enabled) return !1;
    if (e.mode === "night") return !0;
    if (e.mode === "day") return !1;
    const t = e.sun_entity?.trim() || "sun.sun", i = this.hass?.states[t]?.state?.toLowerCase();
    return i ? (e.night_states ?? ["below_horizon"]).map((r) => r.toLowerCase()).includes(i) : !1;
  }
  weatherState() {
    const e = this.config?.appearance?.weather;
    if (!e?.enabled) return "clear";
    const t = e.entity?.trim();
    return t && this.hass?.states[t]?.state?.trim().toLowerCase() || "clear";
  }
  weatherEffect(e = this.weatherState()) {
    const t = this.config?.appearance?.weather;
    if (!t?.enabled) return "clear";
    const i = (r, n) => new Set((r ?? n).map((o) => o.trim().toLowerCase())).has(e);
    return i(t.storm_states, ["lightning", "lightning-rainy"]) ? "storm" : i(t.snow_states, ["snowy", "snowy-rainy", "hail"]) ? "snow" : i(t.rain_states, ["rainy", "pouring"]) ? "rain" : i(t.fog_states, ["fog"]) ? "fog" : e === "cloudy" || e === "partlycloudy" || i(t.cloudy_states, ["cloudy", "partlycloudy"]) ? "cloudy" : "clear";
  }
  alarmState() {
    const e = this.config?.appearance?.alarm;
    if (!e?.enabled) return "normal";
    const t = e.entity?.trim();
    if (!t) return "normal";
    const i = this.hass?.states[t]?.state?.toLowerCase();
    return i ? (e.triggered_states ?? ["triggered"]).map((o) => o.toLowerCase()).includes(i) ? "triggered" : (e.armed_states ?? ["armed_away", "armed_home", "armed_night", "armed_vacation", "armed_custom_bypass"]).map((o) => o.toLowerCase()).includes(i) ? "armed" : "normal" : "normal";
  }
  someoneHome(e) {
    const t = this.config?.appearance?.occupancy;
    if (!t?.enabled) return !1;
    const i = (t.home_states ?? ["home"]).map((r) => r.trim().toLowerCase()).filter(Boolean);
    return (this.config?.presences ?? []).filter((r) => (r.type ?? "person") === "person" && r.visible !== !1).some((r) => {
      const o = r.entity_binding?.entity?.trim();
      if (o) {
        const a = this.hass?.states[o]?.state?.toLowerCase();
        if (a && i.includes(a)) return !0;
        if (a && ["not_home", "unknown", "unavailable"].includes(a)) return !1;
      }
      return !!e.find((a) => a.id === r.id)?.room_id;
    });
  }
  renderClouds() {
    const e = (t, i) => h`<svg class=${`cloud ${t} cloud-v${i}`} viewBox="0 0 300 160" aria-hidden="true"><defs><filter id=${`cloud-soft-${t}`} x="-30%" y="-40%" width="160%" height="190%"><feTurbulence type="fractalNoise" baseFrequency=${i === 1 ? "0.025" : i === 2 ? "0.032" : "0.021"} numOctaves="2" seed=${String(i * 17)} result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale=${i === 2 ? "9" : "12"} xChannelSelector="R" yChannelSelector="G" result="distorted"/><feGaussianBlur in="distorted" stdDeviation=${i === 3 ? "2.8" : "2.1"}/></filter></defs><g class="cloud-haze" filter=${`url(#cloud-soft-${t})`}><ellipse cx="150" cy="101" rx="124" ry="43"/><circle cx="62" cy="92" r="36"/><circle cx="94" cy="69" r="47"/><circle cx="132" cy="60" r="55"/><circle cx="174" cy="67" r="48"/><circle cx="214" cy="83" r="41"/><circle cx="248" cy="100" r="30"/></g><g class="cloud-core" filter=${`url(#cloud-soft-${t})`}><ellipse cx="148" cy="105" rx="110" ry="33"/><circle cx="82" cy="88" r="33"/><circle cx="112" cy="70" r="41"/><circle cx="147" cy="66" r="48"/><circle cx="182" cy="75" r="40"/><circle cx="218" cy="92" r="32"/></g></svg>`;
    return h`<div class="cloud-field" aria-hidden="true">${e("cloud-a", 1)}${e("cloud-b", 2)}${e("cloud-c", 3)}${e("cloud-d", 1)}${e("cloud-e", 2)}${e("cloud-f", 3)}${e("cloud-g", 2)}${e("cloud-h", 1)}${e("cloud-i", 3)}${e("cloud-j", 2)}${e("cloud-k", 1)}${e("cloud-l", 3)}</div>`;
  }
  renderCelestialCloud() {
    return h`<div class="celestial-cloud" aria-hidden="true"></div>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.defaultRoom(), i = ms(this.config.presences ?? [], this.hass, t, this.config.floorplan_meters), r = $s(i), n = this.config.appearance?.theme ?? "classic", o = n === "enchanted_antique", s = this.isNight(), a = Math.min(1, Math.max(0.25, this.config.appearance?.day_night?.intensity ?? 0.72)), l = this.config.appearance?.compass ?? {}, d = this.config.appearance?.hide_source_text ?? !1, p = this.alarmState(), c = Math.min(1, Math.max(0.25, this.config.appearance?.alarm?.intensity ?? 0.75)), g = this.config.appearance?.occupancy?.enabled ?? !1, u = this.someoneHome(r), y = Math.min(1, Math.max(0.25, this.config.appearance?.occupancy?.intensity ?? 0.65)), m = this.config.appearance?.weather?.enabled ?? !1, $ = this.weatherState(), w = this.weatherEffect($), _ = Math.min(1, Math.max(0.25, this.config.appearance?.weather?.intensity ?? 0.6)), k = m && ["partlycloudy", "cloudy", "rainy", "pouring", "lightning", "lightning-rainy", "snowy", "snowy-rainy", "hail"].includes($), E = m && !s && ["sunny", "clear", "partlycloudy"].includes($), M = $ === "partlycloudy";
    return h`<ha-card class=${`${o ? "enchanted" : "classic"}${s ? " moonlight" : ""}${E ? " sunlight" : ""}${M ? " partly-cloudy" : ""}${k ? " has-clouds" : ""}${g ? u ? " occupied" : " empty-house" : ""}${m && w !== "clear" ? ` weather-${w}` : ""}${m ? ` state-${$}` : ""}${p === "armed" ? " alarm-armed" : ""}${p === "triggered" ? " alarm-triggered" : ""}${this.preview ? " preview" : ""}`} style=${`--moon-intensity:${a};--alarm-intensity:${c};--occupancy-intensity:${y};--weather-intensity:${_}`}><header><div><span>${p === "triggered" ? "⚠ Alarm Triggered" : p === "armed" ? "✦ Map Secured" : $ === "partlycloudy" ? s ? "☾ Partly Clouded Map" : "☀ Partly Clouded Map" : w === "storm" ? "⛈ Storm over the Map" : w === "rain" ? "☂ Rain over the Map" : w === "snow" ? "❄ Snow over the Map" : w === "fog" ? "◇ Mist over the Map" : w === "cloudy" ? "☁ Clouded Map" : E ? "☀ Sunlit Map" : g && u ? "✦ Someone is Home" : g ? "◇ Empty House" : s ? "Moonlight Explorer" : o ? "Enchanted Explorer" : "Explorer map"}</span><h1>${this.config.title}</h1></div><small>Enchanted Atmosphere · v${br}</small></header><div class="map-stage"><div class="weather-overlay"></div><div class="weather-particles"></div><div class="weather-flash"></div><div class="sun-overlay"></div><div class="sun-disc"></div><explorer-source-clean-canvas .theme=${n} .hideSourceText=${d} .weatherEffect=${m ? w : "clear"} .weatherIntensity=${_} .weatherNight=${s} .compassVisible=${l.visible ?? !0} .compassRotation=${l.rotation ?? -7} .compassSize=${l.size ?? 1} .hass=${this.hass} .image=${e} .rooms=${t} .zones=${this.config.zones ?? []} .routeNodes=${this.config.route_nodes ?? []} .routeGraphEdges=${this.config.route_graph_edges ?? []} .routes=${this.config.routes ?? []} .openings=${this.config.openings ?? []} .presences=${r} .minZoom=${this.config.min_zoom ?? 1} .maxZoom=${this.config.max_zoom ?? 6} .initialZoom=${this.config.initial_zoom ?? 1} .fitMode=${this.config.fit_mode ?? "contain"}></explorer-source-clean-canvas><div class="occupancy-overlay"></div><div class="moon-overlay"></div><div class="moon-disc"><span></span></div>${M ? this.renderCelestialCloud() : f}<div class="night-vignette"></div><div class="alarm-overlay"></div><div class="alarm-vignette"></div></div></ha-card>`;
  }
};
qe.styles = I`:host{display:block;width:100%;min-width:0}ha-card{width:100%;overflow:hidden;transition:background .6s,color .6s}ha-card.preview explorer-source-clean-canvas{--explorer-viewport-max-height:min(52vh,520px)}header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;color:var(--primary-text-color);background:var(--ha-card-background,var(--card-background-color));transition:background .6s,color .6s}header span{display:block;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--secondary-text-color)}h1{margin:3px 0 0;font-size:1.25rem}small{color:var(--secondary-text-color);white-space:nowrap}.map-stage{position:relative;overflow:hidden;isolation:isolate}.map-stage explorer-source-clean-canvas{position:relative;z-index:4;display:block}.occupancy-overlay,.weather-overlay,.weather-particles,.weather-flash,.sun-overlay,.sun-disc,.moon-overlay,.night-vignette,.moon-disc,.alarm-overlay,.alarm-vignette{position:absolute;pointer-events:none;opacity:0;transition:opacity .7s,filter .7s}.occupancy-overlay{inset:0;z-index:7}.occupied .occupancy-overlay{opacity:calc(.32 * var(--occupancy-intensity));background:radial-gradient(circle at 34% 28%,rgba(255,220,142,.36),transparent 31%),radial-gradient(circle at 68% 63%,rgba(205,148,70,.18),transparent 38%);mix-blend-mode:soft-light}.empty-house .occupancy-overlay{opacity:calc(.2 * var(--occupancy-intensity));background:linear-gradient(145deg,rgba(71,64,55,.16),rgba(42,49,57,.18));mix-blend-mode:multiply}.weather-overlay,.weather-particles,.weather-flash{inset:0;z-index:3;overflow:hidden}.cloud-field{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden;opacity:calc(.96 * var(--weather-intensity));filter:sepia(.42) saturate(.82) contrast(1.03)}.partly-cloudy .cloud-field{opacity:calc(.78 * var(--weather-intensity))}.state-rainy .cloud-field,.state-pouring .cloud-field,.state-lightning .cloud-field,.state-lightning-rainy .cloud-field{opacity:calc(1 * var(--weather-intensity));filter:sepia(.6) saturate(.62) brightness(.84)}.cloud{position:absolute;height:auto;overflow:visible;will-change:transform;transform-origin:center;filter:drop-shadow(0 8px 18px rgba(64,47,29,.22))}.cloud-haze{fill:rgba(211,186,139,.28)}.cloud-core{fill:rgba(232,209,163,.58)}.cloud-v2 .cloud-haze{fill:rgba(196,172,133,.25)}.cloud-v2 .cloud-core{fill:rgba(221,199,158,.52)}.cloud-v3 .cloud-haze{fill:rgba(177,158,129,.24)}.cloud-v3 .cloud-core{fill:rgba(210,190,154,.48)}.cloud-a{left:24%;top:-3%;width:34%;opacity:.8;animation:cloudDriftA 58s ease-in-out infinite alternate}.cloud-b{right:-9%;top:10%;width:38%;opacity:.88;animation:cloudDriftB 46s ease-in-out infinite alternate}.cloud-c{left:-12%;top:26%;width:40%;opacity:.82;animation:cloudDriftC 54s ease-in-out infinite alternate}.cloud-d{right:-11%;top:34%;width:35%;opacity:.74;animation:cloudDriftA 62s ease-in-out infinite alternate-reverse}.cloud-e{left:-8%;top:48%;width:34%;opacity:.7;animation:cloudDriftB 51s ease-in-out infinite alternate}.cloud-f{right:3%;top:55%;width:33%;opacity:.76;animation:cloudDriftC 64s ease-in-out infinite alternate-reverse}.cloud-g{left:7%;top:68%;width:31%;opacity:.72;animation:cloudDriftA 69s ease-in-out infinite alternate-reverse}.cloud-h{right:-8%;top:73%;width:39%;opacity:.82;animation:cloudDriftB 57s ease-in-out infinite alternate}.cloud-i{left:-10%;top:82%;width:37%;opacity:.7;animation:cloudDriftC 66s ease-in-out infinite alternate}.cloud-j{left:33%;top:88%;width:35%;opacity:.66;animation:cloudDriftA 72s ease-in-out infinite alternate}.cloud-k{right:19%;top:24%;width:28%;opacity:.56;animation:cloudDriftC 61s ease-in-out infinite alternate}.cloud-l{left:18%;top:40%;width:27%;opacity:.52;animation:cloudDriftB 67s ease-in-out infinite alternate-reverse}.partly-cloudy .cloud-c,.partly-cloudy .cloud-d,.partly-cloudy .cloud-e,.partly-cloudy .cloud-f,.partly-cloudy .cloud-g,.partly-cloudy .cloud-h,.partly-cloudy .cloud-i{display:none}.partly-cloudy .cloud-a{opacity:.66}.partly-cloudy .cloud-b{opacity:.72}.partly-cloudy .cloud-j{opacity:.42}.partly-cloudy .cloud-k{opacity:.52}.partly-cloudy .cloud-l{opacity:.46}.sun-overlay{inset:0;z-index:5;background:radial-gradient(circle at 12% 14%,rgba(255,236,177,.62) 0,rgba(244,193,92,.24) 18%,transparent 39%),linear-gradient(132deg,rgba(255,222,146,.19) 0,rgba(245,196,91,.08) 34%,transparent 58%);mix-blend-mode:screen}.sun-overlay:after{display:none}.sun-disc{z-index:6;left:7.5%;top:7%;width:58px;height:58px;border-radius:50%;background:radial-gradient(circle,#fff0bc 0,#f2c56d 38%,#d69635 63%,rgba(186,112,32,.08) 72%,transparent 74%);filter:drop-shadow(0 0 10px rgba(224,158,48,.48)) drop-shadow(0 0 30px rgba(244,199,102,.36))}.sun-disc:before{content:"";position:absolute;inset:-44%;border-radius:50%;background:repeating-conic-gradient(rgba(244,197,94,.2) 0deg 5deg,transparent 5deg 15deg);mask-image:radial-gradient(circle,transparent 0 27%,#000 31% 58%,transparent 74%);animation:sunBreathe 8s ease-in-out infinite}.sunlight .sun-overlay{opacity:calc(.82 * var(--weather-intensity))}.sunlight .sun-disc{opacity:calc(.9 * var(--weather-intensity))}.partly-cloudy .sun-overlay{opacity:calc(.62 * var(--weather-intensity))}.partly-cloudy .sun-disc{opacity:calc(.74 * var(--weather-intensity))}.celestial-cloud{position:absolute;pointer-events:none;width:134px;height:64px;opacity:0;z-index:7;will-change:transform,opacity;transform-origin:center;filter:drop-shadow(0 5px 10px rgba(64,48,31,.16))}.celestial-cloud:before{content:"";position:absolute;inset:4px 0 8px;border-radius:48% 52% 46% 54%;background:radial-gradient(ellipse at 14% 67%,rgba(207,191,163,.58) 0 20%,transparent 23%),radial-gradient(ellipse at 30% 44%,rgba(235,222,194,.64) 0 28%,transparent 32%),radial-gradient(ellipse at 48% 30%,rgba(246,232,203,.68) 0 31%,transparent 35%),radial-gradient(ellipse at 67% 40%,rgba(230,215,185,.64) 0 28%,transparent 32%),radial-gradient(ellipse at 84% 65%,rgba(199,180,148,.54) 0 21%,transparent 24%),linear-gradient(to bottom,transparent 26%,rgba(222,205,176,.48) 46%,rgba(177,151,116,.35) 74%,transparent 92%);filter:blur(1.35px);transform:skewX(-7deg);opacity:.92}.celestial-cloud:after{content:"";position:absolute;left:10%;top:41%;width:80%;height:25%;border-radius:50%;background:radial-gradient(ellipse at 24% 50%,rgba(246,233,207,.32) 0 24%,transparent 50%),radial-gradient(ellipse at 56% 45%,rgba(236,221,193,.28) 0 32%,transparent 58%),radial-gradient(ellipse at 82% 52%,rgba(201,181,150,.22) 0 22%,transparent 48%);filter:blur(3.2px);transform:translateY(10px) scaleX(.94);opacity:.86}.partly-cloudy:not(.moonlight) .celestial-cloud{left:2.2%;top:6.3%;opacity:.74;mix-blend-mode:normal;animation:celestialCloudSunDrift 20s ease-in-out infinite}.partly-cloudy:not(.moonlight) .sun-disc{animation:celestialSunVeil 20s ease-in-out infinite}.partly-cloudy:not(.moonlight) .sun-overlay{animation:celestialSunGlow 20s ease-in-out infinite}.partly-cloudy.moonlight .celestial-cloud{right:2.4%;top:4.9%;left:auto;z-index:10;opacity:.60;filter:drop-shadow(0 5px 11px rgba(12,19,28,.22));animation:celestialCloudMoonDrift 24s ease-in-out infinite}.partly-cloudy.moonlight .celestial-cloud:before{background:radial-gradient(ellipse at 14% 67%,rgba(132,143,153,.46) 0 20%,transparent 23%),radial-gradient(ellipse at 30% 44%,rgba(194,201,205,.52) 0 28%,transparent 32%),radial-gradient(ellipse at 48% 30%,rgba(214,218,216,.56) 0 31%,transparent 35%),radial-gradient(ellipse at 67% 40%,rgba(179,188,194,.50) 0 28%,transparent 32%),radial-gradient(ellipse at 84% 65%,rgba(112,124,135,.42) 0 21%,transparent 24%),linear-gradient(to bottom,transparent 26%,rgba(178,187,191,.36) 46%,rgba(85,99,112,.28) 74%,transparent 92%)}.partly-cloudy.moonlight .celestial-cloud:after{background:radial-gradient(ellipse at 24% 50%,rgba(213,219,220,.24) 0 24%,transparent 50%),radial-gradient(ellipse at 56% 45%,rgba(188,197,202,.22) 0 32%,transparent 58%),radial-gradient(ellipse at 82% 52%,rgba(114,128,139,.18) 0 22%,transparent 48%)}.partly-cloudy.moonlight .moon-disc{animation:celestialMoonVeil 24s ease-in-out infinite}.partly-cloudy.moonlight .sun-overlay,.partly-cloudy.moonlight .sun-disc{opacity:0!important;animation:none}.weather-fog .weather-overlay{opacity:calc(.58 * var(--weather-intensity));inset:-8%;background:repeating-linear-gradient(0deg,rgba(238,230,208,.3) 0 24px,rgba(132,130,122,.13) 24px 52px,transparent 52px 84px);filter:blur(8px);animation:weatherDrift 12s linear infinite}.weather-rain .weather-overlay,.weather-storm .weather-overlay{opacity:calc(.36 * var(--weather-intensity));background:linear-gradient(145deg,rgba(38,49,58,.28),rgba(29,36,42,.13));mix-blend-mode:multiply}.weather-rain .weather-particles,.weather-storm .weather-particles{opacity:calc(.54 * var(--weather-intensity));inset:-15% -10%;background:repeating-linear-gradient(105deg,transparent 0 18px,rgba(55,65,68,.34) 18px 19px,transparent 19px 37px);background-size:48px 96px;animation:weatherRain 1.1s linear infinite}.weather-snow .weather-overlay{opacity:calc(.3 * var(--weather-intensity));background:rgba(225,224,214,.22)}.weather-snow .weather-particles{opacity:calc(.64 * var(--weather-intensity));inset:-10%;background-image:radial-gradient(circle,rgba(248,244,226,.9) 0 2px,transparent 2.5px),radial-gradient(circle,rgba(236,232,216,.75) 0 1.5px,transparent 2px);background-size:46px 52px,71px 78px;background-position:0 0,22px 19px;animation:weatherSnow 8s linear infinite}.weather-storm .weather-flash{opacity:0;background:radial-gradient(circle at 72% 18%,rgba(255,246,214,.55),transparent 28%),rgba(255,242,203,.18);mix-blend-mode:screen;animation:weatherLightning 6.5s steps(1,end) infinite}.moon-overlay{inset:0;z-index:8;background:radial-gradient(circle at 88% 11%,rgba(230,224,197,calc(.3 * var(--moon-intensity))) 0,rgba(185,181,161,calc(.1 * var(--moon-intensity))) 16%,transparent 34%),linear-gradient(145deg,rgba(49,52,56,calc(.08 * var(--moon-intensity))),rgba(28,34,42,calc(.25 * var(--moon-intensity))));mix-blend-mode:multiply}.night-vignette{inset:0;background:radial-gradient(ellipse at center,transparent 46%,rgba(18,22,28,calc(.2 * var(--moon-intensity))) 100%);z-index:9}.moon-disc{right:7.5%;top:4.5%;width:72px;height:72px;border-radius:50%;z-index:9;filter:drop-shadow(0 0 9px rgba(87,69,47,.22)) drop-shadow(0 0 22px rgba(225,211,174,.18));transform:rotate(-8deg)}.moon-disc:before,.moon-disc:after{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid rgba(70,51,32,.28)}.moon-disc:after{inset:-7px;border-color:rgba(83,61,38,.14);transform:rotate(17deg)}.moon-disc span{display:block;position:relative;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 33% 31%,rgba(247,233,190,.82) 0 8%,transparent 9%),radial-gradient(circle at 64% 61%,rgba(85,67,47,.2) 0 8%,transparent 9%),radial-gradient(circle at 45% 72%,rgba(95,75,52,.16) 0 5%,transparent 6%),radial-gradient(circle at 42% 38%,#e7d7a8 0,#c9b681 58%,#8f754f 76%,rgba(87,65,43,.1) 77%,transparent 80%);box-shadow:inset -9px -7px 10px rgba(69,51,36,.22),inset 4px 3px 8px rgba(255,244,205,.24),0 0 18px rgba(215,197,151,.16)}.moon-disc span:after{content:"";position:absolute;left:48%;top:14%;width:34%;height:58%;border-left:1px solid rgba(72,51,33,.18);border-radius:50%;transform:rotate(22deg)}.moonlight .moon-overlay,.moonlight .night-vignette{opacity:1}.moonlight .moon-disc{opacity:calc(.72 * var(--moon-intensity))}.moonlight header{background:linear-gradient(100deg,#403d3a,#34383f);color:#eee8dc}.moonlight{background:#4a4843}.moonlight .map-stage{background:#4a4843}.alarm-overlay,.alarm-vignette{inset:0;z-index:10}.alarm-armed .alarm-overlay{opacity:calc(.13 * var(--alarm-intensity));background:linear-gradient(145deg,rgba(72,54,31,.75),rgba(116,86,42,.28));mix-blend-mode:multiply}.alarm-armed .alarm-vignette{opacity:calc(.38 * var(--alarm-intensity));background:radial-gradient(ellipse at center,transparent 48%,rgba(57,35,18,.55) 100%)}.alarm-triggered .alarm-overlay{opacity:calc(.52 * var(--alarm-intensity));background:repeating-linear-gradient(135deg,rgba(106,15,15,.42) 0 34px,rgba(64,8,8,.18) 34px 68px);mix-blend-mode:multiply;animation:alarmPulse 1.45s ease-in-out infinite}.alarm-triggered .alarm-vignette{opacity:calc(.88 * var(--alarm-intensity));background:radial-gradient(ellipse at center,transparent 32%,rgba(86,7,7,.72) 100%);animation:alarmVignette 1.45s ease-in-out infinite}.alarm-triggered header{color:#f8e6dc;background:linear-gradient(100deg,#5d211c,#321615)!important}.alarm-triggered header span,.alarm-triggered header small{color:#efc6b3}@keyframes cloudDriftA{0%{transform:translate3d(-5%,0,0) scale(.98)}45%{transform:translate3d(2%,1.5%,0) scale(1.015)}100%{transform:translate3d(9%,-1%,0) scale(1.035)}}@keyframes cloudDriftB{0%{transform:translate3d(6%,-1%,0) scale(1.02)}50%{transform:translate3d(0,1%,0) scale(.985)}100%{transform:translate3d(-10%,2%,0) scale(1.01)}}@keyframes cloudDriftC{0%{transform:translate3d(-7%,1%,0) scale(.97)}42%{transform:translate3d(1%,-1%,0) scale(1.025)}100%{transform:translate3d(8%,1.5%,0) scale(.99)}}@keyframes sunBreathe{0%,100%{transform:scale(.96);opacity:.72}50%{transform:scale(1.06);opacity:1}}@keyframes celestialCloudSunDrift{0%{transform:translate3d(-72px,-3px,0) scale(.88);opacity:.08}16%{opacity:.30}36%{transform:translate3d(-16px,-1px,0) scale(.98);opacity:.62}49%{transform:translate3d(2px,1px,0) scale(1.02);opacity:.76}62%{transform:translate3d(20px,0,0) scale(1);opacity:.70}78%{opacity:.34}100%{transform:translate3d(82px,4px,0) scale(.90);opacity:.08}}@keyframes celestialSunVeil{0%,16%,80%,100%{opacity:calc(.74 * var(--weather-intensity));filter:drop-shadow(0 0 10px rgba(224,158,48,.48)) drop-shadow(0 0 30px rgba(244,199,102,.36))}36%,64%{opacity:calc(.63 * var(--weather-intensity));filter:drop-shadow(0 0 9px rgba(224,158,48,.42)) drop-shadow(0 0 23px rgba(244,199,102,.30))}}@keyframes celestialSunGlow{0%,16%,80%,100%{opacity:calc(.62 * var(--weather-intensity))}36%,64%{opacity:calc(.50 * var(--weather-intensity))}}@keyframes celestialCloudMoonDrift{0%{transform:translate3d(72px,-2px,0) scale(.90);opacity:.08}16%{opacity:.26}37%{transform:translate3d(18px,-1px,0) scale(.98);opacity:.52}51%{transform:translate3d(0,1px,0) scale(1.02);opacity:.64}65%{transform:translate3d(-20px,0,0) scale(1);opacity:.56}81%{opacity:.28}100%{transform:translate3d(-78px,4px,0) scale(.91);opacity:.07}}@keyframes celestialMoonVeil{0%,16%,82%,100%{opacity:calc(.72 * var(--moon-intensity));filter:drop-shadow(0 0 9px rgba(87,69,47,.22)) drop-shadow(0 0 22px rgba(225,211,174,.18))}37%,66%{opacity:calc(.59 * var(--moon-intensity));filter:drop-shadow(0 0 7px rgba(87,69,47,.18)) drop-shadow(0 0 17px rgba(205,205,190,.14))}}@keyframes weatherRain{from{transform:translate3d(-3%,-12%,0)}to{transform:translate3d(3%,12%,0)}}@keyframes weatherSnow{from{transform:translate3d(0,-8%,0)}to{transform:translate3d(3%,9%,0)}}@keyframes weatherDrift{from{transform:translateX(-4%)}to{transform:translateX(4%)}}@keyframes weatherLightning{0%,6%,8%,45%,47%,100%{opacity:0}7%,46%{opacity:calc(.7 * var(--weather-intensity))}}@keyframes alarmPulse{0%,100%{opacity:calc(.34 * var(--alarm-intensity))}50%{opacity:calc(.58 * var(--alarm-intensity))}}@keyframes alarmVignette{0%,100%{opacity:calc(.65 * var(--alarm-intensity))}50%{opacity:calc(.95 * var(--alarm-intensity))}}ha-card.enchanted{background:#d3b985;border-color:rgba(80,50,28,.25);box-shadow:0 4px 16px rgba(61,39,24,.16)}ha-card.enchanted header{color:#4b311f;background:radial-gradient(circle at 18% 20%,rgba(255,240,193,.46),transparent 32%),linear-gradient(90deg,#d8c294,#c8a970);border-bottom:1px solid rgba(78,50,30,.18)}ha-card.enchanted header span,ha-card.enchanted header small{color:#6b4a33}ha-card.enchanted h1{font-family:Georgia,Cambria,"Times New Roman",serif;font-style:italic;letter-spacing:.025em}ha-card.enchanted.moonlight{background:#514b42}ha-card.enchanted.moonlight header{color:#eee6d5;background:radial-gradient(circle at 82% 18%,rgba(218,205,169,.13),transparent 30%),linear-gradient(90deg,#5a5145,#403d3a)}@media(prefers-reduced-motion:reduce){.cloud,.celestial-cloud,.partly-cloudy .sun-disc,.partly-cloudy .sun-overlay,.partly-cloudy .moon-disc,.sun-disc:before,.weather-fog .weather-overlay,.weather-rain .weather-particles,.weather-storm .weather-particles,.weather-snow .weather-particles,.weather-storm .weather-flash,.alarm-triggered .alarm-overlay,.alarm-triggered .alarm-vignette{animation:none}}@media(max-width:600px){header{align-items:flex-start;padding:14px 16px}small{font-size:.68rem}.moon-disc{width:54px;height:54px;right:5%;top:3.5%}.sun-disc{width:46px;height:46px;left:7%;top:6.5%}.celestial-cloud{width:108px;height:52px}.partly-cloudy:not(.moonlight) .celestial-cloud{left:2.5%;top:5.9%}.partly-cloudy.moonlight .celestial-cloud{right:1.8%;top:3.9%}}`;
St([
  A({ attribute: !1 })
], qe.prototype, "hass", 2);
St([
  A({ type: Boolean, attribute: !1 })
], qe.prototype, "preview", 2);
St([
  b()
], qe.prototype, "config", 2);
qe = St([
  R("ha-explorer-card")
], qe);
window.customCards = window.customCards || [];
window.customCards.push({ type: "ha-explorer-card", name: "Home Assistant Explorer", description: "An interactive SVG floor map for Home Assistant.", preview: !0 });
console.info(`%c HOME ASSISTANT EXPLORER %c v${br} `, "color:white;background:#594431;font-weight:700;", "color:#594431;background:#d8c39b;font-weight:700;");
export {
  qe as HaExplorerCard
};
//# sourceMappingURL=ha-explorer-card.js.map
