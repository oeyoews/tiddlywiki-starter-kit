/*\
title: $:/plugins/oeyoews/neotw-pwa/routes/get-manifest.js
type: application/javascript
module-type: route

GET /manifest.json

\*/

// (function () {
//   /*jslint node: true, browser: true */
//   /*global $tw: false */
//   "use strict";
//
//   exports.method = "GET";
//
//   exports.path = /^\/manifest.json$/;
//
//   exports.handler = function (request, response, state) {
//     var buffer = state.wiki.getTiddlerText("$:/manifest.json", ""); // 修改文件名
//     state.sendResponse(200, { "Content-Type": "application/json" }, buffer);
//   };
// })();

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  exports.method = "GET";

  // 设置路径以匹配 manifest.json 文件
  exports.path = /^\/files\/manifest\.json$/;

  exports.handler = function (request, response, state) {
    var path = require("path"),
      fs = require("fs"),
      baseFilename = path.resolve(state.boot.wikiPath, "files"), // 设置基础路径为 "static"
      filename = path.resolve(baseFilename, "manifest.json"); // 设置文件名为 "manifest.json"

    // 读取 manifest.json 文件
    fs.readFile(filename, function (err, content) {
      var status,
        type = "application/json"; // 设置响应的内容类型为 JSON
      if (err) {
        console.log("Error accessing file " + filename + ": " + err.toString());
        status = 404;
        content = JSON.stringify({ error: "File 'manifest.json' not found" });
      } else {
        status = 200;
      }
      state.sendResponse(status, { "Content-Type": type }, content);
    });
  };
})();