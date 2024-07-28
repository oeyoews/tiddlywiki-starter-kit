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
const themes = $tw.wiki.filterTiddlers('[plugin-type[theme]]');
const palettes = $tw.wiki.filterTiddlers(
  '[all[shadows+tiddlers]tag[$:/tags/Palette]]',
);

const recentTiddlers = $tw.wiki.filterTiddlers(
  '[!is[system]days[-180]!<currentTiddler>!sort[modified]limit[8]]',
);

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

      const avatarSrc = 'https://github.com/oeyoews.png?size=16';

      const currentPalette = $tw.wiki.getTiddlerText('$:/palette');
      const isDarkMode =
        $tw.wiki.getTiddler(currentPalette)?.fields['color-scheme'] === 'dark'
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
      const recentChildren = recentTiddlers
        .filter((tiddler) => tiddler.length <= 35)
        .map((tiddler) => ({
          label: tiddler,
          // maxWidth: '300',
          icon: getIcon('file'),
          onClick: () => goto.navigateTiddler(tiddler),
        }));

      const themeChildren = themes.map((theme) => {
        const label = theme.split('/')[theme.split('/').length - 1];
        return {
          label,
          checked: theme === $tw.wiki.getTiddlerText('$:/theme'),
          // icon: getIcon('theme'),
          onClick: () => {
            $tw.wiki.setText(`$:/theme`, 'text', null, theme);
            // Perference -> Theme -> theme
            const PerferenceIndex = findLabelIndex('Perference', items);
            const ThemeIndex2 = findLabelIndex(
              'Theme',
              items[PerferenceIndex].children,
            );
            menuData.items[PerferenceIndex].children[
              ThemeIndex2
            ].children.forEach((item) => {
              if (item.label === label) {
                item.checked = true;
              } else {
                item.checked = false;
              }
            });
          },
        };
      });

      const paletteChildren = palettes.map((palette) => {
        const label = palette.split('/')[palette.split('/').length - 1];
        return /** @type {IMenuItem} */ ({
          label,
          // maxWidth: '300',
          // startupaction 会有影响
          icon: palette === $tw.wiki.getTiddlerText('$:/palette'),
          onClick: () => {
            $tw.wiki.setText('$:/palette', 'text', null, palette);
            menuData.theme = getDarkMode() ? 'dark' : 'light';
            // Perference -> Theme -> Palette
            const PerferenceIndex = findLabelIndex('Perference', items);
            const PaletteIndex = findLabelIndex(
              'Palette',
              items[PerferenceIndex].children,
            );
            menuData.items[PerferenceIndex].children[
              PaletteIndex
            ].children.forEach((item) => {
              if (item.label === label) {
                item.checked = true;
              } else {
                item.checked = false;
              }
            });
          },
        });
      });

      /**
       * @typedef {Object} IMenuItem
       * @property {string} label
       * @property {string} icon
       * @property {() => void} onClick
       * @property {string} [shortcut]
       * @property {string|number} [minWidth]
       * @property {string|number} [maxWidth]
       */

      /** @type {IMenuItem[]} */
      const items = [
        {
          //#region File
          label: 'File',
          icon: getIcon('files'),
          onSubMenuOpen: () => {
            console.log('open');
          },
          /** @type {IMenuItem[]} */
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
              children: recentChildren,
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
        //#region View
        {
          label: 'View',
          /** @type {IMenuItem[]} */
          children: [
            {
              label: 'Home',
              icon: getIcon('home'),
              shortcut: 'G + H',
              onClick: () => goto.navigateTiddler('GettingStarted'),
            },
            {
              label: 'TODO',
              icon: getIcon('notify'),
              shortcut: 'G + Shift + I',
              onClick: () =>
                goto.navigateTiddler(
                  '$:/plugins/nico/projectify/ui/dashboard/Dashboard',
                ),
            },
            {
              label: 'Search',
              icon: getIcon('search'),
              shortcut: 'G + S',
              // action string
              onClick: () => goto.navigateTiddler('$:/AdvancedSearch'),
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
              shortcut: 'G + D',
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
            {
              label: 'Dark Mode',
              // checked: getDarkMode(),
              shortcut: 'G + T',
              onClick: () => {
                $tw.rootWidget.dispatchEvent({ type: 'om-toggle-theme' });
                menuData.theme = getDarkMode() ? 'dark' : 'light';
                // menuData.icon = getIcon(getDarkMode() ? 'dark' : 'light');
              },
              icon: getIcon(isDarkMode ? 'dark' : 'light'),
            },
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
        //#region Perference
        // language
        {
          label: 'Perference',
          /** @type {IMenuItem[]} */
          children: [
            {
              label: 'Sidebar Position',
              // TODO: reactive sidebar position
              onClick: toggleSidebarPosition,
              icon: getIcon('left'),
            },
            {
              label: 'Setup',
              onClick: () => goto.navigateTiddler('$:/ControlPanel'),
              shortcut: 'G + I',
              icon: getIcon('tiddlywiki'),
            },
            {
              label: 'Plugin',
              onClick: () =>
                goto.navigateTiddler('$:/core/ui/ControlPanel/Plugins'),
              shortcut: 'G + P',
              icon: getIcon('puzzle'),
            },
            {
              label: 'Theme',
              icon: getIcon('theme'),
              children: themeChildren,
            },
            {
              label: 'Palette',
              icon: getIcon('art'),
              children: paletteChildren,
            },
          ],
        },
        //#region Help
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
              label: 'TiddlyWiki Talk',
              icon: h('img', {
                src: 'https://talk.tiddlywiki.org/uploads/default/optimized/1X/39026bc4f2982199e99372b6c3c9655d07544b7d_2_32x32.svg',
                style: {
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                },
              }),
              onClick: () => {
                window.open('https://talk.tiddlywiki.org', 'tiddlywiki_talk');
              },
            },
            {
              label: 'TiddlyWiki',
              icon: getIcon('tiddlywiki'),
              onClick: () => {
                window.open('https://tiddlywiki.com', 'tiddlywiki_com');
              },
            },
            {
              label: `MenuBar ${version}`,
              icon: getIcon('git'),
              disabled: true,
            },
            {
              label: `TiddlyWiki ${$tw.version}`,
              icon: getIcon('git'),
              disabled: true,
            },
          ],
        },
      ];
      /**
       *
       * @param {typeof keyof items} label
       * @param {*} data
       * @returns
       */
      const findLabelIndex = (label, data = items) => {
        const labelIndex = data.findIndex((item) => item.label === label);
        if (labelIndex === -1) {
          console.error(`${label} not found`);
          return;
        }
        return labelIndex;
      };

      //#region MenuData
      const menuData = reactive({
        items,
        theme: isDarkMode ? 'dark' : '',
        // maxWidth: '100px',
        closeWhenScroll: false,
        mouseScrol: false,
        // mini: true,
        zIndex: 999,
        // https://github.com/imengyu/vue3-context-menu/issues/41 似乎对菜单栏无效
        // onClose: (e) => {
        //   console.log(e, '999');
        // },
      });

      // 动态菜单
      const avatar = new Image();
      avatar.src = avatarSrc;
      avatar.onload = () => {
        const imageIndex = findLabelIndex('Help');
        const aboutIndex = findLabelIndex('About', items[imageIndex].children);
        setTimeout(() => {
          menuData.items[imageIndex].children[aboutIndex].hidden = false;
        }, 200);
      };

      //#region data
      return {
        menuData,
        menubarNav,
        tiddlywiki_icon: icons.tiddlywiki,
        menu_icon: icons.menu,
        toggleSidebar,
      };
    },
    provide() {
      return {
        // toggleSidebar,
      };
    },
    mounted() {
      // 不能在这里获取
      // this.menubarNav = getNavigatorWidget();
      // TODO: 监听快捷键切换主题
      // document.addEventListener('menubarNavChange', (e) => {
      //   if (e.detail) {
      //     this.menubarNav = e.detail;
      //   } else {
      //   }
      // });
    },
  };
  return component;
};

module.exports = app;
