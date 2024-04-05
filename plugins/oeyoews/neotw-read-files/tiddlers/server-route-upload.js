/*\
title: $:/plugins/sq/ImportToExternalFile/server-route-upload.js
type: application/javascript
module-type: route

POST /^\/api\/upload/

Upload media

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.method = 'POST';

  exports.path = new RegExp('^/api/upload');
  exports.bodyFormat = 'stream';

  const fs = require('fs');
  const path = require('path');

  exports.handler = function (request, response, state) {
    let body = '';

    request.on('data', function (chunk) {
      body += chunk;
      // We limit the size of an upload to 10mb for now.
      if (body.length > 10e6) {
        response.writeHead(413, { 'Content-Type': 'text/plain' }).end();
        request.connection.destroy();
      }
    });

    request.on('end', function () {
      try {
        let bodyData = JSON.parse(body);

        const filesPath = path.resolve($tw.boot.wikiTiddlersPath, './files');

        //config option overwrite existing?

        /*
            var xfilepath = $tw.utils.generateTiddlerFilepath(bodyData.tiddler.fields.title,{
                directory: filesPath
            });
            //var ext = path.extname(originalpath);
            //xfilepath = xfilepath.substring(0,xfilepath.length - ext.length);


            // 1) try to increment filename before extension.
            // 2) don't encode / in file path so can specify a subdir
            xfilepath = path.join(filesPath, bodyData.tiddler.fields.title); //with this tiddler titles like images/filename work but only if directory exists
            console.log(xfilepath);
			*/
        var xfilepath = generateBinaryFilePath(bodyData.tiddler.fields.title);
        $tw.utils.createDirectory(filesPath);
        const buf = Buffer.from(bodyData.tiddler.fields.text, 'base64');
        //const filename = path.join(filesPath, bodyData.tiddler.fields.title);
        const filename = xfilepath;
        fs.writeFile(path.join(xfilepath), buf, function (error) {
          if (error) {
            console.log(error);
            throw error;
          } else {
            console.log('文件已保存' + filename);
            response.setHeader('Content-Type', 'application/json');
            response.end(
              JSON.stringify({
                success: 'saved ' + bodyData.tiddler.fields.title,
                status: 200,
                //"_canonical_uri":	 "files/" + bodyData.tiddler.fields.title,
                _canonical_uri: path.relative(
                  path.resolve($tw.boot.wikiTiddlersPath, '..'),
                  xfilepath,
                ),
                tiddler: bodyData.tiddler.fields.title,
              }),
            );
            //state.wiki.addTiddler(bodyData.tiddler.fields,{_canonical_uri : bodyData.tiddler.fields.title, text:""},state.wiki.getModificationFields());
            //return true;
          }
        });
      } catch (e) {
        console.log('Error parsing or writing uploaded file', e, { level: 2 });
        response.writeHead(400);
        response.end();
      }
    });
  };

  var generateBinaryFilePath = function (title, options) {
    // 由于这是使用的是includewiki 的形式， 不支持files文件夹, 所以需要双层上级目录路径,
    const filesDirPath = path.resolve(
      $tw.boot.wikiTiddlersPath,
      '../../files/',
    );
    // console.log(filesDirPath);
    // Remove any forward or backward slashes so we don't create directories
    var filepath = title.replace(/\/|\\/g, '_');
    // Replace any Windows control codes
    filepath = filepath.replace(
      /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i,
      '_$1_',
    );
    // Replace any leading spaces with the same number of underscores
    filepath = filepath.replace(/^ +/, function (u) {
      return u.replace(/ /g, '_');
    });
    //If the path does not start with "." or ".." && a path seperator, then
    if (!/^\.{1,2}[/\\]/g.test(filepath)) {
      // Don't let the filename start with any dots because such files are invisible on *nix
      filepath = filepath.replace(/^\.+/g, function (u) {
        return u.replace(/\./g, '_');
      });
    }
    // Replace any Unicode control codes
    filepath = filepath.replace(/[\x00-\x1f\x80-\x9f]/g, '_');
    // Replace any characters that can't be used in cross-platform filenames
    filepath = $tw.utils.transliterate(
      filepath.replace(/<|>|~|\:|\"|\||\?|\*|\^/g, '_'),
    );
    var extension = path.extname(title);
    //remove extension from filepath
    filepath = filepath.substring(0, filepath.length - extension.length);
    // Replace any dots or spaces at the end of the extension with the same number of underscores
    extension = extension.replace(/[\. ]+$/, function (u) {
      return u.replace(/[\. ]/g, '_');
    });
    // Truncate the extension if it is too long
    if (extension.length > 32) {
      extension = extension.substr(0, 32);
    }
    // Truncate the filename if it is too long
    if (filepath.length > 200) {
      filepath = filepath.substr(0, 200);
    }
    // If the resulting filename is blank (eg because the title is just punctuation)
    if (!filepath || /^_+$/g.test(filepath)) {
      // ...then just use the character codes of the title
      filepath = '';
      $tw.utils.each(title.split(''), function (char) {
        if (filepath) {
          filepath += '-';
        }
        filepath += char.charCodeAt(0).toString();
      });
    }

    var overwrite =
      $tw.wiki.getTextReference(
        '!!text',
        'yes',
        '$:/config/sq/OverwriteBinaryFiles',
      ) === 'yes'
        ? true
        : false;
    if (overwrite) {
      return path.resolve(filesDirPath, filepath + extension);
    }

    var fullPath,
      count = 0;
    do {
      fullPath = path.resolve(
        filesDirPath,
        filepath + (count ? '_' + count : '') + extension,
      );
      count++;
    } while (fs.existsSync(fullPath));
    return fullPath;
  };
})();
