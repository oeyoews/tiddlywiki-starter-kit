/*\
title: $:/plugins/oeyoews/vue-gemini/daily/widget.js
type: application/javascript
module-type: widget

vue-gemini widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class GeminiDailyWidget extends Widget {
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

    const title = this.getVariable('currentTiddler');

    const { createApp } = window.Vue;
    const component = require('./app');
    const domNode = this.document.createElement('div');

    try {
      const app = createApp(component(title));

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
      console.error(e);
    }
  }

  // TIP: 界面由 vue 接管， 不要在这里刷新
  refresh() {
    return false;
  }
}

/** @description vue-gemini widget */
exports['vue-gemini-daily'] = GeminiDailyWidget;
