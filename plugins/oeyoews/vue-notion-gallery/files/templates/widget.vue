<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 m-4" @click="gotoTiddler">
    <div class="flex flex-col items-center justify-center p-0 group relative" v-for="item in data">

      <img src="" alt=""
        class="object-cover w-full h-full rounded-md group-hover:scale-105 transition-all duration-800 ease-in-out shadow-md aspect-video medium-zoom-image cursor-pointer">
    </div>
    <div>
      <h3
        class="delay-100 text-[22px] cursor-pointer flex justify-center items-center truncate m-0 absolute inset-0 backdrop-blur-lg text-black rounded-md ease-in-out transition-all scale-0 group-hover:scale-105">
      </h3>
    </div>
  </div>

</template>
