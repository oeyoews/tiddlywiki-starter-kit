<template>
  <div class="fixed top-0 left-0 z-[1] backdrop-blur-md w-full hidden md:block">
    <!-- operations -->
    <div class="flex item-center">
      <div @click="closeAll" title="close all tiddlers"
        class="bg-gray-100 dark:bg-dimmed-700 p-1 hover:bg-gray-300 dark:hover:bg-dimmed-800 transition-all group rounded-none shrink-0 cursor-pointer flex items-center gap-1">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z">
          </path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"></path>
        </svg>
      </div>
      <div @click="reverseList"
        class="bg-gray-100 dark:bg-gray-600 p-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all group rounded-none shrink-0 cursor-pointer flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
          <path fill="currentColor"
            d="M384 96a32 32 0 0 1 64 0v786.752a32 32 0 0 1-54.592 22.656L95.936 608a32 32 0 0 1 0-45.312h.128a32 32 0 0 1 45.184 0L384 805.632zm192 45.248a32 32 0 0 1 54.592-22.592L928.064 416a32 32 0 0 1 0 45.312h-.128a32 32 0 0 1-45.184 0L640 218.496V928a32 32 0 1 1-64 0z" />
        </svg>
      </div>
      <!-- random -->
      <div @click="shuffleData" v-if="false" ref="dice"
        class="bg-gray-100 dark:bg-gray-600 p-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all group rounded-none shrink-0 cursor-pointer flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M218.4 24.72c-14.2 0-30.5 3.56-49.5 11.88c77.2 8.6 65.9 91.4 14.1 106.2c-65.4 18.7-131.31-23.7-98.34-99.2c-39.67 18.95-42.17 80.8-12.93 111.5C141.3 227.9 56.9 279 37.25 200.7C-1.929 326.2 60.34 489.5 258.7 489.5c250.7 0 282-374.7 129.2-415.04c26.5 43.04-13.1 70.94-24.9 73.14c-51.3 9.9-58.1-122.89-144.6-122.88m37.5 118.08c4.5 0 9.4 1.1 12.8 2.9l115.9 67.1c7.4 4.1 7.4 10.9 0 15.2l-115.9 66.9c-7.2 4.3-18.5 4.3-25.7 0L126.8 228c-7.3-4.3-7.3-11.1 0-15.2L243 145.7c3.4-1.8 7.9-2.9 12.9-2.9m-89 62.6c-21.6-.4-33.1 15-18.2 24.3c9.6 4.8 23.7 4.4 32.7-.8c8.8-5.3 9.5-13.7 1.5-19.4c-4.3-2.5-10-4-16-4.1m178.6.1c-20.8.4-31.3 15.5-16.3 24.5c9.6 4.9 23.9 4.6 33-.7c8.9-5.3 9.5-13.9 1.2-19.6c-4.2-2.4-9.9-4-15.9-4.2zm-89 0c-6.6-.1-13 1.5-17.7 4.2c-10.2 5.6-10.4 15.1-.6 20.9c9.9 5.8 25.8 5.6 35.1-.6c15-9 4.6-24.3-16.8-24.5m-141 41c1.5.1 3.4.5 5.6 1.6l111.5 64.5c7.2 4.1 12.9 14.2 12.9 22.5v119.7c0 8.3-5.7 11.7-12.9 7.6L121.2 398c-7.4-4.3-13.2-14.2-13.2-22.6V255.7c0-6.2 3-9.2 7.5-9.2m281.3 0c4.2 0 7.2 3 7.2 9.2v119.7c0 8.4-6 18.3-13 22.6l-111.5 64.4c-7.2 4.1-12.9.7-12.9-7.6V335.1c0-8.3 5.7-18.4 12.9-22.5L391 248.1c2.1-1.1 4.2-1.5 5.8-1.6m-185 65.5h-1.1c-5.3.4-8.5 4.8-8.5 11.6c-.6 10.4 7.2 24.1 16.9 29.8c9.8 5.6 17.6 1.1 17.2-9.9c.2-14.2-13.3-31.1-24.5-31.5m130.9 21.8c-11.2.1-24.8 17.2-24.7 31.4c.1 10.4 7.7 14.4 17.2 8.9c9.4-5.5 17-18.3 17.1-28.8c0-6.7-3.3-11.1-8.5-11.5zm-216.9 22.5c-5.4.3-8.7 4.7-8.7 11.6c-.5 10.5 7.3 24.1 17 29.8c9.8 5.5 17.6 1 17.2-10.1c0-14.5-14.1-31.8-25.5-31.3" />
        </svg>
      </div>
      <div class="relative" v-if="false">
        <div class="absolute h-full w-1 bg-black right-0">
        </div>
      </div>
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
          <div
            class="bg-gray-100 dark:bg-gray-600 p-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all group rounded-none shrink-0 cursor-pointer flex items-center gap-1"
            :class="{ 'bg-gray-300 dark:bg-gray-800': item === activeTiddler }" :data-nav-title="item" :key="item"
            v-for="(item, index) in data">
            <!-- <div ref="scroll" v-if="activeTiddler === item"></div> -->
            <sup>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="m12 0l10.23 6v12L12 24L1.77 18V6zm3.961 17.889l.154-.02c.113-.043.22-.081.288-.19c.227-.329-.357-.462-.566-.827c-.209-.364-1.071-2.364-.418-2.924s1.359-.79 1.629-1.315c.117-.236.238-.475.269-.742c.159.132.283.255.497.262c.567.036 1.054-.658 1.307-1.315c.135-.404.244-.832.218-1.226c-.069-.76.013-1.582.62-2.087c-.599.302-1.167.69-1.845.789c-.374-.114-.75-.216-1.147-.2c-.194-.253-.456-.727-.797-.782c-.58.208-.597 1.105-.842 2.321a5.351 5.351 0 0 0-1.154-.193c-.54-.035-1.42.134-2.038.116c-.619-.018-1.836-.562-2.849-.445c-.407.05-.817.12-1.195.291c-.231.105-.565.421-.733.468c-1.69.473-4.442.453-3.879-2.102c.044-.196.056-.373-.03-.417c-.11-.055-.17.06-.234.187c-.985 2.138.764 3.514 2.752 3.52c.625-.048.324-.007.904-.118l-.015.082a1.87 1.87 0 0 0 .865 1.718c-.27.771-.805 1.389-1.173 2.097c.138.881 1.031 2.057 1.4 2.225c.326.147 1.036.149 1.2-.089c.059-.111.02-.351-.044-.474c.277.308.651.736 1.013.942c.217.104.434.17.677.18l.31-.016c.154-.033.336-.058.44-.195c.116-.2.007-.756-.476-.796c-.483-.04-.795-.222-1.24-.882c-.365-.638.077-1.517.226-2.145c.765.123 1.535.22 2.31.222c.336-.017.67-.03 1.001-.093c.106.27.402 1.025.404 1.239c.007.601-.219 1.205-.121 1.807c.06.177.005.512.35.526l.388.018l.267-.008c.341.573.637.572 1.307.591m-7.518-1.66l-.063-.056c-.184-.198-.66-.544-.572-.865c.075-.238.213-.457.323-.683l-.004.023c-.02.282-.059.56.032.837c.278.228.663.59.918.837c-.138-.038-.4-.117-.53-.066l-.104-.026z" />
              </svg>
              {{ index }}. </sup>
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