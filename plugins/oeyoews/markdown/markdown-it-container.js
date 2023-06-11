/*\
title: $:/plugins/tiddlywiki/markdown/markdown-it-container.js
type: application/javascript
module-type: library
hide-body: yes

markdown-it-container 3.0.0 https://github.com//markdown-it/markdown-it-container @license MIT

\*/
!(function (e) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = e();
  else if ('function' == typeof define && define.amd) define([], e);
  else {
    ('undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : this
    ).markdownitContainer = e();
  }
})(function () {
  return (function e(r, n, t) {
    function o(f, a) {
      if (!n[f]) {
        if (!r[f]) {
          var u = 'function' == typeof require && require;
          if (!a && u) return u(f, !0);
          if (i) return i(f, !0);
          var c = new Error("Cannot find module '" + f + "'");
          throw ((c.code = 'MODULE_NOT_FOUND'), c);
        }
        var s = (n[f] = { exports: {} });
        r[f][0].call(
          s.exports,
          function (e) {
            return o(r[f][1][e] || e);
          },
          s,
          s.exports,
          e,
          r,
          n,
          t,
        );
      }
      return n[f].exports;
    }
    for (
      var i = 'function' == typeof require && require, f = 0;
      f < t.length;
      f++
    )
      o(t[f]);
    return o;
  })(
    {
      1: [
        function (e, r, n) {
          'use strict';
          r.exports = function (e, r, n) {
            var t = (n = n || {}).marker || ':',
              o = t.charCodeAt(0),
              i = t.length,
              f =
                n.validate ||
                function (e) {
                  return e.trim().split(' ', 2)[0] === r;
                },
              a =
                n.render ||
                function (e, n, t, o, i) {
                  return (
                    1 === e[n].nesting && e[n].attrJoin('class', r),
                    i.renderToken(e, n, t, o, i)
                  );
                };
            e.block.ruler.before(
              'fence',
              'container_' + r,
              function (e, n, a, u) {
                var c,
                  s,
                  l,
                  d,
                  p,
                  k,
                  b,
                  h,
                  m = !1,
                  y = e.bMarks[n] + e.tShift[n],
                  _ = e.eMarks[n];
                if (o !== e.src.charCodeAt(y)) return !1;
                for (c = y + 1; c <= _ && t[(c - y) % i] === e.src[c]; c++);
                if ((l = Math.floor((c - y) / i)) < 3) return !1;
                if (
                  ((c -= (c - y) % i),
                  (d = e.src.slice(y, c)),
                  (p = e.src.slice(c, _)),
                  !f(p, d))
                )
                  return !1;
                if (u) return !0;
                for (
                  s = n;
                  !(++s >= a) &&
                  !(
                    (y = e.bMarks[s] + e.tShift[s]) < (_ = e.eMarks[s]) &&
                    e.sCount[s] < e.blkIndent
                  );

                )
                  if (
                    o === e.src.charCodeAt(y) &&
                    !(e.sCount[s] - e.blkIndent >= 4)
                  ) {
                    for (c = y + 1; c <= _ && t[(c - y) % i] === e.src[c]; c++);
                    if (
                      !(
                        Math.floor((c - y) / i) < l ||
                        ((c -= (c - y) % i), (c = e.skipSpaces(c)) < _)
                      )
                    ) {
                      m = !0;
                      break;
                    }
                  }
                return (
                  (b = e.parentType),
                  (h = e.lineMax),
                  (e.parentType = 'container'),
                  (e.lineMax = s),
                  ((k = e.push('container_' + r + '_open', 'div', 1)).markup =
                    d),
                  (k.block = !0),
                  (k.info = p),
                  (k.map = [n, s]),
                  e.md.block.tokenize(e, n + 1, s),
                  ((k = e.push('container_' + r + '_close', 'div', -1)).markup =
                    e.src.slice(y, c)),
                  (k.block = !0),
                  (e.parentType = b),
                  (e.lineMax = h),
                  (e.line = s + (m ? 1 : 0)),
                  !0
                );
              },
              { alt: ['paragraph', 'reference', 'blockquote', 'list'] },
            ),
              (e.renderer.rules['container_' + r + '_open'] = a),
              (e.renderer.rules['container_' + r + '_close'] = a);
          };
        },
        {},
      ],
    },
    {},
    [1],
  )(1);
});
