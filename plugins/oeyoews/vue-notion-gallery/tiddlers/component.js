/*\
title: $:/plugins/oeyoews/vue-notion-gallery/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const prepareCardData = (tiddlers) => {
  return tiddlers.slice(0, this.count).map((tiddler) => {
    const { fields } = wiki.getTiddler(tiddler) || { fields: {} };
    if (!fields) return;
    let cover = fields[imageField];
    let icon = fields['page-icon'];
    if (!cover || (!cover.startsWith('//') && !cover.startsWith('http'))) {
      cover = `${imageSource}/${resoultion}?fm=blurhash&${fields.title}`;
    }
    return {
      title: fields?.title,
      caption: fields?.caption,
      cover,
      icon
    };
  });
};

const app = () => {
  const component = {
    setup() {
      return {};
    },

    methods: {
      gotoTiddler() {}
    },

    template: getTemplate(
      '$:/plugins/oeyoews/vue-notion-gallery/templates/widget.vue'
    )
  };
  return component;
};

module.exports = app;
