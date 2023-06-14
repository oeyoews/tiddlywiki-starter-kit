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

      const param = this.getAttribute('param', 'Test Param');
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
      classNames.forEach(className => {
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
        titleText: 'text',
        toast: true,
        position: 'top', // top center bottom; start end
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        footer: '',
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

/* const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Signed in successfully'
}) */
