/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox-ui/widget/fbox
type: application/javascript
module-type: widget

fancybox widget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class FancyboxWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const src = this.getAttribute(
        'src',
        'https://source.unsplash.com/random',
      );

      const alt = this.getAttribute('alt', '');
      const width = this.getAttribute('width', '256');
      const currentTiddler = this.getVariable('currentTiddler') || 'gallary';

      const warnNode = this.document.createElement('span');
      warnNode.style.color = 'red';
      warnNode.style.fontSize = '50%';

      if (!src) {
        warnNode.textContent = 'fbox widget no src param';
        parent.insertBefore(warnNode, nextSibling);
        this.domNodes.push(warnNode);
        return;
      }

      if (!src.startsWith('http')) {
        warnNode.textContent = 'fbox目前仅仅支持在线图片';
        parent.insertBefore(warnNode, nextSibling);
        this.domNodes.push(warnNode);
        return;
      }

      const imgNode = $tw.utils.domMaker('img', {
        class: 'cursor-pointer',
        attributes: {
          src,
          alt,
          width,
          loading: 'lazy',
          'data-fancybox': currentTiddler,
        },
      });
      parent.insertBefore(imgNode, nextSibling);
      this.domNodes.push(imgNode);
    }
  }

  exports.fbox = FancyboxWidget;
})();
