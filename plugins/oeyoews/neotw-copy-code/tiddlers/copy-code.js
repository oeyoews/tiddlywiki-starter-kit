/*\
title: $:/plugins/oeyoews/neotw-copy-code/copyCode.js
type: application/javascript
module-type: library
neotw-copy-code widget

\*/
const ClipboardJS = require('clipboard.min.js');

function addCopyButton() {
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(codeBlock => {
    const existingButton = codeBlock.querySelector('.copy-button');
    const codeElement = codeBlock.querySelector('code');
    const fileType = codeElement?.className.split(' ')[0] ?? null;
    if (existingButton && codeElement) {
      existingButton.remove();
    } else {
      const copyButton = document.createElement('button');
      copyButton.textContent = fileType ? `${fileType} 📋` : '📋';
      copyButton.classList.add(
        'copy-button',
        'float-right',
        'hover:bg-gray-200',
        'transition',
        'duration-200',
      );
      copyButton.setAttribute('title', 'Copy code');

      const clipboard = new ClipboardJS(copyButton, {
        text: () => codeElement.textContent,
      });

      clipboard.on('success', e => {
        copyButton.textContent = '✅ Copied!';
        setTimeout(() => {
          copyButton.textContent = fileType ? `${fileType} 📋` : '📋';
        }, 2000);
        e.clearSelection();
      });

      /* clipboard.on('error', e => {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      }); */

      codeElement?.parentNode?.insertBefore(copyButton, codeElement);
    }
  });
}

// exports.addCopyButton = addCopyButton;
module.exports = {
  addCopyButton,
};
