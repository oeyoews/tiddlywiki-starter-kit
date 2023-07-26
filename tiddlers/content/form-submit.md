```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Index 19</title>
  </head>
  <body>
    <form id="userForm">
      <input type="text" name="name" />
      <input type="submit" />
    </form>
    <script charset="utf-8">
      document
        .querySelector("#userForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          console.log("hi");
        });
    </script>
  </body>
</html>
```