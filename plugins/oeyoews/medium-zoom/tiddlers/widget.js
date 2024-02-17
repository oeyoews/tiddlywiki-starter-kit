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

  // initialise() {}
  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    if (!window.mediumZoom) {
      window.mediumZoom = require('./medium-zoom.min.js');
    }

    const images = parent?.querySelectorAll('img');

    if (!images) return;

    const filteredImages = Array.from(images).filter((item) => {
      const tagName = item.parentElement.tagName;
      if (!['A', 'BUTTON'].includes(tagName)) {
        return item;
      }
    });

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
