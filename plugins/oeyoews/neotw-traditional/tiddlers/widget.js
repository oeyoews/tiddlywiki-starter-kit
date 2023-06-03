/*\
title: $:/plugins/oeyoews/neotw-traditional/widget.js
type: application/javascript
module-type: widget

neotw-traditional widget

\*/
// 判断系统
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.currentTiddler = this.getVariable('currentTiddler');
      this.id = document.querySelector(
        `[data-tiddler-title=${this.currentTiddler}]`,
      );
      this.traditional = false;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const classNames = this.getAttribute('class', '').split('');

      const buttonNode = $tw.utils.domMaker('span', {
        // how to refresh this dom
        text: this.traditional ? '简' : '繁',
        class: 'cursor-pointer text',
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

    handlerClick = () => {
      this.id.style.fontFamily = !this.traditional ? 'PingFang SC' : '';
      this.id.style.fontVariantEastAsian = !this.traditional
        ? 'traditional'
        : 'simplified';
      // this.id.style = !this.traditional ? null : '';
      this.traditional = !this.traditional;
    };
  }

  exports['traditional'] = DivWidget;
})();
