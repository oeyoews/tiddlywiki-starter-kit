## USage

```ejs
// template.ejs
<%= name %>
```

```js
// 模板放在单独的文件里面是为了代码高亮
// 使用 vscode 的 ejs 插件获得有限的自动补全，并且将 ejs 文件类型设置为 html，重新获得高亮。
const template = $tw.wiki.getTiddlerText('template.ejs');
const ejs = require('ejs.min.js');
const html = ejs.render(template, { name: 'ejs', desc: 'ejs awesome !!!' });
console.log(html);
```

- 更多用法还请查阅 ejs 官网

## Examples

<$ejsTest />

## Motivation

如果不能使用构建工具，仍然希望获得 jsx 的美好编码体验，使用 ejs 模板引擎也是一个不错的选择，你不用在一次次的手动操作无聊的 dom 树，你只需要关心你的数据即可
