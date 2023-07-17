/*\
title: $:/plugins/oeyoews/neotw-aplayer/widget-aplayer.dev.js
type: application/javascript
module-type: widget

A music player widget that uses the APlayer library.

\*/
// TODO: 支持多个音乐
// 显示歌单
// 支持自动或主动destory
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class APlayerWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.aplayer = null;
      this.playing = null;
      this.fixed = false;
      this.mutex = true;
      this.mini = true;
    }

    render(parent, nextSibling) {
      // if browser, load aplayer library
      if (!$tw.browser) return;
      const APlayer = require('$:/plugins/oeyoews/neotw-aplayer/aplayer.min.js');

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      this.fixed = this.hasAttribute('fixed', false);

      const audiosDefault = [
        {
          name: '清风',
          artist: '陈壹千',
          id: '1947926942',
        },
        {
          name: '脱水蓝鲸',
          artist: 'Vicky宣宣',
          id: '1931552540',
        },
      ];

      const audios =
        $tw.wiki.getTiddlerData(
          '$:/plugins/oeyoews/neotw-aplayer/audios.json',
        ) || audiosDefault;

      const randomNum = Math.floor(Math.random() * audios.length);
      const { name, artist, id } = audios[randomNum];
      const url = `https://music.163.com/song/media/outer/url?id=${id}`;

      const classNames = this.getAttribute('class', '').split(' ');

      // no color on pagecontrol ui
      const playIcon = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/neotw-aplayer/icon',
      );

      const playGradientIcon = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/neotw-aplayer/icon-gradient',
      );

      const aplayerNode = $tw.utils.domMaker('div', {
        attributes: {
          id: 'aplayer',
        },
      });

      const playButtonNode = $tw.utils.domMaker('button', {
        attributes: {
          title: `播放 ${name}`,
          ['aria-label']: 'player',
        },
        class: `p-0 m-0 bg-transparent ${classNames.join(' ')}`,
        innerHTML: playIcon,
      });

      const aplayerOptions = {
        container: aplayerNode,
        theme: '#f64f59',
        loop: 'all',
        volume: 0.7,
        // disaple play multi sounds
        mutex: this.mutex,
        // show left bottom music player
        fixed: this.fixed,
        mini: this.mini,
        order: 'list',
        preload: 'auto',
        // TODO: support multi random songs
        audio: [
          {
            name,
            artist,
            url,
          },
        ],
      };

      this.aplayer = new APlayer(aplayerOptions);

      const notify = (icon = 'success') => {
        Swal.fire({
          // ${this.aplayer.audio.duration}`,
          title: `🎶 ${name} by ${artist}`,
          icon,
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
        });
      };

      playButtonNode.addEventListener('click', () => {
        if (this.playing) {
          this.aplayer.pause();
          playButtonNode.innerHTML = playIcon;
          playButtonNode.title = `播放 ${name}`;
        }
        if (!this.playing) {
          this.aplayer.play();
          playButtonNode.innerHTML = playGradientIcon;
          playButtonNode.title = `暂停 ${name}`;
        }
        // this.aplayer.toggle();
        // bug: if paused by others , this status is switched
        !this.playing && notify();
        this.playing && notify('info');
        this.playing = !this.playing;

        // TODO
        // this.aplayer.on('playing', notify());
        // this.aplayer.on('pause', notify('info'));
      });

      parent.insertBefore(playButtonNode, nextSibling);
      this.domNodes.push(playButtonNode);

      if (this.fixed) {
        parent.insertBefore(aplayerNode, nextSibling);
        this.domNodes.push(aplayerNode);
      }
    }

    destroy() {
      this.aplayer?.destroy();
      this.aplayer = null;
    }
  }

  exports['aplayer-dev'] = APlayerWidget;
  exports['aplayer'] = APlayerWidget;
})();
