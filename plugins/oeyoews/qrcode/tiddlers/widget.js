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
    this.svgString = null;
    this.type = 'image/svg+xml';
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const storyTiddler = this.getVariable('storyTiddler');
    const href = location.href;
    const hashurl = encodeURIComponent(storyTiddler);
    const currentTiddlerUrl = `${href}#${hashurl}`;
    const {
      renderType,
      text = renderType === 'url' && storyTiddler ? currentTiddlerUrl : href,
      width = 256,
    } = this.attributes;

    QRCode.toString(
      text,
      {
        type: 'terminal',
        width,
      },
      (_, svgString) => {
        this.svgString = svgString;
      },
    );

    const domNode = this.document.createElement('img');
    const svghashtext = encodeURIComponent(this.svgString);
    domNode.src = `data:${this.type},${svghashtext}`;
    domNode.className = 'spotlight';

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description qrcode widget
 * @param text
 * @param width
 * @param renderType
 */
exports.qrcode = QRCodeWidget;
