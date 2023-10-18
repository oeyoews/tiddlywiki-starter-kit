/*\
title: $:/plugins/oeyoews/workspaces/workspaces-widget.js
type: application/javascript
module-type: widget

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

    const { workspace } = this.attributes;

    const getList = (tiddler) => {
      const { list } = wiki.getTiddler(tiddler).fields;
      return list.filter((title) => !title.startsWith('Draft of')).join(' ');
    };

    const saveListToWorkspace = () => {
      const storyList = getList(storyListTiddler);
      wiki.setText(workspaceListTiddler, 'list', null, storyList);
    };

    const setStoryList = (list) => {
      wiki.setText(storyListTiddler, 'list', null, list); // create
    };

    const domNode = createElement('button', {
      class: 'p-2',
      text: workspace,
    });

    // TOOD: just use save and new, 循环切换需要考虑的情况太多了

    domNode.addEventListener('click', () => {
      if (workspace === 'previous') {
        const currentList = getList(storyListTiddler);
        const previous = getList(workspaceListTiddler);
        setStoryList(previous);
        saveListToWorkspace(currentList);
      }
      if (workspace === 'new') {
        saveListToWorkspace();
        setStoryList();
      }
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

exports.workspaces = WorkSpacesWidget;
