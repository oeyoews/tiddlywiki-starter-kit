/*\
title: $:/plugins/oeyoews/neotw-tiddlers-view/app.js
type: application/javascript
module-type: library

\*/

// const { ref } = window.Vue;

// 等价于 const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-tiddlers-view';

const TitleScroller = require('./components/TitleScroller.js');

const app = () => {
  const component = {
    components: {
      TitleScroller,
    },
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    // setup() {},
    data() {
      return {
        visibleTitles: [],
      };
    },
    // created() {},
    mounted() {
      console.log('App mounted!');
    },

    methods: {},
  };
  return component;
};

module.exports = app;
