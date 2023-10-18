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
    const workspaceDataTiddler = '$:/workspaces';

    const { workspace = 'new' } = this.attributes;

    // draft 自动会用双引号, 这里暂不处理
    const getCurrentStoryList = () => {
      const { list } = wiki.getTiddler(storyListTiddler).fields || [];
      return list.filter((title) => !title.startsWith('Draft of')).join(' ');
    };

    const saveCurrentStoryList = () => {
      const currentList = getCurrentStoryList();
      wiki.setText(workspaceDataTiddler, 'one', null, currentList);
    };

    // save and new
    // TODO: support saved List name, such home, work, life, like pc workspace
    const createNewWorkspace = () => {
      saveCurrentStoryList();
      setWorkspace();
    };

    const setWorkspace = (list = '') => {
      wiki.setText(storyListTiddler, 'list', null, list); // create
    };

    // list all workspace, and support click to switch
    const listAllWorkspaces = () => {};

    const getoneWorkSpace = () => {
      const { one: oneList } = wiki.getTiddler(workspaceDataTiddler)?.fields;
      return oneList;
    };

    // maybe use timestamp
    const getPreviousWorkspace = () => {
      const oneList = getoneWorkSpace();
      setWorkspace(oneList);
    };

    // DONE: create new workspace
    // TODO: switch workspace
    // workspace naming
    // reset, next, previous, recycle
    const domNode = createElement('button', {
      text: workspace,
    });

    function main() {
      console.log(workspace);
      switch (workspace) {
        case 'new':
          createNewWorkspace();
          console.log('create new workspace');
          break;
        case 'previous':
          getPreviousWorkspace();
          console.log('previous');
          break;
        default:
        //   nothing;
      }
    }

    domNode.addEventListener('click', main);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

exports.workspaces = WorkSpacesWidget;
