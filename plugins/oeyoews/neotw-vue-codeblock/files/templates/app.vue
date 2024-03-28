<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <div class="p-2 rounded inline-flex bg-neutral-200 my-2 text-black font-semibold">
    <span ref="codeRef">
      {{ code }}
    </span>
    <button class="right-0 bg-transparent" @click="copyCode">
      <svg xmlns="http://www.w3.org/2000/svg" class="text-black" width="1em" height="1em" viewBox="0 0 256 256">
        <path fill="currentColor"
          d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8m-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
      </svg>
    </button>
  </div>
</template>