/*\
title: $:/core/modules/nprogress.js
type: application/javascript
module-type: global

\*/

class NprogressGlobal {
  constructor() {}

  static requireNProgress() {
    if (!NprogressGlobal.NProgress) {
      NprogressGlobal.NProgress = require('nprogress.min.js');
    }
  }

  static configure(config) {
    NprogressGlobal.requireNProgress();
    const defaultConfig = {
      showSpinner: true
    };
    NprogressGlobal.NProgress.configure(Object.assign(defaultConfig, config));
  }

  static start() {
    NprogressGlobal.requireNProgress();
    NprogressGlobal.NProgress.start();
  }

  static done() {
    NprogressGlobal.requireNProgress();
    NprogressGlobal.NProgress.done();
  }
}

exports.NProgress = NprogressGlobal;
