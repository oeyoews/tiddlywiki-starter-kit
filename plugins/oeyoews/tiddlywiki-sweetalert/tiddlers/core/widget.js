/*\
title: $:/plugins/oeyoews/tiddlywiki-sweetalert/startup.js
type: application/javascript
module-type: startup

swealalert
\*/

'use strict';
module.exports = {
  ...module.exports,
  name: 'sweetalert-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    try {
      const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
      globalThis.swal = swal;
    } catch (r) {
      console.error(r);
    }
  },
};
