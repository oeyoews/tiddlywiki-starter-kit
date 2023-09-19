/*\
title: $:/plugins/oeyoews/tiddlywiki-videos/widget
type: application/javascript
module-type: widget

youtube widget
\*/
(function () {
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class YoutubeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      var youtubeId = this.getAttribute('youtubeId');
      var playlist = this.getAttribute('playlist');
      const prefix = 'https://www.youtube.com/embed/';

      const iframeSrc = playlist
        ? `${prefix}videoseries?list=${youtubeId}`
        : `${prefix}${youtubeId}`;

      const container = this.document.createElement('div');
      container.className = 'flex justify-center item-center my-4';

      // Create an object to represent the iframe attributes
      const iframeAttributes = {
        src: iframeSrc,
        width: '800',
        height: '450',
        frameborder: '0',
        allowfullscreen: '',
        class: 'border-none shadow-lg rounded-lg w-full',
        allowsInlineMediaPlayback: 'true',
        playsinline: '1',
        title: '', // example attribute
      };

      // Create the iframe element and set its attributes using a loop
      const iframe = this.document.createElement('iframe');
      for (const [key, value] of Object.entries(iframeAttributes)) {
        iframe.setAttribute(key, value);
      }

      container.appendChild(iframe);

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }
  }

  exports.youtube = YoutubeWidget;
})();
