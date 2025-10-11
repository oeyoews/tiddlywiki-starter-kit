/*\
title: $:/plugins/oeyoews/neotw-ball/addEvent.js
type: application/javascript
module-type: library

\*/
module.exports = function (ball) {
  let startX,
    startY,
    startLeft,
    startTop,
    isDragging = false,
    startTime,
    moveX,
    moveY;

  // **PC 端事件**
  ball.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
  document.addEventListener(
    'mousemove',
    (e) => isDragging && moveDrag(e.clientX, e.clientY),
  );
  document.addEventListener('mouseup', endDrag);

  // **移动端事件（防止滚动）**
  ball.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault(); // 禁止滚动
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: false },
  );

  document.addEventListener(
    'touchmove',
    (e) => {
      if (isDragging) {
        e.preventDefault(); // 禁止页面滚动
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: false },
  );

  document.addEventListener('touchend', endDrag);

  function startDrag(clientX, clientY) {
    startTime = Date.now();
    isDragging = true;
    startX = clientX;
    startY = clientY;
    startLeft = ball.offsetLeft;
    startTop = ball.offsetTop;
  }

  function moveDrag(clientX, clientY) {
    if (!isDragging) return;

    let newLeft = startLeft + (clientX - startX);
    let newTop = startTop + (clientY - startY);

    // **边界限制**
    newLeft = Math.max(
      0,
      Math.min(newLeft, window.innerWidth - ball.clientWidth),
    );
    newTop = Math.max(
      0,
      Math.min(newTop, window.innerHeight - ball.clientHeight),
    );

    ball.style.left = newLeft + 'px';
    ball.style.top = newTop + 'px';

    moveX = Math.abs(newLeft - startLeft);
    moveY = Math.abs(newTop - startTop);
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;

    // **短时间 & 小范围内移动 → 视为点击**
    if (Date.now() - startTime < 300 && moveX < 5 && moveY < 5) {
      alert('点击了悬浮球！');
      return;
    }

    // **自动吸附到左/右边缘**
    const ballCenterX = ball.offsetLeft + ball.clientWidth / 2;
    if (ballCenterX > window.innerWidth / 2) {
      ball.style.left = window.innerWidth - ball.clientWidth + 'px';
    } else {
      ball.style.left = '0px';
    }
  }
};
