/** @type {import('tailwindcss').Config} */
/* 这是一个 JSDoc 注释，用于指定 tailwindcss 配置文件的类型。它告诉编辑器和 TypeScript，这个配置文件应该是一个 tailwindcss 配置对象，可以使用 import('tailwindcss').Config 来导入。
例如，如果您想要在 TypeScript 代码中使用 tailwindcss 配置对象，您可以使用以下代码：
import type { Config } from 'tailwindcss';
const config: Config = {
  // Your Tailwind CSS configuration here
};
在这个代码中，我们使用 import type { Config } from 'tailwindcss' 来导入 tailwindcss 配置对象的类型。然后，我们定义了一个名为 config 的变量，并将其类型设置为 Config。这样，TypeScript 就知道 config 变量应该是一个 tailwindcss 配置对象，并可以在编译时检查它是否符合预期。
*/

module.exports = {
  // prefix: 'tw-',
  content: [
    './plugins/oeyoews/**/*.{html,tid,md,js}',
    './tiddlers/**/*!(StoryList).{js,tid}',
    './tiddlers/**/*!(($%2FStoryList)).tid',
  ],
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
  // darkMode: ['class', '[data-mode="dark"]'],
  variants: {
    extend: {
      appearance: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
