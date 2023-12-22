/*\
title: $:/plugins/oeyoews/neotw-info/widget.js
type: application/javascript
module-type: widget

neotw-info widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class InfoWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const getdata = require('./data');
    const data = getdata();

    const ejs = require('ejs.min.js');
    const template = $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-info/template.ejs',
    );

    const html = ejs.render(template, data);

    const domNode = this.document.createElement('div');
    domNode.innerHTML = html;

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description neotw-info widget
 */
exports.oinfo = InfoWidget;
