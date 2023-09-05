/*\
title: $:/plugins/oeyoews/neotw-pwa/routes/get-manifest.js
type: application/javascript
module-type: route

GET /manifest.json

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  exports.method = "GET";

  exports.path = /^\/manifest.json$/; // 修改路径匹配

  exports.handler = function (request, response, state) {
    var buffer = state.wiki.getTiddlerText("$:/manifest.json", ""); // 修改文件名
    state.sendResponse(200, { "Content-Type": "application/json" }, buffer);
  };
})();