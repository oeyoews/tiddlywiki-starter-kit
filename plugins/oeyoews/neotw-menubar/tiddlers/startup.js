/*\
title: $:/plugins/oeyoews/neotw-menubar/startup.js
type: application/javascript
module-type: startup

\*/
exports.platforms = ['browser'];
exports.after = ['render'];
exports.synchronous = true;
exports.startup = () => {
  const getNavigatorWidget = () => {
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

  window.getNavigatorWidget = getNavigatorWidget;
  getNavigatorWidget();
};
