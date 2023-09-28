/*\
title: $:/plugins/oeyoews/neotw-reverse-card/widget.js
type: application/javascript
module-type: widget

neotw-reverse-card widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
  const createCard = require('./createCard');

  class ReverseCard extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const { question = '点击翻转', answer = '这是背面' } = this.attributes;
      const domNode = createCard(question, answer);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  /**
   * @description neotw-reverse-card widget
   * @param xxx
   */
  exports.rcard = ReverseCard;
})();
