```js
const str = "Hello, World!";

const result1 = str.substr(7);     // 从索引 7 开始提取到字符串的末尾
console.log(result1);              // 输出：World!

const result2 = str.substr(7, 5);  // 从索引 7 开始提取长度为 5 的子字符串
console.log(result2);              // 输出：World

const str = "Hello, World!";

const result1 = str.substr(7, 5);
console.log(result1);  // "World"

const result2 = str.substring(7, 12);
console.log(result2);  // "World"
```