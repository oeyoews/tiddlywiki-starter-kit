```tsx
interface Foo {
  x: number;
  y: number;
}

type PartialFoo = Partial<Foo>;
```

`Partial<T>` 是 TypeScript 提供的一个内置工具类型，它接受一个类型 `T` 作为参数，并将 `T` 中所有属性设为可选的。换句话说，`Partial<T>` 将原始类型 `T` 的每个属性都转换为可选的。

在你的例子中，`Foo` 是一个接口，表示一个拥有 `x` 和 `y` 属性的对象类型。而 `PartialFoo` 是通过 `Partial<Foo>` 创建的一个类型别名，它描述了一个可选的 `x` 和 `y` 属性。因此，`PartialFoo` 的定义等效于以下代码：

```typescript
type PartialFoo = {
  x?: number;
  y?: number;
};
```

可以看到，`PartialFoo` 中的每个属性都有一个问号 `?`，表示这些属性是可选的。

通过使用 `Partial<T>`，我们可以更方便地处理那些需要某个类型的部分属性的情况。例如，在创建对象时可以只提供部分属性，而不必设置所有属性的值。