/*\
title: $:/plugins/oeyoews/neotw-vue-todo/widget.js
type: application/javascript
module-type: widget

neotw-vue-todo widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

/** @preserve */
class VueTodoWidget extends Widget {
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

    const domNode = createElement('div', {});

    if (!window.Vue) {
      window.Vue = require('$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js');
    }

    if (!window.Vue) return;

    const { createApp } = window.Vue;
    const { json } = this.attributes;

    const todoComponent = require('./component.js');

    const app = createApp(todoComponent(json));

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
  }

  refresh() {
    return false;
  }
}

/** @description neotw-vue3 widget */
exports['vue-todo'] = VueTodoWidget;
