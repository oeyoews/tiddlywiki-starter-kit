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

    const options = this.attributes;
    const title = this.getVariable('currentTiddler');

    const createElement = $tw.utils.domMaker;
    const buttonNode = createElement('button', {
      text: options.text || title
    });

    buttonNode.onclick = () => {
      this.dispatchEvent({
        type: 'om-export-png',
        paramObject: options,
        tiddlerTitle: title
      });
    };

    parent.insertBefore(buttonNode, nextSibling);
    this.domNodes.push(buttonNode);
  }
}

exports.tid2png = Tid2PngWidget;
