/*\
title: $:/plugins/oeyoews/neotw-progressbar/startup.js
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

  const progressBar = document.createElement('div');
  progressBar.className =
    'fixed bottom-0.5 bg-[#eb6864] h-[4px] rounded-full inset-x-0 transition-all duration-500 opacity-0';
  progressBar.id = 'progress';

  document.body.appendChild(progressBar);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  function updateProgressBar() {
    const pageHeight = window.document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const denominator = pageHeight - windowHeight;
    const scrollProgress =
      denominator !== 0 ? (scrollTop / denominator) * 100 : 0;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = scrollProgress + '%';
  }

  const debouncedUpdateProgressBar = debounce(updateProgressBar, 200);

  function progressbarListener() {
    let hasScrolled = false;
    window.addEventListener('scroll', function () {
      if (!hasScrolled) {
        const progressBar = document.getElementById('progress');
        if (progressBar.classList.contains('opacity-0')) {
          progressBar.classList.remove('opacity-0');
          hasScrolled = true;
        }
      }
      updateProgressBar();
      debouncedUpdateProgressBar();
    });
  }

  exports.startup = progressbarListener;
})();
