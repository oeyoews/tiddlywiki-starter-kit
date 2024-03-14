/*\
title: $:/plugins/oeyoews/pangu/widget.js
type: application/javascript
module-type: widget

pangu widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class PanguWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const format = require('./format');
    const createElement = $tw.utils.domMaker;

    const svg = $tw.wiki.getTiddlerText('$:/plugins/oeyoews/pangu/icon');
    const domNode = createElement('button', {
      title: 'format tiddler'
    });
    domNode.innerHTML = svg;

    const title = this.getVariable('currentTiddler');
    if (title.startsWith('$:/')) {
      console.warn('不允许修改系统条目', title);
      return;
    }
    domNode.addEventListener('click', () => format(title));

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description pangu widget
 */
exports.pangu = PanguWidget;
