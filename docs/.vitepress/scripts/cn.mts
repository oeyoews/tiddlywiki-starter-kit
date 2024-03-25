import { DefaultTheme } from 'vitepress';

export default {
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
} as DefaultTheme.Config;
