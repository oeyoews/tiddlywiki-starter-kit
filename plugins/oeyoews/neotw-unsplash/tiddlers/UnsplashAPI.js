/*\
title: UnplashAPI/widget
type: application/javascript
module-type: widget

UnplashAPI widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class UnsplashAPIWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const placeholder =
        localStorage.getItem('unsplashApiKey') || 'Enter Unsplash API';
      const inputNode = $tw.utils.domMaker('input', {
        type: 'text',
        attributes: {
          placeholder,
        },
      });
      inputNode.addEventListener('input', event => {
        const unsplashAPI = event.target.value;
        localStorage.setItem('unsplashApiKey', unsplashAPI);
      });

      const divNode = $tw.utils.domMaker('div', {
        class: '',
        attributes: {},
        children: [inputNode],
      });
      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);
    }
  }

  exports['UnsplashAPI'] = UnsplashAPIWidget;
})();
