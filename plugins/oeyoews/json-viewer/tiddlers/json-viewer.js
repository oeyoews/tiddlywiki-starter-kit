var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if ((decorator = decorators[i4]))
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e =
  t.ShadowRoot &&
  (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
  'adoptedStyleSheets' in Document.prototype &&
  'replace' in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t3, e6, o4) {
    if (((this._$cssResult$ = true), o4 !== s))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.',
      );
    (this.cssText = t3), (this.t = e6);
  }
  get styleSheet() {
    let t3 = this.o;
    const s2 = this.t;
    if (e && void 0 === t3) {
      const e6 = void 0 !== s2 && 1 === s2.length;
      e6 && (t3 = o.get(s2)),
        void 0 === t3 &&
          ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText),
          e6 && o.set(s2, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new n('string' == typeof t3 ? t3 : t3 + '', void 0, s);
var i = (t3, ...e6) => {
  const o4 =
    1 === t3.length
      ? t3[0]
      : e6.reduce(
          (e7, s2, o5) =>
            e7 +
            ((t4) => {
              if (true === t4._$cssResult$) return t4.cssText;
              if ('number' == typeof t4) return t4;
              throw Error(
                "Value passed to 'css' function must be a 'css' function result: " +
                  t4 +
                  ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
              );
            })(s2) +
            t3[o5 + 1],
          t3[0],
        );
  return new n(o4, t3, s);
};
var S = (s2, o4) => {
  if (e)
    s2.adoptedStyleSheets = o4.map((t3) =>
      t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet,
    );
  else
    for (const e6 of o4) {
      const o5 = document.createElement('style'),
        n5 = t.litNonce;
      void 0 !== n5 && o5.setAttribute('nonce', n5),
        (o5.textContent = e6.cssText),
        s2.appendChild(o5);
    }
};
var c = e
  ? (t3) => t3
  : (t3) =>
      t3 instanceof CSSStyleSheet
        ? ((t4) => {
            let e6 = '';
            for (const s2 of t4.cssRules) e6 += s2.cssText;
            return r(e6);
          })(t3)
        : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var {
  is: i2,
  defineProperty: e2,
  getOwnPropertyDescriptor: r2,
  getOwnPropertyNames: h,
  getOwnPropertySymbols: o2,
  getPrototypeOf: n2,
} = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : '';
var p = a.reactiveElementPolyfillSupport;
var d = (t3, s2) => t3;
var u = {
  toAttribute(t3, s2) {
    switch (s2) {
      case Boolean:
        t3 = t3 ? l : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  },
  fromAttribute(t3, s2) {
    let i4 = t3;
    switch (s2) {
      case Boolean:
        i4 = null !== t3;
        break;
      case Number:
        i4 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          i4 = JSON.parse(t3);
        } catch (t4) {
          i4 = null;
        }
    }
    return i4;
  },
};
var f = (t3, s2) => !i2(t3, s2);
var y = {
  attribute: true,
  type: String,
  converter: u,
  reflect: false,
  hasChanged: f,
};
(Symbol.metadata ??= Symbol('metadata')),
  (a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap());
var b = class extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ??= []).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, s2 = y) {
    if (
      (s2.state && (s2.attribute = false),
      this._$Ei(),
      this.elementProperties.set(t3, s2),
      !s2.noAccessor)
    ) {
      const i4 = Symbol(),
        r6 = this.getPropertyDescriptor(t3, i4, s2);
      void 0 !== r6 && e2(this.prototype, t3, r6);
    }
  }
  static getPropertyDescriptor(t3, s2, i4) {
    const { get: e6, set: h4 } = r2(this.prototype, t3) ?? {
      get() {
        return this[s2];
      },
      set(t4) {
        this[s2] = t4;
      },
    };
    return {
      get() {
        return e6?.call(this);
      },
      set(s3) {
        const r6 = e6?.call(this);
        h4.call(this, s3), this.requestUpdate(t3, r6, i4);
      },
      configurable: true,
      enumerable: true,
    };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d('elementProperties'))) return;
    const t3 = n2(this);
    t3.finalize(),
      void 0 !== t3.l && (this.l = [...t3.l]),
      (this.elementProperties = new Map(t3.elementProperties));
  }
  static finalize() {
    if (this.hasOwnProperty(d('finalized'))) return;
    if (
      ((this.finalized = true),
      this._$Ei(),
      this.hasOwnProperty(d('properties')))
    ) {
      const t4 = this.properties,
        s2 = [...h(t4), ...o2(t4)];
      for (const i4 of s2) this.createProperty(i4, t4[i4]);
    }
    const t3 = this[Symbol.metadata];
    if (null !== t3) {
      const s2 = litPropertyMetadata.get(t3);
      if (void 0 !== s2)
        for (const [t4, i4] of s2) this.elementProperties.set(t4, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t4, s2] of this.elementProperties) {
      const i4 = this._$Eu(t4, s2);
      void 0 !== i4 && this._$Eh.set(i4, t4);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i4 = [];
    if (Array.isArray(s2)) {
      const e6 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e6) i4.unshift(c(s3));
    } else void 0 !== s2 && i4.push(c(s2));
    return i4;
  }
  static _$Eu(t3, s2) {
    const i4 = s2.attribute;
    return false === i4
      ? void 0
      : 'string' == typeof i4
        ? i4
        : 'string' == typeof t3
          ? t3.toLowerCase()
          : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = false),
      (this.hasUpdated = false),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    (this._$ES = new Promise((t3) => (this.enableUpdating = t3))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t3) => t3(this));
  }
  addController(t3) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t3),
      void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
  }
  removeController(t3) {
    this._$EO?.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(),
      s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys())
      this.hasOwnProperty(i4) && (t3.set(i4, this[i4]), delete this[i4]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    (this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(true),
      this._$EO?.forEach((t3) => t3.hostConnected?.());
  }
  enableUpdating(t3) {}
  disconnectedCallback() {
    this._$EO?.forEach((t3) => t3.hostDisconnected?.());
  }
  attributeChangedCallback(t3, s2, i4) {
    this._$AK(t3, i4);
  }
  _$EC(t3, s2) {
    const i4 = this.constructor.elementProperties.get(t3),
      e6 = this.constructor._$Eu(t3, i4);
    if (void 0 !== e6 && true === i4.reflect) {
      const r6 = (
        void 0 !== i4.converter?.toAttribute ? i4.converter : u
      ).toAttribute(s2, i4.type);
      (this._$Em = t3),
        null == r6 ? this.removeAttribute(e6) : this.setAttribute(e6, r6),
        (this._$Em = null);
    }
  }
  _$AK(t3, s2) {
    const i4 = this.constructor,
      e6 = i4._$Eh.get(t3);
    if (void 0 !== e6 && this._$Em !== e6) {
      const t4 = i4.getPropertyOptions(e6),
        r6 =
          'function' == typeof t4.converter
            ? { fromAttribute: t4.converter }
            : void 0 !== t4.converter?.fromAttribute
              ? t4.converter
              : u;
      (this._$Em = e6),
        (this[e6] = r6.fromAttribute(s2, t4.type)),
        (this._$Em = null);
    }
  }
  requestUpdate(t3, s2, i4) {
    if (void 0 !== t3) {
      if (
        ((i4 ??= this.constructor.getPropertyOptions(t3)),
        !(i4.hasChanged ?? f)(this[t3], s2))
      )
        return;
      this.P(t3, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t3, s2, i4) {
    this._$AL.has(t3) || this._$AL.set(t3, s2),
      true === i4.reflect &&
        this._$Em !== t3 &&
        (this._$Ej ??= /* @__PURE__ */ new Set()).add(t3);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && (await t3), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (const [t5, s3] of this._$Ep) this[t5] = s3;
        this._$Ep = void 0;
      }
      const t4 = this.constructor.elementProperties;
      if (t4.size > 0)
        for (const [s3, i4] of t4)
          true !== i4.wrapped ||
            this._$AL.has(s3) ||
            void 0 === this[s3] ||
            this.P(s3, this[s3], i4);
    }
    let t3 = false;
    const s2 = this._$AL;
    try {
      (t3 = this.shouldUpdate(s2)),
        t3
          ? (this.willUpdate(s2),
            this._$EO?.forEach((t4) => t4.hostUpdate?.()),
            this.update(s2))
          : this._$EU();
    } catch (s3) {
      throw ((t3 = false), this._$EU(), s3);
    }
    t3 && this._$AE(s2);
  }
  willUpdate(t3) {}
  _$AE(t3) {
    this._$EO?.forEach((t4) => t4.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = true), this.firstUpdated(t3)),
      this.updated(t3);
  }
  _$EU() {
    (this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = false);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    (this._$Ej &&= this._$Ej.forEach((t4) => this._$EC(t4, this[t4]))),
      this._$EU();
  }
  updated(t3) {}
  firstUpdated(t3) {}
};
(b.elementStyles = []),
  (b.shadowRootOptions = { mode: 'open' }),
  (b[d('elementProperties')] = /* @__PURE__ */ new Map()),
  (b[d('finalized')] = /* @__PURE__ */ new Map()),
  p?.({ ReactiveElement: b }),
  (a.reactiveElementVersions ??= []).push('2.0.4');

