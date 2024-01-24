---
title: '发布-订阅模式_Observer____LeeZhian_Blog'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Dec 01 2023 09:27:26 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://www.leezhian.com/web/design/observer'
---

# 发布-订阅模式_Observer____LeeZhian_Blog

**发布 - 订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。**

该模式无论在开发中还是现实生活中都非常常见。

**比如**：

* `vue` 中的数据响应式。其中就用到数据劫持和 发布 - 订阅模式

* 消息系统

* 生活中，订阅淘宝某件商品减价或到货时通知 等等

在没有使用 发布 - 订阅模式 的时候，比如最后一个例子中，我们需要定时上去看看降价了没有或到货了没有，即浪费人力也浪费时间；万一刚好上去看完关闭页面的时候，或许就到货了你不知道，等你下次登上去看的时候又没货了。

当使用 发布 - 订阅模式 的时候，你就不需要关心它什么时候才降价，也不需要定时去查看，当降价的时候，它就会自动通知你该物品降价了。这就是 发布 - 订阅模式 显而易见的优点。

**常用场景**：

* 常用于异步编程中

* 消息通知机制

## 原生中的 发布 - 订阅模式 ​

在原生 `addEventListener` 事件函数中，就有用到 发布 - 订阅模式。

javascript

```
document.body.addEventListener('click', function () {
  alert('被点击了');
}, false);
document.body.click(); // 模拟用户点击
```

在这里我们不知道什么时候 `body` 才会被点击，所以我们订阅 `body` 上的 `click` 事件，当它被点击的时候，就会向所有的订阅者发布该消息。而且添加任何订阅者或删除订阅者都不会互相影响，即`removeEventListener`

## 自定义 发布 - 订阅模式 ​

**使用 发布 - 订阅模式 实现一个简单的降价通知系统**

javascript

```
const shop = {
  depList: [], // 缓存列表
  listen (key, fn) { // 添加订阅者
    if (!this.depList[key]) {
      this.depList[key] = []
    }
    this.depList[key].push(fn)
  },
  trigger () { // 发布
    let key = Array.prototype.shift.call(arguments)
    const fns = this.depList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }
}

shop.listen('笔记本', price => {
  console.log(`小明，你关注的降价到了${price}`)
})

shop.listen('衣服', price => {
  console.log(`小红，你关注的降价到了${price}`)
})

shop.trigger('笔记本', 3000)
shop.trigger('衣服', 50)
// 输出：
// 小明，你关注的降价到了3000
// 小红，你关注的降价到了50
```

现在已经基本实现了当他们订阅一次之后，当关注的商品的价格发生改变就会自动通知他们。如：小红关注衣服，只收到衣服的消息，而不会收到其他商品的降价消息。订阅者可以只订阅自己感兴趣的事件了。

## 通用发布 - 订阅模式 ​

有时候多处需要用到该模式功能的时候，每次都复制粘贴一份，一来代码冗余，二来操作繁琐。所以把发布订阅的功能单独提取出来，当需要的时候为它安装即可。

javascript

```
const event = {
  clientList: [],
  listen (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger () {
    let key = Array.prototype.shift.call(arguments)
    let fns = this.clientList[key]

    if (!fns || fns.length === 0) {
      return false
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  /**
   * 移除订阅事件
   * @param key 事件类型
   * @param fn {Function} 需要移除的事件
   * @returns {boolean}
   */
  remove (key, fn) {
    const fns = this.clientList[key]

    if (!fns) {
      return false
    }
    // 如果没有传入具体的函数，则表示把该类型的所有订阅清除
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        const _fn = fns[i]
        if (_fn === fn) {
          fns.splice(1, 1)
        }
      }
    }
  }
}

// 自动为对象安装发布订阅功能
const installEvent = function (obj) {
  for (const key in event) {
    obj[key] = event[key]
  }
}
```

**例**：使用上面通用发布 - 订阅模式例子，实现模块间的通信，如：点击按钮，`span`中的数值自动更换。

