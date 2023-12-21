/*\
title: $:/plugins/oeyoews/countplusplus/widget.js
type: application/javascript
module-type: widget

countplusplus widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

  class ExampleWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.count = 5;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;
      const randomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      };
      const btnp = createElement('button', {
        text: '加',
        class: 'rounded p-2 bg-green-300 aspect-square',
        // eventListeners: [
        //   {
        //     name: 'click',
        //     handleObject: this,
        //     handlerMethod: 'log',
        //   },
        // ],
      });
      const btnd = createElement('button', {
        text: '减',
        class: 'rounded p-2 bg-rose-300 aspect-square',
      });
      const number = createElement('button', {
        text: this.count.toString(),
        class: `font-bold rounded p-2 text-[${randomColor()}] aspect-square`,
      });
      const domNode = createElement('div', {
        class: 'space-x-2 mx-2 justify-center flex dark:invert',
        children: [number, btnp, btnd],
      });

      btnp.onclick = () => {
        if (this.count < 10) {
          this.count++;
          this.refreshSelf();
        }
      };
      btnd.onclick = () => {
        if (this.count > 0) {
          this.count--;
          this.refreshSelf();
        }
      };

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }

    log = () => {
      console.log('clicked');
    };
  }

  /**
   * @description countplusplus widget
   * @param xxx
   */
  exports.countpp = ExampleWidget;
})();
