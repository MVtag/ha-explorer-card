const gt = globalThis, Yt = gt.ShadowRoot && (gt.ShadyCSS === void 0 || gt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xt = /* @__PURE__ */ Symbol(), hi = /* @__PURE__ */ new WeakMap();
let Xi = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== Xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Yt && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = hi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && hi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _r = (e) => new Xi(typeof e == "string" ? e : e + "", void 0, Xt), I = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, o, n) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new Xi(i, e, Xt);
}, Ar = (e, t) => {
  if (Yt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), o = gt.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, e.appendChild(r);
  }
}, ui = Yt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return _r(i);
})(e) : e;
const { is: Sr, defineProperty: Cr, getOwnPropertyDescriptor: Er, getOwnPropertyNames: Nr, getOwnPropertySymbols: Pr, getPrototypeOf: Rr } = Object, _t = globalThis, gi = _t.trustedTypes, Mr = gi ? gi.emptyScript : "", zr = _t.reactiveElementPolyfillSupport, Ge = (e, t) => e, ft = { toAttribute(e, t) {
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
} }, Qt = (e, t) => !Sr(e, t), mi = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: Qt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), _t.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Oe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = mi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, r, i);
      o !== void 0 && Cr(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: o, set: n } = Er(this.prototype, t) ?? { get() {
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
      const i = this.properties, r = [...Nr(i), ...Pr(i)];
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
      for (const o of r) i.unshift(ui(o));
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
    const r = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : ft).toAttribute(i, r.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, o = r._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = r.getPropertyOptions(o), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ft;
      this._$Em = o;
      const a = s.fromAttribute(i, n.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, o = !1, n) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (n = this[t]), r ??= s.getPropertyOptions(t), !((r.hasChanged ?? Qt)(n, i) || r.useDefault && r.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, r)))) return;
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
Oe.elementStyles = [], Oe.shadowRootOptions = { mode: "open" }, Oe[Ge("elementProperties")] = /* @__PURE__ */ new Map(), Oe[Ge("finalized")] = /* @__PURE__ */ new Map(), zr?.({ ReactiveElement: Oe }), (_t.reactiveElementVersions ??= []).push("2.1.2");
const Jt = globalThis, fi = (e) => e, bt = Jt.trustedTypes, bi = bt ? bt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Qi = "$lit$", we = `lit$${Math.random().toFixed(9).slice(2)}$`, Ji = "?" + we, Or = `<${Ji}>`, Se = document, We = () => Se.createComment(""), Ye = (e) => e === null || typeof e != "object" && typeof e != "function", ei = Array.isArray, Ir = (e) => ei(e) || typeof e?.[Symbol.iterator] == "function", Et = `[ 	
\f\r]`, Ke = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yi = /-->/g, vi = />/g, ke = RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xi = /'/g, wi = /"/g, er = /^(?:script|style|textarea|title)$/i, tr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = tr(1), E = tr(2), re = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), $i = /* @__PURE__ */ new WeakMap(), Ae = Se.createTreeWalker(Se, 129);
function ir(e, t) {
  if (!ei(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bi !== void 0 ? bi.createHTML(t) : t;
}
const Tr = (e, t) => {
  const i = e.length - 1, r = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Ke;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, c, p = -1, u = 0;
    for (; u < l.length && (s.lastIndex = u, c = s.exec(l), c !== null); ) u = s.lastIndex, s === Ke ? c[1] === "!--" ? s = yi : c[1] !== void 0 ? s = vi : c[2] !== void 0 ? (er.test(c[2]) && (o = RegExp("</" + c[2], "g")), s = ke) : c[3] !== void 0 && (s = ke) : s === ke ? c[0] === ">" ? (s = o ?? Ke, p = -1) : c[1] === void 0 ? p = -2 : (p = s.lastIndex - c[2].length, d = c[1], s = c[3] === void 0 ? ke : c[3] === '"' ? wi : xi) : s === wi || s === xi ? s = ke : s === yi || s === vi ? s = Ke : (s = ke, o = void 0);
    const g = s === ke && e[a + 1].startsWith("/>") ? " " : "";
    n += s === Ke ? l + Or : p >= 0 ? (r.push(d), l.slice(0, p) + Qi + l.slice(p) + we + g) : l + we + (p === -2 ? a : g);
  }
  return [ir(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Xe {
  constructor({ strings: t, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let n = 0, s = 0;
    const a = t.length - 1, l = this.parts, [d, c] = Tr(t, i);
    if (this.el = Xe.createElement(d, r), Ae.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = Ae.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(Qi)) {
          const u = c[s++], g = o.getAttribute(p).split(we), y = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: y[2], strings: g, ctor: y[1] === "." ? Dr : y[1] === "?" ? Lr : y[1] === "@" ? qr : At }), o.removeAttribute(p);
        } else p.startsWith(we) && (l.push({ type: 6, index: n }), o.removeAttribute(p));
        if (er.test(o.tagName)) {
          const p = o.textContent.split(we), u = p.length - 1;
          if (u > 0) {
            o.textContent = bt ? bt.emptyScript : "";
            for (let g = 0; g < u; g++) o.append(p[g], We()), Ae.nextNode(), l.push({ type: 2, index: ++n });
            o.append(p[u], We());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ji) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(we, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += we.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const r = Se.createElement("template");
    return r.innerHTML = t, r;
  }
}
function je(e, t, i = e, r) {
  if (t === re) return t;
  let o = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = Ye(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = o : i._$Cl = o), o !== void 0 && (t = je(e, o._$AS(e, t.values), o, r)), t;
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
    const { el: { content: i }, parts: r } = this._$AD, o = (t?.creationScope ?? Se).importNode(i, !0);
    Ae.currentNode = o;
    let n = Ae.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new ot(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Br(n, this, t)), this._$AV.push(d), l = r[++a];
      }
      s !== l?.index && (n = Ae.nextNode(), s++);
    }
    return Ae.currentNode = Se, o;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class ot {
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
    t = je(this, t, i), Ye(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== re && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ir(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Ye(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Se.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Xe.createElement(ir(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new jr(o, this), s = n.u(this.options);
      n.p(i), this.T(s), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = $i.get(t.strings);
    return i === void 0 && $i.set(t.strings, i = new Xe(t)), i;
  }
  k(t) {
    ei(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, o = 0;
    for (const n of t) o === i.length ? i.push(r = new ot(this.O(We()), this.O(We()), this, this.options)) : r = i[o], r._$AI(n), o++;
    o < i.length && (this._$AR(r && r._$AB.nextSibling, o), i.length = o);
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
class At {
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
    if (n === void 0) t = je(this, t, i, 0), s = !Ye(t) || t !== this._$AH && t !== re, s && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = je(this, a[r + l], i, l), d === re && (d = this._$AH[l]), s ||= !Ye(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Dr extends At {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Lr extends At {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class qr extends At {
  constructor(t, i, r, o, n) {
    super(t, i, r, o, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = je(this, t, i, 0) ?? f) === re) return;
    const r = this._$AH, o = t === f && r !== f || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== f && (r === f || o);
    o && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Br {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    je(this, t);
  }
}
const Fr = Jt.litHtmlPolyfillSupport;
Fr?.(Xe, ot), (Jt.litHtmlVersions ??= []).push("3.3.3");
const Vr = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let o = r._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    r._$litPart$ = o = new ot(t.insertBefore(We(), n), n, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const ti = globalThis;
let L = class extends Oe {
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
    return re;
  }
};
L._$litElement$ = !0, L.finalized = !0, ti.litElementHydrateSupport?.({ LitElement: L });
const Hr = ti.litElementPolyfillSupport;
Hr?.({ LitElement: L });
(ti.litElementVersions ??= []).push("4.2.2");
const z = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Kr = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: Qt }, Gr = (e = Kr, t, i) => {
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
  return (t, i) => typeof i == "object" ? Gr(e, t, i) : ((r, o, n) => {
    const s = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, r), s ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, i);
}
function b(e) {
  return A({ ...e, state: !0, attribute: !1 });
}
const Zr = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function Ur(e, t) {
  return (i, r, o) => {
    const n = (s) => s.renderRoot?.querySelector(e) ?? null;
    return Zr(i, r, { get() {
      return n(this);
    } });
  };
}
const _e = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, rr = (e) => (...t) => ({ _$litDirective$: e, values: t });
class or {
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
class Kt extends or {
  constructor(t) {
    if (super(t), this.it = f, t.type !== _e.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === f || t == null) return this._t = void 0, this.it = t;
    if (t === re) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const i = [t];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
Kt.directiveName = "unsafeHTML", Kt.resultType = 1;
class Gt extends Kt {
}
Gt.directiveName = "unsafeSVG", Gt.resultType = 2;
const Wr = rr(Gt), Yr = {
  light: ["on"],
  motion: ["on"],
  media: ["playing", "on"],
  opening: ["on", "open"],
  temperature: [],
  fireplace: ["on", "heating", "burning", "active"]
}, Xr = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function nr(e) {
  return Math.min(1, Math.max(0, e));
}
function Pe(e) {
  return Math.min(1, Math.max(0, e));
}
function mt(e) {
  return [...Yr[e]];
}
function Qr(e) {
  if (e.kind === "temperature") return [];
  const t = (e.active_states ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : mt(e.kind);
}
function Ze(e, t) {
  const i = t?.position;
  return i && Number.isFinite(i.x) && Number.isFinite(i.y) ? { x: Pe(i.x), y: Pe(i.y) } : e.presence_anchor ? {
    x: Pe(e.presence_anchor.x),
    y: Pe(e.presence_anchor.y)
  } : e.points.length ? {
    x: Pe(e.points.reduce((r, o) => r + o[0], 0) / e.points.length),
    y: Pe(e.points.reduce((r, o) => r + o[1], 0) / e.points.length)
  } : { x: 0.5, y: 0.5 };
}
function Jr(e) {
  const t = e?.brightness;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : nr(t / 255);
}
function ki(e) {
  const t = e.intensity;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : nr(t);
}
function _i(e) {
  const t = e?.unit_of_measurement;
  return typeof t == "string" && t.trim() ? t.trim() : void 0;
}
function sr(e, t, i) {
  const r = e.entity?.trim(), o = Qr(e);
  if (!r)
    return { index: t, reaction: e, active: !1, activeStates: o, intensity: 0, reason: "missing_entity" };
  const n = i?.(r);
  if (!n || Xr.has(n.state.trim().toLowerCase()))
    return { index: t, reaction: e, active: !1, currentState: n?.state, activeStates: o, intensity: 0, reason: "entity_unavailable" };
  if (e.kind === "temperature") {
    const d = Number(n.state);
    return Number.isFinite(d) ? { index: t, reaction: e, active: !0, currentState: n.state, activeStates: o, intensity: 1, numericValue: d, unit: _i(n.attributes) } : { index: t, reaction: e, active: !1, currentState: n.state, activeStates: o, intensity: 0, unit: _i(n.attributes), reason: "state_inactive" };
  }
  const s = n.state.trim().toLowerCase(), a = o.map((d) => d.toLowerCase()).includes(s);
  let l = 0;
  return a && (e.kind === "light" ? l = Jr(n.attributes) * ki(e) : l = ki(e)), {
    index: t,
    reaction: e,
    active: a,
    currentState: n.state,
    activeStates: o,
    intensity: l,
    ...a ? {} : { reason: "state_inactive" }
  };
}
function yt(e, t) {
  return (e.reactions ?? []).map((i, r) => sr(i, r, t));
}
var eo = Object.defineProperty, to = Object.getOwnPropertyDescriptor, Ne = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? to(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && eo(t, i, o), o;
};
function io(e) {
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
const ro = {
  light: "💡",
  motion: "◉",
  media: "▶",
  opening: "↗",
  temperature: "°"
}, oo = {
  light: "Lys",
  motion: "Bevægelse",
  media: "TV / medie",
  opening: "Dør / vindue",
  temperature: "Temperatur"
};
let ge = class extends L {
  constructor() {
    super(...arguments), this.presences = [], this.pendingLights = /* @__PURE__ */ new Set(), this.pendingRoomAction = "", this.actionError = "";
  }
  get statuses() {
    return this.room ? yt(this.room, (e) => {
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
      const n = io(o.avatar);
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
          <span class=${`entity-icon ${i}`}>${ro[i]}</span>
          <span class="entity-copy">
            <strong>${this.entityName(t)}</strong>
            <small>${oo[i]} · ${this.statusText(e)}</small>
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
ge.styles = I`
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
Ne([
  A({ attribute: !1 })
], ge.prototype, "room", 2);
Ne([
  A({ attribute: !1 })
], ge.prototype, "presences", 2);
Ne([
  A({ attribute: !1 })
], ge.prototype, "hass", 2);
Ne([
  b()
], ge.prototype, "pendingLights", 2);
Ne([
  b()
], ge.prototype, "pendingRoomAction", 2);
Ne([
  b()
], ge.prototype, "actionError", 2);
ge = Ne([
  z("explorer-room-panel")
], ge);
const v = 1e3;
function Ai(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function no(e) {
  return `translate(${e.x} ${e.y}) scale(${e.zoom})`;
}
function so(e, t, i, r) {
  const o = t / e.zoom;
  return {
    zoom: t,
    x: i - (i - e.x) * o,
    y: r - (r - e.y) * o
  };
}
var ao = Object.defineProperty, lo = Object.getOwnPropertyDescriptor, K = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? lo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ao(t, i, o), o;
};
const Si = { width: 16, height: 9, status: "idle" }, co = { person: "●", pet: "◆", robot: "■", vehicle: "▰", object: "✦" }, po = "script,foreignObject,iframe,object,embed,link,meta,audio,video,canvas";
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
function ho(e) {
  const t = e.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  return t?.length === 4 && t.every(Number.isFinite) && t[2] > 0 && t[3] > 0 ? { width: t[2], height: t[3] } : { width: Ei(e.getAttribute("width")) ?? 16, height: Ei(e.getAttribute("height")) ?? 9 };
}
function Ni(e) {
  return e.replace(/@import[^;]+;?/gi, "").replace(/url\(([^)]*)\)/gi, (t, i) => {
    const r = i.trim().replace(/^['"]|['"]$/g, "");
    return r.startsWith("#") ? `url(${r})` : "none";
  }).replace(/javascript\s*:/gi, "").replace(/expression\s*\(/gi, "");
}
function uo(e) {
  const t = e.trim();
  return t === "" || t.startsWith("#") || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,/i.test(t);
}
function go(e) {
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
function mo(e) {
  const t = e.querySelector("parsererror"), i = e.documentElement;
  if (t || i.localName.toLowerCase() !== "svg") throw new Error("Filen indeholder ikke gyldig SVG-kode.");
  i.querySelectorAll(po).forEach((o) => o.remove());
  const r = [i, ...Array.from(i.querySelectorAll("*"))];
  for (const o of r)
    for (const n of Array.from(o.attributes)) {
      const s = n.name.toLowerCase(), a = n.value;
      if (s.startsWith("on")) {
        o.removeAttribute(n.name);
        continue;
      }
      if ((s === "href" || s === "xlink:href") && !uo(a)) {
        o.removeAttribute(n.name);
        continue;
      }
      if (s === "style") {
        const l = Ni(a).trim();
        l ? o.setAttribute(n.name, l) : o.removeAttribute(n.name);
      }
    }
  return i.querySelectorAll("style").forEach((o) => {
    const n = Ni(o.textContent ?? "").trim();
    n ? o.textContent = n : o.remove();
  }), i.hasAttribute("xmlns") || i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i;
}
let B = class extends L {
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
    const r = new DOMParser().parseFromString(i, "image/svg+xml"), o = mo(r), n = ho(o);
    o.hasAttribute("viewBox") || o.setAttribute("viewBox", `0 0 ${n.width} ${n.height}`), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("width", String(v)), o.setAttribute("height", String(v)), o.setAttribute("preserveAspectRatio", this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"), o.setAttribute("class", "inline-floorplan");
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
    this.viewport = so(this.viewport, r, t.x, t.y);
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
      const t = e.points.map(([d, c]) => `${d * v},${c * v}`).join(" "), i = e.id === this.selectedRoom?.id, r = e.points.reduce((d, c) => d + c[0], 0) / e.points.length, o = e.points.reduce((d, c) => d + c[1], 0) / e.points.length, n = (e.label?.x ?? r) * v, s = (e.label?.y ?? o) * v, a = e.color ?? "#03a9f4", l = Math.max(76, Math.min(190, (e.name?.length ?? 0) * 15 + 28));
      return E`<g class=${i ? "room selected" : "room"} @pointerdown=${(d) => d.stopPropagation()} @click=${(d) => this.selectRoom(d, e)}><polygon points=${t} fill=${a} fill-opacity=${i ? "0.34" : "0.18"} stroke=${a} stroke-opacity="0.9" stroke-width=${i ? "5" : "3"} vector-effect="non-scaling-stroke"></polygon>${e.name ? E`<rect class="room-label-mask" x=${n - l / 2} y=${s - 18} width=${l} height="36" rx="10"></rect><text class="room-label" x=${n} y=${s} text-anchor="middle" dominant-baseline="middle">${e.name}</text>` : f}</g>`;
    });
  }
  renderPresences() {
    return this.presences.filter((e) => e.visible !== !1).map((e, t) => {
      const i = e.type ?? "person", r = e.id === this.selectedPresence?.id, o = (e.x ?? 0.5) * v, n = (e.y ?? 0.5) * v, s = e.icon ?? co[i], a = go(e.avatar), l = e.color ?? "#03a9f4", d = r ? 31 : 25, c = d * 2, p = `presence-avatar-${t}`, u = r ? 58 : 52;
      return E`<g class=${r ? "presence selected" : "presence"} transform=${`translate(${o} ${n})`} @pointerdown=${(g) => g.stopPropagation()} @click=${(g) => this.selectPresence(g, e)}>${a ? E`<defs><clipPath id=${p}><circle r=${d - 3}></circle></clipPath></defs><circle class="presence-avatar-background" r=${d} fill=${l}></circle><image href=${a} x=${-d + 3} y=${-d + 3} width=${c - 6} height=${c - 6} preserveAspectRatio="xMidYMid slice" clip-path=${`url(#${p})`}></image><circle class="presence-border" r=${d} fill="none" stroke=${l} stroke-width=${r ? "5" : "3"} vector-effect="non-scaling-stroke"></circle>` : E`<circle class="presence-marker" r=${d} fill=${l} fill-opacity=${r ? "1" : ".88"}></circle><text class="presence-icon" text-anchor="middle" dominant-baseline="middle">${s}</text>`}<text class="presence-label" y=${u} text-anchor="middle">${e.name ?? e.id}</text></g>`;
    });
  }
  render() {
    const e = no(this.viewport);
    return h`<div class="viewport"><svg class="floorplan" viewBox="0 0 ${v} ${v}" @wheel=${this.handleWheel} @pointerdown=${this.handlePointerDown} @pointermove=${this.handlePointerMove} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerUp} @click=${() => {
      this.selectedRoom = void 0, this.selectedPresence = void 0;
    }}><rect class="backdrop" width=${v} height=${v}></rect><g class="scene" transform=${e}>${this.svgMarkup ? E`<g class="floorplan-source inline-source">${Wr(this.svgMarkup)}</g>` : this.imageSource ? E`<image class="floorplan-source" href=${this.imageSource} x="0" y="0" width=${v} height=${v} preserveAspectRatio=${this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>` : f}<g class="rooms-scene">${this.renderRooms()}</g><g class="presences-scene">${this.renderPresences()}</g></g></svg>${this.loadError ? h`<div class="load-error">${this.loadError}</div>` : f}<div class="zoom-badge">⌂ &nbsp; ${Math.round(this.viewport.zoom * 100)}%</div></div>${this.selectedRoom ? h`<explorer-room-panel .hass=${this.hass} .room=${this.selectedRoom} @close=${() => this.selectedRoom = void 0}></explorer-room-panel>` : f}`;
  }
};
B.styles = I`:host{display:block;position:relative}.viewport{position:relative;overflow:hidden;background:var(--secondary-background-color);touch-action:none;max-height:var(--explorer-viewport-max-height,none)}svg.floorplan{display:block;width:100%;height:auto;aspect-ratio:1/1;user-select:none}.backdrop{fill:var(--card-background-color,#fff)}.floorplan-source{pointer-events:none}.inline-source{pointer-events:none}.room{cursor:pointer}.room polygon{transition:fill-opacity .18s ease,stroke-width .18s ease}.room-label-mask{fill:transparent;pointer-events:none}.room-label{font-size:18px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.presence{cursor:pointer}.presence-icon{font-size:24px;fill:#fff;pointer-events:none}.presence-label{font-size:16px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.zoom-badge{position:absolute;right:14px;bottom:14px;padding:8px 12px;border-radius:999px;background:rgba(0,0,0,.66);color:#fff;font-size:.8rem;font-weight:700;pointer-events:none}.load-error{position:absolute;left:14px;right:14px;top:14px;padding:10px 12px;border-radius:10px;background:var(--error-color,#db4437);color:#fff;font-size:.85rem;font-weight:700}@media(max-width:600px){.room-label{font-size:16px}.presence-label{font-size:14px}.zoom-badge{right:10px;bottom:10px}}`;
K([
  A({ attribute: !1 })
], B.prototype, "hass", 2);
K([
  A()
], B.prototype, "image", 2);
K([
  A({ attribute: !1 })
], B.prototype, "rooms", 2);
K([
  A({ attribute: !1 })
], B.prototype, "presences", 2);
K([
  A({ type: Number, attribute: "min-zoom" })
], B.prototype, "minZoom", 2);
K([
  A({ type: Number, attribute: "max-zoom" })
], B.prototype, "maxZoom", 2);
K([
  A({ type: Number, attribute: "initial-zoom" })
], B.prototype, "initialZoom", 2);
K([
  A({ attribute: "fit-mode" })
], B.prototype, "fitMode", 2);
K([
  b()
], B.prototype, "viewport", 2);
K([
  b()
], B.prototype, "selectedRoom", 2);
K([
  b()
], B.prototype, "selectedPresence", 2);
K([
  b()
], B.prototype, "metadata", 2);
K([
  b()
], B.prototype, "imageSource", 2);
K([
  b()
], B.prototype, "svgMarkup", 2);
K([
  b()
], B.prototype, "loadError", 2);
B = K([
  z("explorer-canvas")
], B);
function $e(e, t) {
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
function Qe(e, t) {
  return (e.rooms ?? []).find((i) => i.id === t)?.name ?? t;
}
function fo(e, t) {
  return (e.route_nodes ?? []).find((i) => i.id === t)?.name ?? t;
}
function ue(e) {
  return `${e.kind}:${e.id}`;
}
function vt(e, t) {
  return t.kind === "room" ? $e(e, t.id) : (e.route_nodes ?? []).find((i) => i.id === t.id)?.point;
}
function bo(e, t) {
  const i = vt(e, t);
  if (i)
    return t.kind === "room" ? {
      kind: "room",
      id: t.id,
      key: ue(t),
      label: Qe(e, t.id),
      point: i
    } : {
      kind: "node",
      id: t.id,
      key: ue(t),
      label: fo(e, t.id),
      point: i
    };
}
function ar(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : ["on"];
}
function yo(e) {
  return ar(e.condition?.allowed_states);
}
function De(e, t) {
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
function vo(e, t, i) {
  if (!e.condition)
    return {
      index: t,
      edge: e,
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  const r = e.condition.entity?.trim(), o = yo(e);
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
function nt(e, t) {
  const i = new Map((e.route_nodes ?? []).map((r) => [r.id, r]));
  return (e.route_graph_edges ?? []).map((r, o) => {
    const n = vo(r, o, t), a = [r.from, r.to].filter((u) => u.kind === "node").map((u) => i.get(u.id)).filter((u) => !!u).map((u) => De(u, t)).filter((u) => u.conditional), d = a.find((u) => !u.active) ?? (n.conditional ? void 0 : a[0]), c = n.active && a.every((u) => u.active), p = n.conditional || a.length > 0;
    return d ? {
      ...n,
      conditional: p,
      active: c,
      entity: d.entity,
      currentState: d.currentState,
      allowedStates: d.allowedStates,
      reason: c ? void 0 : d.reason,
      conditionSource: "node",
      nodeId: d.nodeId,
      nodeStatuses: a
    } : {
      ...n,
      conditional: p,
      active: c,
      nodeStatuses: a
    };
  });
}
function lr(e) {
  return e.path ? e.path : (e.via ?? []).map((t) => ({ point: t }));
}
function xo(e, t, i) {
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
function ii(e) {
  let t = 0;
  for (let i = 1; i < e.length; i += 1)
    t += Math.hypot(
      e[i].point[0] - e[i - 1].point[0],
      e[i].point[1] - e[i - 1].point[1]
    );
  return t;
}
function Pi(e, t, i, r, o, n) {
  const s = $e(e, i), a = $e(e, r);
  if (!s || !a) return;
  const l = lr(t), c = (o ? [...l].reverse() : l).map((u, g) => xo(e, u, g)).filter((u) => !!u), p = [
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: Qe(e, i),
      point: s
    },
    ...c,
    {
      kind: "room",
      id: r,
      key: `room:${r}`,
      label: Qe(e, r),
      point: a
    }
  ];
  return {
    source: "manual",
    hops: p,
    distance: ii(p),
    manualRoute: t,
    reversedManualRoute: o,
    blockedEdges: n
  };
}
function wo(e, t) {
  const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = (a) => {
    const l = ue(a);
    o.set(l, a);
    const d = r.get(l);
    if (d) return d;
    const c = vt(e, a);
    return c && r.set(l, c), c;
  }, s = (a, l, d) => {
    const c = i.get(a) ?? [];
    c.push({ key: l, weight: d }), i.set(a, c);
  };
  return t.forEach((a) => {
    if (!a.active) return;
    const l = a.edge, d = n(l.from), c = n(l.to);
    if (!d || !c) return;
    const p = ue(l.from), u = ue(l.to);
    if (p === u) return;
    const g = Math.hypot(c[0] - d[0], c[1] - d[1]);
    s(p, u, g), s(u, p, g);
  }), { adjacency: i, positions: r, endpoints: o };
}
function $o(e, t, i, r, o) {
  if (!(e.route_graph_edges ?? []).length) return;
  const n = `room:${t}`, s = `room:${i}`, { adjacency: a, endpoints: l } = wo(e, r);
  if (!a.has(n) || !a.has(s)) return;
  const d = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), p = new Set(a.keys());
  for (a.forEach((m) => m.forEach((x) => p.add(x.key))), p.forEach((m) => d.set(m, Number.POSITIVE_INFINITY)), d.set(n, 0); p.size; ) {
    let m, x = Number.POSITIVE_INFINITY;
    for (const $ of p) {
      const _ = d.get($) ?? Number.POSITIVE_INFINITY;
      _ < x && (m = $, x = _);
    }
    if (!m || !Number.isFinite(x) || (p.delete(m), m === s)) break;
    for (const $ of a.get(m) ?? []) {
      if (!p.has($.key)) continue;
      const _ = x + $.weight;
      _ < (d.get($.key) ?? Number.POSITIVE_INFINITY) && (d.set($.key, _), c.set($.key, m));
    }
  }
  if (!Number.isFinite(d.get(s) ?? Number.POSITIVE_INFINITY)) return;
  const u = [s];
  let g = s;
  for (; g !== n; ) {
    const m = c.get(g);
    if (!m) return;
    u.push(m), g = m;
  }
  u.reverse();
  const y = u.map((m) => l.get(m)).map((m) => m ? bo(e, m) : void 0).filter((m) => !!m);
  if (!(y.length < 2))
    return {
      source: "graph",
      hops: y,
      distance: ii(y),
      blockedEdges: o
    };
}
function ri(e, t, i, r) {
  if (!t || !i || t === i) return;
  const o = nt(e, r), n = o.filter((u) => !u.active), s = (e.routes ?? []).find(
    (u) => u.from === t && u.to === i
  );
  if (s) return Pi(e, s, t, i, !1, n);
  const a = (e.routes ?? []).find(
    (u) => u.from === i && u.to === t
  );
  if (a) return Pi(e, a, t, i, !0, n);
  const l = $o(e, t, i, o, n);
  if (l) return l;
  const d = $e(e, t), c = $e(e, i);
  if (!d || !c) return;
  const p = [
    {
      kind: "room",
      id: t,
      key: `room:${t}`,
      label: Qe(e, t),
      point: d
    },
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: Qe(e, i),
      point: c
    }
  ];
  return {
    source: "fallback",
    hops: p,
    distance: ii(p),
    blockedEdges: n
  };
}
function ko(e) {
  return [ue(e.from), ue(e.to)].sort().join("|");
}
function Ri(e, t) {
  const i = e.route_graph_edges ?? [];
  let r = 0, o = 0, n = 0;
  const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), d = (k) => {
    a.set(k, (a.get(k) ?? 0) + 1);
  }, c = (k, C) => {
    const M = l.get(k) ?? /* @__PURE__ */ new Set();
    M.add(C), l.set(k, M);
    const O = l.get(C) ?? /* @__PURE__ */ new Set();
    O.add(k), l.set(C, O);
  };
  i.forEach((k) => {
    const C = ue(k.from), M = ue(k.to), O = ko(k);
    C === M && (n += 1), s.has(O) && (o += 1), s.add(O);
    const Q = vt(e, k.from), J = vt(e, k.to);
    if (!Q || !J || C === M) {
      r += 1;
      return;
    }
    d(C), d(M), c(C, M);
  });
  const p = i.length ? (e.rooms ?? []).filter((k) => $e(e, k.id) && !a.has(`room:${k.id}`)).map((k) => k.id) : [], u = i.length ? (e.route_nodes ?? []).filter((k) => !a.has(`node:${k.id}`)).map((k) => k.id) : [];
  let g = 0;
  const y = new Set(l.keys());
  for (; y.size; ) {
    g += 1;
    const k = y.values().next().value;
    if (!k) break;
    const C = [k];
    for (y.delete(k); C.length; ) {
      const M = C.pop();
      for (const O of l.get(M) ?? [])
        y.has(O) && (y.delete(O), C.push(O));
    }
  }
  const m = [], x = new Set((e.route_nodes ?? []).map((k) => k.id));
  (e.routes ?? []).forEach((k) => {
    lr(k).forEach((C) => {
      C.node_id && !x.has(C.node_id) && m.push({ from: k.from, to: k.to, nodeId: C.node_id });
    });
  });
  const $ = nt(e, t), _ = $.filter((k) => !k.active), w = (e.route_nodes ?? []).map((k) => De(k, t)).filter((k) => k.conditional), S = w.filter((k) => !k.active), N = /* @__PURE__ */ new Set();
  return $.forEach((k) => {
    k.conditionSource === "edge" && (k.reason === "missing_entity" || k.reason === "entity_unavailable") && N.add(k.entity ?? "(mangler entity)");
  }), w.forEach((k) => {
    (k.reason === "missing_entity" || k.reason === "entity_unavailable") && N.add(k.entity ?? "(mangler entity)");
  }), {
    invalidEdges: r,
    duplicateEdges: o,
    selfEdges: n,
    components: g,
    disconnectedRoomIds: p,
    disconnectedNodeIds: u,
    brokenRouteNodeReferences: m,
    conditionalEdges: $.filter((k) => k.conditional).length,
    blockedEdges: _,
    conditionalNodes: w.length,
    blockedNodes: S,
    unresolvedConditionEntities: [...N]
  };
}
var _o = Object.defineProperty, Ao = Object.getOwnPropertyDescriptor, St = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ao(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && _o(t, i, o), o;
};
const Nt = 900, Mi = 3600, zi = 58, D = "http://www.w3.org/2000/svg";
let Le = class extends B {
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
        x: (n.x ?? 0.5) * v,
        y: (n.y ?? 0.5) * v
      }, d = this.previousPresencePositions.get(n.id), c = this.previousPresenceRooms.get(n.id), p = n.room_id;
      if (o.add(n.id), this.activeAnimations.get(n.id)?.remove(), this.activeAnimations.delete(n.id), !r && d && (Math.abs(d.x - l.x) > 0.01 || Math.abs(d.y - l.y) > 0.01)) {
        const u = this.resolveMovementPath(d, l, c, p);
        this.createFootsteps(u);
        const g = document.createElementNS(D, "animateTransform");
        g.setAttribute("attributeName", "transform"), g.setAttribute("attributeType", "XML"), g.setAttribute("type", "translate"), g.setAttribute("values", u.map((y) => `${y.x} ${y.y}`).join(";")), g.setAttribute("keyTimes", this.buildKeyTimes(u).join(";")), g.setAttribute("dur", `${Nt}ms`), g.setAttribute("begin", "indefinite"), g.setAttribute("fill", "freeze"), g.setAttribute("calcMode", "linear"), a.appendChild(g), this.activeAnimations.set(n.id, g), g.beginElement(), window.setTimeout(() => {
          this.activeAnimations.get(n.id) === g && (g.remove(), this.activeAnimations.delete(n.id));
        }, Nt + 80);
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
    const i = e.currentState ?? "ukendt", r = e.conditionSource === "node" ? `dørpunkt ${this.routeNodes.find((o) => o.id === e.nodeId)?.name ?? e.nodeId ?? "ukendt"}` : "route-condition";
    return `${t} · ${e.active ? "aktiv" : "blokeret"} · ${r} · ${e.entity ?? "manglende entity"}: ${i}`;
  }
  doorVisualStatus(e, t) {
    if (e.state_binding)
      return De(
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
    const i = document.createElementNS(D, "title");
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
    ), r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, o = document.createElementNS(D, "g");
    o.setAttribute("class", "route-status-scene"), o.setAttribute("aria-label", "Live rutestatus og døre"), o.setAttribute("pointer-events", "none"), i.forEach((s) => {
      const a = this.endpointPoint(s.edge.from), l = this.endpointPoint(s.edge.to);
      if (!a || !l) return;
      const d = this.edgeStatusColor(s), c = document.createElementNS(D, "line");
      if (c.setAttribute("x1", String(a.x)), c.setAttribute("y1", String(a.y)), c.setAttribute("x2", String(l.x)), c.setAttribute("y2", String(l.y)), c.setAttribute("stroke", d), c.setAttribute("stroke-linecap", "round"), c.setAttribute("vector-effect", "non-scaling-stroke"), c.setAttribute("stroke-width", s.conditional ? s.active ? "4.5" : "5.5" : "2.5"), c.setAttribute("stroke-opacity", s.conditional ? s.active ? ".72" : ".82" : ".2"), s.conditional || c.setAttribute("stroke-dasharray", "4 10"), s.conditional && !s.active && c.setAttribute("stroke-dasharray", "13 9"), this.appendSvgTitle(c, this.statusDescription(s)), o.appendChild(c), !s.conditional) return;
      const p = (a.x + l.x) / 2, u = (a.y + l.y) / 2, g = document.createElementNS(D, "g");
      g.setAttribute("transform", `translate(${p} ${u})`);
      const y = document.createElementNS(D, "circle");
      y.setAttribute("r", "12"), y.setAttribute("fill", "var(--card-background-color, #ffffff)"), y.setAttribute("fill-opacity", ".9"), y.setAttribute("stroke", d), y.setAttribute("stroke-width", "3"), y.setAttribute("vector-effect", "non-scaling-stroke"), g.appendChild(y);
      const m = document.createElementNS(D, "text");
      if (m.setAttribute("text-anchor", "middle"), m.setAttribute("dominant-baseline", "central"), m.setAttribute("fill", d), m.setAttribute("font-size", "16"), m.setAttribute("font-weight", "900"), m.setAttribute("font-family", "system-ui, sans-serif"), m.textContent = s.active ? "✓" : "×", g.appendChild(m), !s.active && !r) {
        const x = document.createElementNS(D, "animate");
        x.setAttribute("attributeName", "opacity"), x.setAttribute("values", "1;.45;1"), x.setAttribute("dur", "1.8s"), x.setAttribute("repeatCount", "indefinite"), g.appendChild(x);
      }
      this.appendSvgTitle(g, this.statusDescription(s)), o.appendChild(g);
    }), t.forEach((s) => {
      const a = this.doorVisualStatus(s, i), l = this.doorStatusColor(a), d = s.point[0] * v, c = s.point[1] * v, p = document.createElementNS(D, "g");
      p.setAttribute("transform", `translate(${d} ${c})`);
      const u = document.createElementNS(D, "circle");
      u.setAttribute("r", "22"), u.setAttribute("fill", "var(--card-background-color, #ffffff)"), u.setAttribute("fill-opacity", ".9"), u.setAttribute("stroke", l), u.setAttribute("stroke-width", "4"), u.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(u);
      const g = document.createElementNS(D, "rect");
      g.setAttribute("x", "-9"), g.setAttribute("y", "-13"), g.setAttribute("width", "15"), g.setAttribute("height", "26"), g.setAttribute("rx", "1.5"), g.setAttribute("fill", "none"), g.setAttribute("stroke", l), g.setAttribute("stroke-width", "3"), g.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(g);
      const y = document.createElementNS(D, "circle");
      if (y.setAttribute("cx", "2"), y.setAttribute("cy", "0"), y.setAttribute("r", "2"), y.setAttribute("fill", l), p.appendChild(y), a === "blocked") {
        const w = document.createElementNS(D, "line");
        w.setAttribute("x1", "-12"), w.setAttribute("y1", "-15"), w.setAttribute("x2", "12"), w.setAttribute("y2", "15"), w.setAttribute("stroke", l), w.setAttribute("stroke-width", "4"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(w);
      }
      const m = document.createElementNS(D, "circle");
      if (m.setAttribute("cx", "16"), m.setAttribute("cy", "-16"), m.setAttribute("r", "6"), m.setAttribute("fill", l), m.setAttribute("stroke", "var(--card-background-color, #ffffff)"), m.setAttribute("stroke-width", "2"), m.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(m), s.name) {
        const w = document.createElementNS(D, "text");
        w.setAttribute("y", "39"), w.setAttribute("text-anchor", "middle"), w.setAttribute("fill", "var(--primary-text-color, #1f2937)"), w.setAttribute("font-size", "20"), w.setAttribute("font-weight", "700"), w.setAttribute("font-family", "system-ui, sans-serif"), w.setAttribute("paint-order", "stroke"), w.setAttribute("stroke", "var(--card-background-color, #ffffff)"), w.setAttribute("stroke-width", "5"), w.setAttribute("stroke-linejoin", "round"), w.textContent = s.name, p.appendChild(w);
      }
      const x = a === "always" ? "altid aktiv" : a === "active" ? "åben" : a === "blocked" ? "lukket / blokeret" : "blandet status", $ = s.state_binding ? De(s, (w) => this.hass?.states[w]?.state) : void 0, _ = $?.entity ? ` · ${$.entity}: ${$.currentState ?? "ukendt"} · åben: ${$.allowedStates.join(", ")}` : "";
      this.appendSvgTitle(p, `${s.name ?? s.id} · ${x}${_}`), o.appendChild(p);
    });
    const n = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(o, n ?? null);
  }
  resolveMovementPath(e, t, i, r) {
    if (!i || !r || i === r) return [e, t];
    const o = ri(
      this.routeConfig(),
      i,
      r,
      (s) => this.hass?.states[s]?.state
    );
    if (!o) return [e, t];
    const n = o.hops.slice(1, -1).map((s) => ({
      x: s.point[0] * v,
      y: s.point[1] * v
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
    t = document.createElementNS(D, "g"), t.setAttribute("class", "footsteps-scene"), t.setAttribute("aria-label", "Bevægelsesspor"), t.setAttribute("pointer-events", "none");
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
    if (r < zi) return;
    const o = Math.min(20, Math.max(3, Math.floor(r / zi)));
    for (let n = 0; n < o; n += 1) {
      const s = (n + 1) / (o + 1), a = r * s;
      let l = 0, d = i[i.length - 1];
      for (const O of i) {
        if (l + O.length >= a) {
          d = O;
          break;
        }
        l += O.length;
      }
      const c = d.length > 0 ? (a - l) / d.length : 0, p = d.end.x - d.start.x, u = d.end.y - d.start.y, g = n % 2 === 0 ? -1 : 1, y = d.length > 0 ? -u / d.length : 0, m = d.length > 0 ? p / d.length : 0, x = 9 * g, $ = d.start.x + p * c + y * x, _ = d.start.y + u * c + m * x, w = Math.atan2(u, p) * 180 / Math.PI + 90, S = Math.round(s * Nt), N = document.createElementNS(D, "g");
      N.setAttribute("transform", `translate(${$} ${_}) rotate(${w + g * 8})`), N.setAttribute("opacity", "0");
      const k = document.createElementNS(D, "ellipse");
      k.setAttribute("cx", "0"), k.setAttribute("cy", "-5"), k.setAttribute("rx", "6"), k.setAttribute("ry", "12"), k.setAttribute("fill", "rgba(67, 48, 31, 0.72)");
      const C = document.createElementNS(D, "ellipse");
      C.setAttribute("cx", "0"), C.setAttribute("cy", "9"), C.setAttribute("rx", "4.5"), C.setAttribute("ry", "5.5"), C.setAttribute("fill", "rgba(67, 48, 31, 0.68)");
      const M = document.createElementNS(D, "animate");
      M.setAttribute("attributeName", "opacity"), M.setAttribute("values", "0;0.72;0.56;0"), M.setAttribute("keyTimes", "0;0.08;0.58;1"), M.setAttribute("begin", "indefinite"), M.setAttribute("dur", `${Mi}ms`), M.setAttribute("fill", "freeze"), N.append(k, C, M), t.appendChild(N), window.setTimeout(() => {
        N.isConnected && M.beginElement();
      }, S), window.setTimeout(() => N.remove(), S + Mi + 120);
    }
  }
};
St([
  A({ attribute: !1 })
], Le.prototype, "routes", 2);
St([
  A({ attribute: !1 })
], Le.prototype, "routeNodes", 2);
St([
  A({ attribute: !1 })
], Le.prototype, "routeGraphEdges", 2);
Le = St([
  z("explorer-animated-canvas")
], Le);
var So = Object.getOwnPropertyDescriptor, Co = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? So(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const T = "http://www.w3.org/2000/svg";
let xt = class extends Le {
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
    const o = document.createElementNS(T, "circle");
    return o.setAttribute("r", String(r)), o.setAttribute("fill", "var(--card-background-color, #ffffff)"), o.setAttribute("fill-opacity", i ? ".94" : ".78"), o.setAttribute("stroke", t), o.setAttribute("stroke-width", i ? "3" : "2"), o.setAttribute("stroke-opacity", i ? ".95" : ".42"), o.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(o), o;
  }
  appendLightPoint(e, t, i) {
    const r = this.pointColor("light");
    if (t.active) {
      e.setAttribute("data-magical-light", "active");
      const n = Math.max(0.18, Math.min(1, t.intensity));
      [[74, 0.025], [52, 0.055], [34, 0.12]].forEach(([d, c], p) => {
        const u = document.createElementNS(T, "circle");
        if (u.setAttribute("class", `magical-light-glow glow-${p + 1}`), u.setAttribute("r", String(d * (0.82 + n * 0.34))), u.setAttribute("fill", r), u.setAttribute("fill-opacity", String(c + n * c * 1.8)), u.setAttribute("stroke", "none"), e.appendChild(u), !i && p === 1) {
          const g = document.createElementNS(T, "animate");
          g.setAttribute("attributeName", "fill-opacity"), g.setAttribute("values", `${c + n * 0.07};${c + n * 0.13};${c + n * 0.07}`), g.setAttribute("dur", "4.8s"), g.setAttribute("repeatCount", "indefinite"), u.appendChild(g);
        }
      });
      const a = document.createElementNS(T, "circle"), l = 24 + n * 24;
      if (a.setAttribute("class", "light-halo"), a.setAttribute("r", String(l)), a.setAttribute("fill", r), a.setAttribute("fill-opacity", String(0.08 + n * 0.18)), a.setAttribute("stroke", r), a.setAttribute("stroke-width", "2"), a.setAttribute("stroke-opacity", String(0.1 + n * 0.18)), a.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(a), !i) {
        const d = document.createElementNS(T, "animate");
        d.setAttribute("attributeName", "r"), d.setAttribute("values", `${l * 0.94};${l * 1.06};${l * 0.94}`), d.setAttribute("dur", "4.2s"), d.setAttribute("repeatCount", "indefinite"), a.appendChild(d);
      }
    }
    this.appendPointBackdrop(e, r, t.active, 11);
    const o = document.createElementNS(T, "text");
    o.setAttribute("class", "light-glyph"), o.setAttribute("text-anchor", "middle"), o.setAttribute("dominant-baseline", "central"), o.setAttribute("font-size", "15"), o.setAttribute("font-weight", "900"), o.setAttribute("fill", r), o.setAttribute("opacity", t.active ? "1" : ".48"), o.textContent = "✦", e.appendChild(o);
  }
  appendMotionPoint(e, t, i) {
    const r = this.pointColor("motion");
    this.appendPointBackdrop(e, r, t.active, 10);
    const o = document.createElementNS(T, "circle");
    if (o.setAttribute("r", t.active ? "4.5" : "3.5"), o.setAttribute("fill", r), o.setAttribute("opacity", t.active ? "1" : ".42"), e.appendChild(o), !t.active) return;
    const n = document.createElementNS(T, "circle");
    if (n.setAttribute("r", "15"), n.setAttribute("fill", "none"), n.setAttribute("stroke", r), n.setAttribute("stroke-width", "3"), n.setAttribute("stroke-opacity", ".78"), n.setAttribute("vector-effect", "non-scaling-stroke"), e.insertBefore(n, e.firstChild), !i) {
      const s = document.createElementNS(T, "animate");
      s.setAttribute("attributeName", "r"), s.setAttribute("values", "13;31;13"), s.setAttribute("dur", "1.8s"), s.setAttribute("repeatCount", "indefinite"), n.appendChild(s);
    }
  }
  appendMediaPoint(e, t) {
    const i = this.pointColor("media");
    if (t.active) {
      const n = document.createElementNS(T, "circle");
      n.setAttribute("r", "25"), n.setAttribute("fill", i), n.setAttribute("fill-opacity", ".12"), e.appendChild(n);
    }
    const r = document.createElementNS(T, "rect");
    r.setAttribute("x", "-16"), r.setAttribute("y", "-11"), r.setAttribute("width", "32"), r.setAttribute("height", "22"), r.setAttribute("rx", "4"), r.setAttribute("fill", "var(--card-background-color, #ffffff)"), r.setAttribute("fill-opacity", t.active ? ".94" : ".78"), r.setAttribute("stroke", i), r.setAttribute("stroke-width", t.active ? "3" : "2"), r.setAttribute("stroke-opacity", t.active ? ".95" : ".42"), e.appendChild(r);
    const o = document.createElementNS(T, "path");
    o.setAttribute("d", "M -4 -6 L 7 0 L -4 6 Z"), o.setAttribute("fill", i), o.setAttribute("opacity", t.active ? "1" : ".40"), e.appendChild(o);
  }
  appendOpeningPoint(e, t) {
    const i = this.pointColor("opening");
    this.appendPointBackdrop(e, i, t.active, 11);
    const r = document.createElementNS(T, "text");
    r.setAttribute("text-anchor", "middle"), r.setAttribute("dominant-baseline", "central"), r.setAttribute("font-size", t.active ? "18" : "15"), r.setAttribute("font-weight", "900"), r.setAttribute("fill", i), r.setAttribute("opacity", t.active ? "1" : ".42"), r.textContent = t.active ? "↗" : "━", e.appendChild(r);
  }
  appendFireplacePoint(e, t, i) {
    const r = this.pointColor("fireplace"), o = Math.max(0.2, Math.min(1, t.intensity || 1)), n = t.reaction.radius, s = Number.isFinite(n) ? Math.max(26, Math.min(160, n * v)) : 72;
    if (t.active) {
      e.setAttribute("data-fireplace", "active");
      const l = document.createElementNS(T, "circle");
      l.setAttribute("class", "fireplace-glow fireplace-glow-outer"), l.setAttribute("r", String(s)), l.setAttribute("fill", r), l.setAttribute("fill-opacity", String(0.07 + 0.11 * o)), e.appendChild(l);
      const d = document.createElementNS(T, "circle");
      if (d.setAttribute("class", "fireplace-glow fireplace-glow-inner"), d.setAttribute("r", String(s * 0.56)), d.setAttribute("fill", "var(--explorer-room-fireplace-hot, #e7a253)"), d.setAttribute("fill-opacity", String(0.12 + 0.17 * o)), e.appendChild(d), !i) {
        const c = document.createElementNS(T, "animate");
        c.setAttribute("attributeName", "fill-opacity"), c.setAttribute("values", `${0.1 + 0.12 * o};${0.2 + 0.18 * o};${0.12 + 0.1 * o};${0.24 + 0.16 * o};${0.1 + 0.12 * o}`), c.setAttribute("dur", "2.1s"), c.setAttribute("repeatCount", "indefinite"), d.appendChild(c);
        const p = document.createElementNS(T, "animate");
        p.setAttribute("attributeName", "r"), p.setAttribute("values", `${s * 0.93};${s * 1.05};${s * 0.97};${s * 0.93}`), p.setAttribute("dur", "3.6s"), p.setAttribute("repeatCount", "indefinite"), l.appendChild(p);
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
    const i = this.temperatureColor(t), r = this.formatTemperature(t), o = Math.max(58, 24 + r.length * 8.2), n = document.createElementNS(T, "rect");
    n.setAttribute("x", String(-o / 2)), n.setAttribute("y", "-15"), n.setAttribute("width", String(o)), n.setAttribute("height", "30"), n.setAttribute("rx", "15"), n.setAttribute("fill", "var(--card-background-color, #ffffff)"), n.setAttribute("fill-opacity", t.active ? ".94" : ".78"), n.setAttribute("stroke", i), n.setAttribute("stroke-width", "2.5"), e.appendChild(n);
    const s = document.createElementNS(T, "text");
    s.setAttribute("text-anchor", "middle"), s.setAttribute("dominant-baseline", "central"), s.setAttribute("font-size", "14"), s.setAttribute("font-weight", "800"), s.setAttribute("fill", i), s.textContent = r, e.appendChild(s);
  }
  appendReactionPoint(e, t, i, r) {
    const o = Ze(t, i.reaction), n = document.createElementNS(T, "g");
    n.setAttribute("class", `room-reaction-point ${i.reaction.kind} ${i.active ? "active" : "inactive"}`), n.setAttribute("data-reaction-kind", i.reaction.kind), n.setAttribute("transform", `translate(${o.x * v} ${o.y * v})`), i.reaction.kind === "light" ? this.appendLightPoint(n, i, r) : i.reaction.kind === "motion" ? this.appendMotionPoint(n, i, r) : i.reaction.kind === "media" ? this.appendMediaPoint(n, i) : i.reaction.kind === "opening" ? this.appendOpeningPoint(n, i) : i.reaction.kind === "fireplace" ? this.appendFireplacePoint(n, i, r) : this.appendTemperaturePoint(n, i);
    const s = i.reaction.kind === "temperature" ? this.formatTemperature(i) : i.currentState ?? "ukendt";
    this.appendTitle(n, `${t.name ?? t.id} · ${i.reaction.entity} · ${s}`), e.appendChild(n);
  }
  syncRoomReactionOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-reactions-scene")?.remove();
    const t = this.rooms.flatMap((a) => yt(a, (l) => this.entityState(l)).map((l) => ({ room: a, status: l })));
    if (!t.length) return;
    const i = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, r = document.createElementNS(T, "g");
    r.setAttribute("class", "room-reactions-scene"), r.setAttribute("aria-label", "Home Assistant entity-punkter"), r.setAttribute("pointer-events", "none"), t.forEach(({ room: a, status: l }) => this.appendReactionPoint(r, a, l, i));
    const o = e.querySelector(":scope > g.route-status-scene"), n = e.querySelector(":scope > g.footsteps-scene"), s = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, o ?? n ?? s ?? null);
  }
};
xt = Co([
  z("explorer-living-canvas")
], xt);
var Eo = Object.getOwnPropertyDescriptor, No = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Eo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const R = "http://www.w3.org/2000/svg", Pt = 3e4;
let Je = class extends xt {
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
      const [a, l] = t[n], [d, c] = t[s];
      l > r != c > r && i < (d - a) * (r - l) / (c - l || Number.EPSILON) + a && (o = !o);
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
      const r = t.get(i.id) ?? 0, o = r > 0, n = e - (this.lastOccupiedAt.get(i.id) ?? -1 / 0), s = !o && n >= 0 && n < Pt, a = o ? Math.min(1, 0.72 + Math.max(0, r - 1) * 0.12) : s ? Math.max(0, 1 - n / Pt) : 0;
      return { room: i, active: o, afterglow: s, intensity: a };
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
    r.setAttribute("class", "presence-room-activity-scene"), r.setAttribute("aria-label", "Tilstedeværelsesbaseret rumaktivitet"), r.setAttribute("pointer-events", "none"), i.forEach(({ room: l, active: d, intensity: c }) => {
      if (l.points.length < 3) return;
      const p = document.createElementNS(R, "polygon");
      p.setAttribute("points", this.polygonPoints(l)), p.setAttribute("class", d ? "presence-room-active" : "presence-room-afterglow"), p.setAttribute("fill", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))"), p.setAttribute("fill-opacity", String(d ? 0.1 + c * 0.07 : 0.025 + c * 0.07)), p.setAttribute("stroke", "var(--explorer-presence-room-color, var(--primary-color, #03a9f4))"), p.setAttribute("stroke-opacity", String(d ? 0.28 : 0.08 + c * 0.16)), p.setAttribute("stroke-width", d ? "3" : "2"), p.setAttribute("vector-effect", "non-scaling-stroke"), r.appendChild(p);
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
      const t = yt(e, (r) => this.atmosphereEntityState(r)).filter((r) => r.reaction.kind === "temperature" && r.active).map((r) => this.temperatureCelsius(r)).filter((r) => r !== void 0);
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
    i.setAttribute("class", "room-temperature-atmosphere-scene"), i.setAttribute("aria-label", "Temperaturatmosfære i rum"), i.setAttribute("pointer-events", "none"), t.forEach(({ room: l, celsius: d }) => {
      const c = this.temperatureOpacity(d), p = this.atmosphereTemperatureColor(d), u = this.temperatureBand(d), g = document.createElementNS(R, "polygon");
      g.setAttribute("points", this.polygonPoints(l)), g.setAttribute("class", `room-temperature-atmosphere temperature-${u}`), g.setAttribute("data-temperature-band", u), g.setAttribute("fill", p), g.setAttribute("fill-opacity", String(c)), g.setAttribute("stroke", p), g.setAttribute("stroke-opacity", String(Math.min(0.18, 0.045 + c * 0.9))), g.setAttribute("stroke-width", "2"), g.setAttribute("stroke-linejoin", "round"), g.setAttribute("vector-effect", "non-scaling-stroke");
      const y = document.createElementNS(R, "title"), m = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(d);
      y.textContent = `${l.name ?? l.id} · temperaturatmosfære · ${m} °C`, g.appendChild(y), i.appendChild(g);
    });
    const r = e.querySelector(":scope > g.presence-room-activity-scene"), o = e.querySelector(":scope > g.room-reactions-scene"), n = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, r ?? o ?? n ?? s ?? a ?? null);
  }
  appendFireplaceAtmosphere(e, t, i, r, o) {
    const n = Ze(t, i.reaction), s = Math.max(0.2, Math.min(1, i.intensity || 1)), a = i.reaction.radius, l = Number.isFinite(a) ? Math.max(42, Math.min(180, a * v)) : 82, d = document.createElementNS(R, "g");
    d.setAttribute("class", "fireplace-atmosphere"), d.setAttribute("transform", `translate(${n.x * v} ${n.y * v})`), d.setAttribute("data-room-id", t.id);
    const c = document.createElementNS(R, "circle");
    c.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-outer"), c.setAttribute("r", String(l * 1.18)), c.setAttribute("fill", "var(--explorer-fireplace-atmosphere, #c97935)"), c.setAttribute("fill-opacity", String(0.045 + s * 0.055)), d.appendChild(c);
    const p = document.createElementNS(R, "circle");
    p.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-middle"), p.setAttribute("r", String(l * 0.72)), p.setAttribute("fill", "var(--explorer-fireplace-atmosphere-hot, #e6a34b)"), p.setAttribute("fill-opacity", String(0.065 + s * 0.085)), d.appendChild(p);
    const u = document.createElementNS(R, "ellipse");
    if (u.setAttribute("class", "fireplace-atmosphere-core"), u.setAttribute("cx", "0"), u.setAttribute("cy", String(-l * 0.05)), u.setAttribute("rx", String(l * 0.39)), u.setAttribute("ry", String(l * 0.31)), u.setAttribute("fill", "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), u.setAttribute("fill-opacity", String(0.07 + s * 0.09)), d.appendChild(u), !r) {
      const m = document.createElementNS(R, "animate");
      m.setAttribute("attributeName", "fill-opacity"), m.setAttribute("values", `${0.04 + s * 0.045};${0.065 + s * 0.07};${0.048 + s * 0.052};${0.04 + s * 0.045}`), m.setAttribute("dur", `${3.2 + o % 3 * 0.35}s`), m.setAttribute("repeatCount", "indefinite"), c.appendChild(m);
      const x = document.createElementNS(R, "animate");
      x.setAttribute("attributeName", "fill-opacity"), x.setAttribute("values", `${0.075 + s * 0.07};${0.13 + s * 0.11};${0.09 + s * 0.08};${0.145 + s * 0.105};${0.075 + s * 0.07}`), x.setAttribute("dur", `${1.65 + o % 2 * 0.22}s`), x.setAttribute("repeatCount", "indefinite"), p.appendChild(x);
    }
    [
      [-18, -10, 2.4],
      [12, -18, 2],
      [-5, -28, 1.7],
      [22, -6, 1.5],
      [-26, -22, 1.4],
      [5, -38, 1.25]
    ].forEach(([m, x, $], _) => {
      const w = document.createElementNS(R, "circle");
      if (w.setAttribute("class", "fireplace-ember"), w.setAttribute("cx", String(m)), w.setAttribute("cy", String(x)), w.setAttribute("r", String($)), w.setAttribute("fill", _ % 2 === 0 ? "var(--explorer-fireplace-ember, #d96532)" : "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), w.setAttribute("opacity", r ? String(0.28 + s * 0.22) : "0"), d.appendChild(w), !r) {
        const S = document.createElementNS(R, "animate");
        S.setAttribute("attributeName", "cy"), S.setAttribute("values", `${x};${x - 22 - _ * 2};${x - 38 - _ * 3}`), S.setAttribute("dur", `${2.4 + _ % 3 * 0.42}s`), S.setAttribute("begin", `${(_ * 0.37 + o * 0.11).toFixed(2)}s`), S.setAttribute("repeatCount", "indefinite"), w.appendChild(S);
        const N = document.createElementNS(R, "animate");
        N.setAttribute("attributeName", "opacity"), N.setAttribute("values", `0;${0.32 + s * 0.45};${0.16 + s * 0.22};0`), N.setAttribute("keyTimes", "0;0.18;0.68;1"), N.setAttribute("dur", `${2.4 + _ % 3 * 0.42}s`), N.setAttribute("begin", `${(_ * 0.37 + o * 0.11).toFixed(2)}s`), N.setAttribute("repeatCount", "indefinite"), w.appendChild(N);
      }
    });
    const y = document.createElementNS(R, "title");
    y.textContent = `${t.name ?? t.id} · levende pejsatmosfære`, d.appendChild(y), e.appendChild(d);
  }
  syncFireplaceAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.fireplace-atmosphere-scene")?.remove();
    const t = this.rooms.flatMap(
      (l) => yt(l, (d) => this.atmosphereEntityState(d)).filter((d) => d.reaction.kind === "fireplace" && d.active).map((d) => ({ room: l, status: d }))
    );
    if (!t.length) return;
    const i = document.createElementNS(R, "g");
    i.setAttribute("class", "fireplace-atmosphere-scene"), i.setAttribute("aria-label", "Levende pejsatmosfære"), i.setAttribute("pointer-events", "none");
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    t.forEach(({ room: l, status: d }, c) => this.appendFireplaceAtmosphere(i, l, d, r, c));
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
    e.setAttribute("id", this.overcastMaskId), e.setAttribute("maskUnits", "userSpaceOnUse"), e.setAttribute("x", "0"), e.setAttribute("y", "0"), e.setAttribute("width", String(v)), e.setAttribute("height", String(v));
    const t = document.createElementNS(R, "rect");
    return t.setAttribute("x", "0"), t.setAttribute("y", "0"), t.setAttribute("width", String(v)), t.setAttribute("height", String(v)), t.setAttribute("fill", "white"), e.appendChild(t), this.rooms.forEach((i) => {
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
    const d = document.createElementNS(R, "g");
    d.setAttribute("class", "overcast-cloud-body"), d.setAttribute("filter", `url(#${this.overcastFilterId})`), d.setAttribute("transform", o % 2 === 0 ? "scale(1.12 .74) skewX(-4)" : "scale(.98 .88) skewX(5)");
    const c = document.createElementNS(R, "path");
    c.setAttribute("class", "overcast-cloud-base"), c.setAttribute("d", "M-150 31 C-133 1 -108 -17 -80 -18 C-66 -47 -41 -62 -13 -57 C5 -78 34 -82 58 -62 C84 -62 107 -48 120 -27 C146 -18 158 5 145 29 C128 53 99 63 66 61 C34 75 -4 74 -37 68 C-76 75 -116 64 -140 48 C-151 41 -155 35 -150 31 Z"), d.appendChild(c), [
      [-86, -6, 50, 30],
      [-47, -37, 57, 34],
      [-3, -51, 65, 38],
      [43, -43, 58, 35],
      [82, -17, 50, 30],
      [14, 23, 92, 27]
    ].forEach(([g, y, m, x], $) => {
      const _ = document.createElementNS(R, "ellipse");
      _.setAttribute("class", "overcast-cloud-puff"), _.setAttribute("cx", String(g)), _.setAttribute("cy", String(y)), _.setAttribute("rx", String(m)), _.setAttribute("ry", String(x)), _.setAttribute("opacity", String(0.34 + $ % 3 * 0.08)), d.appendChild(_);
    }), a.appendChild(d);
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
    ].forEach(([a, l, d, c, p]) => this.appendOvercastCloud(o, a, l, d, c, p));
    const s = t.querySelector(":scope > g.rooms-scene");
    t.insertBefore(o, s ?? null);
  }
};
Je.styles = I`
    ${xt.styles}

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
Je = No([
  z("explorer-presence-activity-canvas")
], Je);
var Po = Object.defineProperty, Ro = Object.getOwnPropertyDescriptor, st = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ro(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Po(t, i, o), o;
};
const Mo = "http://www.w3.org/2000/svg";
let me = class extends Je {
  constructor() {
    super(...arguments), this.theme = "classic", this.compassRotation = -7, this.compassSize = 1, this.compassVisible = !0, this.artifactId = `explorer-antique-${Math.random().toString(36).slice(2, 10)}`, this.hasRevealedEnchanted = !1;
  }
  updated(e) {
    super.updated(e), this.syncThemeArtifacts();
  }
  createSvg(e) {
    return document.createElementNS(Mo, e);
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
    o.setAttribute("id", `${this.artifactId}-vignette`), [["0%", "#f6e3b7", "0"], ["70%", "#9b6c3d", ".04"], ["100%", "#3f291c", ".30"]].forEach(([a, l, d]) => {
      const c = this.createSvg("stop");
      this.setAttributes(c, { offset: a, "stop-color": l, "stop-opacity": d }), o.appendChild(c);
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
    this.setAttributes(o, { r: "34", fill: "none", stroke: "#5b3c28", "stroke-width": "1", "stroke-opacity": ".38" }), e.appendChild(o), [[0, -42, 0, 42], [-42, 0, 42, 0]].forEach(([d, c, p, u]) => {
      const g = this.createSvg("line");
      this.setAttributes(g, { x1: String(d), y1: String(c), x2: String(p), y2: String(u), stroke: "#5b3c28", "stroke-width": "1.5", "stroke-opacity": ".54" }), e.appendChild(g);
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
me.styles = I`${Je.styles}:host([map-theme="enchanted_antique"]){--primary-color:#68472f;--primary-text-color:#4c321f;--secondary-text-color:#6f5239;--success-color:#6f6d3c;--error-color:#8b4639;--warning-color:#9a6731;--accent-color:#74513b;--card-background-color:#d9c294;--explorer-room-light-color:#e3a33d;--explorer-room-motion-color:#75573a;--explorer-room-media-color:#71503e;--explorer-room-opening-color:#936031;--explorer-room-panel-background:rgba(218,192,143,.96);--explorer-room-panel-text:#4b311f;--explorer-room-panel-border:rgba(82,50,30,.34);--explorer-room-panel-control:rgba(91,57,34,.12);--explorer-room-panel-row:rgba(255,239,199,.22)}:host([map-theme="enchanted_antique"]) .viewport{background:radial-gradient(circle at 22% 18%,rgba(255,240,195,.42),transparent 28%),radial-gradient(circle at 78% 76%,rgba(91,55,29,.16),transparent 42%),#c4a26e;box-shadow:inset 0 0 34px rgba(64,40,25,.22),inset 0 0 110px rgba(82,50,26,.12)}:host([map-theme="enchanted_antique"]) .viewport::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:2;background:radial-gradient(circle at 18% 24%,rgba(255,226,151,.13),transparent 22%),radial-gradient(circle at 76% 68%,rgba(255,210,112,.08),transparent 28%);mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .viewport::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:3;box-shadow:inset 0 0 44px rgba(60,38,24,.21)}:host([map-theme="enchanted_antique"]) .backdrop{fill:#caa970}:host([map-theme="enchanted_antique"]) .floorplan-source{filter:sepia(.92) saturate(.58) contrast(1.13) brightness(.92) drop-shadow(0 2px 1px rgba(58,35,20,.18)) drop-shadow(2px 3px 3px rgba(56,34,20,.10));opacity:.89;mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .rooms-scene{filter:drop-shadow(2px 3px 2px rgba(58,36,22,.16))}:host([map-theme="enchanted_antique"]) .room polygon{fill:#795132!important;fill-opacity:.085!important;stroke:#4f321f!important;stroke-opacity:.88!important;stroke-width:2.8px!important;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(2px 3px 1.5px rgba(67,41,24,.13));transition:fill-opacity .24s ease,stroke-width .24s ease,filter .24s ease}:host([map-theme="enchanted_antique"]) .room:hover polygon{fill-opacity:.14!important;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(3px 4px 2px rgba(67,41,24,.17))}:host([map-theme="enchanted_antique"]) .room.selected polygon{fill-opacity:.19!important;stroke-width:4px!important;filter:drop-shadow(0 1px .6px rgba(69,42,24,.38)) drop-shadow(4px 5px 3px rgba(67,41,24,.18))}:host([map-theme="enchanted_antique"]) .room-label,:host([map-theme="enchanted_antique"]) .presence-label,:host([map-theme="enchanted_antique"]) .route-status-scene text{fill:#4e321e!important;stroke:rgba(222,199,151,.82)!important;stroke-width:3.5px!important;font-family:Georgia,Cambria,"Times New Roman",serif!important;letter-spacing:.045em}:host([map-theme="enchanted_antique"]) .room-label{font-style:italic;font-weight:700;filter:drop-shadow(1px 1px .35px rgba(73,44,25,.18))}:host([map-theme="enchanted_antique"]) .presence-label{font-weight:700;font-variant:small-caps}:host([map-theme="enchanted_antique"]) .presence-border{stroke:#ead8aa!important;filter:drop-shadow(0 2px 3px rgba(54,34,21,.35))}:host([map-theme="enchanted_antique"]) .presence-avatar-background,:host([map-theme="enchanted_antique"]) .presence-marker{fill:#76543a!important}:host([map-theme="enchanted_antique"]) .footsteps-scene ellipse{fill:#4b301d!important;filter:drop-shadow(0 0 1.3px rgba(66,38,20,.38))}:host([map-theme="enchanted_antique"]) .route-status-scene line{filter:drop-shadow(0 .6px .6px rgba(65,39,23,.28))}:host([map-theme="enchanted_antique"]) .room-reactions-scene polygon{mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .room-reactions-scene [data-reaction-kind="light"],:host([map-theme="enchanted_antique"]) .room-reactions-scene .light{filter:drop-shadow(0 0 5px rgba(238,177,63,.72)) drop-shadow(0 0 14px rgba(238,158,42,.34));mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .antique-paper-scene,:host([map-theme="enchanted_antique"]) .antique-compass{pointer-events:none}@media(prefers-reduced-motion:reduce){:host([map-theme="enchanted_antique"]) .room polygon,:host([map-theme="enchanted_antique"]) .floorplan-source{transition:none!important}}`;
st([
  A({ attribute: "map-theme", reflect: !0 })
], me.prototype, "theme", 2);
st([
  A({ type: Number, attribute: "compass-rotation" })
], me.prototype, "compassRotation", 2);
st([
  A({ type: Number, attribute: "compass-size" })
], me.prototype, "compassSize", 2);
st([
  A({ type: Boolean, attribute: "compass-visible" })
], me.prototype, "compassVisible", 2);
me = st([
  z("explorer-themed-canvas")
], me);
const zo = ["on"], Oo = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function Io(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : [...zo];
}
function dr(e, t) {
  const i = e.visible !== !1, r = e.state_binding, o = Io(r?.active_states);
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
  if (Oo.has(s))
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
function To(e, t) {
  return e.map((i) => dr(i, t));
}
var jo = Object.defineProperty, Do = Object.getOwnPropertyDescriptor, cr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Do(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && jo(t, i, o), o;
};
const ce = "http://www.w3.org/2000/svg", Lo = {
  info: "var(--explorer-zone-info, #2d8f74)",
  warning: "var(--explorer-zone-warning, #f59e0b)",
  danger: "var(--explorer-zone-danger, #d64545)",
  cleaning: "var(--explorer-zone-cleaning, #3b82c4)",
  restricted: "var(--explorer-zone-restricted, #8b5a9e)"
}, qo = {
  info: "i",
  warning: "!",
  danger: "!",
  cleaning: "✦",
  restricted: "×"
};
let qe = class extends me {
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
    return e.color?.trim() || Lo[e.kind ?? "info"];
  }
  appendZoneTitle(e, t) {
    const i = document.createElementNS(ce, "title"), r = t.zone, o = t.entity ? ` · ${t.entity}: ${t.currentState ?? "ukendt"} · aktiv: ${t.activeStates.join(", ")}` : " · altid aktiv";
    i.textContent = `${r.name ?? r.id}${o}`, e.appendChild(i);
  }
  appendZoneAccent(e, t, i, r) {
    if (i !== "cleaning" && i !== "restricted") return;
    const o = document.createElementNS(ce, "polygon");
    o.setAttribute("points", this.zonePolygonPoints(t.points)), o.setAttribute("class", `zone-accent zone-accent-${i}`), o.setAttribute("fill", "none"), o.setAttribute("stroke", r), o.setAttribute("vector-effect", "non-scaling-stroke"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("pointer-events", "none"), i === "cleaning" ? (o.setAttribute("stroke-width", "8"), o.setAttribute("stroke-opacity", ".30"), o.setAttribute("stroke-dasharray", "3 15")) : (o.setAttribute("stroke-width", "9"), o.setAttribute("stroke-opacity", ".20"), o.setAttribute("stroke-dasharray", "2 11")), e.appendChild(o);
  }
  renderZone(e, t, i) {
    const r = t.zone;
    if (!t.active || r.points.length < 3) return;
    const o = r.kind ?? "info", n = this.zoneColor(r), s = document.createElementNS(ce, "g");
    s.setAttribute("class", `dynamic-zone zone-${o} zone-${r.id}${i ? " reduced-motion" : ""}`), s.setAttribute("pointer-events", "none");
    const a = document.createElementNS(ce, "polygon");
    a.setAttribute("class", "zone-shape"), a.setAttribute("points", this.zonePolygonPoints(r.points)), a.setAttribute("fill", n), a.setAttribute("fill-opacity", o === "danger" || o === "restricted" ? ".18" : ".13"), a.setAttribute("stroke", n), a.setAttribute("stroke-width", o === "danger" ? "5" : "4"), a.setAttribute("stroke-opacity", ".88"), a.setAttribute("stroke-linejoin", "round"), a.setAttribute("vector-effect", "non-scaling-stroke"), o === "warning" && a.setAttribute("stroke-dasharray", "16 9"), o === "restricted" && a.setAttribute("stroke-dasharray", "7 7"), o === "cleaning" && a.setAttribute("stroke-dasharray", "4 8"), s.appendChild(a), this.appendZoneAccent(s, r, o, n);
    const l = this.zoneCenter(r), d = document.createElementNS(ce, "g");
    d.setAttribute("transform", `translate(${l.x} ${l.y})`), d.setAttribute("class", "zone-marker");
    const c = document.createElementNS(ce, "circle");
    c.setAttribute("class", "zone-marker-bg"), c.setAttribute("r", "17"), c.setAttribute("fill", "var(--card-background-color, #ffffff)"), c.setAttribute("fill-opacity", ".90"), c.setAttribute("stroke", n), c.setAttribute("stroke-width", "3"), c.setAttribute("vector-effect", "non-scaling-stroke"), d.appendChild(c);
    const p = document.createElementNS(ce, "text");
    if (p.setAttribute("text-anchor", "middle"), p.setAttribute("dominant-baseline", "central"), p.setAttribute("fill", n), p.setAttribute("font-size", "18"), p.setAttribute("font-weight", "900"), p.setAttribute("font-family", "system-ui, sans-serif"), p.textContent = qo[o], d.appendChild(p), s.appendChild(d), r.name) {
      const u = document.createElementNS(ce, "text");
      u.setAttribute("x", String(l.x)), u.setAttribute("y", String(l.y + 36)), u.setAttribute("text-anchor", "middle"), u.setAttribute("class", "zone-label"), u.setAttribute("fill", n), u.setAttribute("font-size", "22"), u.setAttribute("font-weight", "800"), u.setAttribute("font-family", "system-ui, sans-serif"), u.setAttribute("paint-order", "stroke"), u.setAttribute("stroke", "var(--card-background-color, #ffffff)"), u.setAttribute("stroke-width", "5"), u.setAttribute("stroke-linejoin", "round"), u.textContent = r.name, s.appendChild(u);
    }
    this.appendZoneTitle(s, t), e.appendChild(s);
  }
  syncZonesOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e || (e.querySelector(":scope > g.zones-scene")?.remove(), !this.zones.length)) return;
    const i = To(this.zones, (d) => this.hass?.states[d]?.state).filter((d) => d.active && d.zone.points.length >= 3);
    if (!i.length) return;
    const r = document.createElementNS(ce, "g");
    r.setAttribute("class", "zones-scene"), r.setAttribute("aria-label", "Dynamiske zoner"), r.setAttribute("pointer-events", "none");
    const o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    i.forEach((d) => this.renderZone(r, d, o));
    const n = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.route-status-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, n ?? s ?? a ?? l ?? null);
  }
};
qe.styles = I`
    ${me.styles}

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
], qe.prototype, "zones", 2);
qe = cr([
  z("explorer-zones-canvas")
], qe);
var Bo = Object.getOwnPropertyDescriptor, Fo = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Bo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const Vo = "http://www.w3.org/2000/svg", Ho = 4200, Ko = 900, Go = 54, Zo = { person: "Person", pet: "Kæledyr", robot: "Robot", vehicle: "Køretøj", object: "Objekt" }, Oi = { person: [202, 344, 42, 158, 274, 18], pet: [28, 112, 326, 52, 178, 286], robot: [188, 218, 264, 164, 204, 238], vehicle: [12, 210, 38, 330, 186, 262], object: [272, 44, 154, 320, 196, 22] }, Rt = [58, 64, 54, 61, 56, 66], Uo = [8, 6, 10, 7, 9, 5], Wo = [7, 4, 10, 6, 8, 3];
function Ii(e) {
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function Mt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let et = class extends qe {
  constructor() {
    super(...arguments), this.polishPreviousPositions = /* @__PURE__ */ new Map(), this.polishPreviousRooms = /* @__PURE__ */ new Map();
  }
  updated(e) {
    super.updated(e), (e.has("presences") || e.has("theme")) && this.polishSyncPresenceVisuals(), e.has("presences") && this.polishSyncTrails();
  }
  polishPresenceColor(e) {
    const t = e.color?.trim();
    if (t) return t;
    const i = e.type ?? "person", r = Oi[i][Ii(e.id) % Oi[i].length];
    return this.theme === "enchanted_antique" ? `hsl(${r} 34% 38%)` : `hsl(${r} 62% 47%)`;
  }
  polishTrailColor(e) {
    return e.trail_color?.trim() || this.polishPresenceColor(e);
  }
  polishTrailDuration(e) {
    const t = e.trail_duration;
    return Number.isFinite(t) ? Math.round(Mt(t, 1, 60) * 1e3) : Ho;
  }
  polishBasePosition(e) {
    return { x: (e.x ?? 0.5) * v, y: (e.y ?? 0.5) * v };
  }
  polishPersonTrailVariant(e) {
    return Ii(e.id) % Rt.length;
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
        const c = a.shift(), p = this.polishBasePosition(c);
        for (const u of [...i]) {
          const g = r.get(u);
          if (!g) continue;
          const y = this.polishBasePosition(g);
          Math.hypot(p.x - y.x, p.y - y.y) <= Go && (i.delete(u), s.push(g), a.push(g));
        }
      }
      if (s.length < 2) continue;
      const l = [...s].sort((c, p) => c.id.localeCompare(p.id)), d = Math.min(52, 24 + l.length * 4);
      l.forEach((c, p) => {
        const u = this.polishBasePosition(c), g = l.length === 2 ? p === 0 ? Math.PI : 0 : -Math.PI / 2 + Math.PI * 2 * p / l.length, y = Mt(u.x + Math.cos(g) * d, 38, v - 38), m = Mt(u.y + Math.sin(g) * d, 38, v - 64);
        t.set(c.id, { x: y - u.x, y: m - u.y, groupSize: l.length });
      });
    }
    return t;
  }
  polishCreateSvg(e) {
    return document.createElementNS(Vo, e);
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
        const d = this.polishCreateSvg("circle");
        this.polishSetAttributes(d, { cx: String(a), cy: String(l), r: "1.5", fill: i }), o.appendChild(d);
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
      let d = n.querySelector(":scope > g.presence-visual-offset");
      d || (d = this.polishCreateSvg("g"), d.setAttribute("class", "presence-visual-offset"), Array.from(n.children).filter((g) => g.localName.toLowerCase() !== "animatetransform").forEach((g) => d?.appendChild(g)), n.insertBefore(d, n.firstChild)), d.setAttribute("transform", `translate(${l.x} ${l.y})`), d.querySelector(".presence-marker")?.setAttribute("fill", a), d.querySelector(".presence-avatar-background")?.setAttribute("fill", a), d.querySelector(".presence-border")?.setAttribute("stroke", a), this.polishAppendTypeBadge(d, r, a), n.querySelector(":scope > title")?.remove();
      const c = this.polishCreateSvg("title"), p = l.groupSize > 1 ? ` · ${l.groupSize} markører overlapper` : "", u = s === "person" ? ` · fodspor ${this.polishPersonTrailVariant(r) + 1}` : "";
      c.textContent = `${r.name ?? r.id} · ${Zo[s]}${u}${p}`, n.appendChild(c);
    });
  }
  polishRouteConfig() {
    return { type: "custom:ha-explorer-card", rooms: this.rooms, route_nodes: this.routeNodes, route_graph_edges: this.routeGraphEdges, routes: this.routes };
  }
  polishMovementPath(e, t, i, r) {
    if (!i || !r || i === r) return [e, t];
    const o = ri(this.polishRouteConfig(), i, r, (n) => this.hass?.states[n]?.state);
    return o ? [e, ...o.hops.slice(1, -1).map((n) => ({ x: n.point[0] * v, y: n.point[1] * v })), t] : [e, t];
  }
  polishEnsureTrailLayer() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    let t = e.querySelector(":scope > g.presence-trails-scene");
    return t || (t = this.polishCreateSvg("g"), t.setAttribute("class", "presence-trails-scene"), t.setAttribute("aria-label", "Person- og objektspor"), t.setAttribute("pointer-events", "none"), e.insertBefore(t, e.querySelector(":scope > g.presences-scene") ?? null), t);
  }
  polishTrailSpacing(e, t = 0) {
    return e === "person" ? Rt[t] ?? Rt[0] : e === "pet" ? 46 : e === "robot" ? 42 : e === "vehicle" ? 54 : e === "object" ? 62 : 58;
  }
  polishAppendPersonTrailShape(e, t, i) {
    const r = (n, s, a, l) => {
      const d = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(d, { cx: String(n), cy: String(s), rx: String(a), ry: String(l), fill: t }), e.appendChild(d);
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
      const n = this.polishCreateSvg("ellipse");
      this.polishSetAttributes(n, { cx: "0", cy: "2", rx: "5", ry: "6", fill: i }), e.appendChild(n);
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
    }), l = a.reduce((p, u) => p + u.length, 0), d = this.polishTrailSpacing(r, o);
    if (l < d) return;
    const c = Math.min(24, Math.max(3, Math.floor(l / d)));
    for (let p = 0; p < c; p += 1) {
      const u = (p + 1) / (c + 1), g = l * u;
      let y = 0, m = a[a.length - 1];
      for (const de of a) {
        if (y + de.length >= g) {
          m = de;
          break;
        }
        y += de.length;
      }
      const x = m.length > 0 ? (g - y) / m.length : 0, $ = m.end.x - m.start.x, _ = m.end.y - m.start.y, w = p % 2 === 0 ? -1 : 1, S = r === "person" ? Uo[o] ?? 8 : r === "pet" ? 6 : 0, N = r === "person" ? Wo[o] ?? 7 : S ? 7 : 0, k = m.length > 0 ? -_ / m.length : 0, C = m.length > 0 ? $ / m.length : 0, M = m.start.x + $ * x + k * S * w, O = m.start.y + _ * x + C * S * w, Q = Math.atan2(_, $) * 180 / Math.PI + 90, J = Math.round(u * Ko), P = this.polishCreateSvg("g");
      P.setAttribute("class", `trail-mark trail-${r}${r === "person" ? ` trail-person-v${o + 1}` : ""}`), P.setAttribute("data-presence-id", t.id), r === "person" && P.setAttribute("data-trail-style", String(o + 1)), P.setAttribute("transform", `translate(${M} ${O}) rotate(${Q + (S ? w * N : 0)})`), P.setAttribute("opacity", "0"), this.polishAppendTrailShape(P, r, n, o);
      const be = this.polishCreateSvg("animate");
      this.polishSetAttributes(be, { attributeName: "opacity", values: "0;0.78;0.54;0", keyTimes: "0;0.08;0.58;1", begin: "indefinite", dur: `${s}ms`, fill: "freeze" }), P.appendChild(be), i.appendChild(P), window.setTimeout(() => {
        P.isConnected && be.beginElement();
      }, J), window.setTimeout(() => P.remove(), J + s + 120);
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
};
et.styles = I`${qe.styles}.footsteps-scene{display:none}.presence-visual-offset{transition:transform 220ms ease}.presence-type-badge{filter:drop-shadow(0 1px 2px rgba(0,0,0,.22))}.presence-trails-scene .trail-mark{filter:drop-shadow(0 0 1.2px rgba(0,0,0,.20))}.presence-trails-scene .trail-person-v2{opacity:.96}.presence-trails-scene .trail-person-v3{filter:drop-shadow(0 0 1.6px rgba(0,0,0,.24))}.presence-trails-scene .trail-person-v5{filter:drop-shadow(0 0 .8px rgba(0,0,0,.18))}:host([map-theme="enchanted_antique"]) .presence-type-badge{filter:sepia(.35) drop-shadow(0 1px 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-trails-scene .trail-mark{mix-blend-mode:multiply;filter:sepia(.28) saturate(.78) drop-shadow(0 0 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-border{stroke-width:4.5px!important}@media(prefers-reduced-motion:reduce){.presence-visual-offset{transition:none}}`;
et = Fo([
  z("explorer-presence-polish-canvas")
], et);
var Yo = Object.getOwnPropertyDescriptor, Xo = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Yo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const dt = "http://www.w3.org/2000/svg", Ti = 3e4, Qo = 900;
let tt = class extends et {
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
      const [a, l] = t[n], [d, c] = t[s];
      l > r != c > r && i < (d - a) * (r - l) / (c - l || Number.EPSILON) + a && (o = !o);
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
      const o = t.get(r.id) ?? 0, n = o > 0, s = this.magicAfterglowStartedAt.get(r.id), a = s === void 0 ? 1 / 0 : e - s, l = !n && a >= 0 && a < Ti, d = n ? Math.min(1, 0.72 + Math.max(0, o - 1) * 0.12) : l ? Math.max(0, 1 - a / Ti) : 0;
      return !l && s !== void 0 && this.magicAfterglowStartedAt.delete(r.id), { room: r, active: n, afterglow: l, intensity: d };
    }).filter((r) => r.active || r.afterglow);
  }
  magicPolygonPoints(e) {
    return e.points.map(([t, i]) => `${t * v},${i * v}`).join(" ");
  }
  magicScheduleRefresh(e) {
    this.magicRefreshTimer !== void 0 && window.clearTimeout(this.magicRefreshTimer), e.some((t) => t.afterglow) && (this.magicRefreshTimer = window.setTimeout(() => {
      this.magicRefreshTimer = void 0, this.magicSyncRoomAtmosphere();
    }, Qo));
  }
  magicAppendRoom(e, t) {
    const { room: i, active: r, intensity: o } = t;
    if (i.points.length < 3) return;
    const n = this.magicPolygonPoints(i), s = document.createElementNS(dt, "g");
    s.setAttribute("class", `room-magic ${r ? "active" : "afterglow"}`), s.setAttribute("data-room-id", i.id);
    const a = document.createElementNS(dt, "polygon");
    a.setAttribute("class", "room-magic-aura"), a.setAttribute("points", n), a.setAttribute("fill", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))"), a.setAttribute("fill-opacity", String(r ? 0.028 + o * 0.026 : 8e-3 + o * 0.028)), a.setAttribute("stroke", "none"), s.appendChild(a);
    const l = document.createElementNS(dt, "polygon");
    l.setAttribute("class", "room-magic-edge"), l.setAttribute("points", n), l.setAttribute("fill", "none"), l.setAttribute("stroke", "var(--explorer-room-magic-color, var(--primary-color, #03a9f4))"), l.setAttribute("stroke-opacity", String(r ? 0.08 + o * 0.055 : 0.02 + o * 0.07)), l.setAttribute("stroke-width", r ? "4" : "3"), l.setAttribute("stroke-linejoin", "round"), l.setAttribute("vector-effect", "non-scaling-stroke"), s.appendChild(l), e.appendChild(s);
  }
  magicSyncRoomAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-magic-scene")?.remove();
    const t = this.magicActivities(Date.now());
    if (this.magicScheduleRefresh(t), !t.length) return;
    const i = document.createElementNS(dt, "g");
    i.setAttribute("class", "room-magic-scene"), i.setAttribute("aria-label", "Magisk rumaktivitet"), i.setAttribute("pointer-events", "none"), t.forEach((d) => this.magicAppendRoom(i, d));
    const r = e.querySelector(":scope > g.room-temperature-atmosphere-scene"), o = e.querySelector(":scope > g.presence-room-activity-scene"), n = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.presence-trails-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(
      i,
      r ?? o ?? n ?? s ?? a ?? l ?? null
    );
  }
};
tt.styles = I`
    ${et.styles}

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
tt = Xo([
  z("explorer-room-magic-canvas")
], tt);
var Jo = Object.defineProperty, en = Object.getOwnPropertyDescriptor, pr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? en(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Jo(t, i, o), o;
};
const Z = "http://www.w3.org/2000/svg", tn = ["on", "open", "opened", "true"], zt = 600 * 1e3, Ot = 1800 * 1e3, It = 3600 * 1e3, ji = 60 * 1e3, ct = (e) => e * Math.PI / 180;
let Be = class extends tt {
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
    return i ? (t.open_states ?? tn).map((r) => r.toLowerCase()).includes(i) : !1;
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
    const o = Math.max(0, i - r), n = Math.floor(o / 6e4), s = o >= It ? "alert" : o >= Ot ? "warning" : o >= zt ? "watch" : "fresh", a = Math.floor(n / 60), l = n % 60, d = a > 0 ? `åben i ${a} t${l ? ` ${l} min` : ""}` : `åben i ${n} min`, c = s === "fresh" ? "" : a > 0 ? l ? `${a}t ${l}m` : `${a}t` : `${n}m`;
    return { minutes: n, level: s, label: c, description: d };
  }
  scheduleOpeningAgeRefresh(e) {
    this.openingAgeTimer !== void 0 && window.clearTimeout(this.openingAgeTimer);
    let t = 1 / 0;
    for (const i of this.openings.filter((r) => r.visible !== !1)) {
      const r = this.isOpen(i), o = this.openingOpenSince(i, r);
      if (o === void 0) continue;
      const n = Math.max(0, e - o), s = n < zt ? zt : n < Ot ? Ot : n < It ? It : void 0, a = s === void 0 ? ji : Math.max(1e3, s - n + 50);
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
    const t = this.openings.filter((n) => n.visible !== !1);
    if (!t.length) {
      this.scheduleOpeningAgeRefresh(Date.now());
      return;
    }
    const i = document.createElementNS(Z, "g");
    i.setAttribute("class", "dynamic-openings-scene"), i.setAttribute("aria-label", "Dynamiske døre og vinduer"), i.setAttribute("pointer-events", "none");
    const r = Date.now();
    for (const n of t)
      n.kind === "window" ? this.drawWindow(i, n, r) : this.drawDoor(i, n, r);
    const o = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, o ?? null), this.scheduleOpeningAgeRefresh(r);
  }
  line(e, t, i, r, o, n) {
    const s = document.createElementNS(Z, "line");
    return s.setAttribute("x1", String(t)), s.setAttribute("y1", String(i)), s.setAttribute("x2", String(r)), s.setAttribute("y2", String(o)), s.setAttribute("class", n), e.appendChild(s), s;
  }
  appendAgeIndicator(e, t, i, r) {
    if (!r || r.level === "fresh") return;
    const o = document.createElementNS(Z, "g");
    o.setAttribute("class", `opening-age-indicator level-${r.level}`), o.setAttribute("transform", `translate(${t} ${i})`);
    const n = document.createElementNS(Z, "circle");
    n.setAttribute("r", r.level === "alert" ? "12" : "10"), n.setAttribute("class", "opening-age-ring"), o.appendChild(n);
    const s = Math.max(28, r.label.length * 7 + 10), a = document.createElementNS(Z, "rect");
    a.setAttribute("x", "11"), a.setAttribute("y", "-18"), a.setAttribute("width", String(s)), a.setAttribute("height", "17"), a.setAttribute("rx", "8.5"), a.setAttribute("class", "opening-age-badge"), o.appendChild(a);
    const l = document.createElementNS(Z, "text");
    l.setAttribute("x", String(11 + s / 2)), l.setAttribute("y", "-9.3"), l.setAttribute("text-anchor", "middle"), l.setAttribute("dominant-baseline", "central"), l.setAttribute("class", "opening-age-label"), l.textContent = r.label, o.appendChild(l), e.appendChild(o);
  }
  drawDoor(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(28, (t.length ?? 0.055) * v), s = t.angle ?? 0, a = t.open_angle ?? 82, l = t.hinge ?? "start", d = t.swing ?? "left", c = t.point[0] * v, p = t.point[1] * v, u = n / 2, g = ct(s), y = Math.cos(g), m = Math.sin(g), x = -m, $ = y, _ = { x: c - y * u, y: p - m * u }, w = { x: c + y * u, y: p + m * u }, S = l === "start" ? _ : w, N = l === "start" ? w : _, k = s + (l === "start" ? 0 : 180), C = (d === "left" ? -1 : 1) * (l === "start" ? 1 : -1), M = k + (r ? C * a : 0), O = ct(M), Q = { x: S.x + Math.cos(O) * n, y: S.y + Math.sin(O) * n }, J = o ? ` open-age-${o.level}` : "", P = document.createElementNS(Z, "g");
    P.setAttribute("class", `dynamic-opening door ${r ? "is-open" : "is-closed"}${J}`), P.setAttribute("data-opening-id", t.id), o && P.setAttribute("data-open-minutes", String(o.minutes)), this.line(P, _.x, _.y, w.x, w.y, "opening-gap");
    const be = Math.max(7, Math.min(12, n * 0.12));
    for (const ye of [_, w]) this.line(P, ye.x - x * be / 2, ye.y - $ * be / 2, ye.x + x * be / 2, ye.y + $ * be / 2, "door-jamb");
    r && this.line(P, S.x, S.y, N.x, N.y, "door-closed-guide"), this.line(P, S.x, S.y, Q.x, Q.y, "door-leaf");
    const de = document.createElementNS(Z, "circle");
    if (de.setAttribute("cx", String(S.x)), de.setAttribute("cy", String(S.y)), de.setAttribute("r", "4.2"), de.setAttribute("class", "opening-hinge"), P.appendChild(de), r) {
      const ye = document.createElementNS(Z, "path"), ci = ct(k), pi = O, yr = S.x + Math.cos(ci) * n, vr = S.y + Math.sin(ci) * n, xr = S.x + Math.cos(pi) * n, wr = S.y + Math.sin(pi) * n, $r = C > 0 ? 1 : 0, kr = Math.abs(a) > 180 ? 1 : 0;
      ye.setAttribute("d", `M ${yr} ${vr} A ${n} ${n} 0 ${kr} ${$r} ${xr} ${wr}`), ye.setAttribute("class", "door-swing"), P.appendChild(ye);
    }
    const ai = c + x * 14, li = p + $ * 14, He = document.createElementNS(Z, "circle");
    He.setAttribute("cx", String(ai)), He.setAttribute("cy", String(li)), He.setAttribute("r", "5.2"), He.setAttribute("class", "opening-status-dot"), P.appendChild(He), this.appendAgeIndicator(P, ai, li, o);
    const di = document.createElementNS(Z, "title");
    di.textContent = `${t.name ?? t.id} · ${r ? "åben" : "lukket"}${o ? ` · ${o.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, P.appendChild(di), e.appendChild(P);
  }
  drawWindow(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(26, (t.length ?? 0.05) * v), s = t.angle ?? 0, a = t.point[0] * v, l = t.point[1] * v, d = ct(s), c = Math.cos(d), p = Math.sin(d), u = -p, g = c, y = n / 2, m = 5.5, x = { x: a - c * y, y: l - p * y }, $ = { x: a + c * y, y: l + p * y }, _ = o ? ` open-age-${o.level}` : "", w = document.createElementNS(Z, "g");
    w.setAttribute("class", `dynamic-opening window ${r ? "is-open" : "is-closed"}${_}`), w.setAttribute("data-opening-id", t.id), o && w.setAttribute("data-open-minutes", String(o.minutes)), this.line(w, x.x, x.y, $.x, $.y, "window-gap"), this.line(w, x.x + u * m, x.y + g * m, $.x + u * m, $.y + g * m, "window-pane"), this.line(w, x.x - u * m, x.y - g * m, $.x - u * m, $.y - g * m, "window-pane"), this.line(w, x.x + u * m, x.y + g * m, x.x - u * m, x.y - g * m, "window-frame-end"), this.line(w, $.x + u * m, $.y + g * m, $.x - u * m, $.y - g * m, "window-frame-end"), r && (this.line(w, x.x + u * m, x.y + g * m, a + c * y * 0.12 + u * 18, l + p * y * 0.12 + g * 18, "window-open-sash"), this.line(w, a + c * y * 0.12 + u * 18, l + p * y * 0.12 + g * 18, $.x + u * m, $.y + g * m, "window-open-sash"));
    const S = a + u * 17, N = l + g * 17, k = document.createElementNS(Z, "circle");
    k.setAttribute("cx", String(S)), k.setAttribute("cy", String(N)), k.setAttribute("r", "5.2"), k.setAttribute("class", "opening-status-dot"), w.appendChild(k), this.appendAgeIndicator(w, S, N, o);
    const C = document.createElementNS(Z, "title");
    C.textContent = `${t.name ?? t.id} · vindue ${r ? "åbent" : "lukket"}${o ? ` · ${o.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, w.appendChild(C), e.appendChild(w);
  }
};
Be.styles = I`${tt.styles}
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
  z("explorer-openings-canvas")
], Be);
var rn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, at = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? on(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && rn(t, i, o), o;
};
const nn = "http://www.w3.org/2000/svg";
let Ce = class extends Be {
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
    return document.createElementNS(nn, e);
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
        points: i.points.map(([o, n]) => `${o * v},${n * v}`).join(" "),
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
    ], o = [
      "translate(-18 17) scale(1.08 .72)",
      "translate(20 12) scale(1.30 .56)",
      "translate(-8 21) scale(.94 .86)",
      "translate(14 7) scale(1.18 .62)"
    ];
    for (const [n, s, a, l, d] of t) {
      const c = l % 4, p = l % 3, u = this.svg("g");
      this.attrs(u, {
        class: "weather-cloud-position",
        transform: `translate(${n} ${s}) scale(${a})`,
        opacity: String(d)
      });
      const g = this.svg("g");
      this.attrs(g, {
        class: `weather-cloud weather-cloud-${l % 3} weather-cloud-depth-${p} weather-cloud-form-${c}`
      });
      const y = this.svg("g");
      this.attrs(y, {
        class: "weather-cloud-mist weather-cloud-mist-back",
        transform: o[c]
      }), [
        [-72, 30, 102, 24, 0.52],
        [24, 24, 132, 27, 0.42],
        [112, 8, 78, 20, 0.32]
      ].forEach(([C, M, O, Q, J]) => {
        const P = this.svg("ellipse");
        this.attrs(P, {
          cx: String(C),
          cy: String(M),
          rx: String(O),
          ry: String(Q),
          opacity: String(J)
        }), y.appendChild(P);
      }), g.appendChild(y);
      const m = this.svg("path");
      this.attrs(m, {
        d: "M-145 40 C-112 12 -84 2 -55 10 C-30 20 -9 20 15 10 C43 -3 77 1 104 18 C128 32 135 51 121 64 C92 84 48 84 10 79 C-33 78 -82 88 -119 72 C-138 64 -151 51 -145 40 Z",
        class: "weather-cloud-shadow"
      }), g.appendChild(m);
      const x = this.svg("g");
      this.attrs(x, {
        class: "weather-cloud-body",
        filter: `url(#${this.cloudFilterId})`,
        transform: r[l % r.length]
      });
      const $ = this.svg("path");
      this.attrs($, {
        d: "M-145 28 C-132 -4 -106 -22 -76 -20 C-65 -48 -40 -67 -12 -64 C4 -87 38 -91 61 -67 C88 -66 111 -50 122 -29 C148 -18 158 4 147 25 C134 49 103 62 71 62 C42 76 5 76 -27 69 C-67 76 -111 64 -136 47 C-147 40 -151 34 -145 28 Z",
        class: "weather-cloud-base"
      }), x.appendChild($);
      for (const [C, M, O, Q, J] of i) {
        const P = this.svg("ellipse");
        this.attrs(P, {
          cx: String(C),
          cy: String(M),
          rx: String(O),
          ry: String(Q),
          opacity: String(J),
          class: "weather-cloud-puff"
        }), x.appendChild(P);
      }
      const _ = this.svg("path");
      this.attrs(_, {
        d: "M-104 -12 C-76 -34 -47 -40 -20 -30 C8 -19 33 -21 62 -39 C46 -13 22 1 -3 2 C-32 4 -57 -3 -79 3 C-92 4 -101 -2 -104 -12 Z",
        class: "weather-cloud-detail"
      }), x.appendChild(_);
      const w = this.svg("path");
      this.attrs(w, {
        d: "M-151 43 C-111 60 -75 56 -45 48 C-15 41 9 51 35 56 C66 61 100 53 132 39 C106 65 69 77 28 74 C-8 69 -48 70 -81 75 C-111 73 -140 61 -151 43 Z",
        class: "weather-cloud-wisp"
      }), x.appendChild(w), g.appendChild(x);
      const S = this.svg("g");
      this.attrs(S, {
        class: "weather-cloud-mist weather-cloud-mist-front",
        transform: c === 1 ? "translate(8 51) scale(1.28 .40)" : c === 2 ? "translate(-20 43) scale(.88 .62)" : c === 3 ? "translate(18 47) scale(1.16 .46)" : "translate(8 49) scale(.95 .55)"
      }), [
        [-78, 0, 88, 18, 0.38],
        [18, 2, 116, 20, 0.42],
        [108, -2, 64, 15, 0.3]
      ].forEach(([C, M, O, Q, J]) => {
        const P = this.svg("ellipse");
        this.attrs(P, {
          cx: String(C),
          cy: String(M),
          rx: String(O),
          ry: String(Q),
          opacity: String(J)
        }), S.appendChild(P);
      }), g.appendChild(S);
      const N = this.svg("path");
      if (this.attrs(N, {
        d: "M-182 73 C-126 59 -76 66 -31 69 C13 72 59 66 123 51 C80 82 24 89 -29 84 C-78 80 -126 91 -182 73 Z",
        class: "weather-cloud-strand"
      }), g.appendChild(N), c === 1 || c === 3) {
        const C = this.svg("path");
        this.attrs(C, {
          d: c === 1 ? "M-205 89 C-151 74 -94 78 -40 82 C21 87 76 79 152 61 C97 91 31 99 -35 94 C-94 90 -151 101 -205 89 Z" : "M-176 2 C-124 -7 -82 -3 -41 8 C2 19 49 17 112 0 C67 24 16 30 -35 24 C-84 18 -127 24 -176 2 Z",
          class: "weather-cloud-fine-strand"
        }), g.appendChild(C);
      }
      const k = this.svg("path");
      this.attrs(k, {
        d: "M-57 -40 C-39 -61 -12 -71 11 -65 C31 -60 45 -50 52 -36 C30 -43 9 -40 -10 -33 C-29 -25 -46 -29 -57 -40 Z",
        class: "weather-cloud-highlight"
      }), g.appendChild(k), u.appendChild(g), e.appendChild(u);
    }
  }
  appendFog(e) {
    [105, 245, 405, 610, 805, 930].forEach((t, i) => {
      const r = this.svg("path"), o = i % 2 === 0 ? 18 : -22;
      this.attrs(r, {
        d: `M -120 ${t} C 180 ${t + o}, 390 ${t - o}, 620 ${t} S 980 ${t + o}, 1120 ${t}`,
        class: "weather-fog-band"
      }), e.appendChild(r);
    });
  }
  appendRain(e) {
    for (let t = -1; t < 11; t += 1)
      for (let i = -1; i < 14; i += 1) {
        const r = i * 82 + t % 2 * 28, o = t * 105, n = this.svg("line");
        this.attrs(n, { x1: String(r), y1: String(o), x2: String(r - 18), y2: String(o + 42), class: "weather-rain-streak" }), e.appendChild(n);
      }
  }
  appendSnow(e) {
    for (let t = 0; t < 12; t += 1)
      for (let i = 0; i < 13; i += 1) {
        const r = this.svg("circle"), o = 28 + i * 81 + t % 2 * 33, n = 24 + t * 89, s = 2.4 + (t + i) % 3 * 1.25;
        this.attrs(r, { cx: String(o), cy: String(n), r: String(s), class: "weather-snow-flake" }), e.appendChild(r);
      }
  }
  syncWeatherOutsideRooms() {
    const e = this.renderRoot.querySelector("svg.floorplan"), t = this.renderRoot.querySelector("g.scene");
    if (!e || !t || (e.querySelector(`defs[data-weather-mask="${this.weatherMaskId}"]`)?.remove(), t.querySelector(":scope > g.weather-outside-rooms-scene")?.remove(), this.weatherEffect === "clear")) return;
    const i = this.svg("defs");
    i.setAttribute("data-weather-mask", this.weatherMaskId), i.appendChild(this.createWeatherMask()), i.appendChild(this.createCloudFilter()), e.insertBefore(i, e.firstChild);
    const r = this.svg("g");
    if (r.setAttribute("class", `weather-outside-rooms-scene weather-${this.weatherEffect}${this.weatherNight ? " is-night" : ""}`), r.setAttribute("mask", `url(#${this.weatherMaskId})`), r.setAttribute("pointer-events", "none"), r.style.setProperty("--weather-svg-intensity", String(Math.min(1, Math.max(0.25, this.weatherIntensity || 0.6)))), this.weatherEffect === "cloudy" && this.appendClouds(r), this.weatherEffect === "fog" && this.appendFog(r), (this.weatherEffect === "rain" || this.weatherEffect === "storm") && this.appendRain(r), this.weatherEffect === "snow" && this.appendSnow(r), this.weatherEffect === "storm") {
      const n = this.svg("rect");
      this.attrs(n, { x: "0", y: "0", width: String(v), height: String(v), class: "weather-storm-flash" }), r.appendChild(n);
    }
    const o = t.querySelector(":scope > g.rooms-scene");
    t.insertBefore(r, o ?? null);
  }
};
Ce.styles = I`
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
at([
  A({ type: Boolean, attribute: "hide-source-text" })
], Ce.prototype, "hideSourceText", 2);
at([
  A({ attribute: "weather-effect" })
], Ce.prototype, "weatherEffect", 2);
at([
  A({ type: Number, attribute: "weather-intensity" })
], Ce.prototype, "weatherIntensity", 2);
at([
  A({ type: Boolean, attribute: "weather-night" })
], Ce.prototype, "weatherNight", 2);
Ce = at([
  z("explorer-source-clean-canvas")
], Ce);
const sn = (e) => e.strings === void 0, an = {}, ln = (e, t = an) => e._$AH = t;
const dn = rr(class extends or {
  constructor(e) {
    if (super(e), e.type !== _e.PROPERTY && e.type !== _e.ATTRIBUTE && e.type !== _e.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!sn(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === re || t === f) return t;
    const i = e.element, r = e.name;
    if (e.type === _e.PROPERTY) {
      if (t === i[r]) return re;
    } else if (e.type === _e.BOOLEAN_ATTRIBUTE) {
      if (!!t === i.hasAttribute(r)) return re;
    } else if (e.type === _e.ATTRIBUTE && i.getAttribute(r) === t + "") return re;
    return ln(e), t;
  }
});
var cn = Object.defineProperty, pn = Object.getOwnPropertyDescriptor, Ve = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? pn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && cn(t, i, o), o;
};
const hn = [
  { value: "person", label: "Person" },
  { value: "pet", label: "Kæledyr" },
  { value: "robot", label: "Robot" },
  { value: "vehicle", label: "Køretøj" },
  { value: "object", label: "Objekt" }
], un = /* @__PURE__ */ new Set(["sensor", "input_select", "select"]);
function gn(e) {
  return e.split(".", 1)[0] ?? "";
}
function Tt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function mn(e) {
  return Math.min(1, Math.max(0, e));
}
function fn(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let ae = class extends L {
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
    const o = this.config?.rooms?.[e];
    if (!o) return;
    const n = o.presence_anchor ?? { x: 0.5, y: 0.5 };
    this.updateRoom(e, {
      presence_anchor: { ...n, [t]: mn(r) }
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
    const o = fn({
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
      (e, t) => Tt(e).localeCompare(Tt(t), "da")
    );
  }
  renderEntityDatalist(e, t = !1) {
    const i = t ? this.entities.filter((r) => un.has(gn(r.entity_id))) : this.entities;
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
              .value=${dn(e.area_id ?? "")}
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
              .value=${e.type ?? "person"}
              @change=${(n) => this.updatePresence(t, {
      type: n.target.value
    })}
            >
              ${hn.map(
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
            .value=${e.room_id ?? ""}
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
ae.styles = I`
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
Ve([
  A({ attribute: !1 })
], ae.prototype, "hass", 2);
Ve([
  b()
], ae.prototype, "config", 2);
Ve([
  b()
], ae.prototype, "areas", 2);
Ve([
  b()
], ae.prototype, "areaError", 2);
Ve([
  b()
], ae.prototype, "loadingAreas", 2);
ae = Ve([
  z("ha-explorer-card-editor")
], ae);
var bn = Object.defineProperty, yn = Object.getOwnPropertyDescriptor, q = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? yn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && bn(t, i, o), o;
};
const ee = 1e3, pt = (e) => Math.min(1, Math.max(0, e));
function Di(e) {
  return e.length ? { x: e.reduce((t, i) => t + i[0], 0) / e.length, y: e.reduce((t, i) => t + i[1], 0) / e.length } : { x: 0.5, y: 0.5 };
}
function vn(e) {
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function xn(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "room";
}
function Li(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
let j = class extends L {
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
    return t.width && t.height ? [pt((e.clientX - t.left) / t.width), pt((e.clientY - t.top) / t.height)] : [0.5, 0.5];
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
    const s = Li(n.attributes[o.x_attribute ?? "map_x"]), a = Li(n.attributes[o.y_attribute ?? "map_y"]), l = t.physical_meters;
    if (s === void 0 || a === void 0 || !l) return;
    const d = vn(t), c = pt((e[0] - d.minX) / (d.maxX - d.minX || 1)), p = pt((e[1] - d.minY) / (d.maxY - d.minY || 1));
    return { sensor_x: l.flip_x ? l.width - s : s, sensor_y: l.flip_y ? l.height - a : a, room_x: c, room_y: p };
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
    const t = xn(e), i = new Set(this.rooms.map((o) => o.id));
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
        const e = this.draftRoomName.trim() || `Rum ${this.rooms.length + 1}`, t = this.uniqueRoomId(e), i = Di(this.pendingPoints), r = this.meters(), o = { id: t, name: e, points: this.pendingPoints, presence_anchor: i, ...this.draftAreaId ? { area_id: this.draftAreaId } : {}, ...r ? { physical_meters: r } : {} };
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
    const t = e.points.map(([n, s]) => `${n * ee},${s * ee}`).join(" "), i = e.id === this.selectedRoomId, r = Di(e.points), o = i && this.drawingMode === "anchor" && this.pendingAnchor ? this.pendingAnchor : e.presence_anchor ?? r;
    return E`<g style=${this.drawingMode === "idle" ? "pointer-events:auto" : "pointer-events:none"} @click=${(n) => this.selectRoom(n, e.id)}><polygon points=${t} fill="var(--primary-color,#03a9f4)" fill-opacity=${i ? ".30" : ".14"} stroke="var(--primary-color,#03a9f4)" stroke-width=${i ? 7 : 4}/><text x=${r.x * ee} y=${r.y * ee} text-anchor="middle" dominant-baseline="middle">${e.name ?? e.id}</text>${i ? E`<circle cx=${o.x * ee} cy=${o.y * ee} r="15" class="anchor"/>` : f}</g>`;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * ee},${i * ee}`).join(" ");
    return E`${this.pendingPoints.length >= 3 ? E`<polygon points=${e} class="pending-fill"/>` : f}<polyline points=${e} class="pending-line" fill="none"/>${this.pendingPoints.map(([t, i], r) => E`<circle cx=${t * ee} cy=${i * ee} r="13" class="pending-point"/><text x=${t * ee} y=${i * ee - 22} text-anchor="middle">${r + 1}</text>`)}`;
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
j.styles = I`:host{display:block}.drawing-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading h3{margin:3px 0}.heading small{color:var(--secondary-text-color);font-weight:700;letter-spacing:.08em}.instruction,.selected,.warning,.position-cal{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color)}.position-cal{display:grid;gap:9px}.position-cal strong{color:var(--primary-text-color)}.grid,.dimensions{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;align-items:end}.cal-status{display:flex;gap:18px;flex-wrap:wrap}label{display:grid;gap:5px;font-size:.8rem;color:var(--secondary-text-color)}label.toggle{display:flex;align-items:center;gap:8px;min-height:38px;font-size:.9rem;color:var(--primary-text-color)}label.toggle input{width:auto}input,select{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;height:min(58vh,620px);cursor:crosshair}text{fill:var(--primary-text-color);font-size:24px;font-weight:700}.pending-fill{fill:var(--primary-color);fill-opacity:.18;stroke:var(--primary-color);stroke-width:5}.pending-line{stroke:var(--primary-color);stroke-width:6}.pending-point,.anchor{fill:var(--primary-color);stroke:white;stroke-width:4}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{padding:9px 13px;border:1px solid var(--divider-color);border-radius:9px;background:var(--secondary-background-color);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:var(--primary-color)}button.danger{background:var(--error-color,#db4437);color:#fff;border-color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}.selected{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}`;
q([
  A({ attribute: !1 })
], j.prototype, "hass", 2);
q([
  b()
], j.prototype, "roomConfig", 2);
q([
  b()
], j.prototype, "drawingMode", 2);
q([
  b()
], j.prototype, "selectedRoomId", 2);
q([
  b()
], j.prototype, "pendingPoints", 2);
q([
  b()
], j.prototype, "pendingAnchor", 2);
q([
  b()
], j.prototype, "draftRoomName", 2);
q([
  b()
], j.prototype, "draftAreaId", 2);
q([
  b()
], j.prototype, "draftWidth", 2);
q([
  b()
], j.prototype, "draftHeight", 2);
q([
  b()
], j.prototype, "draftFlipX", 2);
q([
  b()
], j.prototype, "draftFlipY", 2);
q([
  b()
], j.prototype, "calA", 2);
q([
  b()
], j.prototype, "calB", 2);
q([
  b()
], j.prototype, "calC", 2);
q([
  b()
], j.prototype, "calibrationMessage", 2);
q([
  b()
], j.prototype, "drawingAreas", 2);
q([
  b()
], j.prototype, "drawingAreaError", 2);
q([
  Ur("ha-explorer-card-editor")
], j.prototype, "baseEditor", 2);
j = q([
  z("ha-explorer-room-drawing-editor")
], j);
function pe(e) {
  return e?.trim() || void 0;
}
function wn(e) {
  const t = e.entity_binding;
  return !!(pe(t?.room_entity) || e.room_id || Number.isFinite(e.x) && Number.isFinite(e.y));
}
function $n(e) {
  const t = [];
  for (const i of e.presences ?? []) {
    const r = pe(i.entity_binding?.entity), o = pe(i.entity_binding?.room_entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "presences" }), o && t.push({ entity: o, source: `${i.name ?? i.id} · rum-tracking`, target: "presences" });
  }
  for (const i of e.rooms ?? []) {
    for (const r of i.reactions ?? []) {
      const o = pe(r.entity);
      o && t.push({ entity: o, source: `${i.name ?? i.id} · ${r.kind}`, target: "room-reactions" });
    }
    for (const r of i.quick_actions ?? []) {
      const o = pe(r.entity);
      o && t.push({ entity: o, source: `${i.name ?? i.id} · ${r.name}`, target: "room-actions" });
    }
  }
  for (const i of e.zones ?? []) {
    const r = pe(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "zones" });
  }
  for (const i of e.openings ?? []) {
    const r = pe(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "openings" });
  }
  for (const i of e.route_nodes ?? []) {
    const r = pe(i.state_binding?.entity);
    r && t.push({ entity: r, source: i.name ?? i.id, target: "route-graph" });
  }
  for (const i of e.route_graph_edges ?? []) {
    const r = pe(i.condition?.entity);
    r && t.push({ entity: r, source: "Betinget route edge", target: "route-graph" });
  }
  return t;
}
function kn(e, t) {
  const i = e.rooms ?? [], r = e.presences ?? [], o = e.zones ?? [], n = e.openings ?? [], s = e.route_nodes ?? [], a = e.route_graph_edges ?? [], l = e.routes ?? [], d = i.flatMap((_) => _.reactions ?? []), c = i.flatMap((_) => _.quick_actions ?? []), p = $n(e), u = [];
  if (t)
    for (const _ of p) {
      const w = t.states[_.entity];
      if (!w) {
        u.push({ ..._, unavailable: !1 });
        continue;
      }
      (w.state === "unavailable" || w.state === "unknown") && u.push({ ..._, unavailable: !0 });
    }
  const g = u.filter((_) => !_.unavailable), y = r.filter((_) => !wn(_)), m = i.filter((_) => _.points.length < 3), x = (e.image ?? e.background ?? "").trim(), $ = [{ id: "floorplan", label: "Plantegning", detail: x ? "Plantegning er valgt." : "Vælg en SVG-, PNG- eller JPG-plantegning.", state: x ? "ready" : "attention", target: "basic" }, { id: "rooms", label: "Rum", detail: i.length ? m.length ? `${i.length} rum · ${m.length} mangler en gyldig polygon.` : `${i.length} rum klar.` : "Tegn mindst ét rum for room-aware tracking og Living Rooms.", state: i.length && !m.length ? "ready" : "attention", target: i.length ? "rooms" : "room-tools" }, { id: "presences", label: "Personer & objekter", detail: r.length ? y.length ? `${r.length} tilføjet · ${y.length} mangler rum/position.` : `${r.length} tracking-profil${r.length === 1 ? "" : "er"} klar.` : "Valgfrit · tilføj personer, kæledyr, robotter eller objekter.", state: r.length ? y.length ? "attention" : "ready" : "optional", target: "presences" }, { id: "entities", label: "Home Assistant-entities", detail: p.length ? t ? g.length ? `${g.length} binding${g.length === 1 ? "" : "er"} findes ikke i Home Assistant.` : u.length ? `${p.length} bindings fundet · ${u.length} er midlertidigt unavailable/unknown.` : `${p.length} live binding${p.length === 1 ? "" : "er"} fundet.` : `${p.length} binding${p.length === 1 ? "" : "er"} · afventer Home Assistant.` : "Ingen live entity-bindings endnu.", state: g.length ? "attention" : p.length ? "ready" : "optional", target: g[0]?.target ?? u[0]?.target ?? "diagnostics" }, { id: "openings", label: "Døre & vinduer", detail: n.length ? `${n.length} dynamisk${n.length === 1 ? " åbning" : "e åbninger"} konfigureret.` : "Valgfrit · placér døre og vinduer og bind dem til kontaktsensorer.", state: n.length ? "ready" : "optional", target: "openings" }, { id: "routing", label: "Routing", detail: a.length || l.length ? `${a.length} graph edges · ${l.length} manuelle routes · ${s.length} nodes.` : "Valgfrit · kortet kan bruges uden route graph.", state: a.length || l.length ? "ready" : "optional", target: a.length ? "route-graph" : "routes" }, { id: "living", label: "Living Rooms", detail: d.length ? `${d.length} rumreaktion${d.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · lys, motion, media og åbninger kan gøre rummene levende.", state: d.length ? "ready" : "optional", target: "room-reactions" }, { id: "quick-actions", label: "Rumhandlinger", detail: c.length ? `${c.length} scene- eller scripthandling${c.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · tilføj scenes og scripts direkte til rummets panel.", state: c.length ? "ready" : "optional", target: "room-actions" }, { id: "zones", label: "Dynamic Areas", detail: o.length ? `${o.length} zone${o.length === 1 ? "" : "r"} konfigureret.` : "Valgfrit · tilføj alarm-, rengørings- eller informationszoner.", state: o.length ? "ready" : "optional", target: "zones" }];
  return { items: $, entityIssues: u, attentionCount: $.filter((_) => _.state === "attention").length, configuredFeatureCount: $.filter((_) => _.state === "ready").length, roomCount: i.length, presenceCount: r.length, zoneCount: o.length, reactionCount: d.length, actionCount: c.length, routeCount: a.length + l.length, nodeCount: s.length };
}
var _n = Object.defineProperty, An = Object.getOwnPropertyDescriptor, oi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? An(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && _n(t, i, o), o;
};
const Sn = {
  ready: "Klar",
  attention: "Tjek",
  optional: "Valgfrit"
};
let it = class extends L {
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
        <span class="state-label">${Sn[e.state]}</span>
        <span class="chevron" aria-hidden="true">›</span>
      </button>
    `;
  }
  render() {
    if (!this.config) return f;
    const e = kn(this.config, this.hass), t = e.attentionCount === 0, i = e.entityIssues.slice(0, 4);
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
it.styles = I`
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
oi([
  A({ attribute: !1 })
], it.prototype, "config", 2);
oi([
  A({ attribute: !1 })
], it.prototype, "hass", 2);
it = oi([
  z("ha-explorer-setup-overview")
], it);
var Cn = Object.defineProperty, En = Object.getOwnPropertyDescriptor, hr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? En(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Cn(t, i, o), o;
};
const jt = [
  ["classic", "Classic", "Den neutrale Home Assistant Explorer-stil."],
  [
    "enchanted_antique",
    "Enchanted Antique Map",
    "Original magisk kortstil med pergament, sepia-blæk og levende kortdetaljer."
  ]
], Nn = [
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
  ["hail", "🧊 Hagl"]
];
let wt = class extends L {
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
      ]
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
    const e = jt.find((a) => a[0] === this.theme) ?? jt[0], t = this.dayNight, i = this.compass, r = this.alarm, o = this.occupancy, n = this.weather, s = this.config.appearance?.hide_source_text ?? !1;
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
            ${jt.map(
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
                      ${Nn.map(
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
wt.styles = I`
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
hr([
  A({ attribute: !1 })
], wt.prototype, "config", 2);
wt = hr([
  z("ha-explorer-theme-editor")
], wt);
var Pn = Object.defineProperty, Rn = Object.getOwnPropertyDescriptor, ur = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Rn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Pn(t, i, o), o;
};
const qi = { person: "Person · skoaftryk", pet: "Kæledyr · poteaftryk", robot: "Robot · hjulspor", vehicle: "Køretøj · dobbelte hjulspor", object: "Objekt · magisk spor" };
let $t = class extends L {
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
      return h`<article class="profile"><div class="profile-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><span class="type-badge">${qi[r]}</span></div><div class="grid two"><label>Farve (valgfri)<input .value=${t.color ?? ""} placeholder="Automatisk stabil farve" @change=${(o) => this.updateOptionalText(i, "color", o.target.value)}/><small>Farven på selve markøren. Tom = automatisk.</small></label><label>Ikon (valgfri)<input .value=${t.icon ?? ""} placeholder="Automatisk type-ikon" maxlength="8" @change=${(o) => this.updateOptionalText(i, "icon", o.target.value)}/><small>Bruges i den store markør; type-badget vises stadig.</small></label></div><label class="toggle"><input type="checkbox" .checked=${t.visible !== !1} @change=${(o) => this.updatePresence(i, { visible: o.target.checked })}/><span><strong>Vis på kortet</strong><small>Skjuler markøren manuelt; tracking-konfigurationen bevares.</small></span></label><div class="trail-box"><div class="trail-heading"><strong>👣 Bevægelsesspor</strong><small>${qi[r]}</small></div><label class="toggle"><input type="checkbox" .checked=${t.trail_visible !== !1} @change=${(o) => this.updatePresence(i, { trail_visible: o.target.checked })}/><span><strong>Vis spor</strong><small>Kan slås fra uden at skjule personen eller objektet.</small></span></label><div class="grid two"><label>Sporfarve (valgfri)<input .value=${t.trail_color ?? ""} placeholder="Samme som markør" @change=${(o) => this.updateOptionalText(i, "trail_color", o.target.value)}/><small>Fx #4b301d. Tom = markørens farve.</small></label><label>Varighed (sekunder)<input type="number" min="1" max="60" step="1" .value=${String(t.trail_duration ?? 4.2)} @change=${(o) => this.updateTrailDuration(i, o.target.value)}/><small>Hvor længe sporene falmer på kortet. 1–60 sek.</small></label></div></div></article>`;
    })}</div>` : h`<div class="empty">Tilføj først en person eller et objekt i sektionen ovenfor.</div>`}${e.length ? h`<div class="note">Sportypen vælges automatisk efter type. Reduced Motion deaktiverer bevægelsesspor, men markørerne forbliver synlige.</div>` : f}</section>`;
  }
};
$t.styles = I`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.heading,.profile-heading,.trail-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.heading>div,.profile-heading>div{display:grid;gap:3px}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:0;font-size:1rem}.count,.type-badge{border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);white-space:nowrap}.count{padding:5px 9px;font-size:.78rem}.type-badge{padding:4px 8px;font-size:.72rem}.intro,.note{margin:0;color:var(--secondary-text-color);font-size:.86rem;line-height:1.45}.profiles{display:grid;gap:10px}.profile{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.profile-heading small,label small,.toggle small,.trail-heading small{color:var(--secondary-text-color);font-size:.76rem;font-weight:400;line-height:1.35}.grid{display:grid;gap:10px}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}label{display:grid;gap:6px;font-weight:600}input[type="text"],input:not([type]),input[type="number"]{box-sizing:border-box;width:100%;min-width:0;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:9px;padding-top:2px}.toggle input{margin-top:3px}.toggle span{display:grid;gap:2px}.trail-box{display:grid;gap:11px;padding:12px;border:1px dashed var(--divider-color);border-radius:9px;background:var(--card-background-color)}.trail-heading{align-items:center}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}.empty{color:var(--secondary-text-color);text-align:center;font-size:.84rem}@media(max-width:600px){.grid.two{grid-template-columns:1fr}.heading,.profile-heading{align-items:flex-start}.type-badge{white-space:normal;text-align:right}}`;
ur([
  A({ attribute: !1 })
], $t.prototype, "config", 2);
$t = ur([
  z("ha-explorer-presence-polish-editor")
], $t);
var Mn = Object.defineProperty, zn = Object.getOwnPropertyDescriptor, ni = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? zn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Mn(t, i, o), o;
};
function Dt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function On(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let rt = class extends L {
  emit(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  get entities() {
    return Object.values(this.hass?.states ?? {}).sort((e, t) => Dt(e).localeCompare(Dt(t), "da"));
  }
  updatePresence(e, t) {
    if (!this.config) return;
    const i = [...this.config.presences ?? []];
    i[e] && (i[e] = { ...i[e], ...t }, this.emit({ ...this.config, presences: i }));
  }
  updateBinding(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { entity_binding: On({ ...i.entity_binding, ...t }) });
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
    return h`<datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${Dt(t)}</option>`)}</datalist>`;
  }
  render() {
    const e = (this.config?.presences ?? []).filter((t) => (t.type ?? "person") === "person");
    return this.config ? h`<section class="panel"><div class="heading"><div><span class="eyebrow">Multi-Person & Identity · v0.36.1</span><h3>Hvem er hvor?</h3></div><button class="primary" @click=${this.addPerson}>+ Tilføj person</button></div><p class="intro">Identity Fusion adskiller personens identitet fra positionssensoren. Bind fx <code>person.marc</code> som profil og et Shelly/mmWave-target som live position. Flere personer kan være synlige og bevæge sig samtidig.</p>${e.length ? e.map((t) => {
      const i = (this.config?.presences ?? []).indexOf(t), r = t.entity_binding ?? {}, o = `identity-${i}`, n = `position-${i}`;
      return h`<article class="person-card"><div class="person-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><button class="danger" @click=${() => this.removePerson(i)}>Fjern</button></div><label>Navn på kortet<input .value=${t.name ?? ""} placeholder="Marc" @change=${(s) => this.updatePresence(i, { name: s.target.value.trim() || void 0 })}/></label><div class="grid two"><label>Identitets-entitet<input list=${o} .value=${r.entity ?? ""} placeholder="person.marc" @change=${(s) => this.updateBinding(i, { entity: s.target.value.trim() || void 0 })}/>${this.datalist(o)}<small>Leverer navn/avatar/status. Typisk en <code>person.*</code>-entity.</small></label><label>Live positions-entitet<input list=${n} .value=${r.position_entity ?? ""} placeholder="sensor.stue_presence_stuen_target_1" @change=${(s) => this.updateBinding(i, { position_entity: s.target.value.trim() || void 0 })}/>${this.datalist(n)}<small>Leverer X/Y. Hvis tom bruges identitets-entiteten som før.</small></label></div><div class="grid three"><label>Koordinatsystem<select .value=${r.coordinate_space ?? "normalized"} @change=${(s) => this.updateBinding(i, { coordinate_space: s.target.value })}><option value="normalized">Normalized 0–1</option><option value="meters">Hele kortet i meter</option><option value="room_meters">Rum i meter</option></select></label><label>X-attribut<input .value=${r.x_attribute ?? (r.coordinate_space === "room_meters" ? "map_x" : "")} placeholder="map_x" @change=${(s) => this.updateBinding(i, { x_attribute: s.target.value.trim() || void 0 })}/></label><label>Y-attribut<input .value=${r.y_attribute ?? (r.coordinate_space === "room_meters" ? "map_y" : "")} placeholder="map_y" @change=${(s) => this.updateBinding(i, { y_attribute: s.target.value.trim() || void 0 })}/></label></div><label>Rum til room_meters<select .value=${t.room_id ?? ""} @change=${(s) => this.updatePresence(i, { room_id: s.target.value || void 0 })}><option value="">Ingen</option>${(this.config?.rooms ?? []).map((s) => h`<option value=${s.id}>${s.name ?? s.id}</option>`)}</select><small>Alle targets i samme rum genbruger rummets 3-punktskalibrering.</small></label></article>`;
    }) : h`<div class="empty">Ingen personer er tilføjet endnu.</div>`}<div class="note">Første version binder identitet til et valgt target. En senere Identity Matching-del kan bevare navnet automatisk, hvis en mmWave-sensor bytter target-numre.</div></section>` : f;
  }
};
rt.styles = I`:host{display:block;min-width:0;max-width:100%;container-type:inline-size}.panel,.person-card,.grid,label,.heading>div,.person-heading>div{min-width:0}.panel{display:grid;gap:14px;width:100%;max-width:100%;box-sizing:border-box;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color);overflow:hidden}.heading,.person-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;min-width:0}.heading>div,.person-heading>div{display:grid;gap:3px}.eyebrow{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:0;font-size:1rem}.intro,.note,small{color:var(--secondary-text-color);line-height:1.4;overflow-wrap:anywhere}.intro,.note{margin:0;font-size:.86rem}.person-card{display:grid;gap:12px;width:100%;max-width:100%;box-sizing:border-box;padding:14px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color);overflow:hidden}label{display:grid;gap:6px;font-weight:600;max-width:100%}.grid{display:grid;gap:10px;width:100%;max-width:100%}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr) minmax(0,.85fr)}input,select,button{box-sizing:border-box;max-width:100%;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}input,select{width:100%;min-width:0}input{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button{cursor:pointer}.primary{border-color:var(--primary-color);color:var(--primary-color);font-weight:700}.danger{color:var(--error-color,#db4437);flex:0 0 auto}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}code{font-size:.9em;overflow-wrap:anywhere}@container (max-width:560px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}.person-heading{align-items:center}}@container (max-width:390px){.panel{padding:12px}.person-card{padding:11px}.person-heading{flex-wrap:wrap}.person-heading .danger{margin-left:auto}}@media(max-width:700px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}}`;
ni([
  A({ attribute: !1 })
], rt.prototype, "hass", 2);
ni([
  A({ attribute: !1 })
], rt.prototype, "config", 2);
rt = ni([
  z("ha-explorer-identity-editor")
], rt);
var In = Object.defineProperty, Tn = Object.getOwnPropertyDescriptor, ne = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Tn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && In(t, i, o), o;
};
const ve = 1e3, Bi = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Advarsel" },
  { value: "danger", label: "Fare / alarm" },
  { value: "cleaning", label: "Rengøring" },
  { value: "restricted", label: "Begrænset område" }
];
function Fi(e) {
  return Math.min(1, Math.max(0, e));
}
function jn(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "zone";
}
function Lt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function Dn(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let X = class extends L {
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
      (e, t) => Lt(e).localeCompare(Lt(t), "da")
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
    const t = jn(e), i = new Set(this.zones.map((o) => o.id));
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
          active_states: Dn(this.draftStates)
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
    const t = e.points.map(([r, o]) => `${r * ve},${o * ve}`).join(" "), i = e.id === this.selectedZoneId;
    return E`
      <g class=${i ? "zone selected" : "zone"} @click=${(r) => {
      this.drawing || (r.stopPropagation(), this.selectZone(e));
    }}>
        <polygon points=${t}></polygon>
        ${e.name ? E`<text x=${e.points.reduce((r, o) => r + o[0], 0) / e.points.length * ve} y=${e.points.reduce((r, o) => r + o[1], 0) / e.points.length * ve} text-anchor="middle">${e.name}</text>` : f}
      </g>
    `;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * ve},${i * ve}`).join(" ");
    return E`
      ${this.pendingPoints.length >= 3 ? E`<polygon class="pending-fill" points=${e}></polygon>` : f}
      <polyline class="pending-line" points=${e}></polyline>
      ${this.pendingPoints.map(([t, i], r) => E`
        <g transform=${`translate(${t * ve} ${i * ve})`}>
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
            ${Bi.map((t) => h`<option value=${t.value}>${t.label}</option>`)}
          </select>
        </label>
        <label class="wide">
          Home Assistant entity · valgfri
          <input list=${e} .value=${this.draftEntity} placeholder="input_boolean.alarm_zone" @change=${(t) => this.draftEntity = t.target.value} />
          <datalist id=${e}>
            ${this.entities.map((t) => h`<option value=${t.entity_id}>${Lt(t)}</option>`)}
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
              ${e ? E`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}
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
                    <span><strong>${r.name ?? r.id}</strong><small>${Bi.find((o) => o.value === (r.kind ?? "info"))?.label}</small></span>
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
X.styles = I`
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
], X.prototype, "hass", 2);
ne([
  A({ attribute: !1 })
], X.prototype, "config", 2);
ne([
  b()
], X.prototype, "selectedZoneId", 2);
ne([
  b()
], X.prototype, "drawing", 2);
ne([
  b()
], X.prototype, "pendingPoints", 2);
ne([
  b()
], X.prototype, "draftName", 2);
ne([
  b()
], X.prototype, "draftKind", 2);
ne([
  b()
], X.prototype, "draftEntity", 2);
ne([
  b()
], X.prototype, "draftStates", 2);
ne([
  b()
], X.prototype, "draftVisible", 2);
X = ne([
  z("ha-explorer-zones-editor")
], X);
var Ln = Object.defineProperty, qn = Object.getOwnPropertyDescriptor, G = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? qn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Ln(t, i, o), o;
};
const Re = 1e3, Vi = ["on", "open", "opened", "true"];
function Hi(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function Bn(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "opening";
}
function qt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function Fn(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let V = class extends L {
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
    return Object.values(this.hass?.states ?? {}).filter((e) => e.entity_id.startsWith("binary_sensor.") || e.entity_id.startsWith("cover.") || e.entity_id.startsWith("input_boolean.") || e.entity_id.startsWith("sensor.")).sort((e, t) => qt(e).localeCompare(qt(t), "da"));
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  uniqueId(e) {
    const t = Bn(e), i = new Set(this.openings.map((o) => o.id));
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
    return { id: e, name: this.draftName.trim() || e, kind: this.draftKind, point: this.draftPoint, angle: this.draftAngle, length: this.draftLength, hinge: this.draftHinge, swing: this.draftSwing, open_angle: this.draftOpenAngle, visible: this.draftVisible, ...t ? { state_binding: { entity: t, open_states: Fn(this.draftStates) } } : {} };
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
    const t = e.id === this.selectedId, i = e.point[0] * Re, r = e.point[1] * Re, o = (e.length ?? 0.055) * Re, n = (e.angle ?? 0) * Math.PI / 180, s = Math.cos(n) * o / 2, a = Math.sin(n) * o / 2;
    return E`<g class=${t ? "opening selected" : "opening"} @click=${(l) => {
      this.placing || (l.stopPropagation(), this.select(e));
    }}><line x1=${i - s} y1=${r - a} x2=${i + s} y2=${r + a}></line><circle cx=${i} cy=${r} r=${t ? 11 : 8}></circle>${e.name ? E`<text x=${i} y=${r - 18} text-anchor="middle">${e.name}</text>` : f}</g>`;
  }
  renderDraft() {
    if (this.selected || !this.placing && this.draftName === "Ny dør") return f;
    const e = this.draftPoint[0] * Re, t = this.draftPoint[1] * Re, i = this.draftLength * Re, r = this.draftAngle * Math.PI / 180, o = Math.cos(r) * i / 2, n = Math.sin(r) * i / 2;
    return E`<g class="opening draft"><line x1=${e - o} y1=${t - n} x2=${e + o} y2=${t + n}></line><circle cx=${e} cy=${t} r="11"></circle></g>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = !!this.selected || this.placing || this.draftName !== "Ny dør";
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Dynamic Doors & Windows · v0.38</span><h3>Døre og vinduer</h3><p>Placér åbninger direkte på plantegningen og bind dem til Home Assistant.</p></div><span class="count">${this.openings.length} åbninger</span></div><div class="toolbar"><button class="primary" @click=${() => this.beginNew("door")}>+ Ny dør</button><button @click=${() => this.beginNew("window")}>+ Nyt vindue</button></div><div class="workspace"><div class="map-wrap"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}><rect width="1000" height="1000" class="backdrop"></rect>${e ? E`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}${this.openings.map((i) => this.renderOpening(i))}${this.renderDraft()}</svg>${this.placing ? h`<div class="map-help">Klik på kortet hvor ${this.draftKind === "door" ? "døren" : "vinduet"} skal sidde</div>` : f}</div><div class="sidebar">${this.openings.length ? this.openings.map((i) => h`<button class=${i.id === this.selectedId ? "row selected" : "row"} @click=${() => this.select(i)}><span><strong>${i.name ?? i.id}</strong><small>${i.kind === "door" ? "Dør" : "Vindue"}</small></span><em>${this.stateText(i)}</em></button>`) : h`<div class="empty">Ingen døre eller vinduer endnu.</div>`}</div></div>${t ? this.renderForm() : f}</section>`;
  }
  renderForm() {
    const e = "explorer-opening-entities";
    return h`<div class="form-grid"><label>Navn<input .value=${this.draftName} @input=${(t) => this.draftName = t.target.value}></label><label>Type<select .value=${this.draftKind} @change=${(t) => this.draftKind = t.target.value}><option value="door">Dør</option><option value="window">Vindue</option></select></label><label>Vinkel · ${Math.round(this.draftAngle)}°<input type="range" min="0" max="359" step="1" .value=${String(this.draftAngle)} @input=${(t) => this.draftAngle = Number(t.target.value)}></label><label>Længde · ${Math.round(this.draftLength * 1e3) / 10}%<input type="range" min="0.025" max="0.14" step="0.0025" .value=${String(this.draftLength)} @input=${(t) => this.draftLength = Number(t.target.value)}></label>${this.draftKind === "door" ? h`<label>Hængsel<select .value=${this.draftHinge} @change=${(t) => this.draftHinge = t.target.value}><option value="start">Start</option><option value="end">Slut</option></select></label><label>Svingretning<select .value=${this.draftSwing} @change=${(t) => this.draftSwing = t.target.value}><option value="left">Venstre</option><option value="right">Højre</option></select></label><label>Åbningsvinkel · ${Math.round(this.draftOpenAngle)}°<input type="range" min="30" max="150" step="1" .value=${String(this.draftOpenAngle)} @input=${(t) => this.draftOpenAngle = Number(t.target.value)}></label>` : f}<label class="wide">Home Assistant entity · valgfri<input list=${e} .value=${this.draftEntity} placeholder="binary_sensor.stuedor" @change=${(t) => this.draftEntity = t.target.value}><datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${qt(t)}</option>`)}</datalist><small>Vælg fx en dør-/vindueskontakt eller cover-entity.</small></label><label>Åben state(s)<input .value=${this.draftStates} placeholder="on, open" @change=${(t) => this.draftStates = t.target.value}><small>Kommasepareret.</small></label><label class="toggle"><input type="checkbox" .checked=${this.draftVisible} @change=${(t) => this.draftVisible = t.target.checked}>Vis på kortet</label><div class="actions wide"><button @click=${() => this.placing = !0}>Placér igen</button>${this.selected ? h`<button class="danger" @click=${this.deleteSelected}>Slet</button>` : f}<button class="primary" @click=${this.save} ?disabled=${this.placing}>Gem</button></div></div>`;
  }
};
V.styles = I`:host{display:block;margin-top:16px;color:var(--primary-text-color)}.panel{border:1px solid var(--divider-color,#d7dbe0);border-radius:14px;padding:16px;background:var(--card-background-color,#fff)}.heading{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:4px 0;font-size:1.05rem}p{margin:0;color:var(--secondary-text-color);font-size:.86rem}.count{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color,#f2f4f7);font-size:.75rem;white-space:nowrap}.toolbar{display:flex;gap:8px;margin-top:14px}.workspace{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(190px,.8fr);gap:14px;margin-top:12px}.map-wrap{position:relative;min-height:300px;border-radius:12px;overflow:hidden;border:1px solid var(--divider-color,#d7dbe0);background:#d8c9a7}svg{width:100%;height:100%;min-height:300px;display:block;cursor:crosshair}.backdrop{fill:#d8c9a7}.opening{cursor:pointer;pointer-events:all}.opening line{stroke:var(--primary-text-color,#1f2937);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}.opening circle{fill:var(--card-background-color,#fff);stroke:var(--primary-color,#03a9f4);stroke-width:4;vector-effect:non-scaling-stroke}.opening.selected line{stroke:var(--primary-color,#03a9f4);stroke-width:10}.opening.draft line{stroke-dasharray:12 8}.opening text{fill:var(--primary-text-color,#1f2937);stroke:white;stroke-width:5;paint-order:stroke;font-size:20px;font-weight:700;pointer-events:none}.map-help{position:absolute;left:10px;bottom:10px;padding:6px 9px;border-radius:8px;background:rgba(255,255,255,.9);color:#344054;font-size:.75rem;pointer-events:none}.sidebar{display:flex;flex-direction:column;gap:7px;max-height:330px;overflow:auto}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;width:100%}.row.selected{border-color:var(--primary-color);box-shadow:0 0 0 1px var(--primary-color)}.row span{display:flex;flex-direction:column}.row small,.row em{font-size:.68rem;color:var(--secondary-text-color);font-style:normal}.row em{text-align:right}.empty{padding:12px;border:1px dashed var(--divider-color);border-radius:10px;color:var(--secondary-text-color);font-size:.8rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;margin-top:14px;padding-top:14px;border-top:1px solid var(--divider-color)}label{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:650}.wide{grid-column:1/-1}.toggle{flex-direction:row;align-items:center;align-self:end;padding-bottom:8px}input,select{box-sizing:border-box;width:100%;border:1px solid var(--divider-color,#cfd4da);border-radius:8px;padding:8px 9px;background:var(--card-background-color,#fff);color:var(--primary-text-color)}input[type=range]{padding:4px 0}label small{color:var(--secondary-text-color);font-weight:400}.actions{display:flex;justify-content:flex-end;gap:8px}button{border:1px solid var(--divider-color,#cfd4da);border-radius:9px;padding:9px 11px;background:var(--card-background-color,#fff);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color,#03a9f4);color:white;border-color:transparent;font-weight:700}button.danger{color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:700px){.workspace,.form-grid{grid-template-columns:1fr}.wide{grid-column:auto}}`;
G([
  A({ attribute: !1 })
], V.prototype, "hass", 2);
G([
  A({ attribute: !1 })
], V.prototype, "config", 2);
G([
  b()
], V.prototype, "selectedId", 2);
G([
  b()
], V.prototype, "placing", 2);
G([
  b()
], V.prototype, "draftName", 2);
G([
  b()
], V.prototype, "draftKind", 2);
G([
  b()
], V.prototype, "draftPoint", 2);
G([
  b()
], V.prototype, "draftAngle", 2);
G([
  b()
], V.prototype, "draftLength", 2);
G([
  b()
], V.prototype, "draftHinge", 2);
G([
  b()
], V.prototype, "draftSwing", 2);
G([
  b()
], V.prototype, "draftOpenAngle", 2);
G([
  b()
], V.prototype, "draftEntity", 2);
G([
  b()
], V.prototype, "draftStates", 2);
G([
  b()
], V.prototype, "draftVisible", 2);
V = G([
  z("ha-explorer-openings-editor")
], V);
var Vn = Object.defineProperty, Hn = Object.getOwnPropertyDescriptor, se = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Hn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Vn(t, i, o), o;
};
const Bt = { light: "Lampe / lys", motion: "Bevægelsessensor", media: "TV / media", opening: "Dør / vindue", temperature: "Temperatur", fireplace: "Pejs / ildsted" }, Ft = { light: "✦", motion: "◉", media: "▶", opening: "↗", temperature: "°", fireplace: "🔥" }, Vt = (e) => Math.min(1, Math.max(0, e));
let W = class extends L {
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
    const e = this.parseStates(this.draftStates), t = { kind: this.draftKind, entity: this.draftEntity.trim(), ...this.draftKind === "temperature" || !e.length ? {} : { active_states: e }, ...this.draftPosition ? { position: { ...this.draftPosition } } : {}, ...this.draftKind === "fireplace" ? { intensity: Vt(this.draftIntensity), radius: Math.min(220, Math.max(30, this.draftRadius)) } : {} }, i = [...this.selectedRoom.reactions ?? []];
    this.editingIndex === void 0 ? i.push(t) : i[this.editingIndex] = t, this.updateSelectedRoom(i), this.cancelEdit();
  }
  beginEdit(e) {
    const t = this.selectedRoom, i = t?.reactions?.[e];
    !t || !i || (this.editingIndex = e, this.draftKind = i.kind, this.draftEntity = i.entity, this.draftStates = i.kind === "temperature" ? "" : (i.active_states?.length ? i.active_states : mt(i.kind)).join(", "), this.draftPosition = Ze(t, i), this.draftIntensity = i.intensity ?? 0.75, this.draftRadius = i.radius ?? 90);
  }
  cancelEdit() {
    this.editingIndex = void 0, this.draftKind = "light", this.draftEntity = "", this.draftStates = mt("light").join(", "), this.draftPosition = void 0, this.draftIntensity = 0.75, this.draftRadius = 90;
  }
  removeReaction(e) {
    this.selectedRoom && (this.updateSelectedRoom((this.selectedRoom.reactions ?? []).filter((t, i) => i !== e)), this.editingIndex === e && this.cancelEdit());
  }
  changeKind(e) {
    this.draftKind = e, this.draftEntity = "", this.draftStates = e === "temperature" ? "" : mt(e).join(", "), e === "fireplace" && (this.draftIntensity = 0.75, this.draftRadius = 90);
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
    !i.width || !i.height || (this.draftPosition = { x: Vt((e.clientX - i.left) / i.width), y: Vt((e.clientY - i.top) / i.height) });
  }
  preview(e) {
    const t = this.config?.image ?? this.config?.background ?? "", i = this.draftPosition ?? Ze(e);
    return h`<div class="placement"><div><strong>Fysisk placering</strong><small>Klik på plantegningen dér hvor entity'en sidder.</small></div><div class="preview" @click=${this.handlePreviewClick}>${t ? h`<img src=${t} alt="">` : f}<svg viewBox="0 0 ${v} ${v}" preserveAspectRatio="none"><polygon points=${e.points.map(([r, o]) => `${r * v},${o * v}`).join(" ")}></polygon>${(e.reactions ?? []).map((r) => {
      const o = Ze(e, r);
      return h`<g class="existing" transform=${`translate(${o.x * v} ${o.y * v})`}><circle r="13"></circle><text>${Ft[r.kind]}</text></g>`;
    })}<g class="draft-point" transform=${`translate(${i.x * v} ${i.y * v})`}><circle r=${this.draftKind === "fireplace" ? "18" : "14"}></circle><text>${Ft[this.draftKind]}</text></g></svg></div><small>${(i.x * 100).toFixed(1)} % / ${(i.y * 100).toFixed(1)} %</small></div>`;
  }
  statusLabel(e, t) {
    const i = sr(e, t, (r) => this.state(r));
    return e.kind === "temperature" && i.numericValue !== void 0 ? `${i.numericValue}${i.unit ? ` ${i.unit}` : "°"}` : i.active ? `Aktiv · ${i.currentState}` : `Inaktiv · ${i.currentState ?? "ukendt"}`;
  }
  render() {
    if (!this.config) return f;
    const e = this.selectedRoom, t = e?.reactions ?? [], i = this.options(), r = i.some((o) => o.id === this.draftEntity);
    return h`<section class="editor"><div class="heading"><div><span>Living Entity Points · Fireplace</span><h3>Rumreaktioner</h3></div><b>${this.rooms.reduce((o, n) => o + (n.reactions?.length ?? 0), 0)} punkter</b></div><p class="intro">Placér lys, sensorer, medier og nu også pejs/ildsted direkte på kortet.</p>${this.rooms.length ? h`<label>Rum<select .value=${this.selectedRoomId} @change=${(o) => {
      this.selectedRoomId = o.target.value, this.cancelEdit();
    }}>${this.rooms.map((o) => h`<option value=${o.id}>${o.name ?? o.id}</option>`)}</select></label><div class="draft"><strong>${this.editingIndex === void 0 ? "Nyt entity-punkt" : "Redigér entity-punkt"}</strong><div class="grid"><label>Type<select .value=${this.draftKind} @change=${(o) => this.changeKind(o.target.value)}>${Object.keys(Bt).map((o) => h`<option value=${o}>${Bt[o]}</option>`)}</select></label><label>Home Assistant entity<select .value=${this.draftEntity} @change=${(o) => this.draftEntity = o.target.value}><option value="">Vælg entity…</option>${this.draftEntity && !r ? h`<option value=${this.draftEntity}>${this.draftEntity} · eksisterende</option>` : f}${i.map((o) => h`<option value=${o.id}>${o.label === o.id ? o.id : `${o.label} · ${o.id}`}</option>`)}</select></label>${this.draftKind === "temperature" ? h`<div class="note">Temperaturen læses automatisk fra sensoren.</div>` : h`<label>Aktiv state(s)<input .value=${this.draftStates} @input=${(o) => this.draftStates = o.target.value}><small>Flere states adskilles med komma.</small></label>`}${this.draftKind === "fireplace" ? h`<label>🔥 Intensitet · ${Math.round(this.draftIntensity * 100)}%<input type="range" min="0.2" max="1" step="0.05" .value=${String(this.draftIntensity)} @input=${(o) => this.draftIntensity = Number(o.target.value)}></label><label>Glød-radius · ${Math.round(this.draftRadius)}<input type="range" min="30" max="220" step="5" .value=${String(this.draftRadius)} @input=${(o) => this.draftRadius = Number(o.target.value)}><small>Hvor langt den varme ildglød breder sig omkring pejsen.</small></label>` : f}</div>${e ? this.preview(e) : f}<div class="actions"><button @click=${this.save} ?disabled=${!this.draftEntity.trim() || this.isDuplicate()}>${this.editingIndex === void 0 ? "Tilføj punkt" : "Gem ændring"}</button>${this.editingIndex !== void 0 ? h`<button class="secondary" @click=${this.cancelEdit}>Annuller</button>` : f}</div></div><div class="list">${t.map((o, n) => h`<article><span class="glyph">${Ft[o.kind]}</span><div><strong>${Bt[o.kind]}</strong><small>${o.entity}</small><small>${this.statusLabel(o, n)}${o.kind === "fireplace" ? ` · ${Math.round((o.intensity ?? 0.75) * 100)}% · radius ${o.radius ?? 90}` : ""}</small></div><div class="row-actions"><button class="secondary" @click=${() => this.beginEdit(n)}>Redigér</button><button class="danger" @click=${() => this.removeReaction(n)}>Fjern</button></div></article>`)}</div>` : h`<div class="empty">Tilføj først et rum.</div>`}</section>`;
  }
};
W.styles = I`:host{display:block}.editor{display:grid;gap:14px;margin-top:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{font-size:.7rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.1em}.heading h3{margin:3px 0 0}.heading b{height:max-content;padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);font-size:.75rem}.intro{margin:0;color:var(--secondary-text-color)}label{display:grid;gap:6px;font-size:.86rem}.draft{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}select,input{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}small{color:var(--secondary-text-color)}.placement{display:grid;gap:7px}.placement>div:first-child{display:grid}.preview{position:relative;aspect-ratio:1;max-height:360px;overflow:hidden;border:1px solid var(--divider-color);border-radius:10px;background:var(--card-background-color);cursor:crosshair}.preview img,.preview svg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.preview polygon{fill:rgba(120,90,50,.08);stroke:rgba(120,90,50,.5);stroke-width:3}.preview circle{fill:var(--card-background-color);stroke:var(--primary-color);stroke-width:4}.preview text{font-size:18px;text-anchor:middle;dominant-baseline:central}.draft-point text{font-size:22px}.actions,.row-actions{display:flex;gap:8px;flex-wrap:wrap}button{padding:8px 11px;border:0;border-radius:8px;background:var(--primary-color);color:var(--text-primary-color,#fff);font:inherit;cursor:pointer}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437)}button:disabled{opacity:.5;cursor:not-allowed}.list{display:grid;gap:8px}.list article{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:10px;border:1px solid var(--divider-color);border-radius:10px}.list article>div:nth-child(2){display:grid;gap:2px}.glyph{font-size:1.3rem}.note,.empty{padding:10px;border-radius:8px;background:var(--card-background-color);color:var(--secondary-text-color)}@media(max-width:620px){.grid{grid-template-columns:1fr}.list article{grid-template-columns:auto 1fr}.row-actions{grid-column:1/-1}}`;
se([
  A({ attribute: !1 })
], W.prototype, "config", 2);
se([
  A({ attribute: !1 })
], W.prototype, "hass", 2);
se([
  b()
], W.prototype, "selectedRoomId", 2);
se([
  b()
], W.prototype, "draftKind", 2);
se([
  b()
], W.prototype, "draftEntity", 2);
se([
  b()
], W.prototype, "draftStates", 2);
se([
  b()
], W.prototype, "draftPosition", 2);
se([
  b()
], W.prototype, "editingIndex", 2);
se([
  b()
], W.prototype, "draftIntensity", 2);
se([
  b()
], W.prototype, "draftRadius", 2);
W = se([
  z("ha-explorer-room-reactions-editor")
], W);
var Kn = Object.getOwnPropertyDescriptor, Gn = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Kn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
let Ki = class extends W {
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
Ki = Gn([
  z("ha-explorer-room-reactions-editor-clean")
], Ki);
var Zn = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, fe = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Un(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Zn(t, i, o), o;
};
let oe = class extends L {
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
oe.styles = I`
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
fe([
  A({ attribute: !1 })
], oe.prototype, "config", 2);
fe([
  A({ attribute: !1 })
], oe.prototype, "hass", 2);
fe([
  b()
], oe.prototype, "selectedRoomId", 2);
fe([
  b()
], oe.prototype, "kind", 2);
fe([
  b()
], oe.prototype, "entity", 2);
fe([
  b()
], oe.prototype, "name", 2);
fe([
  b()
], oe.prototype, "icon", 2);
fe([
  b()
], oe.prototype, "editingId", 2);
oe = fe([
  z("ha-explorer-room-actions-editor")
], oe);
var Wn = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, H = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Yn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Wn(t, i, o), o;
};
const U = 1e3;
let F = class extends L {
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
    return De(e, (t) => this.entityState(t));
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
      return E`
        <g
          class=${n}
          transform=${`translate(${i * U} ${r * U})`}
          @click=${(s) => this.useSharedNode(s, e)}
        >
          <circle r="15"></circle>
          <text y="-24" text-anchor="middle">${this.routeNodeLabel(e)}</text>
          ${t > 0 ? E`<text class="usage" y="7" text-anchor="middle">${t}</text>` : f}
        </g>
      `;
    });
  }
  renderNetworkRoutes() {
    return this.routes.map((e, t) => {
      if (this.routeMatchesSelection(e)) return f;
      const i = this.routePoints(e);
      if (!i) return f;
      const r = i.map(([o, n]) => `${o * U},${n * U}`).join(" ");
      return E`
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
          x=${i[Math.floor(i.length / 2)][0] * U}
          y=${i[Math.floor(i.length / 2)][1] * U - 18}
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
    const r = i.map((s) => ({ step: s, point: this.resolveStep(s) })).filter((s) => !!s.point), n = [e, ...r.map((s) => s.point), t].map(([s, a]) => `${s * U},${a * U}`).join(" ");
    return E`
      <polyline points=${n} class="route-line" fill="none" vector-effect="non-scaling-stroke"></polyline>
      <g transform=${`translate(${e[0] * U} ${e[1] * U})`}><circle class="endpoint" r="14"></circle></g>
      ${r.map(({ step: s, point: a }, l) => E`
        <g transform=${`translate(${a[0] * U} ${a[1] * U})`}>
          <circle class=${s.node_id ? "waypoint shared-waypoint" : "waypoint"} r="11"></circle>
          <text y="-20" text-anchor="middle">${l + 1}</text>
        </g>
      `)}
      <g transform=${`translate(${t[0] * U} ${t[1] * U})`}><circle class="endpoint" r="14"></circle></g>
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
F.styles = I`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading,.node-heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b,.node-heading>span{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.node-manager{display:grid;gap:9px;padding:12px;border:1px solid var(--divider-color);border-radius:12px}.node-heading>div,.node-copy{display:grid;gap:2px}.node-heading small,.node-copy small{color:var(--secondary-text-color);font-weight:500}.node-list{display:grid;gap:6px}.node-item{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:9px;background:var(--secondary-background-color);border:1px solid transparent}.node-item.blocked{border-color:var(--error-color,#db4437)}.node-copy{flex:1}.node-actions,.node-edit-actions{display:flex;gap:6px;flex-wrap:wrap}.node-dot{width:13px;height:13px;border-radius:50%;background:var(--primary-color,#03a9f4)}.node-dot.junction{border-radius:3px}.node-dot.waypoint{background:var(--secondary-text-color)}.node-status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.node-status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.node-status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.node-draft,.node-edit{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;align-items:end;padding:10px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.node-draft label,.node-edit label{display:grid;gap:5px;font-size:.82rem}.node-draft label small,.node-edit label small{color:var(--secondary-text-color);font-size:.74rem}.node-draft input,.node-draft select,.node-edit input,.node-edit select{width:100%;box-sizing:border-box;padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.node-edit-actions{grid-column:1/-1}.node-add{justify-self:start}.route-list{display:grid;gap:7px}.route-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid transparent}.route-item.selected{border-color:var(--primary-color,#03a9f4);box-shadow:0 0 0 1px var(--primary-color,#03a9f4) inset}.route-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.route-copy{display:grid;gap:2px}.route-copy small{color:var(--secondary-text-color);font-weight:500}.route-empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:default}.map-frame.drawing svg{cursor:crosshair}.network-route{stroke:var(--secondary-text-color);stroke-opacity:.36;stroke-width:4;stroke-dasharray:10 10;pointer-events:stroke;cursor:pointer}.network-route:hover{stroke:var(--primary-color,#03a9f4);stroke-opacity:.8;stroke-width:7}.network-number{font-size:22px;font-weight:800;fill:var(--secondary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:7;stroke-linejoin:round;pointer-events:none}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:6;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-waypoint{fill:var(--primary-color,#03a9f4);stroke:white}.shared-node circle{fill:var(--card-background-color);stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-node.blocked circle{stroke:var(--error-color,#db4437)}.shared-node.selectable{cursor:pointer}.shared-node.selectable:hover circle{fill:var(--primary-color,#03a9f4)}.shared-node text{font-size:20px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6;stroke-linejoin:round;pointer-events:none}.shared-node .usage{font-size:16px;stroke:none;fill:var(--primary-text-color)}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.mini{padding:6px 8px;font-size:.76rem}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors,.node-draft,.node-edit{grid-template-columns:1fr}.node-edit-actions{grid-column:auto}.node-draft button{justify-self:start}.node-actions{flex-direction:column}}
  `;
H([
  A({ attribute: !1 })
], F.prototype, "config", 2);
H([
  A({ attribute: !1 })
], F.prototype, "hass", 2);
H([
  b()
], F.prototype, "fromRoom", 2);
H([
  b()
], F.prototype, "toRoom", 2);
H([
  b()
], F.prototype, "drawing", 2);
H([
  b()
], F.prototype, "pending", 2);
H([
  b()
], F.prototype, "placingNode", 2);
H([
  b()
], F.prototype, "draftNodeName", 2);
H([
  b()
], F.prototype, "draftNodeKind", 2);
H([
  b()
], F.prototype, "draftNodeEntity", 2);
H([
  b()
], F.prototype, "draftNodeOpenStates", 2);
H([
  b()
], F.prototype, "editingNodeId", 2);
H([
  b()
], F.prototype, "editingNodeName", 2);
H([
  b()
], F.prototype, "editingNodeKind", 2);
H([
  b()
], F.prototype, "editingNodeEntity", 2);
H([
  b()
], F.prototype, "editingNodeOpenStates", 2);
F = H([
  z("ha-explorer-route-editor")
], F);
var Xn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, le = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Qn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Xn(t, i, o), o;
};
const Me = 1e3;
let ie = class extends L {
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
      return E`<line
        x1=${n[0] * Me}
        y1=${n[1] * Me}
        x2=${s[0] * Me}
        y2=${s[1] * Me}
        class=${l}
        vector-effect="non-scaling-stroke"
      ></line>`;
    }), i = this.endpointOptions().filter((r) => r.point).map((r) => {
      const [o, n] = r.point, s = r.kind === "node" ? this.routeNodes.find((d) => d.id === r.id) : void 0, a = s ? De(s, (d) => this.entityState(d)) : void 0, l = !!(a?.conditional && !a.active);
      return E`
          <g transform=${`translate(${o * Me} ${n * Me})`}>
            <circle class=${r.kind === "room" ? "graph-room" : l ? "graph-node blocked" : "graph-node"} r=${r.kind === "room" ? "11" : "13"}></circle>
          </g>
        `;
    });
    return E`${t}${i}`;
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
                    <label>Entity<input .value=${this.editingEntity} @input=${(d) => this.editingEntity = d.target.value}></label>
                    <label>Tilladte states<input .value=${this.editingStates} @input=${(d) => this.editingStates = d.target.value}></label>
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
ie.styles = I`
    :host{display:block}.graph-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors,.condition-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label,.condition-fields label,.condition-edit label{display:grid;gap:6px;font-size:.85rem}.selectors select,input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.condition-draft,.condition-edit{display:grid;gap:10px;padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.condition-title{display:grid;gap:2px}.condition-title span,.condition-fields small{color:var(--secondary-text-color);font-size:.8rem}.condition-edit{grid-template-columns:1fr 1fr auto;align-items:end}.condition-actions,.edge-actions{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.add{justify-self:start}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}.edge-list{display:grid;gap:7px}.edge-item{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;background:var(--secondary-background-color);border:1px solid transparent}.edge-item.blocked{border-color:var(--error-color,#db4437)}.edge-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem;flex:none}.edge-copy{display:grid;gap:2px;min-width:0;flex:1}.edge-copy small{color:var(--secondary-text-color)}.status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-edge{stroke:var(--primary-color,#03a9f4);stroke-width:4;stroke-opacity:.72}.graph-edge.conditional{stroke-dasharray:9 7}.graph-edge.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.graph-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.graph-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.graph-node.blocked{stroke:var(--error-color,#db4437)}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;gap:6px;align-items:center}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--primary-color,#03a9f4)}.legend .line.conditional{border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:600px){.selectors,.condition-fields,.condition-edit{grid-template-columns:1fr}.edge-item{align-items:flex-start}.edge-actions{flex-direction:column}}
  `;
le([
  A({ attribute: !1 })
], ie.prototype, "config", 2);
le([
  A({ attribute: !1 })
], ie.prototype, "hass", 2);
le([
  b()
], ie.prototype, "fromKey", 2);
le([
  b()
], ie.prototype, "toKey", 2);
le([
  b()
], ie.prototype, "conditionEntity", 2);
le([
  b()
], ie.prototype, "conditionStates", 2);
le([
  b()
], ie.prototype, "editingConditionIndex", 2);
le([
  b()
], ie.prototype, "editingEntity", 2);
le([
  b()
], ie.prototype, "editingStates", 2);
ie = le([
  z("ha-explorer-route-graph-editor")
], ie);
var Jn = Object.defineProperty, es = Object.getOwnPropertyDescriptor, lt = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? es(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Jn(t, i, o), o;
};
const te = 1e3;
let Ee = class extends L {
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
      return e.kind === "room" ? $e(this.config, e.id) : this.routeNodes.find((t) => t.id === e.id)?.point;
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
      const r = this.endpointPoint(t.from), o = this.endpointPoint(t.to);
      if (!r || !o) return f;
      const n = e[i] ?? this.edgeStatus(i), s = [
        "graph-context",
        n.conditional ? "conditional" : "",
        n.active ? "" : "blocked"
      ].filter(Boolean).join(" ");
      return E`
        <line
          x1=${r[0] * te}
          y1=${r[1] * te}
          x2=${o[0] * te}
          y2=${o[1] * te}
          class=${s}
          vector-effect="non-scaling-stroke"
        ></line>
      `;
    });
  }
  renderPreviewOverlay(e) {
    if (!e || e.hops.length < 2) return f;
    const t = e.hops.map((i) => `${i.point[0] * te},${i.point[1] * te}`).join(" ");
    return E`
      <polyline
        points=${t}
        class=${`preview-line ${e.source}`}
        fill="none"
        vector-effect="non-scaling-stroke"
      ></polyline>
      ${e.hops.map((i, r) => E`
        <g transform=${`translate(${i.point[0] * te} ${i.point[1] * te})`}>
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
      const o = $e(this.config, r);
      return o ? E`
        <g transform=${`translate(${o[0] * te} ${o[1] * te})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    }), i = e.disconnectedNodeIds.map((r) => {
      const o = this.routeNodes.find((n) => n.id === r);
      return o ? E`
        <g transform=${`translate(${o.point[0] * te} ${o.point[1] * te})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    });
    return E`${t}${i}`;
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
Ee.styles = I`
    :host{display:block}.diagnostics{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.route-result{display:grid;gap:8px;padding:12px;border:1px solid var(--divider-color);border-radius:11px}.route-result.manual{border-left:5px solid var(--warning-color,#ff9800)}.route-result.graph{border-left:5px solid var(--primary-color,#03a9f4)}.route-result.fallback{border-left:5px solid var(--secondary-text-color)}.route-result-top{display:flex;justify-content:space-between;gap:12px;align-items:center}.route-result-top span{color:var(--secondary-text-color);font-size:.82rem}.route-result p{margin:0;color:var(--secondary-text-color);font-size:.88rem;line-height:1.4}.hop-list{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:.82rem}.hop-list span{display:flex;gap:6px;align-items:center}.hop-list b{padding:4px 7px;border-radius:999px;background:var(--secondary-background-color)}.hop-list i{font-style:normal;color:var(--secondary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-context{stroke:var(--secondary-text-color);stroke-width:3;stroke-opacity:.28}.graph-context.conditional{stroke-dasharray:8 8;stroke:var(--primary-color,#03a9f4);stroke-opacity:.5}.graph-context.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.preview-line{stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.preview-line.manual{stroke:var(--warning-color,#ff9800)}.preview-line.graph{stroke:var(--primary-color,#03a9f4)}.preview-line.fallback{stroke:var(--secondary-text-color);stroke-dasharray:16 10}.preview-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.preview-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.preview-point{fill:white;stroke:var(--warning-color,#ff9800);stroke-width:5}.preview-number{font-size:22px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6}.disconnected{fill:var(--error-color,#db4437);fill-opacity:.18;stroke:var(--error-color,#db4437);stroke-width:4;stroke-dasharray:5 4}.warning-mark{font-size:24px;font-weight:900;fill:var(--error-color,#db4437)}.diagnostic-heading{display:grid;gap:2px}.diagnostic-heading span{color:var(--secondary-text-color);font-size:.8rem}.diagnostic-summary,.live-summary{display:grid;gap:3px;padding:11px 12px;border-radius:10px;border:1px solid var(--divider-color)}.diagnostic-summary span,.live-summary span{color:var(--secondary-text-color);font-size:.84rem}.diagnostic-summary.ok,.live-summary.ok{border-left:5px solid var(--success-color,#4caf50)}.diagnostic-summary.warning{border-left:5px solid var(--warning-color,#ff9800)}.diagnostic-summary.neutral{border-left:5px solid var(--secondary-text-color)}.live-summary.blocked{border-left:5px solid var(--error-color,#db4437)}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.metric-grid div{display:grid;gap:2px;padding:10px;border-radius:9px;background:var(--secondary-background-color)}.metric-grid strong{font-size:1.15rem}.metric-grid span{color:var(--secondary-text-color);font-size:.75rem}.issue{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(255,152,0,.1);border:1px solid rgba(255,152,0,.3)}.issue span{color:var(--secondary-text-color);font-size:.82rem;line-height:1.4}.blocked-list{display:grid;gap:7px}.blocked-item{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(219,68,55,.08);border:1px solid rgba(219,68,55,.25)}.blocked-item span,.blocked-item small{color:var(--secondary-text-color);font-size:.8rem}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;align-items:center;gap:6px}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--secondary-text-color)}.legend .line.conditional{border-top-color:var(--primary-color,#03a9f4);border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:760px){.metric-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.selectors{grid-template-columns:1fr}.route-result-top{align-items:flex-start;flex-direction:column}}
  `;
lt([
  A({ attribute: !1 })
], Ee.prototype, "config", 2);
lt([
  A({ attribute: !1 })
], Ee.prototype, "hass", 2);
lt([
  b()
], Ee.prototype, "fromRoom", 2);
lt([
  b()
], Ee.prototype, "toRoom", 2);
Ee = lt([
  z("ha-explorer-route-diagnostics")
], Ee);
var ts = Object.defineProperty, is = Object.getOwnPropertyDescriptor, si = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? is(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ts(t, i, o), o;
};
const rs = { basic: 0, rooms: 1, presences: 2 };
let Zt = class extends j {
  updated(e) {
    super.updated(e), e.has("config") && this.config && this.setConfig(this.config);
  }
  render() {
    return this.renderRoomDrawingEditor();
  }
};
si([
  A({ attribute: !1 })
], Zt.prototype, "config", 2);
Zt = si([
  z("ha-explorer-room-tools")
], Zt);
let Ut = class extends ae {
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
    const i = rs[t];
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
Ut.styles = I`${ae.styles}.setup-section,.advanced-section{scroll-margin-top:16px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden;background:var(--card-background-color);transition:border-color 180ms ease,box-shadow 180ms ease}.setup-section{margin-bottom:12px}.setup-section>summary,.advanced-section>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;cursor:pointer;font-weight:700}.setup-section>summary::-webkit-details-marker,.advanced-section>summary::-webkit-details-marker{display:none}.setup-section>summary::after,.advanced-section>summary::after{content:"⌄";margin-left:4px;color:var(--secondary-text-color);transition:transform 160ms ease}.setup-section[open]>summary::after,.advanced-section[open]>summary::after{transform:rotate(180deg)}.setup-content{padding:0 10px 10px}.setup-content>*{margin-top:0}.item-card:not(.item-open)>:not(.item-heading){display:none!important}.item-heading{cursor:pointer;user-select:none}.item-heading::after{content:"⌄";flex:none;color:var(--secondary-text-color);transition:transform 160ms ease}.item-card.item-open .item-heading::after{transform:rotate(180deg)}.advanced-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:16px 2px 8px;color:var(--secondary-text-color)}.advanced-heading>div{display:grid;gap:2px}.advanced-heading span{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}.advanced-heading strong{color:var(--primary-text-color);font-size:.92rem}.advanced-heading small{font-size:.75rem}.advanced-tools{display:grid;gap:9px;padding-bottom:8px}.advanced-hint{margin-left:auto;color:var(--secondary-text-color);font-size:.75rem;font-weight:500;text-align:right}.advanced-content{padding:0 10px 10px}.advanced-content>*{margin-top:0}.ux-focus{border-color:var(--primary-color,#03a9f4)!important;box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color,#03a9f4) 18%,transparent)}@media(max-width:600px){.advanced-heading{align-items:flex-start;flex-direction:column}.setup-section>summary,.advanced-section>summary{align-items:flex-start}.advanced-hint{max-width:48%}}`;
Ut = si([
  z("ha-explorer-ha-editor")
], Ut);
function Gi(e) {
  return Math.min(1, Math.max(0, e));
}
function gr(e) {
  return e.trim().toLocaleLowerCase().replace(/[\s_-]+/g, " ");
}
function Ht(e, t) {
  if (t.length < 3) return !1;
  let i = !1;
  const [r, o] = e;
  for (let n = 0, s = t.length - 1; n < t.length; s = n++) {
    const [a, l] = t[n], [d, c] = t[s];
    l > o != c > o && r < (d - a) * (o - l) / (c - l || Number.EPSILON) + a && (i = !i);
  }
  return i;
}
function os(e) {
  if (!e.length) return [0.5, 0.5];
  const [t, i] = e.reduce(
    ([r, o], [n, s]) => [r + n, o + s],
    [0, 0]
  );
  return [t / e.length, i / e.length];
}
function ns(e) {
  if (e.length < 3) return;
  let t = 0, i = 0, r = 0;
  for (let o = 0; o < e.length; o += 1) {
    const [n, s] = e[o], [a, l] = e[(o + 1) % e.length], d = n * l - a * s;
    t += d, i += (n + a) * d, r += (s + l) * d;
  }
  if (!(Math.abs(t) < Number.EPSILON))
    return [i / (3 * t), r / (3 * t)];
}
function ze(e) {
  return { x: Gi(e.x), y: Gi(e.y) };
}
function ss(e) {
  return [e.id, e.area_id, e.name, ...e.aliases ?? []].filter((t) => typeof t == "string" && t.trim().length > 0).map(gr);
}
function mr(e, t) {
  if (!t?.trim()) return;
  const i = gr(t);
  return e.find((r) => ss(r).includes(i));
}
function as(e) {
  if (e.presence_anchor) return ze(e.presence_anchor);
  if (e.label) return ze(e.label);
  const t = ns(e.points);
  if (t && Ht(t, e.points))
    return ze({ x: t[0], y: t[1] });
  const i = os(e.points);
  if (Ht(i, e.points))
    return ze({ x: i[0], y: i[1] });
  if (e.points.length) {
    const r = e.points.map(([s]) => s), o = e.points.map(([, s]) => s), n = [
      (Math.min(...r) + Math.max(...r)) / 2,
      (Math.min(...o) + Math.max(...o)) / 2
    ];
    return Ht(n, e.points) ? ze({ x: n[0], y: n[1] }) : ze({ x: e.points[0][0], y: e.points[0][1] });
  }
  return { x: 0.5, y: 0.5 };
}
const ls = ["unknown", "unavailable", "not_detected"], ds = /* @__PURE__ */ new Set(["", "unknown", "unavailable", "none", "null"]);
function Y(e, t) {
  return e && t ? e.attributes[t] : void 0;
}
function he(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function xe(e, t) {
  const i = he(e);
  return i === void 0 ? t : Math.min(1, Math.max(0, i));
}
function cs(e, t) {
  if (typeof e == "boolean") return e;
  if (typeof e == "number") return e !== 0;
  if (typeof e == "string") {
    const i = e.trim().toLowerCase();
    if (["true", "on", "yes", "1", "home"].includes(i)) return !0;
    if (["false", "off", "no", "0", "not_home"].includes(i)) return !1;
  }
  return t;
}
function ht(e, t) {
  return typeof e == "string" && e.trim() ? e : t;
}
function Zi(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return ds.has(t.toLowerCase()) ? void 0 : t;
}
function ps(e, t, i) {
  if (e.room_entity) {
    const r = i.states[e.room_entity];
    return r ? Zi(e.room_attribute ? Y(r, e.room_attribute) : r.state) : void 0;
  }
  if (t)
    return Zi(Y(t, e.room_attribute ?? "explorer_room"));
}
function hs(e) {
  if (!e.points.length) return;
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function Ui(e, t, i, r, o, n) {
  const s = i - t;
  return Math.abs(s) < 1e-6 ? n : r + (e - t) / s * (o - r);
}
function Wi(e, t, i, r, o, n, s) {
  const a = i.sensor_x * (r.sensor_y - o.sensor_y) + r.sensor_x * (o.sensor_y - i.sensor_y) + o.sensor_x * (i.sensor_y - r.sensor_y);
  if (Math.abs(a) < 1e-6) return s;
  const l = i[n], d = r[n], c = o[n], p = (l * (r.sensor_y - o.sensor_y) + d * (o.sensor_y - i.sensor_y) + c * (i.sensor_y - r.sensor_y)) / a, u = (l * (o.sensor_x - r.sensor_x) + d * (i.sensor_x - o.sensor_x) + c * (r.sensor_x - i.sensor_x)) / a, g = (l * (r.sensor_x * o.sensor_y - o.sensor_x * r.sensor_y) + d * (o.sensor_x * i.sensor_y - i.sensor_x * o.sensor_y) + c * (i.sensor_x * r.sensor_y - r.sensor_x * i.sensor_y)) / a;
  return p * e + u * t + g;
}
function us(e, t, i) {
  const r = e.physical_meters, o = he(r?.width), n = he(r?.height), s = hs(e);
  if (!o || !n || o <= 0 || n <= 0 || !s) return {};
  const a = r?.flip_x ? o - t : t, l = r?.flip_y ? n - i : i;
  let d = Math.min(1, Math.max(0, a / o)), c = Math.min(1, Math.max(0, l / n));
  const p = r?.position_calibration;
  return p?.c ? (d = Wi(a, l, p.a, p.b, p.c, "room_x", d), c = Wi(a, l, p.a, p.b, p.c, "room_y", c)) : p && (d = Ui(a, p.a.sensor_x, p.b.sensor_x, p.a.room_x, p.b.room_x, d), c = Ui(l, p.a.sensor_y, p.b.sensor_y, p.a.room_y, p.b.room_y, c)), d = Math.min(1, Math.max(0, d)), c = Math.min(1, Math.max(0, c)), { x: s.minX + d * (s.maxX - s.minX), y: s.minY + c * (s.maxY - s.minY) };
}
function ut(e, t, i) {
  const r = mr(t, i ?? e.room_id);
  if (r) {
    const s = as(r);
    return { ...e, x: s.x, y: s.y, room_id: r.id };
  }
  const o = xe(e.x), n = xe(e.y);
  return o === void 0 || n === void 0 ? { ...e, x: o, y: n, visible: !1 } : { ...e, x: o, y: n };
}
function gs(e, t, i, r, o, n) {
  if (!i) return { x: xe(e.x), y: xe(e.y) };
  const s = t.coordinate_space === "meters" || t.coordinate_space === "room_meters", a = t.x_attribute ?? (s ? "map_x" : "explorer_x"), l = t.y_attribute ?? (s ? "map_y" : "explorer_y");
  if (t.coordinate_space === "room_meters") {
    const d = he(Y(i, a)), c = he(Y(i, l)), p = mr(r, o ?? e.room_id);
    return d === void 0 || c === void 0 || !p ? {} : { ...us(p, d, c), roomId: p.id };
  }
  if (t.coordinate_space === "meters") {
    const d = he(Y(i, a)), c = he(Y(i, l)), p = he(n?.width), u = he(n?.height);
    return d === void 0 || c === void 0 || !p || !u || p <= 0 || u <= 0 ? {} : { x: xe(d / p), y: xe(c / u) };
  }
  return { x: xe(Y(i, a), e.x), y: xe(Y(i, l), e.y) };
}
function ms(e, t, i = [], r) {
  const o = e.entity_binding;
  if (!o || !t) return ut(e, i);
  const n = o.entity ? t.states[o.entity] : void 0, s = o.position_entity ?? o.entity, a = s ? t.states[s] : void 0;
  if (o.entity && !n) return { ...ut(e, i), visible: !1 };
  if (o.position_entity && !a) return { ...ut(e, i), visible: !1 };
  const l = o.hidden_states ?? ls, d = n ? l.includes(n.state) : !1, c = a && a !== n ? l.includes(a.state) : !1, p = Y(n, o.visible_attribute), u = d || c ? !1 : cs(p, e.visible ?? !0), g = ps(o, n, t) ?? e.room_id, y = gs(e, o, a, i, g, r), m = { ...e, x: y.x, y: y.y, room_id: y.roomId ?? e.room_id, name: e.name ?? ht(Y(n, o.name_attribute ?? "friendly_name")), avatar: e.avatar ?? ht(Y(n, o.avatar_attribute ?? "entity_picture")), icon: e.icon ?? (o.icon_attribute ? ht(Y(n, o.icon_attribute)) : void 0), color: e.color ?? ht(Y(n, o.color_attribute ?? "explorer_color")), visible: u };
  return o.coordinate_space === "room_meters" ? m.x === void 0 || m.y === void 0 ? { ...m, visible: !1 } : m : ut(m, i, g);
}
function fs(e, t, i = [], r) {
  return e.map((o) => ms(o, t, i, r));
}
const Te = /* @__PURE__ */ new Map(), bs = 0.22, ys = 0.16, vs = 3e4, xs = 0.025, ws = 0.018;
function kt(e) {
  return Number.isFinite(e.x) && Number.isFinite(e.y) ? { x: e.x, y: e.y } : void 0;
}
function Wt(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function Ie(e) {
  return e.entity_binding?.entity ?? e.id;
}
function Ue(e) {
  return e.entity_binding?.position_entity;
}
function fr(e) {
  return e.previous ? { x: e.point.x + (e.point.x - e.previous.x), y: e.point.y + (e.point.y - e.previous.y) } : e.point;
}
function $s(e, t) {
  const i = kt(t), r = Wt(e.point, i), o = Wt(fr(e), i), n = e.target && e.target === Ue(t) ? xs : 0;
  return { candidate: t, distance: r, score: Math.min(r, o * 0.82) - n };
}
function Yi(e, t, i) {
  const r = Ie(e), o = kt(t);
  if (!o) return;
  const n = Te.get(r);
  Te.set(r, { point: o, previous: n?.point, target: Ue(t), seenAt: i });
}
function ks(e, t = Date.now()) {
  for (const [a, l] of Te) t - l.seenAt > vs && Te.delete(a);
  const i = e.filter((a) => (a.type ?? "person") === "person" && a.visible !== !1 && kt(a) && Ue(a)), r = new Set(i), o = e.filter((a) => !r.has(a)), n = /* @__PURE__ */ new Map();
  for (const a of i) {
    const l = a.room_id ?? "__no_room__", d = n.get(l) ?? [];
    d.push(a), n.set(l, d);
  }
  const s = [];
  for (const a of n.values()) {
    if (a.length < 2) {
      for (const g of a)
        s.push(g), Yi(g, g, t);
      continue;
    }
    const l = [...a], d = [...a].sort((g, y) => Ie(g).localeCompare(Ie(y))), c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set(), u = d.map((g) => {
      const y = Te.get(Ie(g));
      if (!y) return { identity: g, track: void 0, scores: [] };
      const m = l.map((x) => $s(y, x)).sort((x, $) => x.score - $.score);
      return { identity: g, track: y, scores: m };
    }).sort((g, y) => (g.scores[0]?.score ?? 1 / 0) - (y.scores[0]?.score ?? 1 / 0));
    for (const g of u) {
      const { identity: y, track: m } = g;
      if (!m) continue;
      const x = g.scores.filter((N) => !p.has(N.candidate));
      if (!x.length) continue;
      const $ = x[0], _ = x[1], w = $.distance <= bs || Wt(fr(m), kt($.candidate)) <= ys, S = !!_ && _.score - $.score < ws;
      w && !S && (c.set(Ie(y), $.candidate), p.add($.candidate));
    }
    for (const g of d) {
      const y = Ie(g);
      let m = c.get(y);
      if (m || (m = l.find(($) => !p.has($) && Ue($) === Ue(g)), m && p.add(m)), m || (m = l.find(($) => !p.has($)), m && p.add(m)), !m) {
        s.push(g);
        continue;
      }
      const x = { ...g, x: m.x, y: m.y, room_id: m.room_id, visible: m.visible };
      s.push(x), Yi(g, m, t);
    }
  }
  return [...s, ...o];
}
function _s() {
  Te.clear();
}
var As = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, Ct = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ss(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && As(t, i, o), o;
};
const br = "0.40.1-beta.1";
let Fe = class extends L {
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
    _s(), this.config = { title: "Home Assistant Explorer", min_zoom: 1, max_zoom: 6, initial_zoom: 1, fit_mode: "contain", rooms: [], zones: [], route_nodes: [], route_graph_edges: [], routes: [], openings: [], presences: [], ...e, appearance: { theme: "classic", ...e.appearance ?? {} } };
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
    const t = e.preview_state?.trim().toLowerCase();
    if (this.preview && t && t !== "live") return t;
    const i = e.entity?.trim();
    return i && this.hass?.states[i]?.state?.trim().toLowerCase() || "clear";
  }
  weatherEffect(e = this.weatherState()) {
    const t = this.config?.appearance?.weather;
    if (!t?.enabled) return "clear";
    const i = (r, o) => new Set((r ?? o).map((n) => n.trim().toLowerCase())).has(e);
    return i(t.storm_states, ["lightning", "lightning-rainy"]) ? "storm" : i(t.snow_states, ["snowy", "snowy-rainy", "hail"]) ? "snow" : i(t.rain_states, ["rainy", "pouring"]) ? "rain" : i(t.fog_states, ["fog"]) ? "fog" : e === "cloudy" || e === "partlycloudy" || i(t.cloudy_states, ["cloudy", "partlycloudy"]) ? "cloudy" : "clear";
  }
  alarmState() {
    const e = this.config?.appearance?.alarm;
    if (!e?.enabled) return "normal";
    const t = e.entity?.trim();
    if (!t) return "normal";
    const i = this.hass?.states[t]?.state?.toLowerCase();
    return i ? (e.triggered_states ?? ["triggered"]).map((n) => n.toLowerCase()).includes(i) ? "triggered" : (e.armed_states ?? ["armed_away", "armed_home", "armed_night", "armed_vacation", "armed_custom_bypass"]).map((n) => n.toLowerCase()).includes(i) ? "armed" : "normal" : "normal";
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
    const e = this.config.image ?? this.config.background ?? "", t = this.defaultRoom(), i = fs(this.config.presences ?? [], this.hass, t, this.config.floorplan_meters), r = ks(i), o = this.config.appearance?.theme ?? "classic", n = o === "enchanted_antique", s = this.isNight(), a = Math.min(1, Math.max(0.25, this.config.appearance?.day_night?.intensity ?? 0.72)), l = this.config.appearance?.compass ?? {}, d = this.config.appearance?.hide_source_text ?? !1, c = this.alarmState(), p = Math.min(1, Math.max(0.25, this.config.appearance?.alarm?.intensity ?? 0.75)), u = this.config.appearance?.occupancy?.enabled ?? !1, g = this.someoneHome(r), y = Math.min(1, Math.max(0.25, this.config.appearance?.occupancy?.intensity ?? 0.65)), m = this.config.appearance?.weather?.enabled ?? !1, x = this.weatherState(), $ = this.weatherEffect(x), _ = Math.min(1, Math.max(0.25, this.config.appearance?.weather?.intensity ?? 0.6)), w = m && ["partlycloudy", "cloudy", "rainy", "pouring", "lightning", "lightning-rainy", "snowy", "snowy-rainy", "hail"].includes(x), S = m && !s && ["sunny", "clear", "partlycloudy"].includes(x), N = x === "partlycloudy";
    return h`<ha-card class=${`${n ? "enchanted" : "classic"}${s ? " moonlight" : ""}${S ? " sunlight" : ""}${N ? " partly-cloudy" : ""}${w ? " has-clouds" : ""}${u ? g ? " occupied" : " empty-house" : ""}${m && $ !== "clear" ? ` weather-${$}` : ""}${m ? ` state-${x}` : ""}${c === "armed" ? " alarm-armed" : ""}${c === "triggered" ? " alarm-triggered" : ""}${this.preview ? " preview" : ""}`} style=${`--moon-intensity:${a};--alarm-intensity:${p};--occupancy-intensity:${y};--weather-intensity:${_}`}><header><div><span>${c === "triggered" ? "⚠ Alarm Triggered" : c === "armed" ? "✦ Map Secured" : x === "partlycloudy" ? s ? "☾ Partly Clouded Map" : "☀ Partly Clouded Map" : $ === "storm" ? "⛈ Storm over the Map" : $ === "rain" ? "☂ Rain over the Map" : $ === "snow" ? "❄ Snow over the Map" : $ === "fog" ? "◇ Mist over the Map" : $ === "cloudy" ? "☁ Clouded Map" : S ? "☀ Sunlit Map" : u && g ? "✦ Someone is Home" : u ? "◇ Empty House" : s ? "Moonlight Explorer" : n ? "Enchanted Explorer" : "Explorer map"}</span><h1>${this.config.title}</h1></div><small>Enchanted Atmosphere · v${br}</small></header><div class="map-stage"><div class="weather-overlay"></div><div class="weather-particles"></div><div class="weather-flash"></div><div class="sun-overlay"></div><div class="sun-disc"></div><explorer-source-clean-canvas .theme=${o} .hideSourceText=${d} .weatherEffect=${m ? $ : "clear"} .weatherIntensity=${_} .weatherNight=${s} .compassVisible=${l.visible ?? !0} .compassRotation=${l.rotation ?? -7} .compassSize=${l.size ?? 1} .hass=${this.hass} .image=${e} .rooms=${t} .zones=${this.config.zones ?? []} .routeNodes=${this.config.route_nodes ?? []} .routeGraphEdges=${this.config.route_graph_edges ?? []} .routes=${this.config.routes ?? []} .openings=${this.config.openings ?? []} .presences=${r} .minZoom=${this.config.min_zoom ?? 1} .maxZoom=${this.config.max_zoom ?? 6} .initialZoom=${this.config.initial_zoom ?? 1} .fitMode=${this.config.fit_mode ?? "contain"}></explorer-source-clean-canvas><div class="occupancy-overlay"></div><div class="moon-overlay"></div><div class="moon-disc"><span></span></div>${N ? this.renderCelestialCloud() : f}<div class="night-vignette"></div><div class="alarm-overlay"></div><div class="alarm-vignette"></div></div></ha-card>`;
  }
};
Fe.styles = I`:host{display:block;width:100%;min-width:0}ha-card{width:100%;overflow:hidden;transition:background .6s,color .6s}ha-card.preview explorer-source-clean-canvas{--explorer-viewport-max-height:min(52vh,520px)}header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;color:var(--primary-text-color);background:var(--ha-card-background,var(--card-background-color));transition:background .6s,color .6s}header span{display:block;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--secondary-text-color)}h1{margin:3px 0 0;font-size:1.25rem}small{color:var(--secondary-text-color);white-space:nowrap}.map-stage{position:relative;overflow:hidden;isolation:isolate}.map-stage explorer-source-clean-canvas{position:relative;z-index:4;display:block}.occupancy-overlay,.weather-overlay,.weather-particles,.weather-flash,.sun-overlay,.sun-disc,.moon-overlay,.night-vignette,.moon-disc,.alarm-overlay,.alarm-vignette{position:absolute;pointer-events:none;opacity:0;transition:opacity .7s,filter .7s}.occupancy-overlay{inset:0;z-index:7}.occupied .occupancy-overlay{opacity:calc(.32 * var(--occupancy-intensity));background:radial-gradient(circle at 34% 28%,rgba(255,220,142,.36),transparent 31%),radial-gradient(circle at 68% 63%,rgba(205,148,70,.18),transparent 38%);mix-blend-mode:soft-light}.empty-house .occupancy-overlay{opacity:calc(.2 * var(--occupancy-intensity));background:linear-gradient(145deg,rgba(71,64,55,.16),rgba(42,49,57,.18));mix-blend-mode:multiply}.weather-overlay,.weather-particles,.weather-flash{inset:0;z-index:3;overflow:hidden}.cloud-field{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden;opacity:calc(.96 * var(--weather-intensity));filter:sepia(.42) saturate(.82) contrast(1.03)}.partly-cloudy .cloud-field{opacity:calc(.78 * var(--weather-intensity))}.state-rainy .cloud-field,.state-pouring .cloud-field,.state-lightning .cloud-field,.state-lightning-rainy .cloud-field{opacity:calc(1 * var(--weather-intensity));filter:sepia(.6) saturate(.62) brightness(.84)}.cloud{position:absolute;height:auto;overflow:visible;will-change:transform;transform-origin:center;filter:drop-shadow(0 8px 18px rgba(64,47,29,.22))}.cloud-haze{fill:rgba(211,186,139,.28)}.cloud-core{fill:rgba(232,209,163,.58)}.cloud-v2 .cloud-haze{fill:rgba(196,172,133,.25)}.cloud-v2 .cloud-core{fill:rgba(221,199,158,.52)}.cloud-v3 .cloud-haze{fill:rgba(177,158,129,.24)}.cloud-v3 .cloud-core{fill:rgba(210,190,154,.48)}.cloud-a{left:24%;top:-3%;width:34%;opacity:.8;animation:cloudDriftA 58s ease-in-out infinite alternate}.cloud-b{right:-9%;top:10%;width:38%;opacity:.88;animation:cloudDriftB 46s ease-in-out infinite alternate}.cloud-c{left:-12%;top:26%;width:40%;opacity:.82;animation:cloudDriftC 54s ease-in-out infinite alternate}.cloud-d{right:-11%;top:34%;width:35%;opacity:.74;animation:cloudDriftA 62s ease-in-out infinite alternate-reverse}.cloud-e{left:-8%;top:48%;width:34%;opacity:.7;animation:cloudDriftB 51s ease-in-out infinite alternate}.cloud-f{right:3%;top:55%;width:33%;opacity:.76;animation:cloudDriftC 64s ease-in-out infinite alternate-reverse}.cloud-g{left:7%;top:68%;width:31%;opacity:.72;animation:cloudDriftA 69s ease-in-out infinite alternate-reverse}.cloud-h{right:-8%;top:73%;width:39%;opacity:.82;animation:cloudDriftB 57s ease-in-out infinite alternate}.cloud-i{left:-10%;top:82%;width:37%;opacity:.7;animation:cloudDriftC 66s ease-in-out infinite alternate}.cloud-j{left:33%;top:88%;width:35%;opacity:.66;animation:cloudDriftA 72s ease-in-out infinite alternate}.cloud-k{right:19%;top:24%;width:28%;opacity:.56;animation:cloudDriftC 61s ease-in-out infinite alternate}.cloud-l{left:18%;top:40%;width:27%;opacity:.52;animation:cloudDriftB 67s ease-in-out infinite alternate-reverse}.partly-cloudy .cloud-c,.partly-cloudy .cloud-d,.partly-cloudy .cloud-e,.partly-cloudy .cloud-f,.partly-cloudy .cloud-g,.partly-cloudy .cloud-h,.partly-cloudy .cloud-i{display:none}.partly-cloudy .cloud-a{opacity:.66}.partly-cloudy .cloud-b{opacity:.72}.partly-cloudy .cloud-j{opacity:.42}.partly-cloudy .cloud-k{opacity:.52}.partly-cloudy .cloud-l{opacity:.46}.sun-overlay{inset:0;z-index:5;background:radial-gradient(circle at 12% 14%,rgba(255,236,177,.62) 0,rgba(244,193,92,.24) 18%,transparent 39%),linear-gradient(132deg,rgba(255,222,146,.19) 0,rgba(245,196,91,.08) 34%,transparent 58%);mix-blend-mode:screen}.sun-overlay:after{display:none}.sun-disc{z-index:6;left:7.5%;top:7%;width:58px;height:58px;border-radius:50%;background:radial-gradient(circle,#fff0bc 0,#f2c56d 38%,#d69635 63%,rgba(186,112,32,.08) 72%,transparent 74%);filter:drop-shadow(0 0 10px rgba(224,158,48,.48)) drop-shadow(0 0 30px rgba(244,199,102,.36))}.sun-disc:before{content:"";position:absolute;inset:-44%;border-radius:50%;background:repeating-conic-gradient(rgba(244,197,94,.2) 0deg 5deg,transparent 5deg 15deg);mask-image:radial-gradient(circle,transparent 0 27%,#000 31% 58%,transparent 74%);animation:sunBreathe 8s ease-in-out infinite}.sunlight .sun-overlay{opacity:calc(.82 * var(--weather-intensity))}.sunlight .sun-disc{opacity:calc(.9 * var(--weather-intensity))}.partly-cloudy .sun-overlay{opacity:calc(.62 * var(--weather-intensity))}.partly-cloudy .sun-disc{opacity:calc(.74 * var(--weather-intensity))}.celestial-cloud{position:absolute;pointer-events:none;width:134px;height:64px;opacity:0;z-index:7;will-change:transform,opacity;transform-origin:center;filter:drop-shadow(0 5px 10px rgba(64,48,31,.16))}.celestial-cloud:before{content:"";position:absolute;inset:4px 0 8px;border-radius:48% 52% 46% 54%;background:radial-gradient(ellipse at 14% 67%,rgba(207,191,163,.58) 0 20%,transparent 23%),radial-gradient(ellipse at 30% 44%,rgba(235,222,194,.64) 0 28%,transparent 32%),radial-gradient(ellipse at 48% 30%,rgba(246,232,203,.68) 0 31%,transparent 35%),radial-gradient(ellipse at 67% 40%,rgba(230,215,185,.64) 0 28%,transparent 32%),radial-gradient(ellipse at 84% 65%,rgba(199,180,148,.54) 0 21%,transparent 24%),linear-gradient(to bottom,transparent 26%,rgba(222,205,176,.48) 46%,rgba(177,151,116,.35) 74%,transparent 92%);filter:blur(1.35px);transform:skewX(-7deg);opacity:.92}.celestial-cloud:after{content:"";position:absolute;left:10%;top:41%;width:80%;height:25%;border-radius:50%;background:radial-gradient(ellipse at 24% 50%,rgba(246,233,207,.32) 0 24%,transparent 50%),radial-gradient(ellipse at 56% 45%,rgba(236,221,193,.28) 0 32%,transparent 58%),radial-gradient(ellipse at 82% 52%,rgba(201,181,150,.22) 0 22%,transparent 48%);filter:blur(3.2px);transform:translateY(10px) scaleX(.94);opacity:.86}.partly-cloudy:not(.moonlight) .celestial-cloud{left:2.2%;top:6.3%;opacity:.74;mix-blend-mode:normal;animation:celestialCloudSunDrift 20s ease-in-out infinite}.partly-cloudy:not(.moonlight) .sun-disc{animation:celestialSunVeil 20s ease-in-out infinite}.partly-cloudy:not(.moonlight) .sun-overlay{animation:celestialSunGlow 20s ease-in-out infinite}.partly-cloudy.moonlight .celestial-cloud{right:2.4%;top:4.9%;left:auto;z-index:10;opacity:.60;filter:drop-shadow(0 5px 11px rgba(12,19,28,.22));animation:celestialCloudMoonDrift 24s ease-in-out infinite}.partly-cloudy.moonlight .celestial-cloud:before{background:radial-gradient(ellipse at 14% 67%,rgba(132,143,153,.46) 0 20%,transparent 23%),radial-gradient(ellipse at 30% 44%,rgba(194,201,205,.52) 0 28%,transparent 32%),radial-gradient(ellipse at 48% 30%,rgba(214,218,216,.56) 0 31%,transparent 35%),radial-gradient(ellipse at 67% 40%,rgba(179,188,194,.50) 0 28%,transparent 32%),radial-gradient(ellipse at 84% 65%,rgba(112,124,135,.42) 0 21%,transparent 24%),linear-gradient(to bottom,transparent 26%,rgba(178,187,191,.36) 46%,rgba(85,99,112,.28) 74%,transparent 92%)}.partly-cloudy.moonlight .celestial-cloud:after{background:radial-gradient(ellipse at 24% 50%,rgba(213,219,220,.24) 0 24%,transparent 50%),radial-gradient(ellipse at 56% 45%,rgba(188,197,202,.22) 0 32%,transparent 58%),radial-gradient(ellipse at 82% 52%,rgba(114,128,139,.18) 0 22%,transparent 48%)}.partly-cloudy.moonlight .moon-disc{animation:celestialMoonVeil 24s ease-in-out infinite}.partly-cloudy.moonlight .sun-overlay,.partly-cloudy.moonlight .sun-disc{opacity:0!important;animation:none}.weather-fog .weather-overlay{opacity:calc(.58 * var(--weather-intensity));inset:-8%;background:repeating-linear-gradient(0deg,rgba(238,230,208,.3) 0 24px,rgba(132,130,122,.13) 24px 52px,transparent 52px 84px);filter:blur(8px);animation:weatherDrift 12s linear infinite}.weather-rain .weather-overlay,.weather-storm .weather-overlay{opacity:calc(.36 * var(--weather-intensity));background:linear-gradient(145deg,rgba(38,49,58,.28),rgba(29,36,42,.13));mix-blend-mode:multiply}.weather-rain .weather-particles,.weather-storm .weather-particles{opacity:calc(.54 * var(--weather-intensity));inset:-15% -10%;background:repeating-linear-gradient(105deg,transparent 0 18px,rgba(55,65,68,.34) 18px 19px,transparent 19px 37px);background-size:48px 96px;animation:weatherRain 1.1s linear infinite}.weather-snow .weather-overlay{opacity:calc(.3 * var(--weather-intensity));background:rgba(225,224,214,.22)}.weather-snow .weather-particles{opacity:calc(.64 * var(--weather-intensity));inset:-10%;background-image:radial-gradient(circle,rgba(248,244,226,.9) 0 2px,transparent 2.5px),radial-gradient(circle,rgba(236,232,216,.75) 0 1.5px,transparent 2px);background-size:46px 52px,71px 78px;background-position:0 0,22px 19px;animation:weatherSnow 8s linear infinite}.weather-storm .weather-flash{opacity:0;background:radial-gradient(circle at 72% 18%,rgba(255,246,214,.55),transparent 28%),rgba(255,242,203,.18);mix-blend-mode:screen;animation:weatherLightning 6.5s steps(1,end) infinite}.moon-overlay{inset:0;z-index:8;background:radial-gradient(circle at 88% 11%,rgba(230,224,197,calc(.3 * var(--moon-intensity))) 0,rgba(185,181,161,calc(.1 * var(--moon-intensity))) 16%,transparent 34%),linear-gradient(145deg,rgba(49,52,56,calc(.08 * var(--moon-intensity))),rgba(28,34,42,calc(.25 * var(--moon-intensity))));mix-blend-mode:multiply}.night-vignette{inset:0;background:radial-gradient(ellipse at center,transparent 46%,rgba(18,22,28,calc(.2 * var(--moon-intensity))) 100%);z-index:9}.moon-disc{right:7.5%;top:4.5%;width:72px;height:72px;border-radius:50%;z-index:9;filter:drop-shadow(0 0 9px rgba(87,69,47,.22)) drop-shadow(0 0 22px rgba(225,211,174,.18));transform:rotate(-8deg)}.moon-disc:before,.moon-disc:after{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid rgba(70,51,32,.28)}.moon-disc:after{inset:-7px;border-color:rgba(83,61,38,.14);transform:rotate(17deg)}.moon-disc span{display:block;position:relative;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 33% 31%,rgba(247,233,190,.82) 0 8%,transparent 9%),radial-gradient(circle at 64% 61%,rgba(85,67,47,.2) 0 8%,transparent 9%),radial-gradient(circle at 45% 72%,rgba(95,75,52,.16) 0 5%,transparent 6%),radial-gradient(circle at 42% 38%,#e7d7a8 0,#c9b681 58%,#8f754f 76%,rgba(87,65,43,.1) 77%,transparent 80%);box-shadow:inset -9px -7px 10px rgba(69,51,36,.22),inset 4px 3px 8px rgba(255,244,205,.24),0 0 18px rgba(215,197,151,.16)}.moon-disc span:after{content:"";position:absolute;left:48%;top:14%;width:34%;height:58%;border-left:1px solid rgba(72,51,33,.18);border-radius:50%;transform:rotate(22deg)}.moonlight .moon-overlay,.moonlight .night-vignette{opacity:1}.moonlight .moon-disc{opacity:calc(.72 * var(--moon-intensity))}.moonlight header{background:linear-gradient(100deg,#403d3a,#34383f);color:#eee8dc}.moonlight{background:#4a4843}.moonlight .map-stage{background:#4a4843}.alarm-overlay,.alarm-vignette{inset:0;z-index:10}.alarm-armed .alarm-overlay{opacity:calc(.13 * var(--alarm-intensity));background:linear-gradient(145deg,rgba(72,54,31,.75),rgba(116,86,42,.28));mix-blend-mode:multiply}.alarm-armed .alarm-vignette{opacity:calc(.38 * var(--alarm-intensity));background:radial-gradient(ellipse at center,transparent 48%,rgba(57,35,18,.55) 100%)}.alarm-triggered .alarm-overlay{opacity:calc(.52 * var(--alarm-intensity));background:repeating-linear-gradient(135deg,rgba(106,15,15,.42) 0 34px,rgba(64,8,8,.18) 34px 68px);mix-blend-mode:multiply;animation:alarmPulse 1.45s ease-in-out infinite}.alarm-triggered .alarm-vignette{opacity:calc(.88 * var(--alarm-intensity));background:radial-gradient(ellipse at center,transparent 32%,rgba(86,7,7,.72) 100%);animation:alarmVignette 1.45s ease-in-out infinite}.alarm-triggered header{color:#f8e6dc;background:linear-gradient(100deg,#5d211c,#321615)!important}.alarm-triggered header span,.alarm-triggered header small{color:#efc6b3}@keyframes cloudDriftA{0%{transform:translate3d(-5%,0,0) scale(.98)}45%{transform:translate3d(2%,1.5%,0) scale(1.015)}100%{transform:translate3d(9%,-1%,0) scale(1.035)}}@keyframes cloudDriftB{0%{transform:translate3d(6%,-1%,0) scale(1.02)}50%{transform:translate3d(0,1%,0) scale(.985)}100%{transform:translate3d(-10%,2%,0) scale(1.01)}}@keyframes cloudDriftC{0%{transform:translate3d(-7%,1%,0) scale(.97)}42%{transform:translate3d(1%,-1%,0) scale(1.025)}100%{transform:translate3d(8%,1.5%,0) scale(.99)}}@keyframes sunBreathe{0%,100%{transform:scale(.96);opacity:.72}50%{transform:scale(1.06);opacity:1}}@keyframes celestialCloudSunDrift{0%{transform:translate3d(-72px,-3px,0) scale(.88);opacity:.08}16%{opacity:.30}36%{transform:translate3d(-16px,-1px,0) scale(.98);opacity:.62}49%{transform:translate3d(2px,1px,0) scale(1.02);opacity:.76}62%{transform:translate3d(20px,0,0) scale(1);opacity:.70}78%{opacity:.34}100%{transform:translate3d(82px,4px,0) scale(.90);opacity:.08}}@keyframes celestialSunVeil{0%,16%,80%,100%{opacity:calc(.74 * var(--weather-intensity));filter:drop-shadow(0 0 10px rgba(224,158,48,.48)) drop-shadow(0 0 30px rgba(244,199,102,.36))}36%,64%{opacity:calc(.63 * var(--weather-intensity));filter:drop-shadow(0 0 9px rgba(224,158,48,.42)) drop-shadow(0 0 23px rgba(244,199,102,.30))}}@keyframes celestialSunGlow{0%,16%,80%,100%{opacity:calc(.62 * var(--weather-intensity))}36%,64%{opacity:calc(.50 * var(--weather-intensity))}}@keyframes celestialCloudMoonDrift{0%{transform:translate3d(72px,-2px,0) scale(.90);opacity:.08}16%{opacity:.26}37%{transform:translate3d(18px,-1px,0) scale(.98);opacity:.52}51%{transform:translate3d(0,1px,0) scale(1.02);opacity:.64}65%{transform:translate3d(-20px,0,0) scale(1);opacity:.56}81%{opacity:.28}100%{transform:translate3d(-78px,4px,0) scale(.91);opacity:.07}}@keyframes celestialMoonVeil{0%,16%,82%,100%{opacity:calc(.72 * var(--moon-intensity));filter:drop-shadow(0 0 9px rgba(87,69,47,.22)) drop-shadow(0 0 22px rgba(225,211,174,.18))}37%,66%{opacity:calc(.59 * var(--moon-intensity));filter:drop-shadow(0 0 7px rgba(87,69,47,.18)) drop-shadow(0 0 17px rgba(205,205,190,.14))}}@keyframes weatherRain{from{transform:translate3d(-3%,-12%,0)}to{transform:translate3d(3%,12%,0)}}@keyframes weatherSnow{from{transform:translate3d(0,-8%,0)}to{transform:translate3d(3%,9%,0)}}@keyframes weatherDrift{from{transform:translateX(-4%)}to{transform:translateX(4%)}}@keyframes weatherLightning{0%,6%,8%,45%,47%,100%{opacity:0}7%,46%{opacity:calc(.7 * var(--weather-intensity))}}@keyframes alarmPulse{0%,100%{opacity:calc(.34 * var(--alarm-intensity))}50%{opacity:calc(.58 * var(--alarm-intensity))}}@keyframes alarmVignette{0%,100%{opacity:calc(.65 * var(--alarm-intensity))}50%{opacity:calc(.95 * var(--alarm-intensity))}}ha-card.enchanted{background:#d3b985;border-color:rgba(80,50,28,.25);box-shadow:0 4px 16px rgba(61,39,24,.16)}ha-card.enchanted header{color:#4b311f;background:radial-gradient(circle at 18% 20%,rgba(255,240,193,.46),transparent 32%),linear-gradient(90deg,#d8c294,#c8a970);border-bottom:1px solid rgba(78,50,30,.18)}ha-card.enchanted header span,ha-card.enchanted header small{color:#6b4a33}ha-card.enchanted h1{font-family:Georgia,Cambria,"Times New Roman",serif;font-style:italic;letter-spacing:.025em}ha-card.enchanted.moonlight{background:#514b42}ha-card.enchanted.moonlight header{color:#eee6d5;background:radial-gradient(circle at 82% 18%,rgba(218,205,169,.13),transparent 30%),linear-gradient(90deg,#5a5145,#403d3a)}@media(prefers-reduced-motion:reduce){.cloud,.celestial-cloud,.partly-cloudy .sun-disc,.partly-cloudy .sun-overlay,.partly-cloudy .moon-disc,.sun-disc:before,.weather-fog .weather-overlay,.weather-rain .weather-particles,.weather-storm .weather-particles,.weather-snow .weather-particles,.weather-storm .weather-flash,.alarm-triggered .alarm-overlay,.alarm-triggered .alarm-vignette{animation:none}}@media(max-width:600px){header{align-items:flex-start;padding:14px 16px}small{font-size:.68rem}.moon-disc{width:54px;height:54px;right:5%;top:3.5%}.sun-disc{width:46px;height:46px;left:7%;top:6.5%}.celestial-cloud{width:108px;height:52px}.partly-cloudy:not(.moonlight) .celestial-cloud{left:2.5%;top:5.9%}.partly-cloudy.moonlight .celestial-cloud{right:1.8%;top:3.9%}}`;
Ct([
  A({ attribute: !1 })
], Fe.prototype, "hass", 2);
Ct([
  A({ type: Boolean, attribute: !1 })
], Fe.prototype, "preview", 2);
Ct([
  b()
], Fe.prototype, "config", 2);
Fe = Ct([
  z("ha-explorer-card")
], Fe);
window.customCards = window.customCards || [];
window.customCards.push({ type: "ha-explorer-card", name: "Home Assistant Explorer", description: "An interactive SVG floor map for Home Assistant.", preview: !0 });
console.info(`%c HOME ASSISTANT EXPLORER %c v${br} `, "color:white;background:#594431;font-weight:700;", "color:#594431;background:#d8c39b;font-weight:700;");
export {
  Fe as HaExplorerCard
};
//# sourceMappingURL=ha-explorer-card.js.map
