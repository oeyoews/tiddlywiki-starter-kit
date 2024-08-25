/*\
title: $:/plugins/oeyoews/mermaid-widget/widget.js
type: application/javascript
// module-type: widget

mermaid widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class MermaidWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.mermaid;
    this.theme = 'default';
    this.rendertype = 'svg';
  }

  async render(parent, nextSibling) {
    this.computeAttributes();
    this.execute();
    this.parentDomNode = parent;

    const domNode = this.document.createElement('div');
    if (domNode.isTiddlyWikiFakeDom) {
      console.warn('SSR not support export mermaid chart');
      return;
    }
    this.getmermaid();

    const { theme, rendertype } = this.attributes;
    theme && (this.theme = theme);
    rendertype && (this.rendertype = rendertype);

    parent.insertBefore(domNode, nextSibling);
    this.renderChildren(domNode, null);
    this.domNodes.push(domNode);

    // console.log(domNode.textContent);
    if (domNode.innerHTML) {
      domNode.innerHTML = await this.renderMermaid(
        this.removeEmptyLines(domNode.textContent),
      );
    } else {
      console.log('domNode.outerHTML is null');
    }
  }

  removeEmptyLines(str) {
    return str.trim().replace(/^\s*[\r\n]/gm, '');
  }
  // renderMermaidNode(parent, nextSibling) {}

  getconfig(theme = 'default') {
    return {
      securityLevel: 'loose',
      theme,
      startOnLoad: false,
      htmlLabels: true,
      logLevel: 5, // https://mermaid.js.org/config/schema-docs/config.html#loglevel
      suppressErrorRendering: true,
    };
  }

  // 获取mermaid
  getmermaid() {
    if (window.mermaid) {
      this.mermaid = window.mermaid;
    } else {
      const mermaidLibFile = 'mermaid.min.js';
      // const hasVanillaMermaid =
      //   $tw.modules.types.library.hasOwnProperty(vanilaMermaid);

      try {
        this.mermaid = require(mermaidLibFile);
        if (this.mermaid.render) {
          window.mermaid = this.mermaid;
          this.mermaid.initialize(this.getconfig());
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async renderMermaid(mermaidText) {
    const id = 'mermaid_' + this.generateRandomString(5);
    let imageHTML = '';
    let domNode;

    try {
      const isValidMermaidText = await mermaid.parse(mermaidText, {
        suppressErrors: false,
      });
      if (!isValidMermaidText) return `<pre>${mermaidText}</pre>`;
      const { svg } = await this.mermaid.render('fake_' + id, mermaidText);
      imageHTML = svg;

      if (!imageHTML) {
        return `<pre style="color:#ff1919;">${mermaidText}</pre>`;
      }
      switch (this.rendertype) {
        case 'svg':
          domNode = this.centerStyle(imageHTML);
          break;
        case 'png':
          // NOTE: 此时生成， medium-zoom 无法处理， 暂时使用spotlight
          const cssText = this.getStyle(imageHTML);

          domNode = this.centerStyle(
            `<img src="data:image/svg+xml,${encodeURIComponent(imageHTML)}" style="${cssText}" class="spotlight"/>`,
          );
          break;
        default:
          domNode = this.centerStyle(imageHTML);
          break;
      }
      return domNode;
    } catch (e) {
      const errormessage = e.toString().split('\n').slice(1).join('\n');

      return `<pre><code>${mermaidText}</code>\n<code  style="color:#ff1919;">${errormessage.message || e.message}</code></pre>`;
    }
  }

  generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join('');
  }
  getStyle(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'image/svg+xml');
    const cssText = doc.querySelector('svg').style.cssText;
    return cssText;
  }

  // NOTE: 默认是会刷新的
  refresh() {
    return false;
  }

  centerStyle(html) {
    return `<div style="text-align:center;">${html}</div>`;
  }
}

exports.mermaid = MermaidWidget;
exports.mermaid2 = MermaidWidget;
