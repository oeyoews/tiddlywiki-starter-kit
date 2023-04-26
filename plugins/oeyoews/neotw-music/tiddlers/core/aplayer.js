/*\
title: $:/plugins/oeyoews/neotw-music/widget-aplayer.js
type: application/javascript
module-type: widget

A music player widget that uses the APlayer library.

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');

  class APlayerWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const audioName = this.getAttribute('audioName', '清风');
      const artistName = this.getAttribute('artistName', '');
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

    refresh() {
      var changedAttributes = this.computeAttributes();
      // changedAttributes.title;
      if (Object.keys(changedAttributes).length > 0) {
        this.aplayer.pause();
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports.aplayer = APlayerWidget;
})();
