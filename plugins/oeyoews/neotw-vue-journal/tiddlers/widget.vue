<template>
  <div @click="gotoTiddler">
    <blockquote
      v-for="journal in journals"
      class="mt-4 md:mt-8 mb-1 px-2 rounded border-l-[3px] mx-0 py-2"
    >
      <h2 :data-title="journal" class="cursor-pointer">{{ journal }}</h2>
      <p v-html="renderTiddler(journal)"></p>
    </blockquote>
  </div>
</template>
