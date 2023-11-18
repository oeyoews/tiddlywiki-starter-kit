/*\
title: $:/plugins/oeyoews/artplayer/widget.js
type: application/javascript
module-type: widget

artplayer widget
\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ArtPlayerWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const defaultURL =
      '//vodkgeyttp8.vod.126.net/cloudmusic/NjE0NDI0MjQ=/108f6ce022ef4d9b9f7f032935758e3d/19e3accd15e1594adba3045d50b5d1d9.mp4?wsSecret=f8ebb8454597800736106d4089e22c24&wsTime=1700318823';
    const { url = defaultURL } = this.attributes;
    if (typeof url === 'number') return;

    // const { Artplayer } =
    require('./artplayer.min.js');
    const options = {
      mute: true,
      autoplay: true,
      autoSize: false,
      autoMini: true,
      playbackRate: true,
      aspectRatio: true,
      // screenshot: true, // cros
      setting: true,
      hotkey: true,
      pip: true,
      mutex: true, // 无法生效
      fullscreen: true,
      fullscreenWeb: true,
      loop: true,
      subtitleOffset: true,
      playsInline: true,
      lock: true,
      fastForward: true,
      autoPlayback: true, // 保存在了localstorage
      autoOrientation: true,
      airplay: true,
    };

    const createElement = $tw.utils.domMaker;
    const playerContainer = createElement('div', {
      class: 'w-[680px] aspect-video',
      attributes: {
        id: 'artplayer-app',
      },
    });

    const domNode = createElement('div', {
      class: 'flex justify-center items-center',
      children: [playerContainer],
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);

    new Artplayer({
      container: '#artplayer-app',
      url,
      ...options,
      id: url,
    });
  }
}

/**
 * @description artplayer widget
 * @param xxx
 */
exports.artplayer = ArtPlayerWidget;
