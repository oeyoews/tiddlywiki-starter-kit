/*\
title: $:/plugins/oeyoews/neotw-vue-journal/component.js
type: application/javascript
module-type: library

\*/

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const journals = $tw.wiki.filterTiddlers(
  `[tag[Journal]!sort[created]limit[99]]`
);

const app = () => {
  const component = {
    setup() {
      return {
        journals
      };
    },

    methods: {
      gotoTiddler(e) {
        const title = e.target.dataset.title;
        if (!title) return;
        new $tw.Story().navigateTiddler(title);
      },
      renderTiddler(tiddler) {
        return $tw.wiki.renderTiddler('text/html', tiddler);
      }
    },

    template: getTemplate('$:/plugins/oeyoews/neotw-vue-journal/widget.vue')
  };
  return component;
};

module.exports = app;
