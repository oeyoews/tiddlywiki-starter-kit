<template>
  <div class="bg-rose-500" v-if="isSafari">Rss plugin not supported your browser.</div>

  <div class="bg-rose-600" v-if="!loading && error.length > 0">[{{ rss }}]: {{error}}</div>
  <div v-if="loading"> loading ...</div>
  <template v-else>
    <!-- Header -->
    <div :class="card" v-if="error.length === 0">
      <Header :channel="channel" />
    </div>
    <!-- list -->
    <div>
      <article v-for="(item, index) in paginatedItems" :key="item" :class="card">
        <h2 class="mb-2 text-base"> {{ order + index }}. {{item.title}}</h2>
        <div v-html="item.img"></div>
        <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <img :src="item.src" alt="" class="size-8 object-cover rounded-full">
          <a :href="item.link" target="_blank">
            Link
          </a>
          <div v-if="item.update">{{item.update}}</div>
        </div>
        <details>
          <summary class="rounded p-1 cursor-pointer bg-gray-100 dark:bg-gray-700/80 text-sm mb-2">More</summary>
          <p v-html="item.summary" :class="card" />
        </details>
      </article>
      <!-- 分页器 -->
      <Paginator :currentPage="currentPage" :pages="pages" @next="changePage" />
  </template>
  </div>
</template>