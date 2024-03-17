/*\
title: $:/plugins/oeyoews/vue-tabs/app.js
type: application/javascript
module-type: library

\*/

const { watchEffect, ref, computed } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const DEFAULT_STORY_TITLE = '$:/StoryList';

const app = () => {
  const component = {
    setup() {
      const data = ref('');
      const activeTiddler = ref('');
      const isRender = ref(false);
      const dragging = ref(false);

      watchEffect(() => {
        if (data.value.length > 2) {
          isRender.value = true;
        } else {
          isRender.value = false;
        }
      });

      // const filterData = computed(() =>
      //   data.value.filter((item) => !item.startsWith('Draft of'))
      // );

      return {
        dragging,
        activeTiddler,
        // filterData,
        data,
        isRender
      };
    },

    watch: {
      data: {
        handler() {
          console.log('data changed');
          this.setList();
        },
        deep: true
      }
    },
    mounted() {
      this.updateData();
      setInterval(() => {
        if (this.dragging) {
          return;
        }

        this.activeTiddler = this.getCurrentTiddler();
        // const scroll = this.$refs.scroll?.[0];

        // if (!this.isInViewport(scroll) && scroll) {
        //   scroll.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'center'
        //   });
        // }

        const data = this.getList();
        if (data.length !== this.data.length) {
          this.data = data;
        }
      }, 1000);
    },

    methods: {
      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },

      setList() {
        $tw.wiki.addTiddler({
          title: DEFAULT_STORY_TITLE,
          text: '',
          list: $tw.utils.stringifyList(this.data)
        });
      },

      getList() {
        return $tw.wiki.getTiddlerList(DEFAULT_STORY_TITLE);
        // .filter((item) => !item.startsWith('Draft of'));
      },

      shuffleData() {
        this.data = this.shuffle(this.data);
        this.setList();
      },

      updateData() {
        this.data = this.getList();
      },

      reverse() {
        this.data.reverse();
        this.setList();
      },

      onStart() {
        this.dragging = true;
        console.log(this.data);
      },

      onUpdate() {
        this.dragging = false;
        console.log(this.data);
      },

      isInViewport(element) {
        if (!element) return;
        var rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      },

      getCurrentTiddler() {
        const history = $tw.wiki.getTiddlerData('$:/HistoryList');
        if (!history || history.length === 0) {
          return;
        }
        return history.pop().title;
      },

      closeRight() {},
      closeAll() {
        this.data = [];
      },

      closeTiddler(e) {
        if (e.target.dataset.navTitle) {
          new $tw.Story().navigateTiddler(e.target.dataset.navTitle);
          this.activeTiddler = e.target.dataset.navTitle;
          return;
        }
        const title = e.target.parentNode?.dataset.closeTitle;
        if (!title) return;
        this.data = this.data.filter((item) => item !== title);
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-tabs/templates/app.vue')
  };
  return component;
};

module.exports = app;
