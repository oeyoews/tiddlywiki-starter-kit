<$ocover/>

```js
/**
 * description: 请你编写一个异步函数，它接收一个正整数参数 millis ，并休眠这么多毫秒。要求此函数可以解析任何值。 
 * order: 2621
 * type: javascript
 */

/**
 * @param {number} millis
 */
async function sleep(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis)
  })
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
```