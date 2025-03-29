import { type DefaultTheme } from 'vitepress';
import pluginlist from './pluginlist.json';

export default [
  {
    text: 'TiddlyWiki',
    items: [{ text: '介绍', link: '/README' }],
  },
  {
    text: '太微插件',
    collapsed: true,
    items: [{ text: '插件生态', link: '/plugins/' }, ...pluginlist],
  },
  {
    text: '太微工具',
    items: [
      { text: '插件', link: '/tools' },
      { text: '脚手架', link: '/cli' },
    ],
  },
  {
    text: '开发',
    items: [
      { text: '插件开发', link: '/dev/' },
      { text: 'API', link: '/api' },
    ],
  },
] as DefaultTheme.Config['sidebar'];
