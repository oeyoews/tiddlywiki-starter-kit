/*\
title: $:/plugins/oeyoews/vue-echarts-addon/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const list = $tw.wiki.filterTiddlers(
  '[tag[Journal]short[yes]!sort[created]limit[9]]'
);

const content = list.map((title) => {
  return $tw.wiki.renderTiddler('text/html', title, {
    parseAsInline: true
  });
});

const app = () => {
  const component = {
    template: getTemplate(
      '$:/plugins/oeyoews/vue-echarts-addon/templates/app.vue'
    ),
    data() {
      return {
        newsItems: content,
        currentIndex: 0,
        scrollSpeed: 3000 // 滚动速度，单位为毫秒
      };
    },
    mounted() {
      this.startScroll();
    },
    methods: {
      startScroll() {
        setInterval(() => {
          this.scrollNews();
        }, this.scrollSpeed);
      },
      scrollNews() {
        const newsList = this.$refs.newsList;
        const newsItems = newsList.querySelectorAll('li');
        const currentNewsItem = newsItems[this.currentIndex];

        currentNewsItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        this.currentIndex = (this.currentIndex + 1) % newsItems.length;
      }
    }
  };
  return component;
};

module.exports = app;
