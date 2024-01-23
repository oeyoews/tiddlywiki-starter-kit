/*\
title: $:/plugins/oeyoews/qrcode/widget.js
type: application/javascript
module-type: widget

qrcode widget

\*/
// 1.4.4  https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js
// 1.5.1 有问题，之后的版本没有构建这个 min.js, 可以借助 modern.dev, 直接打包插件
// moderndev 打包后只有 32kb, 这里 min.js 有 54kb

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
    const ssr = parent.isTiddlyWikiFakeDom;
    if (ssr) return;

    this.computeAttributes();
    this.execute();

    const storyTiddler = this.getVariable('storyTiddler');
    const href = $tw.wiki.getTiddlerText('$:/info/url/full');
    const hashurl = encodeURIComponent(storyTiddler);
    const currentTiddlerUrl = `${href}#${hashurl}`;
    const {
      renderType,
      text = href,
      width = 512
      // size
    } = this.attributes;
    let textcontent = text;

    if (storyTiddler) {
      switch (renderType) {
        // 常用的是 url 类型
        case 'url':
          textcontent = currentTiddlerUrl;
          break;
        // rendered 类型除了支持了 wikitext 变量的渲染，其他的和 raw 没有什么区别，都是纯文本
        case 'raw':
          textcontent = $tw.wiki.getTiddlerText(storyTiddler);
          break;
        case 'rendered':
          textcontent = $tw.wiki.renderText(
            'text/plain-formatted',
            'text/vnd.tiddlywiki',
            `${$tw.wiki.getTiddlerText(storyTiddler)}`
          );
          break;
        case 'text':
          textcontent = text;
          break;
        default:
          textcontent = currentTiddlerUrl;
      }
    }

    if (!textcontent) {
      return;
    }
    QRCode.toString(
      textcontent,
      {
        type: 'terminal',
        width
      },
      (_, svgString) => {
        this.svgString = svgString;
      }
    );

    const svghashtext = encodeURIComponent(this.svgString);
    const domNode = $tw.utils.domMaker('img', {
      class: 'spotlight w-0 md:w-32',
      attributes: {
        src: `data:${this.type},${svghashtext}`
      }
    });

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
