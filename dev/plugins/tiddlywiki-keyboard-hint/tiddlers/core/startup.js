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

  const KEY_CONTAINER_CLASS = 'key-container';
  const MAX_KEYS_DEFAULT = 4; // 最大键位数
  const DISAPPEAR_DELAY_DEFAULT = 500; // 消失延迟时间（以毫秒为单位）

  var keyContainer = document.createElement('div');
  keyContainer.className = KEY_CONTAINER_CLASS;
  keyContainer.innerHTML = '<div class="keys"></div>';
  document.body.appendChild(keyContainer);

  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      );
    }
  }

  function updateKey(
    maxKeys = MAX_KEYS_DEFAULT,
    disappearDelay = DISAPPEAR_DELAY_DEFAULT,
  ) {
    const keysEl = document.querySelector(`.${KEY_CONTAINER_CLASS} .keys`);
    let pressedKeys = [];
    let timer;
    let inInput = false;

    document.addEventListener('input', () => {
      inInput = true;
    });
    document.addEventListener('focusout', () => {
      inInput = false;
    });
    function keyupHandler(event) {
      const key = event.key;
      if (!inInput && pressedKeys.length < maxKeys) {
        pressedKeys.push(key);
        // pressedKeys.unshift(key);
        updateKeys();
        // console.log('Mousetrap key pressed!');
      }
    }

    function updateKeys() {
      keysEl.innerHTML = '';
      pressedKeys.forEach(key => {
        const keyEl = document.createElement('span');
        keyEl.classList.add('key');
        keyEl.textContent = key;
        keysEl.appendChild(keyEl);
      });
      if (pressedKeys.length > 0) {
        addClass(keyContainer, 'visible');
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        removeClass(keyContainer, 'visible');
        pressedKeys = [];
      }, disappearDelay);
    }

    document.addEventListener('keydown', keyupHandler);

    return {
      stop: () => document.removeEventListener('keyup', keyupHandler),
    };
  }

  function keyContainerListener() {
    return updateKey();
  }

  exports.startup = keyContainerListener;
})();
