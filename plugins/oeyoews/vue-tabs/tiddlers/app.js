/*\
title: $:/plugins/oeyoews/vue-tabs/app.js
type: application/javascript
module-type: library

\*/
const { computed, h, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const DEFAULT_STORY_TITLE = '$:/StoryList';
const configTiddler = '$:/plugins/oeyoews/vue-tabs/config';
const config = $tw.wiki.getTiddler(configTiddler).fields;
const btn =
  'bg-gray-100 dark:bg-dimmed-700 p-1 hover:bg-gray-300 dark:hover:bg-dimmed-800 transition-all group rounded-none shrink-0 cursor-pointer flex items-center';

const icons = require('./icons');

const VueI18n = require('vue-i18n.global.prod.js');
const Icon = require('./components/Icon');

const app = () => {
  const component = {
    setup() {
      const { t } = VueI18n.useI18n();
      const data = ref($tw.wiki.getTiddlerList(DEFAULT_STORY_TITLE));
      const activeTiddler = ref('');
      const dragging = ref(false);
      const setting = ref(false);
      const pined = ref([]);

      const position = ref(config.position);
      const draggable = ref(config.draggable);

      const isDrag = computed(() => draggable.value === 'yes');

      return {
        isDrag,
        draggable,
        pined,
        setting,
        t,
        icons,
        btn,
        position,
        dragging,
        activeTiddler,
        data,
      };
    },

    watch: {
      data: {
        handler: function (newValue, oldValue) {
          this.setList();
        },
        deep: true,
      },
    },

    mounted() {
      setInterval(() => {
        // NOTE: vue 实例似乎会同时创建多个, widget 外面不要使用 list filter
        if (this.dragging) {
          return;
        }

        this.activeTiddler = this.getCurrentTiddler();

        const data = this.getList();
        if (data[0]?.startsWith('Draft of')) {
          return;
        }

        if (data && data.length !== this.data.length) {
          this.data = data;
        }
      }, 1000);
    },

    methods: {
      onContextMenu(e) {
        e.preventDefault(); //prevent the browser's default menu

        const currentLang = this.$i18n.locale;
        const langs = this.$i18n.availableLocales;
        const LangChildren = langs.map((lang) => ({
          label: lang,
          disabled: currentLang === lang ? true : false,
          icon: icons.hasOwnProperty(lang) && h(Icon, { icon: icons[lang] }),
          onClick: () => {
            this.$i18n.locale = lang;
            localStorage.setItem('lang', lang);
          },
        }));

        const children = [
          {
            label: this.t('settings.lang'),
            icon: h(Icon, { icon: icons.lang }),
            children: LangChildren,
          },
          {
            label: this.t('settings.position'),
            icon: h(Icon, { icon: icons.position }),
            onClick: this.togglePosition,
          },
          {
            label:
              this.t('settings.drag') +
              ' ' +
              (this.isDrag ? this.t('status.on') : this.t('status.off')),
            onClick: this.toggleDraggable,
            icon: h(Icon, { icon: icons.drag }),
          },
        ];
        const items = [
          {
            label: this.t('close.current'),
            icon: h(Icon, { icon: icons.close }),
            onClick: () => this.closeTiddler(e, 'close'),
          },
          {
            label: this.t('close.others'),
            disabled: this.data.length === 1,
            onClick: () => this.closeTiddler(e, 'closeOthers'),
            icon: h(Icon, { icon: icons.others }),
          },
          {
            label: this.t('close.left'),
            disabled: this.data.length === 1,
            icon: h(Icon, { icon: icons.left }),
            onClick: () => this.closeTiddler(e, 'closeLeft'),
          },
          {
            label: this.t('close.right'),
            disabled: this.data.length === 1,
            icon: h(Icon, { icon: icons.right }),
            onClick: () => this.closeTiddler(e, 'closeRight'),
          },
          {
            label: this.t('close.all'),
            onClick: () => this.closeTiddler(e, 'closeAll'),
            divided: true,
            icon: h(Icon, { icon: icons.all }),
          },
          {
            label: this.t('close.fold'),
            onClick: () => this.closeTiddler(e, 'fold'),
            icon: h(Icon, { icon: icons.fold }),
          },
          {
            label: this.t('close.copy'),
            icon: h(Icon, { icon: icons.copy }),
            onClick: () => {
              const title = e.target.dataset.navTitle;
              $tw.utils.copyToClipboard(title);
            },
          },
          {
            label: this.t('tabs.reverse'),
            disabled: this.data.length === 1,
            icon: h(Icon, { icon: icons.reverse }),
            onClick: () => this.reverseList(),
          },
          {
            label: this.t('tabs.pin'),
            icon: h(Icon, { icon: icons.pin }),
            disabled: true,
            divided: true,
            onClick: () => this.closeTiddler(e, 'pin'),
          },
          {
            label: this.t('tabs.more'),
            icon: h(Icon, { icon: icons.setting }),
            children,
          },
          {
            label: this.t('tabs.help'),
            icon: h(Icon, { icon: icons.help }),
            children: [
              {
                label: this.t('help.readme'),
                icon: h(Icon, { icon: icons.readme }),
                onClick: () => {
                  new $tw.Story().navigateTiddler(
                    '$:/plugins/oeyoews/vue-tabs',
                  );
                },
              },
              {
                label: this.t('help.issues'),
                icon: h(Icon, { icon: icons.github }),
                onClick: () => {
                  window.open(
                    'https://github.com/oeyoews/tiddlywiki-starter-kit/issues/new',
                    '_blank',
                  );
                },
              },
            ],
          },
        ];
        //show menu
        this.$contextmenu({
          items,
          // iconFontClass: 'iconfont',
          customClass: 'rounded-md',
          zIndex: 3,
          minWidth: 230,
          x: e.x,
          y: e.y,
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
          list: $tw.utils.stringifyList(this.data),
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

      toggleDraggable() {
        this.draggable = this.draggable === 'yes' ? 'no' : 'yes';
        $tw.wiki.setText(configTiddler, 'draggable', null, this.draggable, {
          suppressTimestamp: true,
        });
      },

      togglePosition() {
        this.position = this.position === 'top-0' ? 'bottom-0' : 'top-0';
        $tw.wiki.setText(configTiddler, 'position', null, this.position, {
          suppressTimestamp: true,
        });
        this.showSetup();
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
        const foldPrefix = '$:/state/folded/';

        switch (type) {
          case 'pin':
            this.pined.push(closeTitle);
            break;
          case 'fold':
            $tw.wiki.setText(foldPrefix + closeTitle, 'text', null, 'hide');
            break;
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
      },
    },

    template: getTemplate('$:/plugins/oeyoews/vue-tabs/templates/app.vue'),
  };
  return component;
};

module.exports = app;
