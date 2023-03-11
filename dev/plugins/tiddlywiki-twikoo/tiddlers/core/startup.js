/*\
title: $:/plugins/oeyoews/tiddlywiki-twikoo/startup.js
type: application/javascript
module-type: startup

load twikoo
\*/

/* exports.startup = function () {
  if (!$tw.browser) return;
  $tw.modules.execute('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
}; */

'use strict';
module.exports = {
  ...module.exports,
  name: 'twikoo-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    try {
      globalThis.twikoo = require('lib-twikoo.js');
    } catch (r) {
      console.error(r);
    }
  },
};
