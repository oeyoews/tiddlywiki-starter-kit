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
        theme: {
          extend: {
            typography: ({ theme }) => ({
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
                    padding: `${theme('padding.1')} ${theme('padding.1.5')}`,
                    border: `none`,
                  },
                  'code::before': {
                    content: 'normal',
                  },
                  'code::after': {
                    content: 'normal',
                  },
                },
              },
            }),
          },
        },
        darkMode: 'class',
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
