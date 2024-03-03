<h2>Vue3 插件示例</h2>
<button @click="toggleRender" :class="btnClass">点击切换预览</button>

<div v-if="renderComponent">

</hr>

<h2>Vu3 Version</h2>

<div :id="version">Hello, Vue {{ version }}! {{ time }} </div>

<h2>计数器</h2>

<button @click="count++" :class="btnClass">
 Count is {{ count }}
</button>

<h2>切换侧边栏</h2>

<button @click="toggleSidebar" :class="btnClass">
{{ sidebarText }}侧边栏
<button>

</div>

<h2>输入框</h2>

<input v-model="inputValue" placeholder="input something" class="w-full my-2" />

<p v-if="inputValue"> {{inputValue}} </p>

<p v-else>这里会被更新</p>

<h2>待办事项</h2>

<form @submit.prevent="addTodo" class="flex">
<!-- v-model 对 IME 进行了处理 -->
<!-- NOTE: textarea 不支持 插值语法，需要使用 v-model 代替 -->
<input v-model="newTodo" placeholder="new todo" class="w-full" required/>
<button :class="btnClass"> addTodo </button>
</form>

<p>当前任务数量: {{todos.length}} </p>
<button @click="hideCompleted = !hideCompleted" :class="btnClass">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
</button>

<ul>
  <li v-for="todo in filteredTodos" :key="todo.id">
  <input type="checkbox" v-model="todo.done" class="mr-2">
 <span :class="{ ['line-through']: todo.done }">{{ todo.text }}</span>
  <button @click="removeTodo(todo)"> x </button>
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

<h2> vant </h2>

<h2> Button </h2>
<div class="flex gap-2">
<van-button type="primary">主要按钮</van-button>
<van-button type="success">成功按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>

<van-button icon="plus" type="primary" />
<van-button icon="plus" type="primary">按钮</van-button>
<van-button
  icon="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
  type="primary"
>
  按钮
</van-button>

</div>


<h2> cell </h2>

<van-cell value="内容" is-link>
  <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    <span class="custom-title">单元格</span>
    <van-tag type="primary">标签</van-tag>
  </template>
</van-cell>

<van-cell title="单元格" icon="shop-o">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template #right-icon>
    <van-icon name="search" class="search-icon" />
  </template>
</van-cell>

<h2>icon</h2>

<!-- 不指定单位，默认使用 px -->
<van-icon name="chat-o" size="40" />
<!-- 指定使用 rem 单位 -->
<van-icon name="chat-o" size="3rem" />

<h2> Popup</h2>

<!-- 顶部弹出 -->
<van-popup v-model:show="showTop" position="top" :style="{ height: '30%' }" />

<h2>Calendar</h2>

<van-calendar
  title="日历"
  :poppable="false"
  :show-confirm="false"
  :style="{ height: '500px' }"
/>

<van-cell title="选择日期区间" :value="date" @click="show = true" />
<van-calendar v-model:show="show" type="range" @confirm="onConfirm" />


