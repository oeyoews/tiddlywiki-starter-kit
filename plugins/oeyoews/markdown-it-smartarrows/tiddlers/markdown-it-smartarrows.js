/*\
title: $:/plugins/oeyoews/markdown-it-smartarrows/markdown-it-smartarrows.js
type: application/javascript
module-type: markdownit
hide-body: yes

\*/
!(function (e) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = e();
  else if ('function' == typeof define && define.amd) define([], e);
  else {
    var n;
    (n =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof self
            ? self
            : this),
      (n.markdownitLinkScheme = e());
  }
})(function () {
  return (function e(n, t, r) {
    function o(i, u) {
      if (!t[i]) {
        if (!n[i]) {
          var c = 'function' == typeof require && require;
          if (!u && c) return c(i, !0);
          if (f) return f(i, !0);
          var l = new Error("Cannot find module '" + i + "'");
          throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }
        var s = (t[i] = { exports: {} });
        n[i][0].call(
          s.exports,
          function (e) {
            var t = n[i][1][e];
            return o(t ? t : e);
          },
          s,
          s.exports,
          e,
          n,
          t,
          r
        );
      }
      return t[i].exports;
    }
    for (
      var f = 'function' == typeof require && require, i = 0;
      i < r.length;
      i++
    )
      o(r[i]);
    return o;
  })(
    {
      1: [
        function (e, n, t) {
          'use strict';
          function r(e) {
            if (e.md.options.smartArrows !== !1)
              for (var n = e.tokens.length - 1; n >= 0; n--)
                'inline' === e.tokens[n].type &&
                  f.test(e.tokens[n].content) &&
                  o(e.tokens[n].children);
          }
          function o(e) {
            var n, t;
            for (n = e.length - 1; n >= 0; n--)
              (t = e[n]),
                'text' === t.type &&
                  f.test(t.content) &&
                  (t.content = t.content
                    .replace(/(^|[^<])<-->([^>]|$)/gm, '$1\u2194$2')
                    .replace(/(^|[^-])-->([^>]|$)/gm, '👉 ')
                    .replace(/(^|[^<])<--([^-]|$)/gm, '$1\u2190$2')
                    .replace(/(^|[^<])<==>([^>]|$)/gm, '$1\u21d4$2')
                    .replace(/(^|[^=])==>([^>]|$)/gm, '$1\u21d2$2')
                    .replace(/(^|[^<])<==([^=]|$)/gm, '$1\u21d0$2'));
          }
          var f = /--|==/;
          n.exports = function (e, n) {
            e.core.ruler.before('replacements', 'smartArrows', r);
          };
        },
        {}
      ]
    },
    {},
    [1]
  )(1);
});
