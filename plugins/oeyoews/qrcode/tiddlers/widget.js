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

    // canvas 的清晰度不如svg
    // const canvas = this.document.createElement('canvas');
    // QRCode.toCanvas(canvas, 'this is a qrcode test.', {
    //   width: 512,
    // });

    const parser = new DOMParser();
    const storyTiddler = this.getVariable('storyTiddler');
    const href = location.href;
    const hashurl = encodeURIComponent(storyTiddler);
    const currentTiddlerUrl = `${href}#${hashurl}`;
    const {
      renderType,
      text = renderType === 'url' && storyTiddler
        ? currentTiddlerUrl
        : $tw.wiki.getTiddlerText('$:/info/url/full'),
      width = 256,
      title = 'info-qrcode.svg',
      save = false,
      // modal = false,
      //   timestamp = false
    } = this.attributes;
    let domNode;

    const tmpTiddlerTitle = '$:/temp/svgTiddler';
    const generateSvgtiddler = (title, text = this.svgString) => {
      $tw.wiki.addTiddler({
        type: this.type,
        title,
        text,
      });
    };

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

    save === 'true' && generateSvgtiddler(title);
    const svgDoc = parser.parseFromString(this.svgString, this.type);

    domNode = svgDoc.documentElement;

    // domNode.addEventListener('click', () => {
    //   generateSvgtiddler(tmpTiddlerTitle);
    //   this.parentWidget.dispatchEvent({
    //     type: 'tm-modal',
    //     param: tmpTiddlerTitle,
    //   });
    // });

    // if (!modal) {
    //   domNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 21H4a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h4a1 1 0 0 0 0-2Zm14-6a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 0 0 2h4a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1ZM20 1h-4a1 1 0 0 0 0 2h4a1 1 0 0 1 1 1v4a1 1 0 0 0 2 0V4a3 3 0 0 0-3-3ZM2 9a1 1 0 0 0 1-1V4a1 1 0 0 1 1-1h4a1 1 0 0 0 0-2H4a3 3 0 0 0-3 3v4a1 1 0 0 0 1 1Zm8-4H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM9 9H7V7h2Zm5 2h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Zm1-4h2v2h-2Zm-5 6H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Zm-1 4H7v-2h2Zm5-1a1 1 0 0 0 1-1a1 1 0 0 0 0-2h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Zm-4 4a1 1 0 1 0 1 1a1 1 0 0 0-1-1Z"/></svg>`;
    // }

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
