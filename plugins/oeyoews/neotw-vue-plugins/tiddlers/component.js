/*\
title: $:/plugins/oeyoews/neotw-vue-plugins/component.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = (
  url = 'https://tiddlywiki-starter-kit.oeyoews.top/library/recipes/library/tiddlers.json'
) => {
  const component = {
    setup() {
      const data = ref();
      const loading = ref(true);
      const count = ref(0);
      return { data, loading, count, url };
    },

    async mounted() {
      this.data = await this.getPlugins(url);
    },

    methods: {
      async getPlugins(url) {
        try {
          const res = await fetch(url, {
            // cache: 'force-cache'
            headers: {
              // 'Cache-Control': 'no-cache'
            }
          });
          const data = await res.json();
          const size = new TextEncoder().encode(data).length;
          console.log(size / 100, 'kb');
          this.loading = false;
          this.count = data.length;
          return data;
        } catch (e) {
          console.error(e);
          toast.error(e.message);
          this.loading = false;
        }
      }
    },

    template: getTemplate('$:/plugins/oeyoews/neotw-vue-plugins/widget.vue')
  };
  return component;
};

module.exports = app;
