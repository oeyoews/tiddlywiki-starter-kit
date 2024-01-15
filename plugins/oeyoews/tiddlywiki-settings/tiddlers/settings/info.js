/*\
title: $:/plugins/oeyoews/tiddlywiki-settings/settings/info.js
type: application/javascript
module-type: library

tiddlywiki-settings settings library

\*/
const info = {
  title: {
    type: 'input',
    text: '',
    caption: {
      zh: '太微标题',
      en: 'Tiddlywiki title'
    },
    description: {
      zh: '',
      en: ''
    }
  },
  subtitle: {},
  defaultTiddlers: {},
  defaultNewTiddlerTitle: {},
  defaultNewJournalTitleFormat: {},
  newTiddlerTags: {},
  defaultNewTiddlersFocus: {},
  username: {},
  description: {
    type: 'input',
    text: '',
    caption: {
      zh: '网站描述',
      en: 'Website description'
    }
  },
  animation: {
    type: 'number',
    text: '200'
  },
  storyList: {}
};

module.exports = info;
