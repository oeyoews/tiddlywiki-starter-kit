/*\
title: $:/plugins/my-plugin/progress.js
type: application/javascript
module-type: startup

progress

\*/
// CSS-based progress bar that works on iOS devices
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  // Export name and synchronous status
  exports.name = 'progressbar';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  var progressBar = document.createElement('div');
  progressBar.id = 'page-progress';
  progressBar.innerHTML = '<div id="page-progress-bar"></div>';
  document.body.appendChild(progressBar);

  function progressbarListener() {
    window.addEventListener('scroll', function () {
      const pageHeight = window.document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const denominator = pageHeight - windowHeight;
      const scrollProgress =
        denominator !== 0 ? (scrollTop / denominator) * 100 : 0;
      const progressBar = document.getElementById('page-progress-bar');
      progressBar.style.width = scrollProgress + '%';
    });
  }

  exports.startup = progressbarListener;
})();
