---
title: 'react-redux-example'
tags: ['React']
type: 'text/markdown'
created: 'Sun Apr 30 2023 11:11:15 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-redux-example

以下是一个简单的 React 状态管理示例，使用 Redux 作为状态管理库：

首先，我们需要创建一个 Redux store，并在应用程序中使用它。可以通过以下代码实现：

```javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
}
```

这样，我们就可以将 store 传递给应用程序中的组件。

接下来，我们需要编写 reducer 函数，该函数用于处理不同的 action，并返回新的应用程序 state：

```javascript
const initialState = {
  todos: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}
```

在这个 reducer 中，我们定义了两个 action，一个用于添加 todo，另一个用于移除 todo。在每个 action 中，我们都返回了一个新的 state 对象，而不是修改原始 state 对象。

接下来，我们需要编写一个 action creator，它是一个返回 action 对象的函数：

```javascript
function addTodoAction(todo) {
  return {
    type: 'ADD_TODO',
    payload: todo,
  };
}

function removeTodoAction(id) {
  return {
    type: 'REMOVE_TODO',
    payload: id,
  };
}
```

最后，我们需要在组件中使用这些 action creator 来修改应用程序的状态。例如，我们可以在一个按钮点击事件中调用 addTodoAction：

```javascript
import { connect } from 'react-redux';
import { addTodoAction } from './actions';

function MyComponent({ todos, addTodo }) {
  const [text, setText] = useState('');

  function handleAdd() {
    if (text) {
      addTodo({
        id: Math.random(),
        text,
      });
      setText('');
    }
  }

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => removeTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  addTodo: addTodoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

在这个组件中，我们使用 connect 函数将组件连接到 Redux store。通过 mapStateToProps 函数，我们将 store 中的 todo 状态映射到组件的 props 中，而 mapDispatchToProps 函数则将 addTodoAction 映射到组件的 props 中。最后，我们可以在点击事件中调用这个 action 来添加一个新的 todo。

这就是一个简单的 React 状态管理示例，演示了如何使用 Redux 作为状态管理库来管理应用程序的状态。
