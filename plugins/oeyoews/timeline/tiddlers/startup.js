/*\
title: $:/plugins/oeyoews/timeline/startup.js
type: application/javascript
module-type: startup

timeline startup

\*/

exports.name = 'timeline-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  // your code here
  console.log('timeline-startup-hook');
};
