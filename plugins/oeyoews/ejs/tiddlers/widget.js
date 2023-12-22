/*\
title: $:/plugins/oeyoews/ejs/widget.js
type: application/javascript
module-type: widget

ejs widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class EJSWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const ejs = require('./ejs.min.js');
    const createElement = $tw.utils.domMaker;
    const people = ['geddy', 'neil', 'alex'];
    const html = ejs.render('<%= people.join(", "); %>', { people: people });

    const domNode = createElement('div', {});
    domNode.innerHTML = html;

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description ejs widget
 */
exports.ejsTest = EJSWidget;
