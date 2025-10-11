/*\
title: $:/plugins/oeyoews/neotw-tour/widget.js
type: application/javascript
module-type: widget

neotw-tour widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class TourWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.steps = [];
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    if (this.document.isTiddlyWikiFakeDom) return;
    this.computeAttributes();
    this.execute();

    const {
      tiddler: targetTiddler = '$:/plugins/oeyoews/neotw-tour/demo.json',
      text = 'Tour Guide'
    } = this.attributes;

    this.steps = $tw.wiki.getTiddlerData(targetTiddler);

    const domNode = $tw.utils.domMaker('button', {
      text,
      eventListeners: [
        {
          name: 'click',
          handlerObject: this,
          handlerMethod: 'handlerClick'
        }
      ]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  handlerClick() {
    // 高亮元素
    const driverObj = driver({
      // option config TODO
      showProgress: true,
      animate: true,
      showButtons: ['next', 'previous', 'close'],
      allowClose: true,
      /* nextBtnText: '➡️',
        prevBtnText: '⬅️',
        doneBtnText: '❌', */
      // overlayColor: 'red',
      steps: this.steps
    });
    driverObj.drive();

    !this.steps && this.highlightWarning();
  }

  highlightWarning() {
    driverObj.highlight({
      // element: document.querySelector('h1'),
      popover: {
        description:
          "<img src='https://cdn-icons-png.flaticon.com/128/6598/6598519.png' style='height: 202.5px; width: 270px;' />"
        // title: 'Page Heading',
        // description: 'This is the main heading of the page.',
        // position: 'left',
      }
    });
  }
}

exports.tour = TourWidget;
