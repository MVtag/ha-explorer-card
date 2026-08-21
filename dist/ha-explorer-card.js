const xt = globalThis, li = xt.ShadowRoot && (xt.ShadyCSS === void 0 || xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ci = /* @__PURE__ */ Symbol(), Ai = /* @__PURE__ */ new WeakMap();
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
      r && (t = Ai.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Ai.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Br = (e) => new dr(typeof e == "string" ? e : e + "", void 0, ci), j = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, o, n) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new dr(i, e, ci);
}, Hr = (e, t) => {
  if (li) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), o = xt.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, e.appendChild(r);
  }
}, Si = li ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return Br(i);
})(e) : e;
const { is: Fr, defineProperty: Zr, getOwnPropertyDescriptor: Vr, getOwnPropertyNames: Kr, getOwnPropertySymbols: Wr, getPrototypeOf: Gr } = Object, It = globalThis, Ci = It.trustedTypes, Ur = Ci ? Ci.emptyScript : "", Xr = It.reactiveElementPolyfillSupport, $e = (e, t) => e, At = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ur : null;
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
} }, di = (e, t) => !Fr(e, t), Ei = { attribute: !0, type: String, converter: At, reflect: !1, useDefault: !1, hasChanged: di };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), It.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Be = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ei) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, r, i);
      o !== void 0 && Zr(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: o, set: n } = Vr(this.prototype, t) ?? { get() {
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
    if (this.hasOwnProperty($e("elementProperties"))) return;
    const t = Gr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($e("properties"))) {
      const i = this.properties, r = [...Kr(i), ...Wr(i)];
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
    return Hr(t, this.constructor.elementStyles), t;
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
Be.elementStyles = [], Be.shadowRootOptions = { mode: "open" }, Be[$e("elementProperties")] = /* @__PURE__ */ new Map(), Be[$e("finalized")] = /* @__PURE__ */ new Map(), Xr?.({ ReactiveElement: Be }), (It.reactiveElementVersions ??= []).push("2.1.2");
const pi = globalThis, Ni = (e) => e, St = pi.trustedTypes, Pi = St ? St.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, pr = "$lit$", ke = `lit$${Math.random().toFixed(9).slice(2)}$`, hr = "?" + ke, Yr = `<${hr}>`, Me = document, tt = () => Me.createComment(""), it = (e) => e === null || typeof e != "object" && typeof e != "function", hi = Array.isArray, Qr = (e) => hi(e) || typeof e?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, Je = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ri = /-->/g, Mi = />/g, Ee = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zi = /'/g, Ti = /"/g, ur = /^(?:script|style|textarea|title)$/i, gr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = gr(1), M = gr(2), se = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Di = /* @__PURE__ */ new WeakMap(), Pe = Me.createTreeWalker(Me, 129);
function mr(e, t) {
  if (!hi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pi !== void 0 ? Pi.createHTML(t) : t;
}
const Jr = (e, t) => {
  const i = e.length - 1, r = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Je;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, d, p = -1, u = 0;
    for (; u < l.length && (s.lastIndex = u, d = s.exec(l), d !== null); ) u = s.lastIndex, s === Je ? d[1] === "!--" ? s = Ri : d[1] !== void 0 ? s = Mi : d[2] !== void 0 ? (ur.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = Ee) : d[3] !== void 0 && (s = Ee) : s === Ee ? d[0] === ">" ? (s = o ?? Je, p = -1) : d[1] === void 0 ? p = -2 : (p = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? Ee : d[3] === '"' ? Ti : zi) : s === Ti || s === zi ? s = Ee : s === Ri || s === Mi ? s = Je : (s = Ee, o = void 0);
    const g = s === Ee && e[a + 1].startsWith("/>") ? " " : "";
    n += s === Je ? l + Yr : p >= 0 ? (r.push(c), l.slice(0, p) + pr + l.slice(p) + ke + g) : l + ke + (p === -2 ? a : g);
  }
  return [mr(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class rt {
  constructor({ strings: t, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let n = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Jr(t, i);
    if (this.el = rt.createElement(c, r), Pe.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = Pe.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(pr)) {
          const u = d[s++], g = o.getAttribute(p).split(ke), b = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? _r : b[1] === "?" ? eo : b[1] === "@" ? to : jt }), o.removeAttribute(p);
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
function Ze(e, t, i = e, r) {
  if (t === se) return t;
  let o = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = it(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = o : i._$Cl = o), o !== void 0 && (t = Ze(e, o._$AS(e, t.values), o, r)), t;
}
class $r {
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
        let c;
        l.type === 2 ? c = new dt(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new io(n, this, t)), this._$AV.push(c), l = r[++a];
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
    t = Ze(this, t, i), it(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== se && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qr(t) ? this.k(t) : this._(t);
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
      const n = new $r(o, this), s = n.u(this.options);
      n.p(i), this.T(s), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Di.get(t.strings);
    return i === void 0 && Di.set(t.strings, i = new rt(t)), i;
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
      const r = Ni(t).nextSibling;
      Ni(t).remove(), t = r;
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
    if (n === void 0) t = Ze(this, t, i, 0), s = !it(t) || t !== this._$AH && t !== se, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = Ze(this, a[r + l], i, l), c === se && (c = this._$AH[l]), s ||= !it(c) || c !== this._$AH[l], c === f ? t = f : t !== f && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _r extends jt {
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
    if ((t = Ze(this, t, i, 0) ?? f) === se) return;
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
    Ze(this, t);
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
let L = class extends Be {
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
L._$litElement$ = !0, L.finalized = !0, ui.litElementHydrateSupport?.({ LitElement: L });
const no = ui.litElementPolyfillSupport;
no?.({ LitElement: L });
(ui.litElementVersions ??= []).push("4.2.2");
const D = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const so = { attribute: !0, type: String, converter: At, reflect: !1, hasChanged: di }, ao = (e = so, t, i) => {
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
const po = "data:image/webp;base64,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", ho = "data:image/webp;base64,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";
const Ne = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, fr = (e) => (...t) => ({ _$litDirective$: e, values: t });
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
    if (super(t), this.it = f, t.type !== Ne.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
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
const uo = fr(ri), go = {
  light: ["on"],
  motion: ["on"],
  media: ["playing", "on"],
  opening: ["on", "open"],
  temperature: [],
  fireplace: ["on", "heating", "burning", "active"]
}, mo = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function yr(e) {
  return Math.min(1, Math.max(0, e));
}
function je(e) {
  return Math.min(1, Math.max(0, e));
}
function wt(e) {
  return [...go[e]];
}
function fo(e) {
  if (e.kind === "temperature") return [];
  const t = (e.active_states ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : wt(e.kind);
}
function _e(e, t) {
  const i = t?.position;
  return i && Number.isFinite(i.x) && Number.isFinite(i.y) ? { x: je(i.x), y: je(i.y) } : e.presence_anchor ? {
    x: je(e.presence_anchor.x),
    y: je(e.presence_anchor.y)
  } : e.points.length ? {
    x: je(e.points.reduce((r, o) => r + o[0], 0) / e.points.length),
    y: je(e.points.reduce((r, o) => r + o[1], 0) / e.points.length)
  } : { x: 0.5, y: 0.5 };
}
function bo(e) {
  const t = e?.brightness;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : yr(t / 255);
}
function Ii(e) {
  const t = e.intensity;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : yr(t);
}
function ji(e) {
  const t = e?.unit_of_measurement;
  return typeof t == "string" && t.trim() ? t.trim() : void 0;
}
function vr(e, t, i) {
  const r = e.entity?.trim(), o = fo(e);
  if (!r)
    return { index: t, reaction: e, active: !1, activeStates: o, intensity: 0, reason: "missing_entity" };
  const n = i?.(r);
  if (!n || mo.has(n.state.trim().toLowerCase()))
    return { index: t, reaction: e, active: !1, currentState: n?.state, activeStates: o, intensity: 0, reason: "entity_unavailable" };
  if (e.kind === "temperature") {
    const c = Number(n.state);
    return Number.isFinite(c) ? { index: t, reaction: e, active: !0, currentState: n.state, activeStates: o, intensity: 1, numericValue: c, unit: ji(n.attributes) } : { index: t, reaction: e, active: !1, currentState: n.state, activeStates: o, intensity: 0, unit: ji(n.attributes), reason: "state_inactive" };
  }
  const s = n.state.trim().toLowerCase(), a = o.map((c) => c.toLowerCase()).includes(s);
  let l = 0;
  return a && (e.kind === "light" ? l = bo(n.attributes) * Ii(e) : l = Ii(e)), {
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
var yo = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, De = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? vo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && yo(t, i, o), o;
};
function xo(e) {
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
const wo = {
  light: "💡",
  motion: "◉",
  media: "▶",
  opening: "↗",
  temperature: "°"
}, ko = {
  light: "Lys",
  motion: "Bevægelse",
  media: "TV / medie",
  opening: "Dør / vindue",
  temperature: "Temperatur"
};
let fe = class extends L {
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
      const n = xo(o.avatar);
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
          <span class=${`entity-icon ${i}`}>${wo[i]}</span>
          <span class="entity-copy">
            <strong>${this.entityName(t)}</strong>
            <small>${ko[i]} · ${this.statusText(e)}</small>
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
De([
  C({ attribute: !1 })
], fe.prototype, "room", 2);
De([
  C({ attribute: !1 })
], fe.prototype, "presences", 2);
De([
  C({ attribute: !1 })
], fe.prototype, "hass", 2);
De([
  v()
], fe.prototype, "pendingLights", 2);
De([
  v()
], fe.prototype, "pendingRoomAction", 2);
De([
  v()
], fe.prototype, "actionError", 2);
fe = De([
  D("explorer-room-panel")
], fe);
const x = 1e3;
function Bt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function Ao(e) {
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
function qi(e, t, i, r) {
  const o = t / e.zoom;
  return kt({
    zoom: t,
    x: i - (i - e.x) * o,
    y: r - (r - e.y) * o
  });
}
var So = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, U = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Co(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && So(t, i, o), o;
};
const Oi = { width: 16, height: 9, status: "idle" }, Eo = { person: "●", pet: "◆", robot: "■", vehicle: "▰", object: "✦" }, No = "script,foreignObject,iframe,object,embed,link,meta,audio,video,canvas";
function Li(e) {
  try {
    return new URL(e, window.location.href).pathname.toLowerCase().endsWith(".svg");
  } catch {
    return e.split(/[?#]/, 1)[0].toLowerCase().endsWith(".svg");
  }
}
function Bi(e) {
  if (!e) return;
  const t = e.trim().match(/^(-?\d+(?:\.\d+)?)/);
  if (!t) return;
  const i = Number(t[1]);
  return Number.isFinite(i) && i > 0 ? i : void 0;
}
function Po(e) {
  const t = e.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  return t?.length === 4 && t.every(Number.isFinite) && t[2] > 0 && t[3] > 0 ? { width: t[2], height: t[3] } : { width: Bi(e.getAttribute("width")) ?? 16, height: Bi(e.getAttribute("height")) ?? 9 };
}
function Hi(e) {
  return e.replace(/@import[^;]+;?/gi, "").replace(/url\(([^)]*)\)/gi, (t, i) => {
    const r = i.trim().replace(/^['"]|['"]$/g, "");
    return r.startsWith("#") ? `url(${r})` : "none";
  }).replace(/javascript\s*:/gi, "").replace(/expression\s*\(/gi, "");
}
function Ro(e) {
  const t = e.trim();
  return t === "" || t.startsWith("#") || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,/i.test(t);
}
function Mo(e) {
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
function zo(e) {
  const t = e.querySelector("parsererror"), i = e.documentElement;
  if (t || i.localName.toLowerCase() !== "svg") throw new Error("Filen indeholder ikke gyldig SVG-kode.");
  i.querySelectorAll(No).forEach((o) => o.remove());
  const r = [i, ...Array.from(i.querySelectorAll("*"))];
  for (const o of r)
    for (const n of Array.from(o.attributes)) {
      const s = n.name.toLowerCase(), a = n.value;
      if (s.startsWith("on")) {
        o.removeAttribute(n.name);
        continue;
      }
      if ((s === "href" || s === "xlink:href") && !Ro(a)) {
        o.removeAttribute(n.name);
        continue;
      }
      if (s === "style") {
        const l = Hi(a).trim();
        l ? o.setAttribute(n.name, l) : o.removeAttribute(n.name);
      }
    }
  return i.querySelectorAll("style").forEach((o) => {
    const n = Hi(o.textContent ?? "").trim();
    n ? o.textContent = n : o.remove();
  }), i.hasAttribute("xmlns") || i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i;
}
let Z = class extends L {
  constructor() {
    super(...arguments), this.image = "", this.rooms = [], this.presences = [], this.minZoom = 1, this.maxZoom = 6, this.initialZoom = 1, this.fitMode = "contain", this.viewport = { zoom: 1, x: 0, y: 0 }, this.metadata = { ...Oi }, this.imageSource = "", this.svgMarkup = "", this.loadError = "", this.activePointers = /* @__PURE__ */ new Map(), this.imageRequest = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.resetViewport();
  }
  updated(e) {
    e.has("rooms") && this.selectedRoom && (this.selectedRoom = this.rooms.find((t) => t.id === this.selectedRoom?.id)), (e.has("image") || e.has("fitMode") && this.image && Li(this.image)) && this.loadFloorplan();
  }
  async loadFloorplan() {
    const e = ++this.imageRequest;
    if (this.imageSource = "", this.svgMarkup = "", this.loadError = "", !this.image) {
      this.metadata = { ...Oi }, this.resetViewport();
      return;
    }
    this.metadata = { ...this.metadata, status: "loading" };
    try {
      Li(this.image) ? await this.loadSvgFloorplan(e) : await this.loadRasterFloorplan(e);
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
    const r = new DOMParser().parseFromString(i, "image/svg+xml"), o = zo(r), n = Po(o);
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
    this.viewport = { zoom: Bt(this.initialZoom, this.minZoom, this.maxZoom), x: 0, y: 0 };
  }
  toViewBoxPoint(e) {
    const t = this.renderRoot.querySelector("svg.floorplan");
    if (!t) return { x: x / 2, y: x / 2 };
    const i = t.getBoundingClientRect();
    return { x: (e.clientX - i.left) / i.width * x, y: (e.clientY - i.top) / i.height * x };
  }
  handleWheel(e) {
    e.preventDefault();
    const t = this.toViewBoxPoint(e), i = e.deltaY < 0 ? 1.12 : 1 / 1.12, r = Bt(this.viewport.zoom * i, this.minZoom, this.maxZoom);
    this.viewport = kt(qi(this.viewport, r, t.x, t.y), this.minZoom);
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
        const l = { x: (t.x + n.x) / 2, y: (t.y + n.y) / 2 }, c = { x: (o.x + n.x) / 2, y: (o.y + n.y) / 2 }, d = { x: (l.x - r.left) / r.width * x, y: (l.y - r.top) / r.height * x }, p = Bt(this.viewport.zoom * (a / s), this.minZoom, this.maxZoom), u = (c.x - l.x) / r.width * x, g = (c.y - l.y) / r.height * x, b = qi(this.viewport, p, d.x, d.y);
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
      const t = e.points.map(([c, d]) => `${c * x},${d * x}`).join(" "), i = e.id === this.selectedRoom?.id, r = e.points.reduce((c, d) => c + d[0], 0) / e.points.length, o = e.points.reduce((c, d) => c + d[1], 0) / e.points.length, n = (e.label?.x ?? r) * x, s = (e.label?.y ?? o) * x, a = e.color ?? "#03a9f4", l = Math.max(76, Math.min(190, (e.name?.length ?? 0) * 15 + 28));
      return M`<g class=${i ? "room selected" : "room"} @pointerdown=${(c) => c.stopPropagation()} @click=${(c) => this.selectRoom(c, e)}><polygon points=${t} fill=${a} fill-opacity=${i ? "0.34" : "0.18"} stroke=${a} stroke-opacity="0.9" stroke-width=${i ? "5" : "3"} vector-effect="non-scaling-stroke"></polygon>${e.name ? M`<rect class="room-label-mask" x=${n - l / 2} y=${s - 18} width=${l} height="36" rx="10"></rect><text class="room-label" x=${n} y=${s} text-anchor="middle" dominant-baseline="middle">${e.name}</text>` : f}</g>`;
    });
  }
  renderPresences() {
    return this.presences.filter((e) => e.visible !== !1).map((e, t) => {
      const i = e.type ?? "person", r = e.id === this.selectedPresence?.id, o = (e.x ?? 0.5) * x, n = (e.y ?? 0.5) * x, s = e.icon ?? Eo[i], a = Mo(e.avatar), l = e.color ?? "#03a9f4", c = r ? 31 : 25, d = c * 2, p = `presence-avatar-${t}`, u = r ? 58 : 52;
      return M`<g class=${r ? "presence selected" : "presence"} transform=${`translate(${o} ${n})`} @pointerdown=${(g) => g.stopPropagation()} @click=${(g) => this.selectPresence(g, e)}>${a ? M`<defs><clipPath id=${p}><circle r=${c - 3}></circle></clipPath></defs><circle class="presence-avatar-background" r=${c} fill=${l}></circle><image href=${a} x=${-c + 3} y=${-c + 3} width=${d - 6} height=${d - 6} preserveAspectRatio="xMidYMid slice" clip-path=${`url(#${p})`}></image><circle class="presence-border" r=${c} fill="none" stroke=${l} stroke-width=${r ? "5" : "3"} vector-effect="non-scaling-stroke"></circle>` : M`<circle class="presence-marker" r=${c} fill=${l} fill-opacity=${r ? "1" : ".88"}></circle><text class="presence-icon" text-anchor="middle" dominant-baseline="middle">${s}</text>`}<text class="presence-label" y=${u} text-anchor="middle">${e.name ?? e.id}</text></g>`;
    });
  }
  render() {
    const e = Ao(this.viewport);
    return h`<div class="viewport"><svg class="floorplan" viewBox="0 0 ${x} ${x}" @wheel=${this.handleWheel} @pointerdown=${this.handlePointerDown} @pointermove=${this.handlePointerMove} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerUp} @click=${() => {
      this.selectedRoom = void 0, this.selectedPresence = void 0;
    }}><rect class="backdrop" width=${x} height=${x}></rect><g class="scene" transform=${e}>${this.svgMarkup ? M`<g class="floorplan-source inline-source">${uo(this.svgMarkup)}</g>` : this.imageSource ? M`<image class="floorplan-source" href=${this.imageSource} x="0" y="0" width=${x} height=${x} preserveAspectRatio=${this.fitMode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}></image>` : f}<g class="rooms-scene">${this.renderRooms()}</g><g class="presences-scene">${this.renderPresences()}</g></g></svg>${this.loadError ? h`<div class="load-error">${this.loadError}</div>` : f}<button class="zoom-badge" type="button" title="Nulstil zoom og placering" aria-label="Nulstil zoom og placering" @click=${(t) => {
      t.stopPropagation(), this.resetViewport();
    }}>⌂ &nbsp; ${Math.round(this.viewport.zoom * 100)}%</button></div>${this.selectedRoom ? h`<explorer-room-panel .hass=${this.hass} .room=${this.selectedRoom} @close=${() => this.selectedRoom = void 0}></explorer-room-panel>` : f}`;
  }
};
Z.styles = j`:host{display:block;position:relative}.viewport{position:relative;overflow:hidden;background:var(--secondary-background-color);touch-action:none;max-height:var(--explorer-viewport-max-height,none)}svg.floorplan{display:block;width:100%;height:auto;aspect-ratio:1/1;user-select:none}.backdrop{fill:var(--card-background-color,#fff)}.floorplan-source{pointer-events:none}.inline-source{pointer-events:none}.room{cursor:pointer}.room polygon{transition:fill-opacity .18s ease,stroke-width .18s ease}.room-label-mask{fill:transparent;pointer-events:none}.room-label{font-size:18px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.presence{cursor:pointer}.presence-icon{font-size:24px;fill:#fff;pointer-events:none}.presence-label{font-size:16px;font-weight:700;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color,#fff);stroke-width:4px;stroke-linejoin:round;pointer-events:none}.zoom-badge{position:absolute;right:14px;bottom:14px;padding:8px 12px;border:0;border-radius:999px;background:rgba(0,0,0,.66);color:#fff;font:inherit;font-size:.8rem;font-weight:700;cursor:pointer;touch-action:manipulation}.zoom-badge:focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}.load-error{position:absolute;left:14px;right:14px;top:14px;padding:10px 12px;border-radius:10px;background:var(--error-color,#db4437);color:#fff;font-size:.85rem;font-weight:700}@media(max-width:600px){.room-label{font-size:16px}.presence-label{font-size:14px}.zoom-badge{right:10px;bottom:10px}}`;
U([
  C({ attribute: !1 })
], Z.prototype, "hass", 2);
U([
  C()
], Z.prototype, "image", 2);
U([
  C({ attribute: !1 })
], Z.prototype, "rooms", 2);
U([
  C({ attribute: !1 })
], Z.prototype, "presences", 2);
U([
  C({ type: Number, attribute: "min-zoom" })
], Z.prototype, "minZoom", 2);
U([
  C({ type: Number, attribute: "max-zoom" })
], Z.prototype, "maxZoom", 2);
U([
  C({ type: Number, attribute: "initial-zoom" })
], Z.prototype, "initialZoom", 2);
U([
  C({ attribute: "fit-mode" })
], Z.prototype, "fitMode", 2);
U([
  v()
], Z.prototype, "viewport", 2);
U([
  v()
], Z.prototype, "selectedRoom", 2);
U([
  v()
], Z.prototype, "selectedPresence", 2);
U([
  v()
], Z.prototype, "metadata", 2);
U([
  v()
], Z.prototype, "imageSource", 2);
U([
  v()
], Z.prototype, "svgMarkup", 2);
U([
  v()
], Z.prototype, "loadError", 2);
Z = U([
  D("explorer-canvas")
], Z);
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
function To(e, t) {
  return (e.route_nodes ?? []).find((i) => i.id === t)?.name ?? t;
}
function me(e) {
  return `${e.kind}:${e.id}`;
}
function Et(e, t) {
  return t.kind === "room" ? Ae(e, t.id) : (e.route_nodes ?? []).find((i) => i.id === t.id)?.point;
}
function Do(e, t) {
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
      label: To(e, t.id),
      point: i
    };
}
function xr(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : ["on"];
}
function Io(e) {
  return xr(e.condition?.allowed_states);
}
function Ve(e, t) {
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
function jo(e, t, i) {
  if (!e.condition)
    return {
      index: t,
      edge: e,
      conditional: !1,
      active: !0,
      allowedStates: []
    };
  const r = e.condition.entity?.trim(), o = Io(e);
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
    const n = jo(r, o, t), a = [r.from, r.to].filter((u) => u.kind === "node").map((u) => i.get(u.id)).filter((u) => !!u).map((u) => Ve(u, t)).filter((u) => u.conditional), c = a.find((u) => !u.active) ?? (n.conditional ? void 0 : a[0]), d = n.active && a.every((u) => u.active), p = n.conditional || a.length > 0;
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
function qo(e, t, i) {
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
function Fi(e, t, i, r, o, n) {
  const s = Ae(e, i), a = Ae(e, r);
  if (!s || !a) return;
  const l = wr(t), d = (o ? [...l].reverse() : l).map((u, g) => qo(e, u, g)).filter((u) => !!u), p = [
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
    const d = Et(e, a);
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
function Lo(e, t, i, r, o) {
  if (!(e.route_graph_edges ?? []).length) return;
  const n = `room:${t}`, s = `room:${i}`, { adjacency: a, endpoints: l } = Oo(e, r);
  if (!a.has(n) || !a.has(s)) return;
  const c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), p = new Set(a.keys());
  for (a.forEach((m) => m.forEach((y) => p.add(y.key))), p.forEach((m) => c.set(m, Number.POSITIVE_INFINITY)), c.set(n, 0); p.size; ) {
    let m, y = Number.POSITIVE_INFINITY;
    for (const S of p) {
      const k = c.get(S) ?? Number.POSITIVE_INFINITY;
      k < y && (m = S, y = k);
    }
    if (!m || !Number.isFinite(y) || (p.delete(m), m === s)) break;
    for (const S of a.get(m) ?? []) {
      if (!p.has(S.key)) continue;
      const k = y + S.weight;
      k < (c.get(S.key) ?? Number.POSITIVE_INFINITY) && (c.set(S.key, k), d.set(S.key, m));
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
  const b = u.map((m) => l.get(m)).map((m) => m ? Do(e, m) : void 0).filter((m) => !!m);
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
  if (s) return Fi(e, s, t, i, !1, n);
  const a = (e.routes ?? []).find(
    (u) => u.from === i && u.to === t
  );
  if (a) return Fi(e, a, t, i, !0, n);
  const l = Lo(e, t, i, o, n);
  if (l) return l;
  const c = Ae(e, t), d = Ae(e, i);
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
function Bo(e) {
  return [me(e.from), me(e.to)].sort().join("|");
}
function Zi(e, t) {
  const i = e.route_graph_edges ?? [];
  let r = 0, o = 0, n = 0;
  const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), c = (A) => {
    a.set(A, (a.get(A) ?? 0) + 1);
  }, d = (A, P) => {
    const R = l.get(A) ?? /* @__PURE__ */ new Set();
    R.add(P), l.set(A, R);
    const I = l.get(P) ?? /* @__PURE__ */ new Set();
    I.add(A), l.set(P, I);
  };
  i.forEach((A) => {
    const P = me(A.from), R = me(A.to), I = Bo(A);
    P === R && (n += 1), s.has(I) && (o += 1), s.add(I);
    const J = Et(e, A.from), Y = Et(e, A.to);
    if (!J || !Y || P === R) {
      r += 1;
      return;
    }
    c(P), c(R), d(P, R);
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
      const R = P.pop();
      for (const I of l.get(R) ?? [])
        b.has(I) && (b.delete(I), P.push(I));
    }
  }
  const m = [], y = new Set((e.route_nodes ?? []).map((A) => A.id));
  (e.routes ?? []).forEach((A) => {
    wr(A).forEach((P) => {
      P.node_id && !y.has(P.node_id) && m.push({ from: A.from, to: A.to, nodeId: P.node_id });
    });
  });
  const S = pt(e, t), k = S.filter((A) => !A.active), w = (e.route_nodes ?? []).map((A) => Ve(A, t)).filter((A) => A.conditional), E = w.filter((A) => !A.active), N = /* @__PURE__ */ new Set();
  return S.forEach((A) => {
    A.conditionSource === "edge" && (A.reason === "missing_entity" || A.reason === "entity_unavailable") && N.add(A.entity ?? "(mangler entity)");
  }), w.forEach((A) => {
    (A.reason === "missing_entity" || A.reason === "entity_unavailable") && N.add(A.entity ?? "(mangler entity)");
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
    unresolvedConditionEntities: [...N]
  };
}
var Ho = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, qt = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Fo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Ho(t, i, o), o;
};
const Ht = 900, Vi = 3600, Ki = 58, H = "http://www.w3.org/2000/svg";
let Ke = class extends Z {
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
        const g = document.createElementNS(H, "animateTransform");
        g.setAttribute("attributeName", "transform"), g.setAttribute("attributeType", "XML"), g.setAttribute("type", "translate"), g.setAttribute("values", u.map((b) => `${b.x} ${b.y}`).join(";")), g.setAttribute("keyTimes", this.buildKeyTimes(u).join(";")), g.setAttribute("dur", `${Ht}ms`), g.setAttribute("begin", "indefinite"), g.setAttribute("fill", "freeze"), g.setAttribute("calcMode", "linear"), a.appendChild(g), this.activeAnimations.set(n.id, g), g.beginElement(), window.setTimeout(() => {
          this.activeAnimations.get(n.id) === g && (g.remove(), this.activeAnimations.delete(n.id));
        }, Ht + 80);
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
      return Ve(
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
    const i = document.createElementNS(H, "title");
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
    ), r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, o = document.createElementNS(H, "g");
    o.setAttribute("class", "route-status-scene"), o.setAttribute("aria-label", "Live rutestatus og døre"), o.setAttribute("pointer-events", "none"), i.forEach((s) => {
      const a = this.endpointPoint(s.edge.from), l = this.endpointPoint(s.edge.to);
      if (!a || !l) return;
      const c = this.edgeStatusColor(s), d = document.createElementNS(H, "line");
      if (d.setAttribute("x1", String(a.x)), d.setAttribute("y1", String(a.y)), d.setAttribute("x2", String(l.x)), d.setAttribute("y2", String(l.y)), d.setAttribute("stroke", c), d.setAttribute("stroke-linecap", "round"), d.setAttribute("vector-effect", "non-scaling-stroke"), d.setAttribute("stroke-width", s.conditional ? s.active ? "4.5" : "5.5" : "2.5"), d.setAttribute("stroke-opacity", s.conditional ? s.active ? ".72" : ".82" : ".2"), s.conditional || d.setAttribute("stroke-dasharray", "4 10"), s.conditional && !s.active && d.setAttribute("stroke-dasharray", "13 9"), this.appendSvgTitle(d, this.statusDescription(s)), o.appendChild(d), !s.conditional) return;
      const p = (a.x + l.x) / 2, u = (a.y + l.y) / 2, g = document.createElementNS(H, "g");
      g.setAttribute("transform", `translate(${p} ${u})`);
      const b = document.createElementNS(H, "circle");
      b.setAttribute("r", "12"), b.setAttribute("fill", "var(--card-background-color, #ffffff)"), b.setAttribute("fill-opacity", ".9"), b.setAttribute("stroke", c), b.setAttribute("stroke-width", "3"), b.setAttribute("vector-effect", "non-scaling-stroke"), g.appendChild(b);
      const m = document.createElementNS(H, "text");
      if (m.setAttribute("text-anchor", "middle"), m.setAttribute("dominant-baseline", "central"), m.setAttribute("fill", c), m.setAttribute("font-size", "16"), m.setAttribute("font-weight", "900"), m.setAttribute("font-family", "system-ui, sans-serif"), m.textContent = s.active ? "✓" : "×", g.appendChild(m), !s.active && !r) {
        const y = document.createElementNS(H, "animate");
        y.setAttribute("attributeName", "opacity"), y.setAttribute("values", "1;.45;1"), y.setAttribute("dur", "1.8s"), y.setAttribute("repeatCount", "indefinite"), g.appendChild(y);
      }
      this.appendSvgTitle(g, this.statusDescription(s)), o.appendChild(g);
    }), t.forEach((s) => {
      const a = this.doorVisualStatus(s, i), l = this.doorStatusColor(a), c = s.point[0] * x, d = s.point[1] * x, p = document.createElementNS(H, "g");
      p.setAttribute("transform", `translate(${c} ${d})`);
      const u = document.createElementNS(H, "circle");
      u.setAttribute("r", "22"), u.setAttribute("fill", "var(--card-background-color, #ffffff)"), u.setAttribute("fill-opacity", ".9"), u.setAttribute("stroke", l), u.setAttribute("stroke-width", "4"), u.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(u);
      const g = document.createElementNS(H, "rect");
      g.setAttribute("x", "-9"), g.setAttribute("y", "-13"), g.setAttribute("width", "15"), g.setAttribute("height", "26"), g.setAttribute("rx", "1.5"), g.setAttribute("fill", "none"), g.setAttribute("stroke", l), g.setAttribute("stroke-width", "3"), g.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(g);
      const b = document.createElementNS(H, "circle");
      if (b.setAttribute("cx", "2"), b.setAttribute("cy", "0"), b.setAttribute("r", "2"), b.setAttribute("fill", l), p.appendChild(b), a === "blocked") {
        const w = document.createElementNS(H, "line");
        w.setAttribute("x1", "-12"), w.setAttribute("y1", "-15"), w.setAttribute("x2", "12"), w.setAttribute("y2", "15"), w.setAttribute("stroke", l), w.setAttribute("stroke-width", "4"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(w);
      }
      const m = document.createElementNS(H, "circle");
      if (m.setAttribute("cx", "16"), m.setAttribute("cy", "-16"), m.setAttribute("r", "6"), m.setAttribute("fill", l), m.setAttribute("stroke", "var(--card-background-color, #ffffff)"), m.setAttribute("stroke-width", "2"), m.setAttribute("vector-effect", "non-scaling-stroke"), p.appendChild(m), s.name) {
        const w = document.createElementNS(H, "text");
        w.setAttribute("y", "39"), w.setAttribute("text-anchor", "middle"), w.setAttribute("fill", "var(--primary-text-color, #1f2937)"), w.setAttribute("font-size", "20"), w.setAttribute("font-weight", "700"), w.setAttribute("font-family", "system-ui, sans-serif"), w.setAttribute("paint-order", "stroke"), w.setAttribute("stroke", "var(--card-background-color, #ffffff)"), w.setAttribute("stroke-width", "5"), w.setAttribute("stroke-linejoin", "round"), w.textContent = s.name, p.appendChild(w);
      }
      const y = a === "always" ? "altid aktiv" : a === "active" ? "åben" : a === "blocked" ? "lukket / blokeret" : "blandet status", S = s.state_binding ? Ve(s, (w) => this.hass?.states[w]?.state) : void 0, k = S?.entity ? ` · ${S.entity}: ${S.currentState ?? "ukendt"} · åben: ${S.allowedStates.join(", ")}` : "";
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
    t = document.createElementNS(H, "g"), t.setAttribute("class", "footsteps-scene"), t.setAttribute("aria-label", "Bevægelsesspor"), t.setAttribute("pointer-events", "none");
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
    if (r < Ki) return;
    const o = Math.min(20, Math.max(3, Math.floor(r / Ki)));
    for (let n = 0; n < o; n += 1) {
      const s = (n + 1) / (o + 1), a = r * s;
      let l = 0, c = i[i.length - 1];
      for (const I of i) {
        if (l + I.length >= a) {
          c = I;
          break;
        }
        l += I.length;
      }
      const d = c.length > 0 ? (a - l) / c.length : 0, p = c.end.x - c.start.x, u = c.end.y - c.start.y, g = n % 2 === 0 ? -1 : 1, b = c.length > 0 ? -u / c.length : 0, m = c.length > 0 ? p / c.length : 0, y = 9 * g, S = c.start.x + p * d + b * y, k = c.start.y + u * d + m * y, w = Math.atan2(u, p) * 180 / Math.PI + 90, E = Math.round(s * Ht), N = document.createElementNS(H, "g");
      N.setAttribute("transform", `translate(${S} ${k}) rotate(${w + g * 8})`), N.setAttribute("opacity", "0");
      const A = document.createElementNS(H, "ellipse");
      A.setAttribute("cx", "0"), A.setAttribute("cy", "-5"), A.setAttribute("rx", "6"), A.setAttribute("ry", "12"), A.setAttribute("fill", "rgba(67, 48, 31, 0.72)");
      const P = document.createElementNS(H, "ellipse");
      P.setAttribute("cx", "0"), P.setAttribute("cy", "9"), P.setAttribute("rx", "4.5"), P.setAttribute("ry", "5.5"), P.setAttribute("fill", "rgba(67, 48, 31, 0.68)");
      const R = document.createElementNS(H, "animate");
      R.setAttribute("attributeName", "opacity"), R.setAttribute("values", "0;0.72;0.56;0"), R.setAttribute("keyTimes", "0;0.08;0.58;1"), R.setAttribute("begin", "indefinite"), R.setAttribute("dur", `${Vi}ms`), R.setAttribute("fill", "freeze"), N.append(A, P, R), t.appendChild(N), window.setTimeout(() => {
        N.isConnected && R.beginElement();
      }, E), window.setTimeout(() => N.remove(), E + Vi + 120);
    }
  }
};
qt([
  C({ attribute: !1 })
], Ke.prototype, "routes", 2);
qt([
  C({ attribute: !1 })
], Ke.prototype, "routeNodes", 2);
qt([
  C({ attribute: !1 })
], Ke.prototype, "routeGraphEdges", 2);
Ke = qt([
  D("explorer-animated-canvas")
], Ke);
var Zo = Object.getOwnPropertyDescriptor, Vo = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Zo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const O = "http://www.w3.org/2000/svg";
let Nt = class extends Ke {
  updated(e) {
    super.updated(e), this.syncRoomReactionOverlay();
  }
  entityState(e) {
    const t = this.hass?.states[e];
    if (t)
      return { state: t.state, attributes: t.attributes };
  }
  appendTitle(e, t) {
    const i = document.createElementNS(O, "title");
    i.textContent = t, e.appendChild(i);
  }
  pointColor(e) {
    return e === "light" ? "var(--explorer-room-light-color, #f6bd60)" : e === "motion" ? "var(--explorer-room-motion-color, var(--primary-color, #03a9f4))" : e === "media" ? "var(--explorer-room-media-color, var(--accent-color, #7e57c2))" : e === "opening" ? "var(--explorer-room-opening-color, var(--warning-color, #ff9800))" : e === "fireplace" ? "var(--explorer-room-fireplace-color, #c46b2d)" : "var(--explorer-room-temperature-neutral, #4f9b78)";
  }
  appendPointBackdrop(e, t, i, r = 11) {
    const o = document.createElementNS(O, "circle");
    return o.setAttribute("r", String(r)), o.setAttribute("fill", "var(--card-background-color, #ffffff)"), o.setAttribute("fill-opacity", i ? ".94" : ".78"), o.setAttribute("stroke", t), o.setAttribute("stroke-width", i ? "3" : "2"), o.setAttribute("stroke-opacity", i ? ".95" : ".42"), o.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(o), o;
  }
  appendLightPoint(e, t, i) {
    const r = this.pointColor("light");
    if (t.active) {
      e.setAttribute("data-magical-light", "active");
      const n = Math.max(0.18, Math.min(1, t.intensity));
      [[74, 0.025], [52, 0.055], [34, 0.12]].forEach(([c, d], p) => {
        const u = document.createElementNS(O, "circle");
        if (u.setAttribute("class", `magical-light-glow glow-${p + 1}`), u.setAttribute("r", String(c * (0.82 + n * 0.34))), u.setAttribute("fill", r), u.setAttribute("fill-opacity", String(d + n * d * 1.8)), u.setAttribute("stroke", "none"), e.appendChild(u), !i && p === 1) {
          const g = document.createElementNS(O, "animate");
          g.setAttribute("attributeName", "fill-opacity"), g.setAttribute("values", `${d + n * 0.07};${d + n * 0.13};${d + n * 0.07}`), g.setAttribute("dur", "4.8s"), g.setAttribute("repeatCount", "indefinite"), u.appendChild(g);
        }
      });
      const a = document.createElementNS(O, "circle"), l = 24 + n * 24;
      if (a.setAttribute("class", "light-halo"), a.setAttribute("r", String(l)), a.setAttribute("fill", r), a.setAttribute("fill-opacity", String(0.08 + n * 0.18)), a.setAttribute("stroke", r), a.setAttribute("stroke-width", "2"), a.setAttribute("stroke-opacity", String(0.1 + n * 0.18)), a.setAttribute("vector-effect", "non-scaling-stroke"), e.appendChild(a), !i) {
        const c = document.createElementNS(O, "animate");
        c.setAttribute("attributeName", "r"), c.setAttribute("values", `${l * 0.94};${l * 1.06};${l * 0.94}`), c.setAttribute("dur", "4.2s"), c.setAttribute("repeatCount", "indefinite"), a.appendChild(c);
      }
    }
    this.appendPointBackdrop(e, r, t.active, 11);
    const o = document.createElementNS(O, "text");
    o.setAttribute("class", "light-glyph"), o.setAttribute("text-anchor", "middle"), o.setAttribute("dominant-baseline", "central"), o.setAttribute("font-size", "15"), o.setAttribute("font-weight", "900"), o.setAttribute("fill", r), o.setAttribute("opacity", t.active ? "1" : ".48"), o.textContent = "✦", e.appendChild(o);
  }
  appendMotionPoint(e, t, i) {
    const r = this.pointColor("motion");
    this.appendPointBackdrop(e, r, t.active, 10);
    const o = document.createElementNS(O, "circle");
    if (o.setAttribute("r", t.active ? "4.5" : "3.5"), o.setAttribute("fill", r), o.setAttribute("opacity", t.active ? "1" : ".42"), e.appendChild(o), !t.active) return;
    const n = document.createElementNS(O, "circle");
    if (n.setAttribute("r", "15"), n.setAttribute("fill", "none"), n.setAttribute("stroke", r), n.setAttribute("stroke-width", "3"), n.setAttribute("stroke-opacity", ".78"), n.setAttribute("vector-effect", "non-scaling-stroke"), e.insertBefore(n, e.firstChild), !i) {
      const s = document.createElementNS(O, "animate");
      s.setAttribute("attributeName", "r"), s.setAttribute("values", "13;31;13"), s.setAttribute("dur", "1.8s"), s.setAttribute("repeatCount", "indefinite"), n.appendChild(s);
    }
  }
  appendMediaPoint(e, t) {
    const i = this.pointColor("media");
    if (t.active) {
      const n = document.createElementNS(O, "circle");
      n.setAttribute("r", "25"), n.setAttribute("fill", i), n.setAttribute("fill-opacity", ".12"), e.appendChild(n);
    }
    const r = document.createElementNS(O, "rect");
    r.setAttribute("x", "-16"), r.setAttribute("y", "-11"), r.setAttribute("width", "32"), r.setAttribute("height", "22"), r.setAttribute("rx", "4"), r.setAttribute("fill", "var(--card-background-color, #ffffff)"), r.setAttribute("fill-opacity", t.active ? ".94" : ".78"), r.setAttribute("stroke", i), r.setAttribute("stroke-width", t.active ? "3" : "2"), r.setAttribute("stroke-opacity", t.active ? ".95" : ".42"), e.appendChild(r);
    const o = document.createElementNS(O, "path");
    o.setAttribute("d", "M -4 -6 L 7 0 L -4 6 Z"), o.setAttribute("fill", i), o.setAttribute("opacity", t.active ? "1" : ".40"), e.appendChild(o);
  }
  appendOpeningPoint(e, t) {
    const i = this.pointColor("opening");
    this.appendPointBackdrop(e, i, t.active, 11);
    const r = document.createElementNS(O, "text");
    r.setAttribute("text-anchor", "middle"), r.setAttribute("dominant-baseline", "central"), r.setAttribute("font-size", t.active ? "18" : "15"), r.setAttribute("font-weight", "900"), r.setAttribute("fill", i), r.setAttribute("opacity", t.active ? "1" : ".42"), r.textContent = t.active ? "↗" : "━", e.appendChild(r);
  }
  appendFireplacePoint(e, t, i) {
    const r = this.pointColor("fireplace"), o = Math.max(0.2, Math.min(1, t.intensity || 1)), n = t.reaction.radius, s = Number.isFinite(n) ? Math.max(26, Math.min(160, n * x)) : 72;
    if (t.active) {
      e.setAttribute("data-fireplace", "active");
      const l = document.createElementNS(O, "circle");
      l.setAttribute("class", "fireplace-glow fireplace-glow-outer"), l.setAttribute("r", String(s)), l.setAttribute("fill", r), l.setAttribute("fill-opacity", String(0.07 + 0.11 * o)), e.appendChild(l);
      const c = document.createElementNS(O, "circle");
      if (c.setAttribute("class", "fireplace-glow fireplace-glow-inner"), c.setAttribute("r", String(s * 0.56)), c.setAttribute("fill", "var(--explorer-room-fireplace-hot, #e7a253)"), c.setAttribute("fill-opacity", String(0.12 + 0.17 * o)), e.appendChild(c), !i) {
        const d = document.createElementNS(O, "animate");
        d.setAttribute("attributeName", "fill-opacity"), d.setAttribute("values", `${0.1 + 0.12 * o};${0.2 + 0.18 * o};${0.12 + 0.1 * o};${0.24 + 0.16 * o};${0.1 + 0.12 * o}`), d.setAttribute("dur", "2.1s"), d.setAttribute("repeatCount", "indefinite"), c.appendChild(d);
        const p = document.createElementNS(O, "animate");
        p.setAttribute("attributeName", "r"), p.setAttribute("values", `${s * 0.93};${s * 1.05};${s * 0.97};${s * 0.93}`), p.setAttribute("dur", "3.6s"), p.setAttribute("repeatCount", "indefinite"), l.appendChild(p);
      }
    }
    this.appendPointBackdrop(e, r, t.active, 12);
    const a = document.createElementNS(O, "path");
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
    const i = this.temperatureColor(t), r = this.formatTemperature(t), o = Math.max(58, 24 + r.length * 8.2), n = document.createElementNS(O, "rect");
    n.setAttribute("x", String(-o / 2)), n.setAttribute("y", "-15"), n.setAttribute("width", String(o)), n.setAttribute("height", "30"), n.setAttribute("rx", "15"), n.setAttribute("fill", "var(--card-background-color, #ffffff)"), n.setAttribute("fill-opacity", t.active ? ".94" : ".78"), n.setAttribute("stroke", i), n.setAttribute("stroke-width", "2.5"), e.appendChild(n);
    const s = document.createElementNS(O, "text");
    s.setAttribute("text-anchor", "middle"), s.setAttribute("dominant-baseline", "central"), s.setAttribute("font-size", "14"), s.setAttribute("font-weight", "800"), s.setAttribute("fill", i), s.textContent = r, e.appendChild(s);
  }
  appendReactionPoint(e, t, i, r) {
    const o = _e(t, i.reaction), n = document.createElementNS(O, "g");
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
    const i = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, r = document.createElementNS(O, "g");
    r.setAttribute("class", "room-reactions-scene"), r.setAttribute("aria-label", "Home Assistant entity-punkter"), r.setAttribute("pointer-events", "none"), t.forEach(({ room: a, status: l }) => this.appendReactionPoint(r, a, l, i));
    const o = e.querySelector(":scope > g.route-status-scene"), n = e.querySelector(":scope > g.footsteps-scene"), s = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, o ?? n ?? s ?? null);
  }
};
Nt = Vo([
  D("explorer-living-canvas")
], Nt);
var Ko = Object.getOwnPropertyDescriptor, Wo = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ko(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const T = "http://www.w3.org/2000/svg", Ft = 3e4;
let nt = class extends Nt {
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
      const r = t.get(i.id) ?? 0, o = r > 0, n = e - (this.lastOccupiedAt.get(i.id) ?? -1 / 0), s = !o && n >= 0 && n < Ft, a = o ? Math.min(1, 0.72 + Math.max(0, r - 1) * 0.12) : s ? Math.max(0, 1 - n / Ft) : 0;
      return { room: i, active: o, afterglow: s, intensity: a };
    }).filter((i) => i.active || i.afterglow);
  }
  polygonPoints(e) {
    return e.points.map(([t, i]) => `${t * x},${i * x}`).join(" ");
  }
  scheduleAfterglowRefresh(e, t) {
    this.afterglowTimer !== void 0 && window.clearTimeout(this.afterglowTimer);
    const i = e.filter((r) => r.afterglow).map((r) => Ft - (t - (this.lastOccupiedAt.get(r.room.id) ?? t)));
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
    const r = document.createElementNS(T, "g");
    r.setAttribute("class", "presence-room-activity-scene"), r.setAttribute("aria-label", "Tilstedeværelsesbaseret rumaktivitet"), r.setAttribute("pointer-events", "none"), i.forEach(({ room: l, active: c, intensity: d }) => {
      if (l.points.length < 3) return;
      const p = document.createElementNS(T, "polygon");
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
    const i = document.createElementNS(T, "g");
    i.setAttribute("class", "room-temperature-atmosphere-scene"), i.setAttribute("aria-label", "Temperaturatmosfære i rum"), i.setAttribute("pointer-events", "none"), t.forEach(({ room: l, celsius: c }) => {
      const d = this.temperatureOpacity(c), p = this.atmosphereTemperatureColor(c), u = this.temperatureBand(c), g = document.createElementNS(T, "polygon");
      g.setAttribute("points", this.polygonPoints(l)), g.setAttribute("class", `room-temperature-atmosphere temperature-${u}`), g.setAttribute("data-temperature-band", u), g.setAttribute("fill", p), g.setAttribute("fill-opacity", String(d)), g.setAttribute("stroke", p), g.setAttribute("stroke-opacity", String(Math.min(0.18, 0.045 + d * 0.9))), g.setAttribute("stroke-width", "2"), g.setAttribute("stroke-linejoin", "round"), g.setAttribute("vector-effect", "non-scaling-stroke");
      const b = document.createElementNS(T, "title"), m = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(c);
      b.textContent = `${l.name ?? l.id} · temperaturatmosfære · ${m} °C`, g.appendChild(b), i.appendChild(g);
    });
    const r = e.querySelector(":scope > g.presence-room-activity-scene"), o = e.querySelector(":scope > g.room-reactions-scene"), n = e.querySelector(":scope > g.route-status-scene"), s = e.querySelector(":scope > g.footsteps-scene"), a = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, r ?? o ?? n ?? s ?? a ?? null);
  }
  appendFireplaceAtmosphere(e, t, i, r, o) {
    const n = _e(t, i.reaction), s = Math.max(0.2, Math.min(1, i.intensity || 1)), a = i.reaction.radius, l = Number.isFinite(a) ? Math.max(42, Math.min(180, a * x)) : 82, c = document.createElementNS(T, "g");
    c.setAttribute("class", "fireplace-atmosphere"), c.setAttribute("transform", `translate(${n.x * x} ${n.y * x})`), c.setAttribute("data-room-id", t.id);
    const d = document.createElementNS(T, "circle");
    d.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-outer"), d.setAttribute("r", String(l * 1.18)), d.setAttribute("fill", "var(--explorer-fireplace-atmosphere, #c97935)"), d.setAttribute("fill-opacity", String(0.045 + s * 0.055)), c.appendChild(d);
    const p = document.createElementNS(T, "circle");
    p.setAttribute("class", "fireplace-atmosphere-glow fireplace-atmosphere-middle"), p.setAttribute("r", String(l * 0.72)), p.setAttribute("fill", "var(--explorer-fireplace-atmosphere-hot, #e6a34b)"), p.setAttribute("fill-opacity", String(0.065 + s * 0.085)), c.appendChild(p);
    const u = document.createElementNS(T, "ellipse");
    if (u.setAttribute("class", "fireplace-atmosphere-core"), u.setAttribute("cx", "0"), u.setAttribute("cy", String(-l * 0.05)), u.setAttribute("rx", String(l * 0.39)), u.setAttribute("ry", String(l * 0.31)), u.setAttribute("fill", "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), u.setAttribute("fill-opacity", String(0.07 + s * 0.09)), c.appendChild(u), !r) {
      const m = document.createElementNS(T, "animate");
      m.setAttribute("attributeName", "fill-opacity"), m.setAttribute("values", `${0.04 + s * 0.045};${0.065 + s * 0.07};${0.048 + s * 0.052};${0.04 + s * 0.045}`), m.setAttribute("dur", `${3.2 + o % 3 * 0.35}s`), m.setAttribute("repeatCount", "indefinite"), d.appendChild(m);
      const y = document.createElementNS(T, "animate");
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
      const w = document.createElementNS(T, "circle");
      if (w.setAttribute("class", "fireplace-ember"), w.setAttribute("cx", String(m)), w.setAttribute("cy", String(y)), w.setAttribute("r", String(S)), w.setAttribute("fill", k % 2 === 0 ? "var(--explorer-fireplace-ember, #d96532)" : "var(--explorer-fireplace-atmosphere-core, #f0b65c)"), w.setAttribute("opacity", r ? String(0.28 + s * 0.22) : "0"), c.appendChild(w), !r) {
        const E = document.createElementNS(T, "animate");
        E.setAttribute("attributeName", "cy"), E.setAttribute("values", `${y};${y - 22 - k * 2};${y - 38 - k * 3}`), E.setAttribute("dur", `${2.4 + k % 3 * 0.42}s`), E.setAttribute("begin", `${(k * 0.37 + o * 0.11).toFixed(2)}s`), E.setAttribute("repeatCount", "indefinite"), w.appendChild(E);
        const N = document.createElementNS(T, "animate");
        N.setAttribute("attributeName", "opacity"), N.setAttribute("values", `0;${0.32 + s * 0.45};${0.16 + s * 0.22};0`), N.setAttribute("keyTimes", "0;0.18;0.68;1"), N.setAttribute("dur", `${2.4 + k % 3 * 0.42}s`), N.setAttribute("begin", `${(k * 0.37 + o * 0.11).toFixed(2)}s`), N.setAttribute("repeatCount", "indefinite"), w.appendChild(N);
      }
    });
    const b = document.createElementNS(T, "title");
    b.textContent = `${t.name ?? t.id} · levende pejsatmosfære`, c.appendChild(b), e.appendChild(c);
  }
  syncFireplaceAtmosphere() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e) return;
    e.querySelector(":scope > g.fireplace-atmosphere-scene")?.remove();
    const t = this.rooms.flatMap(
      (l) => Ct(l, (c) => this.atmosphereEntityState(c)).filter((c) => c.reaction.kind === "fireplace" && c.active).map((c) => ({ room: l, status: c }))
    );
    if (!t.length) return;
    const i = document.createElementNS(T, "g");
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
    const e = document.createElementNS(T, "mask");
    e.setAttribute("id", this.overcastMaskId), e.setAttribute("maskUnits", "userSpaceOnUse"), e.setAttribute("x", "0"), e.setAttribute("y", "0"), e.setAttribute("width", String(x)), e.setAttribute("height", String(x));
    const t = document.createElementNS(T, "rect");
    return t.setAttribute("x", "0"), t.setAttribute("y", "0"), t.setAttribute("width", String(x)), t.setAttribute("height", String(x)), t.setAttribute("fill", "white"), e.appendChild(t), this.rooms.forEach((i) => {
      if (i.points.length < 3) return;
      const r = document.createElementNS(T, "polygon");
      r.setAttribute("points", this.polygonPoints(i)), r.setAttribute("fill", "black"), r.setAttribute("stroke", "black"), r.setAttribute("stroke-width", "16"), r.setAttribute("stroke-linejoin", "round"), e.appendChild(r);
    }), e;
  }
  createOvercastFilter() {
    const e = document.createElementNS(T, "filter");
    e.setAttribute("id", this.overcastFilterId), e.setAttribute("x", "-55%"), e.setAttribute("y", "-65%"), e.setAttribute("width", "210%"), e.setAttribute("height", "240%");
    const t = document.createElementNS(T, "feGaussianBlur");
    t.setAttribute("in", "SourceGraphic"), t.setAttribute("stdDeviation", "3.1"), t.setAttribute("result", "soft"), e.appendChild(t);
    const i = document.createElementNS(T, "feTurbulence");
    i.setAttribute("type", "fractalNoise"), i.setAttribute("baseFrequency", "0.016 0.029"), i.setAttribute("numOctaves", "3"), i.setAttribute("seed", "43"), i.setAttribute("result", "noise"), e.appendChild(i);
    const r = document.createElementNS(T, "feDisplacementMap");
    return r.setAttribute("in", "soft"), r.setAttribute("in2", "noise"), r.setAttribute("scale", "16"), r.setAttribute("xChannelSelector", "R"), r.setAttribute("yChannelSelector", "G"), e.appendChild(r), e;
  }
  appendOvercastCloud(e, t, i, r, o, n) {
    const s = document.createElementNS(T, "g");
    s.setAttribute("class", "overcast-cloud-position"), s.setAttribute("transform", `translate(${t} ${i}) scale(${r})`), s.setAttribute("opacity", String(n));
    const a = document.createElementNS(T, "g");
    a.setAttribute("class", `overcast-cloud overcast-cloud-${o % 3} overcast-depth-${o % 3}`);
    const l = document.createElementNS(T, "ellipse");
    l.setAttribute("class", "overcast-cloud-mist"), l.setAttribute("cx", o % 2 === 0 ? "-12" : "14"), l.setAttribute("cy", "18"), l.setAttribute("rx", "145"), l.setAttribute("ry", "43"), a.appendChild(l);
    const c = document.createElementNS(T, "g");
    c.setAttribute("class", "overcast-cloud-body"), c.setAttribute("filter", `url(#${this.overcastFilterId})`), c.setAttribute("transform", o % 2 === 0 ? "scale(1.12 .74) skewX(-4)" : "scale(.98 .88) skewX(5)");
    const d = document.createElementNS(T, "path");
    d.setAttribute("class", "overcast-cloud-base"), d.setAttribute("d", "M-150 31 C-133 1 -108 -17 -80 -18 C-66 -47 -41 -62 -13 -57 C5 -78 34 -82 58 -62 C84 -62 107 -48 120 -27 C146 -18 158 5 145 29 C128 53 99 63 66 61 C34 75 -4 74 -37 68 C-76 75 -116 64 -140 48 C-151 41 -155 35 -150 31 Z"), c.appendChild(d), [
      [-86, -6, 50, 30],
      [-47, -37, 57, 34],
      [-3, -51, 65, 38],
      [43, -43, 58, 35],
      [82, -17, 50, 30],
      [14, 23, 92, 27]
    ].forEach(([g, b, m, y], S) => {
      const k = document.createElementNS(T, "ellipse");
      k.setAttribute("class", "overcast-cloud-puff"), k.setAttribute("cx", String(g)), k.setAttribute("cy", String(b)), k.setAttribute("rx", String(m)), k.setAttribute("ry", String(y)), k.setAttribute("opacity", String(0.34 + S % 3 * 0.08)), c.appendChild(k);
    }), a.appendChild(c);
    const u = document.createElementNS(T, "path");
    u.setAttribute("class", "overcast-cloud-strand"), u.setAttribute("d", "M-184 70 C-130 58 -80 63 -32 68 C18 73 70 65 135 48 C89 79 27 88 -33 82 C-88 78 -139 89 -184 70 Z"), a.appendChild(u), s.appendChild(a), e.appendChild(s);
  }
  syncOvercastCloudDensity() {
    const e = this.renderRoot.querySelector("svg.floorplan"), t = this.renderRoot.querySelector("g.scene");
    if (!e || !t) return;
    e.querySelector(`defs[data-overcast-mask="${this.overcastMaskId}"]`)?.remove(), t.querySelector(":scope > g.overcast-cloud-density-scene")?.remove();
    const i = this.descendantWeather();
    if (i.effect !== "cloudy") return;
    const r = document.createElementNS(T, "defs");
    r.setAttribute("data-overcast-mask", this.overcastMaskId), r.appendChild(this.createOvercastMask()), r.appendChild(this.createOvercastFilter()), e.insertBefore(r, e.firstChild);
    const o = document.createElementNS(T, "g");
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
nt.styles = j`
    ${Nt.styles}

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
nt = Wo([
  D("explorer-presence-activity-canvas")
], nt);
var Go = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, ht = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Uo(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Go(t, i, o), o;
};
const Xo = "http://www.w3.org/2000/svg";
let be = class extends nt {
  constructor() {
    super(...arguments), this.theme = "classic", this.compassRotation = -7, this.compassSize = 1, this.compassVisible = !0, this.artifactId = `explorer-antique-${Math.random().toString(36).slice(2, 10)}`, this.hasRevealedEnchanted = !1;
  }
  updated(e) {
    super.updated(e), this.syncThemeArtifacts();
  }
  createSvg(e) {
    return document.createElementNS(Xo, e);
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
  D("explorer-themed-canvas")
], be);
const Yo = ["on"], Qo = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function Jo(e) {
  const t = (e ?? []).map((i) => i.trim()).filter(Boolean);
  return t.length ? [...new Set(t)] : [...Yo];
}
function kr(e, t) {
  const i = e.visible !== !1, r = e.state_binding, o = Jo(r?.active_states);
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
  if (Qo.has(s))
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
function $o(e, t) {
  return e.map((i) => kr(i, t));
}
var _o = Object.defineProperty, en = Object.getOwnPropertyDescriptor, Ar = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? en(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && _o(t, i, o), o;
};
const he = "http://www.w3.org/2000/svg", tn = {
  info: "var(--explorer-zone-info, #2d8f74)",
  warning: "var(--explorer-zone-warning, #f59e0b)",
  danger: "var(--explorer-zone-danger, #d64545)",
  cleaning: "var(--explorer-zone-cleaning, #3b82c4)",
  restricted: "var(--explorer-zone-restricted, #8b5a9e)"
}, rn = {
  info: "i",
  warning: "!",
  danger: "!",
  cleaning: "✦",
  restricted: "×"
};
let We = class extends be {
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
    return e.color?.trim() || tn[e.kind ?? "info"];
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
    if (p.setAttribute("text-anchor", "middle"), p.setAttribute("dominant-baseline", "central"), p.setAttribute("fill", n), p.setAttribute("font-size", "18"), p.setAttribute("font-weight", "900"), p.setAttribute("font-family", "system-ui, sans-serif"), p.textContent = rn[o], c.appendChild(p), s.appendChild(c), r.name) {
      const u = document.createElementNS(he, "text");
      u.setAttribute("x", String(l.x)), u.setAttribute("y", String(l.y + 36)), u.setAttribute("text-anchor", "middle"), u.setAttribute("class", "zone-label"), u.setAttribute("fill", n), u.setAttribute("font-size", "22"), u.setAttribute("font-weight", "800"), u.setAttribute("font-family", "system-ui, sans-serif"), u.setAttribute("paint-order", "stroke"), u.setAttribute("stroke", "var(--card-background-color, #ffffff)"), u.setAttribute("stroke-width", "5"), u.setAttribute("stroke-linejoin", "round"), u.textContent = r.name, s.appendChild(u);
    }
    this.appendZoneTitle(s, t), e.appendChild(s);
  }
  syncZonesOverlay() {
    const e = this.renderRoot.querySelector("g.scene");
    if (!e || (e.querySelector(":scope > g.zones-scene")?.remove(), !this.zones.length)) return;
    const i = $o(this.zones, (c) => this.hass?.states[c]?.state).filter((c) => c.active && c.zone.points.length >= 3);
    if (!i.length) return;
    const r = document.createElementNS(he, "g");
    r.setAttribute("class", "zones-scene"), r.setAttribute("aria-label", "Dynamiske zoner"), r.setAttribute("pointer-events", "none");
    const o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    i.forEach((c) => this.renderZone(r, c, o));
    const n = e.querySelector(":scope > g.room-reactions-scene"), s = e.querySelector(":scope > g.route-status-scene"), a = e.querySelector(":scope > g.footsteps-scene"), l = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(r, n ?? s ?? a ?? l ?? null);
  }
};
We.styles = j`
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
], We.prototype, "zones", 2);
We = Ar([
  D("explorer-zones-canvas")
], We);
var on = Object.defineProperty, nn = Object.getOwnPropertyDescriptor, fi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? nn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && on(t, i, o), o;
};
const sn = "http://www.w3.org/2000/svg", an = 4200, ln = 900, cn = 54, dn = { person: "Person", pet: "Kæledyr", robot: "Robot", vehicle: "Køretøj", object: "Objekt" }, Wi = { person: [202, 344, 42, 158, 274, 18], pet: [28, 112, 326, 52, 178, 286], robot: [188, 218, 264, 164, 204, 238], vehicle: [12, 210, 38, 330, 186, 262], object: [272, 44, 154, 320, 196, 22] }, Zt = [58, 64, 54, 61, 56, 66], pn = [8, 6, 10, 7, 9, 5], hn = [7, 4, 10, 6, 8, 3];
function Gi(e) {
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function gt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let ze = class extends We {
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
    const i = e.type ?? "person", r = Wi[i][Gi(e.id) % Wi[i].length];
    return this.theme === "enchanted_antique" ? `hsl(${r} 34% 38%)` : `hsl(${r} 62% 47%)`;
  }
  polishTrailColor(e) {
    return e.trail_color?.trim() || this.polishPresenceColor(e);
  }
  polishTrailDuration(e) {
    const t = e.trail_duration;
    return Number.isFinite(t) ? Math.round(gt(t, 1, 60) * 1e3) : an;
  }
  polishBasePosition(e) {
    return { x: (e.x ?? 0.5) * x, y: (e.y ?? 0.5) * x };
  }
  polishPersonTrailVariant(e) {
    return Gi(e.id) % Zt.length;
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
          Math.hypot(p.x - b.x, p.y - b.y) <= cn && (i.delete(u), s.push(g), a.push(g));
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
    return document.createElementNS(sn, e);
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
      d.textContent = `${r.name ?? r.id} · ${dn[s]}${u}${p}`, n.appendChild(d);
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
    return e === "person" ? Zt[t] ?? Zt[0] : e === "pet" ? 46 : e === "robot" ? 42 : e === "vehicle" ? 54 : e === "object" ? 62 : 58;
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
      for (const G of a) {
        if (b + G.length >= g) {
          m = G;
          break;
        }
        b += G.length;
      }
      const y = m.length > 0 ? (g - b) / m.length : 0, S = m.end.x - m.start.x, k = m.end.y - m.start.y, w = p % 2 === 0 ? -1 : 1, E = r === "person" ? pn[o] ?? 8 : r === "pet" ? 6 : 0, N = r === "person" ? hn[o] ?? 7 : E ? 7 : 0, A = m.length > 0 ? -k / m.length : 0, P = m.length > 0 ? S / m.length : 0, R = m.start.x + S * y + A * E * w, I = m.start.y + k * y + P * E * w, J = Math.atan2(k, S) * 180 / Math.PI + 90, Y = Math.round(u * ln), z = this.polishCreateSvg("g");
      z.setAttribute("class", `trail-mark trail-${r}${r === "person" ? ` trail-person-v${o + 1}` : ""}`), z.setAttribute("data-presence-id", t.id), r === "person" && z.setAttribute("data-trail-style", String(o + 1)), z.setAttribute("transform", `translate(${R} ${I}) rotate(${J + (E ? w * N : 0)})`), z.setAttribute("opacity", "0"), this.polishAppendTrailShape(z, r, n, o);
      const q = this.polishCreateSvg("animate");
      this.polishSetAttributes(q, { attributeName: "opacity", values: "0;0.78;0.54;0", keyTimes: "0;0.08;0.58;1", begin: "indefinite", dur: `${s}ms`, fill: "freeze" }), z.appendChild(q), i.appendChild(z), window.setTimeout(() => {
        z.isConnected && q.beginElement();
      }, Y), window.setTimeout(() => z.remove(), Y + s + 120);
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
          const S = this.rooms.find((E) => E.id === m || E.area_id === m);
          if (!S || S.points.length < 3) continue;
          const k = Math.max(0, 0.16 * (1 - (t - y.at) / p)), w = this.polishCreateSvg("polygon");
          this.polishSetAttributes(w, { points: S.points.map(([E, N]) => `${E * x},${N * x}`).join(" "), fill: u, "fill-opacity": String(k), stroke: u, "stroke-opacity": String(k * 0.9), "stroke-width": "2", "vector-effect": "non-scaling-stroke", "data-presence-id": a }), r.appendChild(w);
        }
      }
      for (let b = 1; b < l.length; b += 1) {
        const m = l[b - 1], y = l[b], S = this.polishMovementPath(m, y, m.roomId, y.roomId), k = Math.max(0, 0.72 * (1 - (t - y.at) / p));
        for (let w = 1; w < S.length; w += 1) {
          const E = S[w - 1], N = S[w], A = N.x - E.x, P = N.y - E.y, R = Math.hypot(A, P), I = Math.atan2(P, A) * 180 / Math.PI;
          if (d === "robot") {
            if (this.petRobotTrails.show_robot_route === !1) continue;
            const q = this.polishCreateSvg("line");
            if (this.polishSetAttributes(q, { x1: String(E.x), y1: String(E.y), x2: String(N.x), y2: String(N.y), stroke: u, "stroke-width": "7", "stroke-linecap": "round", "stroke-opacity": String(k), "vector-effect": "non-scaling-stroke", "data-presence-id": a }), q.setAttribute("class", "robot-history-route"), o.appendChild(q), this.petRobotTrails.robot_direction_arrows !== !1 && R > 45) {
              const G = this.polishCreateSvg("path"), ve = (E.x + N.x) / 2, Ie = (E.y + N.y) / 2;
              this.polishSetAttributes(G, { d: "M -10 -7 L 10 0 L -10 7 Z", fill: u, "fill-opacity": String(Math.min(1, k + 0.12)), transform: `translate(${ve} ${Ie}) rotate(${I})`, "data-presence-id": a }), G.setAttribute("class", "robot-history-arrow"), o.appendChild(G);
            }
            continue;
          }
          if (d === "pet" && this.petRobotTrails.show_pet_paws === !1) continue;
          const J = d === "pet" ? 52 : 70, Y = Math.min(12, Math.max(1, Math.floor(R / J))), z = I + 90;
          for (let q = 1; q <= Y; q += 1) {
            const G = q / (Y + 1), ve = q % 2 === 0 ? -1 : 1, Ie = R > 0 ? -P / R : 0, Ce = R > 0 ? A / R : 0, Qe = d === "pet" ? 7 : 6, Q = this.polishCreateSvg("g");
            Q.setAttribute("class", `movement-history-mark trail-${d}${d === "person" ? ` trail-person-v${g + 1}` : ""}`), Q.setAttribute("data-presence-id", a), Q.setAttribute("transform", `translate(${E.x + A * G + Ie * Qe * ve} ${E.y + P * G + Ce * Qe * ve}) rotate(${z + ve * 4}) scale(${d === "pet" ? 0.72 : 0.62})`), Q.setAttribute("opacity", String(k)), this.polishAppendTrailShape(Q, d, u, g), o.appendChild(Q);
          }
        }
      }
    }
    const s = i.querySelector(":scope > g.presence-trails-scene") ?? i.querySelector(":scope > g.presences-scene");
    i.insertBefore(r, s ?? null), i.insertBefore(o, s ?? null);
  }
};
ze.styles = j`${We.styles}.footsteps-scene{display:none}.presence-visual-offset{transition:transform 220ms ease}.presence-type-badge{filter:drop-shadow(0 1px 2px rgba(0,0,0,.22))}.presence-trails-scene .trail-mark,.movement-history-scene .movement-history-mark{filter:drop-shadow(0 0 1.2px rgba(0,0,0,.20))}.movement-history-scene .trail-pet{filter:drop-shadow(0 0 2px rgba(0,0,0,.24))}.movement-history-scene .robot-history-route{fill:none;filter:drop-shadow(0 0 2px rgba(0,0,0,.24))}.movement-history-scene .robot-history-arrow{filter:drop-shadow(0 1px 1px rgba(0,0,0,.28))}.movement-history-rooms-scene polygon{mix-blend-mode:multiply}.presence-trails-scene .trail-person-v2{opacity:.96}.presence-trails-scene .trail-person-v3{filter:drop-shadow(0 0 1.6px rgba(0,0,0,.24))}.presence-trails-scene .trail-person-v5{filter:drop-shadow(0 0 .8px rgba(0,0,0,.18))}:host([map-theme="enchanted_antique"]) .presence-type-badge{filter:sepia(.35) drop-shadow(0 1px 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-trails-scene .trail-mark,:host([map-theme="enchanted_antique"]) .movement-history-scene .movement-history-mark,:host([map-theme="enchanted_antique"]) .movement-history-scene .robot-history-route,:host([map-theme="enchanted_antique"]) .movement-history-scene .robot-history-arrow{mix-blend-mode:multiply;filter:sepia(.28) saturate(.78) drop-shadow(0 0 1px rgba(67,40,22,.28))}:host([map-theme="enchanted_antique"]) .presence-border{stroke-width:4.5px!important}@media(prefers-reduced-motion:reduce){.presence-visual-offset{transition:none}}`;
fi([
  C({ attribute: !1 })
], ze.prototype, "movementHistory", 2);
fi([
  C({ attribute: !1 })
], ze.prototype, "petRobotTrails", 2);
ze = fi([
  D("explorer-presence-polish-canvas")
], ze);
var un = Object.getOwnPropertyDescriptor, gn = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? un(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = s(o) || o);
  return o;
};
const mt = "http://www.w3.org/2000/svg", Ui = 3e4, mn = 900;
let st = class extends ze {
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
      const o = t.get(r.id) ?? 0, n = o > 0, s = this.magicAfterglowStartedAt.get(r.id), a = s === void 0 ? 1 / 0 : e - s, l = !n && a >= 0 && a < Ui, c = n ? Math.min(1, 0.72 + Math.max(0, o - 1) * 0.12) : l ? Math.max(0, 1 - a / Ui) : 0;
      return !l && s !== void 0 && this.magicAfterglowStartedAt.delete(r.id), { room: r, active: n, afterglow: l, intensity: c };
    }).filter((r) => r.active || r.afterglow);
  }
  magicPolygonPoints(e) {
    return e.points.map(([t, i]) => `${t * x},${i * x}`).join(" ");
  }
  magicScheduleRefresh(e) {
    this.magicRefreshTimer !== void 0 && window.clearTimeout(this.magicRefreshTimer), e.some((t) => t.afterglow) && (this.magicRefreshTimer = window.setTimeout(() => {
      this.magicRefreshTimer = void 0, this.magicSyncRoomAtmosphere();
    }, mn));
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
st.styles = j`
    ${ze.styles}

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
st = gn([
  D("explorer-room-magic-canvas")
], st);
var fn = Object.defineProperty, bn = Object.getOwnPropertyDescriptor, Sr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? bn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && fn(t, i, o), o;
};
const $ = "http://www.w3.org/2000/svg", yn = ["on", "open", "opened", "true"], Vt = 600 * 1e3, Kt = 1800 * 1e3, Wt = 3600 * 1e3, Xi = 60 * 1e3, ft = (e) => e * Math.PI / 180;
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
    return i ? (t.open_states ?? yn).map((r) => r.toLowerCase()).includes(i) : !1;
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
    const o = Math.max(0, i - r), n = Math.floor(o / 6e4), s = o >= Wt ? "alert" : o >= Kt ? "warning" : o >= Vt ? "watch" : "fresh", a = Math.floor(n / 60), l = n % 60, c = a > 0 ? `åben i ${a} t${l ? ` ${l} min` : ""}` : `åben i ${n} min`, d = s === "fresh" ? "" : a > 0 ? l ? `${a}t ${l}m` : `${a}t` : `${n}m`;
    return { minutes: n, level: s, label: d, description: c };
  }
  scheduleOpeningAgeRefresh(e) {
    this.openingAgeTimer !== void 0 && window.clearTimeout(this.openingAgeTimer);
    let t = 1 / 0;
    for (const i of this.openings.filter((r) => r.visible !== !1)) {
      const r = this.isOpen(i), o = this.openingOpenSince(i, r);
      if (o === void 0) continue;
      const n = Math.max(0, e - o), s = n < Vt ? Vt : n < Kt ? Kt : n < Wt ? Wt : void 0, a = s === void 0 ? Xi : Math.max(1e3, s - n + 50);
      t = Math.min(t, Xi, a);
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
    const i = document.createElementNS($, "g");
    i.setAttribute("class", "dynamic-openings-scene"), i.setAttribute("aria-label", "Dynamiske døre og vinduer"), i.setAttribute("pointer-events", "none");
    const r = Date.now();
    for (const n of t)
      n.kind === "window" ? this.drawWindow(i, n, r) : this.drawDoor(i, n, r);
    const o = e.querySelector(":scope > g.presences-scene");
    e.insertBefore(i, o ?? null), this.scheduleOpeningAgeRefresh(r);
  }
  line(e, t, i, r, o, n) {
    const s = document.createElementNS($, "line");
    return s.setAttribute("x1", String(t)), s.setAttribute("y1", String(i)), s.setAttribute("x2", String(r)), s.setAttribute("y2", String(o)), s.setAttribute("class", n), e.appendChild(s), s;
  }
  appendAgeIndicator(e, t, i, r) {
    if (!r || r.level === "fresh") return;
    const o = document.createElementNS($, "g");
    o.setAttribute("class", `opening-age-indicator level-${r.level}`), o.setAttribute("transform", `translate(${t} ${i})`);
    const n = document.createElementNS($, "circle");
    n.setAttribute("r", r.level === "alert" ? "12" : "10"), n.setAttribute("class", "opening-age-ring"), o.appendChild(n);
    const s = Math.max(28, r.label.length * 7 + 10), a = document.createElementNS($, "rect");
    a.setAttribute("x", "11"), a.setAttribute("y", "-18"), a.setAttribute("width", String(s)), a.setAttribute("height", "17"), a.setAttribute("rx", "8.5"), a.setAttribute("class", "opening-age-badge"), o.appendChild(a);
    const l = document.createElementNS($, "text");
    l.setAttribute("x", String(11 + s / 2)), l.setAttribute("y", "-9.3"), l.setAttribute("text-anchor", "middle"), l.setAttribute("dominant-baseline", "central"), l.setAttribute("class", "opening-age-label"), l.textContent = r.label, o.appendChild(l), e.appendChild(o);
  }
  drawDoor(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(28, (t.length ?? 0.055) * x), s = t.angle ?? 0, a = t.open_angle ?? 82, l = t.hinge ?? "start", c = t.swing ?? "left", d = t.point[0] * x, p = t.point[1] * x, u = n / 2, g = ft(s), b = Math.cos(g), m = Math.sin(g), y = -m, S = b, k = { x: d - b * u, y: p - m * u }, w = { x: d + b * u, y: p + m * u }, E = l === "start" ? k : w, N = l === "start" ? w : k, A = s + (l === "start" ? 0 : 180), P = (c === "left" ? -1 : 1) * (l === "start" ? 1 : -1), R = A + (r ? P * a : 0), I = ft(R), J = { x: E.x + Math.cos(I) * n, y: E.y + Math.sin(I) * n }, Y = o ? ` open-age-${o.level}` : "", z = document.createElementNS($, "g");
    z.setAttribute("class", `dynamic-opening door ${r ? "is-open" : "is-closed"}${Y}`), z.setAttribute("data-opening-id", t.id), o && z.setAttribute("data-open-minutes", String(o.minutes)), this.line(z, k.x, k.y, w.x, w.y, "opening-gap");
    const q = Math.max(7, Math.min(12, n * 0.12));
    for (const Q of [k, w]) this.line(z, Q.x - y * q / 2, Q.y - S * q / 2, Q.x + y * q / 2, Q.y + S * q / 2, "door-jamb");
    r && this.line(z, E.x, E.y, N.x, N.y, "door-closed-guide"), this.line(z, E.x, E.y, J.x, J.y, "door-leaf");
    const G = document.createElementNS($, "circle");
    if (G.setAttribute("cx", String(E.x)), G.setAttribute("cy", String(E.y)), G.setAttribute("r", "4.2"), G.setAttribute("class", "opening-hinge"), z.appendChild(G), r) {
      const Q = document.createElementNS($, "path"), wi = ft(A), ki = I, Dr = E.x + Math.cos(wi) * n, Ir = E.y + Math.sin(wi) * n, jr = E.x + Math.cos(ki) * n, qr = E.y + Math.sin(ki) * n, Or = P > 0 ? 1 : 0, Lr = Math.abs(a) > 180 ? 1 : 0;
      Q.setAttribute("d", `M ${Dr} ${Ir} A ${n} ${n} 0 ${Lr} ${Or} ${jr} ${qr}`), Q.setAttribute("class", "door-swing"), z.appendChild(Q);
    }
    const ve = d + y * 14, Ie = p + S * 14, Ce = document.createElementNS($, "circle");
    Ce.setAttribute("cx", String(ve)), Ce.setAttribute("cy", String(Ie)), Ce.setAttribute("r", "5.2"), Ce.setAttribute("class", "opening-status-dot"), z.appendChild(Ce), this.appendAgeIndicator(z, ve, Ie, o);
    const Qe = document.createElementNS($, "title");
    Qe.textContent = `${t.name ?? t.id} · ${r ? "åben" : "lukket"}${o ? ` · ${o.description}` : ""}${t.state_binding ? ` · ${t.state_binding.entity}` : " · ingen entity"}`, z.appendChild(Qe), e.appendChild(z);
  }
  drawWindow(e, t, i) {
    const r = this.isOpen(t), o = this.openingAgeInfo(t, r, i), n = Math.max(26, (t.length ?? 0.05) * x), s = t.angle ?? 0, a = t.point[0] * x, l = t.point[1] * x, c = ft(s), d = Math.cos(c), p = Math.sin(c), u = -p, g = d, b = n / 2, m = 5.5, y = { x: a - d * b, y: l - p * b }, S = { x: a + d * b, y: l + p * b }, k = o ? ` open-age-${o.level}` : "", w = document.createElementNS($, "g");
    w.setAttribute("class", `dynamic-opening window ${r ? "is-open" : "is-closed"}${k}`), w.setAttribute("data-opening-id", t.id), o && w.setAttribute("data-open-minutes", String(o.minutes)), this.line(w, y.x, y.y, S.x, S.y, "window-gap"), this.line(w, y.x + u * m, y.y + g * m, S.x + u * m, S.y + g * m, "window-pane"), this.line(w, y.x - u * m, y.y - g * m, S.x - u * m, S.y - g * m, "window-pane"), this.line(w, y.x + u * m, y.y + g * m, y.x - u * m, y.y - g * m, "window-frame-end"), this.line(w, S.x + u * m, S.y + g * m, S.x - u * m, S.y - g * m, "window-frame-end"), r && (this.line(w, y.x + u * m, y.y + g * m, a + d * b * 0.12 + u * 18, l + p * b * 0.12 + g * 18, "window-open-sash"), this.line(w, a + d * b * 0.12 + u * 18, l + p * b * 0.12 + g * 18, S.x + u * m, S.y + g * m, "window-open-sash"));
    const E = a + u * 17, N = l + g * 17, A = document.createElementNS($, "circle");
    A.setAttribute("cx", String(E)), A.setAttribute("cy", String(N)), A.setAttribute("r", "5.2"), A.setAttribute("class", "opening-status-dot"), w.appendChild(A), this.appendAgeIndicator(w, E, N, o);
    const P = document.createElementNS($, "title");
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
  D("explorer-openings-canvas")
], Ge);
var vn = Object.defineProperty, xn = Object.getOwnPropertyDescriptor, Xe = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? xn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && vn(t, i, o), o;
};
const wn = "http://www.w3.org/2000/svg";
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
    return document.createElementNS(wn, e);
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
      ].forEach(([R, I, J, Y, z]) => {
        const q = this.svg("ellipse");
        this.attrs(q, {
          cx: String(R),
          cy: String(I),
          rx: String(J),
          ry: String(Y),
          opacity: String(z)
        }), b.appendChild(q);
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
      for (const [R, I, J, Y, z] of i) {
        const q = this.svg("ellipse");
        this.attrs(q, {
          cx: String(R),
          cy: String(I),
          rx: String(J),
          ry: String(Y),
          opacity: String(z),
          class: "weather-cloud-puff"
        }), y.appendChild(q);
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
        transform: d === 1 ? "translate(8 51) scale(1.28 .40)" : d === 2 ? "translate(-20 43) scale(.88 .62)" : d === 3 ? "translate(18 47) scale(1.16 .46)" : "translate(8 49) scale(.95 .55)"
      }), [
        [-78, 0, 88, 18, 0.38],
        [18, 2, 116, 20, 0.42],
        [108, -2, 64, 15, 0.3]
      ].forEach(([R, I, J, Y, z]) => {
        const q = this.svg("ellipse");
        this.attrs(q, {
          cx: String(R),
          cy: String(I),
          rx: String(J),
          ry: String(Y),
          opacity: String(z)
        }), E.appendChild(q);
      }), g.appendChild(E);
      const N = this.svg("path");
      if (this.attrs(N, {
        d: "M-182 73 C-126 59 -76 66 -31 69 C13 72 59 66 123 51 C80 82 24 89 -29 84 C-78 80 -126 91 -182 73 Z",
        class: "weather-cloud-strand"
      }), g.appendChild(N), d === 1 || d === 3) {
        const R = this.svg("path");
        this.attrs(R, {
          d: d === 1 ? "M-205 89 C-151 74 -94 78 -40 82 C21 87 76 79 152 61 C97 91 31 99 -35 94 C-94 90 -151 101 -205 89 Z" : "M-176 2 C-124 -7 -82 -3 -41 8 C2 19 49 17 112 0 C67 24 16 30 -35 24 C-84 18 -127 24 -176 2 Z",
          class: "weather-cloud-fine-strand"
        }), g.appendChild(R);
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
    const i = this.svg("g");
    i.setAttribute("class", `weather-rain-field${t ? " is-heavy" : ""}`);
    const r = t ? 62 : 92, o = t ? 48 : 72;
    for (let s = -1; s < (t ? 18 : 13); s += 1)
      for (let a = -1; a < (t ? 24 : 17); a += 1) {
        const l = Math.abs(s * 37 + a * 19), c = a * o + s % 2 * (t ? 17 : 25) + l % 13, d = s * r, p = (t ? 15 : 10) + l % (t ? 12 : 8), u = (t ? 2.4 : 1.6) + l % 3 * 0.35, g = (t ? 5 : 3) + l % 4, b = this.svg("path");
        this.attrs(b, {
          d: `M ${c} ${d} C ${c - u * 0.7} ${d + p * 0.32}, ${c - g - u} ${d + p * 0.72}, ${c - g} ${d + p} C ${c - g + u} ${d + p * 0.72}, ${c + u * 0.45} ${d + p * 0.31}, ${c} ${d} Z`,
          class: `weather-rain-drop weather-rain-depth-${l % 3}${t ? " is-heavy" : ""}`
        }), b.style.setProperty("--rain-duration", `${(t ? 0.48 : 0.9) + l % 7 * 0.06}s`), b.style.setProperty("--rain-delay", `${-(l % 17) * 0.11}s`), i.appendChild(b);
      }
    const n = t ? 18 : 11;
    for (let s = 0; s < n; s += 1) {
      const a = s * 43 + 17, l = this.svg("ellipse");
      this.attrs(l, {
        cx: String(28 + a * 67 % 950),
        cy: String(735 + a * 29 % 245),
        rx: String(t ? 7 + a % 7 : 5 + a % 5),
        ry: String(t ? 2.2 : 1.6),
        class: `weather-rain-splash weather-rain-depth-${a % 3}${t ? " is-heavy" : ""}`
      }), l.style.setProperty("--rain-duration", `${(t ? 0.55 : 0.92) + a % 5 * 0.09}s`), l.style.setProperty("--rain-delay", `${-(a % 19) * 0.13}s`), i.appendChild(l);
    }
    e.appendChild(i);
  }
  appendSnow(e, t = !1) {
    const i = this.svg("g");
    i.setAttribute("class", `weather-snow-field${t ? " is-sleet" : ""}`);
    const r = t ? 9 : 11, o = t ? 11 : 12;
    for (let n = 0; n < r; n += 1)
      for (let s = 0; s < o; s += 1) {
        const a = n * 31 + s * 17, l = 30 + s * (t ? 96 : 88) + n % 2 * 31 + a % 9, c = 20 + n * (t ? 119 : 99) + a % 13, d = (t ? 1.7 : 2.1) + a % 4 * 0.72, p = a % (t ? 7 : 5) === 0, u = p ? this.svg("path") : this.svg("circle"), g = `weather-snow-flake weather-snow-size-${a % 3} weather-snow-depth-${a % 3}${p ? " weather-snow-crystal" : ""}${t ? " is-sleet" : ""}`;
        if (p) {
          const m = d * 0.78;
          this.attrs(u, {
            d: `M ${l} ${c - d * 1.8} L ${l} ${c + d * 1.8} M ${l - d * 1.8} ${c} L ${l + d * 1.8} ${c} M ${l - m} ${c - m} L ${l + m} ${c + m} M ${l + m} ${c - m} L ${l - m} ${c + m}`,
            class: g
          });
        } else
          this.attrs(u, { cx: String(l), cy: String(c), r: String(d), class: g });
        u.style.setProperty("--snow-duration", `${(t ? 3.8 : 6.2) + a % 8 * 0.42}s`), u.style.setProperty("--snow-delay", `${-(a % 19) * 0.31}s`);
        const b = t ? 8 + a % 11 : 18 + a % 31;
        u.style.setProperty("--snow-drift", `${b}px`), u.style.setProperty("--snow-drift-mid", `${b * -0.35}px`), u.style.setProperty("--snow-turn", `${140 + a % 220}deg`), i.appendChild(u);
      }
    e.appendChild(i);
  }
  appendHail(e) {
    const t = this.svg("g");
    t.setAttribute("class", "weather-hail-field");
    for (let i = -1; i < 15; i += 1)
      for (let r = 0; r < 15; r += 1) {
        const o = Math.abs(i * 41 + r * 23), n = this.svg("circle"), s = 18 + r * 73 + i % 2 * 27 + o % 11, a = i * 76 + o % 17, l = 2.8 + o % 4 * 1.05;
        this.attrs(n, { cx: String(s), cy: String(a), r: String(l), class: `weather-hail-stone weather-hail-depth-${o % 3}` }), n.style.setProperty("--hail-duration", `${0.72 + o % 6 * 0.09}s`), n.style.setProperty("--hail-delay", `${-(o % 17) * 0.08}s`), t.appendChild(n);
      }
    for (let i = 0; i < 16; i += 1) {
      const r = i * 53 + 11, o = this.svg("ellipse");
      this.attrs(o, {
        cx: String(24 + r * 71 % 950),
        cy: String(760 + r * 31 % 210),
        rx: String(4 + r % 5),
        ry: "1.8",
        class: `weather-hail-impact weather-hail-depth-${r % 3}`
      }), o.style.setProperty("--hail-duration", `${0.76 + r % 5 * 0.1}s`), o.style.setProperty("--hail-delay", `${-(r % 19) * 0.09}s`), t.appendChild(o);
    }
    e.appendChild(t);
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
    r.setAttribute("class", `weather-outside-rooms-scene weather-${this.weatherEffect} state-${o}${this.weatherNight ? " is-night" : ""}`), r.setAttribute("mask", `url(#${this.weatherMaskId})`), r.setAttribute("pointer-events", "none");
    const n = Number.isFinite(this.weatherIntensity) ? this.weatherIntensity : 0.6;
    if (r.style.setProperty("--weather-svg-intensity", String(Math.min(1, Math.max(0, n)))), (["cloudy", "rain", "storm", "snow"].includes(this.weatherEffect) || this.weatherState === "windy-variant") && (this.appendClouds(r), this.appendMagicMotes(r, "cloud")), this.weatherEffect === "fog" && this.appendFog(r), this.weatherEffect === "cloudy" && this.weatherState === "cloudy" && this.appendFog(r, "cloudy"), this.weatherEffect === "cloudy" && this.weatherState === "partlycloudy" && this.appendFog(r, "partlycloudy"), this.weatherEffect === "rain" && this.appendRain(r, this.weatherState === "pouring"), this.weatherEffect === "storm" && this.weatherState !== "lightning" && this.appendRain(r, this.weatherState === "lightning-rainy"), this.weatherEffect === "snow" && this.weatherState !== "hail" && (this.appendSnow(r, this.weatherState === "snowy-rainy"), this.appendMagicMotes(r, "snow")), this.weatherState === "snowy-rainy" && this.appendRain(r), this.weatherState === "hail" && this.appendHail(r), this.weatherEffect === "wind" && (this.appendWind(r), this.appendMagicMotes(r, "wind")), this.weatherEffect === "exceptional" && (this.appendClouds(r), this.appendWind(r), this.appendMagicMotes(r, "cloud"), this.appendExceptionalMagic(r)), this.weatherEffect === "storm") {
      const l = this.svg("rect");
      this.attrs(l, { x: "0", y: "0", width: String(x), height: String(x), class: "weather-storm-flash" }), r.appendChild(l);
      const c = this.svg("ellipse");
      this.attrs(c, { cx: "720", cy: "150", rx: "290", ry: "220", class: "weather-storm-glow" }), r.appendChild(c);
    }
    const a = t.querySelector(":scope > g.rooms-scene");
    t.insertBefore(r, a ?? null);
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
    .weather-outside-rooms-scene .weather-rain-field { filter: drop-shadow(0 2px 2px rgba(24,35,42,.20)); }
    .weather-outside-rooms-scene .weather-rain-drop {
      fill: rgba(78, 105, 118, .58);
      stroke: rgba(226, 235, 232, .34);
      stroke-width: .5;
      opacity: .76;
      transform-box: fill-box;
      transform-origin: center;
      animation: explorerRainDrop var(--rain-duration,1.1s) cubic-bezier(.42,0,.72,.58) infinite;
      animation-delay: var(--rain-delay,0s);
    }
    .weather-outside-rooms-scene .weather-rain-drop.is-heavy { fill: rgba(51,77,89,.74); stroke-width: .7; opacity: .92; }
    .weather-outside-rooms-scene .weather-rain-depth-0 { opacity: .42; filter: blur(.45px); }
    .weather-outside-rooms-scene .weather-rain-depth-1 { opacity: .68; }
    .weather-outside-rooms-scene .weather-rain-depth-2 { opacity: .90; filter: drop-shadow(0 0 2px rgba(220,235,238,.30)); }
    .weather-outside-rooms-scene .weather-rain-splash {
      fill: none;
      stroke: rgba(190, 211, 215, .55);
      stroke-width: 1.4;
      opacity: 0;
      transform-box: fill-box;
      transform-origin: center;
      animation: explorerRainSplash var(--rain-duration,1.1s) ease-out infinite;
      animation-delay: var(--rain-delay,0s);
    }
    .weather-outside-rooms-scene .weather-rain-splash.is-heavy { stroke-width: 1.9; }
    .weather-outside-rooms-scene .weather-snow-flake {
      fill: #fff8df;
      stroke: rgba(172, 155, 121, .72);
      stroke-width: .8;
      opacity: .88;
      transform-box: fill-box;
      transform-origin: center;
      filter: drop-shadow(0 0 3px rgba(255, 239, 189, .48));
      animation: explorerSnowFall var(--snow-duration,7s) ease-in-out infinite;
      animation-delay: var(--snow-delay,0s);
    }
    .weather-outside-rooms-scene .weather-snow-size-0 { opacity: .48; }
    .weather-outside-rooms-scene .weather-snow-size-1 { opacity: .76; }
    .weather-outside-rooms-scene .weather-snow-size-2 { opacity: .98; }
    .weather-outside-rooms-scene .weather-snow-depth-0 { filter: blur(.65px); }
    .weather-outside-rooms-scene .weather-snow-depth-1 { filter: drop-shadow(0 0 2px rgba(255,239,189,.32)); }
    .weather-outside-rooms-scene .weather-snow-depth-2 { filter: drop-shadow(0 0 5px rgba(255,239,189,.58)); }
    .weather-outside-rooms-scene .weather-snow-crystal { fill: none; stroke: rgba(255, 247, 218, .92); stroke-width: 1.4; filter: drop-shadow(0 0 5px rgba(242, 220, 159, .72)); }
    .weather-outside-rooms-scene .weather-snow-flake.is-sleet { fill: rgba(223,235,235,.84); opacity: .58; filter: drop-shadow(0 1px 2px rgba(91,112,121,.32)); }
    .weather-outside-rooms-scene .weather-hail-stone {
      fill: #f8f4e8;
      stroke: rgba(101,120,130,.82);
      stroke-width: 1.25;
      opacity: .92;
      transform-box: fill-box;
      transform-origin: center;
      filter: drop-shadow(1px 2px 2px rgba(39,54,62,.38));
      animation: explorerHailFall var(--hail-duration,.92s) cubic-bezier(.38,0,.72,.55) infinite;
      animation-delay: var(--hail-delay,0s);
    }
    .weather-outside-rooms-scene .weather-hail-depth-0 { opacity: .48; filter: blur(.35px); }
    .weather-outside-rooms-scene .weather-hail-depth-1 { opacity: .72; }
    .weather-outside-rooms-scene .weather-hail-depth-2 { opacity: .96; }
    .weather-outside-rooms-scene .weather-hail-impact {
      fill: none;
      stroke: rgba(215,229,229,.66);
      stroke-width: 1.3;
      opacity: 0;
      transform-box: fill-box;
      transform-origin: center;
      animation: explorerHailImpact var(--hail-duration,.92s) ease-out infinite;
      animation-delay: var(--hail-delay,0s);
    }
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
    .weather-outside-rooms-scene .weather-storm-flash { fill: #e8f2f4; opacity: 0; mix-blend-mode: screen; animation: explorerStormFlash 7.8s ease-out infinite; }
    .weather-outside-rooms-scene .weather-storm-glow { fill: rgba(221,235,239,.68); opacity: 0; filter: blur(70px); mix-blend-mode: screen; animation: explorerStormGlow 7.8s ease-out infinite; }
    .weather-outside-rooms-scene.is-night .weather-rain-drop { fill: rgba(132,150,158,.64); stroke: rgba(224,227,218,.18); opacity: .72; }
    .weather-outside-rooms-scene.is-night .weather-cloud-rim { stroke: rgba(188, 207, 219, .40); filter: drop-shadow(0 0 6px rgba(158, 190, 211, .46)); }
    .weather-outside-rooms-scene.is-night .weather-wind-line-core { stroke: rgba(165, 190, 204, .64); filter: drop-shadow(0 0 4px rgba(149, 183, 202, .46)); }
    .weather-outside-rooms-scene.is-night .weather-wind-line-glow { stroke: rgba(173, 204, 220, .34); }
    .weather-outside-rooms-scene.is-night .weather-magic-mote-cloud,
    .weather-outside-rooms-scene.is-night .weather-magic-mote-wind { fill: rgba(211, 228, 236, .74); filter: drop-shadow(0 0 6px rgba(165, 203, 223, .70)); }
    .weather-outside-rooms-scene.is-night .weather-fog-band { opacity: .46; }
    .weather-outside-rooms-scene.is-night .weather-storm-flash { animation-name: explorerStormFlashNight; }
    .weather-outside-rooms-scene.is-night .weather-storm-glow { fill: rgba(177,205,222,.62); }
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
    @keyframes explorerRainDrop { from { transform: translate(7px,-42px) scale(.72); opacity: 0; } 10% { opacity: .82; } 76% { opacity: .72; } to { transform: translate(-13px,92px) scale(1.05); opacity: 0; } }
    @keyframes explorerRainSplash { 0%,72% { transform: scale(.18); opacity: 0; } 78% { opacity: .68; } 100% { transform: scale(1.65); opacity: 0; } }
    @keyframes explorerSnowFall { 0% { transform: translate(0,-38px) rotate(0deg) scale(.72); opacity: 0; } 12% { opacity: .88; } 46% { transform: translate(var(--snow-drift-mid,-10px),18px) rotate(96deg) scale(.94); } 78% { opacity: .74; } 100% { transform: translate(var(--snow-drift,28px),88px) rotate(var(--snow-turn,210deg)) scale(1.08); opacity: 0; } }
    @keyframes explorerHailFall { 0% { transform: translate(8px,-52px) scale(.76); opacity: 0; } 12% { opacity: .94; } 72% { transform: translate(-11px,78px) scale(1); } 79% { transform: translate(-12px,66px) scale(.94); } 88% { transform: translate(-14px,83px) scale(1); opacity: .9; } 100% { transform: translate(-16px,91px) scale(.82); opacity: 0; } }
    @keyframes explorerHailImpact { 0%,68% { transform: scale(.2); opacity: 0; } 76% { opacity: .72; } 100% { transform: scale(1.6); opacity: 0; } }
    @keyframes explorerWindSweep { from { stroke-dashoffset: 620; transform: translateX(-74px); } to { stroke-dashoffset: 0; transform: translateX(92px); } }
    @keyframes explorerMagicMote { 0%,100% { transform: translate(0,8px) scale(.30) rotate(0deg); opacity: .08; } 28% { opacity: .74; } 52% { transform: translate(8px,-7px) scale(1.18) rotate(45deg); opacity: 1; } 76% { opacity: .46; } }
    @keyframes explorerExceptionalOrbit { from { transform: rotate(0deg) scale(.98); stroke-dashoffset: 0; } 50% { transform: rotate(180deg) scale(1.025); } to { transform: rotate(360deg) scale(.98); stroke-dashoffset: -240; } }
    @keyframes explorerStormFlash { 0%,8%,10%,12%,58%,60%,100% { opacity: 0; } 8.6% { opacity: .24; } 9.35% { opacity: .06; } 10.4% { opacity: .38; } 58.7% { opacity: .18; } }
    @keyframes explorerStormFlashNight { 0%,8%,10%,12%,58%,60%,100% { opacity: 0; } 8.6% { opacity: .18; } 9.35% { opacity: .04; } 10.4% { opacity: .28; } 58.7% { opacity: .13; } }
    @keyframes explorerStormGlow { 0%,7.8%,12%,58%,61%,100% { opacity: 0; transform: scale(.82); } 8.8% { opacity: .50; transform: scale(1.05); } 10.5% { opacity: .72; transform: scale(1.14); } 59% { opacity: .34; transform: scale(1); } }
    @media(prefers-reduced-motion:reduce) {
      .weather-outside-rooms-scene .weather-cloud,
      .weather-outside-rooms-scene .weather-cloud-fine-strand,
      .weather-outside-rooms-scene .weather-cloud-rim,
      .weather-outside-rooms-scene .weather-fog-band,
      .weather-outside-rooms-scene .weather-rain-drop,
      .weather-outside-rooms-scene .weather-rain-splash,
      .weather-outside-rooms-scene .weather-snow-flake,
      .weather-outside-rooms-scene .weather-hail-stone,
      .weather-outside-rooms-scene .weather-hail-impact,
      .weather-outside-rooms-scene .weather-wind-line,
      .weather-outside-rooms-scene .weather-magic-mote,
      .weather-outside-rooms-scene .weather-exceptional-orbit,
      .weather-outside-rooms-scene .weather-storm-flash,
      .weather-outside-rooms-scene .weather-storm-glow { animation: none; }
    }
  `;
Xe([
  C({ type: Boolean, attribute: "hide-source-text" })
], Se.prototype, "hideSourceText", 2);
Xe([
  C({ attribute: "weather-effect" })
], Se.prototype, "weatherEffect", 2);
Xe([
  C({ attribute: "weather-state" })
], Se.prototype, "weatherState", 2);
Xe([
  C({ type: Number, attribute: "weather-intensity" })
], Se.prototype, "weatherIntensity", 2);
Xe([
  C({ type: Boolean, attribute: "weather-night" })
], Se.prototype, "weatherNight", 2);
Se = Xe([
  D("explorer-source-clean-canvas")
], Se);
const kn = (e) => e.strings === void 0, An = {}, Sn = (e, t = An) => e._$AH = t;
const Re = fr(class extends br {
  constructor(e) {
    if (super(e), e.type !== Ne.PROPERTY && e.type !== Ne.ATTRIBUTE && e.type !== Ne.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!kn(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === se || t === f) return t;
    const i = e.element, r = e.name;
    if (e.type === Ne.PROPERTY) {
      if (t === i[r]) return se;
    } else if (e.type === Ne.BOOLEAN_ATTRIBUTE) {
      if (!!t === i.hasAttribute(r)) return se;
    } else if (e.type === Ne.ATTRIBUTE && i.getAttribute(r) === t + "") return se;
    return Sn(e), t;
  }
});
var Cn = Object.defineProperty, En = Object.getOwnPropertyDescriptor, Ye = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? En(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Cn(t, i, o), o;
};
const Nn = [
  { value: "person", label: "Person" },
  { value: "pet", label: "Kæledyr" },
  { value: "robot", label: "Robot" },
  { value: "vehicle", label: "Køretøj" },
  { value: "object", label: "Objekt" }
], Pn = /* @__PURE__ */ new Set(["sensor", "input_select", "select"]);
function Rn(e) {
  return e.split(".", 1)[0] ?? "";
}
function Gt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function Mn(e) {
  return Math.min(1, Math.max(0, e));
}
function zn(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let de = class extends L {
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
      presence_anchor: { ...n, [t]: Mn(r) }
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
    const o = zn({
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
    const i = t ? this.entities.filter((r) => Pn.has(Rn(r.entity_id))) : this.entities;
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
              .value=${Re(e.area_id ?? "")}
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
              .value=${Re(e.type ?? "person")}
              @change=${(n) => this.updatePresence(t, {
      type: n.target.value
    })}
            >
              ${Nn.map(
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
            .value=${Re(e.room_id ?? "")}
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
de.styles = j`
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
Ye([
  C({ attribute: !1 })
], de.prototype, "hass", 2);
Ye([
  v()
], de.prototype, "config", 2);
Ye([
  v()
], de.prototype, "areas", 2);
Ye([
  v()
], de.prototype, "areaError", 2);
Ye([
  v()
], de.prototype, "loadingAreas", 2);
de = Ye([
  D("ha-explorer-card-editor")
], de);
var Tn = Object.defineProperty, Dn = Object.getOwnPropertyDescriptor, F = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Dn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Tn(t, i, o), o;
};
const re = 1e3, bt = (e) => Math.min(1, Math.max(0, e));
function Yi(e) {
  return e.length ? { x: e.reduce((t, i) => t + i[0], 0) / e.length, y: e.reduce((t, i) => t + i[1], 0) / e.length } : { x: 0.5, y: 0.5 };
}
function In(e) {
  const t = e.points.map((r) => r[0]), i = e.points.map((r) => r[1]);
  return { minX: Math.min(...t), minY: Math.min(...i), maxX: Math.max(...t), maxY: Math.max(...i) };
}
function jn(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "room";
}
function Qi(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
let B = class extends L {
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
    const s = Qi(n.attributes[o.x_attribute ?? "map_x"]), a = Qi(n.attributes[o.y_attribute ?? "map_y"]), l = t.physical_meters;
    if (s === void 0 || a === void 0 || !l) return;
    const c = In(t), d = bt((e[0] - c.minX) / (c.maxX - c.minX || 1)), p = bt((e[1] - c.minY) / (c.maxY - c.minY || 1));
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
    const t = jn(e), i = new Set(this.rooms.map((o) => o.id));
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
        const e = this.draftRoomName.trim() || `Rum ${this.rooms.length + 1}`, t = this.uniqueRoomId(e), i = Yi(this.pendingPoints), r = this.meters(), o = { id: t, name: e, points: this.pendingPoints, presence_anchor: i, ...this.draftAreaId ? { area_id: this.draftAreaId } : {}, ...r ? { physical_meters: r } : {} };
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
    const t = e.points.map(([n, s]) => `${n * re},${s * re}`).join(" "), i = e.id === this.selectedRoomId, r = Yi(e.points), o = i && this.drawingMode === "anchor" && this.pendingAnchor ? this.pendingAnchor : e.presence_anchor ?? r;
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
B.styles = j`:host{display:block}.drawing-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading h3{margin:3px 0}.heading small{color:var(--secondary-text-color);font-weight:700;letter-spacing:.08em}.instruction,.selected,.warning,.position-cal{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color)}.position-cal{display:grid;gap:9px}.position-cal strong{color:var(--primary-text-color)}.grid,.dimensions{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;align-items:end}.cal-status{display:flex;gap:18px;flex-wrap:wrap}label{display:grid;gap:5px;font-size:.8rem;color:var(--secondary-text-color)}label.toggle{display:flex;align-items:center;gap:8px;min-height:38px;font-size:.9rem;color:var(--primary-text-color)}label.toggle input{width:auto}input,select{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;height:min(58vh,620px);cursor:crosshair}text{fill:var(--primary-text-color);font-size:24px;font-weight:700}.pending-fill{fill:var(--primary-color);fill-opacity:.18;stroke:var(--primary-color);stroke-width:5}.pending-line{stroke:var(--primary-color);stroke-width:6}.pending-point,.anchor{fill:var(--primary-color);stroke:white;stroke-width:4}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{padding:9px 13px;border:1px solid var(--divider-color);border-radius:9px;background:var(--secondary-background-color);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:var(--primary-color)}button.danger{background:var(--error-color,#db4437);color:#fff;border-color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}.selected{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}`;
F([
  C({ attribute: !1 })
], B.prototype, "hass", 2);
F([
  v()
], B.prototype, "roomConfig", 2);
F([
  v()
], B.prototype, "drawingMode", 2);
F([
  v()
], B.prototype, "selectedRoomId", 2);
F([
  v()
], B.prototype, "pendingPoints", 2);
F([
  v()
], B.prototype, "pendingAnchor", 2);
F([
  v()
], B.prototype, "draftRoomName", 2);
F([
  v()
], B.prototype, "draftAreaId", 2);
F([
  v()
], B.prototype, "draftWidth", 2);
F([
  v()
], B.prototype, "draftHeight", 2);
F([
  v()
], B.prototype, "draftFlipX", 2);
F([
  v()
], B.prototype, "draftFlipY", 2);
F([
  v()
], B.prototype, "calA", 2);
F([
  v()
], B.prototype, "calB", 2);
F([
  v()
], B.prototype, "calC", 2);
F([
  v()
], B.prototype, "calibrationMessage", 2);
F([
  v()
], B.prototype, "drawingAreas", 2);
F([
  v()
], B.prototype, "drawingAreaError", 2);
F([
  co("ha-explorer-card-editor")
], B.prototype, "baseEditor", 2);
B = F([
  D("ha-explorer-room-drawing-editor")
], B);
function ue(e) {
  return e?.trim() || void 0;
}
function qn(e) {
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
function Ln(e, t) {
  const i = e.rooms ?? [], r = e.presences ?? [], o = e.zones ?? [], n = e.openings ?? [], s = e.route_nodes ?? [], a = e.route_graph_edges ?? [], l = e.routes ?? [], c = i.flatMap((k) => k.reactions ?? []), d = i.flatMap((k) => k.quick_actions ?? []), p = On(e), u = [];
  if (t)
    for (const k of p) {
      const w = t.states[k.entity];
      if (!w) {
        u.push({ ...k, unavailable: !1 });
        continue;
      }
      (w.state === "unavailable" || w.state === "unknown") && u.push({ ...k, unavailable: !0 });
    }
  const g = u.filter((k) => !k.unavailable), b = r.filter((k) => !qn(k)), m = i.filter((k) => k.points.length < 3), y = (e.image ?? e.background ?? "").trim(), S = [{ id: "floorplan", label: "Plantegning", detail: y ? "Plantegning er valgt." : "Vælg en SVG-, PNG- eller JPG-plantegning.", state: y ? "ready" : "attention", target: "basic" }, { id: "rooms", label: "Rum", detail: i.length ? m.length ? `${i.length} rum · ${m.length} mangler en gyldig polygon.` : `${i.length} rum klar.` : "Tegn mindst ét rum for room-aware tracking og Living Rooms.", state: i.length && !m.length ? "ready" : "attention", target: i.length ? "rooms" : "room-tools" }, { id: "presences", label: "Personer & objekter", detail: r.length ? b.length ? `${r.length} tilføjet · ${b.length} mangler rum/position.` : `${r.length} tracking-profil${r.length === 1 ? "" : "er"} klar.` : "Valgfrit · tilføj personer, kæledyr, robotter eller objekter.", state: r.length ? b.length ? "attention" : "ready" : "optional", target: "presences" }, { id: "entities", label: "Home Assistant-entities", detail: p.length ? t ? g.length ? `${g.length} binding${g.length === 1 ? "" : "er"} findes ikke i Home Assistant.` : u.length ? `${p.length} bindings fundet · ${u.length} er midlertidigt unavailable/unknown.` : `${p.length} live binding${p.length === 1 ? "" : "er"} fundet.` : `${p.length} binding${p.length === 1 ? "" : "er"} · afventer Home Assistant.` : "Ingen live entity-bindings endnu.", state: g.length ? "attention" : p.length ? "ready" : "optional", target: g[0]?.target ?? u[0]?.target ?? "diagnostics" }, { id: "openings", label: "Døre & vinduer", detail: n.length ? `${n.length} dynamisk${n.length === 1 ? " åbning" : "e åbninger"} konfigureret.` : "Valgfrit · placér døre og vinduer og bind dem til kontaktsensorer.", state: n.length ? "ready" : "optional", target: "openings" }, { id: "routing", label: "Routing", detail: a.length || l.length ? `${a.length} graph edges · ${l.length} manuelle routes · ${s.length} nodes.` : "Valgfrit · kortet kan bruges uden route graph.", state: a.length || l.length ? "ready" : "optional", target: a.length ? "route-graph" : "routes" }, { id: "living", label: "Living Rooms", detail: c.length ? `${c.length} rumreaktion${c.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · lys, motion, media og åbninger kan gøre rummene levende.", state: c.length ? "ready" : "optional", target: "room-reactions" }, { id: "quick-actions", label: "Rumhandlinger", detail: d.length ? `${d.length} scene- eller scripthandling${d.length === 1 ? "" : "er"} konfigureret.` : "Valgfrit · tilføj scenes og scripts direkte til rummets panel.", state: d.length ? "ready" : "optional", target: "room-actions" }, { id: "zones", label: "Dynamic Areas", detail: o.length ? `${o.length} zone${o.length === 1 ? "" : "r"} konfigureret.` : "Valgfrit · tilføj alarm-, rengørings- eller informationszoner.", state: o.length ? "ready" : "optional", target: "zones" }];
  return { items: S, entityIssues: u, attentionCount: S.filter((k) => k.state === "attention").length, configuredFeatureCount: S.filter((k) => k.state === "ready").length, roomCount: i.length, presenceCount: r.length, zoneCount: o.length, reactionCount: c.length, actionCount: d.length, routeCount: a.length + l.length, nodeCount: s.length };
}
var Bn = Object.defineProperty, Hn = Object.getOwnPropertyDescriptor, bi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Hn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Bn(t, i, o), o;
};
const Fn = {
  ready: "Klar",
  attention: "Tjek",
  optional: "Valgfrit"
};
let at = class extends L {
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
    const e = Ln(this.config, this.hass), t = e.attentionCount === 0, i = e.entityIssues.slice(0, 4);
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
  D("ha-explorer-setup-overview")
], at);
var Zn = Object.defineProperty, Vn = Object.getOwnPropertyDescriptor, Cr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Vn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Zn(t, i, o), o;
};
const Ut = [
  ["classic", "Classic", "Den neutrale Home Assistant Explorer-stil."],
  [
    "enchanted_antique",
    "Enchanted Antique Map",
    "Original magisk kortstil med pergament, sepia-blæk og levende kortdetaljer."
  ]
], Kn = [
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
let Pt = class extends L {
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
    const e = Ut.find((a) => a[0] === this.theme) ?? Ut[0], t = this.dayNight, i = this.compass, r = this.alarm, o = this.occupancy, n = this.weather, s = this.config.appearance?.hide_source_text ?? !1;
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
            ${Ut.map(
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
                      ${Kn.map(
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
  D("ha-explorer-theme-editor")
], Pt);
var Wn = Object.defineProperty, Gn = Object.getOwnPropertyDescriptor, Er = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Gn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Wn(t, i, o), o;
};
const Ji = { person: "Person · skoaftryk", pet: "Kæledyr · poteaftryk", robot: "Robot · hjulspor", vehicle: "Køretøj · dobbelte hjulspor", object: "Objekt · magisk spor" };
let Rt = class extends L {
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
      return h`<article class="profile"><div class="profile-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><span class="type-badge">${Ji[r]}</span></div><div class="grid two"><label>Farve (valgfri)<input .value=${t.color ?? ""} placeholder="Automatisk stabil farve" @change=${(o) => this.updateOptionalText(i, "color", o.target.value)}/><small>Farven på selve markøren. Tom = automatisk.</small></label><label>Ikon (valgfri)<input .value=${t.icon ?? ""} placeholder="Automatisk type-ikon" maxlength="8" @change=${(o) => this.updateOptionalText(i, "icon", o.target.value)}/><small>Bruges i den store markør; type-badget vises stadig.</small></label></div><label class="toggle"><input type="checkbox" .checked=${t.visible !== !1} @change=${(o) => this.updatePresence(i, { visible: o.target.checked })}/><span><strong>Vis på kortet</strong><small>Skjuler markøren manuelt; tracking-konfigurationen bevares.</small></span></label><div class="trail-box"><div class="trail-heading"><strong>👣 Bevægelsesspor</strong><small>${Ji[r]}</small></div><label class="toggle"><input type="checkbox" .checked=${t.trail_visible !== !1} @change=${(o) => this.updatePresence(i, { trail_visible: o.target.checked })}/><span><strong>Vis spor</strong><small>Kan slås fra uden at skjule personen eller objektet.</small></span></label><div class="grid two"><label>Sporfarve (valgfri)<input .value=${t.trail_color ?? ""} placeholder="Samme som markør" @change=${(o) => this.updateOptionalText(i, "trail_color", o.target.value)}/><small>Fx #4b301d. Tom = markørens farve.</small></label><label>Varighed (sekunder)<input type="number" min="1" max="60" step="1" .value=${String(t.trail_duration ?? 4.2)} @change=${(o) => this.updateTrailDuration(i, o.target.value)}/><small>Hvor længe sporene falmer på kortet. 1–60 sek.</small></label></div></div></article>`;
    })}</div>` : h`<div class="empty">Tilføj først en person eller et objekt i sektionen ovenfor.</div>`}${e.length ? h`<div class="note">Sportypen vælges automatisk efter type. Reduced Motion deaktiverer bevægelsesspor, men markørerne forbliver synlige.</div>` : f}</section>`;
  }
};
Rt.styles = j`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.heading,.profile-heading,.trail-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.heading>div,.profile-heading>div{display:grid;gap:3px}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:0;font-size:1rem}.count,.type-badge{border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);white-space:nowrap}.count{padding:5px 9px;font-size:.78rem}.type-badge{padding:4px 8px;font-size:.72rem}.intro,.note{margin:0;color:var(--secondary-text-color);font-size:.86rem;line-height:1.45}.profiles{display:grid;gap:10px}.profile{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.profile-heading small,label small,.toggle small,.trail-heading small{color:var(--secondary-text-color);font-size:.76rem;font-weight:400;line-height:1.35}.grid{display:grid;gap:10px}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}label{display:grid;gap:6px;font-weight:600}input[type="text"],input:not([type]),input[type="number"]{box-sizing:border-box;width:100%;min-width:0;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:9px;padding-top:2px}.toggle input{margin-top:3px}.toggle span{display:grid;gap:2px}.trail-box{display:grid;gap:11px;padding:12px;border:1px dashed var(--divider-color);border-radius:9px;background:var(--card-background-color)}.trail-heading{align-items:center}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}.empty{color:var(--secondary-text-color);text-align:center;font-size:.84rem}@media(max-width:600px){.grid.two{grid-template-columns:1fr}.heading,.profile-heading{align-items:flex-start}.type-badge{white-space:normal;text-align:right}}`;
Er([
  C({ attribute: !1 })
], Rt.prototype, "config", 2);
Rt = Er([
  D("ha-explorer-presence-polish-editor")
], Rt);
var Un = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, Nr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Xn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Un(t, i, o), o;
};
let Mt = class extends L {
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
Nr([
  C({ attribute: !1 })
], Mt.prototype, "config", 2);
Mt = Nr([
  D("ha-explorer-movement-history-editor")
], Mt);
var Yn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, Pr = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Qn(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Yn(t, i, o), o;
};
let zt = class extends L {
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
zt.styles = j`:host{display:block}.panel{display:grid;gap:14px;margin-top:12px;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}.eyebrow{color:var(--secondary-text-color);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}h3{margin:3px 0 0;font-size:1rem}p,small{margin:0;color:var(--secondary-text-color);font-size:.8rem;line-height:1.45}label{display:grid;gap:7px;font-weight:600}.grid{display:grid;gap:9px}.toggle{grid-template-columns:auto 1fr;align-items:start;gap:10px;padding:11px;border-radius:10px;background:var(--secondary-background-color)}.toggle input{margin-top:3px}.toggle span{display:grid;gap:3px}input[type="range"]{width:100%}`;
Pr([
  C({ attribute: !1 })
], zt.prototype, "config", 2);
zt = Pr([
  D("ha-explorer-pet-robot-trails-editor")
], zt);
var Jn = Object.defineProperty, $n = Object.getOwnPropertyDescriptor, yi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? $n(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Jn(t, i, o), o;
};
function Xt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function $i(e) {
  return Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0 && t !== ""));
}
let lt = class extends L {
  emit(e) {
    this.config && this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config, presences: e } }, bubbles: !0, composed: !0 }));
  }
  updatePresence(e, t) {
    const i = [...this.config?.presences ?? []], r = i[e];
    r && (i[e] = { ...r, type: "pet", ...t }, this.emit(i));
  }
  updateBinding(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { entity_binding: $i({ ...i.entity_binding, ...t }) });
  }
  updateDetection(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { shelly_pet_detection: $i({ enabled: !0, height_attribute: "maxz", target_id_attribute: "target_id", timestamp_attribute: "timestamp", max_height_m: 0.75, release_height_m: 0.95, confirmation_updates: 3, release_updates: 2, ...i.shelly_pet_detection, ...t }) });
  }
  addRabbit() {
    const e = [...this.config?.presences ?? []], t = new Set(e.map((o) => o.id));
    let i = 1;
    for (; t.has(i === 1 ? "kanin" : `kanin_${i}`); ) i += 1;
    const r = i === 1 ? "kanin" : `kanin_${i}`;
    e.push({ id: r, name: "Kanin", type: "pet", visible: !0, trail_visible: !0, icon: "🐇", entity_binding: { coordinate_space: "room_meters", x_attribute: "x", y_attribute: "y" }, shelly_pet_detection: { enabled: !0, height_attribute: "maxz", target_id_attribute: "target_id", timestamp_attribute: "timestamp", max_height_m: 0.75, release_height_m: 0.95, confirmation_updates: 3, release_updates: 2 } }), this.emit(e);
  }
  entities() {
    return Object.values(this.hass?.states ?? {}).filter((e) => e.entity_id.startsWith("sensor.")).sort((e, t) => Xt(e).localeCompare(Xt(t), "da"));
  }
  render() {
    const e = this.config?.presences ?? [], t = e.map((i, r) => ({ presence: i, index: r })).filter(({ presence: i }) => (i.type ?? "person") === "pet");
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Shelly Presence Gen4 · Pet Detection</span><h3>Find kaninen med radar</h3></div><button @click=${this.addRabbit}>+ Tilføj kanin</button></div>
      <p class="intro">Bruger Shelly LiveTrack-koordinaterne og <code>maxz</code>. Et mål skal være lavt flere opdateringer i træk, før det vises som kæledyr. Høje mål skjules i stedet for at blive vist som kanin.</p>
      ${t.length ? t.map(({ presence: i, index: r }) => {
      const o = i.entity_binding ?? {}, n = i.shelly_pet_detection ?? {};
      return h`<article class="pet-card"><div class="pet-heading"><strong>🐇 ${i.name ?? i.id}</strong><span>${n.enabled ? "Aktiv" : "Deaktiveret"}</span></div>
        <label class="toggle"><input type="checkbox" .checked=${n.enabled === !0} @change=${(s) => this.updateDetection(r, { enabled: s.target.checked })}/><span><strong>Automatisk kæledyrsregistrering</strong><small>Påvirker kun denne kæledyrsprofil.</small></span></label>
        <label>LiveTrack-entitet<input list="shelly-pet-entities" .value=${Re(o.position_entity ?? o.entity ?? "")} placeholder="sensor.stue_presence_stuen_target_1" @change=${(s) => this.updateBinding(r, { position_entity: s.target.value.trim() || void 0 })}/><small>Entiteten skal have attributterne x, y, maxz og helst target_id.</small></label>
        <div class="grid three"><label>Rum<select .value=${Re(i.room_id ?? "")} @change=${(s) => this.updatePresence(r, { room_id: s.target.value || void 0 })}><option value="">Vælg rum</option>${(this.config?.rooms ?? []).map((s) => h`<option value=${s.id}>${s.name ?? s.id}</option>`)}</select></label><label>X-attribut<input .value=${Re(o.x_attribute ?? "x")} @change=${(s) => this.updateBinding(r, { x_attribute: s.target.value.trim() || "x", coordinate_space: "room_meters" })}/></label><label>Y-attribut<input .value=${Re(o.y_attribute ?? "y")} @change=${(s) => this.updateBinding(r, { y_attribute: s.target.value.trim() || "y", coordinate_space: "room_meters" })}/></label></div>
        <div class="grid three"><label>Højde-attribut<input .value=${n.height_attribute ?? "maxz"} @change=${(s) => this.updateDetection(r, { height_attribute: s.target.value.trim() || "maxz" })}/></label><label>Target-ID-attribut<input .value=${n.target_id_attribute ?? "target_id"} @change=${(s) => this.updateDetection(r, { target_id_attribute: s.target.value.trim() || "target_id" })}/></label><label>Tidsstempel-attribut<input .value=${n.timestamp_attribute ?? "timestamp"} @change=${(s) => this.updateDetection(r, { timestamp_attribute: s.target.value.trim() || "timestamp" })}/></label></div>
        <div class="grid two"><label>Maks. kaninhøjde: <strong>${n.max_height_m ?? 0.75} m</strong><input type="range" min="0.15" max="1.2" step="0.05" .value=${String(n.max_height_m ?? 0.75)} @input=${(s) => this.updateDetection(r, { max_height_m: Number(s.target.value) })}/></label><label>Skjul igen over: <strong>${n.release_height_m ?? 0.95} m</strong><input type="range" min="0.25" max="1.6" step="0.05" .value=${String(n.release_height_m ?? 0.95)} @input=${(s) => this.updateDetection(r, { release_height_m: Number(s.target.value) })}/></label></div>
        <div class="grid two"><label>Bekræft efter målinger<input type="number" min="1" max="12" .value=${String(n.confirmation_updates ?? 3)} @change=${(s) => this.updateDetection(r, { confirmation_updates: Number(s.target.value) })}/><small>Flere målinger giver færre falske kaniner.</small></label><label>Skjul efter høje målinger<input type="number" min="1" max="12" .value=${String(n.release_updates ?? 2)} @change=${(s) => this.updateDetection(r, { release_updates: Number(s.target.value) })}/></label></div>
      </article>`;
    }) : h`<div class="empty">Ingen kæledyrsprofil endnu. Tryk “Tilføj kanin”.</div>`}
      <datalist id="shelly-pet-entities">${this.entities().map((i) => h`<option value=${i.entity_id}>${Xt(i)}</option>`)}</datalist>
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
  D("ha-explorer-shelly-pet-editor")
], lt);
var _n = Object.defineProperty, es = Object.getOwnPropertyDescriptor, vi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? es(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && _n(t, i, o), o;
};
function Yt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function ts(e) {
  const t = Object.entries(e).filter(([, i]) => i !== void 0 && i !== "");
  return t.length ? Object.fromEntries(t) : void 0;
}
let ct = class extends L {
  emit(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  get entities() {
    return Object.values(this.hass?.states ?? {}).sort((e, t) => Yt(e).localeCompare(Yt(t), "da"));
  }
  updatePresence(e, t) {
    if (!this.config) return;
    const i = [...this.config.presences ?? []];
    i[e] && (i[e] = { ...i[e], ...t }, this.emit({ ...this.config, presences: i }));
  }
  updateBinding(e, t) {
    const i = this.config?.presences?.[e];
    i && this.updatePresence(e, { entity_binding: ts({ ...i.entity_binding, ...t }) });
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
    return h`<datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${Yt(t)}</option>`)}</datalist>`;
  }
  render() {
    const e = (this.config?.presences ?? []).filter((t) => (t.type ?? "person") === "person");
    return this.config ? h`<section class="panel"><div class="heading"><div><span class="eyebrow">Multi-Person & Identity · v0.36.1</span><h3>Hvem er hvor?</h3></div><button class="primary" @click=${this.addPerson}>+ Tilføj person</button></div><p class="intro">Identity Fusion adskiller personens identitet fra positionssensoren. Bind fx <code>person.marc</code> som profil og et Shelly/mmWave-target som live position. Flere personer kan være synlige og bevæge sig samtidig.</p>${e.length ? e.map((t) => {
      const i = (this.config?.presences ?? []).indexOf(t), r = t.entity_binding ?? {}, o = `identity-${i}`, n = `position-${i}`;
      return h`<article class="person-card"><div class="person-heading"><div><strong>${t.name ?? t.id}</strong><small>${t.id}</small></div><button class="danger" @click=${() => this.removePerson(i)}>Fjern</button></div><label>Navn på kortet<input .value=${t.name ?? ""} placeholder="Marc" @change=${(s) => this.updatePresence(i, { name: s.target.value.trim() || void 0 })}/></label><div class="grid two"><label>Identitets-entitet<input list=${o} .value=${r.entity ?? ""} placeholder="person.marc" @change=${(s) => this.updateBinding(i, { entity: s.target.value.trim() || void 0 })}/>${this.datalist(o)}<small>Leverer navn/avatar/status. Typisk en <code>person.*</code>-entity.</small></label><label>Live positions-entitet<input list=${n} .value=${r.position_entity ?? ""} placeholder="sensor.stue_presence_stuen_target_1" @change=${(s) => this.updateBinding(i, { position_entity: s.target.value.trim() || void 0 })}/>${this.datalist(n)}<small>Leverer X/Y. Hvis tom bruges identitets-entiteten som før.</small></label></div><div class="grid three"><label>Koordinatsystem<select .value=${r.coordinate_space ?? "normalized"} @change=${(s) => this.updateBinding(i, { coordinate_space: s.target.value })}><option value="normalized">Normalized 0–1</option><option value="meters">Hele kortet i meter</option><option value="room_meters">Rum i meter</option></select></label><label>X-attribut<input .value=${r.x_attribute ?? (r.coordinate_space === "room_meters" ? "map_x" : "")} placeholder="map_x" @change=${(s) => this.updateBinding(i, { x_attribute: s.target.value.trim() || void 0 })}/></label><label>Y-attribut<input .value=${r.y_attribute ?? (r.coordinate_space === "room_meters" ? "map_y" : "")} placeholder="map_y" @change=${(s) => this.updateBinding(i, { y_attribute: s.target.value.trim() || void 0 })}/></label></div><label>Rum til room_meters<select .value=${t.room_id ?? ""} @change=${(s) => this.updatePresence(i, { room_id: s.target.value || void 0 })}><option value="">Ingen</option>${(this.config?.rooms ?? []).map((s) => h`<option value=${s.id}>${s.name ?? s.id}</option>`)}</select><small>Alle targets i samme rum genbruger rummets 3-punktskalibrering.</small></label></article>`;
    }) : h`<div class="empty">Ingen personer er tilføjet endnu.</div>`}<div class="note">Første version binder identitet til et valgt target. En senere Identity Matching-del kan bevare navnet automatisk, hvis en mmWave-sensor bytter target-numre.</div></section>` : f;
  }
};
ct.styles = j`:host{display:block;min-width:0;max-width:100%;container-type:inline-size}.panel,.person-card,.grid,label,.heading>div,.person-heading>div{min-width:0}.panel{display:grid;gap:14px;width:100%;max-width:100%;box-sizing:border-box;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color);overflow:hidden}.heading,.person-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;min-width:0}.heading>div,.person-heading>div{display:grid;gap:3px}.eyebrow{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:0;font-size:1rem}.intro,.note,small{color:var(--secondary-text-color);line-height:1.4;overflow-wrap:anywhere}.intro,.note{margin:0;font-size:.86rem}.person-card{display:grid;gap:12px;width:100%;max-width:100%;box-sizing:border-box;padding:14px;border:1px solid var(--divider-color);border-radius:11px;background:var(--secondary-background-color);overflow:hidden}label{display:grid;gap:6px;font-weight:600;max-width:100%}.grid{display:grid;gap:10px;width:100%;max-width:100%}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr) minmax(0,.85fr)}input,select,button{box-sizing:border-box;max-width:100%;padding:9px 11px;border:1px solid var(--divider-color);border-radius:8px;color:var(--primary-text-color);background:var(--card-background-color);font:inherit}input,select{width:100%;min-width:0}input{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button{cursor:pointer}.primary{border-color:var(--primary-color);color:var(--primary-color);font-weight:700}.danger{color:var(--error-color,#db4437);flex:0 0 auto}.empty,.note{padding:10px 12px;border-radius:9px;background:var(--secondary-background-color)}code{font-size:.9em;overflow-wrap:anywhere}@container (max-width:560px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}.person-heading{align-items:center}}@container (max-width:390px){.panel{padding:12px}.person-card{padding:11px}.person-heading{flex-wrap:wrap}.person-heading .danger{margin-left:auto}}@media(max-width:700px){.two,.three{grid-template-columns:1fr}.heading{flex-direction:column}.heading button{width:100%}}`;
vi([
  C({ attribute: !1 })
], ct.prototype, "hass", 2);
vi([
  C({ attribute: !1 })
], ct.prototype, "config", 2);
ct = vi([
  D("ha-explorer-identity-editor")
], ct);
var is = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, le = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? rs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && is(t, i, o), o;
};
const xe = 1e3, _i = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Advarsel" },
  { value: "danger", label: "Fare / alarm" },
  { value: "cleaning", label: "Rengøring" },
  { value: "restricted", label: "Begrænset område" }
];
function er(e) {
  return Math.min(1, Math.max(0, e));
}
function os(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "zone";
}
function Qt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function ns(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let ie = class extends L {
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
      (e, t) => Qt(e).localeCompare(Qt(t), "da")
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
    const t = os(e), i = new Set(this.zones.map((o) => o.id));
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
          active_states: ns(this.draftStates)
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
            ${_i.map((t) => h`<option value=${t.value}>${t.label}</option>`)}
          </select>
        </label>
        <label class="wide">
          Home Assistant entity · valgfri
          <input list=${e} .value=${this.draftEntity} placeholder="input_boolean.alarm_zone" @change=${(t) => this.draftEntity = t.target.value} />
          <datalist id=${e}>
            ${this.entities.map((t) => h`<option value=${t.entity_id}>${Qt(t)}</option>`)}
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
                    <span><strong>${r.name ?? r.id}</strong><small>${_i.find((o) => o.value === (r.kind ?? "info"))?.label}</small></span>
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
  D("ha-explorer-zones-editor")
], ie);
var ss = Object.defineProperty, as = Object.getOwnPropertyDescriptor, X = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? as(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ss(t, i, o), o;
};
const qe = 1e3, tr = ["on", "open", "opened", "true"];
function ir(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function ls(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "opening";
}
function Jt(e) {
  const t = e.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : e.entity_id;
}
function cs(e) {
  const t = [...new Set(e.split(",").map((i) => i.trim()).filter(Boolean))];
  return t.length ? t : void 0;
}
let K = class extends L {
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
    return Object.values(this.hass?.states ?? {}).filter((e) => e.entity_id.startsWith("binary_sensor.") || e.entity_id.startsWith("cover.") || e.entity_id.startsWith("input_boolean.") || e.entity_id.startsWith("sensor.")).sort((e, t) => Jt(e).localeCompare(Jt(t), "da"));
  }
  emitConfig(e) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  uniqueId(e) {
    const t = ls(e), i = new Set(this.openings.map((o) => o.id));
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
    return { id: e, name: this.draftName.trim() || e, kind: this.draftKind, point: this.draftPoint, angle: this.draftAngle, length: this.draftLength, hinge: this.draftHinge, swing: this.draftSwing, open_angle: this.draftOpenAngle, visible: this.draftVisible, ...t ? { state_binding: { entity: t, open_states: cs(this.draftStates) } } : {} };
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
    const t = e.id === this.selectedId, i = e.point[0] * qe, r = e.point[1] * qe, o = (e.length ?? 0.055) * qe, n = (e.angle ?? 0) * Math.PI / 180, s = Math.cos(n) * o / 2, a = Math.sin(n) * o / 2;
    return M`<g class=${t ? "opening selected" : "opening"} @click=${(l) => {
      this.placing || (l.stopPropagation(), this.select(e));
    }}><line x1=${i - s} y1=${r - a} x2=${i + s} y2=${r + a}></line><circle cx=${i} cy=${r} r=${t ? 11 : 8}></circle>${e.name ? M`<text x=${i} y=${r - 18} text-anchor="middle">${e.name}</text>` : f}</g>`;
  }
  renderDraft() {
    if (this.selected || !this.placing && this.draftName === "Ny dør") return f;
    const e = this.draftPoint[0] * qe, t = this.draftPoint[1] * qe, i = this.draftLength * qe, r = this.draftAngle * Math.PI / 180, o = Math.cos(r) * i / 2, n = Math.sin(r) * i / 2;
    return M`<g class="opening draft"><line x1=${e - o} y1=${t - n} x2=${e + o} y2=${t + n}></line><circle cx=${e} cy=${t} r="11"></circle></g>`;
  }
  render() {
    if (!this.config) return f;
    const e = this.config.image ?? this.config.background ?? "", t = !!this.selected || this.placing || this.draftName !== "Ny dør";
    return h`<section class="panel"><div class="heading"><div><span class="eyebrow">Dynamic Doors & Windows · v0.38</span><h3>Døre og vinduer</h3><p>Placér åbninger direkte på plantegningen og bind dem til Home Assistant.</p></div><span class="count">${this.openings.length} åbninger</span></div><div class="toolbar"><button class="primary" @click=${() => this.beginNew("door")}>+ Ny dør</button><button @click=${() => this.beginNew("window")}>+ Nyt vindue</button></div><div class="workspace"><div class="map-wrap"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none" @click=${this.handleMapClick}><rect width="1000" height="1000" class="backdrop"></rect>${e ? M`<image href=${e} width="1000" height="1000" preserveAspectRatio="none" opacity=".72"></image>` : f}${this.openings.map((i) => this.renderOpening(i))}${this.renderDraft()}</svg>${this.placing ? h`<div class="map-help">Klik på kortet hvor ${this.draftKind === "door" ? "døren" : "vinduet"} skal sidde</div>` : f}</div><div class="sidebar">${this.openings.length ? this.openings.map((i) => h`<button class=${i.id === this.selectedId ? "row selected" : "row"} @click=${() => this.select(i)}><span><strong>${i.name ?? i.id}</strong><small>${i.kind === "door" ? "Dør" : "Vindue"}</small></span><em>${this.stateText(i)}</em></button>`) : h`<div class="empty">Ingen døre eller vinduer endnu.</div>`}</div></div>${t ? this.renderForm() : f}</section>`;
  }
  renderForm() {
    const e = "explorer-opening-entities";
    return h`<div class="form-grid"><label>Navn<input .value=${this.draftName} @input=${(t) => this.draftName = t.target.value}></label><label>Type<select .value=${this.draftKind} @change=${(t) => this.draftKind = t.target.value}><option value="door">Dør</option><option value="window">Vindue</option></select></label><label>Vinkel · ${Math.round(this.draftAngle)}°<input type="range" min="0" max="359" step="1" .value=${String(this.draftAngle)} @input=${(t) => this.draftAngle = Number(t.target.value)}></label><label>Længde · ${Math.round(this.draftLength * 1e3) / 10}%<input type="range" min="0.025" max="0.14" step="0.0025" .value=${String(this.draftLength)} @input=${(t) => this.draftLength = Number(t.target.value)}></label>${this.draftKind === "door" ? h`<label>Hængsel<select .value=${this.draftHinge} @change=${(t) => this.draftHinge = t.target.value}><option value="start">Start</option><option value="end">Slut</option></select></label><label>Svingretning<select .value=${this.draftSwing} @change=${(t) => this.draftSwing = t.target.value}><option value="left">Venstre</option><option value="right">Højre</option></select></label><label>Åbningsvinkel · ${Math.round(this.draftOpenAngle)}°<input type="range" min="30" max="150" step="1" .value=${String(this.draftOpenAngle)} @input=${(t) => this.draftOpenAngle = Number(t.target.value)}></label>` : f}<label class="wide">Home Assistant entity · valgfri<input list=${e} .value=${this.draftEntity} placeholder="binary_sensor.stuedor" @change=${(t) => this.draftEntity = t.target.value}><datalist id=${e}>${this.entities.map((t) => h`<option value=${t.entity_id}>${Jt(t)}</option>`)}</datalist><small>Vælg fx en dør-/vindueskontakt eller cover-entity.</small></label><label>Åben state(s)<input .value=${this.draftStates} placeholder="on, open" @change=${(t) => this.draftStates = t.target.value}><small>Kommasepareret.</small></label><label class="toggle"><input type="checkbox" .checked=${this.draftVisible} @change=${(t) => this.draftVisible = t.target.checked}>Vis på kortet</label><div class="actions wide"><button @click=${() => this.placing = !0}>Placér igen</button>${this.selected ? h`<button class="danger" @click=${this.deleteSelected}>Slet</button>` : f}<button class="primary" @click=${this.save} ?disabled=${this.placing}>Gem</button></div></div>`;
  }
};
K.styles = j`:host{display:block;margin-top:16px;color:var(--primary-text-color)}.panel{border:1px solid var(--divider-color,#d7dbe0);border-radius:14px;padding:16px;background:var(--card-background-color,#fff)}.heading{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--secondary-text-color)}h3{margin:4px 0;font-size:1.05rem}p{margin:0;color:var(--secondary-text-color);font-size:.86rem}.count{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color,#f2f4f7);font-size:.75rem;white-space:nowrap}.toolbar{display:flex;gap:8px;margin-top:14px}.workspace{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(190px,.8fr);gap:14px;margin-top:12px}.map-wrap{position:relative;min-height:300px;border-radius:12px;overflow:hidden;border:1px solid var(--divider-color,#d7dbe0);background:#d8c9a7}svg{width:100%;height:100%;min-height:300px;display:block;cursor:crosshair}.backdrop{fill:#d8c9a7}.opening{cursor:pointer;pointer-events:all}.opening line{stroke:var(--primary-text-color,#1f2937);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}.opening circle{fill:var(--card-background-color,#fff);stroke:var(--primary-color,#03a9f4);stroke-width:4;vector-effect:non-scaling-stroke}.opening.selected line{stroke:var(--primary-color,#03a9f4);stroke-width:10}.opening.draft line{stroke-dasharray:12 8}.opening text{fill:var(--primary-text-color,#1f2937);stroke:white;stroke-width:5;paint-order:stroke;font-size:20px;font-weight:700;pointer-events:none}.map-help{position:absolute;left:10px;bottom:10px;padding:6px 9px;border-radius:8px;background:rgba(255,255,255,.9);color:#344054;font-size:.75rem;pointer-events:none}.sidebar{display:flex;flex-direction:column;gap:7px;max-height:330px;overflow:auto}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;width:100%}.row.selected{border-color:var(--primary-color);box-shadow:0 0 0 1px var(--primary-color)}.row span{display:flex;flex-direction:column}.row small,.row em{font-size:.68rem;color:var(--secondary-text-color);font-style:normal}.row em{text-align:right}.empty{padding:12px;border:1px dashed var(--divider-color);border-radius:10px;color:var(--secondary-text-color);font-size:.8rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;margin-top:14px;padding-top:14px;border-top:1px solid var(--divider-color)}label{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:650}.wide{grid-column:1/-1}.toggle{flex-direction:row;align-items:center;align-self:end;padding-bottom:8px}input,select{box-sizing:border-box;width:100%;border:1px solid var(--divider-color,#cfd4da);border-radius:8px;padding:8px 9px;background:var(--card-background-color,#fff);color:var(--primary-text-color)}input[type=range]{padding:4px 0}label small{color:var(--secondary-text-color);font-weight:400}.actions{display:flex;justify-content:flex-end;gap:8px}button{border:1px solid var(--divider-color,#cfd4da);border-radius:9px;padding:9px 11px;background:var(--card-background-color,#fff);color:var(--primary-text-color);cursor:pointer}button.primary{background:var(--primary-color,#03a9f4);color:white;border-color:transparent;font-weight:700}button.danger{color:var(--error-color,#db4437)}button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:700px){.workspace,.form-grid{grid-template-columns:1fr}.wide{grid-column:auto}}`;
X([
  C({ attribute: !1 })
], K.prototype, "hass", 2);
X([
  C({ attribute: !1 })
], K.prototype, "config", 2);
X([
  v()
], K.prototype, "selectedId", 2);
X([
  v()
], K.prototype, "placing", 2);
X([
  v()
], K.prototype, "draftName", 2);
X([
  v()
], K.prototype, "draftKind", 2);
X([
  v()
], K.prototype, "draftPoint", 2);
X([
  v()
], K.prototype, "draftAngle", 2);
X([
  v()
], K.prototype, "draftLength", 2);
X([
  v()
], K.prototype, "draftHinge", 2);
X([
  v()
], K.prototype, "draftSwing", 2);
X([
  v()
], K.prototype, "draftOpenAngle", 2);
X([
  v()
], K.prototype, "draftEntity", 2);
X([
  v()
], K.prototype, "draftStates", 2);
X([
  v()
], K.prototype, "draftVisible", 2);
K = X([
  D("ha-explorer-openings-editor")
], K);
var ds = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, ce = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ps(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ds(t, i, o), o;
};
const $t = { light: "Lampe / lys", motion: "Bevægelsessensor", media: "TV / media", opening: "Dør / vindue", temperature: "Temperatur", fireplace: "Pejs / ildsted" }, _t = { light: "✦", motion: "◉", media: "▶", opening: "↗", temperature: "°", fireplace: "🔥" }, ei = (e) => Math.min(1, Math.max(0, e));
let ee = class extends L {
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
    !t || !i || (this.editingIndex = e, this.draftKind = i.kind, this.draftEntity = i.entity, this.draftStates = i.kind === "temperature" ? "" : (i.active_states?.length ? i.active_states : wt(i.kind)).join(", "), this.draftPosition = _e(t, i), this.draftIntensity = i.intensity ?? 0.75, this.draftRadius = i.radius ?? 90);
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
    const t = this.config?.image ?? this.config?.background ?? "", i = this.draftPosition ?? _e(e);
    return h`<div class="placement"><div><strong>Fysisk placering</strong><small>Klik på plantegningen dér hvor entity'en sidder.</small></div><div class="preview" @click=${this.handlePreviewClick}>${t ? h`<img src=${t} alt="">` : f}<svg viewBox="0 0 ${x} ${x}" preserveAspectRatio="none"><polygon points=${e.points.map(([r, o]) => `${r * x},${o * x}`).join(" ")}></polygon>${(e.reactions ?? []).map((r) => {
      const o = _e(e, r);
      return h`<g class="existing" transform=${`translate(${o.x * x} ${o.y * x})`}><circle r="13"></circle><text>${_t[r.kind]}</text></g>`;
    })}<g class="draft-point" transform=${`translate(${i.x * x} ${i.y * x})`}><circle r=${this.draftKind === "fireplace" ? "18" : "14"}></circle><text>${_t[this.draftKind]}</text></g></svg></div><small>${(i.x * 100).toFixed(1)} % / ${(i.y * 100).toFixed(1)} %</small></div>`;
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
    }}>${this.rooms.map((o) => h`<option value=${o.id}>${o.name ?? o.id}</option>`)}</select></label><div class="draft"><strong>${this.editingIndex === void 0 ? "Nyt entity-punkt" : "Redigér entity-punkt"}</strong><div class="grid"><label>Type<select .value=${this.draftKind} @change=${(o) => this.changeKind(o.target.value)}>${Object.keys($t).map((o) => h`<option value=${o}>${$t[o]}</option>`)}</select></label><label>Home Assistant entity<select .value=${this.draftEntity} @change=${(o) => this.draftEntity = o.target.value}><option value="">Vælg entity…</option>${this.draftEntity && !r ? h`<option value=${this.draftEntity}>${this.draftEntity} · eksisterende</option>` : f}${i.map((o) => h`<option value=${o.id}>${o.label === o.id ? o.id : `${o.label} · ${o.id}`}</option>`)}</select></label>${this.draftKind === "temperature" ? h`<div class="note">Temperaturen læses automatisk fra sensoren.</div>` : h`<label>Aktiv state(s)<input .value=${this.draftStates} @input=${(o) => this.draftStates = o.target.value}><small>Flere states adskilles med komma.</small></label>`}${this.draftKind === "fireplace" ? h`<label>🔥 Intensitet · ${Math.round(this.draftIntensity * 100)}%<input type="range" min="0.2" max="1" step="0.05" .value=${String(this.draftIntensity)} @input=${(o) => this.draftIntensity = Number(o.target.value)}></label><label>Glød-radius · ${Math.round(this.draftRadius)}<input type="range" min="30" max="220" step="5" .value=${String(this.draftRadius)} @input=${(o) => this.draftRadius = Number(o.target.value)}><small>Hvor langt den varme ildglød breder sig omkring pejsen.</small></label>` : f}</div>${e ? this.preview(e) : f}<div class="actions"><button @click=${this.save} ?disabled=${!this.draftEntity.trim() || this.isDuplicate()}>${this.editingIndex === void 0 ? "Tilføj punkt" : "Gem ændring"}</button>${this.editingIndex !== void 0 ? h`<button class="secondary" @click=${this.cancelEdit}>Annuller</button>` : f}</div></div><div class="list">${t.map((o, n) => h`<article><span class="glyph">${_t[o.kind]}</span><div><strong>${$t[o.kind]}</strong><small>${o.entity}</small><small>${this.statusLabel(o, n)}${o.kind === "fireplace" ? ` · ${Math.round((o.intensity ?? 0.75) * 100)}% · radius ${o.radius ?? 90}` : ""}</small></div><div class="row-actions"><button class="secondary" @click=${() => this.beginEdit(n)}>Redigér</button><button class="danger" @click=${() => this.removeReaction(n)}>Fjern</button></div></article>`)}</div>` : h`<div class="empty">Tilføj først et rum.</div>`}</section>`;
  }
};
ee.styles = j`:host{display:block}.editor{display:grid;gap:14px;margin-top:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{font-size:.7rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.1em}.heading h3{margin:3px 0 0}.heading b{height:max-content;padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);font-size:.75rem}.intro{margin:0;color:var(--secondary-text-color)}label{display:grid;gap:6px;font-size:.86rem}.draft{display:grid;gap:12px;padding:13px;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}select,input{box-sizing:border-box;width:100%;padding:9px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}small{color:var(--secondary-text-color)}.placement{display:grid;gap:7px}.placement>div:first-child{display:grid}.preview{position:relative;aspect-ratio:1;max-height:360px;overflow:hidden;border:1px solid var(--divider-color);border-radius:10px;background:var(--card-background-color);cursor:crosshair}.preview img,.preview svg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.preview polygon{fill:rgba(120,90,50,.08);stroke:rgba(120,90,50,.5);stroke-width:3}.preview circle{fill:var(--card-background-color);stroke:var(--primary-color);stroke-width:4}.preview text{font-size:18px;text-anchor:middle;dominant-baseline:central}.draft-point text{font-size:22px}.actions,.row-actions{display:flex;gap:8px;flex-wrap:wrap}button{padding:8px 11px;border:0;border-radius:8px;background:var(--primary-color);color:var(--text-primary-color,#fff);font:inherit;cursor:pointer}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437)}button:disabled{opacity:.5;cursor:not-allowed}.list{display:grid;gap:8px}.list article{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:10px;border:1px solid var(--divider-color);border-radius:10px}.list article>div:nth-child(2){display:grid;gap:2px}.glyph{font-size:1.3rem}.note,.empty{padding:10px;border-radius:8px;background:var(--card-background-color);color:var(--secondary-text-color)}@media(max-width:620px){.grid{grid-template-columns:1fr}.list article{grid-template-columns:auto 1fr}.row-actions{grid-column:1/-1}}`;
ce([
  C({ attribute: !1 })
], ee.prototype, "config", 2);
ce([
  C({ attribute: !1 })
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
  D("ha-explorer-room-reactions-editor")
], ee);
var hs = Object.getOwnPropertyDescriptor, us = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? hs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
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
rr = us([
  D("ha-explorer-room-reactions-editor-clean")
], rr);
var gs = Object.defineProperty, ms = Object.getOwnPropertyDescriptor, ye = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ms(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && gs(t, i, o), o;
};
let ae = class extends L {
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
  D("ha-explorer-room-actions-editor")
], ae);
var fs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, W = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? bs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && fs(t, i, o), o;
};
const _ = 1e3;
let V = class extends L {
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
    return Ve(e, (t) => this.entityState(t));
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
          transform=${`translate(${i * _} ${r * _})`}
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
      const r = i.map(([o, n]) => `${o * _},${n * _}`).join(" ");
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
          x=${i[Math.floor(i.length / 2)][0] * _}
          y=${i[Math.floor(i.length / 2)][1] * _ - 18}
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
    const r = i.map((s) => ({ step: s, point: this.resolveStep(s) })).filter((s) => !!s.point), n = [e, ...r.map((s) => s.point), t].map(([s, a]) => `${s * _},${a * _}`).join(" ");
    return M`
      <polyline points=${n} class="route-line" fill="none" vector-effect="non-scaling-stroke"></polyline>
      <g transform=${`translate(${e[0] * _} ${e[1] * _})`}><circle class="endpoint" r="14"></circle></g>
      ${r.map(({ step: s, point: a }, l) => M`
        <g transform=${`translate(${a[0] * _} ${a[1] * _})`}>
          <circle class=${s.node_id ? "waypoint shared-waypoint" : "waypoint"} r="11"></circle>
          <text y="-20" text-anchor="middle">${l + 1}</text>
        </g>
      `)}
      <g transform=${`translate(${t[0] * _} ${t[1] * _})`}><circle class="endpoint" r="14"></circle></g>
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
V.styles = j`
    :host{display:block}.route-editor{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading,.node-heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b,.node-heading>span{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.node-manager{display:grid;gap:9px;padding:12px;border:1px solid var(--divider-color);border-radius:12px}.node-heading>div,.node-copy{display:grid;gap:2px}.node-heading small,.node-copy small{color:var(--secondary-text-color);font-weight:500}.node-list{display:grid;gap:6px}.node-item{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:9px;background:var(--secondary-background-color);border:1px solid transparent}.node-item.blocked{border-color:var(--error-color,#db4437)}.node-copy{flex:1}.node-actions,.node-edit-actions{display:flex;gap:6px;flex-wrap:wrap}.node-dot{width:13px;height:13px;border-radius:50%;background:var(--primary-color,#03a9f4)}.node-dot.junction{border-radius:3px}.node-dot.waypoint{background:var(--secondary-text-color)}.node-status{font-style:normal;font-size:.75rem;font-weight:800;width:max-content;padding:3px 7px;border-radius:999px}.node-status.open{background:rgba(76,175,80,.14);color:var(--success-color,#4caf50)}.node-status.blocked{background:rgba(219,68,55,.14);color:var(--error-color,#db4437)}.node-draft,.node-edit{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;align-items:end;padding:10px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color)}.node-draft label,.node-edit label{display:grid;gap:5px;font-size:.82rem}.node-draft label small,.node-edit label small{color:var(--secondary-text-color);font-size:.74rem}.node-draft input,.node-draft select,.node-edit input,.node-edit select{width:100%;box-sizing:border-box;padding:8px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.node-edit-actions{grid-column:1/-1}.node-add{justify-self:start}.route-list{display:grid;gap:7px}.route-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid transparent}.route-item.selected{border-color:var(--primary-color,#03a9f4);box-shadow:0 0 0 1px var(--primary-color,#03a9f4) inset}.route-index{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-background-color);font-size:.75rem}.route-copy{display:grid;gap:2px}.route-copy small{color:var(--secondary-text-color);font-weight:500}.route-empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.instruction,.empty{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1;cursor:default}.map-frame.drawing svg{cursor:crosshair}.network-route{stroke:var(--secondary-text-color);stroke-opacity:.36;stroke-width:4;stroke-dasharray:10 10;pointer-events:stroke;cursor:pointer}.network-route:hover{stroke:var(--primary-color,#03a9f4);stroke-opacity:.8;stroke-width:7}.network-number{font-size:22px;font-weight:800;fill:var(--secondary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:7;stroke-linejoin:round;pointer-events:none}.route-line{stroke:var(--primary-color,#03a9f4);stroke-width:6;stroke-dasharray:14 9}.endpoint{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.waypoint{fill:#fff;stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-waypoint{fill:var(--primary-color,#03a9f4);stroke:white}.shared-node circle{fill:var(--card-background-color);stroke:var(--primary-color,#03a9f4);stroke-width:5}.shared-node.blocked circle{stroke:var(--error-color,#db4437)}.shared-node.selectable{cursor:pointer}.shared-node.selectable:hover circle{fill:var(--primary-color,#03a9f4)}.shared-node text{font-size:20px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6;stroke-linejoin:round;pointer-events:none}.shared-node .usage{font-size:16px;stroke:none;fill:var(--primary-text-color)}text{font-size:24px;font-weight:700;fill:var(--primary-text-color)}.buttons{display:flex;flex-wrap:wrap;gap:8px}button{border:0;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:default}.mini{padding:6px 8px;font-size:.76rem}.primary{background:var(--primary-color,#03a9f4);color:white}.secondary{background:var(--secondary-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.danger{background:var(--error-color,#db4437);color:white}@media(max-width:600px){.selectors,.node-draft,.node-edit{grid-template-columns:1fr}.node-edit-actions{grid-column:auto}.node-draft button{justify-self:start}.node-actions{flex-direction:column}}
  `;
W([
  C({ attribute: !1 })
], V.prototype, "config", 2);
W([
  C({ attribute: !1 })
], V.prototype, "hass", 2);
W([
  v()
], V.prototype, "fromRoom", 2);
W([
  v()
], V.prototype, "toRoom", 2);
W([
  v()
], V.prototype, "drawing", 2);
W([
  v()
], V.prototype, "pending", 2);
W([
  v()
], V.prototype, "placingNode", 2);
W([
  v()
], V.prototype, "draftNodeName", 2);
W([
  v()
], V.prototype, "draftNodeKind", 2);
W([
  v()
], V.prototype, "draftNodeEntity", 2);
W([
  v()
], V.prototype, "draftNodeOpenStates", 2);
W([
  v()
], V.prototype, "editingNodeId", 2);
W([
  v()
], V.prototype, "editingNodeName", 2);
W([
  v()
], V.prototype, "editingNodeKind", 2);
W([
  v()
], V.prototype, "editingNodeEntity", 2);
W([
  v()
], V.prototype, "editingNodeOpenStates", 2);
V = W([
  D("ha-explorer-route-editor")
], V);
var ys = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, pe = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? vs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ys(t, i, o), o;
};
const Oe = 1e3;
let ne = class extends L {
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
        x1=${n[0] * Oe}
        y1=${n[1] * Oe}
        x2=${s[0] * Oe}
        y2=${s[1] * Oe}
        class=${l}
        vector-effect="non-scaling-stroke"
      ></line>`;
    }), i = this.endpointOptions().filter((r) => r.point).map((r) => {
      const [o, n] = r.point, s = r.kind === "node" ? this.routeNodes.find((c) => c.id === r.id) : void 0, a = s ? Ve(s, (c) => this.entityState(c)) : void 0, l = !!(a?.conditional && !a.active);
      return M`
          <g transform=${`translate(${o * Oe} ${n * Oe})`}>
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
  D("ha-explorer-route-graph-editor")
], ne);
var xs = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, ut = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ws(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && xs(t, i, o), o;
};
const oe = 1e3;
let Te = class extends L {
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
    const e = Zi(
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
    const e = Zi(
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
Te.styles = j`
    :host{display:block}.diagnostics{margin-top:18px;display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color))}.heading{display:flex;justify-content:space-between;gap:12px}.heading span{display:block;color:var(--secondary-text-color);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.heading h3{margin:3px 0 0;font-size:1.08rem}.heading b{padding:5px 9px;border-radius:999px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.75rem;height:max-content}.instruction{padding:10px 12px;border-radius:10px;background:var(--secondary-background-color);color:var(--secondary-text-color);font-size:.9rem;line-height:1.45}.selectors{display:grid;grid-template-columns:1fr 1fr;gap:10px}.selectors label{display:grid;gap:6px;font-size:.85rem}.selectors select{width:100%;padding:9px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}.route-result{display:grid;gap:8px;padding:12px;border:1px solid var(--divider-color);border-radius:11px}.route-result.manual{border-left:5px solid var(--warning-color,#ff9800)}.route-result.graph{border-left:5px solid var(--primary-color,#03a9f4)}.route-result.fallback{border-left:5px solid var(--secondary-text-color)}.route-result-top{display:flex;justify-content:space-between;gap:12px;align-items:center}.route-result-top span{color:var(--secondary-text-color);font-size:.82rem}.route-result p{margin:0;color:var(--secondary-text-color);font-size:.88rem;line-height:1.4}.hop-list{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:.82rem}.hop-list span{display:flex;gap:6px;align-items:center}.hop-list b{padding:4px 7px;border-radius:999px;background:var(--secondary-background-color)}.hop-list i{font-style:normal;color:var(--secondary-text-color)}.map-frame{overflow:hidden;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color)}svg{display:block;width:100%;aspect-ratio:1/1}.graph-context{stroke:var(--secondary-text-color);stroke-width:3;stroke-opacity:.28}.graph-context.conditional{stroke-dasharray:8 8;stroke:var(--primary-color,#03a9f4);stroke-opacity:.5}.graph-context.blocked{stroke:var(--error-color,#db4437);stroke-opacity:.8;stroke-dasharray:4 8}.preview-line{stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.preview-line.manual{stroke:var(--warning-color,#ff9800)}.preview-line.graph{stroke:var(--primary-color,#03a9f4)}.preview-line.fallback{stroke:var(--secondary-text-color);stroke-dasharray:16 10}.preview-room{fill:var(--primary-color,#03a9f4);stroke:white;stroke-width:4}.preview-node{fill:white;stroke:var(--primary-color,#03a9f4);stroke-width:5}.preview-point{fill:white;stroke:var(--warning-color,#ff9800);stroke-width:5}.preview-number{font-size:22px;font-weight:800;fill:var(--primary-text-color);paint-order:stroke;stroke:var(--card-background-color);stroke-width:6}.disconnected{fill:var(--error-color,#db4437);fill-opacity:.18;stroke:var(--error-color,#db4437);stroke-width:4;stroke-dasharray:5 4}.warning-mark{font-size:24px;font-weight:900;fill:var(--error-color,#db4437)}.diagnostic-heading{display:grid;gap:2px}.diagnostic-heading span{color:var(--secondary-text-color);font-size:.8rem}.diagnostic-summary,.live-summary{display:grid;gap:3px;padding:11px 12px;border-radius:10px;border:1px solid var(--divider-color)}.diagnostic-summary span,.live-summary span{color:var(--secondary-text-color);font-size:.84rem}.diagnostic-summary.ok,.live-summary.ok{border-left:5px solid var(--success-color,#4caf50)}.diagnostic-summary.warning{border-left:5px solid var(--warning-color,#ff9800)}.diagnostic-summary.neutral{border-left:5px solid var(--secondary-text-color)}.live-summary.blocked{border-left:5px solid var(--error-color,#db4437)}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.metric-grid div{display:grid;gap:2px;padding:10px;border-radius:9px;background:var(--secondary-background-color)}.metric-grid strong{font-size:1.15rem}.metric-grid span{color:var(--secondary-text-color);font-size:.75rem}.issue{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(255,152,0,.1);border:1px solid rgba(255,152,0,.3)}.issue span{color:var(--secondary-text-color);font-size:.82rem;line-height:1.4}.blocked-list{display:grid;gap:7px}.blocked-item{display:grid;gap:2px;padding:10px 12px;border-radius:9px;background:rgba(219,68,55,.08);border:1px solid rgba(219,68,55,.25)}.blocked-item span,.blocked-item small{color:var(--secondary-text-color);font-size:.8rem}.legend{display:flex;gap:14px;flex-wrap:wrap;color:var(--secondary-text-color);font-size:.78rem}.legend span{display:flex;align-items:center;gap:6px}.legend .line{display:block;width:28px;height:0;border-top:3px solid var(--secondary-text-color)}.legend .line.conditional{border-top-color:var(--primary-color,#03a9f4);border-top-style:dashed}.legend .line.blocked{border-top-color:var(--error-color,#db4437);border-top-style:dashed}@media(max-width:760px){.metric-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.selectors{grid-template-columns:1fr}.route-result-top{align-items:flex-start;flex-direction:column}}
  `;
ut([
  C({ attribute: !1 })
], Te.prototype, "config", 2);
ut([
  C({ attribute: !1 })
], Te.prototype, "hass", 2);
ut([
  v()
], Te.prototype, "fromRoom", 2);
ut([
  v()
], Te.prototype, "toRoom", 2);
Te = ut([
  D("ha-explorer-route-diagnostics")
], Te);
var ks = Object.defineProperty, As = Object.getOwnPropertyDescriptor, xi = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? As(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && ks(t, i, o), o;
};
const Ss = { basic: 0, rooms: 1, presences: 2 };
let oi = class extends B {
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
  D("ha-explorer-room-tools")
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
    const i = Ss[t];
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
ni.styles = j`${de.styles}:host{overflow-anchor:none}.setup-section,.advanced-section{scroll-margin-top:16px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden;background:var(--card-background-color);transition:border-color 180ms ease,box-shadow 180ms ease}.setup-section{margin-bottom:12px}.setup-section>summary,.advanced-section>summary{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:54px;padding:12px 14px;cursor:pointer;font-weight:700}.setup-section>summary::-webkit-details-marker,.advanced-section>summary::-webkit-details-marker{display:none}.setup-section>summary::after,.advanced-section>summary::after{content:"⌄";margin-left:4px;color:var(--secondary-text-color);transition:transform 160ms ease}.setup-section[open]>summary::after,.advanced-section[open]>summary::after{transform:rotate(180deg)}.setup-content{padding:0 10px 10px;overflow-anchor:none}.setup-content>*{margin-top:0}.item-card:not(.item-open)>:not(.item-heading){display:none!important}.item-heading{cursor:pointer;user-select:none}.item-heading::after{content:"⌄";flex:none;color:var(--secondary-text-color);transition:transform 160ms ease}.item-card.item-open .item-heading::after{transform:rotate(180deg)}.advanced-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:16px 2px 8px;color:var(--secondary-text-color)}.advanced-heading>div{display:grid;gap:2px}.advanced-heading span{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}.advanced-heading strong{color:var(--primary-text-color);font-size:.92rem}.advanced-heading small{font-size:.75rem}.advanced-tools{display:grid;gap:9px;padding-bottom:8px}.advanced-hint{margin-left:auto;color:var(--secondary-text-color);font-size:.75rem;font-weight:500;text-align:right}.advanced-content{padding:0 10px 10px;overflow-anchor:none}.advanced-content>*{margin-top:0}.ux-focus{border-color:var(--primary-color,#03a9f4)!important;box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color,#03a9f4) 18%,transparent)}@media(max-width:600px){.advanced-heading{align-items:flex-start;flex-direction:column}.setup-section>summary,.advanced-section>summary{align-items:center;min-height:74px}.advanced-section>summary>span:first-child{flex:1;min-width:0}.advanced-hint{flex:0 0 48%;max-width:48%}}`;
ni = xi([
  D("ha-explorer-ha-editor")
], ni);
function or(e) {
  return Math.min(1, Math.max(0, e));
}
function Rr(e) {
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
function Cs(e) {
  if (!e.length) return [0.5, 0.5];
  const [t, i] = e.reduce(
    ([r, o], [n, s]) => [r + n, o + s],
    [0, 0]
  );
  return [t / e.length, i / e.length];
}
function Es(e) {
  if (e.length < 3) return;
  let t = 0, i = 0, r = 0;
  for (let o = 0; o < e.length; o += 1) {
    const [n, s] = e[o], [a, l] = e[(o + 1) % e.length], c = n * l - a * s;
    t += c, i += (n + a) * c, r += (s + l) * c;
  }
  if (!(Math.abs(t) < Number.EPSILON))
    return [i / (3 * t), r / (3 * t)];
}
function Le(e) {
  return { x: or(e.x), y: or(e.y) };
}
function Ns(e) {
  return [e.id, e.area_id, e.name, ...e.aliases ?? []].filter((t) => typeof t == "string" && t.trim().length > 0).map(Rr);
}
function Mr(e, t) {
  if (!t?.trim()) return;
  const i = Rr(t);
  return e.find((r) => Ns(r).includes(i));
}
function Ps(e) {
  if (e.presence_anchor) return Le(e.presence_anchor);
  if (e.label) return Le(e.label);
  const t = Es(e.points);
  if (t && ti(t, e.points))
    return Le({ x: t[0], y: t[1] });
  const i = Cs(e.points);
  if (ti(i, e.points))
    return Le({ x: i[0], y: i[1] });
  if (e.points.length) {
    const r = e.points.map(([s]) => s), o = e.points.map(([, s]) => s), n = [
      (Math.min(...r) + Math.max(...r)) / 2,
      (Math.min(...o) + Math.max(...o)) / 2
    ];
    return ti(n, e.points) ? Le({ x: n[0], y: n[1] }) : Le({ x: e.points[0][0], y: e.points[0][1] });
  }
  return { x: 0.5, y: 0.5 };
}
const si = /* @__PURE__ */ new Map();
function Tt(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function nr(e, t) {
  return Math.max(1, Math.round(Tt(e) ?? t));
}
function Rs(e) {
  const t = Math.max(0.05, Tt(e.max_height_m) ?? 0.75);
  return {
    heightAttribute: e.height_attribute?.trim() || "maxz",
    targetIdAttribute: e.target_id_attribute?.trim() || "target_id",
    timestampAttribute: e.timestamp_attribute?.trim() || "timestamp",
    maxHeight: t,
    releaseHeight: Math.max(t + 0.05, Tt(e.release_height_m) ?? t + 0.2),
    confirmationUpdates: nr(e.confirmation_updates, 3),
    releaseUpdates: nr(e.release_updates, 2)
  };
}
function Ms() {
  si.clear();
}
function zs(e, t) {
  const i = e.shelly_pet_detection;
  if (!i?.enabled || !t) return e;
  const r = Rs(i), o = Tt(t.attributes[r.heightAttribute]);
  if (o === void 0) return { ...e, visible: !1 };
  const n = t.attributes[r.targetIdAttribute], s = n === void 0 ? t.entity_id : String(n), a = t.attributes[r.timestampAttribute], l = a === void 0 ? `${s}:${o}:${t.attributes.x ?? ""}:${t.attributes.y ?? ""}` : `${s}:${String(a)}`;
  let c = si.get(e.id);
  return (!c || c.targetId !== s) && (c = { targetId: s, low: 0, high: 0, confirmed: !1 }, si.set(e.id, c)), c.lastSample === l ? { ...e, type: "pet", visible: e.visible !== !1 && c.confirmed } : (c.lastSample = l, o <= r.maxHeight ? (c.low += 1, c.high = 0, c.low >= r.confirmationUpdates && (c.confirmed = !0)) : o >= r.releaseHeight ? (c.high += 1, c.low = 0, c.high >= r.releaseUpdates && (c.confirmed = !1)) : (c.low = 0, c.high = 0), { ...e, type: "pet", visible: e.visible !== !1 && c.confirmed });
}
const Ts = ["unknown", "unavailable", "not_detected"], Ds = /* @__PURE__ */ new Set(["", "unknown", "unavailable", "none", "null"]);
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
function Is(e, t) {
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
  return Ds.has(t.toLowerCase()) ? void 0 : t;
}
function js(e, t, i) {
  if (e.room_entity) {
    const r = i.states[e.room_entity];
    return r ? sr(e.room_attribute ? te(r, e.room_attribute) : r.state) : void 0;
  }
  if (t)
    return sr(te(t, e.room_attribute ?? "explorer_room"));
}
function qs(e) {
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
  const r = e.physical_meters, o = ge(r?.width), n = ge(r?.height), s = qs(e);
  if (!o || !n || o <= 0 || n <= 0 || !s) return {};
  const a = r?.flip_x ? o - t : t, l = r?.flip_y ? n - i : i;
  let c = Math.min(1, Math.max(0, a / o)), d = Math.min(1, Math.max(0, l / n));
  const p = r?.position_calibration;
  return p?.c ? (c = lr(a, l, p.a, p.b, p.c, "room_x", c), d = lr(a, l, p.a, p.b, p.c, "room_y", d)) : p && (c = ar(a, p.a.sensor_x, p.b.sensor_x, p.a.room_x, p.b.room_x, c), d = ar(l, p.a.sensor_y, p.b.sensor_y, p.a.room_y, p.b.room_y, d)), c = Math.min(1, Math.max(0, c)), d = Math.min(1, Math.max(0, d)), { x: s.minX + c * (s.maxX - s.minX), y: s.minY + d * (s.maxY - s.minY) };
}
function vt(e, t, i) {
  const r = Mr(t, i ?? e.room_id);
  if (r) {
    const s = Ps(r);
    return { ...e, x: s.x, y: s.y, room_id: r.id };
  }
  const o = we(e.x), n = we(e.y);
  return o === void 0 || n === void 0 ? { ...e, x: o, y: n, visible: !1 } : { ...e, x: o, y: n };
}
function Ls(e, t, i, r, o, n) {
  if (!i) return { x: we(e.x), y: we(e.y) };
  const s = t.coordinate_space === "meters" || t.coordinate_space === "room_meters", a = t.x_attribute ?? (s ? "map_x" : "explorer_x"), l = t.y_attribute ?? (s ? "map_y" : "explorer_y");
  if (t.coordinate_space === "room_meters") {
    const c = ge(te(i, a)), d = ge(te(i, l)), p = Mr(r, o ?? e.room_id);
    return c === void 0 || d === void 0 || !p ? {} : { ...Os(p, c, d), roomId: p.id };
  }
  if (t.coordinate_space === "meters") {
    const c = ge(te(i, a)), d = ge(te(i, l)), p = ge(n?.width), u = ge(n?.height);
    return c === void 0 || d === void 0 || !p || !u || p <= 0 || u <= 0 ? {} : { x: we(c / p), y: we(d / u) };
  }
  return { x: we(te(i, a), e.x), y: we(te(i, l), e.y) };
}
function Bs(e, t, i = [], r) {
  const o = e.entity_binding;
  if (!o || !t) return vt(e, i);
  const n = o.entity ? t.states[o.entity] : void 0, s = o.position_entity ?? o.entity, a = s ? t.states[s] : void 0;
  if (o.entity && !n) return { ...vt(e, i), visible: !1 };
  if (o.position_entity && !a) return { ...vt(e, i), visible: !1 };
  const l = o.hidden_states ?? Ts, c = n ? l.includes(n.state) : !1, d = a && a !== n ? l.includes(a.state) : !1, p = te(n, o.visible_attribute), u = c || d ? !1 : Is(p, e.visible ?? !0), g = js(o, n, t) ?? e.room_id, b = Ls(e, o, a, i, g, r), m = { ...e, x: b.x, y: b.y, room_id: b.roomId ?? e.room_id, name: e.name ?? yt(te(n, o.name_attribute ?? "friendly_name")), avatar: e.avatar ?? yt(te(n, o.avatar_attribute ?? "entity_picture")), icon: e.icon ?? (o.icon_attribute ? yt(te(n, o.icon_attribute)) : void 0), color: e.color ?? yt(te(n, o.color_attribute ?? "explorer_color")), visible: u }, y = o.coordinate_space === "room_meters" ? m.x === void 0 || m.y === void 0 ? { ...m, visible: !1 } : m : vt(m, i, g);
  return zs(y, a);
}
function Hs(e, t, i = [], r) {
  return e.map((o) => Bs(o, t, i, r));
}
const Fe = /* @__PURE__ */ new Map(), Fs = 0.22, Zs = 0.16, Vs = 3e4, Ks = 0.025, Ws = 0.018;
function Dt(e) {
  return Number.isFinite(e.x) && Number.isFinite(e.y) ? { x: e.x, y: e.y } : void 0;
}
function ai(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function He(e) {
  return e.entity_binding?.entity ?? e.id;
}
function et(e) {
  return e.entity_binding?.position_entity;
}
function zr(e) {
  return e.previous ? { x: e.point.x + (e.point.x - e.previous.x), y: e.point.y + (e.point.y - e.previous.y) } : e.point;
}
function Gs(e, t) {
  const i = Dt(t), r = ai(e.point, i), o = ai(zr(e), i), n = e.target && e.target === et(t) ? Ks : 0;
  return { candidate: t, distance: r, score: Math.min(r, o * 0.82) - n };
}
function cr(e, t, i) {
  const r = He(e), o = Dt(t);
  if (!o) return;
  const n = Fe.get(r);
  Fe.set(r, { point: o, previous: n?.point, target: et(t), seenAt: i });
}
function Us(e, t = Date.now()) {
  for (const [a, l] of Fe) t - l.seenAt > Vs && Fe.delete(a);
  const i = e.filter((a) => (a.type ?? "person") === "person" && a.visible !== !1 && Dt(a) && et(a)), r = new Set(i), o = e.filter((a) => !r.has(a)), n = /* @__PURE__ */ new Map();
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
    const l = [...a], c = [...a].sort((g, b) => He(g).localeCompare(He(b))), d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set(), u = c.map((g) => {
      const b = Fe.get(He(g));
      if (!b) return { identity: g, track: void 0, scores: [] };
      const m = l.map((y) => Gs(b, y)).sort((y, S) => y.score - S.score);
      return { identity: g, track: b, scores: m };
    }).sort((g, b) => (g.scores[0]?.score ?? 1 / 0) - (b.scores[0]?.score ?? 1 / 0));
    for (const g of u) {
      const { identity: b, track: m } = g;
      if (!m) continue;
      const y = g.scores.filter((N) => !p.has(N.candidate));
      if (!y.length) continue;
      const S = y[0], k = y[1], w = S.distance <= Fs || ai(zr(m), Dt(S.candidate)) <= Zs, E = !!k && k.score - S.score < Ws;
      w && !E && (d.set(He(b), S.candidate), p.add(S.candidate));
    }
    for (const g of c) {
      const b = He(g);
      let m = d.get(b);
      if (m || (m = l.find((S) => !p.has(S) && et(S) === et(g)), m && p.add(m)), m || (m = l.find((S) => !p.has(S)), m && p.add(m)), !m) {
        s.push(g);
        continue;
      }
      const y = { ...g, x: m.x, y: m.y, room_id: m.room_id, visible: m.visible };
      s.push(y), cr(g, m, t);
    }
  }
  return [...s, ...o];
}
function Xs() {
  Fe.clear();
}
var Ys = Object.defineProperty, Qs = Object.getOwnPropertyDescriptor, Ot = (e, t, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Qs(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (o = (r ? s(t, i, o) : s(o)) || o);
  return r && o && Ys(t, i, o), o;
};
const Tr = "0.45.1";
let Ue = class extends L {
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
    Xs(), Ms(), this.config = {
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
  renderCastleSurround(e) {
    return h`<div
      class=${`enchanted-castle-surround ${e ? "castle-night" : "castle-day"}`}
      aria-hidden="true"
    >
      <div
        class="castle-cinematic-backdrop castle-cinematic-day"
        style=${`background-image: url("${ho}")`}
      ></div>
      <div
        class="castle-cinematic-backdrop castle-cinematic-night"
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
    const e = this.config.image ?? this.config.background ?? "", t = this.defaultRoom(), i = Hs(
      this.config.presences ?? [],
      this.hass,
      t,
      this.config.floorplan_meters
    ), r = Us(i), o = this.config.appearance?.theme ?? "classic", n = o === "enchanted_antique", s = this.isNight(), a = Math.min(
      1,
      Math.max(0.25, this.config.appearance?.day_night?.intensity ?? 0.72)
    ), l = this.config.appearance?.compass ?? {}, c = this.config.appearance?.hide_source_text ?? !1, d = this.alarmState(), p = Math.min(
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
    ].includes(y), N = m && !S && ["sunny", "clear", "partlycloudy"].includes(y), A = y === "partlycloudy";
    return h`${this.renderCastleSurround(s)}<ha-card
      class=${`${n ? "enchanted" : "classic"}${S ? " moonlight" : ""}${N ? " sunlight" : ""}${A ? " partly-cloudy" : ""}${E ? " has-clouds" : ""}${u ? g ? " occupied" : " empty-house" : ""}${m && k !== "clear" ? ` weather-${k}` : ""}${m ? ` state-${y}` : ""}${d === "armed" ? " alarm-armed" : ""}${d === "triggered" ? " alarm-triggered" : ""}${this.preview ? " preview" : ""}`}
      style=${`--moon-intensity:${a};--alarm-intensity:${p};--occupancy-intensity:${b};--weather-intensity:${w}`}
      ><header>
        <div>
          <span
            >${d === "triggered" ? "⚠ Alarm Triggered" : d === "armed" ? "✦ Map Secured" : y === "partlycloudy" ? S ? "☾ Partly Clouded Map" : "☀ Partly Clouded Map" : y === "clear-night" ? "☾ Clear Night Map" : k === "exceptional" ? "⚠ Exceptional Weather" : k === "wind" ? "➳ Wind over the Map" : k === "storm" ? "⛈ Storm over the Map" : k === "rain" ? "☂ Rain over the Map" : k === "snow" ? "❄ Snow over the Map" : k === "fog" ? "◇ Mist over the Map" : k === "cloudy" ? "☁ Clouded Map" : N ? "☀ Sunlit Map" : u && g ? "✦ Someone is Home" : u ? "◇ Empty House" : S ? "Moonlight Explorer" : n ? "Enchanted Explorer" : "Explorer map"}</span
          >
          <h1>${this.config.title}</h1>
        </div>
        <small>Enchanted Atmosphere · v${Tr}</small>
      </header>
      <div class="map-stage">
        <div class="weather-flash"></div>
        <div class="sun-overlay"></div>
        <div class="sun-disc"></div>
        <explorer-source-clean-canvas
          .theme=${o}
          .hideSourceText=${c}
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
Ue.styles = j`
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
        opacity: 0;
        transition: opacity 1.8s ease, filter 1.8s ease;
        will-change: opacity;
        transform: scale(1.012);
        transform-origin: center bottom;
      }
      .castle-cinematic-day {
        filter:
          sepia(0.08)
          saturate(0.9)
          brightness(0.94)
          contrast(1.06);
      }
      .castle-cinematic-night {
        filter:
          sepia(0.13)
          saturate(0.84)
          brightness(0.86)
          contrast(1.12);
      }
      .castle-day .castle-cinematic-day,
      .castle-night .castle-cinematic-night {
        opacity: 0.98;
      }
      .castle-day .castle-window-lights {
        display: none;
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
      opacity: 0;
      background: none;
      animation: none;
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
      opacity: 0;
      background: none;
      animation: none;
    }
    .state-snowy-rainy .weather-particles::after {
      content: none;
    }
    .state-hail .weather-particles {
      opacity: 0;
      background: none;
      animation: none;
    }
    .weather-storm .weather-flash {
      display: none;
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
Ot([
  C({ attribute: !1 })
], Ue.prototype, "hass", 2);
Ot([
  C({ type: Boolean, attribute: !1 })
], Ue.prototype, "preview", 2);
Ot([
  v()
], Ue.prototype, "config", 2);
Ue = Ot([
  D("ha-explorer-card")
], Ue);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-explorer-card",
  name: "Home Assistant Explorer",
  description: "An interactive SVG floor map for Home Assistant.",
  preview: !0
});
console.info(
  `%c HOME ASSISTANT EXPLORER %c v${Tr} `,
  "color:white;background:#594431;font-weight:700;",
  "color:#594431;background:#d8c39b;font-weight:700;"
);
export {
  Ue as HaExplorerCard
};
//# sourceMappingURL=ha-explorer-card.js.map
