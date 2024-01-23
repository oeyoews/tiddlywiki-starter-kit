---
title: 'esm.sh'
tags: ['React']
type: 'text/markdown'
created: 'Thu Nov 23 2023 02:37:16 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# esm.sh

> 目前没看到有人再用

```html
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>Hello</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<script type="importmap">
    {
      "imports": {
        "@jsxImportSource": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client"
      }
    }
  </script>
	<script type="module" src="https://esm.sh/run" defer></script>
</head>

<body>
	<div id="root"></div>
	<script type="text/babel">
		import { createRoot } from "react-dom/client"

		function App() {
			return (
				<h1 class="text-3xl font-bold p-4">
					Hello, World!
				</h1>
			)
		}
		createRoot(globalThis.root).render(<App />)
	</script>
</body>

</html>
```
