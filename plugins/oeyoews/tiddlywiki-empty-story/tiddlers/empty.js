/*\
title: $:/plugins/oeyoews/tiddlywiki-empty-story/empty.js
type: application/javascript
// module-type: startup

 module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = '-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    // mobile alert
    if (window.matchMedia('(max-width: 767px)').matches) {
      Swal.fire({
        title: 'Empty Story',
        text: 'This is an empty story',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Empty Story',
      });
    }
  };
})();