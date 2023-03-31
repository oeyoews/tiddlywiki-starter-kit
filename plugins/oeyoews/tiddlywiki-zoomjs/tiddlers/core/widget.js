/*\
title: $:/plugins/oeyoews/tiddlywiki-zoomjs/startup.js
type: application/javascript
module-type: startup

zoomjs
\*/

('use strict');
module.exports = {
  ...module.exports,
  name: 'zoom-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    try {
      require('zoom.js');
    } catch (r) {
      console.error(r);
    }
  },
};
