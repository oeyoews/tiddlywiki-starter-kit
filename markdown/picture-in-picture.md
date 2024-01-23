---
title: 'picture-in-picture'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Sep 25 2023 09:07:32 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# picture-in-picture

> <https://developer.chrome.com/docs/web-platform/document-picture-in-picture/#acknowledgements>

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>画中画示例</title>
  </head>
  <body class="m-2">
    <video
      id="videoElement"
      controls
      class="aspect-video rounded h-full w-full"
    >
      <source
        src="https://mdn.github.io/dom-examples/picture-in-picture/assets/bigbuckbunny.mp4"
        type="video/mp4"
      />
    </video>

    <button id="startButton">画中画</button>

    <script>
      const videoElement = document.getElementById("videoElement");
      const startButton = document.getElementById("startButton");

      startButton.addEventListener("click", togglePictureInPicture);

      function togglePictureInPicture() {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        } else {
          if (document.pictureInPictureEnabled) {
            videoElement.requestPictureInPicture();
          }
        }
      }
    </script>
  </body>
</html>
```
