/*\
title: $:/plugins/oeyoews/neotw-vue-fetch/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

/**
 * Creates a Vue component that fetches data from the specified URL and renders it.
 *
 * @param {string} url - The URL to fetch data from.
 * @return {Object} The Vue component object.
 */
const app = (url) => {
  const component = {
    setup() {
      // 加载中 ...
      const text = ref('');

      return {
        text,
      };
    },

    async mounted() {
      this.text = await this.getText();
    },

    methods: {
      renderText(text) {
        return $tw.wiki.renderText('text/html', 'text/markdown', text);
      },
      async getText() {
        try {
          const res = await fetch(url);
          const data = await res.text();
          return this.renderText(data);
        } catch (e) {
          this.text = `${url} 加载出错`;
          console.error(e.message);
        }
      },
    },

    template: getTemplate('$:/plugins/oeyoews/neotw-vue-fetch/widget.vue'),
  };
  return component;
};

module.exports = app;
