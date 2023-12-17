/*\
title: $:/plugins/oeyoews/neotw-music-with-howler/music-player.js
type: application/javascript
module-type: widget

neotw-music-with-howler widget
\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

// TODO: 显示 歌曲title on window tab
class MusicWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.duration = null;
    this.sound = null;
  }

  checkSound() {
    window.player?.unload();
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const {
      url,
      id = '1947926942',
      autoplay = 'false',
      title = '',
      img = 'http://p2.music.126.net/AxfyFEr9GO_OnC5WBevzbw==/109951167425399843.jpg?param=130y130',
      enableImg = 'false',
    } = this.attributes;
    const { Howl, Howler } = require('howler.min.js');

    const baseURL = 'https://music.163.com/song/media/outer/url?id=';
    const src = `${baseURL}${id}.mp3`;

    const MusicIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" /> </svg> ';

    const cover = createElement('img', {
      attributes: {
        alt: title,
        src: img,
        class: 'rounded-full w-[26px] h-[26px]',
        title,
      },
    });

    const options = {
      src: url || src,
      format: ['mp3'],
      loop: true,
      preload: 'metadata',
      mute: false,
      autoplay: autoplay === 'false' ? false : true, // mobile not support autoplay
      volume: 0.8,
      html5: true,
      onload: () => {},
      onend: () => {},
      onplay: () => {
        // this.duration = sound.duration();
        new $tw.Notify().display({
          title: '开始播放' + title,
        });
      },
      onpause: () => {},
    };

    this.checkSound();
    this.sound = new Howl(options);
    window.player = this.sound;

    const children = [];
    if (enableImg === 'true' && img) {
      children.push(cover);
    }
    const btn = createElement('button', {
      class:
        'rounded-full p-1 bg-gray-200/70 dark:bg-black hover:scale-105 transition-all duration-500',
      attributes: {
        title,
      },
      children,
    });
    if (enableImg !== 'true') {
      btn.innerHTML = MusicIcon;
    }
    // global settings
    // Howler.mute()

    // TODO: 如果有多个 widget 同时展示再页面上, 会同时播放
    btn.addEventListener('click', () => {
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
      btn.classList.toggle('rotate');
      btn.classList.toggle('animated');
    });

    parent.insertBefore(btn, nextSibling);
    this.domNodes.push(btn);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 如果元素不可见
        if (!entry.isIntersecting) {
          // 调用unload方法卸载音频
          this.sound?.unload();
          observer.unobserve(btn);
        }
      });
    });

    observer.observe(btn);
  }
}

/**
 * @description neotw-music-with-howler widget
 */
exports.music = MusicWidget;
