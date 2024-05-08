/*\
title: $:/plugins/oeyoews/neotw-vtable/widget.js
type: application/javascript
module-type: widget

neotw-vtable widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class VTableWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    require('./lib/vtable.min.js');
    // require('./lib/vtable-editors.min.js');

    const container = this.document.createElement('div');

    container.style.width = '400px';
    container.style.height = '400px';

    const option = {
      columns: [
        {
          field: '订单 ID',
          title: '订单 ID',
          sort: true,
          width: 'auto',
        },
        {
          field: '邮寄方式',
          title: '邮寄方式',
        },
        {
          field: '类别',
          title: '类别',
        },
        {
          field: '子类别',
          title: '子类别',
        },
        {
          field: '销售额',
          title: '销售额',
        },
      ],
      records: [
        {
          '订单 ID': 'CN-2019-1973789',
          邮寄方式: '标准级',
          类别: '办公用品',
          子类别: '信封',
          销售额: '125.44',
        },
        {
          '订单 ID': 'CN-2019-1973789',
          邮寄方式: '标准级',
          类别: '办公用品',
          子类别: '装订机',
          销售额: '31.92',
        },
      ],
    };

    const tableInstance = new VTable.ListTable(container, option);

    const createElement = $tw.utils.domMaker;

    const domNode = createElement('div', {
      children: [container],
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description neotw-vtable widget */
exports['vtable'] = VTableWidget;
