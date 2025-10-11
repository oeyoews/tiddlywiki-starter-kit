/*\
title: $:/plugins/oeyoews/vue-contextmenu/global-widget.js
type: application/javascript
module-type: widget

vue-contextmenu widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class GlobalContextMenuWidget extends Widget {
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
    const component = require('./global-app');
    const domNode = this.document.createElement('div');
    const TiddlyWikiVue = require('./plugins/TiddlyWikiVue');
    const ContextMenu = require('vue-context-menu.min.js').default;
    const title = this.getVariable('currentTiddler');

    /** i18n */
    const { createI18n } = require('vue-i18n.global.prod.js');
    const en = require('./i18n/en.js');
    const cn = require('./i18n/zh.js');
    const messages = {
      English: en,
      中文: cn,
    };

    const defaultLang = 'English';
    let locale = localStorage.getItem('lang');
    if (!locale) {
      locale = defaultLang;
      localStorage.setItem('lang', locale);
    }

    const i18n = createI18n({
      legacy: false,
      locale,
      fallbackLocale: defaultLang,
      messages,
    });

    try {
      const app = createApp(component(this));

      app.use(TiddlyWikiVue);
      app.use(ContextMenu);
      app.use(i18n);

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

  // TIP: 界面由 vue 接管， 不要在这里刷新
  refresh() {
    return false;
  }
}

/** @description vue-contextmenu widget */
exports['vue-global-contextmenu'] = GlobalContextMenuWidget;
