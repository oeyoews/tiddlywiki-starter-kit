<template>
  <h2>Vue3 插件示例</h2>
  <button @click="toggleRender" :class="btnClass">点击切换预览</button>

  <div v-if="renderComponent">
    <h2>Vu3 Version</h2>

    <span :id="version">Hello, Vue {{ version }}! {{ time }} </span>

    <h2>计数器</h2>

    <button @click="count++" :class="btnClass">Count is {{ count }}</button>

    <h2>切换侧边栏</h2>

    <button @click="toggleSidebar" :class="btnClass">
      {{ sidebarText }}侧边栏
    </button>
  </div>

  <h2>输入框</h2>

  <input
    v-model="inputValue"
    placeholder="input something"
    class="w-full my-2"
    autofocus="'autofocus'"
  />

  <p v-if="inputValue">{{ inputValue }}</p>

  <p v-else>这里会被更新</p>

  <h2>待办事项</h2>

  <form @submit.prevent="addTodo" class="flex">
    <!-- v-model 对 IME 进行了处理 -->
    <!-- NOTE: textarea 不支持 插值语法，需要使用 v-model 代替 -->
    <input
      v-model="newTodo"
      placeholder="new todo"
      v-focus
      class="w-full"
      required
    />
    <button :class="btnClass">addTodo</button>
  </form>

  <p>当前任务数量: {{ todos.length }}</p>
  <button @click="hideCompleted = !hideCompleted" :class="btnClass">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>

  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done" class="mr-2" />
      <span :class="{ ['line-through']: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">x</button>
    </li>
  </ul>

  <h2>选择框</h2>

  <div>Selected: {{ selected }}</div>

  <select v-model="selected" class="p-2">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <h2>Ref(react 的 useRef)</h2>

  <p ref="pElementRef">还没挂载</p>

  <h2>Random dog</h2>

  <div class="my-2">
    <button
      @click="getDogImg"
      :disabled="dogurlstatus === 'loading'"
      :class="[
        btnClass,
        {
          'opacity-50': dogurlstatus,
          'cursor-not-allowed': dogurlstatus
        }
      ]"
    >
      getDogImg
    </button>
  </div>

  <div class="flex items-center justify-center">
    <!-- v-loading="loading" -->
    <div>
      <video width="320" height="240" v-if="dogvideourl">
        <source :src="dogvideourl" type="video/mp4" />
      </video>
      <img
        v-if="dogurl"
        :src="dogurl"
        alt="dog"
        class="w-64 rounded object-cover aspect-video"
      />
      <!-- <div v-show="dogurlstatus === 'loading'" class="h-24 animate-bounce">
        Loading ...
      </div> -->
    </div>
  </div>
</template>
