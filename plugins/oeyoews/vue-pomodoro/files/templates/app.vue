<template>
  <!-- <div class="flex">
    <Transition name="slide-up">
      <div :key="MINUTES" class="text-2xl font-bold">
        {{ MINUTES }}:
      </div>
    </Transition>
    <Transition name="slide-up">
      <div :key="SECONDS" class="text-2xl font-bold">
        {{ SECONDS }}
      </div>
    </Transition>
  </div> -->
  <div class="text-2xl ml-2 font-bold">{{ MINUTES }}:{{ SECONDS }}</div>
  <div class="mt-4 flex gap-2">
    <!-- start -->
    <Button @click="startTimer" :disabled="isRunning" v-show="!isRunning" class="size-8">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M9 6L9 18L7 18L7 6z">
            <animate fill="freeze" attributeName="d" dur="0.6s" keyTimes="0;0.66;1"
              values="M9 18L7 18L7 6L9 6L9 18;M13 15L8 18L8 6L13 9L13 15;M13 15L8 18L8 6L13 9L13 9" />
            <set attributeName="opacity" begin="0.6s" to="0" />
          </path>
          <path d="M15 6L17 6L17 18L15 18L15 6">
            <animate fill="freeze" attributeName="d" dur="0.6s" keyTimes="0;0.66;1"
              values="M15 6L17 6L17 18L15 18L15 6;M13 9L18 12L18 12L13 15L13 9;M13 9L18 12L18 12L13 15L13 15" />
            <set attributeName="opacity" begin="0.6s" to="0" />
          </path>
          <path d="M8 6L18 12L8 18z" opacity="0">
            <set attributeName="opacity" begin="0.6s" to="1" />
          </path>
        </g>
      </svg>
    </Button>
    <!-- stop -->
    <Button @click="pauseTimer" :disabled="!isRunning" v-show="isRunning" class="size-8">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M13 15L8 18L8 6L13 9L13 9">
            <animate fill="freeze" attributeName="d" dur="0.6s" keyTimes="0;0.33;1"
              values="M13 15L8 18L8 6L13 9L13 9;M13 15L8 18L8 6L13 9L13 15;M9 18L7 18L7 6L9 6L9 18" />
          </path>
          <path d="M13 9L18 12L18 12L13 15L13 15">
            <animate fill="freeze" attributeName="d" dur="0.6s" keyTimes="0;0.33;1"
              values="M13 9L18 12L18 12L13 15L13 15;M13 9L18 12L18 12L13 15L13 9;M15 6L17 6L17 18L15 18L15 6" />
          </path>
        </g>
      </svg>
    </Button>
    <!-- reset -->
    <Button @click="resetTimer" :disabled="!isRunning" class="size-8">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3s-3 1.331-3 3s1.329 3 3 3" />
        <path fill="currentColor"
          d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219a9.053 9.053 0 0 0-2.43-2.43a8.95 8.95 0 0 0-3.219-1.355a9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053a7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725a7.11 7.11 0 0 1-.644 1.188a7.2 7.2 0 0 1-.858 1.039a7.028 7.028 0 0 1-3.536 1.907a7.13 7.13 0 0 1-2.822 0a6.961 6.961 0 0 1-2.503-1.054a7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034a9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183a9.014 9.014 0 0 0 3.218-1.355a8.886 8.886 0 0 0 1.331-1.099a9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814" />
      </svg>
    </Button>
    <!-- <div v-show="!isRunning" >
      <Button @click="adjustTime(-5)">- 5</Button>
      <Button @click="adjustTime(-1)">- 1</Button>
      <Button @click="adjustTime(1)">+ 1</Button>
      <Button @click="adjustTime(5)">+ 5</Button>
    </div> -->
  </div>
</template>