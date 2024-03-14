<template>
  <center>
    <div class="board" tabIndex="1">
      <div v-for="(r_item, r_i) in board.cells" :key="r_i" class="flex">
        <cell v-for="(c_item, c_i) in r_item" :key="c_i"></cell>
      </div>
      <tile-view v-for="(tile, i) in tiles" :tile="tile" :key="i"> </tile-view>
      <game-end-overlay :board="board" :onrestart="onRestart"></game-end-overlay>
      <div>
        <button @click="clean" class="p-1">
          退出
        </button>
      </div>
    </div>
  </center>
</template>