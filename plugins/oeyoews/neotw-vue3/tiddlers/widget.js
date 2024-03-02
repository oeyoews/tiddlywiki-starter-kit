/*\
title: $:/plugins/oeyoews/neotw-vue3/widget.js
type: application/javascript
module-type: widget

neotw-vue3 widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ExampleWidget extends Widget {
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

    const btn = createElement('button', {
      text: '{{ message}}',
      class: 'rounded p-1'
    });

    btn.id = 'app';

    const domNode = createElement('div', {
      children: [btn]
    });

    const Vue = require('./vue.global.prod.js');
    const exampleComponent = require('./components.js');
    const { createApp } = Vue;
    const app = createApp(exampleComponent);

    app.config.errorHandler = (err) => {
      console.error('[Vue3]: ' + err);
    };

    // 注册全局组件
    // app.component('TodoDeleteButton', TodoDeleteButton)
    app.mount(domNode);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description neotw-vue3 widget */
exports['vue-example'] = ExampleWidget;
