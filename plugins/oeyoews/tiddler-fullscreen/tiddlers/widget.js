/*\
title: $:/plugins/oeyoews/tiddler-fullscreen/widget.js
type: application/javascript
module-type: widget

tiddler-fullscreen widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class FullscreenWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    // const ssr = parent.isTiddlyWikiFakeDom;
    // if (ssr) return;

    const createElement = $tw.utils.domMaker;

    const title = this.getVariable('currentTiddler');

    const btn = createElement('button', {
      text: 'ToggleFullscreen'
    });

    btn.addEventListener('click', () => {
      if (document.fullscreenElement === null) {
        const target = document.querySelector(
          `[data-tiddler-title="${title}"]`
        );
        target.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    const domNode = createElement('div', {
      children: [btn]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description tiddler-fullscreen widget */
exports['fullscreen'] = FullscreenWidget;
