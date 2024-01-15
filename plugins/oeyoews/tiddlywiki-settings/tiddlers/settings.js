/*\
title: $:/plugins/oeyoews/tiddlywiki-settings/settings.js
type: application/javascript
module-type: library

tiddlywiki-settings settings library

\*/
const info = require('./settings/info');
const appearance = require('./settings/appearance');

const settings = {
  camelcase: {
    type: 'boolean',
    text: 'no'
  },
  defaultSidebarTab: {
    type: 'select',
    text: 'open'
  },
  permalink: {},
  navigation: {}
};

const hiddenSettings = {
  minSearchLength: {},
  editorRefreshTime: {
    type: 'number',
    text: 1000
  },
  syncLog: {
    type: 'boolean',
    text: 'no'
  }
};

module.exports = {
  ...info,
  ...appearance,
  ...settings,
  ...hiddenSettings
};