> vue 中的响应式类似，只是 vue 数据劫持 data 中的数据，在 set 的时候自动创建订阅者和发布

html

```
<button id="btn">加</button>
<p>当前的数是：<span id="num"></span></p>

<script>
  let num = 0;
  let spanEvent = {}
  installEvent(spanEvent)

  spanEvent.listen('add', function () {
    document.getElementById('num').innerText = num
  })

  document.getElementById('btn').addEventListener('click', function () {
    spanEvent.trigger('add', num++)
  })
</script>
```

---

然后再上面那么多例子中，都是需要先订阅再进行发布消息，如果发布消息的时候还没来得急订阅怎么办？难道要丢失之前那些发布的消息吗？

我们尝试创建一个离线缓存，在订阅的时候，查看有没有离线缓存，有则先调用离线缓存再订阅。

## 通用全局发布订阅对象 ​

javascript

```
const Event = (function () {
  let Event,
    _default = 'default';
  Event = function () {
    let _listen,
      _trigger,
      _remove,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      each = function (arr, fn) {
        let ret;
        for (let i = 0, l = arr.length; i < l; i++) {
          const n = arr[i]; // 事件
          ret = fn.call(n, i, n);
        }
        return ret;
      };
    /**
     * 订阅
     * @param key
     * @param fn 事件
     * @param cache 订阅事件缓存
     * @private
     */
    _listen = function (key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };
    /**
     * 移除订阅事件
     * @param key
     * @param cache 订阅事件缓存
     * @param fn 非必传，不传则全清
     * @private
     */
    _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (let i = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };
    /**
     * 发布
     * @returns {*}
     * @private
     */
    _trigger = function () {
      // arguments = [cache, key]
      let cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        stack = cache[key];
      if (!stack || !stack.length) {
        return;
      }

      return each(stack, function () {
        return this.apply(_self, args);
      });
    };
    /**
     * 新建命名空间
     * @param namespace 非必传，如果不传则默认命名空间
     * @returns {*|{one: one, trigger: trigger, listen: listen, remove: remove}}
     * @private
     */
    _create = function (namespace) {
      let ns = namespace || _default;
      let cache = {},
        offlineStack = [], // 离线事件
        ret = {
          /**
           * 订阅，如果在订阅前就已经有发布事件，会保存到离线系统中，等订阅的时候会把离线事件先触发然后情况离线事件
           * @param key
           * @param fn 订阅事件
           * @param last 是否只执行最后一个事件
           */
          listen: function (key, fn, last) {
            _listen(key, fn, cache);
            if (offlineStack === null) {
              return;
            }
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()();
            } else {
              each(offlineStack, function () {
                this();
              });
            }
            offlineStack = null;
          },
          one: function (key, fn, last) {
            _remove(key, cache);
            this.listen(key, fn, last);
          },
          /**
           * 移除订阅事件
           * @param key
           * @param fn 非必传，订阅事件
           */
          remove: function (key, fn) {
            _remove(key, cache, fn);
          },
          /**
           * 发布
           * @returns {number|*}
           */
          trigger: function () {
            let fn,
              args,
              _self = this;
            _unshift.call(arguments, cache);
            args = arguments;
            fn = function () {
              return _trigger.apply(_self, args);
            };
            if (offlineStack) {
              return offlineStack.push(fn);
            }
            return fn();
          }
        };
      return ns ? (namespaceCache[ns] ? namespaceCache[ns] : namespaceCache[ns] = ret) : ret;
    };
    return {
      create: _create,
      one: function (key, fn, last) {
        const event = this.create();
        event.one(key, fn, last);
      },
      remove: function (key, fn) {
        const event = this.create();
        event.remove(key, fn);
      },
      listen: function (key, fn, last) {
        const event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function () {
        const event = this.create();
        event.trigger.apply(this, arguments);
      }
    };
  }();
  return Event;
})();
```
