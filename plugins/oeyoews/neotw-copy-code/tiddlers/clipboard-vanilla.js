/*\
title: $:/plugins/oeyoews/neotw-copy-code/copyCode.js
type: application/javascript
module-type: library

eotw-copy-code widget

\*/
function addCopyButton() {
  // 找到当前页面的所有代码块
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(codeBlock => {
    const existingButton = codeBlock.querySelector('.copy-button');
    codeBlock.classList.add('group');
    const codeElement = codeBlock.querySelector('code');
    const regex = /language-(\w+)/;
    const match = codeElement?.className?.match(regex);
    const fileType = match ? match[1] : null;

    if (!existingButton) {
      classNames =
        'scale-0 group-hover:scale-100 copy-button delay-200 float-right hover:bg-gray-200 transition duration-800 ease-in p-2'; //  opacity-0 hover:opacity-100

      const copyButton = $tw.utils.domMaker('button', {
        text: fileType ? `${fileType} 📋` : '📋',
        class: fileType ? classNames : classNames + ' -m-4',
      });

      const notify = () => {
        Swal.fire({
          title: `Copied to clipboard`,
          icon: 'success',
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
        });
      };

      copyButton.addEventListener('click', () => {
        navigator.clipboard
          .writeText(codeElement.textContent)
          .then(() => {
            if (typeof Swal?.fire === 'function') {
              notify();
            } else {
              copyButton.textContent = '✅ Copied!';
              setTimeout(() => {
                copyButton.textContent = fileType ? `${fileType} 📋` : '📋';
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });

      codeElement?.parentNode?.insertBefore(copyButton, codeElement);
    }
  });

  Swal.fire({
    title: codeBlocks.length ? `Enable copy code` : `当前页面没有发现代码块`,
    icon: codeBlocks.length ? 'success' : 'info',
    toast: true,
    showCancelButton: false,
    showConfirmButton: false,
    timer: 1500,
    position: 'top-end',
  });
}

module.exports = {
  addCopyButton,
};
