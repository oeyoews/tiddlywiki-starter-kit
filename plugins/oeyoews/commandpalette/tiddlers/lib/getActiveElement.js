/*\
title: $:/plugins/oeyoews/cmp/lib/getActiveElement.js
type: application/javascript
module-type: library

\*/
module.exports = function getActiveElement(element = document.activeElement) {
  const shadowRoot = element.shadowRoot;
  const contentDocument = element.contentDocument;

  if (shadowRoot && shadowRoot.activeElement) {
    return this.getActiveElement(shadowRoot.activeElement);
  }

  if (contentDocument && contentDocument.activeElement) {
    return this.getActiveElement(contentDocument.activeElement);
  }

  return element;
};
