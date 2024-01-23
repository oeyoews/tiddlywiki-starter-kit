---
title: 'form-disabled-readonly'
tags: ['JavaScript', 'HTML']
type: 'text/markdown'
created: 'Fri Sep 08 2023 09:38:47 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# form-disabled-readonly

如果 form 里面有 disable, 则 form 的 submit 全部不能用，使用 readonly 代替

如果给 button 加一个 listener, 你会发现，回车的时候，button 的点击事件也被触发了 (仅仅只会触发第一个捕获到的 submit 事件 btn1)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Index 17</title>
  </head>
  <body>
    <form id="form" type="submit">
      <button type="submit" readonly="readonly">点击</button>
      <input type="text" value="" name="message" />
    </form>
  </body>
  <script charset="utf-8">
    const button = document.querySelector("button");
    button.addEventListener("click", function () {
      console.log("点击");
    });
    var form = document.querySelector("#form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("提交");
    });
  </script>
</html>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Index 17</title>
  </head>
  <body>
    <form id="form" type="submit">
      <input type="text" value="" name="message" />
      <button id="btn2" type="submit">点击</button>
      <button id="btn1" type="submit">点击</button>
    </form>
  </body>
  <script charset="utf-8">
    const button = document.querySelector("#btn1");
    button.addEventListener("click", function () {
      console.log("点击 btn1");
    });
    const anotherbutton = document.querySelector("#btn2");
    anotherbutton.addEventListener("click", function () {
      console.log("点击 btn2");
    });
    var form = document.querySelector("#form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("提交");
    });
  </script>
</html>
```
