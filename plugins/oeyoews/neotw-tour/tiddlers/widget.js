/*\
title: $:/plugins/oeyoews/neotw-tour/widget.js
type: application/javascript
module-type: widget

neotw-tour widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const classNames = this.getAttribute('class', '').split('');

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
      classNames.forEach(className => {
        if (className) {
          buttonNode.classList.add(className);
        }
      });
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    handlerClick() {
      // 高亮元素
      driverObj.highlight({
        element: document.querySelector('h1'),
        popover: {
          title: 'Page Heading',
          description: 'This is the main heading of the page.',
          position: 'left',
        },
      });
    }
  }

  exports['tour'] = DivWidget;
})();
