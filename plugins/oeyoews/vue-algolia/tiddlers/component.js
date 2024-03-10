/*\
title: $:/plugins/oeyoews/vue-algolia/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');
const algoliasearch = require('algolia.min.js');

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = () => {
  const component = {
    setup() {
      // key
      const searchClient = algoliasearch();
      return {
        searchClient
      };
    },

    methods: {},

    template: getTemplate('$:/plugins/oeyoews/vue-algolia/widget.vue')
  };
  return component;
};

module.exports = app;
