/*\
title: $:/plugins/oeyoews/qrcode/widget.js
type: application/javascript
module-type: widget

qrcode widget

\*/
// 1.4.4  https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js
// 1.5.1 有问题, 之后的版本没有构建这个min.js, 可以借助modern.dev, 直接打包插件
// moderndev 打包后只有32kb, 这里min.js 有54kb
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

    // canvas 的清晰度不如svg
    // const canvas = this.document.createElement('canvas');
    // QRCode.toCanvas(canvas, 'this is a qrcode test.', {
    //   width: 512,
    // });

    const parser = new DOMParser();
    const type = 'image/svg+xml';
    const {
      text = $tw.wiki.getTiddlerText('$:/info/url/full'),
      width = 256,
      // title = 'tiddlywiki-starter-kit-qrcode.svg',
      //   save = false,
      //   timestamp = false
    } = this.attributes;
    let domNode;

    QRCode.toString(
      text,
      {
        type: 'terminal',
        width,
      },
      (_, svgString) => {
        //  $tw.wiki.addTiddler({
        //     type,
        //     title,
        //     text: svgString,
        //   });
        const svgDoc = parser.parseFromString(svgString, type);
        domNode = svgDoc.documentElement;
      },
    );

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description qrcode widget
 * @param text
 * @param width
 */
exports.qrcode = QRCodeWidget;
