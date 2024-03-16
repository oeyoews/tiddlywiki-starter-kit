<template>
  <!-- border button -->
  <!-- addevent listener update list -->
  <div class="lg:flex fixed top-0 overflow-auto backdrop-blur-md hidden" @click.prevent="closeTiddler">
    <TransitionGroup>
      <span v-for="item in data" class="bg-gray-100 p-2 hover:bg-gray-300 transition-all group rounded-none shrink-0"
        :key="item">
        {{item}}
        <button class="bg-transparent opacity-0 hover:text-red-500 group-hover:opacity-100" :data-id="item">x</button>
      </span>
    </TransitionGroup>
  </div>
</template>