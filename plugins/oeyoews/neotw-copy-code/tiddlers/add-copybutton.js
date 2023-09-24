/*\
title: $:/plugins/oeyoews/neotw-copy-code/add-copybutton.js
type: application/javascript
module-type: library

eotw-copy-code widget
\*/

// TODO: 支持filetype iconify

// 不适合
/* function copybuttonListener() {
  document.addEventListener('mouseenter', () => {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(codeBlock => {
      codeBlock.addEventListener('mouseenter', () => {
        addCopyButton();
      });
    });
  });
} */

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
    // codeBlock.addEventListener('mouseenter', () => {
    //   console.log('updated');
    // });
    // 查找 copybutton 按钮
    const existingButton = codeBlock.querySelector('.copy-button');
    // 如果已经添加过copybutton, 结束
    if (existingButton) return;

    // TODO: not work
    // 如果代码为空, 不添加 copybutton 按钮
    const codeElement = codeBlock.querySelector('code');
    if (!codeElement) return;

    // support group with tailwindcss
    codeBlock.classList.add('group');

    // 获取 code 语言类型
    const fileType = codeElement.className.match(/language-(\w+)/)?.[1] || '';

    classNames =
      'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 copy-button delay-200 float-right hover:bg-gray-200 transition-all duration-800 ease-in-out p-2 flex flex-row';

    // 添加 copybutton
    const copyButton = $tw.utils.domMaker('button', {
      text: fileType ? `${fileType}` : 'copy',
      class: fileType ? classNames : classNames + ' -m-4',
    });

    const fileIcon = document.createElement('iconify-icon');
    fileIcon.setAttribute('icon', `mdi:language-${fileType}`);
    fileIcon.classList.add('mx-1');
    if (fileType) {
      copyButton.appendChild(fileIcon);
    }

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
      // TODO: add click sound
      // copy to clipboard

      // IOS 并不支持navigator, 目前不打断写兼容代码
      navigator?.clipboard
        ?.writeText(codeElement.textContent)
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
        .catch((err) => {
          console.log(err);
        });
    });

    codeElement?.parentNode?.insertBefore(copyButton, codeElement);
  });
};
