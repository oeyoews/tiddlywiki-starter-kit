/*\
title: $:/plugins/oeyoews/tiddler-fullscreen/widget.js
type: application/javascript
module-type: widget

tiddler-fullscreen widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class FullscreenWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    // const icon = this.geticon('$:/core/images/full-screen-button');
    const svg = this.wiki.getTiddlerText(
      '$:/plugins/oeyoews/tiddler-fullscreen/icons/fullscreen'
    );

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;
    const title = this.getVariable('currentTiddler');

    const toggleElementFullscreen = require('./action');
    const domNode = document.createElement('button');
    domNode.innerHTML = svg;
    domNode.addEventListener('click', () => toggleElementFullscreen(title));

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  geticon(icon) {
    const iconwidget = $tw.wiki.makeTranscludeWidget(
      icon,
      { document: $tw.fakeDocument, parseAsInline: true } // NOTE: muse use fakedom
    );

    const container = $tw.fakeDocument.createElement('div');
    iconwidget.render(container, null);
    return container.firstChild.innerHTML;
  }
}

/** @description tiddler-fullscreen widget */
exports['fullscreen'] = FullscreenWidget;
