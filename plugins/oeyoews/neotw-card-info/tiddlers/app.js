/*\
title: $:/plugins/oeyoews/neotw-card-info/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-card-info';

const Version = require('./components/Version');
const nav = new $tw.Story();

const app = (title) => {
  const component = {
    components: {
      Version, // 示例组件， 可删除
    },
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    data() {
      return {
        tiddler: this.getTiddler(),
        title,
        username: this.getUserName(),
      };
    },
    computed: {},

    watch: {
      // created() {},
    },

    mounted() {},
    methods: {
      getCreatedTime() {
        console.log(this.tiddler);
        return this.tiddler.fields.created;
      },
      getUserName() {
        return $tw.wiki.getTiddlerText('$:/status/UserName');
      },
      getTiddler() {
        return $tw.wiki.getTiddler(title);
      },
      goto() {
        nav.navigateTiddler(title);
      },
    },
  };
  return component;
};

module.exports = app;
