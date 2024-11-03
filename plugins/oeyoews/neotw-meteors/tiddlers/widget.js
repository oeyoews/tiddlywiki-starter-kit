/*\
title: $:/plugins/oeyoews/neotw-meteors/widget.js
type: application/javascript
module-type: widget

neotw-meteors widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class MeteorsWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    const meteorContainer = createElement('div', {
      class: 'absolute h-24 inset-x-0 hidden dark:block z-[-1]',
    });
    function getRandomPosition(max) {
      return `${Math.floor(Math.random() * max)}px `;
    }

    function getRandomDelay() {
      return `${(Math.random() * 1 + 0.2).toFixed(2)}s`;
    }

    function getRandomDuration() {
      return `${Math.floor(Math.random() * 8 + 2)}s`;
    }
    const meteorCount = 20;
    for (let i = 0; i < meteorCount; i++) {
      const meteor = document.createElement('div');
      meteor.className = 'absolute';

      const span = document.createElement('span');
      // rotate-[215deg]
      span.className =
        'pointer-events-none absolute size-0.5 animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]';

      // 随机位置、延迟、动画时长
      span.style.top = '-5px';
      span.style.left = getRandomPosition(window.innerWidth);
      span.style.animationDelay = getRandomDelay();
      span.style.animationDuration = getRandomDuration();
      span.style.opacity = 0;

      // 添加流星尾巴
      const tail = document.createElement('div');
      tail.className =
        'pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent';

      // 结构拼装
      span.appendChild(tail);
      meteor.appendChild(span);
      meteorContainer.appendChild(meteor);
    }

    parent.insertBefore(meteorContainer, nextSibling);
    this.domNodes.push(meteorContainer);
  }
}

/** @description neotw-meteors widget */
exports['neotw-meteors'] = MeteorsWidget;
