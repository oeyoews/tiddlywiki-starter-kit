<template>
  <div>
    <div v-if="loading"> loading ...</div>
    <article v-for="(item, index) in rssItems" :key="item"
      class="p-2 rounded border-solid border my-2 flex flex-col justify-between text-base dark:bg-[#2d333b] hover:shadow-sm bg-transparent border-[#d0d7de] dark:border-[#444c56] hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56]">
      <h2> {{index+1}}. {{item.title}}</h2>
      <small>
        <a :href="item.link">{{item.link}}</a>

        <div>{{item.update}}</div>
      </small>
      <details>
        <!-- <summary v-html="item.summary"></summary> -->
        <p v-html="item.summary" />
      </details>
    </article>
  </div>
</template>