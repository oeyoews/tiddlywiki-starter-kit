/*\
title: $:/plugins/oeyoews/neotw-tour/widget.js
type: application/javascript
module-type: widget

neotw-tour widget

\*/
// TODO postitions not work
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TourWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.steps = [];
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const classNames = this.getAttribute('class', '').split(' ');
      const targetTiddler =
        this.getAttribute('tiddler') ||
        '$:/plugins/oeyoews/neotw-tour/demo.json';
      this.steps = $tw.wiki.getTiddlerData(targetTiddler);

      const buttonNode = $tw.utils.domMaker('button', {
        text: 'start',
        class: '',
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
      classNames.forEach((className) => {
        if (className) {
          buttonNode.classList.add(className);
        }
      });
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    handlerClick() {
      // 高亮元素
      const driverObj = driver({
        // option config TODO
        showProgress: true,
        animate: true,
        showButtons: ['next', 'previous', 'close'],
        allowClose: true,
        /* nextBtnText: '➡️',
        prevBtnText: '⬅️',
        doneBtnText: '❌', */
        // overlayColor: 'red',
        steps: this.steps,
      });
      driverObj.drive();

      function highlightWarning() {
        driverObj.highlight({
          // element: document.querySelector('h1'),
          popover: {
            description:
              "<img src='https://cdn-icons-png.flaticon.com/128/6598/6598519.png' style='height: 202.5px; width: 270px;' />",
            // title: 'Page Heading',
            // description: 'This is the main heading of the page.',
            // position: 'left',
          },
        });
      }

      !this.steps && highlightWarning();
    }
  }

  exports['tour'] = TourWidget;
})();
