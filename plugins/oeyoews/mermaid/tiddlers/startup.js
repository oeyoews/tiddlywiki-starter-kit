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

  CodeBlockWidget.prototype.mermaidRender = async function () {
    const language = this.language;
    if (language !== 'mermaid') return;
    const mermaid = require('mermaid.min.js');
    const options = {
      securityLevel: 'loose',
      theme: 'default',
      startOnLoad: false,
      htmlLabels: true,
      logLevel: 5, // https://mermaid.js.org/config/schema-docs/config.html#loglevel
      suppressErrorRendering: true,
    };
    mermaid.initialize(options);

    const domNode = this.domNodes[0];
    const mermaidText = domNode.textContent;

    // TODO: 生成image
    // TODO: 替换pre???
    try {
      // const isValidMermaidText =
      await mermaid.parse(mermaidText, {
        suppressErrors: false,
      });

      const { svg } = await mermaid.render(
        'mermaid_' + Date.now(),
        mermaidText,
      );
      domNode.children[0].innerHTML = svg;
    } catch (e) {
      domNode.children[0].innerHTML = e.message;
      domNode.children[0].style.color = 'red';
    }
  };
};
