/*\
title: $:/plugins/oeyoews/vue-rss/widget.js
type: application/javascript
module-type: widget

vue-rss widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class RssWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';
    // const ElementPlus = require('element-plus.min.js');

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }
    const { rss, proxy } = this.attributes;

    const { createApp } = window.Vue;
    const component = require('./app');
    const domNode = this.document.createElement('div');

    try {
      const app = createApp(component(rss, proxy));

      app.config.errorHandler = (err) => {
        const text = `[Vue3](${app.version}): ` + err;
        console.error(text);
        domNode.textContent = text;
        domNode.style.color = 'red';
      };
      // app.use(ElementPlus);

      // 挂载
      app.mount(domNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    } catch (e) {
      console.error(e.message);
    }
  }
}

/** @description vue-rss widget */
exports['vue-rss'] = RssWidget;
