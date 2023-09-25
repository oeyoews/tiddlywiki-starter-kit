/*\
title: $:/plugins/oeyoews/neotw-copy-code/add-copybutton.js
type: application/javascript
module-type: library

eotw-copy-code widget
\*/

module.exports = function addCopyButton() {
  // 找到当前页面的所有代码块
  const codeBlocks = document.querySelectorAll('pre');

  Swal.fire({
    title: codeBlocks.length ? `Enable copy code` : `当前页面没有发现代码块`,
    icon: codeBlocks.length ? 'success' : 'info',
    toast: true,
    showCancelButton: false,
    showConfirmButton: false,
    timer: 1500,
    position: 'top-end',
  });

  // 如果没有代码块, 结束
  if (!codeBlocks.length) {
    return;
  }

  codeBlocks.forEach((codeBlock) => {
    const existingButton = codeBlock.querySelector('[data-copy-button]');

    if (!existingButton) {
      codeBlock.setAttribute('data-copy-button', '');
    } else {
      return;
    }

    codeBlock.classList.add('relative', 'group');

    const codeElement = codeBlock.querySelector('code');
    // if not have any code, dont add copybutton, show codside only have pre, but no code tag error
    if (!codeElement?.textContent) return;

    // 获取 code 语言类型
    const fileType = codeElement.className.match(/language-(\w+)/)?.[1] || '';
    // opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
    const classNames = `absolute fixed top-0 right-0 delay-200 bg-transparent hover:bg-gray-200 transition-all duration-600 ease-in-out p-1 flex flex-row`;

    // 添加 copybutton
    const copyButton = $tw.utils.domMaker('button', {
      text: fileType || 'copy',
      class: classNames,
    });

    const fileIcon = document.createElement('iconify-icon');
    fileIcon.setAttribute('icon', `mdi:language-${fileType}`);
    fileIcon.classList.add('mx-1');
    fileType && copyButton.appendChild(fileIcon);

    copyButton.addEventListener('click', () => {
      // NOTE: 0.0.0.0:xxx 自动禁用clipboard, 导致无法复制
      // ~~IOS 并不支持navigator, 目前不打断写兼容代码~~ ???
      navigator?.clipboard?.writeText(codeElement.textContent).then(() => {
        copyButton.textContent = 'Copied';
        setTimeout(() => {
          copyButton.textContent = fileType || 'copy';
          fileType && copyButton.appendChild(fileIcon);
        }, 2000);
      });
    });

    codeElement?.parentNode?.insertBefore(copyButton, codeElement);
  });
};
