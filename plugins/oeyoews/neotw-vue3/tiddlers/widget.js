/*\
title: $:/plugins/oeyoews/neotw-vue3/widget.js
type: application/javascript
module-type: widget

neotw-vue3 widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

/** @preserve */
class VueExampleWidget extends Widget {
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
      window.Vue = require('./vue.global.prod.js');
    }

    if (!window.Vue) return;

    const { createApp } = window.Vue;

    const exampleComponent = require('./components.js');

    const app = createApp(exampleComponent);
    // app.use(vant).use(vant.Popup).use(vant.Calendar);
    // app.use(vant.Lazyload);
    // 调用工具函数，弹出一个 Toast
    // vant.showToast('vant tips popup');

    // 注册v-focus指令
    // app.directive('focus', {
    //   mounted(el) {
    //     el.focus();
    //   }
    // });

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
    // https://www.kuangstudy.com/bbs/1348786813594001410
    // app.component('dv', {
    //   template: `<div><slot /></div>`
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
exports['vue-example'] = VueExampleWidget;
