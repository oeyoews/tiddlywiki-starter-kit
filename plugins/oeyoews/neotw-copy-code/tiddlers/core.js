/*\
title: $:/plugins/oeyoews/neotw-copy-code/core.js
type: application/javascript
module-type: library

neotw-copy-code widget

\*/
// copied to add some style to show copied
// add hover style
// if overflow, scroll it
// add page ui button
// 找到所有的 <pre> 元素
function addCopyButton() {
  const codeBlocks = document.querySelectorAll('pre');

  // 为每个 <pre> 元素创建一个复制按钮
  codeBlocks.forEach(codeBlock => {
    // 检查该元素是否已经有一个复制按钮
    const existingButton = codeBlock.querySelector('.copy-button');
    if (!existingButton) {
      const copyButton = document.createElement('button');
      copyButton.textContent = '📋 Copy';
      copyButton.classList.add('copy-button', 'float-right');
      copyButton.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(codeBlock);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        const isSuccess = document.execCommand('copy');
        window.getSelection().removeAllRanges();
        if (isSuccess) {
          const copiedCode = range.toString();
          const copiedCodeNode = document.createElement('pre');
          copiedCodeNode.textContent = copiedCode;
          copiedCodeNode.style.whiteSpace = 'pre-wrap';
          copiedCodeNode.style.wordWrap = 'break-word';
          copiedCodeNode.style.fontFamily = 'Monospace';
          copiedCodeNode.style.fontSize = '14px';
          copiedCodeNode.style.lineHeight = '1.5';
          copiedCodeNode.style.backgroundColor = '#f5f5f5';
          copiedCodeNode.style.padding = '10px';
          copiedCodeNode.style.borderRadius = '4px';
          copiedCodeNode.style.overflowX = 'auto';
          copiedCodeNode.style.textAlign = 'left';
          // 使用SweetAlert2显示复制的代码
          swal({
            title: '代码已复制',
            content: copiedCodeNode,
            icon: 'success',
            timer: 3000, // 3 seconds
          });
        } else {
          swal('Copy failed', '', 'error');
        }
      });
      // 获取 code 元素并将复制按钮插入其前面
      const codeElement = codeBlock.querySelector('code');
      codeElement.parentNode.insertBefore(copyButton, codeElement);
    }
  });
}

exports.addCopyButton = addCopyButton;
