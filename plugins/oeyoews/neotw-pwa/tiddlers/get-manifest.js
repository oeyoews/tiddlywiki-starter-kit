/*\
title: $:/plugins/oeyoews/neotw-pwa/routes/get-manifest.js
type: application/javascript
module-type: route

GET /manifest.json

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.method = 'GET';

  exports.path = /^\/manifest.json$/;

  exports.handler = function (request, response, state) {
    const data = state.wiki.getTiddlerText('$:/manifest.json');
    state.sendResponse(
      200,
      { 'Content-Type': 'application/json' },
      data,
      'utf8'
    );
  };
})();
