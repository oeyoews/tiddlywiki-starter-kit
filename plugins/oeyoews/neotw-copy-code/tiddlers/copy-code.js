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
    // default ??
    const fileType = codeElement?.className.split(' ')[0] ?? null; // get file type from first class name
    // ??
    if (existingButton && codeElement) {
      existingButton.remove();
    } else {
      const copyButton = $tw.utils.domMaker('button', {
        text: `${fileType}📋`,
        class: 'copy-button float-right hover:bg-gray-200',
        attributes: {
          title: 'Copy code',
        },
      });
      // TODO: splict this
      copyButton.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(codeElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        const isSuccess = document.execCommand('copy');
        window.getSelection().removeAllRanges();
        if (isSuccess) {
          confetti();
          howler();
          const copiedCode = range.toString();
          const copiedCodeNode = document.createElement('pre');
          copiedCodeNode.textContent = copiedCode;
          copiedCodeNode.classList.add(
            'bg-gray-100',
            'p-2',
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
          );
          swal({
            title: 'Copied to clipboard',
            content: copiedCodeNode,
            icon: 'success',
            timer: 5000,
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
