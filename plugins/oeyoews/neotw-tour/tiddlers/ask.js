/*\
title: ask/startup.js
type: application/javascript
// module-type: startup

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = '-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    Swal.fire({
      title: '是否需要引导教程',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '需要，我是新手',
      cancelButtonText: '我是老手，不需要'
    }).then((result) => {
      if (result.value) {
        const driverObj = driver({
          showProgress: true,
          animate: true,
          showButtons: ['next', 'previous', 'close'],
          allowClose: false,
          steps: [
            {
              element: '#stx-story-top',
              popover: {
                title: '侧边工具栏',
                description: '自定义工具栏',
                position: 'left'
              }
            },
            {
              element: document.querySelector('center'),
              popover: {
                title: 'TiddlyWiki 主页展示',
                description: '自定义 TiddlyWiki 主页展示',
                position: 'left'
              }
            }
          ]
        });
        driverObj.drive();
      }
    });
  };
})();
