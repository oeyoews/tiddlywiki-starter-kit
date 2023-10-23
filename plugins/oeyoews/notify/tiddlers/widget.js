/*\
title: $:/plugins/oeyoews/notify/widget.js
type: application/javascript
module-type: widget

notify widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
// const defaultOptions = require('./options');
// const { Notify } = require('simple-notify.min.js');

class NotifyWidget extends Widget {
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
      // new Notify(Object.assign({}, defaultOptions, options));
      this.parentWidget.dispatchEvent({
        type: 'om-notify',
        title: 'hihhh',
      });
    };

    parent.insertBefore(buttonNode, nextSibling);
    this.domNodes.push(buttonNode);
  }
}

exports.notify = NotifyWidget;
