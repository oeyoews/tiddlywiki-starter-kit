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

    const convertBooleanStringsToBoolean = (options) => {
      return Object.entries(options).reduce((acc, [key, val]) => {
        acc[key] = val === 'true' ? true : val === 'false' ? false : val;
        return acc;
      }, {});
    };


    this.notifyInstance = new TWNotify(
      Object.assign(
        {},
        defaultOptions,
        convertBooleanStringsToBoolean(options),
      ),
    );
  }

  close() {
    this.notifyInstance?.close();
  }
}

exports.Notify = NotifyWidget;
