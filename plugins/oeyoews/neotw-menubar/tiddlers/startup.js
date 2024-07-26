/*\
title: $:/plugins/oeyoews/neotw-menubar/startup.js
type: application/javascript
module-type: startup

\*/
exports.platforms = ['browser'];
exports.after = ['render'];
exports.synchronous = true;
exports.startup = () => {
  function getNavigatorWidget(widget) {
    const child = widget.children?.[0];
    if (child?.parseTreeNode.type == 'navigator') {
      return child;
    }
    return getNavigatorWidget(child);
  }
  const menubarNav = getNavigatorWidget($tw.rootWidget);
  if (menubarNav) {
    const event = new Event('menubarNavChange', { detail: menubarNav });
    window.menubarNav = menubarNav;
    $tw.rootWidget.dispatchEvent(event);
    // console.log(event);
  }
};
