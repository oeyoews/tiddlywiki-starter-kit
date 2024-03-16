<template>
  <!-- title -->
  <!-- border button -->
  <!-- click to close -->
  <!-- update list -->
  <div class="lg:flex fixed top-0 overflow-auto backdrop-blur-md hidden" @click="closeTiddler">
    <TransitionGroup>
      <button v-for="item in data" class="bg-gray-100 p-2 hover:bg-gray-300 transition-all group rounded-none shrink-0"
        @click="closeTiddler('untitled')" :key="item" :data-id="item">
        {{item}}
        <span class="opacity-0 group-hover:opacity-100">x</span>
      </button>
    </TransitionGroup>
  </div>
</template>