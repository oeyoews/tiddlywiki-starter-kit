/*\
title: $:/plugins/oeyoews/neotw-vue-plugins/widget.js
type: application/javascript
module-type: widget

neotw-vue-plugins widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class TSKPLWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const { url } = this.attributes;
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

/** @description neotw-vue-plugins widget */
exports['tskpl'] = TSKPLWidget;
