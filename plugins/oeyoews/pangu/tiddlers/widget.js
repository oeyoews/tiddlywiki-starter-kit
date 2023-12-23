/*\
title: $:/plugins/oeyoews/pangu/widget.js
type: application/javascript
module-type: widget

pangu widget

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

    const svg =
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V1H6.5a3.5 3.5 0 0 0 0 7H8v5H7v1h5v-1h-1V2h1zM8 7H6.5a2.5 2.5 0 1 1 0-5H8v5zm2 6H9V2h1v11z"></path></svg>';

    const domNode = createElement('button', {
      title: 'format tiddler',
    });
    domNode.innerHTML = svg;

    // TODO: if not use arrow function, need change this binding manually or change title position
    domNode.addEventListener('click', () => this.formatTiddler());

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  formatTiddler() {
    const title = this.getVariable('currentTiddler');
    const pangu = require('./pangu.min.js');
    const text = $tw.wiki.getTiddlerText(title);
    const formatedText = pangu.spacing(text);
    if (text === formatedText) {
      return;
    }
    $tw.wiki.setText(title, 'text', null, formatedText, {
      suppressTimestamp: true,
    });
  }
}

/**
 * @description pangu widget
 */
exports.test = ExampleWidget;
