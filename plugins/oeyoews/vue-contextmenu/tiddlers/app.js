/*\
title: $:/plugins/oeyoews/vue-contextmenu/app.js
type: application/javascript
module-type: library

\*/

const { h, ref, reactive } = window.Vue;

const { ElMessage } = require('element-plus.min.js');
const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
// const allTags = Object.keys($tw.wiki.getTagMap()).filter(
//   (t) => !t.startsWith('$:/'),
// );
const allTags = $tw.wiki.filterTiddlers('[tags[]!prefix[$:/]]');

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
      const dialogVisible = ref(false);
      const tags = ref([]);
      const inputVisible = ref(false);
      const newTag = ref(null);
      return {
        t,
        dialogVisible,
        tags,
        inputVisible,
        newTag,
        allTags,
        tagIcon: icons['tags'],
      };
    },

    watch: {
      tags(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.$refs['selectRef'].blur();
          });
        }
      },
    },

    mounted() {
      target.addEventListener('contextmenu', this.onContextMenu);
    },
    methods: {
      handleConfirm() {
        this.dialogVisible = false;
        $tw.wiki.setText(title, 'tags', null, this.tags);
        ElMessage({
          type: 'success',
          message: 'Tags updated',
        });
      },
      getTags(title) {
        if (!title) {
          console.error("title can't be empty");
          return;
        }
        const tiddler = $tw.wiki.getTiddler(title).fields.tags;
        let tags = tiddler ? tiddler : []; // 使用逗号分隔， 不考虑tag 本身包含逗号的情况
        return tags;
      },
      operation(type, param, callback) {
        self.dispatchEvent({
          type,
          param,
        });
        typeof callback === 'function' && callback();
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
          {
            label: t('menu.tags'),
            icon: getIcon('tags'),
            onClick: () => {
              this.tags = this.getTags(title);
              this.dialogVisible = true;
              this.$nextTick(() => {
                const selectRef = this.$refs['selectRef'];
                setTimeout(() => {
                  selectRef.focus();
                }, 0);
              });
              return;
              // let tags = this.getTags(title);
              const tiddler = $tw.wiki.getTiddler(title).fields.tags;
              let tags = tiddler ? tiddler.join(' ') : []; // 使用逗号分隔， 不考虑tag 本身包含逗号的情况
              const newtags = window.prompt('Tags:', tags);
              if (newtags) {
                console.log(newtags.split(' ').filter(Boolean));
                $tw.wiki.setText(
                  title,
                  'tags',
                  null,
                  newtags.split(' ').filter(Boolean),
                );
              }
            },
          },
          // TODO: 动态插入, 要保证顺序
          {
            label: t('menu.close2'),
            icon: getIcon('close2'),
            disabled: this.getStoryList().length === 1 ? true : false,
            onClick: () =>
              o('tm-close-other-tiddlers', title, () => {
                ElMessage({
                  type: 'success',
                  message: 'Close other tiddlers successfully',
                });
              }),
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
                  $tw.utils.copyToClipboard(title, {
                    doNotNotify: true,
                  });
                  ElMessage({
                    type: 'success',
                    message: 'Copy tiddler title successfully',
                  });
                },
              },
              {
                label: t('menu.copy2'),
                icon: getIcon('copy2'),
                onClick: () => {
                  const text = $tw.wiki.getTiddlerText(title);
                  $tw.utils.copyToClipboard(text, {
                    doNotNotify: true,
                  });
                  ElMessage({
                    type: 'success',
                    message: 'Copy tiddler text successfully',
                  });
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
              ElMessage({ type: 'success', message: 'Fold successfully' });
            },
          },
          {
            label: t('menu.delete'),
            icon: getIcon('delete'),
            onClick: () =>
              o('tm-delete-tiddler', title, () => {
                ElMessage({
                  type: 'success',
                  message: 'Delete successfully',
                });
              }),
          },
          {
            label: t('menu.newWindow'),
            icon: getIcon('newWindow'),
            onClick: () => o('tm-open-window', title),
          },
          {
            label: t('menu.rename'),
            icon: getIcon('rename'),
            onClick: async () => {
              const to = window.prompt('Rename to:', title);
              // const to = await $tw.showDialog('prompt', 'rename', title);
              if (to && to !== title) {
                // o('tm-rename-tiddler', title, '99');
                $tw.wiki.renameTiddler(title, to);
                ElMessage({ type: 'success', message: `Rename successfully` });
              } else {
                ElMessage({
                  type: 'info',
                  message: 'Rename canceled',
                });
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
            onClick: () =>
              o('tm-permalink', title, () => {
                // ElMessage({
                //   type: 'success',
                //   message: 'Copy permalink successfully',
                // });
              }),
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
