<template>
  <div class="hidden md:flex items-center space-x-4 flex-wrap gap-2 justify-center text-sm mb-4 scale-75"
    @click="gotoTiddler">
    <Text v-for="(item, key) in textItems" :key="key" :text="item.text" :color="item.color" :number="item.number"
      :icon="item.icon" :data-title="item.title" />

  </div>
</template>