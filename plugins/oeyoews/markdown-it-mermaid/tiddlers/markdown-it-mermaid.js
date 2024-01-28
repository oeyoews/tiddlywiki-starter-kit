const { mermaidAPI } = require('$:/plugins/orange/mermaid-tw5/mermaid.min.js');

const mermaidChart = (code) => {
  try {
    // NOTE: 有问题，渲染失败
    /*     const html = $tw.wiki.renderText(
      'text/html',
      'text/vnd.tiddlywiki.mermaid',
      'graph a'
    );
    console.log(code, html);
    return html; */
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`;
  }
};

const MermaidPlugin = (md) => {
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === 'mermaid') {
      return mermaidChart(code);
    }
  };
};

module.exports = MermaidPlugin;
