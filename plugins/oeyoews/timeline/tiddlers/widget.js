/*\
title: $:/plugins/oeyoews/timeline/widget.js
type: application/javascript
module-type: widget

timeline widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class TimelineWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;
    const TL = require('./timeline');

    const createElement = $tw.utils.domMaker;

    const sharedImage =
      'https://images.unsplash.com/photo-1741851374430-d242e0dcd70c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    const timelineData = {
      title: {
        text: {
          headline: '科技发展简史',
          text: '<p>以下是科技发展中几个重要时间点的记录。</p>',
        },
        media: {
          url: sharedImage,
          caption: '统一背景图（来自 Unsplash）',
        },
      },
      events: [
        {
          start_date: {
            year: '2003',
            month: '10',
            day: '15',
          },
          text: {
            headline: '五号发射成功',
            text: '<p>杨利伟成为首位进入太空的中国人。</p>',
          },
          media: {
            url: sharedImage,
            caption: '神舟五号发射现场',
          },
        },
        {
          start_date: {
            year: '2019',
            month: '1',
            day: '3',
          },
          text: {
            headline: '嫦娥四号登陆月球背面',
            text: '<p>人类首次在月球背面成功着陆。</p>',
          },
          media: {
            url: sharedImage,
            caption: '嫦娥四号任务',
          },
        },
        {
          start_date: {
            year: '2020',
            month: '6',
            day: '23',
          },
          text: {
            headline: '北斗三号系统建成',
            text: '<p>中国完成全球导航系统组网。</p>',
          },
          media: {
            url: sharedImage,
            caption: '北斗三号发射现场',
          },
        },
      ],
    };

    const domNode = createElement('div');
    domNode.style.height = '50vh';
    new TL.Timeline(domNode, timelineData);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description timeline widget */
exports['timeline'] = TimelineWidget;
