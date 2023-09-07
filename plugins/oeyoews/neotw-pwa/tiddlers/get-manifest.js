/*\
title: $:/plugins/oeyoews/neotw-pwa/routes/get-manifest.js
type: application/javascript
// module-type: route

GET /manifest.json

// 也许我们可以尝试模仿favicon.ico, 支持manifest, 构建的时候也可以自动生成在根目录下, 唯一的区别就是manifest.json只在启动的时候寻找, 之后不会自动刷新, 暂时放在file文件夹内, server和online共用一个文件(需要修改link /manifest.json -> /files/manifest.json)

method 01: 直接链接 files/manifest.json, 不需要写任何代码; manifest.json 没有放在根目录不太规范

method 02: route 代码 让/manifest.json, 可访问, 从而link /manifest.json, 构建可以共享$:/manifest.json, 模仿favicon.ico
          但是, 只能是成为shadow才能起作用, 只在启动的时候寻找

NOTE: 不能提前访问xxx.js文件从buffer
NOTE: 无论是从files 文件夹, 还是tw里面读取文件, js文件都必须是shadow(favicon.ico为什么可以)

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  exports.method = "GET";

  exports.path = /^\/manifest.json$/;

  exports.handler = function (request, response, state) {
    const data = state.wiki.getTiddlerText("$:/manifest.json");
    state.sendResponse(
      200,
      { "Content-Type": "application/json" },
      data,
      "utf8"
    );
  };
})();

// (function () {
//   /*jslint node: true, browser: true */
//   /*global $tw: false */
//   "use strict";
//
//   exports.method = "GET";
//
//   // 设置路径以匹配 manifest.json 文件
//   exports.path = /^\/manifest\.json$/;
//
//   exports.handler = function (request, response, state) {
//     var path = require("path"),
//       fs = require("fs"),
//       baseFilename = path.resolve(state.boot.wikiPath, "files"),
//       filename = path.resolve(baseFilename, "manifest.json");
//
//     fs.readFile(filename, function (err, content) {
//       var status,
//         type = "application/json";
//       if (err) {
//         console.log("Error accessing file " + filename + ": " + err.toString());
//         status = 404;
//         content = JSON.stringify({ error: "File 'manifest.json' not found" });
//       } else {
//         status = 200;
//       }
//       state.sendResponse(status, { "Content-Type": type }, content);
//     });
//   };
// })();