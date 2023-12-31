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
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const ConfettiGenerator = require('./confetti.min.js');

    const canvas = this.document.createElement('canvas');

    const {
      width = window.innerWidth,
      height = window.innerHeight,
      size = '0.8'
    } = this.attributes;
    const options = {
      target: canvas,
      max: '40',
      size,
      animate: true,
      props: ['circle'],
      colors: [
        [165, 104, 246],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126]
      ],
      clock: '5',
      rotate: false,
      start_from_edge: false,
      respawn: true,
      width,
      height
    };

    const confetti = new ConfettiGenerator(options);
    // confetti.clear()
    confetti.render();

    parent.insertBefore(canvas, nextSibling);
    this.domNodes.push(canvas);
  }

  refresh() {
    return false;
  }
}

/**
 * @description confetti-background widget
 */
exports.confettibg = ConfettiBgWidget;
