/*\
title: $:/plugins/oeyoews/neotw-copy-code2/widget.js
type: application/javascript
module-type: widget

neotw-copy-code2 widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class neotwCopyCode2 extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;
    const title = this.getVariable('currentTiddler'); // 获取当前条目名称;
    const selector = `[data-tiddler-title="${title}"]`;
    const tiddlerNode = document.querySelector(selector);
    // 找到同级的pre>code标签,
    const preEl = tiddlerNode.querySelectorAll('pre');
    if (preEl.length === 0 || !preEl) return;
    const codeEl = tiddlerNode.querySelectorAll('pre > code');
    preEl.forEach((pre) => {
      if (pre.clientHeight < 400) return;
      pre.classList.add('code-collapsed');
      const expandButton = document.createElement('button');
      expandButton.className =
        'expand-button absolute bottom-2 left-1/2 transform -translate-x-1/2';
      expandButton.textContent = '显示全部';
      // pre.before(expandButton);
      pre.appendChild(expandButton);

      // 添加展开/折叠功能
      expandButton.addEventListener('click', function () {
        if (pre.classList.contains('code-collapsed')) {
          // 展开代码
          expandButton.textContent = '收起代码';
        } else {
          // 折叠代码
          expandButton.textContent = '显示全部';
        }
        pre.classList.toggle('code-collapsed');
      });
    });

    return;
    if (!preEl) return;
    // js hljs language-javascript
    const lang = preEl.getAttribute('class').split(' ').pop();
  }
}

/** @description {{ pluginname }} widget */
exports['neotwCopyCode2'] = neotwCopyCode2;
