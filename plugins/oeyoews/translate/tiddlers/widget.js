/*\
title: $:/plugins/oeyoews/translate/widget.js
type: application/javascript
module-type: widget

translate widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ExampleWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const domNode = createElement('button', {
      text: 'translate'
    });

    domNode.addEventListener('click', () => this.translate());

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  async translate() {
    // TODO: support engine options
    // translate field, save, 或者直接保存到xxx-cn.tid
    // loading text
    const translate = require('./translate.min.js');
    const title = this.getVariable('currentTiddler');
    const content = $tw.wiki.getTiddlerText(title);
    const text = await translate(content, 'zh');
    $tw.wiki.setText(title, 'translate', null, text);
  }
}

/**
 * @description translate widget
 * @param xxx
 */
exports.test = ExampleWidget;
