/*\
title: $:/plugins/oeyoews/vue-tabs/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const tiddlers = $tw.wiki.filterTiddlers('[list[$:/StoryList]!has[draft.of]]');

const app = () => {
  const component = {
    setup() {
      const data = ref(tiddlers);
      return {
        data
      };
    },

    methods: {
      closeTiddler(title) {
        if (!title) return;
        this.data = this.data.filter((item) => item !== title);
        $tw.wiki.setText('$:/StoryList', 'list', null, this.data);
        console.log('updated');
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-tabs/templates/app.vue')
  };
  return component;
};

module.exports = app;
