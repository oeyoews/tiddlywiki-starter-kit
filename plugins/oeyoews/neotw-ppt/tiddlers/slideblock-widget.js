/*\
title: $:/plugins/oeyoews/neotw-ppt/slideblock-widget.js
type: application/javascript
module-type: widget

neotw-ppt widget

\*/
const { assignDataset } = require('./utils');
const CodeBlockWidget =
  require('$:/core/modules/widgets/codeblock.js').codeblock;

class SlideCodeblockWidget extends CodeBlockWidget {
  postRender() {
    let { code, language, id, ...dataAttrs } = this.attributes;
    this.domNodes[0].children[0].classList.add(language);
    assignDataset(this.domNodes[0].children[0].dataset, dataAttrs);
    assignDataset(this.domNodes[0].dataset, { id });
    this.domNodes[0]
      .querySelectorAll('table')
      .forEach((t) => (t.style.border = 'none'));
  }
}

exports.slidecodeblock = SlideCodeblockWidget;
