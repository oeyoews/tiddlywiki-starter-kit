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
      onContextMenu(e) {
        e.preventDefault(); //prevent the browser's default menu
        //show menu
        this.$contextmenu({
          items: [
            {
              label: this.t('close.current'),
              onClick: () => this.closeTiddler(e, 'close')
            },
            {
              label: this.t('close.others'),
              onClick: () => this.closeTiddler(e, 'closeOthers')
            },
            {
              label: this.t('close.all'),
              onClick: () => this.closeTiddler(e, 'closeAll')
            },
            {
              label: this.t('close.copy'),
              onClick: () => {
                const title = e.target.dataset.navTitle;
                window.navigator.clipboard?.writeText(title);
              }
            },
            {
              label: this.t('close.right'),
              onClick: () => this.closeTiddler(e, 'closeRight')
            },
            {
              label: this.t('close.left'),
              onClick: () => this.closeTiddler(e, 'closeLeft')
            }
            // {
            //   label: 'Pin',
            // },
            // {
            //   label: 'More',
            //   children: [
            //     {
            //       label: 'Back',
            //       onClick: () => {
            //         console.log('You click Back');
            //       }
            //     },
            //     { label: 'Forward', disabled: true },
            //     {
            //       label: 'Reload',
            //       divided: true,
            //       icon: 'icon-reload-1',
            //       onClick: () => {
            //         alert('You click Reload');
            //       }
            //     },
            //     {
            //       label: 'Save as...',
            //       icon: 'icon-save',
            //       onClick: () => {
            //         alert('You click Save as');
            //       }
            //     },
            //     {
            //       label: 'Print...',
            //       icon: 'icon-print',
            //       onClick: () => {
            //         alert('You click Print');
            //       }
            //     },
            //     { label: 'View source', icon: 'icon-terminal' },
            //     { label: 'Inspect' }
            //   ]
            // }
          ],
          iconFontClass: 'iconfont',
          customClass: 'class-a',
          zIndex: 3,
          minWidth: 230,
          x: e.x,
          y: e.y
        });
      },
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

      closeTiddler(e, type) {
        let closeTitle = e.target.dataset.closeTitle;
        const navTitle = e.target.dataset.navTitle;
        const index = this.data.findIndex((item) => item === closeTitle);

        switch (type) {
          case 'close':
            this.data = this.data.filter((item) => item !== closeTitle);
            break;
          case 'closeAll':
            this.closeAll();
            break;
          case 'closeOthers':
            this.data = this.data.filter((item) => item === closeTitle);
            break;
          case 'closeRight':
            this.data.splice(index + 1, this.data.length - index);
            break;
          case 'closeLeft':
            this.data.splice(0, index);
            break;
          default:
            break;
        }

        if (type) {
          return;
        }

        if (navTitle) {
          new $tw.Story().navigateTiddler(navTitle);
          this.activeTiddler = navTitle;
          return;
        }
        if (!closeTitle) {
          closeTitle = e.target.parentNode?.dataset.closeTitle;
        }
        if (!closeTitle) return;
        this.data = this.data.filter((item) => item !== closeTitle);
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-tabs/templates/app.vue')
  };
  return component;
};

module.exports = app;
