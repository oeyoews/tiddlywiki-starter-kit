/*\
title: $:/plugins/oeyoews/tiddlywiki-settings/settings.js
type: application/javascript
module-type: library

tiddlywiki-settings settings library

\*/
module.exports = {
  /** info */
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
  storyList: {},
  /** appearance */
  palette: {},
  theme: {},
  storyview: {},
  layout: {},
  stickyTitles: {
    type: 'boolean',
    text: 'no'
  },
  storyWidth: {},
  sidebarWidth: {},
  fontSize: {},
  fontFamily: {},
  /** settings */
  camelcase: {},
  defaultSidebarTab: {},
  permalink: {},
  navigation: {},
  /** hidden setting */
  minSearchLength: {},
  editorRefreshTime: {
    type: 'number',
    text: 1000
  }
};
