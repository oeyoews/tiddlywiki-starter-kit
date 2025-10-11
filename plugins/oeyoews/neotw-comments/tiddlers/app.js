/*\
title: $:/plugins/oeyoews/neotw-comments/app.js
type: application/javascript
module-type: library

\*/

// const { ref } = window.Vue;

// 等价于 const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-comments';
const CommentList = require('./components/CommentList.js');

const app = ({ tiddler }) => {
  const component = {
    components: {
      CommentList,
    },
    template: getTemplate(`${pluginTitle}/templates/app.vue`),

    setup() {
      return {
        currentTiddler: tiddler,
      };
    },

    mounted() {},
  };
  return component;
};

module.exports = app;
