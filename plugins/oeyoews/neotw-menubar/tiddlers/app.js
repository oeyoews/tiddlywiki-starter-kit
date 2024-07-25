/*\
title: $:/plugins/oeyoews/neotw-menubar/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Version = require('./components/Version');

const { MenuBar } = require('vue-context-menu.min.js');

const app = () => {
  const component = {
    setup() {
      const items = [
        {
          label: 'File',
          children: [
            { label: 'New' },
            { label: 'Open' },
            {
              label: 'Open recent',
              children: [{ label: 'File 1....' }],
            },
            {
              label: 'Save',
              divided: true,
              shortcut: 'Ctrl + S',
            },
            { label: 'Save as...' },
            { label: 'Close' },
            { label: 'Exit' },
          ],
        },
        {
          label: 'Edit',
          children: [
            { label: 'Undo' },
            { label: 'Redo' },
            { label: 'Cut', divided: true },
            { label: 'Copy' },
            { label: 'Find', divided: true },
            { label: 'Replace' },
          ],
        },
        {
          label: 'View',
          children: [
            { label: 'Zoom in' },
            { label: 'Zoom out' },
            { label: 'Reset zoom' },
            { label: 'Full screent', divided: true },
            { label: 'Find', divided: true },
            { label: 'Replace' },
          ],
        },
        {
          label: 'Help',
          children: [{ label: 'About' }],
        },
      ];
      const menuData = {
        items,
        theme: 'dark',
        // mini: true,
      };

      return { menuData };
    },

    mounted() {
      // console.log(this.menuData);
    },
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
