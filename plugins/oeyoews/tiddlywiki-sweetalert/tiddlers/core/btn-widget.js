/*\
title: $:/plugins/oeyoews/tiddlywiki-sweetalert/widget.js
type: application/javascript
module-type: widget

sweetalert
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class SwalWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.executing = false;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const button = this.document.createElement('button');
      button.textContent = this.getAttribute('text', 'Click me!');
      parent.insertBefore(button, nextSibling);
      this.domNodes.push(button);

      const handleClick = () => {
        if (this.executing) {
          return;
        }
        this.executing = true;
        // do something here
        const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
        swal('Button clicked'); // 控制台输出 log
        // tiddlywiki-sounds
        howler();
        this.executing = false;
      };

      button.addEventListener('click', handleClick);
    }
  }

  exports.swal = SwalWidget;
})();
