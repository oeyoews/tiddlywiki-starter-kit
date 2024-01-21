/*\
title: $:/plugins/oeyoews/plum-blosssom/plum.js
type: application/javascript
module-type: library

\*/

module.exports = function (canvas) {
  const r180 = Math.PI;
  const r90 = Math.PI / 2;
  const r15 = Math.PI / 12;
  const color = '#88888825';

  const randomMiddle = () => random() * 0.6 + 0.2;
  const { random } = Math;
  const size = { width: window.innerWidth, height: window.innerHeight };

  const MIN_BRANCH = 20;
  let len = 6;
  let stopped = false;

  function initCanvas(canvas, width = 400, height = 400, _dpi) {
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

    const dpi = _dpi || dpr / bsr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = dpi * width;
    canvas.height = dpi * height;
    ctx.scale(dpi, dpi);

    return { ctx, dpi };
  }

  const polar2cart = (x = 0, y = 0, r = 0, theta = 0) => {
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    return [x + dx, y + dy];
  };

  const { ctx } = initCanvas(canvas, size.width, size.height);

  let steps = [];
  let prevSteps = [];

  const step = (x, y, rad, counter = { value: 0 }) => {
    const length = random() * len;
    counter.value += 1;

    const [nx, ny] = polar2cart(x, y, length, rad);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    const rad1 = rad + random() * r15;
    const rad2 = rad - random() * r15;

    if (
      nx < -100 ||
      nx > size.width + 100 ||
      ny < -100 ||
      ny > size.height + 100
    ) {
      return;
    }

    const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

    // left branch
    if (random() < rate) steps.push(() => step(nx, ny, rad1, counter));

    // right branch
    if (random() < rate) steps.push(() => step(nx, ny, rad2, counter));
  };

  let raf;
  const frame = () => {
    prevSteps = steps;
    steps = [];
    // console.log('开始绘制');

    if (!prevSteps.length) {
      console.log('cancle');
      raf && cancelAnimationFrame(raf);
      stopped = true;
    }

    prevSteps.forEach((i) => {
      if (Math.random() < 0.5) steps.push(i);
      else i();
    });

    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    prevSteps = [];
    // 四条边界
    steps = [
      () => step(randomMiddle() * size.width, -5, r90),
      () => step(randomMiddle() * size.width, size.height + 5, -r90),
      () => step(-5, randomMiddle() * size.height, 0),
      () => step(size.width + 5, randomMiddle() * size.height, r180)
    ];
    if (size.width < 500) steps = steps.slice(0, 2);
    frame();
    stopped = false;
  };

  window.addEventListener('load', start);
};
