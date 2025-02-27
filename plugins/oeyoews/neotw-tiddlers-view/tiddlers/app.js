/*\
title: $:/plugins/oeyoews/neotw-tiddlers-view/app.js
type: application/javascript
module-type: library

\*/

const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-tiddlers-view';
const RandomPicker = require('./RandomPicker.js');

const app = () => {
  const component = {
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    data() {
      return {
        allTitles: [],
        currentTitle: '',
        lastUpdateTime: 0,
        randomPicker: null,
        animationFrameId: null,
        filter:
          '[!is[system]sort[title]!is[tag]!prefix[$:/]!is[binary]!is[draft]days[-300]!sort[modified]limit[500]!tag[todo]]',
      };
    },
    mounted() {
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
          this.allTitles = $tw.wiki.filterTiddlers(this.filter);
          this.randomPicker = new RandomPicker(this.allTitles.length);
          this.currentTitle = this.updateCurrentTitle();
        } else {
          console.error('TiddlyWiki API not available');
        }
      },
      updateCurrentTitle() {
        if (this.allTitles.length === 0) {
          return null;
        }
        const index = this.randomPicker.getRandomIndex();
        console.log(index);
        return this.allTitles[index];
      },

      startScrolling() {
        // 使用requestAnimationFrame实现滚动
        const animate = (timestamp) => {
          if (!this.lastUpdateTime) this.lastUpdateTime = timestamp;

          if (timestamp - this.lastUpdateTime >= 5000) {
            if (this.allTitles.length > 1) {
              this.currentTitle = this.updateCurrentTitle();
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
