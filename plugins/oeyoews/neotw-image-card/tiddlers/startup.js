/*\
title: $:/plugins/oeyoews/neotw-image-card/startup.js
type: application/javascript
module-type: startup

neotw-image-card startup

\*/

exports.name = 'neotw-image-card-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  // your code here
  console.log('neotw-image-card-startup-hook');
};
