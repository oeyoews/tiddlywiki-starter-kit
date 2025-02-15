/*\
title: $:/plugins/oeyoews/neotw-dayjs/widget.js
type: application/javascript
module-type: widget

neotw-dayjs widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class NeotwDayjsWidget extends Widget {
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
    const timestamp = this.getAttribute('time');
    const dayjs = window.dayjs;
    const date = dayjs(timestamp, 'YYYYMMDDHHmmssSSS');
    const format = 'YYYY-MM-DD HH:mm:ss';
    const formattedDate = dayjs.utc(date.format(format)).local().format(format);

    const domNode = createElement('span');
    const past = dayjs(formattedDate);

    domNode.textContent = past.fromNow();

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description neotw-dayjs widget */
exports['neotw-dayjs'] = NeotwDayjsWidget;
