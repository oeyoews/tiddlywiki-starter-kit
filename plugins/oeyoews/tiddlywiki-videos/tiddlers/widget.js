/*\
title: $:/plugins/oeyoews/tiddlywiki-videos/videos-widget.js
type: application/javascript
module-type: widget

youtube widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class VideoWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    // fakedom will cause widget preview error
    const createElement = $tw.utils.domMaker;

    const {
      youtubeId = 'o7GyFa90klg',
      url, // TODO: support youtube url directly(not embed url, use replace to adjudge that)
      bvid,
      yid = youtubeId,
      title
    } = this.attributes;

    // 创建一个对象来映射不同视频来源
    const videoSources = {
      youtube: {
        prefix: 'https://www.youtube.com/embed/',
        id: yid
      },
      bilibili: {
        prefix: 'https://player.bilibili.com/player.html?bvid=',
        // aid=792307371&bvid=BV1LC4y1Q7Kr&cid=1366942100
        id: bvid
      }
    };

    const isBilibili = this.hasAttribute('bvid');
    const isYouTube =
      this.hasAttribute('yid') || this.hasAttribute('youtubeId');

    const selectedSource = isBilibili
      ? videoSources.bilibili
      : videoSources.youtube;

    const { prefix, id } = selectedSource;

    // 如果没有 bvid 或 yid 属性，则使用 url
    const src = isBilibili || isYouTube ? prefix + id : url;

    // Create an object to represent the iframe attributes
    const iframeAttributes = {
      src,
      width: 800,
      height: 450,
      frameborder: 0,
      allowfullscreen: '',
      class: 'border-none shadow rounded-lg',
      allowsInlineMediaPlayback: 'true',
      playsinline: '1',
      title: this.getVariable('currentTiddler') || 'video'
    };

    const iframeNode = this.document.createElement('iframe');

    const domNode = createElement('div', {
      class: 'my-4 blur hover:blur-none transition mx-auto text-center',
      children: [iframeNode]
    });

    Object.entries(iframeAttributes).forEach(([key, value]) => {
      iframeNode.setAttribute(key, value);
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

exports.video = VideoWidget;
exports.youtube = VideoWidget;
exports.yt = VideoWidget;
