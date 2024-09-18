/*\
$:/plugins/oeyoews/neotw-homepage/startup.js
type: application/javascript
module-type: startup

\*/
exports.name = 'shakeshake';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  let shakeThreshold = 15; // 设置摇晃检测的阈值
  let lastTime = 0;
  let lastX = 0,
    lastY = 0,
    lastZ = 0;

  function shakeHandler() {
    // 设备震动 500 毫秒
    if (navigator.vibrate) {
      navigator.vibrate(500); // 500ms 的震动
    }
    alert('摇一摇成功！');
  }

  function deviceMotionHandler(event) {
    let acceleration = event.accelerationIncludingGravity;

    let currentTime = new Date().getTime();
    let timeDifference = currentTime - lastTime;

    if (timeDifference > 100) {
      let deltaX = Math.abs(acceleration.x - lastX);
      let deltaY = Math.abs(acceleration.y - lastY);
      let deltaZ = Math.abs(acceleration.z - lastZ);

      if (deltaX + deltaY + deltaZ > shakeThreshold) {
        shakeHandler(); // 如果超过阈值，触发摇一摇
      }

      lastTime = currentTime;
      lastX = acceleration.x;
      lastY = acceleration.y;
      lastZ = acceleration.z;
    }
  }

  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  } else {
    alert('设备不支持摇一摇功能');
  }
};
