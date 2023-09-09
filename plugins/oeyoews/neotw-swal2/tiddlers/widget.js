/*\
title: $:/plugins/oeyoews/neotw-swal2/widget.js
type: application/javascript
module-type: widget

neotw-swal2 widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  /**
   * support sweetalert2
   */
  class SwalWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const param = this.getAttribute('param', 'Swal');
      const classNames = this.getAttribute('class', '').split('');

      const buttonNode = $tw.utils.domMaker('button', {
        text: param,
        class: '',
        attributes: {},
        children: [],
        eventListeners: [
          {
            name: 'click',
            handlerObject: this,
            handlerMethod: 'handlerClick',
          },
        ],
      });
      classNames.forEach((className) => {
        if (className) {
          buttonNode.classList.add(className);
        }
      });
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    // TODO TO Global
    swalDefaultOption() {
      return {
        icon: 'success',
        title: 'swal',
        titleText: 'Text',
        toast: true,
        position: 'top-end', // top center bottom; start end
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        footer: 'Just Test SweetAlert2',
        backdrop: true,
        target: '#demo',
        width: '300px',
        height: '200px',
      };
    }

    handlerClick = () => {
      Swal.fire(this.swalDefaultOption());
    };
  }

  exports['swal2'] = SwalWidget;
})();
