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
    // 暂时还没有处理图片链接
    const images = tiddlerNode.querySelectorAll('img');

    mediumZoom(images);
  }
}

/** @description medium-zoom widget */
exports['medium-zoom'] = ExampleWidget;
