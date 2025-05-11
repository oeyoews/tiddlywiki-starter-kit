/*\
title: $:/plugins/oeyoews/mermaid/startup.js
type: application/javascript
module-type: startup

\*/

exports.platforms = ['browser'];
exports.synchronous = true;

exports.startup = function () {
  const CodeBlockWidget =
    require('$:/core/modules/widgets/codeblock.js').codeblock;
  const options = require('./mermaidDefaultConfig.js');
  const createDownloadBtn = require('./createDownloadBtn.js');

  CodeBlockWidget.prototype.mermaidRender = async function () {
    const language = this.language;
    if (language !== 'mermaid') return;
    const mermaid = require('./mermaid.tiny.js');
    mermaid.initialize(options);

    const domNode = this.domNodes[0];
    domNode.classList.add('mermaid-container');
    const mermaidText = domNode.textContent;

    // 添加加载指示器
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = '加载中...';
    loadingDiv.style.textAlign = 'center';
    loadingDiv.style.padding = '10px';
    loadingDiv.style.color = '#666';
    domNode.appendChild(loadingDiv);

    try {
      await mermaid.parse(mermaidText, {
        suppressErrors: false,
      });

      const mermaidId = 'mermaid_' + Date.now();
      // 如果需要测试延迟，保留这段代码，否则可以移除
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 1000);
      // });
      const { svg } = await mermaid.render(mermaidId, mermaidText);

      // 移除加载指示器
      domNode.removeChild(loadingDiv);

      // 将SVG内容添加到DOM
      domNode.children[0].outerHTML = svg;
      createDownloadBtn(domNode, svg);
    } catch (e) {
      // 移除加载指示器
      domNode.removeChild(loadingDiv);

      domNode.children[0].innerHTML = e.message;
      domNode.children[0].style.color = 'red';
    }
  };
};
