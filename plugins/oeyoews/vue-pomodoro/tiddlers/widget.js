/*\
title: $:/plugins/oeyoews/vue-pomodoro/widget.js
type: application/javascript
module-type: widget

vue-pomodoro widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class TomatoWidget extends Widget {
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
    // const button = this.document.createElement('button');
    // button.textContent = 'x';
    const TiddlyWikiVue = require('./plugins/TiddlyWikiVue');
    const startup = this.hasAttribute('startup');

    try {
      const app = createApp(component(startup));

      // button.addEventListener('click', () => {
      //   app.unmount();
      // });
      app.use(TiddlyWikiVue);

      app.config.errorHandler = (err) => {
        const text = `[Vue3](${app.version}): ` + err;
        console.error(text);
        domNode.textContent = text;
        domNode.style.color = 'red';
      };

      // 挂载
      app.mount(domNode);
      // domNode.append(button);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    } catch (e) {
      console.error(e.message);
    }
  }
}

/** @description vue-pomodoro widget */
exports['vue-pomodoro'] = TomatoWidget;
