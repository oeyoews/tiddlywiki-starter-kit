/*\
title: $:/plugins/oeyoews/neotw-swal2/widget.js
type: application/javascript
module-type: widget

neotw-swal2 widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class Swal2Widget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const options = this.attributes;

    const createElement = $tw.utils.domMaker;
    const buttonNode = createElement('button', {
      text: options.title || 'click',
    });

    buttonNode.onclick = () => {
      this.parentWidget.dispatchEvent({
        type: 'om-swal2',
        paramObject: options,
      });
    };

    parent.insertBefore(buttonNode, nextSibling);
    this.domNodes.push(buttonNode);
  }
}

exports.swal2 = Swal2Widget;
