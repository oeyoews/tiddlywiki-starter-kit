/*\
title: $:/plugins/oeyoews/neotw-read-files/routes/get-file.js
type: application/javascript
module-type: route

neotw-read-files GET /images/:filepath
由 https://github.com/Jermolene/TiddlyWiki5/blob/ceee20fd5970e1b75c2117d2522c998a6c5054f3/core/modules/server/routes/get-file.js 改写

https://github.com/Jermolene/TiddlyWiki5/discussions/7964

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.method = 'GET';

  // exports.path = /^\/static\/(.+)$/;
  const customPath =
    $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-read-files/custom-path',
    ) || 'static';
  exports.path = new RegExp(`^/${customPath}/(.+)`);

  exports.handler = function (request, response, state) {
    var path = require('path'),
      fs = require('fs'),
      suppliedFilename = $tw.utils.decodeURIComponentSafe(state.params[0]),
      baseFilename = path.resolve(state.boot.wikiPath, customPath),
      filename = path.resolve(baseFilename, suppliedFilename),
      extension = path.extname(filename);

    // Check that the filename is inside the wiki files folder
    if (path.relative(baseFilename, filename).indexOf('..') !== 0) {
      // Send the file
      fs.readFile(filename, function (err, content) {
        var status,
          content,
          type = 'text/plain';
        if (err) {
          console.log(
            'Error accessing file ' + filename + ': ' + err.toString(),
          );
          status = 404;
          content = "File '" + suppliedFilename + "' not found";
        } else {
          status = 200;
          content = content;
          type = $tw.config.fileExtensionInfo[extension]
            ? $tw.config.fileExtensionInfo[extension].type
            : 'application/octet-stream';
        }
        state.sendResponse(status, { 'Content-Type': type }, content);
      });
    } else {
      state.sendResponse(
        404,
        { 'Content-Type': 'text/plain' },
        "File '" + suppliedFilename + "' not found",
      );
    }
  };
})();
