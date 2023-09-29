/*\
title: $:/plugins/oeyoews/neotw-permalink/startup.js
type: application/javascript
module-type: startup

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  // Export name and synchronous status
  exports.name = 'story';
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = function (event) {
    if ($tw.browser) {
      $tw.rootWidget.addEventListener('om-permalink', function (event) {
        const title = event.paramObject?.title || event.tiddlerTitle;
        const perflink = `${window.location.href}#${title}`;
        // IOS 并不支持navigator, 目前不打断写兼容代码
        navigator?.clipboard?.writeText(perflink).then(() => {
          /* $tw.wiki.addTiddler(
            new $tw.Tiddler({
              title: "$:/temp/oeyoews/notify",
              text: `Copied to clipboard: ${perflink}`,
            })
          );
          $tw.notifier.display("$:/temp/oeyoews/notify"); */
          Swal.fire({
            title: 'Copied to clipboard',
            text: `${perflink}`,
            icon: 'success',
            toast: true,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
            position: 'bottom-end',
          });
        });
      });
    }
  };
})();
