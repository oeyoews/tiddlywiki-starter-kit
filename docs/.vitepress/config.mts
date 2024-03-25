import { defineConfig } from 'vitepress';

const online = [
  { text: '在线示例', link: 'https://tiddlywiki-starter-kit.oeyoews.top/' }
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TiddlyWiki Starter Kit',
  description: 'A VitePress Site',
  base: '/docs/',
  lastUpdated: true,
  cleanUrls: true,
  // metaChunks: true,
  appearance: 'dark',
  themeConfig: {
    logo: '/tiddlywiki.png',
    editLink: {
      pattern:
        'https://github.com/oeyoews/tiddlywiki-starter-kit/edit/main/docs/:path'
    },
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/README' },
      ...online
    ],

    sidebar: [
      {
        text: 'TiddlyWiki',
        items: [
          { text: '介绍', link: '/README' },
          { text: '插件生态', link: '/plugins/index' },
          { text: '插件开发', link: '/plugin' }
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
