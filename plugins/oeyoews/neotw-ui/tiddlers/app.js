/*\
title: $:/plugins/oeyoews/neotw-ui/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Version = require('./components/Version');
const ElementPlus = require('element-plus.min.js');

const tids = {
  siteTitle: '$:/SiteTitle',
  siteSubTitle: '$:/SiteSubtitle',
  fontsize: '$:/themes/tiddlywiki/vanilla/metrics/fontsize',
};

const getconf = (title) => {
  return $tw.wiki.getTiddlerText(title);
};

const updateconf = (title, data) => {
  return $tw.wiki.setText(title, 'text', null, data);
};

const app = () => {
  const component = {
    data() {
      const fontsizes = ['14px', '16px', '18px', '20px', '22px', '24px'];
      return { title: '', subtitle: '', fontsize: '', fontsizes };
    },

    created() {
      // 用户标题
      this.title = getconf(tids.siteTitle);
      // 用户副标题
      this.subtitle = getconf(tids.siteSubTitle);
      // 字体大小
      this.fontsize = getconf(tids.fontsize);
    },

    computed: {},

    methods: {
      submit() {
        updateconf(tids.siteTitle, this.title);
        updateconf(tids.siteSubTitle, this.subtitle);
        updateconf(tids.fontsize, this.fontsize);
        this.notify();
      },

      notify() {
        ElementPlus.ElMessage({
          message: '操作成功',
          type: 'success',
        });
      },
    },

    template: getTemplate('$:/plugins/oeyoews/neotw-ui/templates/app.vue'),

    components: {
      Version,
    },
  };
  return component;
};

module.exports = app;
