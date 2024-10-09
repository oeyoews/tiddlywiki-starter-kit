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

/**
 * @description The type of content to render in the QR code.
 * @enum {'url' | 'raw' | 'rendered' | 'text'}
 */
const RenderType = {
  /** @type {'url'} */
  URL: 'url',
  /** @type {'raw'} */
  RAW: 'raw',
  /** @type {'rendered'} */
  RENDERED: 'rendered',
  /** @type {'text'} */
  TEXT: 'text',
};

/**
 * @typedef {Object} QRCodeWidgetAttributes
 * @property {string} [text] - The text to encode in the QR code.
 * @property {number} [width=512] - The width of the QR code.
 * @property {string} [avatarSrc] - The URL of the avatar image.
 * @property {RenderType} renderType - The type of content to render in the QR code.
 */

class QRCodeWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.type = 'image/png';
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
      width = 512,
      avatarSrc, // 头像图片的 URL
    } = /** @type {QRCodeWidgetAttributes} */ (this.attributes);
    let textcontent = text;

    if (storyTiddler) {
      switch (renderType) {
        case RenderType.URL:
          textcontent = currentTiddlerUrl;
          break;
        case RenderType.RAW:
          textcontent = $tw.wiki.getTiddlerText(storyTiddler);
          break;
        case 'rendered':
          textcontent = $tw.wiki.renderText(
            'text/plain-formatted',
            'text/vnd.tiddlywiki',
            `${$tw.wiki.getTiddlerText(storyTiddler)}`,
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

    const canvas = document.createElement('canvas');
    QRCode.toCanvas(
      canvas,
      textcontent,
      {
        width,
      },
      (error) => {
        if (error) {
          console.error(error);
          return;
        }

        if (avatarSrc) {
          const context = canvas.getContext('2d');
          const avatar = new Image();
          avatar.crossOrigin = 'Anonymous'; // 允许跨域
          avatar.src = avatarSrc;

          avatar.onload = () => {
            const avatarSize = width / 5; // 头像大小为二维码大小的1/5
            const avatarX = (canvas.width - avatarSize) / 2;
            const avatarY = (canvas.height - avatarSize) / 2;
            // 创建圆形剪切路径
            context.save();
            context.beginPath();
            context.arc(
              avatarX + avatarSize / 2,
              avatarY + avatarSize / 2,
              avatarSize / 2,
              0,
              Math.PI * 2,
              false,
            );
            context.clip();

            // 绘制头像
            context.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
            context.restore();

            const domNode = $tw.utils.domMaker('img', {
              class: 'spotlight w-0 md:w-32',
              attributes: {
                src: canvas.toDataURL(this.type),
              },
            });

            parent.insertBefore(domNode, nextSibling);
            this.domNodes.push(domNode);
          };
        } else {
          const domNode = $tw.utils.domMaker('img', {
            class: 'spotlight w-0 md:w-32',
            attributes: {
              src: canvas.toDataURL(this.type),
            },
          });

          parent.insertBefore(domNode, nextSibling);
          this.domNodes.push(domNode);
        }
      },
    );
  }
}

/**
 * @description qrcode widget
 * @param text
 * @param width
 * @param renderType
 * @param avatarSrc 头像图片的 URL
 */
exports.qrcode = QRCodeWidget;
