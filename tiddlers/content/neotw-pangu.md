```html
<!DOCTYPE html>
<html>
  <head>
    <title>Pangu.js Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { corePlugins: { preflight: false } };
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pangu/4.0.7/pangu.min.js"></script>
  </head>

  <body>
    <textarea id="inputText" rows="4" cols="50">
      demo测试demo
    </textarea>

    <button onclick="formatText()" class="border-0">Format Text</button>

    <script>
      function formatText() {
        const inputText = document.getElementById("inputText");
        const formattedText = pangu.spacing(inputText.value);
        inputText.value = formattedText;
      }
    </script>
  </body>
</html>
```