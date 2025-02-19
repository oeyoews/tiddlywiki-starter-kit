/*\
title: $:/core/modules/server/routes/get-tags-json.js
type: application/javascript
module-type: route

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  var DEFAULT_FILTER = '[tags[]]';

  exports.method = 'GET';

  exports.path = /^\/recipes\/default\/tags.json$/;

  exports.handler = function (request, response, state) {
    var filter = state.queryParameters.filter || DEFAULT_FILTER;
    const tags = state.wiki.filterTiddlers(filter);
    var text = JSON.stringify(tags);
    state.sendResponse(
      200,
      { 'Content-Type': 'application/json' },
      text,
      'utf8',
    );
  };
})();
