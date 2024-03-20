<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <!-- NOTE: vue.config.js 出现在 tabs 里面, vscode 就不会有报错了 -->
  <h2>
    {{ t('todo.title') }}

  </h2>

  <!-- add todo bar -->
  <form @submit.prevent="addTodo" class="flex rounded border-solid border-gray-300 dark:border-gray-500">
    <input v-model.trim="newTodo" :placeholder="t('todo.placeholder', { msg: 'placeholder' })"
      class="w-full my-2 border-none" required="" :autofocus="'autofocus'" />

    <button class="w-1/4 md:w-1/12 mr-1">
      {{ t('todo.add', { msg: 'add' }) }}
    </button>
  </form>

  <!-- progress -->
  <div class="flex gap-2 items-center my-2 justify-between text-gray-400 text-sm mx-8 mt-4" v-if="todos.length > 0">
    <div>{{ done }}/{{ todos.length }}</div>
    <progress :value="done" :max="todos.length" id="todo-progress"></progress>
    <div>
      {{ progress }}
    </div>
  </div>

  <!-- task list -->
  <!-- v-draggable="[todos, { animation: 150 }]"  -->
  <VueDraggable target=".sort-target" v-mode="todos">
    <TransitionGroup tag="div" class="list-none my-4 hover:cursor-move todo-list" class="sort-target">
      <template v-for="item in todos">
        <div class="flex justify-between items-center group">
          <div v-if="editingIndex !== item.id">
            <li class="flex items-center truncate todo m-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="opacity-0 group-hover:opacity-100" width="1em" height="1em"
                viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="8" cy="4" r="1" transform="rotate(90 8 4)" />
                  <circle cx="16" cy="4" r="1" transform="rotate(90 16 4)" />
                  <circle cx="8" cy="12" r="1" transform="rotate(90 8 12)" />
                  <circle cx="16" cy="12" r="1" transform="rotate(90 16 12)" />
                  <circle cx="8" cy="20" r="1" transform="rotate(90 8 20)" />
                  <circle cx="16" cy="20" r="1" transform="rotate(90 16 20)" />
                </g>
              </svg>
              <input type="checkbox" v-model="item.done" class="mr-2 cursor-pointer toggle" :id="item.id" />
              <label :for="item.id" class="cursor-pointer" :class="{
                ['line-through']: item.done,
                'text-gray-400': item.done
              }">{{ item.text }}</label>
            </li>
          </div>
          <li v-show="editingIndex === item.id" class="w-full">
            <input v-model="editingText" @keyup.enter="finishEdit(item.id)" @blur="cancelEdit(item.id)"
              @keyup.escape="cancelEdit(item.id)" class="w-full" />
            <div class="mt-1">
              <button @click="cancelEdit(item.id)">
                {{ t('todo.cancel') }}
              </button>
              <button @click="finishEdit(item.id)">
                {{ t('todo.save') }}
              </button>
            </div>
          </li>

          <div v-show="item.date && editingIndex !== item.id" class="text-gray-400 text-sm mx-2">
            {{ item.date }}

            <button @click="startEdit(item, item.id)">Edit</button>
            <button @click="removeTodo(item.id)" :title="t('todo.removeTooltip', { msg: 'removeTooltip' })"
              class="p-1 hover:text-red-400 rounded-md opacity-50 group-hover:opacity-100 transition-all">
              del
            </button>
          </div>
        </div>
      </template>
    </TransitionGroup>
  </VueDraggable>

  <!-- bottom -->
  <div class="flex items-center justify-end text-sm">
    <div @click="resetTodos" class="text-gray-600 cursor-pointer hover:underline hover:text-gray-400 transition-all"
      v-show="todos.length">
      {{ t('todo.resetTodos') }}
    </div>
  </div>

  <!--
  <transition>
    <button
      @click="hideCompleted = !hideCompleted"
      class="!p-1 border-solid border-gray-300 dark:border-gray-500 my-2 mx-2"
      v-show="undone && undone !== todos.length"
    >
      {{ hideCompleted ? t('todo.showtodo') : t('todo.hidedone') }}
    </button>
  </transition>
-->

  <h2>{{ t('todo.setup') }}</h2>

  <!-- lang -->
  <select v-model="$i18n.locale" @click="toggleLang" class="rounded p-1">
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>