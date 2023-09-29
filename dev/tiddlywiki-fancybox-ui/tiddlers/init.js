/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox-ui/init.js
type: application/javascript
module-type: library

\*/

module.exports = function init() {
  const {
    Fancybox,
  } = require('$:/plugins/oeyoews/tiddlywiki-fancybox/library/fancybox.min.js');
  const options = require('./options');

  Fancybox.defaults = {
    ...options,
  };

  Fancybox.bind('[data-fancybox]', {
    wheel: 'close', // pan slide soom false
    startIndex: '0', // not work
    hideScrollbar: true,
  });
};
