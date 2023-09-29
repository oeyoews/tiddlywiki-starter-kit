/*\
title: UnplashAPI/widget
type: application/javascript
module-type: widget

UnplashAPI widget

\*/

// TODO: manual
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

      // baKbPgwlhbBfF7mHcGf0DS0TmFzi8GknZ4hbUhuNkrA
      const placeholder = localStorage.getItem('unsplashApiKey') || '';

      Swal.fire({
        title: 'Unsplash API',
        input: 'text',
        inputPlaceholder: placeholder,
        inputValue: placeholder,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (input) => {
          if (input) {
            localStorage.setItem('unsplashApiKey', input.trim());
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const inputNode = $tw.utils.domMaker('input', {
            type: 'text',
            attributes: {
              value: result.value,
              placeholder: result.value,
            },
          });
          inputNode.addEventListener('input', (event) => {
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
      });
    }
  }

  exports['UnsplashAPI'] = UnsplashAPIWidget;
})();
