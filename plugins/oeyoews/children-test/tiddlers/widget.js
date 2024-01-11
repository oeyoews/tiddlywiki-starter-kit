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
    this.RubyRender(this, parent, nextSibling, true);
  }

  // Custom render method
  RubyRender(self, parent, nextSibling, useAnswer) {
    const oc = self.parseTreeNode.children;
    if (true) {
      self.parentDomNode = parent;
      self.computeAttributes();
      let rubyPosition = 'over';
      let ruby = self.getAttribute('u');
      if (!ruby || ruby === '') {
        ruby = self.getAttribute('l');
        if (!ruby || ruby === '') {
        } else {
          rubyPosition = 'under';
        }
      }

      let p = self;
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

      const container = self.document.createElement('span');
      super.render(container, null);
      const wikiParser = $tw.wiki.parseText(
        'text/vnd.tiddlywiki', // 类型空值也没问题
        `<ruby>${container.innerHTML}</ruby>`,
        { parseAsInline: true }
      );
      self.parseTreeNode.children = wikiParser.tree;
    }
    super.render(parent, nextSibling);
    self.parseTreeNode.children = oc;
  }
}

// Export the TWSRRuby class
exports.blockquote = TWSRRuby;
exports.r = TWSRRuby;
