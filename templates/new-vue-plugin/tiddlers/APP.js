/*\
title: $:/plugins/{{ plugin_author }}/${pluginname}/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Version = require('./components/Version');

const app = () => {
  const component = {
    setup() {
      return {};
    },

    methods: {},

    template: getTemplate(
      '$:/plugins/{{ plugin_author }}/${pluginname}/templates/app.vue'
    ),

    components: {
      Version
    }
  };
  return component;
};

module.exports = app;
