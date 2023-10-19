/*\
title: table-view/widget
type: application/javascript
module-type: widget

table-view widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TableWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;

      const titleBtn = createElement('button', {
        text: 'titleBtn',
      });
      const tagBtn = createElement('button', {
        text: 'tagBtn',
      });

      const itemNode = createElement('div', {
        class:
          'flex flex-row overflow-scroll justify-start space-x-4 border-t border-t-gray-200',
        children: [titleBtn, tagBtn],
      });

      const domNode = createElement('div', {
        class: 'ntable',
        children: [itemNode],
      });

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  exports['ntable'] = TableWidget;
})();
