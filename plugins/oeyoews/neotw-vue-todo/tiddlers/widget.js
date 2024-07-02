/*\
title: $:/plugins/oeyoews/neotw-vue-todo/widget.js
type: application/javascript
module-type: widget

neotw-vue-todo widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

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

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    if (!window.Vue) {
      // if (!$tw.modules.titles[vuelib]) {
      logger.alert(
        `${vuelib} is missing, Please install neotw-vue plugin by @oeyoews`,
      );
      return;
      // }
    }

    // i18n
    const VueI18n = require('vue-i18n.global.prod.js');
    window.VueI18n = VueI18n;

    // vue ui lib
    // const vant = require('vant.min.js');
    // window.vant = vant;

    // this.setVariable('tv-enable-drag-and-drop', 'no');

    const { createApp } = window.Vue;
    const { json } = this.attributes;

    const todoComponent = require('./component.js');
    const { VueDraggable, vDraggable } = require('draggableplus.js');

    try {
      const app = createApp(todoComponent(json));

      app.component('VueDraggable', VueDraggable);
      window.app = app;

      const en = require('./i18n/en.js');
      const cn = require('./i18n/cn.js');
      const ja = require('./i18n/ja.js');
      const fr = require('./i18n/fr.js');
      const ru = require('./i18n/ru.js');
      const messages = {
        English: en,
        中文: cn,
        日本語: ja,
        Français: fr,
        Русский: ru,
      };

      let locale = localStorage.getItem('lang');
      if (!locale) {
        locale = 'English';
        localStorage.setItem('lang', locale);
      }

      const i18n = VueI18n.createI18n({
        legacy: false,
        locale,
        fallbackLocale: 'English', // 设置本来的语言
        messages,
      });

      const {
        createNotivue,
      } = require('$:/plugins/oeyoews/notivue/notivue.js');

      const notivue = createNotivue({
        position: 'top-center',
        limit: 3,
        enqueue: true,
        notifications: {
          global: {
            duration: 1500,
          },
        },
      });

      app.use(i18n);
      app.use(notivue);

      app.directive('draggable', vDraggable);

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

/** @description neotw-vue-todo widget */
exports['vue-todo'] = VueTodoWidget;
