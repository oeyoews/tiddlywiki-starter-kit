/*\
title: $:/plugins/oeyoews/double-click-edit/widget.js
type: application/javascript
module-type: widget

double-click-edit widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class DBClickEditWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent) {
    if (!$tw.browser) return;

    this.parentDomNode = parent;
    const title = this.getVariable('currentTiddler');

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    this.parentDomNode.addEventListener('dblclick', (e) => {
      if (!e.ctrlKey) return;
      this.dispatchEvent({
        type: 'tm-edit-tiddler',
        param: title
      });
    });
  }
}

/** @description double-click-edit widget */
exports['edit-dbclick'] = DBClickEditWidget;
