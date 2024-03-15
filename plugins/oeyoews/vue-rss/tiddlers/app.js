/*\
title: $:/plugins/oeyoews/vue-rss/app.js
type: application/javascript
module-type: library

\*/

const { toRaw, ref, watchEffect } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const browserType = () => {
  // 获取浏览器的用户代理信息
  const userAgent = navigator.userAgent;

  // 利用正则表达式匹配浏览器型号
  let browserModel = 'Unknown';

  // 匹配常见浏览器型号
  if (/Chrome/.test(userAgent)) {
    // 匹配Chrome浏览器
    browserModel = 'Chrome';
  } else if (/Firefox/.test(userAgent)) {
    // 匹配Firefox浏览器
    browserModel = 'Firefox';
  } else if (/Safari/.test(userAgent)) {
    // 匹配Safari浏览器
    browserModel = 'Safari';
  } else if (/Edge/.test(userAgent)) {
    // 匹配Edge浏览器
    browserModel = 'Edge';
  } else if (/MSIE|Trident/.test(userAgent)) {
    // 匹配IE浏览器
    browserModel = 'Internet Explorer';
  }
  return browserModel;
};

const isSafari = browserType() === 'Safari';

const getContent = (data, tag) => {
  return data.getElementsByTagName(tag)[0]?.textContent;
};
const proxy = 'https://corsproxy.io/?';

const app = (rss = 'https://talk.tiddlywiki.org/posts.rss') => {
  const component = {
    setup() {
      const rssItems = ref([]);
      const loading = ref(true);
      const currentPage = ref(1);
      const itemsPerPage = 10;
      const paginatedItems = ref([]);
      const pages = ref(0);
      const order = ref(0);

      const channel = ref({
        title: '',
        link: '',
        description: ''
      });

      watchEffect(() => {
        order.value = (currentPage.value - 1) * itemsPerPage + 1;
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const nextPage = rssItems.value.slice(startIndex, endIndex);
        if (nextPage.length > 0) {
          paginatedItems.value = nextPage;
        }
      });

      return {
        order,
        rssItems,
        loading,
        channel,
        isSafari,
        currentPage,
        pages,
        itemsPerPage,
        paginatedItems
      };
    },

    mounted() {
      if (!isSafari) {
        this.fetchRSS();
      } else {
        this.loading = false;
      }
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

          this.pages = Math.ceil(
            toRaw(this.rssItems.length) / this.itemsPerPage
          );

          this.loading = false;
        } catch (e) {
          console.error(e);
          this.loading = false;
        }
      },

      changePage(page) {
        if (page < 1 || page > this.pages) {
          console.warn('page out of range');
          return;
        }
        this.currentPage = page;
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-rss/templates/app.vue')
  };

  return component;
};

module.exports = app;
