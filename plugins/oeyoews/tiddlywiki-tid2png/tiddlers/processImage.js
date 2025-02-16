/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/processImage.js
type: application/javascript
module-type: library

\*/

/**
 * 处理图片，添加渐变背景和圆角效果
 * @param {HTMLCanvasElement} canvas - 目标画布元素
 * @param {string} base64 - base64 格式的图片数据
 * @param {Object} [option] - 配置选项
 * @param {number} [option.padding=80] - 图片周围的内边距（像素）, 渐变背景显示越多， 图片就会越大
 * @param {number} [option.radius=40] - 图片圆角的半径（像素）
 * @example
 */
function processImage(
  canvas,
  base64,
  option = { padding: 80, radius: 40, colors: ['#ff6b6b', '#4ecdc4'] },
) {
  const ctx = canvas.getContext('2d');
  const { padding, radius, colors } = option;

  function updateCanvas(img) {
    // 设置画布尺寸和内边距
    const width = img.width + padding * 2;
    const height = img.height + padding * 2;
    canvas.width = width;
    canvas.height = height;

    // 创建渐变背景, 渐变方向， 从左到右
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    // gradient.addColorStop(0, colors[0]);
    // gradient.addColorStop(1, colors[1]);
    // 多个颜色渐变
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 创建临时画布用于圆角处理
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext('2d');

    // 绘制圆角
    tempCtx.beginPath();
    tempCtx.moveTo(radius, 0);
    tempCtx.lineTo(img.width - radius, 0);
    tempCtx.quadraticCurveTo(img.width, 0, img.width, radius);
    tempCtx.lineTo(img.width, img.height - radius);
    tempCtx.quadraticCurveTo(
      img.width,
      img.height,
      img.width - radius,
      img.height,
    );
    tempCtx.lineTo(radius, img.height);
    tempCtx.quadraticCurveTo(0, img.height, 0, img.height - radius);
    tempCtx.lineTo(0, radius);
    tempCtx.quadraticCurveTo(0, 0, radius, 0);
    tempCtx.closePath();
    tempCtx.clip();

    // 在临时画布上绘制图片
    tempCtx.drawImage(img, 0, 0, img.width, img.height);

    // 将处理后的图片绘制到最终画布
    ctx.drawImage(tempCanvas, padding, padding);
  }

  const img = new Image();
  img.onload = () => updateCanvas(img);
  img.src = base64;
}

module.exports = processImage;
