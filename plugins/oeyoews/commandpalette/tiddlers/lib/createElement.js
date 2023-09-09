/*\
title: $:/plugins/oeyoews/cmp/lib/createElement.js
type: application/javascript
module-type: library

\*/

module.exports = function createElement(name, proprieties, styles) {
  let el = this.document.createElement(name);
  for (let [propriety, value] of Object.entries(proprieties || {})) {
    el[propriety] = value;
  }
  for (let [style, value] of Object.entries(styles || {})) {
    el.style[style] = value;
  }
  return el;
};
