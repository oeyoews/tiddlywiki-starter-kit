/*\
title: $:/plugins/oeyoews/neotw-vue-codeblock/widget.js
type: application/javascript
module-type: widget

neotw-vue-codeblock widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class VueCodeBlockWIdget extends Widget {
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

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const { createApp } = window.Vue;
    const component = require('./app');
    const domNode = this.document.createElement('div');
    const { code } = this.attributes;

    try {
      const app = createApp(component(code));

      const {
        createNotivue,
      } = require('$:/plugins/oeyoews/notivue/notivue.js');

      const notivue = createNotivue({
        position: 'top-center',
        limit: 3,
        enqueue: true,
        notifications: {
          global: {
            duration: 1500,
          },
        },
      });

      app.use(notivue);

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

/** @description neotw-vue-codeblock widget */
exports['vue-cta'] = VueCodeBlockWIdget;
