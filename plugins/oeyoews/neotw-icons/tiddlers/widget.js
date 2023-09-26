/*\
title: $:/plugins/oeyoews/neotw-icons/widget.js
type: application/javascript
module-type: widget

neotw-icons widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class IconsWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const title = this.getAttribute('title', '');
      const style = this.getAttribute('style');
      const classNames = this.getAttribute('class');

      const iconNode = this.document.createElement('iconify-icon');
      iconNode.setAttribute('icon', this.getAttribute('icon'));
      iconNode.style = style;
      iconNode.title = title;
      iconNode.className = 'align-middle';
      // 此处使用? 没有用在...
      classNames && iconNode.classList.add(...classNames?.split(' '));

      parent.insertBefore(iconNode, nextSibling);
      this.domNodes.push(iconNode);
    }
  }

  exports['iconify'] = IconsWidget;
})();
