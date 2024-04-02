/*\
title: $:/plugins/oeyoews/neotw-vue-plugins/component.js
type: application/javascript
module-type: library

\*/

const { computed, watch, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = (
  url = 'https://tiddlywiki-starter-kit.oeyoews.top/library/recipes/library/tiddlers.json',
) => {
  const component = {
    setup() {
      const data = ref([]);
      const loading = ref(true);
      const count = ref(0);
      const pageSize = ref(30);
      const currentPage = ref(1);

      const searchTerms = ref('');
      const filterByTerm = computed(() => {
        return data.value.filter((item) =>
          item.title.toLowerCase().includes(searchTerms.value.toLowerCase()),
        );
      });

      const paginatedData = computed(() => {
        const startIndex = (currentPage.value - 1) * pageSize.value;
        return filterByTerm.value.slice(
          startIndex,
          startIndex + pageSize.value,
        );
        // .filter((item) => item.title.includes(searchTerms.value));
      });

      const pages = computed(() => {
        return Math.ceil(filterByTerm.value.length / pageSize.value);
      });

      return {
        pages,
        currentPage,
        paginatedData,
        data,
        loading,
        count,
        url,
        searchTerms,
        filterByTerm,
      };
    },

    async mounted() {
      this.data = await this.getPlugins(url);
    },

    methods: {
      async getPlugins(url) {
        try {
          const res = await fetch(url);

          const data = await res.json();
          const size = new TextEncoder().encode(data).length;
          console.log(size / 100, 'kb');
          this.loading = false;
          this.count = data.length;
          return data;
        } catch (e) {
          console.error(e.message);
          this.loading = false;
        }
      },
      nextPage(event) {
        const value = event.target.getAttribute('data-id');
        if (value) {
          this.currentPage = value;
        }
      },
    },

    template: getTemplate('$:/plugins/oeyoews/neotw-vue-plugins/widget.vue'),
  };
  return component;
};

module.exports = app;
