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

      // priority: attribute -> fiedlds -> default
      let { q, a, json } = this.attributes;
      const currentTiddler = this.getVariable('currentTiddler');
      const { fields } = $tw.wiki.getTiddler(currentTiddler);

      // 仅仅支持一个rcard
      const { question, answer } = fields;
      if (!q) q = question || 'question';
      if (!a) a = answer || 'answer';

      const domNode = $tw.utils.domMaker('div', {
        class: json ? 'flex overflow-scroll space-x-4 snap-x px-12' : '',
      });

      // TODO: 验证json是否有语法错误
      const list = $tw.wiki.getTiddlerDataCached(json) || [{ q, a }];
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
