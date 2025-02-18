/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/processImage.js
type: application/javascript
module-type: library

\*/

function deepMerge(defaultConfig, userConfig) {
  for (let key in userConfig) {
    if (userConfig.hasOwnProperty(key)) {
      // 如果目标和源都存在这个属性且都是对象，递归合并
      if (
        defaultConfig[key] &&
        typeof defaultConfig[key] === 'object' &&
        typeof userConfig[key] === 'object'
      ) {
        defaultConfig[key] = deepMerge(defaultConfig[key], userConfig[key]);
      } else {
        defaultConfig[key] = userConfig[key];
      }
    }
  }
  return defaultConfig;
}

/**
 * 处理图片，添加渐变背景和圆角效果
 * @param {HTMLCanvasElement} canvas - 目标画布元素
 * @param {string} base64 - base64 格式的图片数据
 * @param {Object} [option] - 配置选项
 * @param {number} [option.padding=80] - 图片周围的内边距（像素）, 渐变背景显示越多，图片就会越大
 * @param {number} [option.radius=40] - 图片圆角的半径（像素）
 * @param {Object} [option.footer] - 页脚配置
 * @param {string} [option.footer.text] - 页脚文字
 * @param {string} [option.footer.font='14px Arial'] - 页脚字体样式
 * @param {string} [option.footer.color='#ffffff'] - 页脚文字颜色
 * @param {number} [option.footer.margin=20] - 页脚距离边缘的距离
 * @param {string} [option.footer.logo] - SVG字符串或图片URL
 * @param {number} [option.footer.logoSize=16] - logo的大小
 * @param {number} [option.footer.logoGap=10] - logo和文字之间的间距
 * @return {Promise<string>} - 返回处理后的图片 base64 数据
 */
