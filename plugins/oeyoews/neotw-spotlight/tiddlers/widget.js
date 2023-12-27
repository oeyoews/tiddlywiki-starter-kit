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

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    if (!window.Spotlight) {
      require('spotlight.bundle.js');
    }

    const { src, title = '', alt = '', classname } = this.attributes;
    const createElement = $tw.utils.domMaker;

    const domNode = createElement('img', {
      attributes: {
        class: classname + ' not-prose rounded',
        src,
        title,
        alt
      }
    });

    const spotlightOptions = {
      control: 'autofit, close',
      animation: 'scale'
      // download: true,
    };

    domNode.addEventListener('click', () => {
      Spotlight.show([
        {
          src,
          title,
          ...spotlightOptions
        }
      ]);
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description neotw-spotlight widget
 * @param src
 */
exports.spotlight = SpotlightWidget;
