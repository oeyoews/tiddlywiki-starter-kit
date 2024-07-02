/*\
title: $:/plugins/oeyoews/mermaid-widget/widget.js
type: application/javascript
module-type: widget

blockquote widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class MermaidWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.mermaid;
    this.theme = 'default';
    this.rendertype = 'svg';
    this.tiny = false;
  }

  async render(parent, nextSibling) {
    this.computeAttributes();
    this.execute();

    const domNode = this.document.createElement('div');
    if (domNode.isTiddlyWikiFakeDom) {
      console.warn('SSR not support export mermaid chart');
      return;
    }

    const { theme, rendertype } = this.attributes;
    theme && (this.theme = theme);
    rendertype && (this.rendertype = rendertype);

    this.getmermaid();

    // how to get text from widget children, dont use attributes.

    parent.insertBefore(domNode, nextSibling);
    this.renderChildren(domNode, null);
    this.domNodes.push(domNode);
    domNode.outerHTML = await this.renderMermaid(
      this.removeEmptyLines(domNode.textContent.trim())
    );
  }

  removeEmptyLines(str) {
    return str.replace(/^\s*[\r\n]/gm, '');
  }

  getconfig(theme) {
    return {
      securityLevel: 'loose',
      theme,
      startOnLoad: false, // 这个对cdn 加载的无用.
      htmlLabels: true
    };
  }

  getmermaid() {
    if (window.mermaid) {
      this.tiny = true;
      // this.mermaid = window.mermaid.mermaidAPI;
      this.mermaid = window.mermaid;
    } else {
      const vanilaMermaid = 'mermaid-930.min.js';
      const hasVanillaMermaid =
        $tw.modules.types.library.hasOwnProperty(vanilaMermaid);

      try {
        const { mermaidAPI } = hasVanillaMermaid
          ? require(vanilaMermaid)
          : require('$:/plugins/orange/mermaid-tw5/mermaid.min.js');
        this.mermaid = mermaidAPI;
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async renderMermaid(code) {
    const id = 'mermaid_' + this.generateRandomString(5);
    let imageHTML = '';
    let maxWidth = '';
    let domNode;

    try {
      this.mermaid.initialize(this.getconfig(this.theme));
      if (this.tiny) {
        // bug: https://github.com/mermaid-js/mermaid/issues/4369 不要同时混用 mermaid.render 和 mermaid.mermaidAPI.render
        // NOTE: 如果这里单独使用promise then, 只有then 里面的代码会被阻塞， 下面的代码不会进行等待
        // after v10+
        // (params: id, text, container? Element) ==> Promise
        // 如果直接通过使用container， 就无法直接处理成image了
        const { svg } = await this.mermaid.render(id, code);
        imageHTML = svg;

        if (this.rendertype === 'png') {
          const svg = this.document.getElementById(id);
          if (svg) {
            maxWidth = svg.style.maxWidth;
          }
        }
      } else {
        // https://github.com/mermaid-js/mermaid/issues/4484
        // v9
        this.mermaid.render(id, code, (html) => {
          imageHTML = html;
          if (this.rendertype === 'png') {
            const svg = this.document.getElementById(id);
            if (svg) {
              maxWidth = svg.style.maxWidth;
            }
          }
        });
      }

      if (!imageHTML) {
        return `<pre style="color:#ff1919;">${code}</pre>`;
      }
      switch (this.rendertype) {
        case 'svg':
          domNode = this.getHTML(imageHTML);
          break;
        case 'png':
          domNode = this.getHTML(
            `<img src="data:image/svg+xml,${encodeURIComponent(imageHTML)}" style="max-width:${maxWidth};" />`
          );
          break;
        default:
          domNode = this.getHTML(imageHTML);
          break;
      }
      return domNode;
    } catch (e) {
      const target = document.getElementById('d' + id);
      target && target.parentNode.removeChild(target);

      const errormessage = e.toString().split('\n').slice(1).join('\n');

      return `<pre style="color:#ff1919;">${errormessage || e}</pre>`;
    }
  }

  generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  // NOTE: 默认是会刷新的
  refresh() {
    return false;
  }

  getHTML(html) {
    return `<div style="text-align:center;">${html}</div>`;
  }
}

// Export the TWSRRuby class
exports.mermaid2 = MermaidWidget;
// exports.mermaid = MermaidWidget;
