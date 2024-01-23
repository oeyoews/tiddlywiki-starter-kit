---
title: 'sessionStorage'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun May 07 2023 09:33:56 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# sessionStorage

sessionStorage 是会话存储，只能在同一个浏览器窗口（或者标签页）中共享数据，在浏览器窗口关闭时，存储在 sessionStorage 中的数据也会被清除。

而 localStorage 是本地存储，可以在不同浏览器窗口（或者标签页）之间共享数据，并且即使关闭了浏览器窗口，存储在 localStorage 中的数据仍然存在。

因此，如果您希望在刷新浏览器后仍然保留数据，应该使用 localStorage 而不是 sessionStorage。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Session Demo</title>
  </head>
  <body>
    <h1>Session Demo</h1>

    <!-- 用户输入名字和年龄 -->
    <label for="name">Name:</label>
    <input type="text" id="name" /><br /><br />

    <label for="age">Age:</label>
    <input type="number" id="age" /><br /><br />

    <!-- 保存按钮 -->
    <button onclick="saveData()">Save</button>

    <!-- 显示已保存的数据 -->
    <h2>Saved Data:</h2>
    <p id="saved-data"></p>

    <!-- 清除按钮 -->
    <button onclick="clearData()">Clear</button>

    <script>
      function saveData() {
        // 获取用户输入的数据并保存到 sessionStorage 中
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;

        sessionStorage.setItem("name", name);
        sessionStorage.setItem("age", age);

        // 更新显示已保存的数据
        updateSavedData();
      }

      function clearData() {
        // 清除 sessionStorage 中的数据
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("age");

        // 更新显示已保存的数据
        updateSavedData();
      }

      function updateSavedData() {
        // 从 sessionStorage 中获取已保存的数据并更新页面上的文本内容
        const name = sessionStorage.getItem("name");
        const age = sessionStorage.getItem("age");

        let savedDataText = "";

        if (name) {
          savedDataText += "Name: " + name + "<br>";
        }

        if (age) {
          savedDataText += "Age: " + age + "<br>";
        }

        document.getElementById("saved-data").innerHTML = savedDataText;
      }

      // 页面加载时更新已保存的数据
      updateSavedData();
    </script>
  </body>
</html>
```
