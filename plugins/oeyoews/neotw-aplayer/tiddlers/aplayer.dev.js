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
        { name: '清风', artist: '陈壹千', id: '1947926942' },
        { name: '脱水蓝鲸', artist: 'Vicky宣宣', id: '1931552540' },
      ];

      const audios =
        $tw.wiki.getTiddlerData(
          '$:/plugins/oeyoews/neotw-aplayer/audios.json',
        ) || audiosDefault;

      const formatedSongs = audios.map(item => {
        return {
          ...item,
          url: `https://music.163.com/song/media/outer/url?id=${item.id}`,
        };
      });

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
          ['aria-label']: 'player',
        },
        class: `p-0 m-0 bg-transparent ${classNames.join(' ')}`,
        innerHTML: playIcon,
      });

      const aplayerOptions = {
        container: aplayerNode,
        theme: '#f64f59',
        loop: 'all',
        // volume: 0.7,
        order: 'random',
        // disaple play multi sounds
        mutex: this.mutex,
        // show left bottom music player
        fixed: this.fixed,
        mini: this.mini,
        preload: 'auto',
        audio: formatedSongs,
      };

      this.aplayer = new APlayer(aplayerOptions);
      const aplayerRef = this.aplayer;

      playButtonNode.addEventListener('dblclick', () => {
        aplayerRef.skipForward();
        aplayerRef.play();
      });

      playButtonNode.addEventListener('click', () => {
        playButtonNode.innerHTML = playGradientIcon;
        aplayerRef.toggle();
      });

      parent.insertBefore(playButtonNode, nextSibling);
      this.domNodes.push(playButtonNode);

      if (this.fixed) {
        parent.insertBefore(aplayerNode, nextSibling);
        this.domNodes.push(aplayerNode);
      }
    }

    // 支持了多首音乐后(上两次提交), 会触发classList错误, 暂时不进行destory事件
    // destroy() {
    // this.aplayer?.destroy();
    // this.aplayer = null;
    // }
  }

  exports['aplayer-dev'] = APlayerWidget;
  exports['aplayer'] = APlayerWidget;
})();
