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
      var iframeSrc = 'https://www.youtube.com/embed/';

      if (playlist) {
        iframeSrc += `videoseries?list=${youtubeId}`;
      } else {
        iframeSrc += `${youtubeId}`;
      }

      const container = this.document.createElement('div');
      container.className = 'youtube-container';
      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);

      const iframe = this.document.createElement('iframe');
      iframe.className = 'border-none shadow-lg rounded-md';
      iframe.src = iframeSrc;
      iframe.width = '560';
      iframe.height = '315';
      iframe.frameborder = '0';
      iframe.allowfullscreen = true;

      container.appendChild(iframe);
    }
  }

  exports.youtube = YoutubeWidget;
})();
