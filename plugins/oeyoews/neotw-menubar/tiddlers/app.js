/*\
title: $:/plugins/oeyoews/neotw-menubar/app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Version = require('./components/Version');

const { MenuBar } = require('vue-context-menu.min.js');
const icons = require('./icons');
const Icon = {
  name: 'Icon',
  props: {
    icon: {
      type: String,
    },
  },
  template: `<div class="flex items-center" v-html="icon"></div>`,
};

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

    mounted() {},
    methods: {},

    template: getTemplate('$:/plugins/oeyoews/neotw-menubar/templates/app.vue'),

    components: {
      Version,
      MenuBar,
    },
  };
  return component;
};

module.exports = app;
