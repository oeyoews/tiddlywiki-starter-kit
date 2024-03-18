<template>
  <div class="fixed inset-x-0 z-[1] backdrop-blur-md w-full hidden md:block" :class="position">

    <!-- edit tiddler -->
    <div class="flex item-center" @contextmenu="onContextMenu($event)">
      <div v-html="icons.setting" :class="btn" @click="showSetup" :title="t('tabs.showLang')">
      </div>
      <Transition>
        <div v-show="setting" :title="t('tabs.changLang')">
          <select v-model="$i18n.locale" class="h-full" @click="toggleLang">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
              <div v-html="icons.lang"></div>
              {{locale}}
            </option>
          </select>
        </div>
      </Transition>
      <VueDraggable v-model="data" @start="onStart" @end="onUpdate" target=".vue-tabs" :scroll="true"
        :disabled="!draggable">
        <TransitionGroup class="flex overflow-auto items-center select-none vue-tabs" @click="closeTiddler"
          type="transition" name="fade" tag="div">
          <div :class="[{ 'bg-gray-300 dark:bg-dimmed-900': item === activeTiddler }, btn]" :data-nav-title="item"
            :data-close-title="item" :key="item" v-for="(item, index) in data">
            <!-- <div ref="scroll" v-if="activeTiddler === item"></div> -->
            <sup>
              <span v-html="icons.tiddlywiki">
              </span>
              {{ index }}. &nbsp;</sup>
            {{ item }}
            <button :title="t('tabs.closeTiddler')"
              class="rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all p-0 m-0"
              :data-close-title="item" v-html="icons.closeTiddler">
            </button>
          </div>
        </TransitionGroup>
      </VueDraggable>
    </div>
  </div>
</template>