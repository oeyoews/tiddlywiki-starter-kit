<template>
  <!-- NOTE: vue.config.js 出现在 tabs 里面, vscode 就不会有报错了 -->
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
  <div
    class="flex gap-2 items-center my-2 justify-between text-gray-400 text-sm mx-8 mt-4"
    v-show="todos.length"
  >
    <div>{{ done }}/{{ todos.length }}</div>
    <progress :value="done" :max="todos.length" id="todo-progress"></progress>
    <div>
      {{ progress }}
    </div>
  </div>

  <!-- task list -->
  <draggable
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      class: 'list-none my-4 hover:cursor-move',
      name: !drag ? 'flip-list' : null
    }"
    v-model="todos"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
  >
    <template #item="{ element }">
      <div class="flex justify-between items-center group" :key="element.id">
        <li
          class="truncate"
          @dblclick="startEdit(element, element.id)"
          v-show="editingIndex !== element.id"
        >
          <input
            type="checkbox"
            v-model="element.done"
            class="mr-2 cursor-pointer"
          />
          <label
            :for="element.id"
            :class="{
              ['line-through']: element.done,
              'text-gray-400': element.done
            }"
            >{{ element.text }}</label
          >
        </li>
        <li v-show="editingIndex === element.id" class="w-full">
          <input
            v-model="editingText"
            @keyup.enter="finishEdit(element.id)"
            @blur="cancelEdit(element.id)"
            class="w-full"
          />
          <div class="mt-1">
            <button @click="cancelEdit(element.id)">
              {{ t('todo.cancel') }}
            </button>
            <button @click="finishEdit(element.id)">
              {{ t('todo.save') }}
            </button>
          </div>
        </li>
        <div
          v-show="element.date && editingIndex !== element.id"
          class="text-gray-400 text-sm mx-2"
        >
          {{ element.date }}
          <button
            @click="removeTodo(index)"
            :title="t('todo.removeTooltip', { msg: 'removeTooltip' })"
            class="p-1 hover:text-red-400 rounded-full ml-2 size-8 opacity-0 group-hover:opacity-100 transition-all"
          >
            ✕
          </button>
        </div>
      </div>
    </template>
  </draggable>

  <button
    @click="resetTodos"
    class="!p-1 border-solid border-gray-300 dark:border-gray-500 my-2 mx-2"
    v-show="todos.length"
  >
    {{ t('todo.resetTodos') }}
  </button>

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
    <option
      v-for="locale in $i18n.availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
    >
      {{ locale }}
    </option>
  </select>
</template>
