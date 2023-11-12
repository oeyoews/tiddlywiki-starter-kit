/*\
type: application/javascript
title: $:/plugins/oeyoews/neotw-swal2/startup.js
module-type: startup

swal2 module
\*/

exports.name = 'swal2-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  // TODO: support promise
  window.Swal = require('$:/plugins/oeyoews/neotw-swal2/swal2.min.js');
  const defaultOptions = require('./options');
  $tw.rootWidget.addEventListener('om-swal', (event) => {
    const paramObject = event.paramObject || {};
    Swal.fire(Object.assign({}, defaultOptions, paramObject));
  });

  /* window.location.protocol === 'https:' &&
      require('$:/plugins/oeyoews/neotw-swal2/startup-message-swal.js'); */
};
