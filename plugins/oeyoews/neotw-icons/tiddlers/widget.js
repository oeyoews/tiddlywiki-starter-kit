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

      const {
        title = '',
        style = '',
        icon = 'simple-icons:tiddlywiki',
        class: classNames = '',
      } = this.attributes;

      const iconNode = this.document.createElement('iconify-icon');

      iconNode.setAttribute('icon', icon);
      iconNode.title = title;
      iconNode.style = style;
      iconNode.className = classNames;
      iconNode.style.verticalAlign = 'middle';

      parent.insertBefore(iconNode, nextSibling);
      this.domNodes.push(iconNode);
    }
  }

  exports['iconify'] = IconsWidget;
  exports['iconify-icon'] = IconsWidget;
})();
