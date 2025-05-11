/*\
title: $:/plugins/oeyoews/mermaid/startup.js
type: application/javascript
module-type: startup

\*/

exports.platforms = ['browser'];
exports.synchronous = true;

// cache
// loading
exports.startup = function () {
  const CodeBlockWidget =
    require('$:/core/modules/widgets/codeblock.js').codeblock;
  // const zoomMermaid = require('./zoomMermaid.js')();
  const options = require('./mermaidDefaultConfig.js');
  const createDownloadBtn = require('./createDownloadBtn.js');

  CodeBlockWidget.prototype.mermaidRender = async function () {
    const language = this.language;
    if (language !== 'mermaid') return;
    const mermaid = require('./mermaid.tiny.js');
    mermaid.initialize(options);

    const domNode = this.domNodes[0];
    const mermaidText = domNode.textContent;

    try {
      await mermaid.parse(mermaidText, {
        suppressErrors: false,
      });

      const mermaidId = 'mermaid_' + Date.now();
      const { svg } = await mermaid.render(mermaidId, mermaidText);

      // 将SVG内容添加到DOM
      domNode.children[0].outerHTML = svg;
      // domNode.style.backgroundColor = 'transparent';
      // domNode.style.border = 'none';
      createDownloadBtn(domNode, svg);

      // 开启放大和缩小, 拖拽
      // zoomMermaid(domNode);
    } catch (e) {
      domNode.children[0].innerHTML = e.message;
      domNode.children[0].style.color = 'red';
    }
  };
};
