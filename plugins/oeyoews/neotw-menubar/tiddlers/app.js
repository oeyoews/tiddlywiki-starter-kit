/*\
title: $:/plugins/oeyoews/neotw-menubar/app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const pluginTitle = '$:/plugins/oeyoews/neotw-menubar';
const { version } = $tw.wiki.getTiddler(pluginTitle).fields;

const getNavigatorWidget = require('./getNavigatorWidget');
const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const { MenuBar } = require('vue-context-menu.min.js');

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

      const palette = $tw.wiki.getTiddlerText('$:/palette');
      const isDarkMode =
        $tw.wiki.getTiddler(palette)?.fields['color-scheme'] === 'dark'
          ? true
          : false;

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
              },
            },
            // need neotw-cmp plugins
            // { label: 'Themes' },
            // { label: 'Palette' },
            {
              label: isDarkMode ? 'Light Mode' : 'Dark Mode',
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'om-toggle-theme' }),
              icon: getIcon(isDarkMode ? 'light' : 'dark'),
            },
            // fontsize
            // layout
            // classic view
            {
              label: 'Command Palette',
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
          label: 'Help',
          children: [
            {
              label: 'About',
              icon: getIcon('info'),
              onClick: () => $tw.modal.display(pluginTitle + '/readme'),
            },
            {
              label: `${version}`,
              icon: getIcon('git'),
              disabled: true,
            },
          ],
        },
      ];
      const menuData = {
        items,
        theme: isDarkMode ? 'dark' : '',
        // mini: true,
        zIndex: 99999,
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
