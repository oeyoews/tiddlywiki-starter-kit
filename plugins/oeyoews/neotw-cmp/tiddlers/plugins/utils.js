/*\
title: $:/plugins/oeyoews/neotw-cmp/plugins/utils.js
type: application/javascript
module-type: library

\*/

const openCmp = (domNode) => {
  domNode.style.display = '';
  const input = window.document.querySelector('#autocomplete-0-input');
  if (input) {
    input.focus();
  }
  this.document.body.style.overflow = 'hidden';
};

const closeCmp = (domNode) => {
  this.document.body.style.overflow = '';
  domNode.style.display = 'none';
};

function debouncePromise(fn, time = 300) {
  let timerId = undefined;

  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}

const debounced = debouncePromise((items) => Promise.resolve(items), 270);

module.exports = {
  debounced,
  openCmp,
  closeCmp,
};
