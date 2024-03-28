/*\
title: $:/plugins/oeyoews/markdown-it-twemoji/markdown-it-twemoji.js
type: application/javascript
module-type: markdownit

\*/

const twemoji = require('./twemoji.min.js');

const TwemojiPlugin = (md) => {
  // @see-also: https://github.com/twitter/twemoji/issues/580
  // https://github.com/jdecked/twemoji
  // https://github.com/AdvenaHQ/fluent-emoji
  twemoji.parse(document.body, {
    base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
  });
  md.renderer.rules.emoji = function (token, idx) {
    return twemoji.parse(token[idx].content);
  };
};

module.exports = TwemojiPlugin;
