var duration = 1 * 1000;
var end = Date.now() + duration;

(function frame() {
  confetti({
    zIndex: -100,
    particleCount: 7,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 1 },
  });
  confetti({
    zIndex: -100,
    particleCount: 7,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 1 },
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
