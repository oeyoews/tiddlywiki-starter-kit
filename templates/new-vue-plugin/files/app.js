/*\
title: $:/plugins/{{ plugin_author }}/{{ pluginname }}/app.js
type: application/javascript
module-type: library

\*/

// const { ref } = window.Vue;

// 等价于 const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/{{ plugin_author }}/{{ pluginname }}';

const HelloWorld = require('./components/HelloWorld.js');

const app = () => {
  const component = {
    components: {
      HelloWorld,
    },
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    data() {},
    mounted() {
      console.log('App mounted!');
    },

    methods: {},
  };
  return component;
};

module.exports = app;
