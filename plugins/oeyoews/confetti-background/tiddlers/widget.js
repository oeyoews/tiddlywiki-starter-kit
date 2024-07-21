/*\
title: $:/plugins/oeyoews/confetti-background/widget.js
type: application/javascript
module-type: widget

confetti-background widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ConfettiBgWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ConfettiGenerator = require('./confetti.min.js');

    const canvasNode = this.document.createElement('canvas');
    if (canvasNode.isTiddlyWikiFakeDom) return;

    const {
      width = window.innerWidth,
      height = window.innerHeight,
      size = '0.8',
    } = this.attributes;
    const options = {
      target: canvasNode,
      max: '25',
      size,
      animate: true,
      props: ['circle'],
      colors: [
        [165, 104, 246],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126],
      ],
      clock: '3',
      rotate: true,
      start_from_edge: false,
      respawn: true,
      width,
      height,
    };

    const confetti = new ConfettiGenerator(options);
    // confetti.clear()
    confetti.render();

    parent.insertBefore(canvasNode, nextSibling);
    this.domNodes.push(canvasNode);
  }

  refresh() {
    return false;
  }
}

/**
 * @description confetti-background widget
 */
exports.confettibg = ConfettiBgWidget;
