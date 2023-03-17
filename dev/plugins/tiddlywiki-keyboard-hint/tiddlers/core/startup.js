/*\
title: key.js
type: application/javascript
module-type: startup

key
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  // Export name and synchronous status
  exports.name = 'keyContainer';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  var progressBar = document.createElement('div');
  progressBar.className = 'key-container';
  progressBar.innerHTML = '<div class="keys"></div>';
  document.body.appendChild(progressBar);

  const MAX_KEYS = 4; // 最大键位数
  const DISAPPEAR_DELAY = 500; // 消失延迟时间（以毫秒为单位）

  function updateKey() {
    const keyContainer = document.querySelector('.key-container');
    const keys = document.querySelector('.keys');

    let pressedKeys = [];
    let timer;

    document.addEventListener('keyup', event => {
      const key = event.key;
      if (pressedKeys.length < MAX_KEYS) {
        pressedKeys.push(key);
        updateKeys();
        console.log('Mousetrap key pressed!');
      }
    });

    function updateKeys() {
      keys.innerHTML = '';
      pressedKeys.forEach(key => {
        const keyEl = document.createElement('span');
        keyEl.classList.add('key');
        keyEl.textContent = key;
        keys.appendChild(keyEl);
      });
      if (
        pressedKeys.length > 0 &&
        !keyContainer.classList.contains('visible')
      ) {
        keyContainer.classList.add('visible');
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        keyContainer.classList.remove('visible');
        pressedKeys = [];
      }, DISAPPEAR_DELAY);
    }
  }

  function keyContainerListener() {
    window.addEventListener('keyup', updateKey);
  }

  exports.startup = keyContainerListener;
})();
