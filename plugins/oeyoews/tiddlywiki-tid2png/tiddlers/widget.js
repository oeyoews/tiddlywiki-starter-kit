/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/widget.js
type: application/javascript
module-type: widget

tid2png widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class Tid2PngWidget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const { text = 'export png', selector } = this.attributes;
    const title = this.getVariable('currentTiddler');

    const createElement = $tw.utils.domMaker;
    const buttonNode = createElement('button', {
      text,
    });

    buttonNode.onclick = () => {
      this.dispatchEvent({
        type: 'om-export-png',
        tiddlerTitle: title,
        selector,
      });
    };

    parent.insertBefore(buttonNode, nextSibling);
    this.domNodes.push(buttonNode);
  }
}

exports.tid2png = Tid2PngWidget;
