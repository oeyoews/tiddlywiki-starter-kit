/*\
title: $:/plugins/oeyoews/tiddlywiki-cmp/snippets.js
type: application/javascript
module-type: snippets

tiddlywiki-cmp module

\*/
const emojis = require('./emojilist');

const emojisnippets = Object.entries(emojis).map((emoji) => ({
  title: emoji[0],
  text: emoji[1]
}));

module.exports = [
  {
    title: 'note',
    text: ':::note\n${2:text}\n:::'
  },
  {
    title: 'tip',
    text: ':::tip\n${2:text}\n:::'
  },
  {
    title: 'unsplash image',
    text: 'https://source.unsplash.com/random/1920x1080?fm=blurhash&${sea}'
  },
  ...emojisnippets
];
