/*\
title: axios/startup.js
type: application/javascript
module-type: startup

axios module

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'axios-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.axios = require('axios.min.js');
    $tw.rootWidget.addEventListener('om-axios-test', () => {
      axios
        .get('https://htk.vercel.app/api')
        .then((response) => {
          Swal.fire({
            title: 'Axios Test',
            icon: 'success',
            text: `${response.data.text} @${response.data.author}`,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
})();
