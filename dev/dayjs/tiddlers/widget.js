/*\
title: $:/plugins/oeyoews/dayjs/widget.js
type: application/javascript
module-type: widget

dayjs widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class DayjsWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    const dayjs = require('./dayjs.min.js');

    const attr = this.attributes;
    const time = dayjs(attr.date).format();
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const btn = createElement('button', {
      text: time + attr.date,
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

/** @description dayjs widget */
exports['widget-VjLNgOnCO4'] = DayjsWidget;
