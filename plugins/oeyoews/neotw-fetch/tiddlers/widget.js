/*\
title: $:/plugins/oeyoews/neotw-fetch/widget.js
type: application/javascript
module-type: widget

fetch-mdfile widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const { getText } = require('./addfile');

class FetchWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  async render(parent, nextSibling) {
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
        text: '缺失 NProgress 插件'
      });
    }
    const progress = $tw.NProgress;

    const defaulturl =
      'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';

    const { url = defaulturl } = this.attributes;

    const loading = this.document.createElement('div');

    loading.className = 'h-48 w-full rounded animate-pulse bg-gray-200';

    parent.insertBefore(loading, nextSibling);
    this.domNodes.push(loading);
    progress.start();

    const text = await getText(url);
    console.log(text, !text);
    if (!text) {
      this.removeChildDomNodes(loading);
      return;
    }

    const domNode = this.document.createElement('div');
    const textContent = $tw.wiki.renderText('text/html', 'text/markdown', text);
    domNode.innerHTML = textContent;
    progress.done();

    parent.insertBefore(domNode, loading);
    this.removeChildDomNodes(loading);
  }

  refresh() {
    return false;
  }
}

exports['fetch'] = FetchWidget;
