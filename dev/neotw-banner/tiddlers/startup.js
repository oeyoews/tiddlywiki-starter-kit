/*\
title: test/startup.js
type: application/javascript
module-type: startup

test module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'test-startup';
  exports.platforms = ['browser'];
  exports.after = ['story'];
  exports.synchronous = true;
  exports.startup = () => {
    const Node = document.createElement('div');
    Node.className =
      'h-screen bg-white flex justify-center items-center text-[22px] font-bld';
    Node.textContent = '待完工...';
    document.body.insertBefore(Node, document.body.firstChild);
  };
})();