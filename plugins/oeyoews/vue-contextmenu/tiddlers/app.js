/*\
title: $:/plugins/oeyoews/vue-contextmenu/app.js
type: application/javascript
module-type: library

\*/

const { h, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Icon = require('./components/Icon');
const icons = require('./icons');

const { useI18n } = require('vue-i18n.global.prod.js');

const palette = $tw.wiki.getTiddlerText('$:/palette');
const isDarkMode =
  $tw.wiki.getTiddler(palette)?.fields['color-scheme'] === 'dark'
    ? true
    : false;

/**
 * @param {keyof import('./icons')} icon
 */
const getIcon = (icon) => {
  return h(Icon, {
    icon: icons[icon],
  });
};

/** vue app */
const app = (target, title, self) => {
  const component = {
    setup() {
      const { t } = useI18n();
      return { t };
    },

    mounted() {
      target.addEventListener('contextmenu', this.onContextMenu);
    },

    methods: {
      operation(type, param) {
        self.dispatchEvent({
          type,
          param,
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
          {
            label: t('menu.close'),
            icon: getIcon('close'),
            onClick: () => o('tm-close-tiddler', title),
          },
          {
            label: t('menu.edit'),
            icon: getIcon('edit'),
            onClick: () => o('tm-edit-tiddler', title),
          },
          // TODO: 动态插入, 要保证顺序
          {
            label: t('menu.close2'),
            icon: getIcon('close2'),
            disabled: this.getStoryList().length === 1 ? true : false,
            onClick: () => o('tm-close-other-tiddlers', title),
            divided: true,
          },
          {
            label: t('menu.copy0'),
            icon: getIcon('copy'),
            onSubMenuOpen: () => {
              // console.log('open');
            },
            children: [
              {
                label: t('menu.copy'),
                icon: h(Icon, { icon: icons.copy }),
                onClick: () => {
                  $tw.utils.copyToClipboard(title);
                },
              },
              {
                label: t('menu.copy2'),
                icon: getIcon('copy2'),
                onClick: () => {
                  const text = $tw.wiki.getTiddlerText(title);
                  $tw.utils.copyToClipboard(text);
                },
              },
            ],
          },
          {
            label: t('menu.fold'),
            icon: getIcon('fold'),
            onClick: () => {
              const foldPrefix = '$:/state/folded/';
              $tw.wiki.setText(foldPrefix + title, 'text', null, 'hide');
            },
          },
          {
            label: t('menu.delete'),
            icon: getIcon('delete'),
            onClick: () => o('tm-delete-tiddler', title),
          },
          {
            label: t('menu.newWindow'),
            icon: getIcon('newWindow'),
            onClick: () => o('tm-open-window', title),
          },
          {
            label: t('menu.rename'),
            icon: getIcon('rename'),
            onClick: () => {
              const to = window.prompt('Rename to:', title);
              if (to) {
                // o('tm-rename-tiddler', title, '99');
                $tw.wiki.renameTiddler(title, to);
              }
            },
          },
          {
            label: t('menu.clone'),
            icon: getIcon('clone'),
            onClick: () => o('tm-new-tiddler', title),
          },
          {
            label: t('menu.permalink'),
            icon: getIcon('link'),
            onClick: () => o('tm-permalink', title),
          },
        ];

        //show menu
        this.$contextmenu({
          items,
          customClass: 'rounded-md',
          zIndex: 3,
          minWidth: 230,
          theme: isDarkMode ? 'dark' : '',
          x: e.x,
          y: e.y,
        });
      },
    },

    template: getTemplate(
      '$:/plugins/oeyoews/vue-contextmenu/templates/app.vue',
    ),

    components: {
      Icon,
    },
  };
  return component;
};

module.exports = app;
