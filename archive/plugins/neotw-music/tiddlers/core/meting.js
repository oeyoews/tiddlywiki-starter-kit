/*\
title: $:/plugins/oeyoews/neotw-music/widget-meting.js
type: application/javascript
module-type: widget

Meting widget

\*/
// if use fixed, this always be left bottom; TODO
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  class Meting extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      // load APlayer
      window.APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
      // just load meting lib
      require('$:/plugins/oeyoews/neotw-music/meting.min.js');

      const {
        metingOption,
      } = require('$:/plugins/oeyoews/neotw-music/meting-init.js');

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const currentTiddler = this.getVariable('currentTiddler');
      // container -> metingNode(meting-js)
      // just add meting html tag, not key
      const customMetingContainer = document.createElement('div');
      customMetingContainer.setAttribute('id', 'custom-meting-js');
      // append meting-js tag
      metingOption(customMetingContainer);

      const container = $tw.utils.domMaker('div', {
        children: [customMetingContainer],
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }
  }

  exports.meting = Meting;
})();
