/*\
title: $:/plugins/oeyoews/neotw-vue-netease-banner/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = () => {
  const component = {
    setup() {
      const banners = ref([]);
      const loading = ref(true);

      return { banners, loading };
    },

    async mounted() {
      await this.getbanners();
    },

    methods: {
      async getbanners() {
        try {
          const api = 'https://react-music-api-coral.vercel.app/api/banner';
          const res = await fetch(api);
          const data = await res.json();
          const { banners } = data.body;
          this.banners = banners
            .map((banner) => ({ src: banner.pic }))
            .slice(0, 8);
          console.log(this.banners);
          this.loading = false;
        } catch (e) {
          console.error(e);
        }
      }
    },

    template: getTemplate(
      '$:/plugins/oeyoews/neotw-vue-netease-banner/templates/widget.vue'
    )
  };
  return component;
};

module.exports = app;
