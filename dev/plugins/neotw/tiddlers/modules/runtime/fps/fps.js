var fpsPanel = document.getElementById('o-fps');
var showFPS = (function () {
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  var e, pe, pid, fps, last, offset, step, appendFps;

  fps = 0;
  last = Date.now();
  step = function () {
    offset = Date.now() - last;
    fps += 1;
    if (offset >= 1000) {
      last += offset;
      appendFps(fps);
      fps = 0;
    }
    requestAnimationFrame(step);
  };
  appendFps = function (fps) {
    fpsPanel.innerHTML = 'Current FPS is ' + fps + ' FPS';
  };
  step();
})();
