/*\
title: $:/plugins/oeyoews/neotw-fetch/widget.js
type: application/javascript
module-type: widget

fetch-mdfile widget
\*/
const Widget = require('$:/core/modules/widgets/widget.js').widget;
const { getText } = require('./addfile');

class FetchWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    if (!$tw.modules.titles['nprogress.min.js']) {
      const notify = new $tw.Notify();
      notify.display({
        title: 'neotw-fetch',
        status: 'warning',
        autoclose: false,
        type: 1,
        text: '缺失 NProgress 插件',
      });
    }
    const progress = new $tw.NProgress();

    const defaulturl =
      'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';

    const { url = defaulturl } = this.attributes;

    const domNode = this.document.createElement('div');

    getText(url).then((text) => {
      if (!text) console.log('text null');
      progress.start();
      const textContent = $tw.wiki.renderText(
        'text/html',
        'text/markdown',
        text,
      );
      domNode.innerHTML = textContent;
      progress.done();
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
  refresh() {
    return false;
  }
}

exports['fetch'] = FetchWidget;
