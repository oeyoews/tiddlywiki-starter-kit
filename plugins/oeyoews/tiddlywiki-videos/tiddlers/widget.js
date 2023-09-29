/*\
title: $:/plugins/oeyoews/tiddlywiki-videos/widget
type: application/javascript
module-type: widget

youtube widget
\*/

(function () {
  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

  class YoutubeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;

      let { youtubeId, playlist } = this.attributes;

      const prefix = 'https://www.youtube.com/embed/';

      const iframeSrc = playlist
        ? `${prefix}videoseries?list=${youtubeId}`
        : `${prefix}${youtubeId}`;

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

      const iframeNode = this.document.createElement('iframe');

      const domNode = createElement('div', {
        class: 'flex justify-center item-center my-4',
        children: [iframeNode],
      });

      Object.entries(iframeAttributes).forEach(([key, value]) => {
        iframeNode.setAttribute(key, value);
      });

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  exports.youtube = YoutubeWidget;
})();
