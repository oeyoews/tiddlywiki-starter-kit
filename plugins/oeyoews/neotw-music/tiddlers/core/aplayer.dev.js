/*\
title: $:/plugins/oeyoews/neotw-music/widget-aplayer.dev.js
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
      this.playing = null;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const audioName = this.getAttribute('audioName', '清风');
      const artistName = this.getAttribute('artistName', 'Chen');
      const id = this.getAttribute('id', '1947926942');
      const audioUrl = this.getAttribute(
        'audioUrl',
        'https://music.163.com/song/media/outer/url?id=' + id,
      );
      const coverUrl = this.getAttribute('coverUrl', '');

      const playIcon = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/neotw-music/icon',
      );

      const playButtonNode = $tw.utils.domMaker('button', {
        text: 'button',
        class: 'p-0 m-0 bg-transparent',
        innerHTML: playIcon,
        attributes: {},
        children: [],
        eventListeners: [
          {
            name: 'click',
            handlerObject: this,
            handlerMethod: '',
          },
        ],
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
        class: 'w-96 roudned-lg',
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

      const APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
      this.aplayer = new APlayer(aplayerOptions);
    }
  }

  exports['aplayer-dev'] = APlayerWidget;
})();
