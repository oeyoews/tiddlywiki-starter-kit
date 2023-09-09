/*\
title: $:/plugins/oeyoews/cmp/lib/getCurrentSelection.js
type: application/javascript
module-type: library

\*/
module.exports = function getCurrentSelection() {
  const getActiveElement = require('./getActiveElement');
  let selection = window.getSelection().toString();
  if (selection !== '') return selection;
  let activeElement = getActiveElement();
  if (activeElement === undefined || activeElement.selectionStart === undefined)
    return '';
  if (activeElement.selectionStart > activeElement.selectionEnd) {
    return activeElement.value.substring(
      activeElement.selectionStart,
      activeElement.selectionEnd,
    );
  } else {
    return activeElement.value.substring(
      activeElement.selectionEnd,
      activeElement.selectionStart,
    );
  }
};
