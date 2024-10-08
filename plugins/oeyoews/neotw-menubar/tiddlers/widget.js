/*\
title: $:/plugins/oeyoews/neotw-menubar/widget.js
type: application/javascript
module-type: widget

neotw-menubar widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class MenuBarWidget extends Widget {
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

    const Icon = require('./components/Icon.js');

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const { createApp } = window.Vue;
    const component = require('./app');
    const domNode = this.document.createElement('div');
    // domNode.className = 'shadow-sm';
    const TiddlyWikiVue = require('./plugins/TiddlyWikiVue');

    try {
      /** @type {{ use: Function }} */
      const app = createApp(component());
      app.use(TiddlyWikiVue);
      app.component('Icon', Icon);

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

/** @description neotw-menubar widget */
exports['vue-menubar'] = MenuBarWidget;
