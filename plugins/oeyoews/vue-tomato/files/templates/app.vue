<template>
  <div class="text-4xl font-bold">{{ minutes }}:{{ seconds }}</div>
  <div class="mt-4 flex gap-2">
    <Button @click="startTimer" :disabled="isRunning">开始</Button>
    <Button @click="pauseTimer" :disabled="!isRunning">暂停</Button>
    <Button @click="resetTimer" :disabled="!isRunning">重置</Button>
    <Button @click="adjustTime(-5)">-5</Button>
    <Button @click="adjustTime(-1)">-1</Button>
    <Button @click="adjustTime(1)">+1</Button>
    <Button @click="adjustTime(5)">+5</Button>
  </div>
</template>