// node_modules/lit-html/lit-html.js
var n3 = globalThis;
var c3 = n3.trustedTypes;
var h2 = c3 ? c3.createPolicy('lit-html', { createHTML: (t3) => t3 }) : void 0;
var f2 = '$lit$';
var v = `lit$${Math.random().toFixed(9).slice(2)}$`;
var m = '?' + v;
var _ = `<${m}>`;
var w = document;
var lt = () => w.createComment('');
var st = (t3) =>
  null === t3 || ('object' != typeof t3 && 'function' != typeof t3);
var g = Array.isArray;
var $ = (t3) => g(t3) || 'function' == typeof t3?.[Symbol.iterator];
var x = '[ 	\n\f\r]';
var T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var E = /-->/g;
var k = />/g;
var O = RegExp(
  `>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^
\f\r"'\`<>=]|("|')|))|$)`,
  'g',
);
var S2 = /'/g;
var j = /"/g;
var M = /^(?:script|style|textarea|title)$/i;
var P =
  (t3) =>
  (i4, ...s2) => ({ _$litType$: t3, strings: i4, values: s2 });
var ke = P(1);
var R = Symbol.for('lit-noChange');
var D = Symbol.for('lit-nothing');
var V = /* @__PURE__ */ new WeakMap();
var I = w.createTreeWalker(w, 129);
function N(t3, i4) {
  if (!g(t3) || !t3.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return void 0 !== h2 ? h2.createHTML(i4) : i4;
}
var U = (t3, i4) => {
  const s2 = t3.length - 1,
    e6 = [];
  let h4,
    o4 = 2 === i4 ? '<svg>' : 3 === i4 ? '<math>' : '',
    n5 = T;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t3[i5];
    let r6,
      l2,
      c4 = -1,
      a2 = 0;
    for (
      ;
      a2 < s3.length && ((n5.lastIndex = a2), (l2 = n5.exec(s3)), null !== l2);

    )
      (a2 = n5.lastIndex),
        n5 === T
          ? '!--' === l2[1]
            ? (n5 = E)
            : void 0 !== l2[1]
              ? (n5 = k)
              : void 0 !== l2[2]
                ? (M.test(l2[2]) && (h4 = RegExp('</' + l2[2], 'g')), (n5 = O))
                : void 0 !== l2[3] && (n5 = O)
          : n5 === O
            ? '>' === l2[0]
              ? ((n5 = h4 ?? T), (c4 = -1))
              : void 0 === l2[1]
                ? (c4 = -2)
                : ((c4 = n5.lastIndex - l2[2].length),
                  (r6 = l2[1]),
                  (n5 = void 0 === l2[3] ? O : '"' === l2[3] ? j : S2))
            : n5 === j || n5 === S2
              ? (n5 = O)
              : n5 === E || n5 === k
                ? (n5 = T)
                : ((n5 = O), (h4 = void 0));
    const u2 = n5 === O && t3[i5 + 1].startsWith('/>') ? ' ' : '';
    o4 +=
      n5 === T
        ? s3 + _
        : c4 >= 0
          ? (e6.push(r6), s3.slice(0, c4) + f2 + s3.slice(c4) + v + u2)
          : s3 + v + (-2 === c4 ? i5 : u2);
  }
  return [
    N(
      t3,
      o4 +
        (t3[s2] || '<?>') +
        (2 === i4 ? '</svg>' : 3 === i4 ? '</math>' : ''),
    ),
    e6,
  ];
};
var B = class _B {
  constructor({ strings: t3, _$litType$: i4 }, s2) {
    let e6;
    this.parts = [];
    let h4 = 0,
      o4 = 0;
    const n5 = t3.length - 1,
      r6 = this.parts,
      [l2, a2] = U(t3, i4);
    if (
      ((this.el = _B.createElement(l2, s2)),
      (I.currentNode = this.el.content),
      2 === i4 || 3 === i4)
    ) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (e6 = I.nextNode()) && r6.length < n5; ) {
      if (1 === e6.nodeType) {
        if (e6.hasAttributes())
          for (const t4 of e6.getAttributeNames())
            if (t4.endsWith(f2)) {
              const i5 = a2[o4++],
                s3 = e6.getAttribute(t4).split(v),
                n6 = /([.?@])?(.*)/.exec(i5);
              r6.push({
                type: 1,
                index: h4,
                name: n6[2],
                strings: s3,
                ctor:
                  '.' === n6[1] ? Y : '?' === n6[1] ? Z : '@' === n6[1] ? q : G,
              }),
                e6.removeAttribute(t4);
            } else
              t4.startsWith(v) &&
                (r6.push({ type: 6, index: h4 }), e6.removeAttribute(t4));
        if (M.test(e6.tagName)) {
          const t4 = e6.textContent.split(v),
            i5 = t4.length - 1;
          if (i5 > 0) {
            e6.textContent = c3 ? c3.emptyScript : '';
            for (let s3 = 0; s3 < i5; s3++)
              e6.append(t4[s3], lt()),
                I.nextNode(),
                r6.push({ type: 2, index: ++h4 });
            e6.append(t4[i5], lt());
          }
        }
      } else if (8 === e6.nodeType)
        if (e6.data === m) r6.push({ type: 2, index: h4 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = e6.data.indexOf(v, t4 + 1)); )
            r6.push({ type: 7, index: h4 }), (t4 += v.length - 1);
        }
      h4++;
    }
  }
  static createElement(t3, i4) {
    const s2 = w.createElement('template');
    return (s2.innerHTML = t3), s2;
  }
};
function z(t3, i4, s2 = t3, e6) {
  if (i4 === R) return i4;
  let h4 = void 0 !== e6 ? s2.o?.[e6] : s2.l;
  const o4 = st(i4) ? void 0 : i4._$litDirective$;
  return (
    h4?.constructor !== o4 &&
      (h4?._$AO?.(false),
      void 0 === o4 ? (h4 = void 0) : ((h4 = new o4(t3)), h4._$AT(t3, s2, e6)),
      void 0 !== e6 ? ((s2.o ??= [])[e6] = h4) : (s2.l = h4)),
    void 0 !== h4 && (i4 = z(t3, h4._$AS(t3, i4.values), h4, e6)),
    i4
  );
}
var F = class {
  constructor(t3, i4) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t3), (this._$AM = i4);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const {
        el: { content: i4 },
        parts: s2,
      } = this._$AD,
      e6 = (t3?.creationScope ?? w).importNode(i4, true);
    I.currentNode = e6;
    let h4 = I.nextNode(),
      o4 = 0,
      n5 = 0,
      r6 = s2[0];
    for (; void 0 !== r6; ) {
      if (o4 === r6.index) {
        let i5;
        2 === r6.type
          ? (i5 = new et(h4, h4.nextSibling, this, t3))
          : 1 === r6.type
            ? (i5 = new r6.ctor(h4, r6.name, r6.strings, this, t3))
            : 6 === r6.type && (i5 = new K(h4, this, t3)),
          this._$AV.push(i5),
          (r6 = s2[++n5]);
      }
      o4 !== r6?.index && ((h4 = I.nextNode()), o4++);
    }
    return (I.currentNode = w), e6;
  }
  p(t3) {
    let i4 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 &&
        (void 0 !== s2.strings
          ? (s2._$AI(t3, s2, i4), (i4 += s2.strings.length - 2))
          : s2._$AI(t3[i4])),
        i4++;
  }
};
var et = class _et {
  get _$AU() {
    return this._$AM?._$AU ?? this.v;
  }
  constructor(t3, i4, s2, e6) {
    (this.type = 2),
      (this._$AH = D),
      (this._$AN = void 0),
      (this._$AA = t3),
      (this._$AB = i4),
      (this._$AM = s2),
      (this.options = e6),
      (this.v = e6?.isConnected ?? true);
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === t3?.nodeType && (t3 = i4.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i4 = this) {
    (t3 = z(this, t3, i4)),
      st(t3)
        ? t3 === D || null == t3 || '' === t3
          ? (this._$AH !== D && this._$AR(), (this._$AH = D))
          : t3 !== this._$AH && t3 !== R && this._(t3)
        : void 0 !== t3._$litType$
          ? this.$(t3)
          : void 0 !== t3.nodeType
            ? this.T(t3)
            : $(t3)
              ? this.k(t3)
              : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), (this._$AH = this.O(t3)));
  }
  _(t3) {
    this._$AH !== D && st(this._$AH)
      ? (this._$AA.nextSibling.data = t3)
      : this.T(w.createTextNode(t3)),
      (this._$AH = t3);
  }
  $(t3) {
    const { values: i4, _$litType$: s2 } = t3,
      e6 =
        'number' == typeof s2
          ? this._$AC(t3)
          : (void 0 === s2.el &&
              (s2.el = B.createElement(N(s2.h, s2.h[0]), this.options)),
            s2);
    if (this._$AH?._$AD === e6) this._$AH.p(i4);
    else {
      const t4 = new F(e6, this),
        s3 = t4.u(this.options);
      t4.p(i4), this.T(s3), (this._$AH = t4);
    }
  }
  _$AC(t3) {
    let i4 = V.get(t3.strings);
    return void 0 === i4 && V.set(t3.strings, (i4 = new B(t3))), i4;
  }
  k(t3) {
    g(this._$AH) || ((this._$AH = []), this._$AR());
    const i4 = this._$AH;
    let s2,
      e6 = 0;
    for (const h4 of t3)
      e6 === i4.length
        ? i4.push(
            (s2 = new _et(this.O(lt()), this.O(lt()), this, this.options)),
          )
        : (s2 = i4[e6]),
        s2._$AI(h4),
        e6++;
    e6 < i4.length &&
      (this._$AR(s2 && s2._$AB.nextSibling, e6), (i4.length = e6));
  }
  _$AR(t3 = this._$AA.nextSibling, i4) {
    for (this._$AP?.(false, true, i4); t3 && t3 !== this._$AB; ) {
      const i5 = t3.nextSibling;
      t3.remove(), (t3 = i5);
    }
  }
  setConnected(t3) {
    void 0 === this._$AM && ((this.v = t3), this._$AP?.(t3));
  }
};
var G = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, i4, s2, e6, h4) {
    (this.type = 1),
      (this._$AH = D),
      (this._$AN = void 0),
      (this.element = t3),
      (this.name = i4),
      (this._$AM = e6),
      (this.options = h4),
      s2.length > 2 || '' !== s2[0] || '' !== s2[1]
        ? ((this._$AH = Array(s2.length - 1).fill(new String())),
          (this.strings = s2))
        : (this._$AH = D);
  }
  _$AI(t3, i4 = this, s2, e6) {
    const h4 = this.strings;
    let o4 = false;
    if (void 0 === h4)
      (t3 = z(this, t3, i4, 0)),
        (o4 = !st(t3) || (t3 !== this._$AH && t3 !== R)),
        o4 && (this._$AH = t3);
    else {
      const e7 = t3;
      let n5, r6;
      for (t3 = h4[0], n5 = 0; n5 < h4.length - 1; n5++)
        (r6 = z(this, e7[s2 + n5], i4, n5)),
          r6 === R && (r6 = this._$AH[n5]),
          (o4 ||= !st(r6) || r6 !== this._$AH[n5]),
          r6 === D ? (t3 = D) : t3 !== D && (t3 += (r6 ?? '') + h4[n5 + 1]),
          (this._$AH[n5] = r6);
    }
    o4 && !e6 && this.j(t3);
  }
  j(t3) {
    t3 === D
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t3 ?? '');
  }
};
var Y = class extends G {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t3) {
    this.element[this.name] = t3 === D ? void 0 : t3;
  }
};
var Z = class extends G {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== D);
  }
};
var q = class extends G {
  constructor(t3, i4, s2, e6, h4) {
    super(t3, i4, s2, e6, h4), (this.type = 5);
  }
  _$AI(t3, i4 = this) {
    if ((t3 = z(this, t3, i4, 0) ?? D) === R) return;
    const s2 = this._$AH,
      e6 =
        (t3 === D && s2 !== D) ||
        t3.capture !== s2.capture ||
        t3.once !== s2.once ||
        t3.passive !== s2.passive,
      h4 = t3 !== D && (s2 === D || e6);
    e6 && this.element.removeEventListener(this.name, this, s2),
      h4 && this.element.addEventListener(this.name, this, t3),
      (this._$AH = t3);
  }
  handleEvent(t3) {
    'function' == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t3)
      : this._$AH.handleEvent(t3);
  }
};
var K = class {
  constructor(t3, i4, s2) {
    (this.element = t3),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i4),
      (this.options = s2);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    z(this, t3);
  }
};
var Re = n3.litHtmlPolyfillSupport;
Re?.(B, et), (n3.litHtmlVersions ??= []).push('3.2.0');
var Q = (t3, i4, s2) => {
  const e6 = s2?.renderBefore ?? i4;
  let h4 = e6._$litPart$;
  if (void 0 === h4) {
    const t4 = s2?.renderBefore ?? null;
    e6._$litPart$ = h4 = new et(
      i4.insertBefore(lt(), t4),
      t4,
      void 0,
      s2 ?? {},
    );
  }
  return h4._$AI(t3), h4;
};

