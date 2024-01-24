---
title: 'useReducer_–_React'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Nov 09 2023 05:45:46 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://react.dev/reference/react/useReducer'
---

# useReducer_–_React

`useReducer` is a React Hook that lets you add a [reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) to your component.`useReducer` 是一个 React Hook，可让您向组件添加 reducer。

```
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

* Reference  参考

    * `useReducer(reducer, initialArg, init?)`

    * `dispatch` function   `dispatch` 功能

* Usage  用法

    * Adding a reducer to a component 向组件添加减速器

    * Writing the reducer function 编写 reducer 函数

    * Avoiding recreating the initial state 避免重新创建初始状态

* Troubleshooting  故障 排除

    * I’ve dispatched an action, but logging gives me the old state value 我已经调度了一个操作，但日志记录给了我旧的状态值

    * I’ve dispatched an action, but the screen doesn’t update 我已调度操作，但屏幕没有更新

    * A part of my reducer state becomes undefined after dispatching 我的 reducer 状态的一部分在调度后变得未定义

    * My entire reducer state becomes undefined after dispatching 调度后，我的整个 reducer 状态变得未定义

    * I’m getting an error: “Too many re-renders”我收到错误：“重新渲染太多”

    * My reducer or initializer function runs twice 我的 reducer 或 initializer 函数运行了两次

---

## Reference  参考reference

### `useReducer(reducer, initialArg, init?)` usereducer

Call `useReducer` at the top level of your component to manage its state with a [reducer.](https://react.dev/learn/extracting-state-logic-into-a-reducer)在组件的顶层调用 `useReducer` ，以使用化简器管理其状态。

```
import { useReducer } from 'react';

function reducer(state, action) {

// ...

}

