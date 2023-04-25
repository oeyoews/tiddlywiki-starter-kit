/*\
title: $:/plugins/oeyoews/tiddlywiki-keyboard-hint/startup.js
type: application/javascript
module-type: startup

show pressed key
\*/

(function() {
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

  let keyContainer;
  let keysEl;

  function createKeyContainer() {
    keyContainer = document.createElement('div');
    keyContainer.className = KEY_CONTAINER_CLASS;
    keysEl = document.createElement('div');
    keysEl.className = 'keys';
    keyContainer.appendChild(keysEl);
    document.body.appendChild(keyContainer);
  }

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
        if (!keyContainer) {
          createKeyContainer();
        }
        updateKeys();
        // console.log('Mousetrap key pressed!');
      }
    }

    /* 在更新按键时，先使用 while 循环将 keysEl 的所有子元素都移除，然后使用 createElement() 方法创建按键元素，并使用 appendChild() 方法将其添加到 keysEl 中。这样就可以避免使用 innerHTML 属性而带来的安全问题。
需要注意的是，innerHTML 属性具有更高的性能，因为它可以一次性将多个 DOM 元素添加到页面中。因此，在元素数量较多的情况下，使用 innerHTML 属性可能会更快。但是，在元素数量较少的情况下，使用 createElement() 和 appendChild() 方法的性能差异可以忽略不计。另外，使用 createElement() 和 appendChild() 方法可以更好地控制页面中的 DOM 结构，从而避免潜在的安全问题。 */
    function updateKeys() {
      while (keysEl.firstChild) {
        keysEl.removeChild(keysEl.firstChild);
      }
      pressedKeys.forEach(key => {
        const keyEl = document.createElement('span');
        keyEl.classList.add('key');
        const keyName = key === ' ' ? 'Space' : key;
        keyEl.textContent = keyName;
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
