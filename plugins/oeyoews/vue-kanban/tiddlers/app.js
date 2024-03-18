/*\
title: $:/plugins/oeyoews/vue-kanban/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Version = require('./components/Version');

const app = () => {
  const component = {
    setup() {
      const state = ref({
        nostatus: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        todo: '',
        inprogress: '',
        done: ''
      });

      return { state };
    },

    methods: {},

    template: getTemplate('$:/plugins/oeyoews/vue-kanban/templates/app.vue'),

    components: {
      Version
    }
  };
  return component;
};

module.exports = app;
