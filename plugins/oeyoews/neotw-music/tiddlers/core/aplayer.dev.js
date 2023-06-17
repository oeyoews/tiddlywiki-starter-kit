/*\
title: $:/plugins/oeyoews/neotw-music/widget-aplayer.dev.js
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
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      const APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const audios = [
        {
          audioName: '清风',
          artistName: '陈壹千',
          id: '1947926942',
        },
        {
          audioName: '脱水蓝鲸',
          artistName: 'Vicky宣宣',
          id: '1931552540',
        },
      ];

      // const id = randomId[Math.floor(Math.random() * randomId.length)];
      // randomId
      const randomNum = Math.floor(Math.random() * audios.length);
      const id = audios[randomNum].id;
      const { audioName, artistName } = audios[randomNum];
      // const id = this.getAttribute('id', '1947926942');
      const audioUrl = this.getAttribute(
        'audioUrl',
        'https://music.163.com/song/media/outer/url?id=' + id,
      );
      const coverUrl = this.getAttribute('coverUrl', '');
      const classNames = this.getAttribute('class', '').split(' ');

      const playIcon = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/neotw-music/icon',
      );

      const playButtonNode = $tw.utils.domMaker('button', {
        class: 'p-0 m-0 bg-transparent',
        innerHTML: playIcon,
      });

      classNames.forEach(className => {
        if (className) {
          playButtonNode.classList.add(className);
        }
      });

      playButtonNode.addEventListener('click', () => {
        this.aplayer.toggle();
        !this.playing &&
          Swal.fire({
            toast: true,
            title: `🎶 ${audioName} by ${artistName}`,
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
            position: 'top-end',
          });
        this.playing = !this.playing;
      });

      const aplayerNode = $tw.utils.domMaker('div', {
        // class: 'w-96 roudned-lg',
        attributes: {
          id: 'aplayer',
        },
      });

      const container = $tw.utils.domMaker('div', {
        class: 'flex justify-center items-center',
        attributes: {},
        children: [playButtonNode],
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);

      const aplayerOptions = {
        container: aplayerNode,
        theme: '#f64f59',
        loop: 'all',
        volume: 0.7,
        mutex: true,
        fixed: false,
        mini: false,
        order: 'list',
        preload: 'auto',
        audio: [
          {
            name: audioName,
            artist: artistName,
            url: audioUrl,
            cover: coverUrl,
            theme: '#f64f59',
          },
        ],
      };

      this.aplayer = new APlayer(aplayerOptions);
    }
  }

  exports['aplayer-dev'] = APlayerWidget;
})();
