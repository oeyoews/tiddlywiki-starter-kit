/*\
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
      // this.addEventListeners([
      //   { type: 'tm-navigate', handler: 'handleNavigateEvent' },
      // ]);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();
      const server = this.getAttribute('server', 'netease');
      const id = this.getAttribute('id', '1947926942');
      const type = this.getAttribute('type', 'song');
      const fold = this.getAttribute('fold', true);
      // const fixed = this.getAttribute('fixed', false);
      // const mini = this.getAttribute('mini', true);

      const metingSpan = this.document.createElement('meting-js');
      metingSpan.setAttribute('server', server);
      metingSpan.setAttribute('id', id);
      metingSpan.setAttribute('type', type);
      metingSpan.setAttribute('list-folded', fold);
      // metingSpan.setAttribute('fixed', fixed);
      // metingSpan.setAttribute('mini', mini);

      parent.insertBefore(metingSpan, nextSibling);
      this.domNodes.push(metingSpan);
    }

    execute() {}

    // handleNavigateEvent(event) {
    //   const target = event.target,
    //     to = target.getAttribute('to');
    //   if (to === this.getAttribute('to')) {
    //     this.refreshSelf();
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }
    // }

    // destructor() {
    //   const metingSpan = this.domNodes[0];
    //   metingSpan.parentNode.removeChild(metingSpan);
    //   super.destructor();
    // }
  }

  exports.meting = Meting;
})();
