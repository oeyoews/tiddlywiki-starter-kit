const isDev = $tw.wiki.getTiddlerText('$:/info/url/protocol');

(function runConfetti() {
  if (isDev === 'http:') return;
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = {
    startVelocity: 25,
    spread: 360,
    ticks: 60,
    scalar: 0.8,
    zIndex: -10000,
    shapes: ['circle', 'circle', 'square'],
    disableForReducedMotion: false,
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
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 250);

  console.log(
    '%c📣 Yay! neotw-confetti is working! 🎉',
    'background: linear-gradient(45deg, #fc466b, #3f5efb); color: black;border-radius: 3px;padding: 3px;',
  );
})();
