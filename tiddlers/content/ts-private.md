```ts
class Test {
  constructor(private array: [], private compare: () => number) {}
	
  log() {
    const { length } = this.array;
    this.compare();
  }
}
```

private 声明的变量参数,会自动保存为类的成员变量,无需手动赋值绑定

在 TypeScript 中，`private`、`public` 和 `protected` 是用来限定类成员（属性和方法）的访问权限的修饰符。它们有以下含义：

1. **private**：私有成员，只能在当前类的内部访问。外部无法访问私有成员，包括继承类也无法访问。

2. **public**：公共成员，可以在任何地方被访问。默认情况下，类的成员是公共的，如果不明确指定修饰符，默认为 `public`。

3. **protected**：受保护成员，可以在当前类及其子类中访问，但在类的实例外部无法访问。

以下是使用这些修饰符的示例：

```typescript
class MyClass {
  private privateProp: number = 10;
  public publicProp: string = "Hello";
  protected protectedProp: boolean = true;

  constructor() {
    // 可以在类的内部访问私有、公共和受保护成员
    console.log(this.privateProp);    // 私有成员，可访问
    console.log(this.publicProp);     // 公共成员，可访问
    console.log(this.protectedProp);  // 受保护成员，可访问
  }
}

class MySubClass extends MyClass {
  constructor() {
    super();
    // 子类可以访问受保护成员
    console.log(this.protectedProp);  // 受保护成员，可访问
    // 无法访问私有成员，因为私有成员只能在声明它的类内部访问
    // console.log(this.privateProp); // 编译错误
  }
}

const instance = new MyClass();
// 在类的实例外部，只能访问公共成员
console.log(instance.publicProp);    // 公共成员，可访问
// 无法访问私有和受保护成员
// console.log(instance.privateProp); // 编译错误
// console.log(instance.protectedProp); // 编译错误
```

在上面的示例中，`privateProp` 是私有成员，只能在 `MyClass` 类内部访问，`publicProp` 是公共成员，可以在任何地方访问，`protectedProp` 是受保护成员，可以在 `MyClass` 及其子类中访问，但在实例外部无法访问。