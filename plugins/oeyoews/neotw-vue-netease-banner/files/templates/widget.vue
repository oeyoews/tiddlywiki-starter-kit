<template>
  <div v-if="loading"> Netease Banners Is Loading ... </div>
 <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="banners" ref="netease">
  <TransitionGroup>
  <img :data-src="banner.src" alt="" class="object-cover w-full h-full spotlight rounded-md group-hover:scale-105 transition-all duration-800 ease-in-out shadow-md cursor-pointer" v-for="banner in banners" :key="banner.src">
  </TransitionGroup>
 </div>
</template>
