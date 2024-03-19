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
    <div v-for="(item, index) in paginatedItems" :key="item" class="group" :class="card">

      <!-- title -->
      <h2 class="mb-2 text-base"> {{ order + index }}. {{item.title}}</h2>

      <!-- info -->
      <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
        <img crossorigin="anonymous" :src="item.src" alt="" class="size-8 object-cover rounded-full">
        <a :href="item.link" target="_blank" rel="noreferer noopener">
          Link
        </a>
        <div v-if="item.update">{{item.update}}</div>
        <button @click="open(item)" class="transition-all opacity-0 group-hover:opacity-100">Open</button>
      </div>
    </div>

    <Paginator :currentPage="currentPage" :pages="pages" @next="changePage" />
  </template>
</template>