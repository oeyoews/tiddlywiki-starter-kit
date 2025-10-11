/*\
title: $:/plugins/oeyoews/neotw-dayjs/startup.js
type: application/javascript
module-type: startup

neotw-dayjs startup

\*/

exports.name = 'neotw-dayjs-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const loadDayjs = require('./loadDayjs.js');
  loadDayjs();
};
