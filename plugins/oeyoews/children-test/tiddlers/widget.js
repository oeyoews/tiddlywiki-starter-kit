/*\
title: $:/plugins/oeyoews/children-test/widget.js
type: application/javascript
module-type: widget

children-test widget

\*/

// Import the Widget class from the widget.js file
const Widget = require('$:/core/modules/widgets/widget.js').widget;

// Define the TWSRRuby class
class TWSRRuby extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  // Execute method
  execute() {
    super.execute();
  }

  // Render method
  render(parent, nextSibling) {
    this._RubyRender(this, parent, nextSibling, true);
  }

  // Custom render method
  _RubyRender(_this, parent, nextSibling, useAnswer) {
    const oc = _this.parseTreeNode.children;
    if (true) {
      _this.parentDomNode = parent;
      _this.computeAttributes();
      let rubyPosition = 'over';
      let ruby = _this.getAttribute('u');
      if (!ruby || ruby === '') {
        ruby = _this.getAttribute('l');
        if (!ruby || ruby === '') {
        } else {
          rubyPosition = 'under';
        }
      }

      let p = _this;
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

      const container = _this.document.createElement('span');
      super.render(container, null);
      const rtTxt =
        '<rt>' +
        (useAnswer ? '<$a s>' : '') +
        ruby +
        (useAnswer ? '</$a>' : '') +
        '</rt>';
      const wikiParser = $tw.wiki.parseText(
        'text/vnd.tiddlywiki',
        `<ruby style="ruby-position:${rubyPosition}">${container.innerHTML}${rtTxt}</ruby>`,
        { parseAsInline: true }
      );
      console.log(wikiParser.tree);
      _this.parseTreeNode.children = wikiParser.tree;
    }
    super.render(parent, nextSibling);
    _this.parseTreeNode.children = oc;
  }
}

// Export the TWSRRuby class
exports.r = TWSRRuby;
