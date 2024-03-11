<template>
  <!-- search -->
  <div class="my-2">TSKPL 插件数量: {{ count }}</div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div v-if="loading">loading ...</div>
    <div
      v-for="plugin in data"
      class="flex flex-col justify-between rounded p-2 text-base dark:bg-[#2d333b] hover:shadow-sm bg-transparent border-[#d0d7de] dark:border-[#444c56] border hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56] border-solid overflow-auto"
    >
      <h2>
        <img :src="plugin.icon" class="size-4" alt="" v-if="plugin.icon" />
        {{ plugin.name }}
        <span v-if="!plugin.name">{{ plugin.title.split('/').pop() }}</span>
      </h2>
      <span>{{ plugin.author }}</span>
      <!-- <p class="">{{ readme }}</p> -->
      <!-- <span class="bg-gray-800 rounded-sm">{{ plugin.version }}</span> -->
      <!-- <p v-if="plugin.description">{{ plugin.description }}</p> -->
    </div>
  </div>
</template>
