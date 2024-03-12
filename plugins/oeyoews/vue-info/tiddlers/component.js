/*\
title: $:/plugins/oeyoews/vue-info/component.js
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

const getString = (filter) => {
  return $tw.wiki.filterTiddlers(filter);
};

const plugins = getString('[plugin-type[plugin]]').length;
const tags = getString('[tags[]]').length;
const version = $tw.version.replace(/-/g, ' ');

const app = () => {
  const component = {
    setup() {
      const tiddlers = ref(getString('[!is[system]]').length.toLocaleString());
      const update = ref(
        getString(
          '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]'
        )[0]
      );
      return {
        update,
        plugins,
        tags,
        tiddlers,
        version
      };
    },

    methods: {},

    template: getTemplate('$:/plugins/oeyoews/vue-info/templates/widget.vue')
  };
  return component;
};

module.exports = app;
