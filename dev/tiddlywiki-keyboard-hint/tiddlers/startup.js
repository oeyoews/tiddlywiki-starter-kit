/*\
title: $:/plugins/oeyoews/tiddlywiki-keyboard-hint/startup.js
type: application/javascript
module-type: startup

show pressed key
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'keyContainer';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  const { updateKey } = require('./keyboard.js');

  exports.startup = updateKey;
})();
