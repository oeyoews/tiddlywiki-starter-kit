/*\
title: addon/sevenday.js
module-type: echarts-component
type: application/javascript
description: 折线图

\*/

/** @description: echarts 几乎支持每一处的样式设置，这里仅根据需要设置必要的样式 */

const getData = (date, type = 'created') =>
  $tw.wiki.filterTiddlers(`[sameday:${type}[${date}]!is[system]!has[draft.of]]`)
    .length;

const parsesixDate = (dateString) =>
  new Date(
    `${dateString.substr(0, 4)}-${dateString.substr(4, 2)}-${dateString.substr(
      6,
      2,
    )}`,
  );

/**
 * @description sevenday echart some config
 */
const config = {
  title: '最近文章动态',
  opacity: 0.8,
  xLegend: '日期',
  yLegend: '文章数量',
  lineWidth: 0,
  symbolSize: 0,
};

function getSevenDaysBefore(dateString, daysLength = 7) {
  const currentDate = dateString ? parsesixDate(dateString) : new Date();

  const sevenDays = [];

  for (let i = 0; i < daysLength; i++) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    sevenDays.unshift(year + month + day);

    // Subtract one day from currentDate
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return sevenDays;
}

const Sevendays = {
  onUpdate(myChart, _state, addonAttributes) {
    const {
      days,
      date,
      title: text = config.title,
      subtitle: subtext = '',
      disableClick = 'no',
      // smooth = 'true',
    } = addonAttributes;

    const sevendays = getSevenDaysBefore(date, days);

    // TODO: 封装成函数 https://echarts.apache.org/examples/en/editor.html?c=bump-chart
    const createdData = [];
    const modifiedData = [];

    sevendays.forEach((date) => createdData.push(getData(date)));
    sevendays.forEach((date) => modifiedData.push(getData(date, 'modified')));

    const option = {
      title: {
        text,
        subtext,
        left: 'center',
        top: 'bottom',
      },
      legend: {
        data: ['created', 'modified'],
        selected: {
          modified: true,
          created: false,
        },
      },
      toolbox: {
        feature: {
          restore: {},
        },
      },
      tooltip: {
        // options: item, axis
        trigger: 'item',
        // axisPointer: {
        //   type: 'cross',
        //   label: {
        //     backgroundColor: '#6a7985',
        //   },
        // },
        formatter: function (params) {
          const { name: date, value: count, seriesName } = params;
          const realDate = parsesixDate(date).toLocaleDateString();
          if (seriesName === 'created') {
            return count
              ? `${realDate} 新增了 ${count} 篇文章`
              : `${realDate} 没有新增文章`;
          } else {
            return count
              ? `${realDate} 更新了 ${count} 篇文章`
              : `${realDate} 没有文章更新`;
          }
        },
      },
      // color: [''],
      xAxis: {
        boundaryGap: true, // 是否在数据点两侧留白，
        type: 'category',
        data: sevendays,
        name: config.xLegend,
      },
      yAxis: {
        type: 'value',
        name: config.yLegend,
      },
      animationDuration: 2000,
      series: [
        {
          name: 'created',
          data: createdData,
          type: 'line',
          showSymbol: false,
          symbolSize: config.symbolSize,
          stack: 'Total',
          lineStyle: {
            // 折线宽度
            width: config.lineWidth,
            // color: 'purple'
          },
          endLabel: {
            show: false,
            formatter: '{a}',
            distance: 20,
          },
          // 区域颜色渐变
          areaStyle: {
            opacity: config.opacity,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)',
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              scale: 1.5,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          smooth: true,
        },
        {
          name: 'modified',
          data: modifiedData,
          lineStyle: {
            width: config.lineWidth,
          },
          symbolSize: config.symbolSize,
          stack: 'Total',
          type: 'line',
          showSymbol: false,
          endLabel: {
            show: false,
            formatter: '{a}',
            distance: 20,
          },
          areaStyle: {
            opacity: config.opacity,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)',
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              // color: '',
              scale: 1.25,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          smooth: true,
        },
      ],
    };

    // 更新配置
    myChart.setOption(option);

    // 监听双击事件
    myChart.on('dblclick', 'series', function (params) {
      const { name: date, value: count, seriesName } = params;
      const goto = new $tw.Story();
      const filter = `[sameday:${seriesName}[${date}]!is[system]!has[draft.of]]`;

      if (!count) return;
      $tw.rootWidget.invokeActionString(
        '<$action-setfield $tiddler="$:/temp/advancedsearch" text="""' +
          filter +
          '"""/><$action-setfield $tiddler="$:/temp/advancedsearch/input" text="""' +
          filter +
          '"""/><$action-setfield $tiddler="$:/temp/advancedsearch/refresh" text="yes"/><$action-setfield $tiddler="$:/state/tab--1498284803" text="$:/core/ui/AdvancedSearch/Filter"/>',
      );
      goto.navigateTiddler('$:/AdvancedSearch');
    });
  },
  // 没有频繁更新的需要，禁止刷新
  shouldUpdate() {
    return false;
  },
};

module.exports = Sevendays;
