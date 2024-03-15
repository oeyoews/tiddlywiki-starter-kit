/*\
title: $:/plugins/oeyoews/vue-rss/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = (rss = 'https://talk.tiddlywiki.org/posts.rss') => {
  const component = {
    setup() {
      const rssItems = ref([]);
      const loading = ref(true);
      const title = ref('');
      const link = ref('');

      return { rssItems, loading, title, link };
    },
    mounted() {
      this.fetchRSS();
    },

    methods: {
      async fetchRSS() {
        const proxy = 'https://corsproxy.io/?';
        const RSS_URL = proxy + rss;

        try {
          const response = await fetch(RSS_URL);
          const data = await response.text();

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const items = xmlDoc.getElementsByTagName('item');
          const channel = xmlDoc.getElementsByTagName('channel')[0];
          this.title = channel.getElementsByTagName('title')[0].textContent;
          this.link = channel.getElementsByTagName('link')[0].textContent;

          for (var i = 0; i < items.length; i++) {
            const title =
              items[i].getElementsByTagName('title')[0]?.textContent;
            const summary =
              items[i].getElementsByTagName('description')[0]?.textContent;
            const update =
              items[i].getElementsByTagName('pubDate')[0]?.textContent;
            const link = items[i].getElementsByTagName('link')[0]?.textContent;
            this.rssItems.push({
              title,
              summary,
              update,
              link
              // text
            });
          }
          this.loading = false;
        } catch (e) {
          console.error(e);
        }
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-rss/templates/app.vue')
  };

  return component;
};

module.exports = app;
