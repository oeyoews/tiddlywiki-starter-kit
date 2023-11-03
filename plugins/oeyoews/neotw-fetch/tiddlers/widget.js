/*\
title: $:/plugins/oeyoews/neotw-fetch/widget.js
type: application/javascript
module-type: widget

fetch-mdfile widget
\*/
const Widget = require('$:/core/modules/widgets/widget.js').widget;
const addfile = require('./addfile');

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
    const timestamp = new Date().getTime();

    const defaulturl =
      'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';

    const { url = defaulturl, filename = `MDFile-${timestamp}` } =
      this.attributes;

    const buttonNode = this.document.createElement('button');
    buttonNode.textContent = `${filename} - ${url}`;

    parent.insertBefore(buttonNode, nextSibling);
    this.domNodes.push(buttonNode);

    buttonNode.addEventListener('click', () => {
      progress.start();
      addfile(url, filename);
      this.refreshSelf();
      progress.done();
    });
  }
  refresh() {
    return false;
  }
}

exports['fetch'] = FetchWidget;