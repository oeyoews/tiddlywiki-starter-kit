/*\
title: $:/plugins/oeyoews/neotw-pwa/routes/get-tiddlywiki-image.js
type: application/javascript
module-type: route

GET /tiddlywiki.png

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.method = 'GET';

  exports.path = /^\/tiddlywiki.png$/;

  exports.handler = function (request, response, state) {
    const data = state.wiki.getTiddlerText('$:/tiddlywiki.png');
    state.sendResponse(200, { 'Content-Type': 'image/png' }, data, 'base64');
  };
})();
