/*\
title: $:/plugins/oeyoews/mermaid/zoomMermaid.js
type: application/javascript
module-type: library

based: https://github.com/imzbf/md-editor-rt/blob/52f9faa62b5440d8cffa8acd3a6c2b6debd7a01f/packages/MdEditor/utils/dom.ts#L126
\*/

/**
 * 缩放、拖拽mermaid模块
 */
const zoomMermaid = () => {
  const addEvent = (container) => {
    if (!container) {
      return;
    }
    const content = container.firstChild;

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX, startY;
    let initialDistance;
    let initialScale = 1;

    const updateTransform = () => {
      content.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    };

    container.style.cursor = 'grab';
    container.style.overflow = 'hidden';
    container.addEventListener('contextmenu', (e) => {
      e.stopPropagation();
      e.preventDefault();
      scale = 1;
      posX = 0;
      posY = 0;
      updateTransform();
    });

    // 处理拖拽和单指移动
    container.addEventListener('touchstart', (event) => {
      container.style.cursor = 'grabbing';
      if (event.touches.length === 1) {
        isDragging = true;
        startX = event.touches[0].clientX - posX;
        startY = event.touches[0].clientY - posY;
      } else if (event.touches.length === 2) {
        initialDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY,
        );
        initialScale = scale;
      }
    });

    container.addEventListener('touchmove', (event) => {
      event.preventDefault();
      container.style.cursor = 'grabbing';

      if (isDragging && event.touches.length === 1) {
        posX = event.touches[0].clientX - startX;
        posY = event.touches[0].clientY - startY;
        updateTransform();
      } else if (event.touches.length === 2) {
        const newDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY,
        );
        const scaleChange = newDistance / initialDistance;
        const previousScale = scale;
        scale = initialScale * (1 + (scaleChange - 1)); // 调整缩放速度

        // 计算双指中心点
        const centerX =
          (event.touches[0].clientX + event.touches[1].clientX) / 2;
        const centerY =
          (event.touches[0].clientY + event.touches[1].clientY) / 2;

        // 获取内容区域的边界
        const rect = content.getBoundingClientRect();
        // 计算相对位置
        const relativeX = (centerX - rect.left) / previousScale;
        const relativeY = (centerY - rect.top) / previousScale;

        // 调整 posX 和 posY 使得缩放发生在双指中心
        posX -= relativeX * (scale - previousScale);
        posY -= relativeY * (scale - previousScale);

        updateTransform();
      }
    });

    container.addEventListener('touchend', () => {
      container.style.cursor = 'grab';
      isDragging = false;
    });

    // PC 端缩放功能
    container.addEventListener('wheel', (event) => {
      event.preventDefault();
      const scaleAmount = 0.02; // 缩放速度
      const previousScale = scale;

      if (event.deltaY < 0) {
        // 放大
        scale += scaleAmount;
      } else {
        // 缩小
        scale = Math.max(0.1, scale - scaleAmount);
      }

      // 计算鼠标相对于内容的位置
      const rect = content.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // 调整 posX 和 posY，以使缩放中心为鼠标位置
      posX -= (mouseX / previousScale) * (scale - previousScale);
      posY -= (mouseY / previousScale) * (scale - previousScale);

      updateTransform();
    });

    // PC 端拖拽功能
    container.addEventListener('mousedown', (event) => {
      isDragging = true;
      startX = event.clientX - posX;
      startY = event.clientY - posY;
    });

    container.addEventListener('mousemove', (event) => {
      if (isDragging) {
        posX = event.clientX - startX;
        posY = event.clientY - startY;
        updateTransform();
      }
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  };

  const handler = (containers) => {
    addEvent(containers);
    // containers.forEach((mm) => {
    //   addEvent(mm);
    // });
  };

  return handler;
};
module.exports = zoomMermaid;
