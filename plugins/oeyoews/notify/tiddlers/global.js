/*\
title: $:/plugins/oeyoews/notify/global.js
type: application/javascript
module-type: global

\*/
const { Notify: TWNotify } = require('simple-notify.min.js');
const defaultOptions = require('./options');

class NotifyWidget {
  constructor() {
    this.notifyInstance = null;
  }
  display(options) {
    this.notifyInstance = new TWNotify(
      Object.assign({}, defaultOptions, options),
    );
  }

  close() {
    this.notifyInstance?.close();
  }
}

exports.Notify = NotifyWidget;
