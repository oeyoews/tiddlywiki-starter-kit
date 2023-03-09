/*\
title: APlayer
type: application/javascript
module-type: widget

A music player widget that uses the APlayer library.

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');

  class APlayerWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.addEventListeners([
        { type: 'click', handler: 'handleClick', id: 'aplayer' },
        { type: 'tm-navigate', handler: 'handleNavigateEvent' },
      ]);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const audioName = this.getAttribute('audioName', '清风');
      const artistName = this.getAttribute('artistName', '');
      // 1947926942
      const id = this.getAttribute('id', '1947926942');
      const audioUrl = this.getAttribute(
        'audioUrl',
        'https://music.163.com/song/media/outer/url?id=' + id,
      );
      const coverUrl = this.getAttribute('coverUrl', '');

      const aplayerDiv = this.document.createElement('div');
      aplayerDiv.id = 'aplayer';
      aplayerDiv.className = 'aplayer';
      parent.insertBefore(aplayerDiv, nextSibling);
      this.domNodes.push(aplayerDiv);

      const aplayerOptions = {
        container: aplayerDiv,
        theme: '#f64f59',
        loop: 'all',
        volume: 0.7,
        mutex: true,
        fixed: false,
        mini: false,
        order: 'list',
        preload: 'auto',
        // lrcType: 3,
        // autoplay: true,
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

    handleClick(event) {
      const target = event.target,
        to = target.getAttribute('to');
      if (to === this.getAttribute('to')) {
        this.refreshSelf();
        event.preventDefault();
        event.stopPropagation();
      }
      if (event.target === this.aplayer.element) {
        this.aplayer.play();
      }
    }
  }

  exports.aplayer = APlayerWidget;
})();
