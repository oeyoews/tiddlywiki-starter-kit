/*\
title: $:/plugins/oeyoews/neotw-startup-times/startup.js
type: application/javascript
module-type: startup

neotw-startup-times startup

\*/

exports.name = 'neotw-startup-times-startup-hook';
exports.platforms = ['browser'];
exports.after = ['story'];
exports.synchronous = true;
exports.startup = () => {
  const updateTimes = require('./count-times');
  updateTimes();
};
