/*\
title: $:/plugins/oeyoews/neotw-aplayer/widget-aplayer.dev.js
type: application/javascript
module-type: widget

A music player widget that uses the APlayer library.

\*/
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
        {
          name: '清风',
          artist: '陈壹千',
          id: '1947926942',
        },
      ];

      const audios =
        $tw.wiki.getTiddlerData(
          '$:/plugins/oeyoews/neotw-aplayer/audios.json',
        ) || audiosDefault;

      const audiosFormated = audios.map(audio => {
        return {
          url: `https://music.163.com/song/media/outer/url?id=${audio.id}`,
        };
      });

      const playIcon = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/neotw-aplayer/icon',
      );

      const aplayerNode = $tw.utils.domMaker('div', {
        attributes: {
          id: 'aplayer',
        },
      });

      const playButtonNode = $tw.utils.domMaker('button', {
        attributes: {
          title: `播放`,
          ['aria-label']: 'player',
        },
        class: `p-0 m-0 bg-transparent`,
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
        audio: audiosFormated,
        // audio: [
        //   {
        //     url: 'https://music.163.com/song/media/outer/url?id=1931552540',
        //   },
        // ],
      };

      this.aplayer = new APlayer(aplayerOptions);

      playButtonNode.addEventListener('click', () => {
        this.aplayer.toggle();
      });

      playButtonNode.addEventListener('dblclick', () => {
        this.aplayer.skipForward();
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
