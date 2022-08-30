exports.onUpdate = function (echart) {
function getData(year) {
  year = new Date().getFullYear();
  var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate(+year + 1 + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      $tw.wiki.filterTiddlers('[sameday:modified[' + echarts.format.formatTime('yyyy-MM-dd', time).replace(/-/g, "") + ']count[]]')
    ]);
  }
  return data;
}
  echart.setOption({
  tooltip: {
    position: 'top',
    formatter: function (p) {
      var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
      return format + ': ' + p.data[1];
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'vertical',
    left: 0,
    top: 10
  },
  calendar: [
    {
      left: 90,
      cellSize: 'auto',
      top: 20,
      orient: 'horizontal',
      range: new Date().getFullYear(),
      dayLabel: {
        margin: 5
      }
    }
  ],
  series: [
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: 0,
      data: getData()
    }
  ]
});
};
