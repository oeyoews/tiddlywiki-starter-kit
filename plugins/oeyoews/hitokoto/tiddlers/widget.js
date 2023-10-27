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
    // server or tw static to return
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const { filter = '[tag[Journal]!sort[created]limit[99]]' } =
      this.attributes;
    // getall journal tiddler
    const journalTiddlers = $tw.wiki.filterTiddlers(filter);

    const children = [];

    // https://github.com/Jermolene/TiddlyWiki5/pull/7413
    journalTiddlers.map((tiddler) => {
      let content;
      const color = getRandomColor();
      const { created, creator, title } = $tw.wiki.getTiddler(tiddler).fields;
      const footerNode = this.document.createElement('div');
      const timeNode = this.document.createElement('div');
      const timeFormated = created.toLocaleDateString();
      timeNode.textContent = timeFormated;
      timeNode.addEventListener('click', () => {
        this.dispatchEvent({
          type: 'tm-navigate',
          param: title,
          navigateTo: title,
        });
      });
      timeNode.className =
        'mb-2 w-full md:mb-0 md:w-auto hover:underline hover:text-indigo-400 hover:cursor-pointer transition';
      const authorNode = this.document.createElement('div');
      authorNode.className = 'mb-2 w-full md:mb-0 md:w-auto text-right';
      authorNode.textContent = `@${creator}`;
      footerNode.className = 'flex flex-wrap text-sm md:justify-between';
      footerNode.append(timeNode, authorNode);
      content = $tw.wiki.renderTiddler('text/html', title);
      const htNode = this.document.createElement('blockquote');
      htNode.className = `mt-4 md:mt-8 mb-1 bg-${color}-100/50 px-2 rounded border-l-[3px] border-l-${color}-300 mx-0 py-2`;
      htNode.innerHTML = content;
      children.push(htNode, footerNode);
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
