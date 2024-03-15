<template>
  <!-- TODO: 分页 -->
  <h2>{{ channel.title }}</h2>
  <a :href="channel.link" target="_blank">
    {{ channel.link }}
  </a>
  <p>{{ channel.description }}</p>
  <div>
    <div v-if="loading"> loading ...</div>
    <article v-for="(item, index) in rssItems" :key="item"
      class="p-2 rounded border-solid border my-4 flex flex-col justify-between text-base dark:bg-[#2d333b] hover:shadow-sm bg-transparent border-[#d0d7de] dark:border-[#444c56] hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56]">
      <h2 class="mb-2"> {{index+1}}. {{item.title}}</h2>
      <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
        <a :href="item.link" target="_blank">
          Link
        </a>
        <div v-if="item.update">{{item.update}}</div>
      </div>
      <details>
        <summary class="rounded p-1 cursor-pointer bg-gray-100 dark:bg-gray-700/80">More</summary>
        <p v-html="item.summary"
          class="p-2 rounded border-solid border my-4 flex flex-col justify-between text-base dark:bg-[#2d333b] hover:shadow-sm bg-transparent border-[#d0d7de] dark:border-[#444c56] hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56]" />
      </details>
    </article>
  </div>
</template>