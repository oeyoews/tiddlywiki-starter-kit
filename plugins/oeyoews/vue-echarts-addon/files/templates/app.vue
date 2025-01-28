<template>
  <div class="overflow-hidden h-16 fixed left-0 top-0">
    <ul ref="newsList" class="list-none p-0 w-96">
      <li v-for="(item, index) in newsItems" :key="index" class="py-2 border border-dimmed-200 bg-dimmed-200"
        v-html="item">
      </li>
    </ul>
  </div>
</template>