function processImage(canvas, base64, option = {}) {
  const defaultConfig = {
    padding: 80,
    radius: 40,
    colors: ['#ff6b6b', '#4ecdc4'],
    footerEnable: true,
    footer: {
      text: 'Powered by',
      font: '14px Arial',
      color: 'black',
      margin: 20,
      // logo: 'http://github.com/oeyoews.png',
      logo: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 0l10.23 6v12L12 24L1.77 18V6zm3.961 17.889l.154-.02c.113-.043.22-.081.288-.19c.227-.329-.357-.462-.566-.827s-1.071-2.364-.418-2.924s1.359-.79 1.629-1.315c.117-.236.238-.475.269-.742c.159.132.283.255.497.262c.567.036 1.054-.658 1.307-1.315c.135-.404.244-.832.218-1.226c-.069-.76.013-1.582.62-2.087c-.599.302-1.167.69-1.845.789c-.374-.114-.75-.216-1.147-.2c-.194-.253-.456-.727-.797-.782c-.58.208-.597 1.105-.842 2.321a5.4 5.4 0 0 0-1.154-.193c-.54-.035-1.42.134-2.038.116c-.619-.018-1.836-.562-2.849-.445c-.407.05-.817.12-1.195.291c-.231.105-.565.421-.733.468c-1.69.473-4.442.453-3.879-2.102c.044-.196.056-.373-.03-.417c-.11-.055-.17.06-.234.187c-.985 2.138.764 3.514 2.752 3.52c.625-.048.324-.007.904-.118l-.015.082a1.87 1.87 0 0 0 .865 1.718c-.27.771-.805 1.389-1.173 2.097c.138.881 1.031 2.057 1.4 2.225c.326.147 1.036.149 1.2-.089c.059-.111.02-.351-.044-.474c.277.308.651.736 1.013.942c.217.104.434.17.677.18l.31-.016c.154-.033.336-.058.44-.195c.116-.2.007-.756-.476-.796s-.795-.222-1.24-.882c-.365-.638.077-1.517.226-2.145c.765.123 1.535.22 2.31.222c.336-.017.67-.03 1.001-.093c.106.27.402 1.025.404 1.239c.007.601-.219 1.205-.121 1.807c.06.177.005.512.35.526l.388.018l.267-.008c.341.573.637.572 1.307.591m-7.518-1.66l-.063-.056c-.184-.198-.66-.544-.572-.865c.075-.238.213-.457.323-.683l-.004.023c-.02.282-.059.56.032.837c.278.228.663.59.918.837c-.138-.038-.4-.117-.53-.066l-.104-.026z"></path></svg>',
      logoSize: 16,
      logoGap: 10,
    },
  };
  // 合并配置
  return new Promise(async (resolve, reject) => {
    if (!canvas) reject('canvas is null');
    const ctx = canvas.getContext('2d');
    const { padding, radius, colors, footer } = deepMerge(
      defaultConfig,
      option,
    );

    async function updateCanvas(img) {
      // 创建临时画布用于处理原始图片和页脚
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext('2d');

      // 在临时画布上绘制原始图片
      tempCtx.drawImage(img, 0, 0, img.width, img.height);

      // 添加页脚文字和logo到临时画布
      if (footerEnable) {
        const footerY = img.height - footer.margin;
        let textX = img.width - footer.margin;

        // 如果有logo，先绘制logo
        if (footer.logo) {
          try {
            const logoImg = new Image();
            logoImg.crossOrigin = 'anonymous';

            // 判断是否为SVG
            const isSvg = footer.logo.trim().startsWith('<svg');

            if (isSvg) {
              const svgBlob = new Blob([footer.logo], {
                type: 'image/svg+xml',
              });
              logoImg.src = URL.createObjectURL(svgBlob);
            } else {
              logoImg.src = footer.logo;
            }

            await new Promise((resolve, reject) => {
              logoImg.onload = () => {
                const logoX = textX - footer.logoSize;
                const logoY = footerY - footer.logoSize;

                // 保存当前上下文状态
                tempCtx.save();

                // 创建圆形裁剪路径
                tempCtx.beginPath();
                const centerX = logoX + footer.logoSize / 2;
                const centerY = logoY + footer.logoSize / 2;
                const radius = footer.logoSize / 2;
                tempCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                tempCtx.closePath();
                tempCtx.clip();

                // 绘制logo
                tempCtx.drawImage(
                  logoImg,
                  logoX,
                  logoY,
                  footer.logoSize,
                  footer.logoSize,
                );

                // 恢复上下文状态
                tempCtx.restore();

                // 更新文字位置
                textX = logoX - footer.logoGap;

                if (isSvg) {
                  URL.revokeObjectURL(logoImg.src);
                }
                resolve();
              };

              logoImg.onerror = reject;
            });
          } catch (error) {
            console.error('处理logo时出错:', error);
          }
        }

        // 绘制文字
        if (footer.text) {
          tempCtx.font = footer.font;
          tempCtx.fillStyle = footer.color;
          tempCtx.textAlign = 'right';
          tempCtx.textBaseline = 'bottom';
          tempCtx.fillText(footer.text, textX, footerY);
        }
      }

      // 设置最终画布尺寸（包含padding）
      const width = img.width + padding * 2;
      const height = img.height + padding * 2;
      canvas.width = width;
      canvas.height = height;

      // 创建渐变背景
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 创建圆角裁剪路径
      ctx.beginPath();
      ctx.moveTo(padding + radius, padding);
      ctx.lineTo(width - padding - radius, padding);
      ctx.quadraticCurveTo(
        width - padding,
        padding,
        width - padding,
        padding + radius,
      );
      ctx.lineTo(width - padding, height - padding - radius);
      ctx.quadraticCurveTo(
        width - padding,
        height - padding,
        width - padding - radius,
        height - padding,
      );
      ctx.lineTo(padding + radius, height - padding);
      ctx.quadraticCurveTo(
        padding,
        height - padding,
        padding,
        height - padding - radius,
      );
      ctx.lineTo(padding, padding + radius);
      ctx.quadraticCurveTo(padding, padding, padding + radius, padding);
      ctx.closePath();
      ctx.clip();

      // 将临时画布的内容（包含footer）绘制到最终画布
      ctx.drawImage(tempCanvas, padding, padding);

      const newbase64 = canvas.toDataURL('image/png');
      resolve(newbase64);
    }

    const img = new Image();
    img.onload = () => updateCanvas(img);
    img.onerror = reject;
    img.src = base64;
  });
}

module.exports = processImage;
