/*\
title: $:/plugins/oeyoews/json-viewer/startup.js
type: application/javascript
module-type: startup

json-viewer startup

\*/

exports.name = 'json-viewer-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  console.log('json-viewer-startup-hook');
  require('./json-viewer');
};
