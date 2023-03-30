/*\
title: $:/plugins/oeyoews/tiddlywiki-back-top-top/progress.js
type: application/javascript
module-type: startup

progress

\*/
// CSS-based progress bar that works on iOS devices

// The reason why the HTML5 progress element doesn't work on iOS devices is because Safari on iOS doesn't support the progress element's JavaScript API. This means that you can't update the value of the progress bar using JavaScript, which is necessary for the progress bar to work as intended.
// Using a CSS - based progress bar is a workaround for this issue, because you can update the width of the progress bar using CSS instead of JavaScript.This allows the progress bar to work on iOS devices as well as other browsers.
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
