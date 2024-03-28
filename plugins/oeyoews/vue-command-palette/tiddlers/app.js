/*\
title: $:/plugins/oeyoews/vue-command-palette/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const cmd = '$:/plugins/oeyoews/vue-command-palette/lib/cmd.min.js';

const { Command } = require(cmd);

const app = () => {
  const component = {
    setup() {
      const commands = [];

      return { commands };
    },

    methods: {},

    template: getTemplate(
      '$:/plugins/oeyoews/vue-command-palette/templates/app.vue'
    ),

    components: {
      Command
    }
  };
  return component;
};

module.exports = app;
