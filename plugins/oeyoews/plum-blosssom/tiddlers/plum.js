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

  function initCanvas(canvas, width = 400, height = 400, _dpi) {
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    // @ts-expect-error vendor
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

  const size = { width: window.innerWidth, height: window.innerHeight };
  const { ctx } = initCanvas(canvas, size.width, size.height);

  let steps = [];
  let prevSteps = [];

  const step = (x, y, rad, counter = { value: 0 }) => {
    const length = Math.random() * 6;
    counter.value += 1;

    const [nx, ny] = polar2cart(x, y, length, rad);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    const rad1 = rad + Math.random() * r15;
    const rad2 = rad - Math.random() * r15;

    if (
      nx < -100 ||
      nx > size.width + 100 ||
      ny < -100 ||
      ny > size.height + 100
    )
      return;

    const rate = counter.value <= 30 ? 0.8 : 0.5;

    if (Math.random() < rate) steps.push(() => step(nx, ny, rad1, counter));

    if (Math.random() < rate) steps.push(() => step(nx, ny, rad2, counter));
  };

  const polar2cart = (x = 0, y = 0, r = 0, theta = 0) => {
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    return [x + dx, y + dy];
  };

  const frame = () => {
    prevSteps = steps;
    steps = [];

    if (!prevSteps.length) {
      cancelAnimationFrame(raf);
      stopped = true;
    }

    prevSteps.forEach((i) => {
      if (Math.random() < 0.5) steps.push(i);
      else i();
    });

    raf = requestAnimationFrame(frame);
  };

  let raf;

  const start = () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    prevSteps = [];
    steps = [
      () => step(randomMiddle() * size.width, -5, r90),
      () => step(randomMiddle() * size.width, size.height + 5, -r90),
      () => step(-5, randomMiddle() * size.height, 0),
      () => step(size.width + 5, randomMiddle() * size.height, r180)
    ];
    if (size.width < 500) steps = steps.slice(0, 2);
    raf = requestAnimationFrame(frame);
    stopped = false;
  };

  const randomMiddle = () => Math.random() * 0.6 + 0.2;

  start();
};
