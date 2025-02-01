/*\
title: $:/plugins/oeyoews/spoiler-text/widget.js
type: application/javascript
module-type: widget

spoiler-text widget

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
    /** @type {'click' | 'dblclick'} */
    let listenerType = 'click';

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    const domNode = createElement('span');
    if (this.hasAttribute('tiddler')) {
      listenerType = 'dblclick';
      domNode.innerHTML = $tw.wiki.renderTiddler(
        'text/html',
        this.getAttribute('tiddler'),
        {
          parseAsInline: true,
        },
      );
    } else {
      domNode.innerHTML = this.getAttribute('text');
    }
    domNode.classList.add('spoiler');

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);

    domNode.addEventListener(listenerType, () => {
      domNode.classList.toggle('revealed');
    });
  }
}

/** @description spoiler-text widget */
exports['spoiler-text'] = SpoilerText;
exports['s-t'] = SpoilerText;
