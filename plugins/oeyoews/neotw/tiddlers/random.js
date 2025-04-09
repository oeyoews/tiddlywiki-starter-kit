/*\
title: $:/plugins/oeyoews/neotw/filteroperator/random.js
type: application/javascript
module-type: filteroperator

a filter to show a tiddler @preserve
\*/
(function () {
  'use strict';
  exports.random = function (n, t, r) {
    var e,
      o = [],
      a = [],
      i = parseInt(t.operand || '1');
    if (isNaN(i)) {
      i = 1;
    }
    n(function (n, t) {
      a.push(t);
    });
    while (i && a.length) {
      e = Math.floor(Math.random() * a.length);
      o.push(a[e]);
      a.splice(e, 1);
      i--;
    }
    return o;
  };
})();
