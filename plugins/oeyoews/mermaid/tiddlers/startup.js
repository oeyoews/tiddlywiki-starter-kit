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

  function centerSvg(svg) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const style = doc.querySelector('svg').style;
    style.display = 'block';
    style.margin = '0 auto';
    return doc.documentElement.outerHTML;
  }
  function getStyleFromSvg(svg) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    return doc.querySelector('svg').style.cssText;
  }
  function svg2Img(svg) {
    const style = getStyleFromSvg(svg);
    return `<img src="data:image/svg+xml,${encodeURIComponent(svg)}" class="spotlight" style="${style}"/>`;
  }

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
    try {
      // const isValidMermaidText =
      await mermaid.parse(mermaidText, {
        suppressErrors: false,
      });

      const { svg } = await mermaid.render(
        'mermaid_' + Date.now(),
        mermaidText,
      );
      // NOTE: 直接替换domeNode, 会导致removeChild 报错
      // domNode.children[0].outerHTML = svg2Img(centerSvg(svg)); // 替换成image, 需要转换base64, 这可能会导致卡顿
      domNode.children[0].outerHTML = centerSvg(svg);
      domNode.style.backgroundColor = 'transparent'; // remove <pre> background style
    } catch (e) {
      domNode.children[0].innerHTML = e.message;
      domNode.children[0].style.color = 'red';
    }
  };
};
