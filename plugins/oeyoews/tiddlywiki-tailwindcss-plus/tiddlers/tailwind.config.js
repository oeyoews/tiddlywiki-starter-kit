/*\
title: $:/plugins/oeyoews/tiddlywiki-tailwindcss-plus/tailwind.config.js
type: application/javascript
module-type: library

\*/

// this file name canbe searched by your vscode tailwindcss extension, dont modifiy it
module.exports = {
  theme: {
    extend: {
      colors: {
        dimmed: {
          100: '#cdd9e5',
          200: '#d0d7de',
          700: '#444c56',
          800: '#2d333b',
          900: '#1c2128'
        }
      },
      // boxShadow: {
      // lg: '5px 20px #000001f',
      // },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // '--tw-prose-body': theme('colors.white'),
            'blockquote p:first-of-type::before': null,
            'blockquote p:last-of-type::after': null,
            pre: {
              backgroundColor: theme('colors.neutral.100'),
              color: theme('colors.neutral.900'),
              border: `none`
            },
            code: {
              // fontFamily: 'serif',
              // backgroundColor: theme('colors.slate.100'),
              borderRadius: theme('borderRadius.sm'),
              padding: `${theme('padding.1')} ${theme('padding.1.5')}`,
              border: `none`
            },
            'code::before': {
              content: 'normal'
            },
            'code::after': {
              content: 'normal'
            }
          }
        }
      })
    }
  },
  darkMode: 'class',
  variants: {
    extend: {
      appearance: ['hover', 'focus']
    }
  },
  important: true, // Don't modify it, unless you know what you are doing !
  corePlugins: {
    preflight: false
  }
};
