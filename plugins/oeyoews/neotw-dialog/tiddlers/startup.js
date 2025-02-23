/*\
title: $:/plugins/oeyoews/neotw-dialog/startup.js
type: application/javascript
module-type: startup

neotw-dialog startup

\*/

exports.name = 'neotw-dialog-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  // your code here
  console.log('neotw-dialog-startup-hook');
};
