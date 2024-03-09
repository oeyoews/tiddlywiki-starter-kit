/*\
title: $:/plugins/oeyoews/neotw-vue3/widget.js
type: application/javascript
module-type: widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

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

    // register 指令: v-focus
    app.directive('focus', {
      mounted: function (el) {
        console.log(el);
        el.focus();
      }
    });

    // should before mount
    app.config.errorHandler = (err) => {
      const text = `[Vue3](${app.version}): ` + err;
      console.error(text);
      domNode.textContent = text;
      domNode.style.color = 'red';
    };

    // @see-also: https://cn.vuejs.org/api/application.html#app-config-compileroptions-delimiters
    // app.config.compilerOptions.delimiters

    // register global component
    // @see: https://www.kuangstudy.com/bbs/1348786813594001410
    // app.component('TodoDeleteButton', TodoDeleteButton)
    // app.component('dv', {
    //   template: `<div><slot /></div>`
    // });

    // mount to domnode
    app.mount(domNode);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  refresh() {
    return false;
  }
}

/** @description neotw-vue3 example widget */
exports['vue-example'] = VueExampleWidget;
