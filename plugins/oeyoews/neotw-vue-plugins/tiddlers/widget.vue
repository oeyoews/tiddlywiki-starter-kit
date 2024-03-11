<template>
  <div class="my-2">
    <input
      type="text"
      v-model="searchTerms"
      placeholder="搜索插件"
      class="w-full p-4"
      autofocus="'autofocus'"
    />
  </div>
  <div class="my-2 text-sm">插件数量: {{ count }}</div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div v-if="loading">loading ...</div>
    <TransitionGroup>
      <div
        v-for="plugin in paginatedData"
        :key="plugin.title"
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
    </TransitionGroup>
    <!-- <div
      class="flex items-center justify-end text-gray-500 text-sm"
      v-show="paginatedData.length === 0"
    >
      暂无匹配项
    </div> -->
  </div>

  <!-- paginate -->
  <div class="flex gap-2 my-2 items-center justify-end" @click="nextPage">
    <button class="shrink-0 p-2" v-for="page in pages" :data-id="page">
      {{ page }}
    </button>
  </div>
</template>
