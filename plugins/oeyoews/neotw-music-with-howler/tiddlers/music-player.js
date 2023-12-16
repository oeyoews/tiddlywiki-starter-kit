/*\
title: $:/plugins/oeyoews/neotw-music-with-howler/music-player.js
type: application/javascript
module-type: widget

neotw-music-with-howler widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class MusicWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.duration = null;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    // TODO: use api to get random id
    // TODO: support tiddler mid field
    const { id = '1947926942', autoplay = 'false' } = this.attributes;
    const { Howl } = require('howler.min.js');

    const baseURL = 'https://music.163.com/song/media/outer/url?id=';
    const src = `${baseURL}${id}.mp3`;

    // NOTE: rendertext always add p tag automatically
    // const icon = $tw.wiki.renderText(
    //   'text/html',
    //   'text/vnd.tiddlywiki',
    //   '<$iconify />',
    // );

    const MusicIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" /> </svg> ';

    const options = {
      src,
      format: ['mp3'],
      autoplay: autoplay === 'false' ? false : true, // mobile not support autoplay
      volume: 0.8,
      html5: true,
      onload: () => {},
      onend: () => {},
      onplay: () => {
        new $tw.Notify().display({
          title: '开始播放',
        });
      },
      onpause: () => {},
    };

    // TODO: how read meta info on mp3 file
    // TODO: how to uninstall
    const sound = new Howl(options);
    sound.on('load', () => {
      console.log('sound loaded');
      // TODO: not work, 难道是重定向导致的???
      // this.duration = sound.duration();
    });

    const btn = createElement('button', {
      class:
        'rounded-full p-1 bg-gray-200/70 hover:scale-125 transition-all duration-500',
    });
    btn.innerHTML = MusicIcon;

    btn.addEventListener('click', () => {
      if (sound.playing()) {
        sound.pause();
      } else {
        sound.play();
      }
      // toggle spin icon
      // TODO: add slow css spin
      btn.classList.toggle('animate-spin');
    });

    const domNode = createElement('div', {
      // TODO: add more function button
      children: [btn],
    });

    // TODO: destory sound
    // sound.unload()

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  // destroy() { }
}

/**
 * @description neotw-music-with-howler widget
 */
exports.music = MusicWidget;
