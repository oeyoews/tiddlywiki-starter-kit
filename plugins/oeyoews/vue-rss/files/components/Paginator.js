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
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mx-2"
          @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          :class="{ 'cursor-not-allowed': currentPage === 1 }">Previous</button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mx-2"
          @click="changePage(currentPage + 1)" :disabled="currentPage >= pages"
          :class="{ 'cursor-not-allowed': currentPage >= pages }">Next</button>
        <div>
          {{ currentPage }} / {{ pages}}
        </div>
      </div>`
};
