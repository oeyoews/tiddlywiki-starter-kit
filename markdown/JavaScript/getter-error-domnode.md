---
title: 'getter-error-domnode'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Jan 10 2024 13:58:40 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# getter-error-domnode

“Cannot set property parentNode of #<Node>which has only a getter” 这种错误通常与尝试修改 DOM 节点的只读属性有关。在 DOM 中，有些属性是只读的，它们只能被获取而不能被设置。其中之一就是 `parentNode` 属性，该属性表示一个节点的父节点。
</p>
当你尝试通过设置 `parentNode` 属性来修改节点的父节点时，如果这个属性是只读的，就会触发这个错误。这通常发生在使用不当的 DOM 操作时，例如尝试将一个节点插入到另一个节点中，但目标节点的 `parentNode` 属性是只读的。

要解决这个问题，你可以确保在操作 DOM 节点时，使用正确的方法和属性。例如，使用 `appendChild` 或 `insertBefore` 方法来移动节点，而不是直接修改 `parentNode` 属性。确保你的 DOM 操作符合 DOM 规范和最佳实践。如果可能，请提供你的代码片段，以便我可以提供更具体的帮助。

</div></Node>
