/*\
title: $:/plugins/oeyoews/tiddlywiki-motion/startup.js
type: application/javascript
module-type: startup

\*/
exports.platforms = ['browser'];
exports.after = ['render'];
exports.synchronous = true;
exports.startup = () => {
  const Motion = require('./Motion.js');
  new Motion().init();
};
