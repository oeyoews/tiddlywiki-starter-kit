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
      button.textContent = this.text;
      parent.insertBefore(button, nextSibling);
      this.domNodes.push(button);

      const handleClick = () => {
        if (this.executing) {
          return;
        }
        this.executing = true;

        const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
        swal({
          icon: this.icon,
          title: this.title,
          text: this.text,
          confirmButtonText: 'OK',
          // other SweetAlert options here
        });

        this.executing = false;
      };

      button.addEventListener('click', handleClick);
    }

    computeAttributes() {
      super.computeAttributes();
      this.icon = this.getAttribute('icon', 'success');
      this.title = this.getAttribute('title', 'Default title');
      this.text = this.getAttribute('text', 'Default text');
    }
  }

  exports.swal = SwalWidget;
})();
