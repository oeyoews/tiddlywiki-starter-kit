/*\
title: $:/plugins/oeyoews/notify/global.js
type: application/javascript
module-type: global

\*/
const Notify = require('simple-notify.min.js');
const defaultOptions = require('./options');

class NotifyWidget {
  constructor() {
    this.notifyInstance = null;
  }

  display(options) {
    if (!options) {
      console.warn('参数不允许为空');
      return;
    }
    const convertBooleanStringsToBoolean = (options) => {
      return Object.entries(options).reduce((acc, [key, val]) => {
        acc[key] = val === 'true' ? true : val === 'false' ? false : val;
        return acc;
      }, {});
    };

    this.notifyInstance = new Notify(
      Object.assign({}, defaultOptions, convertBooleanStringsToBoolean(options))
    );
  }

  close() {
    this.notifyInstance?.close();
  }
}

exports.Notify = NotifyWidget;
