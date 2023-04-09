/*\
title: tailwindcss-startup.js
type: application/javascript
module-type: startup
hide-body: yes

\*/

'use strict';
module.exports = {
  ...module.exports,
  name: 'tailwindcss-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    try {
      globalThis.tailwindcss = require('tailwindcss.min.js');
      tailwind.config = {
        important: true,
        corePlugins: {
          preflight: false,
        },
      };
    } catch (r) {
      console.error(r);
    }
  },
};
