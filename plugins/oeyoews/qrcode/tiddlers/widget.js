/*\
title: $:/plugins/oeyoews/qrcode/widget.js
type: application/javascript
module-type: widget

qrcode widget

\*/
const QRCode = require('qrcode.min.js');
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class QRCodeWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    // const canvas = this.document.createElement('canvas');

    // QRCode.toCanvas('this is a qrcode test.');

    // QRCode.toDataURL('demo.png').then((url) => {
    //   console.log(url);
    // });
    // QRCode.toString(
    //   'dmeo',
    //   {
    //     type: 'terminal',
    //     small: true,
    //   },
    //   function (err, url) {
    //     console.log(url);
    //   },
    // );

    // parent.insertBefore(canvas, nextSibling);
    // this.domNodes.push(canvas);
  }
}

/**
 * @description qrcode widget
 * @param text
 */
exports.qrcode = QRCodeWidget;