// node_modules/lit-element/lit-element.js
var h3 = class extends b {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this.o = void 0);
  }
  createRenderRoot() {
    const t3 = super.createRenderRoot();
    return (this.renderOptions.renderBefore ??= t3.firstChild), t3;
  }
  update(t3) {
    const e6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t3),
      (this.o = Q(e6, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    super.connectedCallback(), this.o?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.o?.setConnected(false);
  }
  render() {
    return R;
  }
};
(h3._$litElement$ = true),
  (h3['finalized'] = true),
  globalThis.litElementHydrateSupport?.({ LitElement: h3 });
var f3 = globalThis.litElementPolyfillSupport;
f3?.({ LitElement: h3 });
(globalThis.litElementVersions ??= []).push('4.1.0');

// node_modules/@lit/reactive-element/decorators/property.js
var o3 = {
  attribute: true,
  type: String,
  converter: u,
  reflect: false,
  hasChanged: f,
};
var r3 = (t3 = o3, e6, r6) => {
  const { kind: n5, metadata: i4 } = r6;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (
    (void 0 === s2 &&
      globalThis.litPropertyMetadata.set(i4, (s2 = /* @__PURE__ */ new Map())),
    s2.set(r6.name, t3),
    'accessor' === n5)
  ) {
    const { name: o4 } = r6;
    return {
      set(r7) {
        const n6 = e6.get.call(this);
        e6.set.call(this, r7), this.requestUpdate(o4, n6, t3);
      },
      init(e7) {
        return void 0 !== e7 && this.P(o4, void 0, t3), e7;
      },
    };
  }
  if ('setter' === n5) {
    const { name: o4 } = r6;
    return function (r7) {
      const n6 = this[o4];
      e6.call(this, r7), this.requestUpdate(o4, n6, t3);
    };
  }
  throw Error('Unsupported decorator location: ' + n5);
};
function n4(t3) {
  return (e6, o4) =>
    'object' == typeof o4
      ? r3(t3, e6, o4)
      : ((t4, e7, o5) => {
          const r6 = e7.hasOwnProperty(o5);
          return (
            e7.constructor.createProperty(
              o5,
              r6 ? { ...t4, wrapped: true } : t4,
            ),
            r6 ? Object.getOwnPropertyDescriptor(e7, o5) : void 0
          );
        })(t3, e6, o4);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r4(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e3 = (e6, t3, c4) => (
  (c4.configurable = true),
  (c4.enumerable = true),
  Reflect.decorate &&
    'object' != typeof t3 &&
    Object.defineProperty(e6, t3, c4),
  c4
);

// node_modules/@lit/reactive-element/decorators/query-all.js
var e4;
function r5(r6) {
  return (n5, o4) =>
    e3(n5, o4, {
      get() {
        return (
          this.renderRoot ?? (e4 ??= document.createDocumentFragment())
        ).querySelectorAll(r6);
      },
    });
}

// node_modules/lit-html/directive.js
var t2 = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6,
};
var e5 =
  (t3) =>
  (...e6) => ({ _$litDirective$: t3, values: e6 });
var i3 = class {
  constructor(t3) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t3, e6, i4) {
    (this.t = t3), (this._$AM = e6), (this.i = i4);
  }
  _$AS(t3, e6) {
    return this.update(t3, e6);
  }
  update(t3, e6) {
    return this.render(...e6);
  }
};

