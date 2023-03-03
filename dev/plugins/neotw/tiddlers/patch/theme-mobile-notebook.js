/*\
Closes the notebook sidebar on mobile when navigating
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const isOnMobile = () => {
    let bottombar = document.querySelector('.nc-bottombar');
    return bottombar && bottombar.getClientRects().length > 0;
  };

  const closeSidebar = () => {
    $tw.wiki.setText('$:/state/notebook-sidebar', 'text', undefined, 'no');
  };

  const closeSidebarOnMobile = () => {
    if (isOnMobile()) {
      console.log('closing sidebar');
      closeSidebar();
    }
  };

  const setup = () => {
    $tw.hooks.addHook('th-navigating', function (event) {
      closeSidebarOnMobile();
      return event;
    });
  };

  setup();

  exports.closeNotebookSidebar = closeSidebar;
})();
