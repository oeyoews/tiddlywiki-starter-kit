/*\
title: $:/plugins/oeyoews/spoiler-text/startup.js
type: application/javascript
module-type: startup

\*/

exports.platforms = ['browser'];
exports.synchronous = true;
exports.startup = function () {
  const { SpoilerText, ST } = require('./SpoilerText');
  const components = { 'spoiler-text': SpoilerText, 's-t': ST };
  Object.keys(components).forEach((key) =>
    customElements.define(key, components[key]),
  );
};
