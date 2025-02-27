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
  const dayjs = require('./dayjs.min.js');

  const dayjs_plugin_relativeTime = require('./relativeTime.min.js');
  const dayjs_plugin_utc = require('./utc.min.js');
  const dayjs_plugin_timezone = require('./timezone.min.js');

  dayjs.extend(dayjs_plugin_relativeTime);
  dayjs.extend(dayjs_plugin_utc);
  dayjs.extend(dayjs_plugin_timezone);

  window.dayjs = dayjs;
};
