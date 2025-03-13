/*\
title: $:/plugins/oeyoews/json-viewer/widget.js
type: application/javascript
module-type: widget

json-viewer widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class JsonViewerWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;
    require('./json-viewer');

    const tiddler = this.getAttribute('tiddler');
    if (!tiddler) return;
    if (!$tw.wiki.tiddlerExists(tiddler)) {
      console.error(`${tiddler} tiddler not exists`);
      return;
    }
    if ($tw.wiki.getTiddler(tiddler).fields.type !== 'application/json') {
      console.error(`${tiddler} tiddler type is not application/json`);
      return;
    }
    const data = $tw.wiki.getTiddlerAsJson(tiddler);

    const createElement = $tw.utils.domMaker;

    const domNode = createElement('json-viewer', {});

    domNode.setAttribute('data', data);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description json-viewer widget */
exports['json-viewer'] = JsonViewerWidget;
