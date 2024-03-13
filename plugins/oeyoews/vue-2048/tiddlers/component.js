/*\
title: $:/plugins/oeyoews/vue-2048/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const fontSizeCoefs = [1, 1, 0.8, 0.65, 0.5, 0.4, 0.35, 0.32];
const backColors = {
  2: '#87E293',
  4: '#87E273',
  8: '#eecf40',
  16: '#ffaa4f',
  32: '#6bcae2',
  64: '#9ebbee',
  128: 'white'
};
const colors = {
  2: 'white',
  4: 'white',
  8: 'white',
  16: 'white',
  32: 'white',
  64: 'white',
  128: '#2c3e50'
};
const app = () => {
  const component = {
    data() {
      return {
        fontSizeCoefs,
        backColors,
        colors
      };
    },
    computed: {
      awardStyle() {
        return {
          width: this.boardSizePx / 5 + 'px',
          fontSize: this.boardSizePx / 350 + 'em'
        };
      },
      likeStyle() {
        return {
          height: this.boardSizePx / 21 + 'px'
        };
      },
      gameContainerStyle() {
        return {
          width: this.boardSizePx + 'px',
          height: this.boardSizePx + 'px'
        };
      },
      gameControlsStyle() {
        return {
          height: this.boardSizePx * 0.2 + 'px'
        };
      },
      scoreContainerStyle() {
        return {
          height: this.boardSizePx * 0.2 + 'px'
        };
      },
      gameAimStyle() {
        const bsh = this.boardSizePx / 50 + 'px ';
        return {
          boxShadow: '0 ' + bsh + bsh + 'black',
          fontSize: this.boardSizePx / 110 + 'em'
        };
      },
      buttonStyle() {
        return {
          fontSize: this.boardSizePx / 450 + 'em'
        };
      },
      scoreStyle() {
        return {
          fontSize: this.boardSizePx / 280 + 'em'
        };
      },
      gameAwardsContainerStyle() {
        return {
          height: this.boardSizePx * 0.08 + 'px'
        };
      },
      gameAwardStyle() {
        return {
          width: this.boardSizePx / 5 + 'px',
          fontSize: this.boardSizePx / 350 + 'em'
        };
      },
      allAwardsObtained() {
        for (const award in this.awards) {
          if (!this.awards[award].obtained) return false;
        }
        return true;
      }
    },
    methods: {
      startGame() {
        this.gameStarted = true;
        this.score = 0;
        this.showCollectAllAwards();
      },
      onGameEnded() {
        this.gameStarted = false;
        this.gameEnded = true;
        this.gameAimReached = false;
        this.persistState();
      },
      onGameScore(args) {
        const s = { score: this.score };
        const self = this;
        TweenLite.to(s, 0.3, {
          score: args.score,
          ease: Power0.easeNone,
          onUpdate() {
            self.score = Math.floor(s.score);
          }
        });

        if (args.score > this.bestScore[this.size]) {
          const bs = { score: this.bestScore[this.size] };
          TweenLite.to(bs, 0.3, {
            score: args.score,
            ease: Power0.easeNone,
            onUpdate() {
              Vue.set(self.bestScore, self.size, Math.floor(bs.score));
            }
          });
        }

        this.scoreInc = args.scoreInc + '+';
        Vue.nextTick(() => {
          self.scoreInc = '';
        });
      },
      onGameAimChanged(aim) {
        this.gameAim = aim;
      },
      onGameAimReached() {
        this.gameAimReached = true;
        this.awards[this.gameAim].obtained = true;
        this.persistState();

        const awardEl = this.getAwardEl(this.gameAim);
        const gameAimEl = this.$refs.gameAim;
        const p1 = gameAimEl.getBoundingClientRect();
        const p2 = awardEl.getBoundingClientRect();
        const ws = p1.width / p2.width;
        const hs = p1.height / p2.height;
        const x = p1.left - p2.left + p1.width / 4;
        const y = p1.top - p2.top + p1.height / 2;

        const s = awardEl.style;
        s['-webkit-transform'] = s.transform =
          'translate(' + x + 'px,' + y + 'px) scale(' + ws + ',' + hs + ')';
        s['-webkit-transition'] = s.transition = '';
        s.zIndex = 100;
        requestAnimationFrame(() => {
          s['-webkit-transition'] = s.transition = 'all 2s';
          s['-webkit-transform'] = s.transform = '';
        });
      },
      getAwardEl(aim) {
        for (const i in this.$refs.awards) {
          const c = this.$refs.awards[i];
          if (c.award.aim == aim) return c.$el;
        }
        return null;
      },
      showCollectAllAwards() {
        const self = this;
        setTimeout(() => {
          self.showCollectAllAwardsHandler =
            self.showCollectAllAwardsHandler ||
            self.showCollectAllAwards.bind(self);
          self.$refs.collectAllAwards.classList.add('blinking');
          setTimeout(() => {
            self.$refs.collectAllAwards.classList.remove('blinking');
            self.showCollectAllAwardsHandler();
          }, 6000);
        }, 6000);
      },
      persistState() {
        localStorage['2048'] = JSON.stringify({
          bestScore: this.bestScore,
          awards: this.awards
        });
      }
    },
    template: getTemplate('$:/plugins/oeyoews/vue-2048/templates/widget.vue')
  };
  return component;
};

module.exports = app;
