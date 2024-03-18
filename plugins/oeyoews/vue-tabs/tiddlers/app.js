/*\
title: $:/plugins/oeyoews/vue-tabs/app.js
type: application/javascript
module-type: library

\*/
const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const DEFAULT_STORY_TITLE = '$:/StoryList';
const configTiddler = '$:/plugins/oeyoews/vue-tabs/config';
const config = $tw.wiki.getTiddler(configTiddler).fields;
const btn =
  'bg-gray-100 dark:bg-dimmed-700 p-1 hover:bg-gray-300 dark:hover:bg-dimmed-800 transition-all group rounded-none shrink-0 cursor-pointer flex items-center';

const icons = require('./icons');

const VueI18n = require('vue-i18n.global.prod.js');

const app = () => {
  const component = {
    setup() {
      const { t } = VueI18n.useI18n();
      const data = ref($tw.wiki.getTiddlerList(DEFAULT_STORY_TITLE));
      const activeTiddler = ref('');
      const dragging = ref(false);
      const position = ref(config.position);
      const setting = ref(false);

      // const filterData = computed(() => {
      //   return data.value.filter((item) => !item.startsWith('Draft of'));
      // });

      return {
        setting,
        t,
        icons,
        btn,
        position,
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
      // update ui list
      setInterval(() => {
        if (this.dragging) {
          return;
        }

        this.activeTiddler = this.getCurrentTiddler();

        const data = this.getList();
        if (data[0]?.startsWith('Draft of')) {
          return;
        }

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
        if (this.data.length > 1) {
          this.data.reverse();
        }
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

      togglePosition() {
        this.position = this.position === 'top-0' ? 'bottom-0' : 'top-0';
        $tw.wiki.setText(configTiddler, 'position', null, this.position, {
          suppressTimestamp: true
        });
        this.showSetup();
      },

      toggleLang() {
        const oldLang = localStorage.getItem('lang');
        const currentLang = this.$i18n.locale;
        if (oldLang !== currentLang) {
          localStorage.setItem('lang', this.$i18n.locale);
          this.showSetup();
        }
      },

      showSetup() {
        this.setting = this.setting ? false : true;
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
