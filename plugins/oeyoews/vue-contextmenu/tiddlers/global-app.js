/*\
title: $:/plugins/oeyoews/vue-contextmenu/global-app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Icon = require('./components/Icon');
const icons = require('./icons');

const { useI18n } = require('vue-i18n.global.prod.js');
const configTiddler = '$:/config/oeyoews/contextmenu/position';
const { X = 700, Y = 740 } = $tw.wiki.getTiddlerData(configTiddler) || {};

/** vue app */
const app = (self) => {
  const component = {
    setup() {
      const { t } = useI18n();
      const startX = ref(0);
      const startY = ref(0);
      const buttonX = ref(X);
      const buttonY = ref(Y);
      const isDragging = ref(false);

      return {
        t,
        icons,
        startX,
        startY,
        buttonX,
        buttonY,
        isDragging
      };
    },

    methods: {
      startDrag(event) {
        this.isDragging = true;
        // 初始位置
        this.startX = event.clientX - this.buttonX;
        this.startY = event.clientY - this.buttonY;
        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.stopDrag);
      },
      drag(event) {
        if (this.isDragging) {
          // 最终位置
          const width = window.innerWidth;
          const height = window.innerHeight;

          const x = event.clientX - this.startX;
          const y = event.clientY - this.startY;
          if (x < 0 || x > width || y < 0 || y > height) return;

          this.buttonX = x;
          this.buttonY = y;

          $tw.wiki.setTiddlerData(configTiddler, {
            X: this.buttonX,
            Y: this.buttonY
          });
        }
      },
      stopDrag(e) {
        e.preventDefault();
        this.isDragging = false;
        document.removeEventListener('mousemove', this.drag);
        document.removeEventListener('mouseup', this.stopDrag);
      },

      operation(type, param) {
        self.dispatchEvent({
          type,
          param
        });
      },

      getStoryList() {
        return $tw.wiki.getTiddlerList('$:/StoryList');
      },

      onContextMenu(e) {
        const t = this.t;
        e.preventDefault(); //prevent the browser's default menu
        const o = this.operation;

        const items = [
          // home
          // language
          {
            label: t('ball.setting'),
            icon: h(Icon, { icon: icons.setting }),
            onClick: () => {
              self.dispatchEvent({
                type: 'tm-navigate',
                navigateTo: '$:/ControlPanel'
              });
            }
          }
        ];

        //show menu
        this.$contextmenu({
          items,
          customClass: 'rounded-md',
          zIndex: 20,
          minWidth: 230,
          x: e.x,
          y: e.y
        });
      }
    },

    template: getTemplate(
      '$:/plugins/oeyoews/vue-contextmenu/templates/global-app.vue'
    ),

    components: {
      Icon
    }
  };
  return component;
};

module.exports = app;
