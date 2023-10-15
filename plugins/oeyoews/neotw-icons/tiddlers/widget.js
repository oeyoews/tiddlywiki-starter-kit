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

      // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attributes
      // TODO: style bug
      const { title = '', style, icon, class: classNames } = this.attributes;

      const createElement = $tw.utils.domMaker;

      const iconNode = createElement('iconify-icon', {
        class: classNames,
        attributes: {
          icon,
          title,
          style,
        },
      });
      iconNode.classList.add('align-middle');

      parent.insertBefore(iconNode, nextSibling);
      this.domNodes.push(iconNode);
    }
  }

  exports['iconify'] = IconsWidget;
  exports['iconify-icon'] = IconsWidget;
})();
