# Simple Notify

> 你知道在太微中发送一个消息通知有几种写法吗 ?

Simple Notify is a pure Javascript library to show nice and customizable alert notifications.

![img](https://github.com/oeyoews/simple-notify/raw/master/demo/assets/types.png)

- use [simple-notify](https://github.com/simple-notify/simple-notify) instead of `tm-notify` for no status condition tiddler

## Examples

```html
// for widget
<$notify title="Test simple notify" />

// for wikitext
<$button message="om-notify">
send notify
<$button>
<$button>
	<$action-sendmessage $message="om-notify" title="Just test simple notify" autoclose="false" />
	om-notify
</$button>
```

```js
// send a simple notify
new $tw.Notify().display();

// close notifier
const notifyinstance = new $tw.Notify();
notifyinstance.display(options);

notifyinstance.close();

// For Developers, you can use `om-notify` to instead of `tm-notify`
this.parentWidget.dispatchEvent({
  type: 'om-notify',
  paramObject: options
});
```

<$notify title="Test simple notify" />

<$button>
	<$action-sendmessage $message="om-notify" title="Just test simple notify" autoclose="false" />
	om-notify
</$button>

<!-- for dev -->
<!-- * remove .autoclose::before to hide bar -->
<!-- * simple-notify.mjs -->
<!-- module.export = w; -->