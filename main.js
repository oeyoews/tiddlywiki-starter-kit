// 当对象中的函数被调用时，这个函数可以通过`this`关键字访问其依附的这个对象。
myObj = {
  myString: 'Hello world!',
  myFunc: function () {
    return this.myString;
  },
};
myObj.myFunc(); // = "Hello world!"

// 但这个函数访问的其实是其运行时环境，而非定义时环境，即取决于函数是如何调用的。
// 所以如果函数被调用时不在这个对象的上下文中，就不会运行成功了。
var myFunc = myObj.myFunc;
myFunc(); // = undefined

// 相应的，一个函数也可以被指定为一个对象的方法，并且可以通过`this`访问
// 这个对象的成员，即使在函数被定义时并没有依附在对象上。
var myOtherFunc = function () {
  return this.myString.toUpperCase();
};
myObj.myOtherFunc = myOtherFunc;
myObj.myOtherFunc(); // = "HELLO WORLD!"

// 当我们通过`call`或者`apply`调用函数的时候，也可以为其指定一个执行上下文。
var anotherFunc = function (s) {
  return this.myString + s;
};
anotherFunc.call(myObj, ' And Hello Moon!'); // = "Hello World! And Hello Moon!"

// `apply`函数几乎完全一样，只是要求一个array来传递参数列表。
anotherFunc.apply(myObj, [' And Hello Sun!']); // = "Hello World! And Hello Sun!"

// 当一个函数接受一系列参数，而你想传入一个array时特别有用。
Math.min(42, 6, 27); // = 6
Math.min([42, 6, 27]); // = NaN (uh-oh!)
Math.min.apply(Math, [42, 6, 27]); // = 6

// 但是`call`和`apply`只是临时的。如果我们希望函数附着在对象上，可以使用`bind`。
var boundFunc = anotherFunc.bind(myObj);
boundFunc(' And Hello Saturn!'); // = "Hello World! And Hello Saturn!"

// `bind` 也可以用来部分应用一个函数（柯里化）。
var product = function (a, b) {
  return a * b;
};
var doubler = product.bind(this, 2);
doubler(8); // = 16

// 当你通过`new`关键字调用一个函数时，就会创建一个对象，
// 而且可以通过this关键字访问该函数。
// 设计为这样调用的函数就叫做构造函数。
var MyConstructor = function () {
  this.myNumber = 5;
};
myNewObj = new MyConstructor(); // = {myNumber: 5}
myNewObj.myNumber; // = 5

// 每一个js对象都有一个‘原型’。当你要访问一个实际对象中没有定义的一个属性时，
// 解释器就回去找这个对象的原型。

// 一些JS实现会让你通过`__proto__`属性访问一个对象的原型。
// 这虽然对理解原型很有用，但是它并不是标准的一部分；
// 我们后面会介绍使用原型的标准方式。
var myObj = {
  myString: 'Hello world!',
};
var myPrototype = {
  meaningOfLife: 42,
  myFunc: function () {
    return this.myString.toLowerCase();
  },
};

myObj.__proto__ = myPrototype;
myObj.meaningOfLife; // = 42

// 函数也可以工作。
myObj.myFunc(); // = "hello world!"

// 当然，如果你要访问的成员在原型当中也没有定义的话，解释器就会去找原型的原型，以此类推。
myPrototype.__proto__ = {
  myBoolean: true,
};
myObj.myBoolean; // = true

// 这其中并没有对象的拷贝；每个对象实际上是持有原型对象的引用。
// 这意味着当我们改变对象的原型时，会影响到其他以这个原型为原型的对象。
myPrototype.meaningOfLife = 43;
myObj.meaningOfLife; // = 43

// 我们知道 `__proto__` 并非标准规定，实际上也没有标准办法来修改一个已存在对象的原型。
// 然而，我们有两种方式为指定原型创建一个新的对象。

// 第一种方式是 Object.create，这个方法是在最近才被添加到Js中的，
// 因此并不是所有的JS实现都有这个方法
var myObj = Object.create(myPrototype);
myObj.meaningOfLife; // = 43

// 第二种方式可以在任意版本中使用，不过必须通过构造函数。
// 构造函数有一个属性prototype。但是它 *不是* 构造函数本身的原型；相反，
// 是通过构造函数和new关键字创建的新对象的原型。
MyConstructor.prototype = {
  myNumber: 5,
  getMyNumber: function () {
    return this.myNumber;
  },
};
var myNewObj2 = new MyConstructor();
myNewObj2.getMyNumber(); // = 5
myNewObj2.myNumber = 6;
myNewObj2.getMyNumber(); // = 6

// 字符串和数字等内置类型也有通过构造函数来创建的包装类型
var myNumber = 12;
var myNumberObj = new Number(12);
myNumber == myNumberObj; // = true

// 但是它们并非严格等价
typeof myNumber; // = 'number'
typeof myNumberObj; // = 'object'
myNumber === myNumberObj; // = false
if (0) {
  // 这段代码不会执行，因为0代表假
}

// 不过，包装类型和内置类型共享一个原型，
// 所以你实际可以给内置类型也增加一些功能，例如对string：
String.prototype.firstCharacter = function () {
  return this.charAt(0);
};
'abc'.firstCharacter(); // = "a"

// 这个技巧经常用在“代码填充”中，来为老版本的javascript子集增加新版本js的特性，
// 这样就可以在老的浏览器中使用新功能了。

// 比如，我们知道Object.create并没有在所有的版本中都实现，
// 但是我们仍然可以通过“代码填充”来实现兼容：
if (Object.create === undefined) {
  // 如果存在则不覆盖
  Object.create = function (proto) {
    // 用正确的原型来创建一个临时构造函数
    var Constructor = function () {};
    Constructor.prototype = proto;
    // 之后用它来创建一个新的对象
    return new Constructor();
  };
}
