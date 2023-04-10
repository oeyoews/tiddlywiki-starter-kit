/*\
title: tailwindcss-startup.js
type: application/javascript
module-type: startup
hide-body: yes

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tailwindcss-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  // tailwindConfig
  var tailwindConfig = {
    theme: {
      extend: {
        typography: function (_ref) {
          var theme = _ref.theme;
          return {
            DEFAULT: {
              css: {
                // a: {
                //   textDecoration: `none`,
                // },
                'blockquote p:first-of-type::before': null,
                'blockquote p:last-of-type::after': null,
                code: {
                  backgroundColor: theme('colors.slate.100'),
                  borderRadius: theme('borderRadius.sm'),
                  padding: theme('padding.1') + ' ' + theme('padding.1.5'),
                  border: 'none',
                },
                'code::before': {
                  content: 'normal',
                },
                'code::after': {
                  content: 'normal',
                },
              },
            },
          };
        },
      },
    },
    darkMode: 'class',
    important: true,
    corePlugins: {
      preflight: false,
    },
  };

  exports.startup = function () {
    try {
      globalThis.tailwindcss = require('tailwindcss.min.js');
      tailwind.config = tailwindConfig;
    } catch (r) {
      console.error(r);
    }
  };
})();
