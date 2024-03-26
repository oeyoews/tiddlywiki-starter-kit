<template>
  <button @click="aibot">
  </button>
  <div
    class="gap-2 border-solid border p-4 rounded border-dimmed-200 dark:bg-dimmed-800 text-black dark:text-white mb-4 text-sm antialiased prose prose-gray max-w-none dark:prose-invert prose-p:mt-0">
    <div class="font-bold flex items-center">
      <div class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M24 2.5C24 14.374 14.374 24 2.5 24M24 45.5C24 33.626 14.374 24 2.5 24M24 2.5C24 14.374 33.626 24 45.5 24M24 45.5C24 33.626 33.626 24 45.5 24" />
        </svg>
      </div>
      <div class="ml-2">
        AI 生成的摘要
      </div>
    </div>
    <div class="mt-2 indent-4"> {{ res }} </div>
  </div>
</template>