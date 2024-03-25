import { defineConfig } from 'vitepress';

const online = [
  { text: '在线示例', link: 'https://tiddlywiki-starter-kit.oeyoews.top/' },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TiddlyWiki Starter Kit',
  description: '📦 使用 TiddlyWiki5 搭建的本地优先笔记软件',
  base: '/docs/',
  lastUpdated: true,
  cleanUrls: true,
  // metaChunks: true,
  appearance: 'dark',
  themeConfig: {
    logo: '/tiddlywiki.png',
    editLink: {
      pattern:
        'https://github.com/oeyoews/tiddlywiki-starter-kit/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2019-${new Date().getFullYear()} oeyoews`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/README' },
      ...online,
    ],

    sidebar: [
      {
        text: 'TiddlyWiki',
        collapsed: true,
        items: [{ text: '介绍', link: '/README' }],
      },
      {
        text: '插件',
        items: [{ text: '插件生态', link: '/plugins' }],
      },
      {
        text: '开发',
        items: [
          { text: '插件开发', link: '/plugin' },
          { text: 'API', link: '/api' },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/oeyoews/tiddlywiki-starter-kit',
      },
    ],
  },
});
