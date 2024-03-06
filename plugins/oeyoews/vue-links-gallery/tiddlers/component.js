/*\
title: $:/plugins/oeyoews/vue-links-gallery/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = () => {
  let template = $tw.wiki
    .getTiddlerText('$:/plugins/oeyoews/vue-links-gallery/widget.vue')
    .trim(); // trim to remove linebreak

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const links = (json = 'list-links.json') => {
  const component = {
    setup() {
      const data = ref(
        $tw.wiki.getTiddlerText(json)
          ? Object.entries($tw.wiki.getTiddlerData(json))
          : {}
      );
      return {
        data
      };
    },

    methods: {
      prettyLink: function (link) {
        return new URL(link).hostname;
      }
    },

    template: getTemplate()
  };
  return component;
};

module.exports = links;
