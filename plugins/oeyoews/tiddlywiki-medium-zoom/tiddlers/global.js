/*\
title: $:/plugins/oeyoews/tiddlywiki-medium-zoom/global.js
type: application/javascript
module-type: global

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const mediumZoom = require('medium-zoom.min.js');

  const setup = () => {
    // th-closing-tiddler
    $tw.hooks.addHook('th-navigating', function (event) {
      mediumZoom('img');
      console.log('🎉 closing tiddler');
      return event;
    });
  };

  setup();
})();
