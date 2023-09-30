/*\
title: $:/plugins/oeyoews/neotw-date/widget.js
type: application/javascript
module-type: widget

neotw-date widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

  class ExampleWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;
      const formatDateString = $tw.utils.formatDateString;
      const getRelativeDate = $tw.utils.getRelativeDate;
      const parseDate = $tw.utils.parseDate;

      // TODO: 日期处理仍然有问题
      const { date = '2023-10-01', relative } = this.attributes;

      const formatedDate = formatDateString(parseDate(date), 'YYYY-MM-DD');

      // const date = formatDateString(new Date(), 'YYYY-MM-DD');
      const { description } = getRelativeDate(
        new Date() - new Date(parseDate(date)),
      );

      const domNode = createElement('div', {
        text: relative ? description : formatedDate,
        class: 'font-bold',
      });

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  /**
   * @description neotw-date widget
   * @param xxx
   */
  exports.odate = ExampleWidget;
})();
