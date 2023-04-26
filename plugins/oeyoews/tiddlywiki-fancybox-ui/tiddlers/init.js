/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox-ui/init.js
type: application/javascript
module-type: library

\*/

const Fancybox =
  require('$:/plugins/oeyoews/tiddlywiki-fancybox/library/fancybox.min.js').Fancybox;
const options = require('$:/plugins/oeyoews/tiddlywiki-fancybox/fancybox.options.js');
Fancybox.defaults = {
  ...options,
};
Fancybox.bind('[data-fancybox]', {
  wheel: 'close', // pan slide soom false
  startIndex: '0', // not work
  hideScrollbar: true,
});
