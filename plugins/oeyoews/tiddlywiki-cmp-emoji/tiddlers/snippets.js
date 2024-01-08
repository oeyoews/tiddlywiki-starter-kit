/*\
title: $:/plugins/oeyoews/tiddlywiki-cmp-emoji/snippets.js
type: application/javascript
module-type: emoji-snippets

tiddlywiki-cmp module

\*/
const emojis = require('./emojilist');

module.exports = Object.entries(emojis).map(([title, text]) => ({
  title,
  text
}));
