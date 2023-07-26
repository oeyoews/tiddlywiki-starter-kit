TypeScript 在编译为 JavaScript 时，使用了一种称为“名称重写”的技术来实现私有成员的访问控制。这个过程被称为“编译时封装”。

在 TypeScript 中，`private` 成员被编译为 JavaScript 中的闭包。编译器会将 `private` 成员重命名为一个唯一的标识符，并创建一个闭包函数来封装这个成员。这样，外部无法直接访问和修改私有成员，只能通过闭包函数来间接访问。

以下是一个 TypeScript 类中的 `private` 成员的示例及其编译后的 JavaScript 代码：

```typescript
class MyClass {
  private myPrivateProperty: string;

  constructor() {
    this.myPrivateProperty = "private value";
  }

  private myPrivateMethod() {
    console.log(this.myPrivateProperty);
  }

  public myPublicMethod() {
    this.myPrivateMethod();
  }
}

const myObject = new MyClass();
myObject.myPublicMethod();
```

编译后的 JavaScript 代码：

```javascript
var MyClass = /** @class */ (function () {
  function MyClass() {
    this._myPrivateProperty = "private value";
  }

  MyClass.prototype._myPrivateMethod = function () {
    console.log(this._myPrivateProperty);
  };

  MyClass.prototype.myPublicMethod = function () {
    this._myPrivateMethod();
  };

  return MyClass;
}());

var myObject = new MyClass();
myObject.myPublicMethod();
```

在编译后的 JavaScript 代码中，`private` 成员 `myPrivateProperty` 被重命名为 `_myPrivateProperty`，`myPrivateMethod` 被重命名为 `_myPrivateMethod`。这些成员只能在闭包函数内部访问，外部无法直接访问它们。

尽管 JavaScript 中的闭包函数并不能真正阻止对私有成员的访问，但它们提供了一种机制，使得私有成员对外部代码来说更难以访问，从而增强了封装性和代码安全性。