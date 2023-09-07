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

// 也许我们可以尝试模仿favicon.ico, 支持manifest, 构建的时候也可以自动生成在根目录下, 唯一的区别就是manifest.json只在启动的时候寻找, 之后不会自动刷新, 暂时放在file文件夹内, server和online共用一个文件(需要修改link /manifest.json -> /files/manifest.json)
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
      baseFilename = path.resolve(state.boot.wikiPath, "files"),
      filename = path.resolve(baseFilename, "manifest.json");

    fs.readFile(filename, function (err, content) {
      var status,
        type = "application/json";
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