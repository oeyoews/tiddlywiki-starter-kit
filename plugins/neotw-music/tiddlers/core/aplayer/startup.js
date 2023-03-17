/*\
title: $:/plugins/oeyoews/neotw-music/aplayer-startup.js
type: application/javascript
module-type: startup

load aplayer
\*/

/* exports.startup = function () {
  if (!$tw.browser) return;
  $tw.modules.execute('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
}; */

'use strict';
module.exports = {
  ...module.exports,
  name: 'aplayer-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    try {
      globalThis.APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
    } catch (r) {
      console.error(r);
    }
  },
};
