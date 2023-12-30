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

    const options = {
      target: canvas,
      max: '40',
      size: '0.8',
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
      width: '1494',
      height: '845',
      start_from_edge: false,
      respawn: true
    };

    const confetti = new ConfettiGenerator(options);
    confetti.render();

    parent.insertBefore(canvas, nextSibling);
    this.domNodes.push(canvas);
  }
}

/**
 * @description confetti-background widget
 */
exports.confettibg = ConfettiBgWidget;
