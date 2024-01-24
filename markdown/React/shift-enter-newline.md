---
title: 'shift-enter-newline'
tags: ['React']
created: 'Sat Nov 04 2023 09:45:57 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# shift-enter-newline

```tsx
function App() {
  const [text, setText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setText(
        text.substring(0, start) + "\n" + text.substring(end, text.length)
      );
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      });
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <textarea value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
}
```
