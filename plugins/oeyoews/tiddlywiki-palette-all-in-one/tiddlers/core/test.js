/*\
title: $:/plugins/oeyoews/tiddlywiki-palette-all-in-one/startup.js
type: application/javascript
module-type: startup

toggleDarkMode

\*/

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

  function toggleDarkMode() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Whenever the user explicitly chooses light mode
    function setLightMode() {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }

    // Whenever the user explicitly chooses dark mode
    function setDarkMode() {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    }

    // Whenever the user explicitly chooses to respect the OS preference
    function setOSPreference() {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  exports.startup = toggleDarkMode;
})();
