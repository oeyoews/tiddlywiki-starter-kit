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
      buttons.append(btn);
      const content = document.createElement('div');
      if (index === 0) {
        const tiddlerContent = $tw.wiki.renderTiddler('text/html', tiddler);
        content.innerHTML = tiddlerContent;
        children.push(content);
      }
    });

    buttons.addEventListener('click', () => {
      new $tw.Notify().display({ text: 'update' });
      this.refreshSelf();
      domNode.classList.add('bg-black');
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
