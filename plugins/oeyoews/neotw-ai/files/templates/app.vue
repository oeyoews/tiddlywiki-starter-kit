<template>
  <!-- <button @click="aibot"> </button> -->
  <div
    class="gap-2 border-solid border p-4 rounded border-dimmed-200 dark:border-dimmed-700 dark:bg-dimmed-800 text-black dark:text-white mb-4 text-sm antialiased prose prose-gray max-w-none dark:prose-invert prose-p:my-0">
    <div class="font-bold flex items-center">
      <div class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48"
          :class="{ 'animate-spin': isLoading}">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M24 2.5C24 14.374 14.374 24 2.5 24M24 45.5C24 33.626 14.374 24 2.5 24M24 2.5C24 14.374 33.626 24 45.5 24M24 45.5C24 33.626 33.626 24 45.5 24" />
        </svg>
      </div>
      <div class="ml-2" @click="aibot">
        {{ header }}
      </div>
      <span @click="regenerate" class="cursor-pointer" tooltip="重新生成" v-if="!isLoading">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mt-1.5 ml-1" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M11.48 0h2.44l2.8 4l-2.8 4h-2.44l2.1-3H12a7 7 0 1 0 5.563 2.75l1.235-1.648A9 9 0 1 1 12 3h1.58z" />
        </svg>
      </span>
    </div>
    <div v-if="isLoading">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <circle cx="18" cy="12" r="0" fill="black">
          <animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
        </circle>
        <circle cx="12" cy="12" r="0" fill="black">
          <animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
        </circle>
        <circle cx="6" cy="12" r="0" fill="black">
          <animate attributeName="r" begin="0" calcMode="spline" dur="1.5s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
        </circle>
      </svg>
    </div>
    <div class="mt-2 indent-4" v-html="resHTML" v-else />
  </div>
</template>