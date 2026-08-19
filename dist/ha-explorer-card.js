const xt = globalThis, li = xt.ShadowRoot && (xt.ShadyCSS === void 0 || xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, di = /* @__PURE__ */ Symbol(), Ai = /* @__PURE__ */ new WeakMap();
let cr = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== di) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (li && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = Ai.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Ai.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Lr = (e) => new cr(typeof e == "string" ? e : e + "", void 0, di), j = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, o, n) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new cr(i, e, di);
}, Fr = (e, t) => {
  if (li) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), o = xt.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, e.appendChild(r);
  }
}, Si = li ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return Lr(i);
})(e) : e;
const { is: Br, defineProperty: Hr, getOwnPropertyDescriptor: _r, getOwnPropertyNames: Vr, getOwnPropertySymbols: Kr, getPrototypeOf: Gr } = Object, Ot = globalThis, Ci = Ot.trustedTypes, Zr = Ci ? Ci.emptyScript : "", Wr = Ot.reactiveElementPolyfillSupport, Je = (e, t) => e, At = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Zr : null;
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
} }, ci = (e, t) => !Br(e, t), Ei = { attribute: !0, type: String, converter: At, reflect: !1, useDefault: !1, hasChanged: ci };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ot.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Le = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ei) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, r, i);
      o !== void 0 && Hr(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: o, set: n } = _r(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ei;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Je("elementProperties"))) return;
    const t = Gr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Je("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Je("properties"))) {
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
      for (const o of r) i.unshift(Si(o));
    } else t !== void 0 && i.push(Si(t));
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
    return Fr(t, this.constructor.elementStyles), t;
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
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : At).toAttribute(i, r.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, o = r._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = r.getPropertyOptions(o), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : At;
      this._$Em = o;
      const a = s.fromAttribute(i, n.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, o = !1, n) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (n = this[t]), r ??= s.getPropertyOptions(t), !((r.hasChanged ?? ci)(n, i) || r.useDefault && r.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, r)))) return;
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
Le.elementStyles = [], Le.shadowRootOptions = { mode: "open" }, Le[Je("elementProperties")] = /* @__PURE__ */ new Map(), Le[Je("finalized")] = /* @__PURE__ */ new Map(), Wr?.({ ReactiveElement: Le }), (Ot.reactiveElementVersions ??= []).push("2.1.2");
const pi = globalThis, $i = (e) => e, St = pi.trustedTypes, Pi = St ? St.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, pr = "$lit$", ke = `lit$${Math.random().toFixed(9).slice(2)}$`, hr = "?" + ke, Ur = `<${hr}>`, Me = document, tt = () => Me.createComment(""), it = (e) => e === null || typeof e != "object" && typeof e != "function", hi = Array.isArray, Yr = (e) => hi(e) || typeof e?.[Symbol.iterator] == "function", qt = `[ 	
\f\r]`, Qe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ni = /-->/g, Mi = />/g, Ee = RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ri = /'/g, zi = /"/g, ur = /^(?:script|style|textarea|title)$/i, gr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = gr(1), M = gr(2), se = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Ti = /* @__PURE__ */ new WeakMap(), Pe = Me.createTreeWalker(Me, 129);
function mr(e, t) {
  if (!hi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pi !== void 0 ? Pi.createHTML(t) : t;
}
const Qr = (e, t) => {
  const i = e.length - 1, r = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Qe;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, c, p = -1, u = 0;
    for (; u < l.length && (s.lastIndex = u, c = s.exec(l), c !== null); ) u = s.lastIndex, s === Qe ? c[1] === "!--" ? s = Ni : c[1] !== void 0 ? s = Mi : c[2] !== void 0 ? (ur.test(c[2]) && (o = RegExp("</" + c[2], "g")), s = Ee) : c[3] !== void 0 && (s = Ee) : s === Ee ? c[0] === ">" ? (s = o ?? Qe, p = -1) : c[1] === void 0 ? p = -2 : (p = s.lastIndex - c[2].length, d = c[1], s = c[3] === void 0 ? Ee : c[3] === '"' ? zi : Ri) : s === zi || s === Ri ? s = Ee : s === Ni || s === Mi ? s = Qe : (s = Ee, o = void 0);
    const g = s === Ee && e[a + 1].startsWith("/>") ? " " : "";
    n += s === Qe ? l + Ur : p >= 0 ? (r.push(d), l.slice(0, p) + pr + l.slice(p) + ke + g) : l + ke + (p === -2 ? a : g);
  }
  return [mr(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class rt {
  constructor({ strings: t, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let n = 0, s = 0;
    const a = t.length - 1, l = this.parts, [d, c] = Qr(t, i);
    if (this.el = rt.createElement(d, r), Pe.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = Pe.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(pr)) {
          const u = c[s++], g = o.getAttribute(p).split(ke), b = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? Xr : b[1] === "?" ? eo : b[1] === "@" ? to : jt }), o.removeAttribute(p);
        } else p.startsWith(ke) && (l.push({ type: 6, index: n }), o.removeAttribute(p));
        if (ur.test(o.tagName)) {
          const p = o.textContent.split(ke), u = p.length - 1;
          if (u > 0) {
            o.textContent = St ? St.emptyScript : "";
            for (let g = 0; g < u; g++) o.append(p[g], tt()), Pe.nextNode(), l.push({ type: 2, index: ++n });
            o.append(p[u], tt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === hr) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(ke, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += ke.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const r = Me.createElement("template");
    return r.innerHTML = t, r;
  }
}
function He(e, t, i = e, r) {
  if (t === se) return t;
  let o = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = it(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = o : i._$Cl = o), o !== void 0 && (t = He(e, o._$AS(e, t.values), o, r)), t;
}
class Jr {
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
    const { el: { content: i }, parts: r } = this._$AD, o = (t?.creationScope ?? Me).importNode(i, !0);
    Pe.currentNode = o;
    let n = Pe.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new ct(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new io(n, this, t)), this._$AV.push(d), l = r[++a];
      }
      s !== l?.index && (n = Pe.nextNode(), s++);
    }
    return Pe.currentNode = Me, o;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class ct {
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
    t = He(this, t, i), it(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== se && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Yr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && it(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Me.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = rt.createElement(mr(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new Jr(o, this), s = n.u(this.options);
      n.p(i), this.T(s), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Ti.get(t.strings);
    return i === void 0 && Ti.set(t.strings, i = new rt(t)), i;
  }
  k(t) {
    hi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, o = 0;
    for (const n of t) o === i.length ? i.push(r = new ct(this.O(tt()), this.O(tt()), this, this.options)) : r = i[o], r._$AI(n), o++;
    o < i.length && (this._$AR(r && r._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = $i(t).nextSibling;
      $i(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class jt {
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
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = He(this, a[r + l], i, l), d === se && (d = this._$AH[l]), s ||= !it(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xr extends jt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class eo extends jt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class to extends jt {
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
ro?.(rt, ct), (pi.litHtmlVersions ??= []).push("3.3.3");
const oo = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let o = r._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    r._$litPart$ = o = new ct(t.insertBefore(tt(), n), n, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const ui = globalThis;
let q = class extends Le {
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
q._$litElement$ = !0, q.finalized = !0, ui.litElementHydrateSupport?.({ LitElement: q });
const no = ui.litElementPolyfillSupport;
no?.({ LitElement: q });
(ui.litElementVersions ??= []).push("4.2.2");
const T = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const so = { attribute: !0, type: String, converter: At, reflect: !1, hasChanged: ci }, ao = (e = so, t, i) => {
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
function C(e) {
  return (t, i) => typeof i == "object" ? ao(e, t, i) : ((r, o, n) => {
    const s = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, r), s ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, i);
}
function v(e) {
  return C({ ...e, state: !0, attribute: !1 });
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
const po = "data:image/webp;base64,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";
const $e = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, fr = (e) => (...t) => ({ _$litDirective$: e, values: t });
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
    if (super(t), this.it = f, t.type !== $e.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
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
const ho = fr(ri), uo = {
  light: ["on"],
  motion: ["on"],
  media: ["playing", "on"],
  opening: ["on", "open"],
  temperature: [],
  fireplace: ["on", "heating", "burning", "active"]
}, go = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function yr(e) {
  return Math.min(1, Math.max(0, e));
}
function je(e) {
  return Math.min(1, Math.max(0, e));
}
function wt(e) {
  return [...uo[e]];
}
function mo(e) {
  if (e.kind === "temperature") return [];
  const t = (e.active_states ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : wt(e.kind);
}
function Xe(e, t) {
  const i = t?.position;
  return i && Number.isFinite(i.x) && Number.isFinite(i.y) ? { x: je(i.x), y: je(i.y) } : e.presence_anchor ? {
    x: je(e.presence_anchor.x),
    y: je(e.presence_anchor.y)
  } : e.points.length ? {
    x: je(e.points.reduce((r, o) => r + o[0], 0) / e.points.length),
    y: je(e.points.reduce((r, o) => r + o[1], 0) / e.points.length)
  } : { x: 0.5, y: 0.5 };
}
function fo(e) {
  const t = e?.brightness;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : yr(t / 255);
}
function Oi(e) {
  const t = e.intensity;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : yr(t);
}
function ji(e) {
  const t = e?.unit_of_measurement;
  return typeof t == "string" && t.trim() ? t.trim() : void 0;
}
function vr(e, t, i) {
  const r = e.entity?.trim(), o = mo(e);
  if (!r)
    return { index: t, reaction: e, active: !1, activeStates: o, intensity: 0, reason: "missing_entity" };
  const n = i?.(r);
  if (!n || go.has(n.state.trim().toLowerCase()))
    return { index: t, reaction: e, active: !1, currentState: n?.state, activeStates: o, intensity: 0, reason: "entity_unavailable" };
  if (e.kind === "temperature") {
    const d = Number(n.state);
    return Number.isFinite(d) ? { index: t, reaction: e, active: !0, currentState: n.state, activeStates: o, intensity: 1, numericValue: d, unit: ji(n.attributes) } : { index: t, reaction: e, active: !1, currentState: n.state, activeStates: o, intensity: 0, unit: ji(n.attributes), reason: "state_inactive" };
  }
  const s = n.state.trim().toLowerCase(), a = o.map((d) => d.toLowerCase()).includes(s);
  let l = 0;
  return a && (e.kind === "light" ? l = fo(n.attributes) * Oi(e) : l = Oi(e)), {
    index: t,
    reaction: e,
    active: a,
    currentState: n.state,
    activeStates: o,
    intensity: l,
    ...a ? {} : { reason: "state_inactive" }
  };
}
function Ct(e, t) {
  return (e.reactions ?? []).map((i, r) => vr(i, r, t));
}
var bo = Object.defineProperty, yo = Object.getOwnPropertyDescriptor, Te = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? yo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && bo(t, i, o), o;
};
function vo(e) {
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
const xo = {
  light: "💡",
  motion: "◉",
  media: "▶",
  opening: "↗",
  temperature: "°"
}, wo = {
  light: "Lys",
  motion: "Bevægelse",
  media: "TV / medie",
  opening: "Dør / vindue",
  temperature: "Temperatur"
};
let fe = class extends q {
  constructor() {
    super(...arguments), this.presences = [], this.pendingLights = /* @__PURE__ */ new Set(), this.pendingRoomAction = "", this.actionError = "";
  }
  get statuses() {
    return this.room ? Ct(this.room, (e) => {
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
      const n = vo(o.avatar);
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
          <span class=${`entity-icon ${i}`}>${xo[i]}</span>
          <span class="entity-copy">
            <strong>${this.entityName(t)}</strong>
            <small>${wo[i]} · ${this.statusText(e)}</small>
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
fe.styles = j`
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
Te([
  C({ attribute: !1 })
], fe.prototype, "room", 2);
Te([
  C({ attribute: !1 })
], fe.prototype, "presences", 2);
Te([
  C({ attribute: !1 })
], fe.prototype, "hass", 2);
Te([
  v()
], fe.prototype, "pendingLights", 2);
Te([
  v()
], fe.prototype, "pendingRoomAction", 2);
Te([
  v()
], fe.prototype, "actionError", 2);
fe = Te([
  T("explorer-room-panel")
], fe);
const x = 1e3;
function Lt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function ko(e) {
  return `translate(${e.x} ${e.y}) scale(${e.zoom})`;
}
function kt(e, t = 1) {
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
  return kt({
    zoom: t,
    x: i - (i - e.x) * o,
    y: r - (r - e.y) * o
  });
}
var Ao = Object.defineProperty, So = Object.getOwnPropertyDescriptor, Z = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? So(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Ao(t, i, o), o;
};
const Di = { width: 16, height: 9, status: "idle" }, Co = { person: "●", pet: "◆", robot: "■", vehicle: "▰", object: "✦" }, Eo = "script,foreignObject,iframe,object,embed,link,meta,audio,video,canvas";
function qi(e) {
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
function $o(e) {
  const t = e.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  return t?.length === 4 && t.every(Number.isFinite) && t[2] > 0 && t[3] > 0 ? { width: t[2], height: t[3] } : { width: Li(e.getAttribute("width")) ?? 16, height: Li(e.getAttribute("height")) ?? 9 };
}
function Fi(e) {
  return e.replace(/@import[^;]+;?/gi, "").replace(/url\(([^)]*)\)/gi, (t, i) => {
    const r = i.trim().replace(/^['"]|['"]$/g, "");
    return r.startsWith("#") ? `url(${r})` : "none";
  }).replace(/javascript\s*:/gi, "").replace(/expression\s*\(/gi, "");
}
function Po(e) {
  const t = e.trim();
  return t === "" || t.startsWith("#") || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,/i.test(t);
}
function No(e) {
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
  i.querySelectorAll(Eo).forEach((o) => o.remove());
  const r = [i, ...Array.from(i.querySelectorAll("*"))];
  for (const o of r)
    for (const n of Array.from(o.attributes)) {
      const s = n.name.toLowerCase(), a = n.value;
      if (s.startsWith("on")) {
        o.removeAttribute(n.name);
        continue;
      }
      if ((s === "href" || s === "xlink:href") && !Po(a)) {
        o.removeAttribute(n.name);
        continue;
      }
      if (s === "style") {
        const l = Fi(a).trim();
        l ? o.setAttribute(n.name, l) : o.removeAttribute(n.name);
      }
    }
  return i.querySelectorAll("style").forEach((o) => {
    const n = Fi(o.textContent ?? "").trim();
    n ? o.textContent = n : o.remove();
  }), i.hasAttribute("xmlns") || i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i;
}
let H = class extends q {
  constructor() {
    super(...arguments), this.image = "", this.rooms = [], this.presences = [], this.minZoom = 1, this.maxZoom = 6, this.initialZoom = 1, this.fitMode = "contain", this.viewport = { zoom: 1, x: 0, y: 0 }, this.metadata = { ...Di }, this.imageSource = "", this.svgMarkup = "", this.loadError = "", this.activePointers = /* @__PURE__ */ new Map(), this.imageRequest = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.resetViewport();
  }
  updated(e) {
    e.has("rooms") && this.selectedRoom && (this.selectedRoom = this.rooms.find((t) => t.id === this.selectedRoom?.id)), (e.has("image") || e.has("fitMode") && this.image && qi(this.image)) && this.loadFloorplan();
  }
  async loadFloorplan() {
    const e = ++this.imageRequest;
    if (this.imageSource = "", this.svgMarkup = "", this.loadError = "", !this.image) {
      this.metadata = { ...Di }, this.resetViewport();
      return;
    }
    this.metadata = { ...this.metadata, status: "loading" };
    try {
      qi(this.image) ? await this.loadSvgFloorplan(e) : await this.loadRasterFloorplan(e);
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
    const r = new DOMParser().parseFromString(i, "image/svg+xml"), o = Mo(r), n = $o(o);
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
    this.viewport = kt(Ii(this.viewport, r, t.x, t.y), this.minZoom);
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
        const l = { x: (t.x + n.x) / 2, y: (t.y + n.y) / 2 }, d = { x: (o.x + n.x) / 2, y: (o.y + n.y) / 2 }, c = { x: (l.x - r.left) / r.width * x, y: (l.y - r.top) / r.height * x }, p = Lt(this.viewport.zoom * (a / s), this.minZoom, this.maxZoom), u = (d.x - l.x) / r.width * x, g = (d.y - l.y) / r.height * x, b = Ii(this.viewport, p, c.x, c.y);
        this.viewport = kt({ ...b, x: b.x + u, y: b.y + g }, this.minZoom);
      }
    } else if (this.viewport.zoom > this.minZoom + 1e-4) {
      const s = (o.x - t.x) / r.width * x, a = (o.y - t.y) / r.height * x;
      this.viewport = kt({ ...this.viewport, x: this.viewport.x + s, y: this.viewport.y + a }, this.minZoom);
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
      const t = e.points.map(([d, c]) => `${d * x},${c * x}`).join(" "), i = e.id === this.selectedRoom?.id, r = e.points.reduce((d, c) => d + c[0], 0) / e.points.length, o = e.points.reduce((d, c) => d + c[1], 0) / e.points.length, n = (e.label?.x ?? r) * x, s = (e.label?.y ?? o) * x, a = e.color ?? "#03a9f4", l = Math.max(76, Math.min(190, (e.name?.length ?? 0) * 15 + 28));
      return M`<g class=${i ? "room selected" : "room"} @pointerdown=${(d) => d.stopPropagation()} @click=${(d) => this.selectRoom(d, e)}><polygon points=${t} fill=${a} fill-opacity=${i ? "0.34" : "0.18"} stroke=${a} stroke-opacity="0.9" stroke-width=${i ? "5" : "3"} vector-effect="non-scaling-stroke"></polygon>${e.name ? M`<rect class="room-label-mask" x=${n - l / 2} y=${s - 18} width=${l} height="36" rx="10"></rect><text class="room-label" x=${n} y=${s} text-anchor="middle" dominant-baseline="middle">${e.name}</text>` : f}</g>`;
    });
  }
  renderPresences() {
    return this.presences.filter((e) => e.visible !== !1).map((e, t) => {
      const i = e.type ?? "person", r = e.id === this.selectedPresence?.id, o = (e.x ?? 0.5) * x, n = (e.y ?? 0.5) * x, s = e.icon ?? Co[i], a = No(e.avatar), l = e.color ?? "#03a9f4", d = r ? 31 : 25, c = d * 2, p = `presence-avatar-${t}`, u = r ? 58 : 52;
      return M`<g class=${r ? "presence selected" : "presence"} transform=${`translate(${o} ${n})`} @pointerdown=${(g) => g.stopPropagation()} @click=${(g) => this.selectPresence(g, e)}>${a ? M`<defs><clipPath id=${p}><circle r=${d - 3}></circle></clipPath></defs><circle class="presence-avatar-background" r=${d} fill=${l}></circle><image href=${a} x=${-d + 3} y=${-d + 3} width=${c - 6} height=${c - 6} preserveAspectRatio="xMidYMid slice" clip-path=${`url(#${p})`}></image><circle class="presence-border" r=${d} fill="none" stroke=${l} stroke-width=${r ? "5" : "3"} vector-effect="non-scaling-stroke"></circle>` : M`<circle class="presence-marker" r=${d} fill=${l} fill-opacity=${r ? "1" : ".88"}></circle><text class="presence-icon" text-anchor="middle" dominant-baseline="middle">${s}</text>`}<text class="presence-label" y=${u} text-anchor="middle">${e.name ?? e.id}</text></g>`;
    });
  }
  render() {
    const e = ko(this.viewport);
    return h`<div class="viewport"><svg class="floorplan" viewBox="0 0 ${x} ${x}" @wheel=${this.handleWheel} @pointerdown=${this.handlePointerDown} @pointermove=${this.handlePointerMove} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerUp} @click=${() => {
      this.selectedRoom = void 0, this.selectedPresence = void 0;
    }}><rect class="backdrop" width=${x} height=${x}></rect><g class="scene" transform=${e}>${this.svgMarkup ? M`<g class="floorplan-source inline-source">${ho(this.svgMarkup)}</g>` : this.imageSource ? M`<image class="floorplan-source" href=${this.imageSource} x="0" y="0" width=${x} height=${x} preserveAspectRatio=${this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>` : f}<g class="rooms-scene">${this.renderRooms()}</g><g class="presences-scene">${this.renderPresences()}</g></g></svg>${this.loadError ? h`<div class="load-error">${this.loadError}</div>` : f}<button class="zoom-badge" type="button" title="Nulstil zoom og placering" aria-label="Nulstil zoom og placering" @click=${(t) => {
      t.stopPropagation(), this.resetViewport();
    }}>⌂ &nbsp; ${Math.round(this.viewport.zoom * 100)}%</button></div>${this.selectedRoom ? h`<explorer-room-panel .hass=${this.hass} .room=${this.selectedRoom} @close=${() => this.selectedRoom = void 0}></explorer-room-panel>` : f}`;
  }
};
H.styles = j`:host{display:block;position:relative}.viewport{position:relative;overflow:hidden;background:var(--secondary-background-color);touch-action:none;max-height:var(--explorer-viewport-max-height,none)}svg.floorplan{display:block;width:100%;height:auto;aspect-ratio:1/1;user-select:none}.backdrop{fill:var(--card-background-color,#fff)}.floorplan-source{pointer-events:none}.inline-source{pointer-events:none}.room{cursor:pointer}.room polygon{transition:fill-opacity .18s ease,stroke-width .18s ease}.room-label-mask{fill:transparent;pointer-events:none}.room-label{font-size:18px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.presence{cursor:pointer}.presence-icon{font-size:24px;fill:#fff;pointer-events:none}.presence-label{font-size:16px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.zoom-badge{position:absolute;right:14px;bottom:14px;padding:8px 12px;border:0;border-radius:999px;background:rgba(0,0,0,.66);color:#fff;font:inherit;font-size:.8rem;font-weight:700;cursor:pointer;touch-action:manipulation}.zoom-badge:focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}.load-error{position:absolute;left:14px;right:14px;top:14px;padding:10px 12px;border-radius:10px;background:var(--error-color,#db4437);color:#fff;font-size:.85rem;font-weight:700}@media(max-width:600px){.room-label{font-size:16px}.presence-label{font-size:14px}.zoom-badge{right:10px;bottom:10px}}`;
Z([
  C({ attribute: !1 })
], H.prototype, "hass", 2);
Z([
  C()
], H.prototype, "image", 2);
Z([
  C({ attribute: !1 })
], H.prototype, "rooms", 2);
Z([
  C({ attribute: !1 })
], H.prototype, "presences", 2);
Z([
  C({ type: Number, attribute: "min-zoom" })
], H.prototype, "minZoom", 2);
Z([
  C({ type: Number, attribute: "max-zoom" })
], H.prototype, "maxZoom", 2);
Z([
  C({ type: Number, attribute: "initial-zoom" })
], H.prototype, "initialZoom", 2);
Z([
  C({ attribute: "fit-mode" })
], H.prototype, "fitMode", 2);
Z([
  v()
], H.prototype, "viewport", 2);
Z([
  v()
], H.prototype, "selectedRoom", 2);
Z([
  v()
], H.prototype, "selectedPresence", 2);
Z([
  v()
], H.prototype, "metadata", 2);
Z([
  v()
], H.prototype, "imageSource", 2);
Z([
  v()
], H.prototype, "svgMarkup", 2);
Z([
  v()
], H.prototype, "loadError", 2);
H = Z([
  T("explorer-canvas")
], H);
function Ae(e, t) {
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
function Ro(e, t) {
  return (e.route_nodes ?? []).find((i) => i.id === t)?.name ?? t;
}
function me(e) {
  return `${e.kind}:${e.id}`;
}
function Et(e, t) {
  return t.kind === "room" ? Ae(e, t.id) : (e.route_nodes ?? []).find((i) => i.id === t.id)?.point;
}
function zo(e, t) {
  const i = Et(e, t);
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
      label: Ro(e, t.id),
      point: i
    };
}
function xr(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : ["on"];
}
function To(e) {
  return xr(e.condition?.allowed_states);
}
function _e(e, t) {
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
function Oo(e, t, i) {
  if (!e.condition)
    return {
      index: t,
      edge: e,
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  const r = e.condition.entity?.trim(), o = To(e);
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
    const n = Oo(r, o, t), a = [r.from, r.to].filter((u) => u.kind === "node").map((u) => i.get(u.id)).filter((u) => !!u).map((u) => _e(u, t)).filter((u) => u.conditional), d = a.find((u) => !u.active) ?? (n.conditional ? void 0 : a[0]), c = n.active && a.every((u) => u.active), p = n.conditional || a.length > 0;
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
function wr(e) {
  return e.path ? e.path : (e.via ?? []).map((t) => ({ point: t }));
}
function jo(e, t, i) {
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
  const s = Ae(e, i), a = Ae(e, r);
  if (!s || !a) return;
  const l = wr(t), c = (o ? [...l].reverse() : l).map((u, g) => jo(e, u, g)).filter((u) => !!u), p = [
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: ot(e, i),
      point: s
    },
    ...c,
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
function Io(e, t) {
  const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = (a) => {
    const l = me(a);
    o.set(l, a);
    const d = r.get(l);
    if (d) return d;
    const c = Et(e, a);
    return c && r.set(l, c), c;
  }, s = (a, l, d) => {
    const c = i.get(a) ?? [];
    c.push({ key: l, weight: d }), i.set(a, c);
  };
  return t.forEach((a) => {
    if (!a.active) return;
    const l = a.edge, d = n(l.from), c = n(l.to);
    if (!d || !c) return;
    const p = me(l.from), u = me(l.to);
    if (p === u) return;
    const g = Math.hypot(c[0] - d[0], c[1] - d[1]);
    s(p, u, g), s(u, p, g);
  }), { adjacency: i, positions: r, endpoints: o };
}
function Do(e, t, i, r, o) {
  if (!(e.route_graph_edges ?? []).length) return;
  const n = `room:${t}`, s = `room:${i}`, { adjacency: a, endpoints: l } = Io(e, r);
  if (!a.has(n) || !a.has(s)) return;
  const d = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), p = new Set(a.keys());
  for (a.forEach((m) => m.forEach((y) => p.add(y.key))), p.forEach((m) => d.set(m, Number.POSITIVE_INFINITY)), d.set(n, 0); p.size; ) {
    let m, y = Number.POSITIVE_INFINITY;
    for (const S of p) {
      const k = d.get(S) ?? Number.POSITIVE_INFINITY;
      k < y && (m = S, y = k);
    }
    if (!m || !Number.isFinite(y) || (p.delete(m), m === s)) break;
    for (const S of a.get(m) ?? []) {
      if (!p.has(S.key)) continue;
      const k = y + S.weight;
      k < (d.get(S.key) ?? Number.POSITIVE_INFINITY) && (d.set(S.key, k), c.set(S.key, m));
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
  const b = u.map((m) => l.get(m)).map((m) => m ? zo(e, m) : void 0).filter((m) => !!m);
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
  const l = Do(e, t, i, o, n);
  if (l) return l;
  const d = Ae(e, t), c = Ae(e, i);
  if (!d || !c) return;
  const p = [
    {
      kind: "room",
      id: t,
      key: `room:${t}`,
      label: ot(e, t),
      point: d
    },
    {
      kind: "room",
      id: i,
      key: `room:${i}`,
      label: ot(e, i),
      point: c
    }
  ];
  return {
    source: "fallback",
    hops: p,
    distance: gi(p),
    blockedEdges: n
  };
}
function qo(e) {
  return [me(e.from), me(e.to)].sort().join("|");
}
function Hi(e, t) {
  const i = e.route_graph_edges ?? [];
  let r = 0, o = 0, n = 0;
  const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), d = (A) => {
    a.set(A, (a.get(A) ?? 0) + 1);
  }, c = (A, P) => {
    const N = l.get(A) ?? /* @__PURE__ */ new Set();
    N.add(P), l.set(A, N);
    const O = l.get(P) ?? /* @__PURE__ */ new Set();
    O.add(A), l.set(P, O);
  };
  i.forEach((A) => {
    const P = me(A.from), N = me(A.to), O = qo(A);
    P === N && (n += 1), s.has(O) && (o += 1), s.add(O);
    const Q = Et(e, A.from), U = Et(e, A.to);
    if (!Q || !U || P === N) {
      r += 1;
      return;
    }
    d(P), d(N), c(P, N);
  });
  const p = i.length ? (e.rooms ?? []).filter((A) => Ae(e, A.id) && !a.has(`room:${A.id}`)).map((A) => A.id) : [], u = i.length ? (e.route_nodes ?? []).filter((A) => !a.has(`node:${A.id}`)).map((A) => A.id) : [];
  let g = 0;
  const b = new Set(l.keys());
  for (; b.size; ) {
    g += 1;
    const A = b.values().next().value;
    if (!A) break;
    const P = [A];
    for (b.delete(A); P.length; ) {
      const N = P.pop();
      for (const O of l.get(N) ?? [])
        b.has(O) && (b.delete(O), P.push(O));
    }
  }
  const m = [], y = new Set((e.route_nodes ?? []).map((A) => A.id));
  (e.routes ?? []).forEach((A) => {
    wr(A).forEach((P) => {
      P.node_id && !y.has(P.node_id) && m.push({ from: A.from, to: A.to, nodeId: P.node_id });
    });
  });
  const S = pt(e, t), k = S.filter((A) => !A.active), w = (e.route_nodes ?? []).map((A) => _e(A, t)).filter((A) => A.conditional), E = w.filter((A) => !A.active), $ = /* @__PURE__ */ new Set();
  return S.forEach((A) => {
    A.conditionSource === "edge" && (A.reason === "missing_entity" || A.reason === "entity_unavailable") && $.add(A.entity ?? "(mangler entity)");
  }), w.forEach((A) => {
    (A.reason === "missing_entity" || A.reason === "entity_unavailable") && $.add(A.entity ?? "(mangler entity)");
  }), {
    invalidEdges: r,
    duplicateEdges: o,
    selfEdges: n,
    components: g,
    disconnectedRoomIds: p,
    disconnectedNodeIds: u,
    brokenRouteNodeReferences: m,
    conditionalEdges: S.filter((A) => A.conditional).length,
    blockedEdges: k,
    conditionalNodes: w.length,
    blockedNodes: E,
    unresolvedConditionEntities: [...$]
  };
}
var Lo = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, It = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Fo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Lo(t, i, o), o;
};
const Ft = 900, _i = 3600, Vi = 58, F = "http://www.w3.org/2000/svg";
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
      }, d = this.previousPresencePositions.get(n.id), c = this.previousPresenceRooms.get(n.id), p = n.room_id;
      if (o.add(n.id), this.activeAnimations.get(n.id)?.remove(), this.activeAnimations.delete(n.id), !r && d && (Math.abs(d.x - l.x) > 0.01 || Math.abs(d.y - l.y) > 0.01)) {
        const u = this.resolveMovementPath(d, l, c, p);
        this.createFootsteps(u);
        const g = document.createElementNS(F, "animateTransform");
        g.setAttribute("attributeName", "transform"), g.setAttribute("attributeType", "XML"), g.setAttribute("type", "translate"), g.setAttribute("values", u.map((b) => `${b.x} ${b.y}`).join(";")), g.setAttribute("keyTimes", this.buildKeyTimes(u).join(";")), g.setAttribute("dur", `${Ft}ms`), g.setAttribute("begin", "indefinite"), g.setAttribute("fill", "freeze"), g.setAttribute("calcMode", "linear"), a.appendChild(g), this.activeAnimations.set(n.id, g), g.beginElement(), window.setTimeout(() => {
          this.activeAnimations.get(n.id) === g && (g.remove(), this.activeAnimations.delete(n.id));
        }, Ft + 80);
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
      return _e(
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
    const i = document.createElementNS(F, "title");
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
    ), r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, o = document.createElementNS(F, "g");
    o.setAttribute("class", "route-status-scene"), o.setAttribute("aria-label", "Live rutestatus og døre"), o.setAttribute("pointer-events", "none"), i.forEach((s) => {
      const a = this.endpointPoint(s.edge.from), l = this.endpointPoint(s.edge.to);
      if (!a || !l) return;
      const d = this.edgeStatusColor(s), c = document.createElementNS(F, "line");
      if (c.setAttribute("x1", String(a.x)), c.setAttribute("y1", String(a.y)), c.setAttribute("x2", String(l.x)), c.setAttribute("y2", String(l.y)), c.setAttribute("stroke", d), c.setAttribute("stroke-linecap", "round"), c.setAttribute("vector-effect", "non-scaling-stroke"), c.setAttribute("stroke-width", s.conditional ? s.active ? "4.5" : "5.5" : "2.5"), c.setAttribute("stroke-opacity", s.conditional ? s.active ? ".72" : ".82" : ".2"), s.conditional || c.setAttribute("stroke-dasharray", "4 10"), s.conditional && !s.active && c.setAttribute("stroke-dasharray", "13 9"), this.appendSvgTitle(c, this.statusDescription(s)), o.appendChild(c), !s.conditional) return;
      const p = (a.x + l.x) / 2, u = (a.y + l.y) / 2, g = document.createElementNS(F, "g");
      g.setAttribute("transform", `translate(${p} ${u})`);
      const b = document.createElementNS(F, "circle");
      b.setAttribute("r", "12"), b.setAttribute("fill", "var(--card-background-color, #ffffff)"), b.setAttribute("fill-opacity", ".9"), b.setAttribute("stroke", d), b.setAttribute("stroke-width", "3"), b.setAttribute("vector-effect", "non-scaling-stroke"), g.appendChild(b);
      const m = document.createElementNS(F, "text");
      if (m.setAttribute("text-anchor", "middle"), m.setAttribute("dominant-baseline", "central"), m.setAttribute("fill", d), m.setAttribute("font-size", "16"), m.setAttribute("font-weight", "900"), m.setAttribute("font-family", "system-ui, sans-serif"), m.textContent = s.active ? "✓" : "×", g.appendChild(m), !s.active && !r) {
        const y = document.createElementNS(F, "animate");
        y.setAttribute("attributeName", "opacity"), y.setAttribute("values", "1;.45;1"), y.setAttribute("dur", "1.8s"), y.setAttribute("repeatCount", "indefinite"), g.appendChild(y);
      }
      this.appendSvgTitle(g, this.statusDescription(s)), o.appendChild(g);
    }), t.forEach((s) => {
      const a = this.doorVisualStatus(s, i), l = this.doorStatusColor(a), d = s.point[0] * x, c = s.point[1] * x, p = document.createElementNS(F, "g");
      p.setAttribute("transform", `translate(${d} ${c})`);
      const u = document.createElementNS(F, "circle");
      u.setAttribute("r", "22"), u.setAttribute("fill", "var(--card-background-color, #ffffff)"), u.setAttribute("fill-opacity", ".9"), u.setAttribute("stroke", l), u.setAttribute("stroke-width", "4"), u.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(u);
      const g = document.createElementNS(F, "rect");
      g.setAttribute("x", "-9"), g.setAttribute("y", "-13"), g.setAttribute("width", "15"), g.setAttribute("height", "26"), g.setAttribute("rx", "1.5"), g.setAttribute("fill", "none"), g.setAttribute("stroke", l), g.setAttribute("stroke-width", "3"), g.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(g);
      const b = document.createElementNS(F, "circle");
      if (b.setAttribute("cx", "2"), b.setAttribute("cy", "0"), b.setAttribute("r", "2"), b.setAttribute("fill", l), p.appendChild(b), a === "blocked") {
        const w = document.createElementNS(F, "line");
        w.setAttribute("x1", "-12"), w.setAttribute("y1", "-15"), w.setAttribute("x2", "12"), w.setAttribute("y2", "15"), w.setAttribute("stroke", l), w.setAttribute("stroke-width", "4"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(w);
      }
      const m = document.createElementNS(F, "circle");
      if (m.setAttribute("cx", "16"), m.setAttribute("cy", "-16"), m.setAttribute("r", "6"), m.setAttribute("fill", l), m.setAttribute("stroke", "var(--card-background-color, #ffffff)"), m.setAttribute("stroke-width", "2"), m.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(m), s.name) {
        const w = document.createElementNS(F, "text");
        w.setAttribute("y", "39"), w.setAttribute("text-anchor", "middle"), w.setAttribute("fill", "var(--primary-text-color, #1f2937)"), w.setAttribute("font-size", "20"), w.setAttribute("font-weight", "700"), w.setAttribute("font-family", "system-ui, sans-serif"), w.setAttribute("paint-order", "stroke"), w.setAttribute("stroke", "var(--card-background-color, #ffffff)"), w.setAttribute("stroke-width", "5"), w.setAttribute("stroke-linejoin", "round"), w.textContent = s.name, p.appendChild(w);
      }
      const y = a === "always" ? "altid aktiv" : a === "active" ? "åben" : a === "blocked" ? "lukket / blokeret" : "blandet status", S = s.state_binding ? _e(s, (w) => this.hass?.states[w]?.state) : void 0, k = S?.entity ? ` · ${S.entity}: ${S.currentState ?? "ukendt"} · åben: ${S.allowedStates.join(", ")}` : "";
      this.appendSvgTitle(p, `${s.name ?? s.id} · ${y}${k}`), o.appendChild(p);
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
    t = document.createElementNS(F, "g"), t.setAttribute("class", "footsteps-scene"), t.setAttribute("aria-label", "Bevægelsesspor"), t.setAttribute("pointer-events", "none");
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
      let l = 0, d = i[i.length - 1];
      for (const O of i) {
        if (l + O.length >= a) {
          d = O;
          break;
        }
        l += O.length;
      }
      const c = d.length > 0 ? (a - l) / d.length : 0, p = d.end.x - d.start.x, u = d.end.y - d.start.y, g = n % 2 === 0 ? -1 : 1, b = d.length > 0 ? -u / d.length : 0, m = d.length > 0 ? p / d.length : 0, y = 9 * g, S = d.start.x + p * c + b * y, k = d.start.y + u * c + m * y, w = Math.atan2(u, p) * 180 / Math.PI + 90, E = Math.round(s * Ft), $ = document.createElementNS(F, "g");
      $.setAttribute("transform", `translate(${S} ${k}) rotate(${w + g * 8})`), $.setAttribute("opacity", "0");
      const A = document.createElementNS(F, "ellipse");
      A.setAttribute("cx", "0"), A.setAttribute("cy", "-5"), A.setAttribute("rx", "6"), A.setAttribute("ry", "12"), A.setAttribute("fill", "rgba(67, 48, 31, 0.72)");
      const P = document.createElementNS(F, "ellipse");
      P.setAttribute("cx", "0"), P.setAttribute("cy", "9"), P.setAttribute("rx", "4.5"), P.setAttribute("ry", "5.5"), P.setAttribute("fill", "rgba(67, 48, 31, 0.68)");
      const N = document.createElementNS(F, "animate");
      N.setAttribute("attributeName", "opacity"), N.setAttribute("values", "0;0.72;0.56;0"), N.setAttribute("keyTimes", "0;0.08;0.58;1"), N.setAttribute("begin", "indefinite"), N.setAttribute("dur", `${_i}ms`), N.setAttribute("fill", "freeze"), $.append(A, P, N), t.appendChild($), window.setTimeout(() => {
        $.isConnected && N.beginElement();
      }, E), window.setTimeout(() => $.remove(), E + _i + 120);
    }
  }
};
It([
  C({ attribute: !1 })
], Ve.prototype, "routes", 2);
It([
  C({ attribute: !1 })
], Ve.prototype, "routeNodes", 2);
It([
  C({ attribute: !1 })
], Ve.prototype, "routeGraphEdges", 2);
Ve = It([
  T("explorer-animated-canvas")
], Ve);
var Bo = Object.getOwnPropertyDescriptor, Ho = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Bo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const D = "http://www.w3.org/2000/svg";
let $t = class extends Ve {
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
      [[74, 0.025], [52, 0.055], [34, 0.12]].forEach(([d, c], p) => {
        const u = document.createElementNS(D, "circle");
        if (u.setAttribute("class", `magical-light-glow glow-${p + 1}`), u.setAttribute("r", String(d * (0.82 + n * 0.34))), u.setAttribute("fill", r), u.setAttribute("fill-opacity", String(c + n * c * 1.8)), u.setAttribute("stroke", "none"), e.appendChild(u), !i && p === 1) {
          const g = document.createElementNS(D, "animate");
          g.setAttribute("attributeName", "fill-opacity"), g.setAttribute("values", `${c + n * 0.07};${c + n * 0.13};${c + n * 0.07}`), g.setAttribute("dur", "4.8s"), g.setAttribute("repeatCount", "indefinite"), u.appendChild(g);
        }
      });
      const a = document.createElementNS(D, "circle"), l = 24 + n * 24;
      if (a.setAttribute("class", "light-halo"), a.setAttribute("r", String(l)), a.setAttribute("fill", r), a.setAttribute("fill-opacity", String(0.08 + n * 0.18)), a.setAttribute("stroke", r), a.setAttribute("stroke-width", "2"), a.setAttribute("stroke-opacity", String(0.1 + n * 0.18)), a.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(a), !i) {
        const d = document.createElementNS(D, "animate");
        d.setAttribute("attributeName", "r"), d.setAttribute("values", `${l * 0.94};${l * 1.06};${l * 0.94}`), d.setAttribute("dur", "4.2s"), d.setAttribute("repeatCount", "indefinite"), a.appendChild(d);
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
      const d = document.createElementNS(D, "circle");
      if (d.setAttribute("class", "fireplace-glow fireplace-glow-inner"), d.setAttribute("r", String(s * 0.56)), d.setAttribute("fill", "var(--explorer-room-fireplace-hot, #e7a253)"), d.setAttribute("fill-opacity", String(0.12 + 0.17 * o)), e.appendChild(d), !i) {
        const c = document.createElementNS(D, "animate");
        c.setAttribute("attributeName", "fill-opacity"), c.setAttribute("values", `${0.1 + 0.12 * o};${0.2 + 0.18 * o};${0.12 + 0.1 * o};${0.24 + 0.16 * o};${0.1 + 0.12 * o}`), c.setAttribute("dur", "2.1s"), c.setAttribute("repeatCount", "indefinite"), d.appendChild(c);
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
    const o = Xe(t, i.reaction), n = document.createElementNS(D, "g");
    n.setAttribute("class", `room-reaction-point ${i.reaction.kind} ${i.active ? "active" : "inactive"}`), n.setAttribute("data-reaction-kind", i.reaction.kind), n.setAttribute("transform", `translate(${o.x * x} ${o.y * x})`), i.reaction.kind === "light" ? this.appendLightPoint(n, i, r) : i.reaction.kind === "motion" ? this.appendMotionPoint(n, i, r) : i.reaction.kind === "media" ? this.appendMediaPoint(n, i) : i.reaction.kind === "opening" ? this.appendOpeningPoint(n, i) : i.reaction.kind === "fireplace" ? this.appendFireplacePoint(n, i, r) : this.appendTemperaturePoint(n, i);
    const s = i.reaction.kind === "temperature" ? this.formatTemperature(i) : i.currentState ?? "ukendt";
    this.appendTitle(n, `${t.name ?? t.id} · ${i.reaction.entity} · ${s}`), e.appendChild(n);
  }
  syncRoomReactionOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.room-reactions-scene")?.remove();
    const t = this.rooms.flatMap((a) => Ct(a, (l) => this.entityState(l)).map((l) => ({ room: a, status: l })));
    if (!t.length) return;
    const i = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, r = document.createElementNS(D, "g");
    r.setAttribute("class", "room-reactions-scene"), r.setAttribute("aria-label", "Home Assistant entity-punkter"), r.setAttribute("pointer-events", "none"), t.forEach(({ room: a, status: l }) => this.appendReactionPoint(r, a, l, i));
    const o = e.querySelector(":scope > g.route-status-scene"), n = e.querySelector(":scope > g.footsteps-scene"), s = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, o ?? n ?? s ?? null);
  }
};
$t = Ho([
  T("explorer-living-canvas")
], $t);
var _o = Object.getOwnPropertyDescriptor, Vo = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? _o(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const z = "http://www.w3.org/2000/svg", Bt = 3e4;
let nt = class extends $t {
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
    const r = document.createElementNS(z, "g");
    r.setAttribute("class", "presence-room-activity-scene"), r.setAttribute("aria-label", "Tilstedeværelsesbaseret rumaktivitet"), r.setAttribute("pointer-events", "none"), i.forEach(({ room: l, active: d, intensity: c }) => {
      if (l.points.length < 3) return;
      const p = document.createElementNS(z, "polygon");
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
      const t = Ct(e, (r) => this.atmosphereEntityState(r)).filter((r) => r.reaction.kind === "temperature" && r.active).map((r) => this.temperatureCelsius(r)).filter((r) => r !== void 0);
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
    const i = document.createElementNS(z, "g");
    i.setAttribute("class", "room-temperature-atmosphere-scene"), i.setAttribute("aria-label", "Temperaturatmosfære i rum"), i.setAttribute("pointer-events", "none"), t.forEach(({ room: l, celsius: d }) => {
      const c = this.temperatureOpacity(d), p = this.atmosphereTemperatureColor(d), u = this.temperatureBand(d), g = document.createElementNS(z, "polygon");
      g.setAttribute("points", this.polygonPoints(l)), g.setAttribute("class", `room-temperature-atmosphere temperature-${u}`), g.setAttribute("data-temperature-band", u), g.setAttribute("fill", p), g.setAttribute("fill-opacity", String(c)), g.setAttribute("stroke", p), g.setAttribute("stroke-opacity", String(Math.min(0.18, 0.045 + c * 0.9))), g.setAttribute("stroke-width", "2"), g.setAttribute("stroke-linejoin", "round"), g.setAttribute("vector-effect", "non-scaling-stroke");
      const b = document.createElementNS(z, "title"), m = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(d);
      b.textContent = `${l.name ?? l.id} · temperaturatmosfære · ${m} °C`, g.appendChild(b), i.appendChild(g);
    });
    const r = e.querySelector(":scope > g.presence-room-activity-scene"), o = e.querySelector(":scope > g.room-reactions-scene"), n = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, r ?? o ?? n ?? s ?? a ?? null);
  }
  appendFireplaceAtmosphere(e, t, i, r, o) {
    const n = Xe(t, i.reaction), s = Math.max(0.2, Math.min(1, i.intensity || 1)), a = i.reaction.radius, l = Number.isFinite(a) ? Math.max(42, Math.min(180, a * x)) : 82, d = document.createElementNS(z, "g");
    d.setAttribute("class", "fireplace-atmosphere"), d.setAttribute("transform", `translate(${n.x * x} ${n.y * x})`), d.setAttribute("data-room-id", t.id);
    const c = document.createElementNS(z, "circle");
    c.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-outer"), c.setAttribute("r", String(l * 1.18)), c.setAttribute("fill", "var(--explorer-fireplace-atmosphere, #c97935)"), c.setAttribute("fill-opacity", String(0.045 + s * 0.055)), d.appendChild(c);
    const p = document.createElementNS(z, "circle");
    p.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-middle"), p.setAttribute("r", String(l * 0.72)), p.setAttribute("fill", "var(--explorer-fireplace-atmosphere-hot, #e6a34b)"), p.setAttribute("fill-opacity", String(0.065 + s * 0.085)), d.appendChild(p);
    const u = document.createElementNS(z, "ellipse");
    if (u.setAttribute("class", "fireplace-atmosphere-core"), u.setAttribute("cx", "0"), u.setAttribute("cy", String(-l * 0.05)), u.setAttribute("rx", String(l * 0.39)), u.setAttribute("ry", String(l * 0.31)), u.setAttribute("fill", "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), u.setAttribute("fill-opacity", String(0.07 + s * 0.09)), d.appendChild(u), !r) {
      const m = document.createElementNS(z, "animate");
      m.setAttribute("attributeName", "fill-opacity"), m.setAttribute("values", `${0.04 + s * 0.045};${0.065 + s * 0.07};${0.048 + s * 0.052};${0.04 + s * 0.045}`), m.setAttribute("dur", `${3.2 + o % 3 * 0.35}s`), m.setAttribute("repeatCount", "indefinite"), c.appendChild(m);
      const y = document.createElementNS(z, "animate");
      y.setAttribute("attributeName", "fill-opacity"), y.setAttribute("values", `${0.075 + s * 0.07};${0.13 + s * 0.11};${0.09 + s * 0.08};${0.145 + s * 0.105};${0.075 + s * 0.07}`), y.setAttribute("dur", `${1.65 + o % 2 * 0.22}s`), y.setAttribute("repeatCount", "indefinite"), p.appendChild(y);
    }
    [
      [-18, -10, 2.4],
      [12, -18, 2],
      [-5, -28, 1.7],
      [22, -6, 1.5],
      [-26, -22, 1.4],
      [5, -38, 1.25]
    ].forEach(([m, y, S], k) => {
      const w = document.createElementNS(z, "circle");
      if (w.setAttribute("class", "fireplace-ember"), w.setAttribute("cx", String(m)), w.setAttribute("cy", String(y)), w.setAttribute("r", String(S)), w.setAttribute("fill", k % 2 === 0 ? "var(--explorer-fireplace-ember, #d96532)" : "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), w.setAttribute("opacity", r ? String(0.28 + s * 0.22) : "0"), d.appendChild(w), !r) {
        const E = document.createElementNS(z, "animate");
        E.setAttribute("attributeName", "cy"), E.setAttribute("values", `${y};${y - 22 - k * 2};${y - 38 - k * 3}`), E.setAttribute("dur", `${2.4 + k % 3 * 0.42}s`), E.setAttribute("begin", `${(k * 0.37 + o * 0.11).toFixed(2)}s`), E.setAttribute("repeatCount", "indefinite"), w.appendChild(E);
        const $ = document.createElementNS(z, "animate");
        $.setAttribute("attributeName", "opacity"), $.setAttribute("values", `0;${0.32 + s * 0.45};${0.16 + s * 0.22};0`), $.setAttribute("keyTimes", "0;0.18;0.68;1"), $.setAttribute("dur", `${2.4 + k % 3 * 0.42}s`), $.setAttribute("begin", `${(k * 0.37 + o * 0.11).toFixed(2)}s`), $.setAttribute("repeatCount", "indefinite"), w.appendChild($);
      }
    });
    const b = document.createElementNS(z, "title");
    b.textContent = `${t.name ?? t.id} · levende pejsatmosfære`, d.appendChild(b), e.appendChild(d);
  }
  syncFireplaceAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.fireplace-atmosphere-scene")?.remove();
    const t = this.rooms.flatMap(
      (l) => Ct(l, (d) => this.atmosphereEntityState(d)).filter((d) => d.reaction.kind === "fireplace" && d.active).map((d) => ({ room: l, status: d }))
    );
    if (!t.length) return;
    const i = document.createElementNS(z, "g");
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
    const e = document.createElementNS(z, "mask");
    e.setAttribute("id", this.overcastMaskId), e.setAttribute("maskUnits", "userSpaceOnUse"), e.setAttribute("x", "0"), e.setAttribute("y", "0"), e.setAttribute("width", String(x)), e.setAttribute("height", String(x));
    const t = document.createElementNS(z, "rect");
    return t.setAttribute("x", "0"), t.setAttribute("y", "0"), t.setAttribute("width", String(x)), t.setAttribute("height", String(x)), t.setAttribute("fill", "white"), e.appendChild(t), this.rooms.forEach((i) => {
      if (i.points.length < 3) return;
      const r = document.createElementNS(z, "polygon");
      r.setAttribute("points", this.polygonPoints(i)), r.setAttribute("fill", "black"), r.setAttribute("stroke", "black"), r.setAttribute("stroke-width", "16"), r.setAttribute("stroke-linejoin", "round"), e.appendChild(r);
    }), e;
  }
  createOvercastFilter() {
    const e = document.createElementNS(z, "filter");
    e.setAttribute("id", this.overcastFilterId), e.setAttribute("x", "-55%"), e.setAttribute("y", "-65%"), e.setAttribute("width", "210%"), e.setAttribute("height", "240%");
    const t = document.createElementNS(z, "feGaussianBlur");
    t.setAttribute("in", "SourceGraphic"), t.setAttribute("stdDeviation", "3.1"), t.setAttribute("result", "soft"), e.appendChild(t);
    const i = document.createElementNS(z, "feTurbulence");
    i.setAttribute("type", "fractalNoise"), i.setAttribute("baseFrequency", "0.016 0.029"), i.setAttribute("numOctaves", "3"), i.setAttribute("seed", "43"), i.setAttribute("result", "noise"), e.appendChild(i);
    const r = document.createElementNS(z, "feDisplacementMap");
    return r.setAttribute("in", "soft"), r.setAttribute("in2", "noise"), r.setAttribute("scale", "16"), r.setAttribute("xChannelSelector", "R"), r.setAttribute("yChannelSelector", "G"), e.appendChild(r), e;
  }
  appendOvercastCloud(e, t, i, r, o, n) {
    const s = document.createElementNS(z, "g");
    s.setAttribute("class", "overcast-cloud-position"), s.setAttribute("transform", `translate(${t} ${i}) scale(${r})`), s.setAttribute("opacity", String(n));
    const a = document.createElementNS(z, "g");
    a.setAttribute("class", `overcast-cloud overcast-cloud-${o % 3} overcast-depth-${o % 3}`);
    const l = document.createElementNS(z, "ellipse");
    l.setAttribute("class", "overcast-cloud-mist"), l.setAttribute("cx", o % 2 === 0 ? "-12" : "14"), l.setAttribute("cy", "18"), l.setAttribute("rx", "145"), l.setAttribute("ry", "43"), a.appendChild(l);
    const d = document.createElementNS(z, "g");
    d.setAttribute("class", "overcast-cloud-body"), d.setAttribute("filter", `url(#${this.overcastFilterId})`), d.setAttribute("transform", o % 2 === 0 ? "scale(1.12 .74) skewX(-4)" : "scale(.98 .88) skewX(5)");
    const c = document.createElementNS(z, "path");
    c.setAttribute("class", "overcast-cloud-base"), c.setAttribute("d", "M-150 31 C-133 1 -108 -17 -80 -18 C-66 -47 -41 -62 -13 -57 C5 -78 34 -82 58 -62 C84 -62 107 -48 120 -27 C146 -18 158 5 145 29 C128 53 99 63 66 61 C34 75 -4 74 -37 68 C-76 75 -116 64 -140 48 C-151 41 -155 35 -150 31 Z"), d.appendChild(c), [
      [-86, -6, 50, 30],
      [-47, -37, 57, 34],
      [-3, -51, 65, 38],
      [43, -43, 58, 35],
      [82, -17, 50, 30],
      [14, 23, 92, 27]
    ].forEach(([g, b, m, y], S) => {
      const k = document.createElementNS(z, "ellipse");
      k.setAttribute("class", "overcast-cloud-puff"), k.setAttribute("cx", String(g)), k.setAttribute("cy", String(b)), k.setAttribute("rx", String(m)), k.setAttribute("ry", String(y)), k.setAttribute("opacity", String(0.34 + S % 3 * 0.08)), d.appendChild(k);
    }), a.appendChild(d);
    const u = document.createElementNS(z, "path");
    u.setAttribute("class", "overcast-cloud-strand"), u.setAttribute("d", "M-184 70 C-130 58 -80 63 -32 68 C18 73 70 65 135 48 C89 79 27 88 -33 82 C-88 78 -139 89 -184 70 Z"), a.appendChild(u), s.appendChild(a), e.appendChild(s);
  }
  syncOvercastCloudDensity() {
    const e = this.renderRoot.querySelector("svg.floorplan"), t = this.renderRoot.querySelector("g.scene");
    if (!e || !t) return;
    e.querySelector(`defs[data-overcast-mask="${this.overcastMaskId}"]`)?.remove(), t.querySelector(":scope > g.overcast-cloud-density-scene")?.remove();
    const i = this.descendantWeather();
    if (i.effect !== "cloudy") return;
    const r = document.createElementNS(z, "defs");
    r.setAttribute("data-overcast-mask", this.overcastMaskId), r.appendChild(this.createOvercastMask()), r.appendChild(this.createOvercastFilter()), e.insertBefore(r, e.firstChild);
    const o = document.createElementNS(z, "g");
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
nt.styles = j`
    ${$t.styles}

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
nt = Vo([
  T("explorer-presence-activity-canvas")
], nt);
var Ko = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, ht = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Go(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Ko(t, i, o), o;
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
be.styles = j`${nt.styles}:host([map-theme="enchanted_antique"]){--primary-color:#68472f;--primary-text-color:#4c321f;--secondary-text-color:#6f5239;--success-color:#6f6d3c;--error-color:#8b4639;--warning-color:#9a6731;--accent-color:#74513b;--card-background-color:#d9c294;--explorer-room-light-color:#e3a33d;--explorer-room-motion-color:#75573a;--explorer-room-media-color:#71503e;--explorer-room-opening-color:#936031;--explorer-room-panel-background:rgba(218,192,143,.96);--explorer-room-panel-text:#4b311f;--explorer-room-panel-border:rgba(82,50,30,.34);--explorer-room-panel-control:rgba(91,57,34,.12);--explorer-room-panel-row:rgba(255,239,199,.22)}:host([map-theme="enchanted_antique"]) .viewport{background:radial-gradient(circle at 22% 18%,rgba(255,240,195,.42),transparent 28%),radial-gradient(circle at 78% 76%,rgba(91,55,29,.16),transparent 42%),#c4a26e;box-shadow:inset 0 0 34px rgba(64,40,25,.22),inset 0 0 110px rgba(82,50,26,.12)}:host([map-theme="enchanted_antique"]) .viewport::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:2;background:radial-gradient(circle at 18% 24%,rgba(255,226,151,.13),transparent 22%),radial-gradient(circle at 76% 68%,rgba(255,210,112,.08),transparent 28%);mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .viewport::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:3;box-shadow:inset 0 0 44px rgba(60,38,24,.21)}:host([map-theme="enchanted_antique"]) .backdrop{fill:#caa970}:host([map-theme="enchanted_antique"]) .floorplan-source{filter:sepia(.92) saturate(.58) contrast(1.13) brightness(.92) drop-shadow(0 2px 1px rgba(58,35,20,.18)) drop-shadow(2px 3px 3px rgba(56,34,20,.10));opacity:.89;mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .rooms-scene{filter:drop-shadow(2px 3px 2px rgba(58,36,22,.16))}:host([map-theme="enchanted_antique"]) .room polygon{fill:#795132!important;fill-opacity:.085!important;stroke:#4f321f!important;stroke-opacity:.88!important;stroke-width:2.8px!important;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(2px 3px 1.5px rgba(67,41,24,.13));transition:fill-opacity .24s ease,stroke-width .24s ease,filter .24s ease}:host([map-theme="enchanted_antique"]) .room:hover polygon{fill-opacity:.14!important;filter:drop-shadow(0 1px .5px rgba(69,42,24,.34)) drop-shadow(3px 4px 2px rgba(67,41,24,.17))}:host([map-theme="enchanted_antique"]) .room.selected polygon{fill-opacity:.19!important;stroke-width:4px!important;filter:drop-shadow(0 1px .6px rgba(69,42,24,.38)) drop-shadow(4px 5px 3px rgba(67,41,24,.18))}:host([map-theme="enchanted_antique"]) .room-label,:host([map-theme="enchanted_antique"]) .presence-label,:host([map-theme="enchanted_antique"]) .route-status-scene text{fill:#4e321e!important;stroke:rgba(222,199,151,.82)!important;stroke-width:3.5px!important;font-family:Georgia,Cambria,"Times New Roman",serif!important;letter-spacing:.045em}:host([map-theme="enchanted_antique"]) .room-label{font-style:italic;font-weight:700;filter:drop-shadow(1px 1px .35px rgba(73,44,25,.18))}:host([map-theme="enchanted_antique"]) .presence-label{font-weight:700;font-variant:small-caps}:host([map-theme="enchanted_antique"]) .presence-border{stroke:#ead8aa!important;filter:drop-shadow(0 2px 3px rgba(54,34,21,.35))}:host([map-theme="enchanted_antique"]) .presence-avatar-background,:host([map-theme="enchanted_antique"]) .presence-marker{fill:#76543a!important}:host([map-theme="enchanted_antique"]) .footsteps-scene ellipse{fill:#4b301d!important;filter:drop-shadow(0 0 1.3px rgba(66,38,20,.38))}:host([map-theme="enchanted_antique"]) .route-status-scene line{filter:drop-shadow(0 .6px .6px rgba(65,39,23,.28))}:host([map-theme="enchanted_antique"]) .room-reactions-scene polygon{mix-blend-mode:multiply}:host([map-theme="enchanted_antique"]) .room-reactions-scene [data-reaction-kind="light"],:host([map-theme="enchanted_antique"]) .room-reactions-scene .light{filter:drop-shadow(0 0 5px rgba(238,177,63,.72)) drop-shadow(0 0 14px rgba(238,158,42,.34));mix-blend-mode:screen}:host([map-theme="enchanted_antique"]) .antique-paper-scene,:host([map-theme="enchanted_antique"]) .antique-compass{pointer-events:none}@media(prefers-reduced-motion:reduce){:host([map-theme="enchanted_antique"]) .room polygon,:host([map-theme="enchanted_antique"]) .floorplan-source{transition:none!important}}`;
ht([
  C({ attribute: "map-theme", reflect: !0 })
], be.prototype, "theme", 2);
ht([
  C({ type: Number, attribute: "compass-rotation" })
], be.prototype, "compassRotation", 2);
ht([
  C({ type: Number, attribute: "compass-size" })
], be.prototype, "compassSize", 2);
ht([
  C({ type: Boolean, attribute: "compass-visible" })
], be.prototype, "compassVisible", 2);
be = ht([
  T("explorer-themed-canvas")
], be);
const Wo = ["on"], Uo = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function Yo(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : [...Wo];
}
function kr(e, t) {
  const i = e.visible !== !1, r = e.state_binding, o = Yo(r?.active_states);
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
  if (Uo.has(s))
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
function Qo(e, t) {
  return e.map((i) => kr(i, t));
}
var Jo = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, Ar = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Xo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Jo(t, i, o), o;
};
const he = "http://www.w3.org/2000/svg", en = {
  info: "var(--explorer-zone-info, #2d8f74)",
  warning: "var(--explorer-zone-warning, #f59e0b)",
  danger: "var(--explorer-zone-danger, #d64545)",
  cleaning: "var(--explorer-zone-cleaning, #3b82c4)",
  restricted: "var(--explorer-zone-restricted, #8b5a9e)"
}, tn = {
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
    return e.color?.trim() || en[e.kind ?? "info"];
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
    const l = this.zoneCenter(r), d = document.createElementNS(he, "g");
    d.setAttribute("transform", `translate(${l.x} ${l.y})`), d.setAttribute("class", "zone-marker");
    const c = document.createElementNS(he, "circle");
    c.setAttribute("class", "zone-marker-bg"), c.setAttribute("r", "17"), c.setAttribute("fill", "var(--card-background-color, #ffffff)"), c.setAttribute("fill-opacity", ".90"), c.setAttribute("stroke", n), c.setAttribute("stroke-width", "3"), c.setAttribute("vector-effect", "non-scaling-stroke"), d.appendChild(c);
    const p = document.createElementNS(he, "text");
    if (p.setAttribute("text-anchor", "middle"), p.setAttribute("dominant-baseline", "central"), p.setAttribute("fill", n), p.setAttribute("font-size", "18"), p.setAttribute("font-weight", "900"), p.setAttribute("font-family", "system-ui, sans-serif"), p.textContent = tn[o], d.appendChild(p), s.appendChild(d), r.name) {
      const u = document.createElementNS(he, "text");
      u.setAttribute("x", String(l.x)), u.setAttribute("y", String(l.y + 36)), u.setAttribute("text-anchor", "middle"), u.setAttribute("class", "zone-label"), u.setAttribute("fill", n), u.setAttribute("font-size", "22"), u.setAttribute("font-weight", "800"), u.setAttribute("font-family", "system-ui, sans-serif"), u.setAttribute("paint-order", "stroke"), u.setAttribute("stroke", "var(--card-background-color, #ffffff)"), u.setAttribute("stroke-width", "5"), u.setAttribute("stroke-linejoin", "round"), u.textContent = r.name, s.appendChild(u);
    }
    this.appendZoneTitle(s, t), e.appendChild(s);
  }
  syncZonesOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e || (e.querySelector(":scope > g.zones-scene")?.remove(), !this.zones.length)) return;
    const i = Qo(this.zones, (d) => this.hass?.states[d]?.state).filter((d) => d.active && d.zone.points.length >= 3);
    if (!i.length) return;
    const r = document.createElementNS(he, "g");
    r.setAttribute("class", "zones-scene"), r.setAttribute("aria-label", "Dynamiske zoner"), r.setAttribute("pointer-events", "none");
    const o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    i.forEach((d) => this.renderZone(r, d, o));
    const n = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.route-status-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, n ?? s ?? a ?? l ?? null);
  }
};
Ke.styles = j`
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
Ar([
  C({ attribute: !1 })
], Ke.prototype, "zones", 2);
Ke = Ar([
  T("explorer-zones-canvas")
], Ke);
var rn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, fi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? on(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && rn(t, i, o), o;
};
const nn = "http://www.w3.org/2000/svg", sn = 4200, an = 900, ln = 54, dn = { person: "Person", pet: "Kæledyr", robot: "Robot", vehicle: "Køretøj", object: "Objekt" }, Ki = { person: [202, 344, 42, 158, 274, 18], pet: [28, 112, 326, 52, 178, 286], robot: [188, 218, 264, 164, 204, 238], vehicle: [12, 210, 38, 330, 186, 262], object: [272, 44, 154, 320, 196, 22] }, Ht = [58, 64, 54, 61, 56, 66], cn = [8, 6, 10, 7, 9, 5], pn = [7, 4, 10, 6, 8, 3];
function Gi(e) {
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function gt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let Re = class extends Ke {
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
    const i = e.type ?? "person", r = Ki[i][Gi(e.id) % Ki[i].length];
    return this.theme === "enchanted_antique" ? `hsl(${r} 34% 38%)` : `hsl(${r} 62% 47%)`;
  }
  polishTrailColor(e) {
    return e.trail_color?.trim() || this.polishPresenceColor(e);
  }
  polishTrailDuration(e) {
    const t = e.trail_duration;
    return Number.isFinite(t) ? Math.round(gt(t, 1, 60) * 1e3) : sn;
  }
  polishBasePosition(e) {
    return { x: (e.x ?? 0.5) * x, y: (e.y ?? 0.5) * x };
  }
  polishPersonTrailVariant(e) {
    return Gi(e.id) % Ht.length;
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
          const b = this.polishBasePosition(g);
          Math.hypot(p.x - b.x, p.y - b.y) <= ln && (i.delete(u), s.push(g), a.push(g));
        }
      }
      if (s.length < 2) continue;
      const l = [...s].sort((c, p) => c.id.localeCompare(p.id)), d = Math.min(52, 24 + l.length * 4);
      l.forEach((c, p) => {
        const u = this.polishBasePosition(c), g = l.length === 2 ? p === 0 ? Math.PI : 0 : -Math.PI / 2 + Math.PI * 2 * p / l.length, b = gt(u.x + Math.cos(g) * d, 38, x - 38), m = gt(u.y + Math.sin(g) * d, 38, x - 64);
        t.set(c.id, { x: b - u.x, y: m - u.y, groupSize: l.length });
      });
    }
    return t;
  }
  polishCreateSvg(e) {
    return document.createElementNS(nn, e);
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
      c.textContent = `${r.name ?? r.id} · ${dn[s]}${u}${p}`, n.appendChild(c);
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
    }), l = a.reduce((p, u) => p + u.length, 0), d = this.polishTrailSpacing(r, o);
    if (l < d) return;
    const c = Math.min(24, Math.max(3, Math.floor(l / d)));
    for (let p = 0; p < c; p += 1) {
      const u = (p + 1) / (c + 1), g = l * u;
      let b = 0, m = a[a.length - 1];
      for (const G of a) {
        if (b + G.length >= g) {
          m = G;
          break;
        }
        b += G.length;
      }
      const y = m.length > 0 ? (g - b) / m.length : 0, S = m.end.x - m.start.x, k = m.end.y - m.start.y, w = p % 2 === 0 ? -1 : 1, E = r === "person" ? cn[o] ?? 8 : r === "pet" ? 6 : 0, $ = r === "person" ? pn[o] ?? 7 : E ? 7 : 0, A = m.length > 0 ? -k / m.length : 0, P = m.length > 0 ? S / m.length : 0, N = m.start.x + S * y + A * E * w, O = m.start.y + k * y + P * E * w, Q = Math.atan2(k, S) * 180 / Math.PI + 90, U = Math.round(u * an), R = this.polishCreateSvg("g");
      R.setAttribute("class", `trail-mark trail-${r}${r === "person" ? ` trail-person-v${o + 1}` : ""}`), R.setAttribute("data-presence-id", t.id), r === "person" && R.setAttribute("data-trail-style", String(o + 1)), R.setAttribute("transform", `translate(${N} ${O}) rotate(${Q + (E ? w * $ : 0)})`), R.setAttribute("opacity", "0"), this.polishAppendTrailShape(R, r, n, o);
      const I = this.polishCreateSvg("animate");
      this.polishSetAttributes(I, { attributeName: "opacity", values: "0;0.78;0.54;0", keyTimes: "0;0.08;0.58;1", begin: "indefinite", dur: `${s}ms`, fill: "freeze" }), R.appendChild(I), i.appendChild(R), window.setTimeout(() => {
        R.isConnected && I.beginElement();
      }, U), window.setTimeout(() => R.remove(), U + s + 120);
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
      const a = e - this.polishHistoryDurationMs(s), l = n.filter((d) => d.at >= a);
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
      const d = n.get(a);
      if (!d) continue;
      const c = d.type ?? "person", p = this.polishHistoryDurationMs(d), u = this.polishTrailColor(d), g = c === "person" ? this.polishPersonTrailVariant(d) : 0;
      if (c === "person" && this.movementHistory.show_rooms !== !1) {
        const b = /* @__PURE__ */ new Map();
        for (const m of l) m.roomId && b.set(m.roomId, m);
        for (const [m, y] of b) {
          const S = this.rooms.find((E) => E.id === m || E.area_id === m);
          if (!S || S.points.length < 3) continue;
          const k = Math.max(0, 0.16 * (1 - (t - y.at) / p)), w = this.polishCreateSvg("polygon");
          this.polishSetAttributes(w, { points: S.points.map(([E, $]) => `${E * x},${$ * x}`).join(" "), fill: u, "fill-opacity": String(k), stroke: u, "stroke-opacity": String(k * 0.9), "stroke-width": "2", "vector-effect": "non-scaling-stroke", "data-presence-id": a }), r.appendChild(w);
        }
      }
      for (let b = 1; b < l.length; b += 1) {
        const m = l[b - 1], y = l[b], S = this.polishMovementPath(m, y, m.roomId, y.roomId), k = Math.max(0, 0.72 * (1 - (t - y.at) / p));
        for (let w = 1; w < S.length; w += 1) {
          const E = S[w - 1], $ = S[w], A = $.x - E.x, P = $.y - E.y, N = Math.hypot(A, P), O = Math.atan2(P, A) * 180 / Math.PI;
          if (c === "robot") {
            if (this.petRobotTrails.show_robot_route === !1) continue;
            const I = this.polishCreateSvg("line");
            if (this.polishSetAttributes(I, { x1: String(E.x), y1: String(E.y), x2: String($.x), y2: String($.y), stroke: u, "stroke-width": "7", "stroke-linecap": "round", "stroke-opacity": String(k), "vector-effect": "non-scaling-stroke", "data-presence-id": a }), I.setAttribute("class", "robot-history-route"), o.appendChild(I), this.petRobotTrails.robot_direction_arrows !== !1 && N > 45) {
              const G = this.polishCreateSvg("path"), ve = (E.x + $.x) / 2, Oe = (E.y + $.y) / 2;
              this.polishSetAttributes(G, { d: "M -10 -7 L 10 0 L -10 7 Z", fill: u, "fill-opacity": String(Math.min(1, k + 0.12)), transform: `translate(${ve} ${Oe}) rotate(${O})`, "data-presence-id": a }), G.setAttribute("class", "robot-history-arrow"), o.appendChild(G);
            }
            continue;
          }
          if (c === "pet" && this.petRobotTrails.show_pet_paws === !1) continue;
          const Q = c === "pet" ? 52 : 70, U = Math.min(12, Math.max(1, Math.floor(N / Q))), R = O + 90;
          for (let I = 1; I <= U; I += 1) {
            const G = I / (U + 1), ve = I % 2 === 0 ? -1 : 1, Oe = N > 0 ? -P / N : 0, Ce = N > 0 ? A / N : 0, Ye = c === "pet" ? 7 : 6, Y = this.polishCreateSvg("g");
            Y.setAttribute("class", `movement-history-mark trail-${c}${c === "person" ? ` trail-person-v${g + 1}` : ""}`), Y.setAttribute("data-presence-id", a), Y.setAttribute("transform", `translate(${E.x + A * G + Oe * Ye * ve} ${E.y + P * G + Ce * Ye * ve}) rotate(${R + ve * 4}) scale(${c === "pet" ? 0.72 : 0.62})`), Y.setAttribute("opacity", String(k)), this.polishAppendTrailShape(Y, c, u, g), o.appendChild(Y);
          }
        }
      }
    }
    const s = i.querySelector(":scope > g.presence-trails-scene") ?? i.querySelector(":scope > g.presences-scene");
    i.insertBefore(r, s ?? null), i.insertBefore(o, s ?? null);
  }
};
Re.styles = j`${Ke.styles}.footsteps-scene{display:none}.presence-visual-offset{transition:transform 220ms ease}.presence-type-badge{filter:drop-shadow(0 1px 2px rgba(0,0,0,.22))}.presence-trails-scene .trail-mark,.movement-history-scene .movement-history-mark{filter:drop-shadow(0 0 1.2px rgba(0,0,0,.20))}.movement-history-scene .trail-pet{filter:drop-shadow(0 0 2px rgba(0,0,0,.24))}.movement-history-scene .robot-history-route{fill:none;filter:drop-shadow(0 0 2px rgba(0,0,0,.24))}.movement-history-scene .robot-history-arrow{filter:drop-shadow(0 1px 1px rgba(0,0,0,.28))}.movement-history-rooms-scene polygon{mix-blend-mode:multiply}.presence-trails-scene .trail-person-v2{opacity:.96}.presence-trails-scene .trail-person-v3{filter:drop-shadow(0 0 1.6px rgba(0,0,0,.24))}.presence-trails-scene .trail-person-v5{filter:drop-shadow(0 0 .8px rgba(0,0,0,.18))}:host([map-theme="enchanted_antique"]) .presence-type-badge{filter:sepia(.35) drop-shadow(0 1px 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-trails-scene .trail-mark,:host([map-theme="enchanted_antique"]) .movement-history-scene .movement-history-mark,:host([map-theme="enchanted_antique"]) .movement-history-scene .robot-history-route,:host([map-theme="enchanted_antique"]) .movement-history-scene .robot-history-arrow{mix-blend-mode:multiply;filter:sepia(.28) saturate(.78) drop-shadow(0 0 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-border{stroke-width:4.5px!important}@media(prefers-reduced-motion:reduce){.presence-visual-offset{transition:none}}`;
fi([
  C({ attribute: !1 })
], Re.prototype, "movementHistory", 2);
fi([
  C({ attribute: !1 })
], Re.prototype, "petRobotTrails", 2);
Re = fi([
  T("explorer-presence-polish-canvas")
], Re);
var hn = Object.getOwnPropertyDescriptor, un = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? hn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const mt = "http://www.w3.org/2000/svg", Zi = 3e4, gn = 900;
let st = class extends Re {
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
      const o = t.get(r.id) ?? 0, n = o > 0, s = this.magicAfterglowStartedAt.get(r.id), a = s === void 0 ? 1 / 0 : e - s, l = !n && a >= 0 && a < Zi, d = n ? Math.min(1, 0.72 + Math.max(0, o - 1) * 0.12) : l ? Math.max(0, 1 - a / Zi) : 0;
      return !l && s !== void 0 && this.magicAfterglowStartedAt.delete(r.id), { room: r, active: n, afterglow: l, intensity: d };
    }).filter((r) => r.active || r.afterglow);
  }
  magicPolygonPoints(e) {
    return e.points.map(([t, i]) => `${t * x},${i * x}`).join(" ");
  }
  magicScheduleRefresh(e) {
    this.magicRefreshTimer !== void 0 && window.clearTimeout(this.magicRefreshTimer), e.some((t) => t.afterglow) && (this.magicRefreshTimer = window.setTimeout(() => {
      this.magicRefreshTimer = void 0, this.magicSyncRoomAtmosphere();
    }, gn));
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
    i.setAttribute("class", "room-magic-scene"), i.setAttribute("aria-label", "Magisk rumaktivitet"), i.setAttribute("pointer-events", "none"), t.forEach((d) => this.magicAppendRoom(i, d));
    const r = e.querySelector(":scope > g.room-temperature-atmosphere-scene"), o = e.querySelector(":scope > g.presence-room-activity-scene"), n = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.presence-trails-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(
      i,
      r ?? o ?? n ?? s ?? a ?? l ?? null
    );
  }
};
st.styles = j`
    ${Re.styles}

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
st = un([
  T("explorer-room-magic-canvas")
], st);
var mn = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, Sr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? fn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && mn(t, i, o), o;
};
const J = "http://www.w3.org/2000/svg", bn = ["on", "open", "opened", "true"], _t = 600 * 1e3, Vt = 1800 * 1e3, Kt = 3600 * 1e3, Wi = 60 * 1e3, ft = (e) => e * Math.PI / 180;
let Ge = class extends st {
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
    return i ? (t.open_states ?? bn).map((r) => r.toLowerCase()).includes(i) : !1;
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
    const o = Math.max(0, i - r), n = Math.floor(o / 6e4), s = o >= Kt ? "alert" : o >= Vt ? "warning" : o >= _t ? "watch" : "fresh", a = Math.floor(n / 60), l = n % 60, d = a > 0 ? `åben i ${a} t${l ? ` ${l} min` : ""}` : `åben i ${n} min`, c = s === "fresh" ? "" : a > 0 ? l ? `${a}t ${l}m` : `${a}t` : `${n}m`;
    return { minutes: n, level: s, label: c, description: d };
  }
  scheduleOpeningAgeRefresh(e) {
    this.openingAgeTimer !== void 0 && window.clearTimeout(this.openingAgeTimer);
    let t = 1 / 0;
    for (const i of this.openings.filter((r) => r.visible !== !1)) {
      const r = this.isOpen(i), o = this.openingOpenSince(i, r);
      if (o === void 0) continue;
      const n = Math.max(0, e - o), s = n < _t ? _t : n < Vt ? Vt : n < Kt ? Kt : void 0, a = s === void 0 ? Wi : Math.max(1e3, s - n + 50);
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
    const i = document.createElementNS(J, "g");
    i.setAttribute("class", "dynamic-openings-scene"), i.setAttribute("aria-label", "Dynamiske døre og vinduer"), i.setAttribute("pointer-events", "none");
    const r = Date.now();
    for (const n of t)
      n.kind === "window" ? this.drawWindow(i, n, r) : this.drawDoor(i, n, r);
    const o = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, o ?? null), this.scheduleOpeningAgeRefresh(r);
  }
  line(e, t, i, r, o, n) {
    const s = document.createElementNS(J, "line");
    return s.setAttribute("x1", String(t)), s.setAttribute("y1", String(i)), s.setAttribute("x2", String(r)), s.setAttribute("y2", String(o)), s.setAttribute("class", n), e.appendChild(s), s;
  }
  appendAgeIndicator(e, t, i, r) {
    if (!r || r.level === "fresh") return;
    const o = document.createElementNS(J, "g");
    o.setAttribute("class", `opening-age-indicator level-${r.level}`), o.setAttribute("transform", `translate(${t} ${i})`);
    const n = document.createElementNS(J, "circle");
    n.setAttribute("r", r.level === "alert" ? "12" : "10"), n.setAttribute("class", "opening-age-ring"), o.appendChild(n);
    const s = Math.max(28, r.label.length * 7 + 10), a = document.createElementNS(J, "rect");
    a.setAttribute("x", "11"), a.setAttribute("y", "-18"), a.setAttribute("width", String(s)), a.setAttribute("height", "17"), a.setAttribute("rx", "8.5"), a.setAttribute("class", "opening-age-badge"), o.appendChild(a);
    const l = document.createElementNS(J, "text");
    l.setAttribute("x", String(11 + s / 2)), l.setAttribute("y", "-9.3"), l.setAttribute("text-anchor", "middle"), l.setAttribute("dominant-baseline", "central"), l.setAttribute("class", "opening-age-label"), l.textContent = r.label, o.appendChild(l), e.appendChild(o);
  }
  drawDoor(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(28, (t.length ?? 0.055) * x), s = t.angle ?? 0, a = t.open_angle ?? 82, l = t.hinge ?? "start", d = t.swing ?? "left", c = t.point[0] * x, p = t.point[1] * x, u = n / 2, g = ft(s), b = Math.cos(g), m = Math.sin(g), y = -m, S = b, k = { x: c - b * u, y: p - m * u }, w = { x: c + b * u, y: p + m * u }, E = l === "start" ? k : w, $ = l === "start" ? w : k, A = s + (l === "start" ? 0 : 180), P = (d === "left" ? -1 : 1) * (l === "start" ? 1 : -1), N = A + (r ? P * a : 0), O = ft(N), Q = { x: E.x + Math.cos(O) * n, y: E.y + Math.sin(O) * n }, U = o ? ` open-age-${o.level}` : "", R = document.createElementNS(J, "g");
    R.setAttribute("class", `dynamic-opening door ${r ? "is-open" : "is-closed"}${U}`), R.setAttribute("data-opening-id", t.id), o && R.setAttribute("data-open-minutes", String(o.minutes)), this.line(R, k.x, k.y, w.x, w.y, "opening-gap");
    const I = Math.max(7, Math.min(12, n * 0.12));
    for (const Y of [k, w]) this.line(R, Y.x - y * I / 2, Y.y - S * I / 2, Y.x + y * I / 2, Y.y + S * I / 2, "door-jamb");
    r && this.line(R, E.x, E.y, $.x, $.y, "door-closed-guide"), this.line(R, E.x, E.y, Q.x, Q.y, "door-leaf");
    const G = document.createElementNS(J, "circle");
    if (G.setAttribute("cx", String(E.x)), G.setAttribute("cy", String(E.y)), G.setAttribute("r", "4.2"), G.setAttribute("class", "opening-hinge"), R.appendChild(G), r) {
      const Y = document.createElementNS(J, "path"), wi = ft(A), ki = O, Tr = E.x + Math.cos(wi) * n, Or = E.y + Math.sin(wi) * n, jr = E.x + Math.cos(ki) * n, Ir = E.y + Math.sin(ki) * n, Dr = P > 0 ? 1 : 0, qr = Math.abs(a) > 180 ? 1 : 0;
      Y.setAttribute("d", `M ${Tr} ${Or} A ${n} ${n} 0 ${qr} ${Dr} ${jr} ${Ir}`), Y.setAttribute("class", "door-swing"), R.appendChild(Y);
    }
    const ve = c + y * 14, Oe = p + S * 14, Ce = document.createElementNS(J, "circle");
    Ce.setAttribute("cx", String(ve)), Ce.setAttribute("cy", String(Oe)), Ce.setAttribute("r", "5.2"), Ce.setAttribute("class", "opening-status-dot"), R.appendChild(Ce), this.appendAgeIndicator(R, ve, Oe, o);
    const Ye = document.createElementNS(J, "title");
    Ye.textContent = `${t.name ?? t.id} · ${r ? "åben" : "lukket"}${o ? ` · ${o.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, R.appendChild(Ye), e.appendChild(R);
  }
  drawWindow(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(26, (t.length ?? 0.05) * x), s = t.angle ?? 0, a = t.point[0] * x, l = t.point[1] * x, d = ft(s), c = Math.cos(d), p = Math.sin(d), u = -p, g = c, b = n / 2, m = 5.5, y = { x: a - c * b, y: l - p * b }, S = { x: a + c * b, y: l + p * b }, k = o ? ` open-age-${o.level}` : "", w = document.createElementNS(J, "g");
    w.setAttribute("class", `dynamic-opening window ${r ? "is-open" : "is-closed"}${k}`), w.setAttribute("data-opening-id", t.id), o && w.setAttribute("data-open-minutes", String(o.minutes)), this.line(w, y.x, y.y, S.x, S.y, "window-gap"), this.line(w, y.x + u * m, y.y + g * m, S.x + u * m, S.y + g * m, "window-pane"), this.line(w, y.x - u * m, y.y - g * m, S.x - u * m, S.y - g * m, "window-pane"), this.line(w, y.x + u * m, y.y + g * m, y.x - u * m, y.y - g * m, "window-frame-end"), this.line(w, S.x + u * m, S.y + g * m, S.x - u * m, S.y - g * m, "window-frame-end"), r && (this.line(w, y.x + u * m, y.y + g * m, a + c * b * 0.12 + u * 18, l + p * b * 0.12 + g * 18, "window-open-sash"), this.line(w, a + c * b * 0.12 + u * 18, l + p * b * 0.12 + g * 18, S.x + u * m, S.y + g * m, "window-open-sash"));
    const E = a + u * 17, $ = l + g * 17, A = document.createElementNS(J, "circle");
    A.setAttribute("cx", String(E)), A.setAttribute("cy", String($)), A.setAttribute("r", "5.2"), A.setAttribute("class", "opening-status-dot"), w.appendChild(A), this.appendAgeIndicator(w, E, $, o);
    const P = document.createElementNS(J, "title");
    P.textContent = `${t.name ?? t.id} · vindue ${r ? "åbent" : "lukket"}${o ? ` · ${o.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, w.appendChild(P), e.appendChild(w);
  }
};
Ge.styles = j`${st.styles}
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
Sr([
  C({ attribute: !1 })
], Ge.prototype, "openings", 2);
Ge = Sr([
  T("explorer-openings-canvas")
], Ge);
var yn = Object.defineProperty, vn = Object.getOwnPropertyDescriptor, We = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? vn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && yn(t, i, o), o;
};
const xn = "http://www.w3.org/2000/svg";
let Se = class extends Ge {
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
    return document.createElementNS(xn, e);
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
    for (const [n, s, a, l, d] of t) {
      const c = l % 4, p = l % 3, u = this.svg("g");
      this.attrs(u, {
        class: "weather-cloud-position",
        transform: `translate(${n} ${s}) scale(${a * 0.64})`,
        opacity: String(d)
      });
      const g = this.svg("g");
      this.attrs(g, {
        class: `weather-cloud weather-cloud-${l % 3} weather-cloud-depth-${p} weather-cloud-form-${c}`
      });
      const b = this.svg("g");
      this.attrs(b, {
        class: "weather-cloud-mist weather-cloud-mist-back",
        transform: o[c]
      }), [
        [-72, 30, 102, 24, 0.52],
        [24, 24, 132, 27, 0.42],
        [112, 8, 78, 20, 0.32]
      ].forEach(([N, O, Q, U, R]) => {
        const I = this.svg("ellipse");
        this.attrs(I, {
          cx: String(N),
          cy: String(O),
          rx: String(Q),
          ry: String(U),
          opacity: String(R)
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
      const S = this.svg("path");
      this.attrs(S, {
        d: "M-145 28 C-132 -4 -106 -22 -76 -20 C-65 -48 -40 -67 -12 -64 C4 -87 38 -91 61 -67 C88 -66 111 -50 122 -29 C148 -18 158 4 147 25 C134 49 103 62 71 62 C42 76 5 76 -27 69 C-67 76 -111 64 -136 47 C-147 40 -151 34 -145 28 Z",
        class: "weather-cloud-base"
      }), y.appendChild(S);
      for (const [N, O, Q, U, R] of i) {
        const I = this.svg("ellipse");
        this.attrs(I, {
          cx: String(N),
          cy: String(O),
          rx: String(Q),
          ry: String(U),
          opacity: String(R),
          class: "weather-cloud-puff"
        }), y.appendChild(I);
      }
      const k = this.svg("path");
      this.attrs(k, {
        d: "M-104 -12 C-76 -34 -47 -40 -20 -30 C8 -19 33 -21 62 -39 C46 -13 22 1 -3 2 C-32 4 -57 -3 -79 3 C-92 4 -101 -2 -104 -12 Z",
        class: "weather-cloud-detail"
      }), y.appendChild(k);
      const w = this.svg("path");
      this.attrs(w, {
        d: "M-151 43 C-111 60 -75 56 -45 48 C-15 41 9 51 35 56 C66 61 100 53 132 39 C106 65 69 77 28 74 C-8 69 -48 70 -81 75 C-111 73 -140 61 -151 43 Z",
        class: "weather-cloud-wisp"
      }), y.appendChild(w), g.appendChild(y);
      const E = this.svg("g");
      this.attrs(E, {
        class: "weather-cloud-mist weather-cloud-mist-front",
        transform: c === 1 ? "translate(8 51) scale(1.28 .40)" : c === 2 ? "translate(-20 43) scale(.88 .62)" : c === 3 ? "translate(18 47) scale(1.16 .46)" : "translate(8 49) scale(.95 .55)"
      }), [
        [-78, 0, 88, 18, 0.38],
        [18, 2, 116, 20, 0.42],
        [108, -2, 64, 15, 0.3]
      ].forEach(([N, O, Q, U, R]) => {
        const I = this.svg("ellipse");
        this.attrs(I, {
          cx: String(N),
          cy: String(O),
          rx: String(Q),
          ry: String(U),
          opacity: String(R)
        }), E.appendChild(I);
      }), g.appendChild(E);
      const $ = this.svg("path");
      if (this.attrs($, {
        d: "M-182 73 C-126 59 -76 66 -31 69 C13 72 59 66 123 51 C80 82 24 89 -29 84 C-78 80 -126 91 -182 73 Z",
        class: "weather-cloud-strand"
      }), g.appendChild($), c === 1 || c === 3) {
        const N = this.svg("path");
        this.attrs(N, {
          d: c === 1 ? "M-205 89 C-151 74 -94 78 -40 82 C21 87 76 79 152 61 C97 91 31 99 -35 94 C-94 90 -151 101 -205 89 Z" : "M-176 2 C-124 -7 -82 -3 -41 8 C2 19 49 17 112 0 C67 24 16 30 -35 24 C-84 18 -127 24 -176 2 Z",
          class: "weather-cloud-fine-strand"
        }), g.appendChild(N);
      }
      const A = this.svg("path");
      this.attrs(A, {
        d: "M-57 -40 C-39 -61 -12 -71 11 -65 C31 -60 45 -50 52 -36 C30 -43 9 -40 -10 -33 C-29 -25 -46 -29 -57 -40 Z",
        class: "weather-cloud-highlight"
      }), g.appendChild(A);
      const P = this.svg("path");
      this.attrs(P, {
        d: "M-145 28 C-132 -4 -106 -22 -76 -20 C-65 -48 -40 -67 -12 -64 C4 -87 38 -91 61 -67 C88 -66 111 -50 122 -29 C148 -18 158 4 147 25 C134 49 103 62 71 62 C42 76 5 76 -27 69 C-67 76 -111 64 -136 47 C-147 40 -151 34 -145 28 Z",
        class: "weather-cloud-rim",
        transform: r[l % r.length]
      }), g.appendChild(P), u.appendChild(g), e.appendChild(u);
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
        const s = Math.abs(o * 37 + n * 19), a = n * r + o % 2 * (t ? 17 : 25) + s % 13, l = o * i, d = (t ? 15 : 10) + s % (t ? 12 : 8), c = (t ? 2.4 : 1.6) + s % 3 * 0.35, p = (t ? 5 : 3) + s % 4, u = this.svg("path");
        this.attrs(u, {
          d: `M ${a} ${l} C ${a - c * 0.7} ${l + d * 0.32}, ${a - p - c} ${l + d * 0.72}, ${a - p} ${l + d} C ${a - p + c} ${l + d * 0.72}, ${a + c * 0.45} ${l + d * 0.31}, ${a} ${l} Z`,
          class: `weather-rain-drop${t ? " is-heavy" : ""}`
        }), u.style.setProperty("--rain-duration", `${(t ? 0.48 : 0.9) + s % 7 * 0.06}s`), u.style.setProperty("--rain-delay", `${-(s % 17) * 0.11}s`), e.appendChild(u);
      }
  }
  appendSnow(e, t = !1) {
    const i = t ? 9 : 11, r = t ? 11 : 12;
    for (let o = 0; o < i; o += 1)
      for (let n = 0; n < r; n += 1) {
        const s = o * 31 + n * 17, a = 30 + n * (t ? 96 : 88) + o % 2 * 31 + s % 9, l = 20 + o * (t ? 119 : 99) + s % 13, d = (t ? 1.7 : 2.1) + s % 4 * 0.72, c = s % (t ? 7 : 5) === 0, p = c ? this.svg("path") : this.svg("circle"), u = `weather-snow-flake weather-snow-size-${s % 3}${c ? " weather-snow-crystal" : ""}${t ? " is-sleet" : ""}`;
        if (c) {
          const g = d * 0.78;
          this.attrs(p, {
            d: `M ${a} ${l - d * 1.8} L ${a} ${l + d * 1.8} M ${a - d * 1.8} ${l} L ${a + d * 1.8} ${l} M ${a - g} ${l - g} L ${a + g} ${l + g} M ${a + g} ${l - g} L ${a - g} ${l + g}`,
            class: u
          });
        } else
          this.attrs(p, { cx: String(a), cy: String(l), r: String(d), class: u });
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
      const o = r * 47 + r % 5 * 29, n = 22 + (o * 13 + r * r * 7) % 1035, s = 25 + (o * 19 + r * r * 11) % 1015, a = (t === "exceptional" ? 3.1 : 2.1) + o % 4 * 0.65, l = a * 0.24, d = this.svg("g");
      this.attrs(d, { transform: `translate(${n} ${s})`, class: "weather-magic-mote-position" });
      const c = this.svg("path");
      this.attrs(c, {
        d: `M 0 ${-a} L ${l} ${-l} L ${a} 0 L ${l} ${l} L 0 ${a} L ${-l} ${l} L ${-a} 0 L ${-l} ${-l} Z`,
        class: `weather-magic-mote weather-magic-mote-${t} weather-magic-mote-${r % 3}`
      }), c.style.setProperty("--mote-duration", `${4.6 + o % 8 * 0.73}s`), c.style.setProperty("--mote-delay", `${-(o % 17) * 0.47}s`), d.appendChild(c), e.appendChild(d);
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
Se.styles = j`
    ${Ge.styles}
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
  C({ type: Boolean, attribute: "hide-source-text" })
], Se.prototype, "hideSourceText", 2);
We([
  C({ attribute: "weather-effect" })
], Se.prototype, "weatherEffect", 2);
We([
  C({ attribute: "weather-state" })
], Se.prototype, "weatherState", 2);
We([
  C({ type: Number, attribute: "weather-intensity" })
], Se.prototype, "weatherIntensity", 2);
We([
  C({ type: Boolean, attribute: "weather-night" })
], Se.prototype, "weatherNight", 2);
Se = We([
  T("explorer-source-clean-canvas")
], Se);
const wn = (e) => e.strings === void 0, kn = {}, An = (e, t = kn) => e._$AH = t;
const Ne = fr(class extends br {
  constructor(e) {
    if (super(e), e.type !== $e.PROPERTY && e.type !== $e.ATTRIBUTE && e.type !== $e.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!wn(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === se || t === f) return t;
    const i = e.element, r = e.name;
    if (e.type === $e.PROPERTY) {
      if (t === i[r]) return se;
    } else if (e.type === $e.BOOLEAN_ATTRIBUTE) {
      if (!!t === i.hasAttribute(r)) return se;
    } else if (e.type === $e.ATTRIBUTE && i.getAttribute(r) === t + "") return se;
    return An(e), t;
  }
});
var Sn = Object.defineProperty, Cn = Object.getOwnPropertyDescriptor, Ue = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Cn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Sn(t, i, o), o;
};
const En = [
  { value: "person", label: "Person" },
  { value: "pet", label: "Kæledyr" },
  { value: "robot", label: "Robot" },
  { value: "vehicle", label: "Køretøj" },
  { value: "object", label: "Objekt" }
], $n = /* @__PURE__ */ new Set(["sensor", "input_select", "select"]);
function Pn(e) {
  return e.split(".", 1)[0] ?? "";
}
function Gt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function Nn(e) {
  return Math.min(1, Math.max(0, e));
}
function Mn(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let ce = class extends q {
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
      presence_anchor: { ...n, [t]: Nn(r) }
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
      (e, t) => Gt(e).localeCompare(Gt(t), "da")
    );
  }
  renderEntityDatalist(e, t = !1) {
    const i = t ? this.entities.filter((r) => $n.has(Pn(r.entity_id))) : this.entities;
    return h`
      <datalist id=${e}>
        ${i.map(
      (r) => h`<option value=${r.entity_id}>${Gt(r)}</option>`
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
              .value=${Ne(e.area_id ?? "")}
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
              .value=${Ne(e.type ?? "person")}
              @change=${(n) => this.updatePresence(t, {
      type: n.target.value
    })}
            >
              ${En.map(
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
            .value=${Ne(e.room_id ?? "")}
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
ce.styles = j`
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
  C({ attribute: !1 })
], ce.prototype, "hass", 2);
Ue([
  v()
], ce.prototype, "config", 2);
Ue([
  v()
], ce.prototype, "areas", 2);
Ue([
  v()
], ce.prototype, "areaError", 2);
Ue([
  v()
], ce.prototype, "loadingAreas", 2);
ce = Ue([
  T("ha-explorer-card-editor")
], ce);
var Rn = Object.defineProperty, zn = Object.getOwnPropertyDescriptor, B = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? zn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Rn(t, i, o), o;
};
const re = 1e3, bt = (e) => Math.min(1, Math.max(0, e));
function Ui(e) {
  return e.length ? { x: e.reduce((t, i) => t + i[0], 0) / e.length, y: e.reduce((t, i) => t + i[1], 0) / e.length } : { x: 0.5, y: 0.5 };
}
function Tn(e) {
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function On(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "room";
}
function Yi(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
let L = class extends q {
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
    const s = Yi(n.attributes[o.x_attribute ?? "map_x"]), a = Yi(n.attributes[o.y_attribute ?? "map_y"]), l = t.physical_meters;
    if (s === void 0 || a === void 0 || !l) return;
    const d = Tn(t), c = bt((e[0] - d.minX) / (d.maxX - d.minX || 1)), p = bt((e[1] - d.minY) / (d.maxY - d.minY || 1));
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
    const t = On(e), i = new Set(this.rooms.map((o) => o.id));
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
    return M`<g style=${this.drawingMode === "idle" ? "pointer-events:auto" : "pointer-events:none"} @click=${(n) => this.selectRoom(n, e.id)}><polygon points=${t} fill="var(--primary-color,#03a9f4)" fill-opacity=${i ? ".30" : ".14"} stroke="var(--primary-color,#03a9f4)" stroke-width=${i ? 7 : 4}/><text x=${r.x * re} y=${r.y * re} text-anchor="middle" dominant-baseline="middle">${e.name ?? e.id}</text>${i ? M`<circle cx=${o.x * re} cy=${o.y * re} r="15" class="anchor"/>` : f}</g>`;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * re},${i * re}`).join(" ");
    return M`${this.pendingPoints.length >= 3 ? M`<polygon points=${e} class="pending-fill"/>` : f}<polyline points=${e} class="pending-line" fill="none"/>${this.pendingPoints.map(([t, i], r) => M`<circle cx=${t * re} cy=${i * re} r="13" class="pending-point"/><text x=${t * re} y=${i * re - 22} text-anchor="middle">${r + 1}</text>`)}`;
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
L.styles = j`:host{display:block}.drawing-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading h3{margin:3px 0}.heading small{color:var(--secondary-text-color);font-weight:700;letter-spacing:.08em}.instruction,.selected,.warning,.position-cal{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color)}.position-cal{display:grid;gap:9px}.position-cal strong{color:var(--primary-text-color)}.grid,.dimensions{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;align-items:end}.cal-status{display:flex;gap:18px;flex-wrap:wrap}label{display:grid;gap:5px;font-size:.8rem;color:var(--secondary-text-color)}label.toggle{display:flex;align-items:center;gap:8px;min-height:38px;font-size:.9rem;color:var(--primary-text-color)}label.toggle input{width:auto}input,select{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;height:min(58vh,620px);cursor:crosshair}text{fill:var(--primary-text-color);font-size:24px;font-weight:700}.pending-fill{fill:var(--primary-color);fill-opacity:.18;stroke:var(--primary-color);stroke-width:5}.pending-line{stroke:var(--primary-color);stroke-width:6}.pending-point,.anchor{fill:var(--primary-color);stroke:white;stroke-width:4}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{padding:9px 13px;border:1px solid var(--divider-color);border-radius:9px;background:var(--secondary-background-color);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:var(--primary-color)}button.danger{background:var(--error-color,#db4437);color:#fff;border-color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}.selected{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}`;
B([
  C({ attribute: !1 })
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
  T("ha-explorer-room-drawing-editor")
], L);
function ue(e) {
  return e?.trim() || void 0;
}
function jn(e) {
  const t = e.entity_binding;
  return !!(ue(t?.room_entity) || e.room_id || Number.isFinite(e.x) && Number.isFinite(e.y));
}
function In(e) {
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
function Dn(e, t) {
  const i = e.rooms ?? [], r = e.presences ?? [], o = e.zones ?? [], n = e.openings ?? [], s = e.route_nodes ?? [], a = e.route_graph_edges ?? [], l = e.routes ?? [], d = i.flatMap((k) => k.reactions ?? []), c = i.flatMap((k) => k.quick_actions ?? []), p = In(e), u = [];
  if (t)
    for (const k of p) {
      const w = t.states[k.entity];
      if (!w) {
        u.push({ ...k, unavailable: !1 });
        continue;
      }
      (w.state === "unavailable" || w.state === "unknown") && u.push({ ...k, unavailable: !0 });
    }
  const g = u.filter((k) => !k.unavailable), b = r.filter((k) => !jn(k)), m = i.filter((k) => k.points.length < 3), y = (e.image ?? e.background ?? "").trim(), S = [{ id: "floorplan", label: "Plantegning", detail: y ? "Plantegning er valgt." : "Vælg en SVG-, PNG- eller JPG-plantegning.", state: y ? "ready" : "attention", target: "basic" }, { id: "rooms", label: "Rum", detail: i.length ? m.length ? `${i.length} rum · ${m.length} mangler en gyldig polygon.` : `${i.length} rum klar.` : "Tegn mindst ét rum for room-aware tracking og Living Rooms.", state: i.length && !m.length ? "ready" : "attention", target: i.length ? "rooms" : "room-tools" }, { id: "presences", label: "Personer & objekter", detail: r.length ? b.length ? `${r.length} tilføjet · ${b.length} mangler rum/position.` : `${r.length} tracking-profil${r.length === 1 ? "" : "er"} klar.` : "Valgfrit · tilføj personer, kæledyr, robotter eller objekter.", state: r.length ? b.length ? "attention" : "ready" : "optional", target: "presences" }, { id: "entities", label: "Home Assistant-entities", detail: p.length ? t ? g.length ? `${g.length} binding${g.length === 1 ? "" : "er"} findes ikke i Home Assistant.` : u.length ? `${p.length} bindings fundet · ${u.length} er midlertidigt unavailable/unknown.` : `${p.length} live binding${p.length === 1 ? "" : "er"} fundet.` : `${p.length} binding${p.length === 1 ? "" : "er"} · afventer Home Assistant.` : "Ingen live entity-bindings endnu.", state: g.length ? "attention" : p.length ? "ready" : "optional", target: g[0]?.target ?? u[0]?.target ?? "diagnostics" }, { id: "openings", label: "Døre & vinduer", detail: n.length ? `${n.length} dynamisk${n.length === 1 ? " åbning" : "e åbninger"} konfigureret.` : "Valgfrit · placér døre og vinduer og bind dem til kontaktsensorer.", state: n.length ? "ready" : "optional", target: "openings" }, { id: "routing", label: "Routing", detail: a.length || l.length ? `${a.length} graph edges · ${l.length} manuelle routes · ${s.length} nodes.` : "Valgfrit · kortet kan bruges uden route graph.", state: a.length || l.length ? "ready" : "optional", target: a.length ? "route-graph" : "routes" }, { id: "living", label: "Living Rooms", detail: d.length ? `${d.length} rumreaktion${d.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · lys, motion, media og åbninger kan gøre rummene levende.", state: d.length ? "ready" : "optional", target: "room-reactions" }, { id: "quick-actions", label: "Rumhandlinger", detail: c.length ? `${c.length} scene- eller scripthandling${c.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · tilføj scenes og scripts direkte til rummets panel.", state: c.length ? "ready" : "optional", target: "room-actions" }, { id: "zones", label: "Dynamic Areas", detail: o.length ? `${o.length} zone${o.length === 1 ? "" : "r"} konfigureret.` : "Valgfrit · tilføj alarm-, rengørings- eller informationszoner.", state: o.length ? "ready" : "optional", target: "zones" }];
  return { items: S, entityIssues: u, attentionCount: S.filter((k) => k.state === "attention").length, configuredFeatureCount: S.filter((k) => k.state === "ready").length, roomCount: i.length, presenceCount: r.length, zoneCount: o.length, reactionCount: d.length, actionCount: c.length, routeCount: a.length + l.length, nodeCount: s.length };
}
var qn = Object.defineProperty, Ln = Object.getOwnPropertyDescriptor, bi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ln(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && qn(t, i, o), o;
};
const Fn = {
  ready: "Klar",
  attention: "Tjek",
  optional: "Valgfrit"
};
let at = class extends q {
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
        <span class="state-label">${Fn[e.state]}</span>
        <span class="chevron" aria-hidden="true">›</span>
      </button>
    `;
  }
  render() {
    if (!this.config) return f;
    const e = Dn(this.config, this.hass), t = e.attentionCount === 0, i = e.entityIssues.slice(0, 4);
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
at.styles = j`
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
  C({ attribute: !1 })
], at.prototype, "config", 2);
bi([
  C({ attribute: !1 })
], at.prototype, "hass", 2);
at = bi([
  T("ha-explorer-setup-overview")
], at);
var Bn = Object.defineProperty, Hn = Object.getOwnPropertyDescriptor, Cr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Hn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Bn(t, i, o), o;
};
const Zt = [
  ["classic", "Classic", "Den neutrale Home Assistant Explorer-stil."],
  [
    "enchanted_antique",
    "Enchanted Antique Map",
    "Original magisk kortstil med pergament, sepia-blæk og levende kortdetaljer."
  ]
], _n = [
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
let Pt = class extends q {
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
    const e = Zt.find((a) => a[0] === this.theme) ?? Zt[0], t = this.dayNight, i = this.compass, r = this.alarm, o = this.occupancy, n = this.weather, s = this.config.appearance?.hide_source_text ?? !1;
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
            ${Zt.map(
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
                      ${_n.map(
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
Pt.styles = j`
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
Cr([
  C({ attribute: !1 })
], Pt.prototype, "config", 2);
Pt = Cr([
  T("ha-explorer-theme-editor")
], Pt);
var Vn = Object.defineProperty, Kn = Object.getOwnPropertyDescriptor, Er = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Kn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Vn(t, i, o), o;
};
const Qi = { person: "Person · skoaftryk", pet: "Kæledyr · poteaftryk", robot: "Robot · hjulspor", vehicle: "Køretøj · dobbelte hjulspor", object: "Objekt · magisk spor" };
let Nt = class extends q {
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
      return h`<article class="profile"><div class="profile-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><span class="type-badge">${Qi[r]}</span></div><div class="grid two"><label>Farve (valgfri)<input .value=${t.color ?? ""} placeholder="Automatisk stabil farve" @change=${(o) => this.updateOptionalText(i, "color", o.target.value)}/><small>Farven på selve markøren. Tom = automatisk.</small></label><label>Ikon (valgfri)<input .value=${t.icon ?? ""} placeholder="Automatisk type-ikon" maxlength="8" @change=${(o) => this.updateOptionalText(i, "icon", o.target.value)}/><small>Bruges i den store markør; type-badget vises stadig.</small></label></div><label class="toggle"><input type="checkbox" .checked=${t.visible !== !1} @change=${(o) => this.updatePresence(i, { visible: o.target.checked })}/><span><strong>Vis på kortet</strong><small>Skjuler markøren manuelt; tracking-konfigurationen bevares.</small></span></label><div class="trail-box"><div class="trail-heading"><strong>👣 Bevægelsesspor</strong><small>${Qi[r]}</small></div><label class="toggle"><input type="checkbox" .checked=${t.trail_visible !== !1} @change=${(o) => this.updatePresence(i, { trail_visible: o.target.checked })}/><span><strong>Vis spor</strong><small>Kan slås fra uden at skjule personen eller objektet.</small></span></label><div class="grid two"><label>Sporfarve (valgfri)<input .value=${t.trail_color ?? ""} placeholder="Samme som markør" @change=${(o) => this.updateOptionalText(i, "trail_color", o.target.value)}/><small>Fx #4b301d. Tom = markørens farve.</small></label><label>Varighed (sekunder)<input type="number" min="1" max="60" step="1" .value=${String(t.trail_duration ?? 4.2)} @change=${(o) => this.updateTrailDuration(i, o.target.value)}/><small>Hvor længe sporene falmer på kortet. 1–60 sek.</small></label></div></div></article>`;
    })}</div>` : h`<div class="empty">Tilføj først en person eller et objekt i sektionen ovenfor.</div>`}${e.length ? h`<div class="note">Sportypen vælges automatisk efter type. Reduced Motion deaktiverer bevægelsesspor, men markørerne forbliver synlige.</div>` : f}</section>`;
  }
};
Nt.styles = j`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.heading,.profile-heading,.trail-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.heading>div,.profile-heading>div{display:grid;gap:3px}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:0;font-size:1rem}.count,.type-badge{border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);white-space:nowrap}.count{padding:5px 9px;font-size:.78rem}.type-badge{padding:4px 8px;font-size:.72rem}.intro,.note{margin:0;color:var(--secondary-text-color);font-size:.86rem;line-height:1.45}.profiles{display:grid;gap:10px}.profile{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.profile-heading small,label small,.toggle small,.trail-heading small{color:var(--secondary-text-color);font-size:.76rem;font-weight:400;line-height:1.35}.grid{display:grid;gap:10px}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}label{display:grid;gap:6px;font-weight:600}input[type="text"],input:not([type]),input[type="number"]{box-sizing:border-box;width:100%;min-width:0;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:9px;padding-top:2px}.toggle input{margin-top:3px}.toggle span{display:grid;gap:2px}.trail-box{display:grid;gap:11px;padding:12px;border:1px dashed var(--divider-color);border-radius:9px;background:var(--card-background-color)}.trail-heading{align-items:center}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}.empty{color:var(--secondary-text-color);text-align:center;font-size:.84rem}@media(max-width:600px){.grid.two{grid-template-columns:1fr}.heading,.profile-heading{align-items:flex-start}.type-badge{white-space:normal;text-align:right}}`;
Er([
  C({ attribute: !1 })
], Nt.prototype, "config", 2);
Nt = Er([
  T("ha-explorer-presence-polish-editor")
], Nt);
var Gn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, $r = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Zn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Gn(t, i, o), o;
};
let Mt = class extends q {
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
Mt.styles = j`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}label{display:grid;gap:7px;font-weight:600}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:10px;padding:11px;border-radius:10px;background:var(--secondary-background-color)}.toggle input{margin-top:3px}.toggle span{display:grid;gap:3px}input[type="range"]{width:100%}`;
$r([
  C({ attribute: !1 })
], Mt.prototype, "config", 2);
Mt = $r([
  T("ha-explorer-movement-history-editor")
], Mt);
var Wn = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, Pr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Un(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Wn(t, i, o), o;
};
let Rt = class extends q {
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
Rt.styles = j`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}label{display:grid;gap:7px;font-weight:600}.grid{display:grid;gap:9px}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:10px;padding:11px;border-radius:10px;background:var(--secondary-background-color)}.toggle input{margin-top:3px}.toggle span{display:grid;gap:3px}input[type="range"]{width:100%}`;
Pr([
  C({ attribute: !1 })
], Rt.prototype, "config", 2);
Rt = Pr([
  T("ha-explorer-pet-robot-trails-editor")
], Rt);
var Yn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, yi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Qn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Yn(t, i, o), o;
};
function Wt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function Ji(e) {
  return Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0 && t !== ""));
}
let lt = class extends q {
  emit(e) {
    this.config && this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config, presences: e } }, bubbles: !0, composed: !0 }));
  }
  updatePresence(e, t) {
    const i = [...this.config?.presences ?? []], r = i[e];
    r && (i[e] = { ...r, type: "pet", ...t }, this.emit(i));
  }
  updateBinding(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { entity_binding: Ji({ ...i.entity_binding, ...t }) });
  }
  updateDetection(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { shelly_pet_detection: Ji({ enabled: !0, height_attribute: "maxz", target_id_attribute: "target_id", timestamp_attribute: "timestamp", max_height_m: 0.75, release_height_m: 0.95, confirmation_updates: 3, release_updates: 2, ...i.shelly_pet_detection, ...t }) });
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
        <label>LiveTrack-entitet<input list="shelly-pet-entities" .value=${Ne(o.position_entity ?? o.entity ?? "")} placeholder="sensor.stue_presence_stuen_target_1" @change=${(s) => this.updateBinding(r, { position_entity: s.target.value.trim() || void 0 })}/><small>Entiteten skal have attributterne x, y, maxz og helst target_id.</small></label>
        <div class="grid three"><label>Rum<select .value=${Ne(i.room_id ?? "")} @change=${(s) => this.updatePresence(r, { room_id: s.target.value || void 0 })}><option value="">Vælg rum</option>${(this.config?.rooms ?? []).map((s) => h`<option value=${s.id}>${s.name ?? s.id}</option>`)}</select></label><label>X-attribut<input .value=${Ne(o.x_attribute ?? "x")} @change=${(s) => this.updateBinding(r, { x_attribute: s.target.value.trim() || "x", coordinate_space: "room_meters" })}/></label><label>Y-attribut<input .value=${Ne(o.y_attribute ?? "y")} @change=${(s) => this.updateBinding(r, { y_attribute: s.target.value.trim() || "y", coordinate_space: "room_meters" })}/></label></div>
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
lt.styles = j`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.heading,.pet-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}button{border:0;border-radius:10px;padding:10px 13px;background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff);font-weight:700}.intro,p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}.pet-card{display:grid;gap:13px;padding:14px;border:1px solid var(--divider-color);border-radius:11px}.pet-heading span{font-size:.72rem;color:var(--secondary-text-color)}label{display:grid;gap:6px;font-weight:600}.grid{display:grid;gap:10px}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:repeat(3,minmax(0,1fr))}input,select{box-sizing:border-box;width:100%;min-height:40px;padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}input[type="range"]{padding:0}.toggle{grid-template-columns:auto 1fr;align-items:start;padding:10px;background:var(--secondary-background-color);border-radius:9px}.toggle input{width:auto;min-height:0;margin-top:3px}.toggle span{display:grid;gap:2px}.note,.empty{padding:11px;border-radius:9px;background:var(--secondary-background-color);font-size:.8rem}@media(max-width:600px){.heading{align-items:flex-start;flex-direction:column}.two,.three{grid-template-columns:1fr}}`;
yi([
  C({ attribute: !1 })
], lt.prototype, "hass", 2);
yi([
  C({ attribute: !1 })
], lt.prototype, "config", 2);
lt = yi([
  T("ha-explorer-shelly-pet-editor")
], lt);
var Jn = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, vi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Xn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Jn(t, i, o), o;
};
function Ut(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function es(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let dt = class extends q {
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
    i && this.updatePresence(e, { entity_binding: es({ ...i.entity_binding, ...t }) });
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
dt.styles = j`:host{display:block;min-width:0;max-width:100%;container-type:inline-size}.panel,.person-card,.grid,label,.heading>div,.person-heading>div{min-width:0}.panel{display:grid;gap:14px;width:100%;max-width:100%;box-sizing:border-box;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color);overflow:hidden}.heading,.person-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;min-width:0}.heading>div,.person-heading>div{display:grid;gap:3px}.eyebrow{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:0;font-size:1rem}.intro,.note,small{color:var(--secondary-text-color);line-height:1.4;overflow-wrap:anywhere}.intro,.note{margin:0;font-size:.86rem}.person-card{display:grid;gap:12px;width:100%;max-width:100%;box-sizing:border-box;padding:14px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color);overflow:hidden}label{display:grid;gap:6px;font-weight:600;max-width:100%}.grid{display:grid;gap:10px;width:100%;max-width:100%}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr) minmax(0,.85fr)}input,select,button{box-sizing:border-box;max-width:100%;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}input,select{width:100%;min-width:0}input{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button{cursor:pointer}.primary{border-color:var(--primary-color);color:var(--primary-color);font-weight:700}.danger{color:var(--error-color,#db4437);flex:0 0 auto}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}code{font-size:.9em;overflow-wrap:anywhere}@container (max-width:560px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}.person-heading{align-items:center}}@container (max-width:390px){.panel{padding:12px}.person-card{padding:11px}.person-heading{flex-wrap:wrap}.person-heading .danger{margin-left:auto}}@media(max-width:700px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}}`;
vi([
  C({ attribute: !1 })
], dt.prototype, "hass", 2);
vi([
  C({ attribute: !1 })
], dt.prototype, "config", 2);
dt = vi([
  T("ha-explorer-identity-editor")
], dt);
var ts = Object.defineProperty, is = Object.getOwnPropertyDescriptor, le = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? is(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ts(t, i, o), o;
};
const xe = 1e3, Xi = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Advarsel" },
  { value: "danger", label: "Fare / alarm" },
  { value: "cleaning", label: "Rengøring" },
  { value: "restricted", label: "Begrænset område" }
];
function er(e) {
  return Math.min(1, Math.max(0, e));
}
function rs(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "zone";
}
function Yt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function os(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let ie = class extends q {
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
      (e, t) => Yt(e).localeCompare(Yt(t), "da")
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
    const t = rs(e), i = new Set(this.zones.map((o) => o.id));
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
          active_states: os(this.draftStates)
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
    const t = kr(e, (i) => this.hass?.states[i]?.state);
    return e.visible === !1 ? "Skjult manuelt" : t.conditional ? t.active ? `Aktiv · ${t.currentState ?? "ukendt"}` : t.reason === "missing_entity" ? "Entity mangler" : t.reason === "entity_unavailable" ? `Utilgængelig · ${t.currentState}` : `Inaktiv · ${t.currentState ?? "ukendt"}` : "Altid aktiv";
  }
  renderZonePolygon(e) {
    const t = e.points.map(([r, o]) => `${r * xe},${o * xe}`).join(" "), i = e.id === this.selectedZoneId;
    return M`
      <g class=${i ? "zone selected" : "zone"} @click=${(r) => {
      this.drawing || (r.stopPropagation(), this.selectZone(e));
    }}>
        <polygon points=${t}></polygon>
        ${e.name ? M`<text x=${e.points.reduce((r, o) => r + o[0], 0) / e.points.length * xe} y=${e.points.reduce((r, o) => r + o[1], 0) / e.points.length * xe} text-anchor="middle">${e.name}</text>` : f}
      </g>
    `;
  }
  renderPending() {
    if (!this.pendingPoints.length) return f;
    const e = this.pendingPoints.map(([t, i]) => `${t * xe},${i * xe}`).join(" ");
    return M`
      ${this.pendingPoints.length >= 3 ? M`<polygon class="pending-fill" points=${e}></polygon>` : f}
      <polyline class="pending-line" points=${e}></polyline>
      ${this.pendingPoints.map(([t, i], r) => M`
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
            ${Xi.map((t) => h`<option value=${t.value}>${t.label}</option>`)}
          </select>
        </label>
        <label class="wide">
          Home Assistant entity · valgfri
          <input list=${e} .value=${this.draftEntity} placeholder="input_boolean.alarm_zone" @change=${(t) => this.draftEntity = t.target.value} />
          <datalist id=${e}>
            ${this.entities.map((t) => h`<option value=${t.entity_id}>${Yt(t)}</option>`)}
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
              ${e ? M`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}
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
                    <span><strong>${r.name ?? r.id}</strong><small>${Xi.find((o) => o.value === (r.kind ?? "info"))?.label}</small></span>
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
ie.styles = j`
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
  C({ attribute: !1 })
], ie.prototype, "hass", 2);
le([
  C({ attribute: !1 })
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
  T("ha-explorer-zones-editor")
], ie);
var ns = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, W = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ss(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ns(t, i, o), o;
};
const Ie = 1e3, tr = ["on", "open", "opened", "true"];
function ir(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function as(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "opening";
}
function Qt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function ls(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let V = class extends q {
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
    return Object.values(this.hass?.states ?? {}).filter((e) => e.entity_id.startsWith("binary_sensor.") || e.entity_id.startsWith("cover.") || e.entity_id.startsWith("input_boolean.") || e.entity_id.startsWith("sensor.")).sort((e, t) => Qt(e).localeCompare(Qt(t), "da"));
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  uniqueId(e) {
    const t = as(e), i = new Set(this.openings.map((o) => o.id));
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
    return { id: e, name: this.draftName.trim() || e, kind: this.draftKind, point: this.draftPoint, angle: this.draftAngle, length: this.draftLength, hinge: this.draftHinge, swing: this.draftSwing, open_angle: this.draftOpenAngle, visible: this.draftVisible, ...t ? { state_binding: { entity: t, open_states: ls(this.draftStates) } } : {} };
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
    return M`<g class=${t ? "opening selected" : "opening"} @click=${(l) => {
      this.placing || (l.stopPropagation(), this.select(e));
    }}><line x1=${i - s} y1=${r - a} x2=${i + s} y2=${r + a}></line><circle cx=${i} cy=${r} r=${t ? 11 : 8}></circle>${e.name ? M`<text x=${i} y=${r - 18} text-anchor="middle">${e.name}</text>` : f}</g>`;
  }
  renderDraft() {
    if (this.selected || !this.placing && this.draftName === "Ny dør") return f;
    const e = this.draftPoint[0] * Ie, t = this.draftPoint[1] * Ie, i = this.draftLength * Ie, r = this.draftAngle * Math.PI / 180, o = Math.cos(r) * i / 2, n = Math.sin(r) * i / 2;
    return M`<g class="opening draft"><line x1=${e - o} y1=${t - n} x2=${e + o} y2=${t + n}></line><circle cx=${e} cy=${t} r="11"></circle></g>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = !!this.selected || this.placing || this.draftName !== "Ny dør";
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Dynamic Doors & Windows · v0.38</span><h3>Døre og vinduer</h3><p>Placér åbninger direkte på plantegningen og bind dem til Home Assistant.</p></div><span class="count">${this.openings.length} åbninger</span></div><div class="toolbar"><button class="primary" @click=${() => this.beginNew("door")}>+ Ny dør</button><button @click=${() => this.beginNew("window")}>+ Nyt vindue</button></div><div class="workspace"><div class="map-wrap"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}><rect width="1000" height="1000" class="backdrop"></rect>${e ? M`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}${this.openings.map((i) => this.renderOpening(i))}${this.renderDraft()}</svg>${this.placing ? h`<div class="map-help">Klik på kortet hvor ${this.draftKind === "door" ? "døren" : "vinduet"} skal sidde</div>` : f}</div><div class="sidebar">${this.openings.length ? this.openings.map((i) => h`<button class=${i.id === this.selectedId ? "row selected" : "row"} @click=${() => this.select(i)}><span><strong>${i.name ?? i.id}</strong><small>${i.kind === "door" ? "Dør" : "Vindue"}</small></span><em>${this.stateText(i)}</em></button>`) : h`<div class="empty">Ingen døre eller vinduer endnu.</div>`}</div></div>${t ? this.renderForm() : f}</section>`;
  }
  renderForm() {
    const e = "explorer-opening-entities";
    return h`<div class="form-grid"><label>Navn<input .value=${this.draftName} @input=${(t) => this.draftName = t.target.value}></label><label>Type<select .value=${this.draftKind} @change=${(t) => this.draftKind = t.target.value}><option value="door">Dør</option><option value="window">Vindue</option></select></label><label>Vinkel · ${Math.round(this.draftAngle)}°<input type="range" min="0" max="359" step="1" .value=${String(this.draftAngle)} @input=${(t) => this.draftAngle = Number(t.target.value)}></label><label>Længde · ${Math.round(this.draftLength * 1e3) / 10}%<input type="range" min="0.025" max="0.14" step="0.0025" .value=${String(this.draftLength)} @input=${(t) => this.draftLength = Number(t.target.value)}></label>${this.draftKind === "door" ? h`<label>Hængsel<select .value=${this.draftHinge} @change=${(t) => this.draftHinge = t.target.value}><option value="start">Start</option><option value="end">Slut</option></select></label><label>Svingretning<select .value=${this.draftSwing} @change=${(t) => this.draftSwing = t.target.value}><option value="left">Venstre</option><option value="right">Højre</option></select></label><label>Åbningsvinkel · ${Math.round(this.draftOpenAngle)}°<input type="range" min="30" max="150" step="1" .value=${String(this.draftOpenAngle)} @input=${(t) => this.draftOpenAngle = Number(t.target.value)}></label>` : f}<label class="wide">Home Assistant entity · valgfri<input list=${e} .value=${this.draftEntity} placeholder="binary_sensor.stuedor" @change=${(t) => this.draftEntity = t.target.value}><datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${Qt(t)}</option>`)}</datalist><small>Vælg fx en dør-/vindueskontakt eller cover-entity.</small></label><label>Åben state(s)<input .value=${this.draftStates} placeholder="on, open" @change=${(t) => this.draftStates = t.target.value}><small>Kommasepareret.</small></label><label class="toggle"><input type="checkbox" .checked=${this.draftVisible} @change=${(t) => this.draftVisible = t.target.checked}>Vis på kortet</label><div class="actions wide"><button @click=${() => this.placing = !0}>Placér igen</button>${this.selected ? h`<button class="danger" @click=${this.deleteSelected}>Slet</button>` : f}<button class="primary" @click=${this.save} ?disabled=${this.placing}>Gem</button></div></div>`;
  }
};
V.styles = j`:host{display:block;margin-top:16px;color:var(--primary-text-color)}.panel{border:1px solid var(--divider-color,#d7dbe0);border-radius:14px;padding:16px;background:var(--card-background-color,#fff)}.heading{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:4px 0;font-size:1.05rem}p{margin:0;color:var(--secondary-text-color);font-size:.86rem}.count{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color,#f2f4f7);font-size:.75rem;white-space:nowrap}.toolbar{display:flex;gap:8px;margin-top:14px}.workspace{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(190px,.8fr);gap:14px;margin-top:12px}.map-wrap{position:relative;min-height:300px;border-radius:12px;overflow:hidden;border:1px solid var(--divider-color,#d7dbe0);background:#d8c9a7}svg{width:100%;height:100%;min-height:300px;display:block;cursor:crosshair}.backdrop{fill:#d8c9a7}.opening{cursor:pointer;pointer-events:all}.opening line{stroke:var(--primary-text-color,#1f2937);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}.opening circle{fill:var(--card-background-color,#fff);stroke:var(--primary-color,#03a9f4);stroke-width:4;vector-effect:non-scaling-stroke}.opening.selected line{stroke:var(--primary-color,#03a9f4);stroke-width:10}.opening.draft line{stroke-dasharray:12 8}.opening text{fill:var(--primary-text-color,#1f2937);stroke:white;stroke-width:5;paint-order:stroke;font-size:20px;font-weight:700;pointer-events:none}.map-help{position:absolute;left:10px;bottom:10px;padding:6px 9px;border-radius:8px;background:rgba(255,255,255,.9);color:#344054;font-size:.75rem;pointer-events:none}.sidebar{display:flex;flex-direction:column;gap:7px;max-height:330px;overflow:auto}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;width:100%}.row.selected{border-color:var(--primary-color);box-shadow:0 0 0 1px var(--primary-color)}.row span{display:flex;flex-direction:column}.row small,.row em{font-size:.68rem;color:var(--secondary-text-color);font-style:normal}.row em{text-align:right}.empty{padding:12px;border:1px dashed var(--divider-color);border-radius:10px;color:var(--secondary-text-color);font-size:.8rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;margin-top:14px;padding-top:14px;border-top:1px solid var(--divider-color)}label{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:650}.wide{grid-column:1/-1}.toggle{flex-direction:row;align-items:center;align-self:end;padding-bottom:8px}input,select{box-sizing:border-box;width:100%;border:1px solid var(--divider-color,#cfd4da);border-radius:8px;padding:8px 9px;background:var(--card-background-color,#fff);color:var(--primary-text-color)}input[type=range]{padding:4px 0}label small{color:var(--secondary-text-color);font-weight:400}.actions{display:flex;justify-content:flex-end;gap:8px}button{border:1px solid var(--divider-color,#cfd4da);border-radius:9px;padding:9px 11px;background:var(--card-background-color,#fff);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color,#03a9f4);color:white;border-color:transparent;font-weight:700}button.danger{color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:700px){.workspace,.form-grid{grid-template-columns:1fr}.wide{grid-column:auto}}`;
W([
  C({ attribute: !1 })
], V.prototype, "hass", 2);
W([
  C({ attribute: !1 })
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
  T("ha-explorer-openings-editor")
], V);
var ds = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, de = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? cs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ds(t, i, o), o;
};
const Jt = { light: "Lampe / lys", motion: "Bevægelsessensor", media: "TV / media", opening: "Dør / vindue", temperature: "Temperatur", fireplace: "Pejs / ildsted" }, Xt = { light: "✦", motion: "◉", media: "▶", opening: "↗", temperature: "°", fireplace: "🔥" }, ei = (e) => Math.min(1, Math.max(0, e));
let ee = class extends q {
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
    !t || !i || (this.editingIndex = e, this.draftKind = i.kind, this.draftEntity = i.entity, this.draftStates = i.kind === "temperature" ? "" : (i.active_states?.length ? i.active_states : wt(i.kind)).join(", "), this.draftPosition = Xe(t, i), this.draftIntensity = i.intensity ?? 0.75, this.draftRadius = i.radius ?? 90);
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
    const t = this.config?.image ?? this.config?.background ?? "", i = this.draftPosition ?? Xe(e);
    return h`<div class="placement"><div><strong>Fysisk placering</strong><small>Klik på plantegningen dér hvor entity'en sidder.</small></div><div class="preview" @click=${this.handlePreviewClick}>${t ? h`<img src=${t} alt="">` : f}<svg viewBox="0 0 ${x} ${x}" preserveAspectRatio="none"><polygon points=${e.points.map(([r, o]) => `${r * x},${o * x}`).join(" ")}></polygon>${(e.reactions ?? []).map((r) => {
      const o = Xe(e, r);
      return h`<g class="existing" transform=${`translate(${o.x * x} ${o.y * x})`}><circle r="13"></circle><text>${Xt[r.kind]}</text></g>`;
    })}<g class="draft-point" transform=${`translate(${i.x * x} ${i.y * x})`}><circle r=${this.draftKind === "fireplace" ? "18" : "14"}></circle><text>${Xt[this.draftKind]}</text></g></svg></div><small>${(i.x * 100).toFixed(1)} % / ${(i.y * 100).toFixed(1)} %</small></div>`;
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
    }}>${this.rooms.map((o) => h`<option value=${o.id}>${o.name ?? o.id}</option>`)}</select></label><div class="draft"><strong>${this.editingIndex === void 0 ? "Nyt entity-punkt" : "Redigér entity-punkt"}</strong><div class="grid"><label>Type<select .value=${this.draftKind} @change=${(o) => this.changeKind(o.target.value)}>${Object.keys(Jt).map((o) => h`<option value=${o}>${Jt[o]}</option>`)}</select></label><label>Home Assistant entity<select .value=${this.draftEntity} @change=${(o) => this.draftEntity = o.target.value}><option value="">Vælg entity…</option>${this.draftEntity && !r ? h`<option value=${this.draftEntity}>${this.draftEntity} · eksisterende</option>` : f}${i.map((o) => h`<option value=${o.id}>${o.label === o.id ? o.id : `${o.label} · ${o.id}`}</option>`)}</select></label>${this.draftKind === "temperature" ? h`<div class="note">Temperaturen læses automatisk fra sensoren.</div>` : h`<label>Aktiv state(s)<input .value=${this.draftStates} @input=${(o) => this.draftStates = o.target.value}><small>Flere states adskilles med komma.</small></label>`}${this.draftKind === "fireplace" ? h`<label>🔥 Intensitet · ${Math.round(this.draftIntensity * 100)}%<input type="range" min="0.2" max="1" step="0.05" .value=${String(this.draftIntensity)} @input=${(o) => this.draftIntensity = Number(o.target.value)}></label><label>Glød-radius · ${Math.round(this.draftRadius)}<input type="range" min="30" max="220" step="5" .value=${String(this.draftRadius)} @input=${(o) => this.draftRadius = Number(o.target.value)}><small>Hvor langt den varme ildglød breder sig omkring pejsen.</small></label>` : f}</div>${e ? this.preview(e) : f}<div class="actions"><button @click=${this.save} ?disabled=${!this.draftEntity.trim() || this.isDuplicate()}>${this.editingIndex === void 0 ? "Tilføj punkt" : "Gem ændring"}</button>${this.editingIndex !== void 0 ? h`<button class="secondary" @click=${this.cancelEdit}>Annuller</button>` : f}</div></div><div class="list">${t.map((o, n) => h`<article><span class="glyph">${Xt[o.kind]}</span><div><strong>${Jt[o.kind]}</strong><small>${o.entity}</small><small>${this.statusLabel(o, n)}${o.kind === "fireplace" ? ` · ${Math.round((o.intensity ?? 0.75) * 100)}% · radius ${o.radius ?? 90}` : ""}</small></div><div class="row-actions"><button class="secondary" @click=${() => this.beginEdit(n)}>Redigér</button><button class="danger" @click=${() => this.removeReaction(n)}>Fjern</button></div></article>`)}</div>` : h`<div class="empty">Tilføj først et rum.</div>`}</section>`;
  }
};
ee.styles = j`:host{display:block}.editor{display:grid;gap:14px;margin-top:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{font-size:.7rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.1em}.heading h3{margin:3px 0 0}.heading b{height:max-content;padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);font-size:.75rem}.intro{margin:0;color:var(--secondary-text-color)}label{display:grid;gap:6px;font-size:.86rem}.draft{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}select,input{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}small{color:var(--secondary-text-color)}.placement{display:grid;gap:7px}.placement>div:first-child{display:grid}.preview{position:relative;aspect-ratio:1;max-height:360px;overflow:hidden;border:1px solid var(--divider-color);border-radius:10px;background:var(--card-background-color);cursor:crosshair}.preview img,.preview svg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.preview polygon{fill:rgba(120,90,50,.08);stroke:rgba(120,90,50,.5);stroke-width:3}.preview circle{fill:var(--card-background-color);stroke:var(--primary-color);stroke-width:4}.preview text{font-size:18px;text-anchor:middle;dominant-baseline:central}.draft-point text{font-size:22px}.actions,.row-actions{display:flex;gap:8px;flex-wrap:wrap}button{padding:8px 11px;border:0;border-radius:8px;background:var(--primary-color);color:var(--text-primary-color,#fff);font:inherit;cursor:pointer}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437)}button:disabled{opacity:.5;cursor:not-allowed}.list{display:grid;gap:8px}.list article{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:10px;border:1px solid var(--divider-color);border-radius:10px}.list article>div:nth-child(2){display:grid;gap:2px}.glyph{font-size:1.3rem}.note,.empty{padding:10px;border-radius:8px;background:var(--card-background-color);color:var(--secondary-text-color)}@media(max-width:620px){.grid{grid-template-columns:1fr}.list article{grid-template-columns:auto 1fr}.row-actions{grid-column:1/-1}}`;
de([
  C({ attribute: !1 })
], ee.prototype, "config", 2);
de([
  C({ attribute: !1 })
], ee.prototype, "hass", 2);
de([
  v()
], ee.prototype, "selectedRoomId", 2);
de([
  v()
], ee.prototype, "draftKind", 2);
de([
  v()
], ee.prototype, "draftEntity", 2);
de([
  v()
], ee.prototype, "draftStates", 2);
de([
  v()
], ee.prototype, "draftPosition", 2);
de([
  v()
], ee.prototype, "editingIndex", 2);
de([
  v()
], ee.prototype, "draftIntensity", 2);
de([
  v()
], ee.prototype, "draftRadius", 2);
ee = de([
  T("ha-explorer-room-reactions-editor")
], ee);
var ps = Object.getOwnPropertyDescriptor, hs = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ps(t, i) : t, n = e.length - 1, s; n >= 0; n--)
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
rr = hs([
  T("ha-explorer-room-reactions-editor-clean")
], rr);
var us = Object.defineProperty, gs = Object.getOwnPropertyDescriptor, ye = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? gs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && us(t, i, o), o;
};
let ae = class extends q {
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
ae.styles = j`
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
  C({ attribute: !1 })
], ae.prototype, "config", 2);
ye([
  C({ attribute: !1 })
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
  T("ha-explorer-room-actions-editor")
], ae);
var ms = Object.defineProperty, fs = Object.getOwnPropertyDescriptor, K = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? fs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ms(t, i, o), o;
};
const X = 1e3;
let _ = class extends q {
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
    return _e(e, (t) => this.entityState(t));
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
      return M`
        <g
          class=${n}
          transform=${`translate(${i * X} ${r * X})`}
          @click=${(s) => this.useSharedNode(s, e)}
        >
          <circle r="15"></circle>
          <text y="-24" text-anchor="middle">${this.routeNodeLabel(e)}</text>
          ${t > 0 ? M`<text class="usage" y="7" text-anchor="middle">${t}</text>` : f}
        </g>
      `;
    });
  }
  renderNetworkRoutes() {
    return this.routes.map((e, t) => {
      if (this.routeMatchesSelection(e)) return f;
      const i = this.routePoints(e);
      if (!i) return f;
      const r = i.map(([o, n]) => `${o * X},${n * X}`).join(" ");
      return M`
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
          x=${i[Math.floor(i.length / 2)][0] * X}
          y=${i[Math.floor(i.length / 2)][1] * X - 18}
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
    const r = i.map((s) => ({ step: s, point: this.resolveStep(s) })).filter((s) => !!s.point), n = [e, ...r.map((s) => s.point), t].map(([s, a]) => `${s * X},${a * X}`).join(" ");
    return M`
      <polyline points=${n} class="route-line" fill="none" vector-effect="non-scaling-stroke"></polyline>
      <g transform=${`translate(${e[0] * X} ${e[1] * X})`}><circle class="endpoint" r="14"></circle></g>
      ${r.map(({ step: s, point: a }, l) => M`
        <g transform=${`translate(${a[0] * X} ${a[1] * X})`}>
          <circle class=${s.node_id ? "waypoint shared-waypoint" : "waypoint"} r="11"></circle>
          <text y="-20" text-anchor="middle">${l + 1}</text>
        </g>
      `)}
      <g transform=${`translate(${t[0] * X} ${t[1] * X})`}><circle class="endpoint" r="14"></circle></g>
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
_.styles = j`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading,.node-heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b,.node-heading>span{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.node-manager{display:grid;gap:9px;padding:12px;border:1px solid var(--divider-color);border-radius:12px}.node-heading>div,.node-copy{display:grid;gap:2px}.node-heading small,.node-copy small{color:var(--secondary-text-color);font-weight:500}.node-list{display:grid;gap:6px}.node-item{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:9px;background:var(--secondary-background-color);border:1px solid transparent}.node-item.blocked{border-color:var(--error-color,#db4437)}.node-copy{flex:1}.node-actions,.node-edit-actions{display:flex;gap:6px;flex-wrap:wrap}.node-dot{width:13px;height:13px;border-radius:50%;background:var(--primary-color,#03a9f4)}.node-dot.junction{border-radius:3px}.node-dot.waypoint{background:var(--secondary-text-color)}.node-status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.node-status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.node-status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.node-draft,.node-edit{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;align-items:end;padding:10px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.node-draft label,.node-edit label{display:grid;gap:5px;font-size:.82rem}.node-draft label small,.node-edit label small{color:var(--secondary-text-color);font-size:.74rem}.node-draft input,.node-draft select,.node-edit input,.node-edit select{width:100%;box-sizing:border-box;padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.node-edit-actions{grid-column:1/-1}.node-add{justify-self:start}.route-list{display:grid;gap:7px}.route-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid transparent}.route-item.selected{border-color:var(--primary-color,#03a9f4);box-shadow:0 0 0 1px var(--primary-color,#03a9f4) inset}.route-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.route-copy{display:grid;gap:2px}.route-copy small{color:var(--secondary-text-color);font-weight:500}.route-empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:default}.map-frame.drawing svg{cursor:crosshair}.network-route{stroke:var(--secondary-text-color);stroke-opacity:.36;stroke-width:4;stroke-dasharray:10 10;pointer-events:stroke;cursor:pointer}.network-route:hover{stroke:var(--primary-color,#03a9f4);stroke-opacity:.8;stroke-width:7}.network-number{font-size:22px;font-weight:800;fill:var(--secondary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:7;stroke-linejoin:round;pointer-events:none}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:6;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-waypoint{fill:var(--primary-color,#03a9f4);stroke:white}.shared-node circle{fill:var(--card-background-color);stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-node.blocked circle{stroke:var(--error-color,#db4437)}.shared-node.selectable{cursor:pointer}.shared-node.selectable:hover circle{fill:var(--primary-color,#03a9f4)}.shared-node text{font-size:20px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6;stroke-linejoin:round;pointer-events:none}.shared-node .usage{font-size:16px;stroke:none;fill:var(--primary-text-color)}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.mini{padding:6px 8px;font-size:.76rem}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors,.node-draft,.node-edit{grid-template-columns:1fr}.node-edit-actions{grid-column:auto}.node-draft button{justify-self:start}.node-actions{flex-direction:column}}
  `;
K([
  C({ attribute: !1 })
], _.prototype, "config", 2);
K([
  C({ attribute: !1 })
], _.prototype, "hass", 2);
K([
  v()
], _.prototype, "fromRoom", 2);
K([
  v()
], _.prototype, "toRoom", 2);
K([
  v()
], _.prototype, "drawing", 2);
K([
  v()
], _.prototype, "pending", 2);
K([
  v()
], _.prototype, "placingNode", 2);
K([
  v()
], _.prototype, "draftNodeName", 2);
K([
  v()
], _.prototype, "draftNodeKind", 2);
K([
  v()
], _.prototype, "draftNodeEntity", 2);
K([
  v()
], _.prototype, "draftNodeOpenStates", 2);
K([
  v()
], _.prototype, "editingNodeId", 2);
K([
  v()
], _.prototype, "editingNodeName", 2);
K([
  v()
], _.prototype, "editingNodeKind", 2);
K([
  v()
], _.prototype, "editingNodeEntity", 2);
K([
  v()
], _.prototype, "editingNodeOpenStates", 2);
_ = K([
  T("ha-explorer-route-editor")
], _);
var bs = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, pe = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ys(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && bs(t, i, o), o;
};
const De = 1e3;
let ne = class extends q {
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
      return M`<line
        x1=${n[0] * De}
        y1=${n[1] * De}
        x2=${s[0] * De}
        y2=${s[1] * De}
        class=${l}
        vector-effect="non-scaling-stroke"
      ></line>`;
    }), i = this.endpointOptions().filter((r) => r.point).map((r) => {
      const [o, n] = r.point, s = r.kind === "node" ? this.routeNodes.find((d) => d.id === r.id) : void 0, a = s ? _e(s, (d) => this.entityState(d)) : void 0, l = !!(a?.conditional && !a.active);
      return M`
          <g transform=${`translate(${o * De} ${n * De})`}>
            <circle class=${r.kind === "room" ? "graph-room" : l ? "graph-node blocked" : "graph-node"} r=${r.kind === "room" ? "11" : "13"}></circle>
          </g>
        `;
    });
    return M`${t}${i}`;
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
ne.styles = j`
    :host{display:block}.graph-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors,.condition-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label,.condition-fields label,.condition-edit label{display:grid;gap:6px;font-size:.85rem}.selectors select,input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.condition-draft,.condition-edit{display:grid;gap:10px;padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.condition-title{display:grid;gap:2px}.condition-title span,.condition-fields small{color:var(--secondary-text-color);font-size:.8rem}.condition-edit{grid-template-columns:1fr 1fr auto;align-items:end}.condition-actions,.edge-actions{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.add{justify-self:start}.danger{background:var(--error-color,#db4437);color:white}.mini{padding:7px 9px;font-size:.78rem}.edge-list{display:grid;gap:7px}.edge-item{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;background:var(--secondary-background-color);border:1px solid transparent}.edge-item.blocked{border-color:var(--error-color,#db4437)}.edge-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem;flex:none}.edge-copy{display:grid;gap:2px;min-width:0;flex:1}.edge-copy small{color:var(--secondary-text-color)}.status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-edge{stroke:var(--primary-color,#03a9f4);stroke-width:4;stroke-opacity:.72}.graph-edge.conditional{stroke-dasharray:9 7}.graph-edge.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.graph-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.graph-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.graph-node.blocked{stroke:var(--error-color,#db4437)}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;gap:6px;align-items:center}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--primary-color,#03a9f4)}.legend .line.conditional{border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:600px){.selectors,.condition-fields,.condition-edit{grid-template-columns:1fr}.edge-item{align-items:flex-start}.edge-actions{flex-direction:column}}
  `;
pe([
  C({ attribute: !1 })
], ne.prototype, "config", 2);
pe([
  C({ attribute: !1 })
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
  T("ha-explorer-route-graph-editor")
], ne);
var vs = Object.defineProperty, xs = Object.getOwnPropertyDescriptor, ut = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? xs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && vs(t, i, o), o;
};
const oe = 1e3;
let ze = class extends q {
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
      return e.kind === "room" ? Ae(this.config, e.id) : this.routeNodes.find((t) => t.id === e.id)?.point;
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
      return M`
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
    return M`
      <polyline
        points=${t}
        class=${`preview-line ${e.source}`}
        fill="none"
        vector-effect="non-scaling-stroke"
      ></polyline>
      ${e.hops.map((i, r) => M`
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
      const o = Ae(this.config, r);
      return o ? M`
        <g transform=${`translate(${o[0] * oe} ${o[1] * oe})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    }), i = e.disconnectedNodeIds.map((r) => {
      const o = this.routeNodes.find((n) => n.id === r);
      return o ? M`
        <g transform=${`translate(${o.point[0] * oe} ${o.point[1] * oe})`}>
          <circle class="disconnected" r="20"></circle>
          <text class="warning-mark" text-anchor="middle" dominant-baseline="middle">!</text>
        </g>
      ` : f;
    });
    return M`${t}${i}`;
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
ze.styles = j`
    :host{display:block}.diagnostics{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.route-result{display:grid;gap:8px;padding:12px;border:1px solid var(--divider-color);border-radius:11px}.route-result.manual{border-left:5px solid var(--warning-color,#ff9800)}.route-result.graph{border-left:5px solid var(--primary-color,#03a9f4)}.route-result.fallback{border-left:5px solid var(--secondary-text-color)}.route-result-top{display:flex;justify-content:space-between;gap:12px;align-items:center}.route-result-top span{color:var(--secondary-text-color);font-size:.82rem}.route-result p{margin:0;color:var(--secondary-text-color);font-size:.88rem;line-height:1.4}.hop-list{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:.82rem}.hop-list span{display:flex;gap:6px;align-items:center}.hop-list b{padding:4px 7px;border-radius:999px;background:var(--secondary-background-color)}.hop-list i{font-style:normal;color:var(--secondary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-context{stroke:var(--secondary-text-color);stroke-width:3;stroke-opacity:.28}.graph-context.conditional{stroke-dasharray:8 8;stroke:var(--primary-color,#03a9f4);stroke-opacity:.5}.graph-context.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.preview-line{stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.preview-line.manual{stroke:var(--warning-color,#ff9800)}.preview-line.graph{stroke:var(--primary-color,#03a9f4)}.preview-line.fallback{stroke:var(--secondary-text-color);stroke-dasharray:16 10}.preview-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.preview-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.preview-point{fill:white;stroke:var(--warning-color,#ff9800);stroke-width:5}.preview-number{font-size:22px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6}.disconnected{fill:var(--error-color,#db4437);fill-opacity:.18;stroke:var(--error-color,#db4437);stroke-width:4;stroke-dasharray:5 4}.warning-mark{font-size:24px;font-weight:900;fill:var(--error-color,#db4437)}.diagnostic-heading{display:grid;gap:2px}.diagnostic-heading span{color:var(--secondary-text-color);font-size:.8rem}.diagnostic-summary,.live-summary{display:grid;gap:3px;padding:11px 12px;border-radius:10px;border:1px solid var(--divider-color)}.diagnostic-summary span,.live-summary span{color:var(--secondary-text-color);font-size:.84rem}.diagnostic-summary.ok,.live-summary.ok{border-left:5px solid var(--success-color,#4caf50)}.diagnostic-summary.warning{border-left:5px solid var(--warning-color,#ff9800)}.diagnostic-summary.neutral{border-left:5px solid var(--secondary-text-color)}.live-summary.blocked{border-left:5px solid var(--error-color,#db4437)}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.metric-grid div{display:grid;gap:2px;padding:10px;border-radius:9px;background:var(--secondary-background-color)}.metric-grid strong{font-size:1.15rem}.metric-grid span{color:var(--secondary-text-color);font-size:.75rem}.issue{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(255,152,0,.1);border:1px solid rgba(255,152,0,.3)}.issue span{color:var(--secondary-text-color);font-size:.82rem;line-height:1.4}.blocked-list{display:grid;gap:7px}.blocked-item{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(219,68,55,.08);border:1px solid rgba(219,68,55,.25)}.blocked-item span,.blocked-item small{color:var(--secondary-text-color);font-size:.8rem}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;align-items:center;gap:6px}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--secondary-text-color)}.legend .line.conditional{border-top-color:var(--primary-color,#03a9f4);border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:760px){.metric-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.selectors{grid-template-columns:1fr}.route-result-top{align-items:flex-start;flex-direction:column}}
  `;
ut([
  C({ attribute: !1 })
], ze.prototype, "config", 2);
ut([
  C({ attribute: !1 })
], ze.prototype, "hass", 2);
ut([
  v()
], ze.prototype, "fromRoom", 2);
ut([
  v()
], ze.prototype, "toRoom", 2);
ze = ut([
  T("ha-explorer-route-diagnostics")
], ze);
var ws = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, xi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ks(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ws(t, i, o), o;
};
const As = { basic: 0, rooms: 1, presences: 2 };
let oi = class extends L {
  updated(e) {
    super.updated(e), e.has("config") && this.config && this.setConfig(this.config);
  }
  render() {
    return this.renderRoomDrawingEditor();
  }
};
xi([
  C({ attribute: !1 })
], oi.prototype, "config", 2);
oi = xi([
  T("ha-explorer-room-tools")
], oi);
let ni = class extends ce {
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
    const i = As[t];
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
ni.styles = j`${ce.styles}:host{overflow-anchor:none}.setup-section,.advanced-section{scroll-margin-top:16px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden;background:var(--card-background-color);transition:border-color 180ms ease,box-shadow 180ms ease}.setup-section{margin-bottom:12px}.setup-section>summary,.advanced-section>summary{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:54px;padding:12px 14px;cursor:pointer;font-weight:700}.setup-section>summary::-webkit-details-marker,.advanced-section>summary::-webkit-details-marker{display:none}.setup-section>summary::after,.advanced-section>summary::after{content:"⌄";margin-left:4px;color:var(--secondary-text-color);transition:transform 160ms ease}.setup-section[open]>summary::after,.advanced-section[open]>summary::after{transform:rotate(180deg)}.setup-content{padding:0 10px 10px;overflow-anchor:none}.setup-content>*{margin-top:0}.item-card:not(.item-open)>:not(.item-heading){display:none!important}.item-heading{cursor:pointer;user-select:none}.item-heading::after{content:"⌄";flex:none;color:var(--secondary-text-color);transition:transform 160ms ease}.item-card.item-open .item-heading::after{transform:rotate(180deg)}.advanced-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:16px 2px 8px;color:var(--secondary-text-color)}.advanced-heading>div{display:grid;gap:2px}.advanced-heading span{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}.advanced-heading strong{color:var(--primary-text-color);font-size:.92rem}.advanced-heading small{font-size:.75rem}.advanced-tools{display:grid;gap:9px;padding-bottom:8px}.advanced-hint{margin-left:auto;color:var(--secondary-text-color);font-size:.75rem;font-weight:500;text-align:right}.advanced-content{padding:0 10px 10px;overflow-anchor:none}.advanced-content>*{margin-top:0}.ux-focus{border-color:var(--primary-color,#03a9f4)!important;box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color,#03a9f4) 18%,transparent)}@media(max-width:600px){.advanced-heading{align-items:flex-start;flex-direction:column}.setup-section>summary,.advanced-section>summary{align-items:center;min-height:74px}.advanced-section>summary>span:first-child{flex:1;min-width:0}.advanced-hint{flex:0 0 48%;max-width:48%}}`;
ni = xi([
  T("ha-explorer-ha-editor")
], ni);
function or(e) {
  return Math.min(1, Math.max(0, e));
}
function Nr(e) {
  return e.trim().toLocaleLowerCase().replace(/[\s_-]+/g, " ");
}
function ti(e, t) {
  if (t.length < 3) return !1;
  let i = !1;
  const [r, o] = e;
  for (let n = 0, s = t.length - 1; n < t.length; s = n++) {
    const [a, l] = t[n], [d, c] = t[s];
    l > o != c > o && r < (d - a) * (o - l) / (c - l || Number.EPSILON) + a && (i = !i);
  }
  return i;
}
function Ss(e) {
  if (!e.length) return [0.5, 0.5];
  const [t, i] = e.reduce(
    ([r, o], [n, s]) => [r + n, o + s],
    [0, 0]
  );
  return [t / e.length, i / e.length];
}
function Cs(e) {
  if (e.length < 3) return;
  let t = 0, i = 0, r = 0;
  for (let o = 0; o < e.length; o += 1) {
    const [n, s] = e[o], [a, l] = e[(o + 1) % e.length], d = n * l - a * s;
    t += d, i += (n + a) * d, r += (s + l) * d;
  }
  if (!(Math.abs(t) < Number.EPSILON))
    return [i / (3 * t), r / (3 * t)];
}
function qe(e) {
  return { x: or(e.x), y: or(e.y) };
}
function Es(e) {
  return [e.id, e.area_id, e.name, ...e.aliases ?? []].filter((t) => typeof t == "string" && t.trim().length > 0).map(Nr);
}
function Mr(e, t) {
  if (!t?.trim()) return;
  const i = Nr(t);
  return e.find((r) => Es(r).includes(i));
}
function $s(e) {
  if (e.presence_anchor) return qe(e.presence_anchor);
  if (e.label) return qe(e.label);
  const t = Cs(e.points);
  if (t && ti(t, e.points))
    return qe({ x: t[0], y: t[1] });
  const i = Ss(e.points);
  if (ti(i, e.points))
    return qe({ x: i[0], y: i[1] });
  if (e.points.length) {
    const r = e.points.map(([s]) => s), o = e.points.map(([, s]) => s), n = [
      (Math.min(...r) + Math.max(...r)) / 2,
      (Math.min(...o) + Math.max(...o)) / 2
    ];
    return ti(n, e.points) ? qe({ x: n[0], y: n[1] }) : qe({ x: e.points[0][0], y: e.points[0][1] });
  }
  return { x: 0.5, y: 0.5 };
}
const si = /* @__PURE__ */ new Map();
function zt(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function nr(e, t) {
  return Math.max(1, Math.round(zt(e) ?? t));
}
function Ps(e) {
  const t = Math.max(0.05, zt(e.max_height_m) ?? 0.75);
  return {
    heightAttribute: e.height_attribute?.trim() || "maxz",
    targetIdAttribute: e.target_id_attribute?.trim() || "target_id",
    timestampAttribute: e.timestamp_attribute?.trim() || "timestamp",
    maxHeight: t,
    releaseHeight: Math.max(t + 0.05, zt(e.release_height_m) ?? t + 0.2),
    confirmationUpdates: nr(e.confirmation_updates, 3),
    releaseUpdates: nr(e.release_updates, 2)
  };
}
function Ns() {
  si.clear();
}
function Ms(e, t) {
  const i = e.shelly_pet_detection;
  if (!i?.enabled || !t) return e;
  const r = Ps(i), o = zt(t.attributes[r.heightAttribute]);
  if (o === void 0) return { ...e, visible: !1 };
  const n = t.attributes[r.targetIdAttribute], s = n === void 0 ? t.entity_id : String(n), a = t.attributes[r.timestampAttribute], l = a === void 0 ? `${s}:${o}:${t.attributes.x ?? ""}:${t.attributes.y ?? ""}` : `${s}:${String(a)}`;
  let d = si.get(e.id);
  return (!d || d.targetId !== s) && (d = { targetId: s, low: 0, high: 0, confirmed: !1 }, si.set(e.id, d)), d.lastSample === l ? { ...e, type: "pet", visible: e.visible !== !1 && d.confirmed } : (d.lastSample = l, o <= r.maxHeight ? (d.low += 1, d.high = 0, d.low >= r.confirmationUpdates && (d.confirmed = !0)) : o >= r.releaseHeight ? (d.high += 1, d.low = 0, d.high >= r.releaseUpdates && (d.confirmed = !1)) : (d.low = 0, d.high = 0), { ...e, type: "pet", visible: e.visible !== !1 && d.confirmed });
}
const Rs = ["unknown", "unavailable", "not_detected"], zs = /* @__PURE__ */ new Set(["", "unknown", "unavailable", "none", "null"]);
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
function Ts(e, t) {
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
  return zs.has(t.toLowerCase()) ? void 0 : t;
}
function Os(e, t, i) {
  if (e.room_entity) {
    const r = i.states[e.room_entity];
    return r ? sr(e.room_attribute ? te(r, e.room_attribute) : r.state) : void 0;
  }
  if (t)
    return sr(te(t, e.room_attribute ?? "explorer_room"));
}
function js(e) {
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
  const l = i[n], d = r[n], c = o[n], p = (l * (r.sensor_y - o.sensor_y) + d * (o.sensor_y - i.sensor_y) + c * (i.sensor_y - r.sensor_y)) / a, u = (l * (o.sensor_x - r.sensor_x) + d * (i.sensor_x - o.sensor_x) + c * (r.sensor_x - i.sensor_x)) / a, g = (l * (r.sensor_x * o.sensor_y - o.sensor_x * r.sensor_y) + d * (o.sensor_x * i.sensor_y - i.sensor_x * o.sensor_y) + c * (i.sensor_x * r.sensor_y - r.sensor_x * i.sensor_y)) / a;
  return p * e + u * t + g;
}
function Is(e, t, i) {
  const r = e.physical_meters, o = ge(r?.width), n = ge(r?.height), s = js(e);
  if (!o || !n || o <= 0 || n <= 0 || !s) return {};
  const a = r?.flip_x ? o - t : t, l = r?.flip_y ? n - i : i;
  let d = Math.min(1, Math.max(0, a / o)), c = Math.min(1, Math.max(0, l / n));
  const p = r?.position_calibration;
  return p?.c ? (d = lr(a, l, p.a, p.b, p.c, "room_x", d), c = lr(a, l, p.a, p.b, p.c, "room_y", c)) : p && (d = ar(a, p.a.sensor_x, p.b.sensor_x, p.a.room_x, p.b.room_x, d), c = ar(l, p.a.sensor_y, p.b.sensor_y, p.a.room_y, p.b.room_y, c)), d = Math.min(1, Math.max(0, d)), c = Math.min(1, Math.max(0, c)), { x: s.minX + d * (s.maxX - s.minX), y: s.minY + c * (s.maxY - s.minY) };
}
function vt(e, t, i) {
  const r = Mr(t, i ?? e.room_id);
  if (r) {
    const s = $s(r);
    return { ...e, x: s.x, y: s.y, room_id: r.id };
  }
  const o = we(e.x), n = we(e.y);
  return o === void 0 || n === void 0 ? { ...e, x: o, y: n, visible: !1 } : { ...e, x: o, y: n };
}
function Ds(e, t, i, r, o, n) {
  if (!i) return { x: we(e.x), y: we(e.y) };
  const s = t.coordinate_space === "meters" || t.coordinate_space === "room_meters", a = t.x_attribute ?? (s ? "map_x" : "explorer_x"), l = t.y_attribute ?? (s ? "map_y" : "explorer_y");
  if (t.coordinate_space === "room_meters") {
    const d = ge(te(i, a)), c = ge(te(i, l)), p = Mr(r, o ?? e.room_id);
    return d === void 0 || c === void 0 || !p ? {} : { ...Is(p, d, c), roomId: p.id };
  }
  if (t.coordinate_space === "meters") {
    const d = ge(te(i, a)), c = ge(te(i, l)), p = ge(n?.width), u = ge(n?.height);
    return d === void 0 || c === void 0 || !p || !u || p <= 0 || u <= 0 ? {} : { x: we(d / p), y: we(c / u) };
  }
  return { x: we(te(i, a), e.x), y: we(te(i, l), e.y) };
}
function qs(e, t, i = [], r) {
  const o = e.entity_binding;
  if (!o || !t) return vt(e, i);
  const n = o.entity ? t.states[o.entity] : void 0, s = o.position_entity ?? o.entity, a = s ? t.states[s] : void 0;
  if (o.entity && !n) return { ...vt(e, i), visible: !1 };
  if (o.position_entity && !a) return { ...vt(e, i), visible: !1 };
  const l = o.hidden_states ?? Rs, d = n ? l.includes(n.state) : !1, c = a && a !== n ? l.includes(a.state) : !1, p = te(n, o.visible_attribute), u = d || c ? !1 : Ts(p, e.visible ?? !0), g = Os(o, n, t) ?? e.room_id, b = Ds(e, o, a, i, g, r), m = { ...e, x: b.x, y: b.y, room_id: b.roomId ?? e.room_id, name: e.name ?? yt(te(n, o.name_attribute ?? "friendly_name")), avatar: e.avatar ?? yt(te(n, o.avatar_attribute ?? "entity_picture")), icon: e.icon ?? (o.icon_attribute ? yt(te(n, o.icon_attribute)) : void 0), color: e.color ?? yt(te(n, o.color_attribute ?? "explorer_color")), visible: u }, y = o.coordinate_space === "room_meters" ? m.x === void 0 || m.y === void 0 ? { ...m, visible: !1 } : m : vt(m, i, g);
  return Ms(y, a);
}
function Ls(e, t, i = [], r) {
  return e.map((o) => qs(o, t, i, r));
}
const Be = /* @__PURE__ */ new Map(), Fs = 0.22, Bs = 0.16, Hs = 3e4, _s = 0.025, Vs = 0.018;
function Tt(e) {
  return Number.isFinite(e.x) && Number.isFinite(e.y) ? { x: e.x, y: e.y } : void 0;
}
function ai(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function Fe(e) {
  return e.entity_binding?.entity ?? e.id;
}
function et(e) {
  return e.entity_binding?.position_entity;
}
function Rr(e) {
  return e.previous ? { x: e.point.x + (e.point.x - e.previous.x), y: e.point.y + (e.point.y - e.previous.y) } : e.point;
}
function Ks(e, t) {
  const i = Tt(t), r = ai(e.point, i), o = ai(Rr(e), i), n = e.target && e.target === et(t) ? _s : 0;
  return { candidate: t, distance: r, score: Math.min(r, o * 0.82) - n };
}
function dr(e, t, i) {
  const r = Fe(e), o = Tt(t);
  if (!o) return;
  const n = Be.get(r);
  Be.set(r, { point: o, previous: n?.point, target: et(t), seenAt: i });
}
function Gs(e, t = Date.now()) {
  for (const [a, l] of Be) t - l.seenAt > Hs && Be.delete(a);
  const i = e.filter((a) => (a.type ?? "person") === "person" && a.visible !== !1 && Tt(a) && et(a)), r = new Set(i), o = e.filter((a) => !r.has(a)), n = /* @__PURE__ */ new Map();
  for (const a of i) {
    const l = a.room_id ?? "__no_room__", d = n.get(l) ?? [];
    d.push(a), n.set(l, d);
  }
  const s = [];
  for (const a of n.values()) {
    if (a.length < 2) {
      for (const g of a)
        s.push(g), dr(g, g, t);
      continue;
    }
    const l = [...a], d = [...a].sort((g, b) => Fe(g).localeCompare(Fe(b))), c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set(), u = d.map((g) => {
      const b = Be.get(Fe(g));
      if (!b) return { identity: g, track: void 0, scores: [] };
      const m = l.map((y) => Ks(b, y)).sort((y, S) => y.score - S.score);
      return { identity: g, track: b, scores: m };
    }).sort((g, b) => (g.scores[0]?.score ?? 1 / 0) - (b.scores[0]?.score ?? 1 / 0));
    for (const g of u) {
      const { identity: b, track: m } = g;
      if (!m) continue;
      const y = g.scores.filter(($) => !p.has($.candidate));
      if (!y.length) continue;
      const S = y[0], k = y[1], w = S.distance <= Fs || ai(Rr(m), Tt(S.candidate)) <= Bs, E = !!k && k.score - S.score < Vs;
      w && !E && (c.set(Fe(b), S.candidate), p.add(S.candidate));
    }
    for (const g of d) {
      const b = Fe(g);
      let m = c.get(b);
      if (m || (m = l.find((S) => !p.has(S) && et(S) === et(g)), m && p.add(m)), m || (m = l.find((S) => !p.has(S)), m && p.add(m)), !m) {
        s.push(g);
        continue;
      }
      const y = { ...g, x: m.x, y: m.y, room_id: m.room_id, visible: m.visible };
      s.push(y), dr(g, m, t);
    }
  }
  return [...s, ...o];
}
function Zs() {
  Be.clear();
}
var Ws = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, Dt = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Us(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Ws(t, i, o), o;
};
const zr = "0.44.8";
let Ze = class extends q {
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
    Zs(), Ns(), this.config = {
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
    return h`<div class="enchanted-castle-surround" aria-hidden="true">
      <div
        class="castle-cinematic-backdrop"
        style=${`background-image: url("${po}")`}
      ></div>
      <div class="castle-window-lights castle-window-lights-a"></div>
      <div class="castle-window-lights castle-window-lights-b"></div>
      <div class="castle-cinematic-parchment"></div>
      <div class="castle-cinematic-vignette"></div>
    </div>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = this.defaultRoom(), i = Ls(
      this.config.presences ?? [],
      this.hass,
      t,
      this.config.floorplan_meters
    ), r = Gs(i), o = this.config.appearance?.theme ?? "classic", n = o === "enchanted_antique", s = this.isNight(), a = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.day_night?.intensity ?? 0.72)
    ), l = this.config.appearance?.compass ?? {}, d = this.config.appearance?.hide_source_text ?? !1, c = this.alarmState(), p = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.alarm?.intensity ?? 0.75)
    ), u = this.config.appearance?.occupancy?.enabled ?? !1, g = this.someoneHome(r), b = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.occupancy?.intensity ?? 0.65)
    ), m = this.config.appearance?.weather?.enabled ?? !1, y = this.weatherState(), S = s || y === "clear-night", k = this.weatherEffect(y), w = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.weather?.intensity ?? 0.6)
    ), E = m && [
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
    ].includes(y), $ = m && !S && ["sunny", "clear", "partlycloudy"].includes(y), A = y === "partlycloudy";
    return h`${this.renderCastleSurround()}<ha-card
      class=${`${n ? "enchanted" : "classic"}${S ? " moonlight" : ""}${$ ? " sunlight" : ""}${A ? " partly-cloudy" : ""}${E ? " has-clouds" : ""}${u ? g ? " occupied" : " empty-house" : ""}${m && k !== "clear" ? ` weather-${k}` : ""}${m ? ` state-${y}` : ""}${c === "armed" ? " alarm-armed" : ""}${c === "triggered" ? " alarm-triggered" : ""}${this.preview ? " preview" : ""}`}
      style=${`--moon-intensity:${a};--alarm-intensity:${p};--occupancy-intensity:${b};--weather-intensity:${w}`}
      ><header>
        <div>
          <span
            >${c === "triggered" ? "⚠ Alarm Triggered" : c === "armed" ? "✦ Map Secured" : y === "partlycloudy" ? S ? "☾ Partly Clouded Map" : "☀ Partly Clouded Map" : y === "clear-night" ? "☾ Clear Night Map" : k === "exceptional" ? "⚠ Exceptional Weather" : k === "wind" ? "➳ Wind over the Map" : k === "storm" ? "⛈ Storm over the Map" : k === "rain" ? "☂ Rain over the Map" : k === "snow" ? "❄ Snow over the Map" : k === "fog" ? "◇ Mist over the Map" : k === "cloudy" ? "☁ Clouded Map" : $ ? "☀ Sunlit Map" : u && g ? "✦ Someone is Home" : u ? "◇ Empty House" : S ? "Moonlight Explorer" : n ? "Enchanted Explorer" : "Explorer map"}</span
          >
          <h1>${this.config.title}</h1>
        </div>
        <small>Enchanted Atmosphere · v${zr}</small>
      </header>
      <div class="map-stage">
        <div class="weather-flash"></div>
        <div class="sun-overlay"></div>
        <div class="sun-disc"></div>
        <explorer-source-clean-canvas
          .theme=${o}
          .hideSourceText=${d}
          .weatherEffect=${m ? k : "clear"}
          .weatherState=${y}
          .weatherIntensity=${w}
          .weatherNight=${S}
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
        ${A ? this.renderCelestialCloud() : f}
        <div class="night-vignette"></div>
        <div class="alarm-overlay"></div>
        <div class="alarm-vignette"></div></div
    ></ha-card>`;
  }
};
Ze.styles = j`
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
      .castle-cinematic-backdrop,
      .castle-window-lights,
      .castle-cinematic-parchment,
      .castle-cinematic-vignette {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .castle-cinematic-backdrop {
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.98;
        filter:
          sepia(0.13)
          saturate(0.84)
          brightness(0.86)
          contrast(1.12);
        transform: scale(1.012);
        transform-origin: center bottom;
      }
      .castle-window-lights {
        z-index: 1;
        background-repeat: no-repeat;
        mix-blend-mode: screen;
        filter: drop-shadow(0 0 3px rgba(242, 171, 64, 0.28));
      }
      .castle-window-lights-a {
        background:
          radial-gradient(circle at 7.6% 35%, rgba(255, 235, 164, 0.98) 0 1px, rgba(239, 165, 60, 0.72) 1.5px 2.4px, transparent 6px),
          radial-gradient(circle at 11.4% 31%, rgba(255, 229, 145, 0.94) 0 1px, rgba(236, 158, 52, 0.68) 1.5px 2.3px, transparent 5.5px),
          radial-gradient(circle at 15.9% 38%, rgba(255, 235, 164, 0.96) 0 1px, rgba(239, 165, 60, 0.7) 1.5px 2.4px, transparent 6px),
          radial-gradient(circle at 21.1% 32%, rgba(255, 226, 137, 0.92) 0 1px, rgba(230, 149, 44, 0.66) 1.5px 2.2px, transparent 5.5px),
          radial-gradient(circle at 25.2% 27%, rgba(255, 237, 171, 0.96) 0 1px, rgba(241, 172, 64, 0.72) 1.5px 2.5px, transparent 6px),
          radial-gradient(circle at 9.6% 55%, rgba(255, 226, 137, 0.9) 0 1px, rgba(230, 149, 44, 0.62) 1.5px 2.2px, transparent 5px),
          radial-gradient(circle at 82.6% 31%, rgba(255, 235, 164, 0.98) 0 1px, rgba(239, 165, 60, 0.72) 1.5px 2.4px, transparent 6px),
          radial-gradient(circle at 88.7% 26%, rgba(255, 229, 145, 0.94) 0 1px, rgba(236, 158, 52, 0.68) 1.5px 2.3px, transparent 5.5px),
          radial-gradient(circle at 93.2% 34%, rgba(255, 235, 164, 0.96) 0 1px, rgba(239, 165, 60, 0.7) 1.5px 2.4px, transparent 6px),
          radial-gradient(circle at 96.4% 39%, rgba(255, 226, 137, 0.92) 0 1px, rgba(230, 149, 44, 0.66) 1.5px 2.2px, transparent 5.5px),
          radial-gradient(circle at 84.7% 54%, rgba(255, 237, 171, 0.94) 0 1px, rgba(241, 172, 64, 0.68) 1.5px 2.4px, transparent 5.5px),
          radial-gradient(circle at 91.5% 48%, rgba(255, 226, 137, 0.9) 0 1px, rgba(230, 149, 44, 0.62) 1.5px 2.2px, transparent 5px);
        animation: explorerCastleLightsA 8.6s ease-in-out infinite alternate;
      }
      .castle-window-lights-b {
        background:
          radial-gradient(circle at 5.2% 42%, rgba(255, 224, 132, 0.9) 0 1px, rgba(231, 151, 47, 0.62) 1.5px 2.2px, transparent 5px),
          radial-gradient(circle at 13.8% 45%, rgba(255, 236, 168, 0.94) 0 1px, rgba(239, 166, 59, 0.68) 1.5px 2.4px, transparent 5.5px),
          radial-gradient(circle at 18.9% 35%, rgba(255, 227, 140, 0.92) 0 1px, rgba(233, 154, 48, 0.64) 1.5px 2.3px, transparent 5px),
          radial-gradient(circle at 23.3% 51%, rgba(255, 235, 162, 0.9) 0 1px, rgba(238, 162, 55, 0.62) 1.5px 2.3px, transparent 5.5px),
          radial-gradient(circle at 77.2% 39%, rgba(255, 224, 132, 0.9) 0 1px, rgba(231, 151, 47, 0.62) 1.5px 2.2px, transparent 5px),
          radial-gradient(circle at 80.4% 46%, rgba(255, 236, 168, 0.94) 0 1px, rgba(239, 166, 59, 0.68) 1.5px 2.4px, transparent 5.5px),
          radial-gradient(circle at 86.1% 37%, rgba(255, 227, 140, 0.92) 0 1px, rgba(233, 154, 48, 0.64) 1.5px 2.3px, transparent 5px),
          radial-gradient(circle at 90.1% 31%, rgba(255, 235, 162, 0.92) 0 1px, rgba(238, 162, 55, 0.64) 1.5px 2.3px, transparent 5.5px),
          radial-gradient(circle at 95.1% 28%, rgba(255, 229, 148, 0.9) 0 1px, rgba(235, 157, 51, 0.62) 1.5px 2.2px, transparent 5px),
          radial-gradient(circle at 97.2% 55%, rgba(255, 235, 162, 0.9) 0 1px, rgba(238, 162, 55, 0.62) 1.5px 2.3px, transparent 5.5px);
        animation: explorerCastleLightsB 10.8s ease-in-out -4.2s infinite alternate;
      }
      .castle-cinematic-parchment {
        background:
          radial-gradient(
            ellipse at 50% 35%,
            rgba(206, 166, 99, 0.12),
            transparent 57%
          ),
          repeating-linear-gradient(
            112deg,
            transparent 0 61px,
            rgba(229, 196, 133, 0.025) 62px 63px,
            transparent 64px 124px
          ),
          linear-gradient(
            180deg,
            rgba(111, 73, 35, 0.08),
            rgba(39, 24, 14, 0.2) 68%,
            rgba(5, 5, 6, 0.38)
          );
        mix-blend-mode: soft-light;
      }
      .castle-cinematic-vignette {
        background:
          linear-gradient(
            90deg,
            rgba(4, 5, 7, 0.26),
            transparent 20% 80%,
            rgba(4, 5, 7, 0.26)
          ),
          radial-gradient(
            ellipse at center,
            transparent 36%,
            rgba(4, 5, 7, 0.06) 65%,
            rgba(2, 3, 4, 0.36) 100%
          );
        box-shadow:
          inset 0 0 120px rgba(1, 2, 3, 0.42),
          inset 0 0 2px rgba(222, 191, 135, 0.24);
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
    @keyframes explorerCastleLightsA {
      0% { opacity: 0.26; }
      38% { opacity: 0.58; }
      72% { opacity: 0.4; }
      100% { opacity: 0.72; }
    }
    @keyframes explorerCastleLightsB {
      0% { opacity: 0.64; }
      43% { opacity: 0.34; }
      76% { opacity: 0.7; }
      100% { opacity: 0.42; }
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
      .castle-window-lights,
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
  C({ attribute: !1 })
], Ze.prototype, "hass", 2);
Dt([
  C({ type: Boolean, attribute: !1 })
], Ze.prototype, "preview", 2);
Dt([
  v()
], Ze.prototype, "config", 2);
Ze = Dt([
  T("ha-explorer-card")
], Ze);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-explorer-card",
  name: "Home Assistant Explorer",
  description: "An interactive SVG floor map for Home Assistant.",
  preview: !0
});
console.info(
  `%c HOME ASSISTANT EXPLORER %c v${zr} `,
  "color:white;background:#594431;font-weight:700;",
  "color:#594431;background:#d8c39b;font-weight:700;"
);
export {
  Ze as HaExplorerCard
};
//# sourceMappingURL=ha-explorer-card.js.map
