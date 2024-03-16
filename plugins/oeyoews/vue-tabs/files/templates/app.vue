<template>
  <div v-show="isRender">
    <div class="flex fixed top-0 overflow-auto backdrop-blur-md w-full items-center" @click.prevent="closeTiddler">
      <TransitionGroup>
        <span v-for="(item, index) in data"
          class="bg-gray-100 dark:bg-gray-600 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all group rounded-none shrink-0 cursor-pointer flex items-center gap-1"
          :class="{ 'bg-gray-300 dark:bg-gray-800': item === activeTiddler }" :data-nav-title="item" :key="item">
          <!-- <div ref="scroll" v-if="activeTiddler === item"></div> -->
          <sup>{{index}}. </sup>
          {{item}}
          <button title="close tiddler"
            class="rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all p-0 m-0"
            :data-close-title="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
            </svg>
          </button>
        </span>
      </TransitionGroup>
    </div>
  </div>
</template>