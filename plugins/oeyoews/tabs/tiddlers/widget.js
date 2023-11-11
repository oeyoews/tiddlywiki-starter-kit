/*\
title: $:/plugins/oeyoews/tabs/widget.js
type: application/javascript
module-type: widget

tabs widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class TabsWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const { tiddlers } = this.attributes;
    const createElement = $tw.utils.domMaker;

    const buttonsContainer = this.document.createElement('div');
    buttonsContainer.className = 'rounded-lg flex justify-center items-center';
    const buttons = this.document.createElement('div');
    buttons.className = 'space-x-2 p-1 bg-neutral-200';
    buttonsContainer.append(buttons);

    let children = [buttonsContainer];
    let tiddlersList = tiddlers.split(' ');

    tiddlersList.forEach((tiddler, index) => {
      const btn = this.document.createElement('button');
      btn.textContent = tiddler;
      btn.className = 'p-2 rounded transiton-all duration-400';
      btn.id = `btn-${index}`;
      buttons.append(btn);
      const content = document.createElement('div');
      content.className = 'tab';
      content.id = `tab-${index}`;
      const tiddlerContent = $tw.wiki.renderTiddler('text/html', tiddler);
      content.innerHTML = tiddlerContent;
      if (index !== 0) {
        content.style.display = 'none';
      }
      children.push(content);
      btn.addEventListener('click', () =>
        openTab(`tab-${index}`, `btn-${index}`),
      );
    });

    const openTab = (tab, btn) => {
      const buttons = buttonsContainer.querySelectorAll('button');
      const tabs = document.getElementsByClassName('tab');
      Array.from(buttons).forEach((btn) =>
        btn.classList.remove('bg-neutral-100'),
      );
      Array.from(tabs).forEach((tab) => (tab.style.display = 'none'));
      document.getElementById(tab).style.display = 'block';
      document.getElementById(btn).classList.add('bg-neutral-100');
    };

    const domNode = createElement('div', {
      children,
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
  refresh() {
    return false;
  }
}

/**
 * @description tabs widget
 * @param
 */
exports.tabs = TabsWidget;
