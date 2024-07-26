/*\
title: $:/plugins/oeyoews/neotw-menubar/app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const pluginTitle = '$:/plugins/oeyoews/neotw-menubar';

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
              label: 'New',
              // TODO: use action string
              onClick: () => {},
              icon: getIcon('plus'),
            },
            // { label: 'Import', },
            {
              label: 'Open recent',
              icon: getIcon('history'),
              children: [{ label: 'File 1....' }],
            },
            {
              label: 'Refresh',
              divided: true,
              shortcut: 'Ctrl + R',
              icon: getIcon('refresh'),
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'tm-browser-refresh' }),
            },
            {
              label: 'Save',
              divided: true,
              shortcut: 'Ctrl + S',
              icon: getIcon('save'),
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'tm-save-wiki' }),
            },
            {
              label: 'Home',
              // action string
              // onClick: () => $tw.rootWidget.dispatchEvent({ type: 'tm-home' }),
            },
          ],
        },
        {
          label: 'View',
          children: [
            // need neotw-cmp plugins
            // { label: 'Themes' },
            // { label: 'Palette' },
            {
              label: 'DarkMode',
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'om-toggle-theme' }),
              icon: getIcon('dark'),
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
              // divided: true,
              onClick: () =>
                $tw.rootWidget.dispatchEvent({ type: 'tm-full-screen' }),
              icon: getIcon('fullscreen'),
            },
          ],
        },
        {
          label: 'Help',
          children: [{ label: 'About' }],
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
