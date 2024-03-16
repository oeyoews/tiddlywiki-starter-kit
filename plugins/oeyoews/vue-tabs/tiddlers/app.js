/*\
title: $:/plugins/oeyoews/vue-tabs/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const DEFAULT_STORY_TITLE = '$:/StoryList';

const tiddlers = $tw.wiki.getTiddlerList(DEFAULT_STORY_TITLE);

const app = () => {
  const component = {
    setup() {
      const data = ref(tiddlers);
      return {
        data
      };
    },

    methods: {
      closeTiddler(e) {
        const title = e.target?.dataset.id;
        if (!title) return;
        this.data = this.data.filter((item) => item !== title);
        // $tw.wiki.setText('$:/StoryList', 'list', null, this.data);
        $tw.wiki.addTiddler(
          {
            title: DEFAULT_STORY_TITLE,
            text: '',
            list: $tw.utils.stringifyList(this.data)
          },
          $tw.wiki.getModificationFields()
        );
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-tabs/templates/app.vue')
  };
  return component;
};

module.exports = app;
