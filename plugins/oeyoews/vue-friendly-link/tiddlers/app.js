/*\
title: $:/plugins/oeyoews/vue-friendly-link/app.js
type: application/javascript
module-type: library

\*/

const { watch, watchEffect, onMounted, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const useId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const getTemplate = () => {
  let template = $tw.wiki
    .getTiddlerText('$:/plugins/oeyoews/neotw-vue-todo/todo.vue')
    .trim(); // trim to remove linebreak

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = (json = 'friendly-links.json') => {
  const component = {
    setup() {
      return {};
    },

    methods: {},

    template: getTemplate()
  };
  return component;
};

module.exports = app;
