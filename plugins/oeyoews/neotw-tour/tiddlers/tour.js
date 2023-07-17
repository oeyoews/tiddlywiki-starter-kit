/*\
title: $:/plugins/oeyoews/neotw-tour/tour.js
type: application/javascript
module-type: library

tour 🪧
\*/

function tour() {
  const steps = [
    {
      element: '#stx-story-top',
      popover: {
        title: '侧边工具栏',
        description: '自定义工具栏',
        position: 'left',
      },
    },
    {
      element: document.querySelector('center'),
      popover: {
        title: 'TiddlyWiki 主页展示',
        description: '自定义 TiddlyWiki 主页展示',
        position: 'left',
      },
    },
  ];

  const driverObj = driver({
    showProgress: true,
    animate: true,
    showButtons: ['next', 'previous', 'close'],
    allowClose: false,
    steps,
  });

  driverObj.drive();
}

module.exports = {
  tour,
};
