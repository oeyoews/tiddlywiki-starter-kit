/*\
title: $:/plugins/oeyoews/vue-plugin-template/app.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = () => {
  const component = {
    setup() {
      return {};
    },

    methods: {},

    template: getTemplate(
      '$:/plugins/oeyoews/vue-plugin-template/templates/app.vue'
    )
  };
  return component;
};

module.exports = app;
