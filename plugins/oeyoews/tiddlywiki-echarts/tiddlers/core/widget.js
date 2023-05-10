/*\
title: $:/plugins/oeyoews/tiddlywiki-echarts/widget.js
type: application/javascript
module-type: widget

tiddlywiki-echarts widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const echarts = require('echarts.min.js');

  class EchartWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      // const time = new Date().getTime();
      const id = 'echartsId';
      const div = this.document.createElement('div');
      div.id = id;
      div.textContent = 'Loading ...';
      div.style.width = '600px';
      div.style.height = '400px';
      div.className = '';
      parent.insertBefore(div, nextSibling);
      this.domNodes.push(div);

      const chartContainer = document.getElementById(id);
      const myChart = echarts.init(chartContainer);

      const option = {
        title: {
          text: '销量统计',
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      myChart.setOption(option);
    }
  }

  exports.oecharts = EchartWidget;
})();
