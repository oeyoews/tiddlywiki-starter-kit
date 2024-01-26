/*\
title: $:/plugins/oeyoews/medium-zoom/widget.js
type: application/javascript
module-type: widget

medium-zoom widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ExampleWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render() {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();
    if (!window.mediumZoom) {
      window.mediumZoom = require('./medium-zoom.min.js');
    }

    const title = this.getVariable('currentTiddler');

    if (!title || title.startsWith('Draft of')) return;

    const tiddlerNode = document.querySelector(
      `[data-tiddler-title='${title}']`
    );
    const images = tiddlerNode.querySelectorAll('img');

    // Nodelist array to array
    const filteredImages = Array.from(images).filter(
      (item) => item.parentElement.tagName !== 'A'
    );

    mediumZoom(filteredImages);
  }
}

/** @description medium-zoom widget */
exports['medium-zoom'] = ExampleWidget;
