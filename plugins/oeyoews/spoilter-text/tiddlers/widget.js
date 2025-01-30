/*\
title: $:/plugins/oeyoews/spoilter-text/widget.js
type: application/javascript
module-type: widget

spoilter-text widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class SpoilerText extends Widget {
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

    const domNode = createElement('span');
    domNode.textContent = this.getAttribute('text');
    domNode.classList.add('spoiler');

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);

    domNode.addEventListener('click', () => {
      domNode.classList.toggle('revealed');
    });
  }
}

/** @description spoilter-text widget */
exports['spoiler-text'] = SpoilerText;
exports['s-t'] = SpoilerText;
