<h2>
{{ $t('todo.title', {msg: 'title'}) }} ({{ todos.length - undone }}/{{todos.length}})
</h2>

<!-- add todo bar -->
<form
  @submit.prevent="addTodo"
  class="flex rounded border-solid border-gray-300 dark:border-gray-500"
>
	<input v-model="newTodo" :placeholder="$t('todo.placeholder', { msg: 'placeholder' })" class="w-full my-2 border-none" required="" :autofocus="'autofocus'"/>
<button class="w-1/4 md:w-1/12 mr-1"> {{ $t('todo.add', {msg: 'add'}) }} </button>
</form>

<!-- task list -->
<ul class="list-none my-4">
  <li v-for="todo in filteredTodos" :key="todo.id">
    <input type="checkbox" v-model="todo.done" class="mr-2 cursor-pointer" id="todo.id">
    <label :for="todo.id" :class="{ ['line-through']: todo.done, 'text-gray-400': todo.done }" >{{ todo.text }}</label>
    <button @click="removeTodo(todo)" :title="$t('todo.removeTooltip', { msg: 'removeTooltip' })" class="p-1 hover:text-red-400 rounded-full ml-2 size-8">✕</button>
  </li>
</ul>

<p v-if="!undone && todos.length > 0" class="text-sm text-gray-400">
{{ $t('todo.done') }} </p>
<p v-if="todos.length === 0" class="text-sm text-gray-400">
{{ $t('todo.empty') }}
</p>

<hr />

<button
  @click="hideCompleted = !hideCompleted"
  class="!p-1 border-solid border-gray-300 dark:border-gray-500 my-2"
  v-if="undone && undone !== todos.length"
>
    {{ hideCompleted ? $t('todo.showtodo') : $t('todo.hidedone') }}
</button>

<h2> {{ $t('todo.setup') }} </h2>

<!-- lang -->
<select v-model="$i18n.locale" @click="toggleLang" class="rounded p-1">
  <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale" >{{ locale }}</option>
</select>
