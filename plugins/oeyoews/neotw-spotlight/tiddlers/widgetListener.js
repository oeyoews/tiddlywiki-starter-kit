/*\
title: $:/plugins/oeyoews/neotw-spotlight/widget.js
type: application/javascript
module-type: widget

neotw-spotlight widget
\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class SpotlightWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    if (!window.Spotlight) {
      require('spotlight.bundle.js');
    }

    const spotlightOptions = {
      control: 'autofit, close',
      animation: 'scale'
    };

    parent.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'IMG' && target.parentNode.tagName !== 'A') {
        const src = target.getAttribute('src');
        Spotlight.show([
          {
            src,
            ...spotlightOptions
          }
        ]);
      }
    });
  }
}

exports.spotlightTiddler = SpotlightWidget;
