/*\
title: $:/plugins/oeyoews/neotw-tiddlers-view/components/TitleScroller.js
type: application/javascript
module-type: library

Title scroller component
\*/

module.exports = {
  name: 'TitleScroller',

  template: `
    <div class="title-scroller">
      <transition-group name="scroll" tag="div" class="scroll-container">
        <div v-for="(title, index) in visibleTitles" :key="title" class="title-item">
          {{ title }}
        </div>
      </transition-group>
    </div>`,

  props: {
    filter: {
      type: String,
      default: '[!is[system]sort[title]]',
    },
    limit: {
      type: Number,
      default: 5,
    },
  },

  data() {
    return {
      allTitles: [],
      visibleTitles: [],
      currentIndex: 0,
      lastUpdateTime: 0,
      animationFrameId: null,
    };
  },

  mounted() {
    this.loadTitles();
    this.startScrolling();
  },

  beforeUnmount() {
    this.stopScrolling();
  },

  methods: {
    loadTitles() {
      // 使用TiddlyWiki API获取tiddlers
      if ($tw && $tw.wiki) {
        const tiddlers = $tw.wiki.filterTiddlers(this.filter);
        this.allTitles = tiddlers;
        this.updateVisibleTitles();
      } else {
        console.error('TiddlyWiki API not available');
      }
    },

    updateVisibleTitles() {
      if (this.allTitles.length <= this.limit) {
        this.visibleTitles = [...this.allTitles];
        return;
      }

      // 计算要显示的标题
      const startIndex = this.currentIndex % this.allTitles.length;
      const endIndex = Math.min(startIndex + this.limit, this.allTitles.length);

      // 如果到达末尾需要循环到开始
      if (
        endIndex - startIndex < this.limit &&
        this.allTitles.length > this.limit
      ) {
        this.visibleTitles = [
          ...this.allTitles.slice(startIndex),
          ...this.allTitles.slice(0, this.limit - (endIndex - startIndex)),
        ];
      } else {
        this.visibleTitles = this.allTitles.slice(startIndex, endIndex);
      }
    },

    startScrolling() {
      // 使用requestAnimationFrame实现滚动
      const animate = (timestamp) => {
        if (!this.lastUpdateTime) this.lastUpdateTime = timestamp;

        // 每3000毫秒更新一次
        if (timestamp - this.lastUpdateTime >= 3000) {
          if (this.allTitles.length > this.limit) {
            this.currentIndex = (this.currentIndex + 1) % this.allTitles.length;
            this.updateVisibleTitles();
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
