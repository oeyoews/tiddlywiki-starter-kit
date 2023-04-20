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

      const aNode = this.document.createElement('a');
      const warnNode = this.document.createElement('span');
      warnNode.style.color = 'red';
      warnNode.style.fontSize = '50%';
      const imgNode = this.document.createElement('img');

      if (src === '') {
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
      aNode.href = src;
      imgNode.src = src;
      imgNode.alt = alt;
      imgNode.width = width;
      imgNode.setAttribute('loading', 'lazy');
      aNode.setAttribute('data-fancybox', currentTiddler);
      aNode.setAttribute('data-caption', alt);
      aNode.appendChild(imgNode);
      parent.insertBefore(aNode, nextSibling);
      this.domNodes.push(aNode);
    }
  }

  exports.fbox = FancyboxWidget;
})();
