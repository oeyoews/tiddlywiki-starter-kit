<template>
  <div class="gap-4 flex flex-col" v-if="!text">
    <div class="bg-gray-200 h-12 rounded animate-pulse"></div>
    <div class="bg-gray-200 h-8 w-2/3 rounded animate-pulse"></div>
    <div class="bg-gray-200 h-6 w-3/4 rounded animate-pulse"></div>
  </div>
  <div v-else v-html="text"></div>
</template>
