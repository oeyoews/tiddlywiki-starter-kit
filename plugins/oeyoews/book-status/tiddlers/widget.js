/*\
title: $:/plugins/oeyoews/book-status/widget.js
type: application/javascript
module-type: widget

book-status widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const mergeObj = require('./mergeObj');

class BookStatusWidget extends Widget {
  static STATUS_UNREAD = '未读';
  static STATUS_READ = '已读';

  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.bookstatusfilename = 'bookstatus.json';
    this.statuses = new Map();
    this.btn;
  }

  readStatuses() {
    const config = $tw.wiki.getTiddlerData(this.bookstatusfilename) || {};
    // json 对象转 Map
    Object.entries(config).forEach(([bookname, book]) => {
      Object.entries(book).forEach(([title, status]) => {
        const key = `${bookname}/${title}`;
        this.statuses.set(key, status);
      });
    });
  }

  // 当需要获取某个书籍的阅读状态时，会先从 Map 中查找，如果没有找到则从配置文件中读取数据并进行解析，
  // 然后将结果存入 Map 中以备下次使用。
  getStatus(bookname, title) {
    const key = `${bookname}/${title}`;
    if (!this.statuses.has(key)) {
      this.readStatuses();
    }
    return this.statuses.get(key) || '未读';
  }

  updateStatus(bookname, title) {
    this.parentWidget.dispatchEvent({
      type: 'om-nprogress'
    });
    if (title.startsWith('Draft of') || !bookname) return;
    const wiki = $tw.wiki;

    const defaultconfig = wiki.getTiddlerData(this.bookstatusfilename) || {};
    if (!wiki.tiddlerExists(this.bookstatusfilename)) {
      wiki.addTiddler({
        type: 'application/json',
        title: this.bookstatusfilename,
        'meta#disabled': 'yes', // disable meta file
        text: ''
      });
    }
    const key = `${bookname}/${title}`;
    const status = this.getStatus(bookname, title);
    const newStatus =
      status === BookStatusWidget.STATUS_READ
        ? BookStatusWidget.STATUS_UNREAD
        : BookStatusWidget.STATUS_READ;
    this.statuses.set(key, newStatus);
    const obj = {
      [bookname]: {
        [title]: newStatus
      }
    };
    mergeObj(defaultconfig, obj);
    wiki.setText(
      this.bookstatusfilename,
      'text',
      null,
      JSON.stringify(defaultconfig),
      {
        suppressTimestamp: true
      }
    );
    this.parentWidget.dispatchEvent({
      type: 'om-notify',
      paramObject: {
        status: newStatus === BookStatusWidget.STATUS_READ ? 'success' : 'info',
        title,
        text: `更新状态：${newStatus}`
      }
    });
    this.btn.removeEventListener('click', () =>
      this.updateStatus(bookname, title)
    );
    this.refreshSelf();
    this.parentWidget.dispatchEvent({
      type: 'om-nprogress-done'
    });
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    const wiki = $tw.wiki;
    const title = this.getVariable('storyTiddler');
    const pluginname = wiki.getShadowSource(title);
    const { book: bookname } = wiki.getTiddler(pluginname)?.fields || {};
    const status = this.getStatus(bookname, title);

    const statusClass =
      status === BookStatusWidget.STATUS_READ
        ? 'text-green-400'
        : 'text-rose-400';
    this.btn = createElement('button', {
      text: status,
      class: `p-2 ${statusClass}`
    });

    this.btn.addEventListener('click', () =>
      this.updateStatus(bookname, title)
    );

    const domNode = createElement('div', {
      class: 'flex justify-end',
      children: [this.btn]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description book-status widget
 * @param configfilename
 */
exports.bookstatus = BookStatusWidget;
