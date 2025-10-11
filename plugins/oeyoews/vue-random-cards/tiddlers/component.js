/*\
title: $:/plugins/oeyoews/vue-random-cards/component.js
type: application/javascript
module-type: library

\*/

const { reactive, watch, toRaw, computed, ref } = window.Vue;
const palette = $tw.wiki.getTiddlerText('$:/palette');
const theme =
  $tw.wiki.getTiddler(palette).fields['color-scheme'] === 'dark'
    ? 'dark'
    : 'light';

const story = new $tw.Story();
// 存储已经阅读过的卡片
let readCards = [];

const throttle = (fn, delay = 500) => {
  let timer = null;
  return function (...arg) {
    const self = this;
    if (!timer) {
      // TIP: 箭头函数虽然会修复this指向问题， 但是同时有导致了 vue 的this 失效， 所以这里必须要哦使用 显示this 绑定
      fn.apply(self, arg);
      timer = setTimeout(() => {
        timer = null; // 清除定时器
      }, delay);
    } else {
    }
  };
};

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = (
  filter = '[!is[system]!is[binary]!days[-31]!tag[todo]!tag[done]!prefix[$:/]!<currentTiddler>]',
  text,
  tag,
) => {
  const tiddlers = $tw.wiki.filterTiddlers(
    tag ? `${filter} :and[tag[${tag}]]` : filter,
  );
  const component = {
    setup() {
      const cardContent = ref('');
      const title = ref('');

      const chartapp = ref();
      const chartdata = ref([]);

      const options = reactive({
        // TODO: not work
        // aria: {
        //   enabled: true,
        //   decal: {
        //     show: true
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const { name, value, percent } = params;
            if (value) {
              return `${name}`;
            } else {
              return `${name}`;
            }
          },
        },

        toolbox: {
          show: false,
          left: 0,
          bottom: 0,
          feature: {
            dataView: { show: true, readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'Tag',
            type: 'pie',
            radius: '50%',
            center: '50%',
            data: chartdata.value,
          },
        ],
      });

      const isRotate = ref(false);

      return {
        isRotate,
        options,
        chartdata,
        chartapp,
        title,
        cardContent,
        text,
      };
    },

    mounted() {
      // 挂在echarts实例
      this.chartapp = echarts.init(this.$refs.chart, theme, {
        renderer: 'svg',
      });
      this.updateChart();
      this.chartapp.on('click', (params) => {
        story.navigateTiddler(params.name);
      });
    },

    watch: {
      chartdata: {
        handler() {
          this.updateChart();
        },
        deep: true,
      },
    },

    methods: {
      randomTiddlerTitle() {
        if (tiddlers.length == 0) {
          console.info('没有可用的卡片');
          alert('已全部阅读');
          return null;
        }
        const index = Math.floor(Math.random() * tiddlers.length);
        const title = tiddlers.splice(index, 1)[0]; // 直接删除并获取 title
        if (!$tw.wiki.tiddlerExists(title)) {
          return this.randomTiddlerTitle();
        } else {
          return title;
        }
      },
      // if (readCards.includes(tiddlers[index])) {
      //   console.log('已经阅读过, 自动跳过该条目', tiddlers[index]);
      //   tiddlers.splice(index, 1); // 移除
      //   return this.randomTiddlerTitle();
      // } else {
      //   readCards.push(tiddlers[index]);
      //   return tiddlers[index];
      // }

      updateChart() {
        if (this.chartdata.length > 8) {
          this.resetChart();
          this.chartdata.push({
            name: this.title,
            value: 1,
          });
        }
        this.chartapp.setOption(this.options);

        // this.chartapp.showLoading();
        // setTimeout(() => {
        //   this.chartapp.setOption(this.options);
        //   this.chartapp.hideLoading();
        // }, 200);
      },

      resetChart() {
        // TODO: 如果直接清空， 无效 对于setoptions???
        this.chartdata.splice(0, this.chartdata.length);
        // this.cardContent = '空空如也';
        // this.title = '';
      },

      renderTiddler2HTML(title) {
        try {
          // 性能问题
          // const text =
          //   `{{{ [[${this.title}]]` + '||$:/core/ui/ViewTemplate }}}';
          // console.log(text);
          // this.cardContent = text;
          // const stateTiddler = "$:/state"
          // $tw.wiki.setText(this.title, text);
          this.cardContent =
            $tw.wiki.renderTiddler('text/html', title) || '空空如也';
        } catch (e) {
          console.error(e.message, title);
        }
      },

      updateCard: throttle(function () {
        this.title = this.randomTiddlerTitle();
        if (!this.title) {
          return;
        }
        this.isRotate = !this.isRotate;
        this.chartdata.push({
          name: this.title,
          value: 1,
        });

        this.renderTiddler2HTML(this.title);
      }),

      gotoTiddler() {
        story.navigateTiddler(this.title);
      },
    },

    template: getTemplate('$:/plugins/oeyoews/vue-random-cards/widget.vue'),
  };

  return component;
};

module.exports = app;
