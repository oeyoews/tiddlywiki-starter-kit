import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TiddlyWiki Starter Kit Documentation',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/README' }
    ],

    sidebar: [
      {
        text: 'TiddlyWiki',
        items: [
          { text: '介绍', link: '/README' },
          { text: '插件开发', link: '/plugin' },
          { text: 'Code', link: '/code.js' }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/oeyoews/tiddlywiki-starter-kit'
      }
    ]
  }
});
