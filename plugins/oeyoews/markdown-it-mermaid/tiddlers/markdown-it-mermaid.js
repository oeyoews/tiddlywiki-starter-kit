/*\
title: $:/plugins/oeyoews/markdown-it-mermaid/markdown-it-mermaid.js
type: application/javascript
module-type: markdownit

@see-also https://talk.tiddlywiki.org/t/zoomin-info-messes-with-svg-rendering-somehow/4095/13
\*/
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

function getStyle(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'image/svg+xml');
  const cssText = doc.querySelector('svg').style.cssText;
  return cssText;
}

/**
 * 更新 mermaid
 * @param {*} id
 * @param {*} mermaidText
 */
function dispatchEvent(id, mermaidText) {
  const event = new CustomEvent('mermaidReady', {
    detail: {
      id,
      text: mermaidText,
    },
  });
  document.dispatchEvent(event);
}

// @see-also: https://mermaid.js.org/config/schema-docs/config.html
/* const palette = $tw.wiki.getTiddlerText('$:/palette');
        const darkMode =
          $tw.wiki.getTiddler(palette)?.fields['color-scheme'] === 'dark'
            ? true
            : false; */
const mermadiOptions = {
  securityLevel: 'loose',
  theme: 'default', // theme: theme || 'default', //  "default" | "forest" | "dark" | "neutral"
  startOnLoad: false, // 会自动寻找 mermaid class
  htmlLabels: true,
  // darkMode // TODO: NOT work
  // ...options // 这里会导致渲染问题
};
const rendertype = $tw.wiki.getTiddlerText(
  '$:/config/markdown-it-mermaid/rendertype',
);

const centerStyle = (html, id) => {
  return `<div style="text-align:center;" class="_mermaid" id="${id}" >${html}</div>`;
};

const vanilaMermaid = 'mermaid.min.js';
// const hasVanillaMermaid =
//   $tw.modules.types.library.hasOwnProperty(vanilaMermaid);
let mermaid;

async function renderMermaid(detail) {
  try {
    const isValidMermaidText = await mermaid.parse(detail.text, {
      suppressErrors: false,
    });
    if (!isValidMermaidText) {
      return; // 仅仅在supressErrors为true的情况下
    }
    const { svg } = await mermaid.render('fake_' + detail.id, detail.text);

    if (rendertype === 'png') {
      const img = document.createElement('img');
      img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      img.style.cssText = getStyle(svg);
      img.className = 'spotlight';
      const el1 = document.getElementById(detail.id);
      el1.outerHTML = `<div style="text-align:center;" id="${detail.id}"></div>`;
      const el2 = document.getElementById(detail.id);
      el2.append(img);
    } else {
      el.outerHTML = svg;
    }
  } catch (e) {
    const el = document.getElementById(detail.id);
    if (el) {
      const errNode = `<pre><code>${detail.text}</code>\n<code style="color:red">${e.message}</code></pre>`;
      el.outerHTML = errNode;
    } else {
      console.warn(e);
    }
  }
}

const generateRandomString = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join('');
};

try {
  mermaid = require(vanilaMermaid);
  mermaid.initialize(mermadiOptions);
  document.addEventListener('mermaidReady', ({ detail }) =>
    renderMermaid(detail),
  );
} catch (e) {
  console.warn(e);
}

const MermaidPlugin = (md) => {
  // md.mermaid = mermaid;
  const defaultFenceRender = md.renderer.rules.fence;
  const getStyle = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'image/svg+xml');
    const cssText = doc.querySelector('svg').style.cssText;
    return cssText;
  };

  const customMermaidFenceRender = (tokens, idx, options = {}, env, self) => {
    const token = tokens[idx];
    const mermaidText = token.content.trim();
    let [type, theme, ...title] = token.info.split(' ');
    const firstLine = mermaidText.split(/\n/)[0].trim();
    // NOTE: 这种 GitHub's mermaid lib is to low, so not support
    if (
      firstLine === 'gantt' ||
      firstLine === 'sequenceDiagram' ||
      firstLine.match(/^graph(?: (TB|BT|RL|LR|TD))?(;)?$/)
    ) {
      type = 'mermaid';
    }

    if (type.trim() !== 'mermaid') {
      // 使用默认的 fence 规则
      return defaultFenceRender(tokens, idx, (options = {}), env, self);
    } else if (type.trim() === 'mermaid') {
      const id = 'mermaid_99' + generateRandomString(5);
      // 提示安装 mermaid-lib
      if (!mermaid) {
        return `<pre style="color:red;">${mermaidText}\n Maybe you forget install a mermaid library plugin.</pre>`;
      }

      dispatchEvent(id, mermaidText);
      // 自定义渲染 mermaid, 通过自定义事件触发
      return `<pre style="opacity:0;" id="${id}">${mermaidText}</pre>`;
      // @deprecated
      try {
        // mermaid.initialize(mermadiOptions);

        // 或者通过查询mermmaid_ 的id个数, 或者判断是否存在相同的id;
        let imageHTML = '';
        let domNode = '';
        const imageAttrs = [];

        const { svg } = mermaid.render(id, mermaidText);
        imageHTML = svg;
        if (!imageHTML) {
          throw new CustomError(mermaidText);
        }

        switch (rendertype) {
          case 'svg':
            domNode = centerStyle(imageHTML, id);
            break;
          case 'png':
            const cssText = getStyle(imageHTML);
            imageAttrs.push(['style', cssText]);

            imageAttrs.push([
              'src',
              `data:image/svg+xml,${encodeURIComponent(imageHTML)}`,
            ]);

            domNode = centerStyle(
              `<img ${self.renderAttrs({ attrs: imageAttrs })} />`,
            );
            break;
          default:
            domNode = centerStyle(imageHTML);
            break;
        }

        return domNode;
      } catch (e) {
        let errormessage = '';
        if (e instanceof CustomError) {
          errormessage = e.message;
        } else {
          errormessage = e.message.toString().split('\n').slice(1).join('\n');
        }
        return `<pre style="color:#ff1919;">${errormessage}</pre>`;
      }
    }
  };

  md.renderer.rules.fence = customMermaidFenceRender;
};

module.exports = MermaidPlugin;
