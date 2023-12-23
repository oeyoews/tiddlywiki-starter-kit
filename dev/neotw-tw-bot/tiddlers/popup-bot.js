/*\
title: $:/plugins/oeyoews/neotw-tw-bot/popup-widget.js
type: application/javascript
module-type: widget

neotw-tw-bot widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';
  // 是$:/plugins/oeyoews/neotw-tw-bot/sendmessage.js 的简写，和真实文件路径无关，但最好相同，方便编辑器识别，就不用写.js 后缀
  const twBot = require('./sendmessage');

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TwBot extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.virtualRoot = null;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      this.virtualRoot = twBot();

      const container = document.createElement('div');
      const span = document.createElement('span');
      span.innerHTML = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/neotw-tw-bot/icon',
      );
      span.classList.add('cursor-pointer');
      span.addEventListener('click', () => {
        botNode.classList.remove('scale-0');
        masklayer.classList.remove('scale-0');
      });
      container.appendChild(span);
      const masklayer = document.createElement('div');
      masklayer.className =
        'fixed inset-0 bg-black/10 backdrop-blur z-[9998] cursor-pointer scale-0';
      masklayer.addEventListener('click', () => {
        botNode.classList.add('scale-0');
        masklayer.classList.add('scale-0');
      });
      const botNode = document.createElement('div');
      botNode.className =
        'fixed top-8 -translate-x-1/2 left-1/2 w-full z-[9999] transition-all duration-300 ease-in-out scale-0';
      botNode.appendChild(this.virtualRoot);
      container.appendChild(masklayer);
      container.appendChild(botNode);

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }

    refresh() {
      this.refreshSelf();
    }
  }

  exports['tw-bot-popup'] = TwBot;
})();
