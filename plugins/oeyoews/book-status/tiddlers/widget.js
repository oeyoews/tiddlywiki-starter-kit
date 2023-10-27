/*\
title: $:/plugins/oeyoews/book-status/widget.js
type: application/javascript
module-type: widget

book-status widget

\*/
const { jsonStringify, log } = require('$:/core/modules/utils/utils.js');
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class BookStatusWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.configfile = 'bookstatus.json';
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    const wiki = $tw.wiki;

    const createConfigFile = () => {
      // may set map
      let config = null;
      if (!wiki.tiddlerExists(this.configfile)) {
        wiki.addTiddler({
          type: 'application/json',
          title: 'bookstatus.json',
          text: '',
        });
        this.parentWidget.dispatchEvent({
          type: 'om-notify',
          paramObject: {
            title: `create ${this.configfile} config file`,
          },
        });
      } else {
        // default config
        config = wiki.getTiddlerData(this.configfile) || {};
        const title = this.getVariable('storyTiddler');
        if (title.startsWith('Draft of')) return;
        const pluginname = wiki.getShadowSource(title);
        if (!pluginname) return;
        const { book } = wiki.getTiddler(pluginname).fields;
        if (!book) return;
        let status = config?.[book]?.[title];
        status = status === '已读' ? '未读' : '已读';
        const obj = {
          [book]: {
            [title]: status,
          },
        };
        Object.assign(config, obj);
        wiki.setText(this.configfile, 'text', null, JSON.stringify(config));
        this.parentWidget.dispatchEvent({
          type: 'om-notify',
          paramObject: {
            // TODO: success or info for book status
            status: 'info',
            title: title,
            text: `Update ${status}`,
          },
        });
      }
    };

    const btn = createElement('button', {
      // TODO: status
      text: `update ${this.configfile} `,
      class: 'p-2',
      attributes: {},
    });

    btn.addEventListener('click', createConfigFile);

    const domNode = createElement('div', {
      children: [btn],
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description book-status widget
 * @param
 */
exports.bookstatus = BookStatusWidget;
