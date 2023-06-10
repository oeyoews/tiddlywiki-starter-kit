const ClipboardJS = require('clipboard');

function copyImage(imgUrl) {
  const isBase64 = imgUrl.startsWith('data:image');
  const isHttps = imgUrl.startsWith('https://');

  if (!isBase64 && !isHttps) {
    console.error('Unsupported image URL:', imgUrl);
    return;
  }

  if (isBase64) {
    // 如果是 Base64 编码图片，直接将其作为字符串传递给 clipboard.js 的 writeText() 方法
    const clipboard = new ClipboardJS('.copy-image', {
      text: () => 'Copy image',
      data: () => imgUrl,
    });

    clipboard.on('success', e => {
      console.log('Copy success:', e);
    });

    clipboard.on('error', e => {
      console.error('Copy error:', e);
    });
  } else {
    // 如果是 HTTPS 图片，需要先下载图片并转换成 blob 对象，然后传递给 clipboard.js 的 write() 方法
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imgUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const clipboard = new ClipboardJS('.copy-image', {
          text: () => 'Copy image',
          data: () => new ClipboardJS.DTItem(blob, { type: 'image/png' }),
        });

        clipboard.on('success', e => {
          console.log('Copy success:', e);
        });

        clipboard.on('error', e => {
          console.error('Copy error:', e);
        });
      } else {
        console.error('Download error:', xhr.statusText);
      }
    };
    xhr.onerror = () => {
      console.error('Download error:', xhr.statusText);
    };
    xhr.send();
  }
}

module.exports = {
  copyImage,
};
