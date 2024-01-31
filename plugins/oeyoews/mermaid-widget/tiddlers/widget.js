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
  }

  render(parent, nextSibling) {
    this.computeAttributes();
    this.execute();

    const domNode = this.document.createElement('div');
    if (domNode.isTiddlyWikiFakeDom) return;

    const { theme, rendertype } = this.attributes;
    theme && (this.theme = theme);
    rendertype && (this.rendertype = rendertype);

    this.getmermaid();

    // how to get text from widget children, dont use attributes.

    parent.insertBefore(domNode, nextSibling);
    this.renderChildren(domNode, null);
    this.domNodes.push(domNode);
    domNode.outerHTML = this.renderMermaid(
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
      startOnLoad: false,
      htmlLabels: true
    };
  }

  getmermaid() {
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

  renderMermaid(code) {
    /* const notSupportedTypes = [
      'timeline',
      'quadrantChart',
      'mindmap',
      'zenuml',
      'sankey-beta'
    ];

    if (notSupportedTypes.includes(firstLine)) {
      return `<pre style="color:#ff1919;">${firstLine} not supported by mermaid now</pre>`;
    } */

    const id = 'mermaid_' + this.generateRandomString(5);
    this.mermaid.initialize(this.getconfig(this.theme));
    let imageHTML = '';
    let maxWidth = '';
    let domNode;
    try {
      this.mermaid.render(id, code, (html) => {
        imageHTML = html;
        if (this.rendertype === 'png') {
          const svg = this.document.getElementById(id);
          if (svg) {
            maxWidth = svg.style.maxWidth;
          }
        }
      });

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
      return `<pre style="color:#ff1919;">${errormessage}</pre>`;
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
