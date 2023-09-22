/*\
title: $:/plugins/oeyoews/neotw-image-better/widget.js
type: application/javascript
module-type: widget

om-img widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class ImageWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const keyword = this.getAttribute('keyword', 'sea');
      const resolution = this.getAttribute('resolution', '1920x1080');
      const src = `https://source.unsplash.com/random/${resolution}/?${keyword}`;
      const img = new Image();

      const classNames = this.getAttribute('class', '');

      const dynamicClasses = [
        'blur',
        'w-64',
        'h-full',
        'rounded',
        'scale-105',
        'transition-all',
        'durtaion-400',
        'bg-black/10',
      ];

      img.classList.add('bg-cover', 'aspect-video', ...dynamicClasses);
      img.src = src;
      classNames && img.classList.add(...classNames.split(' '));
      img.onload = () => {
        img.classList.remove(...dynamicClasses);
      };

      parent.insertBefore(img, nextSibling);
      this.domNodes.push(img);
    }
  }

  exports['om-img'] = ImageWidget;
})();
