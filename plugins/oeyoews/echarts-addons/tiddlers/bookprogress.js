/*\
title: addon/bookprogress.js
type: application/javascript
description:

// module-type: echarts-component

\*/
const getData = (tag) => {
  return {
    name: tag,
    value: $tw.wiki.filterTiddlers(`[tag[${tag}]!has[draft.of]]`).length
  };
};

const goto = new $tw.Story();

const BookProgress = {
  onUpdate(myChart, _, addonAttributes) {
    const {
      title: text,
      filter = '[tags[]!prefix[$:/]]',
      sort = 'descend',
      width = 2,
      radius = 10,
      toolbox = 'hide',
      doughnut,
      focusSelf,
      legend
    } = addonAttributes;
    // NOTE: data 必须在执行 onUpdate 函数的时候获取到最新数据，不要写在 onUpdate 函数外面
    const data = [];

    // alpha sort default
    // 超过 50 不显示
    const tags = $tw.wiki.filterTiddlers(filter).slice(0, 50).sort();
    tags.forEach((tag) => data.push(getData(tag)));

    const borderWidth = data.length > 10 ? 0 : width;
    const borderRadius = data.length > 10 ? 5 : radius;

    // 如果类型过多，width 自动设置为 0, 此时无视用户的 width 配置
    // 配置具体参考 echarts 官方文档
    const option = {
      title: {
        text,
        subtext: '',
        left: 'left',
        top: 'top'
      },
      toolbox: {
        show: toolbox === 'show' ? true : false,
        left: 0,
        bottom: 0,
        feature: {
          dataView: { show: true, readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const { name, value, percent } = params;
          if (value) {
            return `${name} 标签 有 ${value} 个条目 (${percent}%)`;
          } else {
            return `${name} 条目`;
          }
        }
      },
      legend: {
        show: legend === 'yes' ? true : false,
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        type: 'scroll'
      },
      series: [
        {
          name: 'Tag',
          type: 'pie',
          radius: doughnut === 'yes' ? ['40%', '70%'] : '50%',
          center: legend === 'yes' ? ['40%', '50%'] : '50%',
          data,
          itemStyle: {
            borderRadius,
            borderWidth,
            borderColor: '#fff'
          },
          emphasis: {
            focus: focusSelf === 'yes' ? 'self' : '',
            itemStyle: {}
          }
        }
      ]
    };

    // descend or ascend sort
    data.sort(function (a, b) {
      return sort === 'descend' ? b.value - a.value : a.value - b.value;
    });

    myChart.setOption(option);
  },

  // TODO: need refresh manually here
  shouldUpdate(_, changedTiddlers) {
    const filteredChangedTiddlers = Object.keys(changedTiddlers).filter(
      (tiddler) =>
        tiddler === '$:/info/darkmode' ||
        (!tiddler.startsWith('$:/') && !tiddler.startsWith('Draft of'))
    );
    return filteredChangedTiddlers.length ? true : false;
  }
};

// default export
module.exports = BookProgress;
