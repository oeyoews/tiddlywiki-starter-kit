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

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class APlayerWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.aplayer = null;
      this.playButtonNode = null;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      const APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');

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

      this.playButtonNode = this.document.createElement('button');
      this.playButtonNode.textContent = '🎶';
      this.playButtonNode.classList.add(
        'bg-slate-100',
        'rounded',
        'hover:bg-slate-200',
        'transition',
        'duration-400',
      );

      this.playButtonNode.addEventListener(
        'click',
        this.handleClick.bind(this),
      );

      const aplayerNode = $tw.utils.domMaker('div', {
        class: 'w-96 roudned-lg',
        attributes: {
          id: 'aplayer',
        },
      });

      const container = $tw.utils.domMaker('div', {
        class: 'flex justify-center items-center',
        attributes: {},
        // children: [aplayerNode, this.playButtonNode],
        children: [aplayerNode],
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

    handleClick() {
      Swal.fire({
        toast: true,
        title: `🎶 ${this.getAttribute(
          'audioName',
          '清风',
        )} by ${this.getAttribute('artistName', 'Chen')}`,
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
      });
      this.aplayer.toggle();
    }

    destroy() {
      if (this.playButtonNode) {
        this.playButtonNode.removeEventListener('click', this.handleClick);
        this.playButtonNode = null;
      }
      if (this.aplayer) {
        this.aplayer.destroy();
        this.aplayer = null;
      }
    }
  }

  exports.aplayer = APlayerWidget;
})();
