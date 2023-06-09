/*\
title: $:/plugins/oeyoews/neotw-copy-code/copyCode.js
type: application/javascript
module-type: library

neotw-copy-code widget

\*/
function addCopyButton() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(codeBlock => {
    const existingButton = codeBlock.querySelector('.copy-button');
    const codeElement = codeBlock.querySelector('code');
    const cloneCodeElement = codeElement.cloneNode(true);
    // default ??
    const fileType = codeElement?.className.split(' ')[0] ?? null; // get file type from first class name
    // ??
    if (existingButton && codeElement) {
      existingButton.remove();
    } else {
      const copyButton = $tw.utils.domMaker('button', {
        text: fileType ? `${fileType} 📋` : '📋',
        class: 'copy-button float-right hover:bg-gray-200',
        attributes: {
          title: 'Copy code',
        },
      });
      // TODO: splict this
      copyButton.addEventListener('click', () => {
        copyButton.textContent = '✅ Copied!';
        const range = document.createRange();
        range.selectNode(codeElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        const isSuccess = document.execCommand('copy');
        window.getSelection().removeAllRanges();
        if (isSuccess) {
          confetti();
          howler();

          const container = document.createElement('div');
          container.classList.add('max-w-full', 'overflow-auto'); // 添加适当的容器样式

          const copiedCodeNode = document.createElement('pre');
          copiedCodeNode.appendChild(cloneCodeElement);
          copiedCodeNode.classList.add(
            'bg-gray-200',
            'shadow-sm',
            'p-0',
            'rounded',
            'text-base',
            'font-mono',
            'leading-relaxed',
            'text-left',
            'overflow-x-auto',
            'whitespace-pre-wrap',
            'border',
            'border-none',
            'break-words',
            'max-h-48', // 添加最大高度限制，例如48像素
          );
          container.appendChild(copiedCodeNode);
          swal({
            title: fileType
              ? `Copied to clipboard (filetype: ${fileType})`
              : `Copied to clipboard`,
            content: container,
            icon: 'success',
            // timer: 5000,
          });
        } else {
          swal('Copy failed', '', 'error');
        }
      });
      if (codeElement) {
        codeElement.parentNode.insertBefore(copyButton, codeElement);
      }
    }
  });
}

exports.addCopyButton = addCopyButton;
