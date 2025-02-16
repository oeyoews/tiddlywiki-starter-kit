/*\
title: $:/plugins/oeyoews/neotw-image-card/widget.js
type: application/javascript
module-type: widget

neotw-image-card widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class NeotwImageCardWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    // 创建拖放区域
    const dropZone = createElement('div', {
      class:
        'border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors',
      text: '拖放图片到这里或点击上传',
    });

    // 创建预览区域
    const previewCanvas = createElement('canvas', {
      class: 'w-full h-auto hidden',
    });

    // 创建复制按钮
    const copyBtn = createElement('button', {
      class:
        'mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hidden',
      text: '复制图片',
    });

    const domNode = createElement('div', {
      children: [dropZone, previewCanvas, copyBtn],
    });

    // 处理文件拖放和点击上传
    const handleImage = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.style.borderRadius = '20px';
        img.onload = () => {
          const canvas = previewCanvas;
          const ctx = canvas.getContext('2d');

          // 设置画布尺寸
          const padding = 80;
          canvas.width = img.width + 2 * padding;
          canvas.height = img.height + 2 * padding;

          // 创建渐变背景
          const gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height,
          );
          gradient.addColorStop(0, '#aee3ff');
          gradient.addColorStop(1, '#cefdb6');

          // 绘制渐变背景
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // 计算居中位置
          const x = (canvas.width - img.width) / 2;
          const y = (canvas.height - img.height) / 2;

          // 创建圆角裁剪路径
          ctx.beginPath();
          const radius = 20; // 圆角半径
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + img.width - radius, y);
          ctx.arcTo(x + img.width, y, x + img.width, y + radius, radius);
          ctx.lineTo(x + img.width, y + img.height - radius);
          ctx.arcTo(
            x + img.width,
            y + img.height,
            x + img.width - radius,
            y + img.height,
            radius,
          );
          ctx.lineTo(x + radius, y + img.height);
          ctx.arcTo(x, y + img.height, x, y + img.height - radius, radius);
          ctx.lineTo(x, y + radius);
          ctx.arcTo(x, y, x + radius, y, radius);
          ctx.closePath();
          ctx.clip();

          // 绘制图片在居中位置
          ctx.drawImage(img, x, y);

          // 显示画布和复制按钮
          previewCanvas.classList.remove('hidden');
          copyBtn.classList.remove('hidden');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    // 处理拖放事件
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-500');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-blue-500');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-500');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleImage(file);
      }
    });

    // 处理点击上传
    dropZone.addEventListener('click', () => {
      const input = createElement('input', {
        attributes: {
          type: 'file',
          accept: 'image/*',
          style: 'display: none',
        },
      });
      input.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          handleImage(e.target.files[0]);
        }
      });
      input.click();
    });

    // 处理复制功能
    copyBtn.addEventListener('click', () => {
      previewCanvas.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
          alert('图片已复制到剪贴板！');
        });
      });
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description neotw-image-card widget */
exports['neotw-image-card'] = NeotwImageCardWidget;
