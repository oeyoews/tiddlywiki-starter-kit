/*\
title: $:/plugins/oeyoews/neotw-hitokoto/widget.js
type: application/javascript
module-type: widget

Hitokoto widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class HitokotoWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.executing = false;
      this.hitokotoNode = '';
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      this.hitokotoNode = $tw.utils.domMaker('div', {
        text: 'Loading ...',
        class:
          'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer text-xs inline',
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

    throttle(fn, wait) {
      let timer = null;
      return function (...args) {
        if (!timer) {
          fn.apply(this, args);
          timer = setTimeout(() => {
            timer = null;
          }, wait);
        }
      };
    }

    notify() {
      Swal.fire({
        toast: true,
        icon: 'success',
        position: 'top-end',
        timer: 1500,
        title: 'Hitokoto Updated',
        showConfirmButton: false,
      });
    }

    handlerClick = this.throttle(function () {
      this.fetchHitokoto();
      this.notify();
    }, 500);
  }

  exports.hitokoto = HitokotoWidget;
})();
