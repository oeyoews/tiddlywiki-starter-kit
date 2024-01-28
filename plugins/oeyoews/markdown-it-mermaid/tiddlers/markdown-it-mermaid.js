const MermaidPlugin = (md) => {
  const {
    mermaidAPI: mermaid
  } = require('$:/plugins/orange/mermaid-tw5/mermaid.min.js');

  // extends md api: add mermaid api
  md.mermaid = mermaid;

  const temp = md.renderer.rules.fence.bind(md.renderer.rules);

  /*   mermaid.parseError = function (err, hash) {
    console.log(err);
  };
 */
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    // TODO: support render title
    // TODO: use https://github.com/agoose77/markdown-it-mermaid/blob/main/src/index.ts to render as img to encodeurl
    const [type, theme, ...title] = token.info.split(' ');
    if (type === 'mermaid') {
      try {
        const config = {
          securityLevel: 'loose',
          theme: theme || 'default',
          startOnLoad: false,
          htmlLabels: true,
          ...options
        };
        mermaid.initialize(config);
        return mermaid.render('mermaid' + idx, code);
      } catch (e) {}
    }
    return temp(tokens, idx, options, env, slf);
  };
};

module.exports = MermaidPlugin;
