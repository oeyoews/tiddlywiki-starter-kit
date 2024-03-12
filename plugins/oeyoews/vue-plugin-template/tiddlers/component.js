/*\
title: $:/plugins/oeyoews/vue-plugin-template/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = () => {
  const component = {
    setup() {
      return {};
    },

    methods: {},

    template: getTemplate(
      '$:/plugins/oeyoews/vue-plugin-template/templates/widget.vue'
    )
  };
  return component;
};

module.exports = app;
