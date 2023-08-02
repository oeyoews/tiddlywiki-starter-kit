/*\
title: $:/plugins/oeyoews/neotw-chirpy/widget.js
type: application/javascript
module-type: widget

neotw-chirpy widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const script = document.createElement('script');
      script.src = 'https://chirpy.dev/bootstrap/comment.js';
      script.setAttribute('defer', true);
      script.setAttribute(
        'data-chirpy-domain',
        'nextjs-mdx-blog-tailwindcss.vercel.app',
      );

      const buttonNode = $tw.utils.domMaker('div', {
        attributes: {
          'data-chirpy-comment': 'true',
        },
        class: 'not-prose',
        children: [],
        eventListeners: [
          {
            name: 'click',
            handlerObject: this,
            handlerMethod: 'handlerClick',
          },
        ],
      });
      parent.insertBefore(script, nextSibling);

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    handlerClick = () => {
      console.log('This require just load once');
    };
  }

  exports['chirpy'] = DivWidget;
})();
