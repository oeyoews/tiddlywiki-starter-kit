'use strict';
var $t = Object.defineProperty;
var Ne = Object.getOwnPropertySymbols;
var mt = Object.prototype.hasOwnProperty,
  vt = Object.prototype.propertyIsEnumerable;
var gt = (t, e, n) =>
    e in t
      ? $t(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (t[e] = n),
  se = (t, e) => {
    for (var n in e || (e = {})) mt.call(e, n) && gt(t, n, e[n]);
    if (Ne) for (var n of Ne(e)) vt.call(e, n) && gt(t, n, e[n]);
    return t;
  };
var Ve = (t, e) => {
  var n = {};
  for (var o in t) mt.call(t, o) && e.indexOf(o) < 0 && (n[o] = t[o]);
  if (t != null && Ne)
    for (var o of Ne(t)) e.indexOf(o) < 0 && vt.call(t, o) && (n[o] = t[o]);
  return n;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const D = require('$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js'),
  Nt = '[vue-draggable-plus]: ';
function qt(t) {
  console.warn(Nt + t);
}
function Kt(t) {
  console.error(Nt + t);
}
function bt(t, e, n) {
  return n >= 0 && n < t.length && t.splice(n, 0, t.splice(e, 1)[0]), t;
}
function Jt(t) {
  return t.replace(/-(\w)/g, (e, n) => (n ? n.toUpperCase() : ''));
}
function Zt(t) {
  return Object.keys(t).reduce(
    (e, n) => (typeof t[n] != 'undefined' && (e[Jt(n)] = t[n]), e),
    {}
  );
}
function Qt(t, e) {
  if (Array.isArray(t)) return t.splice(e, 1);
}
function en(t, e, n) {
  if (Array.isArray(t)) return t.splice(e, 0, n);
}
function tn(t) {
  return typeof t == 'undefined';
}
function nn(t) {
  return typeof t == 'string';
}
function yt(t, e, n) {
  const o = t.children[n];
  t.insertBefore(e, o);
}
function $e(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function on(t, e = document) {
  var o;
  let n = null;
  return (
    typeof (e == null ? void 0 : e.querySelector) == 'function'
      ? (n =
          (o = e == null ? void 0 : e.querySelector) == null
            ? void 0
            : o.call(e, t))
      : (n = document.querySelector(t)),
    n || qt(`Element not found: ${t}`),
    n
  );
}
function rn(t, e, n = null) {
  return function (...o) {
    return t.apply(n, o), e.apply(n, o);
  };
}
function an(t, e) {
  const n = se({}, t);
  return (
    Object.keys(e).forEach((o) => {
      n[o] ? (n[o] = rn(t[o], e[o])) : (n[o] = e[o]);
    }),
    n
  );
}
function ln(t) {
  return t instanceof HTMLElement;
}
function sn(t, e) {
  Object.keys(t).forEach((n) => {
    e(n, t[n]);
  });
}
/**!
 * Sortable 1.15.1
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */ function wt(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(t, r).enumerable;
      })),
      n.push.apply(n, o);
  }
  return n;
}
function J(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? wt(Object(n), !0).forEach(function (o) {
          un(t, o, n[o]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : wt(Object(n)).forEach(function (o) {
            Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
          });
  }
  return t;
}
function Xe(t) {
  '@babel/helpers - typeof';
  return (
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? (Xe = function (e) {
          return typeof e;
        })
      : (Xe = function (e) {
          return e &&
            typeof Symbol == 'function' &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        }),
    Xe(t)
  );
}
function un(t, e, n) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = n),
    t
  );
}
function ee() {
  return (
    (ee =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      }),
    ee.apply(this, arguments)
  );
}
function fn(t, e) {
  if (t == null) return {};
  var n = {},
    o = Object.keys(t),
    r,
    i;
  for (i = 0; i < o.length; i++)
    (r = o[i]), !(e.indexOf(r) >= 0) && (n[r] = t[r]);
  return n;
}
function cn(t, e) {
  if (t == null) return {};
  var n = fn(t, e),
    o,
    r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (r = 0; r < i.length; r++)
      (o = i[r]),
        !(e.indexOf(o) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(t, o) &&
          (n[o] = t[o]);
  }
  return n;
}
var dn = '1.15.1';
function Q(t) {
  if (typeof window != 'undefined' && window.navigator)
    return !!navigator.userAgent.match(t);
}
var te = Q(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
  Ie = Q(/Edge/i),
  Et = Q(/firefox/i),
  De = Q(/safari/i) && !Q(/chrome/i) && !Q(/android/i),
  xt = Q(/iP(ad|od|hone)/i),
  Mt = Q(/chrome/i) && Q(/android/i),
  Ft = { capture: !1, passive: !1 };
function S(t, e, n) {
  t.addEventListener(e, n, !te && Ft);
}
function E(t, e, n) {
  t.removeEventListener(e, n, !te && Ft);
}
function Le(t, e) {
  if (e) {
    if ((e[0] === '>' && (e = e.substring(1)), t))
      try {
        if (t.matches) return t.matches(e);
        if (t.msMatchesSelector) return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
      } catch (n) {
        return !1;
      }
    return !1;
  }
}
function hn(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function q(t, e, n, o) {
  if (t) {
    n = n || document;
    do {
      if (
        (e != null &&
          (e[0] === '>' ? t.parentNode === n && Le(t, e) : Le(t, e))) ||
        (o && t === n)
      )
        return t;
      if (t === n) break;
    } while ((t = hn(t)));
  }
  return null;
}
var St = /\s+/g;
function L(t, e, n) {
  if (t && e)
    if (t.classList) t.classList[n ? 'add' : 'remove'](e);
    else {
      var o = (' ' + t.className + ' ')
        .replace(St, ' ')
        .replace(' ' + e + ' ', ' ');
      t.className = (o + (n ? ' ' + e : '')).replace(St, ' ');
    }
}
function h(t, e, n) {
  var o = t && t.style;
  if (o) {
    if (n === void 0)
      return (
        document.defaultView && document.defaultView.getComputedStyle
          ? (n = document.defaultView.getComputedStyle(t, ''))
          : t.currentStyle && (n = t.currentStyle),
        e === void 0 ? n : n[e]
      );
    !(e in o) && e.indexOf('webkit') === -1 && (e = '-webkit-' + e),
      (o[e] = n + (typeof n == 'string' ? '' : 'px'));
  }
}
function me(t, e) {
  var n = '';
  if (typeof t == 'string') n = t;
  else
    do {
      var o = h(t, 'transform');
      o && o !== 'none' && (n = o + ' ' + n);
    } while (!e && (t = t.parentNode));
  var r =
    window.DOMMatrix ||
    window.WebKitCSSMatrix ||
    window.CSSMatrix ||
    window.MSCSSMatrix;
  return r && new r(n);
}
function Rt(t, e, n) {
  if (t) {
    var o = t.getElementsByTagName(e),
      r = 0,
      i = o.length;
    if (n) for (; r < i; r++) n(o[r], r);
    return o;
  }
  return [];
}
function K() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function N(t, e, n, o, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var i, a, l, s, u, d, c;
    if (
      (t !== window && t.parentNode && t !== K()
        ? ((i = t.getBoundingClientRect()),
          (a = i.top),
          (l = i.left),
          (s = i.bottom),
          (u = i.right),
          (d = i.height),
          (c = i.width))
        : ((a = 0),
          (l = 0),
          (s = window.innerHeight),
          (u = window.innerWidth),
          (d = window.innerHeight),
          (c = window.innerWidth)),
      (e || n) && t !== window && ((r = r || t.parentNode), !te))
    )
      do
        if (
          r &&
          r.getBoundingClientRect &&
          (h(r, 'transform') !== 'none' || (n && h(r, 'position') !== 'static'))
        ) {
          var v = r.getBoundingClientRect();
          (a -= v.top + parseInt(h(r, 'border-top-width'))),
            (l -= v.left + parseInt(h(r, 'border-left-width'))),
            (s = a + i.height),
            (u = l + i.width);
          break;
        }
      while ((r = r.parentNode));
    if (o && t !== window) {
      var y = me(r || t),
        b = y && y.a,
        w = y && y.d;
      y && ((a /= w), (l /= b), (c /= b), (d /= w), (s = a + d), (u = l + c));
    }
    return { top: a, left: l, bottom: s, right: u, width: c, height: d };
  }
}
function Xt(t) {
  var e = N(t),
    n = parseInt(h(t, 'padding-left')),
    o = parseInt(h(t, 'padding-top')),
    r = parseInt(h(t, 'padding-right')),
    i = parseInt(h(t, 'padding-bottom'));
  return (
    (e.top += o + parseInt(h(t, 'border-top-width'))),
    (e.left += n + parseInt(h(t, 'border-left-width'))),
    (e.width = t.clientWidth - n - r),
    (e.height = t.clientHeight - o - i),
    (e.bottom = e.top + e.height),
    (e.right = e.left + e.width),
    e
  );
}
function Dt(t, e, n) {
  for (var o = ie(t, !0), r = N(t)[e]; o; ) {
    var i = N(o)[n],
      a = void 0;
    if ((n === 'top' || n === 'left' ? (a = r >= i) : (a = r <= i), !a))
      return o;
    if (o === K()) break;
    o = ie(o, !1);
  }
  return !1;
}
function ve(t, e, n, o) {
  for (var r = 0, i = 0, a = t.children; i < a.length; ) {
    if (
      a[i].style.display !== 'none' &&
      a[i] !== p.ghost &&
      (o || a[i] !== p.dragged) &&
      q(a[i], n.draggable, t, !1)
    ) {
      if (r === e) return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ft(t, e) {
  for (
    var n = t.lastElementChild;
    n && (n === p.ghost || h(n, 'display') === 'none' || (e && !Le(n, e)));

  )
    n = n.previousElementSibling;
  return n || null;
}
function U(t, e) {
  var n = 0;
  if (!t || !t.parentNode) return -1;
  for (; (t = t.previousElementSibling); )
    t.nodeName.toUpperCase() !== 'TEMPLATE' &&
      t !== p.clone &&
      (!e || Le(t, e)) &&
      n++;
  return n;
}
function _t(t) {
  var e = 0,
    n = 0,
    o = K();
  if (t)
    do {
      var r = me(t),
        i = r.a,
        a = r.d;
      (e += t.scrollLeft * i), (n += t.scrollTop * a);
    } while (t !== o && (t = t.parentNode));
  return [e, n];
}
function pn(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === t[n][o]) return Number(n);
    }
  return -1;
}
function ie(t, e) {
  if (!t || !t.getBoundingClientRect) return K();
  var n = t,
    o = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = h(n);
      if (
        (n.clientWidth < n.scrollWidth &&
          (r.overflowX == 'auto' || r.overflowX == 'scroll')) ||
        (n.clientHeight < n.scrollHeight &&
          (r.overflowY == 'auto' || r.overflowY == 'scroll'))
      ) {
        if (!n.getBoundingClientRect || n === document.body) return K();
        if (o || e) return n;
        o = !0;
      }
    }
  while ((n = n.parentNode));
  return K();
}
function gn(t, e) {
  if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function qe(t, e) {
  return (
    Math.round(t.top) === Math.round(e.top) &&
    Math.round(t.left) === Math.round(e.left) &&
    Math.round(t.height) === Math.round(e.height) &&
    Math.round(t.width) === Math.round(e.width)
  );
}
var _e;
function Yt(t, e) {
  return function () {
    if (!_e) {
      var n = arguments,
        o = this;
      n.length === 1 ? t.call(o, n[0]) : t.apply(o, n),
        (_e = setTimeout(function () {
          _e = void 0;
        }, e));
    }
  };
}
function mn() {
  clearTimeout(_e), (_e = void 0);
}
function kt(t, e, n) {
  (t.scrollLeft += e), (t.scrollTop += n);
}
function Bt(t) {
  var e = window.Polymer,
    n = window.jQuery || window.Zepto;
  return e && e.dom
    ? e.dom(t).cloneNode(!0)
    : n
      ? n(t).clone(!0)[0]
      : t.cloneNode(!0);
}
var G = 'Sortable' + new Date().getTime();
function vn() {
  var t = [],
    e;
  return {
    captureAnimationState: function () {
      if (((t = []), !!this.options.animation)) {
        var o = [].slice.call(this.el.children);
        o.forEach(function (r) {
          if (!(h(r, 'display') === 'none' || r === p.ghost)) {
            t.push({ target: r, rect: N(r) });
            var i = J({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = me(r, !0);
              a && ((i.top -= a.f), (i.left -= a.e));
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function (o) {
      t.push(o);
    },
    removeAnimationState: function (o) {
      t.splice(pn(t, { target: o }), 1);
    },
    animateAll: function (o) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == 'function' && o();
        return;
      }
      var i = !1,
        a = 0;
      t.forEach(function (l) {
        var s = 0,
          u = l.target,
          d = u.fromRect,
          c = N(u),
          v = u.prevFromRect,
          y = u.prevToRect,
          b = l.rect,
          w = me(u, !0);
        w && ((c.top -= w.f), (c.left -= w.e)),
          (u.toRect = c),
          u.thisAnimationDuration &&
            qe(v, c) &&
            !qe(d, c) &&
            (b.top - c.top) / (b.left - c.left) ===
              (d.top - c.top) / (d.left - c.left) &&
            (s = yn(b, v, y, r.options)),
          qe(c, d) ||
            ((u.prevFromRect = d),
            (u.prevToRect = c),
            s || (s = r.options.animation),
            r.animate(u, b, c, s)),
          s &&
            ((i = !0),
            (a = Math.max(a, s)),
            clearTimeout(u.animationResetTimer),
            (u.animationResetTimer = setTimeout(function () {
              (u.animationTime = 0),
                (u.prevFromRect = null),
                (u.fromRect = null),
                (u.prevToRect = null),
                (u.thisAnimationDuration = null);
            }, s)),
            (u.thisAnimationDuration = s));
      }),
        clearTimeout(e),
        i
          ? (e = setTimeout(function () {
              typeof o == 'function' && o();
            }, a))
          : typeof o == 'function' && o(),
        (t = []);
    },
    animate: function (o, r, i, a) {
      if (a) {
        h(o, 'transition', ''), h(o, 'transform', '');
        var l = me(this.el),
          s = l && l.a,
          u = l && l.d,
          d = (r.left - i.left) / (s || 1),
          c = (r.top - i.top) / (u || 1);
        (o.animatingX = !!d),
          (o.animatingY = !!c),
          h(o, 'transform', 'translate3d(' + d + 'px,' + c + 'px,0)'),
          (this.forRepaintDummy = bn(o)),
          h(
            o,
            'transition',
            'transform ' +
              a +
              'ms' +
              (this.options.easing ? ' ' + this.options.easing : '')
          ),
          h(o, 'transform', 'translate3d(0,0,0)'),
          typeof o.animated == 'number' && clearTimeout(o.animated),
          (o.animated = setTimeout(function () {
            h(o, 'transition', ''),
              h(o, 'transform', ''),
              (o.animated = !1),
              (o.animatingX = !1),
              (o.animatingY = !1);
          }, a));
      }
    }
  };
}
function bn(t) {
  return t.offsetWidth;
}
function yn(t, e, n, o) {
  return (
    (Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) /
      Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2))) *
    o.animation
  );
}
var de = [],
  Ke = { initializeByDefault: !0 },
  Ae = {
    mount: function (e) {
      for (var n in Ke) Ke.hasOwnProperty(n) && !(n in e) && (e[n] = Ke[n]);
      de.forEach(function (o) {
        if (o.pluginName === e.pluginName)
          throw 'Sortable: Cannot mount plugin '.concat(
            e.pluginName,
            ' more than once'
          );
      }),
        de.push(e);
    },
    pluginEvent: function (e, n, o) {
      var r = this;
      (this.eventCanceled = !1),
        (o.cancel = function () {
          r.eventCanceled = !0;
        });
      var i = e + 'Global';
      de.forEach(function (a) {
        n[a.pluginName] &&
          (n[a.pluginName][i] && n[a.pluginName][i](J({ sortable: n }, o)),
          n.options[a.pluginName] &&
            n[a.pluginName][e] &&
            n[a.pluginName][e](J({ sortable: n }, o)));
      });
    },
    initializePlugins: function (e, n, o, r) {
      de.forEach(function (l) {
        var s = l.pluginName;
        if (!(!e.options[s] && !l.initializeByDefault)) {
          var u = new l(e, n, e.options);
          (u.sortable = e),
            (u.options = e.options),
            (e[s] = u),
            ee(o, u.defaults);
        }
      });
      for (var i in e.options)
        if (e.options.hasOwnProperty(i)) {
          var a = this.modifyOption(e, i, e.options[i]);
          typeof a != 'undefined' && (e.options[i] = a);
        }
    },
    getEventProperties: function (e, n) {
      var o = {};
      return (
        de.forEach(function (r) {
          typeof r.eventProperties == 'function' &&
            ee(o, r.eventProperties.call(n[r.pluginName], e));
        }),
        o
      );
    },
    modifyOption: function (e, n, o) {
      var r;
      return (
        de.forEach(function (i) {
          e[i.pluginName] &&
            i.optionListeners &&
            typeof i.optionListeners[n] == 'function' &&
            (r = i.optionListeners[n].call(e[i.pluginName], o));
        }),
        r
      );
    }
  };
function wn(t) {
  var e = t.sortable,
    n = t.rootEl,
    o = t.name,
    r = t.targetEl,
    i = t.cloneEl,
    a = t.toEl,
    l = t.fromEl,
    s = t.oldIndex,
    u = t.newIndex,
    d = t.oldDraggableIndex,
    c = t.newDraggableIndex,
    v = t.originalEvent,
    y = t.putSortable,
    b = t.extraEventProperties;
  if (((e = e || (n && n[G])), !!e)) {
    var w,
      F = e.options,
      C = 'on' + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !te && !Ie
      ? (w = new CustomEvent(o, { bubbles: !0, cancelable: !0 }))
      : ((w = document.createEvent('Event')), w.initEvent(o, !0, !0)),
      (w.to = a || n),
      (w.from = l || n),
      (w.item = r || n),
      (w.clone = i),
      (w.oldIndex = s),
      (w.newIndex = u),
      (w.oldDraggableIndex = d),
      (w.newDraggableIndex = c),
      (w.originalEvent = v),
      (w.pullMode = y ? y.lastPutMode : void 0);
    var x = J(J({}, b), Ae.getEventProperties(o, e));
    for (var B in x) w[B] = x[B];
    n && n.dispatchEvent(w), F[C] && F[C].call(e, w);
  }
}
var En = ['evt'],
  k = function (e, n) {
    var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      r = o.evt,
      i = cn(o, En);
    Ae.pluginEvent.bind(p)(
      e,
      n,
      J(
        {
          dragEl: f,
          parentEl: A,
          ghostEl: m,
          rootEl: T,
          nextEl: ce,
          lastDownEl: Ye,
          cloneEl: O,
          cloneHidden: re,
          dragStarted: we,
          putSortable: M,
          activeSortable: p.active,
          originalEvent: r,
          oldIndex: ge,
          oldDraggableIndex: Te,
          newIndex: W,
          newDraggableIndex: oe,
          hideGhostForTarget: Gt,
          unhideGhostForTarget: jt,
          cloneNowHidden: function () {
            re = !0;
          },
          cloneNowShown: function () {
            re = !1;
          },
          dispatchSortableEvent: function (l) {
            Y({ sortable: n, name: l, originalEvent: r });
          }
        },
        i
      )
    );
  };
function Y(t) {
  wn(
    J(
      {
        putSortable: M,
        cloneEl: O,
        targetEl: f,
        rootEl: T,
        oldIndex: ge,
        oldDraggableIndex: Te,
        newIndex: W,
        newDraggableIndex: oe
      },
      t
    )
  );
}
var f,
  A,
  m,
  T,
  ce,
  Ye,
  O,
  re,
  ge,
  W,
  Te,
  oe,
  xe,
  M,
  pe = !1,
  We = !1,
  Ge = [],
  ue,
  V,
  Je,
  Ze,
  Tt,
  Ot,
  we,
  he,
  Oe,
  Ce = !1,
  Me = !1,
  ke,
  X,
  Qe = [],
  it = !1,
  je = [],
  Ue = typeof document != 'undefined',
  Fe = xt,
  Ct = Ie || te ? 'cssFloat' : 'float',
  Sn = Ue && !Mt && !xt && 'draggable' in document.createElement('div'),
  Ht = (function () {
    if (Ue) {
      if (te) return !1;
      var t = document.createElement('x');
      return (
        (t.style.cssText = 'pointer-events:auto'),
        t.style.pointerEvents === 'auto'
      );
    }
  })(),
  Lt = function (e, n) {
    var o = h(e),
      r =
        parseInt(o.width) -
        parseInt(o.paddingLeft) -
        parseInt(o.paddingRight) -
        parseInt(o.borderLeftWidth) -
        parseInt(o.borderRightWidth),
      i = ve(e, 0, n),
      a = ve(e, 1, n),
      l = i && h(i),
      s = a && h(a),
      u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + N(i).width,
      d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + N(a).width;
    if (o.display === 'flex')
      return o.flexDirection === 'column' ||
        o.flexDirection === 'column-reverse'
        ? 'vertical'
        : 'horizontal';
    if (o.display === 'grid')
      return o.gridTemplateColumns.split(' ').length <= 1
        ? 'vertical'
        : 'horizontal';
    if (i && l.float && l.float !== 'none') {
      var c = l.float === 'left' ? 'left' : 'right';
      return a && (s.clear === 'both' || s.clear === c)
        ? 'vertical'
        : 'horizontal';
    }
    return i &&
      (l.display === 'block' ||
        l.display === 'flex' ||
        l.display === 'table' ||
        l.display === 'grid' ||
        (u >= r && o[Ct] === 'none') ||
        (a && o[Ct] === 'none' && u + d > r))
      ? 'vertical'
      : 'horizontal';
  },
  Dn = function (e, n, o) {
    var r = o ? e.left : e.top,
      i = o ? e.right : e.bottom,
      a = o ? e.width : e.height,
      l = o ? n.left : n.top,
      s = o ? n.right : n.bottom,
      u = o ? n.width : n.height;
    return r === l || i === s || r + a / 2 === l + u / 2;
  },
  _n = function (e, n) {
    var o;
    return (
      Ge.some(function (r) {
        var i = r[G].options.emptyInsertThreshold;
        if (!(!i || ft(r))) {
          var a = N(r),
            l = e >= a.left - i && e <= a.right + i,
            s = n >= a.top - i && n <= a.bottom + i;
          if (l && s) return (o = r);
        }
      }),
      o
    );
  },
  Wt = function (e) {
    function n(i, a) {
      return function (l, s, u, d) {
        var c =
          l.options.group.name &&
          s.options.group.name &&
          l.options.group.name === s.options.group.name;
        if (i == null && (a || c)) return !0;
        if (i == null || i === !1) return !1;
        if (a && i === 'clone') return i;
        if (typeof i == 'function') return n(i(l, s, u, d), a)(l, s, u, d);
        var v = (a ? l : s).options.group.name;
        return (
          i === !0 ||
          (typeof i == 'string' && i === v) ||
          (i.join && i.indexOf(v) > -1)
        );
      };
    }
    var o = {},
      r = e.group;
    (!r || Xe(r) != 'object') && (r = { name: r }),
      (o.name = r.name),
      (o.checkPull = n(r.pull, !0)),
      (o.checkPut = n(r.put)),
      (o.revertClone = r.revertClone),
      (e.group = o);
  },
  Gt = function () {
    !Ht && m && h(m, 'display', 'none');
  },
  jt = function () {
    !Ht && m && h(m, 'display', '');
  };
Ue &&
  !Mt &&
  document.addEventListener(
    'click',
    function (t) {
      if (We)
        return (
          t.preventDefault(),
          t.stopPropagation && t.stopPropagation(),
          t.stopImmediatePropagation && t.stopImmediatePropagation(),
          (We = !1),
          !1
        );
    },
    !0
  );
var fe = function (e) {
    if (f) {
      e = e.touches ? e.touches[0] : e;
      var n = _n(e.clientX, e.clientY);
      if (n) {
        var o = {};
        for (var r in e) e.hasOwnProperty(r) && (o[r] = e[r]);
        (o.target = o.rootEl = n),
          (o.preventDefault = void 0),
          (o.stopPropagation = void 0),
          n[G]._onDragOver(o);
      }
    }
  },
  Tn = function (e) {
    f && f.parentNode[G]._isOutsideThisEl(e.target);
  };
function p(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw 'Sortable: `el` must be an HTMLElement, not '.concat(
      {}.toString.call(t)
    );
  (this.el = t), (this.options = e = ee({}, e)), (t[G] = this);
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    invertSwap: !1,
    invertedSwapThreshold: null,
    removeCloneOnHide: !0,
    direction: function () {
      return Lt(t, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function (a, l) {
      a.setData('Text', l.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold:
      (Number.parseInt ? Number : window).parseInt(
        window.devicePixelRatio,
        10
      ) || 1,
    forceFallback: !1,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: { x: 0, y: 0 },
    supportPointer: p.supportPointer !== !1 && 'PointerEvent' in window && !De,
    emptyInsertThreshold: 5
  };
  Ae.initializePlugins(this, t, n);
  for (var o in n) !(o in e) && (e[o] = n[o]);
  Wt(e);
  for (var r in this)
    r.charAt(0) === '_' &&
      typeof this[r] == 'function' &&
      (this[r] = this[r].bind(this));
  (this.nativeDraggable = e.forceFallback ? !1 : Sn),
    this.nativeDraggable && (this.options.touchStartThreshold = 1),
    e.supportPointer
      ? S(t, 'pointerdown', this._onTapStart)
      : (S(t, 'mousedown', this._onTapStart),
        S(t, 'touchstart', this._onTapStart)),
    this.nativeDraggable && (S(t, 'dragover', this), S(t, 'dragenter', this)),
    Ge.push(this.el),
    e.store && e.store.get && this.sort(e.store.get(this) || []),
    ee(this, vn());
}
p.prototype = {
  constructor: p,
  _isOutsideThisEl: function (e) {
    !this.el.contains(e) && e !== this.el && (he = null);
  },
  _getDirection: function (e, n) {
    return typeof this.options.direction == 'function'
      ? this.options.direction.call(this, e, n, f)
      : this.options.direction;
  },
  _onTapStart: function (e) {
    if (e.cancelable) {
      var n = this,
        o = this.el,
        r = this.options,
        i = r.preventOnFilter,
        a = e.type,
        l =
          (e.touches && e.touches[0]) ||
          (e.pointerType && e.pointerType === 'touch' && e),
        s = (l || e).target,
        u =
          (e.target.shadowRoot &&
            ((e.path && e.path[0]) ||
              (e.composedPath && e.composedPath()[0]))) ||
          s,
        d = r.filter;
      if (
        (Mn(o),
        !f &&
          !(
            (/mousedown|pointerdown/.test(a) && e.button !== 0) ||
            r.disabled
          ) &&
          !u.isContentEditable &&
          !(
            !this.nativeDraggable &&
            De &&
            s &&
            s.tagName.toUpperCase() === 'SELECT'
          ) &&
          ((s = q(s, r.draggable, o, !1)), !(s && s.animated) && Ye !== s))
      ) {
        if (((ge = U(s)), (Te = U(s, r.draggable)), typeof d == 'function')) {
          if (d.call(this, e, s, this)) {
            Y({
              sortable: n,
              rootEl: u,
              name: 'filter',
              targetEl: s,
              toEl: o,
              fromEl: o
            }),
              k('filter', n, { evt: e }),
              i && e.cancelable && e.preventDefault();
            return;
          }
        } else if (
          d &&
          ((d = d.split(',').some(function (c) {
            if (((c = q(u, c.trim(), o, !1)), c))
              return (
                Y({
                  sortable: n,
                  rootEl: c,
                  name: 'filter',
                  targetEl: s,
                  fromEl: o,
                  toEl: o
                }),
                k('filter', n, { evt: e }),
                !0
              );
          })),
          d)
        ) {
          i && e.cancelable && e.preventDefault();
          return;
        }
        (r.handle && !q(u, r.handle, o, !1)) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function (e, n, o) {
    var r = this,
      i = r.el,
      a = r.options,
      l = i.ownerDocument,
      s;
    if (o && !f && o.parentNode === i) {
      var u = N(o);
      if (
        ((T = i),
        (f = o),
        (A = f.parentNode),
        (ce = f.nextSibling),
        (Ye = o),
        (xe = a.group),
        (p.dragged = f),
        (ue = {
          target: f,
          clientX: (n || e).clientX,
          clientY: (n || e).clientY
        }),
        (Tt = ue.clientX - u.left),
        (Ot = ue.clientY - u.top),
        (this._lastX = (n || e).clientX),
        (this._lastY = (n || e).clientY),
        (f.style['will-change'] = 'all'),
        (s = function () {
          if ((k('delayEnded', r, { evt: e }), p.eventCanceled)) {
            r._onDrop();
            return;
          }
          r._disableDelayedDragEvents(),
            !Et && r.nativeDraggable && (f.draggable = !0),
            r._triggerDragStart(e, n),
            Y({ sortable: r, name: 'choose', originalEvent: e }),
            L(f, a.chosenClass, !0);
        }),
        a.ignore.split(',').forEach(function (d) {
          Rt(f, d.trim(), et);
        }),
        S(l, 'dragover', fe),
        S(l, 'mousemove', fe),
        S(l, 'touchmove', fe),
        S(l, 'mouseup', r._onDrop),
        S(l, 'touchend', r._onDrop),
        S(l, 'touchcancel', r._onDrop),
        Et &&
          this.nativeDraggable &&
          ((this.options.touchStartThreshold = 4), (f.draggable = !0)),
        k('delayStart', this, { evt: e }),
        a.delay &&
          (!a.delayOnTouchOnly || n) &&
          (!this.nativeDraggable || !(Ie || te)))
      ) {
        if (p.eventCanceled) {
          this._onDrop();
          return;
        }
        S(l, 'mouseup', r._disableDelayedDrag),
          S(l, 'touchend', r._disableDelayedDrag),
          S(l, 'touchcancel', r._disableDelayedDrag),
          S(l, 'mousemove', r._delayedDragTouchMoveHandler),
          S(l, 'touchmove', r._delayedDragTouchMoveHandler),
          a.supportPointer &&
            S(l, 'pointermove', r._delayedDragTouchMoveHandler),
          (r._dragStartTimer = setTimeout(s, a.delay));
      } else s();
    }
  },
  _delayedDragTouchMoveHandler: function (e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(
      Math.abs(n.clientX - this._lastX),
      Math.abs(n.clientY - this._lastY)
    ) >=
      Math.floor(
        this.options.touchStartThreshold /
          ((this.nativeDraggable && window.devicePixelRatio) || 1)
      ) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function () {
    f && et(f),
      clearTimeout(this._dragStartTimer),
      this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function () {
    var e = this.el.ownerDocument;
    E(e, 'mouseup', this._disableDelayedDrag),
      E(e, 'touchend', this._disableDelayedDrag),
      E(e, 'touchcancel', this._disableDelayedDrag),
      E(e, 'mousemove', this._delayedDragTouchMoveHandler),
      E(e, 'touchmove', this._delayedDragTouchMoveHandler),
      E(e, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function (e, n) {
    (n = n || (e.pointerType == 'touch' && e)),
      !this.nativeDraggable || n
        ? this.options.supportPointer
          ? S(document, 'pointermove', this._onTouchMove)
          : n
            ? S(document, 'touchmove', this._onTouchMove)
            : S(document, 'mousemove', this._onTouchMove)
        : (S(f, 'dragend', this), S(T, 'dragstart', this._onDragStart));
    try {
      document.selection
        ? Be(function () {
            document.selection.empty();
          })
        : window.getSelection().removeAllRanges();
    } catch (o) {}
  },
  _dragStarted: function (e, n) {
    if (((pe = !1), T && f)) {
      k('dragStarted', this, { evt: n }),
        this.nativeDraggable && S(document, 'dragover', Tn);
      var o = this.options;
      !e && L(f, o.dragClass, !1),
        L(f, o.ghostClass, !0),
        (p.active = this),
        e && this._appendGhost(),
        Y({ sortable: this, name: 'start', originalEvent: n });
    } else this._nulling();
  },
  _emulateDragOver: function () {
    if (V) {
      (this._lastX = V.clientX), (this._lastY = V.clientY), Gt();
      for (
        var e = document.elementFromPoint(V.clientX, V.clientY), n = e;
        e &&
        e.shadowRoot &&
        ((e = e.shadowRoot.elementFromPoint(V.clientX, V.clientY)), e !== n);

      )
        n = e;
      if ((f.parentNode[G]._isOutsideThisEl(e), n))
        do {
          if (n[G]) {
            var o = void 0;
            if (
              ((o = n[G]._onDragOver({
                clientX: V.clientX,
                clientY: V.clientY,
                target: e,
                rootEl: n
              })),
              o && !this.options.dragoverBubble)
            )
              break;
          }
          e = n;
        } while ((n = n.parentNode));
      jt();
    }
  },
  _onTouchMove: function (e) {
    if (ue) {
      var n = this.options,
        o = n.fallbackTolerance,
        r = n.fallbackOffset,
        i = e.touches ? e.touches[0] : e,
        a = m && me(m, !0),
        l = m && a && a.a,
        s = m && a && a.d,
        u = Fe && X && _t(X),
        d =
          (i.clientX - ue.clientX + r.x) / (l || 1) +
          (u ? u[0] - Qe[0] : 0) / (l || 1),
        c =
          (i.clientY - ue.clientY + r.y) / (s || 1) +
          (u ? u[1] - Qe[1] : 0) / (s || 1);
      if (!p.active && !pe) {
        if (
          o &&
          Math.max(
            Math.abs(i.clientX - this._lastX),
            Math.abs(i.clientY - this._lastY)
          ) < o
        )
          return;
        this._onDragStart(e, !0);
      }
      if (m) {
        a
          ? ((a.e += d - (Je || 0)), (a.f += c - (Ze || 0)))
          : (a = { a: 1, b: 0, c: 0, d: 1, e: d, f: c });
        var v = 'matrix('
          .concat(a.a, ',')
          .concat(a.b, ',')
          .concat(a.c, ',')
          .concat(a.d, ',')
          .concat(a.e, ',')
          .concat(a.f, ')');
        h(m, 'webkitTransform', v),
          h(m, 'mozTransform', v),
          h(m, 'msTransform', v),
          h(m, 'transform', v),
          (Je = d),
          (Ze = c),
          (V = i);
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function () {
    if (!m) {
      var e = this.options.fallbackOnBody ? document.body : T,
        n = N(f, !0, Fe, !0, e),
        o = this.options;
      if (Fe) {
        for (
          X = e;
          h(X, 'position') === 'static' &&
          h(X, 'transform') === 'none' &&
          X !== document;

        )
          X = X.parentNode;
        X !== document.body && X !== document.documentElement
          ? (X === document && (X = K()),
            (n.top += X.scrollTop),
            (n.left += X.scrollLeft))
          : (X = K()),
          (Qe = _t(X));
      }
      (m = f.cloneNode(!0)),
        L(m, o.ghostClass, !1),
        L(m, o.fallbackClass, !0),
        L(m, o.dragClass, !0),
        h(m, 'transition', ''),
        h(m, 'transform', ''),
        h(m, 'box-sizing', 'border-box'),
        h(m, 'margin', 0),
        h(m, 'top', n.top),
        h(m, 'left', n.left),
        h(m, 'width', n.width),
        h(m, 'height', n.height),
        h(m, 'opacity', '0.8'),
        h(m, 'position', Fe ? 'absolute' : 'fixed'),
        h(m, 'zIndex', '100000'),
        h(m, 'pointerEvents', 'none'),
        (p.ghost = m),
        e.appendChild(m),
        h(
          m,
          'transform-origin',
          (Tt / parseInt(m.style.width)) * 100 +
            '% ' +
            (Ot / parseInt(m.style.height)) * 100 +
            '%'
        );
    }
  },
  _onDragStart: function (e, n) {
    var o = this,
      r = e.dataTransfer,
      i = o.options;
    if ((k('dragStart', this, { evt: e }), p.eventCanceled)) {
      this._onDrop();
      return;
    }
    k('setupClone', this),
      p.eventCanceled ||
        ((O = Bt(f)),
        O.removeAttribute('id'),
        (O.draggable = !1),
        (O.style['will-change'] = ''),
        this._hideClone(),
        L(O, this.options.chosenClass, !1),
        (p.clone = O)),
      (o.cloneId = Be(function () {
        k('clone', o),
          !p.eventCanceled &&
            (o.options.removeCloneOnHide || T.insertBefore(O, f),
            o._hideClone(),
            Y({ sortable: o, name: 'clone' }));
      })),
      !n && L(f, i.dragClass, !0),
      n
        ? ((We = !0), (o._loopId = setInterval(o._emulateDragOver, 50)))
        : (E(document, 'mouseup', o._onDrop),
          E(document, 'touchend', o._onDrop),
          E(document, 'touchcancel', o._onDrop),
          r &&
            ((r.effectAllowed = 'move'), i.setData && i.setData.call(o, r, f)),
          S(document, 'drop', o),
          h(f, 'transform', 'translateZ(0)')),
      (pe = !0),
      (o._dragStartId = Be(o._dragStarted.bind(o, n, e))),
      S(document, 'selectstart', o),
      (we = !0),
      De && h(document.body, 'user-select', 'none');
  },
  _onDragOver: function (e) {
    var n = this.el,
      o = e.target,
      r,
      i,
      a,
      l = this.options,
      s = l.group,
      u = p.active,
      d = xe === s,
      c = l.sort,
      v = M || u,
      y,
      b = this,
      w = !1;
    if (it) return;
    function F(ye, Ut) {
      k(
        ye,
        b,
        J(
          {
            evt: e,
            isOwner: d,
            axis: y ? 'vertical' : 'horizontal',
            revert: a,
            dragRect: r,
            targetRect: i,
            canSort: c,
            fromSortable: v,
            target: o,
            completed: x,
            onMove: function (pt, Vt) {
              return Re(T, n, f, r, pt, N(pt), e, Vt);
            },
            changed: B
          },
          Ut
        )
      );
    }
    function C() {
      F('dragOverAnimationCapture'),
        b.captureAnimationState(),
        b !== v && v.captureAnimationState();
    }
    function x(ye) {
      return (
        F('dragOverCompleted', { insertion: ye }),
        ye &&
          (d ? u._hideClone() : u._showClone(b),
          b !== v &&
            (L(f, M ? M.options.ghostClass : u.options.ghostClass, !1),
            L(f, l.ghostClass, !0)),
          M !== b && b !== p.active
            ? (M = b)
            : b === p.active && M && (M = null),
          v === b && (b._ignoreWhileAnimating = o),
          b.animateAll(function () {
            F('dragOverAnimationComplete'), (b._ignoreWhileAnimating = null);
          }),
          b !== v && (v.animateAll(), (v._ignoreWhileAnimating = null))),
        ((o === f && !f.animated) || (o === n && !o.animated)) && (he = null),
        !l.dragoverBubble &&
          !e.rootEl &&
          o !== document &&
          (f.parentNode[G]._isOutsideThisEl(e.target), !ye && fe(e)),
        !l.dragoverBubble && e.stopPropagation && e.stopPropagation(),
        (w = !0)
      );
    }
    function B() {
      (W = U(f)),
        (oe = U(f, l.draggable)),
        Y({
          sortable: b,
          name: 'change',
          toEl: n,
          newIndex: W,
          newDraggableIndex: oe,
          originalEvent: e
        });
    }
    if (
      (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(),
      (o = q(o, l.draggable, n, !0)),
      F('dragOver'),
      p.eventCanceled)
    )
      return w;
    if (
      f.contains(e.target) ||
      (o.animated && o.animatingX && o.animatingY) ||
      b._ignoreWhileAnimating === o
    )
      return x(!1);
    if (
      ((We = !1),
      u &&
        !l.disabled &&
        (d
          ? c || (a = A !== T)
          : M === this ||
            ((this.lastPutMode = xe.checkPull(this, u, f, e)) &&
              s.checkPut(this, u, f, e))))
    ) {
      if (
        ((y = this._getDirection(e, o) === 'vertical'),
        (r = N(f)),
        F('dragOverValid'),
        p.eventCanceled)
      )
        return w;
      if (a)
        return (
          (A = T),
          C(),
          this._hideClone(),
          F('revert'),
          p.eventCanceled || (ce ? T.insertBefore(f, ce) : T.appendChild(f)),
          x(!0)
        );
      var R = ft(n, l.draggable);
      if (!R || (An(e, y, this) && !R.animated)) {
        if (R === f) return x(!1);
        if (
          (R && n === e.target && (o = R),
          o && (i = N(o)),
          Re(T, n, f, r, o, i, e, !!o) !== !1)
        )
          return (
            C(),
            R && R.nextSibling
              ? n.insertBefore(f, R.nextSibling)
              : n.appendChild(f),
            (A = n),
            B(),
            x(!0)
          );
      } else if (R && In(e, y, this)) {
        var $ = ve(n, 0, l, !0);
        if ($ === f) return x(!1);
        if (((o = $), (i = N(o)), Re(T, n, f, r, o, i, e, !1) !== !1))
          return C(), n.insertBefore(f, $), (A = n), B(), x(!0);
      } else if (o.parentNode === n) {
        i = N(o);
        var g = 0,
          _,
          j = f.parentNode !== n,
          I = !Dn(
            (f.animated && f.toRect) || r,
            (o.animated && o.toRect) || i,
            y
          ),
          H = y ? 'top' : 'left',
          z = Dt(o, 'top', 'top') || Dt(f, 'top', 'top'),
          ae = z ? z.scrollTop : void 0;
        he !== o && ((_ = i[H]), (Ce = !1), (Me = (!I && l.invertSwap) || j)),
          (g = Pn(
            e,
            o,
            i,
            y,
            I ? 1 : l.swapThreshold,
            l.invertedSwapThreshold == null
              ? l.swapThreshold
              : l.invertedSwapThreshold,
            Me,
            he === o
          ));
        var Z;
        if (g !== 0) {
          var le = U(f);
          do (le -= g), (Z = A.children[le]);
          while (Z && (h(Z, 'display') === 'none' || Z === m));
        }
        if (g === 0 || Z === o) return x(!1);
        (he = o), (Oe = g);
        var be = o.nextElementSibling,
          ne = !1;
        ne = g === 1;
        var Pe = Re(T, n, f, r, o, i, e, ne);
        if (Pe !== !1)
          return (
            (Pe === 1 || Pe === -1) && (ne = Pe === 1),
            (it = !0),
            setTimeout(Cn, 30),
            C(),
            ne && !be
              ? n.appendChild(f)
              : o.parentNode.insertBefore(f, ne ? be : o),
            z && kt(z, 0, ae - z.scrollTop),
            (A = f.parentNode),
            _ !== void 0 && !Me && (ke = Math.abs(_ - N(o)[H])),
            B(),
            x(!0)
          );
      }
      if (n.contains(f)) return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function () {
    E(document, 'mousemove', this._onTouchMove),
      E(document, 'touchmove', this._onTouchMove),
      E(document, 'pointermove', this._onTouchMove),
      E(document, 'dragover', fe),
      E(document, 'mousemove', fe),
      E(document, 'touchmove', fe);
  },
  _offUpEvents: function () {
    var e = this.el.ownerDocument;
    E(e, 'mouseup', this._onDrop),
      E(e, 'touchend', this._onDrop),
      E(e, 'pointerup', this._onDrop),
      E(e, 'touchcancel', this._onDrop),
      E(document, 'selectstart', this);
  },
  _onDrop: function (e) {
    var n = this.el,
      o = this.options;
    if (
      ((W = U(f)),
      (oe = U(f, o.draggable)),
      k('drop', this, { evt: e }),
      (A = f && f.parentNode),
      (W = U(f)),
      (oe = U(f, o.draggable)),
      p.eventCanceled)
    ) {
      this._nulling();
      return;
    }
    (pe = !1),
      (Me = !1),
      (Ce = !1),
      clearInterval(this._loopId),
      clearTimeout(this._dragStartTimer),
      at(this.cloneId),
      at(this._dragStartId),
      this.nativeDraggable &&
        (E(document, 'drop', this), E(n, 'dragstart', this._onDragStart)),
      this._offMoveEvents(),
      this._offUpEvents(),
      De && h(document.body, 'user-select', ''),
      h(f, 'transform', ''),
      e &&
        (we &&
          (e.cancelable && e.preventDefault(),
          !o.dropBubble && e.stopPropagation()),
        m && m.parentNode && m.parentNode.removeChild(m),
        (T === A || (M && M.lastPutMode !== 'clone')) &&
          O &&
          O.parentNode &&
          O.parentNode.removeChild(O),
        f &&
          (this.nativeDraggable && E(f, 'dragend', this),
          et(f),
          (f.style['will-change'] = ''),
          we &&
            !pe &&
            L(f, M ? M.options.ghostClass : this.options.ghostClass, !1),
          L(f, this.options.chosenClass, !1),
          Y({
            sortable: this,
            name: 'unchoose',
            toEl: A,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: e
          }),
          T !== A
            ? (W >= 0 &&
                (Y({
                  rootEl: A,
                  name: 'add',
                  toEl: A,
                  fromEl: T,
                  originalEvent: e
                }),
                Y({
                  sortable: this,
                  name: 'remove',
                  toEl: A,
                  originalEvent: e
                }),
                Y({
                  rootEl: A,
                  name: 'sort',
                  toEl: A,
                  fromEl: T,
                  originalEvent: e
                }),
                Y({ sortable: this, name: 'sort', toEl: A, originalEvent: e })),
              M && M.save())
            : W !== ge &&
              W >= 0 &&
              (Y({ sortable: this, name: 'update', toEl: A, originalEvent: e }),
              Y({ sortable: this, name: 'sort', toEl: A, originalEvent: e })),
          p.active &&
            ((W == null || W === -1) && ((W = ge), (oe = Te)),
            Y({ sortable: this, name: 'end', toEl: A, originalEvent: e }),
            this.save()))),
      this._nulling();
  },
  _nulling: function () {
    k('nulling', this),
      (T =
        f =
        A =
        m =
        ce =
        O =
        Ye =
        re =
        ue =
        V =
        we =
        W =
        oe =
        ge =
        Te =
        he =
        Oe =
        M =
        xe =
        p.dragged =
        p.ghost =
        p.clone =
        p.active =
          null),
      je.forEach(function (e) {
        e.checked = !0;
      }),
      (je.length = Je = Ze = 0);
  },
  handleEvent: function (e) {
    switch (e.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(e);
        break;
      case 'dragenter':
      case 'dragover':
        f && (this._onDragOver(e), On(e));
        break;
      case 'selectstart':
        e.preventDefault();
        break;
    }
  },
  toArray: function () {
    for (
      var e = [],
        n,
        o = this.el.children,
        r = 0,
        i = o.length,
        a = this.options;
      r < i;
      r++
    )
      (n = o[r]),
        q(n, a.draggable, this.el, !1) &&
          e.push(n.getAttribute(a.dataIdAttr) || xn(n));
    return e;
  },
  sort: function (e, n) {
    var o = {},
      r = this.el;
    this.toArray().forEach(function (i, a) {
      var l = r.children[a];
      q(l, this.options.draggable, r, !1) && (o[i] = l);
    }, this),
      n && this.captureAnimationState(),
      e.forEach(function (i) {
        o[i] && (r.removeChild(o[i]), r.appendChild(o[i]));
      }),
      n && this.animateAll();
  },
  save: function () {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  closest: function (e, n) {
    return q(e, n || this.options.draggable, this.el, !1);
  },
  option: function (e, n) {
    var o = this.options;
    if (n === void 0) return o[e];
    var r = Ae.modifyOption(this, e, n);
    typeof r != 'undefined' ? (o[e] = r) : (o[e] = n), e === 'group' && Wt(o);
  },
  destroy: function () {
    k('destroy', this);
    var e = this.el;
    (e[G] = null),
      E(e, 'mousedown', this._onTapStart),
      E(e, 'touchstart', this._onTapStart),
      E(e, 'pointerdown', this._onTapStart),
      this.nativeDraggable && (E(e, 'dragover', this), E(e, 'dragenter', this)),
      Array.prototype.forEach.call(
        e.querySelectorAll('[draggable]'),
        function (n) {
          n.removeAttribute('draggable');
        }
      ),
      this._onDrop(),
      this._disableDelayedDragEvents(),
      Ge.splice(Ge.indexOf(this.el), 1),
      (this.el = e = null);
  },
  _hideClone: function () {
    if (!re) {
      if ((k('hideClone', this), p.eventCanceled)) return;
      h(O, 'display', 'none'),
        this.options.removeCloneOnHide &&
          O.parentNode &&
          O.parentNode.removeChild(O),
        (re = !0);
    }
  },
  _showClone: function (e) {
    if (e.lastPutMode !== 'clone') {
      this._hideClone();
      return;
    }
    if (re) {
      if ((k('showClone', this), p.eventCanceled)) return;
      f.parentNode == T && !this.options.group.revertClone
        ? T.insertBefore(O, f)
        : ce
          ? T.insertBefore(O, ce)
          : T.appendChild(O),
        this.options.group.revertClone && this.animate(f, O),
        h(O, 'display', ''),
        (re = !1);
    }
  }
};
function On(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = 'move'),
    t.cancelable && t.preventDefault();
}
function Re(t, e, n, o, r, i, a, l) {
  var s,
    u = t[G],
    d = u.options.onMove,
    c;
  return (
    window.CustomEvent && !te && !Ie
      ? (s = new CustomEvent('move', { bubbles: !0, cancelable: !0 }))
      : ((s = document.createEvent('Event')), s.initEvent('move', !0, !0)),
    (s.to = e),
    (s.from = t),
    (s.dragged = n),
    (s.draggedRect = o),
    (s.related = r || e),
    (s.relatedRect = i || N(e)),
    (s.willInsertAfter = l),
    (s.originalEvent = a),
    t.dispatchEvent(s),
    d && (c = d.call(u, s, a)),
    c
  );
}
function et(t) {
  t.draggable = !1;
}
function Cn() {
  it = !1;
}
function In(t, e, n) {
  var o = N(ve(n.el, 0, n.options, !0)),
    r = Xt(n.el),
    i = 10;
  return e
    ? t.clientX < r.left - i || (t.clientY < o.top && t.clientX < o.right)
    : t.clientY < r.top - i || (t.clientY < o.bottom && t.clientX < o.left);
}
function An(t, e, n) {
  var o = N(ft(n.el, n.options.draggable)),
    r = Xt(n.el),
    i = 10;
  return e
    ? t.clientX > r.right + i || (t.clientY > o.bottom && t.clientX > o.left)
    : t.clientY > r.bottom + i || (t.clientX > o.right && t.clientY > o.top);
}
function Pn(t, e, n, o, r, i, a, l) {
  var s = o ? t.clientY : t.clientX,
    u = o ? n.height : n.width,
    d = o ? n.top : n.left,
    c = o ? n.bottom : n.right,
    v = !1;
  if (!a) {
    if (l && ke < u * r) {
      if (
        (!Ce &&
          (Oe === 1 ? s > d + (u * i) / 2 : s < c - (u * i) / 2) &&
          (Ce = !0),
        Ce)
      )
        v = !0;
      else if (Oe === 1 ? s < d + ke : s > c - ke) return -Oe;
    } else if (s > d + (u * (1 - r)) / 2 && s < c - (u * (1 - r)) / 2)
      return Nn(e);
  }
  return (
    (v = v || a),
    v && (s < d + (u * i) / 2 || s > c - (u * i) / 2)
      ? s > d + u / 2
        ? 1
        : -1
      : 0
  );
}
function Nn(t) {
  return U(f) < U(t) ? 1 : -1;
}
function xn(t) {
  for (
    var e = t.tagName + t.className + t.src + t.href + t.textContent,
      n = e.length,
      o = 0;
    n--;

  )
    o += e.charCodeAt(n);
  return o.toString(36);
}
function Mn(t) {
  je.length = 0;
  for (var e = t.getElementsByTagName('input'), n = e.length; n--; ) {
    var o = e[n];
    o.checked && je.push(o);
  }
}
function Be(t) {
  return setTimeout(t, 0);
}
function at(t) {
  return clearTimeout(t);
}
Ue &&
  S(document, 'touchmove', function (t) {
    (p.active || pe) && t.cancelable && t.preventDefault();
  });
p.utils = {
  on: S,
  off: E,
  css: h,
  find: Rt,
  is: function (e, n) {
    return !!q(e, n, e, !1);
  },
  extend: gn,
  throttle: Yt,
  closest: q,
  toggleClass: L,
  clone: Bt,
  index: U,
  nextTick: Be,
  cancelNextTick: at,
  detectDirection: Lt,
  getChild: ve
};
p.get = function (t) {
  return t[G];
};
p.mount = function () {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]),
    e.forEach(function (o) {
      if (!o.prototype || !o.prototype.constructor)
        throw 'Sortable: Mounted plugin must be a constructor function, not '.concat(
          {}.toString.call(o)
        );
      o.utils && (p.utils = J(J({}, p.utils), o.utils)), Ae.mount(o);
    });
};
p.create = function (t, e) {
  return new p(t, e);
};
p.version = dn;
var P = [],
  Ee,
  lt,
  st = !1,
  tt,
  nt,
  ze,
  Se;
function Fn() {
  function t() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === '_' &&
        typeof this[e] == 'function' &&
        (this[e] = this[e].bind(this));
  }
  return (
    (t.prototype = {
      dragStarted: function (n) {
        var o = n.originalEvent;
        this.sortable.nativeDraggable
          ? S(document, 'dragover', this._handleAutoScroll)
          : this.options.supportPointer
            ? S(document, 'pointermove', this._handleFallbackAutoScroll)
            : o.touches
              ? S(document, 'touchmove', this._handleFallbackAutoScroll)
              : S(document, 'mousemove', this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function (n) {
        var o = n.originalEvent;
        !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
      },
      drop: function () {
        this.sortable.nativeDraggable
          ? E(document, 'dragover', this._handleAutoScroll)
          : (E(document, 'pointermove', this._handleFallbackAutoScroll),
            E(document, 'touchmove', this._handleFallbackAutoScroll),
            E(document, 'mousemove', this._handleFallbackAutoScroll)),
          It(),
          He(),
          mn();
      },
      nulling: function () {
        (ze = lt = Ee = st = Se = tt = nt = null), (P.length = 0);
      },
      _handleFallbackAutoScroll: function (n) {
        this._handleAutoScroll(n, !0);
      },
      _handleAutoScroll: function (n, o) {
        var r = this,
          i = (n.touches ? n.touches[0] : n).clientX,
          a = (n.touches ? n.touches[0] : n).clientY,
          l = document.elementFromPoint(i, a);
        if (
          ((ze = n),
          o || this.options.forceAutoScrollFallback || Ie || te || De)
        ) {
          ot(n, this.options, l, o);
          var s = ie(l, !0);
          st &&
            (!Se || i !== tt || a !== nt) &&
            (Se && It(),
            (Se = setInterval(function () {
              var u = ie(document.elementFromPoint(i, a), !0);
              u !== s && ((s = u), He()), ot(n, r.options, u, o);
            }, 10)),
            (tt = i),
            (nt = a));
        } else {
          if (!this.options.bubbleScroll || ie(l, !0) === K()) {
            He();
            return;
          }
          ot(n, this.options, ie(l, !1), !1);
        }
      }
    }),
    ee(t, { pluginName: 'scroll', initializeByDefault: !0 })
  );
}
function He() {
  P.forEach(function (t) {
    clearInterval(t.pid);
  }),
    (P = []);
}
function It() {
  clearInterval(Se);
}
var ot = Yt(function (t, e, n, o) {
    if (e.scroll) {
      var r = (t.touches ? t.touches[0] : t).clientX,
        i = (t.touches ? t.touches[0] : t).clientY,
        a = e.scrollSensitivity,
        l = e.scrollSpeed,
        s = K(),
        u = !1,
        d;
      lt !== n &&
        ((lt = n),
        He(),
        (Ee = e.scroll),
        (d = e.scrollFn),
        Ee === !0 && (Ee = ie(n, !0)));
      var c = 0,
        v = Ee;
      do {
        var y = v,
          b = N(y),
          w = b.top,
          F = b.bottom,
          C = b.left,
          x = b.right,
          B = b.width,
          R = b.height,
          $ = void 0,
          g = void 0,
          _ = y.scrollWidth,
          j = y.scrollHeight,
          I = h(y),
          H = y.scrollLeft,
          z = y.scrollTop;
        y === s
          ? (($ =
              B < _ &&
              (I.overflowX === 'auto' ||
                I.overflowX === 'scroll' ||
                I.overflowX === 'visible')),
            (g =
              R < j &&
              (I.overflowY === 'auto' ||
                I.overflowY === 'scroll' ||
                I.overflowY === 'visible')))
          : (($ =
              B < _ && (I.overflowX === 'auto' || I.overflowX === 'scroll')),
            (g =
              R < j && (I.overflowY === 'auto' || I.overflowY === 'scroll')));
        var ae =
            $ &&
            (Math.abs(x - r) <= a && H + B < _) - (Math.abs(C - r) <= a && !!H),
          Z =
            g &&
            (Math.abs(F - i) <= a && z + R < j) - (Math.abs(w - i) <= a && !!z);
        if (!P[c]) for (var le = 0; le <= c; le++) P[le] || (P[le] = {});
        (P[c].vx != ae || P[c].vy != Z || P[c].el !== y) &&
          ((P[c].el = y),
          (P[c].vx = ae),
          (P[c].vy = Z),
          clearInterval(P[c].pid),
          (ae != 0 || Z != 0) &&
            ((u = !0),
            (P[c].pid = setInterval(
              function () {
                o && this.layer === 0 && p.active._onTouchMove(ze);
                var be = P[this.layer].vy ? P[this.layer].vy * l : 0,
                  ne = P[this.layer].vx ? P[this.layer].vx * l : 0;
                (typeof d == 'function' &&
                  d.call(
                    p.dragged.parentNode[G],
                    ne,
                    be,
                    t,
                    ze,
                    P[this.layer].el
                  ) !== 'continue') ||
                  kt(P[this.layer].el, ne, be);
              }.bind({ layer: c }),
              24
            )))),
          c++;
      } while (e.bubbleScroll && v !== s && (v = ie(v, !1)));
      st = u;
    }
  }, 30),
  zt = function (e) {
    var n = e.originalEvent,
      o = e.putSortable,
      r = e.dragEl,
      i = e.activeSortable,
      a = e.dispatchSortableEvent,
      l = e.hideGhostForTarget,
      s = e.unhideGhostForTarget;
    if (n) {
      var u = o || i;
      l();
      var d =
          n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n,
        c = document.elementFromPoint(d.clientX, d.clientY);
      s(),
        u &&
          !u.el.contains(c) &&
          (a('spill'), this.onSpill({ dragEl: r, putSortable: o }));
    }
  };
function ct() {}
ct.prototype = {
  startIndex: null,
  dragStart: function (e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function (e) {
    var n = e.dragEl,
      o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var r = ve(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n),
      this.sortable.animateAll(),
      o && o.animateAll();
  },
  drop: zt
};
ee(ct, { pluginName: 'revertOnSpill' });
function dt() {}
dt.prototype = {
  onSpill: function (e) {
    var n = e.dragEl,
      o = e.putSortable,
      r = o || this.sortable;
    r.captureAnimationState(),
      n.parentNode && n.parentNode.removeChild(n),
      r.animateAll();
  },
  drop: zt
};
ee(dt, { pluginName: 'removeOnSpill' });
p.mount(new Fn());
p.mount(dt, ct);
function Rn(t) {
  return t == null ? t : JSON.parse(JSON.stringify(t));
}
function Xn(t) {
  D.getCurrentInstance() && D.onUnmounted(t);
}
function Yn(t) {
  D.getCurrentInstance() ? D.onMounted(t) : D.nextTick(t);
}
const At = Symbol('cloneElement');
function ht(...t) {
  var R, $;
  const e = (R = D.getCurrentInstance()) == null ? void 0 : R.proxy,
    n = t[0];
  let [, o, r] = t;
  Array.isArray(D.unref(o)) || ((r = o), (o = null));
  let i = null;
  const {
    immediate: a = !0,
    clone: l = Rn,
    customUpdate: s
  } = ($ = D.unref(r)) != null ? $ : {};
  function u(g) {
    var _;
    g.item[At] = l(D.unref((_ = D.unref(o)) == null ? void 0 : _[g.oldIndex]));
  }
  function d(g) {
    const _ = g.item[At];
    tn(_) || ($e(g.item), en(D.unref(o), g.newDraggableIndex, _));
  }
  function c(g) {
    const {
      from: _,
      item: j,
      oldIndex: I,
      oldDraggableIndex: H,
      pullMode: z,
      clone: ae
    } = g;
    if (z === 'clone') {
      yt(_, j, I), $e(ae);
      return;
    }
    Qt(D.unref(o), H);
  }
  function v(g) {
    if (s) {
      s(g);
      return;
    }
    const { from: _, item: j, oldIndex: I, newIndex: H } = g;
    if (($e(j), yt(_, j, I), D.isRef(o))) {
      const z = [...D.unref(o)];
      o.value = bt(z, I, H);
      return;
    }
    bt(D.unref(o), I, H);
  }
  const y = { onUpdate: v, onStart: u, onAdd: d, onRemove: c };
  function b(g) {
    const _ = D.unref(n);
    return (
      g || (g = nn(_) ? on(_, e == null ? void 0 : e.$el) : _),
      g && !ln(g) && (g = g.$el),
      g || Kt('Root element not found'),
      g
    );
  }
  function w() {
    var I;
    const H = (I = D.unref(r)) != null ? I : {},
      { immediate: g, clone: _ } = H,
      j = Ve(H, ['immediate', 'clone']);
    return an(o === null ? {} : y, j);
  }
  const F = (g) => {
    (g = b(g)), i && C.destroy(), (i = new p(g, w()));
  };
  D.watch(
    () => r,
    () => {
      i &&
        sn(w(), (g, _) => {
          i == null || i.option(g, _);
        });
    },
    { deep: !0 }
  );
  const C = {
      option: (g, _) => (i == null ? void 0 : i.option(g, _)),
      destroy: () => {
        i == null || i.destroy(), (i = null);
      },
      save: () => (i == null ? void 0 : i.save()),
      toArray: () => (i == null ? void 0 : i.toArray()),
      closest: (...g) => (i == null ? void 0 : i.closest(...g))
    },
    x = () => (C == null ? void 0 : C.option('disabled', !0)),
    B = () => (C == null ? void 0 : C.option('disabled', !1));
  return (
    Yn(() => {
      a && F();
    }),
    Xn(C.destroy),
    se({ start: F, pause: x, resume: B }, C)
  );
}
const ut = [
    'update',
    'start',
    'add',
    'remove',
    'choose',
    'unchoose',
    'end',
    'sort',
    'filter',
    'clone',
    'move',
    'change'
  ],
  kn = [
    'animation',
    'ghostClass',
    'group',
    'sort',
    'disabled',
    'store',
    'handle',
    'draggable',
    'swapThreshold',
    'invertSwap',
    'invertedSwapThreshold',
    'removeCloneOnHide',
    'direction',
    'chosenClass',
    'dragClass',
    'ignore',
    'filter',
    'preventOnFilter',
    'easing',
    'setData',
    'dropBubble',
    'dragoverBubble',
    'dataIdAttr',
    'delay',
    'delayOnTouchOnly',
    'touchStartThreshold',
    'forceFallback',
    'fallbackClass',
    'fallbackOnBody',
    'fallbackTolerance',
    'fallbackOffset',
    'supportPointer',
    'emptyInsertThreshold',
    'scroll',
    'forceAutoScrollFallback',
    'scrollSensitivity',
    'scrollSpeed',
    'bubbleScroll',
    'modelValue',
    'tag',
    'target',
    'customUpdate',
    ...ut.map((t) => `on${t.replace(/^\S/, (e) => e.toUpperCase())}`)
  ],
  Bn = D.defineComponent({
    name: 'VueDraggable',
    model: { prop: 'modelValue', event: 'update:modelValue' },
    props: kn,
    emits: ['update:modelValue', ...ut],
    setup(t, { slots: e, emit: n, expose: o, attrs: r }) {
      const i = ut.reduce((d, c) => {
          const v = `on${c.replace(/^\S/, (y) => y.toUpperCase())}`;
          return (d[v] = (y) => n(c, y)), d;
        }, {}),
        a = D.computed(() => {
          const y = D.toRefs(t),
            { modelValue: d } = y,
            c = Ve(y, ['modelValue']),
            v = Object.entries(c).reduce((b, [w, F]) => {
              const C = D.unref(F);
              return C !== void 0 && (b[w] = C), b;
            }, {});
          return se(se({}, i), Zt(se(se({}, r), v)));
        }),
        l = D.computed({
          get: () => t.modelValue,
          set: (d) => n('update:modelValue', d)
        }),
        s = D.ref(),
        u = D.reactive(ht(t.target || s, l, a));
      return (
        o(u),
        () => {
          if (e.default) return D.h(t.tag || 'div', { ref: s }, e.default(u));
        }
      );
    }
  }),
  Pt = { mounted: 'mounted', unmounted: 'unmounted' },
  rt = new WeakMap(),
  Hn = {
    [Pt.mounted](t, e) {
      const n = D.isProxy(e.value) ? [e.value] : e.value,
        o = ht(t, ...n);
      rt.set(t, o.destroy);
    },
    [Pt.unmounted](t) {
      var e;
      (e = rt.get(t)) == null || e(), rt.delete(t);
    }
  };
exports.VueDraggable = Bn;
exports.useDraggable = ht;
exports.vDraggable = Hn;
