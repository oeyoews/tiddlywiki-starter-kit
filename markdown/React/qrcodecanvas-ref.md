---
title: 'qrcodecanvas-ref'
tags: ['React']
type: 'text/markdown'
created: 'Sat Nov 18 2023 03:30:06 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# qrcodecanvas-ref

```tsx
import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

interface CanvasQRCodeProps {
  value: string;
}

const CanvasQRCode: React.FC<CanvasQRCodeProps> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空 canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 生成二维码
    QRCode.toCanvas(canvas, value, { errorCorrectionLevel: 'H' }, (error) => {
      if (error) console.error(error);
      console.log('QR Code generated');
    });
  }, [value]);

  return <canvas ref={canvasRef} />;
};

export default CanvasQRCode;
```
