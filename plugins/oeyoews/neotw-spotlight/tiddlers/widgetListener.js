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

  render() {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    if (!window.Spotlight) {
      require('spotlight.bundle.js');
    }

    const title = this.getVariable('currentTiddler');

    if (!title || title.startsWith('Draft of')) return;

    const tiddlerNode = document.querySelector(
      `[data-tiddler-title='${title}']`
    );

    const spotlightOptions = {
      control: 'autofit, close',
      animation: 'scale'
    };
    // 使用事件委托，将点击事件委托给父元素 tiddlerNode
    tiddlerNode.addEventListener('click', (event) => {
      const target = event.target;
      // 但是如果中间掺杂有空的p标签就不行了。
      if (
        target.tagName.toLowerCase() === 'img' &&
        target.parentNode.tagName.toLowerCase() !== 'a'
      ) {
        const src = target.getAttribute('src');
        Spotlight.show([
          {
            src,
            // title,
            ...spotlightOptions
          }
        ]);
      }
    });
  }
}

/**
 * @description neotw-spotlight widget
 * @param src
 */
exports.spotlightTiddler = SpotlightWidget;
