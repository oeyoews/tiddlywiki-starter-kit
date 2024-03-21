module.exports = {
  name: 'Paginator',
  props: {
    pages: {
      type: Number,
      required: true
    },
    currentPage: Number
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.pages) {
        this.$emit('next', page);
      }
    }
  },
  template: `<div class="flex justify-center items-center gap-2" v-if="pages > 1">
        <button class="size-8"
          @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          :class="{ 'cursor-not-allowed': currentPage === 1 }">
<svg xmlns="http://www.w3.org/2000/svg" width="1.78em" height="1em" viewBox="0 0 16 9"><path fill="currentColor" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"/><path fill="currentColor" d="M6 8.5a.47.47 0 0 1-.35-.15l-3.5-3.5c-.2-.2-.2-.51 0-.71L5.65.65c.2-.2.51-.2.71 0c.2.2.2.51 0 .71L3.21 4.51l3.15 3.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"/></svg>
          </button>
        <div>
          {{ currentPage }} / {{ pages}}
        </div>
        <button class="size-8"
          @click="changePage(currentPage + 1)" :disabled="currentPage >= pages"
          :class="{ 'cursor-not-allowed': currentPage >= pages }">
<svg xmlns="http://www.w3.org/2000/svg" width="1.78em" height="1em" viewBox="0 0 16 9"><path fill="currentColor" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"/><path fill="currentColor" d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71c.2-.2.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"/></svg>
          </button>
      </div>`
};
