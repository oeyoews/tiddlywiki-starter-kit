/*\
title: $:/plugins/oeyoews/children-test/widget.js
type: application/javascript
module-type: widget

children-test widget

\*/

// Import the Widget class from the widget.js file
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

// Define the TWSRRuby class
class BlockquoteWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  // Render method
  render(parent, nextSibling) {
    this.computeAttributes();
    this.execute();

    const container = this.document.createElement('span');
    const type = 'text/vnd.tiddlywiki';
    const options = {
      parseAsInline: true
    };

    super.render(container, null);

    const wikiParser = $tw.wiki.parseText(
      type,
      this.getWrapperNode(container),
      options
    );
    this.parseTreeNode.children = wikiParser.tree;

    super.render(parent, nextSibling);
  }

  // 其实使用 widget wikitext 也可以.
  getWrapperNode(container) {
    return `<blockquote class="relative border-none">
    <div class="h-full rounded-full bg-gray-300 dark:bg-gray-500 absolute -left-2 -top-1 w-1"/>
    ${container.innerHTML}</blockquote>`;
  }

  // NOTE: 注意默认是会刷新的,  需要明确返回false, 禁止刷新bug
  refresh(changedTiddlers) {
    return false;
  }
}

// Export the TWSRRuby class
exports.blockquote = BlockquoteWidget;
