/*\
title: $:/plugins/oeyoews/hitokoto/widget.js
type: application/javascript
module-type: widget

hitokoto widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const getRandomColor = require('./getRandomColor');

class HitokotoWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    // getall journal tiddler
    const journalTiddlers = $tw.wiki.filterTiddlers(
      '[tag[Journal]!sort[created]]',
    );

    const children = [];

    journalTiddlers.map((tiddler) => {
      const color = getRandomColor();
      console.log(color, 'xxx');
      const { created, creator, title } = $tw.wiki.getTiddler(tiddler).fields;
      let content;
      // https://github.com/Jermolene/TiddlyWiki5/pull/7413
      content = $tw.wiki.renderTiddler('text/html', title);
      const link = `[[${title}]]`;
      // TODO: use eventlisteners
      // content += $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', link);
      const htNode = this.document.createElement('blockquote');
      htNode.className = `my-4 bg-${color}-100/50 px-2 rounded border-l-[3px] border-l-${color}-300 mx-0`;
      htNode.innerHTML = content;
      children.push(htNode);
    });

    const domNode = createElement('div', {
      children,
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description hitokoto widget
 * @param text
 */
exports.ht = HitokotoWidget;
