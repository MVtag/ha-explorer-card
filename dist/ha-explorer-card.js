const xt = globalThis, li = xt.ShadowRoot && (xt.ShadyCSS === void 0 || xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ci = /* @__PURE__ */ Symbol(), ki = /* @__PURE__ */ new WeakMap();
let dr = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== ci) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (li && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = ki.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ki.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Lr = (e) => new dr(typeof e == "string" ? e : e + "", void 0, ci), O = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, o, n) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new dr(i, e, ci);
}, qr = (e, t) => {
  if (li) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), o = xt.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, e.appendChild(r);
  }
}, _i = li ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return Lr(i);
})(e) : e;
const { is: Br, defineProperty: Hr, getOwnPropertyDescriptor: Fr, getOwnPropertyNames: Vr, getOwnPropertySymbols: Kr, getPrototypeOf: Zr } = Object, Tt = globalThis, Ai = Tt.trustedTypes, Gr = Ai ? Ai.emptyScript : "", Wr = Tt.reactiveElementPolyfillSupport, Qe = (e, t) => e, kt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Gr : null;
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
} }, di = (e, t) => !Br(e, t), Si = { attribute: !0, type: String, converter: kt, reflect: !1, useDefault: !1, hasChanged: di };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Tt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Le = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Si) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, r, i);
      o !== void 0 && Hr(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: o, set: n } = Fr(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: o, set(s) {
      const a = o?.call(this);
      n?.call(this, s), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Si;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Qe("elementProperties"))) return;
    const t = Zr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Qe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Qe("properties"))) {
      const i = this.properties, r = [...Vr(i), ...Kr(i)];
      for (const o of r) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [r, o] of i) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const o = this._$Eu(i, r);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const o of r) i.unshift(_i(o));
    } else t !== void 0 && i.push(_i(t));
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
    return qr(t, this.constructor.elementStyles), t;
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
    const r = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : kt).toAttribute(i, r.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, o = r._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = r.getPropertyOptions(o), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : kt;
      this._$Em = o;
      const a = s.fromAttribute(i, n.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, o = !1, n) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (n = this[t]), r ??= s.getPropertyOptions(t), !((r.hasChanged ?? di)(n, i) || r.useDefault && r.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, r)))) return;
      this.C(t, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: r, reflect: o, wrapped: n }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), n !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) {
        const { wrapped: s } = n, a = this[o];
        s !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
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
Le.elementStyles = [], Le.shadowRootOptions = { mode: "open" }, Le[Qe("elementProperties")] = /* @__PURE__ */ new Map(), Le[Qe("finalized")] = /* @__PURE__ */ new Map(), Wr?.({ ReactiveElement: Le }), (Tt.reactiveElementVersions ??= []).push("2.1.2");
const pi = globalThis, Ci = (e) => e, _t = pi.trustedTypes, Ei = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, pr = "$lit$", $e = `lit$${Math.random().toFixed(9).slice(2)}$`, hr = "?" + $e, Ur = `<${hr}>`, Pe = document, tt = () => Pe.createComment(""), it = (e) => e === null || typeof e != "object" && typeof e != "function", hi = Array.isArray, Xr = (e) => hi(e) || typeof e?.[Symbol.iterator] == "function", jt = `[ 	
\f\r]`, Ye = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Mi = /-->/g, Pi = />/g, Se = RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ni = /'/g, Ri = /"/g, ur = /^(?:script|style|textarea|title)$/i, gr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = gr(1), P = gr(2), se = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), zi = /* @__PURE__ */ new WeakMap(), Ee = Pe.createTreeWalker(Pe, 129);
function mr(e, t) {
  if (!hi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ei !== void 0 ? Ei.createHTML(t) : t;
}
const Yr = (e, t) => {
  const i = e.length - 1, r = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Ye;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, d, p = -1, u = 0;
    for (; u < l.length && (s.lastIndex = u, d = s.exec(l), d !== null); ) u = s.lastIndex, s === Ye ? d[1] === "!--" ? s = Mi : d[1] !== void 0 ? s = Pi : d[2] !== void 0 ? (ur.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = Se) : d[3] !== void 0 && (s = Se) : s === Se ? d[0] === ">" ? (s = o ?? Ye, p = -1) : d[1] === void 0 ? p = -2 : (p = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? Se : d[3] === '"' ? Ri : Ni) : s === Ri || s === Ni ? s = Se : s === Mi || s === Pi ? s = Ye : (s = Se, o = void 0);
    const g = s === Se && e[a + 1].startsWith("/>") ? " " : "";
    n += s === Ye ? l + Ur : p >= 0 ? (r.push(c), l.slice(0, p) + pr + l.slice(p) + $e + g) : l + $e + (p === -2 ? a : g);
  }
  return [mr(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class rt {
  constructor({ strings: t, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let n = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Yr(t, i);
    if (this.el = rt.createElement(c, r), Ee.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = Ee.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(pr)) {
          const u = d[s++], g = o.getAttribute(p).split($e), b = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? Jr : b[1] === "?" ? eo : b[1] === "@" ? to : Ot }), o.removeAttribute(p);
        } else p.startsWith($e) && (l.push({ type: 6, index: n }), o.removeAttribute(p));
        if (ur.test(o.tagName)) {
          const p = o.textContent.split($e), u = p.length - 1;
          if (u > 0) {
            o.textContent = _t ? _t.emptyScript : "";
            for (let g = 0; g < u; g++) o.append(p[g], tt()), Ee.nextNode(), l.push({ type: 2, index: ++n });
            o.append(p[u], tt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === hr) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = o.data.indexOf($e, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += $e.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const r = Pe.createElement("template");
    return r.innerHTML = t, r;
  }
}
function He(e, t, i = e, r) {
  if (t === se) return t;
  let o = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = it(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = o : i._$Cl = o), o !== void 0 && (t = He(e, o._$AS(e, t.values), o, r)), t;
}
class Qr {
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
    const { el: { content: i }, parts: r } = this._$AD, o = (t?.creationScope ?? Pe).importNode(i, !0);
    Ee.currentNode = o;
    let n = Ee.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new dt(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new io(n, this, t)), this._$AV.push(c), l = r[++a];
      }
      s !== l?.index && (n = Ee.nextNode(), s++);
    }
    return Ee.currentNode = Pe, o;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class dt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, r, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = He(this, t, i), it(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== se && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Xr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && it(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Pe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = rt.createElement(mr(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new Qr(o, this), s = n.u(this.options);
      n.p(i), this.T(s), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = zi.get(t.strings);
    return i === void 0 && zi.set(t.strings, i = new rt(t)), i;
  }
  k(t) {
    hi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, o = 0;
    for (const n of t) o === i.length ? i.push(r = new dt(this.O(tt()), this.O(tt()), this, this.options)) : r = i[o], r._$AI(n), o++;
    o < i.length && (this._$AR(r && r._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = Ci(t).nextSibling;
      Ci(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, o, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = f;
  }
  _$AI(t, i = this, r, o) {
    const n = this.strings;
    let s = !1;
    if (n === void 0) t = He(this, t, i, 0), s = !it(t) || t !== this._$AH && t !== se, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = He(this, a[r + l], i, l), c === se && (c = this._$AH[l]), s ||= !it(c) || c !== this._$AH[l], c === f ? t = f : t !== f && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Jr extends Ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class eo extends Ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class to extends Ot {
  constructor(t, i, r, o, n) {
    super(t, i, r, o, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = He(this, t, i, 0) ?? f) === se) return;
    const r = this._$AH, o = t === f && r !== f || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== f && (r === f || o);
    o && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class io {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    He(this, t);
  }
}
const ro = pi.litHtmlPolyfillSupport;
ro?.(rt, dt), (pi.litHtmlVersions ??= []).push("3.3.3");
const oo = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let o = r._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    r._$litPart$ = o = new dt(t.insertBefore(tt(), n), n, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const ui = globalThis;
let j = class extends Le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oo(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return se;
  }
};
j._$litElement$ = !0, j.finalized = !0, ui.litElementHydrateSupport?.({ LitElement: j });
const no = ui.litElementPolyfillSupport;
no?.({ LitElement: j });
(ui.litElementVersions ??= []).push("4.2.2");
const z = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const so = { attribute: !0, type: String, converter: kt, reflect: !1, hasChanged: di }, ao = (e = so, t, i) => {
  const { kind: r, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), r === "accessor") {
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
  return (t, i) => typeof i == "object" ? ao(e, t, i) : ((r, o, n) => {
    const s = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, r), s ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, i);
}
function v(e) {
  return A({ ...e, state: !0, attribute: !1 });
}
const lo = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function co(e, t) {
  return (i, r, o) => {
    const n = (s) => s.renderRoot?.querySelector(e) ?? null;
    return lo(i, r, { get() {
      return n(this);
    } });
  };
}
const Ce = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, fr = (e) => (...t) => ({ _$litDirective$: e, values: t });
class br {
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
class ii extends br {
  constructor(t) {
    if (super(t), this.it = f, t.type !== Ce.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === f || t == null) return this._t = void 0, this.it = t;
    if (t === se) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const i = [t];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
ii.directiveName = "unsafeHTML", ii.resultType = 1;
class ri extends ii {
}
ri.directiveName = "unsafeSVG", ri.resultType = 2;
const po = fr(ri), ho = {
  light: ["on"],
  motion: ["on"],
  media: ["playing", "on"],
  opening: ["on", "open"],
  temperature: [],
  fireplace: ["on", "heating", "burning", "active"]
}, uo = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function yr(e) {
  return Math.min(1, Math.max(0, e));
}
function Oe(e) {
  return Math.min(1, Math.max(0, e));
}
function wt(e) {
  return [...ho[e]];
}
function go(e) {
  if (e.kind === "temperature") return [];
  const t = (e.active_states ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : wt(e.kind);
}
function Je(e, t) {
  const i = t?.position;
  return i && Number.isFinite(i.x) && Number.isFinite(i.y) ? { x: Oe(i.x), y: Oe(i.y) } : e.presence_anchor ? {
    x: Oe(e.presence_anchor.x),
    y: Oe(e.presence_anchor.y)
  } : e.points.length ? {
    x: Oe(e.points.reduce((r, o) => r + o[0], 0) / e.points.length),
    y: Oe(e.points.reduce((r, o) => r + o[1], 0) / e.points.length)
  } : { x: 0.5, y: 0.5 };
}
function mo(e) {
  const t = e?.brightness;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : yr(t / 255);
}
function Ti(e) {
  const t = e.intensity;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : yr(t);
}
function Oi(e) {
  const t = e?.unit_of_measurement;
  return typeof t == "string" && t.trim() ? t.trim() : void 0;
}
function vr(e, t, i) {
  const r = e.entity?.trim(), o = go(e);
  if (!r)
    return { index: t, reaction: e, active: !1, activeStates: o, intensity: 0, reason: "missing_entity" };
  const n = i?.(r);
  if (!n || uo.has(n.state.trim().toLowerCase()))
    return { index: t, reaction: e, active: !1, currentState: n?.state, activeStates: o, intensity: 0, reason: "entity_unavailable" };
  if (e.kind === "temperature") {
    const c = Number(n.state);
    return Number.isFinite(c) ? { index: t, reaction: e, active: !0, currentState: n.state, activeStates: o, intensity: 1, numericValue: c, unit: Oi(n.attributes) } : { index: t, reaction: e, active: !1, currentState: n.state, activeStates: o, intensity: 0, unit: Oi(n.attributes), reason: "state_inactive" };
  }
  const s = n.state.trim().toLowerCase(), a = o.map((c) => c.toLowerCase()).includes(s);
  let l = 0;
  return a && (e.kind === "light" ? l = mo(n.attributes) * Ti(e) : l = Ti(e)), {
    index: t,
    reaction: e,
    active: a,
    currentState: n.state,
    activeStates: o,
    intensity: l,
    ...a ? {} : { reason: "state_inactive" }
  };
}
function At(e, t) {
  return (e.reactions ?? []).map((i, r) => vr(i, r, t));
}
var fo = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, ze = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? bo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && fo(t, i, o), o;
};
function yo(e) {
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
const vo = {
  light: "💡",
  motion: "◉",
  media: "▶",
  opening: "↗",
  temperature: "°"
}, xo = {
  light: "Lys",
  motion: "Bevægelse",
  media: "TV / medie",
  opening: "Dør / vindue",
  temperature: "Temperatur"
};
let fe = class extends j {
  constructor() {
    super(...arguments), this.presences = [], this.pendingLights = /* @__PURE__ */ new Set(), this.pendingRoomAction = "", this.actionError = "";
  }
  get statuses() {
    return this.room ? At(this.room, (e) => {
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
  async runRoomService(e, t, i, r, o) {
    const n = this.hass;
    if (!(!n?.callService || this.pendingRoomAction)) {
      this.actionError = "", this.pendingRoomAction = e;
      try {
        await n.callService(t, i, {}, { entity_id: r });
      } catch {
        this.actionError = `Kunne ikke starte ${o}.`;
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
              ${t.map((o) => {
      const n = yo(o.avatar);
      return h`<span class="occupant">
                  ${n ? h`<img src=${n} alt="" />` : h`<span class="occupant-dot"></span>`}
                  ${o.name ?? o.id}
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
                ${r.map((o) => h`
                  <button
                    @click=${() => this.runQuickAction(o)}
                    ?disabled=${!!this.pendingRoomAction || !this.hass?.callService}
                  >
                    <span>${o.icon ?? (o.kind === "scene" ? "✦" : "▶")}</span>
                    ${this.pendingRoomAction === `quick:${o.id}` ? "Vent…" : o.name}
                  </button>
                `)}
              </div>
            </div>` : f}

        ${e.length ? h`<div class="entities">
              ${e.map((o) => this.renderStatus(o))}
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
          <span class=${`entity-icon ${i}`}>${vo[i]}</span>
          <span class="entity-copy">
            <strong>${this.entityName(t)}</strong>
            <small>${xo[i]} · ${this.statusText(e)}</small>
          </span>
        </button>
        ${i === "light" ? h`<button
              class="action"
              @click=${(o) => this.toggleLight(o, t)}
              ?disabled=${r || !this.hass?.callService}
            >${r ? "Vent…" : e.active ? "Sluk" : "Tænd"}</button>` : f}
      </article>
    `;
  }
};
fe.styles = O`
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
ze([
  A({ attribute: !1 })
], fe.prototype, "room", 2);
ze([
  A({ attribute: !1 })
], fe.prototype, "presences", 2);
ze([
  A({ attribute: !1 })
], fe.prototype, "hass", 2);
ze([
  v()
], fe.prototype, "pendingLights", 2);
ze([
  v()
], fe.prototype, "pendingRoomAction", 2);
ze([
  v()
], fe.prototype, "actionError", 2);
fe = ze([
  z("explorer-room-panel")
], fe);
const x = 1e3;
function Lt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function wo(e) {
  return `translate(${e.x} ${e.y}) scale(${e.zoom})`;
}
function $t(e, t = 1) {
  const i = Math.max(t, e.zoom);
  if (i <= t + 1e-4) return { zoom: i, x: 0, y: 0 };
  const r = x * (1 - i);
  return {
    zoom: i,
    x: Math.min(0, Math.max(r, e.x)),
    y: Math.min(0, Math.max(r, e.y))
  };
}
function Ii(e, t, i, r) {
  const o = t / e.zoom;
  return $t({
    zoom: t,
    x: i - (i - e.x) * o,
    y: r - (r - e.y) * o
  });
}
var $o = Object.defineProperty, ko = Object.getOwnPropertyDescriptor, G = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ko(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && $o(t, i, o), o;
};
const Di = { width: 16, height: 9, status: "idle" }, _o = { person: "●", pet: "◆", robot: "■", vehicle: "▰", object: "✦" }, Ao = "script,foreignObject,iframe,object,embed,link,meta,audio,video,canvas";
function ji(e) {
  try {
    return new URL(e, window.location.href).pathname.toLowerCase().endsWith(".svg");
  } catch {
    return e.split(/[?#]/, 1)[0].toLowerCase().endsWith(".svg");
  }
}
function Li(e) {
  if (!e) return;
  const t = e.trim().match(/^(-?\d+(?:\.\d+)?)/);
  if (!t) return;
  const i = Number(t[1]);
  return Number.isFinite(i) && i > 0 ? i : void 0;
}
function So(e) {
  const t = e.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  return t?.length === 4 && t.every(Number.isFinite) && t[2] > 0 && t[3] > 0 ? { width: t[2], height: t[3] } : { width: Li(e.getAttribute("width")) ?? 16, height: Li(e.getAttribute("height")) ?? 9 };
}
function qi(e) {
  return e.replace(/@import[^;]+;?/gi, "").replace(/url\(([^)]*)\)/gi, (t, i) => {
    const r = i.trim().replace(/^['"]|['"]$/g, "");
    return r.startsWith("#") ? `url(${r})` : "none";
  }).replace(/javascript\s*:/gi, "").replace(/expression\s*\(/gi, "");
}
function Co(e) {
  const t = e.trim();
  return t === "" || t.startsWith("#") || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,/i.test(t);
}
function Eo(e) {
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
function Mo(e) {
  const t = e.querySelector("parsererror"), i = e.documentElement;
  if (t || i.localName.toLowerCase() !== "svg") throw new Error("Filen indeholder ikke gyldig SVG-kode.");
  i.querySelectorAll(Ao).forEach((o) => o.remove());
  const r = [i, ...Array.from(i.querySelectorAll("*"))];
  for (const o of r)
    for (const n of Array.from(o.attributes)) {
      const s = n.name.toLowerCase(), a = n.value;
      if (s.startsWith("on")) {
        o.removeAttribute(n.name);
        continue;
      }
      if ((s === "href" || s === "xlink:href") && !Co(a)) {
        o.removeAttribute(n.name);
        continue;
      }
      if (s === "style") {
        const l = qi(a).trim();
        l ? o.setAttribute(n.name, l) : o.removeAttribute(n.name);
      }
    }
  return i.querySelectorAll("style").forEach((o) => {
    const n = qi(o.textContent ?? "").trim();
    n ? o.textContent = n : o.remove();
  }), i.hasAttribute("xmlns") || i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i;
}
let H = class extends j {
  constructor() {
    super(...arguments), this.image = "", this.rooms = [], this.presences = [], this.minZoom = 1, this.maxZoom = 6, this.initialZoom = 1, this.fitMode = "contain", this.viewport = { zoom: 1, x: 0, y: 0 }, this.metadata = { ...Di }, this.imageSource = "", this.svgMarkup = "", this.loadError = "", this.activePointers = /* @__PURE__ */ new Map(), this.imageRequest = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.resetViewport();
  }
  updated(e) {
    e.has("rooms") && this.selectedRoom && (this.selectedRoom = this.rooms.find((t) => t.id === this.selectedRoom?.id)), (e.has("image") || e.has("fitMode") && this.image && ji(this.image)) && this.loadFloorplan();
  }
  async loadFloorplan() {
    const e = ++this.imageRequest;
    if (this.imageSource = "", this.svgMarkup = "", this.loadError = "", !this.image) {
      this.metadata = { ...Di }, this.resetViewport();
      return;
    }
    this.metadata = { ...this.metadata, status: "loading" };
    try {
      ji(this.image) ? await this.loadSvgFloorplan(e) : await this.loadRasterFloorplan(e);
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
    const r = new DOMParser().parseFromString(i, "image/svg+xml"), o = Mo(r), n = So(o);
    o.hasAttribute("viewBox") || o.setAttribute("viewBox", `0 0 ${n.width} ${n.height}`), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("width", String(x)), o.setAttribute("height", String(x)), o.setAttribute("preserveAspectRatio", this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"), o.setAttribute("class", "inline-floorplan");
    const s = new XMLSerializer().serializeToString(o);
    e === this.imageRequest && (this.svgMarkup = s, this.metadata = { width: n.width, height: n.height, status: "loaded" }, this.resetViewport());
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
    this.viewport = { zoom: Lt(this.initialZoom, this.minZoom, this.maxZoom), x: 0, y: 0 };
  }
  toViewBoxPoint(e) {
    const t = this.renderRoot.querySelector("svg.floorplan");
    if (!t) return { x: x / 2, y: x / 2 };
    const i = t.getBoundingClientRect();
    return { x: (e.clientX - i.left) / i.width * x, y: (e.clientY - i.top) / i.height * x };
  }
  handleWheel(e) {
    e.preventDefault();
    const t = this.toViewBoxPoint(e), i = e.deltaY < 0 ? 1.12 : 1 / 1.12, r = Lt(this.viewport.zoom * i, this.minZoom, this.maxZoom);
    this.viewport = $t(Ii(this.viewport, r, t.x, t.y), this.minZoom);
  }
  handlePointerDown(e) {
    this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY }), e.currentTarget.setPointerCapture(e.pointerId);
  }
  handlePointerMove(e) {
    const t = this.activePointers.get(e.pointerId);
    if (!t) return;
    const i = e.currentTarget, r = i.getBoundingClientRect(), o = { x: e.clientX, y: e.clientY }, n = [...this.activePointers.entries()].find(([s]) => s !== e.pointerId)?.[1];
    if (n) {
      const s = Math.hypot(t.x - n.x, t.y - n.y), a = Math.hypot(o.x - n.x, o.y - n.y);
      if (s > 0) {
        const l = { x: (t.x + n.x) / 2, y: (t.y + n.y) / 2 }, c = { x: (o.x + n.x) / 2, y: (o.y + n.y) / 2 }, d = { x: (l.x - r.left) / r.width * x, y: (l.y - r.top) / r.height * x }, p = Lt(this.viewport.zoom * (a / s), this.minZoom, this.maxZoom), u = (c.x - l.x) / r.width * x, g = (c.y - l.y) / r.height * x, b = Ii(this.viewport, p, d.x, d.y);
        this.viewport = $t({ ...b, x: b.x + u, y: b.y + g }, this.minZoom);
      }
    } else if (this.viewport.zoom > this.minZoom + 1e-4) {
      const s = (o.x - t.x) / r.width * x, a = (o.y - t.y) / r.height * x;
      this.viewport = $t({ ...this.viewport, x: this.viewport.x + s, y: this.viewport.y + a }, this.minZoom);
    }
    this.activePointers.set(e.pointerId, o);
  }
  handlePointerUp(e) {
    this.activePointers.delete(e.pointerId);
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
      const t = e.points.map(([c, d]) => `${c * x},${d * x}`).join(" "), i = e.id === this.selectedRoom?.id, r = e.points.reduce((c, d) => c + d[0], 0) / e.points.length, o = e.points.reduce((c, d) => c + d[1], 0) / e.points.length, n = (e.label?.x ?? r) * x, s = (e.label?.y ?? o) * x, a = e.color ?? "#03a9f4", l = Math.max(76, Math.min(190, (e.name?.length ?? 0) * 15 + 28));
      return P`<g class=${i ? "room selected" : "room"} @pointerdown=${(c) => c.stopPropagation()} @click=${(c) => this.selectRoom(c, e)}><polygon points=${t} fill=${a} fill-opacity=${i ? "0.34" : "0.18"} stroke=${a} stroke-opacity="0.9" stroke-width=${i ? "5" : "3"} vector-effect="non-scaling-stroke"></polygon>${e.name ? P`<rect class="room-label-mask" x=${n - l / 2} y=${s - 18} width=${l} height="36" rx="10"></rect><text class="room-label" x=${n} y=${s} text-anchor="middle" dominant-baseline="middle">${e.name}</text>` : f}</g>`;
    });
  }
  renderPresences() {
    return this.presences.filter((e) => e.visible !== !1).map((e, t) => {
      const i = e.type ?? "person", r = e.id === this.selectedPresence?.id, o = (e.x ?? 0.5) * x, n = (e.y ?? 0.5) * x, s = e.icon ?? _o[i], a = Eo(e.avatar), l = e.color ?? "#03a9f4", c = r ? 31 : 25, d = c * 2, p = `presence-avatar-${t}`, u = r ? 58 : 52;
      return P`<g class=${r ? "presence selected" : "presence"} transform=${`translate(${o} ${n})`} @pointerdown=${(g) => g.stopPropagation()} @click=${(g) => this.selectPresence(g, e)}>${a ? P`<defs><clipPath id=${p}><circle r=${c - 3}></circle></clipPath></defs><circle class="presence-avatar-background" r=${c} fill=${l}></circle><image href=${a} x=${-c + 3} y=${-c + 3} width=${d - 6} height=${d - 6} preserveAspectRatio="xMidYMid slice" clip-path=${`url(#${p})`}></image><circle class="presence-border" r=${c} fill="none" stroke=${l} stroke-width=${r ? "5" : "3"} vector-effect="non-scaling-stroke"></circle>` : P`<circle class="presence-marker" r=${c} fill=${l} fill-opacity=${r ? "1" : ".88"}></circle><text class="presence-icon" text-anchor="middle" dominant-baseline="middle">${s}</text>`}<text class="presence-label" y=${u} text-anchor="middle">${e.name ?? e.id}</text></g>`;
    });
  }
  render() {
    const e = wo(this.viewport);
    return h`<div class="viewport"><svg class="floorplan" viewBox="0 0 ${x} ${x}" @wheel=${this.handleWheel} @pointerdown=${this.handlePointerDown} @pointermove=${this.handlePointerMove} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerUp} @click=${() => {
      this.selectedRoom = void 0, this.selectedPresence = void 0;
    }}><rect class="backdrop" width=${x} height=${x}></rect><g class="scene" transform=${e}>${this.svgMarkup ? P`<g class="floorplan-source inline-source">${po(this.svgMarkup)}</g>` : this.imageSource ? P`<image class="floorplan-source" href=${this.imageSource} x="0" y="0" width=${x} height=${x} preserveAspectRatio=${this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>` : f}<g class="rooms-scene">${this.renderRooms()}</g><g class="presences-scene">${this.renderPresences()}</g></g></svg>${this.loadError ? h`<div class="load-error">${this.loadError}</div>` : f}<button class="zoom-badge" type="button" title="Nulstil zoom og placering" aria-label="Nulstil zoom og placering" @click=${(t) => {
      t.stopPropagation(), this.resetViewport();
    }}>⌂ &nbsp; ${Math.round(this.viewport.zoom * 100)}%</button></div>${this.selectedRoom ? h`<explorer-room-panel .hass=${this.hass} .room=${this.selectedRoom} @close=${() => this.selectedRoom = void 0}></explorer-room-panel>` : f}`;
  }
};
H.styles = O`:host{display:block;position:relative}.viewport{position:relative;overflow:hidden;background:var(--secondary-background-color);touch-action:none;max-height:var(--explorer-viewport-max-height,none)}svg.floorplan{display:block;width:100%;height:auto;aspect-ratio:1/1;user-select:none}.backdrop{fill:var(--card-background-color,#fff)}.floorplan-source{pointer-events:none}.inline-source{pointer-events:none}.room{cursor:pointer}.room polygon{transition:fill-opacity .18s ease,stroke-width .18s ease}.room-label-mask{fill:transparent;pointer-events:none}.room-label{font-size:18px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.presence{cursor:pointer}.presence-icon{font-size:24px;fill:#fff;pointer-events:none}.presence-label{font-size:16px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.zoom-badge{position:absolute;right:14px;bottom:14px;padding:8px 12px;border:0;border-radius:999px;background:rgba(0,0,0,.66);color:#fff;font:inherit;font-size:.8rem;font-weight:700;cursor:pointer;touch-action:manipulation}.zoom-badge:focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}.load-error{position:absolute;left:14px;right:14px;top:14px;padding:10px 12px;border-radius:10px;background:var(--error-color,#db4437);color:#fff;font-size:.85rem;font-weight:700}@media(max-width:600px){.room-label{font-size:16px}.presence-label{font-size:14px}.zoom-badge{right:10px;bottom:10px}}`;
G([
  A({ attribute: !1 })
], H.prototype, "hass", 2);
G([
  A()
], H.prototype, "image", 2);
G([
  A({ attribute: !1 })
], H.prototype, "rooms", 2);
G([
  A({ attribute: !1 })
], H.prototype, "presences", 2);
G([
  A({ type: Number, attribute: "min-zoom" })
], H.prototype, "minZoom", 2);
G([
  A({ type: Number, attribute: "max-zoom" })
], H.prototype, "maxZoom", 2);
G([
  A({ type: Number, attribute: "initial-zoom" })
], H.prototype, "initialZoom", 2);
G([
  A({ attribute: "fit-mode" })
], H.prototype, "fitMode", 2);
G([
  v()
], H.prototype, "viewport", 2);
G([
  v()
], H.prototype, "selectedRoom", 2);
G([
  v()
], H.prototype, "selectedPresence", 2);
G([
  v()
], H.prototype, "metadata", 2);
G([
  v()
], H.prototype, "imageSource", 2);
G([
  v()
], H.prototype, "svgMarkup", 2);
G([
  v()
], H.prototype, "loadError", 2);
H = G([
  z("explorer-canvas")
], H);
function ke(e, t) {
  const i = (e.rooms ?? []).find((r) => r.id === t);
  if (i) {
    if (i.presence_anchor) return [i.presence_anchor.x, i.presence_anchor.y];
    if (i.points.length)
      return [
        i.points.reduce((r, o) => r + o[0], 0) / i.points.length,
        i.points.reduce((r, o) => r + o[1], 0) / i.points.length
      ];
  }
}
function ot(e, t) {
  return (e.rooms ?? []).find((i) => i.id === t)?.name ?? t;
}
function Po(e, t) {
  return (e.route_nodes ?? []).find((i) => i.id === t)?.name ?? t;
}
function me(e) {
  return `${e.kind}:${e.id}`;
}
function St(e, t) {
  return t.kind === "room" ? ke(e, t.id) : (e.route_nodes ?? []).find((i) => i.id === t.id)?.point;
}
function No(e, t) {
  const i = St(e, t);
  if (i)
    return t.kind === "room" ? {
      kind: "room",
      id: t.id,
      key: me(t),
      label: ot(e, t.id),
      point: i
    } : {
      kind: "node",
      id: t.id,
      key: me(t),
      label: Po(e, t.id),
      point: i
    };
}
function xr(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : ["on"];
}
function Ro(e) {
  return xr(e.condition?.allowed_states);
}
function Fe(e, t) {
  if (!e.state_binding)
    return {
      nodeId: e.id,
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  const i = e.state_binding.entity?.trim(), r = xr(e.state_binding.open_states);
  if (!i)
    return {
      nodeId: e.id,
      conditional: !0,
      active: !1,
      allowedStates: r,
      reason: "missing_entity"
    };
  const o = t?.(i);
  if (o === void 0)
    return {
      nodeId: e.id,
      conditional: !0,
      active: !1,
      entity: i,
      allowedStates: r,
      reason: "entity_unavailable"
    };
  const n = r.includes(o);
  return {
    nodeId: e.id,
    conditional: !0,
    active: n,
    entity: i,
    currentState: o,
    allowedStates: r,
    ...n ? {} : { reason: "state_blocked" }
  };
}
function zo(e, t, i) {
  if (!e.condition)
    return {
      index: t,
      edge: e,
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  const r = e.condition.entity?.trim(), o = Ro(e);
  if (!r)
    return {
      index: t,
      edge: e,
      conditional: !0,
      active: !1,
      allowedStates: o,
      reason: "missing_entity",
      conditionSource: "edge"
    };
  const n = i?.(r);
  if (n === void 0)
    return {
      index: t,
      edge: e,
      conditional: !0,
      active: !1,
      entity: r,
      allowedStates: o,
      reason: "entity_unavailable",
      conditionSource: "edge"
    };
  const s = o.includes(n);
  return {
    index: t,
    edge: e,
    conditional: !0,
    active: s,
    entity: r,
    currentState: n,
    allowedStates: o,
    conditionSource: "edge",
    ...s ? {} : { reason: "state_blocked" }
  };
}
function pt(e, t) {
  const i = new Map((e.route_nodes ?? []).map((r) => [r.id, r]));
  return (e.route_graph_edges ?? []).map((r, o) => {
    const n = zo(r, o, t), a = [r.from, r.to].filter((u) => u.kind === "node").map((u) => i.get(u.id)).filter((u) => !!u).map((u) => Fe(u, t)).filter((u) => u.conditional), c = a.find((u) => !u.active) ?? (n.conditional ? void 0 : a[0]), d = n.active && a.every((u) => u.active), p = n.conditional || a.length > 0;
    return c ? {
      ...n,
      conditional: p,
      active: d,
      entity: c.entity,
      currentState: c.currentState,
      allowedStates: c.allowedStates,
      reason: d ? void 0 : c.reason,
      conditionSource: "node",
      nodeId: c.nodeId,
      nodeStatuses: a
    } : {
      ...n,
      conditional: p,
      active: d,
      nodeStatuses: a
    };
  });
}
function wr(e) {
  return e.path ? e.path : (e.via ?? []).map((t) => ({ point: t }));
}
function To(e, t, i) {
  if (t.node_id) {
    const r = (e.route_nodes ?? []).find((o) => o.id === t.node_id);
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
function gi(e) {
  let t = 0;
  for (let i = 1; i < e.length; i += 1)
    t += Math.hypot(
      e[i].point[0] - e[i - 1].point[0],
      e[i].point[1] - e[i - 1].point[1]
    );
  return t;
}
function Bi(e, t, i, r, o, n) {
  const s = ke(e, i), a = ke(e, r);
  if (!s || !a) return;
  const l = wr(t), d = (o ? [...l].reverse() : l).map((u, g) => To(e, u, g)).filter((u) => !!u), p = [
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: ot(e, i),
      point: s
    },
    ...d,
    {
      kind: "room",
      id: r,
      key: `room:${r}`,
      label: ot(e, r),
      point: a
    }
  ];
  return {
    source: "manual",
    hops: p,
    distance: gi(p),
    manualRoute: t,
    reversedManualRoute: o,
    blockedEdges: n
  };
}
function Oo(e, t) {
  const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = (a) => {
    const l = me(a);
    o.set(l, a);
    const c = r.get(l);
    if (c) return c;
    const d = St(e, a);
    return d && r.set(l, d), d;
  }, s = (a, l, c) => {
    const d = i.get(a) ?? [];
    d.push({ key: l, weight: c }), i.set(a, d);
  };
  return t.forEach((a) => {
    if (!a.active) return;
    const l = a.edge, c = n(l.from), d = n(l.to);
    if (!c || !d) return;
    const p = me(l.from), u = me(l.to);
    if (p === u) return;
    const g = Math.hypot(d[0] - c[0], d[1] - c[1]);
    s(p, u, g), s(u, p, g);
  }), { adjacency: i, positions: r, endpoints: o };
}
function Io(e, t, i, r, o) {
  if (!(e.route_graph_edges ?? []).length) return;
  const n = `room:${t}`, s = `room:${i}`, { adjacency: a, endpoints: l } = Oo(e, r);
  if (!a.has(n) || !a.has(s)) return;
  const c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), p = new Set(a.keys());
  for (a.forEach((m) => m.forEach((y) => p.add(y.key))), p.forEach((m) => c.set(m, Number.POSITIVE_INFINITY)), c.set(n, 0); p.size; ) {
    let m, y = Number.POSITIVE_INFINITY;
    for (const _ of p) {
      const $ = c.get(_) ?? Number.POSITIVE_INFINITY;
      $ < y && (m = _, y = $);
    }
    if (!m || !Number.isFinite(y) || (p.delete(m), m === s)) break;
    for (const _ of a.get(m) ?? []) {
      if (!p.has(_.key)) continue;
      const $ = y + _.weight;
      $ < (c.get(_.key) ?? Number.POSITIVE_INFINITY) && (c.set(_.key, $), d.set(_.key, m));
    }
  }
  if (!Number.isFinite(c.get(s) ?? Number.POSITIVE_INFINITY)) return;
  const u = [s];
  let g = s;
  for (; g !== n; ) {
    const m = d.get(g);
    if (!m) return;
    u.push(m), g = m;
  }
  u.reverse();
  const b = u.map((m) => l.get(m)).map((m) => m ? No(e, m) : void 0).filter((m) => !!m);
  if (!(b.length < 2))
    return {
      source: "graph",
      hops: b,
      distance: gi(b),
      blockedEdges: o
    };
}
function mi(e, t, i, r) {
  if (!t || !i || t === i) return;
  const o = pt(e, r), n = o.filter((u) => !u.active), s = (e.routes ?? []).find(
    (u) => u.from === t && u.to === i
  );
  if (s) return Bi(e, s, t, i, !1, n);
  const a = (e.routes ?? []).find(
    (u) => u.from === i && u.to === t
  );
  if (a) return Bi(e, a, t, i, !0, n);
  const l = Io(e, t, i, o, n);
  if (l) return l;
  const c = ke(e, t), d = ke(e, i);
  if (!c || !d) return;
  const p = [
    {
      kind: "room",
      id: t,
      key: `room:${t}`,
      label: ot(e, t),
      point: c
    },
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: ot(e, i),
      point: d
    }
  ];
  return {
    source: "fallback",
    hops: p,
    distance: gi(p),
    blockedEdges: n
  };
}
function Do(e) {
  return [me(e.from), me(e.to)].sort().join("|");
}
function Hi(e, t) {
  const i = e.route_graph_edges ?? [];
  let r = 0, o = 0, n = 0;
  const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), c = (k) => {
    a.set(k, (a.get(k) ?? 0) + 1);
  }, d = (k, E) => {
    const M = l.get(k) ?? /* @__PURE__ */ new Set();
    M.add(E), l.set(k, M);
    const T = l.get(E) ?? /* @__PURE__ */ new Set();
    T.add(k), l.set(E, T);
  };
  i.forEach((k) => {
    const E = me(k.from), M = me(k.to), T = Do(k);
    E === M && (n += 1), s.has(T) && (o += 1), s.add(T);
    const Y = St(e, k.from), U = St(e, k.to);
    if (!Y || !U || E === M) {
      r += 1;
      return;
    }
    c(E), c(M), d(E, M);
  });
  const p = i.length ? (e.rooms ?? []).filter((k) => ke(e, k.id) && !a.has(`room:${k.id}`)).map((k) => k.id) : [], u = i.length ? (e.route_nodes ?? []).filter((k) => !a.has(`node:${k.id}`)).map((k) => k.id) : [];
  let g = 0;
  const b = new Set(l.keys());
  for (; b.size; ) {
    g += 1;
    const k = b.values().next().value;
    if (!k) break;
    const E = [k];
    for (b.delete(k); E.length; ) {
      const M = E.pop();
      for (const T of l.get(M) ?? [])
        b.has(T) && (b.delete(T), E.push(T));
    }
  }
  const m = [], y = new Set((e.route_nodes ?? []).map((k) => k.id));
  (e.routes ?? []).forEach((k) => {
    wr(k).forEach((E) => {
      E.node_id && !y.has(E.node_id) && m.push({ from: k.from, to: k.to, nodeId: E.node_id });
    });
  });
  const _ = pt(e, t), $ = _.filter((k) => !k.active), w = (e.route_nodes ?? []).map((k) => Fe(k, t)).filter((k) => k.conditional), S = w.filter((k) => !k.active), C = /* @__PURE__ */ new Set();
  return _.forEach((k) => {
    k.conditionSource === "edge" && (k.reason === "missing_entity" || k.reason === "entity_unavailable") && C.add(k.entity ?? "(mangler entity)");
  }), w.forEach((k) => {
    (k.reason === "missing_entity" || k.reason === "entity_unavailable") && C.add(k.entity ?? "(mangler entity)");
  }), {
    invalidEdges: r,
    duplicateEdges: o,
    selfEdges: n,
    components: g,
    disconnectedRoomIds: p,
    disconnectedNodeIds: u,
    brokenRouteNodeReferences: m,
    conditionalEdges: _.filter((k) => k.conditional).length,
    blockedEdges: $,
    conditionalNodes: w.length,
    blockedNodes: S,
    unresolvedConditionEntities: [...C]
  };
}
var jo = Object.defineProperty, Lo = Object.getOwnPropertyDescriptor, It = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Lo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && jo(t, i, o), o;
};
const qt = 900, Fi = 3600, Vi = 58, q = "http://www.w3.org/2000/svg";
let Ve = class extends H {
  constructor() {
    super(...arguments), this.routes = [], this.routeNodes = [], this.routeGraphEdges = [], this.previousPresencePositions = /* @__PURE__ */ new Map(), this.previousPresenceRooms = /* @__PURE__ */ new Map(), this.activeAnimations = /* @__PURE__ */ new Map();
  }
  updated(e) {
    if (super.updated(e), (e.has("hass") || e.has("rooms") || e.has("routeNodes") || e.has("routeGraphEdges")) && this.syncRouteStatusOverlay(), !e.has("presences")) return;
    const t = this.presences.filter((n) => n.visible !== !1), i = Array.from(
      this.renderRoot.querySelectorAll("g.presence")
    ), r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, o = /* @__PURE__ */ new Set();
    t.forEach((n, s) => {
      const a = i[s];
      if (!a) return;
      const l = {
        x: (n.x ?? 0.5) * x,
        y: (n.y ?? 0.5) * x
      }, c = this.previousPresencePositions.get(n.id), d = this.previousPresenceRooms.get(n.id), p = n.room_id;
      if (o.add(n.id), this.activeAnimations.get(n.id)?.remove(), this.activeAnimations.delete(n.id), !r && c && (Math.abs(c.x - l.x) > 0.01 || Math.abs(c.y - l.y) > 0.01)) {
        const u = this.resolveMovementPath(c, l, d, p);
        this.createFootsteps(u);
        const g = document.createElementNS(q, "animateTransform");
        g.setAttribute("attributeName", "transform"), g.setAttribute("attributeType", "XML"), g.setAttribute("type", "translate"), g.setAttribute("values", u.map((b) => `${b.x} ${b.y}`).join(";")), g.setAttribute("keyTimes", this.buildKeyTimes(u).join(";")), g.setAttribute("dur", `${qt}ms`), g.setAttribute("begin", "indefinite"), g.setAttribute("fill", "freeze"), g.setAttribute("calcMode", "linear"), a.appendChild(g), this.activeAnimations.set(n.id, g), g.beginElement(), window.setTimeout(() => {
          this.activeAnimations.get(n.id) === g && (g.remove(), this.activeAnimations.delete(n.id));
        }, qt + 80);
      }
      this.previousPresencePositions.set(n.id, l), this.previousPresenceRooms.set(n.id, p);
    });
    for (const n of this.previousPresencePositions.keys())
      o.has(n) || (this.previousPresencePositions.delete(n), this.previousPresenceRooms.delete(n));
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
      return i ? { x: i.point[0] * x, y: i.point[1] * x } : void 0;
    }
    const t = this.rooms.find((i) => i.id === e.id);
    if (t) {
      if (t.presence_anchor)
        return {
          x: t.presence_anchor.x * x,
          y: t.presence_anchor.y * x
        };
      if (t.points.length)
        return {
          x: t.points.reduce((i, r) => i + r[0], 0) / t.points.length * x,
          y: t.points.reduce((i, r) => i + r[1], 0) / t.points.length * x
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
    const i = e.currentState ?? "ukendt", r = e.conditionSource === "node" ? `dørpunkt ${this.routeNodes.find((o) => o.id === e.nodeId)?.name ?? e.nodeId ?? "ukendt"}` : "route-condition";
    return `${t} · ${e.active ? "aktiv" : "blokeret"} · ${r} · ${e.entity ?? "manglende entity"}: ${i}`;
  }
  doorVisualStatus(e, t) {
    if (e.state_binding)
      return Fe(
        e,
        (a) => this.hass?.states[a]?.state
      ).active ? "active" : "blocked";
    const r = t.filter((s) => {
      const { from: a, to: l } = s.edge;
      return a.kind === "node" && a.id === e.id || l.kind === "node" && l.id === e.id;
    }).filter((s) => s.conditional);
    if (!r.length) return "always";
    const o = r.some((s) => s.active), n = r.some((s) => !s.active);
    return o && n ? "mixed" : o ? "active" : "blocked";
  }
  doorStatusColor(e) {
    return e === "active" ? "var(--success-color, #43a047)" : e === "blocked" ? "var(--error-color, #db4437)" : e === "mixed" ? "var(--warning-color, #ff9800)" : "var(--secondary-text-color, #667085)";
  }
  appendSvgTitle(e, t) {
    const i = document.createElementNS(q, "title");
    i.textContent = t, e.appendChild(i);
  }
  syncRouteStatusOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.route-status-scene")?.remove();
    const t = this.routeNodes.filter((s) => s.kind === "door");
    if (!this.routeGraphEdges.length && !t.length) return;
    const i = pt(
      this.routeConfig(),
      (s) => this.hass?.states[s]?.state
    ), r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, o = document.createElementNS(q, "g");
    o.setAttribute("class", "route-status-scene"), o.setAttribute("aria-label", "Live rutestatus og døre"), o.setAttribute("pointer-events", "none"), i.forEach((s) => {
      const a = this.endpointPoint(s.edge.from), l = this.endpointPoint(s.edge.to);
      if (!a || !l) return;
      const c = this.edgeStatusColor(s), d = document.createElementNS(q, "line");
      if (d.setAttribute("x1", String(a.x)), d.setAttribute("y1", String(a.y)), d.setAttribute("x2", String(l.x)), d.setAttribute("y2", String(l.y)), d.setAttribute("stroke", c), d.setAttribute("stroke-linecap", "round"), d.setAttribute("vector-effect", "non-scaling-stroke"), d.setAttribute("stroke-width", s.conditional ? s.active ? "4.5" : "5.5" : "2.5"), d.setAttribute("stroke-opacity", s.conditional ? s.active ? ".72" : ".82" : ".2"), s.conditional || d.setAttribute("stroke-dasharray", "4 10"), s.conditional && !s.active && d.setAttribute("stroke-dasharray", "13 9"), this.appendSvgTitle(d, this.statusDescription(s)), o.appendChild(d), !s.conditional) return;
      const p = (a.x + l.x) / 2, u = (a.y + l.y) / 2, g = document.createElementNS(q, "g");
      g.setAttribute("transform", `translate(${p} ${u})`);
      const b = document.createElementNS(q, "circle");
      b.setAttribute("r", "12"), b.setAttribute("fill", "var(--card-background-color, #ffffff)"), b.setAttribute("fill-opacity", ".9"), b.setAttribute("stroke", c), b.setAttribute("stroke-width", "3"), b.setAttribute("vector-effect", "non-scaling-stroke"), g.appendChild(b);
      const m = document.createElementNS(q, "text");
      if (m.setAttribute("text-anchor", "middle"), m.setAttribute("dominant-baseline", "central"), m.setAttribute("fill", c), m.setAttribute("font-size", "16"), m.setAttribute("font-weight", "900"), m.setAttribute("font-family", "system-ui, sans-serif"), m.textContent = s.active ? "✓" : "×", g.appendChild(m), !s.active && !r) {
        const y = document.createElementNS(q, "animate");
        y.setAttribute("attributeName", "opacity"), y.setAttribute("values", "1;.45;1"), y.setAttribute("dur", "1.8s"), y.setAttribute("repeatCount", "indefinite"), g.appendChild(y);
      }
      this.appendSvgTitle(g, this.statusDescription(s)), o.appendChild(g);
    }), t.forEach((s) => {
      const a = this.doorVisualStatus(s, i), l = this.doorStatusColor(a), c = s.point[0] * x, d = s.point[1] * x, p = document.createElementNS(q, "g");
      p.setAttribute("transform", `translate(${c} ${d})`);
      const u = document.createElementNS(q, "circle");
      u.setAttribute("r", "22"), u.setAttribute("fill", "var(--card-background-color, #ffffff)"), u.setAttribute("fill-opacity", ".9"), u.setAttribute("stroke", l), u.setAttribute("stroke-width", "4"), u.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(u);
      const g = document.createElementNS(q, "rect");
      g.setAttribute("x", "-9"), g.setAttribute("y", "-13"), g.setAttribute("width", "15"), g.setAttribute("height", "26"), g.setAttribute("rx", "1.5"), g.setAttribute("fill", "none"), g.setAttribute("stroke", l), g.setAttribute("stroke-width", "3"), g.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(g);
      const b = document.createElementNS(q, "circle");
      if (b.setAttribute("cx", "2"), b.setAttribute("cy", "0"), b.setAttribute("r", "2"), b.setAttribute("fill", l), p.appendChild(b), a === "blocked") {
        const w = document.createElementNS(q, "line");
        w.setAttribute("x1", "-12"), w.setAttribute("y1", "-15"), w.setAttribute("x2", "12"), w.setAttribute("y2", "15"), w.setAttribute("stroke", l), w.setAttribute("stroke-width", "4"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(w);
      }
      const m = document.createElementNS(q, "circle");
      if (m.setAttribute("cx", "16"), m.setAttribute("cy", "-16"), m.setAttribute("r", "6"), m.setAttribute("fill", l), m.setAttribute("stroke", "var(--card-background-color, #ffffff)"), m.setAttribute("stroke-width", "2"), m.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(m), s.name) {
        const w = document.createElementNS(q, "text");
        w.setAttribute("y", "39"), w.setAttribute("text-anchor", "middle"), w.setAttribute("fill", "var(--primary-text-color, #1f2937)"), w.setAttribute("font-size", "20"), w.setAttribute("font-weight", "700"), w.setAttribute("font-family", "system-ui, sans-serif"), w.setAttribute("paint-order", "stroke"), w.setAttribute("stroke", "var(--card-background-color, #ffffff)"), w.setAttribute("stroke-width", "5"), w.setAttribute("stroke-linejoin", "round"), w.textContent = s.name, p.appendChild(w);
      }
      const y = a === "always" ? "altid aktiv" : a === "active" ? "åben" : a === "blocked" ? "lukket / blokeret" : "blandet status", _ = s.state_binding ? Fe(s, (w) => this.hass?.states[w]?.state) : void 0, $ = _?.entity ? ` · ${_.entity}: ${_.currentState ?? "ukendt"} · åben: ${_.allowedStates.join(", ")}` : "";
      this.appendSvgTitle(p, `${s.name ?? s.id} · ${y}${$}`), o.appendChild(p);
    });
    const n = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(o, n ?? null);
  }
  resolveMovementPath(e, t, i, r) {
    if (!i || !r || i === r) return [e, t];
    const o = mi(
      this.routeConfig(),
      i,
      r,
      (s) => this.hass?.states[s]?.state
    );
    if (!o) return [e, t];
    const n = o.hops.slice(1, -1).map((s) => ({
      x: s.point[0] * x,
      y: s.point[1] * x
    }));
    return [e, ...n, t];
  }
  buildKeyTimes(e) {
    if (e.length <= 2) return [0, 1];
    const t = [];
    let i = 0;
    for (let n = 1; n < e.length; n += 1) {
      const s = Math.hypot(e[n].x - e[n - 1].x, e[n].y - e[n - 1].y);
      t.push(s), i += s;
    }
    if (i <= 0) return e.map((n, s) => s / (e.length - 1));
    const r = [0];
    let o = 0;
    return t.forEach((n) => {
      o += n, r.push(o / i);
    }), r;
  }
  ensureFootstepLayer() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    let t = e.querySelector(":scope > g.footsteps-scene");
    if (t) return t;
    t = document.createElementNS(q, "g"), t.setAttribute("class", "footsteps-scene"), t.setAttribute("aria-label", "Bevægelsesspor"), t.setAttribute("pointer-events", "none");
    const i = e.querySelector(":scope > g.presences-scene");
    return e.insertBefore(t, i ?? null), t;
  }
  createFootsteps(e) {
    const t = this.ensureFootstepLayer();
    if (!t || e.length < 2) return;
    const i = e.slice(1).map((n, s) => {
      const a = e[s];
      return {
        start: a,
        end: n,
        length: Math.hypot(n.x - a.x, n.y - a.y)
      };
    }), r = i.reduce((n, s) => n + s.length, 0);
    if (r < Vi) return;
    const o = Math.min(20, Math.max(3, Math.floor(r / Vi)));
    for (let n = 0; n < o; n += 1) {
      const s = (n + 1) / (o + 1), a = r * s;
      let l = 0, c = i[i.length - 1];
      for (const T of i) {
        if (l + T.length >= a) {
          c = T;
          break;
        }
        l += T.length;
      }
      const d = c.length > 0 ? (a - l) / c.length : 0, p = c.end.x - c.start.x, u = c.end.y - c.start.y, g = n % 2 === 0 ? -1 : 1, b = c.length > 0 ? -u / c.length : 0, m = c.length > 0 ? p / c.length : 0, y = 9 * g, _ = c.start.x + p * d + b * y, $ = c.start.y + u * d + m * y, w = Math.atan2(u, p) * 180 / Math.PI + 90, S = Math.round(s * qt), C = document.createElementNS(q, "g");
      C.setAttribute("transform", `translate(${_} ${$}) rotate(${w + g * 8})`), C.setAttribute("opacity", "0");
      const k = document.createElementNS(q, "ellipse");
      k.setAttribute("cx", "0"), k.setAttribute("cy", "-5"), k.setAttribute("rx", "6"), k.setAttribute("ry", "12"), k.setAttribute("fill", "rgba(67, 48, 31, 0.72)");
      const E = document.createElementNS(q, "ellipse");
      E.setAttribute("cx", "0"), E.setAttribute("cy", "9"), E.setAttribute("rx", "4.5"), E.setAttribute("ry", "5.5"), E.setAttribute("fill", "rgba(67, 48, 31, 0.68)");
      const M = document.createElementNS(q, "animate");
      M.setAttribute("attributeName", "opacity"), M.setAttribute("values", "0;0.72;0.56;0"), M.setAttribute("keyTimes", "0;0.08;0.58;1"), M.setAttribute("begin", "indefinite"), M.setAttribute("dur", `${Fi}ms`), M.setAttribute("fill", "freeze"), C.append(k, E, M), t.appendChild(C), window.setTimeout(() => {
        C.isConnected && M.beginElement();
      }, S), window.setTimeout(() => C.remove(), S + Fi + 120);
    }
  }
};
It([
  A({ attribute: !1 })
], Ve.prototype, "routes", 2);
It([
  A({ attribute: !1 })
], Ve.prototype, "routeNodes", 2);
It([
  A({ attribute: !1 })
], Ve.prototype, "routeGraphEdges", 2);
Ve = It([
  z("explorer-animated-canvas")
], Ve);
var qo = Object.getOwnPropertyDescriptor, Bo = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? qo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const D = "http://www.w3.org/2000/svg";
let Ct = class extends Ve {
  updated(e) {
    super.updated(e), this.syncRoomReactionOverlay();
  }
  entityState(e) {
    const t = this.hass?.states[e];
    if (t)
      return { state: t.state, attributes: t.attributes };
  }
  appendTitle(e, t) {
    const i = document.createElementNS(D, "title");
    i.textContent = t, e.appendChild(i);
  }
  pointColor(e) {
    return e === "light" ? "var(--explorer-room-light-color, #f6bd60)" : e === "motion" ? "var(--explorer-room-motion-color, var(--primary-color, #03a9f4))" : e === "media" ? "var(--explorer-room-media-color, var(--accent-color, #7e57c2))" : e === "opening" ? "var(--explorer-room-opening-color, var(--warning-color, #ff9800))" : e === "fireplace" ? "var(--explorer-room-fireplace-color, #c46b2d)" : "var(--explorer-room-temperature-neutral, #4f9b78)";
  }
  appendPointBackdrop(e, t, i, r = 11) {
    const o = document.createElementNS(D, "circle");
    return o.setAttribute("r", String(r)), o.setAttribute("fill", "var(--card-background-color, #ffffff)"), o.setAttribute("fill-opacity", i ? ".94" : ".78"), o.setAttribute("stroke", t), o.setAttribute("stroke-width", i ? "3" : "2"), o.setAttribute("stroke-opacity", i ? ".95" : ".42"), o.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(o), o;
  }
  appendLightPoint(e, t, i) {
    const r = this.pointColor("light");
    if (t.active) {
      e.setAttribute("data-magical-light", "active");
      const n = Math.max(0.18, Math.min(1, t.intensity));
      [[74, 0.025], [52, 0.055], [34, 0.12]].forEach(([c, d], p) => {
        const u = document.createElementNS(D, "circle");
        if (u.setAttribute("class", `magical-light-glow glow-${p + 1}`), u.setAttribute("r", String(c * (0.82 + n * 0.34))), u.setAttribute("fill", r), u.setAttribute("fill-opacity", String(d + n * d * 1.8)), u.setAttribute("stroke", "none"), e.appendChild(u), !i && p === 1) {
          const g = document.createElementNS(D, "animate");
          g.setAttribute("attributeName", "fill-opacity"), g.setAttribute("values", `${d + n * 0.07};${d + n * 0.13};${d + n * 0.07}`), g.setAttribute("dur", "4.8s"), g.setAttribute("repeatCount", "indefinite"), u.appendChild(g);
        }
      });
      const a = document.createElementNS(D, "circle"), l = 24 + n * 24;
      if (a.setAttribute("class", "light-halo"), a.setAttribute("r", String(l)), a.setAttribute("fill", r), a.setAttribute("fill-opacity", String(0.08 + n * 0.18)), a.setAttribute("stroke", r), a.setAttribute("stroke-width", "2"), a.setAttribute("stroke-opacity", String(0.1 + n * 0.18)), a.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(a), !i) {
        const c = document.createElementNS(D, "animate");
        c.setAttribute("attributeName", "r"), c.setAttribute("values", `${l * 0.94};${l * 1.06};${l * 0.94}`), c.setAttribute("dur", "4.2s"), c.setAttribute("repeatCount", "indefinite"), a.appendChild(c);
      }
    }
    this.appendPointBackdrop(e, r, t.active, 11);
    const o = document.createElementNS(D, "text");
    o.setAttribute("class", "light-glyph"), o.setAttribute("text-anchor", "middle"), o.setAttribute("dominant-baseline", "central"), o.setAttribute("font-size", "15"), o.setAttribute("font-weight", "900"), o.setAttribute("fill", r), o.setAttribute("opacity", t.active ? "1" : ".48"), o.textContent = "✦", e.appendChild(o);
  }
  appendMotionPoint(e, t, i) {
    const r = this.pointColor("motion");
    this.appendPointBackdrop(e, r, t.active, 10);
    const o = document.createElementNS(D, "circle");
    if (o.setAttribute("r", t.active ? "4.5" : "3.5"), o.setAttribute("fill", r), o.setAttribute("opacity", t.active ? "1" : ".42"), e.appendChild(o), !t.active) return;
    const n = document.createElementNS(D, "circle");
    if (n.setAttribute("r", "15"), n.setAttribute("fill", "none"), n.setAttribute("stroke", r), n.setAttribute("stroke-width", "3"), n.setAttribute("stroke-opacity", ".78"), n.setAttribute("vector-effect", "non-scaling-stroke"), e.insertBefore(n, e.firstChild), !i) {
      const s = document.createElementNS(D, "animate");
      s.setAttribute("attributeName", "r"), s.setAttribute("values", "13;31;13"), s.setAttribute("dur", "1.8s"), s.setAttribute("repeatCount", "indefinite"), n.appendChild(s);
    }
  }
  appendMediaPoint(e, t) {
    const i = this.pointColor("media");
    if (t.active) {
      const n = document.createElementNS(D, "circle");
      n.setAttribute("r", "25"), n.setAttribute("fill", i), n.setAttribute("fill-opacity", ".12"), e.appendChild(n);
    }
    const r = document.createElementNS(D, "rect");
    r.setAttribute("x", "-16"), r.setAttribute("y", "-11"), r.setAttribute("width", "32"), r.setAttribute("height", "22"), r.setAttribute("rx", "4"), r.setAttribute("fill", "var(--card-background-color, #ffffff)"), r.setAttribute("fill-opacity", t.active ? ".94" : ".78"), r.setAttribute("stroke", i), r.setAttribute("stroke-width", t.active ? "3" : "2"), r.setAttribute("stroke-opacity", t.active ? ".95" : ".42"), e.appendChild(r);
    const o = document.createElementNS(D, "path");
    o.setAttribute("d", "M -4 -6 L 7 0 L -4 6 Z"), o.setAttribute("fill", i), o.setAttribute("opacity", t.active ? "1" : ".40"), e.appendChild(o);
  }
  appendOpeningPoint(e, t) {
    const i = this.pointColor("opening");
    this.appendPointBackdrop(e, i, t.active, 11);
    const r = document.createElementNS(D, "text");
    r.setAttribute("text-anchor", "middle"), r.setAttribute("dominant-baseline", "central"), r.setAttribute("font-size", t.active ? "18" : "15"), r.setAttribute("font-weight", "900"), r.setAttribute("fill", i), r.setAttribute("opacity", t.active ? "1" : ".42"), r.textContent = t.active ? "↗" : "━", e.appendChild(r);
  }
  appendFireplacePoint(e, t, i) {
    const r = this.pointColor("fireplace"), o = Math.max(0.2, Math.min(1, t.intensity || 1)), n = t.reaction.radius, s = Number.isFinite(n) ? Math.max(26, Math.min(160, n * x)) : 72;
    if (t.active) {
      e.setAttribute("data-fireplace", "active");
      const l = document.createElementNS(D, "circle");
      l.setAttribute("class", "fireplace-glow fireplace-glow-outer"), l.setAttribute("r", String(s)), l.setAttribute("fill", r), l.setAttribute("fill-opacity", String(0.07 + 0.11 * o)), e.appendChild(l);
      const c = document.createElementNS(D, "circle");
      if (c.setAttribute("class", "fireplace-glow fireplace-glow-inner"), c.setAttribute("r", String(s * 0.56)), c.setAttribute("fill", "var(--explorer-room-fireplace-hot, #e7a253)"), c.setAttribute("fill-opacity", String(0.12 + 0.17 * o)), e.appendChild(c), !i) {
        const d = document.createElementNS(D, "animate");
        d.setAttribute("attributeName", "fill-opacity"), d.setAttribute("values", `${0.1 + 0.12 * o};${0.2 + 0.18 * o};${0.12 + 0.1 * o};${0.24 + 0.16 * o};${0.1 + 0.12 * o}`), d.setAttribute("dur", "2.1s"), d.setAttribute("repeatCount", "indefinite"), c.appendChild(d);
        const p = document.createElementNS(D, "animate");
        p.setAttribute("attributeName", "r"), p.setAttribute("values", `${s * 0.93};${s * 1.05};${s * 0.97};${s * 0.93}`), p.setAttribute("dur", "3.6s"), p.setAttribute("repeatCount", "indefinite"), l.appendChild(p);
      }
    }
    this.appendPointBackdrop(e, r, t.active, 12);
    const a = document.createElementNS(D, "path");
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
    const i = this.temperatureColor(t), r = this.formatTemperature(t), o = Math.max(58, 24 + r.length * 8.2), n = document.createElementNS(D, "rect");
    n.setAttribute("x", String(-o / 2)), n.setAttribute("y", "-15"), n.setAttribute("width", String(o)), n.setAttribute("height", "30"), n.setAttribute("rx", "15"), n.setAttribute("fill", "var(--card-background-color, #ffffff)"), n.setAttribute("fill-opacity", t.active ? ".94" : ".78"), n.setAttribute("stroke", i), n.setAttribute("stroke-width", "2.5"), e.appendChild(n);
    const s = document.createElementNS(D, "text");
    s.setAttribute("text-anchor", "middle"), s.setAttribute("dominant-baseline", "central"), s.setAttribute("font-size", "14"), s.setAttribute("font-weight", "800"), s.setAttribute("fill", i), s.textContent = r, e.appendChild(s);
  }
  appendReactionPoint(e, t, i, r) {
    const o = Je(t, i.reaction), n = document.createElementNS(D, "g");
    n.setAttribute("class", `room-reaction-point ${i.reaction.kind} ${i.active ? "active" : "inactive"}`), n.setAttribute("data-reaction-kind", i.reaction.kind), n.setAttribute("transform", `translate(${o.x * x} ${o.y * x})`), i.reaction.kind === "light" ? this.appendLightPoint(n, i, r) : i.reaction.kind === "motion" ? this.appendMotionPoint(n, i, r) : i.reaction.kind === "media" ? this.appendMediaPoint(n, i) : i.reaction.kind === "opening" ? this.appendOpeningPoint(n, i) : i.reaction.kind === "fireplace" ? this.appendFireplacePoint(n, i, r) : this.appendTemperaturePoint(n, i);
    const s = i.reaction.kind === "temperature" ? this.formatTemperature(i) : i.currentState ?? "ukendt";
    this.appendTitle(n, `${t.name ?? t.id} · ${i.reaction.entity} · ${s}`), e.appendChild(n);
  }
  syncRoomReactionOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-reactions-scene")?.remove();
    const t = this.rooms.flatMap((a) => At(a, (l) => this.entityState(l)).map((l) => ({ room: a, status: l })));
    if (!t.length) return;
    const i = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, r = document.createElementNS(D, "g");
    r.setAttribute("class", "room-reactions-scene"), r.setAttribute("aria-label", "Home Assistant entity-punkter"), r.setAttribute("pointer-events", "none"), t.forEach(({ room: a, status: l }) => this.appendReactionPoint(r, a, l, i));
    const o = e.querySelector(":scope > g.route-status-scene"), n = e.querySelector(":scope > g.footsteps-scene"), s = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, o ?? n ?? s ?? null);
  }
};
Ct = Bo([
  z("explorer-living-canvas")
], Ct);
var Ho = Object.getOwnPropertyDescriptor, Fo = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ho(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const R = "http://www.w3.org/2000/svg", Bt = 3e4;
let nt = class extends Ct {
  constructor() {
    super(...arguments), this.lastOccupiedAt = /* @__PURE__ */ new Map(), this.overcastMaskId = `explorer-overcast-mask-${Math.random().toString(36).slice(2, 10)}`, this.overcastFilterId = `explorer-overcast-soft-${Math.random().toString(36).slice(2, 10)}`;
  }
  updated(e) {
    super.updated(e), (e.has("presences") || e.has("rooms")) && this.syncPresenceRoomActivity(), (e.has("hass") || e.has("rooms") || e.has("theme")) && (this.syncTemperatureAtmosphere(), this.syncFireplaceAtmosphere()), (e.has("weatherEffect") || e.has("weatherIntensity") || e.has("weatherNight") || e.has("rooms") || e.has("theme") || e.has("image") || e.has("metadata") || e.has("svgMarkup") || e.has("imageSource")) && this.syncOvercastCloudDensity();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.afterglowTimer !== void 0 && window.clearTimeout(this.afterglowTimer);
  }
  pointInPolygon(e, t) {
    if (t.length < 3) return !1;
    const [i, r] = e;
    let o = !1;
    for (let n = 0, s = t.length - 1; n < t.length; s = n++) {
      const [a, l] = t[n], [c, d] = t[s];
      l > r != d > r && i < (c - a) * (r - l) / (d - l || Number.EPSILON) + a && (o = !o);
    }
    return o;
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
      const r = t.get(i.id) ?? 0, o = r > 0, n = e - (this.lastOccupiedAt.get(i.id) ?? -1 / 0), s = !o && n >= 0 && n < Bt, a = o ? Math.min(1, 0.72 + Math.max(0, r - 1) * 0.12) : s ? Math.max(0, 1 - n / Bt) : 0;
      return { room: i, active: o, afterglow: s, intensity: a };
    }).filter((i) => i.active || i.afterglow);
  }
  polygonPoints(e) {
    return e.points.map(([t, i]) => `${t * x},${i * x}`).join(" ");
  }
  scheduleAfterglowRefresh(e, t) {
    this.afterglowTimer !== void 0 && window.clearTimeout(this.afterglowTimer);
    const i = e.filter((r) => r.afterglow).map((r) => Bt - (t - (this.lastOccupiedAt.get(r.room.id) ?? t)));
    i.length && (this.afterglowTimer = window.setTimeout(() => {
      this.afterglowTimer = void 0, this.syncPresenceRoomActivity();
    }, Math.max(50, Math.min(...i) + 30)));
  }
  syncRoomClasses(e) {
    const t = Array.from(this.renderRoot.querySelectorAll("g.rooms-scene > g.room"));
    t.forEach((i) => i.classList.remove("presence-active", "presence-afterglow")), this.rooms.filter((i) => i.points.length).forEach((i, r) => {
      const o = e.find((s) => s.room.id === i.id), n = t[r];
      !o || !n || n.classList.add(o.active ? "presence-active" : "presence-afterglow");
    });
  }
  syncPresenceRoomActivity() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.presence-room-activity-scene")?.remove();
    const t = Date.now(), i = this.activities(t);
    if (this.syncRoomClasses(i), this.scheduleAfterglowRefresh(i, t), !i.length) return;
    const r = document.createElementNS(R, "g");
    r.setAttribute("class", "presence-room-activity-scene"), r.setAttribute("aria-label", "Tilstedeværelsesbaseret rumaktivitet"), r.setAttribute("pointer-events", "none"), i.forEach(({ room: l, active: c, intensity: d }) => {
      if (l.points.length < 3) return;
      const p = document.createElementNS(R, "polygon");
      p.setAttribute("points", this.polygonPoints(l)), p.setAttribute("class", c ? "presence-room-active" : "presence-room-afterglow"), p.setAttribute("fill", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))"), p.setAttribute("fill-opacity", String(c ? 0.1 + d * 0.07 : 0.025 + d * 0.07)), p.setAttribute("stroke", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))"), p.setAttribute("stroke-opacity", String(c ? 0.28 : 0.08 + d * 0.16)), p.setAttribute("stroke-width", c ? "3" : "2"), p.setAttribute("vector-effect", "non-scaling-stroke"), r.appendChild(p);
    });
    const o = e.querySelector(":scope > g.room-reactions-scene"), n = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, o ?? n ?? s ?? a ?? null);
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
      const t = At(e, (r) => this.atmosphereEntityState(r)).filter((r) => r.reaction.kind === "temperature" && r.active).map((r) => this.temperatureCelsius(r)).filter((r) => r !== void 0);
      if (!t.length) return [];
      const i = t.reduce((r, o) => r + o, 0) / t.length;
      return [{ room: e, celsius: i }];
    });
  }
  syncTemperatureAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-temperature-atmosphere-scene")?.remove();
    const t = this.roomTemperatures();
    if (!t.length) return;
    const i = document.createElementNS(R, "g");
    i.setAttribute("class", "room-temperature-atmosphere-scene"), i.setAttribute("aria-label", "Temperaturatmosfære i rum"), i.setAttribute("pointer-events", "none"), t.forEach(({ room: l, celsius: c }) => {
      const d = this.temperatureOpacity(c), p = this.atmosphereTemperatureColor(c), u = this.temperatureBand(c), g = document.createElementNS(R, "polygon");
      g.setAttribute("points", this.polygonPoints(l)), g.setAttribute("class", `room-temperature-atmosphere temperature-${u}`), g.setAttribute("data-temperature-band", u), g.setAttribute("fill", p), g.setAttribute("fill-opacity", String(d)), g.setAttribute("stroke", p), g.setAttribute("stroke-opacity", String(Math.min(0.18, 0.045 + d * 0.9))), g.setAttribute("stroke-width", "2"), g.setAttribute("stroke-linejoin", "round"), g.setAttribute("vector-effect", "non-scaling-stroke");
      const b = document.createElementNS(R, "title"), m = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(c);
      b.textContent = `${l.name ?? l.id} · temperaturatmosfære · ${m} °C`, g.appendChild(b), i.appendChild(g);
    });
    const r = e.querySelector(":scope > g.presence-room-activity-scene"), o = e.querySelector(":scope > g.room-reactions-scene"), n = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, r ?? o ?? n ?? s ?? a ?? null);
  }
  appendFireplaceAtmosphere(e, t, i, r, o) {
    const n = Je(t, i.reaction), s = Math.max(0.2, Math.min(1, i.intensity || 1)), a = i.reaction.radius, l = Number.isFinite(a) ? Math.max(42, Math.min(180, a * x)) : 82, c = document.createElementNS(R, "g");
    c.setAttribute("class", "fireplace-atmosphere"), c.setAttribute("transform", `translate(${n.x * x} ${n.y * x})`), c.setAttribute("data-room-id", t.id);
    const d = document.createElementNS(R, "circle");
    d.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-outer"), d.setAttribute("r", String(l * 1.18)), d.setAttribute("fill", "var(--explorer-fireplace-atmosphere, #c97935)"), d.setAttribute("fill-opacity", String(0.045 + s * 0.055)), c.appendChild(d);
    const p = document.createElementNS(R, "circle");
    p.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-middle"), p.setAttribute("r", String(l * 0.72)), p.setAttribute("fill", "var(--explorer-fireplace-atmosphere-hot, #e6a34b)"), p.setAttribute("fill-opacity", String(0.065 + s * 0.085)), c.appendChild(p);
    const u = document.createElementNS(R, "ellipse");
    if (u.setAttribute("class", "fireplace-atmosphere-core"), u.setAttribute("cx", "0"), u.setAttribute("cy", String(-l * 0.05)), u.setAttribute("rx", String(l * 0.39)), u.setAttribute("ry", String(l * 0.31)), u.setAttribute("fill", "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), u.setAttribute("fill-opacity", String(0.07 + s * 0.09)), c.appendChild(u), !r) {
      const m = document.createElementNS(R, "animate");
      m.setAttribute("attributeName", "fill-opacity"), m.setAttribute("values", `${0.04 + s * 0.045};${0.065 + s * 0.07};${0.048 + s * 0.052};${0.04 + s * 0.045}`), m.setAttribute("dur", `${3.2 + o % 3 * 0.35}s`), m.setAttribute("repeatCount", "indefinite"), d.appendChild(m);
      const y = document.createElementNS(R, "animate");
      y.setAttribute("attributeName", "fill-opacity"), y.setAttribute("values", `${0.075 + s * 0.07};${0.13 + s * 0.11};${0.09 + s * 0.08};${0.145 + s * 0.105};${0.075 + s * 0.07}`), y.setAttribute("dur", `${1.65 + o % 2 * 0.22}s`), y.setAttribute("repeatCount", "indefinite"), p.appendChild(y);
    }
    [
      [-18, -10, 2.4],
      [12, -18, 2],
      [-5, -28, 1.7],
      [22, -6, 1.5],
      [-26, -22, 1.4],
      [5, -38, 1.25]
    ].forEach(([m, y, _], $) => {
      const w = document.createElementNS(R, "circle");
      if (w.setAttribute("class", "fireplace-ember"), w.setAttribute("cx", String(m)), w.setAttribute("cy", String(y)), w.setAttribute("r", String(_)), w.setAttribute("fill", $ % 2 === 0 ? "var(--explorer-fireplace-ember, #d96532)" : "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), w.setAttribute("opacity", r ? String(0.28 + s * 0.22) : "0"), c.appendChild(w), !r) {
        const S = document.createElementNS(R, "animate");
        S.setAttribute("attributeName", "cy"), S.setAttribute("values", `${y};${y - 22 - $ * 2};${y - 38 - $ * 3}`), S.setAttribute("dur", `${2.4 + $ % 3 * 0.42}s`), S.setAttribute("begin", `${($ * 0.37 + o * 0.11).toFixed(2)}s`), S.setAttribute("repeatCount", "indefinite"), w.appendChild(S);
        const C = document.createElementNS(R, "animate");
        C.setAttribute("attributeName", "opacity"), C.setAttribute("values", `0;${0.32 + s * 0.45};${0.16 + s * 0.22};0`), C.setAttribute("keyTimes", "0;0.18;0.68;1"), C.setAttribute("dur", `${2.4 + $ % 3 * 0.42}s`), C.setAttribute("begin", `${($ * 0.37 + o * 0.11).toFixed(2)}s`), C.setAttribute("repeatCount", "indefinite"), w.appendChild(C);
      }
    });
    const b = document.createElementNS(R, "title");
    b.textContent = `${t.name ?? t.id} · levende pejsatmosfære`, c.appendChild(b), e.appendChild(c);
  }
  syncFireplaceAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.fireplace-atmosphere-scene")?.remove();
    const t = this.rooms.flatMap(
      (l) => At(l, (c) => this.atmosphereEntityState(c)).filter((c) => c.reaction.kind === "fireplace" && c.active).map((c) => ({ room: l, status: c }))
    );
    if (!t.length) return;
    const i = document.createElementNS(R, "g");
    i.setAttribute("class", "fireplace-atmosphere-scene"), i.setAttribute("aria-label", "Levende pejsatmosfære"), i.setAttribute("pointer-events", "none");
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    t.forEach(({ room: l, status: c }, d) => this.appendFireplaceAtmosphere(i, l, c, r, d));
    const o = e.querySelector(":scope > g.room-reactions-scene"), n = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, o ?? n ?? s ?? a ?? null);
  }
  descendantWeather() {
    const e = this;
    return {
      effect: e.weatherEffect ?? "clear",
      intensity: Math.min(1, Math.max(0.25, e.weatherIntensity || 0.6)),
      night: e.weatherNight ?? !1
    };
  }
  createOvercastMask() {
    const e = document.createElementNS(R, "mask");
    e.setAttribute("id", this.overcastMaskId), e.setAttribute("maskUnits", "userSpaceOnUse"), e.setAttribute("x", "0"), e.setAttribute("y", "0"), e.setAttribute("width", String(x)), e.setAttribute("height", String(x));
    const t = document.createElementNS(R, "rect");
    return t.setAttribute("x", "0"), t.setAttribute("y", "0"), t.setAttribute("width", String(x)), t.setAttribute("height", String(x)), t.setAttribute("fill", "white"), e.appendChild(t), this.rooms.forEach((i) => {
      if (i.points.length < 3) return;
      const r = document.createElementNS(R, "polygon");
      r.setAttribute("points", this.polygonPoints(i)), r.setAttribute("fill", "black"), r.setAttribute("stroke", "black"), r.setAttribute("stroke-width", "16"), r.setAttribute("stroke-linejoin", "round"), e.appendChild(r);
    }), e;
  }
  createOvercastFilter() {
    const e = document.createElementNS(R, "filter");
    e.setAttribute("id", this.overcastFilterId), e.setAttribute("x", "-55%"), e.setAttribute("y", "-65%"), e.setAttribute("width", "210%"), e.setAttribute("height", "240%");
    const t = document.createElementNS(R, "feGaussianBlur");
    t.setAttribute("in", "SourceGraphic"), t.setAttribute("stdDeviation", "3.1"), t.setAttribute("result", "soft"), e.appendChild(t);
    const i = document.createElementNS(R, "feTurbulence");
    i.setAttribute("type", "fractalNoise"), i.setAttribute("baseFrequency", "0.016 0.029"), i.setAttribute("numOctaves", "3"), i.setAttribute("seed", "43"), i.setAttribute("result", "noise"), e.appendChild(i);
    const r = document.createElementNS(R, "feDisplacementMap");
    return r.setAttribute("in", "soft"), r.setAttribute("in2", "noise"), r.setAttribute("scale", "16"), r.setAttribute("xChannelSelector", "R"), r.setAttribute("yChannelSelector", "G"), e.appendChild(r), e;
  }
  appendOvercastCloud(e, t, i, r, o, n) {
    const s = document.createElementNS(R, "g");
    s.setAttribute("class", "overcast-cloud-position"), s.setAttribute("transform", `translate(${t} ${i}) scale(${r})`), s.setAttribute("opacity", String(n));
    const a = document.createElementNS(R, "g");
    a.setAttribute("class", `overcast-cloud overcast-cloud-${o % 3} overcast-depth-${o % 3}`);
    const l = document.createElementNS(R, "ellipse");
    l.setAttribute("class", "overcast-cloud-mist"), l.setAttribute("cx", o % 2 === 0 ? "-12" : "14"), l.setAttribute("cy", "18"), l.setAttribute("rx", "145"), l.setAttribute("ry", "43"), a.appendChild(l);
    const c = document.createElementNS(R, "g");
    c.setAttribute("class", "overcast-cloud-body"), c.setAttribute("filter", `url(#${this.overcastFilterId})`), c.setAttribute("transform", o % 2 === 0 ? "scale(1.12 .74) skewX(-4)" : "scale(.98 .88) skewX(5)");
    const d = document.createElementNS(R, "path");
    d.setAttribute("class", "overcast-cloud-base"), d.setAttribute("d", "M-150 31 C-133 1 -108 -17 -80 -18 C-66 -47 -41 -62 -13 -57 C5 -78 34 -82 58 -62 C84 -62 107 -48 120 -27 C146 -18 158 5 145 29 C128 53 99 63 66 61 C34 75 -4 74 -37 68 C-76 75 -116 64 -140 48 C-151 41 -155 35 -150 31 Z"), c.appendChild(d), [
      [-86, -6, 50, 30],
      [-47, -37, 57, 34],
      [-3, -51, 65, 38],
      [43, -43, 58, 35],
      [82, -17, 50, 30],
      [14, 23, 92, 27]
    ].forEach(([g, b, m, y], _) => {
      const $ = document.createElementNS(R, "ellipse");
      $.setAttribute("class", "overcast-cloud-puff"), $.setAttribute("cx", String(g)), $.setAttribute("cy", String(b)), $.setAttribute("rx", String(m)), $.setAttribute("ry", String(y)), $.setAttribute("opacity", String(0.34 + _ % 3 * 0.08)), c.appendChild($);
    }), a.appendChild(c);
    const u = document.createElementNS(R, "path");
    u.setAttribute("class", "overcast-cloud-strand"), u.setAttribute("d", "M-184 70 C-130 58 -80 63 -32 68 C18 73 70 65 135 48 C89 79 27 88 -33 82 C-88 78 -139 89 -184 70 Z"), a.appendChild(u), s.appendChild(a), e.appendChild(s);
  }
  syncOvercastCloudDensity() {
    const e = this.renderRoot.querySelector("svg.floorplan"), t = this.renderRoot.querySelector("g.scene");
    if (!e || !t) return;
    e.querySelector(`defs[data-overcast-mask="${this.overcastMaskId}"]`)?.remove(), t.querySelector(":scope > g.overcast-cloud-density-scene")?.remove();
    const i = this.descendantWeather();
    if (i.effect !== "cloudy") return;
    const r = document.createElementNS(R, "defs");
    r.setAttribute("data-overcast-mask", this.overcastMaskId), r.appendChild(this.createOvercastMask()), r.appendChild(this.createOvercastFilter()), e.insertBefore(r, e.firstChild);
    const o = document.createElementNS(R, "g");
    o.setAttribute("class", `overcast-cloud-density-scene${i.night ? " is-night" : ""}`), o.setAttribute("mask", `url(#${this.overcastMaskId})`), o.setAttribute("pointer-events", "none"), o.style.setProperty("--overcast-intensity", String(i.intensity)), [
      [195, 58, 0.68, 0, 0.4],
      [515, 90, 0.58, 1, 0.31],
      [845, 58, 0.66, 2, 0.38],
      [1040, 205, 0.62, 3, 0.36],
      [-28, 215, 0.63, 4, 0.37],
      [1035, 535, 0.72, 5, 0.42],
      [-34, 520, 0.69, 6, 0.4],
      [1028, 830, 0.66, 7, 0.37],
      [-20, 865, 0.64, 8, 0.36],
      [265, 1035, 0.63, 9, 0.36],
      [585, 1038, 0.56, 10, 0.31],
      [890, 1028, 0.64, 11, 0.36]
    ].forEach(([a, l, c, d, p]) => this.appendOvercastCloud(o, a, l, c, d, p));
    const s = t.querySelector(":scope > g.rooms-scene");
    t.insertBefore(o, s ?? null);
  }
};
nt.styles = O`
    ${Ct.styles}

    :host {
      --explorer-presence-room-color: var(--primary-color, #03a9f4);
      --explorer-fireplace-atmosphere: #c97935;
      --explorer-fireplace-atmosphere-hot: #e6a34b;
      --explorer-fireplace-atmosphere-core: #f0b65c;
      --explorer-fireplace-ember: #d96532;
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

    .fireplace-atmosphere-scene .fireplace-atmosphere-glow,
    .fireplace-atmosphere-scene .fireplace-atmosphere-core {
      mix-blend-mode: soft-light;
    }

    .fireplace-atmosphere-scene .fireplace-ember {
      filter: drop-shadow(0 0 3px color-mix(in srgb, var(--explorer-fireplace-atmosphere-core) 68%, transparent));
    }

    .overcast-cloud-density-scene {
      opacity: min(.78, calc(var(--overcast-intensity, .6) * .88));
    }

    :host-context(ha-card.partly-cloudy) .overcast-cloud-density-scene {
      display: none;
    }

    .overcast-cloud-density-scene .overcast-cloud {
      animation: explorerOvercastDriftA 72s ease-in-out infinite alternate;
      transform-box: fill-box;
      transform-origin: center;
    }

    .overcast-cloud-density-scene .overcast-cloud-1 {
      animation-name: explorerOvercastDriftB;
      animation-direction: alternate-reverse;
    }

    .overcast-cloud-density-scene .overcast-cloud-2 {
      animation-name: explorerOvercastDriftC;
    }

    .overcast-cloud-density-scene .overcast-depth-0 { animation-duration: 58s; }
    .overcast-cloud-density-scene .overcast-depth-1 { animation-duration: 82s; opacity: .72; }
    .overcast-cloud-density-scene .overcast-depth-2 { animation-duration: 108s; opacity: .54; }
    .overcast-cloud-density-scene .overcast-cloud-mist { fill: rgba(230, 228, 222, .16); filter: blur(24px); }
    .overcast-cloud-density-scene .overcast-cloud-base { fill: rgba(205, 205, 201, .28); }
    .overcast-cloud-density-scene .overcast-cloud-puff { fill: rgba(238, 237, 232, .38); }
    .overcast-cloud-density-scene .overcast-cloud-strand { fill: rgba(215, 214, 208, .12); filter: blur(14px); }
    .overcast-cloud-density-scene.is-night .overcast-cloud-mist { fill: rgba(125, 140, 151, .12); }
    .overcast-cloud-density-scene.is-night .overcast-cloud-base { fill: rgba(112, 128, 138, .25); }
    .overcast-cloud-density-scene.is-night .overcast-cloud-puff { fill: rgba(162, 174, 181, .30); }

    :host([map-theme="enchanted_antique"]) {
      --explorer-presence-room-color: #6f4b2e;
      --explorer-room-temperature-cold: #667b88;
      --explorer-room-temperature-neutral: #77805a;
      --explorer-room-temperature-warm: #b27b43;
      --explorer-room-temperature-hot: #a6563e;
      --explorer-fireplace-atmosphere: #a96130;
      --explorer-fireplace-atmosphere-hot: #cb873b;
      --explorer-fireplace-atmosphere-core: #dda34e;
      --explorer-fireplace-ember: #934529;
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

    :host([map-theme="enchanted_antique"]) .fireplace-atmosphere-scene {
      filter: sepia(.16) saturate(.88);
    }

    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene {
      filter: sepia(.10) saturate(.62) contrast(.98);
    }

    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-mist { fill: rgba(229, 219, 201, .15); }
    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-base { fill: rgba(207, 197, 181, .27); }
    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-puff { fill: rgba(235, 225, 207, .36); }
    :host([map-theme="enchanted_antique"]) .overcast-cloud-density-scene .overcast-cloud-strand { fill: rgba(216, 204, 184, .11); }

    :host([map-theme="enchanted_antique"]) .room.presence-active .room-label {
      letter-spacing: .065em;
      text-shadow: 0 0 7px rgba(91, 57, 34, .24);
    }

    @keyframes explorerOvercastDriftA {
      from { transform: translate(-42px, -6px) scale(.99); opacity: .84; }
      to { transform: translate(74px, 9px) scale(1.025); opacity: 1; }
    }

    @keyframes explorerOvercastDriftB {
      from { transform: translate(54px, -4px) scale(1.02); opacity: .82; }
      to { transform: translate(-68px, 11px) scale(.995); opacity: 1; }
    }

    @keyframes explorerOvercastDriftC {
      from { transform: translate(-34px, 8px) scale(.985); opacity: .84; }
      to { transform: translate(62px, -5px) scale(1.018); opacity: .98; }
    }

    @media (prefers-reduced-motion: reduce) {
      .presence-room-activity-scene polygon,
      .room-temperature-atmosphere-scene polygon {
        transition: none;
      }
      .overcast-cloud-density-scene .overcast-cloud {
        animation: none;
      }
    }
  `;
nt = Fo([
  z("explorer-presence-activity-canvas")
], nt);
var Vo = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, ht = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ko(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Vo(t, i, o), o;
};
const Zo = "http://www.w3.org/2000/svg";
let be = class extends nt {
  constructor() {
    super(...arguments), this.theme = "classic", this.compassRotation = -7, this.compassSize = 1, this.compassVisible = !0, this.artifactId = `explorer-antique-${Math.random().toString(36).slice(2, 10)}`, this.hasRevealedEnchanted = !1;
  }
  updated(e) {
    super.updated(e), this.syncThemeArtifacts();
  }
  createSvg(e) {
    return document.createElementNS(Zo, e);
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
    const o = this.createSvg("radialGradient");
    o.setAttribute("id", `${this.artifactId}-vignette`), [["0%", "#f6e3b7", "0"], ["70%", "#9b6c3d", ".04"], ["100%", "#3f291c", ".30"]].forEach(([a, l, c]) => {
      const d = this.createSvg("stop");
      this.setAttributes(d, { offset: a, "stop-color": l, "stop-opacity": c }), o.appendChild(d);
    }), e.appendChild(o);
    const n = this.createSvg("pattern");
    this.setAttributes(n, { id: `${this.artifactId}-floor`, width: "28", height: "28", patternUnits: "userSpaceOnUse", patternTransform: "rotate(-8)" });
    const s = this.createSvg("rect");
    return this.setAttributes(s, { width: "28", height: "28", fill: "transparent" }), n.appendChild(s), [5, 14, 23].forEach((a) => {
      const l = this.createSvg("path");
      this.setAttributes(l, { d: `M 0 ${a} C 7 ${a - 1.3}, 19 ${a + 1.2}, 28 ${a}`, fill: "none", stroke: "#6a472d", "stroke-width": ".55", "stroke-opacity": ".12" }), n.appendChild(l);
    }), e.appendChild(n), e;
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
    const o = this.createSvg("rect");
    return this.setAttributes(o, { x: "0", y: "0", width: "1000", height: "1000", fill: `url(#${this.artifactId}-vignette)`, opacity: ".58" }), e.appendChild(o), e;
  }
  createCompass() {
    const e = this.createSvg("g"), t = Number.isFinite(this.compassRotation) ? this.compassRotation : -7, i = Math.min(1.8, Math.max(0.55, Number.isFinite(this.compassSize) ? this.compassSize : 1));
    e.setAttribute("class", `${this.artifactId}-compass antique-compass`), e.setAttribute("transform", `translate(906 102) rotate(${t}) scale(${i})`), e.setAttribute("pointer-events", "none"), e.setAttribute("aria-hidden", "true");
    const r = this.createSvg("circle");
    this.setAttributes(r, { r: "48", fill: "none", stroke: "#5b3c28", "stroke-width": "2.2", "stroke-opacity": ".62" }), e.appendChild(r);
    const o = this.createSvg("circle");
    this.setAttributes(o, { r: "34", fill: "none", stroke: "#5b3c28", "stroke-width": "1", "stroke-opacity": ".38" }), e.appendChild(o), [[0, -42, 0, 42], [-42, 0, 42, 0]].forEach(([c, d, p, u]) => {
      const g = this.createSvg("line");
      this.setAttributes(g, { x1: String(c), y1: String(d), x2: String(p), y2: String(u), stroke: "#5b3c28", "stroke-width": "1.5", "stroke-opacity": ".54" }), e.appendChild(g);
    });
    const n = this.createSvg("path");
    this.setAttributes(n, { d: "M 0 -42 L 8 -8 L 0 -15 L -8 -8 Z", fill: "#5a3924", "fill-opacity": ".76" }), e.appendChild(n);
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
    const o = this.createCompass();
    e.appendChild(o), !(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1) && !this.hasRevealedEnchanted && (this.hasRevealedEnchanted = !0, t.animate([{ opacity: 0.28 }, { opacity: 1 }], { duration: 850, easing: "cubic-bezier(.2,.8,.2,1)" }), o.animate([{ opacity: 0 }, { opacity: 0.62 }], { duration: 1100, delay: 180, fill: "both", easing: "ease-out" }));
  }
};
be.styles = O`${nt.styles}:host([map-theme="enchanted_antique"]){--primary-color:#68472f;--primary-text-color:#4c321f;--secondary-text-color:#6f5239;--success-color:#6f6d3c;--error-color:#8b4639;--warning-color:#9a6731;--accent-color:#74513b;--card-background-color:#d9c294;--explorer-room-light-color:#e3a33d;--explorer-room-motion-color:#75573a;--explorer-room-media-color:#71503e;--explorer-room-opening-color:#936031;--explorer-room-panel-background:rgba(218,192,143,.96);--explorer-room-panel-text:#4b311f;--explorer-room-panel-border:rgba(82,50,30,.34);--explorer-room-panel-control:rgba(91,57,34,.12);--explorer-room-panel-row:rgba(255,239,199,.22)}:host([map-theme="enchanted_antique"]) .viewport{background:radial-gradient(circle at 22% 18%,rgba(255,240,195,.42),transparent 28%),radial-gradient(circle at 78% 76%,rgba(91,55,29,.16),transparent 42%),#c4a26e;box-shadow:inset 0 0 34px rgba(64,40,25,.22),inset 0 0 110px rgba(82,50,26,.12)}:host([map-theme="enchanted_antique"]) .viewport::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:2;background:radial-gradient(circle at 18% 24%,rgba(255,226,151,.13),transparent 22%),radial-gradient(circle at 76% 68%,rgba(255,210,112,.08),transparent 28%);mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .viewport::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:3;box-shadow:inset 0 0 44px rgba(60,38,24,.21)}:host([map-theme="enchanted_antique"]) .backdrop{fill:#caa970}:host([map-theme="enchanted_antique"]) .floorplan-source{filter:sepia(.92) saturate(.58) contrast(1.13) brightness(.92) drop-shadow(0 2px 1px rgba(58,35,20,.18)) drop-shadow(2px 3px 3px rgba(56,34,20,.10));opacity:.89;mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .rooms-scene{filter:drop-shadow(2px 3px 2px rgba(58,36,22,.16))}:host([map-theme="enchanted_antique"]) .room polygon{fill:#795132!important;fill-opacity:.085!important;stroke:#4f321f!important;stroke-opacity:.88!important;stroke-width:2.8px!important;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(2px 3px 1.5px rgba(67,41,24,.13));transition:fill-opacity .24s ease,stroke-width .24s ease,filter .24s ease}:host([map-theme="enchanted_antique"]) .room:hover polygon{fill-opacity:.14!important;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(3px 4px 2px rgba(67,41,24,.17))}:host([map-theme="enchanted_antique"]) .room.selected polygon{fill-opacity:.19!important;stroke-width:4px!important;filter:drop-shadow(0 1px .6px rgba(69,42,24,.38)) drop-shadow(4px 5px 3px rgba(67,41,24,.18))}:host([map-theme="enchanted_antique"]) .room-label,:host([map-theme="enchanted_antique"]) .presence-label,:host([map-theme="enchanted_antique"]) .route-status-scene text{fill:#4e321e!important;stroke:rgba(222,199,151,.82)!important;stroke-width:3.5px!important;font-family:Georgia,Cambria,"Times New Roman",serif!important;letter-spacing:.045em}:host([map-theme="enchanted_antique"]) .room-label{font-style:italic;font-weight:700;filter:drop-shadow(1px 1px .35px rgba(73,44,25,.18))}:host([map-theme="enchanted_antique"]) .presence-label{font-weight:700;font-variant:small-caps}:host([map-theme="enchanted_antique"]) .presence-border{stroke:#ead8aa!important;filter:drop-shadow(0 2px 3px rgba(54,34,21,.35))}:host([map-theme="enchanted_antique"]) .presence-avatar-background,:host([map-theme="enchanted_antique"]) .presence-marker{fill:#76543a!important}:host([map-theme="enchanted_antique"]) .footsteps-scene ellipse{fill:#4b301d!important;filter:drop-shadow(0 0 1.3px rgba(66,38,20,.38))}:host([map-theme="enchanted_antique"]) .route-status-scene line{filter:drop-shadow(0 .6px .6px rgba(65,39,23,.28))}:host([map-theme="enchanted_antique"]) .room-reactions-scene polygon{mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .room-reactions-scene [data-reaction-kind="light"],:host([map-theme="enchanted_antique"]) .room-reactions-scene .light{filter:drop-shadow(0 0 5px rgba(238,177,63,.72)) drop-shadow(0 0 14px rgba(238,158,42,.34));mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .antique-paper-scene,:host([map-theme="enchanted_antique"]) .antique-compass{pointer-events:none}@media(prefers-reduced-motion:reduce){:host([map-theme="enchanted_antique"]) .room polygon,:host([map-theme="enchanted_antique"]) .floorplan-source{transition:none!important}}`;
ht([
  A({ attribute: "map-theme", reflect: !0 })
], be.prototype, "theme", 2);
ht([
  A({ type: Number, attribute: "compass-rotation" })
], be.prototype, "compassRotation", 2);
ht([
  A({ type: Number, attribute: "compass-size" })
], be.prototype, "compassSize", 2);
ht([
  A({ type: Boolean, attribute: "compass-visible" })
], be.prototype, "compassVisible", 2);
be = ht([
  z("explorer-themed-canvas")
], be);
const Go = ["on"], Wo = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function Uo(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : [...Go];
}
function $r(e, t) {
  const i = e.visible !== !1, r = e.state_binding, o = Uo(r?.active_states);
  if (!i)
    return {
      zone: e,
      visible: !1,
      conditional: !!r?.entity?.trim(),
      active: !1,
      entity: r?.entity?.trim() || void 0,
      activeStates: o,
      reason: "hidden"
    };
  if (!r?.entity?.trim())
    return {
      zone: e,
      visible: !0,
      conditional: !1,
      active: !0,
      activeStates: o
    };
  const n = r.entity.trim(), s = t?.(n);
  if (!s)
    return {
      zone: e,
      visible: !0,
      conditional: !0,
      active: !1,
      entity: n,
      activeStates: o,
      reason: "missing_entity"
    };
  if (Wo.has(s))
    return {
      zone: e,
      visible: !0,
      conditional: !0,
      active: !1,
      entity: n,
      currentState: s,
      activeStates: o,
      reason: "entity_unavailable"
    };
  const a = o.includes(s);
  return {
    zone: e,
    visible: !0,
    conditional: !0,
    active: a,
    entity: n,
    currentState: s,
    activeStates: o,
    ...a ? {} : { reason: "state_blocked" }
  };
}
function Xo(e, t) {
  return e.map((i) => $r(i, t));
}
var Yo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, kr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Qo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Yo(t, i, o), o;
};
const he = "http://www.w3.org/2000/svg", Jo = {
  info: "var(--explorer-zone-info, #2d8f74)",
  warning: "var(--explorer-zone-warning, #f59e0b)",
  danger: "var(--explorer-zone-danger, #d64545)",
  cleaning: "var(--explorer-zone-cleaning, #3b82c4)",
  restricted: "var(--explorer-zone-restricted, #8b5a9e)"
}, en = {
  info: "i",
  warning: "!",
  danger: "!",
  cleaning: "✦",
  restricted: "×"
};
let Ke = class extends be {
  constructor() {
    super(...arguments), this.zones = [];
  }
  updated(e) {
    super.updated(e), (e.has("zones") || e.has("hass") || e.has("theme") || e.has("rooms")) && this.syncZonesOverlay();
  }
  zonePolygonPoints(e) {
    return e.map(([t, i]) => `${t * x},${i * x}`).join(" ");
  }
  zoneCenter(e) {
    return e.label ? { x: e.label.x * x, y: e.label.y * x } : e.points.length ? {
      x: e.points.reduce((t, i) => t + i[0], 0) / e.points.length * x,
      y: e.points.reduce((t, i) => t + i[1], 0) / e.points.length * x
    } : { x: x / 2, y: x / 2 };
  }
  zoneColor(e) {
    return e.color?.trim() || Jo[e.kind ?? "info"];
  }
  appendZoneTitle(e, t) {
    const i = document.createElementNS(he, "title"), r = t.zone, o = t.entity ? ` · ${t.entity}: ${t.currentState ?? "ukendt"} · aktiv: ${t.activeStates.join(", ")}` : " · altid aktiv";
    i.textContent = `${r.name ?? r.id}${o}`, e.appendChild(i);
  }
  appendZoneAccent(e, t, i, r) {
    if (i !== "cleaning" && i !== "restricted") return;
    const o = document.createElementNS(he, "polygon");
    o.setAttribute("points", this.zonePolygonPoints(t.points)), o.setAttribute("class", `zone-accent zone-accent-${i}`), o.setAttribute("fill", "none"), o.setAttribute("stroke", r), o.setAttribute("vector-effect", "non-scaling-stroke"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("pointer-events", "none"), i === "cleaning" ? (o.setAttribute("stroke-width", "8"), o.setAttribute("stroke-opacity", ".30"), o.setAttribute("stroke-dasharray", "3 15")) : (o.setAttribute("stroke-width", "9"), o.setAttribute("stroke-opacity", ".20"), o.setAttribute("stroke-dasharray", "2 11")), e.appendChild(o);
  }
  renderZone(e, t, i) {
    const r = t.zone;
    if (!t.active || r.points.length < 3) return;
    const o = r.kind ?? "info", n = this.zoneColor(r), s = document.createElementNS(he, "g");
    s.setAttribute("class", `dynamic-zone zone-${o} zone-${r.id}${i ? " reduced-motion" : ""}`), s.setAttribute("pointer-events", "none");
    const a = document.createElementNS(he, "polygon");
    a.setAttribute("class", "zone-shape"), a.setAttribute("points", this.zonePolygonPoints(r.points)), a.setAttribute("fill", n), a.setAttribute("fill-opacity", o === "danger" || o === "restricted" ? ".18" : ".13"), a.setAttribute("stroke", n), a.setAttribute("stroke-width", o === "danger" ? "5" : "4"), a.setAttribute("stroke-opacity", ".88"), a.setAttribute("stroke-linejoin", "round"), a.setAttribute("vector-effect", "non-scaling-stroke"), o === "warning" && a.setAttribute("stroke-dasharray", "16 9"), o === "restricted" && a.setAttribute("stroke-dasharray", "7 7"), o === "cleaning" && a.setAttribute("stroke-dasharray", "4 8"), s.appendChild(a), this.appendZoneAccent(s, r, o, n);
    const l = this.zoneCenter(r), c = document.createElementNS(he, "g");
    c.setAttribute("transform", `translate(${l.x} ${l.y})`), c.setAttribute("class", "zone-marker");
    const d = document.createElementNS(he, "circle");
    d.setAttribute("class", "zone-marker-bg"), d.setAttribute("r", "17"), d.setAttribute("fill", "var(--card-background-color, #ffffff)"), d.setAttribute("fill-opacity", ".90"), d.setAttribute("stroke", n), d.setAttribute("stroke-width", "3"), d.setAttribute("vector-effect", "non-scaling-stroke"), c.appendChild(d);
    const p = document.createElementNS(he, "text");
    if (p.setAttribute("text-anchor", "middle"), p.setAttribute("dominant-baseline", "central"), p.setAttribute("fill", n), p.setAttribute("font-size", "18"), p.setAttribute("font-weight", "900"), p.setAttribute("font-family", "system-ui, sans-serif"), p.textContent = en[o], c.appendChild(p), s.appendChild(c), r.name) {
      const u = document.createElementNS(he, "text");
      u.setAttribute("x", String(l.x)), u.setAttribute("y", String(l.y + 36)), u.setAttribute("text-anchor", "middle"), u.setAttribute("class", "zone-label"), u.setAttribute("fill", n), u.setAttribute("font-size", "22"), u.setAttribute("font-weight", "800"), u.setAttribute("font-family", "system-ui, sans-serif"), u.setAttribute("paint-order", "stroke"), u.setAttribute("stroke", "var(--card-background-color, #ffffff)"), u.setAttribute("stroke-width", "5"), u.setAttribute("stroke-linejoin", "round"), u.textContent = r.name, s.appendChild(u);
    }
    this.appendZoneTitle(s, t), e.appendChild(s);
  }
  syncZonesOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e || (e.querySelector(":scope > g.zones-scene")?.remove(), !this.zones.length)) return;
    const i = Xo(this.zones, (c) => this.hass?.states[c]?.state).filter((c) => c.active && c.zone.points.length >= 3);
    if (!i.length) return;
    const r = document.createElementNS(he, "g");
    r.setAttribute("class", "zones-scene"), r.setAttribute("aria-label", "Dynamiske zoner"), r.setAttribute("pointer-events", "none");
    const o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    i.forEach((c) => this.renderZone(r, c, o));
    const n = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.route-status-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, n ?? s ?? a ?? l ?? null);
  }
};
Ke.styles = O`
    ${be.styles}

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
kr([
  A({ attribute: !1 })
], Ke.prototype, "zones", 2);
Ke = kr([
  z("explorer-zones-canvas")
], Ke);
var tn = Object.defineProperty, rn = Object.getOwnPropertyDescriptor, fi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? rn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && tn(t, i, o), o;
};
const on = "http://www.w3.org/2000/svg", nn = 4200, sn = 900, an = 54, ln = { person: "Person", pet: "Kæledyr", robot: "Robot", vehicle: "Køretøj", object: "Objekt" }, Ki = { person: [202, 344, 42, 158, 274, 18], pet: [28, 112, 326, 52, 178, 286], robot: [188, 218, 264, 164, 204, 238], vehicle: [12, 210, 38, 330, 186, 262], object: [272, 44, 154, 320, 196, 22] }, Ht = [58, 64, 54, 61, 56, 66], cn = [8, 6, 10, 7, 9, 5], dn = [7, 4, 10, 6, 8, 3];
function Zi(e) {
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function gt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let Ne = class extends Ke {
  constructor() {
    super(...arguments), this.movementHistory = {}, this.petRobotTrails = {}, this.polishPreviousPositions = /* @__PURE__ */ new Map(), this.polishPreviousRooms = /* @__PURE__ */ new Map(), this.movementHistorySamples = /* @__PURE__ */ new Map();
  }
  updated(e) {
    super.updated(e), (e.has("presences") || e.has("theme")) && this.polishSyncPresenceVisuals(), e.has("presences") && this.polishSyncTrails(), (e.has("presences") || e.has("movementHistory") || e.has("petRobotTrails") || e.has("rooms") || e.has("theme")) && this.polishSyncMovementHistory();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.movementHistoryTimer !== void 0 && window.clearTimeout(this.movementHistoryTimer);
  }
  polishPresenceColor(e) {
    const t = e.color?.trim();
    if (t) return t;
    const i = e.type ?? "person", r = Ki[i][Zi(e.id) % Ki[i].length];
    return this.theme === "enchanted_antique" ? `hsl(${r} 34% 38%)` : `hsl(${r} 62% 47%)`;
  }
  polishTrailColor(e) {
    return e.trail_color?.trim() || this.polishPresenceColor(e);
  }
  polishTrailDuration(e) {
    const t = e.trail_duration;
    return Number.isFinite(t) ? Math.round(gt(t, 1, 60) * 1e3) : nn;
  }
  polishBasePosition(e) {
    return { x: (e.x ?? 0.5) * x, y: (e.y ?? 0.5) * x };
  }
  polishPersonTrailVariant(e) {
    return Zi(e.id) % Ht.length;
  }
  polishOffsets(e) {
    const t = /* @__PURE__ */ new Map();
    e.forEach((o) => t.set(o.id, { x: 0, y: 0, groupSize: 1 }));
    const i = new Set(e.map((o) => o.id)), r = new Map(e.map((o) => [o.id, o]));
    for (; i.size; ) {
      const o = i.values().next().value, n = r.get(o);
      if (i.delete(o), !n) continue;
      const s = [n], a = [n];
      for (; a.length; ) {
        const d = a.shift(), p = this.polishBasePosition(d);
        for (const u of [...i]) {
          const g = r.get(u);
          if (!g) continue;
          const b = this.polishBasePosition(g);
          Math.hypot(p.x - b.x, p.y - b.y) <= an && (i.delete(u), s.push(g), a.push(g));
        }
      }
      if (s.length < 2) continue;
      const l = [...s].sort((d, p) => d.id.localeCompare(p.id)), c = Math.min(52, 24 + l.length * 4);
      l.forEach((d, p) => {
        const u = this.polishBasePosition(d), g = l.length === 2 ? p === 0 ? Math.PI : 0 : -Math.PI / 2 + Math.PI * 2 * p / l.length, b = gt(u.x + Math.cos(g) * c, 38, x - 38), m = gt(u.y + Math.sin(g) * c, 38, x - 64);
        t.set(d.id, { x: b - u.x, y: m - u.y, groupSize: l.length });
      });
    }
    return t;
  }
  polishCreateSvg(e) {
    return document.createElementNS(on, e);
  }
  polishSetAttributes(e, t) {
    Object.entries(t).forEach(([i, r]) => e.setAttribute(i, r));
  }
  polishAppendTypeBadge(e, t, i) {
    if (e.querySelector(":scope > g.presence-type-badge")) return;
    const r = t.type ?? "person", o = this.polishCreateSvg("g");
    o.setAttribute("class", `presence-type-badge badge-${r}`), o.setAttribute("transform", "translate(21 -21)"), o.setAttribute("pointer-events", "none");
    const n = this.polishCreateSvg("circle");
    if (this.polishSetAttributes(n, { r: "9.5", fill: "var(--card-background-color, #ffffff)", "fill-opacity": ".94", stroke: i, "stroke-width": "2.5", "vector-effect": "non-scaling-stroke" }), o.appendChild(n), r === "person") {
      const s = this.polishCreateSvg("circle");
      this.polishSetAttributes(s, { cx: "0", cy: "-2.8", r: "2.5", fill: i });
      const a = this.polishCreateSvg("path");
      this.polishSetAttributes(a, { d: "M -4 5 Q -3 0 0 0 Q 3 0 4 5 Z", fill: i }), o.append(s, a);
    } else if (r === "pet") {
      const s = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(s, { cx: "0", cy: "2", rx: "3.4", ry: "3", fill: i }), o.appendChild(s), [[-4, -2], [-1.5, -4.6], [1.5, -4.6], [4, -2]].forEach(([a, l]) => {
        const c = this.polishCreateSvg("circle");
        this.polishSetAttributes(c, { cx: String(a), cy: String(l), r: "1.5", fill: i }), o.appendChild(c);
      });
    } else if (r === "robot") {
      const s = this.polishCreateSvg("rect");
      this.polishSetAttributes(s, { x: "-5", y: "-4", width: "10", height: "8", rx: "2", fill: i }), o.appendChild(s), [-2.2, 2.2].forEach((a) => {
        const l = this.polishCreateSvg("circle");
        this.polishSetAttributes(l, { cx: String(a), cy: "-1", r: "1", fill: "var(--card-background-color, #ffffff)" }), o.appendChild(l);
      });
    } else if (r === "vehicle") {
      const s = this.polishCreateSvg("rect");
      this.polishSetAttributes(s, { x: "-5.5", y: "-2.5", width: "11", height: "5", rx: "1.5", fill: i }), o.appendChild(s);
    } else {
      const s = this.polishCreateSvg("path");
      this.polishSetAttributes(s, { d: "M 0 -6 L 5 0 L 0 6 L -5 0 Z", fill: i }), o.appendChild(s);
    }
    e.appendChild(o);
  }
  polishSyncPresenceVisuals() {
    const e = this.presences.filter((r) => r.visible !== !1), t = Array.from(this.renderRoot.querySelectorAll("g.presence")), i = this.polishOffsets(e);
    e.forEach((r, o) => {
      const n = t[o];
      if (!n) return;
      const s = r.type ?? "person", a = this.polishPresenceColor(r), l = i.get(r.id) ?? { x: 0, y: 0, groupSize: 1 };
      n.setAttribute("data-presence-id", r.id), n.setAttribute("data-presence-type", s), s === "person" && n.setAttribute("data-trail-style", String(this.polishPersonTrailVariant(r) + 1)), n.classList.add("presence-polished", `presence-${s}`);
      let c = n.querySelector(":scope > g.presence-visual-offset");
      c || (c = this.polishCreateSvg("g"), c.setAttribute("class", "presence-visual-offset"), Array.from(n.children).filter((g) => g.localName.toLowerCase() !== "animatetransform").forEach((g) => c?.appendChild(g)), n.insertBefore(c, n.firstChild)), c.setAttribute("transform", `translate(${l.x} ${l.y})`), c.querySelector(".presence-marker")?.setAttribute("fill", a), c.querySelector(".presence-avatar-background")?.setAttribute("fill", a), c.querySelector(".presence-border")?.setAttribute("stroke", a), this.polishAppendTypeBadge(c, r, a), n.querySelector(":scope > title")?.remove();
      const d = this.polishCreateSvg("title"), p = l.groupSize > 1 ? ` · ${l.groupSize} markører overlapper` : "", u = s === "person" ? ` · fodspor ${this.polishPersonTrailVariant(r) + 1}` : "";
      d.textContent = `${r.name ?? r.id} · ${ln[s]}${u}${p}`, n.appendChild(d);
    });
  }
  polishRouteConfig() {
    return { type: "custom:ha-explorer-card", rooms: this.rooms, route_nodes: this.routeNodes, route_graph_edges: this.routeGraphEdges, routes: this.routes };
  }
  polishMovementPath(e, t, i, r) {
    if (!i || !r || i === r) return [e, t];
    const o = mi(this.polishRouteConfig(), i, r, (n) => this.hass?.states[n]?.state);
    return o ? [e, ...o.hops.slice(1, -1).map((n) => ({ x: n.point[0] * x, y: n.point[1] * x })), t] : [e, t];
  }
  polishEnsureTrailLayer() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    let t = e.querySelector(":scope > g.presence-trails-scene");
    return t || (t = this.polishCreateSvg("g"), t.setAttribute("class", "presence-trails-scene"), t.setAttribute("aria-label", "Person- og objektspor"), t.setAttribute("pointer-events", "none"), e.insertBefore(t, e.querySelector(":scope > g.presences-scene") ?? null), t);
  }
  polishTrailSpacing(e, t = 0) {
    return e === "person" ? Ht[t] ?? Ht[0] : e === "pet" ? 46 : e === "robot" ? 42 : e === "vehicle" ? 54 : e === "object" ? 62 : 58;
  }
  polishAppendPersonTrailShape(e, t, i) {
    const r = (n, s, a, l) => {
      const c = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(c, { cx: String(n), cy: String(s), rx: String(a), ry: String(l), fill: t }), e.appendChild(c);
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
      const n = this.polishCreateSvg("rect");
      this.polishSetAttributes(n, { x: "-5", y: "3", width: "10", height: "10", rx: "2", fill: t }), e.appendChild(n);
      return;
    }
    if (i === 3) {
      const n = this.polishCreateSvg("path");
      this.polishSetAttributes(n, { d: "M 0 -16 C 6 -10 7 -2 5 5 C 4 10 2 12 0 12 C -3 12 -5 9 -5 4 C -6 -3 -5 -10 0 -16 Z", fill: t }), e.appendChild(n), r(-0.5, 9, 3.3, 4.2);
      return;
    }
    if (i === 4) {
      r(0, -9, 5.5, 6.5);
      const n = this.polishCreateSvg("rect");
      this.polishSetAttributes(n, { x: "-4", y: "-2", width: "8", height: "7", rx: "3", fill: t }), e.appendChild(n), r(0, 9, 3.8, 4.5);
      return;
    }
    const o = this.polishCreateSvg("path");
    this.polishSetAttributes(o, { d: "M -6 -10 C -2 -15 5 -14 7 -8 C 9 -2 6 5 3 9 C 0 13 -4 12 -5 7 C -6 2 -8 -5 -6 -10 Z", fill: t }), e.appendChild(o), r(-1, 9, 3.2, 4.1);
  }
  polishAppendTrailShape(e, t, i, r = 0) {
    if (t === "person") {
      this.polishAppendPersonTrailShape(e, i, r);
      return;
    }
    if (t === "pet") {
      const n = this.polishCreateSvg("path");
      this.polishSetAttributes(n, { d: "M -5 5 C -7 0 -4 -4 0 -4 C 4 -4 7 0 5 5 C 3 9 -3 9 -5 5 Z", fill: i }), e.appendChild(n), [[-6, -5], [-2.2, -8.5], [2.2, -8.5], [6, -5]].forEach(([s, a]) => {
        const l = this.polishCreateSvg("ellipse");
        this.polishSetAttributes(l, { cx: String(s), cy: String(a), rx: "2.3", ry: "3.2", fill: i }), e.appendChild(l);
      });
      return;
    }
    if (t === "robot") {
      [-7, 3].forEach((n) => {
        const s = this.polishCreateSvg("rect");
        this.polishSetAttributes(s, { x: String(n), y: "-8", width: "4", height: "16", rx: "1.4", fill: i }), e.appendChild(s);
      });
      return;
    }
    if (t === "vehicle") {
      [-7, 4].forEach((n) => {
        const s = this.polishCreateSvg("rect");
        this.polishSetAttributes(s, { x: String(n), y: "-11", width: "3", height: "22", rx: "1", fill: i }), e.appendChild(s);
      });
      return;
    }
    const o = this.polishCreateSvg("path");
    this.polishSetAttributes(o, { d: "M 0 -7 L 6 0 L 0 7 L -6 0 Z", fill: i }), e.appendChild(o);
  }
  polishCreateTrail(e, t) {
    if (t.trail_visible === !1) return;
    const i = this.polishEnsureTrailLayer();
    if (!i || e.length < 2) return;
    const r = t.type ?? "person", o = r === "person" ? this.polishPersonTrailVariant(t) : 0, n = this.polishTrailColor(t), s = this.polishTrailDuration(t), a = e.slice(1).map((p, u) => {
      const g = e[u];
      return { start: g, end: p, length: Math.hypot(p.x - g.x, p.y - g.y) };
    }), l = a.reduce((p, u) => p + u.length, 0), c = this.polishTrailSpacing(r, o);
    if (l < c) return;
    const d = Math.min(24, Math.max(3, Math.floor(l / c)));
    for (let p = 0; p < d; p += 1) {
      const u = (p + 1) / (d + 1), g = l * u;
      let b = 0, m = a[a.length - 1];
      for (const Z of a) {
        if (b + Z.length >= g) {
          m = Z;
          break;
        }
        b += Z.length;
      }
      const y = m.length > 0 ? (g - b) / m.length : 0, _ = m.end.x - m.start.x, $ = m.end.y - m.start.y, w = p % 2 === 0 ? -1 : 1, S = r === "person" ? cn[o] ?? 8 : r === "pet" ? 6 : 0, C = r === "person" ? dn[o] ?? 7 : S ? 7 : 0, k = m.length > 0 ? -$ / m.length : 0, E = m.length > 0 ? _ / m.length : 0, M = m.start.x + _ * y + k * S * w, T = m.start.y + $ * y + E * S * w, Y = Math.atan2($, _) * 180 / Math.PI + 90, U = Math.round(u * sn), N = this.polishCreateSvg("g");
      N.setAttribute("class", `trail-mark trail-${r}${r === "person" ? ` trail-person-v${o + 1}` : ""}`), N.setAttribute("data-presence-id", t.id), r === "person" && N.setAttribute("data-trail-style", String(o + 1)), N.setAttribute("transform", `translate(${M} ${T}) rotate(${Y + (S ? w * C : 0)})`), N.setAttribute("opacity", "0"), this.polishAppendTrailShape(N, r, n, o);
      const I = this.polishCreateSvg("animate");
      this.polishSetAttributes(I, { attributeName: "opacity", values: "0;0.78;0.54;0", keyTimes: "0;0.08;0.58;1", begin: "indefinite", dur: `${s}ms`, fill: "freeze" }), N.appendChild(I), i.appendChild(N), window.setTimeout(() => {
        N.isConnected && I.beginElement();
      }, U), window.setTimeout(() => N.remove(), U + s + 120);
    }
  }
  polishSyncTrails() {
    const e = this.presences.filter((r) => r.visible !== !1), t = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, i = /* @__PURE__ */ new Set();
    e.forEach((r) => {
      const o = this.polishBasePosition(r), n = this.polishPreviousPositions.get(r.id), s = this.polishPreviousRooms.get(r.id), a = r.room_id;
      i.add(r.id), !t && n && (Math.abs(n.x - o.x) > 0.01 || Math.abs(n.y - o.y) > 0.01) && this.polishCreateTrail(this.polishMovementPath(n, o, s, a), r), this.polishPreviousPositions.set(r.id, o), this.polishPreviousRooms.set(r.id, a);
    });
    for (const r of this.polishPreviousPositions.keys()) i.has(r) || (this.polishPreviousPositions.delete(r), this.polishPreviousRooms.delete(r));
  }
  polishHistoryEnabled() {
    return this.movementHistory.enabled === !0 || this.petRobotTrails.enabled === !0;
  }
  polishHistoryDurationMs(e) {
    const t = e?.type ?? "person", i = t === "person" ? this.movementHistory.duration_minutes ?? 3 : this.petRobotTrails.duration_minutes ?? 3;
    return gt(i, 1, 5) * 6e4;
  }
  polishTrackedHistoryPresences() {
    return this.presences.filter((e) => {
      if (e.visible === !1 || e.trail_visible === !1) return !1;
      const t = e.type ?? "person";
      return t === "person" ? this.movementHistory.enabled === !0 : t === "pet" || t === "robot" ? this.petRobotTrails.enabled === !0 : !1;
    });
  }
  polishRemoveHistoryLayers() {
    const e = this.renderRoot.querySelector("g.scene");
    e?.querySelector(":scope > g.movement-history-rooms-scene")?.remove(), e?.querySelector(":scope > g.movement-history-scene")?.remove();
  }
  polishScheduleHistoryRefresh() {
    this.movementHistoryTimer !== void 0 && window.clearTimeout(this.movementHistoryTimer), this.polishHistoryEnabled() && (this.movementHistoryTimer = window.setTimeout(() => {
      this.movementHistoryTimer = void 0, this.polishSyncMovementHistory();
    }, 5e3));
  }
  polishSyncMovementHistory() {
    if (!this.polishHistoryEnabled()) {
      this.movementHistorySamples.clear(), this.polishRemoveHistoryLayers(), this.polishScheduleHistoryRefresh();
      return;
    }
    const e = Date.now(), t = this.polishTrackedHistoryPresences(), i = new Set(t.map((o) => o.id)), r = new Map(t.map((o) => [o.id, o]));
    for (const [o, n] of this.movementHistorySamples) {
      const s = r.get(o);
      if (!s) {
        this.movementHistorySamples.delete(o);
        continue;
      }
      const a = e - this.polishHistoryDurationMs(s), l = n.filter((c) => c.at >= a);
      l.length ? this.movementHistorySamples.set(o, l) : this.movementHistorySamples.delete(o);
    }
    for (const o of t) {
      const n = this.polishBasePosition(o), s = this.movementHistorySamples.get(o.id) ?? [], a = s[s.length - 1];
      (!a || Math.hypot(a.x - n.x, a.y - n.y) > 10 || a.roomId !== o.room_id) && (s.push({ ...n, roomId: o.room_id, at: e }), this.movementHistorySamples.set(o.id, s.slice(-120)));
    }
    for (const o of [...this.movementHistorySamples.keys()]) i.has(o) || this.movementHistorySamples.delete(o);
    this.polishRenderMovementHistory(t, e), this.polishScheduleHistoryRefresh();
  }
  polishRenderMovementHistory(e, t) {
    const i = this.renderRoot.querySelector("g.scene");
    if (!i) return;
    this.polishRemoveHistoryLayers();
    const r = this.polishCreateSvg("g"), o = this.polishCreateSvg("g");
    r.setAttribute("class", "movement-history-rooms-scene"), o.setAttribute("class", "movement-history-scene"), r.setAttribute("pointer-events", "none"), o.setAttribute("pointer-events", "none");
    const n = new Map(e.map((a) => [a.id, a]));
    for (const [a, l] of this.movementHistorySamples) {
      const c = n.get(a);
      if (!c) continue;
      const d = c.type ?? "person", p = this.polishHistoryDurationMs(c), u = this.polishTrailColor(c), g = d === "person" ? this.polishPersonTrailVariant(c) : 0;
      if (d === "person" && this.movementHistory.show_rooms !== !1) {
        const b = /* @__PURE__ */ new Map();
        for (const m of l) m.roomId && b.set(m.roomId, m);
        for (const [m, y] of b) {
          const _ = this.rooms.find((S) => S.id === m || S.area_id === m);
          if (!_ || _.points.length < 3) continue;
          const $ = Math.max(0, 0.16 * (1 - (t - y.at) / p)), w = this.polishCreateSvg("polygon");
          this.polishSetAttributes(w, { points: _.points.map(([S, C]) => `${S * x},${C * x}`).join(" "), fill: u, "fill-opacity": String($), stroke: u, "stroke-opacity": String($ * 0.9), "stroke-width": "2", "vector-effect": "non-scaling-stroke", "data-presence-id": a }), r.appendChild(w);
        }
      }
      for (let b = 1; b < l.length; b += 1) {
        const m = l[b - 1], y = l[b], _ = this.polishMovementPath(m, y, m.roomId, y.roomId), $ = Math.max(0, 0.72 * (1 - (t - y.at) / p));
        for (let w = 1; w < _.length; w += 1) {
          const S = _[w - 1], C = _[w], k = C.x - S.x, E = C.y - S.y, M = Math.hypot(k, E), T = Math.atan2(E, k) * 180 / Math.PI;
          if (d === "robot") {
            if (this.petRobotTrails.show_robot_route === !1) continue;
            const I = this.polishCreateSvg("line");
            if (this.polishSetAttributes(I, { x1: String(S.x), y1: String(S.y), x2: String(C.x), y2: String(C.y), stroke: u, "stroke-width": "7", "stroke-linecap": "round", "stroke-opacity": String($), "vector-effect": "non-scaling-stroke", "data-presence-id": a }), I.setAttribute("class", "robot-history-route"), o.appendChild(I), this.petRobotTrails.robot_direction_arrows !== !1 && M > 45) {
              const Z = this.polishCreateSvg("path"), ve = (S.x + C.x) / 2, Te = (S.y + C.y) / 2;
              this.polishSetAttributes(Z, { d: "M -10 -7 L 10 0 L -10 7 Z", fill: u, "fill-opacity": String(Math.min(1, $ + 0.12)), transform: `translate(${ve} ${Te}) rotate(${T})`, "data-presence-id": a }), Z.setAttribute("class", "robot-history-arrow"), o.appendChild(Z);
            }
            continue;
          }
          if (d === "pet" && this.petRobotTrails.show_pet_paws === !1) continue;
          const Y = d === "pet" ? 52 : 70, U = Math.min(12, Math.max(1, Math.floor(M / Y))), N = T + 90;
          for (let I = 1; I <= U; I += 1) {
            const Z = I / (U + 1), ve = I % 2 === 0 ? -1 : 1, Te = M > 0 ? -E / M : 0, Ae = M > 0 ? k / M : 0, Xe = d === "pet" ? 7 : 6, X = this.polishCreateSvg("g");
            X.setAttribute("class", `movement-history-mark trail-${d}${d === "person" ? ` trail-person-v${g + 1}` : ""}`), X.setAttribute("data-presence-id", a), X.setAttribute("transform", `translate(${S.x + k * Z + Te * Xe * ve} ${S.y + E * Z + Ae * Xe * ve}) rotate(${N + ve * 4}) scale(${d === "pet" ? 0.72 : 0.62})`), X.setAttribute("opacity", String($)), this.polishAppendTrailShape(X, d, u, g), o.appendChild(X);
          }
        }
      }
    }
    const s = i.querySelector(":scope > g.presence-trails-scene") ?? i.querySelector(":scope > g.presences-scene");
    i.insertBefore(r, s ?? null), i.insertBefore(o, s ?? null);
  }
};
Ne.styles = O`${Ke.styles}.footsteps-scene{display:none}.presence-visual-offset{transition:transform 220ms ease}.presence-type-badge{filter:drop-shadow(0 1px 2px rgba(0,0,0,.22))}.presence-trails-scene .trail-mark,.movement-history-scene .movement-history-mark{filter:drop-shadow(0 0 1.2px rgba(0,0,0,.20))}.movement-history-scene .trail-pet{filter:drop-shadow(0 0 2px rgba(0,0,0,.24))}.movement-history-scene .robot-history-route{fill:none;filter:drop-shadow(0 0 2px rgba(0,0,0,.24))}.movement-history-scene .robot-history-arrow{filter:drop-shadow(0 1px 1px rgba(0,0,0,.28))}.movement-history-rooms-scene polygon{mix-blend-mode:multiply}.presence-trails-scene .trail-person-v2{opacity:.96}.presence-trails-scene .trail-person-v3{filter:drop-shadow(0 0 1.6px rgba(0,0,0,.24))}.presence-trails-scene .trail-person-v5{filter:drop-shadow(0 0 .8px rgba(0,0,0,.18))}:host([map-theme="enchanted_antique"]) .presence-type-badge{filter:sepia(.35) drop-shadow(0 1px 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-trails-scene .trail-mark,:host([map-theme="enchanted_antique"]) .movement-history-scene .movement-history-mark,:host([map-theme="enchanted_antique"]) .movement-history-scene .robot-history-route,:host([map-theme="enchanted_antique"]) .movement-history-scene .robot-history-arrow{mix-blend-mode:multiply;filter:sepia(.28) saturate(.78) drop-shadow(0 0 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-border{stroke-width:4.5px!important}@media(prefers-reduced-motion:reduce){.presence-visual-offset{transition:none}}`;
fi([
  A({ attribute: !1 })
], Ne.prototype, "movementHistory", 2);
fi([
  A({ attribute: !1 })
], Ne.prototype, "petRobotTrails", 2);
Ne = fi([
  z("explorer-presence-polish-canvas")
], Ne);
var pn = Object.getOwnPropertyDescriptor, hn = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? pn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const mt = "http://www.w3.org/2000/svg", Gi = 3e4, un = 900;
let st = class extends Ne {
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
    let o = !1;
    for (let n = 0, s = t.length - 1; n < t.length; s = n++) {
      const [a, l] = t[n], [c, d] = t[s];
      l > r != d > r && i < (c - a) * (r - l) / (d - l || Number.EPSILON) + a && (o = !o);
    }
    return o;
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
      const o = this.magicRoomForPresence(r);
      o && t.set(o.id, (t.get(o.id) ?? 0) + 1);
    });
    const i = new Set(t.keys());
    for (const r of this.magicPreviousOccupiedRooms)
      i.has(r) || this.magicAfterglowStartedAt.set(r, e);
    for (const r of i) this.magicAfterglowStartedAt.delete(r);
    return this.magicPreviousOccupiedRooms.clear(), i.forEach((r) => this.magicPreviousOccupiedRooms.add(r)), this.rooms.map((r) => {
      const o = t.get(r.id) ?? 0, n = o > 0, s = this.magicAfterglowStartedAt.get(r.id), a = s === void 0 ? 1 / 0 : e - s, l = !n && a >= 0 && a < Gi, c = n ? Math.min(1, 0.72 + Math.max(0, o - 1) * 0.12) : l ? Math.max(0, 1 - a / Gi) : 0;
      return !l && s !== void 0 && this.magicAfterglowStartedAt.delete(r.id), { room: r, active: n, afterglow: l, intensity: c };
    }).filter((r) => r.active || r.afterglow);
  }
  magicPolygonPoints(e) {
    return e.points.map(([t, i]) => `${t * x},${i * x}`).join(" ");
  }
  magicScheduleRefresh(e) {
    this.magicRefreshTimer !== void 0 && window.clearTimeout(this.magicRefreshTimer), e.some((t) => t.afterglow) && (this.magicRefreshTimer = window.setTimeout(() => {
      this.magicRefreshTimer = void 0, this.magicSyncRoomAtmosphere();
    }, un));
  }
  magicAppendRoom(e, t) {
    const { room: i, active: r, intensity: o } = t;
    if (i.points.length < 3) return;
    const n = this.magicPolygonPoints(i), s = document.createElementNS(mt, "g");
    s.setAttribute("class", `room-magic ${r ? "active" : "afterglow"}`), s.setAttribute("data-room-id", i.id);
    const a = document.createElementNS(mt, "polygon");
    a.setAttribute("class", "room-magic-aura"), a.setAttribute("points", n), a.setAttribute("fill", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))"), a.setAttribute("fill-opacity", String(r ? 0.028 + o * 0.026 : 8e-3 + o * 0.028)), a.setAttribute("stroke", "none"), s.appendChild(a);
    const l = document.createElementNS(mt, "polygon");
    l.setAttribute("class", "room-magic-edge"), l.setAttribute("points", n), l.setAttribute("fill", "none"), l.setAttribute("stroke", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))"), l.setAttribute("stroke-opacity", String(r ? 0.08 + o * 0.055 : 0.02 + o * 0.07)), l.setAttribute("stroke-width", r ? "4" : "3"), l.setAttribute("stroke-linejoin", "round"), l.setAttribute("vector-effect", "non-scaling-stroke"), s.appendChild(l), e.appendChild(s);
  }
  magicSyncRoomAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-magic-scene")?.remove();
    const t = this.magicActivities(Date.now());
    if (this.magicScheduleRefresh(t), !t.length) return;
    const i = document.createElementNS(mt, "g");
    i.setAttribute("class", "room-magic-scene"), i.setAttribute("aria-label", "Magisk rumaktivitet"), i.setAttribute("pointer-events", "none"), t.forEach((c) => this.magicAppendRoom(i, c));
    const r = e.querySelector(":scope > g.room-temperature-atmosphere-scene"), o = e.querySelector(":scope > g.presence-room-activity-scene"), n = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.presence-trails-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(
      i,
      r ?? o ?? n ?? s ?? a ?? l ?? null
    );
  }
};
st.styles = O`
    ${Ne.styles}

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
st = hn([
  z("explorer-room-magic-canvas")
], st);
var gn = Object.defineProperty, mn = Object.getOwnPropertyDescriptor, _r = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? mn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && gn(t, i, o), o;
};
const Q = "http://www.w3.org/2000/svg", fn = ["on", "open", "opened", "true"], Ft = 600 * 1e3, Vt = 1800 * 1e3, Kt = 3600 * 1e3, Wi = 60 * 1e3, ft = (e) => e * Math.PI / 180;
let Ze = class extends st {
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
    return i ? (t.open_states ?? fn).map((r) => r.toLowerCase()).includes(i) : !1;
  }
  openingOpenSince(e, t) {
    if (!t || !e.state_binding) {
      this.openingFirstSeenOpenAt.delete(e.id);
      return;
    }
    const i = this.hass?.states[e.state_binding.entity], r = i?.last_changed ? Date.parse(i.last_changed) : NaN;
    if (Number.isFinite(r))
      return this.openingFirstSeenOpenAt.set(e.id, r), r;
    const o = this.openingFirstSeenOpenAt.get(e.id);
    if (o !== void 0) return o;
    const n = Date.now();
    return this.openingFirstSeenOpenAt.set(e.id, n), n;
  }
  openingAgeInfo(e, t, i = Date.now()) {
    const r = this.openingOpenSince(e, t);
    if (r === void 0) return;
    const o = Math.max(0, i - r), n = Math.floor(o / 6e4), s = o >= Kt ? "alert" : o >= Vt ? "warning" : o >= Ft ? "watch" : "fresh", a = Math.floor(n / 60), l = n % 60, c = a > 0 ? `åben i ${a} t${l ? ` ${l} min` : ""}` : `åben i ${n} min`, d = s === "fresh" ? "" : a > 0 ? l ? `${a}t ${l}m` : `${a}t` : `${n}m`;
    return { minutes: n, level: s, label: d, description: c };
  }
  scheduleOpeningAgeRefresh(e) {
    this.openingAgeTimer !== void 0 && window.clearTimeout(this.openingAgeTimer);
    let t = 1 / 0;
    for (const i of this.openings.filter((r) => r.visible !== !1)) {
      const r = this.isOpen(i), o = this.openingOpenSince(i, r);
      if (o === void 0) continue;
      const n = Math.max(0, e - o), s = n < Ft ? Ft : n < Vt ? Vt : n < Kt ? Kt : void 0, a = s === void 0 ? Wi : Math.max(1e3, s - n + 50);
      t = Math.min(t, Wi, a);
    }
    Number.isFinite(t) && (this.openingAgeTimer = window.setTimeout(() => {
      this.openingAgeTimer = void 0, this.syncOpenings();
    }, Math.max(1e3, t)));
  }
  syncOpenings() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.dynamic-openings-scene")?.remove();
    const t = this.openings.filter((n) => n.visible !== !1);
    if (!t.length) {
      this.scheduleOpeningAgeRefresh(Date.now());
      return;
    }
    const i = document.createElementNS(Q, "g");
    i.setAttribute("class", "dynamic-openings-scene"), i.setAttribute("aria-label", "Dynamiske døre og vinduer"), i.setAttribute("pointer-events", "none");
    const r = Date.now();
    for (const n of t)
      n.kind === "window" ? this.drawWindow(i, n, r) : this.drawDoor(i, n, r);
    const o = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, o ?? null), this.scheduleOpeningAgeRefresh(r);
  }
  line(e, t, i, r, o, n) {
    const s = document.createElementNS(Q, "line");
    return s.setAttribute("x1", String(t)), s.setAttribute("y1", String(i)), s.setAttribute("x2", String(r)), s.setAttribute("y2", String(o)), s.setAttribute("class", n), e.appendChild(s), s;
  }
  appendAgeIndicator(e, t, i, r) {
    if (!r || r.level === "fresh") return;
    const o = document.createElementNS(Q, "g");
    o.setAttribute("class", `opening-age-indicator level-${r.level}`), o.setAttribute("transform", `translate(${t} ${i})`);
    const n = document.createElementNS(Q, "circle");
    n.setAttribute("r", r.level === "alert" ? "12" : "10"), n.setAttribute("class", "opening-age-ring"), o.appendChild(n);
    const s = Math.max(28, r.label.length * 7 + 10), a = document.createElementNS(Q, "rect");
    a.setAttribute("x", "11"), a.setAttribute("y", "-18"), a.setAttribute("width", String(s)), a.setAttribute("height", "17"), a.setAttribute("rx", "8.5"), a.setAttribute("class", "opening-age-badge"), o.appendChild(a);
    const l = document.createElementNS(Q, "text");
    l.setAttribute("x", String(11 + s / 2)), l.setAttribute("y", "-9.3"), l.setAttribute("text-anchor", "middle"), l.setAttribute("dominant-baseline", "central"), l.setAttribute("class", "opening-age-label"), l.textContent = r.label, o.appendChild(l), e.appendChild(o);
  }
  drawDoor(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(28, (t.length ?? 0.055) * x), s = t.angle ?? 0, a = t.open_angle ?? 82, l = t.hinge ?? "start", c = t.swing ?? "left", d = t.point[0] * x, p = t.point[1] * x, u = n / 2, g = ft(s), b = Math.cos(g), m = Math.sin(g), y = -m, _ = b, $ = { x: d - b * u, y: p - m * u }, w = { x: d + b * u, y: p + m * u }, S = l === "start" ? $ : w, C = l === "start" ? w : $, k = s + (l === "start" ? 0 : 180), E = (c === "left" ? -1 : 1) * (l === "start" ? 1 : -1), M = k + (r ? E * a : 0), T = ft(M), Y = { x: S.x + Math.cos(T) * n, y: S.y + Math.sin(T) * n }, U = o ? ` open-age-${o.level}` : "", N = document.createElementNS(Q, "g");
    N.setAttribute("class", `dynamic-opening door ${r ? "is-open" : "is-closed"}${U}`), N.setAttribute("data-opening-id", t.id), o && N.setAttribute("data-open-minutes", String(o.minutes)), this.line(N, $.x, $.y, w.x, w.y, "opening-gap");
    const I = Math.max(7, Math.min(12, n * 0.12));
    for (const X of [$, w]) this.line(N, X.x - y * I / 2, X.y - _ * I / 2, X.x + y * I / 2, X.y + _ * I / 2, "door-jamb");
    r && this.line(N, S.x, S.y, C.x, C.y, "door-closed-guide"), this.line(N, S.x, S.y, Y.x, Y.y, "door-leaf");
    const Z = document.createElementNS(Q, "circle");
    if (Z.setAttribute("cx", String(S.x)), Z.setAttribute("cy", String(S.y)), Z.setAttribute("r", "4.2"), Z.setAttribute("class", "opening-hinge"), N.appendChild(Z), r) {
      const X = document.createElementNS(Q, "path"), wi = ft(k), $i = T, zr = S.x + Math.cos(wi) * n, Tr = S.y + Math.sin(wi) * n, Or = S.x + Math.cos($i) * n, Ir = S.y + Math.sin($i) * n, Dr = E > 0 ? 1 : 0, jr = Math.abs(a) > 180 ? 1 : 0;
      X.setAttribute("d", `M ${zr} ${Tr} A ${n} ${n} 0 ${jr} ${Dr} ${Or} ${Ir}`), X.setAttribute("class", "door-swing"), N.appendChild(X);
    }
    const ve = d + y * 14, Te = p + _ * 14, Ae = document.createElementNS(Q, "circle");
    Ae.setAttribute("cx", String(ve)), Ae.setAttribute("cy", String(Te)), Ae.setAttribute("r", "5.2"), Ae.setAttribute("class", "opening-status-dot"), N.appendChild(Ae), this.appendAgeIndicator(N, ve, Te, o);
    const Xe = document.createElementNS(Q, "title");
    Xe.textContent = `${t.name ?? t.id} · ${r ? "åben" : "lukket"}${o ? ` · ${o.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, N.appendChild(Xe), e.appendChild(N);
  }
  drawWindow(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(26, (t.length ?? 0.05) * x), s = t.angle ?? 0, a = t.point[0] * x, l = t.point[1] * x, c = ft(s), d = Math.cos(c), p = Math.sin(c), u = -p, g = d, b = n / 2, m = 5.5, y = { x: a - d * b, y: l - p * b }, _ = { x: a + d * b, y: l + p * b }, $ = o ? ` open-age-${o.level}` : "", w = document.createElementNS(Q, "g");
    w.setAttribute("class", `dynamic-opening window ${r ? "is-open" : "is-closed"}${$}`), w.setAttribute("data-opening-id", t.id), o && w.setAttribute("data-open-minutes", String(o.minutes)), this.line(w, y.x, y.y, _.x, _.y, "window-gap"), this.line(w, y.x + u * m, y.y + g * m, _.x + u * m, _.y + g * m, "window-pane"), this.line(w, y.x - u * m, y.y - g * m, _.x - u * m, _.y - g * m, "window-pane"), this.line(w, y.x + u * m, y.y + g * m, y.x - u * m, y.y - g * m, "window-frame-end"), this.line(w, _.x + u * m, _.y + g * m, _.x - u * m, _.y - g * m, "window-frame-end"), r && (this.line(w, y.x + u * m, y.y + g * m, a + d * b * 0.12 + u * 18, l + p * b * 0.12 + g * 18, "window-open-sash"), this.line(w, a + d * b * 0.12 + u * 18, l + p * b * 0.12 + g * 18, _.x + u * m, _.y + g * m, "window-open-sash"));
    const S = a + u * 17, C = l + g * 17, k = document.createElementNS(Q, "circle");
    k.setAttribute("cx", String(S)), k.setAttribute("cy", String(C)), k.setAttribute("r", "5.2"), k.setAttribute("class", "opening-status-dot"), w.appendChild(k), this.appendAgeIndicator(w, S, C, o);
    const E = document.createElementNS(Q, "title");
    E.textContent = `${t.name ?? t.id} · vindue ${r ? "åbent" : "lukket"}${o ? ` · ${o.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, w.appendChild(E), e.appendChild(w);
  }
};
Ze.styles = O`${st.styles}
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
_r([
  A({ attribute: !1 })
], Ze.prototype, "openings", 2);
Ze = _r([
  z("explorer-openings-canvas")
], Ze);
var bn = Object.defineProperty, yn = Object.getOwnPropertyDescriptor, We = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? yn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && bn(t, i, o), o;
};
const vn = "http://www.w3.org/2000/svg";
let _e = class extends Ze {
  constructor() {
    super(...arguments), this.hideSourceText = !1, this.weatherEffect = "clear", this.weatherState = "clear", this.weatherIntensity = 0.6, this.weatherNight = !1, this.weatherMaskId = `explorer-weather-mask-${Math.random().toString(36).slice(2, 10)}`, this.cloudFilterId = `explorer-cloud-organic-${Math.random().toString(36).slice(2, 10)}`;
  }
  updated(e) {
    super.updated(e), this.syncSourceTextVisibility(), (e.has("weatherEffect") || e.has("weatherState") || e.has("weatherIntensity") || e.has("weatherNight") || e.has("rooms") || e.has("theme") || e.has("image") || e.has("metadata") || e.has("svgMarkup") || e.has("imageSource")) && this.syncWeatherOutsideRooms();
  }
  syncSourceTextVisibility() {
    const e = this.renderRoot.querySelector("g.floorplan-source.inline-source");
    e && e.querySelectorAll("text, tspan").forEach((t) => {
      this.hideSourceText ? (t.setAttribute("data-explorer-source-text-hidden", "true"), t.style.display = "none") : t.getAttribute("data-explorer-source-text-hidden") === "true" && (t.style.removeProperty("display"), t.removeAttribute("data-explorer-source-text-hidden"));
    });
  }
  svg(e) {
    return document.createElementNS(vn, e);
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
      width: String(x),
      height: String(x)
    });
    const t = this.svg("rect");
    this.attrs(t, { x: "0", y: "0", width: String(x), height: String(x), fill: "white" }), e.appendChild(t);
    for (const i of this.rooms) {
      if (i.points.length < 3) continue;
      const r = this.svg("polygon");
      this.attrs(r, {
        points: i.points.map(([o, n]) => `${o * x},${n * x}`).join(" "),
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
    const o = this.svg("feGaussianBlur");
    return this.attrs(o, { in: "warped", stdDeviation: "1.35" }), e.appendChild(o), e;
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
    ];
    this.weatherState === "cloudy" && t.push(
      [235, 185, 0.78, 21, 0.58],
      [800, 285, 0.76, 22, 0.57],
      [550, 455, 0.82, 23, 0.62],
      [315, 650, 0.8, 24, 0.6],
      [880, 810, 0.74, 25, 0.55],
      [470, 920, 0.78, 26, 0.58],
      [725, 90, 0.58, 27, 0.43]
    );
    const i = [
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
    ], o = [
      "translate(-18 17) scale(1.08 .72)",
      "translate(20 12) scale(1.30 .56)",
      "translate(-8 21) scale(.94 .86)",
      "translate(14 7) scale(1.18 .62)"
    ];
    for (const [n, s, a, l, c] of t) {
      const d = l % 4, p = l % 3, u = this.svg("g");
      this.attrs(u, {
        class: "weather-cloud-position",
        transform: `translate(${n} ${s}) scale(${a * 0.64})`,
        opacity: String(c)
      });
      const g = this.svg("g");
      this.attrs(g, {
        class: `weather-cloud weather-cloud-${l % 3} weather-cloud-depth-${p} weather-cloud-form-${d}`
      });
      const b = this.svg("g");
      this.attrs(b, {
        class: "weather-cloud-mist weather-cloud-mist-back",
        transform: o[d]
      }), [
        [-72, 30, 102, 24, 0.52],
        [24, 24, 132, 27, 0.42],
        [112, 8, 78, 20, 0.32]
      ].forEach(([M, T, Y, U, N]) => {
        const I = this.svg("ellipse");
        this.attrs(I, {
          cx: String(M),
          cy: String(T),
          rx: String(Y),
          ry: String(U),
          opacity: String(N)
        }), b.appendChild(I);
      }), g.appendChild(b);
      const m = this.svg("path");
      this.attrs(m, {
        d: "M-145 40 C-112 12 -84 2 -55 10 C-30 20 -9 20 15 10 C43 -3 77 1 104 18 C128 32 135 51 121 64 C92 84 48 84 10 79 C-33 78 -82 88 -119 72 C-138 64 -151 51 -145 40 Z",
        class: "weather-cloud-shadow"
      }), g.appendChild(m);
      const y = this.svg("g");
      this.attrs(y, {
        class: "weather-cloud-body",
        filter: `url(#${this.cloudFilterId})`,
        transform: r[l % r.length]
      });
      const _ = this.svg("path");
      this.attrs(_, {
        d: "M-145 28 C-132 -4 -106 -22 -76 -20 C-65 -48 -40 -67 -12 -64 C4 -87 38 -91 61 -67 C88 -66 111 -50 122 -29 C148 -18 158 4 147 25 C134 49 103 62 71 62 C42 76 5 76 -27 69 C-67 76 -111 64 -136 47 C-147 40 -151 34 -145 28 Z",
        class: "weather-cloud-base"
      }), y.appendChild(_);
      for (const [M, T, Y, U, N] of i) {
        const I = this.svg("ellipse");
        this.attrs(I, {
          cx: String(M),
          cy: String(T),
          rx: String(Y),
          ry: String(U),
          opacity: String(N),
          class: "weather-cloud-puff"
        }), y.appendChild(I);
      }
      const $ = this.svg("path");
      this.attrs($, {
        d: "M-104 -12 C-76 -34 -47 -40 -20 -30 C8 -19 33 -21 62 -39 C46 -13 22 1 -3 2 C-32 4 -57 -3 -79 3 C-92 4 -101 -2 -104 -12 Z",
        class: "weather-cloud-detail"
      }), y.appendChild($);
      const w = this.svg("path");
      this.attrs(w, {
        d: "M-151 43 C-111 60 -75 56 -45 48 C-15 41 9 51 35 56 C66 61 100 53 132 39 C106 65 69 77 28 74 C-8 69 -48 70 -81 75 C-111 73 -140 61 -151 43 Z",
        class: "weather-cloud-wisp"
      }), y.appendChild(w), g.appendChild(y);
      const S = this.svg("g");
      this.attrs(S, {
        class: "weather-cloud-mist weather-cloud-mist-front",
        transform: d === 1 ? "translate(8 51) scale(1.28 .40)" : d === 2 ? "translate(-20 43) scale(.88 .62)" : d === 3 ? "translate(18 47) scale(1.16 .46)" : "translate(8 49) scale(.95 .55)"
      }), [
        [-78, 0, 88, 18, 0.38],
        [18, 2, 116, 20, 0.42],
        [108, -2, 64, 15, 0.3]
      ].forEach(([M, T, Y, U, N]) => {
        const I = this.svg("ellipse");
        this.attrs(I, {
          cx: String(M),
          cy: String(T),
          rx: String(Y),
          ry: String(U),
          opacity: String(N)
        }), S.appendChild(I);
      }), g.appendChild(S);
      const C = this.svg("path");
      if (this.attrs(C, {
        d: "M-182 73 C-126 59 -76 66 -31 69 C13 72 59 66 123 51 C80 82 24 89 -29 84 C-78 80 -126 91 -182 73 Z",
        class: "weather-cloud-strand"
      }), g.appendChild(C), d === 1 || d === 3) {
        const M = this.svg("path");
        this.attrs(M, {
          d: d === 1 ? "M-205 89 C-151 74 -94 78 -40 82 C21 87 76 79 152 61 C97 91 31 99 -35 94 C-94 90 -151 101 -205 89 Z" : "M-176 2 C-124 -7 -82 -3 -41 8 C2 19 49 17 112 0 C67 24 16 30 -35 24 C-84 18 -127 24 -176 2 Z",
          class: "weather-cloud-fine-strand"
        }), g.appendChild(M);
      }
      const k = this.svg("path");
      this.attrs(k, {
        d: "M-57 -40 C-39 -61 -12 -71 11 -65 C31 -60 45 -50 52 -36 C30 -43 9 -40 -10 -33 C-29 -25 -46 -29 -57 -40 Z",
        class: "weather-cloud-highlight"
      }), g.appendChild(k);
      const E = this.svg("path");
      this.attrs(E, {
        d: "M-145 28 C-132 -4 -106 -22 -76 -20 C-65 -48 -40 -67 -12 -64 C4 -87 38 -91 61 -67 C88 -66 111 -50 122 -29 C148 -18 158 4 147 25 C134 49 103 62 71 62 C42 76 5 76 -27 69 C-67 76 -111 64 -136 47 C-147 40 -151 34 -145 28 Z",
        class: "weather-cloud-rim",
        transform: r[l % r.length]
      }), g.appendChild(E), u.appendChild(g), e.appendChild(u);
    }
  }
  appendFog(e, t = "fog") {
    const i = [
      [55, 14, 0],
      [145, -19, 1],
      [245, 23, 2],
      [345, -16, 3],
      [455, 20, 4],
      [565, -24, 5],
      [675, 17, 6],
      [785, -21, 7],
      [895, 19, 8],
      [985, -15, 9]
    ];
    (t === "cloudy" ? i.filter((o, n) => n % 2 === 0) : t === "partlycloudy" ? i.filter((o, n) => [2, 5, 8].includes(n)) : i).forEach(([o, n, s]) => {
      const a = this.svg("path");
      this.attrs(a, {
        d: `M -120 ${o} C 180 ${o + n}, 390 ${o - n}, 620 ${o} S 980 ${o + n}, 1120 ${o}`,
        class: `weather-fog-band weather-fog-band-${s}${t === "fog" ? "" : ` is-cloud-mist is-${t}-mist`}`
      }), e.appendChild(a);
    });
  }
  appendRain(e, t = !1) {
    const i = t ? 62 : 92, r = t ? 48 : 72;
    for (let o = -1; o < (t ? 18 : 13); o += 1)
      for (let n = -1; n < (t ? 24 : 17); n += 1) {
        const s = Math.abs(o * 37 + n * 19), a = n * r + o % 2 * (t ? 17 : 25) + s % 13, l = o * i, c = (t ? 15 : 10) + s % (t ? 12 : 8), d = (t ? 2.4 : 1.6) + s % 3 * 0.35, p = (t ? 5 : 3) + s % 4, u = this.svg("path");
        this.attrs(u, {
          d: `M ${a} ${l} C ${a - d * 0.7} ${l + c * 0.32}, ${a - p - d} ${l + c * 0.72}, ${a - p} ${l + c} C ${a - p + d} ${l + c * 0.72}, ${a + d * 0.45} ${l + c * 0.31}, ${a} ${l} Z`,
          class: `weather-rain-drop${t ? " is-heavy" : ""}`
        }), u.style.setProperty("--rain-duration", `${(t ? 0.48 : 0.9) + s % 7 * 0.06}s`), u.style.setProperty("--rain-delay", `${-(s % 17) * 0.11}s`), e.appendChild(u);
      }
  }
  appendSnow(e, t = !1) {
    const i = t ? 9 : 11, r = t ? 11 : 12;
    for (let o = 0; o < i; o += 1)
      for (let n = 0; n < r; n += 1) {
        const s = o * 31 + n * 17, a = 30 + n * (t ? 96 : 88) + o % 2 * 31 + s % 9, l = 20 + o * (t ? 119 : 99) + s % 13, c = (t ? 1.7 : 2.1) + s % 4 * 0.72, d = s % (t ? 7 : 5) === 0, p = d ? this.svg("path") : this.svg("circle"), u = `weather-snow-flake weather-snow-size-${s % 3}${d ? " weather-snow-crystal" : ""}${t ? " is-sleet" : ""}`;
        if (d) {
          const g = c * 0.78;
          this.attrs(p, {
            d: `M ${a} ${l - c * 1.8} L ${a} ${l + c * 1.8} M ${a - c * 1.8} ${l} L ${a + c * 1.8} ${l} M ${a - g} ${l - g} L ${a + g} ${l + g} M ${a + g} ${l - g} L ${a - g} ${l + g}`,
            class: u
          });
        } else
          this.attrs(p, { cx: String(a), cy: String(l), r: String(c), class: u });
        p.style.setProperty("--snow-duration", `${(t ? 3.8 : 6.2) + s % 8 * 0.42}s`), p.style.setProperty("--snow-delay", `${-(s % 19) * 0.31}s`), e.appendChild(p);
      }
  }
  appendHail(e) {
    for (let t = -1; t < 15; t += 1)
      for (let i = 0; i < 15; i += 1) {
        const r = this.svg("circle"), o = 18 + i * 73 + t % 2 * 27, n = t * 76, s = 4.2 + (t + i) % 3 * 1.4;
        this.attrs(r, { cx: String(o), cy: String(n), r: String(s), class: "weather-hail-stone" }), e.appendChild(r);
      }
  }
  appendWind(e) {
    [105, 225, 350, 490, 640, 790, 925].forEach((t, i) => {
      const r = i % 2 === 0 ? -34 : 39, o = i % 3 === 0 ? 44 : 32, n = `M -180 ${t} C 10 ${t + r}, 190 ${t - r}, 355 ${t} C 438 ${t + r}, 510 ${t + r}, 565 ${t + 2} C 610 ${t - o}, 675 ${t - o}, 700 ${t - 2} C 720 ${t + o}, 660 ${t + o + 12}, 635 ${t + 14} C 790 ${t - r}, 960 ${t + r}, 1190 ${t - 8}`, s = this.svg("path");
      this.attrs(s, {
        d: n,
        class: `weather-wind-line weather-wind-line-glow weather-wind-line-${i % 3}`
      }), e.appendChild(s);
      const a = this.svg("path");
      this.attrs(a, {
        d: n,
        class: `weather-wind-line weather-wind-line-core weather-wind-line-${i % 3}`
      }), e.appendChild(a);
    });
  }
  appendMagicMotes(e, t) {
    const i = t === "exceptional" ? 30 : t === "cloud" ? 24 : 18;
    for (let r = 0; r < i; r += 1) {
      const o = r * 47 + r % 5 * 29, n = 22 + (o * 13 + r * r * 7) % 1035, s = 25 + (o * 19 + r * r * 11) % 1015, a = (t === "exceptional" ? 3.1 : 2.1) + o % 4 * 0.65, l = a * 0.24, c = this.svg("g");
      this.attrs(c, { transform: `translate(${n} ${s})`, class: "weather-magic-mote-position" });
      const d = this.svg("path");
      this.attrs(d, {
        d: `M 0 ${-a} L ${l} ${-l} L ${a} 0 L ${l} ${l} L 0 ${a} L ${-l} ${l} L ${-a} 0 L ${-l} ${-l} Z`,
        class: `weather-magic-mote weather-magic-mote-${t} weather-magic-mote-${r % 3}`
      }), d.style.setProperty("--mote-duration", `${4.6 + o % 8 * 0.73}s`), d.style.setProperty("--mote-delay", `${-(o % 17) * 0.47}s`), c.appendChild(d), e.appendChild(c);
    }
  }
  appendExceptionalMagic(e) {
    [
      [360, 176, 0],
      [285, 255, 1],
      [430, 118, 2]
    ].forEach(([t, i, r]) => {
      const o = this.svg("ellipse");
      this.attrs(o, {
        cx: "520",
        cy: "520",
        rx: String(t),
        ry: String(i),
        class: `weather-exceptional-orbit weather-exceptional-orbit-${r}`
      }), e.appendChild(o);
    }), this.appendMagicMotes(e, "exceptional");
  }
  syncWeatherOutsideRooms() {
    const e = this.renderRoot.querySelector("svg.floorplan"), t = this.renderRoot.querySelector("g.scene");
    if (!e || !t || (e.querySelector(`defs[data-weather-mask="${this.weatherMaskId}"]`)?.remove(), t.querySelector(":scope > g.weather-outside-rooms-scene")?.remove(), this.weatherEffect === "clear")) return;
    const i = this.svg("defs");
    i.setAttribute("data-weather-mask", this.weatherMaskId), i.appendChild(this.createWeatherMask()), i.appendChild(this.createCloudFilter()), e.insertBefore(i, e.firstChild);
    const r = this.svg("g"), o = this.weatherState.replace(/[^a-z0-9_-]/g, "");
    if (r.setAttribute("class", `weather-outside-rooms-scene weather-${this.weatherEffect} state-${o}${this.weatherNight ? " is-night" : ""}`), r.setAttribute("mask", `url(#${this.weatherMaskId})`), r.setAttribute("pointer-events", "none"), r.style.setProperty("--weather-svg-intensity", String(Math.min(1, Math.max(0.25, this.weatherIntensity || 0.6)))), (["cloudy", "rain", "storm", "snow"].includes(this.weatherEffect) || this.weatherState === "windy-variant") && (this.appendClouds(r), this.appendMagicMotes(r, "cloud")), this.weatherEffect === "fog" && this.appendFog(r), this.weatherEffect === "cloudy" && this.weatherState === "cloudy" && this.appendFog(r, "cloudy"), this.weatherEffect === "cloudy" && this.weatherState === "partlycloudy" && this.appendFog(r, "partlycloudy"), this.weatherEffect === "rain" && this.appendRain(r, this.weatherState === "pouring"), this.weatherEffect === "storm" && this.weatherState !== "lightning" && this.appendRain(r, this.weatherState === "lightning-rainy"), this.weatherEffect === "snow" && this.weatherState !== "hail" && (this.appendSnow(r, this.weatherState === "snowy-rainy"), this.appendMagicMotes(r, "snow")), this.weatherState === "snowy-rainy" && this.appendRain(r), this.weatherState === "hail" && this.appendHail(r), this.weatherEffect === "wind" && (this.appendWind(r), this.appendMagicMotes(r, "wind")), this.weatherEffect === "exceptional" && (this.appendClouds(r), this.appendWind(r), this.appendMagicMotes(r, "cloud"), this.appendExceptionalMagic(r)), this.weatherEffect === "storm") {
      const a = this.svg("rect");
      this.attrs(a, { x: "0", y: "0", width: String(x), height: String(x), class: "weather-storm-flash" }), r.appendChild(a);
    }
    const s = t.querySelector(":scope > g.rooms-scene");
    t.insertBefore(r, s ?? null);
  }
};
_e.styles = O`
    ${Ze.styles}
    .weather-outside-rooms-scene { opacity: var(--weather-svg-intensity, .6); }
    .weather-outside-rooms-scene.weather-cloudy { opacity: min(1, calc(var(--weather-svg-intensity, .6) * 1.03)); }
    .weather-outside-rooms-scene.state-cloudy { opacity: min(1, calc(var(--weather-svg-intensity, .6) * 1.18)); }
    .weather-outside-rooms-scene.weather-rain,
    .weather-outside-rooms-scene.weather-storm,
    .weather-outside-rooms-scene.weather-snow { filter: saturate(.72) brightness(.91); }
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
    .weather-outside-rooms-scene .weather-cloud-rim {
      fill: none;
      stroke: rgba(244, 217, 151, .34);
      stroke-width: 2.8;
      stroke-linecap: round;
      stroke-dasharray: 96 34 24 43;
      opacity: .46;
      filter: drop-shadow(0 0 5px rgba(242, 208, 126, .34));
      animation: explorerCloudRimGlow 7.2s ease-in-out infinite alternate;
    }
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
    .weather-outside-rooms-scene .weather-fog-band { fill: none; stroke: #e4dac1; stroke-width: 34; stroke-linecap: round; opacity: .56; filter: blur(11px); animation: explorerFogDrift 16s ease-in-out infinite alternate; }
    .weather-outside-rooms-scene .weather-fog-band:nth-child(2n) { stroke: #a9a193; opacity: .30; animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-fog-band-1,
    .weather-outside-rooms-scene .weather-fog-band-6 { stroke-width: 48; opacity: .42; animation-duration: 21s; }
    .weather-outside-rooms-scene .weather-fog-band-2,
    .weather-outside-rooms-scene .weather-fog-band-8 { stroke-width: 26; opacity: .48; animation-duration: 12s; }
    .weather-outside-rooms-scene .weather-fog-band-3,
    .weather-outside-rooms-scene .weather-fog-band-7 { stroke-width: 40; opacity: .34; animation-duration: 19s; }
    .weather-outside-rooms-scene .weather-fog-band-4,
    .weather-outside-rooms-scene .weather-fog-band-9 { stroke-width: 30; opacity: .52; animation-duration: 14s; }
    .weather-outside-rooms-scene .weather-fog-band.is-cloudy-mist {
      stroke: #d9d3c6;
      stroke-width: 25;
      opacity: .28;
      filter: blur(15px);
      animation-duration: 24s;
    }
    .weather-outside-rooms-scene .weather-fog-band.is-partlycloudy-mist {
      stroke: #e2dac9;
      stroke-width: 20;
      opacity: .18;
      filter: blur(17px);
      animation-duration: 28s;
    }
    .weather-outside-rooms-scene .weather-rain-drop { fill: rgba(54,70,76,.58); stroke: rgba(219,219,204,.22); stroke-width: .45; opacity: .72; animation: explorerRainDrop var(--rain-duration,1.1s) linear infinite; animation-delay: var(--rain-delay,0s); }
    .weather-outside-rooms-scene .weather-rain-drop.is-heavy { fill: rgba(43,59,65,.72); stroke-width: .55; opacity: .86; }
    .weather-outside-rooms-scene .weather-snow-flake {
      fill: #fff8df;
      stroke: rgba(172, 155, 121, .72);
      stroke-width: .8;
      opacity: .88;
      transform-box: fill-box;
      transform-origin: center;
      filter: drop-shadow(0 0 3px rgba(255, 239, 189, .48));
      animation: explorerSnowFall var(--snow-duration,7s) linear infinite;
      animation-delay: var(--snow-delay,0s);
    }
    .weather-outside-rooms-scene .weather-snow-size-0 { opacity: .62; }
    .weather-outside-rooms-scene .weather-snow-size-2 { opacity: .96; }
    .weather-outside-rooms-scene .weather-snow-crystal { fill: none; stroke: rgba(255, 247, 218, .92); stroke-width: 1.4; filter: drop-shadow(0 0 5px rgba(242, 220, 159, .72)); }
    .weather-outside-rooms-scene .weather-snow-flake.is-sleet { opacity: .62; filter: drop-shadow(0 0 2px rgba(211, 224, 226, .38)); }
    .weather-outside-rooms-scene .weather-hail-stone { fill: #f7f2df; stroke: #7f8990; stroke-width: 1.7; opacity: .96; animation: explorerHailFall .92s linear infinite; }
    .weather-outside-rooms-scene .weather-wind-line { fill: none; stroke-linecap: round; stroke-linejoin: round; animation: explorerWindSweep 4.4s linear infinite; }
    .weather-outside-rooms-scene .weather-wind-line-core { stroke: rgba(151, 126, 78, .72); stroke-width: 2.6; stroke-dasharray: 168 76 48 112; opacity: .72; filter: drop-shadow(0 0 3px rgba(238, 205, 132, .38)); }
    .weather-outside-rooms-scene .weather-wind-line-glow { stroke: rgba(239, 215, 163, .34); stroke-width: 11; stroke-dasharray: 182 63 39 120; opacity: .18; filter: blur(6px); }
    .weather-outside-rooms-scene .weather-wind-line-1 { stroke-dasharray: 78 94 170 66; animation-duration: 5.8s; }
    .weather-outside-rooms-scene .weather-wind-line-2 { stroke-dasharray: 218 88 55 128; animation-duration: 3.6s; }
    .weather-outside-rooms-scene .weather-wind-line-core.weather-wind-line-1 { opacity: .54; }
    .weather-outside-rooms-scene .weather-wind-line-core.weather-wind-line-2 { opacity: .62; }
    .weather-outside-rooms-scene .weather-wind-line-glow.weather-wind-line-1 { opacity: .13; }
    .weather-outside-rooms-scene .weather-wind-line-glow.weather-wind-line-2 { opacity: .16; }
    .weather-outside-rooms-scene .weather-magic-mote {
      transform-box: fill-box;
      transform-origin: center;
      animation: explorerMagicMote var(--mote-duration,7s) ease-in-out infinite;
      animation-delay: var(--mote-delay,0s);
    }
    .weather-outside-rooms-scene .weather-magic-mote-cloud { fill: rgba(248, 220, 151, .76); filter: drop-shadow(0 0 5px rgba(244, 208, 125, .66)); }
    .weather-outside-rooms-scene .weather-magic-mote-snow { fill: rgba(242, 248, 244, .88); filter: drop-shadow(0 0 6px rgba(207, 229, 231, .82)); }
    .weather-outside-rooms-scene .weather-magic-mote-wind { fill: rgba(224, 201, 151, .70); filter: drop-shadow(0 0 5px rgba(213, 182, 116, .58)); }
    .weather-outside-rooms-scene .weather-magic-mote-exceptional { fill: rgba(217, 169, 123, .86); filter: drop-shadow(0 0 7px rgba(188, 102, 76, .72)); }
    .weather-outside-rooms-scene .weather-magic-mote-1 { animation-direction: alternate-reverse; }
    .weather-outside-rooms-scene .weather-magic-mote-2 { opacity: .58; }
    .weather-outside-rooms-scene.weather-rain .weather-magic-mote-cloud,
    .weather-outside-rooms-scene.weather-storm .weather-magic-mote-cloud { opacity: .34; }
    .weather-outside-rooms-scene .weather-exceptional-orbit {
      fill: none;
      stroke: rgba(138, 69, 57, .50);
      stroke-width: 5;
      stroke-dasharray: 96 47 18 62;
      opacity: .50;
      filter: drop-shadow(0 0 9px rgba(197, 116, 79, .48));
      transform-box: fill-box;
      transform-origin: center;
      animation: explorerExceptionalOrbit 22s linear infinite;
    }
    .weather-outside-rooms-scene .weather-exceptional-orbit-1 { stroke: rgba(190, 145, 91, .44); stroke-width: 3; animation-direction: reverse; animation-duration: 29s; }
    .weather-outside-rooms-scene .weather-exceptional-orbit-2 { stroke: rgba(111, 74, 98, .42); stroke-width: 7; opacity: .34; animation-duration: 17s; }
    .weather-outside-rooms-scene.weather-exceptional .weather-wind-line-core { stroke: rgba(129, 66, 54, .72); }
    .weather-outside-rooms-scene.weather-exceptional .weather-wind-line-glow { stroke: rgba(222, 143, 93, .38); }
    .weather-outside-rooms-scene .weather-storm-flash { fill: #fff0bd; opacity: 0; mix-blend-mode: screen; animation: explorerStormFlash 6.5s steps(1,end) infinite; }
    .weather-outside-rooms-scene.is-night .weather-rain-drop { fill: rgba(132,150,158,.64); stroke: rgba(224,227,218,.18); opacity: .72; }
    .weather-outside-rooms-scene.is-night .weather-cloud-rim { stroke: rgba(188, 207, 219, .40); filter: drop-shadow(0 0 6px rgba(158, 190, 211, .46)); }
    .weather-outside-rooms-scene.is-night .weather-wind-line-core { stroke: rgba(165, 190, 204, .64); filter: drop-shadow(0 0 4px rgba(149, 183, 202, .46)); }
    .weather-outside-rooms-scene.is-night .weather-wind-line-glow { stroke: rgba(173, 204, 220, .34); }
    .weather-outside-rooms-scene.is-night .weather-magic-mote-cloud,
    .weather-outside-rooms-scene.is-night .weather-magic-mote-wind { fill: rgba(211, 228, 236, .74); filter: drop-shadow(0 0 6px rgba(165, 203, 223, .70)); }
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
    :host([map-theme="enchanted_antique"]) .weather-outside-rooms-scene .weather-cloud-rim { stroke: rgba(244, 209, 133, .38); }
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
    @keyframes explorerCloudRimGlow {
      0% { stroke-dashoffset: 0; opacity: .24; }
      48% { opacity: .58; }
      100% { stroke-dashoffset: -82; opacity: .34; }
    }
    @keyframes explorerFogDrift { from { transform: translateX(-42px); } to { transform: translateX(54px); } }
    @keyframes explorerRainDrop { from { transform: translate(7px,-42px); opacity: 0; } 12% { opacity: .82; } 82% { opacity: .68; } to { transform: translate(-13px,78px); opacity: 0; } }
    @keyframes explorerSnowFall { 0% { transform: translate(0,-34px) rotate(0deg); opacity: 0; } 12% { opacity: .88; } 82% { opacity: .72; } 100% { transform: translate(28px,72px) rotate(210deg); opacity: 0; } }
    @keyframes explorerHailFall { from { transform: translate(9px,-48px); } to { transform: translate(-15px,82px); } }
    @keyframes explorerWindSweep { from { stroke-dashoffset: 620; transform: translateX(-74px); } to { stroke-dashoffset: 0; transform: translateX(92px); } }
    @keyframes explorerMagicMote { 0%,100% { transform: translate(0,8px) scale(.30) rotate(0deg); opacity: .08; } 28% { opacity: .74; } 52% { transform: translate(8px,-7px) scale(1.18) rotate(45deg); opacity: 1; } 76% { opacity: .46; } }
    @keyframes explorerExceptionalOrbit { from { transform: rotate(0deg) scale(.98); stroke-dashoffset: 0; } 50% { transform: rotate(180deg) scale(1.025); } to { transform: rotate(360deg) scale(.98); stroke-dashoffset: -240; } }
    @keyframes explorerStormFlash { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .52; } }
    @keyframes explorerStormFlashNight { 0%,6%,8%,46%,48%,100% { opacity: 0; } 7%,47% { opacity: .28; } }
    @media(prefers-reduced-motion:reduce) {
      .weather-outside-rooms-scene .weather-cloud,
      .weather-outside-rooms-scene .weather-cloud-fine-strand,
      .weather-outside-rooms-scene .weather-cloud-rim,
      .weather-outside-rooms-scene .weather-fog-band,
      .weather-outside-rooms-scene .weather-rain-drop,
      .weather-outside-rooms-scene .weather-snow-flake,
      .weather-outside-rooms-scene .weather-hail-stone,
      .weather-outside-rooms-scene .weather-wind-line,
      .weather-outside-rooms-scene .weather-magic-mote,
      .weather-outside-rooms-scene .weather-exceptional-orbit,
      .weather-outside-rooms-scene .weather-storm-flash { animation: none; }
    }
  `;
We([
  A({ type: Boolean, attribute: "hide-source-text" })
], _e.prototype, "hideSourceText", 2);
We([
  A({ attribute: "weather-effect" })
], _e.prototype, "weatherEffect", 2);
We([
  A({ attribute: "weather-state" })
], _e.prototype, "weatherState", 2);
We([
  A({ type: Number, attribute: "weather-intensity" })
], _e.prototype, "weatherIntensity", 2);
We([
  A({ type: Boolean, attribute: "weather-night" })
], _e.prototype, "weatherNight", 2);
_e = We([
  z("explorer-source-clean-canvas")
], _e);
const xn = (e) => e.strings === void 0, wn = {}, $n = (e, t = wn) => e._$AH = t;
const Me = fr(class extends br {
  constructor(e) {
    if (super(e), e.type !== Ce.PROPERTY && e.type !== Ce.ATTRIBUTE && e.type !== Ce.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!xn(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === se || t === f) return t;
    const i = e.element, r = e.name;
    if (e.type === Ce.PROPERTY) {
      if (t === i[r]) return se;
    } else if (e.type === Ce.BOOLEAN_ATTRIBUTE) {
      if (!!t === i.hasAttribute(r)) return se;
    } else if (e.type === Ce.ATTRIBUTE && i.getAttribute(r) === t + "") return se;
    return $n(e), t;
  }
});
var kn = Object.defineProperty, _n = Object.getOwnPropertyDescriptor, Ue = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? _n(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && kn(t, i, o), o;
};
const An = [
  { value: "person", label: "Person" },
  { value: "pet", label: "Kæledyr" },
  { value: "robot", label: "Robot" },
  { value: "vehicle", label: "Køretøj" },
  { value: "object", label: "Objekt" }
], Sn = /* @__PURE__ */ new Set(["sensor", "input_select", "select"]);
function Cn(e) {
  return e.split(".", 1)[0] ?? "";
}
function Zt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function En(e) {
  return Math.min(1, Math.max(0, e));
}
function Mn(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let de = class extends j {
  constructor() {
    super(...arguments), this.areas = [], this.areaError = "", this.loadingAreas = !1, this.areasLoaded = !1;
  }
  setConfig(e) {
    this.config = e;
  }
  updated(e) {
    e.has("hass") && !this.areasLoaded && !this.loadingAreas && this.loadAreas();
  }
  async loadAreas() {
    if (!this.hass?.callWS) {
      this.areas = [];
      return;
    }
    this.loadingAreas = !0, this.areaError = "";
    try {
      const e = await this.hass.callWS({ type: "config/area_registry/list" });
      this.areas = [...e].sort((t, i) => t.name.localeCompare(i.name, "da")), this.areasLoaded = !0;
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
    const o = this.config?.rooms?.[e];
    if (!o) return;
    const n = o.presence_anchor ?? { x: 0.5, y: 0.5 };
    this.updateRoom(e, {
      presence_anchor: { ...n, [t]: En(r) }
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
    const o = Mn({
      ...r.entity_binding ?? {},
      [t]: i.trim() || void 0
    });
    this.updatePresence(e, { entity_binding: o });
  }
  addPresence() {
    const e = [...this.config?.presences ?? []];
    let t = e.length + 1, i = `presence_${t}`;
    const r = new Set(e.map((o) => o.id));
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
      (e, t) => Zt(e).localeCompare(Zt(t), "da")
    );
  }
  renderEntityDatalist(e, t = !1) {
    const i = t ? this.entities.filter((r) => Sn.has(Cn(r.entity_id))) : this.entities;
    return h`
      <datalist id=${e}>
        ${i.map(
      (r) => h`<option value=${r.entity_id}>${Zt(r)}</option>`
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
              .value=${Me(e.area_id ?? "")}
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
    const i = `explorer-primary-entity-${t}`, r = `explorer-room-entity-${t}`, o = e.entity_binding ?? {};
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
              @input=${(n) => this.updatePresence(t, { name: n.target.value })}
            />
          </label>
          <label>
            Type
            <select
              .value=${Me(e.type ?? "person")}
              @change=${(n) => this.updatePresence(t, {
      type: n.target.value
    })}
            >
              ${An.map(
      (n) => h`<option value=${n.value}>${n.label}</option>`
    )}
            </select>
          </label>
        </div>

        <label>
          Hoved-entitet (valgfri)
          <input
            list=${i}
            .value=${o.entity ?? ""}
            placeholder="person.marc_poulsen"
            @change=${(n) => this.updatePresenceBinding(t, "entity", n.target.value)}
          />
          ${this.renderEntityDatalist(i)}
          <small>Bruges til profilbillede og øvrige entity-attributter. Kan være tom.</small>
        </label>

        <label>
          Rum-tracking entitet
          <input
            list=${r}
            .value=${o.room_entity ?? ""}
            placeholder="sensor.marc_room eller input_select.explorer_room_test"
            @change=${(n) => this.updatePresenceBinding(
      t,
      "room_entity",
      n.target.value
    )}
          />
          ${this.renderEntityDatalist(r, !0)}
          <small>Kan komme fra Bermuda, ESPresense, en helper eller en anden integration.</small>
        </label>

        <label>
          Fast rum (fallback)
          <select
            .value=${Me(e.room_id ?? "")}
            @change=${(n) => this.updatePresence(t, {
      room_id: n.target.value || void 0
    })}
          >
            <option value="">Ingen</option>
            ${(this.config?.rooms ?? []).map(
      (n) => h`<option value=${n.id}>${n.name ?? n.id}</option>`
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
de.styles = O`
    :host { display: block; }
    .editor { display: grid; gap: 12px; padding: 4px 0 8px; }
    details { border: 1px solid var(--divider-color); border-radius: 12px; overflow: hidden; background: var(--card-background-color); }
    summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; cursor: pointer; font-weight: 700; }
    summary::-webkit-details-marker { display: none; }
    .summary-hint { color: var(--secondary-text-color); font-size: .82rem; font-weight: 500; }
    .section-content { display: grid; gap: 14px; padding: 0 14px 14px; overflow-anchor: none; }
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
Ue([
  A({ attribute: !1 })
], de.prototype, "hass", 2);
Ue([
  v()
], de.prototype, "config", 2);
Ue([
  v()
], de.prototype, "areas", 2);
Ue([
  v()
], de.prototype, "areaError", 2);
Ue([
  v()
], de.prototype, "loadingAreas", 2);
de = Ue([
  z("ha-explorer-card-editor")
], de);
var Pn = Object.defineProperty, Nn = Object.getOwnPropertyDescriptor, B = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Nn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Pn(t, i, o), o;
};
const re = 1e3, bt = (e) => Math.min(1, Math.max(0, e));
function Ui(e) {
  return e.length ? { x: e.reduce((t, i) => t + i[0], 0) / e.length, y: e.reduce((t, i) => t + i[1], 0) / e.length } : { x: 0.5, y: 0.5 };
}
function Rn(e) {
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function zn(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "room";
}
function Xi(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
let L = class extends j {
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
    return t.width && t.height ? [bt((e.clientX - t.left) / t.width), bt((e.clientY - t.top) / t.height)] : [0.5, 0.5];
  }
  selectedPresence() {
    const e = this.selectedRoom;
    if (!e) return;
    const t = (this.roomConfig?.presences ?? []).filter((o) => o.entity_binding?.coordinate_space === "room_meters" && o.entity_binding.entity), i = t.find((o) => o.room_id === e.id);
    if (i) return i;
    if (t.length === 1) return t[0];
    const r = new Set([e.id, e.area_id ?? "", e.name ?? "", ...e.aliases ?? []].map((o) => o.trim().toLowerCase()).filter(Boolean));
    return t.find((o) => o.room_id && r.has(o.room_id.trim().toLowerCase()));
  }
  captureCalibration(e) {
    const t = this.selectedRoom, i = this.selectedPresence(), r = this.hass;
    if (!t || !i || !r) return;
    const o = i.entity_binding, n = r.states[o.entity];
    if (!n) return;
    const s = Xi(n.attributes[o.x_attribute ?? "map_x"]), a = Xi(n.attributes[o.y_attribute ?? "map_y"]), l = t.physical_meters;
    if (s === void 0 || a === void 0 || !l) return;
    const c = Rn(t), d = bt((e[0] - c.minX) / (c.maxX - c.minX || 1)), p = bt((e[1] - c.minY) / (c.maxY - c.minY || 1));
    return { sensor_x: l.flip_x ? l.width - s : s, sensor_y: l.flip_y ? l.height - a : a, room_x: d, room_y: p };
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
    const t = zn(e), i = new Set(this.rooms.map((o) => o.id));
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
        const e = this.draftRoomName.trim() || `Rum ${this.rooms.length + 1}`, t = this.uniqueRoomId(e), i = Ui(this.pendingPoints), r = this.meters(), o = { id: t, name: e, points: this.pendingPoints, presence_anchor: i, ...this.draftAreaId ? { area_id: this.draftAreaId } : {}, ...r ? { physical_meters: r } : {} };
        this.selectedRoomId = t, this.emitConfig({ ...this.roomConfig, rooms: [...this.rooms, o] });
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
    const t = e.points.map(([n, s]) => `${n * re},${s * re}`).join(" "), i = e.id === this.selectedRoomId, r = Ui(e.points), o = i && this.drawingMode === "anchor" && this.pendingAnchor ? this.pendingAnchor : e.presence_anchor ?? r;
    return P`<g style=${this.drawingMode === "idle" ? "pointer-events:auto" : "pointer-events:none"} @click=${(n) => this.selectRoom(n, e.id)}><polygon points=${t} fill="var(--primary-color,#03a9f4)" fill-opacity=${i ? ".30" : ".14"} stroke="var(--primary-color,#03a9f4)" stroke-width=${i ? 7 : 4}/><text x=${r.x * re} y=${r.y * re} text-anchor="middle" dominant-baseline="middle">${e.name ?? e.id}</text>${i ? P`<circle cx=${o.x * re} cy=${o.y * re} r="15" class="anchor"/>` : f}</g>`;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * re},${i * re}`).join(" ");
    return P`${this.pendingPoints.length >= 3 ? P`<polygon points=${e} class="pending-fill"/>` : f}<polyline points=${e} class="pending-line" fill="none"/>${this.pendingPoints.map(([t, i], r) => P`<circle cx=${t * re} cy=${i * re} r="13" class="pending-point"/><text x=${t * re} y=${i * re - 22} text-anchor="middle">${r + 1}</text>`)}`;
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
    const e = this.roomConfig.image ?? this.roomConfig.background ?? "", t = this.roomConfig.fit_mode === "cover" ? "xMidYMid slice" : "xMidYMid meet", i = this.drawingMode === "cal-a" || this.drawingMode === "cal-b" || this.drawingMode === "cal-c", r = this.drawingMode === "cal-a" ? "A" : this.drawingMode === "cal-b" ? "B" : "C", o = i ? `Stå på referencepunkt ${r} og klik det samme sted på plantegningen.` : this.drawingMode === "idle" ? "Vælg et rum. Kalibrér mål/orientering og derefter tre fysiske referencepunkter." : this.drawingMode === "anchor" ? "Klik hvor personpunktet skal være." : "Klik rundt langs rummets kant. Mindst 3 punkter.";
    return h`<section class="drawing-editor"><div class="heading"><div><small>VISUAL POSITION CALIBRATION · v0.34.0</small><h3>Tegn, mål, orientér og finjustér live-positioner</h3></div><b>${this.rooms.length} rum</b></div><div class="instruction">${o}</div>${this.drawingMode === "draw-new" ? h`<div class="grid"><label>Rumnavn<input .value=${this.draftRoomName} @input=${(n) => this.draftRoomName = n.target.value}></label><label>Home Assistant Area<select .value=${this.draftAreaId} @change=${(n) => this.draftAreaId = n.target.value}><option value="">Ikke bundet</option>${this.drawingAreas.map((n) => h`<option value=${n.area_id}>${n.name}</option>`)}</select></label></div>${this.dimensionFields()}` : this.selectedRoom && this.drawingMode === "idle" ? h`<div class="selected"><strong>${this.selectedRoom.name ?? this.selectedRoom.id}</strong><span>${this.selectedRoom.points.length} punkter · ${this.selectedRoom.physical_meters?.width ?? "?"} × ${this.selectedRoom.physical_meters?.height ?? "?"} m</span></div>${this.dimensionFields()}${this.positionCalibration()}` : f}${this.drawingAreaError ? h`<div class="warning">${this.drawingAreaError}</div>` : f}${e ? h`<div class="map-frame"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}><image href=${e} width="1000" height="1000" preserveAspectRatio=${t}/>${this.rooms.map((n) => this.renderRoomPolygon(n))}${this.renderPending()}</svg></div>` : h`<div class="instruction">Vælg først en plantegning under Kort.</div>`}<div class="buttons">${this.drawingMode === "draw-new" || this.drawingMode === "redraw" ? h`<button @click=${this.undoPoint}>Fortryd punkt</button><button class="primary" ?disabled=${this.pendingPoints.length < 3 || this.drawingMode === "draw-new" && !this.meters()} @click=${this.finishPolygon}>Gem rum</button><button @click=${this.cancelDrawing}>Annuller</button>` : this.drawingMode === "anchor" || i ? h`<button @click=${this.cancelDrawing}>Annuller</button>` : h`<button class="primary" @click=${this.beginNewRoom}>+ Nyt rum</button><button ?disabled=${!this.selectedRoom} @click=${this.beginRedraw}>Tegn rumkant igen</button><button ?disabled=${!this.selectedRoom} @click=${this.beginAnchor}>Placér personpunkt</button><button class="danger" ?disabled=${!this.selectedRoom} @click=${this.removeSelectedRoom}>Slet valgt rum</button>`}</div></section>`;
  }
  render() {
    return h`<ha-explorer-card-editor .hass=${this.hass} @config-changed=${this.handleBaseConfigChanged}></ha-explorer-card-editor>${this.renderRoomDrawingEditor()}`;
  }
};
L.styles = O`:host{display:block}.drawing-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading h3{margin:3px 0}.heading small{color:var(--secondary-text-color);font-weight:700;letter-spacing:.08em}.instruction,.selected,.warning,.position-cal{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color)}.position-cal{display:grid;gap:9px}.position-cal strong{color:var(--primary-text-color)}.grid,.dimensions{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;align-items:end}.cal-status{display:flex;gap:18px;flex-wrap:wrap}label{display:grid;gap:5px;font-size:.8rem;color:var(--secondary-text-color)}label.toggle{display:flex;align-items:center;gap:8px;min-height:38px;font-size:.9rem;color:var(--primary-text-color)}label.toggle input{width:auto}input,select{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;height:min(58vh,620px);cursor:crosshair}text{fill:var(--primary-text-color);font-size:24px;font-weight:700}.pending-fill{fill:var(--primary-color);fill-opacity:.18;stroke:var(--primary-color);stroke-width:5}.pending-line{stroke:var(--primary-color);stroke-width:6}.pending-point,.anchor{fill:var(--primary-color);stroke:white;stroke-width:4}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{padding:9px 13px;border:1px solid var(--divider-color);border-radius:9px;background:var(--secondary-background-color);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:var(--primary-color)}button.danger{background:var(--error-color,#db4437);color:#fff;border-color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}.selected{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}`;
B([
  A({ attribute: !1 })
], L.prototype, "hass", 2);
B([
  v()
], L.prototype, "roomConfig", 2);
B([
  v()
], L.prototype, "drawingMode", 2);
B([
  v()
], L.prototype, "selectedRoomId", 2);
B([
  v()
], L.prototype, "pendingPoints", 2);
B([
  v()
], L.prototype, "pendingAnchor", 2);
B([
  v()
], L.prototype, "draftRoomName", 2);
B([
  v()
], L.prototype, "draftAreaId", 2);
B([
  v()
], L.prototype, "draftWidth", 2);
B([
  v()
], L.prototype, "draftHeight", 2);
B([
  v()
], L.prototype, "draftFlipX", 2);
B([
  v()
], L.prototype, "draftFlipY", 2);
B([
  v()
], L.prototype, "calA", 2);
B([
  v()
], L.prototype, "calB", 2);
B([
  v()
], L.prototype, "calC", 2);
B([
  v()
], L.prototype, "calibrationMessage", 2);
B([
  v()
], L.prototype, "drawingAreas", 2);
B([
  v()
], L.prototype, "drawingAreaError", 2);
B([
  co("ha-explorer-card-editor")
], L.prototype, "baseEditor", 2);
L = B([
  z("ha-explorer-room-drawing-editor")
], L);
function ue(e) {
  return e?.trim() || void 0;
}
function Tn(e) {
  const t = e.entity_binding;
  return !!(ue(t?.room_entity) || e.room_id || Number.isFinite(e.x) && Number.isFinite(e.y));
}
function On(e) {
  const t = [];
  for (const i of e.presences ?? []) {
    const r = ue(i.entity_binding?.entity), o = ue(i.entity_binding?.room_entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "presences" }), o && t.push({ entity: o, source: `${i.name ?? i.id} · rum-tracking`, target: "presences" });
  }
  for (const i of e.rooms ?? []) {
    for (const r of i.reactions ?? []) {
      const o = ue(r.entity);
      o && t.push({ entity: o, source: `${i.name ?? i.id} · ${r.kind}`, target: "room-reactions" });
    }
    for (const r of i.quick_actions ?? []) {
      const o = ue(r.entity);
      o && t.push({ entity: o, source: `${i.name ?? i.id} · ${r.name}`, target: "room-actions" });
    }
  }
  for (const i of e.zones ?? []) {
    const r = ue(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "zones" });
  }
  for (const i of e.openings ?? []) {
    const r = ue(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "openings" });
  }
  for (const i of e.route_nodes ?? []) {
    const r = ue(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "route-graph" });
  }
  for (const i of e.route_graph_edges ?? []) {
    const r = ue(i.condition?.entity);
    r && t.push({ entity: r, source: "Betinget route edge", target: "route-graph" });
  }
  return t;
}
function In(e, t) {
  const i = e.rooms ?? [], r = e.presences ?? [], o = e.zones ?? [], n = e.openings ?? [], s = e.route_nodes ?? [], a = e.route_graph_edges ?? [], l = e.routes ?? [], c = i.flatMap(($) => $.reactions ?? []), d = i.flatMap(($) => $.quick_actions ?? []), p = On(e), u = [];
  if (t)
    for (const $ of p) {
      const w = t.states[$.entity];
      if (!w) {
        u.push({ ...$, unavailable: !1 });
        continue;
      }
      (w.state === "unavailable" || w.state === "unknown") && u.push({ ...$, unavailable: !0 });
    }
  const g = u.filter(($) => !$.unavailable), b = r.filter(($) => !Tn($)), m = i.filter(($) => $.points.length < 3), y = (e.image ?? e.background ?? "").trim(), _ = [{ id: "floorplan", label: "Plantegning", detail: y ? "Plantegning er valgt." : "Vælg en SVG-, PNG- eller JPG-plantegning.", state: y ? "ready" : "attention", target: "basic" }, { id: "rooms", label: "Rum", detail: i.length ? m.length ? `${i.length} rum · ${m.length} mangler en gyldig polygon.` : `${i.length} rum klar.` : "Tegn mindst ét rum for room-aware tracking og Living Rooms.", state: i.length && !m.length ? "ready" : "attention", target: i.length ? "rooms" : "room-tools" }, { id: "presences", label: "Personer & objekter", detail: r.length ? b.length ? `${r.length} tilføjet · ${b.length} mangler rum/position.` : `${r.length} tracking-profil${r.length === 1 ? "" : "er"} klar.` : "Valgfrit · tilføj personer, kæledyr, robotter eller objekter.", state: r.length ? b.length ? "attention" : "ready" : "optional", target: "presences" }, { id: "entities", label: "Home Assistant-entities", detail: p.length ? t ? g.length ? `${g.length} binding${g.length === 1 ? "" : "er"} findes ikke i Home Assistant.` : u.length ? `${p.length} bindings fundet · ${u.length} er midlertidigt unavailable/unknown.` : `${p.length} live binding${p.length === 1 ? "" : "er"} fundet.` : `${p.length} binding${p.length === 1 ? "" : "er"} · afventer Home Assistant.` : "Ingen live entity-bindings endnu.", state: g.length ? "attention" : p.length ? "ready" : "optional", target: g[0]?.target ?? u[0]?.target ?? "diagnostics" }, { id: "openings", label: "Døre & vinduer", detail: n.length ? `${n.length} dynamisk${n.length === 1 ? " åbning" : "e åbninger"} konfigureret.` : "Valgfrit · placér døre og vinduer og bind dem til kontaktsensorer.", state: n.length ? "ready" : "optional", target: "openings" }, { id: "routing", label: "Routing", detail: a.length || l.length ? `${a.length} graph edges · ${l.length} manuelle routes · ${s.length} nodes.` : "Valgfrit · kortet kan bruges uden route graph.", state: a.length || l.length ? "ready" : "optional", target: a.length ? "route-graph" : "routes" }, { id: "living", label: "Living Rooms", detail: c.length ? `${c.length} rumreaktion${c.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · lys, motion, media og åbninger kan gøre rummene levende.", state: c.length ? "ready" : "optional", target: "room-reactions" }, { id: "quick-actions", label: "Rumhandlinger", detail: d.length ? `${d.length} scene- eller scripthandling${d.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · tilføj scenes og scripts direkte til rummets panel.", state: d.length ? "ready" : "optional", target: "room-actions" }, { id: "zones", label: "Dynamic Areas", detail: o.length ? `${o.length} zone${o.length === 1 ? "" : "r"} konfigureret.` : "Valgfrit · tilføj alarm-, rengørings- eller informationszoner.", state: o.length ? "ready" : "optional", target: "zones" }];
  return { items: _, entityIssues: u, attentionCount: _.filter(($) => $.state === "attention").length, configuredFeatureCount: _.filter(($) => $.state === "ready").length, roomCount: i.length, presenceCount: r.length, zoneCount: o.length, reactionCount: c.length, actionCount: d.length, routeCount: a.length + l.length, nodeCount: s.length };
}
var Dn = Object.defineProperty, jn = Object.getOwnPropertyDescriptor, bi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? jn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Dn(t, i, o), o;
};
const Ln = {
  ready: "Klar",
  attention: "Tjek",
  optional: "Valgfrit"
};
let at = class extends j {
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
        <span class="state-label">${Ln[e.state]}</span>
        <span class="chevron" aria-hidden="true">›</span>
      </button>
    `;
  }
  render() {
    if (!this.config) return f;
    const e = In(this.config, this.hass), t = e.attentionCount === 0, i = e.entityIssues.slice(0, 4);
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
at.styles = O`
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
bi([
  A({ attribute: !1 })
], at.prototype, "config", 2);
bi([
  A({ attribute: !1 })
], at.prototype, "hass", 2);
at = bi([
  z("ha-explorer-setup-overview")
], at);
var qn = Object.defineProperty, Bn = Object.getOwnPropertyDescriptor, Ar = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Bn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && qn(t, i, o), o;
};
const Gt = [
  ["classic", "Classic", "Den neutrale Home Assistant Explorer-stil."],
  [
    "enchanted_antique",
    "Enchanted Antique Map",
    "Original magisk kortstil med pergament, sepia-blæk og levende kortdetaljer."
  ]
], Hn = [
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
  ["exceptional", "⚠️ Ekstremt / usædvanligt vejr"]
];
let Et = class extends j {
  get theme() {
    return this.config?.appearance?.theme ?? "classic";
  }
  get dayNight() {
    return {
      enabled: this.config?.appearance?.day_night?.enabled ?? !1,
      mode: this.config?.appearance?.day_night?.mode ?? "auto",
      sun_entity: this.config?.appearance?.day_night?.sun_entity ?? "sun.sun",
      night_states: this.config?.appearance?.day_night?.night_states ?? ["below_horizon"],
      intensity: this.config?.appearance?.day_night?.intensity ?? 0.72
    };
  }
  get compass() {
    return {
      visible: this.config?.appearance?.compass?.visible ?? !0,
      rotation: this.config?.appearance?.compass?.rotation ?? -7,
      size: this.config?.appearance?.compass?.size ?? 1
    };
  }
  get alarm() {
    return {
      enabled: this.config?.appearance?.alarm?.enabled ?? !1,
      entity: this.config?.appearance?.alarm?.entity ?? "",
      armed_states: this.config?.appearance?.alarm?.armed_states ?? [
        "armed_away",
        "armed_home",
        "armed_night",
        "armed_vacation",
        "armed_custom_bypass"
      ],
      triggered_states: this.config?.appearance?.alarm?.triggered_states ?? ["triggered"],
      intensity: this.config?.appearance?.alarm?.intensity ?? 0.75
    };
  }
  get occupancy() {
    return {
      enabled: this.config?.appearance?.occupancy?.enabled ?? !1,
      home_states: this.config?.appearance?.occupancy?.home_states ?? ["home"],
      intensity: this.config?.appearance?.occupancy?.intensity ?? 0.65
    };
  }
  get weather() {
    return {
      enabled: this.config?.appearance?.weather?.enabled ?? !1,
      entity: this.config?.appearance?.weather?.entity ?? "weather.home",
      intensity: this.config?.appearance?.weather?.intensity ?? 0.6,
      preview_state: this.config?.appearance?.weather?.preview_state ?? "live",
      rain_states: this.config?.appearance?.weather?.rain_states ?? ["rainy", "pouring"],
      storm_states: this.config?.appearance?.weather?.storm_states ?? [
        "lightning",
        "lightning-rainy"
      ],
      snow_states: this.config?.appearance?.weather?.snow_states ?? [
        "snowy",
        "snowy-rainy",
        "hail"
      ],
      fog_states: this.config?.appearance?.weather?.fog_states ?? ["fog"],
      cloudy_states: this.config?.appearance?.weather?.cloudy_states ?? [
        "cloudy",
        "partlycloudy"
      ],
      wind_states: this.config?.appearance?.weather?.wind_states ?? ["windy", "windy-variant"],
      exceptional_states: this.config?.appearance?.weather?.exceptional_states ?? ["exceptional"]
    };
  }
  emit(e) {
    this.config && this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...this.config, appearance: e } },
        bubbles: !0,
        composed: !0
      })
    );
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
    const e = Gt.find((a) => a[0] === this.theme) ?? Gt[0], t = this.dayNight, i = this.compass, r = this.alarm, o = this.occupancy, n = this.weather, s = this.config.appearance?.hide_source_text ?? !1;
    return h`
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
            @change=${(a) => this.updateTheme(a.target.value)}
          >
            ${Gt.map(
      (a) => h`<option value=${a[0]}>${a[1]}</option>`
    )}
          </select>
          <small>${e[2]}</small>
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
                .checked=${s}
                @change=${(a) => this.updateSourceText(a.target.checked)}
              />
              Skjul
            </label>
          </div>
        </div>

        ${this.theme === "enchanted_antique" ? h`
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
                      .checked=${i.visible}
                      @change=${(a) => this.updateCompass({
      visible: a.target.checked
    })}
                    />
                    Vis
                  </label>
                </div>
                ${i.visible ? h`
                      <div class="grid">
                        <label class="wide">
                          Rotation · ${Math.round(i.rotation)}°
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            .value=${String(i.rotation)}
                            @input=${(a) => this.updateCompass({
      rotation: Number(a.target.value)
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
                            .value=${String(i.rotation)}
                            @change=${(a) => this.updateCompass({
      rotation: Math.min(
        180,
        Math.max(
          -180,
          Number(a.target.value) || 0
        )
      )
    })}
                          />
                        </label>
                        <label>
                          Størrelse · ${Math.round(i.size * 100)}%
                          <input
                            type="range"
                            min="0.55"
                            max="1.8"
                            step="0.05"
                            .value=${String(i.size)}
                            @input=${(a) => this.updateCompass({
      size: Number(a.target.value)
    })}
                          />
                        </label>
                      </div>
                    ` : f}
              </div>
            ` : f}

        <div class="moon-panel">
          <div class="panel-head">
            <div>
              <strong>🌙 Moonlight / Day-Night</strong>
              <small>Skift automatisk til en mørkere kortstemning efter solnedgang.</small>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                .checked=${t.enabled}
                @change=${(a) => this.updateDayNight({ enabled: a.target.checked })}
              />
              Aktiv
            </label>
          </div>
          ${t.enabled ? h`
                <div class="grid">
                  <label>
                    Tilstand
                    <select
                      .value=${t.mode}
                      @change=${(a) => this.updateDayNight({
      mode: a.target.value
    })}
                    >
                      <option value="auto">Automatisk via solen</option>
                      <option value="day">Tving dag</option>
                      <option value="night">Tving nat</option>
                    </select>
                  </label>
                  ${t.mode === "auto" ? h`
                        <label>
                          Sol-entity
                          <input
                            .value=${t.sun_entity}
                            @change=${(a) => this.updateDayNight({
      sun_entity: a.target.value.trim() || "sun.sun"
    })}
                          />
                        </label>
                      ` : f}
                  <label class="wide">
                    Nat-intensitet · ${Math.round(t.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(t.intensity)}
                      @input=${(a) => this.updateDayNight({
      intensity: Number(a.target.value)
    })}
                    />
                  </label>
                </div>
              ` : f}
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
                .checked=${n.enabled}
                @change=${(a) => this.updateWeather({ enabled: a.target.checked })}
              />
              Aktiv
            </label>
          </div>
          ${n.enabled ? h`
                <div class="grid">
                  <label class="wide">
                    Weather-entity
                    <input
                      .value=${n.entity}
                      placeholder="weather.home"
                      @change=${(a) => this.updateWeather({
      entity: a.target.value.trim() || "weather.home"
    })}
                    />
                    <small>Home Assistant weather.* entity, fx weather.forecast_home.</small>
                  </label>

                  <label class="wide simulator-box">
                    <span class="simulator-title">🌦️ Vejrsimulator · kun preview</span>
                    <select
                      .value=${n.preview_state}
                      @change=${(a) => this.updateWeather({
      preview_state: a.target.value
    })}
                    >
                      ${Hn.map(
      ([a, l]) => h`<option value=${a}>${l}</option>`
    )}
                    </select>
                    <small>
                      Tving en vejrtype i Home Assistants kort-preview. Det gemte dashboard følger
                      stadig den rigtige weather-entity. Vælg “Følg rigtigt vejr” for normal preview.
                    </small>
                  </label>

                  <label class="wide">
                    Vejr-intensitet · ${Math.round(n.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(n.intensity)}
                      @input=${(a) => this.updateWeather({
      intensity: Number(a.target.value)
    })}
                    />
                    <small>
                      Styrer hvor tydeligt regn, storm, sne, tåge og skyer vises.
                    </small>
                  </label>

                  <div class="state-box wide">
                    <strong>Automatiske vejrstates</strong>
                    <small>
                      🌧️ ${n.rain_states.join(", ")} · ⛈️
                      ${n.storm_states.join(", ")}
                    </small>
                    <small>
                      ❄️ ${n.snow_states.join(", ")} · 🌫️
                      ${n.fog_states.join(", ")} · ☁️
                      ${n.cloudy_states.join(", ")}
                    </small>
                    <small>
                      💨 ${n.wind_states.join(", ")} · ⚠️
                      ${n.exceptional_states.join(", ")} · 🌙 clear-night
                    </small>
                  </div>
                </div>
              ` : f}
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
                .checked=${o.enabled}
                @change=${(a) => this.updateOccupancy({ enabled: a.target.checked })}
              />
              Aktiv
            </label>
          </div>
          ${o.enabled ? h`
                <div class="grid">
                  <label class="wide">
                    Hjemme-intensitet · ${Math.round(o.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(o.intensity)}
                      @input=${(a) => this.updateOccupancy({
      intensity: Number(a.target.value)
    })}
                    />
                    <small>Styrer forskellen mellem Someone Home og Empty House.</small>
                  </label>
                  <div class="state-box wide">
                    <strong>Hjemme-state</strong>
                    <small>
                      ${o.home_states.join(", ")} · Explorer bruger dine konfigurerede
                      person-presences automatisk.
                    </small>
                  </div>
                </div>
              ` : f}
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
                .checked=${r.enabled}
                @change=${(a) => this.updateAlarm({ enabled: a.target.checked })}
              />
              Aktiv
            </label>
          </div>
          ${r.enabled ? h`
                <div class="grid">
                  <label class="wide">
                    Alarm-entity
                    <input
                      .value=${r.entity}
                      placeholder="alarm_control_panel.home"
                      @change=${(a) => this.updateAlarm({
      entity: a.target.value.trim()
    })}
                    />
                    <small>Vælg entity-id'et for dit alarmsystem.</small>
                  </label>
                  <label class="wide">
                    Alarm-intensitet · ${Math.round(r.intensity * 100)}%
                    <input
                      type="range"
                      min="0.25"
                      max="1"
                      step="0.05"
                      .value=${String(r.intensity)}
                      @input=${(a) => this.updateAlarm({
      intensity: Number(a.target.value)
    })}
                    />
                    <small>Styrer hvor kraftig armed/triggered-atmosfæren bliver.</small>
                  </label>
                  <div class="state-box wide">
                    <strong>Automatiske states</strong>
                    <small>Armed: ${r.armed_states.join(", ")}</small>
                    <small>Triggered: ${r.triggered_states.join(", ")}</small>
                  </div>
                </div>
              ` : f}
        </div>
      </section>
    `;
  }
};
Et.styles = O`
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
Ar([
  A({ attribute: !1 })
], Et.prototype, "config", 2);
Et = Ar([
  z("ha-explorer-theme-editor")
], Et);
var Fn = Object.defineProperty, Vn = Object.getOwnPropertyDescriptor, Sr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Vn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Fn(t, i, o), o;
};
const Yi = { person: "Person · skoaftryk", pet: "Kæledyr · poteaftryk", robot: "Robot · hjulspor", vehicle: "Køretøj · dobbelte hjulspor", object: "Objekt · magisk spor" };
let Mt = class extends j {
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
      return h`<article class="profile"><div class="profile-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><span class="type-badge">${Yi[r]}</span></div><div class="grid two"><label>Farve (valgfri)<input .value=${t.color ?? ""} placeholder="Automatisk stabil farve" @change=${(o) => this.updateOptionalText(i, "color", o.target.value)}/><small>Farven på selve markøren. Tom = automatisk.</small></label><label>Ikon (valgfri)<input .value=${t.icon ?? ""} placeholder="Automatisk type-ikon" maxlength="8" @change=${(o) => this.updateOptionalText(i, "icon", o.target.value)}/><small>Bruges i den store markør; type-badget vises stadig.</small></label></div><label class="toggle"><input type="checkbox" .checked=${t.visible !== !1} @change=${(o) => this.updatePresence(i, { visible: o.target.checked })}/><span><strong>Vis på kortet</strong><small>Skjuler markøren manuelt; tracking-konfigurationen bevares.</small></span></label><div class="trail-box"><div class="trail-heading"><strong>👣 Bevægelsesspor</strong><small>${Yi[r]}</small></div><label class="toggle"><input type="checkbox" .checked=${t.trail_visible !== !1} @change=${(o) => this.updatePresence(i, { trail_visible: o.target.checked })}/><span><strong>Vis spor</strong><small>Kan slås fra uden at skjule personen eller objektet.</small></span></label><div class="grid two"><label>Sporfarve (valgfri)<input .value=${t.trail_color ?? ""} placeholder="Samme som markør" @change=${(o) => this.updateOptionalText(i, "trail_color", o.target.value)}/><small>Fx #4b301d. Tom = markørens farve.</small></label><label>Varighed (sekunder)<input type="number" min="1" max="60" step="1" .value=${String(t.trail_duration ?? 4.2)} @change=${(o) => this.updateTrailDuration(i, o.target.value)}/><small>Hvor længe sporene falmer på kortet. 1–60 sek.</small></label></div></div></article>`;
    })}</div>` : h`<div class="empty">Tilføj først en person eller et objekt i sektionen ovenfor.</div>`}${e.length ? h`<div class="note">Sportypen vælges automatisk efter type. Reduced Motion deaktiverer bevægelsesspor, men markørerne forbliver synlige.</div>` : f}</section>`;
  }
};
Mt.styles = O`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.heading,.profile-heading,.trail-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.heading>div,.profile-heading>div{display:grid;gap:3px}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:0;font-size:1rem}.count,.type-badge{border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);white-space:nowrap}.count{padding:5px 9px;font-size:.78rem}.type-badge{padding:4px 8px;font-size:.72rem}.intro,.note{margin:0;color:var(--secondary-text-color);font-size:.86rem;line-height:1.45}.profiles{display:grid;gap:10px}.profile{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.profile-heading small,label small,.toggle small,.trail-heading small{color:var(--secondary-text-color);font-size:.76rem;font-weight:400;line-height:1.35}.grid{display:grid;gap:10px}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}label{display:grid;gap:6px;font-weight:600}input[type="text"],input:not([type]),input[type="number"]{box-sizing:border-box;width:100%;min-width:0;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:9px;padding-top:2px}.toggle input{margin-top:3px}.toggle span{display:grid;gap:2px}.trail-box{display:grid;gap:11px;padding:12px;border:1px dashed var(--divider-color);border-radius:9px;background:var(--card-background-color)}.trail-heading{align-items:center}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}.empty{color:var(--secondary-text-color);text-align:center;font-size:.84rem}@media(max-width:600px){.grid.two{grid-template-columns:1fr}.heading,.profile-heading{align-items:flex-start}.type-badge{white-space:normal;text-align:right}}`;
Sr([
  A({ attribute: !1 })
], Mt.prototype, "config", 2);
Mt = Sr([
  z("ha-explorer-presence-polish-editor")
], Mt);
var Kn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, Cr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Zn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Kn(t, i, o), o;
};
let Pt = class extends j {
  updateHistory(e) {
    if (!this.config) return;
    const t = { enabled: !1, duration_minutes: 3, show_rooms: !0, ...this.config.movement_history ?? {}, ...e };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config, movement_history: t } }, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = { enabled: !1, duration_minutes: 3, show_rooms: !0, ...this.config?.movement_history ?? {} };
    return h`<section class="panel">
      <div><span class="eyebrow">Movement History 2.0</span><h3>Magisk bevægelseshistorik</h3></div>
      <p>Gemmer kun historikken lokalt i kortet i 1–5 minutter. Home Assistant-databasen ændres ikke, og den normale plantegning fungerer uafhængigt.</p>
      <label class="toggle"><input type="checkbox" .checked=${e.enabled} @change=${(t) => this.updateHistory({ enabled: t.target.checked })}/><span><strong>Vis bevægelseshistorik</strong><small>Gælder personer. Kæledyr og robotter kommer i næste roadmap-del.</small></span></label>
      <label>Historiklængde: <strong>${e.duration_minutes} min.</strong><input type="range" min="1" max="5" step="1" .value=${String(e.duration_minutes)} @input=${(t) => this.updateHistory({ duration_minutes: Number(t.target.value) })}/><small>Ældre fodspor toner gradvist ud og fjernes automatisk.</small></label>
      <label class="toggle"><input type="checkbox" .checked=${e.show_rooms} @change=${(t) => this.updateHistory({ show_rooms: t.target.checked })}/><span><strong>Fremhæv senest besøgte rum</strong><small>Rummene får et meget diskret skær i personens sporfarve.</small></span></label>
    </section>`;
  }
};
Pt.styles = O`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}label{display:grid;gap:7px;font-weight:600}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:10px;padding:11px;border-radius:10px;background:var(--secondary-background-color)}.toggle input{margin-top:3px}.toggle span{display:grid;gap:3px}input[type="range"]{width:100%}`;
Cr([
  A({ attribute: !1 })
], Pt.prototype, "config", 2);
Pt = Cr([
  z("ha-explorer-movement-history-editor")
], Pt);
var Gn = Object.defineProperty, Wn = Object.getOwnPropertyDescriptor, Er = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Wn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Gn(t, i, o), o;
};
let Nt = class extends j {
  updateTrails(e) {
    if (!this.config) return;
    const t = { enabled: !1, duration_minutes: 3, show_pet_paws: !0, show_robot_route: !0, robot_direction_arrows: !0, ...this.config.pet_robot_trails ?? {}, ...e };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config, pet_robot_trails: t } }, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = { enabled: !1, duration_minutes: 3, show_pet_paws: !0, show_robot_route: !0, robot_direction_arrows: !0, ...this.config?.pet_robot_trails ?? {} };
    return h`<section class="panel"><div><span class="eyebrow">Pet & Robot Trails 2.0</span><h3>Poter og robotruter</h3></div>
      <p>Viser separate, udtonende spor for kæledyr og robotstøvsugere. Historikken gemmes kun midlertidigt i kortet.</p>
      <label class="toggle"><input type="checkbox" .checked=${e.enabled} @change=${(t) => this.updateTrails({ enabled: t.target.checked })}/><span><strong>Aktivér Pet & Robot Trails</strong><small>Påvirker kun profiler med typen Kæledyr eller Robot.</small></span></label>
      <label>Historiklængde: <strong>${e.duration_minutes} min.</strong><input type="range" min="1" max="5" step="1" .value=${String(e.duration_minutes)} @input=${(t) => this.updateTrails({ duration_minutes: Number(t.target.value) })}/><small>Gamle spor toner gradvist ud.</small></label>
      <div class="grid"><label class="toggle"><input type="checkbox" .checked=${e.show_pet_paws} @change=${(t) => this.updateTrails({ show_pet_paws: t.target.checked })}/><span><strong>Detaljerede poteaftryk</strong><small>Hvert kæledyr bruger sin egen sporfarve.</small></span></label>
      <label class="toggle"><input type="checkbox" .checked=${e.show_robot_route} @change=${(t) => this.updateTrails({ show_robot_route: t.target.checked })}/><span><strong>Sammenhængende robotrute</strong><small>Viser robotstøvsugerens seneste bevægelse som en linje.</small></span></label>
      <label class="toggle"><input type="checkbox" .checked=${e.robot_direction_arrows} ?disabled=${!e.show_robot_route} @change=${(t) => this.updateTrails({ robot_direction_arrows: t.target.checked })}/><span><strong>Retningspile</strong><small>Markerer robotruters kørselsretning.</small></span></label></div>
    </section>`;
  }
};
Nt.styles = O`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}label{display:grid;gap:7px;font-weight:600}.grid{display:grid;gap:9px}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:10px;padding:11px;border-radius:10px;background:var(--secondary-background-color)}.toggle input{margin-top:3px}.toggle span{display:grid;gap:3px}input[type="range"]{width:100%}`;
Er([
  A({ attribute: !1 })
], Nt.prototype, "config", 2);
Nt = Er([
  z("ha-explorer-pet-robot-trails-editor")
], Nt);
var Un = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, yi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Xn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Un(t, i, o), o;
};
function Wt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function Qi(e) {
  return Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0 && t !== ""));
}
let lt = class extends j {
  emit(e) {
    this.config && this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config, presences: e } }, bubbles: !0, composed: !0 }));
  }
  updatePresence(e, t) {
    const i = [...this.config?.presences ?? []], r = i[e];
    r && (i[e] = { ...r, type: "pet", ...t }, this.emit(i));
  }
  updateBinding(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { entity_binding: Qi({ ...i.entity_binding, ...t }) });
  }
  updateDetection(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { shelly_pet_detection: Qi({ enabled: !0, height_attribute: "maxz", target_id_attribute: "target_id", timestamp_attribute: "timestamp", max_height_m: 0.75, release_height_m: 0.95, confirmation_updates: 3, release_updates: 2, ...i.shelly_pet_detection, ...t }) });
  }
  addRabbit() {
    const e = [...this.config?.presences ?? []], t = new Set(e.map((o) => o.id));
    let i = 1;
    for (; t.has(i === 1 ? "kanin" : `kanin_${i}`); ) i += 1;
    const r = i === 1 ? "kanin" : `kanin_${i}`;
    e.push({ id: r, name: "Kanin", type: "pet", visible: !0, trail_visible: !0, icon: "🐇", entity_binding: { coordinate_space: "room_meters", x_attribute: "x", y_attribute: "y" }, shelly_pet_detection: { enabled: !0, height_attribute: "maxz", target_id_attribute: "target_id", timestamp_attribute: "timestamp", max_height_m: 0.75, release_height_m: 0.95, confirmation_updates: 3, release_updates: 2 } }), this.emit(e);
  }
  entities() {
    return Object.values(this.hass?.states ?? {}).filter((e) => e.entity_id.startsWith("sensor.")).sort((e, t) => Wt(e).localeCompare(Wt(t), "da"));
  }
  render() {
    const e = this.config?.presences ?? [], t = e.map((i, r) => ({ presence: i, index: r })).filter(({ presence: i }) => (i.type ?? "person") === "pet");
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Shelly Presence Gen4 · Pet Detection</span><h3>Find kaninen med radar</h3></div><button @click=${this.addRabbit}>+ Tilføj kanin</button></div>
      <p class="intro">Bruger Shelly LiveTrack-koordinaterne og <code>maxz</code>. Et mål skal være lavt flere opdateringer i træk, før det vises som kæledyr. Høje mål skjules i stedet for at blive vist som kanin.</p>
      ${t.length ? t.map(({ presence: i, index: r }) => {
      const o = i.entity_binding ?? {}, n = i.shelly_pet_detection ?? {};
      return h`<article class="pet-card"><div class="pet-heading"><strong>🐇 ${i.name ?? i.id}</strong><span>${n.enabled ? "Aktiv" : "Deaktiveret"}</span></div>
        <label class="toggle"><input type="checkbox" .checked=${n.enabled === !0} @change=${(s) => this.updateDetection(r, { enabled: s.target.checked })}/><span><strong>Automatisk kæledyrsregistrering</strong><small>Påvirker kun denne kæledyrsprofil.</small></span></label>
        <label>LiveTrack-entitet<input list="shelly-pet-entities" .value=${Me(o.position_entity ?? o.entity ?? "")} placeholder="sensor.stue_presence_stuen_target_1" @change=${(s) => this.updateBinding(r, { position_entity: s.target.value.trim() || void 0 })}/><small>Entiteten skal have attributterne x, y, maxz og helst target_id.</small></label>
        <div class="grid three"><label>Rum<select .value=${Me(i.room_id ?? "")} @change=${(s) => this.updatePresence(r, { room_id: s.target.value || void 0 })}><option value="">Vælg rum</option>${(this.config?.rooms ?? []).map((s) => h`<option value=${s.id}>${s.name ?? s.id}</option>`)}</select></label><label>X-attribut<input .value=${Me(o.x_attribute ?? "x")} @change=${(s) => this.updateBinding(r, { x_attribute: s.target.value.trim() || "x", coordinate_space: "room_meters" })}/></label><label>Y-attribut<input .value=${Me(o.y_attribute ?? "y")} @change=${(s) => this.updateBinding(r, { y_attribute: s.target.value.trim() || "y", coordinate_space: "room_meters" })}/></label></div>
        <div class="grid three"><label>Højde-attribut<input .value=${n.height_attribute ?? "maxz"} @change=${(s) => this.updateDetection(r, { height_attribute: s.target.value.trim() || "maxz" })}/></label><label>Target-ID-attribut<input .value=${n.target_id_attribute ?? "target_id"} @change=${(s) => this.updateDetection(r, { target_id_attribute: s.target.value.trim() || "target_id" })}/></label><label>Tidsstempel-attribut<input .value=${n.timestamp_attribute ?? "timestamp"} @change=${(s) => this.updateDetection(r, { timestamp_attribute: s.target.value.trim() || "timestamp" })}/></label></div>
        <div class="grid two"><label>Maks. kaninhøjde: <strong>${n.max_height_m ?? 0.75} m</strong><input type="range" min="0.15" max="1.2" step="0.05" .value=${String(n.max_height_m ?? 0.75)} @input=${(s) => this.updateDetection(r, { max_height_m: Number(s.target.value) })}/></label><label>Skjul igen over: <strong>${n.release_height_m ?? 0.95} m</strong><input type="range" min="0.25" max="1.6" step="0.05" .value=${String(n.release_height_m ?? 0.95)} @input=${(s) => this.updateDetection(r, { release_height_m: Number(s.target.value) })}/></label></div>
        <div class="grid two"><label>Bekræft efter målinger<input type="number" min="1" max="12" .value=${String(n.confirmation_updates ?? 3)} @change=${(s) => this.updateDetection(r, { confirmation_updates: Number(s.target.value) })}/><small>Flere målinger giver færre falske kaniner.</small></label><label>Skjul efter høje målinger<input type="number" min="1" max="12" .value=${String(n.release_updates ?? 2)} @change=${(s) => this.updateDetection(r, { release_updates: Number(s.target.value) })}/></label></div>
      </article>`;
    }) : h`<div class="empty">Ingen kæledyrsprofil endnu. Tryk “Tilføj kanin”.</div>`}
      <datalist id="shelly-pet-entities">${this.entities().map((i) => h`<option value=${i.entity_id}>${Wt(i)}</option>`)}</datalist>
      ${t.length ? h`<div class="note">Start med 0,75 m. Test derefter i Shellys target-visning og sænk grænsen, hvis et menneske på gulvet bliver registreret som kanin.</div>` : f}
    </section>`;
  }
};
lt.styles = O`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.heading,.pet-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}button{border:0;border-radius:10px;padding:10px 13px;background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff);font-weight:700}.intro,p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}.pet-card{display:grid;gap:13px;padding:14px;border:1px solid var(--divider-color);border-radius:11px}.pet-heading span{font-size:.72rem;color:var(--secondary-text-color)}label{display:grid;gap:6px;font-weight:600}.grid{display:grid;gap:10px}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:repeat(3,minmax(0,1fr))}input,select{box-sizing:border-box;width:100%;min-height:40px;padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}input[type="range"]{padding:0}.toggle{grid-template-columns:auto 1fr;align-items:start;padding:10px;background:var(--secondary-background-color);border-radius:9px}.toggle input{width:auto;min-height:0;margin-top:3px}.toggle span{display:grid;gap:2px}.note,.empty{padding:11px;border-radius:9px;background:var(--secondary-background-color);font-size:.8rem}@media(max-width:600px){.heading{align-items:flex-start;flex-direction:column}.two,.three{grid-template-columns:1fr}}`;
yi([
  A({ attribute: !1 })
], lt.prototype, "hass", 2);
yi([
  A({ attribute: !1 })
], lt.prototype, "config", 2);
lt = yi([
  z("ha-explorer-shelly-pet-editor")
], lt);
var Yn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, vi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Qn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Yn(t, i, o), o;
};
function Ut(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function Jn(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let ct = class extends j {
  emit(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  get entities() {
    return Object.values(this.hass?.states ?? {}).sort((e, t) => Ut(e).localeCompare(Ut(t), "da"));
  }
  updatePresence(e, t) {
    if (!this.config) return;
    const i = [...this.config.presences ?? []];
    i[e] && (i[e] = { ...i[e], ...t }, this.emit({ ...this.config, presences: i }));
  }
  updateBinding(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { entity_binding: Jn({ ...i.entity_binding, ...t }) });
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
    return h`<datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${Ut(t)}</option>`)}</datalist>`;
  }
  render() {
    const e = (this.config?.presences ?? []).filter((t) => (t.type ?? "person") === "person");
    return this.config ? h`<section class="panel"><div class="heading"><div><span class="eyebrow">Multi-Person & Identity · v0.36.1</span><h3>Hvem er hvor?</h3></div><button class="primary" @click=${this.addPerson}>+ Tilføj person</button></div><p class="intro">Identity Fusion adskiller personens identitet fra positionssensoren. Bind fx <code>person.marc</code> som profil og et Shelly/mmWave-target som live position. Flere personer kan være synlige og bevæge sig samtidig.</p>${e.length ? e.map((t) => {
      const i = (this.config?.presences ?? []).indexOf(t), r = t.entity_binding ?? {}, o = `identity-${i}`, n = `position-${i}`;
      return h`<article class="person-card"><div class="person-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><button class="danger" @click=${() => this.removePerson(i)}>Fjern</button></div><label>Navn på kortet<input .value=${t.name ?? ""} placeholder="Marc" @change=${(s) => this.updatePresence(i, { name: s.target.value.trim() || void 0 })}/></label><div class="grid two"><label>Identitets-entitet<input list=${o} .value=${r.entity ?? ""} placeholder="person.marc" @change=${(s) => this.updateBinding(i, { entity: s.target.value.trim() || void 0 })}/>${this.datalist(o)}<small>Leverer navn/avatar/status. Typisk en <code>person.*</code>-entity.</small></label><label>Live positions-entitet<input list=${n} .value=${r.position_entity ?? ""} placeholder="sensor.stue_presence_stuen_target_1" @change=${(s) => this.updateBinding(i, { position_entity: s.target.value.trim() || void 0 })}/>${this.datalist(n)}<small>Leverer X/Y. Hvis tom bruges identitets-entiteten som før.</small></label></div><div class="grid three"><label>Koordinatsystem<select .value=${r.coordinate_space ?? "normalized"} @change=${(s) => this.updateBinding(i, { coordinate_space: s.target.value })}><option value="normalized">Normalized 0–1</option><option value="meters">Hele kortet i meter</option><option value="room_meters">Rum i meter</option></select></label><label>X-attribut<input .value=${r.x_attribute ?? (r.coordinate_space === "room_meters" ? "map_x" : "")} placeholder="map_x" @change=${(s) => this.updateBinding(i, { x_attribute: s.target.value.trim() || void 0 })}/></label><label>Y-attribut<input .value=${r.y_attribute ?? (r.coordinate_space === "room_meters" ? "map_y" : "")} placeholder="map_y" @change=${(s) => this.updateBinding(i, { y_attribute: s.target.value.trim() || void 0 })}/></label></div><label>Rum til room_meters<select .value=${t.room_id ?? ""} @change=${(s) => this.updatePresence(i, { room_id: s.target.value || void 0 })}><option value="">Ingen</option>${(this.config?.rooms ?? []).map((s) => h`<option value=${s.id}>${s.name ?? s.id}</option>`)}</select><small>Alle targets i samme rum genbruger rummets 3-punktskalibrering.</small></label></article>`;
    }) : h`<div class="empty">Ingen personer er tilføjet endnu.</div>`}<div class="note">Første version binder identitet til et valgt target. En senere Identity Matching-del kan bevare navnet automatisk, hvis en mmWave-sensor bytter target-numre.</div></section>` : f;
  }
};
ct.styles = O`:host{display:block;min-width:0;max-width:100%;container-type:inline-size}.panel,.person-card,.grid,label,.heading>div,.person-heading>div{min-width:0}.panel{display:grid;gap:14px;width:100%;max-width:100%;box-sizing:border-box;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color);overflow:hidden}.heading,.person-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;min-width:0}.heading>div,.person-heading>div{display:grid;gap:3px}.eyebrow{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:0;font-size:1rem}.intro,.note,small{color:var(--secondary-text-color);line-height:1.4;overflow-wrap:anywhere}.intro,.note{margin:0;font-size:.86rem}.person-card{display:grid;gap:12px;width:100%;max-width:100%;box-sizing:border-box;padding:14px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color);overflow:hidden}label{display:grid;gap:6px;font-weight:600;max-width:100%}.grid{display:grid;gap:10px;width:100%;max-width:100%}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr) minmax(0,.85fr)}input,select,button{box-sizing:border-box;max-width:100%;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}input,select{width:100%;min-width:0}input{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button{cursor:pointer}.primary{border-color:var(--primary-color);color:var(--primary-color);font-weight:700}.danger{color:var(--error-color,#db4437);flex:0 0 auto}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}code{font-size:.9em;overflow-wrap:anywhere}@container (max-width:560px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}.person-heading{align-items:center}}@container (max-width:390px){.panel{padding:12px}.person-card{padding:11px}.person-heading{flex-wrap:wrap}.person-heading .danger{margin-left:auto}}@media(max-width:700px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}}`;
vi([
  A({ attribute: !1 })
], ct.prototype, "hass", 2);
vi([
  A({ attribute: !1 })
], ct.prototype, "config", 2);
ct = vi([
  z("ha-explorer-identity-editor")
], ct);
var es = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, le = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ts(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && es(t, i, o), o;
};
const xe = 1e3, Ji = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Advarsel" },
  { value: "danger", label: "Fare / alarm" },
  { value: "cleaning", label: "Rengøring" },
  { value: "restricted", label: "Begrænset område" }
];
function er(e) {
  return Math.min(1, Math.max(0, e));
}
function is(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "zone";
}
function Xt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function rs(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let ie = class extends j {
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
      (e, t) => Xt(e).localeCompare(Xt(t), "da")
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
      er((e.clientX - i.left) / i.width),
      er((e.clientY - i.top) / i.height)
    ];
  }
  handleMapClick(e) {
    this.drawing && (this.pendingPoints = [...this.pendingPoints, this.mapPoint(e)]);
  }
  uniqueZoneId(e) {
    const t = is(e), i = new Set(this.zones.map((o) => o.id));
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
          active_states: rs(this.draftStates)
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
    const t = $r(e, (i) => this.hass?.states[i]?.state);
    return e.visible === !1 ? "Skjult manuelt" : t.conditional ? t.active ? `Aktiv · ${t.currentState ?? "ukendt"}` : t.reason === "missing_entity" ? "Entity mangler" : t.reason === "entity_unavailable" ? `Utilgængelig · ${t.currentState}` : `Inaktiv · ${t.currentState ?? "ukendt"}` : "Altid aktiv";
  }
  renderZonePolygon(e) {
    const t = e.points.map(([r, o]) => `${r * xe},${o * xe}`).join(" "), i = e.id === this.selectedZoneId;
    return P`
      <g class=${i ? "zone selected" : "zone"} @click=${(r) => {
      this.drawing || (r.stopPropagation(), this.selectZone(e));
    }}>
        <polygon points=${t}></polygon>
        ${e.name ? P`<text x=${e.points.reduce((r, o) => r + o[0], 0) / e.points.length * xe} y=${e.points.reduce((r, o) => r + o[1], 0) / e.points.length * xe} text-anchor="middle">${e.name}</text>` : f}
      </g>
    `;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * xe},${i * xe}`).join(" ");
    return P`
      ${this.pendingPoints.length >= 3 ? P`<polygon class="pending-fill" points=${e}></polygon>` : f}
      <polyline class="pending-line" points=${e}></polyline>
      ${this.pendingPoints.map(([t, i], r) => P`
        <g transform=${`translate(${t * xe} ${i * xe})`}>
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
            ${Ji.map((t) => h`<option value=${t.value}>${t.label}</option>`)}
          </select>
        </label>
        <label class="wide">
          Home Assistant entity · valgfri
          <input list=${e} .value=${this.draftEntity} placeholder="input_boolean.alarm_zone" @change=${(t) => this.draftEntity = t.target.value} />
          <datalist id=${e}>
            ${this.entities.map((t) => h`<option value=${t.entity_id}>${Xt(t)}</option>`)}
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
              ${e ? P`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}
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
                    <span><strong>${r.name ?? r.id}</strong><small>${Ji.find((o) => o.value === (r.kind ?? "info"))?.label}</small></span>
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
ie.styles = O`
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
le([
  A({ attribute: !1 })
], ie.prototype, "hass", 2);
le([
  A({ attribute: !1 })
], ie.prototype, "config", 2);
le([
  v()
], ie.prototype, "selectedZoneId", 2);
le([
  v()
], ie.prototype, "drawing", 2);
le([
  v()
], ie.prototype, "pendingPoints", 2);
le([
  v()
], ie.prototype, "draftName", 2);
le([
  v()
], ie.prototype, "draftKind", 2);
le([
  v()
], ie.prototype, "draftEntity", 2);
le([
  v()
], ie.prototype, "draftStates", 2);
le([
  v()
], ie.prototype, "draftVisible", 2);
ie = le([
  z("ha-explorer-zones-editor")
], ie);
var os = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, W = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ns(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && os(t, i, o), o;
};
const Ie = 1e3, tr = ["on", "open", "opened", "true"];
function ir(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function ss(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "opening";
}
function Yt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function as(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let V = class extends j {
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
    return Object.values(this.hass?.states ?? {}).filter((e) => e.entity_id.startsWith("binary_sensor.") || e.entity_id.startsWith("cover.") || e.entity_id.startsWith("input_boolean.") || e.entity_id.startsWith("sensor.")).sort((e, t) => Yt(e).localeCompare(Yt(t), "da"));
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  uniqueId(e) {
    const t = ss(e), i = new Set(this.openings.map((o) => o.id));
    if (!i.has(t)) return t;
    let r = 2;
    for (; i.has(`${t}_${r}`); ) r++;
    return `${t}_${r}`;
  }
  mapPoint(e) {
    const t = e.currentTarget.getBoundingClientRect();
    return !t.width || !t.height ? [0.5, 0.5] : [ir((e.clientX - t.left) / t.width, 0, 1), ir((e.clientY - t.top) / t.height, 0, 1)];
  }
  handleMapClick(e) {
    this.placing && (this.draftPoint = this.mapPoint(e), this.placing = !1);
  }
  beginNew(e) {
    this.selectedId = "", this.draftKind = e, this.draftName = e === "door" ? `Dør ${this.openings.filter((t) => t.kind === "door").length + 1}` : `Vindue ${this.openings.filter((t) => t.kind === "window").length + 1}`, this.draftPoint = [0.5, 0.5], this.draftAngle = 0, this.draftLength = e === "door" ? 0.055 : 0.05, this.draftHinge = "start", this.draftSwing = "left", this.draftOpenAngle = 82, this.draftEntity = "", this.draftStates = "on, open", this.draftVisible = !0, this.placing = !0;
  }
  select(e) {
    this.selectedId = e.id, this.placing = !1, this.draftName = e.name ?? e.id, this.draftKind = e.kind, this.draftPoint = [...e.point], this.draftAngle = e.angle ?? 0, this.draftLength = e.length ?? (e.kind === "door" ? 0.055 : 0.05), this.draftHinge = e.hinge ?? "start", this.draftSwing = e.swing ?? "left", this.draftOpenAngle = e.open_angle ?? 82, this.draftEntity = e.state_binding?.entity ?? "", this.draftStates = (e.state_binding?.open_states ?? tr).join(", "), this.draftVisible = e.visible !== !1;
  }
  openingFromDraft(e) {
    const t = this.draftEntity.trim();
    return { id: e, name: this.draftName.trim() || e, kind: this.draftKind, point: this.draftPoint, angle: this.draftAngle, length: this.draftLength, hinge: this.draftHinge, swing: this.draftSwing, open_angle: this.draftOpenAngle, visible: this.draftVisible, ...t ? { state_binding: { entity: t, open_states: as(this.draftStates) } } : {} };
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
    return t ? `${(e.state_binding.open_states ?? tr).map((r) => r.toLowerCase()).includes(t.toLowerCase()) ? "Åben" : "Lukket"} · ${t}` : "Entity mangler";
  }
  renderOpening(e) {
    const t = e.id === this.selectedId, i = e.point[0] * Ie, r = e.point[1] * Ie, o = (e.length ?? 0.055) * Ie, n = (e.angle ?? 0) * Math.PI / 180, s = Math.cos(n) * o / 2, a = Math.sin(n) * o / 2;
    return P`<g class=${t ? "opening selected" : "opening"} @click=${(l) => {
      this.placing || (l.stopPropagation(), this.select(e));
    }}><line x1=${i - s} y1=${r - a} x2=${i + s} y2=${r + a}></line><circle cx=${i} cy=${r} r=${t ? 11 : 8}></circle>${e.name ? P`<text x=${i} y=${r - 18} text-anchor="middle">${e.name}</text>` : f}</g>`;
  }
  renderDraft() {
    if (this.selected || !this.placing && this.draftName === "Ny dør") return f;
    const e = this.draftPoint[0] * Ie, t = this.draftPoint[1] * Ie, i = this.draftLength * Ie, r = this.draftAngle * Math.PI / 180, o = Math.cos(r) * i / 2, n = Math.sin(r) * i / 2;
    return P`<g class="opening draft"><line x1=${e - o} y1=${t - n} x2=${e + o} y2=${t + n}></line><circle cx=${e} cy=${t} r="11"></circle></g>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = !!this.selected || this.placing || this.draftName !== "Ny dør";
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Dynamic Doors & Windows · v0.38</span><h3>Døre og vinduer</h3><p>Placér åbninger direkte på plantegningen og bind dem til Home Assistant.</p></div><span class="count">${this.openings.length} åbninger</span></div><div class="toolbar"><button class="primary" @click=${() => this.beginNew("door")}>+ Ny dør</button><button @click=${() => this.beginNew("window")}>+ Nyt vindue</button></div><div class="workspace"><div class="map-wrap"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}><rect width="1000" height="1000" class="backdrop"></rect>${e ? P`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}${this.openings.map((i) => this.renderOpening(i))}${this.renderDraft()}</svg>${this.placing ? h`<div class="map-help">Klik på kortet hvor ${this.draftKind === "door" ? "døren" : "vinduet"} skal sidde</div>` : f}</div><div class="sidebar">${this.openings.length ? this.openings.map((i) => h`<button class=${i.id === this.selectedId ? "row selected" : "row"} @click=${() => this.select(i)}><span><strong>${i.name ?? i.id}</strong><small>${i.kind === "door" ? "Dør" : "Vindue"}</small></span><em>${this.stateText(i)}</em></button>`) : h`<div class="empty">Ingen døre eller vinduer endnu.</div>`}</div></div>${t ? this.renderForm() : f}</section>`;
  }
  renderForm() {
    const e = "explorer-opening-entities";
    return h`<div class="form-grid"><label>Navn<input .value=${this.draftName} @input=${(t) => this.draftName = t.target.value}></label><label>Type<select .value=${this.draftKind} @change=${(t) => this.draftKind = t.target.value}><option value="door">Dør</option><option value="window">Vindue</option></select></label><label>Vinkel · ${Math.round(this.draftAngle)}°<input type="range" min="0" max="359" step="1" .value=${String(this.draftAngle)} @input=${(t) => this.draftAngle = Number(t.target.value)}></label><label>Længde · ${Math.round(this.draftLength * 1e3) / 10}%<input type="range" min="0.025" max="0.14" step="0.0025" .value=${String(this.draftLength)} @input=${(t) => this.draftLength = Number(t.target.value)}></label>${this.draftKind === "door" ? h`<label>Hængsel<select .value=${this.draftHinge} @change=${(t) => this.draftHinge = t.target.value}><option value="start">Start</option><option value="end">Slut</option></select></label><label>Svingretning<select .value=${this.draftSwing} @change=${(t) => this.draftSwing = t.target.value}><option value="left">Venstre</option><option value="right">Højre</option></select></label><label>Åbningsvinkel · ${Math.round(this.draftOpenAngle)}°<input type="range" min="30" max="150" step="1" .value=${String(this.draftOpenAngle)} @input=${(t) => this.draftOpenAngle = Number(t.target.value)}></label>` : f}<label class="wide">Home Assistant entity · valgfri<input list=${e} .value=${this.draftEntity} placeholder="binary_sensor.stuedor" @change=${(t) => this.draftEntity = t.target.value}><datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${Yt(t)}</option>`)}</datalist><small>Vælg fx en dør-/vindueskontakt eller cover-entity.</small></label><label>Åben state(s)<input .value=${this.draftStates} placeholder="on, open" @change=${(t) => this.draftStates = t.target.value}><small>Kommasepareret.</small></label><label class="toggle"><input type="checkbox" .checked=${this.draftVisible} @change=${(t) => this.draftVisible = t.target.checked}>Vis på kortet</label><div class="actions wide"><button @click=${() => this.placing = !0}>Placér igen</button>${this.selected ? h`<button class="danger" @click=${this.deleteSelected}>Slet</button>` : f}<button class="primary" @click=${this.save} ?disabled=${this.placing}>Gem</button></div></div>`;
  }
};
V.styles = O`:host{display:block;margin-top:16px;color:var(--primary-text-color)}.panel{border:1px solid var(--divider-color,#d7dbe0);border-radius:14px;padding:16px;background:var(--card-background-color,#fff)}.heading{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:4px 0;font-size:1.05rem}p{margin:0;color:var(--secondary-text-color);font-size:.86rem}.count{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color,#f2f4f7);font-size:.75rem;white-space:nowrap}.toolbar{display:flex;gap:8px;margin-top:14px}.workspace{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(190px,.8fr);gap:14px;margin-top:12px}.map-wrap{position:relative;min-height:300px;border-radius:12px;overflow:hidden;border:1px solid var(--divider-color,#d7dbe0);background:#d8c9a7}svg{width:100%;height:100%;min-height:300px;display:block;cursor:crosshair}.backdrop{fill:#d8c9a7}.opening{cursor:pointer;pointer-events:all}.opening line{stroke:var(--primary-text-color,#1f2937);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}.opening circle{fill:var(--card-background-color,#fff);stroke:var(--primary-color,#03a9f4);stroke-width:4;vector-effect:non-scaling-stroke}.opening.selected line{stroke:var(--primary-color,#03a9f4);stroke-width:10}.opening.draft line{stroke-dasharray:12 8}.opening text{fill:var(--primary-text-color,#1f2937);stroke:white;stroke-width:5;paint-order:stroke;font-size:20px;font-weight:700;pointer-events:none}.map-help{position:absolute;left:10px;bottom:10px;padding:6px 9px;border-radius:8px;background:rgba(255,255,255,.9);color:#344054;font-size:.75rem;pointer-events:none}.sidebar{display:flex;flex-direction:column;gap:7px;max-height:330px;overflow:auto}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;width:100%}.row.selected{border-color:var(--primary-color);box-shadow:0 0 0 1px var(--primary-color)}.row span{display:flex;flex-direction:column}.row small,.row em{font-size:.68rem;color:var(--secondary-text-color);font-style:normal}.row em{text-align:right}.empty{padding:12px;border:1px dashed var(--divider-color);border-radius:10px;color:var(--secondary-text-color);font-size:.8rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;margin-top:14px;padding-top:14px;border-top:1px solid var(--divider-color)}label{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:650}.wide{grid-column:1/-1}.toggle{flex-direction:row;align-items:center;align-self:end;padding-bottom:8px}input,select{box-sizing:border-box;width:100%;border:1px solid var(--divider-color,#cfd4da);border-radius:8px;padding:8px 9px;background:var(--card-background-color,#fff);color:var(--primary-text-color)}input[type=range]{padding:4px 0}label small{color:var(--secondary-text-color);font-weight:400}.actions{display:flex;justify-content:flex-end;gap:8px}button{border:1px solid var(--divider-color,#cfd4da);border-radius:9px;padding:9px 11px;background:var(--card-background-color,#fff);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color,#03a9f4);color:white;border-color:transparent;font-weight:700}button.danger{color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:700px){.workspace,.form-grid{grid-template-columns:1fr}.wide{grid-column:auto}}`;
W([
  A({ attribute: !1 })
], V.prototype, "hass", 2);
W([
  A({ attribute: !1 })
], V.prototype, "config", 2);
W([
  v()
], V.prototype, "selectedId", 2);
W([
  v()
], V.prototype, "placing", 2);
W([
  v()
], V.prototype, "draftName", 2);
W([
  v()
], V.prototype, "draftKind", 2);
W([
  v()
], V.prototype, "draftPoint", 2);
W([
  v()
], V.prototype, "draftAngle", 2);
W([
  v()
], V.prototype, "draftLength", 2);
W([
  v()
], V.prototype, "draftHinge", 2);
W([
  v()
], V.prototype, "draftSwing", 2);
W([
  v()
], V.prototype, "draftOpenAngle", 2);
W([
  v()
], V.prototype, "draftEntity", 2);
W([
  v()
], V.prototype, "draftStates", 2);
W([
  v()
], V.prototype, "draftVisible", 2);
V = W([
  z("ha-explorer-openings-editor")
], V);
var ls = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, ce = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? cs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ls(t, i, o), o;
};
const Qt = { light: "Lampe / lys", motion: "Bevægelsessensor", media: "TV / media", opening: "Dør / vindue", temperature: "Temperatur", fireplace: "Pejs / ildsted" }, Jt = { light: "✦", motion: "◉", media: "▶", opening: "↗", temperature: "°", fireplace: "🔥" }, ei = (e) => Math.min(1, Math.max(0, e));
let ee = class extends j {
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
    const e = this.parseStates(this.draftStates), t = { kind: this.draftKind, entity: this.draftEntity.trim(), ...this.draftKind === "temperature" || !e.length ? {} : { active_states: e }, ...this.draftPosition ? { position: { ...this.draftPosition } } : {}, ...this.draftKind === "fireplace" ? { intensity: ei(this.draftIntensity), radius: Math.min(220, Math.max(30, this.draftRadius)) } : {} }, i = [...this.selectedRoom.reactions ?? []];
    this.editingIndex === void 0 ? i.push(t) : i[this.editingIndex] = t, this.updateSelectedRoom(i), this.cancelEdit();
  }
  beginEdit(e) {
    const t = this.selectedRoom, i = t?.reactions?.[e];
    !t || !i || (this.editingIndex = e, this.draftKind = i.kind, this.draftEntity = i.entity, this.draftStates = i.kind === "temperature" ? "" : (i.active_states?.length ? i.active_states : wt(i.kind)).join(", "), this.draftPosition = Je(t, i), this.draftIntensity = i.intensity ?? 0.75, this.draftRadius = i.radius ?? 90);
  }
  cancelEdit() {
    this.editingIndex = void 0, this.draftKind = "light", this.draftEntity = "", this.draftStates = wt("light").join(", "), this.draftPosition = void 0, this.draftIntensity = 0.75, this.draftRadius = 90;
  }
  removeReaction(e) {
    this.selectedRoom && (this.updateSelectedRoom((this.selectedRoom.reactions ?? []).filter((t, i) => i !== e)), this.editingIndex === e && this.cancelEdit());
  }
  changeKind(e) {
    this.draftKind = e, this.draftEntity = "", this.draftStates = e === "temperature" ? "" : wt(e).join(", "), e === "fireplace" && (this.draftIntensity = 0.75, this.draftRadius = 90);
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
    !i.width || !i.height || (this.draftPosition = { x: ei((e.clientX - i.left) / i.width), y: ei((e.clientY - i.top) / i.height) });
  }
  preview(e) {
    const t = this.config?.image ?? this.config?.background ?? "", i = this.draftPosition ?? Je(e);
    return h`<div class="placement"><div><strong>Fysisk placering</strong><small>Klik på plantegningen dér hvor entity'en sidder.</small></div><div class="preview" @click=${this.handlePreviewClick}>${t ? h`<img src=${t} alt="">` : f}<svg viewBox="0 0 ${x} ${x}" preserveAspectRatio="none"><polygon points=${e.points.map(([r, o]) => `${r * x},${o * x}`).join(" ")}></polygon>${(e.reactions ?? []).map((r) => {
      const o = Je(e, r);
      return h`<g class="existing" transform=${`translate(${o.x * x} ${o.y * x})`}><circle r="13"></circle><text>${Jt[r.kind]}</text></g>`;
    })}<g class="draft-point" transform=${`translate(${i.x * x} ${i.y * x})`}><circle r=${this.draftKind === "fireplace" ? "18" : "14"}></circle><text>${Jt[this.draftKind]}</text></g></svg></div><small>${(i.x * 100).toFixed(1)} % / ${(i.y * 100).toFixed(1)} %</small></div>`;
  }
  statusLabel(e, t) {
    const i = vr(e, t, (r) => this.state(r));
    return e.kind === "temperature" && i.numericValue !== void 0 ? `${i.numericValue}${i.unit ? ` ${i.unit}` : "°"}` : i.active ? `Aktiv · ${i.currentState}` : `Inaktiv · ${i.currentState ?? "ukendt"}`;
  }
  render() {
    if (!this.config) return f;
    const e = this.selectedRoom, t = e?.reactions ?? [], i = this.options(), r = i.some((o) => o.id === this.draftEntity);
    return h`<section class="editor"><div class="heading"><div><span>Living Entity Points · Fireplace</span><h3>Rumreaktioner</h3></div><b>${this.rooms.reduce((o, n) => o + (n.reactions?.length ?? 0), 0)} punkter</b></div><p class="intro">Placér lys, sensorer, medier og nu også pejs/ildsted direkte på kortet.</p>${this.rooms.length ? h`<label>Rum<select .value=${this.selectedRoomId} @change=${(o) => {
      this.selectedRoomId = o.target.value, this.cancelEdit();
    }}>${this.rooms.map((o) => h`<option value=${o.id}>${o.name ?? o.id}</option>`)}</select></label><div class="draft"><strong>${this.editingIndex === void 0 ? "Nyt entity-punkt" : "Redigér entity-punkt"}</strong><div class="grid"><label>Type<select .value=${this.draftKind} @change=${(o) => this.changeKind(o.target.value)}>${Object.keys(Qt).map((o) => h`<option value=${o}>${Qt[o]}</option>`)}</select></label><label>Home Assistant entity<select .value=${this.draftEntity} @change=${(o) => this.draftEntity = o.target.value}><option value="">Vælg entity…</option>${this.draftEntity && !r ? h`<option value=${this.draftEntity}>${this.draftEntity} · eksisterende</option>` : f}${i.map((o) => h`<option value=${o.id}>${o.label === o.id ? o.id : `${o.label} · ${o.id}`}</option>`)}</select></label>${this.draftKind === "temperature" ? h`<div class="note">Temperaturen læses automatisk fra sensoren.</div>` : h`<label>Aktiv state(s)<input .value=${this.draftStates} @input=${(o) => this.draftStates = o.target.value}><small>Flere states adskilles med komma.</small></label>`}${this.draftKind === "fireplace" ? h`<label>🔥 Intensitet · ${Math.round(this.draftIntensity * 100)}%<input type="range" min="0.2" max="1" step="0.05" .value=${String(this.draftIntensity)} @input=${(o) => this.draftIntensity = Number(o.target.value)}></label><label>Glød-radius · ${Math.round(this.draftRadius)}<input type="range" min="30" max="220" step="5" .value=${String(this.draftRadius)} @input=${(o) => this.draftRadius = Number(o.target.value)}><small>Hvor langt den varme ildglød breder sig omkring pejsen.</small></label>` : f}</div>${e ? this.preview(e) : f}<div class="actions"><button @click=${this.save} ?disabled=${!this.draftEntity.trim() || this.isDuplicate()}>${this.editingIndex === void 0 ? "Tilføj punkt" : "Gem ændring"}</button>${this.editingIndex !== void 0 ? h`<button class="secondary" @click=${this.cancelEdit}>Annuller</button>` : f}</div></div><div class="list">${t.map((o, n) => h`<article><span class="glyph">${Jt[o.kind]}</span><div><strong>${Qt[o.kind]}</strong><small>${o.entity}</small><small>${this.statusLabel(o, n)}${o.kind === "fireplace" ? ` · ${Math.round((o.intensity ?? 0.75) * 100)}% · radius ${o.radius ?? 90}` : ""}</small></div><div class="row-actions"><button class="secondary" @click=${() => this.beginEdit(n)}>Redigér</button><button class="danger" @click=${() => this.removeReaction(n)}>Fjern</button></div></article>`)}</div>` : h`<div class="empty">Tilføj først et rum.</div>`}</section>`;
  }
};
ee.styles = O`:host{display:block}.editor{display:grid;gap:14px;margin-top:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{font-size:.7rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.1em}.heading h3{margin:3px 0 0}.heading b{height:max-content;padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);font-size:.75rem}.intro{margin:0;color:var(--secondary-text-color)}label{display:grid;gap:6px;font-size:.86rem}.draft{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}select,input{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}small{color:var(--secondary-text-color)}.placement{display:grid;gap:7px}.placement>div:first-child{display:grid}.preview{position:relative;aspect-ratio:1;max-height:360px;overflow:hidden;border:1px solid var(--divider-color);border-radius:10px;background:var(--card-background-color);cursor:crosshair}.preview img,.preview svg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.preview polygon{fill:rgba(120,90,50,.08);stroke:rgba(120,90,50,.5);stroke-width:3}.preview circle{fill:var(--card-background-color);stroke:var(--primary-color);stroke-width:4}.preview text{font-size:18px;text-anchor:middle;dominant-baseline:central}.draft-point text{font-size:22px}.actions,.row-actions{display:flex;gap:8px;flex-wrap:wrap}button{padding:8px 11px;border:0;border-radius:8px;background:var(--primary-color);color:var(--text-primary-color,#fff);font:inherit;cursor:pointer}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437)}button:disabled{opacity:.5;cursor:not-allowed}.list{display:grid;gap:8px}.list article{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:10px;border:1px solid var(--divider-color);border-radius:10px}.list article>div:nth-child(2){display:grid;gap:2px}.glyph{font-size:1.3rem}.note,.empty{padding:10px;border-radius:8px;background:var(--card-background-color);color:var(--secondary-text-color)}@media(max-width:620px){.grid{grid-template-columns:1fr}.list article{grid-template-columns:auto 1fr}.row-actions{grid-column:1/-1}}`;
ce([
  A({ attribute: !1 })
], ee.prototype, "config", 2);
ce([
  A({ attribute: !1 })
], ee.prototype, "hass", 2);
ce([
  v()
], ee.prototype, "selectedRoomId", 2);
ce([
  v()
], ee.prototype, "draftKind", 2);
ce([
  v()
], ee.prototype, "draftEntity", 2);
ce([
  v()
], ee.prototype, "draftStates", 2);
ce([
  v()
], ee.prototype, "draftPosition", 2);
ce([
  v()
], ee.prototype, "editingIndex", 2);
ce([
  v()
], ee.prototype, "draftIntensity", 2);
ce([
  v()
], ee.prototype, "draftRadius", 2);
ee = ce([
  z("ha-explorer-room-reactions-editor")
], ee);
var ds = Object.getOwnPropertyDescriptor, ps = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ds(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
let rr = class extends ee {
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
rr = ps([
  z("ha-explorer-room-reactions-editor-clean")
], rr);
var hs = Object.defineProperty, us = Object.getOwnPropertyDescriptor, ye = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? us(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && hs(t, i, o), o;
};
let ae = class extends j {
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
      (this.selectedRoom?.quick_actions ?? []).filter((n) => n.id !== this.editingId).map((n) => n.id)
    );
    let r = t, o = 2;
    for (; i.has(r); ) r = `${t}-${o++}`;
    return r;
  }
  save() {
    const e = this.selectedRoom, t = this.entity.trim(), i = this.name.trim();
    if (!e || !t || !i || !t.startsWith(`${this.kind}.`)) return;
    const r = e.quick_actions ?? [], o = {
      id: this.editingId || this.stableId(t),
      kind: this.kind,
      entity: t,
      name: i,
      ...this.icon.trim() ? { icon: this.icon.trim() } : {}
    }, n = this.editingId ? r.map((s) => s.id === this.editingId ? o : s) : [...r, o];
    this.updateRoom(n), this.resetDraft();
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
ae.styles = O`
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
ye([
  A({ attribute: !1 })
], ae.prototype, "config", 2);
ye([
  A({ attribute: !1 })
], ae.prototype, "hass", 2);
ye([
  v()
], ae.prototype, "selectedRoomId", 2);
ye([
  v()
], ae.prototype, "kind", 2);
ye([
  v()
], ae.prototype, "entity", 2);
ye([
  v()
], ae.prototype, "name", 2);
ye([
  v()
], ae.prototype, "icon", 2);
ye([
  v()
], ae.prototype, "editingId", 2);
ae = ye([
  z("ha-explorer-room-actions-editor")
], ae);
var gs = Object.defineProperty, ms = Object.getOwnPropertyDescriptor, K = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ms(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && gs(t, i, o), o;
};
const J = 1e3;
let F = class extends j {
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
    return Fe(e, (t) => this.entityState(t));
  }
  nodeStateLabel(e) {
    if (e.kind !== "door") return "";
    const t = this.nodeState(e);
    return t.conditional ? t.active ? `Åben · ${t.currentState ?? "ukendt"}` : t.reason === "entity_unavailable" ? "Blokeret · entity mangler" : t.reason === "missing_entity" ? "Blokeret · ingen entity" : `Lukket / blokeret · ${t.currentState ?? "ukendt"}` : "Ingen dørsensor";
  }
  mapPoint(e) {
    const i = e.currentTarget.getBoundingClientRect();
    if (!i.width || !i.height) return [0.5, 0.5];
    const r = Math.min(1, Math.max(0, (e.clientX - i.left) / i.width)), o = Math.min(1, Math.max(0, (e.clientY - i.top) / i.height));
    return [r, o];
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
      const { state_binding: o, ...n } = r;
      return {
        ...n,
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
    const r = this.routeSteps(e).map((o) => this.resolveStep(o)).filter((o) => !!o);
    return [t, ...r, i];
  }
  renderSharedNodes() {
    return this.routeNodes.map((e) => {
      const t = this.nodeUsageCount(e.id), [i, r] = e.point, o = this.nodeState(e), n = [
        "shared-node",
        this.drawing ? "selectable" : "",
        o.conditional && !o.active ? "blocked" : ""
      ].filter(Boolean).join(" ");
      return P`
        <g
          class=${n}
          transform=${`translate(${i * J} ${r * J})`}
          @click=${(s) => this.useSharedNode(s, e)}
        >
          <circle r="15"></circle>
          <text y="-24" text-anchor="middle">${this.routeNodeLabel(e)}</text>
          ${t > 0 ? P`<text class="usage" y="7" text-anchor="middle">${t}</text>` : f}
        </g>
      `;
    });
  }
  renderNetworkRoutes() {
    return this.routes.map((e, t) => {
      if (this.routeMatchesSelection(e)) return f;
      const i = this.routePoints(e);
      if (!i) return f;
      const r = i.map(([o, n]) => `${o * J},${n * J}`).join(" ");
      return P`
        <polyline
          points=${r}
          class="network-route"
          fill="none"
          vector-effect="non-scaling-stroke"
          tabindex="0"
          aria-label=${`${this.roomName(e.from)} til ${this.roomName(e.to)}`}
          @click=${(o) => {
        o.stopPropagation(), !this.drawing && !this.placingNode && this.selectRoute(e);
      }}
        ></polyline>
        <text
          class="network-number"
          x=${i[Math.floor(i.length / 2)][0] * J}
          y=${i[Math.floor(i.length / 2)][1] * J - 18}
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
    const r = i.map((s) => ({ step: s, point: this.resolveStep(s) })).filter((s) => !!s.point), n = [e, ...r.map((s) => s.point), t].map(([s, a]) => `${s * J},${a * J}`).join(" ");
    return P`
      <polyline points=${n} class="route-line" fill="none" vector-effect="non-scaling-stroke"></polyline>
      <g transform=${`translate(${e[0] * J} ${e[1] * J})`}><circle class="endpoint" r="14"></circle></g>
      ${r.map(({ step: s, point: a }, l) => P`
        <g transform=${`translate(${a[0] * J} ${a[1] * J})`}>
          <circle class=${s.node_id ? "waypoint shared-waypoint" : "waypoint"} r="11"></circle>
          <text y="-20" text-anchor="middle">${l + 1}</text>
        </g>
      `)}
      <g transform=${`translate(${t[0] * J} ${t[1] * J})`}><circle class="endpoint" r="14"></circle></g>
    `;
  }
  renderRouteList() {
    return this.routes.length ? h`
      <div class="route-list">
        ${this.routes.map((e, t) => {
      const i = this.routeMatchesSelection(e), r = this.routeSteps(e), o = r.filter((s) => !!s.node_id).length, n = r.filter((s) => !!s.point).length;
      return h`
            <button
              type="button"
              class=${i ? "route-item selected" : "route-item"}
              @click=${() => this.selectRoute(e)}
            >
              <span class="route-index">${t + 1}</span>
              <span class="route-copy">
                <strong>${this.roomName(e.from)} ↔ ${this.roomName(e.to)}</strong>
                <small>${o} fælles · ${n} lokale punkter</small>
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
                    <label>Navn<input .value=${this.editingNodeName} @input=${(o) => this.editingNodeName = o.target.value}></label>
                    <label>Type<select .value=${this.editingNodeKind} @change=${(o) => this.editingNodeKind = o.target.value}><option value="door">Dør</option><option value="junction">Kryds/gang</option><option value="waypoint">Waypoint</option></select></label>
                    ${this.editingNodeKind === "door" ? h`
                      <label>Home Assistant entity<input placeholder="binary_sensor.kokkendor" .value=${this.editingNodeEntity} @input=${(o) => this.editingNodeEntity = o.target.value}></label>
                      <label>Åben state(s)<input placeholder="on" .value=${this.editingNodeOpenStates} @input=${(o) => this.editingNodeOpenStates = o.target.value}><small>Fx <code>on</code> for en normal binary_sensor med device_class door.</small></label>
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
F.styles = O`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading,.node-heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b,.node-heading>span{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.node-manager{display:grid;gap:9px;padding:12px;border:1px solid var(--divider-color);border-radius:12px}.node-heading>div,.node-copy{display:grid;gap:2px}.node-heading small,.node-copy small{color:var(--secondary-text-color);font-weight:500}.node-list{display:grid;gap:6px}.node-item{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:9px;background:var(--secondary-background-color);border:1px solid transparent}.node-item.blocked{border-color:var(--error-color,#db4437)}.node-copy{flex:1}.node-actions,.node-edit-actions{display:flex;gap:6px;flex-wrap:wrap}.node-dot{width:13px;height:13px;border-radius:50%;background:var(--primary-color,#03a9f4)}.node-dot.junction{border-radius:3px}.node-dot.waypoint{background:var(--secondary-text-color)}.node-status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.node-status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.node-status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.node-draft,.node-edit{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;align-items:end;padding:10px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.node-draft label,.node-edit label{display:grid;gap:5px;font-size:.82rem}.node-draft label small,.node-edit label small{color:var(--secondary-text-color);font-size:.74rem}.node-draft input,.node-draft select,.node-edit input,.node-edit select{width:100%;box-sizing:border-box;padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.node-edit-actions{grid-column:1/-1}.node-add{justify-self:start}.route-list{display:grid;gap:7px}.route-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid transparent}.route-item.selected{border-color:var(--primary-color,#03a9f4);box-shadow:0 0 0 1px var(--primary-color,#03a9f4) inset}.route-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.route-copy{display:grid;gap:2px}.route-copy small{color:var(--secondary-text-color);font-weight:500}.route-empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:default}.map-frame.drawing svg{cursor:crosshair}.network-route{stroke:var(--secondary-text-color);stroke-opacity:.36;stroke-width:4;stroke-dasharray:10 10;pointer-events:stroke;cursor:pointer}.network-route:hover{stroke:var(--primary-color,#03a9f4);stroke-opacity:.8;stroke-width:7}.network-number{font-size:22px;font-weight:800;fill:var(--secondary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:7;stroke-linejoin:round;pointer-events:none}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:6;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-waypoint{fill:var(--primary-color,#03a9f4);stroke:white}.shared-node circle{fill:var(--card-background-color);stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-node.blocked circle{stroke:var(--error-color,#db4437)}.shared-node.selectable{cursor:pointer}.shared-node.selectable:hover circle{fill:var(--primary-color,#03a9f4)}.shared-node text{font-size:20px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6;stroke-linejoin:round;pointer-events:none}.shared-node .usage{font-size:16px;stroke:none;fill:var(--primary-text-color)}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.mini{padding:6px 8px;font-size:.76rem}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors,.node-draft,.node-edit{grid-template-columns:1fr}.node-edit-actions{grid-column:auto}.node-draft button{justify-self:start}.node-actions{flex-direction:column}}
  `;
K([
  A({ attribute: !1 })
], F.prototype, "config", 2);
K([
  A({ attribute: !1 })
], F.prototype, "hass", 2);
K([
  v()
], F.prototype, "fromRoom", 2);
K([
  v()
], F.prototype, "toRoom", 2);
K([
  v()
], F.prototype, "drawing", 2);
K([
  v()
], F.prototype, "pending", 2);
K([
  v()
], F.prototype, "placingNode", 2);
K([
  v()
], F.prototype, "draftNodeName", 2);
K([
  v()
], F.prototype, "draftNodeKind", 2);
K([
  v()
], F.prototype, "draftNodeEntity", 2);
K([
  v()
], F.prototype, "draftNodeOpenStates", 2);
K([
  v()
], F.prototype, "editingNodeId", 2);
K([
  v()
], F.prototype, "editingNodeName", 2);
K([
  v()
], F.prototype, "editingNodeKind", 2);
K([
  v()
], F.prototype, "editingNodeEntity", 2);
K([
  v()
], F.prototype, "editingNodeOpenStates", 2);
F = K([
  z("ha-explorer-route-editor")
], F);
var fs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, pe = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? bs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && fs(t, i, o), o;
};
const De = 1e3;
let ne = class extends j {
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
    return this.config ? pt(
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
    return !this.graphEdges.some((o) => this.canonicalEdgeKey(o) === r);
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
    const t = this.editingEntity.trim(), i = this.graphEdges.map((r, o) => {
      if (o !== e) return r;
      if (!t) {
        const { condition: n, ...s } = r;
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
      const { condition: o, ...n } = i;
      return n;
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
    const e = this.edgeStatuses(), t = this.graphEdges.map((r, o) => {
      const n = this.endpointPoint(r.from), s = this.endpointPoint(r.to);
      if (!n || !s) return f;
      const a = e[o] ?? this.edgeStatus(o), l = ["graph-edge", a.conditional ? "conditional" : "", a.active ? "" : "blocked"].filter(Boolean).join(" ");
      return P`<line
        x1=${n[0] * De}
        y1=${n[1] * De}
        x2=${s[0] * De}
        y2=${s[1] * De}
        class=${l}
        vector-effect="non-scaling-stroke"
      ></line>`;
    }), i = this.endpointOptions().filter((r) => r.point).map((r) => {
      const [o, n] = r.point, s = r.kind === "node" ? this.routeNodes.find((c) => c.id === r.id) : void 0, a = s ? Fe(s, (c) => this.entityState(c)) : void 0, l = !!(a?.conditional && !a.active);
      return P`
          <g transform=${`translate(${o * De} ${n * De})`}>
            <circle class=${r.kind === "room" ? "graph-room" : l ? "graph-node blocked" : "graph-node"} r=${r.kind === "room" ? "11" : "13"}></circle>
          </g>
        `;
    });
    return P`${t}${i}`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.endpointOptions(), i = this.edgeStatuses(), r = i.filter((n) => n.conditional).length, o = this.routeNodes.filter((n) => n.kind === "door" && n.state_binding).length;
    return h`
      <section class="graph-editor">
        <div class="heading">
          <div><span>Smart / Conditional Routes</span><h3>Forbind rum, døre og gangpunkter</h3></div>
          <b>${this.graphEdges.length} forbindelser · ${r} live · ${o} dørsensorer</b>
        </div>

        <div class="instruction">
          Dørpunkter med en Home Assistant-sensor styrer automatisk alle graph-forbindelser, der møder døren. Du kan stadig lægge en ekstra route-condition på selve forbindelsen til særlige regler. Manuelle ruter er fortsat eksplicitte overrides.
        </div>

        <div class="selectors">
          <label>Fra
            <select .value=${this.fromKey} @change=${(n) => this.fromKey = n.target.value}>
              <option value="">Vælg rum eller punkt</option>
              ${t.map((n) => h`<option value=${n.key}>${n.label}</option>`)}
            </select>
          </label>
          <label>Til
            <select .value=${this.toKey} @change=${(n) => this.toKey = n.target.value}>
              <option value="">Vælg rum eller punkt</option>
              ${t.map((n) => h`<option value=${n.key}>${n.label}</option>`)}
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
                @input=${(n) => this.conditionEntity = n.target.value}
              >
            </label>
            <label>Tilladte states
              <input
                placeholder="on"
                .value=${this.conditionStates}
                @input=${(n) => this.conditionStates = n.target.value}
              >
              <small>Flere states adskilles med komma, fx <code>on, open</code>.</small>
            </label>
          </div>
        </div>

        <button class="primary add" ?disabled=${!this.canAdd()} @click=${this.addEdge}>+ Tilføj forbindelse</button>

        ${this.graphEdges.length ? h`
          <div class="edge-list">
            ${this.graphEdges.map((n, s) => {
      const a = i[s] ?? this.edgeStatus(s), l = this.editingConditionIndex === s;
      return h`
                <div class=${a.active ? "edge-item" : "edge-item blocked"}>
                  <span class="edge-index">${s + 1}</span>
                  <span class="edge-copy">
                    <strong>${this.endpointLabel(n.from)}</strong>
                    <small>↔ ${this.endpointLabel(n.to)}</small>
                    <em class=${a.active ? "status open" : "status blocked"}>${this.statusLabel(s)}</em>
                    ${a.conditionSource === "node" && a.entity ? h`<small>Arvet fra dørpunkt: ${a.entity} · åben: ${a.allowedStates.join(", ")}</small>` : f}
                    ${n.condition ? h`<small>Ekstra route-condition: ${n.condition.entity} · tilladt: ${(n.condition.allowed_states?.length ? n.condition.allowed_states : ["on"]).join(", ")}</small>` : f}
                  </span>
                  <div class="edge-actions">
                    <button class="secondary mini" @click=${() => this.beginEditCondition(s)}>Route-condition</button>
                    <button class="danger mini" @click=${() => this.deleteEdge(s)}>Slet</button>
                  </div>
                </div>
                ${l ? h`
                  <div class="condition-edit">
                    <label>Entity<input .value=${this.editingEntity} @input=${(c) => this.editingEntity = c.target.value}></label>
                    <label>Tilladte states<input .value=${this.editingStates} @input=${(c) => this.editingStates = c.target.value}></label>
                    <div class="condition-actions">
                      <button class="primary mini" @click=${() => this.saveCondition(s)}>Gem route-condition</button>
                      ${n.condition ? h`<button class="secondary mini" @click=${() => this.removeCondition(s)}>Fjern route-condition</button>` : f}
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
ne.styles = O`
    :host{display:block}.graph-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors,.condition-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label,.condition-fields label,.condition-edit label{display:grid;gap:6px;font-size:.85rem}.selectors select,input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.condition-draft,.condition-edit{display:grid;gap:10px;padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.condition-title{display:grid;gap:2px}.condition-title span,.condition-fields small{color:var(--secondary-text-color);font-size:.8rem}.condition-edit{grid-template-columns:1fr 1fr auto;align-items:end}.condition-actions,.edge-actions{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.add{justify-self:start}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}.edge-list{display:grid;gap:7px}.edge-item{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;background:var(--secondary-background-color);border:1px solid transparent}.edge-item.blocked{border-color:var(--error-color,#db4437)}.edge-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem;flex:none}.edge-copy{display:grid;gap:2px;min-width:0;flex:1}.edge-copy small{color:var(--secondary-text-color)}.status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-edge{stroke:var(--primary-color,#03a9f4);stroke-width:4;stroke-opacity:.72}.graph-edge.conditional{stroke-dasharray:9 7}.graph-edge.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.graph-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.graph-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.graph-node.blocked{stroke:var(--error-color,#db4437)}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;gap:6px;align-items:center}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--primary-color,#03a9f4)}.legend .line.conditional{border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:600px){.selectors,.condition-fields,.condition-edit{grid-template-columns:1fr}.edge-item{align-items:flex-start}.edge-actions{flex-direction:column}}
  `;
pe([
  A({ attribute: !1 })
], ne.prototype, "config", 2);
pe([
  A({ attribute: !1 })
], ne.prototype, "hass", 2);
pe([
  v()
], ne.prototype, "fromKey", 2);
pe([
  v()
], ne.prototype, "toKey", 2);
pe([
  v()
], ne.prototype, "conditionEntity", 2);
pe([
  v()
], ne.prototype, "conditionStates", 2);
pe([
  v()
], ne.prototype, "editingConditionIndex", 2);
pe([
  v()
], ne.prototype, "editingEntity", 2);
pe([
  v()
], ne.prototype, "editingStates", 2);
ne = pe([
  z("ha-explorer-route-graph-editor")
], ne);
var ys = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, ut = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? vs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ys(t, i, o), o;
};
const oe = 1e3;
let Re = class extends j {
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
      return e.kind === "room" ? ke(this.config, e.id) : this.routeNodes.find((t) => t.id === e.id)?.point;
  }
  entityState(e) {
    return this.hass?.states[e]?.state;
  }
  edgeStatuses() {
    return this.config ? pt(
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
      return mi(
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
      const r = this.endpointPoint(t.from), o = this.endpointPoint(t.to);
      if (!r || !o) return f;
      const n = e[i] ?? this.edgeStatus(i), s = [
        "graph-context",
        n.conditional ? "conditional" : "",
        n.active ? "" : "blocked"
      ].filter(Boolean).join(" ");
      return P`
        <line
          x1=${r[0] * oe}
          y1=${r[1] * oe}
          x2=${o[0] * oe}
          y2=${o[1] * oe}
          class=${s}
          vector-effect="non-scaling-stroke"
        ></line>
      `;
    });
  }
  renderPreviewOverlay(e) {
    if (!e || e.hops.length < 2) return f;
    const t = e.hops.map((i) => `${i.point[0] * oe},${i.point[1] * oe}`).join(" ");
    return P`
      <polyline
        points=${t}
        class=${`preview-line ${e.source}`}
        fill="none"
        vector-effect="non-scaling-stroke"
      ></polyline>
      ${e.hops.map((i, r) => P`
        <g transform=${`translate(${i.point[0] * oe} ${i.point[1] * oe})`}>
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
    const e = Hi(
      this.config,
      (r) => this.entityState(r)
    ), t = e.disconnectedRoomIds.map((r) => {
      const o = ke(this.config, r);
      return o ? P`
        <g transform=${`translate(${o[0] * oe} ${o[1] * oe})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    }), i = e.disconnectedNodeIds.map((r) => {
      const o = this.routeNodes.find((n) => n.id === r);
      return o ? P`
        <g transform=${`translate(${o.point[0] * oe} ${o.point[1] * oe})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    });
    return P`${t}${i}`;
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
    const e = Hi(
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
Re.styles = O`
    :host{display:block}.diagnostics{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.route-result{display:grid;gap:8px;padding:12px;border:1px solid var(--divider-color);border-radius:11px}.route-result.manual{border-left:5px solid var(--warning-color,#ff9800)}.route-result.graph{border-left:5px solid var(--primary-color,#03a9f4)}.route-result.fallback{border-left:5px solid var(--secondary-text-color)}.route-result-top{display:flex;justify-content:space-between;gap:12px;align-items:center}.route-result-top span{color:var(--secondary-text-color);font-size:.82rem}.route-result p{margin:0;color:var(--secondary-text-color);font-size:.88rem;line-height:1.4}.hop-list{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:.82rem}.hop-list span{display:flex;gap:6px;align-items:center}.hop-list b{padding:4px 7px;border-radius:999px;background:var(--secondary-background-color)}.hop-list i{font-style:normal;color:var(--secondary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-context{stroke:var(--secondary-text-color);stroke-width:3;stroke-opacity:.28}.graph-context.conditional{stroke-dasharray:8 8;stroke:var(--primary-color,#03a9f4);stroke-opacity:.5}.graph-context.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.preview-line{stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.preview-line.manual{stroke:var(--warning-color,#ff9800)}.preview-line.graph{stroke:var(--primary-color,#03a9f4)}.preview-line.fallback{stroke:var(--secondary-text-color);stroke-dasharray:16 10}.preview-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.preview-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.preview-point{fill:white;stroke:var(--warning-color,#ff9800);stroke-width:5}.preview-number{font-size:22px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6}.disconnected{fill:var(--error-color,#db4437);fill-opacity:.18;stroke:var(--error-color,#db4437);stroke-width:4;stroke-dasharray:5 4}.warning-mark{font-size:24px;font-weight:900;fill:var(--error-color,#db4437)}.diagnostic-heading{display:grid;gap:2px}.diagnostic-heading span{color:var(--secondary-text-color);font-size:.8rem}.diagnostic-summary,.live-summary{display:grid;gap:3px;padding:11px 12px;border-radius:10px;border:1px solid var(--divider-color)}.diagnostic-summary span,.live-summary span{color:var(--secondary-text-color);font-size:.84rem}.diagnostic-summary.ok,.live-summary.ok{border-left:5px solid var(--success-color,#4caf50)}.diagnostic-summary.warning{border-left:5px solid var(--warning-color,#ff9800)}.diagnostic-summary.neutral{border-left:5px solid var(--secondary-text-color)}.live-summary.blocked{border-left:5px solid var(--error-color,#db4437)}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.metric-grid div{display:grid;gap:2px;padding:10px;border-radius:9px;background:var(--secondary-background-color)}.metric-grid strong{font-size:1.15rem}.metric-grid span{color:var(--secondary-text-color);font-size:.75rem}.issue{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(255,152,0,.1);border:1px solid rgba(255,152,0,.3)}.issue span{color:var(--secondary-text-color);font-size:.82rem;line-height:1.4}.blocked-list{display:grid;gap:7px}.blocked-item{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(219,68,55,.08);border:1px solid rgba(219,68,55,.25)}.blocked-item span,.blocked-item small{color:var(--secondary-text-color);font-size:.8rem}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;align-items:center;gap:6px}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--secondary-text-color)}.legend .line.conditional{border-top-color:var(--primary-color,#03a9f4);border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:760px){.metric-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.selectors{grid-template-columns:1fr}.route-result-top{align-items:flex-start;flex-direction:column}}
  `;
ut([
  A({ attribute: !1 })
], Re.prototype, "config", 2);
ut([
  A({ attribute: !1 })
], Re.prototype, "hass", 2);
ut([
  v()
], Re.prototype, "fromRoom", 2);
ut([
  v()
], Re.prototype, "toRoom", 2);
Re = ut([
  z("ha-explorer-route-diagnostics")
], Re);
var xs = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, xi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ws(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && xs(t, i, o), o;
};
const $s = { basic: 0, rooms: 1, presences: 2 };
let oi = class extends L {
  updated(e) {
    super.updated(e), e.has("config") && this.config && this.setConfig(this.config);
  }
  render() {
    return this.renderRoomDrawingEditor();
  }
};
xi([
  A({ attribute: !1 })
], oi.prototype, "config", 2);
oi = xi([
  z("ha-explorer-room-tools")
], oi);
let ni = class extends de {
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
    const i = $s[t];
    let r;
    if (i !== void 0) {
      const o = this.baseSections[i];
      o && (o.open = !0, r = o);
    } else {
      const o = this.renderRoot.querySelector(`details[data-editor-section="${t}"]`);
      o && (o.open = !0, r = o);
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
      ${this.renderAdvancedSection("presences", "Movement History 2.0", "1–5 min. historik og udtoning", h`<ha-explorer-movement-history-editor .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-movement-history-editor>`)}
      ${this.renderAdvancedSection("presences", "Pet & Robot Trails 2.0", "Poter, ruter og retning", h`<ha-explorer-pet-robot-trails-editor .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-pet-robot-trails-editor>`)}
      ${this.renderAdvancedSection("presences", "Shelly Pet Detection", "Kanin via Presence Gen4", h`<ha-explorer-shelly-pet-editor .hass=${this.hass} .config=${e} @config-changed=${this.handleToolConfigChanged}></ha-explorer-shelly-pet-editor>`)}
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
ni.styles = O`${de.styles}:host{overflow-anchor:none}.setup-section,.advanced-section{scroll-margin-top:16px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden;background:var(--card-background-color);transition:border-color 180ms ease,box-shadow 180ms ease}.setup-section{margin-bottom:12px}.setup-section>summary,.advanced-section>summary{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:54px;padding:12px 14px;cursor:pointer;font-weight:700}.setup-section>summary::-webkit-details-marker,.advanced-section>summary::-webkit-details-marker{display:none}.setup-section>summary::after,.advanced-section>summary::after{content:"⌄";margin-left:4px;color:var(--secondary-text-color);transition:transform 160ms ease}.setup-section[open]>summary::after,.advanced-section[open]>summary::after{transform:rotate(180deg)}.setup-content{padding:0 10px 10px;overflow-anchor:none}.setup-content>*{margin-top:0}.item-card:not(.item-open)>:not(.item-heading){display:none!important}.item-heading{cursor:pointer;user-select:none}.item-heading::after{content:"⌄";flex:none;color:var(--secondary-text-color);transition:transform 160ms ease}.item-card.item-open .item-heading::after{transform:rotate(180deg)}.advanced-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:16px 2px 8px;color:var(--secondary-text-color)}.advanced-heading>div{display:grid;gap:2px}.advanced-heading span{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}.advanced-heading strong{color:var(--primary-text-color);font-size:.92rem}.advanced-heading small{font-size:.75rem}.advanced-tools{display:grid;gap:9px;padding-bottom:8px}.advanced-hint{margin-left:auto;color:var(--secondary-text-color);font-size:.75rem;font-weight:500;text-align:right}.advanced-content{padding:0 10px 10px;overflow-anchor:none}.advanced-content>*{margin-top:0}.ux-focus{border-color:var(--primary-color,#03a9f4)!important;box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color,#03a9f4) 18%,transparent)}@media(max-width:600px){.advanced-heading{align-items:flex-start;flex-direction:column}.setup-section>summary,.advanced-section>summary{align-items:center;min-height:74px}.advanced-section>summary>span:first-child{flex:1;min-width:0}.advanced-hint{flex:0 0 48%;max-width:48%}}`;
ni = xi([
  z("ha-explorer-ha-editor")
], ni);
function or(e) {
  return Math.min(1, Math.max(0, e));
}
function Mr(e) {
  return e.trim().toLocaleLowerCase().replace(/[\s_-]+/g, " ");
}
function ti(e, t) {
  if (t.length < 3) return !1;
  let i = !1;
  const [r, o] = e;
  for (let n = 0, s = t.length - 1; n < t.length; s = n++) {
    const [a, l] = t[n], [c, d] = t[s];
    l > o != d > o && r < (c - a) * (o - l) / (d - l || Number.EPSILON) + a && (i = !i);
  }
  return i;
}
function ks(e) {
  if (!e.length) return [0.5, 0.5];
  const [t, i] = e.reduce(
    ([r, o], [n, s]) => [r + n, o + s],
    [0, 0]
  );
  return [t / e.length, i / e.length];
}
function _s(e) {
  if (e.length < 3) return;
  let t = 0, i = 0, r = 0;
  for (let o = 0; o < e.length; o += 1) {
    const [n, s] = e[o], [a, l] = e[(o + 1) % e.length], c = n * l - a * s;
    t += c, i += (n + a) * c, r += (s + l) * c;
  }
  if (!(Math.abs(t) < Number.EPSILON))
    return [i / (3 * t), r / (3 * t)];
}
function je(e) {
  return { x: or(e.x), y: or(e.y) };
}
function As(e) {
  return [e.id, e.area_id, e.name, ...e.aliases ?? []].filter((t) => typeof t == "string" && t.trim().length > 0).map(Mr);
}
function Pr(e, t) {
  if (!t?.trim()) return;
  const i = Mr(t);
  return e.find((r) => As(r).includes(i));
}
function Ss(e) {
  if (e.presence_anchor) return je(e.presence_anchor);
  if (e.label) return je(e.label);
  const t = _s(e.points);
  if (t && ti(t, e.points))
    return je({ x: t[0], y: t[1] });
  const i = ks(e.points);
  if (ti(i, e.points))
    return je({ x: i[0], y: i[1] });
  if (e.points.length) {
    const r = e.points.map(([s]) => s), o = e.points.map(([, s]) => s), n = [
      (Math.min(...r) + Math.max(...r)) / 2,
      (Math.min(...o) + Math.max(...o)) / 2
    ];
    return ti(n, e.points) ? je({ x: n[0], y: n[1] }) : je({ x: e.points[0][0], y: e.points[0][1] });
  }
  return { x: 0.5, y: 0.5 };
}
const si = /* @__PURE__ */ new Map();
function Rt(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function nr(e, t) {
  return Math.max(1, Math.round(Rt(e) ?? t));
}
function Cs(e) {
  const t = Math.max(0.05, Rt(e.max_height_m) ?? 0.75);
  return {
    heightAttribute: e.height_attribute?.trim() || "maxz",
    targetIdAttribute: e.target_id_attribute?.trim() || "target_id",
    timestampAttribute: e.timestamp_attribute?.trim() || "timestamp",
    maxHeight: t,
    releaseHeight: Math.max(t + 0.05, Rt(e.release_height_m) ?? t + 0.2),
    confirmationUpdates: nr(e.confirmation_updates, 3),
    releaseUpdates: nr(e.release_updates, 2)
  };
}
function Es() {
  si.clear();
}
function Ms(e, t) {
  const i = e.shelly_pet_detection;
  if (!i?.enabled || !t) return e;
  const r = Cs(i), o = Rt(t.attributes[r.heightAttribute]);
  if (o === void 0) return { ...e, visible: !1 };
  const n = t.attributes[r.targetIdAttribute], s = n === void 0 ? t.entity_id : String(n), a = t.attributes[r.timestampAttribute], l = a === void 0 ? `${s}:${o}:${t.attributes.x ?? ""}:${t.attributes.y ?? ""}` : `${s}:${String(a)}`;
  let c = si.get(e.id);
  return (!c || c.targetId !== s) && (c = { targetId: s, low: 0, high: 0, confirmed: !1 }, si.set(e.id, c)), c.lastSample === l ? { ...e, type: "pet", visible: e.visible !== !1 && c.confirmed } : (c.lastSample = l, o <= r.maxHeight ? (c.low += 1, c.high = 0, c.low >= r.confirmationUpdates && (c.confirmed = !0)) : o >= r.releaseHeight ? (c.high += 1, c.low = 0, c.high >= r.releaseUpdates && (c.confirmed = !1)) : (c.low = 0, c.high = 0), { ...e, type: "pet", visible: e.visible !== !1 && c.confirmed });
}
const Ps = ["unknown", "unavailable", "not_detected"], Ns = /* @__PURE__ */ new Set(["", "unknown", "unavailable", "none", "null"]);
function te(e, t) {
  return e && t ? e.attributes[t] : void 0;
}
function ge(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function we(e, t) {
  const i = ge(e);
  return i === void 0 ? t : Math.min(1, Math.max(0, i));
}
function Rs(e, t) {
  if (typeof e == "boolean") return e;
  if (typeof e == "number") return e !== 0;
  if (typeof e == "string") {
    const i = e.trim().toLowerCase();
    if (["true", "on", "yes", "1", "home"].includes(i)) return !0;
    if (["false", "off", "no", "0", "not_home"].includes(i)) return !1;
  }
  return t;
}
function yt(e, t) {
  return typeof e == "string" && e.trim() ? e : t;
}
function sr(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return Ns.has(t.toLowerCase()) ? void 0 : t;
}
function zs(e, t, i) {
  if (e.room_entity) {
    const r = i.states[e.room_entity];
    return r ? sr(e.room_attribute ? te(r, e.room_attribute) : r.state) : void 0;
  }
  if (t)
    return sr(te(t, e.room_attribute ?? "explorer_room"));
}
function Ts(e) {
  if (!e.points.length) return;
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function ar(e, t, i, r, o, n) {
  const s = i - t;
  return Math.abs(s) < 1e-6 ? n : r + (e - t) / s * (o - r);
}
function lr(e, t, i, r, o, n, s) {
  const a = i.sensor_x * (r.sensor_y - o.sensor_y) + r.sensor_x * (o.sensor_y - i.sensor_y) + o.sensor_x * (i.sensor_y - r.sensor_y);
  if (Math.abs(a) < 1e-6) return s;
  const l = i[n], c = r[n], d = o[n], p = (l * (r.sensor_y - o.sensor_y) + c * (o.sensor_y - i.sensor_y) + d * (i.sensor_y - r.sensor_y)) / a, u = (l * (o.sensor_x - r.sensor_x) + c * (i.sensor_x - o.sensor_x) + d * (r.sensor_x - i.sensor_x)) / a, g = (l * (r.sensor_x * o.sensor_y - o.sensor_x * r.sensor_y) + c * (o.sensor_x * i.sensor_y - i.sensor_x * o.sensor_y) + d * (i.sensor_x * r.sensor_y - r.sensor_x * i.sensor_y)) / a;
  return p * e + u * t + g;
}
function Os(e, t, i) {
  const r = e.physical_meters, o = ge(r?.width), n = ge(r?.height), s = Ts(e);
  if (!o || !n || o <= 0 || n <= 0 || !s) return {};
  const a = r?.flip_x ? o - t : t, l = r?.flip_y ? n - i : i;
  let c = Math.min(1, Math.max(0, a / o)), d = Math.min(1, Math.max(0, l / n));
  const p = r?.position_calibration;
  return p?.c ? (c = lr(a, l, p.a, p.b, p.c, "room_x", c), d = lr(a, l, p.a, p.b, p.c, "room_y", d)) : p && (c = ar(a, p.a.sensor_x, p.b.sensor_x, p.a.room_x, p.b.room_x, c), d = ar(l, p.a.sensor_y, p.b.sensor_y, p.a.room_y, p.b.room_y, d)), c = Math.min(1, Math.max(0, c)), d = Math.min(1, Math.max(0, d)), { x: s.minX + c * (s.maxX - s.minX), y: s.minY + d * (s.maxY - s.minY) };
}
function vt(e, t, i) {
  const r = Pr(t, i ?? e.room_id);
  if (r) {
    const s = Ss(r);
    return { ...e, x: s.x, y: s.y, room_id: r.id };
  }
  const o = we(e.x), n = we(e.y);
  return o === void 0 || n === void 0 ? { ...e, x: o, y: n, visible: !1 } : { ...e, x: o, y: n };
}
function Is(e, t, i, r, o, n) {
  if (!i) return { x: we(e.x), y: we(e.y) };
  const s = t.coordinate_space === "meters" || t.coordinate_space === "room_meters", a = t.x_attribute ?? (s ? "map_x" : "explorer_x"), l = t.y_attribute ?? (s ? "map_y" : "explorer_y");
  if (t.coordinate_space === "room_meters") {
    const c = ge(te(i, a)), d = ge(te(i, l)), p = Pr(r, o ?? e.room_id);
    return c === void 0 || d === void 0 || !p ? {} : { ...Os(p, c, d), roomId: p.id };
  }
  if (t.coordinate_space === "meters") {
    const c = ge(te(i, a)), d = ge(te(i, l)), p = ge(n?.width), u = ge(n?.height);
    return c === void 0 || d === void 0 || !p || !u || p <= 0 || u <= 0 ? {} : { x: we(c / p), y: we(d / u) };
  }
  return { x: we(te(i, a), e.x), y: we(te(i, l), e.y) };
}
function Ds(e, t, i = [], r) {
  const o = e.entity_binding;
  if (!o || !t) return vt(e, i);
  const n = o.entity ? t.states[o.entity] : void 0, s = o.position_entity ?? o.entity, a = s ? t.states[s] : void 0;
  if (o.entity && !n) return { ...vt(e, i), visible: !1 };
  if (o.position_entity && !a) return { ...vt(e, i), visible: !1 };
  const l = o.hidden_states ?? Ps, c = n ? l.includes(n.state) : !1, d = a && a !== n ? l.includes(a.state) : !1, p = te(n, o.visible_attribute), u = c || d ? !1 : Rs(p, e.visible ?? !0), g = zs(o, n, t) ?? e.room_id, b = Is(e, o, a, i, g, r), m = { ...e, x: b.x, y: b.y, room_id: b.roomId ?? e.room_id, name: e.name ?? yt(te(n, o.name_attribute ?? "friendly_name")), avatar: e.avatar ?? yt(te(n, o.avatar_attribute ?? "entity_picture")), icon: e.icon ?? (o.icon_attribute ? yt(te(n, o.icon_attribute)) : void 0), color: e.color ?? yt(te(n, o.color_attribute ?? "explorer_color")), visible: u }, y = o.coordinate_space === "room_meters" ? m.x === void 0 || m.y === void 0 ? { ...m, visible: !1 } : m : vt(m, i, g);
  return Ms(y, a);
}
function js(e, t, i = [], r) {
  return e.map((o) => Ds(o, t, i, r));
}
const Be = /* @__PURE__ */ new Map(), Ls = 0.22, qs = 0.16, Bs = 3e4, Hs = 0.025, Fs = 0.018;
function zt(e) {
  return Number.isFinite(e.x) && Number.isFinite(e.y) ? { x: e.x, y: e.y } : void 0;
}
function ai(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function qe(e) {
  return e.entity_binding?.entity ?? e.id;
}
function et(e) {
  return e.entity_binding?.position_entity;
}
function Nr(e) {
  return e.previous ? { x: e.point.x + (e.point.x - e.previous.x), y: e.point.y + (e.point.y - e.previous.y) } : e.point;
}
function Vs(e, t) {
  const i = zt(t), r = ai(e.point, i), o = ai(Nr(e), i), n = e.target && e.target === et(t) ? Hs : 0;
  return { candidate: t, distance: r, score: Math.min(r, o * 0.82) - n };
}
function cr(e, t, i) {
  const r = qe(e), o = zt(t);
  if (!o) return;
  const n = Be.get(r);
  Be.set(r, { point: o, previous: n?.point, target: et(t), seenAt: i });
}
function Ks(e, t = Date.now()) {
  for (const [a, l] of Be) t - l.seenAt > Bs && Be.delete(a);
  const i = e.filter((a) => (a.type ?? "person") === "person" && a.visible !== !1 && zt(a) && et(a)), r = new Set(i), o = e.filter((a) => !r.has(a)), n = /* @__PURE__ */ new Map();
  for (const a of i) {
    const l = a.room_id ?? "__no_room__", c = n.get(l) ?? [];
    c.push(a), n.set(l, c);
  }
  const s = [];
  for (const a of n.values()) {
    if (a.length < 2) {
      for (const g of a)
        s.push(g), cr(g, g, t);
      continue;
    }
    const l = [...a], c = [...a].sort((g, b) => qe(g).localeCompare(qe(b))), d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set(), u = c.map((g) => {
      const b = Be.get(qe(g));
      if (!b) return { identity: g, track: void 0, scores: [] };
      const m = l.map((y) => Vs(b, y)).sort((y, _) => y.score - _.score);
      return { identity: g, track: b, scores: m };
    }).sort((g, b) => (g.scores[0]?.score ?? 1 / 0) - (b.scores[0]?.score ?? 1 / 0));
    for (const g of u) {
      const { identity: b, track: m } = g;
      if (!m) continue;
      const y = g.scores.filter((C) => !p.has(C.candidate));
      if (!y.length) continue;
      const _ = y[0], $ = y[1], w = _.distance <= Ls || ai(Nr(m), zt(_.candidate)) <= qs, S = !!$ && $.score - _.score < Fs;
      w && !S && (d.set(qe(b), _.candidate), p.add(_.candidate));
    }
    for (const g of c) {
      const b = qe(g);
      let m = d.get(b);
      if (m || (m = l.find((_) => !p.has(_) && et(_) === et(g)), m && p.add(m)), m || (m = l.find((_) => !p.has(_)), m && p.add(m)), !m) {
        s.push(g);
        continue;
      }
      const y = { ...g, x: m.x, y: m.y, room_id: m.room_id, visible: m.visible };
      s.push(y), cr(g, m, t);
    }
  }
  return [...s, ...o];
}
function Zs() {
  Be.clear();
}
var Gs = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, Dt = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ws(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Gs(t, i, o), o;
};
const Rr = "0.44.5";
let Ge = class extends j {
  constructor() {
    super(...arguments), this.preview = !1;
  }
  static getConfigElement() {
    return document.createElement("ha-explorer-ha-editor");
  }
  static getStubConfig() {
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
        hide_source_text: !1,
        day_night: {
          enabled: !1,
          mode: "auto",
          sun_entity: "sun.sun",
          night_states: ["below_horizon"],
          intensity: 0.72
        },
        compass: { visible: !0, rotation: -7, size: 1 },
        alarm: {
          enabled: !1,
          entity: "",
          armed_states: [
            "armed_away",
            "armed_home",
            "armed_night",
            "armed_vacation",
            "armed_custom_bypass"
          ],
          triggered_states: ["triggered"],
          intensity: 0.75
        },
        occupancy: { enabled: !1, home_states: ["home"], intensity: 0.65 },
        weather: {
          enabled: !1,
          entity: "weather.home",
          intensity: 0.6,
          rain_states: ["rainy", "pouring"],
          storm_states: ["lightning", "lightning-rainy"],
          snow_states: ["snowy", "snowy-rainy", "hail"],
          fog_states: ["fog"],
          cloudy_states: ["cloudy", "partlycloudy"],
          wind_states: ["windy", "windy-variant"],
          exceptional_states: ["exceptional"]
        }
      },
      rooms: [
        {
          id: "stue",
          name: "Stue",
          points: [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1]
          ],
          label: { x: 0.5, y: 0.5 },
          physical_meters: { width: 4.3, height: 5.4 }
        }
      ],
      zones: [],
      route_nodes: [],
      route_graph_edges: [],
      routes: [],
      openings: [],
      presences: [],
      movement_history: { enabled: !1, duration_minutes: 3, show_rooms: !0 },
      pet_robot_trails: { enabled: !1, duration_minutes: 3, show_pet_paws: !0, show_robot_route: !0, robot_direction_arrows: !0 }
    };
  }
  setConfig(e) {
    if (!e) throw new Error("Configuration is required");
    Zs(), Es(), this.config = {
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
      movement_history: { enabled: !1, duration_minutes: 3, show_rooms: !0 },
      pet_robot_trails: { enabled: !1, duration_minutes: 3, show_pet_paws: !0, show_robot_route: !0, robot_direction_arrows: !0 },
      ...e,
      appearance: { theme: "classic", ...e.appearance ?? {} }
    };
  }
  getCardSize() {
    return 6;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  defaultRoom() {
    return (this.config?.rooms?.length ?? 0) > 0 ? this.config?.rooms ?? [] : this.config?.floorplan_meters ? [
      {
        id: "room",
        name: this.config.title ?? "Rum",
        points: [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1]
        ],
        label: { x: 0.5, y: 0.5 },
        physical_meters: this.config.floorplan_meters
      }
    ] : [];
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
    const t = e.preview_state?.trim().toLowerCase();
    if (this.preview && t && t !== "live")
      return t;
    const i = e.entity?.trim();
    return i && this.hass?.states[i]?.state?.trim().toLowerCase() || "clear";
  }
  weatherEffect(e = this.weatherState()) {
    const t = this.config?.appearance?.weather;
    if (!t?.enabled) return "clear";
    const i = (r, o) => new Set((r ?? o).map((n) => n.trim().toLowerCase())).has(
      e
    );
    return i(t.exceptional_states, ["exceptional"]) ? "exceptional" : i(t.storm_states, ["lightning", "lightning-rainy"]) ? "storm" : i(t.snow_states, ["snowy", "snowy-rainy", "hail"]) ? "snow" : i(t.rain_states, ["rainy", "pouring"]) ? "rain" : i(t.fog_states, ["fog"]) ? "fog" : i(t.wind_states, ["windy", "windy-variant"]) ? "wind" : e === "cloudy" || e === "partlycloudy" || i(t.cloudy_states, ["cloudy", "partlycloudy"]) ? "cloudy" : "clear";
  }
  alarmState() {
    const e = this.config?.appearance?.alarm;
    if (!e?.enabled) return "normal";
    const t = e.entity?.trim();
    if (!t) return "normal";
    const i = this.hass?.states[t]?.state?.toLowerCase();
    return i ? (e.triggered_states ?? ["triggered"]).map(
      (n) => n.toLowerCase()
    ).includes(i) ? "triggered" : (e.armed_states ?? [
      "armed_away",
      "armed_home",
      "armed_night",
      "armed_vacation",
      "armed_custom_bypass"
    ]).map((n) => n.toLowerCase()).includes(i) ? "armed" : "normal" : "normal";
  }
  someoneHome(e) {
    const t = this.config?.appearance?.occupancy;
    if (!t?.enabled) return !1;
    const i = (t.home_states ?? ["home"]).map((r) => r.trim().toLowerCase()).filter(Boolean);
    return (this.config?.presences ?? []).filter((r) => (r.type ?? "person") === "person" && r.visible !== !1).some((r) => {
      const n = r.entity_binding?.entity?.trim();
      if (n) {
        const a = this.hass?.states[n]?.state?.toLowerCase();
        if (a && i.includes(a)) return !0;
        if (a && ["not_home", "unknown", "unavailable"].includes(a))
          return !1;
      }
      return !!e.find((a) => a.id === r.id)?.room_id;
    });
  }
  renderClouds() {
    const e = (t, i) => h`<svg
        class=${`cloud ${t} cloud-v${i}`}
        viewBox="0 0 300 160"
        aria-hidden="true"
      >
        <defs>
          <filter
            id=${`cloud-soft-${t}`}
            x="-30%"
            y="-40%"
            width="160%"
            height="190%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency=${i === 1 ? "0.025" : i === 2 ? "0.032" : "0.021"}
              numOctaves="2"
              seed=${String(i * 17)}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale=${i === 2 ? "9" : "12"}
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
            <feGaussianBlur
              in="distorted"
              stdDeviation=${i === 3 ? "2.8" : "2.1"}
            />
          </filter>
        </defs>
        <g class="cloud-haze" filter=${`url(#cloud-soft-${t})`}>
          <ellipse cx="150" cy="101" rx="124" ry="43" />
          <circle cx="62" cy="92" r="36" />
          <circle cx="94" cy="69" r="47" />
          <circle cx="132" cy="60" r="55" />
          <circle cx="174" cy="67" r="48" />
          <circle cx="214" cy="83" r="41" />
          <circle cx="248" cy="100" r="30" />
        </g>
        <g class="cloud-core" filter=${`url(#cloud-soft-${t})`}>
          <ellipse cx="148" cy="105" rx="110" ry="33" />
          <circle cx="82" cy="88" r="33" />
          <circle cx="112" cy="70" r="41" />
          <circle cx="147" cy="66" r="48" />
          <circle cx="182" cy="75" r="40" />
          <circle cx="218" cy="92" r="32" />
        </g>
      </svg>`;
    return h`<div class="cloud-field" aria-hidden="true">
      ${e("cloud-a", 1)}${e("cloud-b", 2)}${e("cloud-c", 3)}${e(
      "cloud-d",
      1
    )}${e("cloud-e", 2)}${e("cloud-f", 3)}${e(
      "cloud-g",
      2
    )}${e("cloud-h", 1)}${e("cloud-i", 3)}${e(
      "cloud-j",
      2
    )}${e("cloud-k", 1)}${e("cloud-l", 3)}${e(
      "cloud-m",
      2
    )}${e("cloud-n", 1)}${e("cloud-o", 3)}${e(
      "cloud-p",
      2
    )}${e("cloud-q", 1)}${e("cloud-r", 3)}
    </div>`;
  }
  renderCelestialCloud() {
    return h`<div class="celestial-cloud" aria-hidden="true"></div>`;
  }
  renderCastleSurround() {
    const e = (t) => h`<svg
      class=${`enchanted-castle-side enchanted-castle-${t}`}
      viewBox="0 0 560 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <filter id=${`castle-soft-mist-${t}`} x="-30%" y="-250%" width="160%" height="600%">
          <feGaussianBlur stdDeviation="14"></feGaussianBlur>
        </filter>
      </defs>
      <g class="castle-cloud-bank">
        <path d="M-80 232C21 163 102 209 158 174s143-45 215 5 135 11 240-24"></path>
        <path d="M-92 310C12 262 83 290 151 254s151-24 222 18 136 17 235-13"></path>
      </g>
      ${t === "left" ? P`
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
          ` : P`
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
        <path class="moon-reflection" d=${t === "left" ? "M112 798c-17 23-25 50-12 96m31-96c11 31 5 61-4 96" : "M455 802c-12 27-17 57-6 91m24-91c8 32 2 60-8 91"}></path>
      </g>
      <g class="castle-water-ripples">
        <path d="M8 824h126m-74 22h154m-99 25h176m35-46h153m-112 25h185m-80 26h112"></path>
      </g>
      <path class="castle-mist castle-mist-back" d="M-45 690C77 655 163 711 267 682s196-6 338-15" filter=${`url(#castle-soft-mist-${t})`}></path>
      <path class="castle-mist" d="M-45 754C73 715 170 776 279 742s205-9 329-24" filter=${`url(#castle-soft-mist-${t})`}></path>
    </svg>`;
    return h`<div class="enchanted-castle-surround" aria-hidden="true">
      ${e("left")}${e("right")}
    </div>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.defaultRoom(), i = js(
      this.config.presences ?? [],
      this.hass,
      t,
      this.config.floorplan_meters
    ), r = Ks(i), o = this.config.appearance?.theme ?? "classic", n = o === "enchanted_antique", s = this.isNight(), a = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.day_night?.intensity ?? 0.72)
    ), l = this.config.appearance?.compass ?? {}, c = this.config.appearance?.hide_source_text ?? !1, d = this.alarmState(), p = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.alarm?.intensity ?? 0.75)
    ), u = this.config.appearance?.occupancy?.enabled ?? !1, g = this.someoneHome(r), b = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.occupancy?.intensity ?? 0.65)
    ), m = this.config.appearance?.weather?.enabled ?? !1, y = this.weatherState(), _ = s || y === "clear-night", $ = this.weatherEffect(y), w = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.weather?.intensity ?? 0.6)
    ), S = m && [
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
      "exceptional"
    ].includes(y), C = m && !_ && ["sunny", "clear", "partlycloudy"].includes(y), k = y === "partlycloudy";
    return h`${this.renderCastleSurround()}<ha-card
      class=${`${n ? "enchanted" : "classic"}${_ ? " moonlight" : ""}${C ? " sunlight" : ""}${k ? " partly-cloudy" : ""}${S ? " has-clouds" : ""}${u ? g ? " occupied" : " empty-house" : ""}${m && $ !== "clear" ? ` weather-${$}` : ""}${m ? ` state-${y}` : ""}${d === "armed" ? " alarm-armed" : ""}${d === "triggered" ? " alarm-triggered" : ""}${this.preview ? " preview" : ""}`}
      style=${`--moon-intensity:${a};--alarm-intensity:${p};--occupancy-intensity:${b};--weather-intensity:${w}`}
      ><header>
        <div>
          <span
            >${d === "triggered" ? "⚠ Alarm Triggered" : d === "armed" ? "✦ Map Secured" : y === "partlycloudy" ? _ ? "☾ Partly Clouded Map" : "☀ Partly Clouded Map" : y === "clear-night" ? "☾ Clear Night Map" : $ === "exceptional" ? "⚠ Exceptional Weather" : $ === "wind" ? "➳ Wind over the Map" : $ === "storm" ? "⛈ Storm over the Map" : $ === "rain" ? "☂ Rain over the Map" : $ === "snow" ? "❄ Snow over the Map" : $ === "fog" ? "◇ Mist over the Map" : $ === "cloudy" ? "☁ Clouded Map" : C ? "☀ Sunlit Map" : u && g ? "✦ Someone is Home" : u ? "◇ Empty House" : _ ? "Moonlight Explorer" : n ? "Enchanted Explorer" : "Explorer map"}</span
          >
          <h1>${this.config.title}</h1>
        </div>
        <small>Enchanted Atmosphere · v${Rr}</small>
      </header>
      <div class="map-stage">
        <div class="weather-flash"></div>
        <div class="sun-overlay"></div>
        <div class="sun-disc"></div>
        <explorer-source-clean-canvas
          .theme=${o}
          .hideSourceText=${c}
          .weatherEffect=${m ? $ : "clear"}
          .weatherState=${y}
          .weatherIntensity=${w}
          .weatherNight=${_}
          .compassVisible=${l.visible ?? !0}
          .compassRotation=${l.rotation ?? -7}
          .compassSize=${l.size ?? 1}
          .hass=${this.hass}
          .image=${e}
          .rooms=${t}
          .zones=${this.config.zones ?? []}
          .routeNodes=${this.config.route_nodes ?? []}
          .routeGraphEdges=${this.config.route_graph_edges ?? []}
          .routes=${this.config.routes ?? []}
          .openings=${this.config.openings ?? []}
          .presences=${r}
          .movementHistory=${this.config.movement_history ?? { enabled: !1, duration_minutes: 3, show_rooms: !0 }}
          .petRobotTrails=${this.config.pet_robot_trails ?? { enabled: !1, duration_minutes: 3, show_pet_paws: !0, show_robot_route: !0, robot_direction_arrows: !0 }}
          .minZoom=${this.config.min_zoom ?? 1}
          .maxZoom=${this.config.max_zoom ?? 6}
          .initialZoom=${this.config.initial_zoom ?? 1}
          .fitMode=${this.config.fit_mode ?? "contain"}
        ></explorer-source-clean-canvas>
        <div class="occupancy-overlay"></div>
        <div class="moon-overlay"></div>
        <div class="moon-disc"><span></span></div>
        ${k ? this.renderCelestialCloud() : f}
        <div class="night-vignette"></div>
        <div class="alarm-overlay"></div>
        <div class="alarm-vignette"></div></div
    ></ha-card>`;
  }
};
Ge.styles = O`
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
Dt([
  A({ attribute: !1 })
], Ge.prototype, "hass", 2);
Dt([
  A({ type: Boolean, attribute: !1 })
], Ge.prototype, "preview", 2);
Dt([
  v()
], Ge.prototype, "config", 2);
Ge = Dt([
  z("ha-explorer-card")
], Ge);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-explorer-card",
  name: "Home Assistant Explorer",
  description: "An interactive SVG floor map for Home Assistant.",
  preview: !0
});
console.info(
  `%c HOME ASSISTANT EXPLORER %c v${Rr} `,
  "color:white;background:#594431;font-weight:700;",
  "color:#594431;background:#d8c39b;font-weight:700;"
);
export {
  Ge as HaExplorerCard
};
//# sourceMappingURL=ha-explorer-card.js.map
