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
    this.configfile = 'bookstatus.json';
    this.status = '';
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
    let config = wiki.getTiddlerData(this.configfile) || {};
    this.status = config?.[bookname]?.[title] || '未读';

    const updateStatus = () => {
      // may set map
      if (!wiki.tiddlerExists(this.configfile)) {
        wiki.addTiddler({
          type: 'application/json',
          title: 'bookstatus.json',
          'meta#disabled': 'yes', // disable meta file
          text: '',
        });
        this.parentWidget.dispatchEvent({
          type: 'om-notify',
          paramObject: {
            title: `create ${this.configfile} config file`,
          },
        });
      }
      if (title.startsWith('Draft of') || !pluginname || !bookname) return;
      this.status = this.status === '已读' ? '未读' : '已读';
      const obj = {
        [bookname]: {
          [title]: this.status,
        },
      };
      // update book status file
      mergeObj(config, obj);
      wiki.setText(this.configfile, 'text', null, JSON.stringify(config));
      this.parentWidget.dispatchEvent({
        type: 'om-notify',
        paramObject: {
          status:
            this.status === BookStatusWidget.STATUS_READ ? 'success' : 'info',
          title,
          text: `更新状态: ${this.status}`,
        },
      });
      // 刷新
      this.refreshSelf();
    };

    const statusClass =
      this.status === BookStatusWidget.STATUS_READ
        ? 'text-green-400'
        : 'text-rose-400';
    const btn = createElement('button', {
      text: this.status,
      class: `p-2 ${statusClass}`,
    });

    btn.addEventListener('click', updateStatus);

    const domNode = createElement('div', {
      class: 'flex justify-end',
      children: [btn],
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
