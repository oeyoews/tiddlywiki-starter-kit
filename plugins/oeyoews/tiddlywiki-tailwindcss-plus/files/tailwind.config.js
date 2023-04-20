module.exports = {
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
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
  variants: {
    extend: {
      appearance: ['hover', 'focus'],
    },
  },
  important: true,
  corePlugins: {
    preflight: false,
  },
};
