/*\
title: $:/plugins/{{ plugin_author }}/{{ pluginname }}/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

// 等价于 const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/{{ plugin_author }}/{{ pluginname }}';

const Version = require('./components/Version');

const app = () => {
  const component = {
    components: {
      Version, // 示例组件， 可删除
    },
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    // setup() {},
    data() {},
    // created() {},
    mounted() {
      console.log('App mounted!');
    },

    methods: {},
  };
  return component;
};

module.exports = app;
