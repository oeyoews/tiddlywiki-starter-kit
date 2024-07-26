/*\
title: $:/plugins/oeyoews/neotw-menubar/app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const pluginTitle = '$:/plugins/oeyoews/neotw-menubar';
const { version } = $tw.wiki.getTiddler(pluginTitle).fields;

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
      const palette = $tw.wiki.getTiddlerText('$:/palette');
      const isDarkMode =
        $tw.wiki.getTiddler(palette)?.fields['color-scheme'] === 'dark'
          ? true
          : false;
      const items = [
        {
          label: 'File',
          icon: getIcon('files'),
          children: [
            {
              label: 'New Tiddler',
              shortcut: 'G + N',
              // TODO: use action string
              onClick: () => {},
              icon: getIcon('plus'),
            },
            {
              label: 'New Journal',
              shortcut: 'Alt + J',
              // TODO: use action string
              onClick: () => {},
              icon: getIcon('journal'),
            },
            // { label: 'Import', },
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

      return { menuData };
    },
  };
  return component;
};

module.exports = app;
