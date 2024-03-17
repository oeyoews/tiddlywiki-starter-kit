<template>
  <div class="fixed inset-x-0 z-[1] backdrop-blur-md w-full hidden md:block" :class="position">
    <!-- operations -->
    <div class="flex item-center">
      <div @click="closeAll" title="close all tiddlers" :class="btn">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z">
          </path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"></path>
        </svg>
      </div>
      <div @click="reverseList" :class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
          <path fill="currentColor"
            d="M384 96a32 32 0 0 1 64 0v786.752a32 32 0 0 1-54.592 22.656L95.936 608a32 32 0 0 1 0-45.312h.128a32 32 0 0 1 45.184 0L384 805.632zm192 45.248a32 32 0 0 1 54.592-22.592L928.064 416a32 32 0 0 1 0 45.312h-.128a32 32 0 0 1-45.184 0L640 218.496V928a32 32 0 1 1-64 0z" />
        </svg>
      </div>
      <!-- random -->
      <div @click="shuffleData" v-if="false" ref="dice" :class="btn" v-html="icons.dice">
      </div>
      <!-- <div class="relative" v-if="false">
        <div class="absolute h-full w-1 bg-black right-0">
        </div>
      </div> -->
      <!-- list -->
      <!-- ghostClass: 'text-green-300',
        chosenClass: 'bg-green-300', -->
      <VueDraggable v-model="data" @start="onStart" @end="onUpdate" target=".vue-tabs" :scroll="true">
        <!--
         v-draggable="[data,
          {
            animation: 150, onUpdate, onStart
          }
        ]" -->
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