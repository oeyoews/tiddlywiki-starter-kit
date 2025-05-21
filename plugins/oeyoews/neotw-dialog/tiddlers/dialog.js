/*\
title: $:/plugins/oeyoews/neotw-dialog/dialog.js
type: application/javascript
// module-type: library
module-type: global

neotw-dialog

\*/

/**
 * 弹出对话框
 *
 * @param {'confirm' | 'alert'' | 'prompt'} type - 弹窗类型
 * @param {string} title - 弹窗标题
 * @param {string} message - 弹窗消息
 * @returns {Promise} - 弹窗关闭后的值
 */
async function showDialog(type, title, message) {
  return new Promise((resolve) => {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className =
      'fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 cursor-pointer';

    // 创建弹窗
    const modal = document.createElement('div');
    modal.className =
      'bg-white p-3 rounded-lg shadow-lg max-w-sm w-full transform scale-90 opacity-0 transition-all duration-300';

    // 创建标题
    const titleElement = document.createElement('h2');
    titleElement.className = 'text-lg font-semibold mb-4 mt--';
    titleElement.textContent = title;

    // 创建消息
    const messageElement = document.createElement('p');
    messageElement.className = 'mb-4';
    messageElement.textContent = message || '';

    // 创建输入框（仅在prompt类型时需要）
    const inputElement =
      type === 'prompt' ? document.createElement('input') : null;
    if (inputElement) {
      inputElement.className =
        'w-full p-2 border rounded-sm mb-4 dark:bg-white';
      inputElement?.focus();
      inputElement.addEventListener('keydown', (event) => {
        // enter to close modal
        if (event.keyCode === 13) {
          event.preventDefault();
          closeDialog(inputElement.value);
        }
      });
    }

    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex justify-end space-x-2';

    // 创建确认按钮
    const confirmButton = document.createElement('button');
    confirmButton.className = 'px-4 py-2 bg-blue-500 text-white rounded';
    confirmButton.textContent = type === 'alert' ? '确定' : '确认';

    // 创建取消按钮（仅在confirm和prompt类型时需要）
    const cancelButton =
      type !== 'alert' ? document.createElement('button') : null;
    if (cancelButton) {
      cancelButton.className = 'px-4 py-2 bg-gray-300 rounded';
      cancelButton.textContent = '取消';
    }

    // 关闭弹窗的函数
    const closeDialog = (value) => {
      modal.classList.add('scale-90', 'opacity-0'); // 添加隐藏动画
      overlay.classList.add('opacity-0'); // 遮罩淡出

      // 等待动画完成再移除
      modal.addEventListener(
        'transitionend',
        () => {
          document.body.removeChild(overlay);
          resolve(value);
        },
        { once: true },
      );
    };

    // 按钮事件绑定
    confirmButton.onclick = () =>
      closeDialog(type === 'prompt' ? inputElement.value : true);
    if (cancelButton) cancelButton.onclick = () => closeDialog(false);

    // 遮罩层点击关闭弹窗
    overlay.onclick = (e) => {
      if (e.target === overlay) closeDialog(null);
    };

    // 组装DOM
    modal.appendChild(titleElement);
    modal.appendChild(messageElement);
    if (inputElement) modal.appendChild(inputElement);
    if (cancelButton) buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // **触发进入动画**
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0');
      modal.classList.remove('scale-90', 'opacity-0');
    });
  });
}

exports.showDialog = showDialog;
