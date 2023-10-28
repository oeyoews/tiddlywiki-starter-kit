/*\
title: $:/plugins/oeyoews/book-status/tocstatus.js
type: application/javascript
module-type: widget

使用wikitext 应该也能做, 但是数据在json里面, 比较麻烦
\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class BookTocStatusWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const { bookname = '劫持' } = this.attributes;
    const wiki = $tw.wiki;
    const createElement = $tw.utils.domMaker;
    const statusfilename = 'bookstatus.json';
    const statuses = wiki.getTiddlerData(statusfilename);
    const pluginname = '$:/plugins/books/' + bookname;
    if (!wiki.tiddlerExists(pluginname)) return;
    const { tiddlers } = wiki.getPluginInfo(pluginname);
    const toc = Object.keys(tiddlers).filter(
      (title) => !title.startsWith('$:/'),
    );
    const status = statuses?.[bookname];

    // TODO: 顺序会乱掉, 使用map
    const tocStatusData = toc.map((title) => [title, '未读']);
    const mergedStatus = status
      ? Object.assign(tocStatusData, Object.entries(status))
      : tocStatusData;
    const children = [];

    // update status
    const createLi = (title, status) => {
      const li = this.document.createElement('li');
      const color = status === '已读' ? 'green' : 'red';
      const content = $tw.wiki.renderText(
        'text/html',
        'text/vnd.tiddlywiki',
        `[[${title}]] <sup>@@color:${color};${status}@@</sup>`,
      );
      li.innerHTML = content;
      children.push(li);
      li.addEventListener('click', (e) => {
        const progress = new $tw.NProgress();
        progress.start();
        e.preventDefault();
        new $tw.Story().navigateTiddler(title);
        progress.done();
      });
    };

    mergedStatus.forEach(([title, status]) => {
      createLi(title, status);
    });

    const domNode = createElement('ol', {
      children,
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description book-status widget
 * @param bookname
 */
exports.tocstatus = BookTocStatusWidget;
