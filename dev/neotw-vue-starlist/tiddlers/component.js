/*\
title: $:/plugins/oeyoews/neotw-vue-starlist/component.js
type: application/javascript
module-type: library

\*/

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = () => {
  const component = {
    setup() {
      return {};
    },

    methods: {},

    template: getTemplate('$:/plugins/oeyoews/neotw-vue-starlist/widget.vue')
  };
  return component;
};

module.exports = app;
