/*\
title: $:/plugins/oeyoews/neotw-chart/widget.js
type: application/javascript
module-type: widget

neotw-chart widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const Chart = require('chart.min.js');

  class ChartWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const time = new Date().getTime();
      const {
        id = time,
        type = 'pie',
        // width = '40px',
        // height = '40px',
      } = this.attributes;
      const canvas = this.document.createElement('canvas');
      canvas.id = id;
      // canvas.width = width;
      // canvas.height = height;
      // canvas.className = '';
      parent.insertBefore(canvas, nextSibling);
      this.domNodes.push(canvas);
      var ctx = document.getElementById(id).getContext('2d');
      var data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      // 创建数据对象

      var options = {
        responsive: true,
        maintainAspectRatio: true,
        // width: width,
        // height: height,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      };

      new Chart(ctx, {
        type: type,
        data: data,
        options: options,
      });
    }
  }

  exports.chart = ChartWidget;
})();
