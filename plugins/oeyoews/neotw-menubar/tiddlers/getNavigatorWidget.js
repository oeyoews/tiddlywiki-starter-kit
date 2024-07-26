/*\
title: $:/plugins/oeyoews/neotw-menubar/getNavigatorWidget.js
type: application/javascript
module-type: library

\*/
module.exports = () => {
  function getNavigatorWidget(widget) {
    const child = widget.children?.[0];
    if (child?.parseTreeNode.type == 'navigator') {
      return child;
    }
    return getNavigatorWidget(child);
  }
  const menubarNav = getNavigatorWidget($tw.rootWidget);
  if (menubarNav) {
    const event = new CustomEvent('menubarNavChange', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: menubarNav,
    });
    document.dispatchEvent(event);
  }
  return menubarNav;
};
