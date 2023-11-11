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

    const { tiddlers = 'HMAC' } = this.attributes;
    const createElement = $tw.utils.domMaker;

    const buttonsContainer = this.document.createElement('div');
    buttonsContainer.className = 'rounded flex justify-center items-center';
    const buttons = this.document.createElement('div');
    buttons.className = 'space-x-2 bg-neutral-100 p-2 rounded';
    buttonsContainer.append(buttons);

    let children = [buttonsContainer];
    let tiddlersList = tiddlers.split(' ');

    tiddlersList.forEach((tiddler, index) => {
      const btn = this.document.createElement('button');
      btn.textContent = tiddler;
      btn.className = 'p-2 rounded bg-neutral-200';
      index === 0 && btn.classList.add('bg-neutral-300');
      btn.setAttribute('data-tab-id', index);
      buttons.append(btn);
      const content = document.createElement('div');
      content.className = 'tab-content';
      const tiddlerContent = $tw.wiki.renderTiddler('text/html', tiddler);
      content.innerHTML = tiddlerContent;
      index !== 0 && content.classList.add('hidden');
      children.push(content);
      btn.addEventListener('click', () => {
        content.classList.remove('hidden');
      });
    });

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
