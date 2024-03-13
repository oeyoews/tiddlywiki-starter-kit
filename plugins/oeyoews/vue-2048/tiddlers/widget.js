/*\
title: $:/plugins/oeyoews/vue-2048/widget.js
type: application/javascript
module-type: widget

vue-2048 widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ExampleWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const { createApp } = window.Vue;
    const component = require('./component');
    const domNode = this.document.createElement('div');

    try {
      const app = createApp(component());

      app.use(Vue3Toastify);

      // const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

      // const award = getTemplate(
      //   '$:/plugins/oeyoews/vue-2048/templates/award.vue'
      // );
      // const chip = getTemplate(
      //   '$:/plugins/oeyoews/vue-2048/templates/chip.vue'
      // );

      // app.component('game2048-award', {
      //   template: award,
      //   props: {
      //     award: { type: Object, required: true },
      //     style: { type: Object },
      //     likeStyle: { type: Object }
      //   }
      // });

      // app.component('game2048', {
      //   template: '#game2048',
      //   props: {
      //     size: { type: Number },
      //     sizeAimMap: { type: Array, required: true },
      //     listenOwnKeyEventsOnly: { type: Boolean, default: false },
      //     tabIndex: { type: Number, default: 1 },
      //     boardSizePx: { type: Number, default: 0 },
      //     animationTimeMs: { type: Number, default: 150 },
      //     started: { type: Boolean, default: false }
      //   },
      //   data: function () {
      //     var aim = this.sizeAimMap[this.size];
      //     return {
      //       cells: this.createCells(),
      //       boardSizeAutoPx: 0,
      //       aim: aim
      //     };
      //   },
      //   mounted: function () {
      //     this.boardSizeAutoPx =
      //       this.boardSizePx > 0
      //         ? this.boardSizePx
      //         : this.$el.getBoundingClientRect().width;
      //   },
      //   watch: {
      //     size: function () {
      //       this.cells = this.createCells();
      //       this.aim = this.sizeAimMap[this.size];
      //       this.$emit('aim-changed', this.aim);
      //     },
      //     started: function (nv, ov) {
      //       if (nv) {
      //         this.startGame();
      //       } else {
      //         this.endGame();
      //       }
      //     }
      //   },
      //   computed: {
      //     boardStyle: function () {
      //       return {
      //         width: this.boardSizePx > 0 ? this.boardSizePx + 'px' : '100%',
      //         height: this.boardSizePx > 0 ? this.boardSizePx + 'px' : '100%',
      //         borderRadius: 7 / this.size + '%'
      //       };
      //     },
      //     cellStyle: function () {
      //       return {
      //         width: this.cellSizePct + '%',
      //         height: this.cellSizePct + '%',
      //         marginLeft: this.cellMarginPct + '%',
      //         marginTop: this.cellMarginPct + '%'
      //       };
      //     },
      //     cellSizePct: function () {
      //       return 8 * this.cellMarginPct;
      //     },
      //     cellMarginPct: function () {
      //       return 100 / (9 * this.size + 1);
      //     },
      //     cellSizePx: function () {
      //       return (
      //         (this.cellSizePct / 100) *
      //         (this.boardSizePx > 0 ? this.boardSizePx : this.boardSizeAutoPx)
      //       );
      //     }
      //   },
      //   methods: {
      //     startGame: function () {
      //       this.emptyCells();
      //       var game = createGame2048(this.size);
      //       for (var i = Math.max(2, this.size - 2); i > 0; i--) {
      //         var chips = game.turn();
      //         this.addChips(chips);
      //       }
      //       var doGameMove = this.createGameMove(game);
      //       this.runKeyboardControl(doGameMove);
      //       this.runTouchControl(doGameMove);
      //       this.$emit('started', this);
      //     },

      //     runKeyboardControl: function (doGameMove) {
      //       var listenKeysOn = this.listenOwnKeyEventsOnly
      //         ? this.$el
      //         : document;
      //       var h = function (e) {
      //         var m = keyMap[e.keyCode];
      //         if (m == null) return;
      //         e.preventDefault();
      //         doGameMove(m);
      //       };
      //       listenKeysOn.addEventListener('keydown', h);
      //       this.$once('ended', function () {
      //         listenKeysOn.removeEventListener('keydown', h);
      //       });
      //     },

      //     runTouchControl: function (doGameMove) {
      //       var sw = createSwipeListener(function (m) {
      //         doGameMove(m);
      //       });
      //       var el = this.$el;
      //       sw.attach(el);
      //       this.$once('ended', function () {
      //         sw.detach(el);
      //       });
      //     },

      //     createGameMove: function (game) {
      //       var self = this;
      //       var boardChanges = { consolidations: [] };
      //       var newChips = [];
      //       var consolidateAndAddChipsDeffered = deffered(
      //         self.animationTimeMs,
      //         function () {
      //           self.consolidateChips(boardChanges.consolidations);
      //           self.addChips(newChips);
      //         }
      //       );

      //       return function (m) {
      //         consolidateAndAddChipsDeffered.finish();

      //         boardChanges = game[m]();
      //         newChips.length = 0;
      //         if (boardChanges.moves.length > 0) {
      //           for (var i = Math.max(1, self.size - 3); i > 0; i--) {
      //             var chips = game.turn();
      //             chips.push.apply(newChips, chips);
      //           }
      //           if (boardChanges.scoreInc > 0) {
      //             self.$emit('score', {
      //               score: game.score(),
      //               scoreInc: boardChanges.scoreInc
      //             });
      //             for (var i = 0; i < boardChanges.consolidations.length; i++) {
      //               if (boardChanges.consolidations[i].value == self.aim) {
      //                 self.$emit('aim-reached');
      //                 break;
      //               }
      //             }
      //           }
      //         }

      //         self.moveChips(boardChanges.moves);
      //         consolidateAndAddChipsDeffered.renew();
      //         if (!game.canMove()) {
      //           setTimeout(function () {
      //             self.endGame();
      //           }, self.animationTimeMs);
      //         }
      //       };
      //     },

      //     endGame: function () {
      //       this.$emit('ended', this);
      //     },

      //     consolidateChips: function (consolidations) {
      //       var self = this;
      //       consolidations.forEach(function (c) {
      //         var cell = self.getCell(c);
      //         var chips = cell.chips;
      //         chips.splice(0, chips.length - 1);
      //         chips[0].value = c.value;
      //       });
      //     },
      //     moveChips: function (moves) {
      //       for (var i = 0; i < moves.length; i++)
      //         this.moveChip(moves[i].from, moves[i].to);
      //     },
      //     moveChip: function (from, to) {
      //       var fcell = this.getCell(from);
      //       var fcellEl = this.getCellEl(from);
      //       var tcell = this.getCell(to);
      //       var tcellEl = this.getCellEl(to);
      //       var chip = fcell.chips.splice(0, 1)[0];
      //       var fboundRect = fcellEl.getBoundingClientRect();
      //       var tboundRect = tcellEl.getBoundingClientRect();
      //       chip.prevRelPos = {
      //         left: fboundRect.left - tboundRect.left,
      //         top: fboundRect.top - tboundRect.top
      //       };
      //       tcell.chips.push(chip);
      //     },
      //     addChips: function (chips) {
      //       chips.forEach(this.addChip);
      //     },
      //     addChip: function (c) {
      //       this.cells[this.getCellIndex(c)].chips.push({ value: c.value });
      //     },
      //     getCellIndex: function (c) {
      //       return c.y * this.size + c.x;
      //     },
      //     getCell: function (c) {
      //       return this.cells[this.getCellIndex(c)];
      //     },
      //     getCellEl: function (c) {
      //       return this.$refs.cells[this.getCellIndex(c)];
      //     },
      //     createCells: function () {
      //       return Array.apply(null, { length: this.size * this.size }).map(
      //         function () {
      //           return { chips: [] };
      //         }
      //       );
      //     },
      //     emptyCells: function () {
      //       this.cells.forEach(function (c) {
      //         c.chips.splice(0);
      //       });
      //     }
      //   }
      // });

      // app.component('game2048-chip', {
      //   template: chip,
      //   props: {
      //     chip: { type: Object },
      //     sizePx: { type: Number },
      //     animationTimeMs: { type: Number }
      //   },
      //   computed: {
      //     style: function () {
      //       return {
      //         fontSize: this.fontSizePx + 'px',
      //         backgroundColor: this.backColor,
      //         color: this.color,
      //         boxShadow: this.boxShadow
      //       };
      //     },
      //     fontSizePx: function () {
      //       var n = Math.floor(Math.log(this.chip.value) / Math.log(10));
      //       var b = Math.floor(this.sizePx / 1.5);
      //       return b * (n < 8 ? fontSizeCoefs[n] : fontSizeCoefs[7]);
      //     },
      //     backColor: function () {
      //       return backColors[this.chip.value] || backColors[128];
      //     },
      //     color: function () {
      //       return colors[this.chip.value] || colors[128];
      //     },
      //     boxShadow: function () {
      //       if (this.chip.value < 256) {
      //         var s = this.sizePx * 0.1 + 'px ';
      //         return '0 ' + s + s + '0 black';
      //       } else {
      //         return (
      //           '0 0 20px ' +
      //           (2 +
      //             Math.min(10, Math.log(this.chip.value) / Math.log(2) - 7)) +
      //           'px white'
      //         );
      //       }
      //     }
      //   },
      //   watch: {
      //     'chip.value': function () {
      //       var el = this.$el;
      //       if (el) {
      //         var d = this.animationTimeMs + 'ms';
      //         el.style['-webkit-animation'] = el.style.animation =
      //           'chip-value-changed ' + d;
      //         el.style.transition = 'background-color ' + d;
      //         el.style['-webkit-transition'] = '-web-kit-background-color ' + d;
      //       }
      //     }
      //   },
      //   methods: {
      //     enter: function (el, done) {
      //       var self = this;
      //       if (this.chip.prevRelPos) {
      //         var p = this.chip.prevRelPos;
      //         el.style['-webkit-transform'] = el.style.transform =
      //           'translate(' + p.left + 'px,' + p.top + 'px)';
      //         requestAnimationFrame(function () {
      //           requestAnimationFrame(function () {
      //             el.style.transition =
      //               'transform ' + self.animationTimeMs + 'ms';
      //             el.style['-webkit-transition'] =
      //               '-webkit-transform ' + self.animationTimeMs + 'ms';
      //             el.style['-webkit-transform'] = el.style.transform = '';
      //           });
      //         });
      //       } else {
      //         el.style['-webkit-animation'] = el.style.animation =
      //           'chip-appear ' + this.animationTimeMs + 'ms';
      //       }
      //     }
      //   }
      // });

      app.config.errorHandler = (err, info) => {
        const text = `[Vue3](${app.version}): ` + err;
        console.error(text, info);
        domNode.textContent = text;
        domNode.style.color = 'red';
      };

      // 挂载
      app.mount(domNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    } catch (e) {
      console.error(e);
    }
  }
}

/** @description vue-2048 widget */
exports['widget-UAecw8N7gY'] = ExampleWidget;
