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
    this.RubyRender(parent, nextSibling, true);
  }

  // Custom render method
  RubyRender(parent, nextSibling) {
    const oc = this.parseTreeNode.children;
    if (true) {
      this.parentDomNode = parent;
      this.computeAttributes();
      let rubyPosition = 'over';
      let ruby = this.getAttribute('u');
      if (!ruby || ruby === '') {
        ruby = this.getAttribute('l');
        if (!ruby || ruby === '') {
        } else {
          rubyPosition = 'under';
        }
      }

      let p = this;
      let tags = [];
      while (p) {
        const ct = p.getVariable('currentTiddler');
        const tid = $tw.wiki.getTiddler(ct);
        if (tid) {
          tags = tags.concat(tid.getFieldList('tags'));
          tags = tags.filter((item, pos) => {
            return tags.indexOf(item) === pos;
          });
        }
        p = p.parentWidget;
      }

      const container = this.document.createElement('span');
      super.render(container, null);
      const wikiParser = $tw.wiki.parseText(
        'text/vnd.tiddlywiki', // 类型空值也没问题
        `<ruby>${container.innerHTML}</ruby>`,
        { parseAsInline: true }
      );
      this.parseTreeNode.children = wikiParser.tree;
    }
    super.render(parent, nextSibling);
    this.parseTreeNode.children = oc;
  }
}

// Export the TWSRRuby class
exports.blockquote = TWSRRuby;
exports.r = TWSRRuby;
