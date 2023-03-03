var duration = 3 * 1000;
var animationEnd = Date.now() + duration;
var defaults = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  scalar: 0.6,
  zIndex: -100,
};

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function () {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 50 * (timeLeft / duration);
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.9, 1), y: 0.1 },
    }),
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.9, 1), y: 0.1 },
    }),
  );
}, 250);