// node_modules/lit-html/directives/class-map.js
var Rt = e5(
  class extends i3 {
    constructor(s2) {
      if (
        (super(s2),
        s2.type !== t2.ATTRIBUTE ||
          'class' !== s2.name ||
          s2.strings?.length > 2)
      )
        throw Error(
          '`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.',
        );
    }
    render(t3) {
      return (
        ' ' +
        Object.keys(t3)
          .filter((s2) => t3[s2])
          .join(' ') +
        ' '
      );
    }
    update(t3, [s2]) {
      if (void 0 === this.st) {
        (this.st = /* @__PURE__ */ new Set()),
          void 0 !== t3.strings &&
            (this.nt = new Set(
              t3.strings
                .join(' ')
                .split(/\s/)
                .filter((t4) => '' !== t4),
            ));
        for (const t4 in s2) s2[t4] && !this.nt?.has(t4) && this.st.add(t4);
        return this.render(s2);
      }
      const i4 = t3.element.classList;
      for (const t4 of this.st) t4 in s2 || (i4.remove(t4), this.st.delete(t4));
      for (const t4 in s2) {
        const r6 = !!s2[t4];
        r6 === this.st.has(t4) ||
          this.nt?.has(t4) ||
          (r6
            ? (i4.add(t4), this.st.add(t4))
            : (i4.remove(t4), this.st.delete(t4)));
      }
      return R;
    }
  },
);

