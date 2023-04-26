// load confetti
require('$:/plugins/oeyoews/neotw-confetti/library/confetti.min.js');

const fireworks = () => {
  const isDev = $tw.wiki.getTiddlerText('$:/info/url/protocol');
  const confettiType = 'fireworks';

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

  // console.log(
  //   `%c📣 Yay! neotw-confetti is working! ${confettiType} 🎉`,
  //   'background: linear-gradient(45deg, #fc466b, #3f5efb); color: black;border-radius: 3px;padding: 3px;',
  // );
  // return null;
};

const pride = () => {
  var duration = 0.5 * 1000;
  var end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

const snow = () => {
  const confettiType = 'snow';

  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
  // console.log(confettiType);
};

const realistic = () => {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const random = () => {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  });
};

const center = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const centerSound = () => {
  howler();
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const msg = () => {
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = {
    startVelocity: 30,
    spread: 260,
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
};

module.exports = {
  fireworks,
  snow,
  pride,
  realistic,
  random,
  center,
  centerSound,
  msg,
};
