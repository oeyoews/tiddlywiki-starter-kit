/*\
title: $:/plugins/oeyoews/children-test/widget.js
type: application/javascript
module-type: widget

children-test widget

\*/

// Import the Widget class from the widget.js file
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

// Define the TWSRRuby class
class TWSRRuby extends Widget {
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

  getWrapperNode(container) {
    return `<blockquote class="bg-red-300">${container.innerHTML}</blockquote>`;
  }
}

// Export the TWSRRuby class
exports.blockquote = TWSRRuby;
