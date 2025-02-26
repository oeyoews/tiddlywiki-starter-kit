<template>
  <div class="scroll-container">
    <transition name="scroll" mode="out-in">
      <div v-if="currentTitle" :key="currentTitle" class="title-item" @click="goToTiddler(currentTitle)">
        {{ currentTitle.slice(0, 50) }}
      </div>
    </transition>
  </div>
</template>