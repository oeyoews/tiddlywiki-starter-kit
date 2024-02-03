/*\
title: $:/plugins/oeyoews/tiddlywiki-prettier/widget.js
type: application/javascript
module-type: widget

tiddlywiki-prettier widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class PrettierWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.prettier = null;
    this.plugins = null;
    this.formatedText = '';
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    this.computeAttributes();
    this.execute();

    if (!window.prettier) {
      return;
    }
    if (!window.prettierPlugins) {
      return;
    }

    this.prettier = window.prettier;
    this.plugins = window.prettierPlugins;

    if (!this.plugins.markdown) {
      console.warn('Miss prettier markdown plugin');
      return;
    }

    const createElement = $tw.utils.domMaker;

    const btn = createElement('button', {
      text: 'format'
    });

    btn.addEventListener('click', async () => {
      this.formatedText = await this.format('one 测试，', 'markdown');
      console.log(this.formatedText);
    });

    const domNode = createElement('div', {
      children: [btn]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
  async format(text, type) {
    const formatedText = await this.prettier.format(text, {
      parser: type,
      plugins: [this.plugins[type]]
    });
    return formatedText;
  }
}

/** @description tiddlywiki-prettier widget */
exports['widget-xKmqEelY6V'] = PrettierWidget;
