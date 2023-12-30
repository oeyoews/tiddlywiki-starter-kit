/*\
title: $:/plugins/oeyoews/plum-blosssom/plum.js
type: application/javascript
module-type: library

\*/

module.exports = function (canvas) {
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
  const { ctx } = initCanvas(canvas, window.innerWidth, window.innerHeight);

  function lineTo(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  function getEndPoint(b) {
    return {
      x: b.start.x + b.length * Math.cos(b.theta),
      y: b.start.y + b.length * Math.sin(b.theta)
    };
  }

  function drawBranch(b) {
    lineTo(b.start, getEndPoint(b));
  }

  function step(b, depth = 0) {
    const end = getEndPoint(b);
    drawBranch(b);

    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta - 0.2 * Math.random()
          },
          depth + 1
        )
      );
    }

    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta + 0.2 * Math.random()
          },
          depth + 1
        )
      );
    }
  }

  function frame() {
    const tasks = [];
    pendingTasks = pendingTasks.filter((i) => {
      if (Math.random() > 0.4) {
        tasks.push(i);
        return false;
      }
      return true;
    });

    tasks.forEach((fn) => fn());
  }

  let pendingTasks = [];

  let framesCount = 0;
  function startFrame() {
    requestAnimationFrame(() => {
      framesCount += 1;
      if (framesCount % 3 === 0) frame();
      startFrame();
    });
  }

  startFrame();

  function plum() {
    // light
    ctx.strokeStyle = '#0005';

    step({
      start: { x: 0, y: 0 },
      length: 10,
      theta: Math.PI / 4
    });
  }
  plum();
};
