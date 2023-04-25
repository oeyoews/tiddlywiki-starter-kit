/*\
title: $:/plugins/oeyoews/neotw/startup/neotw.js
type: application/javascript
module-type: startup

neotw startup descption
\*/
(function () {
  exports.platforms = ['browser'];
  exports.after = ['story'];
  exports.synchronous = true;
  exports.startup = function () {
    if (!$tw.browser) return;
    // const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
    // swal('Hi');
    // need require simple-notify, but this module not support require
    // pushNotify();
    console.log(
      '%c A modern style notebook based on tiddlywiki. @oeyoews  🎉',

      'background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59); color: black;border-radius: 3px;padding: 3px;',
    );
  };
})();
