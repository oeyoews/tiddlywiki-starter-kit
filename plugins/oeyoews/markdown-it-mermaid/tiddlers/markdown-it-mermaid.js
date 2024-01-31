/*\
title: $:/plugins/oeyoews/markdown-it-mermaid/markdown-it-mermaid.js
type: application/javascript
module-type: markdownit

@see-also https://talk.tiddlywiki.org/t/zoomin-info-messes-with-svg-rendering-somehow/4095/13
\*/

const getHTML = (html) => {
  return `<div style="text-align:center;">${html}</div>`;
};

const vanilaMermaid = 'mermaid-930.min.js';
const hasVanillaMermaid =
  $tw.modules.types.library.hasOwnProperty(vanilaMermaid);
let mermaid;

const generateRandomString = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

try {
  const { mermaidAPI } = hasVanillaMermaid
    ? require(vanilaMermaid)
    : require('$:/plugins/orange/mermaid-tw5/mermaid.min.js');
  mermaid = mermaidAPI;
  // mermaid.flowchartConfig = { width: '100%' };
} catch (e) {
  console.warn(e);
}

mermaid.parseError = function (err, hash) {
  console.log(err, hash);
  // displayErrorInGui(err);
};

const MermaidPlugin = (md) => {
  // extends md api: add mermaid api
  //  md.mermaid = mermaid;

  const defaultFenceRender = md.renderer.rules.fence;

  /* mermaid.parseError = function (err, hash) { console.log(err); }; */
  const customMermaidFenceRender = (tokens, idx, options = {}, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    // TODO: support render title
    // TODO: use https://github.com/agoose77/markdown-it-mermaid/blob/main/src/index.ts to render as img to encodeurl
    let [type, theme, ...title] = token.info.split(' ');
    const firstLine = code.split(/\n/)[0].trim();
    // NOTE: 这种github 不支持
    if (
      firstLine === 'gantt' ||
      firstLine === 'sequenceDiagram' ||
      // firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)
      firstLine.match(/^graph(?: (TB|BT|RL|LR|TD))?(;)?$/)
    ) {
      type = 'mermaid';
    }

    if (type.trim() !== 'mermaid') {
      return defaultFenceRender(tokens, idx, (options = {}), env, slf);
    } else if (type.trim() === 'mermaid') {
      // return 在外面会导致terser 报错
      if (!mermaid) {
        console.warn('please install orange/mermaid-tw5 tiddlywiki plugin');
        return `<pre>${code}</pre>`;
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
          startOnLoad: false, // 会自动寻找 mermaid class
          htmlLabels: true
          // TODO: NOT work
          // darkMode
          // ...options // 这里会导致渲染问题
        };
        mermaid.initialize(config);

        // 或者通过查询mermmaid_ 的id个数, 或者判断是否存在相同的id;
        // NOTE: 多个ID, 将会导致渲染错误的时候一直插入多个错误警告
        const id = 'mermaid_' + generateRandomString(5);
        let imageHTML = '';
        let domNode = '';
        const imageAttrs = [];

        const rendertype = $tw.wiki.getTiddlerText(
          '$:/config/markdown-it-mermaid/rendertype'
        );

        // NOTE: if use async here, markdownit-extensions-startup dont fit this, shouldbe singly load mermaid by md with async
        mermaid.render(id, code, (html) => {
          imageHTML = html;

          if (rendertype !== 'png') return;

          const svg = this.document.getElementById(id);
          if (svg) {
            imageAttrs.push([
              'style',
              `max-width:${svg.style.maxWidth};max-height:${svg.style.maxHeight}`
            ]);

            imageAttrs.push([
              'src',
              `data:image/svg+xml,${encodeURIComponent(html)}`
            ]);
          }
        });

        switch (rendertype) {
          case 'svg':
            domNode = getHTML(imageHTML);
            break;
          case 'png':
            domNode = getHTML(
              `<img ${slf.renderAttrs({ attrs: imageAttrs })} />`
            );
            console.log(domNode);
            break;
          default:
            domNode = getHTML(imageHTML);
            break;
        }

        return domNode;
      } catch (e) {
        const errormessage = e.toString().split('\n').slice(1).join('\n');
        return `<pre style="color:#ff1919;">${errormessage}</pre>`;
      }
    }
  };

  md.renderer.rules.fence = customMermaidFenceRender;
};

module.exports = MermaidPlugin;
