const {
  mermaidAPI: mermaid
} = require('$:/plugins/orange/mermaid-tw5/mermaid.min.js');

const MermaidPlugin = (md) => {
  // extends md api: add mermaid api
  md.mermaid = mermaid;

  const defaultFenceRender = md.renderer.rules.fence;

  /*   mermaid.parseError = function (err, hash) {
    console.log(err);
  };
 */
  const customMermaidFenceRender = (tokens, idx, options = {}, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    // TODO: support render title
    // TODO: use https://github.com/agoose77/markdown-it-mermaid/blob/main/src/index.ts to render as img to encodeurl
    const [type, theme, ...title] = token.info.split(' ');
    if (type.trim() !== 'mermaid') {
      return defaultFenceRender(tokens, idx, (options = {}), env, slf);
    } else if (type.trim() === 'mermaid') {
      // return 在外面会导致terser 报错
      if (!mermaid) {
        console.warn('please install orange/mermaid-tw5 tiddlywiki plugin');
        return;
      }

      try {
        // @see-also: https://mermaid.js.org/config/schema-docs/config.html
        /* const palette = $tw.wiki.getTiddlerText('$:/palette');
        const darkMode =
          $tw.wiki.getTiddler(palette)?.fields['color-scheme'] === 'dark'
            ? true
            : false; */
        const config = {
          securityLevel: 'loose',
          theme: theme || 'default', //  "default" | "forest" | "dark" | "neutral"
          // startOnLoad: false, // ???
          htmlLabels: true
          // TODO: NOT work
          // darkMode
          // ...options // 这里会导致渲染问题
        };
        mermaid.initialize(config);
        const id = 'mermaid_' + idx;
        let imageHTML = '';
        let imageAttrs = [];
        mermaid.render(id, code, (html) => {
          let svg = this.document.getElementById(id);
          if (svg) {
            imageAttrs.push([
              'style',
              `max-width:${svg.style.maxWidth};max-height:${svg.style.maxHeight}`
            ]);
          }
          // Store HTML
          imageHTML = html;
        });
        imageAttrs.push([
          'src',
          `data:image/svg+xml,${encodeURIComponent(imageHTML)}`
        ]);

        return `<img ${slf.renderAttrs({ attrs: imageAttrs })}>`;
      } catch (e) {
        return `<pre>${code}</pre>`;
      }
    }
  };

  md.renderer.rules.fence = customMermaidFenceRender;
};

module.exports = MermaidPlugin;
