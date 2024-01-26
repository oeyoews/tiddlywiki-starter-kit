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

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();
    if (!window.mediumZoom) {
      window.mediumZoom = require('./medium-zoom.min.js');
    }

    /* const ssr = parent.isTiddlyWikiFakeDom;
    if (ssr) return; */
    const title = this.getVariable('currentTiddler');

    if (!title || title.startsWith('Draft of')) return;

    const tiddlerNode = document.querySelector(
      `[data-tiddler-title='${title}']`
    );

    tiddlerNode.addEventListener('click', (event) => {
      const target = event.target;
      if (
        target.tagName.toLowerCase() === 'img' &&
        target.parentNode.tagName.toLowerCase() !== 'a'
      ) {
        const zoom = mediumZoom(target, {
          margin: 24,
          background: 'green',
          scrollOffset: 0
        });
        zoom.toggle();
      }
    });
  }
}

/** @description medium-zoom widget */
exports['widget-J7VjxGaRPP'] = ExampleWidget;
