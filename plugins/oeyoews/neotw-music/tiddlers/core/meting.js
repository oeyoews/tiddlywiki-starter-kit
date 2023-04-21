/*\
title: $:/plugins/oeyoews/neotw-music/widget-meting.js
type: application/javascript
module-type: widget

Meting widget

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class Meting extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();
      const server = this.getAttribute('server', 'netease');
      const id = this.getAttribute('id', '1947926942');
      const type = this.getAttribute('type', 'song');
      const fold = this.getAttribute('fold', true);

      const metingSpan = this.document.createElement('meting-js');
      metingSpan.setAttribute('server', server);
      metingSpan.setAttribute('id', id);
      metingSpan.setAttribute('type', type);
      metingSpan.setAttribute('list-folded', fold);

      parent.insertBefore(metingSpan, nextSibling);
      this.domNodes.push(metingSpan);
    }
  }

  exports.meting = Meting;
})();
