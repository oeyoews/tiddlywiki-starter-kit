/*\
title: $:/plugins/oeyoews/medium-zoom/widget.js
type: application/javascript
module-type: widget

medium-zoom widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class MediumZoomWidget extends Widget {
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

  refresh(changedTiddlers) {
    if (
      Object.keys(changedTiddlers).filter((item) =>
        item.startsWith('$:/state/tab')
      ).length > 0
    ) {
      this.refreshSelf();
      return true;
    } else {
      return false;
    }
  }
}

/** @description medium-zoom widget */
exports['medium-zoom'] = MediumZoomWidget;
