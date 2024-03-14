/*\
title: $:/plugins/oeyoews/vue-2048/app.js
type: application/javascript
module-type: library

\*/

const { onMounted, onBeforeUnmount, ref, computed } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Cell = require('./components/Cell');
const TileView = require('./components/TileView');
const GameEndOverlay = require('./components/GameEndOverlay');
const Board = require('./lib/Board');

const app = () => {
  const component = {
    setup() {
      const board = ref(new Board());
      const handleKeyDown = (event) => {
        if (board.value.hasWon()) {
          return;
        }
        // TODO: support hjkl
        if (event.keyCode >= 37 && event.keyCode <= 40 && event.ctrlKey) {
          event.preventDefault();
          var direction = event.keyCode - 37;
          board.value.move(direction);
        }
      };
      const onRestart = () => {
        board.value = new Board();
      };
      onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
      });
      onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeyDown);
      });
      const tiles = computed(() => {
        return board.value.tiles.filter((tile) => tile.value != 0);
      });

      const clean = () => {
        window.removeEventListener('keydown', handleKeyDown);
      };

      return {
        clean,
        board,
        onRestart,
        tiles
      };
    },

    methods: {},
    components: {
      Cell,
      TileView,
      GameEndOverlay
    },
    template: getTemplate('$:/plugins/oeyoews/vue-2048/templates/app.vue')
  };
  return component;
};

module.exports = app;
