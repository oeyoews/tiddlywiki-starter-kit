/*\
title: tiddlywiki-update.js
type: application/javascript
module-type: startup

tiddlywiki-update
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'check-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    const getVersion = () => {
      return fetch(
        'https://raw.githubusercontent.com/Jermolene/TiddlyWiki5/master/package.json',
      )
        .then(response => response.json())
        .then(data => {
          return data.version;
        });
    };

    const checkUpdate = async () => {
      const latestVersion = await getVersion();
      const localVersion = $tw.version;

      let log = console.log;
      if (window.swal) log = swal;
      // log('⭕ Checking for updates...');
      if (latestVersion !== localVersion)
        log(`A new version of TiddlyWiki is available: ${latestVersion}`);
    };

    checkUpdate();
  };
})();