function MyComponent() {

const [state, dispatch] = useReducer(reducer, { age: 42 });

// ...
```

See more examples below. 请参阅下面的更多示例。

#### Parameters  参数parameters

* `reducer`: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.`reducer` ：指定如何更新状态的 reducer 函数。它必须是纯的，应将状态和操作作为参数，并应返回下一个状态。状态和操作可以是任何类型。

* `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next `init` argument.`initialArg` ：计算初始状态所依据的值。它可以是任何类型的值。如何从中计算初始状态取决于下一个 `init` 参数。

* **optional** `init`: The initializer function that should return the initial state. If it’s not specified, the initial state is set to `initialArg`. Otherwise, the initial state is set to the result of calling `init(initialArg)`.可选 `init` ：应返回初始状态的初始值设定项函数。如果未指定，则初始状态设置为 `initialArg` 。否则，初始状态将设置为调用 `init(initialArg)` 的结果。

#### Returns  返回returns

`useReducer` returns an array with exactly two values:`useReducer` 返回一个正好有两个值的数组：

1. The current state. During the first render, it’s set to `init(initialArg)` or `initialArg` (if there’s no `init`).当前状态。在第一次渲染期间，它被设置为 `init(initialArg)` 或 `initialArg` （如果没有 `init` ）。

1. The `dispatch` function that lets you update the state to a different value and trigger a re-render.该 `dispatch` 函数允许您将状态更新为其他值并触发重新呈现。

#### Caveats  警告caveats

* `useReducer` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.`useReducer` 是一个 Hook，所以你只能在组件的顶层或你自己的 Hook 中调用它。你不能在循环或条件中调用它。如果需要，请提取一个新组件并将状态移动到其中。

* In Strict Mode, React will **call your reducer and initializer twice** in order to help you find accidental impurities. This is development-only behavior and does not affect production. If your reducer and initializer are pure (as they should be), this should not affect your logic. The result from one of the calls is ignored.在严格模式下，React 会调用你的 reducer 和 initializer 两次，以帮助你找到意外的杂质。这是仅开发行为，不会影响生产。如果你的 reducer 和 initializer 是纯的（它们应该是纯的），这应该不会影响你的逻辑。其中一个调用的结果将被忽略。

---

### `dispatch` function   `dispatch` 功能dispatch

The `dispatch` function returned by `useReducer` lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the `dispatch` function:返回的 `dispatch` `useReducer` 函数允许您将状态更新为不同的值并触发重新呈现。您需要将该操作作为 `dispatch` 唯一参数传递给函数：

```
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {

dispatch({ type: 'incremented_age' });

// ...
```

React will set the next state to the result of calling the `reducer` function you’ve provided with the current `state` and the action you’ve passed to `dispatch`.React 会将下一个状态设置为调用你提供的函数的结果，其中包含当前 `reducer` `state` 函数和传递给的操作 `dispatch` 。

#### Parameters  参数dispatch-parameters

* `action`: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a `type` property identifying it and, optionally, other properties with additional information.`action` ：用户执行的操作。它可以是任何类型的值。按照惯例，操作通常是一个对象，具有标识它的属性，也可以是具有附加信息的其他 `type` 属性。

#### Returns  返回dispatch-returns

`dispatch` functions do not have a return value.`dispatch` 函数没有返回值。

#### Caveats  警告setstate-caveats

* The `dispatch` function **only updates the state variable for the *next* render**. If you read the state variable after calling the `dispatch` function, you will still get the old value that was on the screen before your call.该 `dispatch` 函数仅更新下一次渲染的状态变量。如果在调用 `dispatch` 函数后读取状态变量，则仍将获得调用前屏幕上的旧值。

* If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip re-rendering the component and its children.** This is an optimization. React may still need to call your component before ignoring the result, but it shouldn’t affect your code.如果您提供的新值与当前 `state` 值相同，则通过 `Object.is` 比较确定，React 将跳过重新渲染组件及其子项。这是一种优化。React 可能仍然需要在忽略结果之前调用你的组件，但它不应该影响你的代码。

* React [batches state updates.](https://react.dev/learn/queueing-a-series-of-state-updates) It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`.](https://react.dev/reference/react-dom/flushSync)React 对状态更新进行批处理。它会在所有事件处理程序运行并调用其 `set` 函数后更新屏幕。这样可以防止在单个事件期间进行多次重新渲染。在极少数情况下，您需要强制 React 提前更新屏幕，例如访问 DOM，您可以使用 `flushSync` .

---

## Usage  用法usage

### Adding a reducer to a component 向组件添加减速器adding-a-reducer-to-a-component

Call `useReducer` at the top level of your component to manage state with a [reducer.](https://react.dev/learn/extracting-state-logic-into-a-reducer)在组件的顶层调用 `useReducer` ，以使用 reducer 管理状态。

```
import { useReducer } from 'react';

function reducer(state, action) {

// ...

}

function MyComponent() {

const [state, dispatch] = useReducer(reducer, { age: 42 });

// ...
```

`useReducer` returns an array with exactly two items:`useReducer` 返回一个包含两个项目的数组：

1. The current state of this state variable, initially set to the initial state you provided.此状态变量的当前状态，最初设置为您提供的初始状态。

1. The `dispatch` function that lets you change it in response to interaction.允许您 `dispatch` 根据交互进行更改的功能。

To update what’s on the screen, call `dispatch` with an object representing what the user did, called an *action*:若要更新屏幕上的内容，请使用表示用户所执行操作的对象进行调用 `dispatch` ，称为操作：

```
function handleClick() {

dispatch({ type: 'incremented_age' });

}
```

React will pass the current state and the action to your reducer function. Your reducer will calculate and return the next state. React will store that next state, render your component with it, and update the UI.React 会将当前状态和动作传递给你的 reducer 函数。您的 reducer 将计算并返回下一个状态。React 将存储下一个状态，用它渲染你的组件，并更新 UI。

`useReducer` is very similar to [`useState`](https://react.dev/reference/react/useState), but it lets you move the state update logic from event handlers into a single function outside of your component. Read more about [choosing between `useState` and `useReducer`.](https://react.dev/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer)`useReducer` 与 `useState` 非常相似，但它允许您将状态更新逻辑从事件处理程序移动到组件外部的单个函数中。阅读有关在 和 `useReducer` 之间 `useState` 进行选择的更多信息。

---

### Writing the reducer function 编写 reducer 函数writing-the-reducer-function

A reducer function is declared like this:reducer 函数是这样声明的：

```
function reducer(state, action) {

// ...

}
```

Then you need to fill in the code that will calculate and return the next state. By convention, it is common to write it as a [`switch` statement.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) For each `case` in the `switch`, calculate and return some next state.然后，您需要填写将计算并返回下一个状态的代码。按照惯例，通常将其写为 `switch` 语句。对于 `switch` 中的每一个 `case` ，计算并返回一些下一个状态。

```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

return {

name: state.name,

age: state.age + 1

};

}

case 'changed_name': {

return {

name: action.nextName,

age: state.age

};

}

}

throw Error('Unknown action: ' + action.type);

}
```

Actions can have any shape. By convention, it’s common to pass objects with a `type` property identifying the action. It should include the minimal necessary information that the reducer needs to compute the next state.动作可以有任何形状。按照惯例，传递带有标识操作 `type` 的属性的对象是很常见的。它应该包括 reducer 计算下一个状态所需的最少必要信息。

```
function Form() {

const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });

function handleButtonClick() {

dispatch({ type: 'incremented_age' });

}

function handleInputChange(e) {

dispatch({

type: 'changed_name',

nextName: e.target.value

});

}

// ...
```

The action type names are local to your component. [Each action describes a single interaction, even if that leads to multiple changes in data.](https://react.dev/learn/extracting-state-logic-into-a-reducer#writing-reducers-well) The shape of the state is arbitrary, but usually it’ll be an object or an array.操作类型名称是组件的本地名称。每个操作都描述了一个交互，即使这会导致数据发生多个更改。状态的形状是任意的，但通常它是一个对象或数组。

Read [extracting state logic into a reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) to learn more.有关详细信息，请参阅将状态逻辑提取到化简器中。

### Pitfall 陷阱

State is read-only. Don’t modify any objects or arrays in state:状态是只读的。不要修改状态中的任何对象或数组：

```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// 🚩 Don't mutate an object in state like this:

state.age = state.age + 1;

return state;

}
```

Instead, always return new objects from your reducer:相反，请始终从 reducer 返回新对象：

```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// ✅ Instead, return a new object

return {

...state,

age: state.age + 1

};

}
```

Read [updating objects in state](https://react.dev/learn/updating-objects-in-state) and [updating arrays in state](https://react.dev/learn/updating-arrays-in-state) to learn more.有关详细信息，请参阅更新处于状态的对象和更新处于状态的数组。

---

### Avoiding recreating the initial state 避免重新创建初始状态avoiding-recreating-the-initial-state

React saves the initial state once and ignores it on the next renders.React 保存一次初始状态，并在下一次渲染时忽略它。

```
function createInitialState(username) {

// ...

}

function TodoList({ username }) {

const [state, dispatch] = useReducer(reducer, createInitialState(username));

// ...
```

Although the result of `createInitialState(username)` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating large arrays or performing expensive calculations.尽管结果 `createInitialState(username)` 仅用于初始渲染，但您仍会在每次渲染时调用此函数。如果要创建大型数组或执行昂贵的计算，这可能会造成浪费。

To solve this, you may **pass it as an *initializer* function** to `useReducer` as the third argument instead:为了解决这个问题，你可以把它作为一个初始值设定函数 `useReducer` 传递给第三个参数：

```
function createInitialState(username) {

// ...

}

function TodoList({ username }) {

const [state, dispatch] = useReducer(reducer, username, createInitialState);

// ...
```

Notice that you’re passing `createInitialState`, which is the *function itself*, and not `createInitialState()`, which is the result of calling it. This way, the initial state does not get re-created after initialization.请注意，您传递 `createInitialState` 的是，这是函数本身，而不是 `createInitialState()` ，这是调用它的结果。这样，初始化后不会重新创建初始状态。

In the above example, `createInitialState` takes a `username` argument. If your initializer doesn’t need any information to compute the initial state, you may pass `null` as the second argument to `useReducer`.在上面的例子中， `createInitialState` 采用一个 `username` 参数。如果初始值设定项不需要任何信息来计算初始状态，则可以将第二个参数传递给 `null` `useReducer` 。

---

## Troubleshooting  故障 排除troubleshooting

### I’ve dispatched an action, but logging gives me the old state value 我已经调度了一个操作，但日志记录给了我旧的状态值ive-dispatched-an-action-but-logging-gives-me-the-old-state-value

Calling the `dispatch` function **does not change state in the running code**:调用该 `dispatch` 函数不会更改运行代码中的状态：

```
function handleClick() {

console.log(state.age);  // 42

dispatch({ type: 'incremented_age' }); // Request a re-render with 43

console.log(state.age);  // Still 42!

setTimeout(() => {

console.log(state.age); // Also 42!

}, 5000);

}
```

This is because [states behaves like a snapshot.](https://react.dev/learn/state-as-a-snapshot) Updating state requests another render with the new state value, but does not affect the `state` JavaScript variable in your already-running event handler.这是因为状态的行为类似于快照。更新状态会请求另一个具有新状态值的渲染，但不会影响已运行的事件处理程序中的 `state` JavaScript 变量。

If you need to guess the next state value, you can calculate it manually by calling the reducer yourself:如果需要猜测下一个状态值，可以通过自己调用 reducer 来手动计算：

```
const action = { type: 'incremented_age' };

dispatch(action);

const nextState = reducer(state, action);

console.log(state);     // { age: 42 }

console.log(nextState); // { age: 43 }
```

---

### I’ve dispatched an action, but the screen doesn’t update 我已调度操作，但屏幕没有更新ive-dispatched-an-action-but-the-screen-doesnt-update

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:如果下一个状态等于前一个状态，React 将忽略你的更新，这是通过 `Object.is` 比较确定的。当您直接更改处于状态的对象或数组时，通常会发生这种情况：

```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// 🚩 Wrong: mutating existing object

state.age++;

return state;

}

case 'changed_name': {

// 🚩 Wrong: mutating existing object

state.name = action.nextName;

return state;

}

// ...

}

}
```

You mutated an existing `state` object and returned it, so React ignored the update. To fix this, you need to ensure that you’re always [updating objects in state](https://react.dev/learn/updating-objects-in-state) and [updating arrays in state](https://react.dev/learn/updating-arrays-in-state) instead of mutating them:你改变了一个现有 `state` 对象并返回了它，所以 React 忽略了更新。要解决此问题，您需要确保始终更新处于状态的对象并更新处于状态的数组，而不是改变它们：

```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// ✅ Correct: creating a new object

return {

...state,

age: state.age + 1

};

}

case 'changed_name': {

// ✅ Correct: creating a new object

return {

...state,

name: action.nextName

};

}

// ...

}

}
```

---

### A part of my reducer state becomes undefined after dispatching 我的 reducer 状态的一部分在调度后变得未定义a-part-of-my-reducer-state-becomes-undefined-after-dispatching

Make sure that every `case` branch **copies all of the existing fields** when returning the new state:确保每个 `case` 分支在返回新状态时都复制所有现有字段：

```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

return {

...state, // Don't forget this!

age: state.age + 1

};

}

// ...
```

Without `...state` above, the returned next state would only contain the `age` field and nothing else.如果没有 `...state` 上述内容，返回的下一个状态将仅包含该字段， `age` 而不包含其他任何内容。

---

### My entire reducer state becomes undefined after dispatching 调度后，我的整个 reducer 状态变得未定义my-entire-reducer-state-becomes-undefined-after-dispatching

If your state unexpectedly becomes `undefined`, you’re likely forgetting to `return` state in one of the cases, or your action type doesn’t match any of the `case` statements. To find why, throw an error outside the `switch`:如果状态意外变 `undefined` 为，则可能在其中一种情况下忘记声明 `return` ，或者操作类型与任何 `case` 语句都不匹配。要找出原因，请在 `switch` ：

```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// ...

}

case 'edited_name': {

// ...

}

}

throw Error('Unknown action: ' + action.type);

}
```

You can also use a static type checker like TypeScript to catch such mistakes.您还可以使用静态类型检查器（如 TypeScript）来捕获此类错误。

---

### I’m getting an error: “Too many re-renders”我收到错误：“重新渲染太多”im-getting-an-error-too-many-re-renders

You might get an error that says: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you’re unconditionally dispatching an action *during render*, so your component enters a loop: render, dispatch (which causes a render), render, dispatch (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:您可能会收到以下错误：通常，这意味着您在渲染期间无条件调度操作，因此您的组件会进入一个循环： `Too many re-renders. React limits the number of renders to prevent an infinite loop.` 渲染、调度（导致渲染）、渲染、调度（导致渲染）等。很多时候，这是由指定事件处理程序时的错误引起的：

```
// 🚩 Wrong: calls the handler during render

return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler

return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function

return <button onClick={(e) => handleClick(e)}>Click me</button>
```

If you can’t find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `dispatch` function call responsible for the error.如果找不到此错误的原因，请在控制台中单击错误旁边的箭头，然后查看 JavaScript 堆栈以查找导致该错误的特定 `dispatch` 函数调用。

---

### My reducer or initializer function runs twice 我的 reducer 或 initializer 函数运行了两次my-reducer-or-initializer-function-runs-twice

In [Strict Mode](https://react.dev/reference/react/StrictMode), React will call your reducer and initializer functions twice. This shouldn’t break your code.在严格模式下，React 将调用你的 reducer 和 initializer 函数两次。这不应该破坏你的代码。

This **development-only** behavior helps you [keep components pure.](https://react.dev/learn/keeping-components-pure) React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and reducer functions are pure, this shouldn’t affect your logic. However, if they are accidentally impure, this helps you notice the mistakes.这种仅开发行为可帮助您保持组件的纯净性。React 使用其中一个调用的结果，并忽略另一个调用的结果。只要你的组件、初始值设定项和 reducer 函数是纯函数，这应该不会影响你的逻辑。但是，如果它们不小心不纯，这有助于您注意到错误。

For example, this impure reducer function mutates an array in state:例如，这个不纯的 reducer 函数会改变数组的状态：

```
function reducer(state, action) {

switch (action.type) {

case 'added_todo': {

// 🚩 Mistake: mutating state

state.todos.push({ id: nextId++, text: action.text });

return state;

}

// ...

}

}
```

Because React calls your reducer function twice, you’ll see the todo was added twice, so you’ll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](https://react.dev/learn/updating-arrays-in-state#adding-to-an-array):因为 React 调用了两次 reducer 函数，所以你会看到 todo 被添加了两次，所以你会知道有一个错误。在此示例中，您可以通过替换数组而不是更改数组来修复错误：

```
function reducer(state, action) {

switch (action.type) {

case 'added_todo': {

// ✅ Correct: replacing with new state

return {

...state,

todos: [

...state.todos,

{ id: nextId++, text: action.text }

]

};

}

// ...

}

}
```

Now that this reducer function is pure, calling it an extra time doesn’t make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and reducer functions need to be pure.** Event handlers don’t need to be pure, so React will never call your event handlers twice.既然这个 reducer 函数是纯函数，那么调用它额外的时间不会对行为产生任何影响。这就是为什么 React 调用它两次可以帮助你发现错误的原因。只有 component、initializer 和 reducer 函数需要是纯函数。事件处理程序不需要是纯的，所以 React 永远不会调用你的事件处理程序两次。

Read [keeping components pure](https://react.dev/learn/keeping-components-pure) to learn more.阅读保持组件纯净以了解更多信息。
