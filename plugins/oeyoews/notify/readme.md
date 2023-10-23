## simple-notify

![img](https://i.imgur.com/ubW13li.png)


* use [simple-notify](https://github.com/simple-notify/simple-notify) instead of `tm-notify` for no status condition tiddler

## Examples

```
// widget
<$notify title="Test simple notify" />

// wikitext
<$button>
	<$action-sendmessage $message="om-notify" title="Just test simple notify" autoclose="false" />
	om-notify
</$button>
```

```js
// For Developers, you can use `om-notify` to instead of `tm-notify`
this.parentWidget.dispatchEvent({
  type: 'om-notify',
  paramObject: options,
});
```

<$notify title="Test simple notify" />

<$button>
	<$action-sendmessage $message="om-notify" title="Just test simple notify" autoclose="false" />
	om-notify
</$button>