// node_modules/lit-html/directives/map.js
function* oo(o4, f4) {
  if (void 0 !== o4) {
    let i4 = 0;
    for (const t3 of o4) yield f4(t3, i4++);
  }
}

// node_modules/lit-html/directives/when.js
function nn(n5, r6, t3) {
  return n5 ? r6(n5) : t3?.(n5);
}

// src/utils.ts
function isRegex(value) {
  return value instanceof RegExp;
}
function getType(value) {
  return value === null
    ? 'null' /* Null */
    : Array.isArray(value)
      ? 'array' /* Array */
      : value.constructor.name.toLowerCase();
}
function isPrimitive(value) {
  return value !== Object(value);
}
function generateNodePreview(node, { nodeCount = 3, maxLength = 15 } = {}) {
  const isArray = Array.isArray(node);
  const objectNodes = Object.keys(node);
  const keys = objectNodes.slice(0, nodeCount);
  const preview = [];
  const getNodePreview = (nodeValue) => {
    const nodeType = getType(nodeValue);
    switch (nodeType) {
      case 'object' /* Object */:
        return Object.keys(nodeValue).length === 0 ? '{ }' : '{ ... }';
      case 'array' /* Array */:
        return nodeValue.length === 0 ? '[ ]' : '[ ... ]';
      case 'string' /* String */:
        return `"${nodeValue.substring(0, maxLength)}${nodeValue.length > maxLength ? '...' : ''}"`;
      default:
        return String(nodeValue);
    }
  };
  const childPreviews = [];
  for (const key of keys) {
    const nodePreview = [];
    const nodeValue = node[key];
    if (!isArray) nodePreview.push(`${key}: `);
    nodePreview.push(getNodePreview(nodeValue));
    childPreviews.push(nodePreview.join(''));
  }
  if (objectNodes.length > nodeCount) {
    childPreviews.push('...');
  }
  preview.push(childPreviews.join(', '));
  const previewText = preview.join('');
  return isArray ? `[ ${previewText} ]` : `{ ${previewText} }`;
}
function* deepTraverse(obj) {
  const stack = [[obj, '', []]];
  while (stack.length) {
    const [node, path, parents] = stack.shift();
    if (path) {
      yield [node, path, parents];
    }
    if (!isPrimitive(node)) {
      for (const [key, value] of Object.entries(node)) {
        stack.push([
          value,
          `${path}${path ? '.' : ''}${key}`,
          [...parents, path],
        ]);
      }
    }
  }
}
function checkGlob(str, glob) {
  const strParts = str.split('.');
  const globaParts = glob.split('.');
  const isStar = (s2) => s2 === '*';
  const isGlobStar = (s2) => s2 === '**';
  let strIndex = 0;
  let globIndex = 0;
  while (strIndex < strParts.length) {
    const globPart = globaParts[globIndex];
    const strPart = strParts[strIndex];
    if (globPart === strPart || isStar(globPart)) {
      globIndex++;
      strIndex++;
    } else if (isGlobStar(globPart)) {
      globIndex++;
      strIndex = strParts.length - (globaParts.length - globIndex);
    } else {
      return false;
    }
  }
  return globIndex === globaParts.length;
}
var JSONConverter = {
  fromAttribute: (value) => {
    return value && value.trim() ? JSON.parse(value) : void 0;
  },
  toAttribute: (value) => {
    return JSON.stringify(value);
  },
};
var isDefined = (value) => value !== void 0;
var isMatchingPath = (path, criteria) =>
  isRegex(criteria) ? !!path.match(criteria) : checkGlob(path, criteria);
