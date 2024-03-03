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

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';
    const logger = new $tw.utils.Logger('neotw-vue-todo');

    if (!$tw.modules.titles[vuelib]) {
      logger.alert(
        `${vuelib} is missing, Please install neotw-vue plugin by @oeyoews`
      );
      return;
    }
    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    if (!window.Vue) return;

    // i18n
    const VueI18n = require('vue-i18n.global.prod.js');
    window.VueI18n = VueI18n;

    // vue ui lib
    // const vant = require('vant.min.js');
    // window.vant = vant;

    const { createApp } = window.Vue;
    const { json } = this.attributes;

    const todoComponent = require('./component.js');

    const app = createApp(todoComponent(json));

    const en = require('./i18n/en');
    const cn = require('./i18n/cn');
    const messages = {
      en,
      cn
    };
    const i18n = VueI18n.createI18n({
      locale: localStorage.getItem('lang') || 'zh',
      fallbackLocale: 'en', // 设置本来的语言
      messages
    });

    app.use(i18n);
    // .use(vant).use(vant.Notify);

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
