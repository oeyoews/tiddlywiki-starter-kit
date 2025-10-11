/*\
title: $:/plugins/oeyoews/neotw-vue-fetch/widget.js
type: application/javascript
module-type: widget

neotw-vue-fetch widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class VueFetchWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const defaulturl =
      'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';

    const { url = defaulturl } = this.attributes;

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const { createApp } = window.Vue;
    const component = require('./component');
    const domNode = this.document.createElement('div');

    try {
      const app = createApp(component(url));

      app.config.errorHandler = (err) => {
        const text = `[Vue3](${app.version}): ` + err;
        console.error(text);
        domNode.textContent = text;
        domNode.style.color = 'red';
      };

      // 挂载
      app.mount(domNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    } catch (e) {
      console.error(e.message);
    }
  }
}

/** @description neotw-vue-fetch widget */
exports['neotw-vue-fetch'] = VueFetchWidget;
