/*\
title: $:/plugins/oeyoews/neotw-tour/tour.js
type: application/javascript
module-type: library

tour 🪧
\*/

function tour() {
  const steps = [
    {
      element: document.querySelector('center'),
      popover: {
        title: 'TiddlyWiki 主页展示',
        description: '自定义 TiddlyWiki 主页展示',
        position: 'left'
      }
    },
    {
      element: '#stx-story-top',
      popover: {
        title: '侧边工具栏',
        description: '自定义工具栏',
        position: 'left'
      }
    },
    {
      element: document.querySelector('[aria-label="player"]'),
      popover: {
        title: 'Player',
        description: '音乐播放器',
        position: 'left'
      }
    },
    {
      element: document.querySelector('[aria-label="home"]'),
      popover: {
        title: 'Home',
        description: '进入故事河',
        position: 'left',
        onNextClick: () => {
          confetti();
          driverObj.moveNext();
          // TODO swal
        }
      }
    }
  ];

  const driverObj = driver({
    // https://driverjs.com/docs/theming/
    // popoverClass: 'bg-slate-300',
    showProgress: true,
    // progressText: 'Step {{current}} of {{total}}',
    animate: true,
    showButtons: ['next', 'previous', 'close'],
    allowClose: false,
    steps
  });

  driverObj.drive();
}

module.exports = {
  tour
};
