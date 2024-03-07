/*\
title: $:/plugins/{{ plugin_author }}/${pluginname}/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = () => {
  let template = $tw.wiki
    .getTiddlerText('$:/plugins/{{ plugin_author }}/${pluginname}/widget.vue')
    .trim();

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

    template: getTemplate()
  };
  return component;
};

module.exports = app;
