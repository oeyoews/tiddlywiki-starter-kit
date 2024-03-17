/*\
title: $:/plugins/oeyoews/vue-tabs/app.js
type: application/javascript
module-type: library

\*/
const { computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const DEFAULT_STORY_TITLE = '$:/StoryList';

const app = () => {
  const component = {
    setup() {
      const data = ref($tw.wiki.getTiddlerList(DEFAULT_STORY_TITLE));
      const activeTiddler = ref('');
      const dragging = ref(false);

      // const filterData = computed(() => {
      //   return data.value.filter((item) => !item.startsWith('Draft of'));
      // });

      return {
        // filterData,
        dragging,
        activeTiddler,
        data
      };
    },

    watch: {
      data: {
        handler: function (newValue, oldValue) {
          this.setList();

          /** autofocus */
          //   const scroll = this.$refs.scroll?.[0];
          //   if (!this.isInViewport(scroll) && scroll) {
          //     scroll.scrollIntoView({
          //       behavior: 'smooth',
          //       block: 'center'
          //     });
          //   }
        },
        deep: true
      }
    },

    mounted() {
      setInterval(() => {
        if (this.dragging) {
          return;
        }

        this.activeTiddler = this.getCurrentTiddler();

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

      getList() {
        return $tw.wiki.getTiddlerList(DEFAULT_STORY_TITLE);
      },

      setList() {
        $tw.wiki.addTiddler({
          title: DEFAULT_STORY_TITLE,
          text: '',
          list: $tw.utils.stringifyList(this.data)
        });
      },

      shuffleData() {
        this.data = this.shuffle(this.data);
      },

      closeAll() {
        this.data = [];
      },

      reverseList() {
        this.data.reverse();
      },

      onStart() {
        this.dragging = true;
      },

      onUpdate() {
        this.dragging = false;
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
