/*\
title: $:/core/modules/nprogress.js
type: application/javascript
module-type: global

\*/

const NProgress = require('nprogress.min.js');

class NprogressGlobal {
  constructor(config) {
    this.configure(config);
  }

  configure(config) {
    const defaultConfig = {
      showSpinner: true,
    };
    NProgress.configure(config || defaultConfig);
  }

  start() {
    NProgress.start();
  }

  done() {
    NProgress.done();
  }
}

exports.NProgress = NprogressGlobal;
