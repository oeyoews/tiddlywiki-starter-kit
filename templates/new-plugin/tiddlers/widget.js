/*\
title: $:/plugins/{{ plugin_author }}/${pluginname}/widget.js
type: application/javascript
module-type: widget

${pluginname} widget

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

    const createElement = $tw.utils.domMaker;

    const btn = createElement('button', {
      text: 'Click me',
      class: 'rounded p-1'
    });

    const domNode = createElement('div', {
      // text: 'example',
      // class: 'underline font-bold',
      children: [btn]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description ${pluginname} widget */
exports['{{ widget_name }}'] = ExampleWidget;
