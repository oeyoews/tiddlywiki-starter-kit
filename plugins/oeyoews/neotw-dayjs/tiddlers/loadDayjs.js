/*\
title: $:/plugins/oeyoews/neotw-dayjs/loadDayjs.js
type: application/javascript
module-type: library

\*/

module.exports = function (e) {
  if (window.dayjs != undefined) {
    return;
  }
  const dayjs = require('./dayjs.min.js');

  const dayjs_plugin_relativeTime = require('./relativeTime.min.js');
  const dayjs_plugin_utc = require('./utc.min.js');
  const dayjs_plugin_timezone = require('./timezone.min.js');

  dayjs.extend(dayjs_plugin_relativeTime);
  dayjs.extend(dayjs_plugin_utc);
  dayjs.extend(dayjs_plugin_timezone);

  window.dayjs = dayjs;
};
