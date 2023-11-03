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

    function convertBooleanStringsToBoolean(options) {
      const convertedOptions = {};
      for (const key in options) {
        if (typeof options[key] === 'string') {
          if (options[key] === 'true') {
            convertedOptions[key] = true;
          } else if (options[key] === 'false') {
            convertedOptions[key] = false;
          } else {
            convertedOptions[key] = options[key];
          }
        } else {
          convertedOptions[key] = options[key];
        }
      }
      return convertedOptions;
    }

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
