/*\
title: $:/plugins/{{ plugin_author }}/${pluginname}/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

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
      return {};
    },

    methods: {},

    template: getTemplate(
      '$:/plugins/{{ plugin_author }}/${pluginname}/widget.vue'
    )
  };
  return component;
};

module.exports = app;
