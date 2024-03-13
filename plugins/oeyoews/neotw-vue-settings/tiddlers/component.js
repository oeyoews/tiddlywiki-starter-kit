/*\
title: $:/plugins/oeyoews/neotw-vue-settings/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, reactive, ref } = window.Vue;

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = (json = 'settings.json') => {
  const component = {
    setup() {
      const data = reactive({
        title: '',
        subtitle: ''
      });
      watch(data, () => {
        $tw.wiki.setTiddlerData(json, toRaw(data));
      });
      return {
        data
      };
    },

    methods: {
      apply: function () {
        // setup fn
      }
    },

    template: getTemplate('$:/plugins/oeyoews/neotw-vue-settings/widget.vue')
  };
  return component;
};

module.exports = app;
