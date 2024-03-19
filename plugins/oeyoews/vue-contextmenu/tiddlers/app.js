/*\
title: $:/plugins/oeyoews/vue-contextmenu/app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Icon = require('./components/Icon');
const icons = require('./icons');

const app = (target) => {
  const component = {
    setup() {
      return {};
    },

    mounted() {
      target.addEventListener('contextmenu', this.onContextMenu);
    },

    methods: {
      onContextMenu(e) {
        e.preventDefault(); //prevent the browser's default menu

        // TODO: support i18n
        const items = [
          {
            label: 'Close Tiddler',
            icon: h(Icon, { icon: icons.close })
            // onClick:
          },
          {
            label: 'fold Tiddler',
            icon: h(Icon, { icon: icons.fold })
            // onClick:
          },
          {
            label: 'Edit Tiddler',
            icon: h(Icon, { icon: icons.edit })
            // onClick:
          },
          {
            label: 'Close Others',
            icon: h(Icon, { icon: icons.close2 })
            // onClick:
          },
          {
            label: 'Copy Tiddler Title',
            icon: h(Icon, { icon: icons.copy })
            // onClick:
          },
          {
            label: 'Copy Tiddler Content',
            icon: h(Icon, { icon: icons.copy2 })
            // onClick:
          },
          {
            label: 'Delete Tiddler',
            icon: h(Icon, { icon: icons.close })
            // onClick:
          },
          {
            label: 'permLink Tiddler',
            icon: h(Icon, { icon: icons.link })
            // onClick:
          }
        ];
        //show menu
        this.$contextmenu({
          items,
          customClass: 'rounded-md',
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

      toggleDraggable() {
        this.draggable = this.draggable === 'yes' ? 'no' : 'yes';
        $tw.wiki.setText(configTiddler, 'draggable', null, this.draggable, {
          suppressTimestamp: true
        });
      },

      togglePosition() {
        this.position = this.position === 'top-0' ? 'bottom-0' : 'top-0';
        $tw.wiki.setText(configTiddler, 'position', null, this.position, {
          suppressTimestamp: true
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
      }
    },

    template: getTemplate(
      '$:/plugins/oeyoews/vue-contextmenu/templates/app.vue'
    ),

    components: {
      Icon
    }
  };
  return component;
};

module.exports = app;
