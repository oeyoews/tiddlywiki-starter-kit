/*\
title: $:/plugins/oeyoews/vue-friendly-link/widget.js
type: application/javascript
module-type: widget

vue-friendly-link widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class VueFriendlyWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    const domNode = createElement('div');

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const { createApp } = window.Vue;
    const { json } = this.attributes;

    const friendlyComponent = require('./app.js');
    try {
      const app = createApp(friendlyComponent(json));

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

  refresh() {
    return false;
  }
}

/** @description neotw-vue-todo widget */
exports['vue-friendly-link'] = VueFriendlyWidget;
