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
  // const zoomMermaid = require('./zoomMermaid.js')();

  function centerSvg(svg) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const style = doc.querySelector('svg').style;
    style.display = 'block';
    style.margin = '0 auto';
    return doc.documentElement.outerHTML;
  }

  // function getStyleFromSvg(svg) {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(svg, 'image/svg+xml');
  //   return doc.querySelector('svg').style.cssText;
  // }

  // function svg2Img(svg) {
  //   const style = getStyleFromSvg(svg);
  //   return `<img src="data:image/svg+xml,${encodeURIComponent(svg)}" class="spotlight" style="${style}"/>`;
  // }

  CodeBlockWidget.prototype.mermaidRender = async function () {
    const language = this.language;
    if (language !== 'mermaid') return;
    const mermaid = require('./mermaid.tiny.js');
    const options = {
      securityLevel: 'loose',
      theme: 'default',
      startOnLoad: false,
      htmlLabels: true,
      logLevel: 5,
      suppressErrorRendering: true,
    };
    mermaid.initialize(options);

    const domNode = this.domNodes[0];
    const mermaidText = domNode.textContent;

    try {
      await mermaid.parse(mermaidText, {
        suppressErrors: false,
      });

      const mermaidId = 'mermaid_' + Date.now();
      const { svg } = await mermaid.render(mermaidId, mermaidText);

      domNode.children[0].outerHTML = centerSvg(svg);
      domNode.style.backgroundColor = 'transparent';
      domNode.style.border = 'none';

      // 开启放大和缩小, 拖拽
      // zoomMermaid(domNode);
    } catch (e) {
      domNode.children[0].innerHTML = e.message;
      domNode.children[0].style.color = 'red';
    }
  };
};
