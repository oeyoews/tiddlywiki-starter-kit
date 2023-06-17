/*\
title: $:/plugins/oeyoews/neotw-music/widget-meting.js
type: application/javascript
module-type: widget

Meting widget

\*/
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

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const server = this.getAttribute('server', 'netease');
      const id = this.getAttribute('id', '1947926942');
      const type = this.getAttribute('type', 'song');
      const fold = this.getAttribute('fold', true);

      // just add meting html tag, not key
      const metingNode = this.document.createElement('meting-js');
      const container = $tw.utils.domMaker('div', {
        // class: 'm-0 p-0',
        children: [metingNode],
      });

      metingNode.setAttribute('server', server);
      metingNode.setAttribute('id', id);
      metingNode.setAttribute('type', type);
      metingNode.setAttribute('list-folded', fold);

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }
  }

  exports.meting = Meting;
})();
