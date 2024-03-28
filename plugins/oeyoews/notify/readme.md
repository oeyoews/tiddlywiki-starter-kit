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

## Parameters

<div class="prose prose-indigo max-w-none">

| Parameter                                   | Type    | Values                                                                                                                                       |    Default    |
| :------------------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------- | :-----------: |
| `status`                                    | String  | `'error'`, `'warning'`, `'success'`                                                                                                          |    `null`     |
| `title`                                     | String  |                                                                                                                                              |    `null`     |
| `text`                                      | String  | You can send any type of html.                                                                                                               |    `null`     |
| `customIcon`                                | String  | You can send any type of html.                                                                                                               |    `null`     |
| `customClass`                               | String  |                                                                                                                                              |    `null`     |
| `speed`                                     | Number  | transition-duration in milliseconds.                                                                                                         |      300      |
| `effect`                                    | String  | `'fade'`, `'slide'`                                                                                                                          |   `'fade'`    |
| `showIcon`                                  | Boolean |                                                                                                                                              |     true      |
| `showCloseButton`                           | Boolean |                                                                                                                                              |     true      |
| `autoclose`                                 | Boolean |                                                                                                                                              |     false     |
| `autotimeout` (valid only with `autoclose`) | Number  |                                                                                                                                              |     3000      |
| `gap` (margin between notifications)        | Number  |                                                                                                                                              |      20       |
| `distance` (distance to edges)              | Number  |                                                                                                                                              |      20       |
| `type` (just for design)                    | Number  | 1, 2, 3                                                                                                                                      |       1       |
| `position`                                  | String  | Combine x and y position. `'left'`, `'right'`, `'top'`, `'bottom'`, `'x-center'`, `'y-center'` or use only `'center'` to center both x and y | `'right top'` |

<sub>All parameters are optional but you must specify 'title' or 'text' at least.</sub>

## Functions

| Function | Description                                                       |
| :------- | :---------------------------------------------------------------- |
| close()  | You can close the notification manually using the close function. |

</div>
