<!-- NOTE: vue.config.js 出现在 tabs 里面, vscode 就不会有报错了 -->
<!-- <template> -->
<h2>
    {{ t('todo.title') }}
  </h2>

<!-- add todo bar -->
<form
  @submit.prevent="addTodo"
  class="flex rounded border-solid border-gray-300 dark:border-gray-500"
>
    <input
      v-model.trim="newTodo"
      :placeholder="t('todo.placeholder', { msg: 'placeholder' })"
      class="w-full my-2 border-none"
      required=""
      :autofocus="'autofocus'"
    />

    <button class="w-1/4 md:w-1/12 mr-1">
      {{ t('todo.add', { msg: 'add' }) }}
    </button>
  </form>

<!-- progress -->
<div class="flex gap-2 items-center my-2 justify-between text-gray-400 text-sm mx-8 mt-4" v-if="todos.length">
<div>
{{ done }}/{{ todos.length }}
</div>
<progress :value="done" :max="todos.length" id="todo-progress"></progress>
<div>
{{ (done / todos.length).toFixed(2) * 100 }}%
</div>
</div>

<!-- task list -->
<ul class="list-none my-4" key="task-list">
    <div
      class="flex justify-between items-center group"
      v-for="(todo, index) in filteredTodos"
      :key="todo.id"
    >
      <li class="truncate">
        <input
          type="checkbox"
          v-model="todo.done"
          class="mr-2 cursor-pointer"
          id="todo.id"
        />
        <label
          :for="todo.id"
          :class="{ ['line-through']: todo.done, 'text-gray-400': todo.done }"
          >{{ todo.text }}</label
        >
      </li>
      <div v-if="todo.date" class="text-gray-400 text-sm mx-2">
        {{ todo.date }}
        <button
          @click="removeTodo(index)"
          :title="t('todo.removeTooltip', { msg: 'removeTooltip' })"
          class="p-1 hover:text-red-400 rounded-full ml-2 size-8 opacity-0 group-hover:opacity-100 transition-all"
        >
          ✕
        </button>
      </div>
    </div>
  </ul>

<!-- tip -->
<!-- <Transition>
<p v-if="!undone && todos.length > 0" class="text-sm text-gray-400">
{{ t('todo.done') }} </p>
<p v-if="todos.length === 0" class="text-sm text-gray-400">
{{ t('todo.empty') }}
</p>
</Transition> -->

<button
  @click="resetTodos"
  class="!p-1 border-solid border-gray-300 dark:border-gray-500 my-2 mx-2"
  v-show="todos.length"
>
    {{ t('todo.resetTodos') }}
  </button>

<transition>
    <button
      @click="hideCompleted = !hideCompleted"
      class="!p-1 border-solid border-gray-300 dark:border-gray-500 my-2 mx-2"
      v-show="undone && undone !== todos.length"
    >
      {{ hideCompleted ? t('todo.showtodo') : t('todo.hidedone') }}
    </button>
  </transition>

<h2>{{ t('todo.setup') }}</h2>

<!-- lang -->
<select v-model="$i18n.locale" @click="toggleLang" class="rounded p-1">
    <option
      v-for="locale in $i18n.availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
    >
      {{ locale }}
    </option>
  </select>
<!-- </template> -->
