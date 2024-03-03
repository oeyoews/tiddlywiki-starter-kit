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

    const todoComponent = require('./component.js');

    const app = createApp(todoComponent);

    // should before mount
    app.config.errorHandler = (err) => {
      const text = `[Vue3](${app.version}): ` + err;
      console.error(text);
      domNode.textContent = text;
      domNode.style.color = 'red';
    };

    // @see-also: https://cn.vuejs.org/api/application.html#app-config-compileroptions-delimiters
    // app.config.compilerOptions.delimiters

    // 注册全局组件
    // app.component('TodoDeleteButton', TodoDeleteButton)

    // app.directive('focus', {
    //   mounted(el) {
    //     el.focus();
    //   }
    // });

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
