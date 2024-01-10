/*\
title: $:/plugins/oeyoews/editor-preview-resizer/widget.js
type: application/javascript
module-type: widget

editor-preview-resizer widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class EditorResizer extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const domNode = this.document.createElement('div');
    domNode.className =
      'w-1 hover:cursor-ew-resize bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-all h-3/5 rounded-full absolute left-1/2 -translate-x-1/2';
    // domNode.addEventListener('pointerdown', (e) => {
    //   e.preventDefault();
    //   console.log('resizing');
    // });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description editor-preview-resizer widget
 */
exports.editorResizer = EditorResizer;
