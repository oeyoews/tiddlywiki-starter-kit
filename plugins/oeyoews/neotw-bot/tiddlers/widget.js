/*\
title: $:/plugins/oeyoews/neotw-bot/widget.js
type: application/javascript
module-type: widget

neotw-bot widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class BotWidget extends Widget {
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
    const ElementPlus = require('element-plus.min.js');

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const { tiddler } = this.attributes;

    const { createApp } = window.Vue;
    const component = require('./app');
    const domNode = this.document.createElement('div');

    try {
      /** @type {{ use: Function, component: (string, Object) }} */
      const app = createApp(
        component({
          token: $tw.wiki.getTiddlerText(tiddler) || '',
        }),
      );
      app.use(ElementPlus);

      app.config.errorHandler = (err) => {
        const text = `[Vue3](${app.version}): ` + err.message;
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

  // TIP: 界面由 vue 接管， 不要在这里刷新
  refresh() {
    return false;
  }
}

/** @description neotw-bot widget */
exports['tg-bot'] = BotWidget;
