<template>
  <div class="fixed inset-x-0 z-[1] backdrop-blur-md w-full hidden md:block" :class="position">
    <!-- operations -->
    <div class="flex item-center">
      <div @click="closeAll" title="close all tiddlers" :class="btn" v-html="icons.close">
      </div>
      <div @click="reverseList" :class="btn" v-html="icons.reverse"></div>
      <!-- random -->
      <!-- <div @click="shuffleData" v-if="false" ref="dice" :class="btn" v-html="icons.dice">
      </div> -->
      <VueDraggable v-model="data" @start="onStart" @end="onUpdate" target=".vue-tabs" :scroll="true">
        <TransitionGroup class="flex overflow-auto items-center select-none vue-tabs" @click="closeTiddler"
          type="transition" name="fade" tag="div">
          <div :class="[{ 'bg-gray-300 dark:bg-dimmed-900': item === activeTiddler }, btn]" :data-nav-title="item"
            :key="item" v-for="(item, index) in data">
            <!-- <div ref="scroll" v-if="activeTiddler === item"></div> -->
            <sup>
              <span v-html="icons.tiddlywiki">
              </span>
              {{ index }}. &nbsp;</sup>
            {{ item }}
            <button title="close tiddler"
              class="rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all p-0 m-0"
              :data-close-title="item">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
              </svg>
            </button>
          </div>
        </TransitionGroup>
      </VueDraggable>
    </div>
  </div>
</template>