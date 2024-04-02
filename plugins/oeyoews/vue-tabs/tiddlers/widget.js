/*\
title: $:/plugins/oeyoews/vue-tabs/widget.js
type: application/javascript
module-type: widget

vue-tabs widget

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

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const VueI18n = require('vue-i18n.global.prod.js');
    window.VueI18n = VueI18n;

    const { createApp } = window.Vue;
    const component = require('./app');
    const domNode = this.document.createElement('div');
    const TODOPlugin = require('./plugins/TODOPlugin');

    const ContextMenu = require('vue-context-menu.min.js').default;

    try {
      const app = createApp(component());

      app.use(TODOPlugin);

      const en = require('./i18n/en.js');
      const cn = require('./i18n/zh.js');
      // const ja = require('./i18n/ja.js');
      // const fr = require('./i18n/fr.js');
      // const ru = require('./i18n/ru.js');
      const messages = {
        English: en,
        中文: cn,
        // 日本語: ja,
        // Français: fr,
        // Русский: ru
      };

      let locale = localStorage.getItem('lang');
      if (!locale) {
        locale = 'English';
        // TODO: 需要考虑到lang 已被其他插件使用产生的字段冲突
        localStorage.setItem('lang', locale);
      }

      const i18n = VueI18n.createI18n({
        legacy: false,
        locale,
        fallbackLocale: 'English', // 设置本来的语言
        messages,
      });

      app.use(i18n);
      app.use(ContextMenu);

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

  refresh() {
    return false;
  }
}

/** @description vue-tabs widget */
exports['vue-tabs'] = ExampleWidget;
