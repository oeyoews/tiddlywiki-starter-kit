/*\
title: $:/plugins/oeyoews/vue-info/widget.js
type: application/javascript
module-type: widget

vue-info widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class InfoWidget extends Widget {
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
    const component = require('./component');

    const domNode = this.document.createElement('div');
    const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate');
    const TextTemplate = getTemplate(
      '$:/plugins/oeyoews/vue-info/templates/Text.vue',
    );
    try {
      /** @type {{ use: Function; component: Function }} */
      const app = createApp(component());

      const CountTo = require('./components/count');
      const Text = {
        template: TextTemplate,
        components: { CountTo },
        props: {
          text: { type: String },
          icon: { type: String },
          color: { type: String },
          number: { type: [Number, String] },
        },
      };

      app.component('Text', Text);
      app.component('CountTo', CountTo);

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

/** @description vue-info widget */
exports['vue-neotw-info'] = InfoWidget;
