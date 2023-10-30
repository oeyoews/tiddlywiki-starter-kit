/*\
title: $:/plugins/oeyoews/notify/global.js
type: application/javascript
module-type: global

\*/
const { Notify: TWNotify } = require('simple-notify.min.js');

class NotifyWidget {
  display(options) {
    const defaultOptions = require('./options');
    new TWNotify(Object.assign({}, defaultOptions, options));
  }
}

exports.Notify = NotifyWidget;
