/*\
title: $:/plugins/oeyoews/neotw-tiddlers-view/app.js
type: application/javascript
module-type: library

\*/

const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-tiddlers-view';

const app = () => {
  const component = {
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    data() {
      return {
        allTitles: [],
        currentTitle: '',
        currentIndex: 0,
        lastUpdateTime: 0,
        animationFrameId: null,
        visibleTitles: [],
        filter:
          '[!is[system]sort[title]!is[tag]!prefix[$:/]!is[binary]!is[draft]]',
      };
    },
    mounted() {
      console.log('App mounted!');
      this.loadTitles();
      this.startScrolling();
    },

    methods: {
      goToTiddler(title) {
        const goto = new $tw.Story();
        goto.navigateTiddler(title);
      },

      loadTitles() {
        if ($tw && $tw.wiki) {
          const tiddlers = $tw.wiki.filterTiddlers(this.filter);
          this.allTitles = tiddlers;
          this.updateCurrentTitle();
        } else {
          console.error('TiddlyWiki API not available');
        }
      },

      updateCurrentTitle() {
        if (this.allTitles.length === 0) {
          this.currentTitle = '';
          return;
        }

        // 只显示一个标题
        const index = this.currentIndex % this.allTitles.length;
        this.currentTitle = this.allTitles[index];
      },

      startScrolling() {
        // 使用requestAnimationFrame实现滚动
        const animate = (timestamp) => {
          if (!this.lastUpdateTime) this.lastUpdateTime = timestamp;

          // 每3000毫秒更新一次，但在暂停状态下不更新
          if (timestamp - this.lastUpdateTime >= 3000) {
            if (this.allTitles.length > 1) {
              console.log('up');
              this.currentIndex =
                (this.currentIndex + 1) % this.allTitles.length;
              this.updateCurrentTitle();
            }
            this.lastUpdateTime = timestamp;
          }

          // 继续下一帧动画
          this.animationFrameId = window.requestAnimationFrame(animate);
        };

        // 开始动画循环
        this.animationFrameId = window.requestAnimationFrame(animate);
      },

      stopScrolling() {
        // 停止动画
        if (this.animationFrameId) {
          window.cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      },
    },
  };
  return component;
};

module.exports = app;
