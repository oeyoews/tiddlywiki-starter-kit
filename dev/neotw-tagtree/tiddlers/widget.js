/*\
title: $:/plugins/oeyoews/neotw-tagtree/widget.js
type: application/javascript
module-type: widget

neotw-tagtree widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
  const getTagMap = require('./getTagMap');

  class ExampleWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;

      const children = [];
      const tags = getTagMap();
      tags.map(({ tag, item }) => {
        const list = createElement('button', {
          class: 'px-1',
          text: tag,
        });
        children.push(list);
      });

      const domNode = createElement('div', {
        class: 'space-y-2 flex flex-col jusityf-start items-start',
        children,
      });

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  /**
   * @description neotw-tagtree widget
   * @param xxx
   */
  exports.tagtree = ExampleWidget;
})();
