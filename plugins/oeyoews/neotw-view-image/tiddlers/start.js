/*\
title: view-image/startup.js
type: application/javascript
module-type: startup

view-image module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'view-image-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    require('view-image.min.js');
    ViewImage.init('.tc-tiddler-frame img');
  };
})();