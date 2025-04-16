/*\
title: $:/plugins/sq/ImportToExternalFile/startup.js
type: application/javascript
module-type: startup

This adds a hook for the "th-importing-tiddler"

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  // Export name and synchronous status
  exports.name = 'sq-server-images';
  exports.platforms = ['browser'];
  exports.after = ['render'];
  exports.synchronous = true;

  exports.startup = function () {
    function updateProgress(e) {
      // TODO make this work in different browsers
      /*
		if (e.lengthComputable) {
		var percentComplete = e.loaded/e.total*100;
		} else {
		var percentComplete = -1;
		}
		console.log(percentComplete);
		*/
    }
    function transferComplete(e) {
      // console.log('Complete!!', e);
    }
    function transferFailed(e) {
      console.log('Failed!');
    }
    function transferCanceled(e) {
      console.log('Cancelled!');
    }
    // Add the hook to the wiki in the browser
    $tw.hooks.addHook('th-importing-tiddler', function (tiddler) {
      var saveAsExternal =
        $tw.wiki.getTextReference(
          '!!text',
          'yes',
          '$:/config/sq/SaveAsExternalFile',
        ) === 'yes'
          ? true
          : false;
      if (!saveAsExternal) {
        return tiddler;
      }

      // Figure out if the thing being imported is something that should be
      // saved on the server.
      var mediaTypes = [
        'image/gif',
        'image/x-icon',
        'image/jpeg',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'application/pdf',
        'application/zip',
        'application/font-woff',
        'application/x-font-ttf',
        'audio/ogg',
        'video/mp4',
        'audio/mp3',
        'audio/mp4',
      ];
      if (
        mediaTypes.indexOf(tiddler.fields.type) > -1 &&
        !tiddler.fields._canonical_uri
      ) {
        // Check if this is set up to use HTTP post or websockets to save the
        // image on the server.
        let request = new XMLHttpRequest();
        request.upload.addEventListener('progress', updateProgress);
        request.upload.addEventListener('load', transferComplete);
        request.upload.addEventListener('error', transferFailed);
        request.upload.addEventListener('abort', transferCanceled);

        request.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.info(this.response);
            var json = null;
            try {
              json = JSON.parse(this.response);
            } catch (e) {}
            if (json) {
              let tiddler = $tw.wiki.getTiddler(json.tiddler);

              // HACK: remove extra dot path
              let _canonical_uri = json._canonical_uri;
              if (json._canonical_uri.startsWith('..')) {
                _canonical_uri = _canonical_uri.replace('..', '.');
              }
              $tw.wiki.addTiddler(
                new $tw.Tiddler(tiddler, {
                  _canonical_uri,
                  text: '',
                }),
              );
            }
          }
        };

        let uploadURL = '/api/upload';
        request.open('POST', uploadURL, true);

        var thing = {
          tiddler: tiddler,
        };
        //	request.upload.addEventListener('load', transferComplete);
        request.setRequestHeader('X-Requested-With', 'TiddlyWiki');
        request.send(JSON.stringify(thing));

        // Change the tiddler fields and stuff
        var fields = {};
        var uri = '/files/' + tiddler.fields.title;
        //Use tw.utils.generateTiddlerFilePath //remove / etc from title
        //https://github.com/Jermolene/TiddlyWiki5/blob/master/core/modules/utils/filesystem.js#L321
        fields.title = tiddler.fields.title;
        fields.type = tiddler.fields.type;
        fields._canonical_uri = uri;
        //return new $tw.Tiddler(fields);
        return tiddler;
      } else {
        return tiddler;
      }
    });
  };
})();