var getValueByPath = (json, path) =>
  path.split('.').reduce((acc, key) => acc[key], json);

// src/stateChange.ts
var toggleNode = (path, expanded) => (state) => ({
  expanded: {
    ...state.expanded,
    [path]: isDefined(expanded) ? !!expanded : !state.expanded[path],
  },
});
var expand = (regexOrGlob, isExpanded) => (_state, el) => {
  const expanded = {};
  if (regexOrGlob) {
    for (const [, path, parents] of deepTraverse(el.data)) {
      if (isMatchingPath(path, regexOrGlob)) {
        expanded[path] = isExpanded;
        parents.forEach((p2) => (expanded[p2] = isExpanded));
      }
    }
  }
  return { expanded };
};
var filter = (regexOrGlob) => (_state, el) => {
  const filtered = {};
  if (regexOrGlob) {
    for (const [, path, parents] of deepTraverse(el.data)) {
      if (isMatchingPath(path, regexOrGlob)) {
        filtered[path] = false;
        parents.forEach((p2) => (filtered[p2] = false));
      } else {
        filtered[path] = true;
      }
    }
  }
  return { filtered };
};
var resetFilter = () => () => ({ filtered: {} });
var highlight = (path) => () => ({
  highlight: path,
});

// src/JsonViewer.styles.ts
var JsonViewer_styles_default = i`
    :where(:host) {
        --background-color: #2a2f3a;
        --color: #f8f8f2;
        --string-color: #a3eea0;
        --number-color: #d19a66;
        --boolean-color: #4ba7ef;
        --null-color: #df9cf3;
        --property-color: #6fb3d2;
        --preview-color: rgba(222, 175, 143, 0.9);
        --highlight-color:  #c92a2a;
        --outline-color: #e0e4e5;
        --outline-width: 1px;
        --outline-style: dotted;

        --font-family: Nimbus Mono PS, Courier New, monospace;
        --font-size: 1rem;
        --line-height: 1.2rem;

        --indent-size: 1.5em;
        --indentguide-size: 1px;
        --indentguide-style: solid;
        --indentguide-color: #333;
        --indentguide-color-active: #666;
        --indentguide: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color);
        --indentguide-active: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color-active);
    }

    :host {
        display: block;
        background-color: var(--background-color);
        color: var(--color);
        font-family: var(--font-family);
        font-size: var(--font-size);
        line-height: var(--line-height);
    }

    :focus {
        outline-color: var(--outline-color);
        outline-width: var(--outline-width);
        outline-style: var(--outline-style);
    }

    .preview {
        color: var(--preview-color);
    }

    .null {
        color: var(--null-color);
    }

    .key {
        color: var(--property-color);
        display: inline-block;
    }

    .collapsable::before {
        display: inline-block;
        color: var(--color);
        font-size: 0.8em;
        content: '▶';
        line-height: 1em;
        width: 1em;
        height: 1em;
        text-align: center;

        transition: transform 195ms ease-out;
        transform: rotate(90deg);

        color: var(--property-color);
    }

    .collapsable--collapsed::before {
        transform: rotate(0);
    }

    .collapsable {
        cursor: pointer;
        user-select: none;
    }

    .string {
        color: var(--string-color);
    }

    .number {
        color: var(--number-color);
    }

    .boolean {
        color: var(--boolean-color);
    }

    ul {
        padding: 0;
        clear: both;
    }

    ul,
    li {
        list-style: none;
        position: relative;
    }

    li ul > li {
        position: relative;
        margin-left: var(--indent-size);
        padding-left: 0px;
    }

    ul ul::before {
        content: '';
        border-left: var(--indentguide);
        position: absolute;
        left: calc(0.5em - var(--indentguide-size));
        top: 0.3em;
        bottom: 0.3em;
    }

    ul ul:hover::before {
        border-left: var(--indentguide-active);
    }

    mark {
        background-color: var(--highlight-color);
    }
`;

