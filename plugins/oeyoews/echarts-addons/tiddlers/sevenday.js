/*\
title: addon/sevenday.js
module-type: echarts-component
type: application/javascript
description: seven
\*/

// TODO: 简化时间的处理
// TODO: 指定线的颜色, 区域的颜色
// @description: echarts 几乎支持每一处的样式设置, 这里仅根据需要设置必要的样式
const getData = (date, type = 'created') =>
  $tw.wiki.filterTiddlers(`[sameday:${type}[${date}]!is[system]!has[draft.of]]`)
    .length;

function parsesixDate(dateString) {
  const year = parseInt(dateString.substr(0, 4));
  const month = parseInt(dateString.substr(4, 2)) - 1; // 月份从0开始，需要减1
  const day = parseInt(dateString.substr(6, 2));
  const realDate = new Date(year, month, day);
  //.toLocaleDateString();
  return realDate;
}

function getSevenDaysBefore(dateString, daysLength = 7) {
  const currentDate = dateString ? parsesixDate(dateString) : new Date();

  const sevenDays = [];

  for (let i = 0; i < daysLength; i++) {
    // 获取当前日期的年、月、日
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
    const day = currentDate.getDate();

    // 将年、月、日格式化成字符串，并添加到数组
    const dateString = `${year}${month < 10 ? '0' : ''}${month}${
      day < 10 ? '0' : ''
    }${day}`;
    sevenDays.unshift(dateString); // 使用unshift方法将日期添加到数组头部

    // 将当前日期减一天，以便生成前一天的日期
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return sevenDays;
}

const Sevendays = {
  onUpdate(myChart, _state, addonAttributes) {
    /**
     * @param days 指定天数
     * @param date 指定日期
     * @param title 标题
     * @param subtitle 副标题
     */
    const {
      days,
      date,
      title: text = '最近文章动态',
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
      },
      toolbox: {
        feature: {
          restore: {},
        },
      },
      tooltip: {
        trigger: 'item', // item
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
        boundaryGap: true, // option
        type: 'category',
        data: sevendays,
        name: '日期',
      },
      yAxis: {
        type: 'value',
        name: '文章数量',
      },
      animationDuration: 2000,
      series: [
        {
          name: 'created',
          data: createdData,
          showSymbol: true,
          type: 'line',
          symbolSize: 10,
          endLabel: {
            show: true,
            formatter: '{a}',
            distance: 20,
          },
          // areaStyle: {
          // normal: {
          //   color: "green", //改变区域颜色
          //   lineStyle: {
          //     color: "green", //改变折线颜色
          //   },
          // },
          // },
          lineStyle: {
            width: 4,
            // color: 'purple'
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
            width: 4,
          },
          symbolSize: 10,
          type: 'line',
          showSymbol: true,
          endLabel: {
            show: true,
            formatter: '{a}',
            distance: 20,
          },
          // areaStyle: {},
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

    myChart.setOption(option);
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
  shouldUpdate() {
    return false;
  },
};

module.exports = Sevendays;
