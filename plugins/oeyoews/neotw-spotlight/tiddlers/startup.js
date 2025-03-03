/*\
title: $:/plugins/oeyoews/neotw-spotlight/startup.js
type: application/javascript
module-type: startup

\*/
exports.name = 'spotlight-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = async () => {
  if (!window.Spotlight) {
    require('spotlight.bundle.js');
  }
};
