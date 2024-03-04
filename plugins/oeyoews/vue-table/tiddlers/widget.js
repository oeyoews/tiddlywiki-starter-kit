/*\
title: $:/plugins/oeyoews/vue-table/widget.js
type: application/javascript
module-type: widget

vue-table widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class VueTableWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    if (!window.Vue) {
      window.Vue = require('$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js');
    }

    if (!window.Vue) return;

    const { createApp } = window.Vue;
    const VXETable = require('vxe-table.js');
    window.VXETable = VXETable;
    require('xe-utils.js');

    const vtable = require('./component.js');

    const app = createApp(vtable());
    app.use(VXETable);

    const domNode = this.document.createElement('div');

    app.mount(domNode);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description vue-table widget */
exports['vue-table'] = VueTableWidget;
