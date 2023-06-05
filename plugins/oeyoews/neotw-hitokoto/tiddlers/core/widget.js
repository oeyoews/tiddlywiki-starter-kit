/*\
title: $:/plugins/oeyoews/neotw-hitokoto/widget.js
type: application/javascript
module-type: widget

Hitokoto widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class Hitokoto extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.executing = false;
      this.hitokotoNode = '';
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      this.hitokotoNode = $tw.utils.domMaker('div', {
        text: 'Loading ...',
        class:
          'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 cursor-pointer text-xs',
        attributes: {},
        children: [],
        eventListeners: [
          {
            name: 'click',
            handlerObject: this,
            handlerMethod: 'handlerClick',
          },
        ],
      });
      this.fetchHitokoto();

      parent.insertBefore(this.hitokotoNode, nextSibling);
      this.domNodes.push(this.hitokotoNode);
    }

    fetchHitokoto = async () => {
      const response = await fetch('https://v1.hitokoto.cn');
      const { hitokoto: hitokotoText, from } = await response.json();
      const hitokotoFrom = '@' + from;
      this.hitokotoNode.textContent = `${hitokotoText} ${hitokotoFrom}`;
    };

    throttle(func, delay) {
      let timer = null;
      let lastCallTime = 0;
      const throttled = function () {
        const now = new Date().getTime();
        const timeSinceLastCall = now - lastCallTime;
        if (!timer || timeSinceLastCall >= delay) {
          func.apply(this, arguments);
          lastCallTime = now;
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      };
      return throttled;
    }

    handlerClick = this.throttle(this.fetchHitokoto, 1000);
  }

  exports.hitokoto = Hitokoto;
})();
