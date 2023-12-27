/*\
title: $:/plugins/oeyoews/neotw-music-with-howler/music-player.js
type: application/javascript
module-type: widget

neotw-music-with-howler widget
\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

// TODO: 显示 歌曲 title on window tab
class MusicWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.duration = null;
    this.sound = null;
    this.PLAYING = 'playing';
    this.PAUSE = 'pause';
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
      title = 'default',
      img = 'http://p2.music.126.net/AxfyFEr9GO_OnC5WBevzbw==/109951167425399843.jpg?param=130y130',
      enableImg = 'false'
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
        class: 'rounded-full w-[26px] h-[26px] object-cover',
        title
      }
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
        this.updatePlaylistStatus(title, this.PLAYING);
        new $tw.Notify().display({
          title: '开始播放' + title
        });
      },
      onpause: () => {
        this.updatePlaylistStatus(title, this.PAUSE);
      }
    };

    this.sound = new Howl(options);
    if (!window.playlist) {
      const playlist = [];
      window.playlist = playlist;
    }

    const existingItem = window.playlist.find((item) => item.title === title);
    if (!existingItem) {
      window.playlist.push({ title, sound: this.sound });
    }

    const children = [];
    if (enableImg === 'true' && img) {
      children.push(cover);
    }
    const btn = createElement('button', {
      class:
        'rounded-full p-1 bg-gray-200/70 dark:bg-black hover:scale-105 transition-all duration-500',
      attributes: {
        title
      },
      children
    });
    if (enableImg !== 'true') {
      btn.innerHTML = MusicIcon;
    }
    // global settings
    // Howler.mute()

    btn.addEventListener('click', () => {
      if (this.sound.playing()) {
        this.sound.pause();
        btn.classList.remove('rotate');
      } else {
        const playingsongs = this.getPlayingSongs();
        if (playingsongs) {
          playingsongs.sound.unload();
          this.updatePlaylistStatus(playingsongs.title, this.PAUSE);
        }
        this.sound.play();
        btn.classList.add('rotate');
      }
    });

    // TODO: support config dialog model
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    parent.insertBefore(btn, nextSibling);
    this.domNodes.push(btn);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 如果元素不可见
        if (!entry.isIntersecting) {
          // 调用 unload 方法卸载音频
          btn.classList.remove('rotate');
          // 不能使用 window.sound, 因为无法确定哪个是当前的实例
          this.sound?.unload();
          this.updatePlaylistStatus(this.title, this.PAUSE);
          // NOTE: 不要取消观察
          // observer.unobserve(btn);
        }
      });
    });

    observer.observe(btn);
  }

  updatePlaylistStatus(title, status) {
    const existingItemIndex = window.playlist.findIndex(
      (item) => item.title === title
    );

    if (existingItemIndex !== -1) {
      // 如果存在相同 title 的项，则更新现有对象的 status
      window.playlist[existingItemIndex].status = status;
    }
    // 进行其他可能的更新操作
  }
  getPlayingSongs() {
    return window.playlist.filter((item) => item.status === this.PLAYING)[0];
  }

  refresh() {
    return false;
  }
}

/**
 * @description neotw-music-with-howler widget
 */
exports.music = MusicWidget;
