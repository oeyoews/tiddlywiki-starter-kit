/*\
title: $:/plugins/oeyoews/vue-command-palette/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const cmd = '$:/plugins/oeyoews/vue-command-palette/lib/cmd.min.js';

const { CmdBar } = require(cmd);

const app = () => {
  const component = {
    setup() {
      const commands = [
        {
          key: 'people',
          commands: [
            {
              id: '1',
              label: 'Command 1'
            },
            {
              id: '2',
              label: 'Command 2'
            },
            {
              id: '3',
              label: 'Command 3'
            }
          ]
        },
        {
          key: 'places',
          commands: [
            {
              id: '4',
              label: 'Command 4'
            },
            {
              id: '5',
              label: 'Command 5'
            },
            {
              id: '6',
              label: 'Command 6'
            }
          ]
        }
      ];

      return { commands };
    },

    methods: {},

    template: getTemplate(
      '$:/plugins/oeyoews/vue-command-palette/templates/app.vue'
    ),

    components: {
      CmdBar
    }
  };
  return component;
};

module.exports = app;
