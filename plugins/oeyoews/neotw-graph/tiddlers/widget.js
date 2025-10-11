/*\
title: $:/plugins/oeyoews/neotw-graph/widget.js
type: application/javascript
module-type: widget

neotw-graph widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const renderNode = require('./render');
const convertTagMap = require('./convertTagMap');

class NeotwGraphWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();
    const tagMap = $tw.wiki.getTagMap();
    const tags = $tw.wiki.filterTiddlers('[!is[system]is[tag]]');
    const tiddlers = convertTagMap(tagMap, tags);

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    const domNode = createElement('div');
    domNode.className = 'w-12 h-1/2';

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
    renderNode(domNode, tiddlers);
  }
}

/** @description neotw-graph widget */
exports['force-graph'] = NeotwGraphWidget;
