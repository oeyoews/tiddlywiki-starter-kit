/*\
title: $:/plugins/oeyoews/vue-contextmenu/app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Icon = require('./components/Icon');
const icons = require('./icons');

const app = (target, title, self) => {
  const component = {
    setup() {
      return {};
    },

    mounted() {
      target.addEventListener('contextmenu', this.onContextMenu);
    },

    methods: {
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
        e.preventDefault(); //prevent the browser's default menu
        const o = this.operation;

        // TODO: support i18n
        const items = [
          {
            label: 'Close Tiddler',
            icon: h(Icon, { icon: icons.close }),
            onClick: () => o('tm-close-tiddler', title)
          },
          {
            label: 'Edit Tiddler',
            icon: h(Icon, { icon: icons.edit }),
            onClick: () => o('tm-edit-tiddler', title)
          },
          {
            label: 'Close Others',
            icon: h(Icon, { icon: icons.close2 }),
            onClick: () => o('tm-close-other-tiddlers', title),
            divided: true
          },
          {
            label: 'Copy Title',
            icon: h(Icon, { icon: icons.copy }),
            onClick: () => {
              $tw.utils.copyToClipboard(title);
            }
          },
          {
            label: 'Copy Tiddler',
            icon: h(Icon, { icon: icons.copy2 }),
            disabled: this.getStoryList().length === 1 ? true : false,
            onClick: () => {
              const text = $tw.wiki.getTiddlerText(title);
              $tw.utils.copyToClipboard(text);
            },
            divided: true
          },
          {
            label: 'fold Tiddler',
            icon: h(Icon, { icon: icons.fold }),
            onClick: () => {
              const foldPrefix = '$:/state/folded/';
              $tw.wiki.setText(foldPrefix + title, 'text', null, 'hide');
            }
          },
          {
            label: 'Delete Tiddler',
            icon: h(Icon, { icon: icons.delete }),
            onClick: () => o('tm-delete-tiddler', title)
          },
          {
            label: 'PermaLink',
            icon: h(Icon, { icon: icons.link }),
            onClick: () => o('tm-permalink', title)
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
