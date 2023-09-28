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

      const { q = '点击翻转', a = '这是背面', json } = this.attributes;

      const domNode = $tw.utils.domMaker('div', {
        class: json ? 'flex flex-row overflow-scroll space-x-4' : '',
      });

      // TODO: 验证json是否有语法错误
      const list = $tw.wiki.getTiddlerData(json) || [{ q, a }];
      list.forEach(({ q, a }) => {
        domNode.append(createCard(q, a));
      });

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }

    refresh(changedTiddlers) {
      const changedAttributes = this.computeAttributes();
      if (changedAttributes.json) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * @description neotw-reverse-card widget
   * @param xxx
   */
  exports.rcard = ReverseCard;
})();
