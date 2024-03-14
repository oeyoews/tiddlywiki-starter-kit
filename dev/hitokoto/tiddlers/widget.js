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

    const domNode = this.document.createElement('div');

    if (domNode.isTiddlyWikiFakeDom) {
      return;
    }

    const widgetTitle = this.getVariable('currentTiddler');

    // TODO: 添加一个load more button
    const journalCount = 10;
    // 限制 99 条，否则文字多了后会卡顿
    const { filter = `[tag[Journal]!sort[created]limit[99]]` } =
      this.attributes;
    // getall journal tiddler
    const journalTiddlers = $tw.wiki.filterTiddlers(filter);

    if (journalTiddlers.includes(widgetTitle)) {
      console.warn('Dont use ht widget in journal tiddler!!!');
      return;
    }

    const children = [];

    // TODO: use ejs
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
          navigateTo: title
        });
      });
      timeNode.className =
        'mb-2 w-full md:mb-0 md:w-auto hover:underline hover:text-indigo-400 hover:cursor-pointer transition';

      const authorNode = this.document.createElement('div');
      authorNode.className = 'mb-2 w-full md:mb-0 md:w-auto text-right';
      authorNode.textContent = creator ? `@${creator}` : '';
      footerNode.className = 'flex flex-wrap text-sm md:justify-between';
      footerNode.append(timeNode, authorNode);

      if (!$tw.wiki.getTiddlerText(title)) {
        return;
      }

      // link 不遵循系统配置, 会更新url, 因为这里就是就是单纯渲染出来一个一个url link没有绑定事件, 而tiddler 上的link, 都加上了一个事件监听.
      content = $tw.wiki.renderText(
        'text/html',
        'text/vnd.tiddlywiki',
        `!! ${title} \n <$transclude $tiddler="${title}" $mode="block" />`
      );

      if (!content || content === '<p></p>') return;
      const htNode = this.document.createElement('blockquote');
      htNode.className = `mt-4 md:mt-8 mb-1 bg-${color}-100/50 dark:bg-${color}-400 px-2 rounded border-l-[3px] border-l-${color}-300 mx-0 py-2`;
      htNode.innerHTML = content;
      children.push(htNode, footerNode);
    });

    domNode.append(...children);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description hitokoto widget
 */
exports.ht = HitokotoWidget;
