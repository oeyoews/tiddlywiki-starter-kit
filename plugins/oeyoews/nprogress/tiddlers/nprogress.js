/*\
title: $:/core/modules/nprogress.js
type: application/javascript
module-type: global

\*/

const NProgress = require('nprogress.min.js');

class NprogressGlobal {
  constructor() {}

  static configure(config) {
    const defaultConfig = {
      showSpinner: true
    };
    NProgress.configure(Object.assign(defaultConfig, config));
  }

  static start() {
    NProgress.start();
  }

  static done() {
    NProgress.done();
  }
}

exports.NProgress = NprogressGlobal;
