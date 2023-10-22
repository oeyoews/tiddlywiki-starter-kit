/*\
title: $:/plugins/oeyoews/workspaces/workspaces-widget.js
type: application/javascript
module-type: widget

workspace(WIP)
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class WorkSpacesWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    const wiki = $tw.wiki;

    const storyListTiddler = '$:/StoryList';
    const workspaceListTiddler = '$:/workspaces';

    const { workspace = 'new' } = this.attributes;

    const getList = (tiddler) => {
      const { list } = wiki.getTiddler(tiddler).fields;
      return list;
    };

    const saveListToWorkspace = () => {
      const storyList = getList(storyListTiddler);
      wiki.setText(workspaceListTiddler, 'list', null, storyList);
      wiki.setText(workspaceListTiddler, 'text', null, '{{!!list}}');
    };

    const setStoryList = (list) => {
      if (workspace !== 'new') {
        alert(`即将恢复到 ${localStorage.workspacename} `);
      }
      wiki.setText(storyListTiddler, 'list', null, list); // create
    };

    const domNode = createElement('button', {
      class: 'p-2',
      text: workspace,
    });

    // TOOD: just use save and new, 循环切换需要考虑的情况太多了

    // TODO: 重构数据结构, 支持多列表
    domNode.addEventListener('click', () => {
      if (workspace === 'previous') {
        const previous = getList(workspaceListTiddler);
        setStoryList(previous);
        saveListToWorkspace();
      }
      if (workspace === 'new') {
        // TODO: 允许用户是否选择保存list
        const workspacename = prompt(
          'Please input saved workspace name',
          'desktop 01',
        );
        if (!workspacename) {
          // alert('你取消了操作');
          return;
        }
        localStorage.workspacename = workspacename;
        saveListToWorkspace();
        setStoryList();
      }
      // NOTE: 需要确保刷新widget
      // this.refreshSelf();
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

exports.workspaces = WorkSpacesWidget;
