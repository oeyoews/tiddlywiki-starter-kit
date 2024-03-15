/*\
title: $:/plugins/oeyoews/vue-rss/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const getContent = (data, tag) => {
  return data.getElementsByTagName(tag)[0]?.textContent;
};
const proxy = 'https://corsproxy.io/?';

const app = (rss = 'https://talk.tiddlywiki.org/posts.rss') => {
  const component = {
    setup() {
      const rssItems = ref([]);
      const loading = ref(true);

      const channel = ref({
        title: '',
        link: '',
        description: ''
      });

      return { rssItems, loading, channel };
    },
    mounted() {
      this.fetchRSS();
    },

    methods: {
      async fetchRSS() {
        const RSS_URL = proxy + rss;

        try {
          const response = await fetch(RSS_URL);
          const data = await response.text();

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const items = xmlDoc.getElementsByTagName('item');
          const channel = xmlDoc.getElementsByTagName('channel')[0];

          this.channel.title = getContent(channel, 'title');
          this.channel.link = getContent(channel, 'link');
          this.channel.description = getContent(channel, 'description');

          for (var i = 0; i < items.length; i++) {
            const item = items[i];
            const title = getContent(item, 'title');
            const summary = getContent(item, 'description');
            const update = getContent(item, 'pubDate');
            const link = getContent(item, 'link');

            this.rssItems.push({
              title,
              link,
              update,
              summary
            });
          }
          this.loading = false;
        } catch (e) {
          console.error(e);
          // TODO: note support IOS
          // alert(e);
          this.loading = false;
        }
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-rss/templates/app.vue')
  };

  return component;
};

module.exports = app;
