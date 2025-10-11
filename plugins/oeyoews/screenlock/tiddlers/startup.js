/*\
title: $:/plugins/oeyoews/screenlock/startup.js
type: application/javascript
module-type: startup

screenlock startup

\*/

exports.name = 'screenlock-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  // your code here
  console.log('screenlock-startup-hook');
};
