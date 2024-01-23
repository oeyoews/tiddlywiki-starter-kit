---
title: 'Json-parse'
tags: ['JavaScript']
created: 'Tue May 09 2023 15:40:18 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&Json-parse'
type: 'text/vnd.tiddlywiki'
---

# Json-parse

在JavaScript中，可以使用`JSON.parse()`方法将一个JSON格式的字符串转换为JavaScript对象。该方法接受一个字符串参数，并尝试将其解析为有效的JSON格式。如果解析成功，则返回一个对应的JavaScript对象，否则抛出异常。

以下是一个简单的例子：

```javascript
const jsonString = '{"name": "John", "age": 30, "hobbies": ["reading", "traveling"]}';
const obj = JSON.parse(jsonString);
console.log(obj);
```

在这个例子中，我们定义了一个名为`jsonString`的字符串，表示一个包含`name`、`age`和`hobbies`属性的JSON对象。然后我们使用`JSON.parse()`方法将该字符串解析为一个JavaScript对象，并将其保存到名为`obj`的变量中。最后，我们使用`console.log()`方法输出该对象。

如果要在TypeScript中将一个字符串转换为JavaScript对象，则需要使用`JSON.parse()`方法相同的方式进行转换。例如：

```typescript
const jsonString = '{"name": "John", "age": 30, "hobbies": ["reading", "traveling"]}';
const obj = JSON.parse(jsonString);
console.log(obj);
```

在这个例子中，我们可以看到，JavaScript和TypeScript中的`JSON.parse()`方法的用法是一样的。
