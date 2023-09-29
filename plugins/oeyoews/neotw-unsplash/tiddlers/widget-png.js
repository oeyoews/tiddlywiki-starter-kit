/*\
title: widget-unsplash
type: application/javascript
module-type: widget

widget-unsplash widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      // use has
      const local = this.getAttribute('local', '');
      // online https
      if (window.location.protocol === 'http:' && !local) return;

      const title = this.getVariable('currentTiddler');
      const alt = title;
      const src = `https://source.unsplash.com/random/1920x1080?fm=blurhash&${title}`;
      const classNames = this.getAttribute('class', '').split(' ');

      const imgNode = $tw.utils.domMaker('img', {
        class: 'rounded cursor-pointer',
        attributes: {
          src,
          title,
          alt,
          ['data-fancybox']: '',
        },
      });
      classNames.forEach((className) => {
        if (className) {
          imgNode.classList.add(className);
        }
      });
      parent.insertBefore(imgNode, nextSibling);
      this.domNodes.push(imgNode);
    }
  }

  exports['ocover'] = DivWidget;
})();