// src/JsonViewer.ts
var JsonViewer = class extends h3 {
  constructor() {
    super();
    this.state = {
      expanded: {},
      filtered: {},
      highlight: null,
    };
    this.lastFocusedItem = null;
    this.#handlePropertyClick = (path) => (e6) => {
      e6.preventDefault();
      this.setState(toggleNode(path));
    };
    this.#handleFocusIn = (event) => {
      const target = event.target;
      if (event.target === this) {
        this.#focusItem(this.lastFocusedItem || this.nodeElements[0]);
      }
      if (target.matches('[role="treeitem"]')) {
        if (this.lastFocusedItem) {
          this.lastFocusedItem.tabIndex = -1;
        }
        this.lastFocusedItem = target;
        this.tabIndex = -1;
        target.tabIndex = 0;
      }
    };
    this.#handleFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      if (!relatedTarget || !this.contains(relatedTarget)) {
        this.tabIndex = 0;
      }
    };
    this.addEventListener('focusin', this.#handleFocusIn);
    this.addEventListener('focusout', this.#handleFocusOut);
  }
  static {
    this.styles = [JsonViewer_styles_default];
  }
  static customRenderer(value, _path) {
    return JSON.stringify(value);
  }
  async setState(stateFn) {
    const currentState = this.state;
    this.state = {
      ...currentState,
      ...stateFn(currentState, this),
    };
  }
  connectedCallback() {
    if (!this.hasAttribute('data') && !isDefined(this.data)) {
      this.setAttribute('data', this.innerText);
    }
    this.setAttribute('role', 'node');
    this.setAttribute('tabindex', '0');
    super.connectedCallback();
  }
  #handlePropertyClick;
  #handleFocusIn;
  #handleFocusOut;
  #handleKeyDown(event) {
    if (
      ![
        'ArrowDown',
        'ArrowUp',
        'ArrowRight',
        'ArrowLeft',
        'Home',
        'End',
      ].includes(event.key)
    ) {
      return;
    }
    const nodes = [...this.nodeElements];
    const isLtr = this.matches(':dir(ltr)');
    const isRtl = this.matches(':dir(rtl)');
    if (nodes.length > 0) {
      event.preventDefault();
      const activeItemIndex = nodes.findIndex((item) => item.matches(':focus'));
      const activeItem = nodes[activeItemIndex];
      const isExpanded = this.state.expanded[activeItem.dataset.path];
      const isLeaf = isPrimitive(
        getValueByPath(this.data, activeItem.dataset.path),
      );
      const focusItemAt = (index) => {
        const item = nodes[Math.max(Math.min(index, nodes.length - 1), 0)];
        this.#focusItem(item);
      };
      const toggleExpand = (expanded) => {
        this.setState(toggleNode(activeItem.dataset.path, expanded));
      };
      if (event.key === 'ArrowDown') {
        focusItemAt(activeItemIndex + 1);
      } else if (event.key === 'ArrowUp') {
        focusItemAt(activeItemIndex - 1);
      } else if (
        (isLtr && event.key === 'ArrowRight') ||
        (isRtl && event.key === 'ArrowLeft')
      ) {
        if (!activeItem || isExpanded || isLeaf) {
          focusItemAt(activeItemIndex + 1);
        } else {
          toggleExpand(true);
        }
      } else if (
        (isLtr && event.key === 'ArrowLeft') ||
        (isRtl && event.key === 'ArrowRight')
      ) {
        if (!activeItem || !isExpanded || isLeaf) {
          focusItemAt(activeItemIndex - 1);
        } else {
          toggleExpand(false);
        }
      } else if (event.key === 'Home') {
        focusItemAt(0);
      } else if (event.key === 'End') {
        focusItemAt(nodes.length - 1);
      }
    }
  }
  #focusItem(item) {
    item.focus();
  }
  expand(glob) {
    this.setState(expand(glob, true));
  }
  expandAll() {
    this.setState(expand('**', true));
  }
  collapseAll() {
    this.setState(expand('**', false));
  }
  collapse(glob) {
    this.setState(expand(glob, false));
  }
  *search(criteria) {
    for (const [node, path] of deepTraverse(this.data)) {
      if (isPrimitive(node) && String(node).match(criteria)) {
        this.expand(path);
        this.updateComplete.then(() => {
          const node2 = this.shadowRoot.querySelector(`[data-path="${path}"]`);
          node2.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'center',
          });
          node2.focus();
        });
        this.setState(highlight(path));
        yield {
          value: node,
          path,
        };
      }
    }
    this.setState(highlight(null));
  }
  filter(criteria) {
    this.setState(filter(criteria));
  }
  resetFilter() {
    this.setState(resetFilter());
  }
  renderObject(node, path) {
    return ke`
            <ul part="object" role="group">
                ${oo(Object.entries(node), ([key, nodeData]) => {
                  const nodePath = path ? `${path}.${key}` : key;
                  const isPrimitiveNode = isPrimitive(nodeData);
                  const isExpanded = this.state.expanded[nodePath];
                  return ke`
                        <li
                            part="property"
                            role="treeitem"
                            data-path="${nodePath}"
                            aria-expanded="${isExpanded ? 'true' : 'false'}"
                            tabindex="-1"
                            .hidden="${this.state.filtered[nodePath]}"
                            aria-hidden="${this.state.filtered[nodePath]}"
                        >
                            <span
                                part="key"
                                class="${Rt({
                                  key,
                                  collapsable: !isPrimitiveNode,
                                  ['collapsable--collapsed']:
                                    !this.state.expanded[nodePath],
                                })}"
                                @click="${!isPrimitiveNode ? this.#handlePropertyClick(nodePath) : null}"
                            >
                                ${key}: ${nn(!isPrimitiveNode && !isExpanded, () => this.renderNodePreview(nodeData))}
                            </span>

                            ${nn(isPrimitiveNode || isExpanded, () => this.renderValue(nodeData, nodePath))}
                        </li>
                    `;
                })}
            </ul>
        `;
  }
  renderValue(value, path = '') {
    if (isPrimitive(value)) {
      return this.renderPrimitive(value, path);
    }
    return this.renderObject(value, path);
  }
  renderNodePreview(node) {
    return ke`<span part="preview" class="preview"> ${generateNodePreview(node)} </span>`;
  }
  renderPrimitive(node, path) {
    const highlight2 = this.state.highlight;
    const nodeType = getType(node);
    const renderedValue = this.constructor.customRenderer(node, path);
    const primitiveNode = ke`
            <span part="primitive primitive-${nodeType}" class="${getType(node)}"> ${renderedValue} </span>
        `;
    return path === highlight2
      ? ke`<mark part="highlight">${primitiveNode}</mark>`
      : primitiveNode;
  }
  render() {
    const data = this.data;
    return ke`
            <div
                part="base"
                @keydown=${this.#handleKeyDown}
                @focusin="${this.#handleFocusIn}"
                @focusout="${this.#handleFocusOut}"
            >
                ${nn(isDefined(data), () => this.renderValue(data))}
            </div>
        `;
  }
};
__decorateClass(
  [n4({ converter: JSONConverter, type: Object })],
  JsonViewer.prototype,
  'data',
);
__decorateClass([r4()], JsonViewer.prototype, 'state');
__decorateClass([r4()], JsonViewer.prototype, 'lastFocusedItem');
__decorateClass(
  [r5('[role="treeitem"]')],
  JsonViewer.prototype,
  'nodeElements',
);

// src/index.ts
customElements.define('json-viewer', JsonViewer);
