/*\
title: $:/plugins/oeyoews/book-status/tocstatus.js
type: application/javascript
module-type: widget

使用 wikitext 应该也能做，但是数据在 json 里面，比较麻烦
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
    const toc = Object.keys(tiddlers)
      .filter((title) => !title.startsWith('$:/'))
      .map((title) => ({
        title,
        status: '未读'
      }));
    const readlist =
      statuses?.[bookname] &&
      Object.entries(statuses?.[bookname]).map(([title, status]) => ({
        title,
        status
      }));
    const tocstatuslist = new Map();

    toc.forEach(({ title, status }) => {
      tocstatuslist.set(title, status);
    });
    let readcount = 0;
    readlist?.forEach(({ title, status }) => {
      status === '已读' && readcount++;
      tocstatuslist.set(title, status);
    });
    const progressvalue = (readcount / toc.length) * 100;
    const statusprogress = progressvalue.toFixed(2);

    const children = [];

    // update status
    const createLi = (title, status) => {
      const li = this.document.createElement('li');
      const color = status === '已读' ? 'green' : 'red';
      const icon = status === '已读' ? 'emojione-v1:left-check-mark' : '未读';
      const content = $tw.wiki.renderText(
        'text/html',
        'text/vnd.tiddlywiki',
        `[[${title}]]
<% if [[$:/plugins/oeyoews/neotw-icons]has[plugin-type]] %>
  <$iconify icon=${icon} />
<% endif %>
<sup>@@color:${color};font-size:10px;${status}@@</sup>`
      );
      li.innerHTML = content;
      children.push(li);
      li.addEventListener('click', (e) => {
        const progress = $tw.NProgress;
        progress.start();
        e.preventDefault();
        new $tw.Story().navigateTiddler(title);
        progress.done();
      });
    };

    tocstatuslist.forEach((status, title) => {
      createLi(title, status);
    });

    const progressNode = createElement('progress', {
      attributes: {
        id: 'om-progress',
        value: progressvalue,
        max: 100
      }
    });

    const statusprogressNode = createElement('center', {
      text: `${bookname} 阅读进度：${statusprogress}%`
    });
    children.unshift(statusprogressNode);
    children.unshift(progressNode);

    const domNode = createElement('ol', {
      children
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
  refresh(changedTiddlers) {
    if (Object.keys(changedTiddlers).includes('bookstatus.json')) {
      this.refreshSelf();
      return true;
    } else {
      return false;
    }
  }
}

/**
 * @description book-status widget
 * @param bookname
 */
exports.tocstatus = BookTocStatusWidget;
