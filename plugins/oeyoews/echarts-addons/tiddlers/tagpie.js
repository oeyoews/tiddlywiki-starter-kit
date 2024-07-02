/*\
title: addon/tagpie.js
module-type: echarts-component
type: application/javascript
description: tag pie on tiddlywiki

\*/

const getData = (tag) => {
  return {
    name: tag,
    value: $tw.wiki.filterTiddlers(`[tag[${tag}]!has[draft.of]]`).length
  };
};

const goto = new $tw.Story();

const gotoTagTiddler = (params) => {
  const title = params.name;
  const existTiddler = $tw.wiki.tiddlerExists(title);
  if (!existTiddler) {
    console.log(title + ' not found');
    return;
  }
  // parentWidget.dispatchEvent( { type: 'tm-navigate', navigateTo: title } )
  goto.navigateTiddler(title);
};

/**
 * @description 理论上所有的 option 配置都可以暴露出来，这里仅仅暴露一些常用的配置，echarts 将这些工作交给了 addon, 大概是不同类型的 addon 处理起来比较复杂，但是与此同时，addon 就更具有扩展性
 * @param filter 默认是用户的所有 tiddler, 但是你也可以使用 filter='[tag[Journal]]' 列出所有的 Journal tiddler
 * @param title
 * @param radius
 * @param sort {descend|ascend}
 * @param doughnut {'yes'}
 * @param width {0}
 * @param legend {'yes'}
 * @param toolbox {'show'|'hide'}
 */
const TagPie = {
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
    myChart.on('click', 'series', gotoTagTiddler);
    // 如何在这里监听 change 事件，从而实现自动刷新主题
  },

  // TODO: need refresh manually here
  shouldUpdate(_, changedTiddlers) {
    // tw 里面即使是一个 state tiddler 变换都会触发这个函数的调用
    // changeTiddlers 会包含一些系统 tiddler 的状态变换 tiddler, 应该去掉
    // log 输出不了，但是 alert 却可以
    const filteredChangedTiddlers = Object.keys(changedTiddlers).filter(
      (tiddler) =>
        tiddler === '$:/info/darkmode' ||
        (!tiddler.startsWith('$:/') && !tiddler.startsWith('Draft of'))
    );
    // TODO
    return filteredChangedTiddlers.length ? true : false;
    // return true;
  }
};

// default export
module.exports = TagPie;
