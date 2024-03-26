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
    label: '本页目录',
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
    options: {
      disableQueryPersistence: false,
      detailedView: true,
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档',
        },
        modal: {
          noResultsText: '无法找到相关结果',
          resetButtonTitle: '清除查询条件',
          footer: {
            selectText: '选择',
            navigateText: '切换',
          },
        },
      },
    },
  },
} as DefaultTheme.Config;
