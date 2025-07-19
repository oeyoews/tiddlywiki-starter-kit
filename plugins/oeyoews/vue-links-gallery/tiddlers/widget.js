/*\
title: $:/plugins/oeyoews/vue-links-gallery/widget.js
type: application/javascript
module-type: widget

vue-links-gallery widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class VueLinkGalleryWidget extends Widget {
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
      logger.alert(
        `${vuelib} is missing, Please install neotw-vue plugin by @oeyoews`,
      );
      return;
    }

    const { createApp } = window.Vue;
    const { json } = this.attributes;

    const todoComponent = require('./component.js');

    try {
      const app = createApp(todoComponent(json));

      app.config.errorHandler = (err) => {
        const text = `[Vue3](${app.version}): ` + err;
        console.error(text);
        domNode.textContent = text;
        domNode.style.color = 'red';
      };

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

/** @description neotw-vue-links-gallery widget */
exports['vue-links-gallery'] = VueLinkGalleryWidget;
