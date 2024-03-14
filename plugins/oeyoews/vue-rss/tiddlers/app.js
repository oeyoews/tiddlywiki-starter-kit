/*\
title: $:/plugins/oeyoews/vue-rss/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = () => {
  const component = {
    setup() {
      const rssItems = ref([]);
      const loading = ref(true);

      return { rssItems, loading };
    },
    mounted() {
      this.fetchRSS();
    },

    methods: {
      fetchRSS() {
        const RSS_URL = 'https://jakearchibald.com/posts.rss';

        fetch(RSS_URL)
          .then((response) => response.text())
          .then((data) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const items = xmlDoc.getElementsByTagName('entry');
            for (var i = 0; i < items.length; i++) {
              const title =
                items[i].getElementsByTagName('title')[0].childNodes[0]
                  .nodeValue;
              const text =
                items[i].getElementsByTagName('content')[0].childNodes[0]
                  .nodeValue;
              const summary =
                items[i].getElementsByTagName('summary')[0].childNodes[0]
                  .nodeValue;
              const update =
                items[i].getElementsByTagName('updated')[0].childNodes[0]
                  .nodeValue;
              this.rssItems.push({
                title,
                summary,
                update,
                text
              });
            }
            this.loading = false;
          })
          .catch((error) => {
            console.error('获取 RSS 数据时出错:', error);
          });
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-rss/templates/app.vue')
  };

  return component;
};

module.exports = app;
