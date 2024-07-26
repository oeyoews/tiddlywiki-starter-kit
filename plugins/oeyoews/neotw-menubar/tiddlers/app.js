/*\
title: $:/plugins/oeyoews/neotw-menubar/app.js
type: application/javascript
module-type: library

\*/

const { h, ref, reactive } = window.Vue;

const pluginTitle = '$:/plugins/oeyoews/neotw-menubar';
const { version } = $tw.wiki.getTiddler(pluginTitle).fields;

const getNavigatorWidget = require('./getNavigatorWidget');
const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const { MenuBar } = require('vue-context-menu.min.js');
const toggleSidebar = require('./toggleSidebar.js');

const Icon = require('./components/Icon.js');
const icons = require('./icons');

/**
 * @param {keyof import('./icons')} icon
 */
const getIcon = (icon) => {
  return h(Icon, {
    icon: icons[icon],
  });
};

const goto = new $tw.Story();

const app = () => {
  const component = {
    components: {
      MenuBar,
    },
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    setup() {
      /** @type {import('tiddlywiki').Widget} */
      const menubarNav = ref(null);
      const hasNav = ref(false);

      const avatarSrc = 'https://github.com/oeyoews.png?size=16';

      const palette = $tw.wiki.getTiddlerText('$:/palette');
      const isDarkMode =
        $tw.wiki.getTiddler(palette)?.fields['color-scheme'] === 'dark'
          ? true
          : false;
      const getDarkMode = () => {
        const palette = $tw.wiki.getTiddlerText('$:/palette');
        return $tw.wiki.getTiddler(palette)?.fields['color-scheme'] === 'dark';
      };
      const positionTiddler =
        '$:/themes/nico/notebook/metrics/sidebar-position';
      /**
       * @param {'left' |'right'} position
       */
      const setSidebarPosition = (position) => {
        if (!['left', 'right'].includes(position)) {
          console.error('position must be left or right');
          return;
        }
        $tw.wiki.setText(positionTiddler, 'position', null, position);
      };

      const toggleSidebarPosition = () => {
        const sidebarPosition =
          $tw.wiki.getTiddler(positionTiddler).fields?.position;

        if (sidebarPosition === 'left') {
          setSidebarPosition('right');
        } else {
          setSidebarPosition('left');
        }
      };

      // 以防触发事件的时候， menubar 监听器没有添加, 手动获取menubarNav widget
      const checkNavigatorWidget = () => {
        if (!menubarNav.value) {
          menubarNav.value = getNavigatorWidget();
        }
      };

      const items = [
        {
          label: 'File',
          icon: getIcon('files'),
          children: [
            {
              label: 'New Tiddler',
              shortcut: 'G + N',
              onClick: () => {
                checkNavigatorWidget();
                menubarNav.value.dispatchEvent({ type: 'tm-new-tiddler' });
              },
              icon: getIcon('plus'),
            },
            {
              label: 'New Journal',
              shortcut: 'Alt + J',
              onClick: () => {
                checkNavigatorWidget();
                menubarNav.value.dispatchEvent({
                  type: 'tm-new-tiddler',
                  paramObject: {
                    title: new Date().toISOString().split('T')[0],
                    tags: 'Journal',
                  },
                });
              },
              icon: getIcon('journal'),
            },
            {
              label: 'Open recent',
              icon: getIcon('history'),
              children: [
                {
                  label: 'GettingStarted',
                  icon: getIcon('file'),
                  onClick: () => goto.navigateTiddler('GettingStarted'),
                },
              ],
            },
            {
              label: 'Save',
              shortcut: 'Ctrl + S',
              icon: getIcon('save'),
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'tm-save-wiki' }),
            },
          ],
        },
        // view
        {
          label: 'View',
          children: [
            {
              label: 'Home',
              icon: getIcon('home'),
              shortcut: 'G + H',
              // action string
              onClick: () => goto.navigateTiddler('GettingStarted'),
            },
            {
              label: 'Refresh',
              shortcut: 'Ctrl + R',
              icon: getIcon('refresh'),
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'tm-browser-refresh' }),
            },
            {
              label: 'Permaview',
              icon: getIcon('permaview'),
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'tm-permaview' }),
            },
            {
              label: 'Close All',
              icon: getIcon('closeall'),
              onClick: () => {
                checkNavigatorWidget();
                menubarNav.value.dispatchEvent({
                  type: 'tm-close-all-tiddlers',
                });

                // 清空时， 关闭侧边栏
                $tw.wiki.setText(
                  `$:/state/notebook-sidebar`,
                  'text',
                  null,
                  'no',
                );
              },
            },
            // need neotw-cmp plugins
            // { label: 'Themes' },
            // { label: 'Palette' },
            {
              label: 'Dark Mode',
              // checked: getDarkMode(),
              onClick: () => {
                $tw.rootWidget.dispatchEvent({ type: 'om-toggle-theme' });
                menuData.theme = getDarkMode() ? 'dark' : 'light';
                // findindex
                // menuData.icon = getIcon(getDarkMode() ? 'dark' : 'light');
              },
              icon: getIcon(isDarkMode ? 'dark' : 'light'),
            },
            // fontsize
            // layout
            // classic view
            {
              label: 'Command Palette',
              shortcut: 'Ctrl + P',
              onClick: () => {
                $tw.rootWidget.dispatchEvent({ type: 'open-cmp' });
              },
              icon: getIcon('terminal'),
            },
            {
              label: 'Full Screen',
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'tm-full-screen' }),
              icon: getIcon('fullscreen'),
            },
          ],
        },
        {
          label: 'Sidebar',
          onClick: toggleSidebar,
        },
        {
          label: 'Perference',
          children: [
            {
              label: 'Sidebar Position',
              onClick: toggleSidebarPosition,
              icon: getIcon('left'),
            },
            {
              label: 'Setup',
              onClick: () => goto.navigateTiddler('$:/ControlPanel'),
              shortcut: 'G I',
              icon: getIcon('tiddlywiki'),
            },
          ],
        },
        {
          label: 'Help',
          children: [
            {
              label: 'About',
              hidden: true, // 动态加载
              icon: h('img', {
                src: avatarSrc,
                style: {
                  borderRadius: '50%',
                },
              }),
              onClick: () => $tw.modal.display('oeyoews'),
            },
            {
              label: 'Readme',
              icon: getIcon('readme'),
              onClick: () => $tw.modal.display(pluginTitle + '/readme'),
            },
            {
              label: 'GitHub',
              icon: getIcon('github'),
              onClick: () => {
                window.open('https://github.com/oeyoews/neotw', 'neotw');
              },
            },
            {
              label: `${version}`,
              icon: getIcon('git'),
              disabled: true,
            },
          ],
        },
      ];

      const menuData = reactive({
        items,
        theme: isDarkMode ? 'dark' : '',
        // mini: true,
        zIndex: 99999,
        // https://github.com/imengyu/vue3-context-menu/issues/41 似乎对菜单栏无效
        onClose: (e) => {
          console.log(e, '999');
        },
      });

      // 动态菜单
      const avatar = new Image();
      avatar.src = avatarSrc;
      avatar.onload = () => {
        const imageIndex = items.findIndex((item) => item.label === 'Help');
        const aboutIndex = menuData.items[imageIndex].children.findIndex(
          (item) => item.label === 'About',
        );
        setTimeout(() => {
          menuData.items[imageIndex].children[aboutIndex].hidden = false;
        }, 200);
      };

      return { menuData, menubarNav, hasNav };
    },
    mounted() {
      // 不能在这里获取
      // this.menubarNav = getNavigatorWidget();
      // document.addEventListener('menubarNavChange', (e) => {
      //   if (e.detail) {
      //     this.menubarNav = e.detail;
      //     this.hasNav = true;
      //   } else {
      //     this.hasNav = false;
      //   }
      // });
    },
  };
  return component;
};

module.exports = app;
