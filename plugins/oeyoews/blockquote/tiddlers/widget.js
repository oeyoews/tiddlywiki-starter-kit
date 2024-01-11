/*\
title: $:/plugins/oeyoews/blockquote/widget.js
type: application/javascript
module-type: widget

blockquote widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class BlockquoteWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    this.computeAttributes();
    this.execute();

    const { color = 'gray', number = 300 } = this.attributes;

    const domNode = this.document.createElement('blockquote');
    domNode.className = 'relative border-none';
    const barNode = this.document.createElement('div');
    barNode.className = `h-full rounded-full absolute -left-2 -top-1 w-1`;
    barNode.classList.add(`bg-${color}-${number}`, `dark:bg-${color}-500`);
    domNode.append(barNode);

    parent.insertBefore(domNode, nextSibling);
    this.renderChildren(domNode, null);
    this.domNodes.push(domNode);
  }

  // NOTE: 默认是会刷新的
  refresh() {
    return false;
  }
}

// Export the TWSRRuby class
exports.blockquote = BlockquoteWidget;
exports.ob = BlockquoteWidget;
