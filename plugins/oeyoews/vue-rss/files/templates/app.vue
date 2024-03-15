<template>
  <div class="bg-rose-500" v-if="isSafari">Rss plugin not supported your browser.</div>

  <div class="bg-rose-600" v-if="!loading && error.length > 0">[{{ rss }}]: {{error}}</div>
  <div v-if="loading"> loading ...</div>
  <template v-else>
    <!-- info -->
    <div
      class="p-2 rounded border-solid border my-4 text-sm dark:bg-[#2d333b] hover:shadow-sm bg-transparent border-[#d0d7de] dark:border-[#444c56] hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56]"
      v-if="error.length === 0">
      <h2> {{ channel.title }}</h2>
      <table>
        <tr>
          <td>
            Updated
          </td>
          <td>
            {{ channel.update }}
          </td>
        </tr>
        <tr>
          <td>
            Link
          </td>
          <td>
            <a :href="channel.link" target="_blank">
              {{channel.link}}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            Description
          </td>
          <td>
            {{ channel.description }}
          </td>
        </tr>
      </table>
    </div>
    <!-- list -->
    <div>
      <article v-for="(item, index) in paginatedItems" :key="item"
        class="p-2 rounded border-solid border my-4 flex flex-col justify-between text-base dark:bg-[#2d333b] hover:shadow-sm bg-transparent border-[#d0d7de] dark:border-[#444c56] hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56]">
        <h2 class="mb-2 text-base"> {{ order + index }}. {{item.title}}</h2>
        <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <a :href="item.link" target="_blank">
            Link
          </a>
          <div v-if="item.update">{{item.update}}</div>
        </div>
        <details>
          <summary class="rounded p-1 cursor-pointer bg-gray-100 dark:bg-gray-700/80 text-sm mb-2">More</summary>
          <p v-html="item.summary"
            class="p-2 rounded border-solid border my-4 flex flex-col justify-between text-base dark:bg-[#2d333b] hover:shadow-sm bg-transparent border-[#d0d7de] dark:border-[#444c56] hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56]" />
        </details>
      </article>
      <div class="flex justify-center items-center gap-2" v-if="pages > 1">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mx-2"
          @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          :class="{ 'cursor-not-allowed': currentPage === 1 }">Previous</button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mx-2"
          @click="changePage(currentPage + 1)" :disabled="currentPage >= pages"
          :class="{ 'cursor-not-allowed': currentPage >= pages }">Next</button>
        <div>
          {{ currentPage }} / {{ pages}}
        </div>
      </div>
  </template>
  </div>
</template>